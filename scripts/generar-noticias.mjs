// @ts-check
/**
 * Generador automático del post semanal "Noticias Tech".
 *
 * Qué hace:
 *  1. Lee varios feeds RSS de tecnología (sin API key).
 *  2. Elige las noticias más recientes y relevantes (diversificando fuentes).
 *  3. Redacta el post con Gemini (free tier) en tono humano, informal y técnico.
 *  4. Genera una portada SVG con los colores de marca (sin dependencias).
 *  5. Crea el HTML en content/blog/, la imagen en public/images/blog/ y agrega
 *     la entrada en data/posts.ts.
 *
 * No instala nada: usa fetch nativo (Node >= 18). Pensado para correr en
 * GitHub Actions todos los miércoles, o a mano con `npm run noticias`.
 *
 * Variables de entorno:
 *  - GEMINI_API_KEY  (requerida)  → https://aistudio.google.com/apikey
 *  - GEMINI_MODEL    (opcional)   → por defecto "gemini-2.0-flash"
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── Configuración ──────────────────────────────────────────────────────────

const FEEDS = [
  { url: 'https://www.xataka.com/index.xml', source: 'Xataka' },
  { url: 'https://www.genbeta.com/index.xml', source: 'Genbeta' },
  { url: 'https://hipertextual.com/feed', source: 'Hipertextual' },
  { url: 'https://www.microsiervos.com/index.xml', source: 'Microsiervos' },
  { url: 'https://www.theverge.com/rss/index.xml', source: 'The Verge' },
  { url: 'https://www.fayerwayer.com/feed/', source: 'FayerWayer' },
];

const NUM_NEWS = 5;
const RECENT_DAYS = 10;
// Lista de modelos free para probar en cadena (cada uno tiene cuota separada).
// Se puede sobreescribir con GEMINI_MODEL (uno o varios separados por coma).
const GEMINI_MODELS = (
  process.env.GEMINI_MODEL ||
  'gemini-2.0-flash,gemini-2.5-flash,gemini-2.5-flash-lite,gemini-1.5-flash'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const UA = 'Mozilla/5.0 (compatible; PortfolioNewsBot/1.0)';

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

// ─── Utilidades ─────────────────────────────────────────────────────────────

function stripCdata(s = '') {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}
function stripTags(s = '') {
  return s.replace(/<[^>]+>/g, ' ');
}
function decodeEntities(s = '') {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&#x?[0-9a-fA-F]+;/g, ' ')
    .replace(/&nbsp;/g, ' ');
}
function clean(s = '') {
  return decodeEntities(stripTags(stripCdata(s))).replace(/\s+/g, ' ').trim();
}
function escapeXml(s = '') {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
function slugify(s = '') {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function fechaEs(d) {
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
/** Recorta a `max` caracteres cortando en el último espacio y agrega "…". */
function recortar(s = '', max = 160) {
  s = s.trim();
  if (s.length <= max) return s;
  const corte = s.slice(0, max - 1);
  const sp = corte.lastIndexOf(' ');
  return (sp > max * 0.6 ? corte.slice(0, sp) : corte).replace(/[\s,.;:—-]+$/, '') + '…';
}

// ─── 1. Leer feeds RSS ──────────────────────────────────────────────────────

function firstMatch(block, re) {
  const m = block.match(re);
  return m ? m[1] : '';
}

function parseFeed(xml, source) {
  const items = [];
  // Soporta RSS (<item>) y Atom (<entry>)
  const blocks = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) || [];
  for (const block of blocks) {
    const title = clean(firstMatch(block, /<title[^>]*>([\s\S]*?)<\/title>/i));
    if (!title) continue;

    // link: texto de <link> o atributo href (Atom)
    let link = clean(firstMatch(block, /<link[^>]*>([\s\S]*?)<\/link>/i));
    if (!/^https?:\/\//i.test(link)) {
      link = firstMatch(block, /<link[^>]*href="([^"]+)"/i) || link;
    }

    const dateRaw = firstMatch(
      block,
      /<(?:pubDate|published|updated|dc:date)[^>]*>([\s\S]*?)<\/(?:pubDate|published|updated|dc:date)>/i,
    );
    const date = dateRaw ? new Date(dateRaw.trim()) : new Date(0);

    let desc = clean(
      firstMatch(block, /<(?:description|summary|content)[^>]*>([\s\S]*?)<\/(?:description|summary|content)>/i),
    );
    if (desc.length > 400) desc = desc.slice(0, 400) + '…';

    items.push({ title, link, source, date, desc });
  }
  return items;
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': UA, Accept: 'application/rss+xml, application/xml, text/xml' },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = parseFeed(xml, feed.source);
    console.log(`  ✓ ${feed.source}: ${items.length} items`);
    return items;
  } catch (err) {
    console.warn(`  ✗ ${feed.source}: ${err.message}`);
    return [];
  }
}

