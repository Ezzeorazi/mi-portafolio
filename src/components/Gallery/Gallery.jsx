import React from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import styles from "./Gallery.module.css";

const Gallery = ({}) => {
  const proyectos = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Mi sitio personal donde muestro proyectos destacados, habilidades y experiencia. Desarrollado con React y estilizado con CSS Modules para lograr un diseño limpio, moderno y totalmente responsive.",
      image: "pagePortafolio.jpg",
      technologies: ["React", "CSS Modules", "Vite"],
      liveLink: "https://ezequiel-orazi.online",
      repoLink: "https://github.com/Ezzeorazi/mi-portafolio.git",
    },
    {
      id: 2,
      title: "Pixel Maker",
      description: "Landing page para un estudio creativo enfocado en desarrollo web y branding. Construido con React, ofrece una interfaz fluida y profesional para presentar servicios y captar clientes.",
      image: "pagePixelMaker.jpg",
      technologies: ["React", "Vite"],
      liveLink: "https://pixelmaker.com.ar",
      repoLink: "https://github.com/Ezzeorazi/Pixel-react.git",
    },
    {
      id: 3,
      title: "Golden Horses",
      description: "Sitio institucional para una marca de alimentos premium para caballos. Si bien fue maquetado y desplegado usando HTML, CSS y JavaScript puro, su desarrollo se basó en componentes React como punto de partida.",
      image: "pageGoldenHorses.jpg",
      technologies: ["React", "Vite"],
      liveLink: "https://goldenhorses.com.ar",
      repoLink: "https://github.com/Ezzeorazi/GoldenReact.git",
    },
    {
      id: 4,
      title: "FitBites",
      description: "E-commerce desarrollado en WordPress para una tienda de alimentos saludables. Cuenta con una tienda funcional, integración con WooCommerce y un blog para generar contenido y mejorar el SEO.",
      image: "pageFitbites.jpg",
      technologies: ["Wordpress", "Woocomerce", "Astra"],
      liveLink: "https://fitbitescr.com",
    },
    {
      id: 5,
      title: "Creador de Prompts",
      description: "Aplicación que permite generar y guardar prompts personalizados para utilizar con herramientas de inteligencia artificial. Está hecha con React y Material UI, ofreciendo una experiencia simple e intuitiva.",
      image: "prompt-generator.png",
      technologies: ["React", "Material ui", "vite"],
      liveLink: "https://prompt-generate.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/prompt-generator-v2",
    },
    {
      id: 6,
      title: "Presupuestos para sistema de vigilancia",
      description: "Herramienta web pensada para generar presupuestos dinámicos de sistemas de seguridad y videovigilancia. Desarrollada con React y Bootstrap, permite una experiencia rápida y efectiva.",
      image: "presup-aura.png",
      technologies: ["React", "Bootstrap", "vite"],
      liveLink: "https://clever-peony-9c92b7.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/presup-generator",
    },
    {
      id: 7,
      title: "Nimbus CRM",
      description: "Nimbus CRM es una plataforma para gestionar clientes, ventas y procesos de tu empresa de forma centralizada. Creado con el stack MERN y 100% en la nube. 'La joya de la casa.'",
      image: "nimbus-crm.png",
      technologies: ["React", "Tailwind", "Mongo", "Express.js, Node.js"],
      liveLink: "https://taupe-crisp-4638a8.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/CRM-Saas",
    }
    
  ];

  return (
    <div className={styles.gallery}>
      {proyectos.map((proyecto) => (
        <ProjectCard key={proyecto.id} {...proyecto} />
      ))}
    </div>
  );
};

export default Gallery;
