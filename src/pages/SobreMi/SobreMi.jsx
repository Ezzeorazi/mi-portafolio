import React from "react";
import styles from "./SobreMi.module.css";
import { NavLink } from "react-router-dom";
import useTranslation from "../../hooks/useTranslation";

const SobreMi = () => {
  const { t } = useTranslation();

  return (
    <section className={`animate_animated animate__fadeIn ${styles.aboutSection}`}>
      <div className={styles.aboutContainer}>
        {/* Biografía */}
        <h2
          className={`animate__animated animate__slideInLeft ${styles.title}`}

        >{t('about_title')}</h2>
        <p className={`animate__animated animate__slideInLeft ${styles.bio}`}>
          {t('about_bio')}
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
