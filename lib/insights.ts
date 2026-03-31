import { reportError } from '@/lib/monitoring';
import type { createClient as createServerSupabaseClient } from '@/lib/supabase/server';

type SupabaseClient = Awaited<ReturnType<typeof createServerSupabaseClient>>;

const listSelect =
  'slug, title, category, excerpt, author, image_url, og_image_url, website_url, published_at, featured, seo_title, seo_description';

const detailSelect =
  'slug, title, category, excerpt, content, author, author_role, image_url, og_image_url, website_url, seo_title, seo_description, canonical_url, published_at';

function isMissingStatusColumn(error: { message?: string; details?: string; hint?: string } | null) {
  const text = `${error?.message ?? ''} ${error?.details ?? ''} ${error?.hint ?? ''}`.toLowerCase();
  return text.includes('status') && (text.includes('column') || text.includes('schema cache'));
}

export async function fetchPublishedInsights(supabase: SupabaseClient) {
  const primary = await supabase
    .from('insights')
    .select(listSelect)
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('published_at', { ascending: false });

  if (!primary.error) {
    return { data: primary.data ?? [], error: null };
  }

  if (!isMissingStatusColumn(primary.error)) {
    reportError(primary.error, { scope: 'insights.list.primary' });
    return { data: [], error: primary.error };
  }

  const fallback = await supabase
    .from('insights')
    .select(listSelect)
    .eq('is_published', true)
    .order('featured', { ascending: false })
    .order('published_at', { ascending: false });

  if (fallback.error) {
    reportError(fallback.error, { scope: 'insights.list.fallback' });
  }

  return { data: fallback.data ?? [], error: fallback.error };
}

export async function fetchPublishedInsightBySlug(supabase: SupabaseClient, slug: string) {
  const primary = await supabase
    .from('insights')
    .select(detailSelect)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!primary.error) {
    return { data: primary.data, error: null };
  }

  if (!isMissingStatusColumn(primary.error)) {
    reportError(primary.error, { scope: 'insights.detail.primary', details: { slug } });
    return { data: null, error: primary.error };
  }

  const fallback = await supabase
    .from('insights')
    .select(detailSelect)
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (fallback.error) {
    reportError(fallback.error, { scope: 'insights.detail.fallback', details: { slug } });
  }

  return { data: fallback.data, error: fallback.error };
}

export async function fetchPublishedInsightSitemapEntries(supabase: SupabaseClient) {
  const primary = await supabase
    .from('insights')
    .select('slug, updated_at, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (!primary.error) {
    return { data: primary.data ?? [], error: null };
  }

  if (!isMissingStatusColumn(primary.error)) {
    reportError(primary.error, { scope: 'insights.sitemap.primary' });
    return { data: [], error: primary.error };
  }

  const fallback = await supabase
    .from('insights')
    .select('slug, updated_at, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (fallback.error) {
    reportError(fallback.error, { scope: 'insights.sitemap.fallback' });
  }

  return { data: fallback.data ?? [], error: fallback.error };
}
