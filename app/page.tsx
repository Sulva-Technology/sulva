import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Code, Database, Lightbulb, PenTool } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sulva Tech | Digital Powerhouse',
  description: 'Transforming businesses through premium software development, strategic digital innovation, and future-ready technology solutions.',
};

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col gap-6 max-w-5xl mx-auto z-10">
          <h1 className="text-text-main text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[1.1] tracking-tighter">
            WE BUILD <br />
            <span className="text-primary">DIGITAL POWERHOUSES</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Transforming businesses through premium software development, strategic digital innovation, and future-ready technology solutions.
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

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-gray-100 py-12">
          {[
            { label: 'Projects Delivered', value: '200+' },
            { label: 'Client Retention', value: '98%' },
            { label: 'Years Excellence', value: '10+' },
            { label: 'Global Offices', value: '5' },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl md:text-4xl font-heading font-bold text-text-main">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-text-muted mt-2 font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
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
              Comprehensive digital solutions tailored for enterprise growth. We don&apos;t just build software; we engineer success.
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
              title: 'Web Development',
              desc: 'High-performance web applications built for scale using modern frameworks like React, Next.js, and Node.js.',
            },
            {
              icon: Database,
              title: 'Enterprise Software',
              desc: 'Custom software ecosystems designed to streamline complex operations, secure data, and boost productivity.',
            },
            {
              icon: Lightbulb,
              title: 'Brand Strategy',
              desc: 'Strategic branding that defines market presence. We craft narratives that resonate and visual identities that endure.',
            },
            {
              icon: PenTool,
              title: 'UI/UX Design',
              desc: 'User-centric design creating intuitive experiences. We blend aesthetics with usability for maximum engagement.',
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
              alt="Background Texture"
              fill
              className="object-cover object-center"
              priority={false}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
            <h2 className="text-white text-4xl md:text-6xl font-heading font-black tracking-tight leading-tight">
              Ready to transform your digital presence?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-xl">
              Let&apos;s collaborate to build something extraordinary. Your vision, our expertise.
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 rounded-full h-14 px-10 text-lg font-bold transition-transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
