import React from "react";
import styles from "./Education.module.css";
import 'animate.css';

const Education = () => {
  const education = [
    {
      id: 1,
      institution: "Neoris Labs",
      degree: "Desarrollo Fullstack | React + Spring Boot + Java",
      startDate: "Julio 2024",
      endDate: "Septiembre 2024",
      description:
        "Participé en un programa intensivo de desarrollo fullstack en Neoris Labs, donde aprendí a desarrollar aplicaciones web con React, Spring Boot y Java. Trabajé en proyectos prácticos y colaborativos, adquiriendo habilidades en el desarrollo de aplicaciones web modernas y escalables.",
    },
    {
      id: 2,
      institution: "Devschool Academy",
      degree: "Desarrollo Fullstack Tecnologias MERN",
      startDate: "Marzo 2023",
      endDate: "Febrero 2024",
      description:
        "Estudié desarrollo fullstack en Devschool Academy, donde aprendí a crear aplicaciones web con tecnologías MERN (MongoDB, Express, React y Node.js). Desarrollé habilidades en el desarrollo de aplicaciones web modernas y escalables, y trabajé en proyectos prácticos y colaborativos.",
    },
    {
      id: 4,
      institution: "Universidad de Rosario",
      degree: "Licenciatura en Comunicación Social",
      startDate: "Marzo 2011",
      endDate: "Diciembre 2014",
      description:
        "Estudié comunicación social con énfasis en periodismo y comunicación digital. Desarrollé habilidades de redacción, edición y producción de contenido para medios digitales e impresos. Realicé prácticas profesionales en medios de comunicación locales y participé en proyectos de investigación sobre medios digitales y redes sociales.",
    },
    {
      id: 5,
      institution: "Universidad de Minnesota – Coursera",
      degree: "Curso: Enterprise Systems (ERP y SAP)",
      startDate: "Abril 2025",
      endDate: "Junio 2025",
      description:
        "Curso introductorio sobre sistemas ERP, con enfoque en SAP y su aplicación en procesos empresariales. Estudié la estructura, funcionamiento y beneficios de los sistemas de planificación de recursos, incluyendo módulos clave como FI, CO y logística. Finalizado con certificación oficial de Coursera.",
    },

    {
      id: 6,
      institution: "Udemy",
      degree: "Curso: Machine Learning con Python",
      startDate: "Junio 2025",
      endDate: "En curso",
      description:
        "Curso intensivo enfocado en los fundamentos del machine learning utilizando Python, NumPy, Pandas, Matplotlib y Scikit-learn. Incluye clasificación, regresión, árboles de decisión y redes neuronales. Aplicación práctica de algoritmos con datasets reales y desarrollo de modelos predictivos.",
    },
    // Agrega más estudios aquí
  ];
  return (
    <>
      <h2 className={`animate__animated animate__slideInLeft ${styles.title}`}>Educación</h2>
      <div className={styles.educationContainer}>
        {education.map((edu) => (
          <div key={edu.id}
            className={`animate__animated animate__flipInX ${styles.educationCard}`}>
            <h3>
              {edu.institution}
            </h3>
            <p>
              <strong>{edu.degree}</strong>
            </p>
            <p>
              {edu.startDate} - {edu.endDate}
            </p>
            <p>{edu.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Education;
