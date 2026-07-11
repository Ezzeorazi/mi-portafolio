import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { prisma } from '@/lib/db';
import {
  DEFAULT_REGION,
  GITHUB_DISPATCH_EVENT,
  GITHUB_REPO,
  KEYWORD_MAX_LENGTH,
  KEYWORD_MIN_LENGTH,
  MAX_ANALYSES_PER_DAY,
  VALID_REGIONS,
} from '@/lib/tools/serp-farm/config';

// Corre como función serverless (Netlify). Necesita Node (Prisma + crypto).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ─── Validación ───────────────────────────────────────────────────────────────

// Dominios de email desechables más comunes: se rechazan para no encolar basura.
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', '10minutemail.com',
  'tempmail.com', 'temp-mail.org', 'throwawaymail.com', 'yopmail.com', 'trashmail.com',
  'getnada.com', 'sharklasers.com', 'maildrop.cc', 'dispostable.com', 'fakeinbox.com',
  'mintemail.com', 'mailnesia.com', 'emailondeck.com', 'moakt.com', 'mohmal.com',
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const email = raw.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return null;
  const domain = email.split('@')[1];
  if (!domain || DISPOSABLE_DOMAINS.has(domain)) return null;
  return email;
}

function validateKeyword(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const keyword = raw.trim().replace(/\s+/g, ' ');
  if (keyword.length < KEYWORD_MIN_LENGTH || keyword.length > KEYWORD_MAX_LENGTH) {
    return null;
  }
  return keyword;
}

function normalizeRegion(raw: unknown): string {
  return typeof raw === 'string' && VALID_REGIONS.includes(raw) ? raw : DEFAULT_REGION;
}

// ─── IP del solicitante ───────────────────────────────────────────────────────

function clientIp(req: Request): string {
  // Netlify expone la IP real en x-nf-client-connection-ip; fallback a x-forwarded-for.
  const nf = req.headers.get('x-nf-client-connection-ip');
  if (nf) return nf.trim();
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return 'unknown';
}

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex');
}

// ─── Disparo del worker (best-effort) ─────────────────────────────────────────

// Gatilla el workflow de GitHub Actions para que procese el job al instante. Si falla
// (o no hay token configurado), no pasa nada: el cron de respaldo lo levanta igual.
async function triggerWorker(): Promise<void> {
  const token = process.env.GITHUB_DISPATCH_TOKEN;
  if (!token) return;
  try {
    await fetch(`https://api.github.com/repos/${GITHUB_REPO}/dispatches`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'serp-farm-detector',
      },
      body: JSON.stringify({ event_type: GITHUB_DISPATCH_EVENT }),
    });
  } catch (err) {
    console.error('repository_dispatch falló (usará el cron de respaldo):', err);
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let body: { keyword?: unknown; email?: unknown; region?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const keyword = validateKeyword(body.keyword);
  const email = validateEmail(body.email);
  const region = normalizeRegion(body.region);

  if (!keyword) return NextResponse.json({ error: 'invalid_keyword' }, { status: 400 });
  if (!email) return NextResponse.json({ error: 'invalid_email' }, { status: 400 });

  const ipHash = hashIp(clientIp(req));
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  try {
    // Rate-limit: cuenta análisis de las últimas 24 h por email y por IP.
    const [byEmail, byIp] = await Promise.all([
      prisma.serpAnalysisJob.count({ where: { email, createdAt: { gte: since } } }),
      prisma.serpAnalysisJob.count({ where: { ipHash, createdAt: { gte: since } } }),
    ]);

    if (byEmail >= MAX_ANALYSES_PER_DAY || byIp >= MAX_ANALYSES_PER_DAY) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
    }

    await prisma.serpAnalysisJob.create({
      data: { keyword, email, region, ipHash, status: 'PENDING' },
    });
  } catch (err) {
    console.error('serp-farm analyze error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }

  // Despierta al worker para procesarlo ya (no bloquea la respuesta si falla).
  await triggerWorker();

  return NextResponse.json(
    { ok: true, message: 'queued' },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
