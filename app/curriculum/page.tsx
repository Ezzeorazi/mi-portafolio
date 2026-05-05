import type { Metadata } from 'next';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import T from '@/components/T';
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
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-12">
          <T k="curriculum_title" />
        </h1>
      </ScrollReveal>

      <div className="mb-16">
        <Experience />
      </div>

      <div className="mb-12">
        <Education />
      </div>
    </section>
  );
}
