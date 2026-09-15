'use client';
import Link from 'next/link';
import Services from '@/components/Services';
import HomeFAQ from '@/components/HomeFAQ';
import ScrollReveal from '@/components/ScrollReveal';
import ArticleCard from '@/components/ArticleCard';
import ProjectCard from '@/components/ProjectCard';
import { useTranslation } from '@/hooks/useTranslation';
import { FaBriefcase, FaFileDownload, FaUserTie } from 'react-icons/fa';
import type { Post } from '@/data/posts';

interface Project {
  id: number;
  slug?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  privateDemo?: boolean;
  featured?: boolean;
  caseStudy?: unknown;
}

interface HomeStats {
  projects: number;
  years: number;
  posts: number;
}

interface HomeContentProps {
  latestPosts: Post[];
  noticias: Post[];
  featuredProjects: Project[];
  stats: HomeStats;
}

const CV_PDF = '/pdf/Ezequiel_Orazi-CV.pdf';
const CALENDLY = 'https://calendly.com/ezequiel-orazi90/30min';

export default function HomeContent({ latestPosts, noticias, featuredProjects, stats }: HomeContentProps) {
  const { t } = useTranslation();

  const statItems = [
    { value: String(stats.projects), label: t('home_stats_projects') },
    { value: `${stats.years}+`, label: t('home_stats_years') },
    { value: String(stats.posts), label: t('home_stats_posts') },
  ];

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
          <source src="/media/mp_.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark/65" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-6">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-light/90 bg-dark/60 border border-green-400/40 px-4 py-1.5 rounded-full">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            {t('home_hero_available')}
          </span>
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
            <a
              href={CV_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-light/40 text-light/90 font-bold px-6 py-3 rounded-lg hover:border-yellow hover:text-yellow transition-colors duration-300"
            >
              <FaFileDownload aria-hidden="true" /> {t('home_cta_cv')}
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-light/50 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Dual audience: recruiters vs. clients */}
      <section className="bg-dark px-4 pt-16 pb-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal direction="up">
            <div className="h-full bg-gradient-to-br from-yellow/10 via-dark to-dark border border-yellow/30 rounded-2xl p-8 flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 text-yellow text-2xl" aria-hidden="true">
                <FaUserTie />
              </span>
              <h2 className="text-light font-bold text-xl md:text-2xl">
                {t('home_audience_recruiter_title')}
              </h2>
              <p className="text-light/70 text-sm md:text-base leading-relaxed flex-1">
                {t('home_audience_recruiter_desc')}
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  href="/curriculum"
                  className="bg-yellow text-dark font-bold px-5 py-2.5 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 text-sm"
                >
                  {t('home_audience_recruiter_cta')}
                </Link>
                <a
                  href={CV_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-yellow/50 text-yellow font-bold px-5 py-2.5 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300 text-sm"
                >
                  <FaFileDownload aria-hidden="true" /> {t('home_audience_recruiter_cta2')}
                </a>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="h-full bg-gradient-to-br from-pink/15 via-dark to-dark border border-pink/30 rounded-2xl p-8 flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 text-pink text-2xl" aria-hidden="true">
                <FaBriefcase />
              </span>
              <h2 className="text-light font-bold text-xl md:text-2xl">
                {t('home_audience_client_title')}
              </h2>
              <p className="text-light/70 text-sm md:text-base leading-relaxed flex-1">
                {t('home_audience_client_desc')}
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  href="/services"
                  className="bg-pink text-white font-bold px-5 py-2.5 rounded-lg hover:bg-yellow hover:text-dark transition-colors duration-300 text-sm"
                >
                  {t('home_audience_client_cta')}
                </Link>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-pink/50 text-pink font-bold px-5 py-2.5 rounded-lg hover:border-yellow hover:text-yellow transition-colors duration-300 text-sm"
                >
                  {t('home_audience_client_cta2')}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats (computed from real site data) */}
      <section className="bg-dark px-4 pt-10 pb-4">
        <ScrollReveal direction="fade">
          <dl className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statItems.map((item) => (
              <div
                key={item.label}
                className="border border-yellow/10 rounded-xl px-6 py-5 text-center bg-dark/60"
              >
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-yellow font-bold text-3xl md:text-4xl">{item.value}</dd>
                <dd className="text-light/60 text-xs md:text-sm mt-1 uppercase tracking-wide">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </section>

      {/* Featured Projects (proof first) */}
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

      {/* Services */}
      <Services />

      {/* Free SEO tool banner */}
      <section className="bg-dark px-4 pb-16">
        <ScrollReveal direction="up">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-pink/15 via-dark to-yellow/10 border border-pink/30 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark bg-yellow px-3 py-1 rounded-full mb-4">
                {t('home_seo_tool_badge')}
              </span>
              <h2 className="text-yellow font-bold text-2xl md:text-3xl mb-3">
                {t('home_seo_tool_title')}
              </h2>
              <p className="text-light/70 text-sm md:text-base leading-relaxed max-w-xl">
                {t('home_seo_tool_desc')}
              </p>
            </div>
            <Link
              href="/auditoria-seo"
              className="bg-pink text-white font-bold px-7 py-3.5 rounded-lg hover:bg-yellow hover:text-dark transition-colors duration-300 shrink-0 whitespace-nowrap"
            >
              {t('home_seo_tool_cta')}
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Free security tool banner */}
      <section className="bg-dark px-4 pb-16">
        <ScrollReveal direction="up">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-yellow/10 via-dark to-pink/15 border border-yellow/30 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark bg-yellow px-3 py-1 rounded-full mb-4">
                {t('home_security_tool_badge')}
              </span>
              <h2 className="text-yellow font-bold text-2xl md:text-3xl mb-3">
                {t('home_security_tool_title')}
              </h2>
              <p className="text-light/70 text-sm md:text-base leading-relaxed max-w-xl">
                {t('home_security_tool_desc')}
              </p>
            </div>
            <Link
              href="/analisis-seguridad"
              className="bg-yellow text-dark font-bold px-7 py-3.5 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300 shrink-0 whitespace-nowrap"
            >
              {t('home_security_tool_cta')}
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <HomeFAQ />

      {/* Noticias Tech (semanario) */}
      <section className="bg-dark py-20 px-4 border-t border-yellow/10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex flex-col items-start gap-2 mb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h2 className="text-yellow font-bold text-2xl md:text-3xl flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white bg-pink px-2.5 py-1 rounded-full">
                  Semanal
                </span>
                {t('home_news_heading')}
              </h2>
              {noticias.length > 0 && (
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-pink hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                >
                  {t('home_news_cta')}
                </Link>
              )}
            </div>
            <p className="text-light/70 text-sm md:text-base leading-relaxed max-w-2xl mb-10">
              {t('home_news_desc')}
            </p>

            {noticias.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {noticias.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-pink/40 bg-gradient-to-br from-pink/10 via-dark to-yellow/5 p-8 md:p-12 text-center">
                <div className="text-4xl mb-4" aria-hidden="true">
                  📰
                </div>
                <h3 className="text-light font-bold text-xl md:text-2xl mb-3">
                  {t('home_news_empty_title')}
                </h3>
                <p className="text-light/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                  {t('home_news_empty_text')}
                </p>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

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
