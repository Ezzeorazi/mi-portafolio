import { useState } from "react";
import emailjs from "emailjs-com";

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
    success: "",
    error: "",
    isLoading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  
    // Limpiar errores al cambiar
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setFormStatus({ ...formStatus, isLoading: true });
      emailjs
        .sendForm(
          "service_copygr7", 
          "template_zcj98ca", 
          e.target, 
          "hwJPseHoQzkxc6nR1"
        )
        .then(
          (result) => {
            setFormStatus({
              isLoading: false,
              success: "Mensaje enviado con éxito!",
              error: "",
            });
            resetForm(); // Limpiar formulario
          },
          (error) => {
            setFormStatus({
              isLoading: false,
              success: "",
              error: "Hubo un error al enviar el mensaje.",
            });
          }
        );
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, sendEmail, formStatus, setErrors, setValues, resetForm };
};

export default useForm;