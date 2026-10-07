import { MetadataRoute } from 'next';
import { unstable_rethrow } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { fetchPublishedInsightSitemapEntries } from '@/lib/insights';
import { reportError } from '@/lib/monitoring';
import { services } from '@/lib/services';
import { absoluteUrl } from '@/lib/site';

type SitemapEntry = MetadataRoute.Sitemap[number];

// No lastModified on static pages: a date that changes on every build tells search engines nothing.
const staticRoutes: Array<[path: string, changeFrequency: SitemapEntry['changeFrequency'], priority: number]> = [
    ['/', 'weekly', 1],
    ['/services', 'monthly', 0.9],
    ...services.map((service): [string, SitemapEntry['changeFrequency'], number] => [
        `/services/${service.slug}`,
        'monthly',
        0.9,
    ]),
    ['/work', 'monthly', 0.9],
    ['/about', 'monthly', 0.8],
    ['/contact', 'yearly', 0.8],
    ['/insights', 'weekly', 0.7],
    ['/careers', 'monthly', 0.4],
    ['/privacy-policy', 'yearly', 0.2],
    ['/terms-of-service', 'yearly', 0.2],
    ['/cookie-policy', 'yearly', 0.2],
];

async function getInsightRoutes(): Promise<MetadataRoute.Sitemap> {
    try {
        const supabase = await createClient();
        const { data: insights } = await fetchPublishedInsightSitemapEntries(supabase);
        return (insights || []).map((insight) => ({
            url: absoluteUrl(`/insights/${insight.slug}`),
            lastModified: new Date(insight.updated_at || insight.published_at),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));
    } catch (error) {
        unstable_rethrow(error);
        // Keep serving the static pages if the database is unreachable.
        reportError(error, { scope: 'sitemap.insights' });
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pages: MetadataRoute.Sitemap = staticRoutes.map(([path, changeFrequency, priority]) => ({
        url: absoluteUrl(path),
        changeFrequency,
        priority,
    }));

    return [...pages, ...(await getInsightRoutes())];
}
