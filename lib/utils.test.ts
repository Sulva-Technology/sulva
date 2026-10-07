import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges custom radius tokens correctly', () => {
    expect(cn('rounded-panel', 'rounded-card')).toBe('rounded-card');
    expect(cn('rounded-full', 'rounded-panel')).toBe('rounded-panel');
  });
});
