import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";
import Typed from "typed.js";
import { Services } from "../../components";

const Home = () => {
  const el = useRef(null); // Crea una referencia al elemento DOM donde renderizar Typed.js
  const typed = useRef(null); // Guarda la instancia de Typed.js

  useEffect(() => {
    if (el.current) {
      const options = {
        strings: [
          "Bienvenidos a mi espacio de trabajo."
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
      };

      // Inicializa Typed.js en el ref del elemento
      typed.current = new Typed(el.current, options);

      // Limpia Typed.js cuando el componente se desmonta
      return () => {
        typed.current.destroy();
      };
    }
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.main}>
        <h1>
          ¡Hola! Soy Ezequiel Orazi, desarrollador Fullstack.<br />
          <span ref={el} />
        </h1>
        <div className={styles.imageContainer}>
          <NavLink to="/sobremi" className={styles.link}>
            <img
              src="AvatarMaker.png"
              alt="Eze-foto-avatar"
              className={styles.image}
            />
          </NavLink>
          <div className={styles.animatedText}>Haz click sobre la imagen</div>
        </div>
      </div>
      <Services/>
    </div>
  );
};

export default Home;