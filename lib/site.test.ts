import { describe, expect, it } from 'vitest';
import { buildFaqJsonLd, buildMetadata, siteConfig } from '@/lib/site';

describe('siteConfig', () => {
  it('uses the real phone number with a matching tel: link', () => {
    expect(siteConfig.phone).toBe('+234 701 743 9615');
    expect(siteConfig.phoneHref).toBe('tel:+2347017439615');
  });

  it('lists Instagram and TikTok as @sulvatech', () => {
    expect(siteConfig.socials.map((s) => s.href)).toEqual([
      'https://www.instagram.com/sulvatech',
      'https://www.tiktok.com/@sulvatech',
    ]);
  });

  it('links the founder portfolio', () => {
    expect(siteConfig.founder).toEqual({
      name: 'Iyiola Ogunjobi',
      role: 'Founder',
      portfolio: 'https://iyiola.sulvatech.com',
    });
  });

  it('describes the new positioning', () => {
    expect(siteConfig.tagline).toBe('Websites that grow your brand.');
    expect(siteConfig.description).toContain('systems behind them');
  });

  it('targets a search phrase in the home title', () => {
    expect(siteConfig.seoTitle).toMatch(/web design/i);
    expect(siteConfig.seoTitle).toMatch(/Lagos/);
  });
});

describe('buildMetadata', () => {
  it('appends the brand and sets an absolute canonical URL', () => {
    const metadata = buildMetadata({ title: 'Work', description: 'd', path: '/work' });
    expect(metadata.title).toBe('Work');
    expect(metadata.alternates?.canonical).toBe('https://sulvatech.com/work');
    expect(metadata.openGraph?.title).toBe('Work | Sulva Tech');
  });

  it('can opt out of the title template', () => {
    const metadata = buildMetadata({ title: 'Home | Sulva Tech', description: 'd', path: '/', absoluteTitle: true });
    expect(metadata.title).toEqual({ absolute: 'Home | Sulva Tech' });
    expect(metadata.openGraph?.title).toBe('Home | Sulva Tech');
  });
});

describe('buildFaqJsonLd', () => {
  it('builds a FAQPage', () => {
    expect(buildFaqJsonLd([{ question: 'Q?', answer: 'A.' }])).toEqual({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [{ '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'A.' } }],
    });
  });
});
