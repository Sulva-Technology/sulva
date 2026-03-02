import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Code, Database, Lightbulb, PenTool,
  Globe, Shield, ShoppingCart, Smartphone,
  Zap, Layout, Users, BarChart
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-stack digital execution. Scalable web development, enterprise software, brand strategy, and UI/UX design tailored for growth.',
  openGraph: {
    title: 'Digital Services | Sulva Tech',
    description: 'Comprehensive digital solutions: Web, Software, Brand, and UI/UX designed for enterprise growth.',
  },
};

export default function ServicesPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full px-6 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase">
          [ What We Do ]
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter text-text-main leading-[1.1] mb-6 max-w-4xl">
          FULL-STACK DIGITAL <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            EXECUTION.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed">
          We build rigorous, scalable, and beautiful digital products that transform businesses and define industries.
        </p>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          {['Global Reach', 'Enterprise Ready', 'Award Winning'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-primary">
                <Shield size={18} />
              </div>
              <span className="text-sm font-semibold">{badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Service 1: Web Development */}
      <section className="w-full py-16 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 md:order-1 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Globe size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-text-main">
              Web Development
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              Scalable, secure, and lightning-fast websites built for growth. We leverage the latest frameworks to deliver seamless user experiences that convert visitors into loyal customers.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { icon: Code, label: 'React / Next.js' },
                { icon: Database, label: 'Headless CMS' },
                { icon: Zap, label: 'Performance' },
                { icon: ShoppingCart, label: 'E-Commerce' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-light border border-gray-100">
                  <item.icon size={20} className="text-primary" />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-4 flex w-fit items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary text-white hover:bg-primary-dark transition-all text-base font-bold"
            >
              Discuss Your Web Project
            </Link>
          </div>

          <div className="order-1 md:order-2 relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl rotate-3 scale-[0.98] transition-transform group-hover:rotate-6"></div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-background-light h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-white opacity-50 z-10"></div>
              {/* Placeholder for abstract tech image */}
              <div className="absolute inset-0 opacity-80 mix-blend-overlay z-0">
                <Image
                  src="https://picsum.photos/id/2/800/600"
                  alt="Web Development abstract"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Software Development */}
      <section className="w-full py-16 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-1 relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl -rotate-3 scale-[0.98] transition-transform group-hover:-rotate-6"></div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-background-light h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-100 to-white opacity-50 z-10"></div>
              <div className="absolute inset-0 opacity-80 mix-blend-overlay z-0">
                <Image
                  src="https://picsum.photos/id/3/800/600"
                  alt="Software Development abstract"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="order-2 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Code size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-text-main">
              Software Development
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              Custom software solutions tailored to your complex business needs. From enterprise ERPs to niche SaaS products, we architect systems that scale with your ambition.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { icon: Database, label: 'Cloud Architecture' },
                { icon: Code, label: 'API Integration' },
                { icon: Layout, label: 'DevOps CI/CD' },
                { icon: Shield, label: 'Cybersecurity' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200">
                  <item.icon size={20} className="text-primary" />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-4 flex w-fit items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary text-white hover:bg-primary-dark transition-all text-base font-bold"
            >
              Discuss Your Software
            </Link>
          </div>
        </div>
      </section>

      {/* Service 3: Brand Strategy */}
      <section className="w-full py-16 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 md:order-1 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Lightbulb size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-text-main">
              Brand Strategy
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              We don&apos;t just build products; we build brands. Our strategic approach ensures your digital presence aligns perfectly with your business goals and speaks directly to your target audience.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { icon: BarChart, label: 'Market Research' },
                { icon: Users, label: 'Identity Design' },
                { icon: Zap, label: 'Positioning' },
                { icon: PenTool, label: 'Storytelling' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-light border border-gray-100">
                  <item.icon size={20} className="text-primary" />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-4 flex w-fit items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary text-white hover:bg-primary-dark transition-all text-base font-bold"
            >
              Build Your Brand
            </Link>
          </div>

          <div className="order-1 md:order-2 relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl rotate-3 scale-[0.98] transition-transform group-hover:rotate-6"></div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-background-light h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-white opacity-50 z-10"></div>
              <div className="absolute inset-0 opacity-80 mix-blend-overlay z-0">
                <Image
                  src="https://picsum.photos/id/4/800/600"
                  alt="Brand Strategy abstract"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: UI/UX Design */}
      <section className="w-full py-16 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-1 relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl -rotate-3 scale-[0.98] transition-transform group-hover:-rotate-6"></div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-background-light h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-100 to-white opacity-50 z-10"></div>
              <div className="absolute inset-0 opacity-80 mix-blend-overlay z-0">
                <Image
                  src="https://picsum.photos/id/5/800/600"
                  alt="UI UX Design abstract"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="order-2 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <PenTool size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-text-main">
              UI/UX Design
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              Design that works as beautifully as it looks. Our user-centric approach combines aesthetics with usability to create intuitive interfaces that delight users and drive engagement.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { icon: Layout, label: 'Visual Design' },
                { icon: Smartphone, label: 'Prototyping' },
                { icon: Globe, label: 'Responsive' },
                { icon: Users, label: 'Accessibility' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200">
                  <item.icon size={20} className="text-primary" />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-4 flex w-fit items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary text-white hover:bg-primary-dark transition-all text-base font-bold"
            >
              Elevate Your Design
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-6 bg-surface-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-600 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative max-w-[900px] mx-auto text-center flex flex-col items-center gap-8">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight leading-tight">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl">
            Get a comprehensive, itemized quote with no hidden fees. We believe in complete transparency and partnership from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
            <Link
              href="/contact"
              className="flex items-center justify-center overflow-hidden rounded-full h-14 px-10 bg-white text-primary hover:bg-gray-100 transition-all text-lg font-bold"
            >
              Get Your Custom Quote
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center overflow-hidden rounded-full h-14 px-10 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 transition-all text-lg font-bold"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
