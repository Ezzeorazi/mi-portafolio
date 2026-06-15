'use client';
import Link from 'next/link';
import {
  FaGlobe, FaDatabase, FaShoppingCart, FaTools, FaCheck, FaFire,
  FaCogs, FaUtensils, FaUsers, FaIndustry, FaUserTie,
  FaFileAlt, FaCalendarAlt, FaBoxes, FaTruck, FaExternalLinkAlt, FaBolt,
} from 'react-icons/fa';
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
    price: '$180 USD',
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
    price: '$490 USD',
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
    price: '$890 USD',
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
  {
    id: 'seo',
    icon: <FaFire className="text-5xl text-yellow" />,
    title: 'SEO con IA — Posicionamiento en Google y en IA',
    price: '$150 USD',
    description:
      'Aparecé antes que tu competencia en Google, ChatGPT, Perplexity y Gemini. Uso Claude para analizar tu sitio, investigar palabras clave y optimizar cada elemento técnico y de contenido para que los motores de búsqueda te encuentren a vos primero.',
    features: [
      'Auditoría SEO completa: diagnóstico técnico, de velocidad y de contenido',
      'Investigación de keywords con IA: qué buscan exactamente tus clientes',
      'AEO (Answer Engine Optimization): aparecé en respuestas de ChatGPT, Perplexity y Gemini',
      'Schema Markup y datos estructurados para Rich Snippets destacados en Google',
      'Metadatos, títulos H1-H6 y descripciones optimizados con Claude AI',
      'Reporte de posicionamiento: métricas claras y plan de mejora continua',
    ],
    tech: 'Claude AI + Google Search Console + Schema.org + Structured Data',
    note: '* Plan de seguimiento mensual: $90 USD/mes. Compatible con cualquier sitio web existente.',
    cta: 'Quiero aparecer primero',
    badge: 'Nuevo · Con Claude AI',
  },
  {
    id: 'medida',
    icon: <FaCogs className="text-5xl text-yellow" />,
    title: 'Sistemas a Medida',
    price: 'A consultar',
    description:
      'Software personalizado para resolver el problema específico de tu negocio. Antes de escribir una sola línea de código, agendamos una reunión gratuita para entender tus procesos y diseñar el sistema exacto que necesitás.',
    features: [
      'Reunión inicial gratuita: análisis de procesos y relevamiento de necesidades reales',
      'Definición del modelo del sistema adaptado a tu negocio y tu problema',
      'Desarrollo iterativo con entregables visibles en cada etapa del proyecto',
      'Panel de administración intuitivo, sin necesidad de conocimientos técnicos',
      'Módulos integrados: usuarios, roles, reportes y exportación de datos',
      'Soporte post-lanzamiento y evolución continua del sistema con tu negocio',
    ],
    tech: 'Next.js + Node.js + PostgreSQL / React + Spring Boot + MySQL',
    noteKey: 'svc_medida_note',
    ctaHref: 'https://calendly.com/ezequiel-orazi90/30min',
    ctaKey: 'svc_medida_cta',
    badge: 'Proyecto personalizado',
    badgeVariant: 'pink' as const,
  },
];

