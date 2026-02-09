import React from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const proyectos = [
    {
      id: 1,
      title: "Portfolio Profesional",
      description:
        "Sitio web personal diseñado para presentar mi perfil profesional, proyectos reales y stack tecnológico. Desarrollado con React y Vite, enfocado en rendimiento, diseño responsive, accesibilidad y SEO técnico. Funciona como carta de presentación para clientes y reclutadores.",
      image: "pagePortafolio.jpg",
      technologies: ["React", "Vite", "CSS Modules"],
      liveLink: "https://ezequiel-orazi.online",
      repoLink: "https://github.com/Ezzeorazi/mi-portafolio.git",
    },
    {
      id: 2,
      title: "Pixel Maker",
      description:
        "Landing page profesional para un estudio creativo orientado a desarrollo web y branding. Construida con React y Vite, optimizada para conversión, carga rápida y experiencia de usuario clara, con foco en la captación de clientes.",
      image: "pagePixelMaker.jpg",
      technologies: ["React", "Vite"],
      liveLink: "https://pixelmaker.com.ar",
      repoLink: "https://github.com/Ezzeorazi/Pixel-react.git",
    },
    {
      id: 3,
      title: "Golden Horses",
      description:
        "Sitio institucional para una marca premium de nutrición equina. Desarrollo orientado a presencia de marca, claridad comercial y posicionamiento. Si bien fue desplegado con HTML, CSS y JavaScript, el proyecto fue estructurado inicialmente con enfoque en componentes reutilizables.",
      image: "pageGoldenHorses.jpg",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://goldenhorses.com.ar",
      repoLink: "https://github.com/Ezzeorazi/GoldenReact.git",
    },
    {
      id: 4,
      title: "FitBites",
      description:
        "E-commerce de alimentos saludables desarrollado en WordPress con WooCommerce. Incluye catálogo de productos, carrito de compras, blog optimizado para SEO y una arquitectura pensada para escalar el negocio digital.",
      image: "pageFitbites.jpg",
      technologies: ["WordPress", "WooCommerce", "Astra"],
      liveLink: "https://fitbitescr.com",
    },
    {
      id: 5,
      title: "Creador de Prompts IA",
      description:
        "Aplicación web para crear, organizar y reutilizar prompts personalizados para herramientas de inteligencia artificial. Desarrollada con React y Material UI, priorizando usabilidad, rapidez y una interfaz intuitiva.",
      image: "prompt-generator.png",
      technologies: ["React", "Material UI", "Vite"],
      liveLink: "https://prompt-generate.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/prompt-generator-v2",
    },
    {
      id: 6,
      title: "Generador de Presupuestos – Seguridad",
      description:
        "Herramienta web diseñada para generar presupuestos dinámicos de sistemas de vigilancia y videoseguridad. Permite agilizar cotizaciones comerciales mediante una interfaz clara y eficiente.",
      image: "presup-aura.png",
      technologies: ["React", "Bootstrap", "Vite"],
      liveLink: "https://clever-peony-9c92b7.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/presup-generator",
    },
    {
      id: 7,
      title: "Nimbus CRM",
      description:
        "Plataforma CRM desarrollada con el stack MERN para la gestión de clientes, ventas y procesos internos. Aplicación 100% cloud, escalable y orientada a empresas que buscan centralizar su operación comercial.",
      image: "nimbus-crm.png",
      technologies: ["React", "Tailwind", "MongoDB", "Express", "Node.js"],
      liveLink: "https://taupe-crisp-4638a8.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/CRM-Saas",
    },
    {
      id: 8,
      title: "Maktub - Marroquinería",
      description:
        "Tienda online desarrollada en WordPress para una marca de marroquinería. Proyecto orientado a ventas, con catálogo optimizado, diseño personalizado y enfoque en identidad de marca, experiencia de usuario y autogestión del contenido. Sitio en construcción",
      image: "maktub-desktop.svg",
      technologies: ["WordPress", "WooCommerce", "Elementor"],
      liveLink: "https://maktub.misitiosimple.online/",
    },
    {
      id: 9,
      title: "Caliber 3D",
      description:
        "Plataforma web para mi emprendimiento de impresión 3D. Desarrollada con React, Vite y Tailwind, orientada a mostrar servicios, productos personalizados y facilitar el contacto con clientes. Enfoque en performance, diseño moderno y escalabilidad.",
      image: "caliber3d-desktop.svg",
      technologies: ["React", "Vite", "Tailwind CSS"],
      liveLink: "https://classy-biscochitos-3b6082.netlify.app/",
    },
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