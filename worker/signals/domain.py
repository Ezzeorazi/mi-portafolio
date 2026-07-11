"""Señales a nivel dominio: edad, privacidad de WHOIS, TLD."""

from __future__ import annotations

from ..config import weights
from ..models import DomainProfile
from .base import ScoringContext, Signal, make


def domain_very_new(p: DomainProfile, ctx: ScoringContext) -> Signal:
    age = p.age_days()
    triggered = age is not None and age < weights.DOMAIN_VERY_NEW_DAYS
    ev = f"registrado hace {age:.0f} días" if triggered else ""
    return make("domain_very_new", triggered, ev)


def domain_new(p: DomainProfile, ctx: ScoringContext) -> Signal:
    age = p.age_days()
    triggered = (
        age is not None
        and weights.DOMAIN_VERY_NEW_DAYS <= age < weights.DOMAIN_NEW_MAX_DAYS
    )
    ev = f"registrado hace {age:.0f} días" if triggered else ""
    return make("domain_new", triggered, ev)


def whois_private(p: DomainProfile, ctx: ScoringContext) -> Signal:
    triggered = p.whois_private is True
    return make("whois_private", triggered, "privacidad de WHOIS activa" if triggered else "")


def suspicious_tld(p: DomainProfile, ctx: ScoringContext) -> Signal:
    tld = (p.tld or "").lower()
    triggered = tld in weights.SUSPICIOUS_TLDS
    return make("suspicious_tld", triggered, f".{tld}" if triggered else "")
