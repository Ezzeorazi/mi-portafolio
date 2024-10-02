import React, { useEffect, useState } from "react";
import styles from "./Project.module.css";
import Gallery from "../../components/Gallery/Gallery";
import Loading from "../../components/Loading/Loading";
import GalleryPractice from "../../components/GalleryPractice/GalleryPractice";

const Project = ({}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Ajusta el tiempo de carga según sea necesario
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.project}>
      <h2 className={`animate__animated animate__slideInLeft`}>
        Mis sitios web
      </h2>
      <Gallery />
      <h2 className={`animate__animated animate__slideInLeft`}>
        Proyectos de practica
      </h2>
      <GalleryPractice />
    </div>
  );
};

export default Project;
