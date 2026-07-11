"""Señales de coordinación: son las más valiosas del informe.

Ver tres dominios distintos en la misma IP con el mismo template rankeando en las
posiciones 4, 7 y 12 es una prueba, no una inferencia. Todas leen del `ScoringContext`,
que ya precomputó los agrupamientos sobre el set completo.
"""

from __future__ import annotations

from ..models import DomainProfile
from .base import ScoringContext, Signal, make


def shared_ip(p: DomainProfile, ctx: ScoringContext) -> Signal:
    others = [d for d in ctx.by_ip.get(p.ip or "", []) if d != p.domain]
    triggered = bool(others)
    ev = f"IP {p.ip} compartida con {', '.join(others)}" if triggered else ""
    return make("shared_ip", triggered, ev)


def shared_asn_and_registrar(p: DomainProfile, ctx: ScoringContext) -> Signal:
    if not (p.asn and p.registrar):
        return make("shared_asn_and_registrar", False)
    group = ctx.by_asn_registrar.get((p.asn, p.registrar), [])
    others = [d for d in group if d != p.domain]
    triggered = bool(others)
    ev = (
        f"mismo ASN ({p.asn}) + registrador ({p.registrar}) que {', '.join(others)}"
        if triggered
        else ""
    )
    return make("shared_asn_and_registrar", triggered, ev)


def template_twin(p: DomainProfile, ctx: ScoringContext) -> Signal:
    twins = ctx.template_twins.get(p.domain, set())
    triggered = bool(twins)
    ev = f"estructura HTML casi idéntica a {', '.join(sorted(twins))}" if triggered else ""
    return make("template_twin", triggered, ev)


def registered_same_window(p: DomainProfile, ctx: ScoringContext) -> Signal:
    peers = ctx.same_window.get(p.domain, set())
    triggered = bool(peers)
    ev = f"registrado en la misma ventana que {', '.join(sorted(peers))}" if triggered else ""
    return make("registered_same_window", triggered, ev)
