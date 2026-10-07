import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import Section, { Eyebrow } from '@/components/ui/Section';
import { buildMetadata, siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Careers',
  description: "Sulva Tech isn't hiring right now. If you design or build for the web, send us your work.",
  path: '/careers',
});

export default function CareersPage() {
  return (
    <Section tone="ink" gradient="hero" className="flex min-h-[80vh] items-center pt-40">
      <GlassPanel className="max-w-2xl p-8 md:p-12">
        <Eyebrow tone="ink">Careers</Eyebrow>
        <h1 className="display-lg mt-4">Work with us.</h1>
        <p className="mt-6 text-lg leading-8 text-white/75">
          We&apos;re not hiring right now. If you design or build for the web and want to be on our radar, send your
          work to {siteConfig.careersEmail}.
        </p>
        <div className="mt-8">
          <Button href={`mailto:${siteConfig.careersEmail}`}>Send your work</Button>
        </div>
      </GlassPanel>
    </Section>
  );
}
