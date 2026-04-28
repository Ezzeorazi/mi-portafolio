'use client';
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import translations from '@/lib/translations';

export function useTranslation() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  return { t, language, toggleLanguage };
}
