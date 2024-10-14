import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Esto asegura que el scroll esté en la parte superior cada vez que cambie la ruta
  }, [pathname]);

  return null;
};

export default ScrollToTop;
