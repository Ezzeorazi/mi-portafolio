import posts, { type Post } from '@/data/posts';

export type { Post };

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const cats = new Set(posts.map((p) => p.category));
  return Array.from(cats);
}
