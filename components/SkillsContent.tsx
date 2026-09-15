'use client';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

type Skill = { name: string; core?: boolean };
type SkillGroup = { key: string; skills: Skill[] };

// Las tecnologías "core" son las que aparecen en los proyectos en producción
// listados en /proyectos (Next.js, TypeScript, Tailwind, Supabase, Python/ML).
const skillGroupsEs: SkillGroup[] = [
  {
    key: 'skills_cat_frontend',
    skills: [
      { name: 'Next.js (App Router)', core: true },
      { name: 'React', core: true },
      { name: 'TypeScript', core: true },
      { name: 'Tailwind CSS', core: true },
      { name: 'JavaScript (ES6+)' },
      { name: 'HTML5 y CSS3 (Flexbox, Grid)' },
      { name: 'Framer Motion' },
      { name: 'Material UI / Bootstrap' },
    ],
  },
  {
    key: 'skills_cat_backend',
    skills: [
      { name: 'Node.js y APIs REST', core: true },
      { name: 'PostgreSQL (Supabase, Neon)', core: true },
      { name: 'Prisma ORM' },
      { name: 'MongoDB' },
      { name: 'Java con Spring Boot' },
      { name: 'SQL y modelado de datos' },
      { name: 'Autenticación y roles' },
    ],
  },
  {
    key: 'skills_cat_ai',
    skills: [
      { name: 'Python', core: true },
      { name: 'scikit-learn (Random Forest, clasificación)' },
      { name: 'APIs de IA generativa (Gemini, Claude)' },
      { name: 'Bots y pipelines automatizados con GitHub Actions' },
      { name: 'Pandas / NumPy' },
    ],
  },
  {
    key: 'skills_cat_cms',
    skills: [
      { name: 'Strapi / Sanity CMS' },
      { name: 'WordPress y WooCommerce' },
      { name: 'Elementor' },
      { name: 'VTEX' },
      { name: 'Pasarelas de pago (Mercado Pago, Stripe, PayPal)' },
    ],
  },
  {
    key: 'skills_cat_tools',
    skills: [
      { name: 'Git, GitHub y GitLab', core: true },
      { name: 'SEO técnico, datos estructurados y AEO', core: true },
      { name: 'Netlify / Vercel y CI/CD' },
      { name: 'Seguridad web (CSP, cabeceras HTTP)' },
      { name: 'Figma y buenas prácticas UX/UI' },
      { name: 'Metodologías ágiles (Scrum, Kanban, Jira)' },
    ],
  },
];

const skillGroupsEn: SkillGroup[] = [
  {
    key: 'skills_cat_frontend',
    skills: [
      { name: 'Next.js (App Router)', core: true },
      { name: 'React', core: true },
      { name: 'TypeScript', core: true },
      { name: 'Tailwind CSS', core: true },
      { name: 'JavaScript (ES6+)' },
      { name: 'HTML5 & CSS3 (Flexbox, Grid)' },
      { name: 'Framer Motion' },
      { name: 'Material UI / Bootstrap' },
    ],
  },
  {
    key: 'skills_cat_backend',
    skills: [
      { name: 'Node.js & REST APIs', core: true },
      { name: 'PostgreSQL (Supabase, Neon)', core: true },
      { name: 'Prisma ORM' },
      { name: 'MongoDB' },
      { name: 'Java with Spring Boot' },
      { name: 'SQL & data modeling' },
      { name: 'Authentication & roles' },
    ],
  },
  {
    key: 'skills_cat_ai',
    skills: [
      { name: 'Python', core: true },
      { name: 'scikit-learn (Random Forest, classification)' },
      { name: 'Generative AI APIs (Gemini, Claude)' },
      { name: 'Automated bots & pipelines with GitHub Actions' },
      { name: 'Pandas / NumPy' },
    ],
  },
  {
    key: 'skills_cat_cms',
    skills: [
      { name: 'Strapi / Sanity CMS' },
      { name: 'WordPress & WooCommerce' },
      { name: 'Elementor' },
      { name: 'VTEX' },
      { name: 'Payment gateways (Mercado Pago, Stripe, PayPal)' },
    ],
  },
  {
    key: 'skills_cat_tools',
    skills: [
      { name: 'Git, GitHub & GitLab', core: true },
      { name: 'Technical SEO, structured data & AEO', core: true },
      { name: 'Netlify / Vercel & CI/CD' },
      { name: 'Web security (CSP, HTTP headers)' },
      { name: 'Figma & UX/UI best practices' },
      { name: 'Agile methodologies (Scrum, Kanban, Jira)' },
    ],
  },
];

const certificationsEs = [
  { text: 'Enterprise Systems (ERP y SAP)', detail: 'Universidad de Minnesota — Coursera (2025)' },
  { text: 'Machine Learning con Python', detail: 'Udemy (2025, en curso)' },
  { text: 'Programa Neoris Labs', detail: 'Java, Spring Boot y React (2024)' },
  { text: 'Curso Master en Elementor y WordPress', detail: 'Udemy (2024)' },
  { text: 'Certificación en Desarrollo Fullstack (Stack MERN)', detail: 'Devschool Academy (2023)' },
  { text: 'Licenciatura en Comunicación Social', detail: 'Universidad de Rosario (2011–2014)' },
];

const certificationsEn = [
  { text: 'Enterprise Systems (ERP & SAP)', detail: 'University of Minnesota — Coursera (2025)' },
  { text: 'Machine Learning with Python', detail: 'Udemy (2025, in progress)' },
  { text: 'Neoris Labs Program', detail: 'Java, Spring Boot and React (2024)' },
  { text: 'Master Course in Elementor and WordPress', detail: 'Udemy (2024)' },
  { text: 'Fullstack Development Certification (MERN Stack)', detail: 'Devschool Academy (2023)' },
  { text: "Bachelor's Degree in Social Communication", detail: 'Universidad de Rosario (2011–2014)' },
];

export default function SkillsContent() {
  const { t, language } = useTranslation();
  const groups = language === 'es' ? skillGroupsEs : skillGroupsEn;
  const certifications = language === 'es' ? certificationsEs : certificationsEn;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">{t('skills_title')}</h1>
        <p className="text-muted mb-10 max-w-2xl">{t('skills_intro')}</p>
      </ScrollReveal>

      <div className="flex flex-col gap-10 mb-14">
        {groups.map((group, gi) => (
          <ScrollReveal key={group.key} direction="up" delay={gi * 0.05}>
            <h2 className="text-dark font-bold text-lg mb-4">{t(group.key)}</h2>
            <ul className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className={`text-sm px-4 py-2.5 rounded-xl border transition-all duration-300 hover:shadow-pink-glow ${
                    skill.core
                      ? 'bg-dark text-yellow border-yellow/50 font-semibold'
                      : 'bg-dark text-light border-yellow/20'
                  }`}
                >
                  {skill.name}
                  {skill.core && (
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-dark bg-yellow px-1.5 py-0.5 rounded">
                      {t('skills_main_badge')}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>

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