function selectNews(all) {
  // Recientes primero
  const now = Date.now();
  const cutoff = now - RECENT_DAYS * 24 * 60 * 60 * 1000;
  let pool = all.filter((it) => it.date.getTime() >= cutoff && it.link);
  if (pool.length < NUM_NEWS) pool = all.filter((it) => it.link); // relajar si hay pocas

  // Dedupe por título normalizado
  const seen = new Set();
  pool = pool.filter((it) => {
    const key = slugify(it.title).slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  pool.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Diversificar: máx 2 por fuente, recorriendo por rondas
  const bySource = new Map();
  for (const it of pool) {
    if (!bySource.has(it.source)) bySource.set(it.source, []);
    bySource.get(it.source).push(it);
  }
  const picked = [];
  let round = 0;
  while (picked.length < NUM_NEWS && round < 4) {
    for (const list of bySource.values()) {
      if (list[round]) picked.push(list[round]);
      if (picked.length >= NUM_NEWS) break;
    }
    round++;
  }
  return picked.slice(0, NUM_NEWS);
}

// ─── 2. Redactar con Gemini ─────────────────────────────────────────────────

function buildPrompt(news, fechaTexto) {
  const lista = news
    .map(
      (n, i) =>
        `${i + 1}. TITULAR: ${n.title}\n   FUENTE: ${n.source}\n   URL: ${n.link}\n   RESUMEN: ${n.desc || '(sin resumen)'}`,
    )
    .join('\n\n');

  return `Sos Ezequiel Orazi, desarrollador web full-stack argentino. Escribís el resumen semanal de noticias de tecnología para tu blog (https://ezequiel-orazi.online). Hoy es ${fechaTexto}.

Tu voz: escribís SIEMPRE en PRIMERA PERSONA del singular (yo): "me llamó la atención", "creo que", "en mi opinión", "me parece". Sos profesional pero cálido y amistoso, con tuteo argentino al lector ("vos", "tenés"). Formal sin ser acartonado: nada de lunfardo ni modismos (nada de "che", "kilombo", "posta", "mate", "uff", "al palo") y casi sin signos de exclamación. No sos un agregador automático: das TU análisis y criterio técnico real, conectás puntos y explicás por qué cada noticia importa. Nada de relleno ni clickbait.

Estas son las 5 noticias de la semana:

${lista}

Escribí un post de blog en español (Argentina) de entre 1000 y 1400 palabras con esta estructura:
- Arrancá DIRECTO al tema. PROHIBIDO saludar ("hola"), anunciar que esto es "el resumen semanal" o explicar de qué va el post. Nada de meta-frases tipo "una vez más acá estoy", "en este post", "esta semana te traigo", "vamos a ver": entrá desde la primera oración con una idea fuerte o con la noticia más importante. 1 o 2 párrafos de entrada que conecten el clima tech de la semana.
- EXACTAMENTE ${news.length} secciones, UNA POR CADA noticia de la lista de arriba, en el mismo orden y sin saltarte ninguna. Cada sección: un <h2> con un título propio (NO copies el titular literal), seguido de 2 o 3 párrafos <p> con tu análisis técnico y contexto (qué pasó, por qué importa, qué implica). Cerrá cada sección con el enlace EXACTO de esa noticia así: <p><a href="URL" target="_blank" rel="noopener noreferrer">Leé la nota completa en FUENTE →</a></p>
- Un párrafo de cierre con una reflexión personal genuina y una invitación cálida a contactarme si necesitan una mano con su proyecto web. PROHIBIDO usar cierres formulaicos como "y así cerramos", "en resumen", "para terminar", "en conclusión".

Reglas de formato MUY IMPORTANTES:
- Devolvé ÚNICAMENTE un objeto JSON válido y minificado, sin markdown, sin \`\`\`.
- Estructura exacta: {"title": "...", "description": "...", "html": "..."}
- "title": título atractivo del post (50-65 caracteres) que mencione que es el resumen tech de la semana.
- "description": meta descripción SEO de máximo 160 caracteres (NO te pases).
- "html": SOLO el cuerpo del artículo usando etiquetas <p>, <h2>, <strong>, <a>, <ul>, <li>. NADA de <html>, <head>, <body>, <h1> ni estilos inline. Usá comillas dobles escapadas correctamente dentro del JSON.
- USÁ ÚNICAMENTE las ${news.length} URLs que te di, una por sección. NO inventes ni agregues enlaces que no estén en la lista. NO repitas una misma noticia en dos secciones.`;
}

async function generateWithGemini(news, fechaTexto) {
  // Modo de prueba sin gastar API: MOCK_GEMINI=1
  if (process.env.MOCK_GEMINI === '1') {
    const secciones = news
      .map(
        (n) =>
          `<h2>${escapeXml(n.title)}</h2>\n<p>${escapeXml(n.desc || 'Análisis de la noticia.')}</p>\n<p><a href="${escapeXml(n.link)}" target="_blank" rel="noopener noreferrer">Leé la nota completa en ${escapeXml(n.source)} →</a></p>`,
      )
      .join('\n\n');
    return {
      title: `Noticias Tech de la semana — ${fechaTexto}`,
      description: `Resumen de las 5 noticias de tecnología más relevantes de la semana del ${fechaTexto}, con análisis.`,
      html: `<p>Esto es contenido de prueba (MOCK_GEMINI).</p>\n\n${secciones}\n\n<p>Cierre de prueba.</p>`,
    };
  }
  if (!GEMINI_API_KEY) {
    throw new Error('Falta GEMINI_API_KEY. Conseguí una gratis en https://aistudio.google.com/apikey');
  }
  const prompt = buildPrompt(news, fechaTexto);

  let lastErr;
  let hubo429 = false;
  // 2 rondas: en cada una probamos todos los modelos. Ante cualquier fallo
  // (429 de cuota, JSON cortado, etc.) saltamos al siguiente modelo.
  for (let ronda = 1; ronda <= 2; ronda++) {
    for (const model of GEMINI_MODELS) {
      try {
        console.log(`  · probando ${model}…`);
        const text = await callGeminiModel(model, prompt);
        return parseGeminiJson(text);
      } catch (err) {
        lastErr = err;
        if (err.is429) hubo429 = true;
        console.warn(`    ⚠ ${model} falló (${err.message.slice(0, 80)}). Pruebo el siguiente…`);
      }
    }
    // Solo esperamos y reintentamos si los fallos fueron por cuota (429).
    if (ronda === 1 && hubo429) {
      console.warn('  Espero 50s (la cuota por minuto del free tier se renueva) y reintento…');
      await sleep(50000);
    } else {
      break;
    }
  }
  throw new Error('No se pudo generar con ningún modelo de Gemini. Último error:\n' + (lastErr?.message || 'desconocido'));
}

async function callGeminiModel(model, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  const es25 = model.includes('2.5');
  const generationConfig = {
    temperature: 0.85,
    // Los 2.5 soportan salidas más largas; les damos margen de sobra.
    maxOutputTokens: es25 ? 16384 : 8192,
    responseMimeType: 'application/json',
  };
  // Los modelos 2.5 son "thinking": sin esto gastan tokens razonando y truncan el JSON.
  if (es25) generationConfig.thinkingConfig = { thinkingBudget: 0 };

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(90000),
  });
  if (!res.ok) {
    const txt = await res.text();
    const err = new Error(`Gemini HTTP ${res.status} (${model}): ${txt.slice(0, 600)}`);
    if (res.status === 429) err.is429 = true;
    throw err;
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(`Gemini (${model}) no devolvió contenido: ` + JSON.stringify(data).slice(0, 400));
  return text;
}

function parseGeminiJson(text) {
  const cleaned = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error('La respuesta de Gemini no es JSON válido: ' + cleaned.slice(0, 200));
  }
  if (!parsed.title || !parsed.html) throw new Error('JSON de Gemini incompleto (falta title o html)');
  return parsed;
}

