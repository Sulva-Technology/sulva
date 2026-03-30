import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Explore recent Sulva Tech projects across real estate, ecommerce, personal branding, and education technology.',
  openGraph: {
    title: 'Case Studies & Portfolio | Sulva Tech',
    description: 'A showcase of recent websites and digital products built by Sulva Tech.',
  },
};

export default function WorkPage() {
  const projects = [
    {
      title: 'Mindfire Homes',
      category: 'REAL ESTATE',
      desc: 'A professional real estate website built to make property discovery, listing exploration, and enquiry flow feel clear on every screen size.',
      image: 'https://picsum.photos/id/6/800/600',
      href: 'https://mindfirehomes.com',
    },
    {
      title: 'Bata Luxury Store',
      category: 'ECOMMERCE',
      desc: 'A luxury ecommerce storefront with polished product presentation, cart flow, and checkout built for a premium shopping experience.',
      image: 'https://picsum.photos/id/7/800/600',
      href: 'https://bata.sulvatech.com',
    },
    {
      title: 'Iyiola Portfolio',
      category: 'PERSONAL BRAND',
      desc: 'A personal portfolio website designed to present work, skills, and identity with clarity, speed, and a strong visual rhythm.',
      image: 'https://picsum.photos/id/8/800/600',
      href: 'https://iyiola.sulvatech.com',
    },
    {
      title: 'VUI Studify',
      category: 'EDTECH',
      desc: 'An AI-powered learning platform that helps students study smarter with quizzes, flashcards, theory support, feedback, and gamified progress.',
      image: 'https://picsum.photos/id/9/800/600',
      href: 'https://student.sulvatech.com',
    },
  ];

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src="https://picsum.photos/id/12/1920/1080"
            alt="Work showcase background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 z-10 bg-slate-900/60"></div>
          <div className="relative z-20 flex h-full items-center justify-center p-6 text-center">
            <div className="flex max-w-3xl flex-col items-center gap-6">
              <h1 className="font-heading text-4xl font-black leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
                RECENT WORK
                <br />
                THAT SHIPS.
              </h1>
              <p className="max-w-xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg">
                A small selection of websites and digital products I have recently delivered across real estate, ecommerce, personal branding, and education.
              </p>
              <Link
                href="/contact"
                className="mt-4 flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-primary shadow-xl transition-all hover:bg-slate-100"
              >
                Discuss Your Project
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-b border-gray-200 py-4 sm:flex-row">
          <h3 className="font-heading text-2xl font-bold text-text-main">Selected Projects</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-md shadow-primary/20">
              All
            </span>
            {['Real Estate', 'Ecommerce', 'Portfolio', 'Edtech'].map((filter) => (
              <span
                key={filter}
                className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-text-muted"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="mb-2 inline-block rounded-md bg-white/20 px-3 py-1 text-xs font-bold tracking-wider text-white backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 px-2 pb-2">
                <h3 className="font-heading text-xl font-bold text-text-main transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">
                  {project.desc}
                </p>
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center text-sm font-bold text-primary"
                >
                  Visit Live Project <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12 flex flex-col items-center justify-center gap-6 rounded-3xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-primary">Launch</span>
          </div>
          <h2 className="max-w-2xl font-heading text-3xl font-black text-text-main md:text-4xl">
            Ready to transform your business?
          </h2>
          <p className="max-w-xl text-lg text-text-muted">
            If you want a website that looks sharp, works smoothly across devices, and is built with clean modern tools, let&apos;s map out what yours needs to do.
          </p>
          <Link
            href="/contact"
            className="mt-4 flex h-12 min-w-[160px] items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-base font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-primary/30"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
}
