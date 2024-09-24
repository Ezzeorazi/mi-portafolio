const validate = (values) => {
  let errors = {};

  // Validación del nombre
  if (!values.name) {
    errors.name = "El nombre es requerido";
  } else if (/\d/.test(values.name)) {
    errors.name = "El nombre no puede contener números";
  }

  // Validación del email
  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no es válido";
  }

  // Validación del mensaje
  if (!values.message) {
    errors.message = "El mensaje es requerido";
  } else if (values.message.split(" ").length > 500) {
    errors.message = "El mensaje no puede tener más de 500 palabras";
  }

  return errors;
};

export default validate;