import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ─────────────────────────────────────────────
//  POSTS DEL BLOG
// ─────────────────────────────────────────────
const posts = [
  {
    id: 1,
    titulo: 'Entendiendo las Promesas en JavaScript',
    slug: 'entendiendo-las-promesas-en-javascript',
    categoria: 'Javascript',
    fecha_publicacion: '21/10/2024',
    tiempo_lectura: '7 min',
    resumen:
      'Guía para comprender y usar promesas en JavaScript para manejar operaciones asíncronas de forma limpia y eficiente.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 2,
    titulo: 'Cómo usar Grid y Flexbox en CSS',
    slug: 'como-usar-grid-y-flexbox-en-css',
    categoria: 'CSS',
    fecha_publicacion: '21/10/2024',
    tiempo_lectura: '6 min',
    resumen:
      'Comparación práctica entre CSS Grid y Flexbox para construir layouts responsivos. Cuándo usar cada uno y por qué.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 3,
    titulo: 'Cómo mejorar el rendimiento en Next.js con imágenes optimizadas',
    slug: 'como-mejorar-el-rendimiento-en-nextjs-con-imagenes-optimizadas',
    categoria: 'Next.js',
    fecha_publicacion: '21/10/2024',
    tiempo_lectura: '5 min',
    resumen:
      'Cómo usar el componente Image de Next.js para optimizar imágenes, mejorar Core Web Vitals y acelerar la carga.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 4,
    titulo: 'Configurando un servidor Express en Node.js',
    slug: 'configurando-un-servidor-Express-en-Node',
    categoria: 'Node.js',
    fecha_publicacion: '21/10/2024',
    tiempo_lectura: '8 min',
    resumen:
      'Guía paso a paso para configurar un servidor básico con Express.js: rutas, middleware y estructura de proyecto.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 5,
    titulo: 'Introducción a los hooks de React',
    slug: 'introduccion-a-los-hooks-de-react',
    categoria: 'React',
    fecha_publicacion: '21/10/2024',
    tiempo_lectura: '6 min',
    resumen:
      'Primeros pasos con useState y useEffect: cómo manejar el estado y los efectos secundarios en componentes funcionales.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 6,
    titulo: 'Flujo de trabajo con Git: ramas y fusiones',
    slug: 'flujo-de-trabajo-con-git',
    categoria: 'Git',
    fecha_publicacion: '21/10/2024',
    tiempo_lectura: '5 min',
    resumen:
      'Cómo trabajar con ramas (branches) y realizar merges en Git para gestionar el control de versiones en equipo.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 7,
    titulo: 'Guía Completa para Aprender Desarrollo Web',
    slug: 'como-aprender-desarrollo-web',
    categoria: 'Desarrollo Web',
    fecha_publicacion: '25/10/2024',
    tiempo_lectura: '12 min',
    resumen:
      'Hoja de ruta para aprender desarrollo web: fundamentos, front-end, back-end y full stack. Por dónde empezar y qué tecnologías priorizar.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 8,
    titulo: 'Introducción a JavaScript: Todo lo que necesitas saber',
    slug: 'introduccion-a-javascript',
    categoria: 'Javascript',
    fecha_publicacion: '26/10/2024',
    tiempo_lectura: '10 min',
    resumen:
      'Qué es JavaScript, cómo funciona en el navegador y el servidor, su historia y recursos para aprenderlo desde cero.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 9,
    titulo: 'Introducción a Material UI: Diseño Moderno y Consistente',
    slug: 'introduccion-a-material-ui',
    categoria: 'Material UI',
    fecha_publicacion: '13/11/2024',
    tiempo_lectura: '10 min',
    resumen:
      'Qué es Material UI, cómo se basa en Material Design de Google y cómo usarlo para construir interfaces React consistentes.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 10,
    titulo: 'HTML: El Fundamento del Desarrollo Web',
    slug: 'html-fundamento-desarrollo-web',
    categoria: 'HTML',
    fecha_publicacion: '13/11/2024',
    tiempo_lectura: '8 min',
    resumen:
      'Historia y evolución de HTML, etiquetas clave, estructura semántica y su integración con CSS y JavaScript.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 11,
    titulo: '¿Qué es Docker?',
    slug: 'que-es-docker',
    categoria: 'Docker',
    fecha_publicacion: '17/11/2024',
    tiempo_lectura: '10 min',
    resumen:
      'Qué es Docker, cómo funcionan los contenedores, por qué simplifican el desarrollo y cómo empezar a usarlo.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 12,
    titulo: 'Dominando React Hooks Avanzados',
    slug: 'dominando-react-hooks-avanzados',
    categoria: 'React',
    fecha_publicacion: '18/03/2025',
    tiempo_lectura: '8 min',
    resumen:
      'Uso avanzado de useContext, useReducer, useMemo y useCallback para optimizar componentes y mejorar la gestión de estado.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 13,
    titulo: 'El nuevo paradigma de las apps: tecnología que no te grita',
    slug: 'el-nuevo-paradigma-de-las-apps',
    categoria: 'Diseño UX',
    fecha_publicacion: '16/04/2025',
    tiempo_lectura: '6 min',
    resumen:
      'Diseño de apps que prioriza la calma y el bienestar emocional del usuario por encima del ruido digital y las notificaciones agresivas.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 14,
    titulo: 'IA y Programación: Innovación y Oportunidades Empresariales',
    slug: 'ia-y-programacion',
    categoria: 'Inteligencia Artificial',
    fecha_publicacion: '13/07/2025',
    tiempo_lectura: '15 min',
    resumen:
      'Cómo la IA está transformando el desarrollo de software, casos de éxito y oportunidades reales para empresas que la adoptan.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 15,
    titulo: 'Machine Learning para Empresas: Transformación y Oportunidades',
    slug: 'machine-learning-para-empresas',
    categoria: 'Machine Learning',
    fecha_publicacion: '15/07/2025',
    tiempo_lectura: '18 min',
    resumen:
      'Casos de éxito, beneficios reales y desafíos del machine learning aplicado al mundo empresarial latinoamericano.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 16,
    titulo: 'Nimbus CRM SaaS: Mi Nuevo Proyecto',
    slug: 'nimbus-crm-saas-mi-nuevo-proyecto',
    categoria: 'Proyectos',
    fecha_publicacion: '19/07/2025',
    tiempo_lectura: '5 min',
    resumen:
      'Presentación de Nimbus CRM, plataforma SaaS en la nube para gestión de clientes, desarrollada como proyecto propio.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 17,
    titulo: 'Claude de Anthropic: Cómo Aprovecharlo al Máximo — Parte 1',
    slug: 'claude-ia-guia-prompts-profesionales',
    categoria: 'Inteligencia Artificial',
    fecha_publicacion: '27/04/2026',
    tiempo_lectura: '15 min',
    resumen:
      'Guía práctica de prompts para Claude: los 5 pilares de un prompt efectivo y casos de uso para RRHH, administración, programación y Scrum Masters.',
    links_internos: '—',
    links_externos: '—',
    tiene_links: 'No',
  },
  {
    id: 18,
    titulo: '¿Necesitás una página web para tu negocio? Guía para Latinoamérica 2026',
    slug: 'pagina-web-para-tu-negocio-latinoamerica-2026',
    categoria: 'Servicios Web',
    fecha_publicacion: '04/05/2026',
    tiempo_lectura: '14 min',
    resumen:
      'Cuándo crear o renovar una web, qué tipo elegir (landing, dinámica, e-commerce) y cómo evitar los errores más comunes para negocios en LATAM.',
    links_internos: '/services | /contacto',
    links_externos: 'https://calendly.com/ezequiel-orazi90/30min',
    tiene_links: 'Sí',
  },
  {
    id: 19,
    titulo: '¿Cuánto cuesta una página web en México en 2026?',
    slug: 'precio-pagina-web-mexico-2026',
    categoria: 'Servicios Web',
    fecha_publicacion: '08/05/2026',
    tiempo_lectura: '12 min',
    resumen:
      'Precios reales de páginas web en México (MXN y USD) por tipo de proyecto. Caso real Caliber 3D: primer cliente en una semana por SEO orgánico.',
    links_internos: '/services | /contacto',
    links_externos: 'https://caliber3d.mx | https://calendly.com/ezequiel-orazi90/30min',
    tiene_links: 'Sí',
  },
  {
    id: 20,
    titulo: 'Claude de Anthropic: Marketing, SEO y Diseño con IA — Parte 2',
    slug: 'claude-ia-guia-prompts-marketing-seo-diseno-parte-2',
    categoria: 'Inteligencia Artificial',
    fecha_publicacion: '13/05/2026',
    tiempo_lectura: '16 min',
    resumen:
      'Prompts avanzados para marketing, investigación de mercado, SEO, diseño web y branding con Claude AI. Incluye la alianza Anthropic–SpaceX.',
    links_internos: '/blog/claude-ia-guia-prompts-profesionales',
    links_externos: '—',
    tiene_links: 'Sí',
  },
  {
    id: 21,
    titulo: 'Caliber 3D: de taller sin web a plataforma con comunidad maker',
    slug: 'caliber3d-plataforma-impresion-3d-mexico',
    categoria: 'Proyectos',
    fecha_publicacion: '18/05/2026',
    tiempo_lectura: '8 min',
    resumen:
      'Caso de estudio: cómo construí la plataforma Caliber 3D con calculadora de costos, Espacio Makers, blog SEO y sistema de login para el taller de impresión 3D de Playa del Carmen.',
    links_internos: '/contacto',
    links_externos: 'https://caliber3d.mx',
    tiene_links: 'Sí',
  },
  {
    id: 22,
    titulo: 'Next.js vs WordPress: ¿cuál elegir para tu negocio en 2026?',
    slug: 'nextjs-vs-wordpress-cual-elegir-negocio-2026',
    categoria: 'Servicios Web',
    fecha_publicacion: '21/05/2026',
    tiempo_lectura: '10 min',
    resumen:
      'Comparativa honesta entre Next.js y WordPress: performance, SEO, escalabilidad, PWA y cuándo tiene sentido cada tecnología para un negocio real.',
    links_internos:
      '/blog/pagina-web-para-tu-negocio-latinoamerica-2026 | /blog/precio-pagina-web-mexico-2026 | /blog/el-nuevo-paradigma-de-las-apps | /blog/caliber3d-plataforma-impresion-3d-mexico | /blog/nimbus-crm-saas-mi-nuevo-proyecto | /contacto',
    links_externos: '—',
    tiene_links: 'Sí',
  },
];

