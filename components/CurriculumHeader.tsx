'use client';
import Link from 'next/link';
import { FaFileDownload, FaGithub, FaIdCard, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

import { CV_PDF, GITHUB_URL, LINKEDIN_URL } from '@/lib/links';

export { CV_PDF, GITHUB_URL, LINKEDIN_URL };

export default function CurriculumHeader() {
  const { t } = useTranslation();

  return (
    <ScrollReveal direction="up">
      <div className="bg-dark rounded-xl p-6 md:p-8 border border-yellow/20 flex flex-col gap-5">
        <div>
          <p className="text-yellow font-bold text-lg md:text-xl">{t('cv_headline')}</p>
          <p className="text-light/60 text-sm mt-1 inline-flex items-center gap-2">
            <FaMapMarkerAlt aria-hidden="true" /> {t('cv_location')}
          </p>
        </div>

        <p className="text-light/80 text-sm md:text-base leading-relaxed">{t('cv_summary')}</p>

        <p className="flex items-start gap-2 text-green-400 font-medium text-sm">
          <span className="mt-1.5 shrink-0 rounded-full h-2 w-2 bg-green-400" aria-hidden="true" />
          {t('cv_availability')}
        </p>

        <p className="flex items-start gap-2 text-light/70 text-sm border border-yellow/20 rounded-lg px-4 py-3">
          <FaIdCard className="mt-0.5 shrink-0 text-yellow" aria-hidden="true" />
          {t('cv_work_permit')}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href={CV_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow text-dark font-bold px-5 py-2.5 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 text-sm"
          >
            <FaFileDownload aria-hidden="true" /> {t('cv_download')}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-yellow/40 text-yellow font-bold px-5 py-2.5 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300 text-sm"
          >
            <FaLinkedin aria-hidden="true" /> LinkedIn
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-yellow/40 text-yellow font-bold px-5 py-2.5 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300 text-sm"
          >
            <FaGithub aria-hidden="true" /> GitHub
          </a>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 border border-light/30 text-light font-bold px-5 py-2.5 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300 text-sm"
          >
            {t('cv_contact')}
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}
