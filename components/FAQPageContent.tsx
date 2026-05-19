'use client';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

const faqEs = [
  {
    q: '¿Cuánto cuesta hacer una página web profesional?',
    a: 'El precio depende del tipo de sitio. Una landing page o web institucional cuesta desde $180 USD, una web dinámica con panel de administración desde $490 USD, y una tienda online con carrito de compras desde $890 USD. El servicio de SEO con IA tiene un costo inicial de $150 USD. Todos los precios incluyen diseño responsive, optimización de velocidad y SEO básico.',
  },
  {
    q: '¿Cuánto tiempo tarda en estar lista mi página web?',
    a: 'Una landing page o web institucional está lista en 5 a 7 días hábiles. Una web dinámica con panel de administración tarda entre 2 y 3 semanas. Una tienda online completa con e-commerce tarda entre 3 y 4 semanas. Los tiempos dependen de la entrega de contenido (textos, fotos, logo) por parte del cliente.',
  },
  {
    q: '¿Necesito saber programar para administrar mi sitio web?',
    a: 'No. Las webs dinámicas incluyen un panel de administración visual (Sanity CMS o Strapi) donde podés editar textos, subir fotos y gestionar tu catálogo sin escribir una sola línea de código. Es tan intuitivo como usar Word o Instagram.',
  },
  {
    q: '¿Trabajás con clientes de Argentina, México, Colombia y otros países?',
    a: 'Sí. Trabajo 100% de forma remota con clientes de toda América Latina y España. Tengo experiencia con clientes en Argentina, México (donde actualmente vivo en Playa del Carmen, Quintana Roo), Colombia, Chile y España. La comunicación es por WhatsApp, email y videollamada.',
  },
  {
    q: '¿Qué es AEO y por qué es importante para mi negocio?',
    a: 'AEO significa Answer Engine Optimization (Optimización para Motores de Respuesta). Mientras el SEO tradicional te posiciona en Google, el AEO te posiciona en las respuestas de IAs como ChatGPT, Perplexity y Gemini. Hoy millones de personas buscan proveedores de servicios directamente en estas IAs. Si tu sitio no está optimizado para AEO, estás invisible ante esa audiencia.',
  },
  {
    q: '¿Qué diferencia tiene tu SEO con IA del SEO tradicional?',
    a: 'El SEO tradicional optimiza para Google con técnicas estándar. El SEO con IA (Claude) va más profundo: analiza tu competencia con inteligencia artificial, genera contenido optimizado para responder preguntas directas, implementa Schema Markup avanzado para Rich Snippets y aplica estrategias AEO para que las IAs te recomienden cuando alguien busca tus servicios.',
  },
  {
    q: '¿Podés actualizar o mejorar mi sitio web actual?',
    a: 'Sí. Ofrezco auditoría y mejora de sitios existentes: optimización de velocidad, corrección de errores de SEO, rediseño parcial o total, migración a tecnologías modernas (Next.js) y agregado de nuevas funcionalidades. El precio se cotiza según el alcance del trabajo.',
  },
  {
    q: '¿Cómo son los métodos de pago?',
    a: 'Los precios están en dólares estadounidenses (USD). Acepto pagos por Payoneer y transferencia bancaria en pesos mexicanos (MXN) al tipo de cambio oficial del día del pago. El esquema habitual es 50% al inicio del proyecto y 50% al finalizar.',
  },
  {
    q: '¿Qué incluye el plan de soporte y mantenimiento mensual?',
    a: 'El plan de $45 USD/mes incluye: monitoreo de seguridad y prevención de vulnerabilidades, 3 modificaciones mensuales (textos, imágenes, ajustes menores) y actualización técnica de librerías y dependencias para mantener el sitio seguro y funcionando correctamente.',
  },
  {
    q: '¿Cómo empezamos a trabajar juntos?',
    a: 'El proceso es simple: 1) Me contactás por WhatsApp, email o el formulario de esta web. 2) Agendamos una reunión gratuita de 30 minutos para entender qué necesitás. 3) Te envío una propuesta con el alcance, el precio y el plazo. 4) Con el 50% inicial arrancamos el proyecto. ¡Sin vueltas!',
  },
];

