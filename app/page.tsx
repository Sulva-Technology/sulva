import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Code, Database, Lightbulb, PenTool } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sulva Tech | BUILT TO SOLVE, DESIGNED TO LAST',
  description: 'Sulva Tech helps teams design, build, and ship digital products with senior-led strategy, engineering, and product execution.',
};

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col gap-6 max-w-5xl mx-auto z-10">
          <h1 className="text-text-main text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[1.1] tracking-tighter uppercase">
            Built to Solve <br />
            <span className="text-primary italic">Designed to Last</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Sulva Tech partners with ambitious teams to shape product strategy, ship reliable software, and create digital experiences that keep compounding after launch.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 z-10">
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary-dark text-white rounded-full h-14 px-8 text-base font-bold transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Start a Project
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/work"
            className="bg-transparent border-2 border-gray-200 text-text-main hover:border-primary hover:text-primary rounded-full h-14 px-8 text-base font-bold transition-all hover:bg-primary/5 flex items-center justify-center"
          >
            View Case Studies
          </Link>
        </div>
      </section>

      {/* Recent Build Section */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <div className="flex flex-col gap-8 border-y border-gray-100 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-3 block">
                Recent Builds
              </span>
              <h2 className="text-text-main text-3xl md:text-4xl font-heading font-black tracking-tight mb-3">
                Real projects, shipped recently.
              </h2>
              <p className="text-text-muted text-lg leading-relaxed">
                A snapshot of the kinds of websites and digital products we&apos;ve recently delivered across real estate, ecommerce, personal branding, and education.
              </p>
            </div>
            <Link
              href="/work"
              className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all whitespace-nowrap group"
            >
              See Full Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Mindfire Homes', type: 'Real Estate', href: 'https://mindfirehomes.com' },
              { name: 'Bata Store', type: 'Ecommerce', href: 'https://bata.sulvatech.com' },
              { name: 'Iyiola Portfolio', type: 'Personal Brand', href: 'https://iyiola.sulvatech.com' },
              { name: 'VUI Studify', type: 'EdTech', href: 'https://student.sulvatech.com' },
            ].map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-gray-200 bg-white px-5 py-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
                  {project.type}
                </span>
                <h3 className="mt-3 text-xl font-heading font-bold text-text-main group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <span className="mt-6 inline-flex items-center text-sm font-bold text-primary">
                  Visit Site
                  <ArrowUpRight size={16} className="ml-2" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-text-main text-4xl md:text-5xl font-heading font-bold leading-tight mb-4 tracking-tight">
              Our Expertise
            </h2>
            <p className="text-text-muted text-lg">
              Strategy, product design, and software delivery aligned around one goal: helping teams move from idea to launch without losing clarity or quality.
            </p>
          </div>
          <Link
            href="/services"
            className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all whitespace-nowrap group"
          >
            View All Services
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Code,
              title: 'Product Engineering',
              desc: 'Web platforms, internal tools, and customer-facing products built with modern stacks and strong delivery discipline.',
            },
            {
              icon: Database,
              title: 'Platform & Systems',
              desc: 'Operational software, integrations, and backend architecture designed to support growth without creating team drag.',
            },
            {
              icon: Lightbulb,
              title: 'Product & Brand Direction',
              desc: 'Clear messaging, product positioning, and digital direction that help teams sound as sharp as the work they ship.',
            },
            {
              icon: PenTool,
              title: 'Design Systems & UX',
              desc: 'Interfaces, flows, and design systems that reduce friction, improve clarity, and hold up across real product use.',
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <service.icon size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-text-main mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-muted leading-relaxed">{service.desc}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-text-main group-hover:border-primary group-hover:text-primary transition-colors">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="rounded-3xl bg-black overflow-hidden relative py-20 px-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-black z-0"></div>
          {/* Abstract background image overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <Image
              src="https://picsum.photos/id/1/1920/1080"
              alt="Creative technology workspace"
              fill
              className="object-cover object-center"
              priority={false}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
            <h2 className="text-white text-4xl md:text-6xl font-heading font-black tracking-tight leading-tight">
              Ready to move from ideas to execution?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-xl">
              Bring the brief, the messy context, or the half-finished roadmap. We&apos;ll help turn it into something clear, usable, and launchable.
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 rounded-full h-14 px-10 text-lg font-bold transition-transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              Start the Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
