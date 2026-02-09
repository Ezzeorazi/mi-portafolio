import React from 'react';
import styles from './Skills.module.css';
import useTranslation from '../../hooks/useTranslation';

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section className={`animate__animated animate__fadeIn ${styles.skills}`}>
      <div className={styles.skillsContainer}>
        {/* Habilidades Técnicas */}
        <h3 className={`animate__animated animate__slideInLeft ${styles.subtitle}`}>
          {t('skills_title')}
        </h3>

        <ul className={`animate__animated animate__flipInX ${styles.skillsList}`}>
          <li>HTML5</li>
          <li>CSS3 moderno (Flexbox, Grid, CSS Modules)</li>
          <li>JavaScript (ES6+)</li>
          <li>React JS (Hooks, Context, Routing)</li>
          <li>Node.js</li>
          <li>Java con Spring Boot</li>
          <li>Desarrollo de APIs REST</li>
          <li>SQL y modelado de bases de datos</li>
          <li>PostgreSQL</li>
          <li>Git (Git Flow)</li>
          <li>GitHub / GitLab</li>
          <li>Vite y Webpack</li>
          <li>IntelliJ IDEA y VS Code</li>
          <li>SEO técnico y optimización web</li>
          <li>WordPress y WooCommerce</li>
          <li>Elementor</li>
          <li>VTEX</li>
          <li>Optimización de rendimiento</li>
          <li>Buenas prácticas UX/UI</li>
        </ul>

        {/* Logros y Certificaciones */}
        <h3 className={`animate__animated animate__slideInLeft ${styles.subtitle}`}>
          {t('skills_certifications')}
        </h3>

        <ul className={`animate__animated animate__flipInX ${styles.certList}`}>
          <li>
            Certificación en Desarrollo Fullstack (Stack MERN) -{' '}
            <strong>Devschool Academy</strong> (2023)
          </li>
          <li>
            Programa <strong>NEORIS Labs</strong> - Java, Spring Boot y React (2024)
          </li>
          <li>
            Más de <strong>3 años de experiencia profesional</strong> en desarrollo web
            con <strong>WordPress</strong> y <strong>VTEX</strong>
          </li>
          <li>
            Curso Master en <strong>Elementor y WordPress</strong> -{' '}
            <strong>Udemy</strong> (2024)
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Skills;