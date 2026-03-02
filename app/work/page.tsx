import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Explore our portfolio of digital transformation and software engineering excellence. We build systems that scale.',
  openGraph: {
    title: 'Case Studies & Portfolio | Sulva Tech',
    description: 'A showcase of high-performance digital products and enterprise solutions delivered globally.',
  },
};

export default function WorkPage() {
  const projects = [
    {
      title: 'Nova Banking App',
      category: 'FINTECH',
      desc: 'Reimagining mobile banking for the digital-native generation with AI-driven insights.',
      image: 'https://picsum.photos/id/6/800/600',
    },
    {
      title: 'MediScan AI Portal',
      category: 'HEALTHCARE AI',
      desc: 'Advanced diagnostic tools powered by machine learning to assist radiologists.',
      image: 'https://picsum.photos/id/7/800/600',
    },
    {
      title: 'Global Trade Platform',
      category: 'E-COMMERCE',
      desc: 'A scalable B2B marketplace connecting suppliers across 4 continents.',
      image: 'https://picsum.photos/id/8/800/600',
    },
    {
      title: 'Fortress Cyber Suite',
      category: 'SECURITY',
      desc: 'Enterprise-grade security dashboard for real-time threat monitoring.',
      image: 'https://picsum.photos/id/9/800/600',
    },
    {
      title: 'Fleet Streamline',
      category: 'LOGISTICS',
      desc: 'Optimizing delivery routes for a national courier service using geolocation API.',
      image: 'https://picsum.photos/id/10/800/600',
    },
    {
      title: 'LearnLoop Portal',
      category: 'EDUTECH',
      desc: 'An interactive learning management system for higher education institutions.',
      image: 'https://picsum.photos/id/11/800/600',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Hero Section */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-[500px]">
          <Image
            src="https://picsum.photos/id/12/1920/1080"
            alt="Work showcase background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
          <div className="flex relative h-full items-center justify-center p-6 text-center z-20">
            <div className="relative z-20 flex flex-col items-center max-w-3xl gap-6">
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-heading font-black leading-tight tracking-tight drop-shadow-sm">
                PROJECTS THAT<br />PROVE THE POINT.
              </h1>
              <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
                Explore our portfolio of digital transformation and software engineering excellence. We build systems that scale.
              </p>
              <button className="mt-4 flex items-center justify-center rounded-full h-12 px-8 bg-white text-primary hover:bg-slate-100 transition-all font-bold text-base shadow-xl">
                View Case Studies
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4 border-b border-gray-200">
          <h3 className="text-2xl font-heading font-bold text-text-main">Recent Work</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 transition-transform hover:scale-105">
              All
            </button>
            {['Web', 'Software', 'Branding', 'UI/UX'].map((filter) => (
              <button
                key={filter}
                className="px-5 py-2 rounded-full bg-gray-100 text-text-muted text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider mb-2">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 px-2 pb-2">
                <h3 className="text-xl font-heading font-bold text-text-main group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                  {project.desc}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center text-sm font-bold text-primary mt-2"
                >
                  View Case Study <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center justify-center gap-6 py-16 px-6 bg-gray-50 rounded-3xl text-center border border-gray-200 mb-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <span className="text-primary text-4xl font-bold">🚀</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-text-main max-w-2xl">
            Ready to transform your business?
          </h2>
          <p className="text-text-muted text-lg max-w-xl">
            Let&apos;s build something extraordinary together. Our team is ready to take on your next challenge.
          </p>
          <Link
            href="/contact"
            className="mt-4 flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-primary hover:bg-primary-dark text-white text-base font-bold transition-all shadow-lg hover:shadow-primary/30"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
}
