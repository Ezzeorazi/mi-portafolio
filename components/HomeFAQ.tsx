'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

const faqEs = [
  {
    n: '01',
    q: '¿Cuánto cuesta hacer mi página web?',
    a: 'Una landing page o web institucional arranca en $180 USD. Una web dinámica con panel para editar sin código desde $490 USD. Una tienda online completa desde $890 USD. Precios en dólares, sin sorpresas ni extras escondidos.',
  },
  {
    n: '02',
    q: '¿Cuánto tiempo tarda en estar lista?',
    a: 'Una landing page: 5 a 7 días hábiles. Una web con panel de administración: 2 a 3 semanas. Una tienda online: 3 a 4 semanas. El único factor que lo demora sos vos: cuanto antes entregás el contenido (logo, fotos, textos), antes está lista.',
  },
  {
    n: '03',
    q: '¿Necesito saber de tecnología para usar mi sitio?',
    a: 'Para nada. Las webs con panel de administración incluyen Sanity CMS: un editor visual tan simple como Instagram. Subís fotos, editás textos y actualizás precios sin tocar código. Si usás un celular, podés manejar tu sitio.',
  },
  {
    n: '04',
    q: '¿Qué es el SEO con IA y cómo me ayuda a vender más?',
    a: 'El SEO tradicional te posiciona en Google. El SEO con IA (Claude) va más lejos: también te posiciona en ChatGPT, Perplexity y Gemini. Hoy la gente busca proveedores directamente en IAs. Si no aparecés ahí, tu competencia sí. Lo llamo AEO y es el diferencial más importante de 2025.',
  },
  {
    n: '05',
    q: '¿Trabajás con clientes de Argentina, México y Colombia?',
    a: 'Sí. Soy argentino, vivo en Playa del Carmen (México) y trabajo 100% remoto con toda América Latina. Argentina, México, Colombia, Chile, Uruguay, España — donde haya internet, llego. La comunicación es por WhatsApp y videollamada, sin complicaciones.',
  },
  {
    n: '06',
    q: '¿Cómo empezamos? ¿Es complicado?',
    a: 'Para nada. Paso 1: me escribís por WhatsApp o el formulario de contacto. Paso 2: agendamos una llamada gratuita de 30 minutos. Paso 3: te mando la propuesta con precio y plazo. Paso 4: con el 50% inicial arrancamos. En menos de una semana ya tenés tu sitio en marcha.',
  },
];

const faqEn = [
  {
    n: '01',
    q: 'How much does a website cost?',
    a: 'A landing page or business website starts at $180 USD. A dynamic website with a no-code admin panel starts at $490 USD. A full online store starts at $890 USD. All prices in USD, no hidden fees or surprises.',
  },
  {
    n: '02',
    q: 'How long does it take to go live?',
    a: 'A landing page: 5 to 7 business days. A dynamic site with CMS: 2 to 3 weeks. An online store: 3 to 4 weeks. The only factor that slows things down is content delivery — the sooner you send logo, photos and text, the sooner it launches.',
  },
  {
    n: '03',
    q: 'Do I need tech skills to manage my website?',
    a: 'Not at all. Dynamic sites include Sanity CMS — a visual editor as simple as Instagram. You upload photos, edit text and update prices without touching code. If you can use a smartphone, you can run your site.',
  },
  {
    n: '04',
    q: 'What is AI SEO and how does it help me sell more?',
    a: 'Traditional SEO ranks you on Google. AI SEO (with Claude) goes further: it also gets you into ChatGPT, Perplexity and Gemini answers. People now search for service providers directly in AI engines. If you are not there, your competitors are. This is called AEO and it is the biggest differentiator of 2025.',
  },
  {
    n: '05',
    q: 'Do you work with clients from Argentina, Mexico and Colombia?',
    a: 'Yes. I am Argentine, based in Playa del Carmen (Mexico) and work 100% remotely across Latin America. Argentina, Mexico, Colombia, Chile, Uruguay, Spain — wherever there is internet, I can work with you. Communication is via WhatsApp and video call.',
  },
  {
    n: '06',
    q: 'How do we start? Is it complicated?',
    a: 'Not at all. Step 1: message me via WhatsApp or the contact form. Step 2: we schedule a free 30-minute call. Step 3: I send you a proposal with scope, price and timeline. Step 4: with the 50% upfront payment we start. In less than a week your project is already underway.',
  },
];

function FAQItem({
  n,
  q,
  a,
  delay,
}: {
  n: string;
  q: string;
  a: string;
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal direction="up" delay={delay}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`w-full text-left group border rounded-2xl p-6 transition-all duration-300 ${
          open
            ? 'border-yellow bg-yellow/5'
            : 'border-yellow/20 hover:border-yellow/50 hover:bg-yellow/5'
        }`}
      >
        <div className="flex items-start gap-4">
          <span className="text-yellow font-black text-2xl leading-none shrink-0 group-hover:scale-110 transition-transform duration-200">
            {n}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <p className="text-light font-semibold text-sm md:text-base leading-snug pr-2">
                {q}
              </p>
              <FaChevronDown
                className={`text-yellow shrink-0 mt-1 transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </div>
            {open && (
              <p className="text-light/70 text-sm leading-relaxed mt-4 border-t border-yellow/15 pt-4">
                {a}
              </p>
            )}
          </div>
        </div>
      </button>
    </ScrollReveal>
  );
}

export default function HomeFAQ() {
  const { language } = useTranslation();
  const faqs = language === 'es' ? faqEs : faqEn;
  const isEs = language === 'es';

  const col1 = faqs.slice(0, 3);
  const col2 = faqs.slice(3, 6);

  return (
    <section className="bg-dark py-20 px-4 border-t border-yellow/10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-dark bg-yellow px-3 py-1 rounded mb-4">
              FAQ
            </span>
            <h2 className="text-yellow font-bold text-3xl md:text-4xl mb-3">
              {isEs ? 'Lo que todos preguntan' : 'What everyone asks'}
            </h2>
            <p className="text-light/60 text-sm md:text-base max-w-xl mx-auto">
              {isEs
                ? 'Respondemos antes de que tengas que preguntar.'
                : 'We answer before you have to ask.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {col1.map((item, i) => (
              <FAQItem key={item.n} {...item} delay={i * 0.08} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {col2.map((item, i) => (
              <FAQItem key={item.n} {...item} delay={i * 0.08 + 0.04} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-yellow font-semibold text-sm hover:text-pink transition-colors duration-200 underline underline-offset-4"
            >
              {isEs ? 'Ver todas las preguntas frecuentes →' : 'View all frequently asked questions →'}
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
