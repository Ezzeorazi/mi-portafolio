import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/data/posts';

interface ArticleCardProps {
  post: Post;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-dark rounded-xl overflow-hidden border border-yellow/10 hover:shadow-pink-glow hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={`/${post.image}`}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
        <div className="p-5 flex flex-col gap-2 flex-1">
          <span className="text-xs text-pink font-semibold uppercase tracking-wide">
            {post.category}
          </span>
          <h3 className="text-yellow font-bold text-base leading-snug group-hover:text-pink transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-light/70 text-sm leading-relaxed flex-1">{post.description}</p>
          <div className="flex items-center gap-3 text-xs text-light/50 mt-2">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.ReadingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
