import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";
import Typed from "typed.js";
 

const Home = () => {

  const el = useRef(null); // Crea una referencia al elemento DOM donde renderizar Typed.js
  const typed = useRef(null); // Guarda la instancia de Typed.js

  useEffect(() => {
    const options = {
      strings: [
        "¡Hola! Soy Ezequiel Orazi, desarrollador Fullstack.", "Bienvenidos a mi espacio creativo."
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
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.main}>
      <h1>
        <span ref={el} />
      </h1>
        <div className={styles.imageContainer}>
          <NavLink to="/sobremi" className={styles.link}>
            <img
              src="./src/assets/img/AvatarMaker.png"
              alt="Eze-foto-avatar"
              className={styles.image}
            />
          </NavLink>
          <div className={styles.animatedText}>Haz click sobre la imagen</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
