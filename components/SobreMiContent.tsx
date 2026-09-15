'use client';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import Caliber3DCarousel from '@/components/Caliber3DCarousel';
import { CV_PDF, LINKEDIN_URL } from '@/components/CurriculumHeader';
import { FaFileDownload, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function SobreMiContent() {
  const { t } = useTranslation();

  const cards = [
    { labelKey: 'nav_skills', href: '/skills', descKey: 'about_card_skills_desc' },
    { labelKey: 'nav_projects', href: '/proyectos', descKey: 'about_card_projects_desc' },
    { labelKey: 'nav_cv', href: '/curriculum', descKey: 'about_card_cv_desc' },
    { labelKey: 'nav_blog', href: '/blog', descKey: 'about_card_blog_desc' },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">{t('about_title')}</h1>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <p className="text-muted leading-relaxed text-base md:text-lg text-justify mb-6">
          {t('about_bio')}
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <span className="inline-flex items-center gap-2 text-green-600 font-medium text-sm">
            <span className="inline-flex rounded-full h-2 w-2 bg-green-500" aria-hidden="true" />
            {t('about_availability')}
          </span>
          <a
            href={CV_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-dark text-yellow font-bold px-4 py-2 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 text-sm"
          >
            <FaFileDownload aria-hidden="true" /> {t('cv_download')}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-dark/30 text-dark font-bold px-4 py-2 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300 text-sm"
          >
            <FaLinkedin aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </ScrollReveal>

      {/* Caliber 3D + vida en Playa del Carmen */}
      <ScrollReveal direction="up" delay={0.15}>
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
          <div className="flex-1">
            <h2 className="text-dark font-bold text-xl md:text-2xl mb-4">
              {t('about_life_title')}
            </h2>
            <p className="text-muted leading-relaxed text-base text-justify mb-4">
              {t('about_life_p1')}
            </p>
            <p className="text-muted leading-relaxed text-base text-justify mb-4">
              {t('about_life_p2a')}{' '}
              <a
                href="https://caliber3d.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow hover:text-pink transition-colors font-semibold"
              >
                Caliber 3D
              </a>
              {t('about_life_p2b')}
            </p>
            <p className="text-muted leading-relaxed text-base text-justify">
              {t('about_life_p3')}
            </p>
          </div>

          <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
            <Caliber3DCarousel />
          </div>
        </div>
      </ScrollReveal>

      {/* Cards de navegación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <ScrollReveal key={card.href} direction="flip" delay={i * 0.1}>
            <Link
              href={card.href}
              className="block bg-dark rounded-xl p-6 border border-yellow/20 hover:shadow-pink-glow hover:-translate-y-1 transition-all duration-300"
            >
              <h2 className="text-yellow font-bold text-xl mb-1">{t(card.labelKey)}</h2>
              <p className="text-light/70 text-sm">{t(card.descKey)}</p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
