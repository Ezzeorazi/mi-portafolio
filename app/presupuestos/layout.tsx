import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Dancing_Script } from 'next/font/google';

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-dancing',
});

export const metadata: Metadata = {
  title: 'Presupuestos',
  robots: { index: false, follow: false },
};

export default function PresupuestosLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={dancing.variable}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0f1215',
        overflowY: 'auto',
      }}
    >
      {children}
    </div>
  );
}
