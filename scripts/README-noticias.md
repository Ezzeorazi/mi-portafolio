# 📰 Post automático de Noticias Tech

Genera y publica **un post semanal de noticias de tecnología** (5 noticias con
análisis propio + portada) todos los **miércoles**, sin intervención manual.

## Cómo funciona

```
Miércoles 08:00 (ART)
  └─ GitHub Actions ejecuta scripts/generar-noticias.mjs
       1. Lee feeds RSS (Xataka, Genbeta, Hipertextual, Microsiervos, The Verge, FayerWayer)
       2. Elige las 5 noticias más recientes (diversificando fuentes)
       3. Gemini redacta el post en tono humano e informal, con criterio técnico
       4. Genera portada SVG con tus colores de marca
       5. Crea content/blog/<slug>.html, public/images/blog/<slug>.svg
          y agrega la entrada en data/posts.ts
  └─ commit + push a main
  └─ Netlify reconstruye el sitio solo
```

La categoría del post es **"Noticias"**, así que aparece como un filtro nuevo en
`/blog` automáticamente (no toca tus posts pilares).

## Setup (una sola vez)

1. **Conseguí una API key gratis de Gemini**
   → https://aistudio.google.com/apikey (gratis, sin tarjeta).

2. **Cargala como secret en GitHub**
   Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
   - Name: `GEMINI_API_KEY`
   - Value: tu key

3. **Listo.** El workflow ya corre los miércoles. Para probarlo ahora mismo:
   Pestaña **Actions** → **Post semanal de Noticias Tech** → **Run workflow**.

## Correrlo a mano (local)

```bash
# PowerShell
$env:GEMINI_API_KEY = "tu-key"
npm run noticias
git add data/posts.ts content/blog public/images/blog
git commit -m "blog: noticias tech"
git push
```

## Ajustes

| Qué | Dónde |
|-----|-------|
| Día/hora de publicación | `cron` en `.github/workflows/noticias.yml` (`0 11 * * 3` = miércoles 11 UTC) |
| Feeds RSS | array `FEEDS` en `scripts/generar-noticias.mjs` |
| Cantidad de noticias | `NUM_NEWS` |
| Modelo de Gemini | env `GEMINI_MODEL` (default `gemini-2.0-flash`) |
| Tono / estructura | función `buildPrompt()` |
| Diseño de portada | función `buildSvgCover()` |

## Notas

- El sitemap (`next-sitemap.config.js`) usa la fecha actual como `lastmod` para
  cualquier slug que no esté en `BLOG_LASTMOD`, así que los posts nuevos quedan
  bien sin tocar nada. Si querés `lastmod` exacto, agregá el slug a ese objeto.
- El script aborta si ya existe un post con el mismo slug del día (no duplica).
- No instala dependencias npm: usa `fetch` nativo de Node 20.
