"""Señales negativas (indicios de legitimidad) — imprescindibles.

Sin estas, cualquier medio grande y legítimo (que publica 30 notas/día y tiene WHOIS
privado) daría "alta sospecha" y el informe perdería credibilidad al primer test. Restan
del score (peso negativo en `config/weights`).
"""

from __future__ import annotations

from ..config import weights
from ..models import DomainProfile
from .base import ScoringContext, Signal, make


def established_domain(p: DomainProfile, ctx: ScoringContext) -> Signal:
    age = p.age_days()
    triggered = age is not None and age > weights.ESTABLISHED_DAYS
    ev = f"dominio con {age / 365:.1f} años" if triggered else ""
    return make("established_domain", triggered, ev)


def identified_author(p: DomainProfile, ctx: ScoringContext) -> Signal:
    # Proxy: detectamos autoría estructurada (byline / schema Person / meta author).
    triggered = p.has_author is True
    return make("identified_author", triggered, "autor identificable" if triggered else "")


def normal_publishing(p: DomainProfile, ctx: ScoringContext) -> Signal:
    ppd = p.posts_per_day
    triggered = ppd is not None and ppd < weights.NORMAL_MAX_PER_DAY
    ev = f"{ppd:.1f} publicaciones/día" if triggered else ""
    return make("normal_publishing", triggered, ev)


def institutional(p: DomainProfile, ctx: ScoringContext) -> Signal:
    domain = p.domain.lower()
    is_gov_edu = any(domain.endswith(suf) for suf in weights.INSTITUTIONAL_SUFFIXES)
    is_media = domain in weights.RECOGNIZED_MEDIA
    triggered = is_gov_edu or is_media
    ev = (
        "dominio gubernamental/educativo" if is_gov_edu
        else "medio reconocido" if is_media
        else ""
    )
    return make("institutional", triggered, ev)
