'use client';

import VideoFrame from '@/components/ui/VideoFrame';
import { useTabs } from '@/components/ui/useTabs';
import { cn } from '@/lib/utils';
import type { Service } from '@/lib/services';
import type { CaseStudy } from '@/lib/work';

type Item = { service: Service; example: CaseStudy };

export default function ServicesShowcase({ items }: { items: Item[] }) {
  const { active, select, onKeyDown, tabRefs } = useTabs(items.length);
  const current = items[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      <div role="tablist" aria-label="What we do" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col gap-3">
        {items.map(({ service }, index) => (
          <button
            key={service.slug}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`service-tab-${service.slug}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="service-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => select(index)}
            className={cn(
              'glass rounded-card p-6 text-left transition-opacity duration-200',
              index === active ? 'ring-1 ring-white/30' : 'opacity-60 hover:opacity-100',
            )}
          >
            <span className="font-mono text-xs text-white/50">0{index + 1}</span>
            <span className="mt-2 block text-2xl font-medium tracking-tight text-white">{service.name}</span>
            <span className="mt-2 block text-[15px] leading-6 text-white/70">{service.summary}</span>
          </button>
        ))}
      </div>
      <div id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${current.service.slug}`}>
        <VideoFrame
          key={current.example.slug}
          src={current.example.media.video}
          poster={current.example.media.poster}
          alt={`${current.example.name} website`}
        />
        <p className="mt-4 text-sm text-white/60">
          Example: <span className="text-white">{current.example.name}</span> — {current.example.oneLiner}
        </p>
      </div>
    </div>
  );
}