// ─────────────────────────────────────────────
//  SERVICIOS
// ─────────────────────────────────────────────
const services = [
  {
    id: 'landing',
    nombre: 'Web Institucional / Landing Page',
    precio: '$180 USD',
    badge: 'Ideal para empezar',
    descripcion:
      'Carta de presentación digital. Ideal para profesionales, estudios o comercios que necesitan mostrar quiénes son y qué ofrecen de manera clara y profesional.',
    publico_objetivo: 'Profesionales independientes, estudios, clínicas, restaurantes, gimnasios',
    tecnologia: 'Next.js + TypeScript + Tailwind CSS',
    features_incluidas:
      'Diseño responsive | Secciones: Inicio, Sobre, Servicios y Contacto | Botón WhatsApp | SEO básico | Formulario de contacto | Lighthouse 90+',
    nota: '—',
    cta: 'Quiero mi landing page',
    url_cta: '/contacto?servicio=Web+Institucional+%2F+Landing+Page',
    mantenimiento: '$45 USD/mes',
    estado: 'Activo',
  },
  {
    id: 'dinamica',
    nombre: 'Web Dinámica + Gestión de Datos',
    precio: '$490 USD',
    badge: 'Para negocios en crecimiento',
    descripcion:
      'Panel de control para administrar contenido sin saber programar. Ideal para negocios que necesitan catálogos, registros de usuarios o contenido actualizable.',
    publico_objetivo: 'Distribuidoras, agencias inmobiliarias, escuelas, negocios con catálogo',
    tecnologia: 'Next.js + TypeScript + Sanity CMS (o Strapi) + PostgreSQL',
    features_incluidas:
      'Panel CMS visual | Base de datos en la nube | Catálogo con galería y categorías | Secciones privadas con login | SEO avanzado por categoría | Integración con APIs externas',
    nota: 'No incluye sistema de pago ni carrito de compras.',
    cta: 'Quiero mi web dinámica',
    url_cta: '/contacto?servicio=Web+Din%C3%A1mica+%2B+Gesti%C3%B3n+de+Datos',
    mantenimiento: '$45 USD/mes',
    estado: 'Activo',
  },
  {
    id: 'ecommerce',
    nombre: 'E-commerce / Tienda Online',
    precio: '$890 USD',
    badge: 'Para vender sin límites',
    descripcion:
      'Local abierto las 24 horas. Flujo completo de compra: el cliente elige, paga y el dueño solo despacha el pedido.',
    publico_objetivo: 'Negocios con productos físicos o digitales que quieren vender online',
    tecnologia: 'Next.js + TypeScript + Sanity CMS + Pasarela de pagos',
    features_incluidas:
      'Carrito de compras | Integración Mercado Pago / PayPal / Stripe | Control de stock automático | Panel de pedidos | SEO transaccional | Ficha de producto con galería y variantes',
    nota: '—',
    cta: 'Quiero mi tienda online',
    url_cta: '/contacto?servicio=E-commerce+%2F+Tienda+Online',
    mantenimiento: '$45 USD/mes',
    estado: 'Activo',
  },
  {
    id: 'seo',
    nombre: 'SEO con IA — Posicionamiento en Google y en IA',
    precio: '$150 USD',
    badge: 'Nuevo · Con Claude AI',
    descripcion:
      'Aparecer antes que la competencia en Google, ChatGPT, Perplexity y Gemini. Auditoría completa + optimización técnica y de contenido con Claude AI.',
    publico_objetivo: 'Cualquier negocio con sitio web que quiera mejorar su posicionamiento orgánico',
    tecnologia: 'Claude AI + Google Search Console + Schema.org + Structured Data',
    features_incluidas:
      'Auditoría SEO técnica y de contenido | Investigación de keywords con IA | AEO (Answer Engine Optimization) | Schema Markup y Rich Snippets | Metadatos y H1-H6 optimizados | Reporte de posicionamiento',
    nota: 'Plan de seguimiento mensual: $90 USD/mes. Compatible con cualquier sitio web existente.',
    cta: 'Quiero aparecer primero',
    url_cta: '/contacto?servicio=SEO+con+IA',
    mantenimiento: '$90 USD/mes (plan SEO)',
    estado: 'Activo',
  },
  {
    id: 'medida',
    nombre: 'Sistemas a Medida',
    precio: 'A consultar',
    badge: 'Proyecto personalizado',
    descripcion:
      'Software personalizado para resolver el problema específico de un negocio. Reunión gratuita previa para entender procesos y diseñar el sistema exacto que se necesita.',
    publico_objetivo: 'Empresas con procesos complejos: bares, CRMs, producción, RRHH, turnos, inventarios, delivery',
    tecnologia: 'Next.js + Node.js + PostgreSQL / React + Spring Boot + MySQL',
    features_incluidas:
      'Reunión inicial gratuita | Definición del modelo del sistema | Desarrollo iterativo con entregables por etapa | Panel de administración intuitivo | Módulos: usuarios, roles, reportes, exportación | Soporte post-lanzamiento',
    nota: 'Ejemplos: sistema para bares/restós, CRM propio, producción, RRHH, presupuestador, turnos, inventario, delivery.',
    cta: 'Agendar reunión gratuita',
    url_cta: 'https://calendly.com/ezequiel-orazi90/30min',
    mantenimiento: 'A consultar según el proyecto',
    estado: 'Activo',
  },
];

