"""Enriquecimiento de dominios: reúne señales públicas de cada dominio único.

Todo asíncrono (`httpx.AsyncClient`) con un semáforo de concurrencia. Cada señal se
obtiene de forma aislada: si falla, se anota en `profile.errors` y queda en `None`,
nunca rompe el job. Fuentes, todas gratuitas y sin API key:
  - RDAP (rdap.org): fecha de registro, registrador, privacidad de WHOIS.
  - DNS A record → IP.
  - ipinfo.io: ASN + organización de hosting.
  - HTML de la home y de la URL rankeada (selectolax/lexbor): autor, contenido, ads, firma DOM,
    e IDs de monetización/medición embebidos (AdSense, Analytics, GTM, Pixel, Amazon).
  - Favicon: hash del contenido (misma imagen exacta = mismo armador del sitio).
  - /sitemap.xml (+ Sitemap de robots.txt): volumen y frecuencia de publicación.
"""

from __future__ import annotations

import asyncio
import hashlib
import logging
import re
import socket
from datetime import datetime, timedelta, timezone
from urllib.parse import urljoin, urlparse

import httpx
from dateutil import parser as dateparser
from selectolax.lexbor import LexborHTMLParser

from ..config import settings
from ..models import DomainProfile, SerpResult
from .whois_fallback import apply_whois_fallback

log = logging.getLogger(__name__)


# ─── Orquestación ─────────────────────────────────────────────────────────────

async def enrich_domains(results: list[SerpResult]) -> list[DomainProfile]:
    """Enriquece todos los dominios en paralelo (concurrencia acotada)."""
    sem = asyncio.Semaphore(settings.ENRICH_CONCURRENCY)
    limits = httpx.Limits(max_connections=settings.ENRICH_CONCURRENCY * 2)
    async with httpx.AsyncClient(
        headers={"User-Agent": settings.BROWSER_UA},
        timeout=settings.HTTP_TIMEOUT,
        follow_redirects=True,
        limits=limits,
    ) as client:
        tasks = [_enrich_one(client, sem, r) for r in results]
        return await asyncio.gather(*tasks)


async def _enrich_one(
    client: httpx.AsyncClient, sem: asyncio.Semaphore, result: SerpResult
) -> DomainProfile:
    async with sem:
        p = DomainProfile(
            domain=result.domain,
            positions=result.positions or [result.position],
            ranked_url=result.url,
        )
        p.tld = result.domain.rsplit(".", 1)[-1]

        home_url = f"https://{result.domain}/"

        # Fetches concurrentes que no dependen entre sí.
        home_html, ranked_html, rdap_json, robots_txt = await asyncio.gather(
            _get_text(client, home_url, settings.MAX_HTML_BYTES),
            _get_text(client, result.url, settings.MAX_HTML_BYTES),
            _get_json(client, settings.RDAP_URL.format(domain=result.domain)),
            _get_text(client, urljoin(home_url, "/robots.txt"), 200_000),
            return_exceptions=True,
        )

        _apply_rdap(p, _unwrap(rdap_json))
        await apply_whois_fallback(p)  # solo si RDAP no trajo fecha (ccTLDs .mx, etc.)
        ranked_host = urlparse(result.url).hostname or result.domain
        await _apply_network(client, p, ranked_host, result.domain)
        _apply_html(p, _unwrap(ranked_html), _unwrap(home_html))
        await _apply_favicon(
            client, p, home_url, _unwrap(home_html), result.url, _unwrap(ranked_html)
        )
        await _apply_sitemap(client, p, home_url, _unwrap(robots_txt))

        p.http_ok = bool(_unwrap(ranked_html) or _unwrap(home_html))
        return p


def _unwrap(value):
    """asyncio.gather(return_exceptions=True) puede devolver excepciones: las neutraliza."""
    return None if isinstance(value, BaseException) else value


# ─── Fetchers de bajo nivel (nunca lanzan) ────────────────────────────────────

async def _get_text(client: httpx.AsyncClient, url: str, max_bytes: int) -> str | None:
    try:
        resp = await client.get(url)
        if resp.status_code >= 400:
            return None
        content = resp.content[:max_bytes]
        return content.decode(resp.encoding or "utf-8", errors="replace")
    except Exception:
        return None


