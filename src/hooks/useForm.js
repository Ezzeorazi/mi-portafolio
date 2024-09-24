import { useState } from "react";

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // Si no hay errores, aquí podrías agregar el código para enviar el formulario
    if (Object.keys(validationErrors).length === 0) {
      console.log("Formulario enviado con éxito", values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