// ─── 3. Portada SVG ─────────────────────────────────────────────────────────

function wrapText(text, maxChars, maxLines = 5) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, maxLines);
}

function buildSvgCover(fechaTexto, headline) {
  const W = 1200, H = 630;
  const title = (headline || 'Noticias Tech de la semana').trim();

  // Tamaño de fuente según el largo del título: que nunca se corte ni se desborde.
  let font = 58, maxc = 24;
  let lines = wrapText(title, maxc, 5);
  if (lines.length > 3) { font = 46; maxc = 31; lines = wrapText(title, maxc, 5); }
  if (lines.length > 4) { font = 38; maxc = 40; lines = wrapText(title, maxc, 5); }

  const lineH = Math.round(font * 1.18);
  const blockH = lines.length * lineH;
  // Todo se centra verticalmente alrededor de y=300 (zona que sobrevive al
  // recorte object-cover del hero y de las tarjetas, sin perder label ni fecha).
  const centerY = 300;
  const titleBase = Math.round(centerY - blockH / 2 + font * 0.82);
  const labelY = Math.round(centerY - blockH / 2 - 26);
  const dateY = Math.round(centerY + blockH / 2 + 46);
  const brandY = dateY + 36;

  const tspans = lines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : lineH}">${escapeXml(l)}</tspan>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#161a1e"/>
      <stop offset="100%" stop-color="#0b0d10"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fd02d1" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#fd02d1" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="14" height="${H}" fill="#fd02d1"/>
  <circle cx="1090" cy="315" r="60" fill="#f5d805" opacity="0.9"/>
  <circle cx="1140" cy="250" r="22" fill="#fd02d1" opacity="0.85"/>
  <text x="80" y="${labelY}" font-family="Montserrat, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="#f5d805">NOTICIAS TECH · DEV</text>
  <text x="80" y="${titleBase}" font-family="Montserrat, Arial, sans-serif" font-size="${font}" font-weight="800" fill="#f0eeed">${tspans}</text>
  <text x="80" y="${dateY}" font-family="Montserrat, Arial, sans-serif" font-size="28" font-weight="600" fill="#9aa3ad">Semana del ${escapeXml(fechaTexto)}</text>
  <text x="80" y="${brandY}" font-family="Montserrat, Arial, sans-serif" font-size="25" font-weight="700" fill="#fd02d1">ezequiel-orazi.online</text>