async def _get_bytes(client: httpx.AsyncClient, url: str, max_bytes: int) -> bytes | None:
    try:
        resp = await client.get(url)
        if resp.status_code >= 400:
            return None
        return resp.content[:max_bytes]
    except Exception:
        return None


async def _get_json(client: httpx.AsyncClient, url: str) -> dict | None:
    try:
        resp = await client.get(url, headers={"Accept": "application/json"})
        if resp.status_code >= 400:
            return None
        return resp.json()
    except Exception:
        return None


# ─── RDAP ─────────────────────────────────────────────────────────────────────

def _apply_rdap(p: DomainProfile, data: dict | None) -> None:
    if not data:
        return
    try:
        # Fecha de registro.
        for event in data.get("events", []) or []:
            if event.get("eventAction") == "registration" and event.get("eventDate"):
                p.registered_at = dateparser.parse(event["eventDate"])
                break

        # Registrador: entidad con rol "registrar" → fn de su vCard.
        for ent in data.get("entities", []) or []:
            roles = ent.get("roles", []) or []
            if "registrar" in roles:
                p.registrar = _vcard_fn(ent) or p.registrar

        # Nameservers: vienen en el mismo RDAP. Los de proveedores masivos no sirven
        # (medio internet usa Cloudflare); el filtro de genéricos se aplica al puntuar.
        ns = []
        for entry in data.get("nameservers", []) or []:
            name = (entry.get("ldhName") or "").strip().lower().rstrip(".")
            if name and name not in ns:
                ns.append(name)
        p.nameservers = sorted(ns)

        # Privacidad de WHOIS: heurística sobre remarks/notices/redacciones.
        blob = _json_text(data).lower()
        p.whois_private = any(
            token in blob
            for token in ("redacted for privacy", "data redacted", "privacy", "redacted")
        )
    except Exception as exc:
        p.note_error("rdap", exc)


def _vcard_fn(entity: dict) -> str | None:
    vcard = entity.get("vcardArray")
    if not vcard or len(vcard) < 2:
        return None
    for field in vcard[1]:
        if isinstance(field, list) and field and field[0] == "fn":
            return field[-1] if isinstance(field[-1], str) else None
    return None


def _json_text(data: dict) -> str:
    import json

    try:
        return json.dumps(data)
    except Exception:
        return str(data)


# ─── Red / hosting ────────────────────────────────────────────────────────────

async def _resolve_ip(host: str) -> str | None:
    """Resuelve la IP del host. Prioriza IPv4 (para comparar `shared_ip`), pero cae a
    cualquier familia con un reintento: el resolver a veces falla puntualmente aunque el
    sitio resuelva bien (visto con getaddrinfo AF_INET devolviendo error transitorio)."""
    loop = asyncio.get_running_loop()
    for family in (socket.AF_INET, socket.AF_UNSPEC):
        for attempt in range(2):
            try:
                infos = await loop.getaddrinfo(host, None, family=family)
                if infos:
                    return infos[0][4][0]
            except socket.gaierror:
                if attempt == 0:
                    await asyncio.sleep(0.3)
                    continue
                break
            except Exception:
                break
    return None


async def _apply_network(
    client: httpx.AsyncClient, p: DomainProfile, ranked_host: str, apex: str
) -> None:
    # Muchos dominios no tienen A record en el apex, solo en www o en el subdominio que
    # rankeó. Se prueba el host real del SERP primero, luego el apex y www.apex.
    candidates: list[str] = []
    for h in (ranked_host, apex, f"www.{apex}"):
        if h and h not in candidates:
            candidates.append(h)

    for host in candidates:
        p.ip = await _resolve_ip(host)
        if p.ip:
            break
    if not p.ip:
        p.note_error("dns", RuntimeError(f"no A/AAAA record ({', '.join(candidates)})"))
        return

    ipinfo = await _get_json(client, settings.IPINFO_URL.format(ip=p.ip))
    if ipinfo:
        org = ipinfo.get("org")  # ej. "AS13335 Cloudflare, Inc."
        if org:
            parts = org.split(" ", 1)
            if parts[0].upper().startswith("AS"):
                p.asn = parts[0]
                p.org = parts[1] if len(parts) > 1 else None
            else:
                p.org = org
    p.is_cdn = _looks_like_cdn(p.org)


