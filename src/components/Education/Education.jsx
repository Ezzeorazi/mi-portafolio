import React from "react";
import styles from "./Education.module.css";

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
    
    // Agrega más estudios aquí
  ];
  return (
    <div className={styles.educationContainer}>
      <h2>Educación</h2>
      {education.map((edu) => (
        <div key={edu.id} className={styles.educationCard}>
          <h3>{edu.institution}</h3>
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
  );
};

export default Education;
