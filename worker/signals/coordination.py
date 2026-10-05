"""Señales de coordinación: son las más valiosas del informe.

Ver tres dominios distintos en la misma IP con el mismo template rankeando en las
posiciones 4, 7 y 12 es una prueba, no una inferencia. Todas leen del `ScoringContext`,
que ya precomputó los agrupamientos sobre el set completo.
"""

from __future__ import annotations

from ..models import DomainProfile
from .base import ScoringContext, Signal, make


def shared_ip(p: DomainProfile, ctx: ScoringContext) -> Signal:
    # Detrás de un CDN la IP es del proveedor: compartirla no dice nada del dueño del
    # sitio, ni en un sentido ni en el otro. Antes esto sumaba 30 puntos por estar los
    # dos en el borde de Cloudflare, que es la mitad de la web.
    if p.is_cdn:
        return make("shared_ip", False)
    others = [
        d
        for d in ctx.by_ip.get(p.ip or "", [])
        if d != p.domain and not _is_cdn(ctx, d)
    ]
    triggered = bool(others)
    ev = f"IP {p.ip} compartida con {', '.join(others)}" if triggered else ""
    return make("shared_ip", triggered, ev)


def _is_cdn(ctx: ScoringContext, domain: str) -> bool:
    for other in ctx.profiles:
        if other.domain == domain:
            return other.is_cdn
    return False


def shared_tracker(p: DomainProfile, ctx: ScoringContext) -> Signal:
    """Mismo id de AdSense / Analytics / Tag Manager / Pixel / Amazon que otro dominio.

    La señal más fuerte del set: no es que dos sitios se parezcan, es que los cobra o
    los mide la misma cuenta. Sobrevive a cambiar hosting, registrador y plantilla.
    """
    hits: list[str] = []
    for tracker in p.tracker_ids:
        others = [d for d in ctx.by_tracker.get(tracker, []) if d != p.domain]
        if others:
            hits.append(f"{_tracker_label(tracker)} con {', '.join(sorted(others))}")
    triggered = bool(hits)
    return make("shared_tracker", triggered, "; ".join(hits) if triggered else "")


_TRACKER_LABELS = {
    "adsense": "mismo id de AdSense",
    "ga4": "mismo id de Analytics",
    "ua": "mismo id de Analytics",
    "gtm": "mismo contenedor de Tag Manager",
    "fbpixel": "mismo pixel de Meta",
    "amazon": "mismo id de afiliado de Amazon",
}


def _tracker_label(tracker: str) -> str:
    kind, _, value = tracker.partition(":")
    return f"{_TRACKER_LABELS.get(kind, kind)} ({value})"


def shared_favicon(p: DomainProfile, ctx: ScoringContext) -> Signal:
    """Favicon byte a byte idéntico al de otro dominio del set."""
    others = [
        d for d in ctx.by_favicon.get(p.favicon_hash or "", []) if d != p.domain
    ]
    triggered = bool(others)
    ev = f"favicon idéntico al de {', '.join(sorted(others))}" if triggered else ""
    return make("shared_favicon", triggered, ev)


def shared_nameservers(p: DomainProfile, ctx: ScoringContext) -> Signal:
    """Mismos nameservers propios (los de proveedores masivos ya se filtraron)."""
    from .base import own_nameservers

    own = own_nameservers(p)
    if not own:
        return make("shared_nameservers", False)
    others = [d for d in ctx.by_nameservers.get(own, []) if d != p.domain]
    triggered = bool(others)
    ev = (
        f"mismos nameservers ({', '.join(own)}) que {', '.join(sorted(others))}"
        if triggered
        else ""
    )
    return make("shared_nameservers", triggered, ev)


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
