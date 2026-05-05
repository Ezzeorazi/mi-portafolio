import type { Metadata } from 'next';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Currículum',
  description:
    'Experiencia laboral y formación académica de Ezequiel Orazi — desarrollador fullstack con background en frontend, backend y administración técnica.',
  alternates: { canonical: 'https://ezequiel-orazi.online/curriculum' },
};

export default function CurriculumPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal direction="fade">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-12">Currículum</h1>
      </ScrollReveal>

      <div className="mb-16">
        <Experience />
      </div>

      <div className="mb-12">
        <Education />
      </div>

    {/*   <ScrollReveal direction="up" delay={0.2} className="flex justify-center mt-4">
        <a
          href="/cv-ezequiel-orazi.pdf"
          download
          className="bg-yellow text-dark font-bold px-8 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 inline-flex items-center gap-2"
        >
          Descargar CV
        </a>
      </ScrollReveal>
       */}
    </section>
  );
}
