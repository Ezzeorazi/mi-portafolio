import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://ezequiel-orazi.online/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Ezequiel Orazi'],
      images: [
        {
          url: `/${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/${post.image}`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  let htmlContent = '';
  try {
    const filePath = path.join(process.cwd(), 'content', post.content);
    htmlContent = await fs.readFile(filePath, 'utf-8');
  } catch {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `https://ezequiel-orazi.online/${post.image}`,
    author: {
      '@type': 'Person',
      name: 'Ezequiel Orazi',
      url: 'https://ezequiel-orazi.online',
    },
    publisher: {
      '@type': 'Person',
      name: 'Ezequiel Orazi',
    },
    datePublished: post.date,
    url: `https://ezequiel-orazi.online/blog/${post.slug}`,
    inLanguage: 'es',
    keywords: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-dark transition-colors duration-300 mb-6 inline-block font-medium"
          >
            ← Volver al blog
          </Link>

          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
            <Image
              src={`/${post.image}`}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <span className="text-xs text-pink font-semibold uppercase tracking-wide">
            {post.category}
          </span>
          <h1 className="text-dark font-bold text-2xl md:text-4xl mt-2 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted/70">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.ReadingTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-dark rounded-xl p-6 md:p-10">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-muted/20">
          <Link
            href="/blog"
            className="text-muted hover:text-dark transition-colors duration-300 font-medium"
          >
            ← Volver al blog
          </Link>
        </div>
      </article>
    </>
  );
}
