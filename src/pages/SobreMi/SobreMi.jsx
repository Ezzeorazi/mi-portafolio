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
        <h2 className={styles.title}>Sobre mí</h2>
        <p className={styles.bio}>
          Soy Ezequiel Orazi, desarrollador Fullstack con experiencia en la
          creación de aplicaciones web eficientes y escalables. Me especializo
          en tecnologías modernas como <strong>React</strong>,{" "}
          <strong>Node.js</strong> y <strong>Spring Boot</strong>. Disfruto
          resolviendo problemas complejos con soluciones innovadoras. Mi
          motivación es aprender constantemente y aplicar mis conocimientos para
          crear experiencias de usuario únicas y funcionales.
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
