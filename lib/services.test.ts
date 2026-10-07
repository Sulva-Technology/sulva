import { describe, expect, it } from 'vitest';
import { getServiceExamples, services } from '@/lib/services';

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
});
