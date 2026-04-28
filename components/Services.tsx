import Link from 'next/link';
import { FaReact, FaWordpress, FaDatabase } from 'react-icons/fa';
import ServiceCard from './ServiceCard';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    title: 'Páginas Web con React',
    description:
      'Desarrollo de sitios web interactivos, rápidos y modernos usando React. Interfaces dinámicas y modulares, adaptadas a cualquier dispositivo, optimizadas para rendimiento y SEO.',
    icon: <FaReact />,
  },
  {
    title: 'Páginas Web con WordPress',
    description:
      'Diseño y personalización de sitios autoadministrables con WordPress. Integro plugins, optimizo velocidad y creo soluciones versátiles para emprendedores y pequeñas empresas.',
    icon: <FaWordpress />,
  },
  {
    title: 'Bases de Datos con MERN o SQL',
    description:
      'Implementación de soluciones con MongoDB para proyectos MERN, y bases SQL como PostgreSQL o MySQL. Diseño eficiente, seguro y escalable.',
    icon: <FaDatabase />,
  },
];

export default function Services() {
  return (
    <section className="bg-dark py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal direction="left">
          <h2 className="text-yellow font-bold text-3xl mb-10 text-center">Servicios</h2>
        </ScrollReveal>

        <div className="flex flex-wrap gap-6 justify-center">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={i * 0.1} />
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.3} className="flex flex-wrap gap-4 justify-center mt-10">
          <a
            href="https://calendly.com/ezequiel-orazi90/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow text-dark font-bold px-6 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
          >
            Agendar reunión
          </a>
          <Link
            href="/proyectos"
            className="border-2 border-yellow text-yellow font-bold px-6 py-3 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300"
          >
            Ver proyectos
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
