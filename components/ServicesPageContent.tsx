'use client';
import Link from 'next/link';
import { FaGlobe, FaDatabase, FaShoppingCart, FaTools, FaCheck } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiSanity } from 'react-icons/si';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

const stack = [
  { icon: <SiNextdotjs />, label: 'Next.js 15' },
  { icon: <SiTypescript />, label: 'TypeScript' },
  { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
  { icon: <SiSanity />, label: 'Sanity / Strapi' },
];

const servicesEs = [
  {
    id: 'landing',
    icon: <FaGlobe className="text-5xl text-yellow" />,
    badgeKey: 'svc_landing_badge',
    title: 'Web Institucional / Landing Page',
    price: '$250 USD',
    description:
      'Tu carta de presentación digital. Ideal para profesionales, estudios o comercios que necesitan mostrar quiénes son y qué ofrecen de manera clara y profesional.',
    features: [
      'Diseño responsive: adaptado 100% para celulares y computadoras',
      'Secciones clave: Inicio, Quiénes Somos, Servicios y Contacto',
      'Botón de WhatsApp con conexión directa a tus clientes',
      'SEO básico: arquitectura preparada para indexarse en Google',
      'Formulario de contacto funcional',
      'Velocidad y rendimiento optimizados (Lighthouse 90+)',
    ],
    tech: 'Next.js + TypeScript + Tailwind CSS',
    cta: 'Quiero mi landing page',
    badge: 'Ideal para empezar',
  },
  {
    id: 'dinamica',
    icon: <FaDatabase className="text-5xl text-yellow" />,
    title: 'Web Dinámica + Gestión de Datos',
    price: '$650 USD',
    description:
      'Una herramienta potente con panel de control para administrar tu contenido sin saber programar. Ideal para negocios que necesitan catálogos, registros de usuarios o contenido actualizable.',
    features: [
      'Panel de control: editá textos e imágenes sin código (Sanity o Strapi)',
      'Base de datos propia en la nube, segura y escalable',
      'Catálogo de productos/servicios con galería, categorías y fichas',
      'Secciones privadas con usuarios y contraseñas',
      'SEO avanzado: indexación por categoría, producto y servicio',
      'Integración con APIs externas según necesidad',
    ],
    tech: 'Next.js + TypeScript + Sanity CMS (o Strapi) + PostgreSQL',
    note: '* No incluye sistema de pago ni carrito de compras.',
    cta: 'Quiero mi web dinámica',
    badge: 'Para negocios en crecimiento',
  },
  {
    id: 'ecommerce',
    icon: <FaShoppingCart className="text-5xl text-yellow" />,
    title: 'E-commerce / Tienda Online',
    price: '$1.200 USD',
    description:
      'Tu local abierto las 24 horas para todo el mundo. Flujo completo de compra: el cliente elige, paga y vos solo despachás el pedido.',
    features: [
      'Carrito de compras con experiencia de usuario fluida',
      'Integración con Mercado Pago, PayPal o Stripe',
      'Control de stock automático',
      'Panel de administración de productos y pedidos',
      'SEO transaccional: optimizado para captar intención de compra',
      'Ficha de producto con galería, variantes y descripción',
    ],
    tech: 'Next.js + TypeScript + Sanity CMS + Pasarela de pagos',
    cta: 'Quiero mi tienda online',
    badge: 'Para vender sin límites',
  },
];

const servicesEn = [
  {
    id: 'landing',
    icon: <FaGlobe className="text-5xl text-yellow" />,
    title: 'Business Website / Landing Page',
    price: '$250 USD',
    description:
      'Your digital business card. Ideal for professionals, studios or businesses that need to show who they are and what they offer in a clear and professional way.',
    features: [
      'Responsive design: 100% optimized for mobile and desktop',
      'Key sections: Home, About Us, Services and Contact',
      'WhatsApp button for direct connection with your clients',
      'Basic SEO: architecture ready to index on Google',
      'Functional contact form',
      'Optimized speed and performance (Lighthouse 90+)',
    ],
    tech: 'Next.js + TypeScript + Tailwind CSS',
    cta: 'I want my landing page',
    badge: 'Perfect to start',
  },
  {
    id: 'dinamica',
    icon: <FaDatabase className="text-5xl text-yellow" />,
    title: 'Dynamic Web + Data Management',
    price: '$650 USD',
    description:
      'A powerful tool with a control panel to manage your content without coding. Ideal for businesses that need catalogs, user records or updatable content.',
    features: [
      'Control panel: edit text and images without code (Sanity or Strapi)',
      'Your own cloud database, secure and scalable',
      'Product/service catalog with gallery, categories and detail pages',
      'Private sections with user login',
      'Advanced SEO: indexing by category, product and service',
      'Integration with external APIs as needed',
    ],
    tech: 'Next.js + TypeScript + Sanity CMS (or Strapi) + PostgreSQL',
    note: '* Does not include payment system or shopping cart.',
    cta: 'I want my dynamic website',
    badge: 'For growing businesses',
  },
  {
    id: 'ecommerce',
    icon: <FaShoppingCart className="text-5xl text-yellow" />,
    title: 'E-commerce / Online Store',
    price: '$1,200 USD',
    description:
      'Your store open 24/7 for everyone. Full purchase flow: the customer chooses, pays, and you just ship the order.',
    features: [
      'Shopping cart with smooth user experience',
      'Integration with PayPal or Stripe',
      'Automatic stock control',
      'Product and order management panel',
      'Transactional SEO: optimized to capture purchase intent',
      'Product page with gallery, variants and description',
    ],
    tech: 'Next.js + TypeScript + Sanity CMS + Payment gateway',
    cta: 'I want my online store',
    badge: 'Sell without limits',
  },
];

export default function ServicesPageContent() {
  const { t, language } = useTranslation();
  const services = language === 'es' ? servicesEs : servicesEn;

  return (
    <main className="bg-dark min-h-screen text-light">
      {/* Hero */}
      <section className="py-20 px-4 text-center border-b border-yellow/10">
        <ScrollReveal direction="up">
          <h1 className="text-yellow font-bold text-4xl md:text-5xl mb-4">
            {t('services_page_title')}
          </h1>
          <p className="text-light/70 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('services_page_desc')}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {stack.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-2 bg-muted/30 border border-yellow/20 text-light/80 text-sm px-3 py-1.5 rounded-full"
              >
                <span className="text-yellow text-base">{s.icon}</span>
                {s.label}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Service cards */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          {services.map((service) => (
            <ScrollReveal key={service.id} direction="left" delay={0.1}>
              <div
                id={service.id}
                className="bg-dark/80 border border-yellow/20 rounded-2xl p-8 flex flex-col md:flex-row gap-8 hover:shadow-yellow-glow transition-shadow duration-300"
              >
                {/* Left */}
                <div className="flex flex-col gap-4 md:w-2/5">
                  <span className="self-start text-xs font-bold uppercase tracking-widest text-dark bg-yellow px-2 py-0.5 rounded">
                    {service.badge}
                  </span>
                  {service.icon}
                  <h2 className="text-yellow font-bold text-2xl">{service.title}</h2>
                  <p className="text-light/70 text-sm leading-relaxed">{service.description}</p>
                  <p className="text-pink font-bold text-3xl">{service.price}</p>
                  <p className="text-light/40 text-xs font-mono">{service.tech}</p>
                  {(service as { note?: string }).note && (
                    <p className="text-light/40 text-xs italic">{(service as { note?: string }).note}</p>
                  )}
                  <Link
                    href={`/contacto?servicio=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 bg-yellow text-dark font-bold px-5 py-2.5 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 self-start mt-2"
                  >
                    {service.cta}
                  </Link>
                </div>

                {/* Right: feature list */}
                <div className="md:w-3/5 flex flex-col justify-center">
                  <h3 className="text-light/50 text-xs uppercase tracking-widest font-semibold mb-4">
                    {t('services_includes')}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-light/80">
                        <FaCheck className="text-yellow mt-0.5 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Maintenance plan */}
      <section className="py-12 px-4 border-t border-yellow/10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="bg-muted/20 border border-yellow/20 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <FaTools className="text-yellow text-2xl" />
                  <h2 className="text-yellow font-bold text-xl">{t('services_maintenance_title')}</h2>
                </div>
                <p className="text-light/70 text-sm mb-4">{t('services_maintenance_desc')}</p>
                <ul className="flex flex-col gap-2">
                  {[
                    t('services_maintenance_f1'),
                    t('services_maintenance_f2'),
                    t('services_maintenance_f3'),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-light/80">
                      <FaCheck className="text-yellow mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center shrink-0">
                <p className="text-pink font-bold text-3xl">$50 USD</p>
                <p className="text-light/50 text-xs mt-1">{t('services_maintenance_per_month')}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Important info */}
      <section className="py-10 px-4 border-t border-yellow/10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="bg-yellow/5 border border-yellow/15 rounded-xl p-6">
              <h3 className="text-yellow font-semibold text-sm uppercase tracking-widest mb-4">
                {t('services_info_title')}
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-light/70 leading-relaxed">
                <p>
                  <span className="text-light font-semibold">{t('services_info_domain_label')}</span>{' '}
                  {t('services_info_domain_text')}
                </p>
                <p>
                  <span className="text-light font-semibold">{t('services_info_db_label')}</span>{' '}
                  {t('services_info_db_text')}
                </p>
                <p>
                  <span className="text-light font-semibold">{t('services_info_payment_label')}</span>{' '}
                  {t('services_info_payment_text')}
                </p>
                <p>
                  <span className="text-light font-semibold">{t('services_info_validity_label')}</span>{' '}
                  {t('services_info_validity_text')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 text-center border-t border-yellow/10">
        <ScrollReveal direction="up">
          <h2 className="text-yellow font-bold text-2xl mb-3">{t('services_final_title')}</h2>
          <p className="text-light/60 text-sm mb-8 max-w-md mx-auto">{t('services_final_desc')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://calendly.com/ezequiel-orazi90/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow text-dark font-bold px-7 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
            >
              {t('services_final_book')}
            </a>
            <Link
              href="/contacto"
              className="border-2 border-yellow text-yellow font-bold px-7 py-3 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300"
            >
              {t('services_final_write')}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
