import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section tone="ink" gradient="hero" className="flex min-h-[80vh] items-center pt-40">
      <p className="font-mono text-sm text-white/60">404</p>
      <h1 className="display-lg mt-4 max-w-3xl">This page wandered off.</h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Home</Button>
        <Button href="/work" variant="secondary">
          See our work
        </Button>
      </div>
    </Section>
  );
}
