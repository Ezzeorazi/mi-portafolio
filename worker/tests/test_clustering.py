"""Tests del clustering de redes coordinadas."""

from __future__ import annotations

from selectolax.parser import HTMLParser

from worker.clustering import build_networks
from worker.enrich.domain import _dom_shingles
from worker.scoring import analyze

from .conftest import days_ago, load_fixture, make_profile

_SUSPECT = dict(
    registered_at=days_ago(60), has_author=False, has_about=False,
    has_contact=False, posts_per_day=35, word_count=180, ad_slots=9,
)


def test_network_by_shared_ip():
    a = make_profile(domain="a.xyz", ip="5.5.5.5", **_SUSPECT)
    b = make_profile(domain="b.xyz", ip="5.5.5.5", **_SUSPECT)
    c = make_profile(domain="c.xyz", ip="9.9.9.9", **_SUSPECT)  # sospechoso pero aislado
    scored, ctx = analyze([a, b, c])
    nets = build_networks(scored, ctx)

    assert len(nets) == 1
    assert set(nets[0].domains) == {"a.xyz", "b.xyz"}
    assert "5.5.5.5" in nets[0].shared_ips
    assert any("misma IP" in r for r in nets[0].linked_by)


def test_network_by_template_twin():
    sh_a = _dom_shingles(HTMLParser(load_fixture("twin_a.html")))
    sh_b = _dom_shingles(HTMLParser(load_fixture("twin_b.html")))
    a = make_profile(domain="a.xyz", ip="1.1.1.1", dom_shingles=sh_a, **_SUSPECT)
    b = make_profile(domain="b.xyz", ip="2.2.2.2", dom_shingles=sh_b, **_SUSPECT)
    scored, ctx = analyze([a, b])
    nets = build_networks(scored, ctx)

    assert len(nets) == 1
    assert set(nets[0].domains) == {"a.xyz", "b.xyz"}
    assert any("template" in r.lower() for r in nets[0].linked_by)


def test_network_by_asn_registrar_and_window():
    a = make_profile(domain="a.xyz", ip="1.1.1.1", asn="AS1", registrar="Cheap Reg",
                     **{**_SUSPECT, "registered_at": days_ago(200)})
    b = make_profile(domain="b.xyz", ip="2.2.2.2", asn="AS1", registrar="Cheap Reg",
                     **{**_SUSPECT, "registered_at": days_ago(215)})  # <30 días
    scored, ctx = analyze([a, b])
    nets = build_networks(scored, ctx)

    assert len(nets) == 1
    assert any("ASN" in r for r in nets[0].linked_by)


def test_same_asn_registrar_but_far_apart_is_not_a_network():
    a = make_profile(domain="a.xyz", ip="1.1.1.1", asn="AS1", registrar="Cheap Reg",
                     **{**_SUSPECT, "registered_at": days_ago(60)})
    b = make_profile(domain="b.xyz", ip="2.2.2.2", asn="AS1", registrar="Cheap Reg",
                     **{**_SUSPECT, "registered_at": days_ago(900)})  # muy lejos
    scored, ctx = analyze([a, b])
    assert build_networks(scored, ctx) == []


def test_clean_domains_excluded_from_networks():
    # Dos sitios legítimos que comparten IP (ej. CDN) NO deben formar una red.
    legit = dict(
        registered_at=days_ago(10 * 365), has_author=True, has_about=True,
        has_contact=True, posts_per_day=1,
    )
    a = make_profile(domain="forbes.com.mx", ip="104.26.0.1", **legit)
    b = make_profile(domain="rankia.com", ip="104.26.0.1", **legit)
    scored, ctx = analyze([a, b])
    assert build_networks(scored, ctx) == []


def test_three_domain_network_merges_transitively():
    # a-b por IP, b-c por template → una sola red de 3 (componente conexo).
    sh_b = _dom_shingles(HTMLParser(load_fixture("twin_a.html")))
    sh_c = _dom_shingles(HTMLParser(load_fixture("twin_b.html")))
    a = make_profile(domain="a.xyz", ip="7.7.7.7", **_SUSPECT)
    b = make_profile(domain="b.xyz", ip="7.7.7.7", dom_shingles=sh_b, **_SUSPECT)
    c = make_profile(domain="c.xyz", ip="8.8.8.8", dom_shingles=sh_c, **_SUSPECT)
    scored, ctx = analyze([a, b, c])
    nets = build_networks(scored, ctx)

    assert len(nets) == 1
    assert set(nets[0].domains) == {"a.xyz", "b.xyz", "c.xyz"}
