'use client';
import { useState, FormEvent } from 'react';
import emailjs from 'emailjs-com';

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;
type ValidateFn = (values: FormValues) => FormErrors;

const SERVICE_ID = 'service_1zyacxl';
const TEMPLATE_ID = 'template_zcj98ca';
const PUBLIC_KEY = 'hwJPseHoQzkxc6nR1';

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

    setFormStatus({ success: '', error: '', isLoading: true });

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: values.name,
          email: values.email,
          message: values.message,
          reply_to: values.email,
        },
        PUBLIC_KEY
      )
      .then(() => {
        setFormStatus({ isLoading: false, success: '¡Mensaje enviado con éxito!', error: '' });
        resetForm();
      })
      .catch(() => {
        setFormStatus({ isLoading: false, success: '', error: 'Hubo un error al enviar. Intentá de nuevo o escribime directamente.' });
      });
  };

  return { values, errors, handleChange, sendEmail, formStatus };
}
