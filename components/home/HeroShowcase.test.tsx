import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HeroShowcase, { HERO_INTERVAL_MS } from '@/components/home/HeroShowcase';
import { caseStudies } from '@/lib/work';
import { setReducedMotion } from '@/test/utils';

const selectedName = () => screen.getByRole('tab', { selected: true }).textContent;

describe('HeroShowcase', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the selected project in the caption', () => {
    render(<HeroShowcase studies={caseStudies} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Mindfire Homes' }));
    expect(screen.getByRole('tabpanel').textContent).toContain('Abuja');
  });

  it('moves selection with arrow keys', () => {
    render(<HeroShowcase studies={caseStudies} />);
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowLeft' });
    expect(selectedName()).toBe('The Inner Circle');
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(selectedName()).toBe('Meal Direct');
  });

  it('auto-advances until the visitor interacts', () => {
    vi.useFakeTimers();
    render(<HeroShowcase studies={caseStudies} />);
    act(() => {
      vi.advanceTimersByTime(HERO_INTERVAL_MS);
    });
    expect(selectedName()).toBe('Itzlolabeauty');
    fireEvent.click(screen.getByRole('tab', { name: 'Olorunleke Ojuolape' }));
    act(() => {
      vi.advanceTimersByTime(HERO_INTERVAL_MS * 3);
    });
    expect(selectedName()).toBe('Olorunleke Ojuolape');
  });

  it('does not auto-advance with reduced motion', () => {
    setReducedMotion(true);
    vi.useFakeTimers();
    render(<HeroShowcase studies={caseStudies} />);
    act(() => {
      vi.advanceTimersByTime(HERO_INTERVAL_MS * 2);
    });
    expect(selectedName()).toBe('Meal Direct');
  });
});
