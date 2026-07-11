"""Tests unitarios de cada señal + el scoring completo."""

from __future__ import annotations

from selectolax.parser import HTMLParser

from worker.config import weights
from worker.enrich.domain import _dom_shingles
from worker.scoring import score_all, score_profile
from worker.signals import build_context
from worker.signals import content, coordination, domain, negative

from .conftest import days_ago, load_fixture, make_profile


def _ctx(profiles):
    return build_context(profiles)


def _solo_ctx(p):
    """Contexto de un solo dominio (para señales que no son de coordinación)."""
    return build_context([p])


# ─── Señales de dominio ───────────────────────────────────────────────────────

def test_domain_very_new():
    p = make_profile(registered_at=days_ago(100))
    assert domain.domain_very_new(p, _solo_ctx(p)).triggered is True
    p2 = make_profile(registered_at=days_ago(300))
    assert domain.domain_very_new(p2, _solo_ctx(p2)).triggered is False


def test_domain_new_band():
    p = make_profile(registered_at=days_ago(300))  # entre 6 y 18 meses
    assert domain.domain_new(p, _solo_ctx(p)).triggered is True


def test_domain_age_unknown_does_not_trigger():
    p = make_profile(registered_at=None)
    assert domain.domain_very_new(p, _solo_ctx(p)).triggered is False
    assert negative.established_domain(p, _solo_ctx(p)).triggered is False


def test_whois_private():
    assert domain.whois_private(make_profile(whois_private=True), _solo_ctx(make_profile())).triggered
    assert not domain.whois_private(make_profile(whois_private=False), _solo_ctx(make_profile())).triggered


def test_suspicious_tld():
    p = make_profile(domain="oferta.xyz")
    assert domain.suspicious_tld(p, _solo_ctx(p)).triggered is True
    p2 = make_profile(domain="medio.com")
    assert domain.suspicious_tld(p2, _solo_ctx(p2)).triggered is False


# ─── Señales de contenido ─────────────────────────────────────────────────────

def test_no_author_only_on_false():
    assert content.no_author(make_profile(has_author=False), _solo_ctx(make_profile())).triggered
    # Desconocido (None) no debe penalizar.
    assert not content.no_author(make_profile(has_author=None), _solo_ctx(make_profile())).triggered
    assert not content.no_author(make_profile(has_author=True), _solo_ctx(make_profile())).triggered


def test_publishing_bands():
    firehose = make_profile(posts_per_day=30)
    high = make_profile(posts_per_day=10)
    normal = make_profile(posts_per_day=1)
    assert content.firehose_publishing(firehose, _solo_ctx(firehose)).triggered
    assert content.high_volume_publishing(high, _solo_ctx(high)).triggered
    assert negative.normal_publishing(normal, _solo_ctx(normal)).triggered
    # Un firehose no debe contar como normal.
    assert not negative.normal_publishing(firehose, _solo_ctx(firehose)).triggered


def test_thin_content_and_ads():
    assert content.thin_content(make_profile(word_count=120), _solo_ctx(make_profile())).triggered
    assert not content.thin_content(make_profile(word_count=1200), _solo_ctx(make_profile())).triggered
    assert content.ad_density(make_profile(ad_slots=9), _solo_ctx(make_profile())).triggered
    assert not content.ad_density(make_profile(ad_slots=2), _solo_ctx(make_profile())).triggered


# ─── Señales negativas ────────────────────────────────────────────────────────

def test_established_domain():
    p = make_profile(registered_at=days_ago(8 * 365))
    assert negative.established_domain(p, _solo_ctx(p)).triggered is True


def test_institutional():
    gov = make_profile(domain="condusef.gob.mx")
    media = make_profile(domain="forbes.com.mx")
    normal = make_profile(domain="granjacontenido.xyz")
    assert negative.institutional(gov, _solo_ctx(gov)).triggered is True
    assert negative.institutional(media, _solo_ctx(media)).triggered is True
    assert negative.institutional(normal, _solo_ctx(normal)).triggered is False


# ─── Señales de coordinación (necesitan el set completo) ──────────────────────

def test_shared_ip():
    a = make_profile(domain="a.com", ip="1.2.3.4")
    b = make_profile(domain="b.com", ip="1.2.3.4")
    c = make_profile(domain="c.com", ip="9.9.9.9")
    ctx = _ctx([a, b, c])
    assert coordination.shared_ip(a, ctx).triggered is True
    assert coordination.shared_ip(c, ctx).triggered is False


def test_shared_asn_and_registrar():
    a = make_profile(domain="a.com", asn="AS1", registrar="Cheap Reg")
    b = make_profile(domain="b.com", asn="AS1", registrar="Cheap Reg")
    c = make_profile(domain="c.com", asn="AS1", registrar="Otra Reg")  # mismo ASN, distinto reg
    ctx = _ctx([a, b, c])
    assert coordination.shared_asn_and_registrar(a, ctx).triggered is True
    assert coordination.shared_asn_and_registrar(c, ctx).triggered is False


def test_template_twin():
    sh_a = _dom_shingles(HTMLParser(load_fixture("twin_a.html")))
    sh_b = _dom_shingles(HTMLParser(load_fixture("twin_b.html")))
    a = make_profile(domain="a.com", dom_shingles=sh_a)
    b = make_profile(domain="b.com", dom_shingles=sh_b)
    ctx = _ctx([a, b])
    assert coordination.template_twin(a, ctx).triggered is True
    assert b.domain in ctx.template_twins["a.com"]


def test_registered_same_window():
    a = make_profile(domain="a.com", registered_at=days_ago(200))
    b = make_profile(domain="b.com", registered_at=days_ago(210))  # 10 días de diferencia
    c = make_profile(domain="c.com", registered_at=days_ago(900))  # lejos
    ctx = _ctx([a, b, c])
    assert coordination.registered_same_window(a, ctx).triggered is True
    assert coordination.registered_same_window(c, ctx).triggered is False


# ─── Scoring de punta a punta ─────────────────────────────────────────────────

def test_content_farm_scores_high():
    farm = make_profile(
        domain="granja.xyz",
        registered_at=days_ago(60),
        whois_private=True,
        has_author=False,
        has_about=False,
        has_contact=False,
        posts_per_day=40,
        word_count=150,
        ad_slots=10,
    )
    scored = score_profile(farm, _solo_ctx(farm))
    assert scored.classification == weights.CLASS_HIGH
    assert scored.score >= 60


def test_legit_media_scores_clean():
    media = make_profile(
        domain="forbes.com.mx",
        registered_at=days_ago(12 * 365),
        has_author=True,
        has_about=True,
        has_contact=True,
        posts_per_day=25,  # alto volumen, pero es un medio grande
    )
    scored = score_profile(media, _solo_ctx(media))
    assert scored.classification == weights.CLASS_CLEAN


def test_coordinated_network_scores_high_together():
    # Tres dominios nuevos, misma IP, mismo template → red coordinada.
    sh = _dom_shingles(HTMLParser(load_fixture("twin_a.html")))
    sh2 = _dom_shingles(HTMLParser(load_fixture("twin_b.html")))
    common = dict(
        registered_at=days_ago(45), has_author=False, has_about=False,
        ip="5.5.5.5", posts_per_day=35, word_count=200,
    )
    a = make_profile(domain="a.xyz", dom_shingles=sh, **common)
    b = make_profile(domain="b.xyz", dom_shingles=sh2, **common)
    scored = score_all([a, b])
    assert all(s.classification == weights.CLASS_HIGH for s in scored)
