import React from "react";
import styles from "./GalleryPractice.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";

const GalleryPractice = () => {
  const proyectos = [
    {
      id: 1,
      title: "Pronóstico del Tiempo",
      description:
        "Aplicación web que consume la API de OpenWeatherMap para mostrar el clima actual y pronósticos por ciudad. Proyecto enfocado en consumo de APIs, manejo de datos y renderizado dinámico.",
      image: "pagePronostico.jpg",
      technologies: ["HTML", "CSS", "JavaScript", "API REST"],
      liveLink: "https://pronostico-eze.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/Pronostico.git",
    },
    {
      id: 2,
      title: "Carrito de Compras",
      description:
        "Simulación de carrito de compras con gestión de productos, cantidades y cálculo automático del total. Proyecto orientado a lógica de negocio básica y manipulación del DOM.",
      image: "pageCarritoDeCompras.jpg",
      technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
      liveLink: "https://cart-by-ezequiel.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/carritoDeCompras.git",
    },
    {
      id: 3,
      title: "Selector de Color RGB",
      description:
        "Aplicación interactiva que permite generar colores RGB mediante sliders y visualizar el resultado en tiempo real. Proyecto enfocado en eventos, estados y feedback visual.",
      image: "pageInputRGB.jpg",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://input-rgb-color.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/input-rgb.git",
    },
    {
      id: 4,
      title: "Adivina el Número",
      description:
        "Juego desarrollado con React donde el usuario debe adivinar un número aleatorio. Implementa estado, lógica condicional y feedback dinámico.",
      image: "pageAdivinar.jpg",
      technologies: ["React", "CSS Modules"],
      liveLink: "https://adivinador-number.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/adivinar-numero.git",
    },
    {
      id: 5,
      title: "Cronómetro",
      description:
        "Cronómetro funcional con opciones de iniciar, pausar y reiniciar. Proyecto enfocado en manejo de timers y control del flujo de ejecución.",
      image: "pageCronometro.jpg",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://cronometro-eze.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/cronometro.git",
    },
    {
      id: 6,
      title: "Citas Aleatorias",
      description:
        "Aplicación que muestra citas aleatorias de personajes conocidos. Proyecto centrado en manipulación de arrays, lógica aleatoria y renderizado dinámico.",
      image: "pageCitasAleatorias.jpg",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://citas-aleatorias-eze.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/citas-aleatorias.git",
    },
    {
      id: 7,
      title: "Lista de Tareas",
      description:
        "To-do list que permite agregar, eliminar y marcar tareas como completadas. Proyecto base para entender gestión de estado y persistencia lógica.",
      image: "pageListaDeTareas.jpg",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveLink: "https://Lista-De-tareas-eze.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/lista-tareas.git",
    },
    {
      id: 8,
      title: "Trivia Friends",
      description:
        "Juego de preguntas y respuestas basado en la serie Friends. Desarrollado con React, Vite y Tailwind CSS, enfocado en estado, lógica de juego y diseño moderno.",
      image: "friends-trivia.svg",
      technologies: ["React", "Vite", "Tailwind CSS"],
      liveLink: "https://trivia-friends.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/trivia-friends",
    },
    {
      id: 9,
      title: "Cotizador de Divisas",
      description:
        "Aplicación para convertir pesos mexicanos a pesos argentinos y dólares estadounidenses. Desarrollada con React, Vite y Tailwind CSS, enfocada en cálculos dinámicos y experiencia de usuario clara.",
      image: "cotizador-divisas.svg",
      technologies: ["React", "Vite", "Tailwind CSS"],
      liveLink: "https://monedas-mxn-usd-ars.netlify.app/",
      repoLink: "https://github.com/Ezzeorazi/cotizador-divisas",
    },
  ];

  return (
    <div className={styles.galleryPractice}>
      {proyectos.map((proyecto) => (
        <ProjectCard key={proyecto.id} {...proyecto} />
      ))}
    </div>
  );
};

export default GalleryPractice;