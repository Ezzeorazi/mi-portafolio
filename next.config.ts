import type { NextConfig } from 'next';

// En desarrollo, Next.js usa eval() para el Fast Refresh (HMR). Sin 'unsafe-eval'
// el bundle de dev tira EvalError y se rompe la hidratación (los posts animados con
// Framer Motion quedan invisibles). En producción NO se incluye: la CSP queda estricta.
const isDev = process.env.NODE_ENV === 'development';

// Content Security Policy: permite recursos propios + Google Analytics/Tag Manager,
// Google Fonts y EmailJS (los únicos terceros que usa el sitio).
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://api.emailjs.com https://www.google-analytics.com https://stats.g.doubleclick.net https://www.googletagmanager.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

// Se definen aquí (y no solo en netlify.toml) porque los [[headers]] de Netlify
// no se aplican a las respuestas generadas por el runtime de Next.js.
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()',
  },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
