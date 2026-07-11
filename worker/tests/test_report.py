"""Tests del render del informe (Jinja2)."""

from __future__ import annotations

from selectolax.parser import HTMLParser

from worker.clustering import build_networks
from worker.enrich.domain import _dom_shingles
from worker.report.render import render_report
from worker.scoring import analyze

from .conftest import days_ago, load_fixture, make_profile

_SUSPECT = dict(
    registered_at=days_ago(60), has_author=False, has_about=False,
    has_contact=False, posts_per_day=35, word_count=180, ad_slots=9,
)


def _sample():
    sh_a = _dom_shingles(HTMLParser(load_fixture("twin_a.html")))
    sh_b = _dom_shingles(HTMLParser(load_fixture("twin_b.html")))
    a = make_profile(domain="granja1.xyz", ip="5.5.5.5", dom_shingles=sh_a,
                     positions=[4], **_SUSPECT)
    b = make_profile(domain="granja2.xyz", ip="5.5.5.5", dom_shingles=sh_b,
                     positions=[7], **_SUSPECT)
    legit = make_profile(
        domain="forbes.com.mx", ip="9.9.9.9", positions=[1],
        registered_at=days_ago(12 * 365), has_author=True, has_about=True,
        has_contact=True, posts_per_day=25,
    )
    scored, ctx = analyze([a, b, legit])
    return scored, build_networks(scored, ctx)


def test_render_produces_html_with_key_sections():
    scored, networks = _sample()
    report = render_report("seguro medico autonomos", "mx-es", scored, networks)

    assert "seguro medico autonomos" in report.subject
    html = report.html
    assert "<html" in html.lower()
    assert "DuckDuckGo" in html          # fuente declarada
    assert "México" in html              # región legible
    assert "Redes detectadas" in html    # hay una red en la muestra
    assert "granja1.xyz" in html and "granja2.xyz" in html
    assert "probabilístico" in html      # metodología honesta
    assert "Darse de baja" in html       # footer de baja


def test_render_without_networks_omits_section():
    legit = make_profile(
        domain="forbes.com.mx", ip="9.9.9.9", positions=[1],
        registered_at=days_ago(12 * 365), has_author=True, has_about=True,
        has_contact=True, posts_per_day=1,
    )
    scored, ctx = analyze([legit])
    networks = build_networks(scored, ctx)
    report = render_report("keyword limpia", "ar-es", scored, networks)

    assert "Redes detectadas" not in report.html
    assert "Argentina" in report.html
