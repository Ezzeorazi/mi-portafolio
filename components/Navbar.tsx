'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import BurgerButton from './BurgerButton';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageContext } from '@/context/LanguageContext';
import { useContext } from 'react';

const navLinks = [
  { key: 'nav_about', href: '/sobre-mi' },
  { key: 'nav_skills', href: '/skills' },
  { key: 'nav_projects', href: '/proyectos' },
  { key: 'nav_services', href: '/services' },
  { key: 'nav_cv', href: '/curriculum' },
  { key: 'nav_blog', href: '/blog' },
  { key: 'nav_contact', href: '/contacto' },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();
  const { toggleLanguage } = useContext(LanguageContext);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-dark px-4 py-3 flex items-center justify-between shadow-md">
      <Link
        href="/"
        onClick={closeMenu}
        className="text-yellow font-bold text-xl hover:text-pink transition-colors duration-300 z-[1100]"
      >
        Ezequiel Orazi
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map(({ key, href }) => (
          key === 'nav_services' ? (
            <Link
              key={key}
              href={href}
              className={`text-sm font-bold px-3 py-1 rounded-md border transition-colors duration-300 ${
                pathname === href
                  ? 'bg-pink text-white border-pink'
                  : 'border-yellow text-yellow hover:bg-yellow hover:text-dark'
              }`}
            >
              {t(key)}
            </Link>
          ) : (
            <Link
              key={key}
              href={href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-pink ${
                pathname === href ? 'text-pink' : 'text-yellow'
              }`}
            >
              {t(key)}
            </Link>
          )
        ))}
        <button
          onClick={toggleLanguage}
          aria-label={`Cambiar idioma – ${t('toggle_lang')}`}
          className="ml-2 text-sm font-bold text-dark bg-yellow px-3 py-1 rounded hover:bg-pink hover:text-white transition-colors duration-300"
        >
          {t('toggle_lang')}
        </button>
      </div>

      {/* Mobile controls */}
      <div className="flex items-center gap-3 md:hidden z-[1100]">
        <button
          onClick={toggleLanguage}
          aria-label={`Cambiar idioma – ${t('toggle_lang')}`}
          className="text-xs font-bold text-dark bg-yellow px-2 py-1 rounded"
        >
          {t('toggle_lang')}
        </button>
        <BurgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-dark/95 z-[1000] flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map(({ key, href }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={href}
                  onClick={closeMenu}
                  className={`text-2xl font-bold transition-colors duration-300 hover:text-pink ${
                    pathname === href ? 'text-pink' : 'text-yellow'
                  }`}
                >
                  {t(key)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
