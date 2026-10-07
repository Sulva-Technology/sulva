import { Check } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import StructuredData from '@/components/StructuredData';
import GlassPanel from '@/components/ui/GlassPanel';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import Section, { Eyebrow } from '@/components/ui/Section';
import WorkCard from '@/components/work/WorkCard';
import { getServiceExamples, services } from '@/lib/services';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import { cn } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Brand websites, online stores, and products & apps. Each comes with its own dashboard, so you run your business without waiting on us.',
  path: '/services',
  keywords: ['brand website design', 'ecommerce website Nigeria', 'web app development Lagos'],
});

export default function ServicesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <PageHero eyebrow="Services" title="What we build." sub="Three things, done properly." />

      {services.map((service, index) => {
        const [lead, ...rest] = getServiceExamples(service);
        return (
          <Section
            key={service.slug}
            id={service.slug}
            tone="paper"
            eyebrow={`0${index + 1}`}
            className={index > 0 ? 'border-t border-ink/10' : undefined}
          >
            <div className={cn('grid items-start gap-12 lg:grid-cols-2', index % 2 === 1 && 'lg:[&>*:first-child]:order-2')}>
              <Reveal>
                <h2 className="display-md">{service.name}</h2>
                <p className="mt-3 font-mono text-xs text-muted">{service.forWho}</p>
                <p className="mt-6 text-lg leading-8 text-ink/80">{service.summary}</p>
                <ul className="mt-8 space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-6">
                      <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <WorkCard study={lead} />
                {rest.length > 0 ? (
                  <p className="mt-6 text-sm text-muted">Also: {rest.map((study) => study.name).join(', ')}</p>
                ) : null}
              </Reveal>
            </div>
          </Section>
        );
      })}

      <Section tone="ink" gradient="panel">
        <GlassPanel className="mx-auto max-w-3xl p-8 md:p-12">
          <Eyebrow tone="ink">Included with every project</Eyebrow>
          <h2 className="display-md mt-4">Every site comes with a dashboard.</h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Update your content, see new enquiries and orders, and manage your business yourself — without sending us
            an email for every change.
          </p>
        </GlassPanel>
      </Section>

      <CtaBand title="Not sure which you need?" sub="Tell us what you're trying to do. We'll tell you honestly what it takes." />
    </>
  );
}
