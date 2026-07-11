"""Envío del informe por Resend (free tier, sin servidor SMTP propio).

Se llama `emailer` y no `email` para no ensombrecer el módulo `email` de la stdlib.
"""

from __future__ import annotations

import logging
import os

from .config import settings
from .report.render import RenderedReport

log = logging.getLogger(__name__)


class EmailError(RuntimeError):
    pass


def send_report(to: str, report: RenderedReport) -> str:
    """Envía el informe y devuelve el id del email de Resend. Lanza EmailError si falla."""
    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        raise EmailError("Falta RESEND_API_KEY en el entorno.")

    import resend

    resend.api_key = api_key
    try:
        resp = resend.Emails.send(
            {
                "from": settings.RESEND_FROM,
                "to": [to],
                "subject": report.subject,
                "html": report.html,
            }
        )
    except Exception as exc:  # la lib puede lanzar varios tipos; se normaliza
        raise EmailError(f"Resend rechazó el envío: {exc}") from exc

    email_id = resp.get("id") if isinstance(resp, dict) else getattr(resp, "id", None)
    log.info("Informe enviado a %s (id=%s)", to, email_id)
    return email_id or ""
