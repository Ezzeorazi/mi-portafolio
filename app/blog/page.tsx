import type { Metadata } from 'next';
import BlogContent from '@/components/BlogContent';
import { getAllPosts, getCategories } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos de desarrollo web por Ezequiel Orazi: JavaScript, React, Next.js, CSS, Docker, Node.js, IA y más.',
  alternates: { canonical: 'https://ezequiel-orazi.online/blog' },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return <BlogContent posts={posts} categories={categories} />;
}
