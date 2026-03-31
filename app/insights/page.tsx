import NewsletterForm from '@/components/NewsletterForm';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import InsightsFeed from '@/components/InsightsFeed';

export const metadata = buildMetadata({
  title: 'Insights',
  description: 'Deep dives into technology, product strategy, design systems, and search-ready digital execution.',
  path: '/insights',
  keywords: ['technology insights', 'product strategy articles', 'software delivery blog'],
});

type Insight = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  image_url: string | null;
  website_url: string | null;
  published_at: string;
  featured: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image_url?: string | null;
};

function formatPublishDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const supabase = await createClient();
  const { data: insights, error } = await supabase
    .from('insights')
    .select('slug, title, category, excerpt, author, image_url, og_image_url, website_url, published_at, featured, seo_title, seo_description')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch insights:', error);
  }

  const articles: Insight[] = insights || [];
  const featuredArticle = articles.find((article) => article.featured) || articles[0];
  const otherArticles = articles.filter((article) => article.slug !== featuredArticle?.slug);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
  ]);

  return (
    <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <StructuredData data={breadcrumbJsonLd} />
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
                  src={featuredArticle.image_url || '/og-image.jpg'}
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
                    <Calendar size={14} /> {formatPublishDate(featuredArticle.published_at)}
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
                  <div className="flex items-center gap-4">
                    {featuredArticle.website_url && (
                      <a
                        href={featuredArticle.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-bold text-text-main transition-colors hover:text-primary"
                      >
                        Visit Website
                      </a>
                    )}
                    <Link href={`/insights/${featuredArticle.slug}`} className="inline-flex items-center font-bold text-primary transition-all hover:gap-2">
                      Read Article <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {articles.length === 0 ? (
          <div className="mb-20 rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center text-text-muted">
            No published insights yet. Run the database seed to populate the blog.
          </div>
        ) : (
          <InsightsFeed articles={otherArticles} />
        )}

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
