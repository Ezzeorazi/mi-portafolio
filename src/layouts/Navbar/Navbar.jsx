import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import BurguerButton from '../../components/BurgerButton/BurgerButton';
import styles from './Navbar.module.css';
import { LanguageContext } from '../../context/LanguageContext';
import useTranslation from '../../hooks/useTranslation';


function Navbar() {
  const [clicked, setClicked] = useState(false);
  const { toggleLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeMenu = () => {
    setClicked(false);
  };

  return (
    <>
      <NavContainer>
        <div className={styles.logo}>
          <NavLink to="/" onClick={closeMenu}>
            Ezequiel Orazi
          </NavLink>
        </div>
        <div className={`links ${clicked ? 'active' : ''}`}>
          <NavLink to="/sobremi" onClick={closeMenu}>
            {t('nav_about')}
          </NavLink>
          <NavLink to="/skills" onClick={closeMenu}>
            {t('nav_skills')}
          </NavLink>
          <NavLink to="/project" onClick={closeMenu}>
            {t('nav_projects')}
          </NavLink>
          <NavLink to="/curriculum" onClick={closeMenu}>
            {t('nav_cv')}
          </NavLink>
          <NavLink to="/blog" onClick={closeMenu}>
            {t('nav_blog')}
          </NavLink>
          <NavLink to="/contacto" onClick={closeMenu}>
            {t('nav_contact')}
          </NavLink>
        </div>
        <button className={styles.toggle} onClick={toggleLanguage} aria-label="toggle language">
          {t('toggle_lang')}
        </button>
        <div className="burguer">
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? 'active' : ''}`}></BgDiv>
      </NavContainer>
    </>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  padding: .4rem;
  background-color: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000; /* Asegúrate de que el navbar esté por encima del contenido */

  .logo {
    z-index: 1100; /* Asegúrate de que el logo esté por encima del fondo */
  }

  .logo a {
    color: var(--color-yellow);
    font-weight: bold;
    text-decoration: none;
    font-size: 1.5rem;
  }

  .links {
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;
    z-index: 1000; /* Asegúrate de que los enlaces estén por encima del contenido */
    a {
      color: var(--color-yellow);
      font-size: 2rem;
      display: block;
      text-decoration: none;
      margin-top: 1rem;
    }
    @media(min-width: 768px) {
      position: initial;
      margin: 0;
      a {
        font-size: 1rem;
        color: var(--color-yellow);
        display: inline;
        margin-right: 1rem;
      }
      display: block;
    }
  }

  .links.active {
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 18%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 1000; /* Asegúrate de que los enlaces activos estén por encima del contenido */
    a {
      font-size: 2rem;
      margin-top: 1rem;
      color: var(--color-yellow);
    }
  }

  .burguer {
    z-index: 1100; /* Asegúrate de que el botón esté por encima del fondo */
    @media(min-width: 768px) {
      display: none;
    }
  }
`;

const BgDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.8); /* Fondo con transparencia */
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: 999; /* Asegúrate de que el fondo esté justo debajo del navbar */
  transition: all .6s ease;

  &.active {
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;