import React from "react";
import styles from "./SobreMi.module.css";
import { NavLink } from "react-router-dom";

const SobreMi = () => {

  return (
    <section className={`animate_animated animate__fadeIn ${styles.aboutSection}`}>
      <div className={styles.aboutContainer}>
        {/* Biografía */}
        <h2
          className={`animate__animated animate__slideInLeft ${styles.title}`}

        >Sobre mí</h2>
        <p className={`animate__animated animate__slideInLeft ${styles.bio}`}>
          Hola, soy Ezequiel Orazi, desarrollador fullstack apasionado por crear aplicaciones web y soluciones digitales personalizadas. 
          Tras más de ocho años en roles operativos y técnicos, decidí reorientar mi carrera hacia lo que realmente me motiva: la tecnología, 
          los datos y el desarrollo web. <br />
          <br />
          Trabajo con tecnologías como React, Node.js, Spring Boot, Next.js y WordPress, enfocándome en construir productos funcionales, 
          con alto rendimiento y una excelente experiencia de usuario. Me apoyo en metodologías ágiles como Scrum y herramientas como 
          Git Flow para asegurar un trabajo colaborativo y organizado. <br />
          <br />
          Completé una capacitación en ERP/SAP (Universidad de Minnesota, Coursera) y actualmente estoy cursando un programa intensivo de 
          Machine Learning con Python en Udemy, lo que me permite sumar una perspectiva analítica a mis proyectos. <br />
          <br />

          Además de programar, también me encargo del diseño visual, la redacción de contenido optimizado y el SEO de los sitios 
          que desarrollo. Me motiva aprender constantemente y aportar valor real a través de la tecnología, 
          siempre con los pies en la tierra y la mente abierta a nuevos desafíos.
        </p>
      </div>

      {/* Contenedor de tarjetas */}
      <div className={styles.cardsContainer}>
        <NavLink to="/skills" aria-label="Ver más sobre habilidades técnicas">
          <div className={styles.card}>
            <img src="skills-logo.svg" alt="Habilidades Técnicas" />
          </div>
        </NavLink>

        <div className={styles.card}>
          <NavLink to="/project" aria-label="Ver más sobre proyectos">
            <img src="projects-logo.svg" alt="Proyectos" />
          </NavLink>
        </div>

        <div className={styles.card}>
          <NavLink to="/curriculum" aria-label="Ver más sobre curriculum">
            <img src="curriculum-logo.svg" alt="Curriculum" />
          </NavLink>
        </div>
        <div className={styles.card}>
          <NavLink to="/blog" aria-label="Ver más sobre blog">
            <img src="blog-logo.svg" alt="Blog" />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SobreMi;
