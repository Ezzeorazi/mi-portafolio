"""Tipos base del motor de señales.

Cada señal es una **función pura** `(DomainProfile, ScoringContext) -> Signal`. No hace
red ni I/O: opera sobre datos ya recolectados en el enriquecimiento. Eso las hace
triviales de testear con fixtures y de recalibrar (los pesos viven en `config/weights`).
"""

from __future__ import annotations

from dataclasses import dataclass, field
from itertools import combinations

from ..config import weights
from ..models import DomainProfile


@dataclass
class Signal:
    name: str
    weight: float
    triggered: bool
    evidence: str = ""


def make(name: str, triggered: bool, evidence: str = "") -> Signal:
    """Helper: arma un Signal tomando el peso desde `config/weights`."""
    return Signal(name=name, weight=weights.WEIGHTS[name], triggered=triggered, evidence=evidence)


@dataclass
class ScoringContext:
    """Datos derivados del set completo de dominios, para las señales de coordinación."""

    profiles: list[DomainProfile]
    by_ip: dict[str, list[str]] = field(default_factory=dict)
    by_asn_registrar: dict[tuple[str, str], list[str]] = field(default_factory=dict)
    template_twins: dict[str, set[str]] = field(default_factory=dict)
    same_window: dict[str, set[str]] = field(default_factory=dict)


def _jaccard(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    inter = len(a & b)
    union = len(a | b)
    return inter / union if union else 0.0


def build_context(profiles: list[DomainProfile]) -> ScoringContext:
    """Precomputa los agrupamientos que necesitan las señales de coordinación."""
    ctx = ScoringContext(profiles=profiles)

    # IP exacta compartida.
    for p in profiles:
        if p.ip:
            ctx.by_ip.setdefault(p.ip, []).append(p.domain)

    # Mismo ASN + mismo registrador.
    for p in profiles:
        if p.asn and p.registrar:
            ctx.by_asn_registrar.setdefault((p.asn, p.registrar), []).append(p.domain)

    # Templates gemelos (Jaccard de shingles por encima del umbral).
    ctx.template_twins = {p.domain: set() for p in profiles}
    comparable = [
        p for p in profiles if len(p.dom_shingles) >= weights.TEMPLATE_MIN_SHINGLES
    ]
    for a, b in combinations(comparable, 2):
        sim = _jaccard(set(a.dom_shingles), set(b.dom_shingles))
        if sim >= weights.TEMPLATE_JACCARD:
            ctx.template_twins[a.domain].add(b.domain)
            ctx.template_twins[b.domain].add(a.domain)

    # Registrados dentro de una ventana chica entre sí.
    ctx.same_window = {p.domain: set() for p in profiles}
    dated = [p for p in profiles if p.registered_at]
    for a, b in combinations(dated, 2):
        delta_days = abs((a.registered_at - b.registered_at).total_seconds()) / 86400.0
        if delta_days <= weights.SAME_WINDOW_DAYS:
            ctx.same_window[a.domain].add(b.domain)
            ctx.same_window[b.domain].add(a.domain)

    return ctx
