"""Tests de la huella de propietario común y del guard de CDN.

Son las señales que se agregaron para reemplazar a `shared_ip`, que quedó inservible
cuando media web se mudó detrás de un CDN: con IPs de Cloudflare, dos sitios sin
relación comparten IP y dos sitios de la misma granja no. Lo que no se puede disfrazar
es la cuenta que cobra la publicidad.
"""

from __future__ import annotations

from worker.clustering import build_networks
from worker.config import weights
from worker.enrich.domain import _extract_tracker_ids, _favicon_candidates, _looks_like_cdn
from worker.scoring import analyze
from worker.signals import build_context
from worker.signals import coordination
from worker.signals.base import own_nameservers

from .conftest import make_profile


# ─── Extracción de ids del HTML ───────────────────────────────────────────────

FULL_HTML = """<html><head>
<script src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"></script>
<script src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ9"></script>
<script>gtag("config", "UA-12345678-3");</script>
<script>(function(w,d,s,l,i){})(window,document,"script","dataLayer","GTM-WX4Z9KP");</script>
<script>fbq("init", "1234567890123456");</script>
<link rel="shortcut icon" href="/assets/fav.png">
</head><body><a href="https://www.amazon.com/dp/B01?tag=misitio-20">comprar</a></body></html>"""


def test_extract_tracker_ids_detects_every_provider():
    ids = _extract_tracker_ids(FULL_HTML)
    assert "adsense:1234567890123456" in ids
    assert "ga4:ABC123XYZ9" in ids
    assert "ua:12345678-3" in ids
    assert "gtm:WX4Z9KP" in ids
    assert "fbpixel:1234567890123456" in ids
    assert "amazon:MISITIO-20" in ids


def test_extract_tracker_ids_ignores_prose():
    # Texto que se parece pero no lo es: sin estos límites, cualquier palabra con
    # guion dispararía una señal de 35 puntos.
    html = "<html><body><p>G-string, UA-x, tag=hola, GTM-ok</p></body></html>"
    assert _extract_tracker_ids(html) == []


def test_extract_tracker_ids_merges_both_documents():
    home = '<script src="x?client=ca-pub-9999999999999999"></script>'
    ranked = '<script src="https://www.googletagmanager.com/gtag/js?id=G-ZZZ99YY11"></script>'
    ids = _extract_tracker_ids(ranked, home)
    assert ids == ["adsense:9999999999999999", "ga4:ZZZ99YY11"]


def test_extract_tracker_ids_deduplicates():
    html = FULL_HTML + FULL_HTML
    ids = _extract_tracker_ids(html)
    assert len(ids) == len(set(ids))


def test_favicon_candidates_prefers_declared_link():
    urls = _favicon_candidates("https://ejemplo.com/", FULL_HTML)
    assert urls[0] == "https://ejemplo.com/assets/fav.png"
    assert "https://ejemplo.com/favicon.ico" in urls


def test_favicon_candidates_without_html_falls_back_to_conventions():
    assert _favicon_candidates("https://ejemplo.com/", None) == [
        "https://ejemplo.com/favicon.ico",
        "https://ejemplo.com/favicon.png",
    ]


# ─── shared_tracker ───────────────────────────────────────────────────────────

def test_shared_tracker_links_two_domains_with_the_same_adsense():
    a = make_profile("granja-a.com", tracker_ids=["adsense:1234567890123456"])
    b = make_profile("granja-b.com", tracker_ids=["adsense:1234567890123456"])
    ctx = build_context([a, b])

    sig = coordination.shared_tracker(a, ctx)
    assert sig.triggered is True
    assert "granja-b.com" in sig.evidence
    assert "AdSense" in sig.evidence


def test_shared_tracker_does_not_trigger_with_different_ids():
    a = make_profile("a.com", tracker_ids=["adsense:1111111111111111"])
    b = make_profile("b.com", tracker_ids=["adsense:2222222222222222"])
    ctx = build_context([a, b])
    assert coordination.shared_tracker(a, ctx).triggered is False


