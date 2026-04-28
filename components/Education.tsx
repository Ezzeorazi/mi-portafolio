import ScrollReveal from './ScrollReveal';

const education = [
  {
    id: 1,
    institution: 'Udemy',
    degree: 'Curso: Machine Learning con Python',
    startDate: 'Junio 2025',
    endDate: 'En curso',
    description:
      'Curso intensivo en fundamentos de machine learning con Python, NumPy, Pandas, Matplotlib y Scikit-learn. Clasificación, regresión, árboles de decisión y redes neuronales aplicadas a datasets reales.',
  },
  {
    id: 2,
    institution: 'Universidad de Minnesota – Coursera',
    degree: 'Curso: Enterprise Systems (ERP y SAP)',
    startDate: 'Abril 2025',
    endDate: 'Junio 2025',
    description:
      'Curso sobre sistemas ERP con enfoque en SAP y su aplicación en procesos empresariales. Módulos FI, CO y logística. Finalizado con certificación oficial de Coursera.',
  },
  {
    id: 3,
    institution: 'Neoris Labs',
    degree: 'Desarrollo Fullstack | React + Spring Boot + Java',
    startDate: 'Julio 2024',
    endDate: 'Septiembre 2024',
    description:
      'Programa intensivo de desarrollo fullstack con React, Spring Boot y Java. Proyectos prácticos y colaborativos orientados al desarrollo de aplicaciones web modernas y escalables.',
  },
  {
    id: 4,
    institution: 'Devschool Academy',
    degree: 'Desarrollo Fullstack Tecnologías MERN',
    startDate: 'Marzo 2023',
    endDate: 'Febrero 2024',
    description:
      'Desarrollo fullstack con tecnologías MERN (MongoDB, Express, React y Node.js). Proyectos prácticos y colaborativos con enfoque en aplicaciones web modernas.',
  },
  {
    id: 5,
    institution: 'Universidad de Rosario',
    degree: 'Licenciatura en Comunicación Social',
    startDate: 'Marzo 2011',
    endDate: 'Diciembre 2014',
    description:
      'Comunicación social con énfasis en periodismo y comunicación digital. Redacción, edición y producción de contenido para medios digitales e impresos.',
  },
];

export default function Education() {
  return (
    <div>
      <ScrollReveal direction="left">
        <h2 className="text-2xl font-bold text-dark mb-8">Educación</h2>
      </ScrollReveal>
      <div className="flex flex-col gap-6">
        {education.map((edu, i) => (
          <ScrollReveal key={edu.id} direction="flip" delay={i * 0.08}>
            <div className="bg-dark rounded-xl p-6 border border-yellow/20 hover:shadow-pink-glow transition-all duration-300">
              <h3 className="text-yellow font-bold text-lg">{edu.institution}</h3>
              <p className="text-light font-medium text-sm mt-1">{edu.degree}</p>
              <p className="text-light/60 text-sm mt-1">
                {edu.startDate} — {edu.endDate}
              </p>
              <p className="text-light/80 text-sm mt-3 leading-relaxed">{edu.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
