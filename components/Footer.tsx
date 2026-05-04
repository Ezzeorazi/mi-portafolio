import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const navColumns = [
  {
    title: 'Portafolio',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Sobre mí', href: '/sobre-mi' },
      { label: 'Skills', href: '/skills' },
      { label: 'Proyectos', href: '/proyectos' },
      { label: 'Currículum', href: '/curriculum' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Ver todos los servicios', href: '/services' },
      { label: 'Web Institucional', href: '/services#landing' },
      { label: 'Web Dinámica + CMS', href: '/services#dinamica' },
      { label: 'E-commerce', href: '/services#ecommerce' },
      { label: 'Agendar reunión gratis', href: 'https://calendly.com/ezequiel-orazi90/30min', external: true },
    ],
  },
  {
    title: 'Más',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
];

const socials = [
  { icon: <FaGithub />, href: 'https://github.com/Ezzeorazi', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/ezequiel-orazi32/', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://www.instagram.com/ezze.o/', label: 'Instagram' },
  { icon: <FaEnvelope />, href: 'mailto:ezequiel.orazi90@gmail.com', label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-yellow/10 mt-auto">
      <div className="max-w-5xl mx-auto px-4 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-yellow font-bold text-xl hover:text-pink transition-colors duration-300 self-start">
              Ezequiel Orazi
            </Link>
            <p className="text-light/75 text-sm leading-relaxed">
              Desarrollador web fullstack. Sitios rápidos, seguros y listos para Google.
            </p>
            <div className="flex gap-4 text-xl mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-yellow hover:text-pink transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-yellow font-semibold text-xs uppercase tracking-widest mb-1">
                {col.title}
              </h3>
              {col.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light/75 text-sm hover:text-pink transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-light/75 text-sm hover:text-pink transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-yellow/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-light/65">
          <p>&copy; {year} Ezequiel Orazi. Todos los derechos reservados.</p>
          <p>
            Hecho con{' '}
            <span className="text-pink">♥</span>
            {' '}en la Rivera Maya · Next.js + TypeScript
          </p>
        </div>

      </div>
    </footer>
  );
}
