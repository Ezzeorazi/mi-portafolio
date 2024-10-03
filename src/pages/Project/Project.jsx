import React from "react";
import styles from "./Project.module.css";
import Gallery from "../../components/Gallery/Gallery";
import GalleryPractice from "../../components/GalleryPractice/GalleryPractice";

const Project = ({}) => {

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
