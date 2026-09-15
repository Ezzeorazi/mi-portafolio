import type { Metadata } from 'next';
import SobreMiContent from '@/components/SobreMiContent';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description:
    'Conocé a Ezequiel Orazi, desarrollador web fullstack (Next.js, TypeScript, Node.js) radicado en Playa del Carmen, México. Disponible para empleo remoto y proyectos freelance.',
  alternates: { canonical: 'https://ezequiel-orazi.online/sobre-mi' },
};

export default function SobreMiPage() {
  return <SobreMiContent />;
}
