import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  delay?: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  liveLink,
  repoLink,
  delay = 0,
}: ProjectCardProps) {
  return (
    <ScrollReveal direction="flip" delay={delay} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]">
      <div className="bg-dark rounded-xl overflow-hidden border border-yellow/10 hover:shadow-pink-glow hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={`/${image}`}
            alt={title}
            fill
            className="object-cover hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 3rem), 314px"
          />
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3 className="text-yellow font-bold text-lg">{title}</h3>
          <p className="text-light/70 text-sm leading-relaxed flex-1">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-yellow/10 text-yellow border border-yellow/20 px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-2">
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm bg-yellow text-dark font-bold px-4 py-2 rounded-lg hover:bg-pink hover:text-white transition-colors duration-300"
              >
                <FaExternalLinkAlt className="text-xs" /> Ver sitio
              </a>
            )}
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver repositorio en GitHub"
                className="flex items-center gap-1.5 text-sm border border-yellow/40 text-yellow px-3 py-2 rounded-lg hover:border-pink hover:text-pink transition-colors duration-300"
              >
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
