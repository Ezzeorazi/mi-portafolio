"""Utilidades compartidas por los tests."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from pathlib import Path

from worker.models import DomainProfile

FIXTURES = Path(__file__).parent / "fixtures"


def load_fixture(name: str) -> str:
    return (FIXTURES / name).read_text(encoding="utf-8")


def days_ago(days: float) -> datetime:
    return datetime.now(timezone.utc) - timedelta(days=days)


def make_profile(domain: str = "ejemplo.com", **kwargs) -> DomainProfile:
    """Construye un DomainProfile con overrides — atajo para los tests de señales."""
    p = DomainProfile(domain=domain)
    p.tld = domain.rsplit(".", 1)[-1]
    for key, value in kwargs.items():
        setattr(p, key, value)
    return p
