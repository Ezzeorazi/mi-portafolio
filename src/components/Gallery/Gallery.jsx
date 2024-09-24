import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from './Gallery.module.css';

const Gallery = ({}) => {
	const proyectos = [
		{
		  id: 1,
		  title: "Portfolio Website",
		  description: "Un sitio web de portafolio creado con React y CSS Modules.",
		  image: "AvatarMaker.png",
		  technologies: ["React", "CSS Modules", "Vite"],
		  liveLink: "https://ejemplo.com",
		  repoLink: "https://github.com/ejemplo/portafolio",
		},
		{
			id: 2,
			title: "Portfolio Website",
			description: "Un sitio web de portafolio creado con React y CSS Modules.",
			image: "AvatarMaker.png",
			technologies: ["React", "CSS Modules", "Vite"],
			liveLink: "https://ejemplo.com",
			repoLink: "https://github.com/ejemplo/portafolio",
		  },
		  {
			id: 3,
			title: "Portfolio Website",
			description: "Un sitio web de portafolio creado con React y CSS Modules.",
			image: "AvatarMaker.png",
			technologies: ["React", "CSS Modules", "Vite"],
			liveLink: "https://ejemplo.com",
			repoLink: "https://github.com/ejemplo/portafolio",
		  }
		// Otros proyectos aquí
	  ];
	
	  return (
		<div className={styles.gallery}>
		  {proyectos.map(proyecto => (
			<ProjectCard key={proyecto.id} {...proyecto} />
		  ))}
		</div>
	  );
	};


export default Gallery;