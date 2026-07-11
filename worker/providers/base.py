"""Interfaz de proveedor de SERP.

Todo el pipeline habla contra `SerpProvider`, nunca contra DuckDuckGo directo. Cambiar
a Serper.dev / Brave más adelante es implementar esta interfaz y nada más.
"""

from __future__ import annotations

from abc import ABC, abstractmethod

from ..models import SerpResult


class SerpRateLimited(Exception):
    """El proveedor agotó los reintentos por rate-limit. El job vuelve a PENDING."""


class SerpProvider(ABC):
    name: str = "abstract"

    @abstractmethod
    def search(self, keyword: str, region: str, max_results: int) -> list[SerpResult]:
        """Devuelve resultados deduplicados por dominio registrable, en orden de ranking.

        No garantiza `max_results` elementos: el buscador puede devolver menos.
        Lanza `SerpRateLimited` si no pudo obtener nada tras los reintentos.
        """
        raise NotImplementedError
