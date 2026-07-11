"""Punto de entrada del worker.

Dos modos:

  1. Checkpoint humano (paso 2) — corre el pipeline para un keyword e imprime los
     DomainProfile por consola, SIN base de datos:

         python -m worker.main --keyword "seguro medico para autonomos" --region mx-es

  2. Cron (pasos siguientes) — toma un job PENDING de la DB y lo procesa:

         python -m worker.main --from-db

Este archivo, por ahora, implementa a fondo el modo 1 (SERP + enriquecimiento). El
scoring, clustering y email se enchufan en los pasos 3-5.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import logging
import sys

from .config import settings
from .enrich.domain import enrich_domains
from .models import DomainProfile
from .providers.base import SerpRateLimited
from .providers.duckduckgo import DuckDuckGoProvider
from .clustering import DetectedNetwork, build_networks
from .scoring import ScoredDomain, analyze


def _load_env() -> None:
    # Carga .env en local. En GitHub Actions no existe .env y las vars vienen de secrets,
    # así que esto es un no-op ahí. `override=False`: no pisa vars ya definidas.
    try:
        from dotenv import load_dotenv

        load_dotenv(override=False)
    except ImportError:
        pass


def _ensure_utf8() -> None:
    # La consola de Windows usa cp1252 por defecto y rompe con símbolos Unicode.
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8")  # type: ignore[union-attr]
        except (AttributeError, ValueError):
            pass


def _setup_logging(verbose: bool) -> None:
    _ensure_utf8()
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(asctime)s %(levelname)-7s %(name)s | %(message)s",
        datefmt="%H:%M:%S",
    )
    # La lib `whois` loguea ERROR por cada timeout de socket; los manejamos como fallback
    # graceful, así que no aportan ruido útil.
    logging.getLogger("whois.whois").setLevel(logging.CRITICAL)


async def run_keyword(keyword: str, region: str, max_results: int) -> list[DomainProfile]:
    provider = DuckDuckGoProvider()
    print(f"\n▶ Buscando «{keyword}» (región {region}, fuente {provider.name})…\n")

    results = provider.search(keyword, region, max_results)
    if not results:
        print("⚠ El buscador no devolvió resultados.")
        return []

    print(f"  {len(results)} dominios únicos. Enriqueciendo (concurrencia "
          f"{settings.ENRICH_CONCURRENCY})…\n")
    profiles = await enrich_domains(results)
    profiles.sort(key=lambda p: min(p.positions or [999]))
    return profiles


# ─── Salida legible para el checkpoint ────────────────────────────────────────

def _print_profiles(
    profiles: list[DomainProfile],
    scored: list[ScoredDomain],
    networks: list[DetectedNetwork],
    as_json: bool,
) -> None:
    _ensure_utf8()
    by_domain = {p.domain: p for p in profiles}

    if as_json:
        out = {
            "results": [
                {
                    "domain": s.domain,
                    "score": s.score,
                    "classification": s.classification,
                    "positions": s.positions,
                    "signals": [
                        {"name": sig.name, "weight": sig.weight, "evidence": sig.evidence}
                        for sig in s.triggered
                    ],
                    "profile": by_domain[s.domain].as_console_dict(),
                }
                for s in scored
            ],
            "networks": [
                {
                    "domains": n.domains,
                    "positions": n.positions,
                    "shared_ips": n.shared_ips,
                    "linked_by": n.linked_by,
                }
                for n in networks
            ],
        }
        print(json.dumps(out, indent=2, default=str))
        return

    for s in scored:
        p = by_domain[s.domain]
        d = p.as_console_dict()
        pos = ",".join(map(str, p.positions))
        print("─" * 72)
        print(f"  [{s.score:>3}] {s.classification:<14} #{pos:<8} {p.domain}")
        print(f"     registro:   {d['registered_at']}  (edad {d['age_days']} días)  "
              f"registrar={p.registrar!r}  whois_priv={p.whois_private}")
        print(f"     red:        ip={p.ip}  asn={p.asn}  org={p.org!r}")
        print(f"     publicación:sitemap_urls={p.sitemap_urls}  posts/día={p.posts_per_day}")
        print(f"     contenido:  palabras={p.word_count}  ads={p.ad_slots}  "
              f"autor={p.has_author}  about={p.has_about}  contacto={p.has_contact}")
        print(f"     estructura: dom_sig={p.dom_signature}  (shingles={len(p.dom_shingles)})")
        signals_str = ", ".join(
            f"{sig.name}({sig.weight:+g})" for sig in s.top_signals(6)
        )
        print(f"     señales:    {signals_str or '—'}")
        if p.errors:
            print(f"     ⚠ errores:  {p.errors}")
    print("─" * 72)
    _print_networks(networks)
    _print_summary(scored)


def _print_networks(networks: list[DetectedNetwork]) -> None:
    if not networks:
        return
    print("\nREDES DETECTADAS (dominios coordinados)")
    for i, n in enumerate(networks, 1):
        pos = ", ".join(map(str, n.positions))
        print(f"  Red #{i}: {n.size} dominios — posiciones {pos}")
        print(f"     dominios: {', '.join(n.domains)}")
        for reason in n.linked_by:
            print(f"     ↳ {reason}")


def _print_summary(scored: list[ScoredDomain]) -> None:
    n = len(scored)
    from .config import weights

    high = [s for s in scored if s.classification == weights.CLASS_HIGH]
    doubtful = sum(1 for s in scored if s.classification == weights.CLASS_DOUBTFUL)
    clean = sum(1 for s in scored if s.classification == weights.CLASS_CLEAN)
    pct = round(100 * len(high) / n) if n else 0

    # Redes por IP compartida (vista rápida; el clustering formal es el paso 4).
    ip_counts: dict[str, list[str]] = {}
    for s in scored:
        ip = s.profile.ip if s.profile else None
        if ip:
            ip_counts.setdefault(ip, []).append(s.domain)
    shared_ips = {ip: ds for ip, ds in ip_counts.items() if len(ds) > 1}

    print("\nRESUMEN")
    print(f"  {pct}% de {n} resultados presenta señales fuertes de baja calidad")
    print(f"  {clean} limpios / {doubtful} dudosos / {len(high)} alta sospecha")
    if shared_ips:
        print("  ⚑ IPs compartidas (posible coordinación):")
        for ip, ds in shared_ips.items():
            print(f"      {ip}: {', '.join(ds)}")
    print()


# ─── DB mode (cron / GitHub Actions) ──────────────────────────────────────────

def run_from_db() -> int:
    """Toma UN job PENDING, lo procesa y lo marca DONE/PENDING/FAILED.

    Imports diferidos: el modo checkpoint no necesita psycopg ni DATABASE_URL.
    """
    from . import db
    from .pipeline import process_job
    from .providers.base import SerpRateLimited

    with db.connect() as conn:
        job = db.claim_pending_job(conn)
        if not job:
            print("Sin jobs PENDING.")
            return 0

        print(f"▶ Procesando job {job['id']}: «{job['keyword']}» "
              f"({job['region']}) → {job['email']}  [intento {job['attempts']}]")
        try:
            result = process_job(conn, job)
        except SerpRateLimited as exc:
            status = db.requeue_or_fail(conn, job["id"], job["attempts"],
                                        f"SERP rate-limited: {exc}")
            print(f"⚠ Rate-limit del buscador → job queda {status}.")
            return 0
        except Exception as exc:  # noqa: BLE001 — cualquier fallo decide PENDING/FAILED
            status = db.requeue_or_fail(conn, job["id"], job["attempts"], repr(exc))
            print(f"⚠ Error procesando → job queda {status}: {exc}", file=sys.stderr)
            return 0 if status == "PENDING" else 1

        db.mark_done(conn, job["id"], result)
        print(f"✓ Job {job['id']} DONE. Informe enviado a {job['email']}.")
        return 0


# ─── CLI ──────────────────────────────────────────────────────────────────────

def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Detector de granjas de contenido SEO.")
    parser.add_argument("--keyword", help="Keyword a analizar (modo checkpoint).")
    parser.add_argument("--region", default=settings.DEFAULT_REGION,
                        choices=sorted(settings.VALID_REGIONS))
    parser.add_argument("--max-results", type=int, default=settings.DEFAULT_MAX_RESULTS)
    parser.add_argument("--json", action="store_true", help="Salida JSON en vez de tabla.")
    parser.add_argument("--from-db", action="store_true", help="Toma un job PENDING de la DB.")
    parser.add_argument("--save-html", metavar="PATH",
                        help="Renderiza el informe HTML a un archivo (preview, sin enviar).")
    parser.add_argument("--send-to", metavar="EMAIL",
                        help="Renderiza y envía el informe por Resend a ese email.")
    parser.add_argument("-v", "--verbose", action="store_true")
    args = parser.parse_args(argv)

    _load_env()
    _setup_logging(args.verbose)

    if args.from_db:
        return run_from_db()

    if not args.keyword:
        parser.error("indicá --keyword o --from-db")

    try:
        profiles = asyncio.run(run_keyword(args.keyword, args.region, args.max_results))
    except SerpRateLimited as exc:
        print(f"⚠ Rate-limit del buscador tras los reintentos: {exc}", file=sys.stderr)
        print("  (En producción el job quedaría PENDING para el próximo cron.)", file=sys.stderr)
        return 2

    if not profiles:
        return 0

    scored, ctx = analyze(profiles)
    networks = build_networks(scored, ctx)
    _print_profiles(profiles, scored, networks, args.json)

    if args.save_html or args.send_to:
        from .report.render import render_report

        report = render_report(args.keyword, args.region, scored, networks)
        if args.save_html:
            from pathlib import Path

            Path(args.save_html).write_text(report.html, encoding="utf-8")
            print(f"\n📄 Informe HTML guardado en {args.save_html}")
        if args.send_to:
            from .emailer import EmailError, send_report

            try:
                email_id = send_report(args.send_to, report)
                print(f"\n✉  Informe enviado a {args.send_to} (id={email_id})")
            except EmailError as exc:
                print(f"\n⚠ No se pudo enviar el email: {exc}", file=sys.stderr)
                return 3
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
