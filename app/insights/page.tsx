import { Metadata } from 'next';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

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
      title: 'The Future of Digital Transformation in 2024',
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
      excerpt: 'Why investing in user experience is not just about aesthetics—it\'s a critical business driver.',
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            Thought Leadership
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-text-main tracking-tight mb-6">
            INSIGHTS FOR <br />
            <span className="text-primary">AMBITIOUS BRANDS.</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Deep dives into technology, strategy, and design. We share what we learn building the future.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-20 relative group cursor-pointer">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-1 transition-transform group-hover:rotate-2"></div>
            <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto relative overflow-hidden bg-background-light">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <span className="font-bold text-primary tracking-wider uppercase">{featuredArticle.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="text-text-muted flex items-center gap-1">
                    <Calendar size={14} /> {featuredArticle.date}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-main mb-4 leading-tight group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-text-muted text-lg mb-8 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <User size={20} />
                    </div>
                    <span className="text-sm font-medium text-text-main">{featuredArticle.author}</span>
                  </div>
                  <span className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                    Read Article <ArrowRight size={18} className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All', 'Strategy', 'Engineering', 'Design', 'Cloud', 'AI & Data', 'Culture'].map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${cat === 'All'
                ? 'bg-text-main text-white'
                : 'bg-white border border-gray-200 text-text-muted hover:border-primary hover:text-primary'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {otherArticles.map((article, index) => (
            <div key={index} className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 relative overflow-hidden bg-background-light">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {article.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{article.author}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-text-main mb-3 leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <span className="inline-flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-surface-dark rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary opacity-20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Stay ahead of the curve.
            </h2>
            <p className="text-gray-300 mb-8">
              Get the latest insights on technology, design, and strategy delivered straight to your inbox. No spam, just value.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
