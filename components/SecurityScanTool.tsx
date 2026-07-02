'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  FaShieldAlt, FaCheckCircle, FaExclamationTriangle, FaTimesCircle,
  FaWhatsapp, FaFileSignature, FaLock, FaSpinner, FaHistory, FaTimes, FaCertificate,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

// WhatsApp number (from contact page: +52 9982017863)
const WHATSAPP = '529982017863';

// Local history of recent scans (persists in the browser via localStorage)
const HISTORY_KEY = 'security_scan_history';
const HISTORY_MAX = 3;
interface HistoryEntry { url: string; score: number }

type CheckStatus = 'pass' | 'warn' | 'fail';
interface CheckResult { id: string; status: CheckStatus; present: boolean; value?: string }
interface TlsInfo {
  valid: boolean;
  issuer?: string;
  validTo?: string;
  daysRemaining?: number | null;
  protocol?: string;
}
interface ScanResponse {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  score: number;
  https: boolean;
  redirectsToHttps: boolean | null;
  checks: CheckResult[];
  cookies: { total: number; insecure: number };
  disclosure: { server?: string; poweredBy?: string; aspNet?: string };
  tls: TlsInfo | null;
}

type Lang = 'es' | 'en';

// ─── Bilingual copy ───────────────────────────────────────────────────────────

const COPY = {
  es: {
    badge: 'Herramienta gratuita',
    title: 'Analizá la seguridad de tu sitio en 30 segundos',
    subtitle:
      'Pegá la URL de tu página y revisá al instante sus cabeceras de seguridad, el certificado SSL y las configuraciones que dejan tu sitio expuesto a ataques como clickjacking, robo de cookies o inyección de contenido.',
    placeholder: 'https://tu-sitio.com',
    analyze: 'Analizar seguridad',
    analyzing: 'Escaneando tu sitio…',
    disclaimer: 'Sin registro. Analizamos cabeceras HTTP, certificado SSL/TLS y cookies.',
    errInvalid: 'Ingresá una URL válida (ej: tu-sitio.com).',
    errFetch: 'No pudimos acceder a esa URL. Verificá que el sitio esté online y sea público.',
    errGeneric: 'Algo salió mal. Intentá de nuevo en unos segundos.',
    scoreLabel: 'Nivel de seguridad',
    analyzedUrl: 'Analizado',
    checksTitle: 'Cabeceras y configuración de seguridad',
    tlsTitle: 'Certificado SSL/TLS',
    tlsIssuer: 'Emisor',
    tlsExpires: 'Vence',
    tlsProtocol: 'Protocolo',
    tlsValid: 'Certificado válido y de confianza',
    tlsInvalid: 'Certificado con problemas de validación',
    tlsDays: (d: number) =>
      d < 0
        ? '¡Vencido!'
        : d <= 15
        ? `Vence en ${d} días ⚠️`
        : `Vence en ${d} días`,
    redirectTitle: 'Redirección a HTTPS',
    redirectOk: 'El tráfico HTTP se redirige a HTTPS ✔',
    redirectFail: 'HTTP no redirige a HTTPS: los visitantes pueden navegar sin cifrado.',
    presentLabel: 'Presente',
    missingLabel: 'Ausente',
    issuesFound: (n: number) =>
      n === 0
        ? '¡Excelente! Tu sitio aplica las protecciones de seguridad esenciales.'
        : `Detectamos ${n} ${n === 1 ? 'brecha de seguridad' : 'brechas de seguridad'} en tu sitio.`,
    ctaTitle: '¿Querés blindar tu sitio?',
    ctaDesc:
      'Configuro cabeceras de seguridad, HTTPS forzado, políticas CSP y protección contra ataques comunes para que tu web (y los datos de tus clientes) estén protegidos. Diagnóstico completo y plan de acción sin compromiso.',
    ctaWhatsapp: 'Consultar por WhatsApp',
    ctaBudget: 'Pedir presupuesto',
    waMsg: (url: string, score: number) =>
      `Hola Ezequiel! Usé tu herramienta de análisis de seguridad en ${url} y me dio ${score}/100. Me gustaría reforzar la seguridad de mi sitio. ¿Cómo podemos avanzar?`,
    newScan: 'Analizar otra URL',
    recentTitle: 'Análisis recientes',
    clearHistory: 'Limpiar',
  },
  en: {
    badge: 'Free tool',
    title: 'Check your website security in 30 seconds',
    subtitle:
      "Paste your page URL and instantly review its security headers, SSL certificate and the misconfigurations that leave your site exposed to attacks like clickjacking, cookie theft or content injection.",
    placeholder: 'https://your-site.com',
    analyze: 'Scan security',
    analyzing: 'Scanning your site…',
    disclaimer: 'No sign-up. We analyze HTTP headers, SSL/TLS certificate and cookies.',
    errInvalid: 'Enter a valid URL (e.g. your-site.com).',
    errFetch: "We couldn't reach that URL. Make sure the site is online and public.",
    errGeneric: 'Something went wrong. Please try again in a few seconds.',
    scoreLabel: 'Security level',
    analyzedUrl: 'Analyzed',
    checksTitle: 'Security headers & configuration',
    tlsTitle: 'SSL/TLS certificate',
    tlsIssuer: 'Issuer',
    tlsExpires: 'Expires',
    tlsProtocol: 'Protocol',
    tlsValid: 'Valid and trusted certificate',
    tlsInvalid: 'Certificate with validation issues',
    tlsDays: (d: number) =>
      d < 0
        ? 'Expired!'
        : d <= 15
        ? `Expires in ${d} days ⚠️`
        : `Expires in ${d} days`,
    redirectTitle: 'HTTPS redirect',
    redirectOk: 'HTTP traffic redirects to HTTPS ✔',
    redirectFail: "HTTP doesn't redirect to HTTPS: visitors can browse unencrypted.",
    presentLabel: 'Present',
    missingLabel: 'Missing',
    issuesFound: (n: number) =>
      n === 0
        ? 'Excellent! Your site applies the essential security protections.'
        : `We found ${n} ${n === 1 ? 'security gap' : 'security gaps'} on your site.`,
    ctaTitle: 'Want to harden your site?',
    ctaDesc:
      'I set up security headers, forced HTTPS, CSP policies and protection against common attacks so your site (and your customers’ data) stays safe. Full diagnosis and action plan, no commitment.',
    ctaWhatsapp: 'Ask on WhatsApp',
    ctaBudget: 'Request a quote',
    waMsg: (url: string, score: number) =>
      `Hi Ezequiel! I used your security scan tool on ${url} and got ${score}/100. I'd like to harden my site's security. How can we move forward?`,
    newScan: 'Scan another URL',
    recentTitle: 'Recent scans',
    clearHistory: 'Clear',
  },
} as const;

