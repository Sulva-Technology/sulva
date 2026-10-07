import CtaBand from '@/components/CtaBand';
import StructuredData from '@/components/StructuredData';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import FeaturedCaseStudy from '@/components/work/FeaturedCaseStudy';
import WorkShowcase from '@/components/WorkShowcase';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import { caseStudies, getFeaturedCaseStudy } from '@/lib/work';

export const metadata = buildMetadata({
  title: 'Work',
  description:
    'Live websites and platforms we designed and built: Meal Direct, Itzlolabeauty, theDMAshop, Mindfire Homes, Olorunleke Ojuolape and The Inner Circle.',
  path: '/work',
  keywords: ['web design portfolio Nigeria', 'Meal Direct', 'Mindfire Homes website'],
});

export default function WorkPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <PageHero eyebrow="Work" title="Work we're proud of." sub="Real businesses, live sites. Click through and try them." />
      <FeaturedCaseStudy study={getFeaturedCaseStudy()} eyebrow="Featured" />
      <Section tone="paper" className="border-t border-ink/10" eyebrow="All projects">
        <WorkShowcase studies={caseStudies} />
      </Section>
      <CtaBand />
    </>
  );
}
