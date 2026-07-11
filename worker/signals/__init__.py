"""Registro central de señales.

Agregar una señal nueva = escribir la función pura en el módulo que corresponda e
incluirla en `ALL_SIGNALS`. El peso se define aparte, en `config/weights.py`.
"""

from __future__ import annotations

from typing import Callable

from ..models import DomainProfile
from . import content, coordination, domain, negative
from .base import ScoringContext, Signal, build_context

SignalFn = Callable[[DomainProfile, ScoringContext], Signal]

ALL_SIGNALS: list[SignalFn] = [
    # Dominio
    domain.domain_very_new,
    domain.domain_new,
    domain.whois_private,
    domain.suspicious_tld,
    # Contenido
    content.no_author,
    content.no_about_page,
    content.no_contact,
    content.firehose_publishing,
    content.high_volume_publishing,
    content.thin_content,
    content.ad_density,
    # Coordinación
    coordination.shared_ip,
    coordination.shared_asn_and_registrar,
    coordination.template_twin,
    coordination.registered_same_window,
    # Negativas
    negative.established_domain,
    negative.identified_author,
    negative.normal_publishing,
    negative.institutional,
]

__all__ = ["ALL_SIGNALS", "ScoringContext", "Signal", "build_context", "SignalFn"]
