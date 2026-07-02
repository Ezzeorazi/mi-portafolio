import { NextResponse } from 'next/server';
import tls from 'node:tls';

// Runs as a serverless function on Netlify (Next.js runtime).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ─── Types ──────────────────────────────────────────────────────────────────

type CheckStatus = 'pass' | 'warn' | 'fail';

interface CheckResult {
  id: string;
  status: CheckStatus;
  /** Whether the header/feature was present at all. */
  present: boolean;
  /** Raw value (truncated) shown as evidence. */
  value?: string;
}

interface TlsInfo {
  valid: boolean;
  issuer?: string;
  validTo?: string; // ISO
  daysRemaining?: number | null;
  protocol?: string; // e.g. "TLSv1.3"
}

interface CookieInfo {
  total: number;
  insecure: number;
}

interface Disclosure {
  server?: string;
  poweredBy?: string;
  aspNet?: string;
}

interface ScanResponse {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  score: number;
  https: boolean;
  redirectsToHttps: boolean | null;
  checks: CheckResult[];
  cookies: CookieInfo;
  disclosure: Disclosure;
  tls: TlsInfo | null;
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

function truncate(v: string | null, max = 140): string | undefined {
  if (!v) return undefined;
  const clean = v.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max)}…` : clean;
}

// ─── Header analysis ──────────────────────────────────────────────────────────

function analyzeHeaders(headers: Headers, isHttps: boolean): CheckResult[] {
  const checks: CheckResult[] = [];
  const get = (name: string) => headers.get(name);

  // HTTPS (evaluated from the final URL protocol)
  checks.push({ id: 'https', status: isHttps ? 'pass' : 'fail', present: isHttps });

  // Strict-Transport-Security (HSTS)
  const hsts = get('strict-transport-security');
  checks.push({
    id: 'hsts',
    status: !isHttps ? 'fail' : hsts ? 'pass' : 'fail',
    present: !!hsts,
    value: truncate(hsts),
  });

  // Content-Security-Policy
  const csp = get('content-security-policy');
  checks.push({
    id: 'csp',
    status: csp ? 'pass' : 'warn',
    present: !!csp,
    value: truncate(csp),
  });

  // Clickjacking protection: X-Frame-Options OR CSP frame-ancestors
  const xfo = get('x-frame-options');
  const frameAncestors = csp ? /frame-ancestors/i.test(csp) : false;
  checks.push({
    id: 'x_frame_options',
    status: xfo || frameAncestors ? 'pass' : 'fail',
    present: !!xfo || frameAncestors,
    value: truncate(xfo) ?? (frameAncestors ? 'CSP frame-ancestors' : undefined),
  });

  // X-Content-Type-Options: nosniff
  const xcto = get('x-content-type-options');
  checks.push({
    id: 'x_content_type_options',
    status: xcto && /nosniff/i.test(xcto) ? 'pass' : 'warn',
    present: !!xcto,
    value: truncate(xcto),
  });

  // Referrer-Policy
  const ref = get('referrer-policy');
  checks.push({
    id: 'referrer_policy',
    status: ref ? 'pass' : 'warn',
    present: !!ref,
    value: truncate(ref),
  });

  // Permissions-Policy
  const perm = get('permissions-policy') || get('feature-policy');
  checks.push({
    id: 'permissions_policy',
    status: perm ? 'pass' : 'warn',
    present: !!perm,
    value: truncate(perm),
  });

  // Cross-Origin-Opener-Policy
  const coop = get('cross-origin-opener-policy');
  checks.push({
    id: 'coop',
    status: coop ? 'pass' : 'warn',
    present: !!coop,
    value: truncate(coop),
  });

  // Information disclosure: Server header revealing a version
  const server = get('server');
  const serverLeaksVersion = server ? /\d/.test(server) : false;
  checks.push({
    id: 'server_disclosure',
    status: serverLeaksVersion ? 'warn' : 'pass',
    present: !!server,
    value: truncate(server),
  });

  // Information disclosure: X-Powered-By / X-AspNet-Version
  const poweredBy = get('x-powered-by');
  const aspNet = get('x-aspnet-version') || get('x-aspnetmvc-version');
  const leak = poweredBy || aspNet;
  checks.push({
    id: 'tech_disclosure',
    status: leak ? 'warn' : 'pass',
    present: !!leak,
    value: truncate(leak),
  });

  return checks;
}

function analyzeCookies(headers: Headers, isHttps: boolean): CheckResult & {
  info: CookieInfo;
} {
  // undici exposes getSetCookie(); fall back to the combined header.
  let cookies: string[] = [];
  const anyHeaders = headers as Headers & { getSetCookie?: () => string[] };
  if (typeof anyHeaders.getSetCookie === 'function') {
    cookies = anyHeaders.getSetCookie();
  } else {
    const raw = headers.get('set-cookie');
    if (raw) cookies = [raw];
  }

  let insecure = 0;
  for (const cookie of cookies) {
    const secure = /;\s*secure/i.test(cookie);
    const httpOnly = /;\s*httponly/i.test(cookie);
    // On HTTPS a session cookie really should carry Secure + HttpOnly.
    if (isHttps && (!secure || !httpOnly)) insecure++;
  }

  let status: CheckStatus = 'pass';
  if (cookies.length === 0) status = 'pass'; // nothing to protect
  else if (insecure === 0) status = 'pass';
  else if (insecure <= 1) status = 'warn';
  else status = 'fail';

  return {
    id: 'cookie_security',
    status,
    present: cookies.length > 0,
    value:
      cookies.length === 0
        ? undefined
        : `${insecure}/${cookies.length} sin Secure/HttpOnly`,
    info: { total: cookies.length, insecure },
  };
}

// ─── HTTP → HTTPS redirect probe (best-effort) ────────────────────────────────

async function checkHttpsRedirect(finalUrl: string): Promise<boolean | null> {
  try {
    const u = new URL(finalUrl);
    const httpUrl = `http://${u.host}${u.pathname}`;
    const res = await fetchWithTimeout(httpUrl, 8000, {
      method: 'HEAD',
      redirect: 'manual',
      headers: { 'User-Agent': UA },
    });
    // A redirect status pointing at https, or an opaqueredirect, counts.
    if (res.type === 'opaqueredirect') return true;
    const loc = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && loc) {
      return /^https:/i.test(loc) || loc.startsWith('/'); // relative stays on https host
    }
    return false;
  } catch {
    return null;
  }
}

