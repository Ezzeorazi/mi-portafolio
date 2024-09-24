import React, { useEffect, useState } from "react";
import styles from "./Curriculum.module.css";
import Experience from "../../components/Experience/Experience";
import Loading from "../../components/Loading/Loading";

const Curriculum = ({}) => {
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
