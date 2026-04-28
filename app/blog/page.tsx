import type { Metadata } from 'next';
import BlogFilter from '@/components/BlogFilter';
import { getAllPosts, getCategories } from '@/lib/blog';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos de desarrollo web por Ezequiel Orazi: JavaScript, React, Next.js, CSS, Docker, Node.js, IA y más.',
  alternates: { canonical: 'https://ezequiel-orazi.online/blog' },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3">Blog</h1>
        <p className="text-muted mb-10">
          Artículos sobre desarrollo web, buenas prácticas e inteligencia artificial.
        </p>
      </ScrollReveal>

      <BlogFilter posts={posts} categories={categories} />
    </section>
  );
}