// id → { label, fix } per language
const CHECK_META: Record<string, { es: [string, string]; en: [string, string] }> = {
  https: {
    es: ['Conexión cifrada (HTTPS)', 'Sin HTTPS los datos viajan en texto plano y pueden ser interceptados. Es imprescindible.'],
    en: ['Encrypted connection (HTTPS)', 'Without HTTPS data travels in plain text and can be intercepted. It is essential.'],
  },
  hsts: {
    es: ['HSTS (Strict-Transport-Security)', 'Obliga al navegador a usar siempre HTTPS y evita ataques de downgrade y man-in-the-middle.'],
    en: ['HSTS (Strict-Transport-Security)', 'Forces the browser to always use HTTPS, preventing downgrade and man-in-the-middle attacks.'],
  },
  csp: {
    es: ['Content-Security-Policy', 'La CSP bloquea la inyección de scripts maliciosos (XSS), el mayor riesgo web actual.'],
    en: ['Content-Security-Policy', 'CSP blocks malicious script injection (XSS), the biggest web risk today.'],
  },
  x_frame_options: {
    es: ['Protección anti-clickjacking', 'Sin X-Frame-Options o frame-ancestors tu sitio puede incrustarse en un iframe fraudulento.'],
    en: ['Clickjacking protection', 'Without X-Frame-Options or frame-ancestors your site can be embedded in a fraudulent iframe.'],
  },
  x_content_type_options: {
    es: ['X-Content-Type-Options', 'El valor nosniff impide que el navegador interprete archivos con un tipo distinto al declarado.'],
    en: ['X-Content-Type-Options', 'The nosniff value stops the browser from interpreting files as a different type than declared.'],
  },
  referrer_policy: {
    es: ['Referrer-Policy', 'Controla qué información de tu URL se filtra al navegar hacia otros sitios.'],
    en: ['Referrer-Policy', 'Controls how much of your URL leaks when users navigate to other sites.'],
  },
  permissions_policy: {
    es: ['Permissions-Policy', 'Limita el acceso a cámara, micrófono, geolocalización y otras APIs sensibles.'],
    en: ['Permissions-Policy', 'Restricts access to camera, microphone, geolocation and other sensitive APIs.'],
  },
  coop: {
    es: ['Cross-Origin-Opener-Policy', 'Aísla tu pestaña de otras ventanas para prevenir ataques de canal lateral.'],
    en: ['Cross-Origin-Opener-Policy', 'Isolates your tab from other windows to prevent side-channel attacks.'],
  },
  server_disclosure: {
    es: ['Versión del servidor expuesta', 'La cabecera Server revela versiones exactas que facilitan ataques dirigidos. Conviene ocultarla.'],
    en: ['Exposed server version', 'The Server header reveals exact versions that make targeted attacks easier. Best to hide it.'],
  },
  tech_disclosure: {
    es: ['Tecnología expuesta', 'X-Powered-By revela el framework y su versión. Quitarla reduce tu superficie de ataque.'],
    en: ['Exposed technology', 'X-Powered-By reveals your framework and version. Removing it reduces your attack surface.'],
  },
  cookie_security: {
    es: ['Cookies seguras', 'Las cookies deben usar los flags Secure y HttpOnly para evitar robo de sesión.'],
    en: ['Secure cookies', 'Cookies should use the Secure and HttpOnly flags to prevent session theft.'],
  },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function ScoreRing({ score, label }: { score: number; label: string }) {
  const color = score >= 90 ? '#4ade80' : score >= 50 ? '#f5d805' : '#fd02d1';
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#2a2f36" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>{score}</span>
        </div>
      </div>
      <span className="text-light/70 text-sm text-center max-w-[10rem]">{label}</span>
    </div>
  );
}

