import { PrismaClient } from '@prisma/client';

// Singleton de Prisma. En dev, Next reinicia módulos con cada cambio (HMR); sin este
// patrón se abrirían decenas de conexiones y Neon rechazaría por exceso. En producción
// (Netlify serverless) cada instancia crea el suyo una sola vez.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
