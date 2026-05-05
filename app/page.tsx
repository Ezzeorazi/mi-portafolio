import type { Metadata } from 'next';
import Link from 'next/link';
import Services from '@/components/Services';
import ScrollReveal from '@/components/ScrollReveal';
import ArticleCard from '@/components/ArticleCard';
import ProjectCard from '@/components/ProjectCard';
import { getAllPosts } from '@/lib/blog';
import { projects } from '@/components/Gallery';
import { practiceProjects } from '@/components/GalleryPractice';

export const metadata: Metadata = {
  title: 'Eze Orazi | Desarrollador Fullstack — Inicio',
  description:
    'Hola, soy Ezequiel Orazi, desarrollador fullstack especializado en React, Next.js, Spring Boot y WordPress. Transformando ideas en código funcional.',
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredProjects = [...projects, ...practiceProjects].filter(
    (p) => (p as { featured?: boolean }).featured === true
  );

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen overflow-hidden bg-dark">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/mp_.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark/65" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-6">
          <h1 className="text-light font-bold text-4xl md:text-6xl max-w-3xl leading-tight">
            Hola, soy{' '}
            <span className="text-yellow">Ezequiel Orazi</span>
            <span className="text-light/90 text-2xl md:text-3xl font-medium block mt-4">
              Desarrollador Fullstack
            </span>
          </h1>
          <p className="text-light/80 max-w-2xl text-base md:text-lg leading-relaxed">
            Aplicaciones web modernas, escalables y optimizadas para negocios. React, Next.js,
            Spring Boot y WordPress.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/proyectos"
              className="bg-yellow text-dark font-bold px-6 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
            >
              Ver proyectos
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-light text-light font-bold px-6 py-3 rounded-lg hover:border-yellow hover:text-yellow transition-colors duration-300"
            >
              Contactarme
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-light/50 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Services */}
      <Services />

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="bg-dark py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-yellow font-bold text-2xl md:text-3xl">Proyectos actuales</h2>
                <Link
                  href="/proyectos"
                  className="text-sm font-semibold text-pink hover:underline underline-offset-4 transition-colors"
                >
                  Ver todos →
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 justify-center">
                {featuredProjects.map((p, i) => (
                  <ProjectCard key={`${p.id}-${p.title}`} {...p} delay={i * 0.05} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="bg-light py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-dark font-bold text-2xl md:text-3xl">Últimos posts del blog</h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-muted underline underline-offset-4 hover:text-dark transition-colors"
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
