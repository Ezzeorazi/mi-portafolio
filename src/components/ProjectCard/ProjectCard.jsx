import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ title, description, image, technologies, liveLink, repoLink }) => {
	return (
	  <div className={styles.card}>
		<img src={image} alt={title} className={styles.image} />
		<h3>{title}</h3>
		<p>{description}</p>
		<p><strong>Tecnologías: </strong>{technologies.join(", ")}</p>
		<div className={styles.links}>
		  <a href={liveLink} target="_blank" rel="noopener noreferrer">Ver Proyecto</a>
		  <a href={repoLink} target="_blank" rel="noopener noreferrer">Ver Código</a>
		</div>
	  </div>
	);
  };


export default ProjectCard;