const STATUS_ICON: Record<CheckStatus, React.ReactNode> = {
  pass: <FaCheckCircle className="text-green-400 shrink-0" />,
  warn: <FaExclamationTriangle className="text-yellow shrink-0" />,
  fail: <FaTimesCircle className="text-pink shrink-0" />,
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SecurityScanTool() {
  const { language } = useTranslation();
  const lang = (language as Lang) === 'en' ? 'en' : 'es';
  const c = COPY[lang];

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load saved history once on mount (client only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  const pushHistory = useCallback((entry: HistoryEntry) => {
    setHistory((prev) => {
      const next = [entry, ...prev.filter((h) => h.url !== entry.url)].slice(0, HISTORY_MAX);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* storage may be unavailable (private mode) */
      }
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const performScan = useCallback(
    async (targetUrl: string) => {
      const trimmed = targetUrl.trim();
      if (!trimmed) {
        setError(c.errInvalid);
        return;
      }
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const res = await fetch('/api/security-scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmed }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error === 'invalid_url' ? c.errInvalid : c.errFetch);
          return;
        }
        const scan = data as ScanResponse;
        setResult(scan);
        pushHistory({ url: scan.finalUrl, score: scan.score });
      } catch {
        setError(c.errGeneric);
      } finally {
        setLoading(false);
      }
    },
    [c, pushHistory]
  );

  const runScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    performScan(url);
  };

  const runFromHistory = (entry: HistoryEntry) => {
    if (loading) return;
    setUrl(entry.url);
    performScan(entry.url);
  };

  const issues = result
    ? result.checks.filter((ck) => ck.status !== 'pass').length
    : 0;

  const waHref = result
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        c.waMsg(result.finalUrl, result.score)
      )}`
    : `https://wa.me/${WHATSAPP}`;

  const tlsDays = result?.tls?.daysRemaining;

  return (
    <main className="bg-dark min-h-screen text-light">
      {/* Hero + form */}
      <section className="py-20 px-4 text-center border-b border-yellow/10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark bg-yellow px-3 py-1 rounded-full mb-5">
              <FaShieldAlt /> {c.badge}
            </span>
            <h1 className="text-yellow font-bold text-3xl md:text-5xl mb-5 leading-tight">
              {c.title}
            </h1>
            <p className="text-light/70 text-lg leading-relaxed mb-10">{c.subtitle}</p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <form
              onSubmit={runScan}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            >
              <div className="flex-1 flex items-center gap-3 bg-muted/20 border border-yellow/25 rounded-xl px-4 focus-within:border-yellow transition-colors">
                <FaLock className="text-yellow shrink-0" />
                <input
                  type="text"
                  inputMode="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={c.placeholder}
                  className="flex-1 bg-transparent py-4 text-light placeholder-light/40 focus:outline-none text-sm"
                  aria-label={c.placeholder}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow text-dark font-bold px-7 py-4 rounded-xl hover:bg-pink hover:text-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> {c.analyzing}
                  </>
                ) : (
                  c.analyze
                )}
              </button>
            </form>
            {error && (
              <p className="text-pink text-sm mt-4 bg-pink/10 border border-pink/30 rounded-lg px-4 py-2 inline-block">
                {error}
              </p>
            )}
            <p className="text-light/40 text-xs mt-4">{c.disclaimer}</p>

            {/* Recent scans (persisted in localStorage) */}
            {history.length > 0 && (
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <FaHistory className="text-light/40 text-xs" />
                  <span className="text-light/50 text-xs uppercase tracking-widest">
                    {c.recentTitle}
                  </span>
                  <button
                    onClick={clearHistory}
                    className="text-light/30 hover:text-pink transition-colors text-xs ml-1 inline-flex items-center gap-1"
                  >
                    <FaTimes className="text-[10px]" /> {c.clearHistory}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {history.map((h) => {
                    const dot =
                      h.score >= 90 ? 'bg-green-400' : h.score >= 50 ? 'bg-yellow' : 'bg-pink';
                    let host = h.url;
                    try {
                      host = new URL(h.url).hostname.replace(/^www\./, '');
                    } catch {
                      /* keep raw */
                    }
                    return (
                      <button
                        key={h.url}
                        onClick={() => runFromHistory(h)}
                        disabled={loading}
                        className="group flex items-center gap-2 bg-muted/20 border border-yellow/20 rounded-full pl-2.5 pr-3 py-1.5 text-sm text-light/80 hover:border-yellow hover:text-light transition-colors disabled:opacity-50"
                        title={h.url}
                      >
                        <span className={`w-2 h-2 rounded-full ${dot}`} />
                        <span className="max-w-[12rem] truncate">{host}</span>
                        <span className="text-light/40 text-xs font-mono">{h.score}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto flex flex-col gap-12">
            {/* Score + analyzed url */}
            <ScrollReveal direction="up">
              <div className="flex flex-col items-center gap-3">
                <ScoreRing score={result.score} label={c.scoreLabel} />
                <p className="text-light/50 text-xs break-all text-center">
                  {c.analyzedUrl}: <span className="text-light/80">{result.finalUrl}</span>
                </p>
                <p className="text-light font-semibold text-center">
                  {c.issuesFound(issues)}
                </p>
              </div>
            </ScrollReveal>

            {/* TLS certificate + HTTPS redirect */}
            {(result.tls || result.https) && (
              <ScrollReveal direction="up" delay={0.05}>
                <div className="bg-muted/10 border border-yellow/15 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <FaCertificate className="text-yellow" />
                    <h2 className="text-yellow font-bold text-lg text-center">
                      {c.tlsTitle}
                    </h2>
                  </div>

                  {result.tls ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        {result.tls.valid ? (
                          <FaCheckCircle className="text-green-400" />
                        ) : (
                          <FaTimesCircle className="text-pink" />
                        )}
                        <span className={result.tls.valid ? 'text-light' : 'text-pink'}>
                          {result.tls.valid ? c.tlsValid : c.tlsInvalid}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 justify-center text-sm">
                        {result.tls.issuer && (
                          <span className="bg-dark border border-yellow/20 rounded-lg px-3 py-1.5 text-light/80">
                            <span className="text-light/40">{c.tlsIssuer}:</span>{' '}
                            <span className="font-semibold text-light">{result.tls.issuer}</span>
                          </span>
                        )}
                        {result.tls.protocol && (
                          <span className="bg-dark border border-yellow/20 rounded-lg px-3 py-1.5 text-light/80">
                            <span className="text-light/40">{c.tlsProtocol}:</span>{' '}
                            <span className="font-semibold text-light">{result.tls.protocol}</span>
                          </span>
                        )}
                        {typeof tlsDays === 'number' && (
                          <span
                            className={`rounded-lg px-3 py-1.5 border ${
                              tlsDays < 0
                                ? 'bg-pink/10 border-pink/30 text-pink'
                                : tlsDays <= 15
                                ? 'bg-yellow/10 border-yellow/30 text-yellow'
                                : 'bg-dark border-yellow/20 text-light/80'
                            }`}
                          >
                            <span className="opacity-60">{c.tlsExpires}:</span>{' '}
                            <span className="font-semibold">{c.tlsDays(tlsDays)}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-light/50 text-sm text-center">—</p>
                  )}

                  {/* HTTPS redirect */}
                  {result.https && result.redirectsToHttps !== null && (
                    <div className="mt-6 pt-5 border-t border-yellow/10 flex items-center justify-center gap-2 text-sm text-center">
                      {result.redirectsToHttps ? (
                        <>
                          <FaCheckCircle className="text-green-400 shrink-0" />
                          <span className="text-light/80">{c.redirectOk}</span>
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="text-yellow shrink-0" />
                          <span className="text-light/80">{c.redirectFail}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* Header checks */}
            <ScrollReveal direction="up" delay={0.05}>
              <div>
                <h2 className="text-yellow font-bold text-lg mb-5 text-center">
                  {c.checksTitle}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {result.checks.map((ck) => {
                    const meta = CHECK_META[ck.id]?.[lang];
                    if (!meta) return null;
                    const [label, fix] = meta;
                    return (
                      <li
                        key={ck.id}
                        className={`flex items-start gap-3 rounded-xl p-4 border ${
                          ck.status === 'pass'
                            ? 'border-green-400/20 bg-green-400/5'
                            : ck.status === 'warn'
                            ? 'border-yellow/20 bg-yellow/5'
                            : 'border-pink/25 bg-pink/5'
                        }`}
                      >
                        <span className="text-lg mt-0.5">{STATUS_ICON[ck.status]}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-light font-semibold text-sm">{label}</span>
                            <span
                              className={`text-[10px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded ${
                                ck.present
                                  ? 'bg-green-400/10 text-green-400'
                                  : 'bg-pink/10 text-pink'
                              }`}
                            >
                              {ck.present ? c.presentLabel : c.missingLabel}
                            </span>
                          </div>
                          {ck.value && (
                            <p className="text-light/40 text-xs mt-1 font-mono break-all">
                              {ck.value}
                            </p>
                          )}
                          {ck.status !== 'pass' && (
                            <p className="text-light/60 text-xs mt-1 leading-relaxed">{fix}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </ScrollReveal>

            {/* Sales CTA */}
            <ScrollReveal direction="up" delay={0.05}>
              <div className="bg-gradient-to-br from-pink/15 via-dark to-yellow/10 border border-pink/30 rounded-2xl p-8 text-center">
                <h2 className="text-yellow font-bold text-2xl mb-3">{c.ctaTitle}</h2>
                <p className="text-light/70 text-sm max-w-xl mx-auto mb-7 leading-relaxed">
                  {c.ctaDesc}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-7 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
                  >
                    <FaWhatsapp className="text-lg" /> {c.ctaWhatsapp}
                  </a>
                  <Link
                    href={`/contacto?servicio=${encodeURIComponent(
                      `Análisis de seguridad (${result.finalUrl})`
                    )}`}
                    className="inline-flex items-center gap-2 bg-yellow text-dark font-bold px-7 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
                  >
                    <FaFileSignature /> {c.ctaBudget}
                  </Link>
                </div>
                <button
                  onClick={() => {
                    setResult(null);
                    setUrl('');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="block mx-auto mt-6 text-light/50 text-xs hover:text-yellow transition-colors underline"
                >
                  {c.newScan}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </main>
  );
}
