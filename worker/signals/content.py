"""Señales de contenido: autoría, páginas de identidad, volumen, densidad de ads."""

from __future__ import annotations

from ..config import weights
from ..models import DomainProfile
from .base import ScoringContext, Signal, make


def no_author(p: DomainProfile, ctx: ScoringContext) -> Signal:
    # Solo dispara si sabemos que NO hay autor (False). `None` = desconocido, no penaliza.
    triggered = p.has_author is False
    return make("no_author", triggered, "sin autor identificable" if triggered else "")


def no_about_page(p: DomainProfile, ctx: ScoringContext) -> Signal:
    triggered = p.has_about is False
    return make("no_about_page", triggered, "sin página 'sobre'" if triggered else "")


def no_contact(p: DomainProfile, ctx: ScoringContext) -> Signal:
    triggered = p.has_contact is False
    return make("no_contact", triggered, "sin datos de contacto" if triggered else "")


def firehose_publishing(p: DomainProfile, ctx: ScoringContext) -> Signal:
    ppd = p.posts_per_day
    triggered = ppd is not None and ppd > weights.FIREHOSE_PER_DAY
    ev = f"{ppd:.1f} publicaciones/día" if triggered else ""
    return make("firehose_publishing", triggered, ev)


def high_volume_publishing(p: DomainProfile, ctx: ScoringContext) -> Signal:
    ppd = p.posts_per_day
    triggered = (
        ppd is not None
        and weights.HIGH_VOLUME_MIN_PER_DAY <= ppd <= weights.FIREHOSE_PER_DAY
    )
    ev = f"{ppd:.1f} publicaciones/día" if triggered else ""
    return make("high_volume_publishing", triggered, ev)


def thin_content(p: DomainProfile, ctx: ScoringContext) -> Signal:
    wc = p.word_count
    triggered = wc is not None and wc < weights.THIN_CONTENT_WORDS
    ev = f"{wc} palabras" if triggered else ""
    return make("thin_content", triggered, ev)


def ad_density(p: DomainProfile, ctx: ScoringContext) -> Signal:
    slots = p.ad_slots
    triggered = slots is not None and slots > weights.AD_DENSITY_SLOTS
    ev = f"{slots} slots de ads/afiliados" if triggered else ""
    return make("ad_density", triggered, ev)
