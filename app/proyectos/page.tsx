import type { Metadata } from 'next';
import ProyectosContent from '@/components/ProyectosContent';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos web de Ezequiel Orazi: sitios con React, Next.js, WordPress y MERN. Trabajo real con clientes y proyectos de práctica.',
  alternates: { canonical: 'https://ezequiel-orazi.online/proyectos' },
};

export default function ProyectosPage() {
  return <ProyectosContent />;
}
