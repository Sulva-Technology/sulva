import { describe, expect, it } from 'vitest';
import { getService, getServiceExamples, services } from '@/lib/services';

describe('services', () => {
  it('offers exactly three services', () => {
    expect(services.map((s) => s.name)).toEqual(['Brand websites', 'Online stores', 'Products & apps']);
  });

  it('points every service at real case studies', () => {
    for (const service of services) {
      const examples = getServiceExamples(service);
      expect(examples.length).toBeGreaterThan(0);
      expect(examples.map((e) => e.slug)).toEqual(service.exampleSlugs);
    }
  });

  it('uses Meal Direct as the products example', () => {
    const products = services.find((s) => s.slug === 'products-apps')!;
    expect(getServiceExamples(products)[0].slug).toBe('mealdirect');
  });

  it('gives every service its own search-ready page copy', () => {
    for (const service of services) {
      expect(getService(service.slug)).toBe(service);
      // Titles get " | Sulva Tech" appended; keep the whole thing short enough for Google to show.
      expect(`${service.seoTitle} | Sulva Tech`.length).toBeLessThanOrEqual(65);
      expect(service.seoDescription.length).toBeGreaterThanOrEqual(110);
      expect(service.seoDescription.length).toBeLessThanOrEqual(160);
      expect(service.intro.length).toBeGreaterThan(0);
      expect(service.faqs.length).toBeGreaterThanOrEqual(3);
    }
  });
});
