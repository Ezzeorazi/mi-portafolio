import type { Metadata } from 'next';
import ServicesPageContent from '@/components/ServicesPageContent';

export const metadata: Metadata = {
  title: 'Servicios | Ezequiel Orazi — Desarrollo Web Freelance',
  description:
    'Servicios de desarrollo web y SEO con IA: landing pages, sitios dinámicos, tiendas online y posicionamiento en Google con Claude AI. Precios claros en USD.',
  keywords: [
    'desarrollo web',
    'freelance',
    'Next.js',
    'landing page',
    'e-commerce',
    'SEO con inteligencia artificial',
    'AEO',
    'posicionamiento web',
    'Claude AI',
    'Argentina',
    'México',
    'Colombia',
  ],
  alternates: { canonical: 'https://ezequiel-orazi.online/services' },
};

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ezequiel Orazi — Desarrollo Web Freelance',
  description:
    'Servicios de desarrollo web profesional: landing pages, sitios dinámicos, tiendas online y SEO con IA. Next.js, TypeScript, Tailwind CSS. Clientes en México, Argentina, Colombia y España.',
  url: 'https://ezequiel-orazi.online/services',
  image: 'https://ezequiel-orazi.online/images/projects/pagePortafolio.webp',
  email: 'mailto:ezequiel.orazi90@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Playa del Carmen',
    addressRegion: 'Quintana Roo',
    addressCountry: 'MX',
  },
  areaServed: [
    { '@type': 'Country', name: 'Mexico' },
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'Country', name: 'Colombia' },
    { '@type': 'Country', name: 'Chile' },
    { '@type': 'Country', name: 'Spain' },
  ],
  provider: {
    '@type': 'Person',
    name: 'Ezequiel Orazi',
    url: 'https://ezequiel-orazi.online',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Desarrollo Web',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Web Institucional / Landing Page',
        description:
          'Diseño responsive, SEO básico, botón de WhatsApp, formulario de contacto y rendimiento Lighthouse 90+.',
        price: '180',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Web Dinámica + Gestión de Datos',
        description:
          'Panel de administración con Sanity o Strapi, base de datos en la nube, catálogo, SEO avanzado.',
        price: '490',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'E-commerce / Tienda Online',
        description:
          'Carrito de compras, integración con Mercado Pago/Stripe/PayPal, control de stock, panel de pedidos.',
        price: '890',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'SEO con IA — Posicionamiento en Google y en IA',
        description:
          'Auditoría SEO, AEO para ChatGPT y Perplexity, Schema Markup, investigación de keywords con Claude AI.',
        price: '150',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Soporte y Mantenimiento Mensual',
        description:
          'Monitoreo de seguridad, 3 modificaciones mensuales, actualización de dependencias.',
        price: '45',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <ServicesPageContent />
    </>
  );
}
