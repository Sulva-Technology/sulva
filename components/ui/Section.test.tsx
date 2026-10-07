import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Section from '@/components/ui/Section';

describe('Section', () => {
  it('renders an ink band with eyebrow and decorative gradient', () => {
    const { container } = render(
      <Section tone="ink" gradient="hero" eyebrow="01 — Featured">
        <h2>Title</h2>
      </Section>,
    );
    const section = container.querySelector('section')!;
    expect(section.className).toContain('bg-ink');
    expect(screen.getByText('01 — Featured')).toBeTruthy();
    expect(section.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('defaults to a paper band without gradient', () => {
    const { container } = render(<Section><p>Body</p></Section>);
    const section = container.querySelector('section')!;
    expect(section.className).toContain('bg-paper');
    expect(section.querySelector('[aria-hidden="true"]')).toBeNull();
  });
});
