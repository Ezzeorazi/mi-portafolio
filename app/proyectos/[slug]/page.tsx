import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Ezequiel Orazi`,
    description: project.description,
    alternates: { canonical: `https://ezequiel-orazi.online/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.title} | Ezequiel Orazi`,
      description: project.description,
      images: [{ url: `/${project.image}`, width: 1200, height: 630, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      {/* Back */}
      <Link
        href="/proyectos"
        className="text-sm text-muted hover:text-dark transition-colors duration-300 mb-6 inline-block font-medium"
      >
        ← Volver a proyectos
      </Link>

      {/* Hero image */}
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 mt-4">
        <Image
          src={`/${project.image}`}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {/* Title & description */}
      <h1 className="text-dark font-bold text-2xl md:text-4xl mb-4 leading-tight">
        {project.title}
      </h1>
      <p className="text-muted text-lg mb-6 leading-relaxed">{project.description}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs bg-yellow/10 text-yellow border border-yellow/20 px-3 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-12">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm bg-yellow text-dark font-bold px-5 py-2.5 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
          >
            <FaExternalLinkAlt className="text-xs" /> Ver sitio
          </a>
        )}
        {project.privateDemo && (
          <span className="flex items-center gap-2 text-sm border border-yellow/20 text-yellow/50 px-5 py-2.5 rounded-lg cursor-default">
            <FaLock className="text-xs" /> Demo privada · disponible a pedido
          </span>
        )}
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm border border-yellow/40 text-yellow px-4 py-2.5 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300"
          >
            <FaGithub /> Ver repositorio
          </a>
        )}
      </div>

      {/* Case study blocks */}
      {caseStudy && (
        <div className="bg-dark rounded-xl p-6 md:p-10 space-y-12">
          {/* Block 1: Problem */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-pink flex items-center justify-center text-white font-bold text-sm shrink-0">
                1
              </span>
              <h2 className="text-yellow font-bold text-xl">El problema del cliente</h2>
            </div>
            <p className="text-light/80 leading-relaxed">{caseStudy.problem}</p>
          </section>

          {/* Block 2: Technical decisions */}
          {caseStudy.decisions.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-pink flex items-center justify-center text-white font-bold text-sm shrink-0">
                  2
                </span>
                <h2 className="text-yellow font-bold text-xl">Decisiones técnicas</h2>
              </div>
              <div className="space-y-5">
                {caseStudy.decisions.map((d, i) => (
                  <div key={i} className="border-l-2 border-yellow/30 pl-4">
                    <h3 className="text-light font-semibold text-sm mb-1">{d.title}</h3>
                    <p className="text-light/70 text-sm leading-relaxed">{d.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Block 3: Results */}
          {caseStudy.results.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-pink flex items-center justify-center text-white font-bold text-sm shrink-0">
                  3
                </span>
                <h2 className="text-yellow font-bold text-xl">Resultados</h2>
              </div>
              <ul className="space-y-3">
                {caseStudy.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-light/80 text-sm leading-relaxed">
                    <span className="text-pink mt-0.5 shrink-0">→</span>
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 pt-8 border-t border-muted/20 text-center">
        <p className="text-muted mb-4 text-lg">¿Tenés un proyecto parecido?</p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-2 bg-yellow text-dark font-bold px-6 py-3 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
        >
          Hablemos
        </Link>
      </div>

      {/* Footer nav */}
      <div className="mt-10">
        <Link
          href="/proyectos"
          className="text-muted hover:text-dark transition-colors duration-300 font-medium"
        >
          ← Volver a proyectos
        </Link>
      </div>
    </article>
  );
}
