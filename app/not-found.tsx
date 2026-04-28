import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-8xl font-bold text-yellow mb-4">404</h1>
      <p className="text-muted text-xl mb-8">Página no encontrada</p>
      <Link
        href="/"
        className="bg-yellow text-dark font-bold px-6 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
