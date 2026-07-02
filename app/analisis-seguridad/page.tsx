import type { Metadata } from 'next';
import SecurityScanTool from '@/components/SecurityScanTool';

export const metadata: Metadata = {
  title: 'Análisis de Seguridad Web Gratis | Test de Cabeceras HTTP y SSL',
  description:
    'Herramienta gratuita para analizar la seguridad de tu sitio web al instante: cabeceras HTTP (HSTS, CSP, X-Frame-Options), certificado SSL/TLS y cookies. Diagnóstico sin registro.',
  keywords: [
    'análisis de seguridad web',
    'test cabeceras HTTP',
    'security headers checker',
    'analizar SSL gratis',
    'HSTS',
    'Content-Security-Policy',
    'clickjacking',
    'certificado SSL',
    'seguridad sitio web',
    'auditoría de seguridad gratis',
  ],
  alternates: { canonical: 'https://ezequiel-orazi.online/analisis-seguridad' },
  openGraph: {
    title: 'Análisis de Seguridad Web Gratis | Cabeceras HTTP y SSL',
    description:
      'Diagnóstico de seguridad instantáneo de tu web: cabeceras HTTP, certificado SSL/TLS y cookies. Gratis y sin registro.',
    url: 'https://ezequiel-orazi.online/analisis-seguridad',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Análisis de Seguridad Web Gratis — Ezequiel Orazi',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Web',
  url: 'https://ezequiel-orazi.online/analisis-seguridad',
  description:
    'Herramienta gratuita para analizar la seguridad de un sitio web: cabeceras HTTP de seguridad (HSTS, CSP, X-Frame-Options), certificado SSL/TLS y configuración de cookies.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: {
    '@type': 'Person',
    name: 'Ezequiel Orazi',
    url: 'https://ezequiel-orazi.online',
  },
};

export default function AnalisisSeguridadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SecurityScanTool />
    </>
  );
}
