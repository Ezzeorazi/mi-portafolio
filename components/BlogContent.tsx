'use client';
import BlogFilter from '@/components/BlogFilter';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslation } from '@/hooks/useTranslation';
import type { Post } from '@/data/posts';

interface BlogContentProps {
  posts: Post[];
  categories: string[];
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
  const { t } = useTranslation();

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <ScrollReveal direction="left">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3">{t('blog_title')}</h1>
        <p className="text-muted mb-10">{t('blog_desc')}</p>
      </ScrollReveal>

      <BlogFilter posts={posts} categories={categories} />
    </section>
  );
}
