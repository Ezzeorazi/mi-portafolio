import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import TypedText from '@/components/TypedText';
import Services from '@/components/Services';
import ScrollReveal from '@/components/ScrollReveal';
import ArticleCard from '@/components/ArticleCard';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Eze Orazi | Desarrollador Fullstack — Inicio',
  description:
    'Hola, soy Ezequiel Orazi, desarrollador fullstack especializado en React, Next.js, Spring Boot y WordPress. Transformando ideas en código funcional.',
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-light min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4 py-16">
        <ScrollReveal direction="fade" className="w-full flex flex-col items-center gap-6">
          <h1 className="text-dark font-bold text-3xl md:text-5xl max-w-3xl leading-tight">
            Hola, soy Ezequiel Orazi — Desarrollador Fullstack.
            <br />
            <span className="text-pink block mt-2 min-h-[1.4em]">
              <TypedText strings={['Transformando ideas en código funcional.']} />
            </span>
          </h1>

          <Link href="/sobre-mi" className="group relative inline-block">
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-yellow group-hover:border-pink group-hover:shadow-pink-glow transition-all duration-500">
              <Image
                src="/image-perfil.jpeg"
                alt="Ezequiel Orazi - Desarrollador Fullstack"
                width={176}
                height={176}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <p className="mt-3 text-sm text-muted animate-bounce">Haz click sobre la imagen</p>
          </Link>

          <p className="text-muted max-w-2xl text-base md:text-lg leading-relaxed">
            Soy desarrollador fullstack con foco en aplicaciones web modernas, escalables y
            optimizadas para negocio. En este portafolio vas a encontrar proyectos reales,
            tecnologías que utilizo a diario y experiencia aplicada a resultados concretos. Busco
            oportunidades remotas donde pueda aportar valor, crecer profesionalmente y construir
            productos digitales de calidad.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/proyectos"
              className="bg-dark text-yellow font-bold px-6 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
            >
              Ver proyectos
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-dark text-dark font-bold px-6 py-3 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300"
            >
              Contactarme
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Services */}
      <Services />

      {/* Latest Posts */}
      <section className="bg-light py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-dark font-bold text-2xl md:text-3xl">Últimos posts del blog</h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-pink hover:underline underline-offset-4 transition-colors"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
