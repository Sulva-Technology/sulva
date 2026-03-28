import { Metadata } from 'next';
import NewsletterForm from '@/components/NewsletterForm';
import Image from 'next/image';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Deep dives into technology, strategy, and design. Thought leadership for ambitious brands.',
  openGraph: {
    title: 'Tech & Strategy Insights | Sulva Tech Blog',
    description: 'Expert perspectives on software engineering, digital strategy, and the future of technology.',
  },
};

export default function InsightsPage() {
  const articles = [
    {
      title: 'The Future of Digital Transformation',
      category: 'STRATEGY',
      date: 'Oct 12, 2023',
      author: 'David Okafor',
      excerpt: 'How AI and machine learning are reshaping the enterprise landscape and what leaders need to do to stay ahead.',
      image: 'https://picsum.photos/id/20/800/600',
      featured: true,
    },
    {
      title: 'Scaling React Applications for Enterprise',
      category: 'ENGINEERING',
      date: 'Sep 28, 2023',
      author: 'Sarah Jenkins',
      excerpt: 'Best practices for state management, code splitting, and performance optimization in large-scale React apps.',
      image: 'https://picsum.photos/id/21/800/600',
      featured: false,
    },
    {
      title: 'The ROI of Good UX Design',
      category: 'DESIGN',
      date: 'Sep 15, 2023',
      author: 'Michael Chen',
      excerpt: 'Why investing in user experience is not just about aesthetics, it is a critical business driver.',
      image: 'https://picsum.photos/id/22/800/600',
      featured: false,
    },
    {
      title: 'Cloud Native: A Strategic Imperative',
      category: 'CLOUD',
      date: 'Aug 30, 2023',
      author: 'Amara Diop',
      excerpt: 'Moving beyond "lift and shift" to fully leverage the scalability and resilience of cloud architecture.',
      image: 'https://picsum.photos/id/23/800/600',
      featured: false,
    },
    {
      title: 'Data Privacy in the Age of AI',
      category: 'AI & DATA',
      date: 'Aug 12, 2023',
      author: 'David Okafor',
      excerpt: 'Navigating the complex landscape of data regulations while harnessing the power of artificial intelligence.',
      image: 'https://picsum.photos/id/24/800/600',
      featured: false,
    },
    {
      title: 'Building High-Performance Remote Teams',
      category: 'CULTURE',
      date: 'Jul 25, 2023',
      author: 'Sarah Jenkins',
      excerpt: 'Strategies for fostering collaboration, accountability, and innovation in distributed engineering teams.',
      image: 'https://picsum.photos/id/25/800/600',
      featured: false,
    },
  ];

  const featuredArticle = articles.find((a) => a.featured);
  const otherArticles = articles.filter((a) => !a.featured);

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            Thought Leadership
          </span>
          <h1 className="mb-6 font-heading text-4xl font-black tracking-tight text-text-main md:text-6xl">
            INSIGHTS FOR
            <br />
            <span className="text-primary">AMBITIOUS BRANDS.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Deep dives into technology, strategy, and design. We share what we learn building the future.
          </p>
        </div>

        {featuredArticle && (
          <div className="relative mb-20 group">
            <div className="absolute inset-0 rotate-1 rounded-3xl bg-primary/5 transition-transform group-hover:rotate-2"></div>
            <div className="relative grid gap-0 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg md:grid-cols-2">
              <div className="relative h-64 overflow-hidden bg-background-light md:h-auto">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-6 flex items-center gap-4 text-sm">
                  <span className="font-bold uppercase tracking-wider text-primary">{featuredArticle.category}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1 text-text-muted">
                    <Calendar size={14} /> {featuredArticle.date}
                  </span>
                </div>
                <h2 className="mb-4 font-heading text-3xl font-bold leading-tight text-text-main transition-colors group-hover:text-primary md:text-4xl">
                  {featuredArticle.title}
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-text-muted">
                  {featuredArticle.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <User size={20} />
                    </div>
                    <span className="text-sm font-medium text-text-main">{featuredArticle.author}</span>
                  </div>
                  <a href="#newsletter" className="inline-flex items-center font-bold text-primary transition-all hover:gap-2">
                    Join the Newsletter <ArrowRight size={18} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {['All', 'Strategy', 'Engineering', 'Design', 'Cloud', 'AI & Data', 'Culture'].map((cat) => (
            <span
              key={cat}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                cat === 'All'
                  ? 'bg-text-main text-white'
                  : 'border border-gray-200 bg-white text-text-muted'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherArticles.map((article, index) => (
            <div
              key={index}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden bg-background-light">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-md bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-grow flex-col p-6">
                <div className="mb-3 flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {article.date}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                  <span>{article.author}</span>
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold leading-snug text-text-main transition-colors group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-text-muted">
                  {article.excerpt}
                </p>
                <div className="mt-auto border-t border-gray-50 pt-4">
                  <a href="#newsletter" className="inline-flex items-center text-sm font-bold text-primary transition-all group-hover:gap-2">
                    Get Updates <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="newsletter" className="relative overflow-hidden rounded-3xl bg-surface-dark p-8 text-center md:p-16">
          <div className="absolute left-0 top-0 z-0 h-full w-full overflow-hidden">
            <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
              Stay ahead of the curve.
            </h2>
            <p className="mb-8 text-gray-300">
              Get the latest insights on technology, design, and strategy delivered straight to your inbox. No spam, just value.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
