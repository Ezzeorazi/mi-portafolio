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
    nav_seo_tool: 'Análisis SEO',
    nav_security_tool: 'Seguridad Web',
    toggle_lang: 'EN',

    // HOME
    home_hero_greeting: 'Hola, soy',
    home_hero_role: 'Desarrollador Web Fullstack',
    home_hero_desc:
      'Construyo sitios, tiendas y sistemas web para negocios de América Latina con Next.js, TypeScript y Tailwind CSS. Rápidos, bien posicionados en Google y con IA aplicada en producción.',
    home_hero_available: 'Disponible para empleo remoto y proyectos freelance',
    home_cta_projects: 'Ver proyectos',
    home_cta_contact: 'Contactarme',
    home_cta_cv: 'Descargar CV',
    home_audience_recruiter_title: '¿Buscás sumar un desarrollador a tu equipo?',
    home_audience_recruiter_desc:
      'Fullstack con foco en Next.js, TypeScript y Node.js. Trabajo 100% remoto desde México (GMT-5) con clientes de toda Latinoamérica. Revisá mi experiencia, mi stack y mi código.',
    home_audience_recruiter_cta: 'Ver currículum',
    home_audience_recruiter_cta2: 'CV en PDF',
    home_audience_client_title: '¿Tenés un proyecto o un negocio?',
    home_audience_client_desc:
      'Landing pages, tiendas online, sistemas a medida y SEO con IA. Precios publicados, plazos claros y una reunión inicial gratuita para definir el alcance.',
    home_audience_client_cta: 'Ver servicios y precios',
    home_audience_client_cta2: 'Agendar reunión gratis',
    home_stats_projects: 'proyectos en producción',
    home_stats_years: 'años desarrollando web',
    home_stats_posts: 'artículos técnicos publicados',
    home_featured_heading: 'Proyectos destacados',
    home_see_all: 'Ver todos →',
    home_blog_heading: 'Últimos posts del blog',
    home_news_heading: 'Noticias Tech',
    home_news_desc:
      'Mi semanario de tecnología: las noticias más relevantes de la semana con mi análisis, en primera persona. Nueva edición todos los miércoles a las 8:00 (hora Argentina).',
    home_news_empty_title: 'La primera edición sale el miércoles 17/6',
    home_news_empty_text:
      'Todavía no hay ediciones publicadas. La primera sale el miércoles 17 de junio a las 8:00 (ART) y después una por semana.',
    home_news_cta: 'Ver todas las noticias →',

    // ABOUT
    about_title: 'Sobre mí',
    about_bio:
      'Soy desarrollador web fullstack. Construyo sitios, tiendas y sistemas para empresas y emprendedores de América Latina con Next.js, TypeScript, Tailwind CSS, Node.js y bases de datos como Supabase y PostgreSQL, y en los últimos proyectos incorporé Python y Machine Learning en producción. Antes de programar lideré durante cinco años un taller de reparación de maquinaria pesada y administré plataformas de e-commerce (VTEX y WordPress) durante tres: sé trabajar con clientes, plazos y equipos, y entiendo cómo funciona un negocio real. Además del desarrollo, integro diseño, contenido y SEO para entregar productos digitales completos y listos para escalar.',
    about_availability: 'Disponible para empleo remoto y proyectos freelance',
    about_life_title: 'Un volantazo a la vida',
    about_life_p1:
      'Hace un tiempo tomé la decisión de dejar Rosario y apostar por algo nuevo: emigrar a Playa del Carmen, Quintana Roo. Un cambio radical que trajo no solo un nuevo paisaje, sino también un nuevo proyecto de vida.',
    about_life_p2a: 'Fue acá donde nació',
    about_life_p2b:
      ', un emprendimiento de impresión 3D que llevo adelante en paralelo al desarrollo web. Diseñamos y fabricamos piezas personalizadas para distintos rubros: industria, decoración, prototipos y más. Cada pieza es un problema resuelto.',
    about_life_p3:
      'Combinar el desarrollo web con el mundo físico de la fabricación 3D me da una visión distinta: entiendo tanto el producto digital como el proceso detrás de un negocio real. Caliber 3D no es solo una empresa, es la prueba de que apostar por uno mismo funciona.',
    about_card_skills_desc: 'Tecnologías que domino',
    about_card_projects_desc: 'Mi trabajo real',
    about_card_cv_desc: 'Experiencia y formación',
    about_card_blog_desc: 'Artículos técnicos',

    // SKILLS
    skills_title: 'Habilidades Técnicas',
    skills_intro:
      'Stack agrupado por área. Las tecnologías marcadas como principales son las que uso a diario en proyectos en producción.',
    skills_main_badge: 'Principal',
    skills_cat_frontend: 'Frontend',
    skills_cat_backend: 'Backend y bases de datos',
    skills_cat_ai: 'IA, datos y automatización',
    skills_cat_cms: 'CMS y e-commerce',
    skills_cat_tools: 'Herramientas y métodos de trabajo',
    skills_certifications: 'Formación y Certificaciones',

    // CURRICULUM
    curriculum_title: 'Currículum',
    cv_headline: 'Desarrollador Web Fullstack · Next.js, TypeScript y Node.js',
    cv_summary:
      'Desarrollo sitios y aplicaciones web para negocios de América Latina: desde landing pages hasta sistemas con base de datos y modelos de Machine Learning en producción. Antes de programar lideré un taller de maquinaria pesada durante cinco años y administré plataformas e-commerce durante tres, así que sé trabajar con clientes, plazos y equipos.',
    cv_location: 'Playa del Carmen, México · 100% remoto',
    cv_availability: 'Disponible para empleo remoto y proyectos freelance',
    cv_download: 'Descargar CV (PDF)',
    cv_contact: 'Contactarme',

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
    svc_seo_tool_cta: 'Medí tu SEO gratis ahora',
    services_maintenance_tool_cta: 'Medí el estado de tu sitio gratis',
    services_maintenance_security_cta: 'Analizá la seguridad de tu sitio',
    home_seo_tool_badge: 'Herramienta gratuita',
    home_seo_tool_title: '¿Tu sitio aparece en Google?',
    home_seo_tool_desc:
      'Analizá el SEO de tu web en 30 segundos: velocidad, SEO técnico y los puntos exactos que frenan tu posicionamiento. Gratis y sin registro.',
    home_seo_tool_cta: 'Analizar mi sitio gratis',
    home_security_tool_badge: 'Herramienta gratuita',
    home_security_tool_title: '¿Tu sitio está protegido?',
    home_security_tool_desc:
      'Analizá la seguridad de tu web en 30 segundos: cabeceras HTTP, certificado SSL y las brechas que exponen a vos y a tus visitantes. Gratis y sin registro.',
    home_security_tool_cta: 'Analizar seguridad gratis',
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
    contact_available: 'Disponible para empleo remoto y proyectos freelance',
    contact_response: 'Respondo en menos de 24 horas',
    contact_whatsapp_btn: 'Escribirme por WhatsApp',
    contact_book_btn: 'Agendar reunión →',
    contact_cv_btn: 'Descargar CV (PDF)',
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
    nav_seo_tool: 'SEO Checker',
    nav_security_tool: 'Web Security',
    toggle_lang: 'ES',

    // HOME
    home_hero_greeting: "Hi, I'm",
    home_hero_role: 'Fullstack Web Developer',
    home_hero_desc:
      'I build websites, online stores and web systems for Latin American businesses with Next.js, TypeScript and Tailwind CSS. Fast, well ranked on Google, with AI applied in production.',
    home_hero_available: 'Open to remote roles and freelance projects',
    home_cta_projects: 'View projects',
    home_cta_contact: 'Contact me',
    home_cta_cv: 'Download resume',
    home_audience_recruiter_title: 'Hiring a developer for your team?',
    home_audience_recruiter_desc:
      'Fullstack developer focused on Next.js, TypeScript and Node.js. I work 100% remotely from Mexico (GMT-5) with clients across Latin America. Check my experience, my stack and my code.',
    home_audience_recruiter_cta: 'View resume',
    home_audience_recruiter_cta2: 'Resume (PDF)',
    home_audience_client_title: 'Got a project or a business?',
    home_audience_client_desc:
      'Landing pages, online stores, custom systems and AI SEO. Published prices, clear timelines and a free initial meeting to define the scope.',
    home_audience_client_cta: 'See services and pricing',
    home_audience_client_cta2: 'Book a free meeting',
    home_stats_projects: 'projects in production',
    home_stats_years: 'years building for the web',
    home_stats_posts: 'technical articles published',
    home_featured_heading: 'Featured Projects',
    home_see_all: 'See all →',
    home_blog_heading: 'Latest blog posts',
    home_news_heading: 'Tech News',
    home_news_desc:
      'My weekly tech digest: the most relevant stories of the week with my own take, first person. New edition every Wednesday at 8:00 AM (Argentina time).',
    home_news_empty_title: 'The first edition drops Wednesday, June 17',
    home_news_empty_text:
      'No editions published yet. The first one goes live on Wednesday, June 17 at 8:00 AM (ART), then one per week.',
    home_news_cta: 'See all news →',

    // ABOUT
    about_title: 'About Me',
    about_bio:
      "I'm a fullstack web developer. I build websites, online stores and systems for companies and entrepreneurs across Latin America with Next.js, TypeScript, Tailwind CSS, Node.js and databases such as Supabase and PostgreSQL, and in my latest projects I've shipped Python and Machine Learning to production. Before programming I led a heavy machinery repair workshop for five years and managed e-commerce platforms (VTEX and WordPress) for three: I know how to work with clients, deadlines and teams, and I understand how a real business runs. Beyond development, I integrate design, content and SEO to deliver complete, scalable digital products.",
    about_availability: 'Open to remote roles and freelance projects',
    about_life_title: 'A Life-Changing Turn',
    about_life_p1:
      'Some time ago I decided to leave Rosario and bet on something new: moving to Playa del Carmen, Quintana Roo. A radical change that brought not just a new landscape, but a whole new life project.',
    about_life_p2a: 'This is where',
    about_life_p2b:
      ' was born — a 3D printing venture I run alongside my web development work. We design and manufacture custom parts for various industries: manufacturing, decor, prototypes and more. Every piece is a solved problem.',
    about_life_p3:
      "Combining web development with the physical world of 3D manufacturing gives me a unique perspective: I understand both the digital product and the process behind a real business. Caliber 3D is not just a company — it's proof that betting on yourself works.",
    about_card_skills_desc: 'Technologies I work with',
    about_card_projects_desc: 'Real work',
    about_card_cv_desc: 'Experience and education',
    about_card_blog_desc: 'Technical articles',

    // SKILLS
    skills_title: 'Technical Skills',
    skills_intro:
      'Stack grouped by area. Technologies marked as core are the ones I use daily on production projects.',
    skills_main_badge: 'Core',
    skills_cat_frontend: 'Frontend',
    skills_cat_backend: 'Backend & Databases',
    skills_cat_ai: 'AI, Data & Automation',
    skills_cat_cms: 'CMS & E-commerce',
    skills_cat_tools: 'Tools & Ways of Working',
    skills_certifications: 'Training & Certifications',

    // CURRICULUM
    curriculum_title: 'Resume',
    cv_headline: 'Fullstack Web Developer · Next.js, TypeScript & Node.js',
    cv_summary:
      'I build websites and web applications for Latin American businesses: from landing pages to database-backed systems and Machine Learning models in production. Before programming I led a heavy machinery workshop for five years and managed e-commerce platforms for three, so I know how to work with clients, deadlines and teams.',
    cv_location: 'Playa del Carmen, Mexico · 100% remote',
    cv_availability: 'Open to remote roles and freelance projects',
    cv_download: 'Download resume (PDF)',
    cv_contact: 'Contact me',

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
    svc_seo_tool_cta: 'Check your SEO for free',
    services_maintenance_tool_cta: "Check your site's health for free",
    services_maintenance_security_cta: "Scan your site's security",
    home_security_tool_badge: 'Free tool',
    home_security_tool_title: 'Is your site protected?',
    home_security_tool_desc:
      'Check your website security in 30 seconds: HTTP headers, SSL certificate and the gaps exposing you and your visitors. Free, no sign-up.',
    home_security_tool_cta: 'Scan security for free',
    home_seo_tool_badge: 'Free tool',
    home_seo_tool_title: 'Does your site show up on Google?',
    home_seo_tool_desc:
      "Analyze your website's SEO in 30 seconds: speed, technical SEO and the exact issues holding back your ranking. Free, no sign-up.",
    home_seo_tool_cta: 'Analyze my site for free',
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
    contact_available: 'Open to remote roles and freelance projects',
    contact_response: 'I reply within 24 hours',
    contact_whatsapp_btn: 'Message me on WhatsApp',
    contact_book_btn: 'Book a meeting →',
    contact_cv_btn: 'Download resume (PDF)',
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
