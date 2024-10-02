import React, { useEffect, useState } from "react";
import styles from "./SobreMi.module.css";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const SobreMi = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Ajusta el tiempo de carga según sea necesario
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        {/* Biografía */}
        <h2 
        className={`animate__animated animate__slideInLeft ${styles.title}`}
        
        >Sobre mí</h2>
        <p className={`animate__animated animate__slideInLeft ${styles.bio}`}>
          Soy Ezequiel Orazi, desarrollador Fullstack con experiencia en la
          creación de aplicaciones web. Luego de 8 años
          de trabajo en la industria de la construcción, decidí enfocarme en mi
          verdadera pasión: sistemas, datos y sitios web. Actualmente, me especializo en
          tecnologías como <strong>React</strong>,<strong> Node.js</strong>,{" "}
          <strong>Spring Boot</strong>, <strong>Next.js</strong> y <strong>Wordpress</strong> siempre
          buscando soluciones a grandes desafíos.
          <br />
          <br />
          Mi enfoque en el trabajo está guiado por la eficiencia, utilizando
          metodologías ágiles como <strong>Scrum</strong> y control de versiones
          con <strong>Git Flow</strong>. Colaboro con una diseñadora gráfica y
          un especialista en SEO para ofrecer experiencias completas y de
          calidad, siempre priorizando la experiencia de usuario.
          <br />
          <br />
          Mi filosofía profesional es comprender las necesidades del cliente
          como si fueran propias, aplicando creatividad y atención al detalle en
          cada proyecto. Me apasionan los desafíos "locos" o complejos que me
          permiten crecer y aprender constantemente.
        </p>
      </div>

      {/* Contenedor de tarjetas */}
      <div className={styles.cardsContainer}>
        <NavLink to="/skills" aria-label="Ver más sobre habilidades técnicas">
          <div className={styles.card}>
            <img src="skills-logo.png" alt="Habilidades Técnicas" />
          </div>
        </NavLink>

        <div className={styles.card}>
          <NavLink to="/project" aria-label="Ver más sobre proyectos">
            <img src="projects-logo.png" alt="Proyectos" />
          </NavLink>
        </div>

        <div className={styles.card}>
          <NavLink to="/curriculum" aria-label="Ver más sobre curriculum">
            <img src="curriculum-logo.png" alt="Curriculum" />
          </NavLink>
        </div>
        <div className={styles.card}>
          <NavLink to="/blog" aria-label="Ver más sobre blog">
            <img src="blog-logo.png" alt="Blog" />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SobreMi;