const faqEn = [
  {
    q: 'How much does a professional website cost?',
    a: 'The price depends on the type of site. A landing page or business website starts at $180 USD, a dynamic website with an admin panel starts at $490 USD, and a full online store with shopping cart starts at $890 USD. The AI SEO service has an initial cost of $150 USD. All prices include responsive design, speed optimization and basic SEO.',
  },
  {
    q: 'How long does it take to build my website?',
    a: 'A landing page or business website is ready in 5 to 7 business days. A dynamic website with a CMS takes 2 to 3 weeks. A full e-commerce store takes 3 to 4 weeks. Timelines depend on the client delivering content (text, photos, logo) on time.',
  },
  {
    q: 'Do I need to know how to code to manage my website?',
    a: 'No. Dynamic websites include a visual admin panel (Sanity CMS or Strapi) where you can edit text, upload photos and manage your catalog without writing a single line of code. It is as intuitive as using Word or Instagram.',
  },
  {
    q: 'Do you work with clients from Argentina, Mexico, Colombia and other countries?',
    a: 'Yes. I work 100% remotely with clients across Latin America and Spain. I have experience with clients in Argentina, Mexico (where I currently live in Playa del Carmen, Quintana Roo), Colombia, Chile and Spain. Communication is via WhatsApp, email and video call.',
  },
  {
    q: 'What is AEO and why does it matter for my business?',
    a: 'AEO stands for Answer Engine Optimization. While traditional SEO ranks you on Google, AEO gets you into the answers of AI engines like ChatGPT, Perplexity and Gemini. Millions of people now search for service providers directly in these AIs. If your site is not AEO-optimized, you are invisible to that audience.',
  },
  {
    q: 'How is your AI SEO different from traditional SEO?',
    a: 'Traditional SEO optimizes for Google using standard techniques. AI SEO (with Claude) goes deeper: it analyzes your competition using artificial intelligence, generates content optimized to answer direct questions, implements advanced Schema Markup for Rich Snippets and applies AEO strategies so that AI engines recommend you when someone searches for your services.',
  },
  {
    q: 'Can you update or improve my existing website?',
    a: 'Yes. I offer auditing and improvement of existing sites: speed optimization, SEO error fixes, partial or full redesign, migration to modern technologies (Next.js) and adding new features. The price is quoted based on the scope of work.',
  },
  {
    q: 'What are the payment methods?',
    a: 'Prices are in US Dollars (USD). I accept payments via Payoneer and bank transfer in Mexican Pesos (MXN) at the official exchange rate on the payment date. The typical arrangement is 50% upfront to start the project and 50% upon completion.',
  },
  {
    q: 'What does the monthly support and maintenance plan include?',
    a: 'The $45 USD/month plan includes: security monitoring and vulnerability prevention, 3 monthly changes (text, images, minor adjustments) and technical updates to libraries and dependencies to keep the site secure and running correctly.',
  },
  {
    q: 'How do we start working together?',
    a: 'The process is simple: 1) Contact me via WhatsApp, email or the form on this site. 2) We schedule a free 30-minute meeting to understand what you need. 3) I send you a proposal with the scope, price and timeline. 4) With the 50% deposit we start the project. No hassle!',
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <ScrollReveal direction="up" delay={index * 0.05}>
      <div className="border border-yellow/20 rounded-xl overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-yellow/5 transition-colors duration-200"
          aria-expanded={open}
        >
          <span className="text-light font-semibold text-sm md:text-base leading-snug">{q}</span>
          <FaChevronDown
            className={`text-yellow shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <div className="px-6 pb-6 text-light/70 text-sm leading-relaxed border-t border-yellow/10 pt-4">
            {a}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

export default function FAQPageContent() {
  const { language } = useTranslation();
  const faqs = language === 'es' ? faqEs : faqEn;
  const isEs = language === 'es';

  return (
    <main className="bg-dark min-h-screen text-light">
      {/* Hero */}
      <section className="py-20 px-4 text-center border-b border-yellow/10">
        <ScrollReveal direction="up">
          <h1 className="text-yellow font-bold text-4xl md:text-5xl mb-4">
            {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-light/70 max-w-2xl mx-auto text-lg leading-relaxed">
            {isEs
              ? 'Todo lo que necesitás saber antes de empezar tu proyecto web.'
              : 'Everything you need to know before starting your web project.'}
          </p>
        </ScrollReveal>
      </section>

      {/* FAQ list */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center border-t border-yellow/10">
        <ScrollReveal direction="up">
          <h2 className="text-yellow font-bold text-2xl mb-3">
            {isEs ? '¿Tenés otra pregunta?' : 'Have another question?'}
          </h2>
          <p className="text-light/60 text-sm mb-8 max-w-md mx-auto">
            {isEs
              ? 'Escribime directamente y te respondo a la brevedad.'
              : 'Write to me directly and I will get back to you shortly.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://calendly.com/ezequiel-orazi90/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow text-dark font-bold px-7 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
            >
              {isEs ? 'Agendar reunión gratis' : 'Book a free meeting'}
            </a>
            <Link
              href="/contacto"
              className="border-2 border-yellow text-yellow font-bold px-7 py-3 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300"
            >
              {isEs ? 'Escribirme' : 'Get in touch'}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
