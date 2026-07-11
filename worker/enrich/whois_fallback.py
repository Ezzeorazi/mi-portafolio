"""Fallback de fecha de registro vía WHOIS (puerto 43) para dominios sin RDAP.

rdap.org no cubre varios ccTLD importantes para el público objetivo (.mx, .com.mx,
.gob.mx). WHOIS clásico sí responde para esos, aunque el formato es libre y frágil, por
eso esto es solo un respaldo: consulta acotada por timeout y cualquier fallo → None.
"""

from __future__ import annotations

import asyncio
import logging
from datetime import datetime, timezone

from ..config import settings
from ..models import DomainProfile

log = logging.getLogger(__name__)


def _lookup_creation_date(domain: str) -> datetime | None:
    """Bloqueante: consulta WHOIS y normaliza la fecha de creación. Corre en executor."""
    import whois  # import diferido: la lib abre sockets al importarse en algunos entornos

    data = whois.whois(domain)
    created = data.creation_date if data else None
    if isinstance(created, list):
        created = next((d for d in created if d), None)
    if not isinstance(created, datetime):
        return None
    if created.tzinfo is None:
        created = created.replace(tzinfo=timezone.utc)
    return created


async def apply_whois_fallback(p: DomainProfile) -> None:
    """Completa `registered_at` si RDAP no la trajo. No pisa datos de RDAP."""
    if not settings.WHOIS_FALLBACK_ENABLED or p.registered_at is not None:
        return
    try:
        loop = asyncio.get_running_loop()
        p.registered_at = await asyncio.wait_for(
            loop.run_in_executor(None, _lookup_creation_date, p.domain),
            timeout=settings.WHOIS_TIMEOUT,
        )
        if p.registered_at:
            log.debug("WHOIS fallback OK para %s: %s", p.domain, p.registered_at.date())
    except (asyncio.TimeoutError, Exception) as exc:  # noqa: B014 — respaldo, nunca fatal
        p.note_error("whois", exc)
