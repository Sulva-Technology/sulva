import Link from 'next/link';
import {
  BarChart,
  Code,
  Database,
  Globe,
  Layout,
  Lightbulb,
  PenTool,
  Shield,
  ShoppingCart,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Senior-led strategy, product design, software delivery, and SEO-ready content systems for teams building serious digital products.',
  path: '/services',
  keywords: ['product engineering services', 'software delivery partner', 'design systems consulting'],
});

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Marketing sites, launch surfaces, and product websites designed to convert, rank, and stay maintainable.',
    bullets: [
      { label: 'Next.js delivery', icon: Code },
      { label: 'CMS-ready architecture', icon: Database },
      { label: 'Performance optimization', icon: Zap },
      { label: 'Conversion flows', icon: ShoppingCart },
    ],
    href: '/contact',
  },
  {
    icon: Code,
    title: 'Software Development',
    desc: 'Internal tools, operational systems, and customer platforms built around the way teams really work.',
    bullets: [
      { label: 'Cloud architecture', icon: Database },
      { label: 'API integrations', icon: Code },
      { label: 'Delivery workflows', icon: Layout },
      { label: 'Security-conscious implementation', icon: Shield },
    ],
    href: '/work',
  },
  {
    icon: Lightbulb,
    title: 'Brand & Product Direction',
    desc: 'Positioning, messaging, and digital direction that keep the story aligned with the product.',
    bullets: [
      { label: 'Market research', icon: BarChart },
      { label: 'Messaging systems', icon: Users },
      { label: 'Offer shaping', icon: Zap },
      { label: 'Narrative clarity', icon: PenTool },
    ],
    href: '/about',
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    desc: 'Interfaces, flows, and systems that feel premium while staying grounded in real product use.',
    bullets: [
      { label: 'Visual design', icon: Layout },
      { label: 'Prototyping', icon: Smartphone },
      { label: 'Responsive systems', icon: Globe },
      { label: 'Usability refinement', icon: Users },
    ],
    href: '/insights',
  },
];

export default function ServicesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  return (
    <div className="w-full">
      <StructuredData data={breadcrumbJsonLd} />

      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <span className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase">
          What we do
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-text-main md:text-7xl">
          Full-stack digital execution for teams that need more than pretty screens.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-muted md:text-xl">
          We help teams scope the right work, design it clearly, and ship it with the level of discipline that search, product, and operations all benefit from.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {['Senior-led', 'SEO-aware', 'Built to ship'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <Shield size={18} className="text-primary" />
              <span className="text-sm font-semibold">{badge}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-0">
        {services.map((service, index) => (
          <section
            key={service.title}
            className={`border-t border-gray-100 px-6 py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-background-light'}`}
          >
            <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
              <div className={index % 2 === 0 ? 'order-2 md:order-1' : 'order-2'}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <service.icon size={28} />
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-text-main md:text-4xl">{service.title}</h2>
                <p className="mt-4 text-lg leading-8 text-text-muted">{service.desc}</p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {service.bullets.map((bullet) => {
                    const Icon = bullet.icon;
                    return (
                      <div key={bullet.label} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                        <Icon size={20} className="text-primary" />
                        <span className="text-sm font-bold">{bullet.label}</span>
                      </div>
                    );
                  })}
                </div>

                <Link
                  href={service.href}
                  className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white transition hover:bg-primary-dark"
                >
                  Explore this service
                </Link>
              </div>

              <div className={index % 2 === 0 ? 'order-1 md:order-2' : 'order-1'}>
                <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(105,13,171,0.18),_transparent_35%),linear-gradient(135deg,rgba(247,246,248,1),rgba(255,255,255,1))]" />
                  <div className="relative z-10 flex min-h-[360px] flex-col justify-between rounded-[1.5rem] bg-gradient-to-br from-surface-dark via-background-dark to-primary p-8 text-white">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Delivery lens</span>
                    <div>
                      <h3 className="text-3xl font-black tracking-tight">{service.title}</h3>
                      <p className="mt-4 max-w-md text-base leading-8 text-white/80">
                        We blend strategy, production quality, and long-term maintainability so the work still looks strong six months after launch.
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {service.bullets.slice(0, 2).map((bullet) => (
                        <div key={bullet.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                          {bullet.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>

      <section className="relative overflow-hidden bg-surface-dark px-6 py-24 text-white">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary-light/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-[900px] flex-col items-center gap-8 text-center">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            Premium delivery
          </span>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">Need help choosing the right next step?</h2>
          <p className="max-w-2xl text-xl leading-8 text-gray-300">
            Whether you need a delivery partner, a product reset, or a stronger content engine, we can scope the right shape of work with you.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-primary transition hover:bg-gray-100"
            >
              Get your custom scope
            </Link>
            <Link
              href="/insights"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-10 text-lg font-bold text-white transition hover:bg-white/10"
            >
              Read our insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
