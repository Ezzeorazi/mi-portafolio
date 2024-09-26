import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";
import Typed from "typed.js";
import Loading from "../../components/Loading/Loading"
 

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const el = useRef(null); // Crea una referencia al elemento DOM donde renderizar Typed.js
  const typed = useRef(null); // Guarda la instancia de Typed.js

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Ajusta el tiempo de carga según sea necesario
  }, []);

  useEffect(() => {
    if (!isLoading && el.current) {
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
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

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
    </div>
  );
};

export default Home;
