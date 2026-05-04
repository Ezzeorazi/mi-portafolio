import Link from 'next/link';
import { FaGlobe, FaDatabase, FaShoppingCart } from 'react-icons/fa';
import ServiceCard from './ServiceCard';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    title: 'Web Institucional / Landing Page',
    description:
      'Tu carta de presentación digital. Diseño responsive, secciones clave (Inicio, Servicios, Contacto), botón de WhatsApp y SEO básico para que Google te encuentre.',
    icon: <FaGlobe />,
    price: 'desde $250 USD',
    badge: 'Ideal para empezar',
    href: '/services#landing',
  },
  {
    title: 'Web Dinámica + Gestión de Datos',
    description:
      'Sitio web con panel de control para que administres tu contenido sin saber programar. Base de datos en la nube, catálogo de productos, secciones privadas y SEO avanzado.',
    icon: <FaDatabase />,
    price: 'desde $650 USD',
    badge: 'Para negocios en crecimiento',
    href: '/services#dinamica',
  },
  {
    title: 'E-commerce / Tienda Online',
    description:
      'Tu local abierto las 24hs. Carrito de compras, integración con Mercado Pago, PayPal o Stripe, control de stock y SEO transaccional para captar intención de compra.',
    icon: <FaShoppingCart />,
    price: 'desde $1.200 USD',
    badge: 'Para vender sin límites',
    href: '/services#ecommerce',
  },
];

export default function Services() {
  return (
    <section className="bg-dark py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal direction="left">
          <h2 className="text-yellow font-bold text-3xl mb-2 text-center">Servicios</h2>
          <p className="text-light/60 text-center text-sm mb-10">
            Soluciones web reales, con tecnología moderna y precios claros.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap gap-6 justify-center">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={i * 0.1} />
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.3} className="flex flex-wrap gap-4 justify-center mt-10">
          <Link
            href="/services"
            className="bg-yellow text-dark font-bold px-6 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
          >
            Ver todos los servicios
          </Link>
          <a
            href="https://calendly.com/ezequiel-orazi90/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-yellow text-yellow font-bold px-6 py-3 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300"
          >
            Agendar reunión gratis
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
