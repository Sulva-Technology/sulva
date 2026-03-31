import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import WorkShowcase from '@/components/WorkShowcase';

export const metadata = buildMetadata({
  title: 'Work',
  description:
    'Explore the kinds of websites, systems, and growth-focused digital products Sulva Tech helps teams design and ship.',
  path: '/work',
  keywords: ['case studies', 'digital product work', 'website portfolio'],
});

const projects = [
  {
    title: 'Growth Websites',
    category: 'Marketing Systems',
    filter: 'Web',
    desc: 'Launch surfaces and company websites structured to improve trust, lead quality, and search discoverability.',
    outcome: 'Sharper positioning and higher-conviction buyer journeys.',
  },
  {
    title: 'Operations Platforms',
    category: 'Internal Software',
    filter: 'Systems',
    desc: 'Workflow software and dashboards that reduce manual reporting, routing, and fragmented team processes.',
    outcome: 'Cleaner operations and better reporting visibility.',
  },
  {
    title: 'Brand-Led Product Surfaces',
    category: 'Product UX',
    filter: 'UX',
    desc: 'Digital experiences where design systems, messaging, and usability work together instead of competing.',
    outcome: 'A more premium user experience with less friction.',
  },
  {
    title: 'Insight Engines',
    category: 'Content Infrastructure',
    filter: 'Content',
    desc: 'Publishing systems that turn internal expertise into repeatable organic growth and thought leadership.',
    outcome: 'A stronger content-to-demand pipeline.',
  },
];

export default function WorkPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
  ]);

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <StructuredData data={breadcrumbJsonLd} />

      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-surface-dark px-6 py-20 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(105,13,171,0.45),_transparent_35%),linear-gradient(135deg,rgba(26,16,34,1),rgba(45,27,54,1))]" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white/80">
              Selected work
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Work that helps teams look sharper and operate better.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-200 sm:text-lg">
              We design for momentum: stronger trust, better system behavior, and clearer next steps for the people using the product.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-primary shadow-xl transition hover:bg-slate-100"
            >
              Discuss your project
            </Link>
          </div>
        </div>

        <WorkShowcase projects={projects} />
      </div>
    </div>
  );
}
