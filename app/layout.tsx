import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ezequiel-orazi.online'),
  title: {
    default: 'Eze Orazi | Desarrollo Web y Soluciones Digitales',
    template: '%s | Eze Orazi',
  },
  description:
    'Ezequiel Orazi, desarrollador web freelance especializado en Next.js, TypeScript y Tailwind CSS. Sitios web rápidos, SEO con IA y posicionamiento en Google, ChatGPT y Perplexity. Desde $180 USD.',
  keywords: [
    'Ezequiel Orazi',
    'desarrollador web freelance',
    'desarrollo web',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'SEO con inteligencia artificial',
    'AEO posicionamiento IA',
    'landing page',
    'ecommerce',
    'Playa del Carmen',
    'desarrollador web México',
    'desarrollador web Argentina',
    'desarrollo web Colombia',
    'freelancer web LATAM',
  ],
  authors: [{ name: 'Ezequiel Orazi' }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://ezequiel-orazi.online',
    languages: {
      'es': 'https://ezequiel-orazi.online',
      'es-MX': 'https://ezequiel-orazi.online',
      'es-AR': 'https://ezequiel-orazi.online',
      'es-CO': 'https://ezequiel-orazi.online',
      'es-CL': 'https://ezequiel-orazi.online',
      'en': 'https://ezequiel-orazi.online',
      'x-default': 'https://ezequiel-orazi.online',
    },
  },
  openGraph: {
    title: 'Eze Orazi | Desarrollo Web Profesional',
    description:
      'Soluciones web modernas con React, Spring Boot y WordPress. Sitios optimizados para crecer.',
    type: 'website',
    url: 'https://ezequiel-orazi.online',
    images: [
      {
        url: '/images/projects/pagePortafolio.webp',
        width: 1200,
        height: 630,
        alt: 'Ezequiel Orazi Portfolio',
      },
    ],
    locale: 'es_MX',
    siteName: 'Ezequiel Orazi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eze Orazi | Desarrollo Web Profesional',
    description: 'Soluciones web modernas con React, Spring Boot y WordPress.',
    images: ['/images/projects/pagePortafolio.webp'],
  },
  icons: {
    icon: '/icons/favicon-perfil.svg',
    apple: '/icons/favicon-perfil.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#111111',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ezequiel Orazi',
  alternateName: 'Eze Orazi',
  url: 'https://ezequiel-orazi.online',
  image: 'https://ezequiel-orazi.online/images/projects/pagePortafolio.webp',
  jobTitle: 'Desarrollador Web Freelance',
  description:
    'Desarrollador web freelance especializado en Next.js, TypeScript y Tailwind CSS. Servicios de diseño web, e-commerce y SEO con inteligencia artificial para negocios de América Latina.',
  email: 'mailto:ezequiel.orazi90@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/ezequiel-orazi32/',
    'https://github.com/EzzeOrazi',
    'https://www.instagram.com/ezze.o/',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Playa del Carmen',
    addressRegion: 'Quintana Roo',
    addressCountry: 'MX',
  },
  knowsAbout: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'SEO', 'AEO', 'E-commerce', 'Sanity CMS', 'JavaScript', 'HTML', 'CSS'],
  alumniOf: { '@type': 'EducationalOrganization', name: 'Neoris Labs' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`flex flex-col min-h-screen ${montserrat.className}`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <GoogleAnalytics gaId="G-LFXPH3MK7N" />
      </body>
    </html>
  );
}
