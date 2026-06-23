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
    id: 12,
    featured: true,
    slug: 'riviera-maya-pass',
    title: 'RivieraMayaPass',
    description:
      'Portal local de day passes y tours en Playa del Carmen con un diferencial único: un bot publica cada día el estado del sargazo por playa usando IA, datos climáticos reales y Machine Learning — predice los próximos 3 días con ~80% de acierto, completamente automatizado.',
    image: 'images/projects/portada-rivieramayapass.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Python', 'Google Gemini', 'scikit-learn'],
    liveLink: 'https://rivieramayapass.com',
    caseStudy: {
      problem:
        'Los turistas en Riviera Maya llegan sin saber si la playa va a tener sargazo ese día. Buscan en Google, encuentran información desactualizada o genérica y toman la decisión a ciegas. Al mismo tiempo, los negocios de day passes y tours no tenían un canal digital local serio donde aparecer. La oportunidad era doble: crear el recurso de información que faltaba y monetizarlo vendiendo accesos y experiencias.',
      decisions: [
        {
          title: '¿Gemini con grounding o scraping manual?',
          description:
            'En vez de construir scrapers frágiles para cada fuente de sargazo, usé Google Gemini con búsqueda web activa: el modelo busca las fuentes del día (Red de Monitoreo de QR, noticias locales), las lee y produce el reporte. Resultado: cero mantenimiento de fuentes, sin servidor propio, actualización automática diaria vía GitHub Actions con costo operativo ≈ $0.',
        },
        {
          title: '¿Reglas manuales o Machine Learning para la predicción?',
          description:
            'La primera versión usaba heurísticas de viento. Funcionaba en el 53% de los casos — igual que adivinar. La Fase 2 entrenó un Random Forest con 3 fuentes cruzadas: semáforo verificado playa por playa, historial climático (Open-Meteo) e índice AFAI satelital. Resultado: ~80% de acierto a 3 días, con restricción de no saltar de rojo a verde de un día al otro (respeta la inercia real del sargazo).',
        },
        {
          title: '¿Next.js o solución más simple?',
          description:
            'El activo SEO principal es /sargazo, que necesita actualizarse a diario y posicionarse en Google para "sargazo playa del carmen hoy". Next.js permite que esa página sirva contenido fresco sin rebuild completo y el sitemap dinámico la marca con alta prioridad y fecha de hoy — algo que WordPress no podía hacer con ese nivel de control.',
        },
      ],
      results: [
        'Bot diario completamente automatizado: costo operativo ≈ $0 (GitHub Actions + APIs gratuitas + Gemini free tier)',
        'Modelo ML con ~80% de acierto a 3 días (vs ~53% de una regla simple basada en viento)',
        'Plataforma bilingüe (es/en) con rutas localizadas, JSON-LD y hreflang desde el día 1',
        'Panel de administración privado para verificar estado de playas sin tocar código',
        'Integración con Viator Partner API para monetizar tours de afiliado como canal adicional de ingreso',
      ],
    },
  },
  {
    id: 11,
    featured: true,
    slug: 'nacho-rodriguez',
    title: 'Nacho Rodriguez — Músico',
    description:
      'Músico que dependía del boca a boca para conseguir fechas y no tenía dónde mostrar su trabajo a quien quería contratarlo. Construí su sitio-vidriera con repertorio, videos en vivo y formulario de contratación directa — hoy convierte las visitas en shows privados, bodas y tocadas en bares, sin intermediarios ni comisiones.',
    image: 'images/projects/nacho-rodriguez-web-portada.webp',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveLink: 'https://nachorodriguezmusic.com',
  },
  {
    id: 10,
    featured: true,
    slug: 'elune',
    title: 'Elune',
    description:
      'Marca de jabones artesanales en Riviera Maya que necesitaba vender online y captar bodas de destino. Construí su tienda con catálogo, blog y captación de eventos — hoy aparece en Google para "souvenirs para bodas Playa del Carmen" y recibe pedidos sin intermediarios.',
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
      'Taller de impresión 3D en Playa del Carmen que necesitaba ser encontrado online antes que la competencia. Construí la plataforma posicionada para "impresión 3D Riviera Maya" con catálogo y formulario de presupuesto — el equipo cierra más consultas sin atender el teléfono.',
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
      'Agencia digital latinoamericana que necesitaba una web que vendiera sus servicios y generara leads. Construí su plataforma con portafolio, precios publicados y blog técnico — posicionada como referente para empresas que buscan agencia de desarrollo web.',
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
      'El sitio que estás viendo. Construido con Next.js 15 como prueba viva de capacidad técnica: 26 páginas estáticas, blog con SEO por entrada, sitemap automático y score 95+ en Lighthouse.',
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
      'CRM SaaS propio para demostrar capacidad en aplicaciones cloud complejas: autenticación, pipeline de ventas y gestión de clientes con stack MERN. Prueba de que puedo construir productos, no solo sitios.',
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
      'Una empresa de videoseguridad tardaba 20 minutos en armar cada cotización a mano. Con esta herramienta interna, el vendedor genera el presupuesto en 2 minutos, sin errores de cálculo ni depender del técnico.',
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
      'Herramienta propia para organizar y reutilizar prompts de IA — construida porque perdía tiempo reescribiendo los mismos prompts en cada sesión. Útil para cualquiera que trabaje con ChatGPT o Claude de forma profesional.',
    image: 'images/projects/portada-prompt-IA.webp',
    technologies: ['React', 'Material UI', 'Vite'],
    liveLink: 'https://prompt-generate.netlify.app/',
    repoLink: 'https://github.com/Ezzeorazi/prompt-generator-v2',
  },
  {
    id: 3,
    slug: 'golden-horses',
    title: 'Golden Horses',
    description:
      'Marca de nutrición equina premium en Argentina que necesitaba transmitir confianza a un público exigente: criadores y deportistas de carrera y polo. Construí un sitio institucional que comunica el rigor del producto y posiciona la marca como alimento de alto rendimiento — claridad comercial y presencia profesional para diferenciarse en un mercado dominado por competidores tradicionales.',
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
      'Marroquinería en Santa Fe que vendía solo de forma local y quería llegar a clientes de todo el país. Construí su tienda online con catálogo y carrito, pasando de regalos corporativos puerta a puerta a una marca que recibe pedidos sin depender del tráfico físico.',
    image: 'images/projects/maktub-desktop.svg',
    technologies: ['WordPress', 'WooCommerce', 'Elementor'],
    liveLink: 'https://maktub.misitiosimple.online/',
  },
];

export default projects;
