import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contactá a Ezequiel Orazi para proyectos de desarrollo web, freelance o consultoría. Respondemos en menos de 24 horas.',
  alternates: { canonical: 'https://ezequiel-orazi.online/contacto' },
};

export default function ContactoPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-10">Contacto</h1>
      </ScrollReveal>

      <ContactForm />
    </section>
  );
}
