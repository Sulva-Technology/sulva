import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code, Database, Lightbulb, PenTool } from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Built to Solve, Designed to Last',
  description:
    'Sulva Tech helps teams design, build, and grow digital products with senior-led strategy, engineering, and product execution.',
  path: '/',
  keywords: ['digital product studio', 'technical partner', 'software agency Lagos'],
});

const featuredWork = [
  {
    name: 'Growth Websites',
    type: 'Web Platforms',
    desc: 'Conversion-focused marketing sites and launch surfaces built to move from attention to action.',
    href: '/work',
  },
  {
    name: 'Operational Systems',
    type: 'Internal Tools',
    desc: 'Custom systems that reduce manual work, tighten reporting, and support scaling teams.',
    href: '/services',
  },
  {
    name: 'Content Engines',
    type: 'SEO + Insights',
    desc: 'Publishing systems and editorial structures that turn expertise into organic growth.',
    href: '/insights',
  },
  {
    name: 'Design Systems',
    type: 'Product UX',
    desc: 'Reusable interface foundations that help fast-moving teams ship with consistency.',
    href: '/about',
  },
];

const serviceCards = [
  {
    icon: Code,
    title: 'Product Engineering',
    desc: 'We ship websites, customer products, and internal tools that hold up after launch.',
  },
  {
    icon: Database,
    title: 'Platform & Systems',
    desc: 'We structure data, integrations, and backend workflows so growth does not create chaos.',
  },
  {
    icon: Lightbulb,
    title: 'Product Direction',
    desc: 'We sharpen messaging, scope, and roadmap decisions before delivery gets expensive.',
  },
  {
    icon: PenTool,
    title: 'UX & Design Systems',
    desc: 'We create interfaces that feel premium while staying practical for real product teams.',
  },
];

export default function Home() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }]);

  return (
    <div className="w-full">
      <StructuredData data={breadcrumbJsonLd} />

      <section className="relative overflow-hidden px-4 pb-24 pt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(105,13,171,0.16),_transparent_45%),linear-gradient(180deg,rgba(247,246,248,0.2),rgba(247,246,248,1))]" />
        <div className="absolute right-[-10%] top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-[-8%] top-40 h-64 w-64 rounded-full bg-background-dark/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-primary shadow-sm">
                Senior-led digital execution
              </span>
              <h1 className="mt-6 text-5xl font-black uppercase leading-[0.95] tracking-tight text-text-main md:text-7xl">
                Built to solve.
                <br />
                <span className="text-primary italic normal-case">Designed to last.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-text-muted md:text-xl">
                Sulva Tech partners with ambitious teams to turn strategy, delivery, and content into one coherent growth system.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-black px-8 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-gray-800"
                >
                  Start a Project
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-gray-200 bg-white px-8 text-base font-bold text-text-main transition hover:border-primary hover:text-primary"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-background-dark via-surface-dark to-primary p-8 text-white">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  <span>Premium delivery</span>
                  <span>SEO-ready structure</span>
                </div>
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {[
                    'Clear roadmap alignment',
                    'Faster launch cycles',
                    'Search-friendly content systems',
                    'Reliable post-launch operations',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/85">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl border border-primary/20 bg-white/10 p-5 text-sm leading-7 text-white/80">
                  We work best with founders, operators, and product teams who need a partner that can think clearly and execute without hand-holding.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-28 max-w-7xl px-6">
        <div className="flex flex-col gap-8 border-y border-gray-100 py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="text-primary text-sm font-bold tracking-widest uppercase">What premium looks like</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-text-main md:text-4xl">
                Digital work that earns trust quickly.
              </h2>
              <p className="mt-3 text-lg leading-8 text-text-muted">
                We combine messaging, product thinking, and engineering discipline so every touchpoint feels intentional.
              </p>
            </div>
            <Link href="/work" className="inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3">
              See our approach
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredWork.map((project) => (
              <Link
                key={project.name}
                href={project.href}
                className="group rounded-3xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-text-muted">{project.type}</span>
                <h3 className="mt-4 text-2xl font-bold text-text-main transition-colors group-hover:text-primary">{project.name}</h3>
                <p className="mt-4 text-sm leading-7 text-text-muted">{project.desc}</p>
                <span className="mt-8 inline-flex items-center text-sm font-bold text-primary">
                  Learn more <ArrowUpRight size={16} className="ml-2" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mb-24 max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-text-main md:text-5xl">How we help teams move</h2>
            <p className="mt-4 text-lg leading-8 text-text-muted">
              From positioning and websites to product systems and editorial infrastructure, we design for momentum.
            </p>
          </div>
          <Link href="/insights" className="inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3">
            Explore insights
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {serviceCards.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-primary/5 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <service.icon size={30} />
                </div>
                <h3 className="text-2xl font-bold text-text-main">{service.title}</h3>
                <p className="mt-4 text-base leading-8 text-text-muted">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-surface-dark px-8 py-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(105,13,171,0.55),_transparent_35%),linear-gradient(135deg,rgba(26,16,34,1),rgba(45,27,54,1))]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Ready to turn expertise into growth?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Bring the messy brief, the product bottleneck, or the underperforming website. We’ll turn it into something sharper, faster, and more durable.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-primary transition hover:bg-gray-100"
              >
                Start the Conversation
              </Link>
              <Link
                href="/insights"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 px-10 text-lg font-bold text-white transition hover:bg-white/10"
              >
                Read our thinking
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
