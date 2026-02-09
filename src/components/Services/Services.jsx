import React from "react";
import styles from "./Services.module.css";
import ServiceCard from "../ServiceCard/ServiceCard";
import { FaReact, FaWordpress, FaDatabase } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Services = () => {
  return (
    <>
      <h2 className={styles.title}>Servicios</h2>
      <div className={styles.services}>
        <ServiceCard
          title="Páginas Web con React"
          description="Desarrollo de sitios web interactivos, rápidos y modernos usando React. Creo interfaces dinámicas y modulares que se adaptan a cualquier dispositivo, optimizadas para rendimiento y SEO."
          icon={<FaReact />}
        />

        <ServiceCard
          title="Páginas Web con WordPress"
          description="Diseño y personalización de sitios autoadministrables con WordPress. Integro plugins, optimizo velocidad y creo soluciones versátiles para emprendedores y pequeñas empresas."
          icon={<FaWordpress />}
        />

        <ServiceCard
          title="Bases de Datos con MERN o SQL"
          description="Implementación de soluciones con MongoDB para proyectos MERN, y bases SQL como PostgreSQL o MySQL según las necesidades del cliente. Diseño eficiente, seguro y escalable."
          icon={<FaDatabase />}
        />

      </div>
      <div className={styles.btnReunion}>
        <a
          href="https://calendly.com/ezequiel-orazi90/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar reunión
        </a>
        <NavLink 
          to="/project"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["btn-link"]}
        >
          Ver proyectos
        </NavLink>
      </div>
    </>
  );
};

export default Services;