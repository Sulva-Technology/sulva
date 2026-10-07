import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import StructuredData from '@/components/StructuredData';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import Section from '@/components/ui/Section';
import WorkCard from '@/components/work/WorkCard';
import { getService, getServiceExamples, processSteps, services } from '@/lib/services';
import { absoluteUrl, buildBreadcrumbJsonLd, buildFaqJsonLd, buildMetadata, organizationId, siteConfig } from '@/lib/site';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
    image: getServiceExamples(service)[0].media.poster,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const examples = getServiceExamples(service);
  const otherServices = services.filter((item) => item.slug !== service.slug);
  const path = `/services/${service.slug}`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: service.name,
    serviceType: service.seoTitle,
    description: service.seoDescription,
    url: absoluteUrl(path),
    provider: { '@id': organizationId, '@type': 'ProfessionalService', name: siteConfig.name, url: siteConfig.url },
    areaServed: [{ '@type': 'Country', name: 'Nigeria' }, 'Worldwide'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `What's included: ${service.name}`,
      itemListElement: service.deliverables.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };

  return (
    <>
      <StructuredData
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.name, path },
        ])}
      />
      <StructuredData data={serviceJsonLd} />
      <StructuredData data={buildFaqJsonLd(service.faqs)} />

      <PageHero eyebrow={`Services — ${service.name}`} title={service.headline} sub={service.summary} />

      <Section tone="paper">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="space-y-6 text-xl leading-9 text-ink/85">
            {service.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl font-medium tracking-tight">What&apos;s included</h2>
            <p className="mt-2 font-mono text-xs text-muted">{service.forWho}</p>
            <ul className="mt-6 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6">
                  <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-copper" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" className="border-t border-ink/10" eyebrow="Examples">
        <h2 className="display-md max-w-3xl">{examples.length > 1 ? 'Live sites we built.' : 'A live platform we built.'}</h2>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {examples.map((study, index) => (
            <Reveal key={study.slug} delay={(index % 2) * 0.08}>
              <WorkCard study={study} detailed />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" className="border-t border-ink/10" eyebrow="How we work">
        <h2 className="display-md max-w-3xl">From first call to launch.</h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <span className="font-mono text-sm text-copper">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" className="border-t border-ink/10" eyebrow="Questions">
        <h2 className="display-md max-w-3xl">Common questions.</h2>
        <dl className="mt-14 grid max-w-4xl gap-10">
          {service.faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-xl font-medium tracking-tight">{faq.question}</dt>
              <dd className="mt-2 text-[15px] leading-7 text-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="paper" className="border-t border-ink/10" eyebrow="Also from Sulva">
        <ul className="grid gap-8 md:grid-cols-2">
          {otherServices.map((item) => (
            <li key={item.slug}>
              <Link href={`/services/${item.slug}`} className="group block">
                <h2 className="text-2xl font-medium tracking-tight">{item.name}</h2>
                <p className="mt-2 text-[15px] leading-7 text-muted">{item.summary}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-copper underline-offset-4">
                  More about {item.name.toLowerCase()} <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title="Tell us what you're building." sub="We reply within 1 working day." />
    </>
  );
}