// ─────────────────────────────────────────────
//  CREAR WORKBOOK
// ─────────────────────────────────────────────
const wb = XLSX.utils.book_new();

// ── Hoja 1: Posts del Blog ──────────────────
const postsHeaders = [
  'ID',
  'Título',
  'Slug',
  'Categoría',
  'Fecha de publicación',
  'Tiempo de lectura',
  'Resumen',
  'Links internos',
  'Links externos',
  'Tiene links',
];

const postsRows = posts.map((p) => [
  p.id,
  p.titulo,
  p.slug,
  p.categoria,
  p.fecha_publicacion,
  p.tiempo_lectura,
  p.resumen,
  p.links_internos,
  p.links_externos,
  p.tiene_links,
]);

const wsPosts = XLSX.utils.aoa_to_sheet([postsHeaders, ...postsRows]);

// Anchos de columna
wsPosts['!cols'] = [
  { wch: 5 },   // ID
  { wch: 52 },  // Título
  { wch: 52 },  // Slug
  { wch: 22 },  // Categoría
  { wch: 22 },  // Fecha
  { wch: 16 },  // Tiempo
  { wch: 80 },  // Resumen
  { wch: 75 },  // Links internos
  { wch: 60 },  // Links externos
  { wch: 12 },  // Tiene links
];

