import type { Metadata } from 'next';
import SobreMiContent from '@/components/SobreMiContent';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description:
    'Conocé a Ezequiel Orazi, desarrollador fullstack con experiencia en React, Node.js, Spring Boot y WordPress. Más de 8 años en entornos técnicos.',
  alternates: { canonical: 'https://ezequiel-orazi.online/sobre-mi' },
};

export default function SobreMiPage() {
  return <SobreMiContent />;
}
