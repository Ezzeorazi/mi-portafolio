'use client';
import { FaKey, FaCode, FaFileSignature, FaHandshake, FaUserCheck, FaUnlock } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';

// Compromisos de trabajo: responden al miedo típico de contratar a un freelance
// ("¿y si desaparece?", "¿el sitio queda secuestrado?").
const items = [
  { icon: <FaKey />, key: 'g_domain' },
  { icon: <FaCode />, key: 'g_code' },
  { icon: <FaFileSignature />, key: 'g_proposal' },
  { icon: <FaHandshake />, key: 'g_payment' },
  { icon: <FaUnlock />, key: 'g_maintenance' },
  { icon: <FaUserCheck />, key: 'g_direct' },
];

export default function Guarantees() {
  const { t } = useTranslation();

  return (
    <section className="bg-dark px-4 py-16 border-t border-yellow/10">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-yellow font-bold text-2xl md:text-3xl mb-3">{t('g_title')}</h2>
          <p className="text-light/70 text-sm md:text-base mb-8 max-w-2xl">{t('g_subtitle')}</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <ScrollReveal key={item.key} direction="up" delay={i * 0.05}>
              <div className="h-full bg-yellow/5 border border-yellow/15 rounded-xl p-5 flex gap-4">
                <span className="text-yellow text-xl mt-0.5 shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-light font-bold text-sm md:text-base mb-1">{t(`${item.key}_title`)}</h3>
                  <p className="text-light/60 text-sm leading-relaxed">{t(`${item.key}_desc`)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
