'use client';
import { useState, FormEvent } from 'react';
import emailjs from 'emailjs-com';

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;
type ValidateFn = (values: FormValues) => FormErrors;

export function useForm(initialValues: FormValues, validate: ValidateFn) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState({
    success: '',
    error: '',
    isLoading: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setFormStatus((prev) => ({ ...prev, isLoading: true }));
    emailjs
      .sendForm(
        'service_copygr7',
        'template_zcj98ca',
        e.currentTarget,
        'hwJPseHoQzkxc6nR1'
      )
      .then(() => {
        setFormStatus({ isLoading: false, success: 'Mensaje enviado con éxito!', error: '' });
        resetForm();
      })
      .catch(() => {
        setFormStatus({ isLoading: false, success: '', error: 'Hubo un error al enviar el mensaje.' });
      });
  };

  return { values, errors, handleChange, sendEmail, formStatus };
}
