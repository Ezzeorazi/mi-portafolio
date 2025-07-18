import React from 'react';
import styles from './Skills.module.css';
import useTranslation from '../../hooks/useTranslation';

const Skills = ({}) => {
  const { t } = useTranslation();

  return (
    <section className={`animate_animated animate__fadeIn ${styles.skills}`}>
      {/* Habilidades */}
      <div className={styles.skillsContainer}>
        <h3 className={`animate__animated animate__slideInLeft ${styles.subtitle}`}>
          {t('skills_title')}
        </h3>
        <ul
        className={`animate__animated animate__flipInX ${styles.skillsList}`}>
          <li>HTML5</li>
          <li>CSS3 (incluyendo CSS Modules)</li>
          <li>JavaScript (ES6+)</li>
          <li>React JS</li>
          <li>Node.js</li>
          <li>Java (Spring Boot)</li>
          <li>SQL (Bases de datos)</li>
          <li>Git & GitHub/GitLab</li>
          <li>Vite, Webpack</li>
          <li>IntelliJ IDEA, VSCode</li>
          <li>SEO (Optimización para motores de búsqueda)</li>
          <li>WordPress & WooCommerce</li>
          <li>Elementor</li>
          <li>PostgreSQL</li>

        </ul>

        {/* Logros y Certificaciones */}
        <h3 className={`animate__animated animate__slideInLeft ${styles.subtitle}`}
        >
          {t('skills_certifications')}
        </h3>
        <ul className={`animate__animated animate__flipInX ${styles.certList}`}>
          <li>Certificación en Desarrollo Fullstack con tecnologías MERN en <strong>Devschool Academy</strong>(2023)</li>
          <li>Participación en el programa <strong>NEORIS Labs - LAB JAVA+SPRINGBOOT+REACT</strong> (2024)</li>
          <li>Más de 3 años de experiencia en desarrollo web con <strong>WordPress</strong> y <strong>VTEX</strong></li>
          <li>Curso Master en<strong> Elementor y Wordpress</strong> en<strong> Udemy </strong> (2024)</li>
        </ul>
		</div>
      </section>
	);
};


export default Skills;