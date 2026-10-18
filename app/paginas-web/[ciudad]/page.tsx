import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { FaWhatsapp, FaCalendarAlt, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import Breadcrumbs from '@/components/Breadcrumbs';
import Guarantees from '@/components/Guarantees';
import { getAllCiudades, getCiudadBySlug } from '@/data/ciudades';
import { getProjectBySlug } from '@/lib/projects';
import { approxMxn } from '@/lib/pricing';
import { CALENDLY_URL, WHATSAPP_URL } from '@/lib/links';

const BASE_URL = 'https://ezequiel-orazi.online';

// Proyectos hechos en la Riviera Maya: la prueba local de cada página.
const LOCAL_PROJECTS = ['riviera-maya-pass', 'elune', 'caliber-3d'];

const PLANES = [
  { nombre: 'Landing page / Web institucional', precio: '$180 USD', plazo: '5 a 7 días hábiles', href: '/services#landing' },
  { nombre: 'Web dinámica con panel', precio: '$490 USD', plazo: '2 a 3 semanas', href: '/services#dinamica' },
  { nombre: 'Tienda online', precio: '$890 USD', plazo: '3 a 4 semanas', href: '/services#ecommerce' },
];

interface Props {
  params: Promise<{ ciudad: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCiudades().map((c) => ({ ciudad: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad: slug } = await params;
  const ciudad = getCiudadBySlug(slug);
  if (!ciudad) return {};
  const url = `${BASE_URL}/paginas-web/${ciudad.slug}`;
  return {
    title: { absolute: ciudad.metaTitle },
    description: ciudad.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: ciudad.metaTitle, description: ciudad.metaDescription, url, locale: 'es_MX' },
  };
}

export default async function CiudadPage({ params }: Props) {
  const { ciudad: slug } = await params;
  const ciudad = getCiudadBySlug(slug);
  if (!ciudad) notFound();

  const otras = getAllCiudades().filter((c) => c.slug !== ciudad.slug);
  const proyectos = LOCAL_PROJECTS.map(getProjectBySlug).filter((p) => p !== undefined);
  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(
    `Hola Eze, tengo un negocio en ${ciudad.nombre} y quiero consultarte por una página web.`,
  )}`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Ezequiel Orazi — Páginas web en ${ciudad.nombre}`,
    url: `${BASE_URL}/paginas-web/${ciudad.slug}`,
    description: ciudad.metaDescription,
    areaServed: { '@type': 'City', name: ciudad.nombre, containedInPlace: { '@type': 'State', name: 'Quintana Roo' } },
    address: { '@type': 'PostalAddress', addressLocality: 'Playa del Carmen', addressRegion: 'Quintana Roo', addressCountry: 'MX' },
    founder: { '@type': 'Person', name: 'Ezequiel Orazi', url: BASE_URL },
    priceRange: '$180 - $890 USD',
    makesOffer: PLANES.map((p) => ({
      '@type': 'Offer',
      name: p.nombre,
      price: p.precio.replace(/[^\d]/g, ''),
      priceCurrency: 'USD',
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ciudad.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-10 pb-14">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Servicios', href: '/services' },
            { label: `Páginas web en ${ciudad.nombre}` },
          ]}
        />
        <p className="inline-flex items-center gap-2 text-pink font-semibold text-sm mb-3">
          <FaMapMarkerAlt aria-hidden="true" /> {ciudad.nombre}, Quintana Roo
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-dark mb-6">{ciudad.h1}</h1>
        <div className="space-y-4 max-w-3xl">
          {ciudad.intro.map((p) => (
            <p key={p} className="text-muted text-base md:text-lg leading-relaxed">{p}</p>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-8">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-dark font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaWhatsapp aria-hidden="true" /> Escribime por WhatsApp
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-dark text-dark font-bold px-6 py-3 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300"
          >
            <FaCalendarAlt aria-hidden="true" /> Llamada gratis de 30 min
          </a>
        </div>
        <p className="text-muted text-sm mt-4">{ciudad.cercania}</p>
      </section>

      {/* Rubros */}
      <section className="bg-dark px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-yellow font-bold text-2xl md:text-3xl mb-8">
            Webs para negocios de {ciudad.nombre}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ciudad.rubros.map((r) => (
              <div key={r.titulo} className="bg-yellow/5 border border-yellow/15 rounded-xl p-5">
                <h3 className="text-light font-bold mb-2">{r.titulo}</h3>
                <p className="text-light/60 text-sm leading-relaxed">{r.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-dark font-bold text-2xl md:text-3xl mb-8">
          Qué necesita una web en {ciudad.nombre}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ciudad.porQue.map((p) => (
            <div key={p.titulo}>
              <h3 className="flex items-start gap-2 text-dark font-bold mb-2">
                <FaCheck className="text-pink mt-1 shrink-0" aria-hidden="true" /> {p.titulo}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{p.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Precios */}
      <section className="bg-dark px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-yellow font-bold text-2xl md:text-3xl mb-2">Precios claros</h2>
          <p className="text-light/60 text-sm mb-8">Precio cerrado por escrito antes de empezar. IVA aparte si necesitás factura.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANES.map((p) => (
              <Link
                key={p.nombre}
                href={p.href}
                className="bg-dark/80 border border-yellow/20 rounded-xl p-6 hover:shadow-pink-glow hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-yellow font-bold mb-3">{p.nombre}</h3>
                <p className="text-pink font-bold text-2xl">desde {p.precio}</p>
                <p className="text-light/50 text-xs mt-0.5">{approxMxn(p.precio)}</p>
                <p className="text-light/60 text-sm mt-3">Lista en {p.plazo}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos locales */}
      {proyectos.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-dark font-bold text-2xl md:text-3xl mb-2">Proyectos en la Riviera Maya</h2>
          <p className="text-muted text-sm mb-8">Negocios reales de la zona con los que ya trabajé.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proyectos.map((p) => (
              <Link key={p.slug} href={`/proyectos/${p.slug}`} className="group block">
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={`/${p.image}`}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
                <h3 className="text-dark font-bold group-hover:text-pink transition-colors">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed line-clamp-3">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Proceso y compromisos */}
      <Guarantees />

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-dark font-bold text-2xl md:text-3xl mb-8">
          Preguntas frecuentes sobre páginas web en {ciudad.nombre}
        </h2>
        <div className="space-y-3">
          {ciudad.faq.map((f) => (
            <details key={f.q} className="group border border-dark/15 rounded-lg p-4 open:bg-dark/5">
              <summary className="cursor-pointer font-semibold text-dark list-none flex justify-between gap-4">
                {f.q}
                <span className="text-pink group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              </summary>
              <p className="text-muted text-sm leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted mb-4 text-lg">¿Tenés un negocio en {ciudad.nombre}?</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow text-dark font-bold px-6 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
          >
            <FaWhatsapp aria-hidden="true" /> Hablemos de tu web
          </a>
        </div>

        <nav aria-label="Otras ciudades" className="mt-12 pt-8 border-t border-dark/10 text-sm text-muted">
          También trabajo en:{' '}
          {otras.map((c, i) => (
            <span key={c.slug}>
              <Link href={`/paginas-web/${c.slug}`} className="text-dark font-semibold hover:text-pink">
                páginas web en {c.nombre}
              </Link>
              {i < otras.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </nav>
      </section>
    </>
  );
}
