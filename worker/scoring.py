"""Motor de scoring: corre todas las señales sobre cada dominio y clasifica.

Score normalizado 0–100 (clampeado). El baseline es 0; las señales de sospecha suman,
las negativas restan. Cada score viene acompañado de las señales que lo generaron —
nunca un número suelto.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from .config import weights
from .models import DomainProfile
from .signals import ALL_SIGNALS, ScoringContext, Signal, build_context


@dataclass
class ScoredDomain:
    domain: str
    positions: list[int]
    score: int
    classification: str
    raw_score: float
    triggered: list[Signal] = field(default_factory=list)
    profile: DomainProfile | None = None

    def top_signals(self, n: int = 3) -> list[Signal]:
        """Las señales más pesadas por magnitud (para la tabla del informe)."""
        return sorted(self.triggered, key=lambda s: abs(s.weight), reverse=True)[:n]


def score_profile(p: DomainProfile, ctx: ScoringContext) -> ScoredDomain:
    signals = [fn(p, ctx) for fn in ALL_SIGNALS]
    triggered = [s for s in signals if s.triggered]
    raw = sum(s.weight for s in triggered)
    score = max(0, min(100, round(raw)))
    return ScoredDomain(
        domain=p.domain,
        positions=p.positions,
        score=score,
        classification=weights.classify(score),
        raw_score=raw,
        triggered=triggered,
        profile=p,
    )


def analyze(profiles: list[DomainProfile]) -> tuple[list[ScoredDomain], ScoringContext]:
    """Puntúa el set y devuelve también el contexto (lo reusa el clustering, paso 4).

    El contexto se construye una sola vez: las señales de coordinación y el clustering
    comparten los mismos agrupamientos de IP/ASN/template/ventana.
    """
    ctx = build_context(profiles)
    scored = [score_profile(p, ctx) for p in profiles]
    scored.sort(key=lambda s: s.score, reverse=True)
    return scored, ctx


def score_all(profiles: list[DomainProfile]) -> list[ScoredDomain]:
    """Puntúa el set completo (atajo cuando no se necesita el contexto)."""
    return analyze(profiles)[0]
