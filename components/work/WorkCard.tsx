import { ArrowUpRight } from 'lucide-react';
import GradientField from '@/components/ui/GradientField';
import VideoFrame from '@/components/ui/VideoFrame';
import type { CaseStudy } from '@/lib/work';

export default function WorkCard({ study, detailed = false }: { study: CaseStudy; detailed?: boolean }) {
  return (
    <a href={study.url} target="_blank" rel="noopener noreferrer" className="group block rounded-card">
      <div className="relative isolate overflow-hidden rounded-card bg-ink p-2">
        <GradientField variant="panel" className="-z-10" />
        <VideoFrame
          src={study.media.video}
          poster={study.media.poster}
          alt={`${study.name} website`}
          playOn="hover"
          framed={false}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-ink">{study.name}</h3>
          <p className="mt-1 text-[15px] leading-6 text-muted">{study.oneLiner}</p>
        </div>
        <span className="mt-1 shrink-0 font-mono text-xs text-muted">{study.category}</span>
      </div>
      {detailed ? <p className="mt-3 text-[15px] leading-7 text-ink/80">{study.whatWeDid}</p> : null}
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ink">
        Visit site
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}
