'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  FaSearch, FaCheckCircle, FaExclamationTriangle, FaTimesCircle,
  FaWhatsapp, FaFileSignature, FaBolt, FaSpinner, FaGoogle,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

// WhatsApp number (from contact page: +52 9982017863)
const WHATSAPP = '529982017863';

type CheckStatus = 'pass' | 'warn' | 'fail';
interface CheckResult { id: string; status: CheckStatus; detail?: string }
interface PageSpeedScores {
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  metrics: { lcp?: string; cls?: string; fcp?: string; tbt?: string; si?: string };
}
interface AuditResponse {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  onpage: { score: number; checks: CheckResult[] };
  pagespeed: PageSpeedScores | null;
}

type Lang = 'es' | 'en';

// ─── Bilingual copy ───────────────────────────────────────────────────────────

const COPY = {
  es: {
    badge: 'Herramienta gratuita',
    title: 'Analizá el SEO de tu sitio en 30 segundos',
    subtitle:
      'Pegá la URL de tu página y obtené un diagnóstico técnico instantáneo: velocidad, SEO, accesibilidad y los puntos exactos que están frenando tu posicionamiento en Google.',
    placeholder: 'https://tu-sitio.com',
    analyze: 'Analizar mi sitio',
    analyzing: 'Analizando tu sitio…',
    disclaimer: 'Sin registro. Datos de Google Lighthouse + análisis técnico on-page.',
    errInvalid: 'Ingresá una URL válida (ej: tu-sitio.com).',
    errFetch: 'No pudimos acceder a esa URL. Verificá que el sitio esté online y sea público.',
    errGeneric: 'Algo salió mal. Intentá de nuevo en unos segundos.',
    scoreLabel: 'Salud SEO on-page',
    pagespeedTitle: 'Rendimiento real (Google Lighthouse)',
    pagespeedNote: 'Medido en móvil con el mismo motor que usa Google para rankear.',
    metricsTitle: 'Métricas clave (Core Web Vitals)',
    checksTitle: 'Diagnóstico técnico on-page',
    analyzedUrl: 'Analizado',
    perf: 'Rendimiento',
    seo: 'SEO',
    a11y: 'Accesibilidad',
    bp: 'Buenas prácticas',
    issuesFound: (n: number) =>
      n === 0
        ? '¡Excelente! No detectamos problemas críticos.'
        : `Detectamos ${n} ${n === 1 ? 'punto de mejora' : 'puntos de mejora'} en tu sitio.`,
    ctaTitle: '¿Querés que lo solucione por vos?',
    ctaDesc:
      'Implemento cada una de estas mejoras con SEO técnico + IA para que aparezcas antes que tu competencia en Google, ChatGPT y Perplexity. Diagnóstico completo y plan de acción sin compromiso.',
    ctaWhatsapp: 'Consultar por WhatsApp',
    ctaBudget: 'Pedir presupuesto',
    waMsg: (url: string, score: number) =>
      `Hola Ezequiel! Usé tu herramienta de auditoría SEO en ${url} y me dio ${score}/100 de salud on-page. Me gustaría mejorar el posicionamiento de mi sitio. ¿Cómo podemos avanzar?`,
    newScan: 'Analizar otra URL',
  },
  en: {
    badge: 'Free tool',
    title: 'Check your website SEO in 30 seconds',
    subtitle:
      'Paste your page URL and get an instant technical diagnosis: speed, SEO, accessibility and the exact issues holding back your Google ranking.',
    placeholder: 'https://your-site.com',
    analyze: 'Analyze my site',
    analyzing: 'Analyzing your site…',
    disclaimer: 'No sign-up. Google Lighthouse data + on-page technical analysis.',
    errInvalid: 'Enter a valid URL (e.g. your-site.com).',
    errFetch: "We couldn't reach that URL. Make sure the site is online and public.",
    errGeneric: 'Something went wrong. Please try again in a few seconds.',
    scoreLabel: 'On-page SEO health',
    pagespeedTitle: 'Real performance (Google Lighthouse)',
    pagespeedNote: 'Measured on mobile with the same engine Google uses to rank.',
    metricsTitle: 'Key metrics (Core Web Vitals)',
    checksTitle: 'On-page technical diagnosis',
    analyzedUrl: 'Analyzed',
    perf: 'Performance',
    seo: 'SEO',
    a11y: 'Accessibility',
    bp: 'Best practices',
    issuesFound: (n: number) =>
      n === 0
        ? 'Excellent! No critical issues detected.'
        : `We found ${n} ${n === 1 ? 'improvement point' : 'improvement points'} on your site.`,
    ctaTitle: 'Want me to fix it for you?',
    ctaDesc:
      'I implement every one of these improvements with technical SEO + AI so you rank ahead of your competitors on Google, ChatGPT and Perplexity. Full diagnosis and action plan, no commitment.',
    ctaWhatsapp: 'Ask on WhatsApp',
    ctaBudget: 'Request a quote',
    waMsg: (url: string, score: number) =>
      `Hi Ezequiel! I used your SEO audit tool on ${url} and got ${score}/100 on-page health. I'd like to improve my site's ranking. How can we move forward?`,
    newScan: 'Analyze another URL',
  },
} as const;