def test_shared_tracker_does_not_trigger_alone():
    a = make_profile("a.com", tracker_ids=["ga4:ABC123XYZ9"])
    ctx = build_context([a])
    assert coordination.shared_tracker(a, ctx).triggered is False


def test_shared_tracker_is_the_heaviest_signal():
    # Si deja de serlo hay que revisar la calibración: es la única evidencia que
    # sobrevive a cambiar hosting, registrador y plantilla.
    assert weights.WEIGHTS["shared_tracker"] > weights.WEIGHTS["shared_ip"]
    assert weights.WEIGHTS["shared_tracker"] >= max(weights.WEIGHTS.values())


# ─── CDN y shared_ip ──────────────────────────────────────────────────────────

def test_looks_like_cdn_recognizes_providers():
    assert _looks_like_cdn("Cloudflare, Inc.") is True
    assert _looks_like_cdn("Fastly, Inc.") is True
    assert _looks_like_cdn("AKAMAI-AS") is True
    assert _looks_like_cdn("Hetzner Online GmbH") is False
    assert _looks_like_cdn(None) is False


def test_shared_ip_is_muted_behind_a_cdn():
    a = make_profile("a.com", ip="104.21.0.1", org="Cloudflare, Inc.", is_cdn=True)
    b = make_profile("b.com", ip="104.21.0.1", org="Cloudflare, Inc.", is_cdn=True)
    ctx = build_context([a, b])
    assert coordination.shared_ip(a, ctx).triggered is False


def test_shared_ip_still_triggers_on_real_shared_hosting():
    a = make_profile("a.com", ip="192.0.2.10", org="Hetzner Online GmbH")
    b = make_profile("b.com", ip="192.0.2.10", org="Hetzner Online GmbH")
    ctx = build_context([a, b])
    sig = coordination.shared_ip(a, ctx)
    assert sig.triggered is True
    assert "b.com" in sig.evidence


def test_shared_ip_muted_when_only_the_domain_itself_is_behind_a_cdn():
    # La IP que se ve es la del borde del CDN, no la del hosting real: aunque el otro
    # dominio esté en un hosting común, el par no dice nada sobre quién los aloja.
    a = make_profile("a.com", ip="104.21.0.1", org="Cloudflare, Inc.", is_cdn=True)
    b = make_profile("b.com", ip="104.21.0.1", org="Hetzner Online GmbH")
    ctx = build_context([a, b])
    assert coordination.shared_ip(a, ctx).triggered is False


def test_shared_ip_ignores_cdn_peers():
    # El dominio propio no está en un CDN, pero el que comparte la IP sí: el par no
    # prueba nada y no debe sumar.
    a = make_profile("a.com", ip="104.21.0.1", org="Hetzner Online GmbH")
    b = make_profile("b.com", ip="104.21.0.1", org="Cloudflare, Inc.", is_cdn=True)
    ctx = build_context([a, b])
    assert coordination.shared_ip(a, ctx).triggered is False


# ─── favicon y nameservers ────────────────────────────────────────────────────

def test_shared_favicon_links_identical_icons():
    a = make_profile("a.com", favicon_hash="deadbeefdeadbeef")
    b = make_profile("b.com", favicon_hash="deadbeefdeadbeef")
    ctx = build_context([a, b])
    assert coordination.shared_favicon(a, ctx).triggered is True


def test_shared_favicon_ignores_missing_hash():
    a = make_profile("a.com", favicon_hash=None)
    b = make_profile("b.com", favicon_hash=None)
    ctx = build_context([a, b])
    assert coordination.shared_favicon(a, ctx).triggered is False


def test_own_nameservers_filters_mass_providers():
    p = make_profile("a.com", nameservers=["aida.ns.cloudflare.com", "rob.ns.cloudflare.com"])
    assert own_nameservers(p) == ()

    q = make_profile("b.com", nameservers=["ns1.hostingchico.net", "ns2.hostingchico.net"])
    assert own_nameservers(q) == ("ns1.hostingchico.net", "ns2.hostingchico.net")


