'use client';
import Gallery from '@/components/Gallery';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

export default function ProyectosContent() {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">{t('proyectos_title')}</h1>
        <p className="text-muted mb-10">{t('proyectos_desc')}</p>
      </ScrollReveal>

      <Gallery />
    </section>
  );
}
