import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  caseStudies,
  displayDomain,
  filterCaseStudies,
  getCaseStudy,
  getFeaturedCaseStudy,
  getOtherCaseStudies,
} from '@/lib/work';

describe('case studies', () => {
  it('lists the six client projects with unique slugs', () => {
    expect(caseStudies.map((s) => s.slug)).toEqual([
      'mealdirect',
      'itzlolabeauty',
      'thedmashop',
      'mindfirehomes',
      'olorunleke',
      'innercircle',
    ]);
  });

  it('features Meal Direct with a headline and problem statement', () => {
    const featured = getFeaturedCaseStudy();
    expect(featured.slug).toBe('mealdirect');
    expect(featured.headline).toBe('Campus food, on schedule.');
    expect(featured.problem.length).toBeGreaterThan(40);
    expect(caseStudies.filter((s) => s.featured)).toHaveLength(1);
  });

  it('has media files on disk for every project', () => {
    for (const study of caseStudies) {
      expect(existsSync(path.join(process.cwd(), 'public', study.media.poster)), study.media.poster).toBe(true);
      if (study.media.video) {
        expect(existsSync(path.join(process.cwd(), 'public', study.media.video)), study.media.video).toBe(true);
      }
    }
  });

  it('links to live https sites', () => {
    for (const study of caseStudies) expect(study.url).toMatch(/^https:\/\//);
  });

  it('separates the featured project from the rest', () => {
    expect(getOtherCaseStudies().map((s) => s.slug)).not.toContain('mealdirect');
    expect(getOtherCaseStudies()).toHaveLength(5);
  });

  it('filters by category', () => {
    expect(filterCaseStudies(caseStudies, 'Store').map((s) => s.slug)).toEqual(['itzlolabeauty', 'thedmashop']);
    expect(filterCaseStudies(caseStudies, 'All')).toHaveLength(6);
  });

  it('looks up by slug and fails loudly on unknown slugs', () => {
    expect(getCaseStudy('innercircle').name).toBe('The Inner Circle');
    expect(() => getCaseStudy('nope')).toThrow('Unknown case study "nope"');
  });

  it('formats display domains', () => {
    expect(displayDomain('https://www.mealdirectly.com')).toBe('mealdirectly.com');
  });
});
