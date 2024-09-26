import React from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import styles from "./Gallery.module.css";

const Gallery = ({}) => {
  const proyectos = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Un sitio web de portafolio creado con React y CSS Modules.",
      image: "AvatarMaker.png",
      technologies: ["React", "CSS Modules", "Vite"],
      liveLink: "https://ezequiel-orazi.online",
      repoLink: "https://github.com/Ezzeorazi/mi-portafolio.git",
    },
    {
      id: 2,
      title: "Pixel Maker",
      description: "Un sitio web de venta de servicios web creado con React.",
      image: "AvatarMaker.png",
      technologies: ["React", "Vite"],
      liveLink: "https://pixelmaker.com.ar",
      repoLink: "https://github.com/Ezzeorazi/Pixel-react.git",
    },
    {
      id: 3,
      title: "Golden Horses",
      description:
        "Un sitio web alimento para caballos creado con React. Pero desplegado con Html, css y javascript.",
      image: "AvatarMaker.png",
      technologies: ["React", "Vite"],
      liveLink: "https://goldenhorses.com.ar",
      repoLink: "https://github.com/Ezzeorazi/GoldenReact.git",
    },
    {
      id: 4,
      title: "FitBites",
      description:
        "Un sitio web de venta de alimentos saludables creado con Wordpress. Cuenta con una tienda online y un blog.",
      image: "AvatarMaker.png",
      technologies: ["Wordpress", "Woocomerce", "Astra"],
      liveLink: "https://fitbitescr.com",
    },
    // Otros proyectos aquí
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
