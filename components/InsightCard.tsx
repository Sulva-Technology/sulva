import Link from 'next/link';
import RemoteSafeImage from '@/components/RemoteSafeImage';
import { chipClasses } from '@/components/ui/Chip';
import { cn } from '@/lib/utils';

export type InsightListItem = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  image_url: string | null;
  website_url: string | null;
  published_at: string;
  featured?: boolean;
};

export function formatPublishDate(value: string, month: 'short' | 'long' = 'short') {
  return new Intl.DateTimeFormat('en-US', { month, day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function InsightCard({
  article,
  featured = false,
  as: Heading = 'h3',
}: {
  article: InsightListItem;
  featured?: boolean;
  as?: 'h2' | 'h3';
}) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className={cn('group grid gap-6 rounded-card', featured && 'md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10')}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-ink-soft">
        <RemoteSafeImage
          src={article.image_url || '/insights/cover.jpg'}
          alt={article.title}
          className="h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]"
          priority={featured}
        />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className={chipClasses({ tone: 'light' })}>{article.category}</span>
          <time dateTime={article.published_at}>{formatPublishDate(article.published_at)}</time>
        </div>
        <Heading className={cn('mt-4 font-medium tracking-tight text-ink', featured ? 'display-md' : 'text-2xl')}>
          {article.title}
        </Heading>
        <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-muted">{article.excerpt}</p>
        <span className="mt-4 inline-flex text-sm font-medium text-ink underline decoration-copper underline-offset-4">
          Read
        </span>
      </div>
    </Link>
  );
}
