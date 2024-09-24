import React, { useEffect, useState } from "react";
import styles from "./Contacto.module.css";
import useForm from "../../hooks/useForm";
import validate from "./validate";
import emailjs from "emailjs-com";
import Loading from "../../components/Loading/Loading";

const Contacto = () => {
  const { values, errors, handleChange, setErrors } = useForm(
    { name: "", email: "", message: "" },
    validate
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Ajusta el tiempo de carga según sea necesario
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      emailjs
        .sendForm(
          "service_copygr7", // Reemplaza con tu Service ID
          "template_zcj98ca", // Reemplaza con tu Template ID
          e.target,
          "hwJPseHoQzkxc6nR1" // Reemplaza con tu User ID de EmailJS
        )
        .then(
          (result) => {
            console.log(result.text);
            setSuccessMessage("Mensaje enviado con éxito!");
          },
          (error) => {
            console.log(error.text);
            setSuccessMessage("Hubo un error al enviar el mensaje.");
          }
        );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.contactForm}>
      <h2>Contacto</h2>
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      <form action="" method="POST" onSubmit={sendEmail}>
        <div className={styles.formGroup}>
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
