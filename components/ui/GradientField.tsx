import { cn } from '@/lib/utils';

export type GradientVariant = 'hero' | 'panel' | 'cta';

// Teal-glow top-left, copper bottom-right, deep teal centre — over ink.
const layers: Record<GradientVariant, string> = {
  hero: [
    'radial-gradient(55% 50% at 12% 8%, rgb(31 107 95 / 0.55), transparent 70%)',
    'radial-gradient(45% 45% at 92% 88%, rgb(184 103 58 / 0.5), transparent 70%)',
    'radial-gradient(70% 60% at 55% 45%, rgb(15 59 54 / 0.65), transparent 80%)',
  ].join(', '),
  panel: [
    'radial-gradient(60% 70% at 0% 100%, rgb(31 107 95 / 0.6), transparent 70%)',
    'radial-gradient(55% 60% at 100% 0%, rgb(184 103 58 / 0.45), transparent 70%)',
  ].join(', '),
  cta: [
    'radial-gradient(50% 80% at 50% 120%, rgb(184 103 58 / 0.6), transparent 70%)',
    'radial-gradient(60% 60% at 10% 0%, rgb(31 107 95 / 0.5), transparent 70%)',
  ].join(', '),
};

export default function GradientField({
  variant = 'hero',
  solid = true,
  className,
}: {
  variant?: GradientVariant;
  solid?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', solid && 'bg-ink', className)}
    >
      <div className="absolute -inset-[12%] animate-drift" style={{ backgroundImage: layers[variant] }} />
      <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
