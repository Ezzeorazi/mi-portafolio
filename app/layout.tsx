import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ezequiel-orazi.online'),
  title: {
    default: 'Eze Orazi | Desarrollo Web y Soluciones Digitales',
    template: '%s | Eze Orazi',
  },
  description:
    'Ezequiel Orazi, desarrollador fullstack especializado en React, Spring Boot y WordPress. Desarrollo de sitios web rápidos, seguros y orientados a negocio.',
  keywords: [
    'Ezequiel Orazi',
    'desarrollador fullstack',
    'desarrollo web',
    'React',
    'WordPress',
    'Spring Boot',
    'Next.js',
    'freelancer web',
    'Playa del Carmen',
  ],
  authors: [{ name: 'Ezequiel Orazi' }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://ezequiel-orazi.online/',
    languages: {
      'es-MX': 'https://ezequiel-orazi.online/',
      'es-AR': 'https://ezequiel-orazi.online/',
    },
  },
  openGraph: {
    title: 'Eze Orazi | Desarrollo Web Profesional',
    description:
      'Soluciones web modernas con React, Spring Boot y WordPress. Sitios optimizados para crecer.',
    type: 'website',
    url: 'https://ezequiel-orazi.online/',
    images: [
      {
        url: '/pagePortafolio.jpg',
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
    images: ['/pagePortafolio.jpg'],
  },
  icons: {
    icon: '/favicon-perfil.svg',
    apple: '/favicon-perfil.svg',
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
  image: 'https://ezequiel-orazi.online/pagePortafolio.jpg',
  jobTitle: 'Desarrollador Fullstack',
  description:
    'Desarrollador fullstack especializado en React, Spring Boot y WordPress. Experiencia en proyectos web orientados a negocio.',
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
  knowsAbout: ['React', 'Next.js', 'Spring Boot', 'JavaScript', 'HTML', 'CSS', 'SEO', 'WordPress'],
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
      <body className="flex flex-col min-h-screen">
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
