import React, { useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";
import Typed from "typed.js";
import { Services } from "../../components";
import useTranslation from "../../hooks/useTranslation";
import { LanguageContext } from "../../context/LanguageContext";

const Home = () => {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    if (el.current) {
      const options = {
        strings: [t("home_typed")],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
      };
      typed.current = new Typed(el.current, options);
      return () => {
        typed.current.destroy();
      };
    }
  }, [language, t]);

  return (
    <div className={`animate_animated animate__fadeIn ${styles.home}`}>
      <div className={styles.main}>
        <h1>
          {t("home_title")}<br />
          <span ref={el} />
        </h1>
        <div className={styles.imageContainer}>
          <NavLink to="/sobremi" className={styles.link}>
            <img
              src="image-perfil.jpeg"
              alt="Eze-foto-avatar"
              className={styles.image}
            />
          </NavLink>
          <div className={styles.animatedText}>{t("home_click_image")}</div>
        </div>
        <p className={styles.subtitle}>{t("home_subtitle")}</p>
      </div>
      <Services />
    </div>
  );
};

export default Home;
