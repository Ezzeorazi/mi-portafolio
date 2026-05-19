import type { Metadata } from 'next';
import FAQPageContent from '@/components/FAQPageContent';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Ezequiel Orazi — Desarrollo Web',
  description:
    'Respondemos tus dudas sobre precios, tiempos, tecnologías y proceso de trabajo. Landing page desde $180 USD, e-commerce desde $890 USD. Trabajo con clientes de Argentina, México y Colombia.',
  keywords: [
    'preguntas frecuentes desarrollo web',
    'cuánto cuesta una página web',
    'precio landing page',
    'precio tienda online',
    'freelance web Argentina México Colombia',
    'AEO SEO con IA',
  ],
  alternates: { canonical: 'https://ezequiel-orazi.online/faq' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta hacer una página web profesional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una landing page o web institucional cuesta desde $180 USD, una web dinámica con panel de administración desde $490 USD, y una tienda online desde $890 USD. El servicio de SEO con IA tiene un costo inicial de $150 USD.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda en estar lista una página web?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una landing page está lista en 5 a 7 días hábiles. Una web dinámica tarda entre 2 y 3 semanas. Una tienda online completa tarda entre 3 y 4 semanas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito saber programar para administrar mi sitio web?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Las webs dinámicas incluyen un panel de administración visual (Sanity CMS o Strapi) donde podés editar textos, subir fotos y gestionar tu catálogo sin escribir una sola línea de código.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Trabajás con clientes de Argentina, México y Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Trabajo 100% de forma remota con clientes de toda América Latina y España. Tengo experiencia con clientes en Argentina, México (donde actualmente vivo en Playa del Carmen, Quintana Roo), Colombia, Chile y España.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es AEO y por qué es importante para mi negocio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AEO significa Answer Engine Optimization. Mientras el SEO tradicional te posiciona en Google, el AEO te posiciona en las respuestas de IAs como ChatGPT, Perplexity y Gemini. Si tu sitio no está optimizado para AEO, estás invisible ante esa audiencia que busca en IAs.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué diferencia tiene el SEO con IA del SEO tradicional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El SEO con IA (Claude) analiza la competencia con inteligencia artificial, genera contenido optimizado para respuestas directas, implementa Schema Markup avanzado y aplica estrategias AEO para que ChatGPT, Perplexity y Gemini te recomienden.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Podés actualizar o mejorar mi sitio web actual?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Ofrezco auditoría y mejora de sitios existentes: optimización de velocidad, corrección de errores de SEO, rediseño, migración a Next.js y agregado de funcionalidades. El precio se cotiza según el alcance.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo son los métodos de pago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los precios están en USD. Acepto pagos por Payoneer y transferencia bancaria en pesos mexicanos (MXN). El esquema habitual es 50% al inicio y 50% al finalizar el proyecto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué incluye el plan de soporte y mantenimiento mensual?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El plan de $45 USD/mes incluye: monitoreo de seguridad, 3 modificaciones mensuales (textos, imágenes, ajustes menores) y actualización técnica de librerías y dependencias.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo empezamos a trabajar juntos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Proceso simple: contactame por WhatsApp o email, agendamos una reunión gratuita de 30 minutos, te envío una propuesta con alcance y precio, y con el 50% inicial arrancamos el proyecto.',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQPageContent />
    </>
  );
}
