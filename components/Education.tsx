'use client';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  /** Ausente en las carreras en curso de las que no publicamos fecha de inicio. */
  startDate?: string;
  endDate?: string;
  endDateKey?: string;
  description: string;
}

const educationEs: EducationItem[] = [
  {
    id: 0,
    institution: 'Universidad Siglo 21',
    degree: 'Licenciatura en Administración de Empresas',
    description:
      'Carrera en curso, 3 años cursados. Administración, finanzas y gestión de operaciones, que aplico tanto en la dirección de Caliber 3D como en el trato comercial con los clientes de mis proyectos web.',
  },
  {
    id: 1,
    institution: 'Udemy',
    degree: 'Curso: Machine Learning con Python',
    startDate: 'Junio 2025',
    endDateKey: 'edu_in_progress',
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
    startDate: 'Agosto 2024',
    endDate: 'Octubre 2024',
    description:
      'Programa intensivo de desarrollo fullstack con React, Spring Boot y Java. Proyectos prácticos y colaborativos orientados al desarrollo de aplicaciones web modernas y escalables.',
  },
  {
    id: 4,
    institution: 'Devschool Academy',
    degree: 'Desarrollo Fullstack Tecnologías MERN',
    startDate: '2021',
    endDate: '2023',
    description:
      'Desarrollo fullstack con tecnologías MERN (MongoDB, Express, React y Node.js). Proyectos prácticos y colaborativos con enfoque en aplicaciones web modernas.',
  },
  {
    id: 5,
    institution: 'Universidad Nacional de Rosario (UNR)',
    degree: 'Licenciatura en Comunicación Social',
    startDate: '2011',
    endDate: '2015',
    description:
      'Comunicación social con énfasis en periodismo y comunicación digital. Redacción, edición y producción de contenido para medios digitales e impresos.',
  },
];

const educationEn: EducationItem[] = [
  {
    id: 0,
    institution: 'Universidad Siglo 21',
    degree: "Bachelor's Degree in Business Administration",
    description:
      'Degree in progress, 3 years completed. Administration, finance and operations management, which I apply both to running Caliber 3D and to the commercial side of my web projects.',
  },
  {
    id: 1,
    institution: 'Udemy',
    degree: 'Course: Machine Learning with Python',
    startDate: 'June 2025',
    endDateKey: 'edu_in_progress',
    description:
      'Intensive course on machine learning fundamentals with Python, NumPy, Pandas, Matplotlib and Scikit-learn. Classification, regression, decision trees and neural networks applied to real datasets.',
  },
  {
    id: 2,
    institution: 'University of Minnesota – Coursera',
    degree: 'Course: Enterprise Systems (ERP & SAP)',
    startDate: 'April 2025',
    endDate: 'June 2025',
    description:
      'Course on ERP systems focused on SAP and its application in business processes. FI, CO and logistics modules. Completed with official Coursera certification.',
  },
  {
    id: 3,
    institution: 'Neoris Labs',
    degree: 'Fullstack Development | React + Spring Boot + Java',
    startDate: 'August 2024',
    endDate: 'October 2024',
    description:
      'Intensive fullstack development program with React, Spring Boot and Java. Practical and collaborative projects focused on building modern, scalable web applications.',
  },
  {
    id: 4,
    institution: 'Devschool Academy',
    degree: 'Fullstack Development — MERN Stack',
    startDate: '2021',
    endDate: '2023',
    description:
      'Fullstack development with MERN technologies (MongoDB, Express, React and Node.js). Practical and collaborative projects focused on modern web applications.',
  },
  {
    id: 5,
    institution: 'Universidad Nacional de Rosario (UNR)',
    degree: "Bachelor's Degree in Social Communication",
    startDate: '2011',
    endDate: '2015',
    description:
      'Social communication with emphasis on journalism and digital communication. Writing, editing and content production for digital and print media.',
  },
];

export default function Education() {
  const { t, language } = useTranslation();
  const education = language === 'es' ? educationEs : educationEn;

  return (
    <div>
      <ScrollReveal direction="left">
        <h2 className="text-2xl font-bold text-dark mb-8">{t('edu_heading')}</h2>
      </ScrollReveal>
      <div className="flex flex-col gap-6">
        {education.map((edu, i) => (
          <ScrollReveal key={edu.id} direction="flip" delay={i * 0.08}>
            <div className="bg-dark rounded-xl p-6 border border-yellow/20 hover:shadow-pink-glow transition-all duration-300">
              <h3 className="text-yellow font-bold text-lg">{edu.institution}</h3>
              <p className="text-light font-medium text-sm mt-1">{edu.degree}</p>
              <p className="text-light/60 text-sm mt-1">
                {edu.startDate ? `${edu.startDate} — ` : ''}
                {edu.endDate ?? t('edu_in_progress')}
              </p>
              <p className="text-light/80 text-sm mt-3 leading-relaxed">{edu.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
