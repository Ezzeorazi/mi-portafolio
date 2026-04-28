import { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export default function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
  return (
    <ScrollReveal direction="flip" delay={delay} className="flex-1 min-w-[260px]">
      <div className="bg-dark/80 border border-yellow/20 rounded-xl p-6 h-full flex flex-col gap-3 hover:shadow-pink-glow hover:-translate-y-1 transition-all duration-300">
        <div className="text-yellow text-4xl">{icon}</div>
        <h3 className="text-yellow font-bold text-lg">{title}</h3>
        <p className="text-light/80 text-sm leading-relaxed">{description}</p>
      </div>
    </ScrollReveal>
  );
}
