import React, { useEffect, useState } from "react";
import styles from "./Curriculum.module.css";
import Experience from "../../components/Experience/Experience";
import Loading from "../../components/Loading/Loading";
import { Education } from "../../components";
import CvDownload from "../../components/CvDownload/CvDownload";

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
      <Education />
      <CvDownload />
    </section>
  );
};

Curriculum.propTypes = {};

export default Curriculum;
