export type Language = 'es' | 'en';

const translations: Record<Language, Record<string, string>> = {
  es: {
    // NAV
    nav_home: 'Inicio',
    nav_about: 'Sobre mí',
    nav_skills: 'Skills',
    nav_projects: 'Proyectos',
    nav_cv: 'Currículum',
    nav_services: 'Servicios',
    nav_blog: 'Blog',
    nav_contact: 'Contacto',
    toggle_lang: 'EN',

    // HOME
    home_hero_greeting: 'Hola, soy',
    home_hero_role: 'Desarrollador Fullstack',
    home_hero_desc:
      'Aplicaciones web modernas, escalables y optimizadas para negocios. React, Next.js, Spring Boot y WordPress.',
    home_cta_projects: 'Ver proyectos',
    home_cta_contact: 'Contactarme',
    home_featured_heading: 'Proyectos actuales',
    home_see_all: 'Ver todos →',
    home_blog_heading: 'Últimos posts del blog',

    // ABOUT
    about_title: 'Sobre mí',
    about_bio:
      'Soy desarrollador fullstack con experiencia en la creación de aplicaciones web robustas y orientadas a negocio. Trabajo con tecnologías como React, Node.js, Spring Boot y WordPress, desarrollando soluciones reales para empresas y emprendedores. Cuento con más de ocho años de experiencia previa en entornos técnicos, lo que me permite abordar los proyectos con una visión profesional, organizada y enfocada en resultados. Trabajo con metodologías ágiles, priorizando calidad, rendimiento y experiencia de usuario. Además del desarrollo, integro diseño, contenido y SEO para entregar productos digitales completos y listos para escalar.',
    about_life_title: 'Un volantazo a la vida',
    about_life_p1:
      'Hace un tiempo tomé la decisión de dejar Rosario y apostar por algo nuevo: emigrar a Playa del Carmen, Quintana Roo. Un cambio radical que trajo no solo un nuevo paisaje, sino también un nuevo proyecto de vida.',
    about_life_p2a: 'Fue acá donde nació',
    about_life_p2b:
      ', un emprendimiento de impresión 3D que hoy es mi proyecto principal. Diseñamos y fabricamos piezas personalizadas para distintos rubros: industria, decoración, prototipos y más. Cada pieza es un problema resuelto.',
    about_life_p3:
      'Combinar el desarrollo web con el mundo físico de la fabricación 3D me da una visión distinta: entiendo tanto el producto digital como el proceso detrás de un negocio real. Caliber 3D no es solo una empresa, es la prueba de que apostar por uno mismo funciona.',
    about_card_skills_desc: 'Tecnologías que domino',
    about_card_projects_desc: 'Mi trabajo real',
    about_card_cv_desc: 'Experiencia y formación',
    about_card_blog_desc: 'Artículos técnicos',

    // SKILLS
    skills_title: 'Habilidades Técnicas',
    skills_certifications: 'Logros y Certificaciones',

    // CURRICULUM
    curriculum_title: 'Currículum',

    // EXPERIENCE
    exp_heading: 'Experiencia Laboral',
    exp_present: 'Actualidad',

    // EDUCATION
    edu_heading: 'Educación',
    edu_in_progress: 'En curso',

    // PROJECTS
    proyectos_title: 'Mis sitios web',
    proyectos_desc: 'Proyectos reales desarrollados para clientes y emprendimientos propios.',
    proyectos_practice_title: 'Proyectos de práctica',
    proyectos_practice_desc:
      'Aplicaciones construidas para explorar tecnologías y afianzar conceptos.',

    // SERVICES component (home)
    services_heading: 'Servicios',
    services_tagline: 'Soluciones web reales, con tecnología moderna y precios claros.',
    services_see_all: 'Ver todos los servicios',
    services_book_free: 'Agendar reunión gratis',
    services_details: 'Ver detalles →',

    // SERVICES page
    services_page_title: 'Servicios de Desarrollo Web',
    services_page_desc:
      'Sitios web construidos con tecnología moderna — Next.js, TypeScript y Tailwind CSS —, con foco en velocidad, SEO y que tus clientes te encuentren fácilmente en Google.',
    services_includes: 'Qué incluye',
    services_maintenance_title: 'Soporte y Mantenimiento Mensual',
    services_maintenance_desc:
      'Tu plataforma digital necesita supervisión continua para mantener su rendimiento y seguridad.',
    services_maintenance_f1: 'Monitoreo de seguridad: prevención de vulnerabilidades',
    services_maintenance_f2: '3 modificaciones mensuales (textos, fotos, ajustes menores)',
    services_maintenance_f3: 'Actualización técnica de librerías y dependencias',
    services_maintenance_per_month: 'por mes',
    services_info_title: 'Información importante',
    services_info_domain_label: 'Dominio y Hosting:',
    services_info_domain_text:
      'Se abonan directamente al proveedor. Un dominio .com ronda los $10–$15 USD anuales.',
    services_info_db_label: 'Base de Datos / Nube:',
    services_info_db_text:
      'El almacenamiento para sitios dinámicos se abona aparte al proveedor y varía según tráfico y datos.',
    services_info_payment_label: 'Métodos de pago:',
    services_info_payment_text:
      'Los valores están expresados en Dólares Estadounidenses (USD). Se aceptan pagos a través de Payoneer, o mediante transferencia bancaria en Pesos Mexicanos (MXN) al tipo de cambio oficial del día de pago.',
    services_info_validity_label: 'Validez:',
    services_info_validity_text:
      'Los precios publicados corresponden a Mayo 2026. Consultá para proyectos a largo plazo.',
    services_final_title: '¿Tenés un proyecto en mente?',
    services_final_desc:
      'Coordinamos una reunión de 30 minutos sin cargo para entender qué necesitás y cómo puedo ayudarte.',
    services_final_book: 'Agendar reunión gratis',
    services_final_write: 'Escribirme',

    // SISTEMAS A MEDIDA
    svc_medida_badge: 'Proyecto personalizado',
    svc_medida_note:
      '* El alcance y precio final se definen en la reunión inicial de análisis sin costo.',
    svc_medida_cta: 'Agendar reunión de análisis',
    svc_medida_examples_title: 'Tipos de sistemas que podemos construir',
    svc_medida_examples_subtitle:
      'Cada sistema es único y se diseña desde cero para tu negocio. Esto es solo una muestra de lo que es posible.',
    svc_medida_example_bar_name: 'Bar / Restaurante',
    svc_medida_example_bar_desc:
      'Mesas, carta digital QR, pedidos en tiempo real y cuentas separadas',
    svc_medida_example_crm_name: 'CRM de Ventas',
    svc_medida_example_crm_desc:
      'Pipeline de clientes, seguimientos, historial y métricas de conversión',
    svc_medida_example_prod_name: 'Gestión de Producción',
    svc_medida_example_prod_desc:
      'Órdenes de trabajo, stock de insumos, trazabilidad y control de calidad',
    svc_medida_example_rrhh_name: 'RRHH Completo',
    svc_medida_example_rrhh_desc:
      'Empleados, asistencias, liquidación de sueldos y documentación digital',
    svc_medida_example_presup_name: 'Generador de Presupuestos',
    svc_medida_example_presup_desc:
      'Para freelancers: creá, enviá y gestioná presupuestos con PDF y link de aceptación',
    svc_medida_example_turnos_name: 'Turnos y Reservas',
    svc_medida_example_turnos_desc:
      'Agenda online para clínicas, profesionales y servicios con recordatorios automáticos',
    svc_medida_example_inv_name: 'Inventario y Stock',
    svc_medida_example_inv_desc:
      'Control de stock, alertas de reposición, movimientos y gestión de proveedores',
    svc_medida_example_delivery_name: 'Delivery / Logística',
    svc_medida_example_delivery_desc:
      'Pedidos, asignación de repartidores, seguimiento en tiempo real e historial de entregas',
    svc_medida_nimbus_badge: 'Ejemplo real en producción',
    svc_medida_nimbus_title: '¿Querés ver cómo queda un sistema real?',
    svc_medida_nimbus_desc:
      'Nimbus CRM es un sistema de gestión de clientes y ventas que desarrollé. Tiene panel de administración, pipeline visual, historial de interacciones y reportes. Exploralo para ver el nivel de producto que construimos juntos.',
    svc_medida_nimbus_cta: 'Explorar Nimbus CRM',

    // CONTACT
    contact_title: 'Contacto',
    contact_name: 'Nombre',
    contact_email: 'Email',
    contact_phone: 'Teléfono',
    contact_city: 'Ciudad de Residencia',
    contact_message: 'Mensaje',
    contact_send: 'Enviar',
    contact_sending: 'Enviando...',
    contact_success: 'Mensaje enviado correctamente',
    contact_info_heading: 'Información de contacto',
    contact_phone_label: 'Teléfono',
    contact_city_label: 'Ciudad',
    contact_available: 'Disponible para proyectos remotos',
    contact_book_btn: 'Agendar reunión →',
    contact_err_name: 'El nombre es requerido.',
    contact_err_email_req: 'El email es requerido.',
    contact_err_email_invalid: 'El email no es válido.',
    contact_err_message: 'El mensaje es requerido.',
    contact_cooldown: 'Podés reenviar en',

    // BLOG
    blog_title: 'Blog',
    blog_desc: 'Artículos sobre desarrollo web, buenas prácticas e inteligencia artificial.',
    blog_filter_all: 'Todos',

    // FOOTER
    footer_brand_tagline:
      'Desarrollador web fullstack. Sitios rápidos, seguros y listos para Google.',
    footer_col_portfolio: 'Portafolio',
    footer_col_services: 'Servicios',
    footer_col_more: 'Más',
    footer_link_home: 'Inicio',
    footer_link_about: 'Sobre mí',
    footer_link_projects: 'Proyectos',
    footer_link_cv: 'Currículum',
    footer_link_all_services: 'Ver todos los servicios',
    footer_link_landing: 'Web Institucional',
    footer_link_dynamic: 'Web Dinámica + CMS',
    footer_link_ecommerce: 'E-commerce',
    footer_link_seo: 'SEO con IA',
    footer_link_custom_systems: 'Sistemas a Medida',
    footer_link_meeting: 'Agendar reunión gratis',
    footer_link_blog: 'Blog',
    footer_link_contact: 'Contacto',
    footer_link_faq: 'Preguntas frecuentes',
    footer_made: 'Hecho con',
    footer_location: 'en la Riviera Maya · Next.js + TypeScript',
    footer_rights: 'Todos los derechos reservados.',
  },

  en: {
    // NAV
    nav_home: 'Home',
    nav_about: 'About Me',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_cv: 'Resume',
    nav_services: 'Services',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    toggle_lang: 'ES',

    // HOME
    home_hero_greeting: "Hi, I'm",
    home_hero_role: 'Fullstack Developer',
    home_hero_desc:
      'Modern, scalable and business-oriented web applications. React, Next.js, Spring Boot and WordPress.',
    home_cta_projects: 'View projects',
    home_cta_contact: 'Contact me',
    home_featured_heading: 'Featured Projects',
    home_see_all: 'See all →',
    home_blog_heading: 'Latest blog posts',

    // ABOUT
    about_title: 'About Me',
    about_bio:
      "I'm a fullstack developer with experience building robust, business-driven web applications. I work with technologies such as React, Node.js, Spring Boot and WordPress, delivering real solutions for companies and entrepreneurs. With over eight years of technical background, I approach projects with a structured, results-oriented mindset. I work using agile methodologies and prioritize performance, quality and user experience. I also integrate design, content and SEO to deliver complete, scalable digital products.",
    about_life_title: 'A Life-Changing Turn',
    about_life_p1:
      'Some time ago I decided to leave Rosario and bet on something new: moving to Playa del Carmen, Quintana Roo. A radical change that brought not just a new landscape, but a whole new life project.',
    about_life_p2a: 'This is where',
    about_life_p2b:
      ' was born — a 3D printing venture that is now my main project. We design and manufacture custom parts for various industries: manufacturing, decor, prototypes and more. Every piece is a solved problem.',
    about_life_p3:
      "Combining web development with the physical world of 3D manufacturing gives me a unique perspective: I understand both the digital product and the process behind a real business. Caliber 3D is not just a company — it's proof that betting on yourself works.",
    about_card_skills_desc: 'Technologies I work with',
    about_card_projects_desc: 'Real work',
    about_card_cv_desc: 'Experience and education',
    about_card_blog_desc: 'Technical articles',

    // SKILLS
    skills_title: 'Technical Skills',
    skills_certifications: 'Achievements & Certifications',

    // CURRICULUM
    curriculum_title: 'Resume',

    // EXPERIENCE
    exp_heading: 'Work Experience',
    exp_present: 'Present',

    // EDUCATION
    edu_heading: 'Education',
    edu_in_progress: 'In progress',

    // PROJECTS
    proyectos_title: 'My Websites',
    proyectos_desc: 'Real projects developed for clients and own ventures.',
    proyectos_practice_title: 'Practice Projects',
    proyectos_practice_desc: 'Apps built to explore technologies and strengthen concepts.',

    // SERVICES component (home)
    services_heading: 'Services',
    services_tagline: 'Real web solutions, modern technology and clear pricing.',
    services_see_all: 'View all services',
    services_book_free: 'Book a free meeting',
    services_details: 'View details →',

    // SERVICES page
    services_page_title: 'Web Development Services',
    services_page_desc:
      'Websites built with modern technology — Next.js, TypeScript and Tailwind CSS —, focused on speed, SEO and making sure your clients find you easily on Google.',
    services_includes: "What's included",
    services_maintenance_title: 'Monthly Support & Maintenance',
    services_maintenance_desc:
      'Your digital platform needs continuous oversight to maintain performance and security.',
    services_maintenance_f1: 'Security monitoring: vulnerability prevention',
    services_maintenance_f2: '3 monthly changes (text, images, minor adjustments)',
    services_maintenance_f3: 'Technical update of libraries and dependencies',
    services_maintenance_per_month: 'per month',
    services_info_title: 'Important information',
    services_info_domain_label: 'Domain & Hosting:',
    services_info_domain_text:
      'Paid directly to the provider. A .com domain costs around $10–$15 USD per year.',
    services_info_db_label: 'Database / Cloud:',
    services_info_db_text:
      'Storage for dynamic sites is billed separately by the provider and varies by traffic and data.',
    services_info_payment_label: 'Payment methods:',
    services_info_payment_text:
      'Prices are in US Dollars (USD). Payments accepted via Payoneer or bank transfer in Mexican Pesos (MXN) at the official exchange rate on the payment date.',
    services_info_validity_label: 'Validity:',
    services_info_validity_text:
      'Published prices are valid as of May 2026. Contact me for long-term projects.',
    services_final_title: 'Got a project in mind?',
    services_final_desc:
      "Let's schedule a free 30-minute call to understand what you need and how I can help.",
    services_final_book: 'Book a free meeting',
    services_final_write: 'Get in touch',

    // CUSTOM SYSTEMS
    svc_medida_badge: 'Custom project',
    svc_medida_note:
      '* Scope and final price are defined in the free initial analysis meeting.',
    svc_medida_cta: 'Book an analysis meeting',
    svc_medida_examples_title: 'Types of systems we can build',
    svc_medida_examples_subtitle:
      'Every system is unique and designed from scratch for your business. This is just a sample of what is possible.',
    svc_medida_example_bar_name: 'Bar / Restaurant',
    svc_medida_example_bar_desc:
      'Tables, digital QR menu, real-time orders and split bills',
    svc_medida_example_crm_name: 'Sales CRM',
    svc_medida_example_crm_desc:
      'Client pipeline, follow-ups, interaction history and conversion metrics',
    svc_medida_example_prod_name: 'Production Management',
    svc_medida_example_prod_desc:
      'Work orders, supply stock, traceability and quality control',
    svc_medida_example_rrhh_name: 'Full HR System',
    svc_medida_example_rrhh_desc:
      'Employees, attendance, payroll calculation and digital documentation',
    svc_medida_example_presup_name: 'Quote Generator',
    svc_medida_example_presup_desc:
      'For freelancers: create, send and manage quotes with PDF and acceptance links',
    svc_medida_example_turnos_name: 'Appointments & Bookings',
    svc_medida_example_turnos_desc:
      'Online scheduling for clinics, professionals and services with automatic reminders',
    svc_medida_example_inv_name: 'Inventory & Stock',
    svc_medida_example_inv_desc:
      'Stock control, restock alerts, movements and supplier management',
    svc_medida_example_delivery_name: 'Delivery / Logistics',
    svc_medida_example_delivery_desc:
      'Orders, delivery assignment, real-time tracking and delivery history',
    svc_medida_nimbus_badge: 'Live production example',
    svc_medida_nimbus_title: 'Want to see what a real system looks like?',
    svc_medida_nimbus_desc:
      'Nimbus CRM is a client and sales management system I built. It features an admin panel, visual pipeline, interaction history and reports. Explore it to see the product level we can build together.',
    svc_medida_nimbus_cta: 'Explore Nimbus CRM',

    // CONTACT
    contact_title: 'Contact',
    contact_name: 'Name',
    contact_email: 'Email',
    contact_phone: 'Phone',
    contact_city: 'City of Residence',
    contact_message: 'Message',
    contact_send: 'Send',
    contact_sending: 'Sending...',
    contact_success: 'Message sent successfully',
    contact_info_heading: 'Contact information',
    contact_phone_label: 'Phone',
    contact_city_label: 'City',
    contact_available: 'Available for remote projects',
    contact_book_btn: 'Book a meeting →',
    contact_err_name: 'Name is required.',
    contact_err_email_req: 'Email is required.',
    contact_err_email_invalid: 'Email is not valid.',
    contact_err_message: 'Message is required.',
    contact_cooldown: 'Resend in',

    // BLOG
    blog_title: 'Blog',
    blog_desc: 'Articles on web development, best practices and artificial intelligence.',
    blog_filter_all: 'All',

    // FOOTER
    footer_brand_tagline: 'Fullstack web developer. Fast, secure, Google-ready websites.',
    footer_col_portfolio: 'Portfolio',
    footer_col_services: 'Services',
    footer_col_more: 'More',
    footer_link_home: 'Home',
    footer_link_about: 'About Me',
    footer_link_projects: 'Projects',
    footer_link_cv: 'Resume',
    footer_link_all_services: 'View all services',
    footer_link_landing: 'Business Website',
    footer_link_dynamic: 'Dynamic Web + CMS',
    footer_link_ecommerce: 'E-commerce',
    footer_link_seo: 'AI SEO',
    footer_link_custom_systems: 'Custom Systems',
    footer_link_meeting: 'Book a free meeting',
    footer_link_blog: 'Blog',
    footer_link_contact: 'Contact',
    footer_link_faq: 'FAQ',
    footer_made: 'Made with',
    footer_location: 'in Riviera Maya · Next.js + TypeScript',
    footer_rights: 'All rights reserved.',
  },
};

export default translations;
