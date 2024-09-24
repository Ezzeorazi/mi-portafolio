import React from "react";
import styles from "./Contacto.module.css";
import useForm from "../../hooks/useForm";
import validate from "./validate";

const Contacto = ({}) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: "", email: "", message: "" },
    validate
  );
  return (
    <div className={styles.contactForm}>
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={styles.formGroup}
          action="https://formsubmit.co/ezequiel.orazi90@gmail.com"
          method="POST"
        >
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