</svg>
`;
}

// ─── 4. Escribir archivos y actualizar posts.ts ─────────────────────────────

function readingTime(html) {
  const words = clean(html).split(/\s+/).filter(Boolean).length;
  return `${Math.max(4, Math.ceil(words / 200))} min de lectura`;
}

async function insertarEnPosts(entry) {
  const file = path.join(ROOT, 'data', 'posts.ts');
  const src = await fs.readFile(file, 'utf-8');

  if (src.includes(`slug: '${entry.slug}'`)) {
    throw new Error(`Ya existe un post con slug "${entry.slug}". Abortando para no duplicar.`);
  }

  const ids = [...src.matchAll(/id:\s*(\d+)/g)].map((m) => Number(m[1]));
  const nextId = (ids.length ? Math.max(...ids) : 0) + 1;

  const block = `  {
    id: ${nextId},
    slug: '${entry.slug}',
    image: '${entry.image}',
    title: ${JSON.stringify(entry.title)},
    category: 'Noticias',
    description: ${JSON.stringify(entry.description)},
    date: 'Publicado el ${entry.fechaTexto}',
    ReadingTime: '${entry.readingTime}',
    publishedISO: '${entry.iso}',
    content: '${entry.content}',
  },
`;

  // Insertar antes del cierre del array  "\n];"
  const idx = src.lastIndexOf('];');
  if (idx === -1) throw new Error('No encontré el cierre del array en posts.ts');
  const updated = src.slice(0, idx) + block + src.slice(idx);
  await fs.writeFile(file, updated, 'utf-8');
  console.log(`  ✓ posts.ts actualizado (id ${nextId})`);
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const hoy = new Date();
  const iso = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
  const fechaTexto = fechaEs(hoy);
  const slug = `noticias-tech-${iso}`;

  console.log(`\n📰 Generando "Noticias Tech" del ${fechaTexto}\n`);

  console.log('1) Leyendo feeds RSS…');
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const all = results.flat();
  if (all.length === 0) throw new Error('Ningún feed devolvió noticias. ¿Sin conexión?');

  const news = selectNews(all);
  console.log(`\n2) ${news.length} noticias elegidas:`);
  news.forEach((n, i) => console.log(`   ${i + 1}. [${n.source}] ${n.title}`));
  if (news.length < 3) throw new Error('Muy pocas noticias para armar el post (mínimo 3).');

  console.log('\n3) Redactando con Gemini…');
  const post = await generateWithGemini(news, fechaTexto);
  const readTime = readingTime(post.html);
  console.log(`  ✓ "${post.title}" (${readTime})`);

  console.log('\n4) Generando portada SVG…');
  const svg = buildSvgCover(fechaTexto, post.title);
  const imgRel = `images/blog/${slug}.svg`;
  await fs.writeFile(path.join(ROOT, 'public', imgRel), svg, 'utf-8');
  console.log(`  ✓ public/${imgRel}`);

  console.log('\n5) Escribiendo HTML y posts.ts…');
  const contentRel = `blog/${slug}.html`;
  await fs.writeFile(path.join(ROOT, 'content', contentRel), post.html.trim() + '\n', 'utf-8');
  console.log(`  ✓ content/${contentRel}`);

  await insertarEnPosts({
    slug,
    image: imgRel,
    title: post.title,
    description: recortar(post.description || post.title, 160),
    fechaTexto,
    readingTime: readTime,
    iso,
    content: contentRel,
  });

  console.log('\n✅ Listo. Hacé commit & push y Netlify reconstruye solo.\n');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message, '\n');
  process.exit(1);
});
