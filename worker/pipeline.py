"""Procesamiento de un job de la cola (modo cron / --from-db).

Orquesta el pipeline completo para un job PENDING ya tomado de la DB:
SERP → enriquecimiento (con caché de 30 días) → scoring → clustering → email → DONE.
"""

from __future__ import annotations

import asyncio
import logging
from datetime import datetime, timezone
from typing import Any

from . import db
from .clustering import DetectedNetwork, build_networks
from .config import settings
from .emailer import send_report
from .enrich.domain import enrich_domains
from .models import DomainProfile, SerpResult
from .providers.duckduckgo import DuckDuckGoProvider
from .report.render import render_report
from .scoring import ScoredDomain, analyze

log = logging.getLogger(__name__)


def process_job(conn: Any, job: dict) -> dict:
    """Corre el pipeline completo para un job. Devuelve el informe serializado.

    Puede lanzar `SerpRateLimited` (el caller lo trata como reintento) o cualquier otra
    excepción (el caller decide PENDING/FAILED según los intentos).
    """
    provider = DuckDuckGoProvider()
    results = provider.search(job["keyword"], job["region"], settings.DEFAULT_MAX_RESULTS)
    if not results:
        raise RuntimeError("El buscador no devolvió resultados.")

    profiles = asyncio.run(_enrich_with_cache(conn, results))
    scored, ctx = analyze(profiles)
    networks = build_networks(scored, ctx)

    report = render_report(job["keyword"], job["region"], scored, networks)
    send_report(job["email"], report)

    return _to_result_dict(job, scored, networks)


async def _enrich_with_cache(conn: Any, results: list[SerpResult]) -> list[DomainProfile]:
    """Enriquece solo los dominios no cacheados; reconstruye los cacheados desde la DB.

    La edad de un dominio no cambia: no se vuelve a consultar dentro del TTL de 30 días.
    """
    domains = [r.domain for r in results]
    cached_rows = db.load_cached_profiles(conn, domains)
    result_by_domain = {r.domain: r for r in results}

    to_enrich = [r for r in results if r.domain not in cached_rows]
    fresh = await enrich_domains(to_enrich) if to_enrich else []

    # Persistir los recién enriquecidos en la caché.
    for p in fresh:
        try:
            db.upsert_profile(conn, p.to_db_dict())
        except Exception as exc:  # cachear es best-effort, no debe romper el job
            log.warning("No se pudo cachear %s: %s", p.domain, exc)

    profiles = list(fresh)
    for domain, row in cached_rows.items():
        p = DomainProfile.from_db(row)
        r = result_by_domain[domain]
        p.positions = r.positions or [r.position]  # posiciones de ESTA consulta
        p.ranked_url = r.url
        profiles.append(p)

    log.info("Enriquecidos %d nuevos, %d desde caché", len(fresh), len(cached_rows))
    return profiles


def _to_result_dict(
    job: dict, scored: list[ScoredDomain], networks: list[DetectedNetwork]
) -> dict:
    from .config import weights

    total = len(scored)
    high = sum(1 for s in scored if s.classification == weights.CLASS_HIGH)
    return {
        "keyword": job["keyword"],
        "region": job["region"],
        "provider": "DuckDuckGo",
        "analyzedAt": datetime.now(timezone.utc).isoformat(),
        "total": total,
        "pct": round(100 * high / total) if total else 0,
        "clean": sum(1 for s in scored if s.classification == weights.CLASS_CLEAN),
        "doubtful": sum(1 for s in scored if s.classification == weights.CLASS_DOUBTFUL),
        "high": high,
        "results": [
            {
                "domain": s.domain,
                "positions": s.positions,
                "score": s.score,
                "classification": s.classification,
                "signals": [
                    {"name": sig.name, "weight": sig.weight, "evidence": sig.evidence}
                    for sig in s.triggered
                ],
            }
            for s in scored
        ],
        "networks": [
            {
                "domains": n.domains,
                "positions": n.positions,
                "sharedIps": n.shared_ips,
                "linkedBy": n.linked_by,
            }
            for n in networks
        ],
    }
