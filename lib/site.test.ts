import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/lib/site';

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
});
