import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';

export default function CtaBand({
  title = 'Your brand deserves a better website.',
  sub,
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <Section tone="ink" gradient="cta" className="py-28 md:py-40" containerClassName="text-center">
      <h2 className="display-lg mx-auto max-w-3xl">{title}</h2>
      {sub ? <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/75">{sub}</p> : null}
      <div className="mt-10 flex flex-col items-center gap-4">
        <Button href="/contact">Start a project</Button>
        <a href={`mailto:${siteConfig.email}`} className="text-sm text-white/60 transition-colors hover:text-white">
          {siteConfig.email}
        </a>
      </div>
    </Section>
  );
}
