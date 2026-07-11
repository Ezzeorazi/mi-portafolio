"""Constantes operativas del worker (red, concurrencia, timeouts).

Los PESOS de las señales viven en `worker/config/weights.py` (paso 3), separados a
propósito porque se recalibran seguido. Esto de acá cambia poco.
"""

from __future__ import annotations

# ── SERP ─────────────────────────────────────────────────────────────────────
DEFAULT_MAX_RESULTS = 50
DEFAULT_REGION = "mx-es"
VALID_REGIONS = {"mx-es", "ar-es", "wt-wt"}

# Backoff ante rate-limits del buscador (segundos). El prompt pide 3 intentos.
SERP_RETRY_DELAYS = (5, 15, 45)
# Pausa de cortesía entre requests al buscador para no gatillar el rate-limit.
SERP_POLITENESS_PAUSE = 2.5

# ── Enriquecimiento de dominios ──────────────────────────────────────────────
ENRICH_CONCURRENCY = 10
HTTP_TIMEOUT = 10.0  # segundos por request
# User-agent de browser real: muchos sitios sirven HTML distinto (o 403) a bots.
BROWSER_UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

# Servicios externos gratuitos (sin API key).
RDAP_URL = "https://rdap.org/domain/{domain}"
IPINFO_URL = "https://ipinfo.io/{ip}/json"

# Límites para no descargar sitios enormes.
MAX_HTML_BYTES = 2_000_000  # ~2MB
MAX_SITEMAP_BYTES = 5_000_000
MAX_SITEMAP_CHILDREN = 10  # si hay sitemap index, cuántos hijos seguir
SITEMAP_RECENT_WINDOW_DAYS = 30  # ventana para estimar posts/día

# Fallback WHOIS: RDAP (rdap.org) no cubre varios ccTLD clave (.mx, .com.mx, .gob.mx).
# Cuando RDAP no trae fecha de registro, se consulta WHOIS (puerto 43) con timeout.
# Es más lento/frágil, por eso solo se usa como respaldo y falla en silencio a None.
WHOIS_FALLBACK_ENABLED = True
WHOIS_TIMEOUT = 8.0

# Rutas candidatas para páginas "sobre"/"contacto" (se buscan en los links de la home).
ABOUT_PATH_HINTS = ("about", "nosotros", "quienes-somos", "quienes_somos", "sobre")
CONTACT_PATH_HINTS = ("contacto", "contact", "contactanos", "contactenos")

# ── Firma estructural (template_twin) ────────────────────────────────────────
DOM_SHINGLE_SIZE = 4  # tamaño del n-grama de tags

# ── Email / informe ───────────────────────────────────────────────────────────
# Remitente. Hasta verificar el dominio en Resend (registros DNS), solo se puede
# enviar desde onboarding@resend.dev y ÚNICAMENTE al email dueño de la cuenta.
# Verificado el dominio → cambiar a algo como "Detector <detector@ezequiel-orazi.online>".
import os as _os

RESEND_FROM = (
    _os.environ.get("RESEND_FROM") or "Detector de Bots <onboarding@resend.dev>"
)

SITE_NAME = "Ezequiel Orazi"
SITE_URL = "https://ezequiel-orazi.online"
UNSUBSCRIBE_EMAIL = "ezequiel.orazi90@gmail.com"

REGION_LABELS = {"mx-es": "México", "ar-es": "Argentina", "wt-wt": "Global"}
