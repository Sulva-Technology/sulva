import Link from 'next/link';
import { Diamond, Eye, Lightbulb, Rocket, Shield, Users } from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Learn how Sulva Tech works across strategy, design, engineering, and content systems to help teams ship stronger digital products.',
  path: '/about',
  keywords: ['about Sulva Tech', 'senior product partner', 'software studio Lagos'],
});

const principles = [
  { icon: Diamond, title: 'Excellence', desc: 'We keep quality visible in the details, not just in the pitch.' },
  { icon: Lightbulb, title: 'Clarity', desc: 'We simplify strategy and delivery so teams can move with confidence.' },
  { icon: Shield, title: 'Integrity', desc: 'We say what is true, surface tradeoffs early, and protect long-term trust.' },
  { icon: Users, title: 'Partnership', desc: 'We work alongside clients, not at arm’s length from the real problem.' },
];

const pillars = [
  { title: 'Strategy', role: 'Sharper decisions before delivery' },
  { title: 'Design', role: 'Interfaces that reduce friction' },
  { title: 'Engineering', role: 'Reliable systems and clean execution' },
  { title: 'Content', role: 'Publishing systems that support growth' },
];

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);

  return (
    <div className="w-full">
      <StructuredData data={breadcrumbJsonLd} />

      <section className="px-4 py-10 md:px-10 md:py-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-surface-dark px-8 py-20 md:px-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                Built to solve, designed to last
              </span>
              <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                A senior partner
                <br />
                for serious digital work.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                Sulva Tech exists to close the gap between ambitious ideas and reliable execution with sharp product thinking, disciplined delivery, and editorial clarity.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-primary transition hover:bg-slate-100"
                >
                  Start a conversation
                </Link>
                <Link
                  href="/careers"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-base font-bold text-white transition hover:bg-white/10"
                >
                  Meet the team
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                { icon: Rocket, label: 'Mission', body: 'Help ambitious teams turn complexity into clear, durable digital products.' },
                { icon: Eye, label: 'Vision', body: 'Be the partner teams trust when quality, speed, and clarity all matter at once.' },
              ].map((item) => (
                <div key={item.label} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white">
                  <item.icon className="h-10 w-10 text-primary-light" />
                  <h2 className="mt-6 text-2xl font-bold">{item.label}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-200">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-light px-4 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-text-main md:text-4xl">Operating principles</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-text-muted">
              The values that shape how we scope work, communicate risk, and ship.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((principle) => (
              <div key={principle.title} className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <principle.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-6 text-2xl font-bold text-text-main">{principle.title}</h3>
                <p className="mt-4 text-sm leading-7 text-text-muted">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 md:px-12">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-gradient-to-br from-primary/10 via-white to-background-dark/5 p-10">
            <h2 className="text-4xl font-black tracking-tight text-text-main">
              Africa, global standards, and practical delivery.
            </h2>
            <p className="mt-6 text-lg leading-8 text-text-muted">
              Sulva Tech is rooted in Lagos and built for distributed work. We care about showcasing African execution at a global standard while staying grounded in what real operating teams need.
            </p>
            <p className="mt-6 text-lg leading-8 text-text-muted">
              That means fewer vanity deliverables, more durable systems, clearer communication, and stronger outcomes after launch.
            </p>
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">How we show up</span>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar, index) => (
                <div key={pillar.title} className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="text-sm font-black uppercase tracking-[0.2em] text-primary">0{index + 1}</div>
                  <h3 className="mt-4 text-2xl font-bold text-text-main">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-text-muted">{pillar.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-20 text-center text-white">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">Need a team that can think and execute?</h2>
          <p className="text-lg leading-8 text-purple-100">
            If the work matters and the brief still feels messy, we’re built for that stage of the process.
          </p>
          <Link
            href="/services"
            className="inline-flex rounded-full bg-white px-8 py-3 text-lg font-bold text-primary transition hover:bg-slate-100"
          >
            Explore services
          </Link>
        </div>
      </section>
    </div>
  );
}
