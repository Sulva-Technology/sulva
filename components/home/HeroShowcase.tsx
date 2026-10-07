'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { chipClasses } from '@/components/ui/Chip';
import { usePrefersReducedMotion } from '@/components/ui/usePrefersReducedMotion';
import { useTabs } from '@/components/ui/useTabs';
import { cn } from '@/lib/utils';
import type { CaseStudy } from '@/lib/work';

export const HERO_INTERVAL_MS = 6000;

export default function HeroShowcase({ studies }: { studies: CaseStudy[] }) {
  const { active, interacted, select, advance, onKeyDown, tabRefs } = useTabs(studies.length);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (interacted || reduceMotion || studies.length < 2) return;
    const id = window.setInterval(advance, HERO_INTERVAL_MS);
    return () => window.clearInterval(id);
    // advance is stable in behaviour (functional setState); re-run only when these change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interacted, reduceMotion, studies.length]);

  const current = studies[active];

  return (
    <>
      {/* Backdrop: one layer per project, crossfaded. Only the active layer plays video. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {studies.map((study, index) => (
          <div
            key={study.slug}
            className={cn('absolute inset-0 transition-opacity duration-500', index === active ? 'opacity-100' : 'opacity-0')}
          >
            <Image src={study.media.poster} alt="" fill priority={index === 0} sizes="100vw" className="object-cover object-top" />
            {index === active && study.media.video && !reduceMotion ? (
              <video
                key={study.slug}
                src={study.media.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : null}
          </div>
        ))}
        <div className="absolute inset-0 bg-ink/60" />
      </div>

      <div className="mt-auto pt-16">
        <div
          id="hero-project-panel"
          role="tabpanel"
          aria-labelledby={`hero-tab-${current.slug}`}
          className="glass mb-4 max-w-md rounded-card p-5"
        >
          <p className="text-sm font-medium text-white">{current.name}</p>
          <p className="mt-1 text-sm leading-6 text-white/70">{current.oneLiner}</p>
          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm text-copper-soft transition-colors hover:text-white"
          >
            View site <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div
          role="tablist"
          aria-label="Featured projects"
          onKeyDown={onKeyDown}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:px-0"
        >
          {studies.map((study, index) => (
            <button
              key={study.slug}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`hero-tab-${study.slug}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="hero-project-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => select(index)}
              className={chipClasses({ active: index === active, className: 'shrink-0' })}
            >
              {study.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
