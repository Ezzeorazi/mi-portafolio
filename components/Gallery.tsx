import ProjectCard from './ProjectCard';

export const projects = [
  {
    id: 9,
    featured: true,
    title: 'Caliber 3D',
    description:
      'Plataforma web para emprendimiento de impresión 3D. Servicios, productos personalizados y contacto con clientes. Enfoque en performance y diseño moderno.',
    image: 'portada-caliber3d.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Strapi'],
    liveLink: 'https://caliber3d.mx',
  },
  {
    id: 2,
    featured: true,
    title: 'Pixel Maker',
    description:
      'Sitio web para un emprendimiento de diseño gráfico. Enfocado en mostrar servicios, portafolio de trabajos y contacto. Desarrollado con React y Vite, ahora migrado a NEXT, Tailwind y con base de datos en supabase. Con diseño moderno y optimizado para performance.',
    image: 'portada-pixel-maker.webp',
    technologies: ['Next.js', 'Tailwind CSS', 'Supabase'],
    liveLink: 'https://pixelmaker.com.ar',
    repoLink: 'https://github.com/Ezzeorazi/Pixel-react.git',
  },
  {
    id: 1,
    title: 'Portfolio Profesional',
    description:
      'Sitio web personal diseñado para presentar mi perfil profesional, proyectos reales y stack tecnológico. Desarrollado con Next.js y Tailwind, enfocado en rendimiento, diseño responsive, accesibilidad y SEO técnico.',
    image: 'portada-portafolio.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveLink: 'https://ezequiel-orazi.online',
    repoLink: 'https://github.com/Ezzeorazi/mi-portafolio.git',
  },
  {
    id: 7,
    title: 'Nimbus CRM',
    description:
      'Plataforma CRM con stack MERN para la gestión de clientes, ventas y procesos internos. Aplicación 100% cloud, escalable y orientada a empresas.',
    image: 'nimbus-crm.png',
    technologies: ['React', 'Tailwind', 'MongoDB', 'Express', 'Node.js'],
    liveLink: 'https://taupe-crisp-4638a8.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/CRM-Saas',
  },
  {
    id: 6,
    title: 'Generador de Presupuestos - Seguridad',
    description:
      'Herramienta web para generar presupuestos dinámicos de sistemas de vigilancia y videoseguridad. Agiliza cotizaciones comerciales con una interfaz clara.',
    image: 'presup-aura.png',
    technologies: ['React', 'Bootstrap', 'Vite'],
    liveLink: 'https://clever-peony-9c92b7.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/presup-generator',
  },
  {
    id: 5,
    featured: true,
    title: 'Creador de Prompts IA',
    description:
      'Aplicación web para crear, organizar y reutilizar prompts personalizados para herramientas de inteligencia artificial. Desarrollada con React y Material UI.',
    image: 'portada-prompt-IA.webp',
    technologies: ['React', 'Material UI', 'Vite'],
    liveLink: 'https://prompt-generate.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/prompt-generator-v2',
  },
  {
    id: 4,
    title: 'FitBites',
    description:
      'E-commerce de alimentos saludables desarrollado en WordPress con WooCommerce. Incluye catálogo de productos, carrito de compras, blog optimizado para SEO y arquitectura pensada para escalar.',
    image: 'pageFitbites.jpg',
    technologies: ['WordPress', 'WooCommerce', 'Astra'],
    liveLink: 'https://fitbitescr.com',
  },
  {
    id: 3,
    title: 'Golden Horses',
    description:
      'Sitio institucional para una marca premium de nutrición equina. Desarrollo orientado a presencia de marca, claridad comercial y posicionamiento.',
    image: 'pageGoldenHorses.jpg',
    technologies: ['React', 'Bootstrap', 'Vite'],
    liveLink: 'https://goldenhorses.com.ar',
    repoLink: 'https://github.com/Ezzeorazi/GoldenReact.git',
  },
  {
    id: 8,
    title: 'Maktub - Marroquinería',
    description:
      'Tienda online en WordPress para una marca de marroquinería. Catálogo optimizado, diseño personalizado y enfoque en identidad de marca.',
    image: 'maktub-desktop.svg',
    technologies: ['WordPress', 'WooCommerce', 'Elementor'],
    liveLink: 'https://maktub.misitiosimple.online/',
  },
];

export default function Gallery() {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} {...p} delay={i * 0.05} />
      ))}
    </div>
  );
}
