"""Tests de las funciones de parseo HTML del enriquecimiento, con fixtures guardados.

Es la parte que más va a cambiar (heurísticas de autor, ads, template); sin estos tests
se rompe sin darse cuenta.
"""

from __future__ import annotations

from selectolax.parser import HTMLParser

from worker.enrich.domain import (
    _apply_html,
    _count_ad_slots,
    _detect_author,
    _dom_shingles,
)
from worker.models import DomainProfile

from .conftest import load_fixture


def test_farm_thin_page_signals():
    p = DomainProfile(domain="granja.example")
    _apply_html(p, ranked_html=load_fixture("farm_thin.html"), home_html=None)

    assert p.has_author is False
    assert p.word_count is not None and p.word_count < 400
    assert p.ad_slots is not None and p.ad_slots > 6  # dispara ad_density


def test_legit_article_signals():
    html = load_fixture("legit_article.html")
    p = DomainProfile(domain="medio.example")
    _apply_html(p, ranked_html=html, home_html=html)

    assert p.has_author is True
    assert p.has_about is True
    assert p.has_contact is True


def test_detect_author_variants():
    assert _detect_author(HTMLParser('<meta name="author" content="Ana">')) is True
    assert _detect_author(HTMLParser('<div class="byline">Por Juan</div>')) is True
    assert _detect_author(HTMLParser("<p>Sin autor por ningun lado</p>")) is False


def test_count_ad_slots_counts_ads_and_affiliates():
    html = load_fixture("farm_thin.html")
    slots = _count_ad_slots(HTMLParser(html), html)
    # 2 ins.adsbygoogle + script googlesyndication + iframe doubleclick + 3 afiliados
    assert slots >= 7


def test_twin_fixtures_have_enough_shingles():
    # El umbral de comparación exige un mínimo de shingles; las fixtures deben superarlo.
    from worker.config import weights

    sh = _dom_shingles(HTMLParser(load_fixture("twin_a.html")))
    assert len(sh) >= weights.TEMPLATE_MIN_SHINGLES
