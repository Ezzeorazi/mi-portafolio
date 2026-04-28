import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description:
    'Conocé a Ezequiel Orazi, desarrollador fullstack con experiencia en React, Node.js, Spring Boot y WordPress. Más de 8 años en entornos técnicos.',
  alternates: { canonical: 'https://ezequiel-orazi.online/sobre-mi' },
};

const cards = [
  { label: 'Skills', href: '/skills', description: 'Tecnologías que domino' },
  { label: 'Proyectos', href: '/proyectos', description: 'Mi trabajo real' },
  { label: 'Currículum', href: '/curriculum', description: 'Experiencia y formación' },
  { label: 'Blog', href: '/blog', description: 'Artículos técnicos' },
];

export default function SobreMiPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">Sobre mí</h1>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <p className="text-muted leading-relaxed text-base md:text-lg text-justify mb-12">
          Soy desarrollador fullstack con experiencia en la creación de aplicaciones web robustas y
          orientadas a negocio. Trabajo con tecnologías como React, Node.js, Spring Boot y
          WordPress, desarrollando soluciones reales para empresas y emprendedores. Cuento con más
          de ocho años de experiencia previa en entornos técnicos, lo que me permite abordar los
          proyectos con una visión profesional, organizada y enfocada en resultados. Trabajo con
          metodologías ágiles, priorizando calidad, rendimiento y experiencia de usuario. Además del
          desarrollo, integro diseño, contenido y SEO para entregar productos digitales completos y
          listos para escalar.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <ScrollReveal key={card.href} direction="flip" delay={i * 0.1}>
            <Link
              href={card.href}
              className="block bg-dark rounded-xl p-6 border border-yellow/20 hover:shadow-pink-glow hover:-translate-y-1 transition-all duration-300"
            >
              <h2 className="text-yellow font-bold text-xl mb-1">{card.label}</h2>
              <p className="text-light/70 text-sm">{card.description}</p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
