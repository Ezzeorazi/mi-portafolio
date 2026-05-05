import type { Metadata } from 'next';
import Link from 'next/link';
import { FaGlobe, FaDatabase, FaShoppingCart, FaTools, FaCheck } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiSanity } from 'react-icons/si';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Servicios | Ezequiel Orazi — Desarrollo Web Freelance',
  description:
    'Servicios de desarrollo web profesional: landing pages, sitios dinámicos con Sanity/Strapi y tiendas online. Precios claros en USD. Next.js, TypeScript, Tailwind CSS.',
  keywords: ['desarrollo web', 'freelance', 'Next.js', 'landing page', 'e-commerce', 'Sanity', 'Strapi', 'Argentina'],
};

const stack = [
  { icon: <SiNextdotjs />, label: 'Next.js 15' },
  { icon: <SiTypescript />, label: 'TypeScript' },
  { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
  { icon: <SiSanity />, label: 'Sanity / Strapi' },
];

const services = [
  {
    id: 'landing',
    icon: <FaGlobe className="text-5xl text-yellow" />,
    badge: 'Ideal para empezar',
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
  },
  {
    id: 'dinamica',
    icon: <FaDatabase className="text-5xl text-yellow" />,
    badge: 'Para negocios en crecimiento',
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
  },
  {
    id: 'ecommerce',
    icon: <FaShoppingCart className="text-5xl text-yellow" />,
    badge: 'Para vender sin límites',
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
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-dark min-h-screen text-light">
      {/* Hero */}
      <section className="py-20 px-4 text-center border-b border-yellow/10">
        <ScrollReveal direction="up">
          <h1 className="text-yellow font-bold text-4xl md:text-5xl mb-4">
            Servicios de Desarrollo Web
          </h1>
          <p className="text-light/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Sitios web construidos con tecnología moderna — <span className="text-yellow font-semibold">Next.js, TypeScript y Tailwind CSS</span> —,
            con foco en velocidad, SEO y que tus clientes te encuentren fácilmente en Google.
          </p>
        </ScrollReveal>

        {/* Stack badges */}
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
          {services.map((service, i) => (
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
                  {service.note && (
                    <p className="text-light/40 text-xs italic">{service.note}</p>
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
                    Qué incluye
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
                  <h2 className="text-yellow font-bold text-xl">Soporte y Mantenimiento Mensual</h2>
                </div>
                <p className="text-light/70 text-sm mb-4">
                  Tu plataforma digital necesita supervisión continua para mantener su rendimiento y seguridad.
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Monitoreo de seguridad: prevención de vulnerabilidades',
                    '3 modificaciones mensuales (textos, fotos, ajustes menores)',
                    'Actualización técnica de librerías y dependencias',
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
                <p className="text-light/50 text-xs mt-1">por mes</p>
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
                Información importante
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-light/70 leading-relaxed">
                <p>
                  <span className="text-light font-semibold">Dominio y Hosting:</span> Se abonan directamente al proveedor. Un dominio .com ronda los $10–$15 USD anuales.
                </p>
                <p>
                  <span className="text-light font-semibold">Base de Datos / Nube:</span> El almacenamiento para sitios dinámicos se abona aparte al proveedor y varía según tráfico y datos.
                </p>
                <p>
                  <span className="text-light font-semibold">Métodos de pago:</span> Los valores están expresados en Dólares Estadounidenses (USD). Se aceptan
                  pagos a través de Payoneer, o mediante transferencia bancaria en Pesos Mexicanos (MXN) al tipo
                  de cambio oficial del día de pago.
                </p>
                <p>
                  <span className="text-light font-semibold">Validez:</span> Los precios publicados corresponden a Mayo 2026. Consultá para proyectos a largo plazo.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 text-center border-t border-yellow/10">
        <ScrollReveal direction="up">
          <h2 className="text-yellow font-bold text-2xl mb-3">¿Tenés un proyecto en mente?</h2>
          <p className="text-light/60 text-sm mb-8 max-w-md mx-auto">
            Coordinamos una reunión de 30 minutos sin cargo para entender qué necesitás y cómo puedo ayudarte.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://calendly.com/ezequiel-orazi90/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow text-dark font-bold px-7 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
            >
              Agendar reunión gratis
            </a>
            <Link
              href="/contacto"
              className="border-2 border-yellow text-yellow font-bold px-7 py-3 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300"
            >
              Escribirme
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