def _looks_like_cdn(org: str | None) -> bool:
    """La IP pertenece a un CDN/proxy, no al hosting del sitio.

    Importa porque invalida la señal de IP compartida en los dos sentidos: dos sitios
    sin relación comparten la IP del borde de Cloudflare, y dos sitios de la misma
    granja pueden salir por IPs distintas del mismo CDN.
    """
    if not org:
        return False
    low = org.lower()
    return any(hint in low for hint in settings.CDN_ORG_HINTS)


# ─── HTML: autor, contenido, ads, firma DOM ───────────────────────────────────

def _apply_html(p: DomainProfile, ranked_html: str | None, home_html: str | None) -> None:
    primary = ranked_html or home_html
    if not primary:
        return
    try:
        tree = LexborHTMLParser(primary)

        # Contenido delgado.
        body = tree.body or tree.root
        text = body.text(separator=" ", strip=True) if body else ""
        p.word_count = len(text.split())

        # Densidad de ads/afiliados.
        p.ad_slots = _count_ad_slots(tree, primary)

        # Autor identificable (en la página rankeada).
        p.has_author = _detect_author(tree)

        # Firma estructural para detectar templates gemelos.
        p.dom_shingles = _dom_shingles(tree)
        p.dom_signature = _dom_signature(tree)

        # IDs de monetización/medición: la huella de propietario más barata que existe.
        # Se miran los dos HTML porque la home y el artículo no siempre cargan lo mismo.
        p.tracker_ids = _extract_tracker_ids(primary, home_html)
    except Exception as exc:
        p.note_error("html", exc)

    # Páginas "sobre"/"contacto": se buscan en los links de la home (y de la rankeada).
    try:
        links = _collect_hrefs(home_html) | _collect_hrefs(ranked_html)
        p.has_about = _any_path_hint(links, settings.ABOUT_PATH_HINTS)
        p.has_contact = _any_path_hint(links, settings.CONTACT_PATH_HINTS)
    except Exception as exc:
        p.note_error("about_contact", exc)


def _count_ad_slots(tree: LexborHTMLParser, html: str) -> int:
    count = 0
    count += len(tree.css("ins.adsbygoogle"))
    count += len(tree.css("[data-ad-client], [data-ad-slot], [data-ad]"))
    for tag in tree.css("script, iframe"):
        src = (tag.attributes.get("src") or "").lower()
        if any(
            n in src
            for n in ("googlesyndication", "doubleclick", "amazon-adsystem", "/ads")
        ):
            count += 1
    for a in tree.css("a"):
        href = (a.attributes.get("href") or "").lower()
        if any(
            n in href
            for n in ("amzn.to", "tag=", "utm_medium=affiliate", "/aff", "go.redirect")
        ):
            count += 1
    return count


def _detect_author(tree: LexborHTMLParser) -> bool:
    # meta author / article:author
    for meta in tree.css("meta"):
        name = (meta.attributes.get("name") or meta.attributes.get("property") or "").lower()
        if name in ("author", "article:author") and (meta.attributes.get("content") or "").strip():
            return True
    # rel=author
    if tree.css_first('[rel="author"]'):
        return True
    # itemprop / clases de byline
    if tree.css_first('[itemprop="author"], .author, .byline, .post-author, .entry-author'):
        return True
    # JSON-LD con author de tipo Person
    for script in tree.css('script[type="application/ld+json"]'):
        blob = (script.text() or "").lower()
        if '"author"' in blob and '"person"' in blob:
            return True
    return False


def _dom_tags(tree: LexborHTMLParser) -> list[str]:
    tags: list[str] = []
    for node in tree.root.traverse(include_text=False):
        tag = node.tag
        if tag and tag not in ("-text", "-comment", "_comment"):
            tags.append(tag)
    return tags


def _dom_shingles(tree: LexborHTMLParser) -> list[str]:
    tags = _dom_tags(tree)
    k = settings.DOM_SHINGLE_SIZE
    shingles: set[str] = set()
    for i in range(len(tags) - k + 1):
        gram = ">".join(tags[i : i + k])
        shingles.add(hashlib.md5(gram.encode()).hexdigest()[:12])
    return sorted(shingles)


def _dom_signature(tree: LexborHTMLParser) -> str:
    seq = ">".join(_dom_tags(tree))
    return hashlib.md5(seq.encode()).hexdigest()[:16]


