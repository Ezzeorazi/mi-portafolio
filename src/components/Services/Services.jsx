import React from 'react';
import styles from './Services.module.css';
import ServiceCard from '../ServiceCard/ServiceCard';
import { FaReact, FaWordpress, FaDatabase } from "react-icons/fa";

const Services = () => {
  return (
    <>
      <h2 className={styles.title}>Servicios</h2>

      <div className={styles.services}>


        <ServiceCard
          title="Páginas Web con React"
          description="Desarrollo de aplicaciones web modernas y dinámicas utilizando React."
          icon={<FaReact />}
        />
        <ServiceCard
          title="Páginas Web con WordPress"
          description="Creación y personalización de sitios web con WordPress."
          icon={<FaWordpress />}
        />
        <ServiceCard
          title="Bases de Datos con Spring Boot"
          description="Implementación de bases de datos robustas y escalables con Spring Boot."
          icon={<FaDatabase />}
        />
      </div>
    </>
  );
};

export default Services;