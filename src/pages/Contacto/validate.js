const validate = (values) => {
    let errors = {};
  
    // Validar el campo nombre
    if (!values.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    }
  
    // Validar el campo email
    if (!values.email) {
      errors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El email no es válido.";
    }
  
    // Validar el campo mensaje
    if (!values.message.trim()) {
      errors.message = "El mensaje es obligatorio.";
    }
  
    return errors;
  };
  
  export default validate;
  