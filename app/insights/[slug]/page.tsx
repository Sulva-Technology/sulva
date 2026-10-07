import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import StructuredData from '@/components/StructuredData';
import RemoteSafeImage from '@/components/RemoteSafeImage';
import { formatPublishDate } from '@/components/InsightCard';
import { chipClasses } from '@/components/ui/Chip';
import GradientField from '@/components/ui/GradientField';
import { absoluteUrl, buildBreadcrumbJsonLd } from '@/lib/site';
import { fetchPublishedInsightBySlug } from '@/lib/insights';

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

async function getInsight(slug: string) {
  const supabase = await createClient();
  const { data, error } = await fetchPublishedInsightBySlug(supabase, slug);

  if (error) {
    console.error('Failed to fetch insight:', error);
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);

  if (!insight) {
    return {
      title: 'Insight Not Found',
    };
  }

  return {
    title: insight.seo_title || insight.title,
    description: insight.seo_description || insight.excerpt,
    alternates: {
      canonical: insight.canonical_url || absoluteUrl(`/insights/${slug}`),
    },
    openGraph: {
      title: insight.seo_title || insight.title,
      description: insight.seo_description || insight.excerpt,
      type: 'article',
      url: insight.canonical_url || absoluteUrl(`/insights/${slug}`),
      images: [insight.og_image_url || insight.image_url || absoluteUrl('/og-image.jpg')],
    },
    twitter: {
      card: 'summary_large_image',
      title: insight.seo_title || insight.title,
      description: insight.seo_description || insight.excerpt,
      images: [insight.og_image_url || insight.image_url || absoluteUrl('/og-image.jpg')],
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = await getInsight(slug);

  if (!insight) {
    notFound();
  }

  const paragraphs: string[] = insight.content.split('\n\n').filter(Boolean);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: insight.title, path: `/insights/${insight.slug}` },
  ]);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.seo_title || insight.title,
    description: insight.seo_description || insight.excerpt,
    image: [insight.og_image_url || insight.image_url || absoluteUrl('/og-image.jpg')],
    author: {
      '@type': 'Person',
      name: insight.author,
      jobTitle: insight.author_role || undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sulva Tech',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.jpg'),
      },
    },
    mainEntityOfPage: insight.canonical_url || absoluteUrl(`/insights/${insight.slug}`),
    datePublished: insight.published_at,
    dateModified: insight.published_at,
  };

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={articleJsonLd} />

      <header className="relative isolate overflow-hidden bg-ink px-5 pb-16 pt-36 text-white md:px-10 md:pt-44">
        <GradientField variant="panel" className="-z-10" />
        <div className="mx-auto max-w-[68ch]">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
            <ArrowLeft size={16} aria-hidden="true" />
            All insights
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span className={chipClasses()}>{insight.category}</span>
            <time dateTime={insight.published_at}>{formatPublishDate(insight.published_at, 'long')}</time>
            <span>· {insight.author}</span>
          </div>
          <h1 className="display-md mt-6">{insight.title}</h1>
          <p className="mt-5 text-lg leading-8 text-white/75">{insight.excerpt}</p>
          {insight.website_url ? (
            <a
              href={insight.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1 text-sm text-copper-soft hover:text-white"
            >
              Visit live website <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </header>

      <article className="bg-paper px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[68ch]">
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-card bg-ink-soft">
            <RemoteSafeImage
              src={insight.image_url || '/og-image.jpg'}
              alt={insight.title}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
          <div className="prose prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:text-ink/80 prose-a:text-copper">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
