import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import translations from '../context/translations';

const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  const t = (key) => translations[language][key] || key;

  return { t };
};

export default useTranslation;
