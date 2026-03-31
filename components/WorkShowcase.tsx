'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, TrendingUp } from 'lucide-react';

type Project = {
  title: string;
  category: string;
  filter: string;
  desc: string;
  outcome: string;
};

const filters = ['All', 'Web', 'Systems', 'UX', 'Content'] as const;

export default function WorkShowcase({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.filter === activeFilter);
  }, [activeFilter, projects]);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-6 border-b border-gray-200 py-4 sm:flex-row">
        <h2 className="font-heading text-2xl font-bold text-text-main">Delivery Themes</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-gray-100 text-text-muted hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <div
            key={project.title}
            className="group flex flex-col gap-5 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="rounded-[1.5rem] bg-gradient-to-br from-primary/10 via-white to-background-dark/5 p-6">
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold tracking-[0.2em] text-primary shadow-sm">
                {project.category}
              </span>
              <div className="mt-8 flex items-end justify-between gap-4">
                <h3 className="font-heading text-2xl font-bold text-text-main">{project.title}</h3>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
            <p className="text-sm leading-7 text-text-muted">{project.desc}</p>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-700">
              <span className="font-bold text-text-main">Outcome:</span> {project.outcome}
            </div>
            <div className="mt-auto flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                <BadgeCheck size={16} />
                Premium execution
              </span>
              <Link href="/services" className="inline-flex items-center text-sm font-bold text-primary">
                Related service <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-text-muted">
          No projects match this category yet.
        </div>
      ) : null}

      <div className="mb-12 rounded-[2rem] border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-heading text-3xl font-black text-text-main md:text-4xl">
            Need your next release to feel more premium and more effective?
          </h2>
          <p className="text-lg leading-8 text-text-muted">
            If you want a sharper website, stronger product surface, or a better operating system behind the scenes, we can help map the next move.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white shadow-lg transition-all hover:bg-primary-dark"
          >
            Start a project
          </Link>
        </div>
      </div>
    </>
  );
}

