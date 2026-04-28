import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    id: 1,
    company: 'Watchman',
    role: 'Guardia de seguridad',
    startDate: 'Noviembre 2024',
    endDate: 'Actualidad',
    description:
      'Como guardia de seguridad en Watchman, aplico conocimientos en ciberseguridad para monitorear y responder a posibles amenazas, asegurando la integridad de los sistemas. Manejo sistemas de cámaras de seguridad para vigilancia continua y empleo herramientas como Excel para registro y análisis de datos.',
    technologies: ['Excel', 'Ciberseguridad', 'Cámaras de seguridad'],
  },
  {
    id: 2,
    company: 'Pixel Maker',
    role: 'Desarrollador de sitios web',
    startDate: 'Septiembre 2023',
    endDate: 'Agosto 2024',
    description:
      'Gestión y ejecución de proyectos web end-to-end, desde la conceptualización hasta el despliegue. Creación de diseños web optimizados para SEO, desarrollo con HTML, CSS y JavaScript, administración de hosting y dominios.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'SEO'],
  },
  {
    id: 3,
    company: 'Desafío Latam',
    role: 'Desarrollador Front-end',
    startDate: 'Mayo 2023',
    endDate: 'Julio 2024',
    description:
      'Desarrollo de la interfaz de usuario de devsafio.com con Next.js y Tailwind CSS. Mejora de interactividad en el proyecto SQL Interactivo con JavaScript avanzado. Colaboración en equipo usando Figma, Jira y Discord.',
    technologies: ['Next.js', 'Tailwind CSS', 'JavaScript', 'Figma', 'Jira'],
  },
  {
    id: 4,
    company: 'Division Profesional Centro SA',
    role: 'Especialista administrativo',
    startDate: 'Octubre 2020',
    endDate: 'Septiembre 2023',
    description:
      'Desarrollo y mantenimiento de relaciones con clientes, asesoramiento personalizado, administración de plataformas VTEX y WordPress. Trabajo colaborativo con equipos diversos.',
    technologies: ['VTEX', 'WordPress', 'Excel', 'Word', 'Meridiano Soft'],
  },
  {
    id: 5,
    company: 'Leiten SRL',
    role: 'Jefe de taller',
    startDate: 'Mayo 2015',
    endDate: 'Septiembre 2020',
    description:
      'Liderazgo de equipos para proyectos de reparación de maquinaria pesada. Implementación de tecnologías para mejorar eficiencia, planificación y monitoreo de proyectos con herramientas digitales.',
    technologies: ['Tango Gestión', 'Excel', 'Word', 'PLC'],
  },
];

export default function Experience() {
  return (
    <div>
      <ScrollReveal direction="left">
        <h2 className="text-2xl font-bold text-dark mb-8">Experiencia Laboral</h2>
      </ScrollReveal>
      <div className="flex flex-col gap-6">
        {experiences.map((exp, i) => (
          <ScrollReveal key={exp.id} direction="flip" delay={i * 0.08}>
            <div className="bg-dark rounded-xl p-6 border border-yellow/20 hover:shadow-pink-glow transition-all duration-300">
              <h3 className="text-yellow font-bold text-lg">
                {exp.role} en {exp.company}
              </h3>
              <p className="text-light/60 text-sm mt-1">
                {exp.startDate} — {exp.endDate}
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
