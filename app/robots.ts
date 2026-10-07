import { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // Never block /_next/: Google needs its CSS, JS and images to render pages.
                disallow: ['/admin', '/api/'],
            },
        ],
        sitemap: absoluteUrl('/sitemap.xml'),
        host: siteConfig.url,
    };
}