XLSX.utils.book_append_sheet(wb, wsPosts, 'Posts del Blog');

// ── Hoja 2: Servicios ───────────────────────
const servicesHeaders = [
  'ID',
  'Nombre del servicio',
  'Precio',
  'Badge / Etiqueta',
  'Descripción',
  'Público objetivo',
  'Tecnología',
  'Features incluidas',
  'Nota / Condiciones',
  'CTA (botón)',
  'URL del CTA',
  'Mantenimiento mensual',
  'Estado',
];

const servicesRows = services.map((s) => [
  s.id,
  s.nombre,
  s.precio,
  s.badge,
  s.descripcion,
  s.publico_objetivo,
  s.tecnologia,
  s.features_incluidas,
  s.nota,
  s.cta,
  s.url_cta,
  s.mantenimiento,
  s.estado,
]);

const wsServices = XLSX.utils.aoa_to_sheet([servicesHeaders, ...servicesRows]);

wsServices['!cols'] = [
  { wch: 10 },  // ID
  { wch: 40 },  // Nombre
  { wch: 14 },  // Precio
  { wch: 24 },  // Badge
  { wch: 70 },  // Descripción
  { wch: 55 },  // Público objetivo
  { wch: 55 },  // Tecnología
  { wch: 90 },  // Features
  { wch: 70 },  // Nota
  { wch: 30 },  // CTA
  { wch: 55 },  // URL CTA
  { wch: 26 },  // Mantenimiento
  { wch: 10 },  // Estado
];

XLSX.utils.book_append_sheet(wb, wsServices, 'Servicios');

// ── Escribir archivo ────────────────────────
const outPath = path.join(ROOT, 'portafolio-data.xlsx');
XLSX.writeFile(wb, outPath);
console.log(`✅ Excel generado en: ${outPath}`);
