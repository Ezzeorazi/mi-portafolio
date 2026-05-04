import Link from 'next/link';
import { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  price?: string;
  badge?: string;
  delay?: number;
  href?: string;
}

export default function ServiceCard({ title, description, icon, price, badge, delay = 0, href }: ServiceCardProps) {
  const inner = (
    <div className="bg-dark/80 border border-yellow/20 rounded-xl p-6 h-full flex flex-col gap-3 hover:shadow-pink-glow hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
      {badge && (
        <span className="self-start text-xs font-bold uppercase tracking-widest text-dark bg-yellow px-2 py-0.5 rounded">
          {badge}
        </span>
      )}
      <div className="text-yellow text-4xl">{icon}</div>
      <h3 className="text-yellow font-bold text-lg">{title}</h3>
      <p className="text-light/80 text-sm leading-relaxed flex-1">{description}</p>
      {price && (
        <p className="text-pink font-bold text-xl mt-1">{price}</p>
      )}
      {href && (
        <span className="text-yellow text-sm font-semibold group-hover:text-pink transition-colors duration-300 mt-1">
          Ver detalles →
        </span>
      )}
    </div>
  );

  return (
    <ScrollReveal direction="flip" delay={delay} className="flex-1 min-w-[260px]">
      {href ? <Link href={href}>{inner}</Link> : inner}
    </ScrollReveal>
  );
}
