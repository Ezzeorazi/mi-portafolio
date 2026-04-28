import type { Metadata } from 'next';
import Gallery from '@/components/Gallery';
import GalleryPractice from '@/components/GalleryPractice';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos web de Ezequiel Orazi: sitios con React, Next.js, WordPress y MERN. Trabajo real con clientes y proyectos de práctica.',
  alternates: { canonical: 'https://ezequiel-orazi.online/proyectos' },
};

export default function ProyectosPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">Mis sitios web</h1>
        <p className="text-muted mb-10">
          Proyectos reales desarrollados para clientes y emprendimientos propios.
        </p>
      </ScrollReveal>

      <Gallery />

      <ScrollReveal direction="left" delay={0.1} className="mt-20 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-dark">Proyectos de práctica</h2>
        <p className="text-muted mt-2 mb-10">
          Aplicaciones construidas para explorar tecnologías y afianzar conceptos.
        </p>
      </ScrollReveal>

      <GalleryPractice />
    </section>
  );
}