def _collect_hrefs(html: str | None) -> set[str]:
    if not html:
        return set()
    tree = LexborHTMLParser(html)
    return {
        (a.attributes.get("href") or "").lower()
        for a in tree.css("a")
        if a.attributes.get("href")
    }


def _any_path_hint(hrefs: set[str], hints: tuple[str, ...]) -> bool:
    for href in hrefs:
        path = urlparse(href).path.lower() if "//" in href else href
        if any(h in path for h in hints):
            return True
    return False


# ─── Huella de propietario común ──────────────────────────────────────────────

# Un mismo ID en dos dominios distintos significa una sola cuenta detrás: es la misma
# persona cobrando la publicidad o midiendo el tráfico. Es la evidencia más fuerte que
# se puede obtener sin pagar un servicio, y la que mejor aguanta los intentos de ocultar
# una red (se puede cambiar el hosting y el registrador, pero no la cuenta que cobra).
_TRACKER_PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    # Google AdSense: el publisher id que cobra.
    ("adsense", re.compile(r"\bca-pub-(\d{10,21})\b", re.I)),
    # Google Analytics 4 y Universal Analytics.
    ("ga4", re.compile(r"\bG-([A-Z0-9]{6,12})\b")),
    ("ua", re.compile(r"\bUA-(\d{4,10}-\d{1,4})\b")),
    # Google Tag Manager.
    ("gtm", re.compile(r"\bGTM-([A-Z0-9]{4,10})\b")),
    # Meta Pixel: fbq('init', '123…').
    ("fbpixel", re.compile(r"fbq\s*\(\s*['\"]init['\"]\s*,\s*['\"](\d{10,20})['\"]", re.I)),
    # Amazon Associates: el store id con el que se cobra la comisión.
    ("amazon", re.compile(r"[?&]tag=([a-z0-9]{2,20}-\d{2})\b", re.I)),
)

# Tope por dominio: un sitio con decenas de IDs es un agregador de etiquetas, y meterlos
# todos solo agranda la superficie de falsos positivos.
_MAX_TRACKERS = 12


def _extract_tracker_ids(*html_docs: str | None) -> list[str]:
    """Extrae los IDs de monetización/medición de uno o más HTML.

    Devuelve etiquetas normalizadas tipo `adsense:1234567890123456`, ordenadas y sin
    repetir, para poder compararlas directamente entre dominios.
    """
    found: set[str] = set()
    for html in html_docs:
        if not html:
            continue
        for kind, pattern in _TRACKER_PATTERNS:
            for match in pattern.finditer(html):
                value = match.group(1)
                if value:
                    found.add(f"{kind}:{value.upper()}")
    return sorted(found)[:_MAX_TRACKERS]


async def _apply_favicon(
    client: httpx.AsyncClient,
    p: DomainProfile,
    home_url: str,
    home_html: str | None,
    ranked_url: str | None = None,
    ranked_html: str | None = None,
) -> None:
    """Hashea el favicon. Dos sitios con el byte-a-byte idéntico salieron del mismo molde.

    Es deliberadamente estricto (hash exacto, no perceptual): un falso positivo acá
    costaría más que perderse una coincidencia.

    Se prueban los dos orígenes porque muchos sitios responden 403 en el apex sin www
    y solo sirven contenido en el host que rankeó (visto con wikipedia.org y milenio.com):
    buscando el favicon únicamente en la home se perdía en sitios perfectamente normales.
    """
    try:
        candidates = _favicon_candidates(home_url, home_html)
        if ranked_url:
            for url in _favicon_candidates(ranked_url, ranked_html):
                if url not in candidates:
                    candidates.append(url)
        for url in candidates:
            data = await _get_bytes(client, url, settings.MAX_FAVICON_BYTES)
            if not data or len(data) < 50:
                continue
            # Un "favicon" que en realidad es la página de error del sitio no sirve.
            if data.lstrip()[:15].lower().startswith((b"<!doctype", b"<html")):
                continue
            p.favicon_hash = hashlib.md5(data).hexdigest()[:16]
            return
    except Exception as exc:
        p.note_error("favicon", exc)