def test_shared_nameservers_does_not_trigger_on_cloudflare():
    ns = ["aida.ns.cloudflare.com", "rob.ns.cloudflare.com"]
    a = make_profile("a.com", nameservers=ns)
    b = make_profile("b.com", nameservers=ns)
    ctx = build_context([a, b])
    assert coordination.shared_nameservers(a, ctx).triggered is False


def test_shared_nameservers_triggers_on_private_ns():
    ns = ["ns1.hostingchico.net", "ns2.hostingchico.net"]
    a = make_profile("a.com", nameservers=ns)
    b = make_profile("b.com", nameservers=ns)
    ctx = build_context([a, b])
    sig = coordination.shared_nameservers(a, ctx)
    assert sig.triggered is True
    assert "b.com" in sig.evidence


# ─── Integración: red detectada y falsa red evitada ───────────────────────────

def _farm(domain: str, **extra):
    """Perfil con suficientes señales propias para no quedar clasificado LIMPIO."""
    from .conftest import days_ago

    return make_profile(
        domain,
        registered_at=days_ago(60),
        has_author=False,
        has_about=False,
        has_contact=False,
        word_count=120,
        **extra,
    )


def test_network_detected_through_shared_adsense_only():
    # Sin IP compartida, sin template gemelo: la red se sostiene solo en la cuenta
    # de AdSense. Es el caso que antes el detector no veía.
    tracker = ["adsense:1234567890123456"]
    a = _farm("granja-a.com", ip="104.21.0.1", org="Cloudflare, Inc.", is_cdn=True, tracker_ids=tracker)
    b = _farm("granja-b.com", ip="172.67.0.9", org="Cloudflare, Inc.", is_cdn=True, tracker_ids=tracker)

    scored, ctx = analyze([a, b])
    networks = build_networks(scored, ctx)

    assert len(networks) == 1
    assert set(networks[0].domains) == {"granja-a.com", "granja-b.com"}
    assert any("AdSense" in reason for reason in networks[0].linked_by)


def test_no_network_from_sharing_a_cdn_edge_ip():
    # Dos sitios flojos sin nada en común salvo estar detrás de Cloudflare: eso no
    # es una red, y antes se reportaba como tal.
    a = _farm("uno.com", ip="104.21.0.1", org="Cloudflare, Inc.", is_cdn=True)
    b = _farm("dos.com", ip="104.21.0.1", org="Cloudflare, Inc.", is_cdn=True)

    scored, ctx = analyze([a, b])
    assert build_networks(scored, ctx) == []


def test_raw_score_separates_domains_clamped_to_zero():
    from .conftest import days_ago

    neutro = make_profile("neutro.com")
    solido = make_profile(
        "wikipedia.org",
        registered_at=days_ago(8000),
        has_author=True,
        posts_per_day=1.0,
    )
    scored, _ = analyze([neutro, solido])
    by_domain = {s.domain: s for s in scored}

    # Los dos se muestran en 0, pero el margen con que lo son es muy distinto.
    assert by_domain["neutro.com"].score == 0
    assert by_domain["wikipedia.org"].score == 0
    assert by_domain["wikipedia.org"].raw_score < by_domain["neutro.com"].raw_score
    # Y el orden del informe refleja esa diferencia.
    assert scored[-1].domain == "wikipedia.org"


# ─── El informe refleja lo nuevo ──────────────────────────────────────────────

def test_report_shows_the_shared_account_as_network_evidence():
    from worker.report.render import render_report

    tracker = ["adsense:1234567890123456"]
    a = _farm("granja-a.com", positions=[4], tracker_ids=tracker, http_ok=True)
    b = _farm("granja-b.com", positions=[7], tracker_ids=tracker, http_ok=True)
    scored, ctx = analyze([a, b])
    networks = build_networks(scored, ctx)

    report = render_report("prestamos rapidos", "mx-es", scored, networks)
    assert "AdSense" in report.html
    assert "granja-a.com" in report.html and "granja-b.com" in report.html


