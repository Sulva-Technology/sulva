import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import StructuredData from '@/components/StructuredData';
import RemoteSafeImage from '@/components/RemoteSafeImage';
import { absoluteUrl, buildBreadcrumbJsonLd } from '@/lib/site';
import { fetchPublishedInsightBySlug } from '@/lib/insights';

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPublishDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

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
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={articleJsonLd} />
      <article className="mx-auto max-w-4xl">
        <Link href="/insights" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-dark">
          <ArrowLeft size={16} />
          Back to Insights
        </Link>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 font-bold uppercase tracking-widest text-primary">
            {insight.category}
          </span>
          <span className="flex items-center gap-1 text-text-muted">
            <Calendar size={14} />
            {formatPublishDate(insight.published_at)}
          </span>
          <span className="flex items-center gap-1 text-text-muted">
            <User size={14} />
            {insight.author}
          </span>
          {insight.website_url && (
            <a
              href={insight.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary transition-colors hover:text-primary-dark"
            >
              Visit Live Website
            </a>
          )}
        </div>

        <h1 className="mb-6 font-heading text-4xl font-black tracking-tight text-text-main md:text-6xl">
          {insight.title}
        </h1>
        <p className="mb-10 text-xl leading-relaxed text-text-muted">
          {insight.excerpt}
        </p>

        <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-3xl bg-background-light">
          <RemoteSafeImage
            src={insight.image_url || '/og-image.jpg'}
            alt={insight.title}
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-text-main prose-p:text-text-muted prose-a:text-primary">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
