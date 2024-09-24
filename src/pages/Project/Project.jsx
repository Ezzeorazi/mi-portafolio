import React from 'react';
import styles from './Project.module.css';
import Gallery from '../../components/Gallery/Gallery';

const Project = ({ }) => {

  return (
    <div className={styles.project}>
      <h2>Mis Proyectos</h2>
      <Gallery />
    </div>
  );
};

export default Project;