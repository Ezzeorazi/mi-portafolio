'use client';
import Link from 'next/link';
import Services from '@/components/Services';
import ScrollReveal from '@/components/ScrollReveal';
import ArticleCard from '@/components/ArticleCard';
import ProjectCard from '@/components/ProjectCard';
import { useTranslation } from '@/hooks/useTranslation';
import type { Post } from '@/data/posts';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  featured?: boolean;
}

interface HomeContentProps {
  latestPosts: Post[];
  featuredProjects: Project[];
}

export default function HomeContent({ latestPosts, featuredProjects }: HomeContentProps) {
  const { t } = useTranslation();

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
            {t('home_hero_greeting')}{' '}
            <span className="text-yellow">Ezequiel Orazi</span>
            <span className="text-light/90 text-2xl md:text-3xl font-medium block mt-4">
              {t('home_hero_role')}
            </span>
          </h1>
          <p className="text-light/80 max-w-2xl text-base md:text-lg leading-relaxed">
            {t('home_hero_desc')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/proyectos"
              className="bg-yellow text-dark font-bold px-6 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
            >
              {t('home_cta_projects')}
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-light text-light font-bold px-6 py-3 rounded-lg hover:border-yellow hover:text-yellow transition-colors duration-300"
            >
              {t('home_cta_contact')}
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
                <h2 className="text-yellow font-bold text-2xl md:text-3xl">
                  {t('home_featured_heading')}
                </h2>
                <Link
                  href="/proyectos"
                  className="text-sm font-semibold text-pink hover:underline underline-offset-4 transition-colors"
                >
                  {t('home_see_all')}
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
              <h2 className="text-dark font-bold text-2xl md:text-3xl">
                {t('home_blog_heading')}
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold text-muted underline underline-offset-4 hover:text-dark transition-colors"
              >
                {t('home_see_all')}
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
