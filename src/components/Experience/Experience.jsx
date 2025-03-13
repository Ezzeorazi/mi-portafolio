"use client";
import React from "react";
import styles from "./Experience.module.css";
import 'animate.css';


const Experience = ({}) => {
  const experiences = [
    {
      id: 1,
      company: "Pixel Maker",
      role: "Desarrollador de sitios web",
      startDate: "Septiembre 2023",
      endDate: "Agosto 2024",
      description:
        "Gestiono y ejecuto proyectos web end-to-end, desde la conceptualización hasta el despliegue, asegurando sitios a medida y optimizados para SEO. Creo diseños web y gráficos que son tanto estéticamente atractivos como funcionalmente robustos, elevando la presencia online de nuestros clientes. Desarrollo soluciones web personalizadas utilizando HTML, CSS y JavaScript, y administro hosting y dominios para garantizar infraestructuras web fiables.",
      technologies: ["HTML", "CSS", "JavaScript", "SEO"],
    },
    {
      id: 2,
      company: "Desafío Latam",
      role: "Desarrollador Front-end",
      startDate: "Mayo 2023",
      endDate: "Julio 2024",
      description:
        "Desarrollo la interfaz de usuario de 'devsafio.com' utilizando Next.js y Tailwind CSS, con un enfoque en una UX interactiva y de alto rendimiento. Mejoro la interactividad del usuario en el proyecto existente 'SQL Interactivo' de Desafío Latam, implementando funcionalidades con JavaScript avanzado. Facilito la colaboración en equipo mediante el uso eficaz de Figma para diseño, Jira para la gestión de tareas y Discord para la comunicación.",
      technologies: [
        "Next.js",
        "Tailwind CSS",
        "JavaScript",
        "Figma",
        "Jira",
        "Discord",
      ],
    },
    {
      id: 3,
      company: "Division Profesional Centro SA",
      role: "Especialista administrativo",
      startDate: "Octubre 2020",
      endDate: "Septiembre 2023",
      description:
        "Desarrollé y mantuve relaciones sólidas con clientes comprendiendo sus necesidades y proporcionando asesoramiento personalizado para lograr los resultados deseados. Utilicé habilidades de comunicación efectiva para explicar características técnicas y beneficios de los productos a clientes con diferentes niveles de conocimiento. Demostré habilidades de resolución de problemas al identificar y solucionar los desafíos relacionados con la elección de colores y técnicas de aplicación para obtener resultados óptimos. Trabajé en colaboración con un equipo diverso, incluidos pintores, contratistas y proveedores, para asegurar una entrega y servicio eficientes a los clientes.",
      technologies: ["vtex", "wordpress", "excel", "word", "powerpoint", "outlook", "Meridiano Soft"],
    },
    {
      id: 4,
      company: "Leiten SRL",
      role: "Jefe de taller",
      startDate: "Mayo 2015",
      endDate: "Septiembre 2020",
      description:
        "Como jefe de taller en una constructora, lideré equipos de trabajo para proyectos de reparación de maquinaria pesada, donde implementé tecnologías y soluciones innovadoras para mejorar la eficiencia y la calidad de los resultados. Utilicé herramientas digitales y de gestión de proyectos para planificar y monitorear el progreso de los proyectos, asegurando una ejecución eficiente y dentro de los plazos establecidos. Fomenté la colaboración entre los equipos de construcción y tecnología, trabajando estrechamente con profesionales de IT para implementar soluciones técnicas y optimizar los procesos internos. Desarrollé y mantuve una cultura de aprendizaje continuo, alentando a los miembros del equipo a adquirir habilidades técnicas relevantes.",
      technologies: ["Tango Gestión", "Excel", "Word", "PowerPoint", "Outlook", "PLC"],
    },
    {id: 5,
      company: "Watchman",
      role: "Guardia de seguridad",
      startDate: "Noviembre 2024",
      endDate: "Actualidad",
      description:
        "Como guardia de seguridad en Watchman, estoy comprometido con la protección y vigilancia de instalaciones y personas. Utilizo mis habilidades en ciberseguridad para monitorear y responder a posibles amenazas, asegurando la integridad de los sistemas y la información. Manejo sistemas de cámaras de seguridad para la vigilancia continua, y empleo herramientas como Excel para el registro y análisis de datos relevantes. Mi enfoque se centra en mantener un ambiente seguro y protegido, aplicando conocimientos técnicos y atención al detalle.",
      technologies: ["Excel","Ciberseguridad","Camaras de seguridad"],
    }
  ];

  return (
    <>
      <h2 className={`animate__animated animate__slideInLeft`}>Experiencia Laboral</h2>
      <div className={styles.experienceSection}>
      {experiences.map((experience) => (
        <div key={experience.id} 
        className={`animate__animated animate__flipInX ${styles.experienceCard}`}>
          <h3>
            {experience.role} en {experience.company}
          </h3>
          <p>
            {experience.startDate} - {experience.endDate}
          </p>
          <p>{experience.description}</p>
          <p>
            <strong>Tecnologías utilizadas:</strong>{" "}
            {experience.technologies.join(", ")}
          </p>
        </div>
      ))}
      </div>
    </>
  );
};

export default Experience;
