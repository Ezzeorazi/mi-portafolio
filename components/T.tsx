'use client';
import { useTranslation } from '@/hooks/useTranslation';

export default function T({ k }: { k: string }) {
  const { t } = useTranslation();
  return <>{t(k)}</>;
}
