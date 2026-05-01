import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Habilidades técnicas de Ezequiel Orazi: React, Next.js, Node.js, Java/Spring Boot, SQL, WordPress, SEO y más.',
  alternates: { canonical: 'https://ezequiel-orazi.online/skills' },
};

const skills = [
  'HTML5',
  'CSS3 moderno (Flexbox, Grid, CSS Modules)',
  'JavaScript (ES6+)',
  'TypeScript',
  'React JS ',
  'Tailwind CSS',
  'Node.js',
  'Java con Spring Boot',
  'Desarrollo de APIs REST',
  'SQL y modelado de bases de datos',
  'PostgreSQL / MySQL',
  'MongoDB',
  'GitHub / GitLab',
  'SEO técnico y optimización web',
  'WordPress y WooCommerce',
  'Elementor / VTEX',
  'Buenas prácticas UX/UI',
  'Metodologías ágiles (Scrum, Kanban)',
  'Next.ts',
  'Tailwind CSS',
  'Supabase',
  'Material UI',
  'Vite',
  'Bootstrap',
  'WordPress',
  'WooCommerce',
  'React',
];

const certifications = [
  { text: 'Certificación en Desarrollo Fullstack (Stack MERN)', detail: 'Devschool Academy (2023)' },
  { text: 'Programa Neoris Labs', detail: 'Java, Spring Boot y React (2024)' },
  { text: 'Más de 3 años de experiencia en WordPress y VTEX', detail: 'Entornos productivos' },
  { text: 'Curso Master en Elementor y WordPress', detail: 'Udemy (2024)' },
  { text: 'Enterprise Systems (ERP y SAP)', detail: 'Universidad de Minnesota — Coursera (2025)' },
];

export default function SkillsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-10">Habilidades Técnicas</h1>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="bg-dark text-light text-sm px-4 py-3 rounded-xl border border-yellow/20 hover:shadow-pink-glow hover:border-pink/40 transition-all duration-300"
            >
              {skill}
            </li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal direction="left" delay={0.2}>
        <h2 className="text-2xl font-bold text-dark mb-6">Logros y Certificaciones</h2>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3}>
        <ul className="flex flex-col gap-4">
          {certifications.map((cert, i) => (
            <li
              key={i}
              className="bg-dark rounded-xl px-5 py-4 border border-yellow/20 hover:shadow-pink-glow transition-all duration-300"
            >
              <span className="text-yellow font-semibold text-sm">{cert.text}</span>
              <span className="text-light/60 text-sm"> — {cert.detail}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
