"""Estructuras de datos compartidas por el pipeline del worker.

`DomainProfile` es el objeto central: reúne todas las señales públicas de un dominio
antes de que el motor de scoring (paso 3) las evalúe. Los campos con nombre camelCase
del modelo Prisma `SerpDomainProfile` se mapean en `to_db_dict()`.
"""

from __future__ import annotations

from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from typing import Any


@dataclass
class SerpResult:
    """Un resultado individual del buscador, ya normalizado y deduplicado por dominio."""

    position: int  # primera posición en la que aparece el dominio (1-indexed)
    title: str
    url: str
    snippet: str
    domain: str  # dominio registrable (ej. ejemplo.com.ar)
    positions: list[int] = field(default_factory=list)  # todas sus posiciones en el SERP


@dataclass
class DomainProfile:
    """Perfil enriquecido de un dominio único del set de resultados.

    Cada campo es opcional: si una señal no se pudo obtener queda en `None` y el
    scoring lo trata como "desconocido" en vez de romper el job.
    """

    domain: str

    # Posiciones en las que este dominio aparece en el SERP (puede rankear varias veces).
    positions: list[int] = field(default_factory=list)
    ranked_url: str | None = None  # primera URL rankeada (la que se fetchea)

    # ── Registro (RDAP) ──────────────────────────────────────────────────────
    registered_at: datetime | None = None
    registrar: str | None = None
    whois_private: bool | None = None

    # ── Red / hosting ────────────────────────────────────────────────────────
    ip: str | None = None
    asn: str | None = None
    org: str | None = None

    # ── Publicación (sitemap) ────────────────────────────────────────────────
    sitemap_urls: int | None = None
    posts_per_day: float | None = None

    # ── Contenido (HTML) ─────────────────────────────────────────────────────
    has_author: bool | None = None
    has_about: bool | None = None
    has_contact: bool | None = None
    word_count: int | None = None
    ad_slots: int | None = None

    # ── Estructura (para detectar templates gemelos) ─────────────────────────
    dom_signature: str | None = None  # hash corto de identidad
    dom_shingles: list[str] = field(default_factory=list)  # set de shingles p/ Jaccard

    # ── Metadata ─────────────────────────────────────────────────────────────
    tld: str | None = None
    http_ok: bool = False
    fetched_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    errors: list[str] = field(default_factory=list)  # fallos por señal, no fatales

    def note_error(self, where: str, exc: Exception) -> None:
        self.errors.append(f"{where}: {type(exc).__name__}: {exc}")

    def age_days(self) -> float | None:
        if self.registered_at is None:
            return None
        now = datetime.now(timezone.utc)
        reg = self.registered_at
        if reg.tzinfo is None:
            reg = reg.replace(tzinfo=timezone.utc)
        return (now - reg).total_seconds() / 86400.0

    def to_db_dict(self) -> dict[str, Any]:
        """Mapea a las columnas camelCase de `SerpDomainProfile` (Prisma)."""
        return {
            "domain": self.domain,
            "registeredAt": self.registered_at,
            "registrar": self.registrar,
            "whoisPrivate": self.whois_private,
            "ip": self.ip,
            "asn": self.asn,
            "org": self.org,
            "sitemapUrls": self.sitemap_urls,
            "postsPerDay": self.posts_per_day,
            "hasAuthor": self.has_author,
            "hasAbout": self.has_about,
            "hasContact": self.has_contact,
            "domSignature": self.dom_signature,
            "fetchedAt": self.fetched_at,
            "raw": {
                "positions": self.positions,
                "ranked_url": self.ranked_url,
                "tld": self.tld,
                "word_count": self.word_count,
                "ad_slots": self.ad_slots,
                "dom_shingles": self.dom_shingles,
                "http_ok": self.http_ok,
                "errors": self.errors,
            },
        }

    @classmethod
    def from_db(cls, row: dict[str, Any]) -> "DomainProfile":
        """Reconstruye un perfil desde una fila cacheada de `SerpDomainProfile`.

        Las posiciones en el SERP son específicas de cada consulta; el caller las
        sobreescribe con las del resultado actual (no se cachean).
        """
        raw = row.get("raw") or {}
        p = cls(domain=row["domain"])
        p.registered_at = row.get("registeredAt")
        p.registrar = row.get("registrar")
        p.whois_private = row.get("whoisPrivate")
        p.ip = row.get("ip")
        p.asn = row.get("asn")
        p.org = row.get("org")
        p.sitemap_urls = row.get("sitemapUrls")
        p.posts_per_day = row.get("postsPerDay")
        p.has_author = row.get("hasAuthor")
        p.has_about = row.get("hasAbout")
        p.has_contact = row.get("hasContact")
        p.dom_signature = row.get("domSignature")
        if row.get("fetchedAt"):
            p.fetched_at = row["fetchedAt"]
        p.tld = raw.get("tld")
        p.word_count = raw.get("word_count")
        p.ad_slots = raw.get("ad_slots")
        p.dom_shingles = raw.get("dom_shingles") or []
        p.http_ok = raw.get("http_ok", False)
        return p

    def as_console_dict(self) -> dict[str, Any]:
        """Versión legible para imprimir en el checkpoint humano."""
        d = asdict(self)
        d.pop("dom_shingles", None)  # ruidoso; no aporta a la lectura manual
        age = self.age_days()
        d["age_days"] = round(age, 1) if age is not None else None
        d["registered_at"] = (
            self.registered_at.date().isoformat() if self.registered_at else None
        )
        d["fetched_at"] = self.fetched_at.isoformat(timespec="seconds")
        return d
