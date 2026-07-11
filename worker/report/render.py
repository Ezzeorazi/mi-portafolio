"""Render del informe (email HTML) con Jinja2.

El informe es honesto por diseño: nunca afirma "esto es una granja", sino "presenta N
señales de baja calidad / coordinación", y declara la fuente de datos (DuckDuckGo,
región) y el carácter probabilístico del score.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape

from ..clustering import DetectedNetwork
from ..config import settings, weights
from ..scoring import ScoredDomain

_TEMPLATES_DIR = Path(__file__).parent
_env = Environment(
    loader=FileSystemLoader(str(_TEMPLATES_DIR)),
    autoescape=select_autoescape(["html", "j2"]),
)

# Colores de la identidad del sitio por clasificación.
_BADGE = {
    weights.CLASS_CLEAN: "#4ade80",
    weights.CLASS_DOUBTFUL: "#f5d805",
    weights.CLASS_HIGH: "#fd02d1",
}

# Etiquetas legibles de respaldo cuando la señal no trae evidencia con texto.
_SIGNAL_LABELS = {
    "domain_very_new": "dominio muy nuevo",
    "domain_new": "dominio nuevo",
    "whois_private": "WHOIS privado",
    "suspicious_tld": "TLD de alto abuso",
    "no_author": "sin autor identificable",
    "no_about_page": "sin página 'sobre'",
    "no_contact": "sin contacto",
    "firehose_publishing": "publicación masiva",
    "high_volume_publishing": "alto volumen de publicación",
    "thin_content": "contenido delgado",
    "ad_density": "alta densidad de ads",
    "shared_ip": "IP compartida",
    "shared_asn_and_registrar": "mismo ASN + registrador",
    "template_twin": "template gemelo",
    "registered_same_window": "registro en la misma ventana",
    "established_domain": "dominio establecido",
    "identified_author": "autor identificable",
    "normal_publishing": "publicación normal",
    "institutional": "institucional / medio reconocido",
}


@dataclass
class RenderedReport:
    subject: str
    html: str


def _signal_text(name: str, evidence: str) -> str:
    return evidence or _SIGNAL_LABELS.get(name, name)


def build_context(
    keyword: str,
    region: str,
    scored: list[ScoredDomain],
    networks: list[DetectedNetwork],
) -> dict:
    total = len(scored)
    high = [s for s in scored if s.classification == weights.CLASS_HIGH]
    doubtful = sum(1 for s in scored if s.classification == weights.CLASS_DOUBTFUL)
    clean = sum(1 for s in scored if s.classification == weights.CLASS_CLEAN)
    pct = round(100 * len(high) / total) if total else 0

    results = [
        {
            "position": min(s.positions) if s.positions else "—",
            "domain": s.domain,
            "score": s.score,
            "classification": s.classification,
            "badge": _BADGE.get(s.classification, "#999"),
            # Solo señales de sospecha en la tabla (las que "suman"); las negativas
            # explican por qué NO sube, no aportan al titular.
            "signals": [
                _signal_text(sig.name, sig.evidence)
                for sig in s.top_signals(3)
                if sig.weight > 0
            ],
        }
        for s in scored
    ]

    nets = [
        {
            "domains": n.domains,
            "positions": ", ".join(map(str, n.positions)),
            "shared_ips": n.shared_ips,
            "linked_by": n.linked_by,
        }
        for n in networks
    ]

    return {
        "keyword": keyword,
        "region_label": settings.REGION_LABELS.get(region, region),
        "provider": "DuckDuckGo",
        "analyzed_at": datetime.now(timezone.utc).strftime("%d/%m/%Y"),
        "total": total,
        "pct": pct,
        "high": len(high),
        "doubtful": doubtful,
        "clean": clean,
        "networks": nets,
        "results": results,
        "site_name": settings.SITE_NAME,
        "site_url": settings.SITE_URL,
        "unsubscribe_email": settings.UNSUBSCRIBE_EMAIL,
    }


def render_report(
    keyword: str,
    region: str,
    scored: list[ScoredDomain],
    networks: list[DetectedNetwork],
) -> RenderedReport:
    ctx = build_context(keyword, region, scored, networks)
    html = _env.get_template("template.html.j2").render(**ctx)
    subject = (
        f'"{keyword}" — {ctx["pct"]}% de {ctx["total"]} resultados '
        "con señales de baja calidad"
    )
    return RenderedReport(subject=subject, html=html)
