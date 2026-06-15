import type { Metadata } from 'next';
import SeoAuditTool from '@/components/SeoAuditTool';

export const metadata: Metadata = {
  title: 'Análisis SEO Gratis | Mide el SEO de tu Sitio Web',
  description:
    'Herramienta gratuita para medir el SEO de tu sitio web al instante: velocidad, SEO técnico, accesibilidad y Core Web Vitals con Google Lighthouse. Diagnóstico sin registro.',
  keywords: [
    'análisis SEO gratis',
    'medir SEO de mi sitio',
    'test SEO online',
    'auditoría SEO gratuita',
    'PageSpeed',
    'Core Web Vitals',
    'velocidad web',
    'optimización SEO',
    'checker SEO',
  ],
  alternates: { canonical: 'https://ezequiel-orazi.online/auditoria-seo' },
  openGraph: {
    title: 'Análisis SEO Gratis | Mide el SEO de tu Sitio Web',
    description:
      'Diagnóstico SEO instantáneo de tu web: velocidad, SEO técnico, accesibilidad y Core Web Vitals. Gratis y sin registro.',
    url: 'https://ezequiel-orazi.online/auditoria-seo',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Análisis SEO Gratis — Ezequiel Orazi',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://ezequiel-orazi.online/auditoria-seo',
  description:
    'Herramienta gratuita para medir el SEO de un sitio web: velocidad, SEO técnico on-page, accesibilidad y Core Web Vitals con Google Lighthouse.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: {
    '@type': 'Person',
    name: 'Ezequiel Orazi',
    url: 'https://ezequiel-orazi.online',
  },
};

export default function AuditoriaSeoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoAuditTool />
    </>
  );
}
