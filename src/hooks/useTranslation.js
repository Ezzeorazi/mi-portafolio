import { useContext, useMemo } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../context/translations';

const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  const t = useMemo(
    () => (key) => translations[language][key] || key,
    [language]
  );

  return { t };
};

export default useTranslation;