// ─── TLS certificate inspection (best-effort) ─────────────────────────────────

function getTlsInfo(hostname: string, ms = 8000): Promise<TlsInfo | null> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (v: TlsInfo | null) => {
      if (settled) return;
      settled = true;
      try {
        socket.destroy();
      } catch {
        /* ignore */
      }
      resolve(v);
    };

    const socket = tls.connect(
      { host: hostname, port: 443, servername: hostname, timeout: ms },
      () => {
        try {
          const cert = socket.getPeerCertificate();
          const protocol = socket.getProtocol() ?? undefined;
          const authorized = socket.authorized;
          if (!cert || !cert.valid_to) {
            finish({ valid: authorized, protocol });
            return;
          }
          const validTo = new Date(cert.valid_to);
          const days = Math.round((validTo.getTime() - Date.now()) / 86_400_000);
          const rawIssuer =
            cert.issuer && (cert.issuer.O || cert.issuer.CN);
          const issuer = Array.isArray(rawIssuer)
            ? rawIssuer[0]
            : rawIssuer || undefined;
          finish({
            valid: authorized,
            issuer,
            validTo: validTo.toISOString(),
            daysRemaining: Number.isFinite(days) ? days : null,
            protocol,
          });
        } catch {
          finish(null);
        }
      }
    );
    socket.on('error', () => finish(null));
    socket.on('timeout', () => finish(null));
  });
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

// Critical controls weigh more than hardening niceties.
const WEIGHTS: Record<string, number> = {
  https: 3,
  hsts: 3,
  csp: 2,
  x_frame_options: 3,
  x_content_type_options: 2,
  referrer_policy: 1,
  permissions_policy: 1,
  coop: 1,
  server_disclosure: 1,
  tech_disclosure: 1,
  cookie_security: 2,
};

function scoreChecks(checks: CheckResult[]): number {
  let earned = 0;
  let total = 0;
  for (const c of checks) {
    const w = WEIGHTS[c.id] ?? 1;
    total += w * 2;
    if (c.status === 'pass') earned += w * 2;
    else if (c.status === 'warn') earned += w;
  }
  return total === 0 ? 0 : Math.round((earned / total) * 100);
}

const UA =
  'Mozilla/5.0 (compatible; EzeOraziSecurityBot/1.0; +https://ezequiel-orazi.online/analisis-seguridad)';

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

  let res: Response;
  try {
    res = await fetchWithTimeout(url, 12000, {
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,*/*' },
      redirect: 'follow',
    });
  } catch {
    return NextResponse.json({ error: 'fetch_failed' }, { status: 502 });
  }

  const finalUrl = res.url || url;
  const isHttps = finalUrl.startsWith('https://');
  const hostname = (() => {
    try {
      return new URL(finalUrl).hostname;
    } catch {
      return '';
    }
  })();

  // Run the header analysis synchronously, TLS + redirect probes in parallel.
  const headerChecks = analyzeHeaders(res.headers, isHttps);
  const cookie = analyzeCookies(res.headers, isHttps);

  const [tlsResult, redirectResult] = await Promise.allSettled([
    isHttps && hostname ? getTlsInfo(hostname) : Promise.resolve(null),
    isHttps ? checkHttpsRedirect(finalUrl) : Promise.resolve(false),
  ]);

  const checks = [...headerChecks, { id: cookie.id, status: cookie.status, present: cookie.present, value: cookie.value }];

  const disclosure: Disclosure = {
    server: truncate(res.headers.get('server')),
    poweredBy: truncate(res.headers.get('x-powered-by')),
    aspNet: truncate(
      res.headers.get('x-aspnet-version') || res.headers.get('x-aspnetmvc-version')
    ),
  };

  const payload: ScanResponse = {
    url,
    finalUrl,
    fetchedAt: new Date().toISOString(),
    score: scoreChecks(checks),
    https: isHttps,
    redirectsToHttps:
      redirectResult.status === 'fulfilled' ? redirectResult.value : null,
    checks,
    cookies: cookie.info,
    disclosure,
    tls: tlsResult.status === 'fulfilled' ? tlsResult.value : null,
  };

  return NextResponse.json(payload, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
