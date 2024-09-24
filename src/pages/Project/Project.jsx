import React, { useEffect, useState } from 'react';
import styles from './Project.module.css';
import Gallery from '../../components/Gallery/Gallery';
import Loading from '../../components/Loading/Loading';

const Project = ({ }) => {
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
    <div className={styles.project}>
      <h2>Mis Proyectos</h2>
      <Gallery />
    </div>
  );
};

export default Project;