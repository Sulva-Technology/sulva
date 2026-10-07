import { describe, expect, it } from 'vitest';
import { wrapIndex } from '@/components/ui/useTabs';

describe('wrapIndex', () => {
  it('wraps forward past the end', () => {
    expect(wrapIndex(6, 6)).toBe(0);
  });
  it('wraps backward past the start', () => {
    expect(wrapIndex(-1, 6)).toBe(5);
  });
  it('keeps in-range indexes', () => {
    expect(wrapIndex(3, 6)).toBe(3);
  });
});
