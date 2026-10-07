'use client';

import { useState } from 'react';
import InsightCard, { type InsightListItem } from '@/components/InsightCard';
import { chipClasses } from '@/components/ui/Chip';

export default function InsightsFeed({ articles }: { articles: InsightListItem[] }) {
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(articles.map((article) => article.category))];
  const visible = category === 'All' ? articles : articles.filter((article) => article.category === category);

  if (articles.length === 0) return null;

  return (
    <>
      {categories.length > 2 ? (
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={item === category}
              onClick={() => setCategory(item)}
              className={chipClasses({ active: item === category, tone: 'light' })}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
      <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {visible.map((article) => (
          <InsightCard key={article.slug} article={article} as="h2" />
        ))}
      </div>
    </>
  );
}
