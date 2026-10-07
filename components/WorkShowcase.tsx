'use client';

import { useState } from 'react';
import { chipClasses } from '@/components/ui/Chip';
import WorkCard from '@/components/work/WorkCard';
import { filterCaseStudies, workCategories, type CaseStudy, type WorkCategory } from '@/lib/work';

export default function WorkShowcase({ studies }: { studies: CaseStudy[] }) {
  const [category, setCategory] = useState<WorkCategory>('All');
  const visible = filterCaseStudies(studies, category);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {workCategories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={item === category}
            onClick={() => setCategory(item)}
            className={chipClasses({ active: item === category, tone: 'light' })}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {visible.map((study) => (
          <WorkCard key={study.slug} study={study} detailed />
        ))}
      </div>
    </>
  );
}
