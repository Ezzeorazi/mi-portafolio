'use client';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

const skillsEs = [
  'HTML5',
  'CSS3 moderno (Flexbox, Grid, CSS Modules)',
  'JavaScript (ES6+)',
  'TypeScript',
  'React JS',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'Java con Spring Boot',
  'Desarrollo de APIs REST',
  'SQL y modelado de bases de datos',
  'PostgreSQL / MySQL',
  'MongoDB',
  'Supabase',
  'GitHub / GitLab',
  'SEO técnico y optimización web',
  'WordPress y WooCommerce',
  'Elementor / VTEX',
  'Buenas prácticas UX/UI',
  'Metodologías ágiles (Scrum, Kanban)',
  'Material UI',
  'Bootstrap',
  'Vite',
];

const skillsEn = [
  'HTML5',
  'Modern CSS3 (Flexbox, Grid, CSS Modules)',
  'JavaScript (ES6+)',
  'TypeScript',
  'React JS',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'Java with Spring Boot',
  'REST API Development',
  'SQL and Database Modeling',
  'PostgreSQL / MySQL',
  'MongoDB',
  'Supabase',
  'GitHub / GitLab',
  'Technical SEO and Web Optimization',
  'WordPress and WooCommerce',
  'Elementor / VTEX',
  'UX/UI Best Practices',
  'Agile Methodologies (Scrum, Kanban)',
  'Material UI',
  'Bootstrap',
  'Vite',
];

const certificationsEs = [
  { text: 'Certificación en Desarrollo Fullstack (Stack MERN)', detail: 'Devschool Academy (2023)' },
  { text: 'Programa Neoris Labs', detail: 'Java, Spring Boot y React (2024)' },
  { text: 'Más de 3 años de experiencia en WordPress y VTEX', detail: 'Entornos productivos' },
  { text: 'Curso Master en Elementor y WordPress', detail: 'Udemy (2024)' },
  { text: 'Enterprise Systems (ERP y SAP)', detail: 'Universidad de Minnesota — Coursera (2025)' },
];

const certificationsEn = [
  { text: 'Fullstack Development Certification (MERN Stack)', detail: 'Devschool Academy (2023)' },
  { text: 'Neoris Labs Program', detail: 'Java, Spring Boot and React (2024)' },
  { text: '3+ Years of Experience in WordPress and VTEX', detail: 'Production environments' },
  { text: 'Master Course in Elementor and WordPress', detail: 'Udemy (2024)' },
  { text: 'Enterprise Systems (ERP & SAP)', detail: 'University of Minnesota — Coursera (2025)' },
];

export default function SkillsContent() {
  const { t, language } = useTranslation();
  const skills = language === 'es' ? skillsEs : skillsEn;
  const certifications = language === 'es' ? certificationsEs : certificationsEn;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-10">{t('skills_title')}</h1>
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
        <h2 className="text-2xl font-bold text-dark mb-6">{t('skills_certifications')}</h2>
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
