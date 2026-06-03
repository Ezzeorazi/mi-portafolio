export type CaseStudy = {
  problem: string;
  decisions: { title: string; description: string }[];
  results: string[];
  cta?: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  featured?: boolean;
  privateDemo?: boolean;
  caseStudy?: CaseStudy;
};

const projects: Project[] = [
  {
    id: 10,
    featured: true,
    slug: 'elune',
    title: 'Elune',
    description:
      'Para una emprendedora de jabones artesanales sin presencia digital, construí su tienda online completa con catálogo, blog e integración con Instagram. Ahora actualiza productos sin ayuda técnica y recibe pedidos directamente desde redes sociales.',
    image: 'images/projects/portada-elune.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    liveLink: 'https://madebyelune.com',
  },
  {
    id: 9,
    featured: true,
    slug: 'caliber-3d',
    title: 'Caliber 3D',
    description:
      'Para un emprendimiento de impresión 3D que necesitaba profesionalizar su imagen online, diseñé una plataforma que convierte visitas en consultas. El dueño gestiona su catálogo de servicios de forma autónoma.',
    image: 'images/projects/portada-caliber3d.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Strapi'],
    liveLink: 'https://caliber3d.mx',
  },
  {
    id: 2,
    featured: true,
    slug: 'pixel-maker',
    title: 'Pixel Maker',
    description:
      'Para un estudio de diseño gráfico que mostraba sus trabajos en carpetas compartidas, construí un portafolio profesional con galería y panel de administración. El equipo actualiza su catálogo sin depender de un dev.',
    image: 'images/projects/portada-pixel-maker.webp',
    technologies: ['Next.js', 'Tailwind CSS', 'Supabase'],
    liveLink: 'https://pixelmaker.com.ar',
    repoLink: 'https://github.com/Ezzeorazi/Pixel-react.git',
  },
  {
    id: 1,
    slug: 'portfolio',
    title: 'Portfolio Profesional',
    description:
      'Sitio personal construido como prueba de capacidad técnica: SSG con Next.js 15, blog con SEO por entrada, 26 páginas estáticas y score de performance 95+ en Lighthouse.',
    image: 'images/projects/portada-portafolio.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveLink: 'https://ezequiel-orazi.online',
    repoLink: 'https://github.com/Ezzeorazi/mi-portafolio.git',
  },
  {
    id: 7,
    slug: 'nimbus-crm',
    title: 'Nimbus CRM',
    description:
      'CRM SaaS desarrollado para demostrar capacidad en aplicaciones cloud complejas: gestión de clientes, pipeline de ventas y autenticación con stack MERN completo.',
    image: 'images/projects/nimbus-crm.webp',
    technologies: ['React', 'Tailwind', 'MongoDB', 'Express', 'Node.js'],
    privateDemo: true,
    repoLink: 'https://github.com/Ezzeorazi/CRM-Saas',
  },
  {
    id: 6,
    slug: 'generador-presupuestos',
    title: 'Generador de Presupuestos — Seguridad',
    description:
      'Herramienta que reduce el tiempo de cotización de sistemas de videoseguridad de 20 min a 2 min — el vendedor arma el presupuesto en el momento, sin errores de cálculo.',
    image: 'images/projects/presup-aura.webp',
    technologies: ['React', 'Bootstrap', 'Vite'],
    privateDemo: true,
    repoLink: 'https://github.com/Ezzeorazi/presup-generator',
  },
  {
    id: 5,
    featured: true,
    slug: 'creador-prompts-ia',
    title: 'Creador de Prompts IA',
    description:
      'App para crear y reutilizar prompts personalizados de IA — construida para resolver mi propio problema: perdía tiempo reescribiendo los mismos prompts en cada sesión.',
    image: 'images/projects/portada-prompt-IA.webp',
    technologies: ['React', 'Material UI', 'Vite'],
    liveLink: 'https://prompt-generate.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/prompt-generator-v2',
  },
  {
    id: 4,
    slug: 'fitbites',
    title: 'FitBites',
    description:
      'E-commerce de alimentos saludables donde el equipo actualiza productos y publica en el blog sin conocimiento técnico. Tienda activa con tráfico orgánico creciente desde 2024.',
    image: 'images/projects/pageFitbites.webp',
    technologies: ['WordPress', 'WooCommerce', 'Astra'],
    liveLink: 'https://fitbitescr.com',
  },
  {
    id: 3,
    slug: 'golden-horses',
    title: 'Golden Horses',
    description:
      'Sitio institucional para una marca premium de nutrición equina que necesitaba posicionarse online. Resultado: presencia digital profesional que respalda su posicionamiento de marca.',
    image: 'images/projects/pageGoldenHorses.webp',
    technologies: ['React', 'Bootstrap', 'Vite'],
    liveLink: 'https://goldenhorses.com.ar',
    repoLink: 'https://github.com/Ezzeorazi/GoldenReact.git',
  },
  {
    id: 8,
    slug: 'maktub',
    title: 'Maktub — Marroquinería',
    description:
      'Tienda online para una marca de marroquinería artesanal que vendía exclusivamente por Instagram. Resultado: catálogo digital propio con identidad de marca consistente.',
    image: 'images/projects/maktub-desktop.svg',
    technologies: ['WordPress', 'WooCommerce', 'Elementor'],
    liveLink: 'https://maktub.misitiosimple.online/',
  },
];

export default projects;
