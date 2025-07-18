import React from "react";
import styles from "./Contacto.module.css";
import useForm from "../../hooks/useForm";
import validate from "./validate";
import useTranslation from "../../hooks/useTranslation";

const Contacto = () => {
  const { t } = useTranslation();
  const { values, errors, handleChange, sendEmail, formStatus } = useForm(
    { name: "", email: "", message: "" },
    validate
  );

  // Datos personales
  const personalInfo = {
    phone: "+54 3415957226",
    city: "Rosario, Santa Fe, Argentina",
    email: "Ezequiel.orazi90@gmail.com",
  };


  return (
    <div className={`animate_animated animate__fadeIn ${styles.contactForm}`}>
      <h2>{t('contact_title')}</h2>

      {formStatus.success && (
        <p className={styles.successMessage} aria-live="polite">
          {t('contact_success')}
        </p>
      )}
      <form action="" method="POST" onSubmit={sendEmail}>
        <div className={styles.formGroup}>
          <label htmlFor="name">{t('contact_name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className={styles.error} aria-live="polite">
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">{t('contact_email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className={styles.error} aria-live="polite">
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">{t('contact_message')}</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && (
            <p className={styles.error} aria-live="polite">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={formStatus.isLoading}>
          {formStatus.isLoading ? t('contact_sending') : t('contact_send')}
        </button>
      </form>
      <div className={styles.personalInfo}>
        <p>
          <strong>{t('contact_phone')}:</strong>{" "}
          <a href={`tel:${personalInfo.phone}`} className={styles.phone}>
            {personalInfo.phone}
          </a>
        </p>
        <p>
          <strong>{t('contact_city')}:</strong>{" "}
          <span className={styles.city}>{personalInfo.city}</span>
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${personalInfo.email}`} className={styles.email}>
            {personalInfo.email}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contacto;
