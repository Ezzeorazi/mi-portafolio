import React from 'react';
import styles from './GalleryPractice.module.css';
import ProjectCard from '../ProjectCard/ProjectCard';

const GalleryPractice = ({}) => {
	const proyectos = [
		{
		  id: 1,
		  title: "Pronostico del tiempo",
		  description: "Un sitio web creado con html, css y javascript. Utiliza la API de OpenWeatherMap para mostrar el pronóstico del tiempo.",
		  image: "pagePronostico.jpg",
		  technologies: ["Html", "Css", "Javascript"],
		  liveLink: "https://pronostico-eze.netlify.app/",
		  repoLink: "https://github.com/Ezzeorazi/Pronostico.git",
		},
		{
		  id: 2,
		  title: "Carrito de Compras",
		  description: "Un sitio web creado con html, css, bootstrap y javascript. Permite agregar productos al carrito y calcular el total.",
		  image: "pageCarritoDeCompras.jpg",
		  technologies: ["Html", "Css, bootstrap y javascript"],
		  liveLink: "https://cart-by-ezequiel.netlify.app/",
		  repoLink: "https://github.com/Ezzeorazi/carritoDeCompras.git",
		},
		{
		  id: 3,
		  title: "Input colorRGB",
		  description:
			"Un sitio web creado con html, css y javascript. Permite mediante barras deslizantes elegir un color RGB y muestra el color en el fondo de pantalla.",
		  image: "pageInputRGB.jpg",
		  technologies: ["html", "css", "javascript"],
		  liveLink: "https://input-rgb-color.netlify.app/",
		  repoLink: "https://github.com/Ezzeorazi/input-rgb.git",
		},
		{
		  id: 4,
		  title: "Adivina el número",
		  description:
			"Un sitio web creado con React JS. El usuario debe adivinar un número aleatorio y el sitio le indicará si el número es mayor o menor.",
		  image: "pageAdivinar.jpg",
		  technologies: ["React JS, CSS Modules"],
		  liveLink: "https://adivinador-number.netlify.app/",
		  repoLink: "https://github.com/Ezzeorazi/adivinar-numero.git",
		},
		{
			id: 5,
			title: "Cronometro",
			description:
			  "Un sitio web creado con html, css y javascript. Permite iniciar, pausar y reiniciar un cronómetro.",
			image: "pageCronometro.jpg",
			technologies: ["html", "css", "javascript"],
			liveLink: "https://cronometro-eze.netlify.app/",
			repoLink: "https://github.com/Ezzeorazi/cronometro.git",
		  },
		  {
			id: 6,
			title: "Citas Aleatorias",
			description:
			  "Un sitio web creado con Html, css y javascript. Muestra citas aleatorias de personajes famosos.",
			image: "pageCitasAleatorias.jpg",
			technologies: ["Html", "Css", "Javascript"],
			liveLink: "https://citas-aleatorias-eze.netlify.app/",
			repoLink: "https://github.com/Ezzeorazi/citas-aleatorias.git",
		  	},
			  {
				id: 7,
				title: "Lista de Tareas",
				description:
				  "Un sitio web creado con Html, css y javascript. Permite agregar, eliminar y marcar tareas como completadas.",
				image: "pageListaDeTareas.jpg",
				technologies: ["Html", "Css", "Javascript"],
				liveLink: "https://Lista-De-tareas-eze.netlify.app/",
				repoLink: "https://github.com/Ezzeorazi/lista-tareas.git",
				  },

	  ];
	  return (
		<div className={styles.galleryPractice}>
		  {proyectos.map((proyecto) => (
			<ProjectCard key={proyecto.id} {...proyecto} />
		  ))}
		</div>
	  );
};

GalleryPractice.propTypes = {};

export default GalleryPractice;