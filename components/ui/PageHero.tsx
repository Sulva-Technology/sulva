import type { ReactNode } from 'react';
import Section from '@/components/ui/Section';

export default function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <Section tone="ink" gradient="hero" eyebrow={eyebrow} className="pb-20 pt-40 md:pb-28 md:pt-48">
      <h1 className="display-lg max-w-4xl">{title}</h1>
      {sub ? <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{sub}</p> : null}
      {children}
    </Section>
  );
}
