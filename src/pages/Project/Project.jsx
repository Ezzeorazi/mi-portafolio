import React from "react";
import styles from "./Project.module.css";
import Gallery from "../../components/Gallery/Gallery";
import GalleryPractice from "../../components/GalleryPractice/GalleryPractice";
import useTranslation from "../../hooks/useTranslation";

const Project = ({}) => {
  const { t } = useTranslation();

  return (
    <div className={`animate_animated animate__fadeIn ${styles.project}`}>
      <h2 className={`animate__animated animate__slideInLeft`}>
        {t('projects_sites')}
      </h2>
      <Gallery />
      <h2 className={`animate__animated animate__slideInLeft`}>
        {t('projects_practice')}
      </h2>
      <GalleryPractice />
    </div>
  );
};

export default Project;
