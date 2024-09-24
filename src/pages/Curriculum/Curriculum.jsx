import React from "react";
import styles from "./Curriculum.module.css";
import Experience from "../../components/Experience/Experience";
import { Link } from "react-router-dom";

const Curriculum = ({}) => {
  return (
    <section className={styles.curriculum}>
      <Experience />
      <div className={styles.cvDownload}>
        <a href="/pdf/Ezequiel_Orazi_CV.pdf" download="Ezequiel_Orazi_CV.pdf">
          <img
            src="Descargar.png"
            alt="Descargar CV"
            className={styles.cvImage}
          />
        </a>
        <div className={styles.animatedText}>Descargar CV</div>
      </div>
    </section>
  );
};

Curriculum.propTypes = {};

export default Curriculum;
