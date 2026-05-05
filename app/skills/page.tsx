import type { Metadata } from 'next';
import SkillsContent from '@/components/SkillsContent';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Habilidades técnicas de Ezequiel Orazi: React, Next.js, Node.js, Java/Spring Boot, SQL, WordPress, SEO y más.',
  alternates: { canonical: 'https://ezequiel-orazi.online/skills' },
};

export default function SkillsPage() {
  return <SkillsContent />;
}
