import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ChipTone = 'dark' | 'light';

export function chipClasses({
  active = false,
  tone = 'dark',
  className,
}: { active?: boolean; tone?: ChipTone; className?: string } = {}) {
  const toneClasses =
    tone === 'dark'
      ? active
        ? 'bg-white text-ink'
        : 'glass text-white/80 hover:text-white'
      : active
        ? 'bg-ink text-white'
        : 'border border-ink/15 bg-paper-raised text-ink/75 hover:text-ink';
  return cn(
    'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm transition-colors duration-200',
    toneClasses,
    className,
  );
}

export default function Chip({
  active,
  tone,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { active?: boolean; tone?: ChipTone }) {
  return <span className={chipClasses({ active, tone, className })} {...props} />;
}
