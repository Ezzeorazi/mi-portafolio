import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import useTranslation from '../../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <a
          href="https://github.com/Ezzeorazi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github de Ezequiel Orazi"
        >
          <FaGithub />
        </a>
        <a
          href="https://instagram.com/Ezze.o"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de Ezequiel Orazi"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/ezequiel-orazi32/"
          target="_blank" rel="noopener noreferrer"
          aria-label="Linkedin de Ezequiel Orazi"
        >
          <FaLinkedin />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Ezequiel Orazi. {t('footer_rights')}</p>
    </footer>
  );
};

export default Footer;