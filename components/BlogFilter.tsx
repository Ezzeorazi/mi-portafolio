'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
      <div className="flex flex-wrap gap-2 mb-10">
        {['Todos', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
              active === cat
                ? 'bg-yellow text-dark border-yellow'
                : 'border-muted/40 text-muted hover:border-yellow hover:text-dark'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((post, i) => (
          <motion.div
            key={`${post.id}-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.07 }}
          >
            <ArticleCard post={post} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
