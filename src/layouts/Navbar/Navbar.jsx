import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/" onClick={closeMenu}>
          Ezequiel Orazi
        </NavLink>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
      </div>
      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
        <NavLink to="/sobremi" onClick={closeMenu}>
          Sobre Mi
        </NavLink>
        <NavLink to="/skills" onClick={closeMenu}>
          Skills
        </NavLink>
        <NavLink to="/project" onClick={closeMenu}>
          Proyectos
        </NavLink>
        <NavLink to="/curriculum" onClick={closeMenu}>
          Curriculum
        </NavLink>
        <NavLink to="/blog" onClick={closeMenu}>
          Blog
        </NavLink>
        <NavLink to="/contacto" onClick={closeMenu}>
          Contacto
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;