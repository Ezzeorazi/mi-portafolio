'use client';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

const experiencesEs = [
  {
    id: 1,
    company: 'Caliber 3d Printing',
    role: 'Técnico de impresión 3D, diseñador y desarrollador web',
    startDate: 'Enero 2025',
    endDateKey: 'exp_present',
    description:
      'Soporte técnico en impresión 3D, diseño de modelos y desarrollo de sitios web para la empresa. Colaboración en equipo y optimización de procesos. Además creación de contenido digital para redes sociales y marketing.',
    technologies: ['Impresión 3D', 'Diseño 3D', 'Desarrollo Web'],
  },
  {
    id: 2,
    company: 'Pixel Maker',
    role: 'Desarrollador de sitios web',
    startDate: 'Septiembre 2023',
    endDateKey: 'exp_present',
    description:
      'Gestión y ejecución de proyectos web end-to-end, desde la conceptualización hasta el despliegue. Creación de diseños web optimizados para SEO, desarrollo con HTML, CSS y JavaScript, administración de hosting y dominios.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
  },
  {
    id: 3,
    company: 'Watchman',
    role: 'Guardia de seguridad',
    startDate: 'Noviembre 2024',
    endDate: 'Noviembre 2025',
    description:
      'Como guardia de seguridad en Watchman, aplico conocimientos en ciberseguridad para monitorear y responder a posibles amenazas, asegurando la integridad de los sistemas. Manejo sistemas de cámaras de seguridad para vigilancia continua y empleo herramientas como Excel para registro y análisis de datos.',
    technologies: ['Excel', 'Ciberseguridad', 'Cámaras de seguridad'],
  },
  {
    id: 4,
    company: 'Desafío Latam',
    role: 'Desarrollador Front-end',
    startDate: 'Mayo 2023',
    endDate: 'Julio 2024',
    description:
      'Desarrollo de la interfaz de usuario de devsafio.com con Next.js y Tailwind CSS. Mejora de interactividad en el proyecto SQL Interactivo con JavaScript avanzado. Colaboración en equipo usando Figma, Jira y Discord.',
    technologies: ['Next.js', 'Tailwind CSS', 'JavaScript', 'Figma', 'Jira'],
  },
  {
    id: 5,
    company: 'Division Profesional Centro SA',
    role: 'Especialista administrativo',
    startDate: 'Octubre 2020',
    endDate: 'Septiembre 2023',
    description:
      'Desarrollo y mantenimiento de relaciones con clientes, asesoramiento personalizado, administración de plataformas VTEX y WordPress. Trabajo colaborativo con equipos diversos.',
    technologies: ['VTEX', 'WordPress', 'Excel', 'Word', 'Meridiano Soft'],
  },
  {
    id: 6,
    company: 'Leiten SRL',
    role: 'Jefe de taller',
    startDate: 'Mayo 2015',
    endDate: 'Septiembre 2020',
    description:
      'Liderazgo de equipos para proyectos de reparación de maquinaria pesada. Implementación de tecnologías para mejorar eficiencia, planificación y monitoreo de proyectos con herramientas digitales.',
    technologies: ['Tango Gestión', 'Excel', 'Word', 'PLC'],
  },
];

const experiencesEn = [
  {
    id: 1,
    company: 'Caliber 3d Printing',
    role: '3D Printing Technician, Designer and Web Developer',
    startDate: 'January 2025',
    endDateKey: 'exp_present',
    description:
      'Technical support in 3D printing, model design and website development for the company. Team collaboration and process optimization. Also creating digital content for social media and marketing.',
    technologies: ['3D Printing', '3D Design', 'Web Development'],
  },
  {
    id: 2,
    company: 'Pixel Maker',
    role: 'Web Developer',
    startDate: 'September 2023',
    endDateKey: 'exp_present',
    description:
      'End-to-end web project management and execution, from concept to deployment. Creation of SEO-optimized web designs, development with HTML, CSS and JavaScript, hosting and domain administration.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
  },
  {
    id: 3,
    company: 'Watchman',
    role: 'Security Guard',
    startDate: 'November 2024',
    endDate: 'November 2025',
    description:
      'As a security guard at Watchman, I applied cybersecurity knowledge to monitor and respond to potential threats, ensuring system integrity. Managing security camera systems for continuous surveillance and using tools like Excel for data recording and analysis.',
    technologies: ['Excel', 'Cybersecurity', 'Security Cameras'],
  },
  {
    id: 4,
    company: 'Desafío Latam',
    role: 'Front-end Developer',
    startDate: 'May 2023',
    endDate: 'July 2024',
    description:
      'Development of the devsafio.com user interface with Next.js and Tailwind CSS. Improving interactivity in the Interactive SQL project with advanced JavaScript. Team collaboration using Figma, Jira and Discord.',
    technologies: ['Next.js', 'Tailwind CSS', 'JavaScript', 'Figma', 'Jira'],
  },
  {
    id: 5,
    company: 'Division Profesional Centro SA',
    role: 'Administrative Specialist',
    startDate: 'October 2020',
    endDate: 'September 2023',
    description:
      'Client relationship development and maintenance, personalized consulting, VTEX and WordPress platform administration. Collaborative work with diverse teams.',
    technologies: ['VTEX', 'WordPress', 'Excel', 'Word', 'Meridiano Soft'],
  },
  {
    id: 6,
    company: 'Leiten SRL',
    role: 'Workshop Manager',
    startDate: 'May 2015',
    endDate: 'September 2020',
    description:
      'Team leadership for heavy machinery repair projects. Implementation of technologies to improve efficiency, project planning and monitoring with digital tools.',
    technologies: ['Tango Gestión', 'Excel', 'Word', 'PLC'],
  },
];

export default function Experience() {
  const { t, language } = useTranslation();
  const experiences = language === 'es' ? experiencesEs : experiencesEn;

  return (
    <div>
      <ScrollReveal direction="left">
        <h2 className="text-2xl font-bold text-dark mb-8">{t('exp_heading')}</h2>
      </ScrollReveal>
      <div className="flex flex-col gap-6">
        {experiences.map((exp, i) => (
          <ScrollReveal key={exp.id} direction="flip" delay={i * 0.08}>
            <div className="bg-dark rounded-xl p-6 border border-yellow/20 hover:shadow-pink-glow transition-all duration-300">
              <h3 className="text-yellow font-bold text-lg">
                {exp.role} — {exp.company}
              </h3>
              <p className="text-light/60 text-sm mt-1">
                {exp.startDate} — {(exp as { endDate?: string }).endDate ?? t('exp_present')}
              </p>
              <p className="text-light/80 text-sm mt-3 leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-yellow/10 text-yellow border border-yellow/20 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
