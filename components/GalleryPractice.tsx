import ProjectCard from './ProjectCard';

const practiceProjects = [
  {
    id: 1,
    title: 'Pronóstico del Tiempo',
    description:
      'Aplicación que consume la API de OpenWeatherMap para mostrar el clima actual y pronósticos por ciudad. Consumo de APIs y renderizado dinámico.',
    image: 'pagePronostico.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'API REST'],
    liveLink: 'https://pronostico-eze.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/Pronostico.git',
  },
  {
    id: 2,
    title: 'Carrito de Compras',
    description:
      'Simulación de carrito de compras con gestión de productos, cantidades y cálculo automático del total.',
    image: 'pageCarritoDeCompras.jpg',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    liveLink: 'https://cart-by-ezequiel.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/carritoDeCompras.git',
  },
  {
    id: 3,
    title: 'Selector de Color RGB',
    description:
      'Aplicación interactiva que genera colores RGB mediante sliders con visualización en tiempo real.',
    image: 'pageInputRGB.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://input-rgb-color.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/input-rgb.git',
  },
  {
    id: 4,
    title: 'Adivina el Número',
    description:
      'Juego con React donde el usuario debe adivinar un número aleatorio. Estado, lógica condicional y feedback dinámico.',
    image: 'pageAdivinar.jpg',
    technologies: ['React', 'CSS Modules'],
    liveLink: 'https://adivinador-number.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/adivinar-numero.git',
  },
  {
    id: 5,
    title: 'Cronómetro',
    description:
      'Cronómetro funcional con opciones de iniciar, pausar y reiniciar. Manejo de timers y control de flujo.',
    image: 'pageCronometro.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://cronometro-eze.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/cronometro.git',
  },
  {
    id: 6,
    title: 'Citas Aleatorias',
    description:
      'Aplicación que muestra citas aleatorias de personajes conocidos. Manipulación de arrays y renderizado dinámico.',
    image: 'pageCitasAleatorias.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://citas-aleatorias-eze.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/citas-aleatorias.git',
  },
  {
    id: 7,
    title: 'Lista de Tareas',
    description:
      'To-do list para agregar, eliminar y marcar tareas como completadas. Base para gestión de estado.',
    image: 'pageListaDeTareas.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://Lista-De-tareas-eze.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/lista-tareas.git',
  },
  {
    id: 8,
    title: 'Trivia Friends',
    description:
      'Juego de preguntas basado en la serie Friends. React, Vite y Tailwind CSS con lógica de juego y diseño moderno.',
    image: 'friends-trivia.svg',
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    liveLink: 'https://trivia-friends.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/trivia-friends',
  },
  {
    id: 9,
    title: 'Cotizador de Divisas',
    description:
      'Conversión de pesos mexicanos a pesos argentinos y dólares. Cálculos dinámicos y experiencia de usuario clara.',
    image: 'cotizador-divisas.svg',
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    liveLink: 'https://monedas-mxn-usd-ars.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/cotizador-divisas',
  },
];

export default function GalleryPractice() {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {practiceProjects.map((p, i) => (
        <ProjectCard key={p.id} {...p} delay={i * 0.05} />
      ))}
    </div>
  );
}
