import CtaBand from '@/components/CtaBand';
import StructuredData from '@/components/StructuredData';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import Section, { Eyebrow } from '@/components/ui/Section';
import { buildBreadcrumbJsonLd, buildMetadata, siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'About Our Web Design Studio in Lagos',
  description:
    'Sulva Tech is a web design studio in Lagos, Nigeria, founded by Iyiola Ogunjobi. We build websites, online stores and the systems behind them.',
  path: '/about',
  keywords: ['about Sulva Tech', 'Iyiola Ogunjobi', 'web studio Lagos'],
});

const principles = [
  { title: 'Straight talk.', body: "We tell you what it costs, how long it takes, and what we'd do differently." },
  { title: 'The builder is on the call.', body: 'The person you talk to is the person building it.' },
  { title: 'Built to hand over.', body: 'You run your site from your own dashboard, without calling us for every change.' },
];

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);
  const { founder } = siteConfig;

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <PageHero
        eyebrow="About"
        title="Built in Lagos, by people who ship."
        sub="Sulva Tech designs and builds websites, online stores and the systems behind them for founders and growing businesses."
      />

      <Section tone="paper">
        <Reveal className="max-w-3xl space-y-6 text-xl leading-9 text-ink/85">
          <p>
            Our clients range from a campus food-delivery startup to a real estate firm in Abuja and a makeup artist in
            Arizona. What they have in common: they needed a website that looks the part and actually does a job.
          </p>
          <p>
            One habit runs through all of it. Every client gets their own dashboard, so they can update content, see
            enquiries and orders, and run their business without waiting on us.
          </p>
        </Reveal>
      </Section>

      <Section tone="ink" gradient="panel">
        <GlassPanel className="max-w-2xl p-8 md:p-12">
          <Eyebrow tone="ink">{founder.role}</Eyebrow>
          <h2 className="display-md mt-4">{founder.name}</h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Leads design and engineering at Sulva, from the first call to launch.
          </p>
          <div className="mt-8">
            <Button href={founder.portfolio}>See my portfolio ↗</Button>
          </div>
        </GlassPanel>
      </Section>

      <Section tone="paper" eyebrow="How we work">
        <Reveal>
          <ul className="grid gap-10 md:grid-cols-3">
            {principles.map((principle) => (
              <li key={principle.title}>
                <h2 className="text-2xl font-medium tracking-tight">{principle.title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-muted">{principle.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
