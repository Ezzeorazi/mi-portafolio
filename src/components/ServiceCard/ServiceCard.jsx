import React from "react";
import PropTypes from "prop-types";
import styles from "./ServiceCard.module.css";
import 'animate.css';
import { Link } from "react-router-dom";



const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className={`animate__animated animate__flipInX ${styles.card}`}>
      <div className={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default ServiceCard;