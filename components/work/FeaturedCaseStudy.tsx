import { ArrowUpRight } from 'lucide-react';
import Chip from '@/components/ui/Chip';
import GradientField from '@/components/ui/GradientField';
import Reveal from '@/components/ui/Reveal';
import Section from '@/components/ui/Section';
import VideoFrame from '@/components/ui/VideoFrame';
import { displayDomain, type FeaturedCaseStudy as Featured } from '@/lib/work';

export default function FeaturedCaseStudy({
  study,
  eyebrow = '01 — Featured work',
}: {
  study: Featured;
  eyebrow?: string;
}) {
  return (
    <Section id={study.slug} tone="paper" eyebrow={eyebrow}>
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="font-mono text-sm text-copper">{study.name}</p>
          <h2 className="display-lg mt-3">{study.headline}</h2>
          <p className="mt-6 text-lg leading-8 text-muted">{study.problem}</p>
          <p className="mt-4 text-lg leading-8 text-ink">{study.whatWeDid}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li key={tag}>
                <Chip tone="light">{tag}</Chip>
              </li>
            ))}
          </ul>
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1 font-medium text-ink underline decoration-copper underline-offset-4"
          >
            Visit {displayDomain(study.url)} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative isolate overflow-hidden rounded-panel p-3 md:p-6">
            <GradientField variant="panel" className="-z-10" />
            <VideoFrame src={study.media.video} poster={study.media.poster} alt={`${study.name} website`} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
