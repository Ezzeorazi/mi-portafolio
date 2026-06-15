import { NextResponse } from 'next/server';

// Runs as a serverless function on Netlify (Next.js runtime).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ─── Types ──────────────────────────────────────────────────────────────────

type CheckStatus = 'pass' | 'warn' | 'fail';

interface CheckResult {
  id: string;
  status: CheckStatus;
  /** Short detail shown next to the check (already human-friendly). */
  detail?: string;
}

interface PageSpeedScores {
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  metrics: {
    lcp?: string;
    cls?: string;
    fcp?: string;
    tbt?: string;
    si?: string;
  };
}

interface AuditResponse {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  onpage: {
    score: number;
    checks: CheckResult[];
  };
  pagespeed: PageSpeedScores | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeUrl(raw: string): string | null {
  let value = raw.trim();
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
  try {
    const u = new URL(value);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    // Block obvious internal / loopback targets (basic SSRF guard).
    const host = u.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.endsWith('.local') ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host)
    ) {
      return null;
    }
    return u.toString();
  } catch {
    return null;
  }
}

function fetchWithTimeout(url: string, ms: number, init?: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...init, signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function getMeta(html: string, attr: 'name' | 'property', value: string): string | null {
  // Match <meta name="x" content="y"> in either attribute order.
  const patterns = [
    new RegExp(
      `<meta[^>]*\\b${attr}=["']${value}["'][^>]*\\bcontent=["']([^"']*)["']`,
      'i'
    ),
    new RegExp(
      `<meta[^>]*\\bcontent=["']([^"']*)["'][^>]*\\b${attr}=["']${value}["']`,
      'i'
    ),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return decode(m[1]);
  }
  return null;
}

// ─── On-page analysis ───────────────────────────────────────────────────────

function analyzeHtml(html: string, finalUrl: string): CheckResult[] {
  const checks: CheckResult[] = [];
  const head = (html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html);

  // HTTPS
  checks.push({
    id: 'https',
    status: finalUrl.startsWith('https://') ? 'pass' : 'fail',
  });

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decode(titleMatch[1]) : '';
  checks.push({
    id: 'title',
    status: !title ? 'fail' : title.length < 30 || title.length > 65 ? 'warn' : 'pass',
    detail: title ? `${title.length} ${title.length === 1 ? 'carácter' : 'caracteres'}` : undefined,
  });

  // Meta description
  const desc = getMeta(head, 'name', 'description');
  checks.push({
    id: 'description',
    status: !desc ? 'fail' : desc.length < 70 || desc.length > 165 ? 'warn' : 'pass',
    detail: desc ? `${desc.length} caracteres` : undefined,
  });

  // H1
  const h1Count = (html.match(/<h1[\b>]/gi) || html.match(/<h1[\s>]/gi) || []).length;
  checks.push({
    id: 'h1',
    status: h1Count === 1 ? 'pass' : h1Count === 0 ? 'fail' : 'warn',
    detail: `${h1Count}`,
  });

  // Headings structure (h2)
  const h2Count = (html.match(/<h2[\s>]/gi) || []).length;
  checks.push({
    id: 'headings',
    status: h2Count >= 1 ? 'pass' : 'warn',
    detail: `${h2Count} H2`,
  });

  // Images alt
  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  const imgsNoAlt = imgTags.filter(
    (tag) => !/\balt=["'][^"']*["']/i.test(tag) && !/\balt=["']["']/i.test(tag)
  ).length;
  checks.push({
    id: 'img_alt',
    status: imgTags.length === 0 ? 'warn' : imgsNoAlt === 0 ? 'pass' : imgsNoAlt <= 2 ? 'warn' : 'fail',
    detail: imgTags.length ? `${imgsNoAlt}/${imgTags.length} sin alt` : 'Sin imágenes',
  });

  // Viewport (mobile)
  const viewport = getMeta(head, 'name', 'viewport');
  checks.push({ id: 'viewport', status: viewport ? 'pass' : 'fail' });

  // Lang attribute
  checks.push({
    id: 'lang',
    status: /<html[^>]*\blang=["'][a-z]/i.test(html) ? 'pass' : 'warn',
  });

  // Canonical
  checks.push({
    id: 'canonical',
    status: /<link[^>]*\brel=["']canonical["']/i.test(head) ? 'pass' : 'warn',
  });

  // Open Graph
  const ogTitle = getMeta(head, 'property', 'og:title');
  const ogImage = getMeta(head, 'property', 'og:image');
  const ogDesc = getMeta(head, 'property', 'og:description');
  const ogCount = [ogTitle, ogImage, ogDesc].filter(Boolean).length;
  checks.push({
    id: 'open_graph',
    status: ogCount === 3 ? 'pass' : ogCount === 0 ? 'fail' : 'warn',
    detail: `${ogCount}/3`,
  });

  // Twitter card
  checks.push({
    id: 'twitter',
    status: getMeta(head, 'name', 'twitter:card') ? 'pass' : 'warn',
  });

  // Structured data (JSON-LD)
  checks.push({
    id: 'structured_data',
    status: /<script[^>]*type=["']application\/ld\+json["']/i.test(html) ? 'pass' : 'warn',
  });

  // Charset
  checks.push({
    id: 'charset',
    status: /<meta[^>]*charset=/i.test(head) ? 'pass' : 'warn',
  });

  // Noindex check (a fail means the page is blocking Google)
  const robots = getMeta(head, 'name', 'robots') || '';
  checks.push({
    id: 'indexable',
    status: /noindex/i.test(robots) ? 'fail' : 'pass',
  });

  // Favicon
  checks.push({
    id: 'favicon',
    status: /<link[^>]*\brel=["'][^"']*icon[^"']*["']/i.test(head) ? 'pass' : 'warn',
  });

  return checks;
}

function scoreChecks(checks: CheckResult[]): number {
  // Weighted: a hard fail hurts more than a warning.
  let earned = 0;
  let total = 0;
  for (const c of checks) {
    total += 2;
    if (c.status === 'pass') earned += 2;
    else if (c.status === 'warn') earned += 1;
  }
  return total === 0 ? 0 : Math.round((earned / total) * 100);
}

// ─── PageSpeed Insights (optional, graceful) ──────────────────────────────────

async function getPageSpeed(url: string): Promise<PageSpeedScores | null> {
  try {
    const api = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    api.searchParams.set('url', url);
    api.searchParams.set('strategy', 'mobile');
    for (const cat of ['performance', 'seo', 'accessibility', 'best-practices']) {
      api.searchParams.append('category', cat);
    }
    const key = process.env.PAGESPEED_API_KEY;
    if (key) api.searchParams.set('key', key);

    const res = await fetchWithTimeout(api.toString(), 25000);
    if (!res.ok) return null;
    const data = await res.json();
    const cats = data?.lighthouseResult?.categories;
    const audits = data?.lighthouseResult?.audits;
    if (!cats) return null;

    const pct = (v: unknown) =>
      typeof v === 'number' ? Math.round(v * 100) : null;

    return {
      performance: pct(cats.performance?.score),
      seo: pct(cats.seo?.score),
      accessibility: pct(cats.accessibility?.score),
      bestPractices: pct(cats['best-practices']?.score),
      metrics: {
        lcp: audits?.['largest-contentful-paint']?.displayValue,
        cls: audits?.['cumulative-layout-shift']?.displayValue,
        fcp: audits?.['first-contentful-paint']?.displayValue,
        tbt: audits?.['total-blocking-time']?.displayValue,
        si: audits?.['speed-index']?.displayValue,
      },
    };
  } catch {
    return null;
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const url = normalizeUrl(body.url ?? '');
  if (!url) {
    return NextResponse.json({ error: 'invalid_url' }, { status: 400 });
  }

  // Fetch the page HTML and run PageSpeed in parallel.
  const htmlPromise = fetchWithTimeout(url, 12000, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; EzeOraziSEOBot/1.0; +https://ezequiel-orazi.online/auditoria-seo)',
      Accept: 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
  });

  const [htmlResult, pagespeed] = await Promise.allSettled([
    htmlPromise,
    getPageSpeed(url),
  ]);

  if (htmlResult.status === 'rejected') {
    return NextResponse.json({ error: 'fetch_failed' }, { status: 502 });
  }

  const res = htmlResult.value;
  if (!res.ok) {
    return NextResponse.json(
      { error: 'fetch_failed', statusCode: res.status },
      { status: 502 }
    );
  }

  const finalUrl = res.url || url;
  const html = (await res.text()).slice(0, 1_500_000); // cap to ~1.5MB
  const checks = analyzeHtml(html, finalUrl);

  const payload: AuditResponse = {
    url,
    finalUrl,
    fetchedAt: new Date().toISOString(),
    onpage: { score: scoreChecks(checks), checks },
    pagespeed: pagespeed.status === 'fulfilled' ? pagespeed.value : null,
  };

  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
