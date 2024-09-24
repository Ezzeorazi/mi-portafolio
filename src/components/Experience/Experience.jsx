"use client";
import React from 'react';
import styles from './Experience.module.css';

const Experience = ({}) => {
	const experiences = [
		{
		  id: 1,
		  company: "Fitbites",
		  role: "Desarrollador Web",
		  startDate: "Enero 2021",
		  endDate: "Actualidad",
		  description: "Desarrollo de tienda en WordPress con Elementor y tema Astra. Implementación de SEO y optimización de la tienda online.",
		  technologies: ["WordPress", "Elementor", "SEO", "Astra Theme"],
		},
		{
		  id: 2,
		  company: "Pinturerías del Centro",
		  role: "Desarrollador Web",
		  startDate: "Julio 2018",
		  endDate: "Julio 2021",
		  description: "Mantenimiento y desarrollo de la tienda online utilizando VTEX, implementación de productos y optimización SEO.",
		  technologies: ["VTEX", "SEO", "HTML", "CSS", "JavaScript"],
		},
		// Agrega más experiencias laborales aquí
	  ];

	return (
		<div className={styles.experienceSection}>
      <h2>Experiencia Laboral</h2>
      {experiences.map((experience) => (
        <div key={experience.id} className={styles.experienceCard}>
          <h3>{experience.role} en {experience.company}</h3>
          <p>{experience.startDate} - {experience.endDate}</p>
          <p>{experience.description}</p>
          <p><strong>Tecnologías utilizadas:</strong> {experience.technologies.join(', ')}</p>
        </div>
      ))}
    </div>
	);
};


export default Experience;