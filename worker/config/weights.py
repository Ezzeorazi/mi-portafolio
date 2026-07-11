"""Pesos y umbrales del scoring — ÚNICO lugar para recalibrar.

Separado de `settings.py` a propósito: estos números se ajustan seguido con datos
reales. Cambiar un peso o un umbral acá NO debería requerir tocar la lógica de ninguna
señal (las señales leen de estos diccionarios por nombre).

Convención de signo: las señales de sospecha suman (peso > 0), las señales negativas
(indicios de legitimidad) restan (peso < 0).
"""

from __future__ import annotations

# ── Pesos por señal ───────────────────────────────────────────────────────────
WEIGHTS: dict[str, float] = {
    # Dominio
    "domain_very_new": 25,
    "domain_new": 12,
    "whois_private": 5,
    "suspicious_tld": 8,
    # Contenido
    "no_author": 20,
    "no_about_page": 15,
    "no_contact": 10,
    "firehose_publishing": 25,
    "high_volume_publishing": 12,
    "thin_content": 10,
    "ad_density": 10,
    # Coordinación (las más importantes)
    "shared_ip": 30,
    "shared_asn_and_registrar": 18,
    "template_twin": 25,
    "registered_same_window": 15,
    # Negativas (legitimidad) — restan
    "established_domain": -20,
    "identified_author": -15,
    "normal_publishing": -10,
    "institutional": -25,
}

# ── Umbrales de las señales ───────────────────────────────────────────────────
# Edad del dominio (en días)
DOMAIN_VERY_NEW_DAYS = 183       # < 6 meses
DOMAIN_NEW_MAX_DAYS = 548        # < 18 meses
ESTABLISHED_DAYS = 1825          # > 5 años

# Publicación (posts/día según sitemap)
FIREHOSE_PER_DAY = 20            # > 20/día
HIGH_VOLUME_MIN_PER_DAY = 5      # 5–20/día
NORMAL_MAX_PER_DAY = 3           # < 3/día (señal negativa)

# Contenido
THIN_CONTENT_WORDS = 400        # < 400 palabras en el body
AD_DENSITY_SLOTS = 6            # > 6 slots de ads/afiliados

# Coordinación
SAME_WINDOW_DAYS = 30           # registrados con < 30 días de diferencia
TEMPLATE_JACCARD = 0.85         # similitud de shingles para considerar gemelos
TEMPLATE_MIN_SHINGLES = 30      # mínimo de shingles para comparar (evita páginas vacías)

# TLDs baratos de alto abuso.
SUSPICIOUS_TLDS: set[str] = {"xyz", "top", "click", "shop", "online", "site"}

# Sufijos institucionales (gobierno / educación). Se comparan contra el final del dominio.
INSTITUTIONAL_SUFFIXES: tuple[str, ...] = (
    ".gob.mx", ".gov", ".gov.ar", ".gob.ar", ".edu", ".edu.mx", ".edu.ar",
    ".ac.uk", ".gouv.fr", ".gob.es",
)

# Medios reconocidos (allowlist chica y ampliable). Evita que un diario grande que
# publica 30 notas/día con WHOIS privado dé "alta sospecha".
RECOGNIZED_MEDIA: set[str] = {
    "forbes.com.mx", "eluniversal.com.mx", "milenio.com", "eleconomista.com.mx",
    "expansion.mx", "elfinanciero.com.mx", "infobae.com", "lanacion.com.ar",
    "clarin.com", "bbc.com", "cnn.com", "nytimes.com", "reuters.com",
    "wikipedia.org", "gob.mx", "condusef.gob.mx", "banxico.org.mx",
}

# ── Clasificación (score normalizado 0–100) ───────────────────────────────────
BAND_LIMPIO_MAX = 29        # 0–29
BAND_DUDOSO_MAX = 59        # 30–59
# 60–100 → ALTA SOSPECHA

CLASS_CLEAN = "LIMPIO"
CLASS_DOUBTFUL = "DUDOSO"
CLASS_HIGH = "ALTA SOSPECHA"


def classify(score: int) -> str:
    if score <= BAND_LIMPIO_MAX:
        return CLASS_CLEAN
    if score <= BAND_DUDOSO_MAX:
        return CLASS_DOUBTFUL
    return CLASS_HIGH