def test_report_declares_how_many_sites_could_not_be_read():
    from worker.report.render import build_context

    leido = _farm("si-responde.com", positions=[1], http_ok=True)
    bloqueado = _farm("da-403.com", positions=[2], http_ok=False)
    scored, _ = analyze([leido, bloqueado])

    ctx = build_context("keyword", "mx-es", scored, [])
    assert ctx["unreachable_count"] == 1
    assert ctx["unreachable"] == ["da-403.com"]


def test_report_omits_the_coverage_note_when_everything_was_read():
    from worker.report.render import render_report

    a = _farm("a.com", positions=[1], http_ok=True)
    scored, _ = analyze([a])
    html = render_report("k", "mx-es", scored, []).html
    assert "no se dejaron leer" not in html


# ─── Caché ────────────────────────────────────────────────────────────────────

def test_new_fields_survive_a_cache_round_trip():
    # Los campos nuevos viajan dentro del JSON `raw`, sin migración de Prisma.
    from worker.models import DomainProfile

    original = make_profile(
        "granja.com",
        tracker_ids=["adsense:1234567890123456"],
        favicon_hash="deadbeefdeadbeef",
        nameservers=["ns1.hostingchico.net", "ns2.hostingchico.net"],
        is_cdn=True,
    )
    row = original.to_db_dict()
    vuelto = DomainProfile.from_db(row)

    assert vuelto.tracker_ids == original.tracker_ids
    assert vuelto.favicon_hash == original.favicon_hash
    assert vuelto.nameservers == original.nameservers
    assert vuelto.is_cdn is True


def test_profiles_cached_before_these_fields_existed_still_load():
    # Filas viejas de la caché no traen las claves nuevas: deben caer en su default
    # en vez de romper el job hasta que expire el TTL de 30 días.
    from worker.models import DomainProfile

    fila_vieja = {
        "domain": "viejo.com",
        "registeredAt": None, "registrar": None, "whoisPrivate": None,
        "ip": "1.2.3.4", "asn": "AS1", "org": "Hosting",
        "sitemapUrls": None, "postsPerDay": None,
        "hasAuthor": None, "hasAbout": None, "hasContact": None,
        "domSignature": None, "fetchedAt": None,
        "raw": {"positions": [1], "tld": "com"},
    }
    p = DomainProfile.from_db(fila_vieja)
    assert p.tracker_ids == []
    assert p.favicon_hash is None
    assert p.nameservers == []
    assert p.is_cdn is False


# ─── Cierre del informe ───────────────────────────────────────────────────────

def test_cta_names_the_network_when_there_is_one():
    from worker.report.render import _build_cta

    cta = _build_cta("prestamos rapidos", pct=40, weak=3, total=10, networks=1)
    assert "red" in cta["title"].lower()
    assert "un grupo de sitios coordinados" in cta["text"]
    assert "prestamos rapidos" in cta["text"]


def test_cta_pluralizes_several_networks():
    from worker.report.render import _build_cta

    cta = _build_cta("k", pct=40, weak=3, total=10, networks=3)
    assert "3 grupos de sitios coordinados" in cta["text"]
    assert "redes" in cta["title"].lower()


def test_cta_changes_message_for_a_strong_serp():
    from worker.report.render import _build_cta

    floja = _build_cta("k", pct=40, weak=6, total=10, networks=0)
    solida = _build_cta("k", pct=0, weak=1, total=10, networks=0)
    assert floja["title"] != solida["title"]
    assert "floja" in floja["title"]
    assert "sólidos" in solida["text"]


def test_cta_links_are_usable():
    from worker.report.render import _build_cta

    cta = _build_cta("seguros de auto", pct=0, weak=0, total=5, networks=0)
    assert cta["whatsapp_url"].startswith("https://wa.me/")
    assert "seguros" in cta["whatsapp_url"]  # el keyword viaja en el mensaje
    assert cta["contact_url"].startswith("https://")
    assert "/contacto?servicio=" in cta["contact_url"]


def test_report_html_includes_the_cta_buttons():
    from worker.report.render import render_report

    a = _farm("a.com", positions=[1], http_ok=True)
    scored, _ = analyze([a])
    html = render_report("prestamos", "mx-es", scored, []).html
    assert "wa.me" in html
    assert "Pedir presupuesto" in html
