import ContactForm from '@/components/ContactForm';
import GlassPanel from '@/components/ui/GlassPanel';
import GradientField from '@/components/ui/GradientField';
import { Eyebrow } from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';

const nextSteps = [
  'We reply within 1 working day.',
  'A 30-minute call about what you need.',
  'A written plan and quote.',
];

export default function ContactPage() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-ink px-5 pb-20 pt-36 text-white md:px-10 md:pt-44">
      <GradientField variant="hero" className="-z-10" />
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow tone="ink">Contact</Eyebrow>
          <h1 className="display-lg mt-6">Tell us what you&apos;re building.</h1>
          <ol className="mt-12 space-y-5">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-4 text-lg text-white/80">
                <span className="font-mono text-sm leading-7 text-copper-soft">0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <dl className="mt-12 grid gap-4 text-white/75 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <dt className="font-mono text-xs text-white/50">Email</dt>
              <dd><a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a></dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-white/50">Phone</dt>
              <dd><a href={siteConfig.phoneHref} className="hover:text-white">{siteConfig.phone}</a></dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-white/50">Based in</dt>
              <dd>{siteConfig.location}</dd>
            </div>
          </dl>
        </div>
        <GlassPanel className="p-6 md:p-8">
          <ContactForm />
        </GlassPanel>
      </div>
    </section>
  );
}
