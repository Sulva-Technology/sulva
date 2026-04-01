'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import RemoteSafeImage from '@/components/RemoteSafeImage';

type Insight = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  image_url: string | null;
  website_url: string | null;
  published_at: string;
};

function formatPublishDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export default function InsightsFeed({ articles }: { articles: Insight[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(articles.map((article) => article.category))];

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory, articles]);

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              cat === activeCategory
                ? 'bg-text-main text-white'
                : 'border border-gray-200 bg-white text-text-muted hover:border-primary hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="mb-20 rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center text-text-muted">
          No published insights in this category yet.
        </div>
      ) : (
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div
              key={article.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden bg-background-light">
                <RemoteSafeImage
                  src={article.image_url || '/og-image.jpg'}
                  alt={article.title}
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
                    <Calendar size={12} /> {formatPublishDate(article.published_at)}
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
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-50 pt-4">
                  {article.website_url ? (
                    <a
                      href={article.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-text-main transition-colors hover:text-primary"
                    >
                      Visit Website
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-gray-400">Project Link Coming Soon</span>
                  )}
                  <Link href={`/insights/${article.slug}`} className="inline-flex items-center text-sm font-bold text-primary transition-all group-hover:gap-2">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
