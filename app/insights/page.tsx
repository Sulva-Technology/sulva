import InsightCard, { type InsightListItem } from '@/components/InsightCard';
import InsightsFeed from '@/components/InsightsFeed';
import NewsletterForm from '@/components/NewsletterForm';
import StructuredData from '@/components/StructuredData';
import GlassPanel from '@/components/ui/GlassPanel';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { fetchPublishedInsights } from '@/lib/insights';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import { createClient } from '@/lib/supabase/server';

export const metadata = buildMetadata({
  title: 'Insights on Websites, Online Stores & Apps',
  description:
    'Notes from Sulva Tech on building websites, online stores and the systems behind them, with case studies from projects we have shipped.',
  path: '/insights',
  keywords: ['website tips Nigeria', 'ecommerce advice', 'web design blog'],
});

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const supabase = await createClient();
  const { data, error } = await fetchPublishedInsights(supabase);

  if (error) {
    console.error('Failed to fetch insights:', error);
  }

  const articles = (data ?? []) as InsightListItem[];
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const others = articles.filter((article) => article.slug !== featured?.slug);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <PageHero title="Insights" sub="Notes on building websites that work." />

      <Section tone="paper">
        {featured ? (
          <InsightCard article={featured} featured as="h2" />
        ) : (
          <p className="rounded-card border border-dashed border-ink/20 p-12 text-center text-muted">
            No posts yet. Check back soon.
          </p>
        )}
        {others.length > 0 ? (
          <div className="mt-20 border-t border-ink/10 pt-16">
            <InsightsFeed articles={others} />
          </div>
        ) : null}
      </Section>

      <Section id="newsletter" tone="ink" gradient="cta">
        <GlassPanel className="mx-auto max-w-2xl p-8 text-center md:p-12">
          <h2 className="display-md">Get new posts by email.</h2>
          <p className="mt-4 text-white/75">One short email when we publish something useful. No spam.</p>
          <div className="mt-8 text-left">
            <NewsletterForm />
          </div>
        </GlassPanel>
      </Section>
    </>
  );
}