// id → { label, fix } per language
const CHECK_META: Record<string, { es: [string, string]; en: [string, string] }> = {
  https: {
    es: ['Conexión segura (HTTPS)', 'Google penaliza los sitios sin HTTPS. Es imprescindible un certificado SSL.'],
    en: ['Secure connection (HTTPS)', 'Google penalizes sites without HTTPS. An SSL certificate is essential.'],
  },
  title: {
    es: ['Etiqueta de título', 'El título ideal tiene entre 30 y 65 caracteres con tu keyword principal.'],
    en: ['Title tag', 'The ideal title is 30–65 characters and includes your main keyword.'],
  },
  description: {
    es: ['Meta descripción', 'Una descripción de 70–160 caracteres mejora el CTR en los resultados de Google.'],
    en: ['Meta description', 'A 70–160 character description improves your click-through rate on Google.'],
  },
  h1: {
    es: ['Encabezado H1 único', 'Debe haber exactamente un H1 que resuma el tema de la página.'],
    en: ['Single H1 heading', 'There should be exactly one H1 summarizing the page topic.'],
  },
  headings: {
    es: ['Estructura de encabezados', 'Usar H2/H3 organiza el contenido y ayuda a Google a entenderlo.'],
    en: ['Heading structure', 'Using H2/H3 organizes content and helps Google understand it.'],
  },
  img_alt: {
    es: ['Texto alternativo en imágenes', 'El atributo alt mejora la accesibilidad y el SEO de imágenes.'],
    en: ['Image alt text', 'The alt attribute improves accessibility and image SEO.'],
  },
  viewport: {
    es: ['Optimización móvil (viewport)', 'Sin viewport tu sitio no se adapta a celulares: Google rankea mobile-first.'],
    en: ['Mobile optimization (viewport)', 'Without a viewport your site breaks on phones — Google ranks mobile-first.'],
  },
  lang: {
    es: ['Idioma declarado', 'El atributo lang ayuda a buscadores y lectores de pantalla.'],
    en: ['Declared language', 'The lang attribute helps search engines and screen readers.'],
  },
  canonical: {
    es: ['URL canónica', 'Evita contenido duplicado indicando la versión principal de la página.'],
    en: ['Canonical URL', 'Prevents duplicate content by pointing to the main version of the page.'],
  },
  open_graph: {
    es: ['Open Graph (redes sociales)', 'Controla cómo se ve tu sitio al compartirlo en redes y WhatsApp.'],
    en: ['Open Graph (social)', 'Controls how your site looks when shared on social media and WhatsApp.'],
  },
  twitter: {
    es: ['Twitter Card', 'Mejora la vista previa de tus enlaces en X/Twitter.'],
    en: ['Twitter Card', 'Improves how your links preview on X/Twitter.'],
  },
  structured_data: {
    es: ['Datos estructurados (Schema)', 'El Schema Markup habilita Rich Snippets y respuestas en IA (AEO).'],
    en: ['Structured data (Schema)', 'Schema Markup enables Rich Snippets and AI answers (AEO).'],
  },
  charset: {
    es: ['Codificación de caracteres', 'Declarar el charset evita errores de acentos y símbolos.'],
    en: ['Character encoding', 'Declaring the charset prevents broken accents and symbols.'],
  },
  indexable: {
    es: ['Indexable por Google', '¡Atención! Una etiqueta noindex impide que Google muestre tu página.'],
    en: ['Indexable by Google', 'Warning! A noindex tag stops Google from showing your page.'],
  },
  favicon: {
    es: ['Favicon', 'El ícono del sitio refuerza tu marca en pestañas y resultados.'],
    en: ['Favicon', "The site icon strengthens your brand in tabs and results."],
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

function MiniScore({ value, label }: { value: number | null; label: string }) {
  if (value === null) return null;
  const color = value >= 90 ? 'text-green-400' : value >= 50 ? 'text-yellow' : 'text-pink';
  const ring = value >= 90 ? 'border-green-400' : value >= 50 ? 'border-yellow' : 'border-pink';
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-16 h-16 rounded-full border-4 ${ring} flex items-center justify-center`}>
        <span className={`text-lg font-bold ${color}`}>{value}</span>
      </div>
      <span className="text-light/60 text-xs text-center">{label}</span>
    </div>
  );
}

const STATUS_ICON: Record<CheckStatus, React.ReactNode> = {
  pass: <FaCheckCircle className="text-green-400 shrink-0" />,
  warn: <FaExclamationTriangle className="text-yellow shrink-0" />,
  fail: <FaTimesCircle className="text-pink shrink-0" />,
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SeoAuditTool() {
  const { language } = useTranslation();
  const lang = (language as Lang) === 'en' ? 'en' : 'es';
  const c = COPY[lang];

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResponse | null>(null);

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!url.trim()) {
      setError(c.errInvalid);
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error === 'invalid_url' ? c.errInvalid : c.errFetch);
        return;
      }
      setResult(data as AuditResponse);
    } catch {
      setError(c.errGeneric);
    } finally {
      setLoading(false);
    }
  };

  const issues = result
    ? result.onpage.checks.filter((ck) => ck.status !== 'pass').length
    : 0;

  const waHref = result
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        c.waMsg(result.finalUrl, result.onpage.score)
      )}`
    : `https://wa.me/${WHATSAPP}`;

  return (
    <main className="bg-dark min-h-screen text-light">
      {/* Hero + form */}
      <section className="py-20 px-4 text-center border-b border-yellow/10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark bg-yellow px-3 py-1 rounded-full mb-5">
              <FaBolt /> {c.badge}
            </span>
            <h1 className="text-yellow font-bold text-3xl md:text-5xl mb-5 leading-tight">
              {c.title}
            </h1>
            <p className="text-light/70 text-lg leading-relaxed mb-10">{c.subtitle}</p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <form
              onSubmit={runAudit}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            >
              <div className="flex-1 flex items-center gap-3 bg-muted/20 border border-yellow/25 rounded-xl px-4 focus-within:border-yellow transition-colors">
                <FaSearch className="text-yellow shrink-0" />
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
                <ScoreRing score={result.onpage.score} label={c.scoreLabel} />
                <p className="text-light/50 text-xs break-all text-center">
                  {c.analyzedUrl}: <span className="text-light/80">{result.finalUrl}</span>
                </p>
                <p className="text-light font-semibold text-center">
                  {c.issuesFound(issues)}
                </p>
              </div>
            </ScrollReveal>

            {/* PageSpeed */}
            {result.pagespeed && (
              <ScrollReveal direction="up" delay={0.05}>
                <div className="bg-muted/10 border border-yellow/15 rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-1 justify-center">
                    <FaGoogle className="text-yellow" />
                    <h2 className="text-yellow font-bold text-lg text-center">
                      {c.pagespeedTitle}
                    </h2>
                  </div>
                  <p className="text-light/50 text-xs text-center mb-6">{c.pagespeedNote}</p>
                  <div className="flex flex-wrap gap-6 justify-center">
                    <MiniScore value={result.pagespeed.performance} label={c.perf} />
                    <MiniScore value={result.pagespeed.seo} label={c.seo} />
                    <MiniScore value={result.pagespeed.accessibility} label={c.a11y} />
                    <MiniScore value={result.pagespeed.bestPractices} label={c.bp} />
                  </div>

                  {/* Core Web Vitals */}
                  {(result.pagespeed.metrics.lcp || result.pagespeed.metrics.cls) && (
                    <div className="mt-7 pt-6 border-t border-yellow/10">
                      <h3 className="text-light/50 text-xs uppercase tracking-widest text-center mb-4">
                        {c.metricsTitle}
                      </h3>
                      <div className="flex flex-wrap gap-3 justify-center text-sm">
                        {([
                          ['LCP', result.pagespeed.metrics.lcp],
                          ['CLS', result.pagespeed.metrics.cls],
                          ['FCP', result.pagespeed.metrics.fcp],
                          ['TBT', result.pagespeed.metrics.tbt],
                          ['Speed Index', result.pagespeed.metrics.si],
                        ] as const)
                          .filter(([, v]) => v)
                          .map(([k, v]) => (
                            <span
                              key={k}
                              className="bg-dark border border-yellow/20 rounded-lg px-3 py-1.5 text-light/80"
                            >
                              <span className="text-light/40">{k}:</span>{' '}
                              <span className="font-semibold text-light">{v}</span>
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* On-page checks */}
            <ScrollReveal direction="up" delay={0.05}>
              <div>
                <h2 className="text-yellow font-bold text-lg mb-5 text-center">
                  {c.checksTitle}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {result.onpage.checks.map((ck) => {
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
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-light font-semibold text-sm">{label}</span>
                            {ck.detail && (
                              <span className="text-light/40 text-xs font-mono">
                                {ck.detail}
                              </span>
                            )}
                          </div>
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
                      `Auditoría SEO (${result.finalUrl})`
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
