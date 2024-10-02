"use client";
import React from "react";
import styles from "./CvDownload.module.css";

const CvDownload = ({}) => {
  return (
    <div className={styles.cvDownload}>
      <a href="/pdf/Ezequiel_Orazi-CV.pdf" download="Ezequiel_Orazi-CV.pdf">
        <img
          src="Descargar.png"
          alt="Descargar CV"
          className={styles.cvImage}
        />
      </a>
      <div className={styles.animatedText}>Descargar CV</div>
    </div>
  );
};


export default CvDownload;
