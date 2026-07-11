'use client';
import { useState } from 'react';
import {
  FaRobot, FaSearch, FaEnvelope, FaGlobeAmericas, FaSpinner, FaCheckCircle, FaBolt,
} from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';
import {
  DEFAULT_REGION, SERP_REGIONS, TOOL_API_ENDPOINT, MAX_ANALYSES_PER_DAY,
} from '@/lib/tools/serp-farm/config';

type Lang = 'es' | 'en';

const COPY = {
  es: {
    badge: 'Herramienta interna',
    title: 'Detector de granjas de contenido',
    subtitle:
      'Ingresá un keyword y tu email. Analizamos los primeros ~50 resultados de búsqueda y estimamos qué porcentaje son sitios de baja calidad o coordinados (content farms, PBN). El informe te llega por correo.',
    keywordLabel: 'Keyword a analizar',
    keywordPlaceholder: 'ej: seguro médico para autónomos',
    emailLabel: 'Tu email',
    emailPlaceholder: 'donde te mandamos el informe',
    regionLabel: 'Región de búsqueda',
    submit: 'Analizar y enviarme el informe',
    submitting: 'Encolando el análisis…',
    disclaimer:
      'El análisis corre en segundo plano y puede tardar unos minutos. Datos de DuckDuckGo, no del ranking de Google.',
    successTitle: '¡Listo! Tu análisis está en cola.',
    successBody: (email: string) =>
      `Te lo mandamos por mail a ${email} en unos minutos. Revisá también spam/promociones.`,
    another: 'Analizar otro keyword',
    errInvalidKeyword: 'Ingresá un keyword válido (entre 2 y 120 caracteres).',
    errInvalidEmail: 'Ingresá un email válido (no se aceptan correos temporales).',
    errRateLimited: `Alcanzaste el máximo de ${MAX_ANALYSES_PER_DAY} análisis por día. Probá mañana.`,
    errGeneric: 'Algo salió mal. Intentá de nuevo en unos segundos.',
  },
  en: {
    badge: 'Internal tool',
    title: 'Content farm detector',
    subtitle:
      'Enter a keyword and your email. We analyze the top ~50 search results and estimate what share are low-quality or coordinated sites (content farms, PBN). The report arrives by email.',
    keywordLabel: 'Keyword to analyze',
    keywordPlaceholder: 'e.g. health insurance for freelancers',
    emailLabel: 'Your email',
    emailPlaceholder: 'where we send the report',
    regionLabel: 'Search region',
    submit: 'Analyze and email me the report',
    submitting: 'Queuing the analysis…',
    disclaimer:
      'The analysis runs in the background and may take a few minutes. Data from DuckDuckGo, not Google rankings.',
    successTitle: 'Done! Your analysis is queued.',
    successBody: (email: string) =>
      `We'll email it to ${email} in a few minutes. Check spam/promotions too.`,
    another: 'Analyze another keyword',
    errInvalidKeyword: 'Enter a valid keyword (2–120 characters).',
    errInvalidEmail: 'Enter a valid email (temporary addresses are not accepted).',
    errRateLimited: `You reached the max of ${MAX_ANALYSES_PER_DAY} analyses per day. Try again tomorrow.`,
    errGeneric: 'Something went wrong. Please try again in a few seconds.',
  },
} as const;

const ERROR_KEYS: Record<string, keyof (typeof COPY)['es']> = {
  invalid_keyword: 'errInvalidKeyword',
  invalid_email: 'errInvalidEmail',
  rate_limited: 'errRateLimited',
};

export default function SerpFarmTool() {
  const { language } = useTranslation();
  const lang = (language as Lang) === 'en' ? 'en' : 'es';
  const c = COPY[lang];

  const [keyword, setKeyword] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState<string>(DEFAULT_REGION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(TOOL_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, email, region }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const key = ERROR_KEYS[data?.error as string];
        setError(key ? (c[key] as string) : c.errGeneric);
        return;
      }
      setSentTo(email.trim());
    } catch {
      setError(c.errGeneric);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSentTo(null);
    setKeyword('');
    setError(null);
  };

  return (
    <main className="bg-dark min-h-screen text-light">
      <section className="py-20 px-4 text-center border-b border-yellow/10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark bg-yellow px-3 py-1 rounded-full mb-5">
              <FaRobot /> {c.badge}
            </span>
            <h1 className="text-yellow font-bold text-3xl md:text-5xl mb-5 leading-tight">
              {c.title}
            </h1>
            <p className="text-light/70 text-lg leading-relaxed mb-10">{c.subtitle}</p>
          </ScrollReveal>

          {!sentTo ? (
            <ScrollReveal direction="up" delay={0.1}>
              <form onSubmit={submit} className="flex flex-col gap-5 max-w-xl mx-auto text-left">
                {/* Keyword */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="keyword" className="text-light/70 text-sm font-medium">
                    {c.keywordLabel}
                  </label>
                  <div className="flex items-center gap-3 bg-muted/20 border border-yellow/25 rounded-xl px-4 focus-within:border-yellow transition-colors">
                    <FaSearch className="text-yellow shrink-0" />
                    <input
                      id="keyword"
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder={c.keywordPlaceholder}
                      className="flex-1 bg-transparent py-3.5 text-light placeholder-light/40 focus:outline-none text-sm"
                      maxLength={120}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-light/70 text-sm font-medium">
                    {c.emailLabel}
                  </label>
                  <div className="flex items-center gap-3 bg-muted/20 border border-yellow/25 rounded-xl px-4 focus-within:border-yellow transition-colors">
                    <FaEnvelope className="text-yellow shrink-0" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={c.emailPlaceholder}
                      className="flex-1 bg-transparent py-3.5 text-light placeholder-light/40 focus:outline-none text-sm"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Región */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="region" className="text-light/70 text-sm font-medium">
                    {c.regionLabel}
                  </label>
                  <div className="flex items-center gap-3 bg-muted/20 border border-yellow/25 rounded-xl px-4 focus-within:border-yellow transition-colors">
                    <FaGlobeAmericas className="text-yellow shrink-0" />
                    <select
                      id="region"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="flex-1 bg-transparent py-3.5 text-light focus:outline-none text-sm [&>option]:bg-dark"
                    >
                      {SERP_REGIONS.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 bg-yellow text-dark font-bold px-7 py-4 rounded-xl hover:bg-pink hover:text-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" /> {c.submitting}
                    </>
                  ) : (
                    <>
                      <FaBolt /> {c.submit}
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-pink text-sm bg-pink/10 border border-pink/30 rounded-lg px-4 py-2">
                    {error}
                  </p>
                )}
                <p className="text-light/40 text-xs">{c.disclaimer}</p>
              </form>
            </ScrollReveal>
          ) : (
            <ScrollReveal direction="up">
              <div className="max-w-xl mx-auto bg-gradient-to-br from-yellow/10 via-dark to-pink/10 border border-yellow/30 rounded-2xl p-8 text-center">
                <FaCheckCircle className="text-green-400 text-4xl mx-auto mb-4" />
                <h2 className="text-yellow font-bold text-2xl mb-3">{c.successTitle}</h2>
                <p className="text-light/70 text-sm leading-relaxed mb-7">
                  {c.successBody(sentTo)}
                </p>
                <button
                  onClick={reset}
                  className="text-light/60 text-sm hover:text-yellow transition-colors underline"
                >
                  {c.another}
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}
