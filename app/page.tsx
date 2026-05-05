import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
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

  return <HomeContent latestPosts={latestPosts} featuredProjects={featuredProjects} />;
}
