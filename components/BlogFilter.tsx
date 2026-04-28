'use client';
import { useState } from 'react';
import ArticleCard from './ArticleCard';
import type { Post } from '@/data/posts';

interface BlogFilterProps {
  posts: Post[];
  categories: string[];
}

export default function BlogFilter({ posts, categories }: BlogFilterProps) {
  const [active, setActive] = useState('Todos');

  const filtered = active === 'Todos' ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['Todos', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
              active === cat
                ? 'bg-yellow text-dark border-yellow'
                : 'border-yellow/40 text-yellow hover:border-pink hover:text-pink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
