'use client';
import { useState, FormEvent } from 'react';
import { useForm } from '@/hooks/useForm';
import ScrollReveal from '@/components/ScrollReveal';

function validate(values: Record<string, string>) {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = 'El nombre es requerido.';
  if (!values.email.trim()) {
    errors.email = 'El email es requerido.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'El email no es válido.';
  }
  if (!values.message.trim()) errors.message = 'El mensaje es requerido.';
  return errors;
}

export default function ContactForm() {
  const { values, errors, handleChange, sendEmail, formStatus, cooldown } = useForm(
    { name: '', email: '', message: '' },
    validate
  );

  // Honeypot: bots llenan este campo, humanos no lo ven
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (honeypot) {
      e.preventDefault();
      return;
    }
    sendEmail(e);
  };

  const isDisabled = formStatus.isLoading || cooldown > 0;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <ScrollReveal direction="up">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

          {/* Honeypot – invisible para humanos, bots lo completan */}
          <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {formStatus.success && (
            <p className="text-green-400 bg-green-400/10 border border-green-400/30 px-4 py-3 rounded-lg text-sm">
              {formStatus.success}
            </p>
          )}
          {formStatus.error && (
            <p className="text-red-400 bg-red-400/10 border border-red-400/30 px-4 py-3 rounded-lg text-sm">
              {formStatus.error}
            </p>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-dark font-medium text-sm">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              autoComplete="name"
              className="bg-dark text-light border border-yellow/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow transition-colors"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-dark font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              className="bg-dark text-light border border-yellow/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow transition-colors"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-dark font-medium text-sm">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              className="bg-dark text-light border border-yellow/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow transition-colors resize-none"
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="bg-yellow text-dark font-bold py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formStatus.isLoading
              ? 'Enviando...'
              : cooldown > 0
              ? `Podés reenviar en ${cooldown}s`
              : 'Enviar'}
          </button>
        </form>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <div className="bg-dark rounded-xl p-6 border border-yellow/20 flex flex-col gap-5 h-fit">
          <h2 className="text-yellow font-bold text-lg">Información de contacto</h2>
          <div className="flex flex-col gap-4 text-sm">
            <div>
              <p className="text-light/50 text-xs mb-1">Teléfono</p>
              <a
                href="tel:+529982017863"
                className="text-light hover:text-yellow transition-colors"
              >
                +52 9982017863
              </a>
            </div>
            <div>
              <p className="text-light/50 text-xs mb-1">Email</p>
              <a
                href="mailto:ezequiel.orazi90@gmail.com"
                className="text-light hover:text-yellow transition-colors"
              >
                ezequiel.orazi90@gmail.com
              </a>
            </div>
            <div>
              <p className="text-light/50 text-xs mb-1">Ciudad</p>
              <span className="text-light">Playa del Carmen, Quintana Roo, México</span>
            </div>
            <div>
              <p className="text-light/50 text-xs mb-1">Disponibilidad</p>
              <span className="text-green-400 font-medium">
                Disponible para proyectos remotos
              </span>
            </div>
          </div>

          <a
            href="https://calendly.com/ezequiel-orazi90/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-yellow text-dark font-bold px-5 py-3 rounded-lg text-center hover:bg-pink hover:text-white transition-colors duration-300 text-sm"
          >
            Agendar reunión →
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
