import { Dancing_Script } from 'next/font/google';

// Compartida entre el layout y la copia de impresión (que se monta fuera del layout)
export const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-dancing',
});
