'use client';
import { useState, FormEvent } from 'react';
import emailjs from 'emailjs-com';

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;
type ValidateFn = (values: FormValues) => FormErrors;

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const COOLDOWN_SECONDS = 60;

export function useForm(initialValues: FormValues, validate: ValidateFn) {
  const [values, setValues]       = useState<FormValues>(initialValues);
  const [errors, setErrors]       = useState<FormErrors>({});
  const [cooldown, setCooldown]   = useState(0);
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

  const startCooldown = () => {
    let secs = COOLDOWN_SECONDS;
    setCooldown(secs);
    const interval = setInterval(() => {
      secs -= 1;
      setCooldown(secs);
      if (secs <= 0) clearInterval(interval);
    }, 1000);
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cooldown > 0) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setFormStatus({ success: '', error: '', isLoading: true });

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        name:     values.name,
        email:    values.email,
        message:  values.message,
        reply_to: values.email,
      }, PUBLIC_KEY)
      .then(() => {
        setFormStatus({ isLoading: false, success: '¡Mensaje enviado con éxito!', error: '' });
        resetForm();
        startCooldown();
      })
      .catch(() => {
        setFormStatus({
          isLoading: false,
          success: '',
          error: 'Hubo un error al enviar. Intentá de nuevo o escribime directamente.',
        });
      });
  };

  return { values, errors, handleChange, sendEmail, formStatus, cooldown };
}
