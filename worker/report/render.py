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
    "shared_tracker": "misma cuenta de publicidad/medición",
    "shared_ip": "IP compartida",
    "shared_asn_and_registrar": "mismo ASN + registrador",
    "template_twin": "template gemelo",
    "shared_favicon": "mismo favicon",
    "shared_nameservers": "mismos nameservers",
    "registered_same_window": "registro en la misma ventana",
    "established_domain": "dominio establecido",
    "identified_author": "autor identificable",
    "normal_publishing": "publicación normal",
    "institutional": "institucional / medio reconocido",
}


def _build_cta(keyword: str, pct: int, weak: int, total: int, networks: int) -> dict:
    """Cierre del informe, redactado según lo que el análisis encontró.

    Un informe que termina en "darse de baja" deja al lector sin paso siguiente. Lo
    que sigue no es el mismo mensaje para todos: una SERP floja es una oportunidad de
    posicionarse y una SERP sólida es un problema distinto, y conviene decirlo así.
    """
    from urllib.parse import quote

    if networks:
        grupos = (
            "un grupo de sitios coordinados"
            if networks == 1
            else f"{networks} grupos de sitios coordinados"
        )
        titulo = (
            "Hay una red operando en este keyword"
            if networks == 1
            else "Hay varias redes operando en este keyword"
        )
        texto = (
            f"Detectamos {grupos} entre los resultados de «{keyword}». Compiten con "
            "contenido en escala, no con calidad: es un hueco para un sitio bien hecho."
        )
    elif pct >= 30 or weak > total / 2:
        titulo = "Esta primera página es más floja de lo que parece"
        texto = (
            f"{weak} de {total} resultados de «{keyword}» muestran señales de baja "
            "calidad (sin autor, contenido delgado, publicación en escala). Rankear "
            "acá es más barato de lo que sugiere el volumen."
        )
    else:
        titulo = "¿Querés competir en este keyword?"
        texto = (
            f"Los resultados de «{keyword}» son sitios sólidos: acá no alcanza con "
            "publicar, hace falta una estrategia de contenido y SEO técnico."
        )

    asunto = f"Vi el informe de «{keyword}» y quiero rankear ahí"
    return {
        "title": titulo,
        "text": texto,
        "whatsapp_url": (
            f"https://wa.me/{settings.WHATSAPP_NUMBER}?text={quote(asunto)}"
        ),
        "contact_url": (
            f"{settings.SITE_URL}{settings.CONTACT_PATH}"
            f"?servicio={quote(f'SEO / contenido ({keyword})')}"
        ),
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
    # Sitios que no se dejaron leer (403 de un WAF anti-bot, timeouts). Sus señales de
    # contenido quedan en blanco, así que el informe lo dice en vez de disimularlo:
    # un porcentaje sobre datos parciales no se lee igual que uno completo.
    unreachable = [
        s.domain for s in scored if s.profile is not None and not s.profile.http_ok
    ]

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
        "unreachable": unreachable,
        "unreachable_count": len(unreachable),
        "cta": _build_cta(
            keyword, pct, len(high) + doubtful, total, len(networks)
        ),
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
