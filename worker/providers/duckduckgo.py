"""Proveedor de SERP sobre DuckDuckGo vía `ddgs` (sin API key, sin costo).

Reglas del prompt implementadas acá:
  - Reintentos con backoff exponencial (5s, 15s, 45s) ante rate-limit o timeout.
  - Si agota los reintentos, NO se marca FAILED: se lanza `SerpRateLimited` para que
    el caller deje el job en PENDING y lo reintente el próximo cron.
  - No se asume una cantidad fija de resultados.
  - Dedup por dominio registrable (noticias.x.com.ar y x.com.ar son el mismo dominio),
    conservando la primera posición y acumulando todas las posiciones donde aparece.
"""

from __future__ import annotations

import logging
import time

import tldextract

from ..config import settings
from ..models import SerpResult
from .base import SerpProvider, SerpRateLimited

log = logging.getLogger(__name__)


def _registrable_domain(url: str) -> str | None:
    ext = tldextract.extract(url)
    if not ext.domain or not ext.suffix:
        return None
    return f"{ext.domain}.{ext.suffix}".lower()


class DuckDuckGoProvider(SerpProvider):
    name = "duckduckgo"

    def search(
        self, keyword: str, region: str, max_results: int = settings.DEFAULT_MAX_RESULTS
    ) -> list[SerpResult]:
        raw = self._search_with_backoff(keyword, region, max_results)
        return self._dedup(raw)

    # ── Fetch con reintentos ────────────────────────────────────────────────
    def _search_with_backoff(
        self, keyword: str, region: str, max_results: int
    ) -> list[dict]:
        # Import diferido: mantiene el módulo importable sin `ddgs` instalado (tests).
        from ddgs import DDGS
        from ddgs.exceptions import DDGSException

        last_exc: Exception | None = None
        for attempt, delay in enumerate((0, *settings.SERP_RETRY_DELAYS), start=0):
            if delay:
                log.warning(
                    "SERP rate-limit/timeout; reintento %d en %ds", attempt, delay
                )
                time.sleep(delay)
            try:
                # Pausa de cortesía antes de pegarle al buscador.
                time.sleep(settings.SERP_POLITENESS_PAUSE)
                with DDGS() as ddgs:
                    results = list(
                        ddgs.text(
                            keyword,
                            region=region,
                            max_results=max_results,
                        )
                    )
                log.info("SERP ok: %d resultados crudos", len(results))
                return results
            except DDGSException as exc:  # incluye RatelimitException / TimeoutException
                last_exc = exc
                continue
            except Exception as exc:  # timeouts de red u otros transitorios
                last_exc = exc
                continue

        raise SerpRateLimited(
            f"DuckDuckGo agotó los reintentos para {keyword!r}: {last_exc}"
        )

    # ── Normalización + dedup ───────────────────────────────────────────────
    def _dedup(self, raw: list[dict]) -> list[SerpResult]:
        by_domain: dict[str, SerpResult] = {}
        position = 0
        for item in raw:
            url = (item.get("href") or item.get("url") or "").strip()
            if not url:
                continue
            domain = _registrable_domain(url)
            if not domain:
                continue
            position += 1  # posición en el ranking crudo (1-indexed)
            if domain in by_domain:
                by_domain[domain].positions.append(position)
                continue
            by_domain[domain] = SerpResult(
                position=position,
                title=(item.get("title") or "").strip(),
                url=url,
                snippet=(item.get("body") or item.get("snippet") or "").strip(),
                domain=domain,
            )
            by_domain[domain].positions = [position]

        return list(by_domain.values())
