import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import GradientField, { type GradientVariant } from '@/components/ui/GradientField';

export type SectionTone = 'ink' | 'paper';

export function Eyebrow({
  children,
  tone = 'paper',
  className,
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
}) {
  return (
    <p className={cn('font-mono text-xs tracking-wide', tone === 'ink' ? 'text-white/60' : 'text-muted', className)}>
      {children}
    </p>
  );
}

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  gradient?: GradientVariant;
  eyebrow?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export default function Section({
  id,
  tone = 'paper',
  gradient,
  eyebrow,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative isolate overflow-hidden px-5 py-24 md:px-10 md:py-32',
        tone === 'ink' ? 'bg-ink text-white' : 'bg-paper text-ink',
        className,
      )}
    >
      {gradient ? <GradientField variant={gradient} className="-z-10" /> : null}
      <div className={cn('mx-auto w-full max-w-[1240px]', containerClassName)}>
        {eyebrow ? (
          <Eyebrow tone={tone} className="mb-8">
            {eyebrow}
          </Eyebrow>
        ) : null}
        {children}
      </div>
    </section>
  );
}
