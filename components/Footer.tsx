'use client';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

const socials = [
  { icon: <FaGithub />, href: 'https://github.com/Ezzeorazi', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/ezequiel-orazi32/', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://www.instagram.com/ezze.o/', label: 'Instagram' },
  { icon: <FaEnvelope />, href: 'mailto:ezequiel.orazi90@gmail.com', label: 'Email' },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navColumns = [
    {
      titleKey: 'footer_col_portfolio',
      links: [
        { key: 'footer_link_home', href: '/' },
        { key: 'footer_link_about', href: '/sobre-mi' },
        { key: 'nav_skills', href: '/skills' },
        { key: 'footer_link_projects', href: '/proyectos' },
        { key: 'footer_link_cv', href: '/curriculum' },
      ],
    },
    {
      titleKey: 'footer_col_services',
      links: [
        { key: 'footer_link_all_services', href: '/services' },
        { key: 'footer_link_landing', href: '/services#landing' },
        { key: 'footer_link_dynamic', href: '/services#dinamica' },
        { key: 'footer_link_ecommerce', href: '/services#ecommerce' },
        { key: 'footer_link_seo', href: '/services#seo' },
        { key: 'footer_link_meeting', href: 'https://calendly.com/ezequiel-orazi90/30min', external: true },
      ],
    },
    {
      titleKey: 'footer_col_more',
      links: [
        { key: 'footer_link_blog', href: '/blog' },
        { key: 'footer_link_faq', href: '/faq' },
        { key: 'footer_link_contact', href: '/contacto' },
      ],
    },
  ];

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
              {t('footer_brand_tagline')}
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
            <div key={col.titleKey} className="flex flex-col gap-3">
              <h3 className="text-yellow font-semibold text-xs uppercase tracking-widest mb-1">
                {t(col.titleKey)}
              </h3>
              {col.links.map((link) =>
                (link as { external?: boolean }).external ? (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light/75 text-sm hover:text-pink transition-colors duration-200"
                  >
                    {t(link.key)}
                  </a>
                ) : (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="text-light/75 text-sm hover:text-pink transition-colors duration-200"
                  >
                    {t(link.key)}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-yellow/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-light/65">
          <p>&copy; {year} Ezequiel Orazi. {t('footer_rights')}</p>
          <p>
            {t('footer_made')}{' '}
            <span className="text-pink">♥</span>
            {' '}{t('footer_location')}
          </p>
        </div>

      </div>
    </footer>
  );
}
