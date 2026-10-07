import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InsightsFeed from '@/components/InsightsFeed';
import type { InsightListItem } from '@/components/InsightCard';

const article = (slug: string, category: string): InsightListItem => ({
  slug,
  title: `Post ${slug}`,
  category,
  excerpt: 'Excerpt',
  author: 'Sulva',
  image_url: null,
  website_url: null,
  published_at: '2026-09-01T00:00:00Z',
});

describe('InsightsFeed', () => {
  it('filters posts by topic', () => {
    render(<InsightsFeed articles={[article('a', 'Design'), article('b', 'Engineering'), article('c', 'Design')]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual(['Post b']);
  });

  it('hides the filter when there is only one topic', () => {
    render(<InsightsFeed articles={[article('a', 'Design')]} />);
    expect(screen.queryByRole('group', { name: 'Filter by topic' })).toBeNull();
  });
});
