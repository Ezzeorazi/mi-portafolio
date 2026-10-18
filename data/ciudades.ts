// Páginas locales de servicio (/paginas-web/[ciudad]).
// Cada ciudad tiene contenido propio: rubros, argumentos y preguntas distintas,
// para que no sean páginas "puerta" duplicadas a los ojos de Google.

export type Ciudad = {
  slug: string;
  nombre: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  cercania: string;
  rubros: { titulo: string; descripcion: string }[];
  porQue: { titulo: string; descripcion: string }[];
  faq: { q: string; a: string }[];
};

const ciudades: Ciudad[] = [
  {
    slug: 'playa-del-carmen',
    nombre: 'Playa del Carmen',
    metaTitle: 'Páginas Web en Playa del Carmen | Diseño Web y SEO Local',
    metaDescription:
      'Diseño de páginas web en Playa del Carmen para negocios turísticos, restaurantes y servicios. Desarrollador local, sitios rápidos, bilingües y posicionados en Google. Desde $180 USD.',
    h1: 'Páginas web en Playa del Carmen',
    intro: [
      'Vivo y trabajo en Playa del Carmen. Conozco cómo busca el turista que llega a la Quinta Avenida y cómo busca el residente que necesita un servicio: en el celular, en español o en inglés, y casi siempre con prisa.',
      'Diseño páginas web rápidas, bilingües y pensadas para aparecer en Google cuando alguien busca lo que vendés en Playa. Sin plantillas compradas y con un precio cerrado desde el primer día.',
    ],
    cercania: 'Estoy en Playa del Carmen: hablamos el mismo idioma comercial y conozco el mercado de primera mano.',
    rubros: [
      {
        titulo: 'Tours, day passes y actividades',
        descripcion:
          'Catálogo de experiencias con fotos, horarios y reserva por WhatsApp. Es lo que construí en RivieraMayaPass, un portal local de day passes y tours.',
      },
      {
        titulo: 'Restaurantes y beach clubs',
        descripcion:
          'Menú siempre actualizado, ubicación en Google Maps, reservas y una versión en inglés para el turista que llega desde el hotel.',
      },
      {
        titulo: 'Rentas vacacionales y departamentos',
        descripcion:
          'Una web propia para recibir reservas directas y no depender solo de las comisiones de Airbnb o Booking.',
      },
      {
        titulo: 'Talleres, comercios y servicios locales',
        descripcion:
          'Catálogo y formulario de cotización para que el cliente te pida presupuesto sin llamarte. Así trabaja Caliber 3D, mi taller de impresión 3D en Playa.',
      },
    ],
    porQue: [
      {
        titulo: 'Bilingüe desde el inicio',
        descripcion:
          'En Playa una parte grande de los clientes habla inglés. Tu web puede tener las dos versiones bien hechas, no un traductor automático.',
      },
      {
        titulo: 'SEO para búsquedas locales',
        descripcion:
          'Optimizo tu sitio para búsquedas como "tours en Playa del Carmen" o "restaurante en la Quinta Avenida", y lo conecto con tu perfil de Google Business.',
      },
      {
        titulo: 'Pensada para el celular',
        descripcion:
          'El turista te busca desde el teléfono, a veces con datos móviles lentos. Construyo sitios livianos que cargan rápido igual.',
      },
    ],
    faq: [
      {
        q: '¿Cuánto cuesta una página web en Playa del Carmen?',
        a: 'Una landing page o web institucional arranca en $180 USD (unos $3,100 MXN). Una web con panel para editar contenido, desde $490 USD, y una tienda online, desde $890 USD. El precio queda cerrado por escrito antes de empezar.',
      },
      {
        q: '¿Podemos trabajar si mi negocio está en Playa del Carmen y yo estoy en otro país?',
        a: 'Sí. Muchos dueños de negocios en Playa viven parte del año afuera. Todo el proceso se hace por WhatsApp y videollamada, y te comparto un link para ver los avances.',
      },
      {
        q: '¿Mi web puede estar en español y en inglés?',
        a: 'Sí, y en Playa del Carmen es casi obligatorio. Cada idioma tiene su propia dirección para que Google muestre la versión correcta a cada visitante.',
      },
      {
        q: '¿Cuánto tarda en estar lista?',
        a: 'Una landing page está lista en 5 a 7 días hábiles; una web con panel de administración, en 2 a 3 semanas. Los tiempos dependen de que tengas listos los textos y las fotos.',
      },
    ],
  },
  {
    slug: 'cancun',
    nombre: 'Cancún',
    metaTitle: 'Páginas Web en Cancún | Diseño Web Profesional y SEO',
    metaDescription:
      'Diseño de páginas web en Cancún para clínicas, inmobiliarias, traslados y negocios de servicios. Sitios rápidos y optimizados para destacar en Google frente a la competencia. Desde $180 USD.',
    h1: 'Páginas web en Cancún',
    intro: [
      'En Cancún la competencia en Google es fuerte: para casi cualquier servicio hay decenas de negocios peleando por los primeros lugares. Una web lenta o genérica pasa desapercibida.',
      'Diseño páginas web profesionales para negocios de Cancún que necesitan diferenciarse: rápidas, claras y optimizadas para que el cliente te encuentre y te escriba.',
    ],
    cercania: 'Trabajo desde Playa del Carmen, a menos de una hora de Cancún, con clientes de toda la Riviera Maya.',
    rubros: [
      {
        titulo: 'Clínicas, consultorios y turismo médico',
        descripcion:
          'Una web que transmite confianza, con especialidades, ubicación, formulario de turnos y versión en inglés para pacientes de Estados Unidos y Canadá.',
      },
      {
        titulo: 'Inmobiliarias y desarrollos',
        descripcion:
          'Fichas de propiedades editables desde un panel, galerías de fotos y contacto directo por WhatsApp para cada unidad.',
      },
      {
        titulo: 'Traslados y transporte turístico',
        descripcion:
          'Tarifas claras desde el aeropuerto a cada zona, formulario de reserva y botón de WhatsApp siempre visible en el celular.',
      },
      {
        titulo: 'Empresas de servicios',
        descripcion:
          'Escuelas, despachos, mantenimiento o seguridad: una web que explica qué hacés, muestra casos reales y convierte visitas en cotizaciones.',
      },
    ],
    porQue: [
      {
        titulo: 'Velocidad como ventaja competitiva',
        descripcion:
          'Con tanta competencia, un sitio que carga en menos de 2 segundos y sale bien en las métricas de Google te da una ventaja real frente a webs pesadas hechas con constructores.',
      },
      {
        titulo: 'SEO y presencia en IA',
        descripcion:
          'Optimizo tu web para Google y para que asistentes como ChatGPT o Perplexity te recomienden cuando alguien pregunta por tu servicio en Cancún.',
      },
      {
        titulo: 'Diagnóstico gratis antes de contratar',
        descripcion:
          'Si ya tenés web, podés medirla gratis con mi auditoría SEO y mi análisis de seguridad, y ver dónde estás perdiendo clientes.',
      },
    ],
    faq: [
      {
        q: '¿Cuánto cuesta una página web en Cancún?',
        a: 'Una landing page arranca en $180 USD (unos $3,100 MXN), una web con panel de administración desde $490 USD y una tienda online desde $890 USD. Si necesitás factura, el IVA va aparte.',
      },
      {
        q: '¿Trabajás con negocios de Cancún aunque estés en Playa del Carmen?',
        a: 'Sí. Estoy a menos de una hora y trabajo con negocios de toda la Riviera Maya. El proceso es por WhatsApp y videollamada, así que no tenés que moverte de tu negocio.',
      },
      {
        q: 'Ya tengo una web, ¿la podés mejorar en lugar de hacer una nueva?',
        a: 'Sí. Primero la mido con mi auditoría SEO gratuita y, según lo que encuentre, te propongo optimizar velocidad, corregir errores de SEO o rediseñarla.',
      },
      {
        q: '¿Puedo editar mi web sin saber programar?',
        a: 'Sí. Las webs con panel de administración te permiten cambiar textos, fotos, propiedades o precios desde un editor visual, sin tocar código.',
      },
    ],
  },
  {
    slug: 'tulum',
    nombre: 'Tulum',
    metaTitle: 'Páginas Web en Tulum | Diseño Web para Hoteles, Wellness y Restaurantes',
    metaDescription:
      'Diseño de páginas web en Tulum para hoteles boutique, retiros de wellness, restaurantes y desarrollos inmobiliarios. Sitios bilingües, visuales y rápidos. Desde $180 USD.',
    h1: 'Páginas web en Tulum',
    intro: [
      'En Tulum la imagen lo es todo. Muchos negocios viven de Instagram, pero cuando el cliente quiere reservar, comparar precios o confiar en vos, busca tu web. Si no la tenés, o no está a la altura de tu marca, lo perdés.',
      'Diseño páginas web visuales, bilingües y rápidas para negocios de Tulum que quieren recibir reservas y consultas directas, sin depender solo de redes sociales y plataformas con comisión.',
    ],
    cercania: 'Trabajo desde Playa del Carmen, a menos de una hora de Tulum, con negocios de toda la Riviera Maya.',
    rubros: [
      {
        titulo: 'Hoteles boutique y cabañas',
        descripcion:
          'Galería de habitaciones, experiencias y reserva directa, para que una parte de tus huéspedes no llegue con la comisión de una OTA.',
      },
      {
        titulo: 'Retiros, yoga y wellness',
        descripcion:
          'Calendario de retiros, programas, testimonios de participantes y pago o reserva online, en español y en inglés.',
      },
      {
        titulo: 'Restaurantes y beach clubs',
        descripcion:
          'Una web con la estética de tu marca, menú actualizado, reservas y ubicación, que se vea tan bien como tu Instagram.',
      },
      {
        titulo: 'Desarrollos inmobiliarios en preventa',
        descripcion:
          'Landing page para cada proyecto con renders, avances de obra, planos y captación de interesados por WhatsApp.',
      },
    ],
    porQue: [
      {
        titulo: 'Diseño a la altura de tu marca',
        descripcion:
          'Nada de plantillas genéricas: un diseño a medida, con fotos grandes, que transmita la experiencia que vendés.',
      },
      {
        titulo: 'Inglés al mismo nivel que el español',
        descripcion:
          'En Tulum buena parte del público es internacional. Cada versión del sitio se escribe y se optimiza para buscar en su idioma.',
      },
      {
        titulo: 'Visual pero liviana',
        descripcion:
          'Las webs con muchas fotos suelen ser lentas. Optimizo cada imagen para que tu sitio se vea espectacular y cargue rápido en el celular.',
      },
    ],
    faq: [
      {
        q: '¿Cuánto cuesta una página web en Tulum?',
        a: 'Una landing page arranca en $180 USD (unos $3,100 MXN). Para un hotel o retiro con varias secciones y panel para editar contenido, desde $490 USD. Una tienda online, desde $890 USD.',
      },
      {
        q: '¿Puedo recibir reservas directas desde mi web?',
        a: 'Sí. Podés recibir reservas por formulario o WhatsApp, o conectar tu motor de reservas o calendario si ya usás uno.',
      },
      {
        q: 'Tengo un desarrollo en preventa, ¿me conviene una landing por proyecto?',
        a: 'Sí. Una landing por desarrollo, con renders, ubicación y un formulario de contacto, te permite medir qué proyecto genera más interesados y usarla en tus campañas.',
      },
      {
        q: '¿Trabajás con negocios de Tulum aunque estés en Playa del Carmen?',
        a: 'Sí. Estoy a menos de una hora y trabajo con toda la Riviera Maya. El proceso se hace por WhatsApp y videollamada, con un link para ver los avances.',
      },
    ],
  },
];

export function getAllCiudades() {
  return ciudades;
}

export function getCiudadBySlug(slug: string) {
  return ciudades.find((c) => c.slug === slug);
}
