import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import { getAllPosts } from '@/lib/blog';
import { getFeaturedProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Eze Orazi | Desarrollador Web Freelance — Next.js, TypeScript, SEO con IA',
  description:
    'Soy Ezequiel Orazi, desarrollador web freelance. Landing pages desde $180 USD, tiendas online desde $890 USD y SEO con IA para aparecer primero en Google, ChatGPT y Perplexity.',
};

const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta hacer una página web?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una landing page o web institucional arranca en $180 USD. Una web dinámica con panel de administración desde $490 USD. Una tienda online completa desde $890 USD.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda en estar lista una página web?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Una landing page está lista en 5 a 7 días hábiles. Una web con panel de administración tarda 2 a 3 semanas. Una tienda online, 3 a 4 semanas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito saber de tecnología para administrar mi sitio web?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Las webs con panel de administración incluyen Sanity CMS, un editor visual tan simple como Instagram. Podés subir fotos, editar textos y actualizar precios sin tocar código.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el SEO con IA y cómo ayuda a mi negocio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El SEO con IA (usando Claude) posiciona tu sitio no solo en Google sino también en ChatGPT, Perplexity y Gemini mediante AEO (Answer Engine Optimization). Esto permite que las IAs te recomienden cuando alguien busca tus servicios.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Trabajás con clientes de Argentina, México y Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Trabajo 100% remoto con clientes de toda América Latina y España. Soy argentino y vivo en Playa del Carmen, Quintana Roo, México.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo empezamos a trabajar juntos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Escribime por WhatsApp o el formulario de contacto, agendamos una llamada gratuita de 30 minutos, te mando la propuesta con precio y plazo y con el 50% inicial arrancamos.',
      },
    },
  ],
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      <HomeContent latestPosts={latestPosts} featuredProjects={featuredProjects} />
    </>
  );
}
