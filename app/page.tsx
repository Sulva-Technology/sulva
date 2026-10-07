import Link from 'next/link';
import { unstable_rethrow } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import HeroShowcase from '@/components/home/HeroShowcase';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import InsightCard, { type InsightListItem } from '@/components/InsightCard';
import StructuredData from '@/components/StructuredData';
import Button from '@/components/ui/Button';
import GradientField from '@/components/ui/GradientField';
import Reveal from '@/components/ui/Reveal';
import Section, { Eyebrow } from '@/components/ui/Section';
import FeaturedCaseStudy from '@/components/work/FeaturedCaseStudy';
import WorkCard from '@/components/work/WorkCard';
import { fetchPublishedInsights } from '@/lib/insights';
import { reportError } from '@/lib/monitoring';
import { getServiceExamples, services } from '@/lib/services';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import { createClient } from '@/lib/supabase/server';
import { caseStudies, getFeaturedCaseStudy, getOtherCaseStudies } from '@/lib/work';

export const metadata = buildMetadata({
  title: 'Websites that grow your brand',
  description:
    'Sulva Tech designs and builds websites, online stores and the systems behind them for founders and growing businesses. Every site comes with its own dashboard.',
  path: '/',
  keywords: ['web design agency Lagos', 'website with admin dashboard', 'Meal Direct'],
});

const steps = [
  { title: 'Call', body: 'A 30-minute call about your business, what you need, and what it should cost.' },
  { title: 'Plan & quote', body: 'A written plan: pages, features, price. You approve it before we start.' },
  { title: 'Design & build', body: 'You see designs first, then a working site you can click through as we build.' },
  { title: 'Launch & look after', body: 'We launch, walk you through your dashboard, and stay on hand for changes.' },
];

async function getLatestInsights(): Promise<InsightListItem[]> {
  try {
    const supabase = await createClient();
    const { data } = await fetchPublishedInsights(supabase);
    return (data as InsightListItem[]).slice(0, 3);
  } catch (error) {
    unstable_rethrow(error); // let Next's dynamic-rendering signal through; only report real failures
    reportError(error, { scope: 'home.insights' });
    return [];
  }
}

export default async function Home() {
  const featured = getFeaturedCaseStudy();
  const others = getOtherCaseStudies();
  const insights = await getLatestInsights();
  const serviceItems = services.map((service) => ({ service, example: getServiceExamples(service)[0] }));

  return (
    <>
      <StructuredData data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }])} />

      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink px-5 pb-8 pt-32 text-white md:px-10 md:pb-10 md:pt-40">
        <GradientField variant="hero" solid={false} className="-z-10 opacity-80" />
        <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col">
          <Eyebrow tone="ink">Sulva — Lagos, Nigeria</Eyebrow>
          <h1 className="display-xl mt-6 max-w-5xl">Websites that grow your brand.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            We design and build websites — and the systems behind them — for founders and growing businesses. Every
            site comes with its own dashboard, so you run it, not us.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact">Start a project</Button>
            <Button href="/work" variant="secondary">
              See our work
            </Button>
          </div>
          <HeroShowcase studies={caseStudies} />
        </div>
      </section>

      <FeaturedCaseStudy study={featured} />

      <Section tone="ink" gradient="panel" eyebrow="02 — What we do">
        <h2 className="display-lg max-w-3xl">Three things, done properly.</h2>
        <div className="mt-14">
          <ServicesShowcase items={serviceItems} />
        </div>
      </Section>

      <Section tone="paper" eyebrow="03 — More work">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg max-w-3xl">Live sites, real businesses.</h2>
          <Link href="/work" className="inline-flex items-center gap-2 font-medium text-ink underline decoration-copper underline-offset-4">
            All work <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {others.map((study, index) => (
            <Reveal key={study.slug} delay={(index % 2) * 0.08}>
              <WorkCard study={study} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" className="border-t border-ink/10" eyebrow="04 — How we work">
        <h2 className="display-lg max-w-3xl">From first call to launch.</h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="font-mono text-sm text-copper">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {insights.length > 0 ? (
        <Section tone="paper" className="border-t border-ink/10" eyebrow="05 — Insights">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-lg max-w-3xl">Notes on building websites that work.</h2>
            <Link href="/insights" className="inline-flex items-center gap-2 font-medium text-ink underline decoration-copper underline-offset-4">
              All insights <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {insights.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
