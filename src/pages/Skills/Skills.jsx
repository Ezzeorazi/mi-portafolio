"use client";
import React from 'react';
import styles from './Skills.module.css';

const Skills = ({}) => {
	return (
		<section className={styles.skills}>
 			 {/* Habilidades */}
			 <div className={styles.skillsContainer}>
			  <h3 className={styles.subtitle}>Habilidades Técnicas</h3>
        <ul className={styles.skillsList}>
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
        </ul>

        {/* Logros y Certificaciones */}
        <h3 className={styles.subtitle}>Logros y Certificaciones</h3>
        <ul className={styles.certList}>
          <li>Certificación en Java y React – <strong>NEORIS Labs</strong></li>
          <li>Participación en el programa <strong>NEORIS Labs - LAB JAVA+REACT</strong> (2024)</li>
          <li>Más de 3 años de experiencia en desarrollo web con <strong>WordPress</strong> y <strong>VTEX</strong></li>
        </ul>
		</div>
      </section>
	);
};


export default Skills;