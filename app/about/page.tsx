import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Rocket, Eye, Diamond, Lightbulb, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Sulva Tech, BUILT TO SOLVE, DESIGNED TO LAST - accelerating digital evolution for ambitious brands worldwide through cutting-edge engineering.',
  openGraph: {
    title: 'About Sulva Tech | BUILT TO SOLVE, DESIGNED TO LAST',
    description: 'Engineering premium digital experiences that drive tech transformation and accelerate software development.',
  },
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative px-4 py-8 md:px-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex min-h-[560px] flex-col gap-6 rounded-xl md:rounded-[2.5rem] items-center justify-center p-8 relative overflow-hidden">
            <Image
              src="https://picsum.photos/id/13/1920/1080"
              alt="Team at work"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background-dark/80 via-background-dark/60 to-primary/40 backdrop-blur-[2px]"></div>

            <div className="relative z-10 flex flex-col gap-6 text-center max-w-[800px]">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase">
                BUILT TO SOLVE, DESIGNED TO LAST
              </span>
              <h1 className="text-white text-5xl md:text-7xl font-heading font-black leading-[0.95] tracking-tighter">
                BUILT TO MAKE BRANDS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">UNSTOPPABLE.</span>
              </h1>
              <p className="text-slate-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                We engineer premium digital experiences that drive tech transformation and accelerate software development for the world&apos;s most ambitious companies.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-primary transition-colors hover:bg-slate-100"
                >
                  Our Story
                </Link>
                <Link
                  href="/careers"
                  className="flex h-12 items-center justify-center rounded-full border border-white/30 bg-transparent px-8 text-base font-bold text-white transition-colors hover:bg-white/10 backdrop-blur-sm"
                >
                  Meet the Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento Grid */}
      <section className="px-4 py-10 md:px-40 md:py-20 bg-background-light">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-text-main text-3xl md:text-4xl font-heading font-black tracking-tight mb-4">Our Core</h2>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Card */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-white border border-gray-200 p-10 flex flex-col justify-between min-h-[400px] shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Rocket size={120} className="text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Rocket size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-text-main mb-2">Our Mission</h3>
                <p className="text-primary font-medium tracking-wide text-sm uppercase">Accelerate Evolution</p>
              </div>
              <div className="relative z-10 mt-auto">
                <p className="text-2xl md:text-3xl font-medium text-text-main leading-tight">
                  To accelerate digital evolution for ambitious brands worldwide through cutting-edge engineering.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-surface-dark border border-slate-800 p-10 flex flex-col justify-between min-h-[400px] shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50"></div>
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Eye size={120} className="text-white" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white backdrop-blur-sm">
                  <Eye size={32} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">Our Vision</h3>
                <p className="text-purple-200 font-medium tracking-wide text-sm uppercase">Definitive Partnership</p>
              </div>
              <div className="relative z-10 mt-auto">
                <p className="text-2xl md:text-3xl font-medium text-white leading-tight">
                  To become the definitive partner for global tech transformation, setting the standard for quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="px-4 py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Our DNA</span>
              <h2 className="text-text-main text-3xl md:text-5xl font-heading font-black tracking-tight">Operating Principles</h2>
            </div>
            <p className="text-text-muted max-w-md text-lg">
              The values that guide our decisions, our code, and our partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Diamond, title: 'Excellence', desc: "We don&apos;t settle for good. We aim for the exceptional in every line of code." },
              { icon: Lightbulb, title: 'Innovation', desc: "Curiosity drives us. We explore new frontiers to solve old problems." },
              { icon: Shield, title: 'Integrity', desc: "Transparency and honesty are the bedrock of our client relationships." },
              { icon: Users, title: 'Collaboration', desc: "We build together. Success is a shared journey with our partners." },
            ].map((principle, index) => (
              <div key={index} className="bg-background-light p-8 rounded-2xl border-l-4 border-primary hover:translate-y-[-4px] transition-transform duration-300">
                <principle.icon className="text-primary text-4xl mb-4" size={40} />
                <h3 className="text-xl font-bold text-text-main mb-3">{principle.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Africa & Beyond Narrative */}
      <section className="px-4 py-20 md:px-40 bg-background-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-2xl">
                <Image
                  src="https://picsum.photos/id/14/800/800"
                  alt="Global team"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <h2 className="text-text-main text-4xl md:text-5xl font-heading font-black tracking-tight mb-6">
                Africa & <br /><span className="text-primary">Beyond.</span>
              </h2>
              <div className="space-y-6 text-lg text-text-muted">
                <p>
                  Sulva Tech was born from a desire to showcase African engineering talent on the global stage. We believe that talent is universal, but opportunity is not.
                </p>
                <p>
                  By bridging the gap between exceptional African developers and global enterprises, we are not just building software; we are building bridges. Our team spans continents, cultures, and time zones, united by a singular passion for technology.
                </p>
                <p className="font-medium text-text-main">
                  From Lagos to London, Nairobi to New York, we are redefining what it means to be a global tech partner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-3 block">Who We Are</span>
          <h2 className="text-text-main text-3xl md:text-4xl font-heading font-black tracking-tight mb-12">Built by Builders</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: 'David Okafor', role: 'CEO & Founder', img: 'https://picsum.photos/id/64/300/300' },
              { name: 'Sarah Jenkins', role: 'CTO', img: 'https://picsum.photos/id/65/300/300' },
              { name: 'Michael Chen', role: 'Head of Design', img: 'https://picsum.photos/id/91/300/300' },
              { name: 'Amara Diop', role: 'Lead Engineer', img: 'https://picsum.photos/id/103/300/300' },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-primary transition-all duration-300 relative bg-background-light">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="text-text-main font-bold text-lg">{member.name}</h4>
                <p className="text-sm text-text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto flex flex-col gap-6 items-center">
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight">Ready to build the future?</h2>
          <p className="text-purple-100 text-lg">Let&apos;s collaborate to bring your vision to life with world-class engineering.</p>
          <Link
            href="/contact"
            className="bg-white text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