def _favicon_candidates(home_url: str, home_html: str | None) -> list[str]:
    """El href declarado en el HTML primero; después las rutas convencionales."""
    urls: list[str] = []
    if home_html:
        try:
            tree = LexborHTMLParser(home_html)
            for link in tree.css('link[rel~="icon"], link[rel="shortcut icon"]'):
                href = (link.attributes.get("href") or "").strip()
                if href and not href.startswith("data:"):
                    urls.append(urljoin(home_url, href))
        except Exception:
            pass
    for path in settings.FAVICON_DEFAULT_PATHS:
        urls.append(urljoin(home_url, path))
    # Sin duplicados, conservando el orden de preferencia.
    seen: set[str] = set()
    return [u for u in urls if not (u in seen or seen.add(u))]


# ─── Sitemap: volumen y frecuencia de publicación ─────────────────────────────

_LOC_RE = re.compile(r"<loc>\s*([^<\s]+)\s*</loc>", re.I)
_LASTMOD_RE = re.compile(r"<lastmod>\s*([^<\s]+)\s*</lastmod>", re.I)
_SITEMAP_BLOCK_RE = re.compile(r"<sitemap[\s>].*?</sitemap>", re.I | re.S)


async def _apply_sitemap(
    client: httpx.AsyncClient, p: DomainProfile, home_url: str, robots_txt: str | None
) -> None:
    try:
        sitemap_urls = _sitemaps_from_robots(robots_txt)
        if not sitemap_urls:
            sitemap_urls = [urljoin(home_url, "/sitemap.xml")]

        xml = await _get_text(client, sitemap_urls[0], settings.MAX_SITEMAP_BYTES)
        if not xml:
            return

        # Sitemap index: en vez de los primeros hijos (suelen ser archivo viejo), se
        # siguen los MÁS RECIENTES según su <lastmod>, para estimar bien posts/día.
        if "<sitemapindex" in xml.lower():
            children = _parse_index_children(xml)
            total = 0
            all_lastmods: list[str] = []
            for child_loc in children[: settings.MAX_SITEMAP_CHILDREN]:
                child_xml = await _get_text(client, child_loc, settings.MAX_SITEMAP_BYTES)
                if not child_xml:
                    continue
                total += len(_LOC_RE.findall(child_xml))
                all_lastmods.extend(_LASTMOD_RE.findall(child_xml))
            p.sitemap_urls = total  # muestra de los hijos recientes (no el total global)
            p.posts_per_day = _posts_per_day(all_lastmods)
        else:
            p.sitemap_urls = len(_LOC_RE.findall(xml))
            p.posts_per_day = _posts_per_day(_LASTMOD_RE.findall(xml))
    except Exception as exc:
        p.note_error("sitemap", exc)


def _parse_index_children(xml: str) -> list[str]:
    """Devuelve las URLs de los sitemaps hijos ordenadas por lastmod descendente."""
    pairs: list[tuple[str, str | None]] = []
    for block in _SITEMAP_BLOCK_RE.findall(xml):
        loc_m = _LOC_RE.search(block)
        if not loc_m:
            continue
        lm_m = _LASTMOD_RE.search(block)
        pairs.append((loc_m.group(1), lm_m.group(1) if lm_m else None))
    # lastmod más reciente primero; los que no tienen lastmod van al final.
    pairs.sort(key=lambda t: (t[1] is not None, t[1] or ""), reverse=True)
    return [loc for loc, _ in pairs]


def _sitemaps_from_robots(robots_txt: str | None) -> list[str]:
    if not robots_txt:
        return []
    out = []
    for line in robots_txt.splitlines():
        if line.lower().startswith("sitemap:"):
            out.append(line.split(":", 1)[1].strip())
    return out


def _posts_per_day(lastmods: list[str]) -> float | None:
    dates: list[datetime] = []
    for raw in lastmods:
        try:
            d = dateparser.parse(raw)
            if d.tzinfo is None:
                d = d.replace(tzinfo=timezone.utc)
            dates.append(d)
        except Exception:
            continue
    if len(dates) < 2:
        return None

    now = datetime.now(timezone.utc)
    window = timedelta(days=settings.SITEMAP_RECENT_WINDOW_DAYS)
    recent = [d for d in dates if now - d <= window]
    if recent:
        return round(len(recent) / settings.SITEMAP_RECENT_WINDOW_DAYS, 2)

    # Sin actividad reciente: promedio sobre el rango total observado.
    span_days = max((max(dates) - min(dates)).total_seconds() / 86400.0, 1.0)
    return round(len(dates) / span_days, 2)
