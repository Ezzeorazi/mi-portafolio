import type { Metadata } from 'next';
import ServicesPageContent from '@/components/ServicesPageContent';

export const metadata: Metadata = {
  title: 'Servicios | Ezequiel Orazi — Desarrollo Web Freelance',
  description:
    'Servicios de desarrollo web profesional: landing pages, sitios dinámicos con Sanity/Strapi y tiendas online. Precios claros en USD. Next.js, TypeScript, Tailwind CSS.',
  keywords: [
    'desarrollo web',
    'freelance',
    'Next.js',
    'landing page',
    'e-commerce',
    'Sanity',
    'Strapi',
    'Argentina',
    'México',
    'Colombia',
  ],
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