const servicesEn = [
  {
    id: 'landing',
    icon: <FaGlobe className="text-5xl text-yellow" />,
    title: 'Business Website / Landing Page',
    price: '$180 USD',
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
    price: '$490 USD',
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
    price: '$890 USD',
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
  {
    id: 'seo',
    icon: <FaFire className="text-5xl text-yellow" />,
    title: 'AI SEO — Rank First on Google & AI Engines',
    price: '$150 USD',
    description:
      'Show up before your competitors on Google, ChatGPT, Perplexity and Gemini. I use Claude to audit your site, research keywords and optimize every technical and content element so search engines find you first.',
    features: [
      'Full SEO audit: technical, speed and content diagnosis',
      'AI-powered keyword research: discover exactly what your customers search for',
      'AEO (Answer Engine Optimization): appear in ChatGPT, Perplexity and Gemini answers',
      'Schema Markup and structured data for highlighted Rich Snippets on Google',
      'Metadata, H1-H6 titles and descriptions optimized with Claude AI',
      'Ranking report: clear metrics and continuous improvement plan',
    ],
    tech: 'Claude AI + Google Search Console + Schema.org + Structured Data',
    note: '* Monthly follow-up plan: $90 USD/month. Compatible with any existing website.',
    cta: 'I want to rank first',
    badge: 'New · Powered by Claude AI',
  },
  {
    id: 'medida',
    icon: <FaCogs className="text-5xl text-yellow" />,
    title: 'Custom Software Systems',
    price: 'Quote on request',
    description:
      'Custom software designed to solve your specific business problem. Before writing a single line of code, we schedule a free meeting to understand your processes and design the exact system you need.',
    features: [
      'Free initial meeting: process analysis and real needs assessment',
      'System model definition tailored to your business and problem',
      'Iterative development with visible deliverables at each project stage',
      'Intuitive admin panel — no technical knowledge required',
      'Integrated modules: users, roles, reports and data export',
      'Post-launch support and continuous system evolution with your business',
    ],
    tech: 'Next.js + Node.js + PostgreSQL / React + Spring Boot + MySQL',
    noteKey: 'svc_medida_note',
    ctaHref: 'https://calendly.com/ezequiel-orazi90/30min',
    ctaKey: 'svc_medida_cta',
    badge: 'Custom project',
    badgeVariant: 'pink' as const,
  },
];

type ServiceItem = {
  id: string;
  icon: React.ReactNode;
  title: string;
  price: string;
  description: string;
  features: string[];
  tech: string;
  badge?: string;
  badgeVariant?: 'yellow' | 'pink';
  note?: string;
  noteKey?: string;
  cta?: string;
  ctaKey?: string;
  ctaHref?: string;
};

const systemExamplesEs = [
  { icon: <FaUtensils />, nameKey: 'svc_medida_example_bar_name', descKey: 'svc_medida_example_bar_desc' },
  { icon: <FaUsers />, nameKey: 'svc_medida_example_crm_name', descKey: 'svc_medida_example_crm_desc' },
  { icon: <FaIndustry />, nameKey: 'svc_medida_example_prod_name', descKey: 'svc_medida_example_prod_desc' },
  { icon: <FaUserTie />, nameKey: 'svc_medida_example_rrhh_name', descKey: 'svc_medida_example_rrhh_desc' },
  { icon: <FaFileAlt />, nameKey: 'svc_medida_example_presup_name', descKey: 'svc_medida_example_presup_desc' },
  { icon: <FaCalendarAlt />, nameKey: 'svc_medida_example_turnos_name', descKey: 'svc_medida_example_turnos_desc' },
  { icon: <FaBoxes />, nameKey: 'svc_medida_example_inv_name', descKey: 'svc_medida_example_inv_desc' },
  { icon: <FaTruck />, nameKey: 'svc_medida_example_delivery_name', descKey: 'svc_medida_example_delivery_desc' },
];

export default function ServicesPageContent() {
  const { t, language } = useTranslation();
  const services: ServiceItem[] = language === 'es' ? servicesEs : servicesEn;

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
          {services.map((service) => {
            const isMedida = service.id === 'medida';
            const badgeColor = service.badgeVariant === 'pink'
              ? 'text-white bg-pink'
              : 'text-dark bg-yellow';
            const ctaLabel = service.ctaKey ? t(service.ctaKey) : (service.cta ?? '');
            const noteText = service.noteKey ? t(service.noteKey) : service.note;

            return (
              <ScrollReveal key={service.id} direction="left" delay={0.1}>
                <div
                  id={service.id}
                  className={`bg-dark/80 border rounded-2xl p-8 flex flex-col md:flex-row gap-8 transition-shadow duration-300 ${
                    isMedida
                      ? 'border-pink/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]'
                      : 'border-yellow/20 hover:shadow-yellow-glow'
                  }`}
                >
                  {/* Left */}
                  <div className="flex flex-col gap-4 md:w-2/5">
                    {service.badge && (
                      <span className={`self-start text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${badgeColor}`}>
                        {service.badge}
                      </span>
                    )}
                    {service.icon}
                    <h2 className={`font-bold text-2xl ${isMedida ? 'text-pink' : 'text-yellow'}`}>
                      {service.title}
                    </h2>
                    <p className="text-light/70 text-sm leading-relaxed">{service.description}</p>
                    <p className={`font-bold text-3xl ${isMedida ? 'text-yellow' : 'text-pink'}`}>
                      {service.price}
                    </p>
                    <p className="text-light/40 text-xs font-mono">{service.tech}</p>
                    {noteText && (
                      <p className="text-light/40 text-xs italic">{noteText}</p>
                    )}
                    {service.ctaHref ? (
                      <a
                        href={service.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-pink text-white font-bold px-5 py-2.5 rounded-lg hover:bg-yellow hover:text-dark transition-colors duration-300 self-start mt-2"
                      >
                        {ctaLabel}
                      </a>
                    ) : (
                      <Link
                        href={`/contacto?servicio=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 bg-yellow text-dark font-bold px-5 py-2.5 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 self-start mt-2"
                      >
                        {ctaLabel || service.cta}
                      </Link>
                    )}
                    {service.id === 'seo' && (
                      <Link
                        href="/auditoria-seo"
                        className="inline-flex items-center gap-2 border-2 border-pink text-pink font-bold px-5 py-2.5 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 self-start"
                      >
                        <FaBolt /> {t('svc_seo_tool_cta')}
                      </Link>
                    )}
                  </div>

                  {/* Right: feature list */}
                  <div className="md:w-3/5 flex flex-col justify-center">
                    <h3 className="text-light/50 text-xs uppercase tracking-widest font-semibold mb-4">
                      {t('services_includes')}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-sm text-light/80">
                          <FaCheck className={`mt-0.5 shrink-0 ${isMedida ? 'text-pink' : 'text-yellow'}`} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Sistemas a Medida — Showcase */}
      <section className="py-16 px-4 border-t border-pink/10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="text-yellow font-bold text-2xl md:text-3xl text-center mb-2">
              {t('svc_medida_examples_title')}
            </h2>
            <p className="text-light/60 text-center text-sm mb-10 max-w-xl mx-auto">
              {t('svc_medida_examples_subtitle')}
            </p>
          </ScrollReveal>

          {/* Grid de ejemplos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
            {systemExamplesEs.map((sys, i) => (
              <ScrollReveal key={sys.nameKey} direction="up" delay={i * 0.06}>
                <div className="bg-muted/10 border border-yellow/10 rounded-xl p-4 flex flex-col items-center gap-2 text-center hover:border-pink/30 hover:bg-pink/5 transition-all duration-300 h-full">
                  <span className="text-3xl text-yellow">{sys.icon}</span>
                  <h4 className="text-light font-semibold text-sm">{t(sys.nameKey)}</h4>
                  <p className="text-light/50 text-xs leading-relaxed">{t(sys.descKey)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Nimbus CRM callout */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-gradient-to-br from-pink/10 via-dark to-yellow/5 border border-pink/25 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-widest text-pink bg-pink/10 border border-pink/20 px-3 py-1 rounded-full mb-4 inline-block">
                  {t('svc_medida_nimbus_badge')}
                </span>
                <h3 className="text-yellow font-bold text-xl md:text-2xl mt-3 mb-3">
                  {t('svc_medida_nimbus_title')}
                </h3>
                <p className="text-light/70 text-sm leading-relaxed max-w-lg">
                  {t('svc_medida_nimbus_desc')}
                </p>
              </div>
              <a
                href="https://taupe-crisp-4638a8.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-pink text-white font-bold px-7 py-3.5 rounded-xl hover:bg-yellow hover:text-dark transition-colors duration-300 shrink-0 text-sm whitespace-nowrap"
              >
                {t('svc_medida_nimbus_cta')}
                <FaExternalLinkAlt className="text-xs" />
              </a>
            </div>
          </ScrollReveal>
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
                <Link
                  href="/auditoria-seo"
                  className="inline-flex items-center gap-2 border-2 border-pink text-pink font-bold px-5 py-2.5 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 mt-5"
                >
                  <FaBolt /> {t('services_maintenance_tool_cta')}
                </Link>
              </div>
              <div className="text-center shrink-0">
                <p className="text-pink font-bold text-3xl">$45 USD</p>
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
