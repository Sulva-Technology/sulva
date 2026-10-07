import { describe, expect, it } from 'vitest';
import robots from '@/app/robots';

describe('robots.txt', () => {
  const result = robots();
  const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
  const disallowed = rules.flatMap((rule) => [rule.disallow ?? []].flat());

  it('never blocks the CSS, JS and images Google needs to render pages', () => {
    expect(disallowed.some((path) => path.startsWith('/_next'))).toBe(false);
  });

  it('keeps admin and API routes out of search', () => {
    expect(disallowed).toEqual(expect.arrayContaining(['/admin', '/api/']));
  });

  it('points at the sitemap on the live domain', () => {
    expect(result.sitemap).toBe('https://sulvatech.com/sitemap.xml');
  });
});
