import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button, { buttonClasses } from '@/components/ui/Button';

describe('Button', () => {
  it('renders an internal link without target', () => {
    render(<Button href="/contact">Start a project</Button>);
    const link = screen.getByRole('link', { name: 'Start a project' });
    expect(link.getAttribute('href')).toBe('/contact');
    expect(link.getAttribute('target')).toBeNull();
  });

  it('opens external http links in a new tab safely', () => {
    render(<Button href="https://www.mealdirectly.com">Visit</Button>);
    const link = screen.getByRole('link', { name: 'Visit' });
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('keeps mailto links in the same tab', () => {
    render(<Button href="mailto:hello@sulvatech.com">Email</Button>);
    expect(screen.getByRole('link', { name: 'Email' }).getAttribute('target')).toBeNull();
  });

  it('renders a type=button element without href', () => {
    render(<Button>Send</Button>);
    expect(screen.getByRole('button', { name: 'Send' }).getAttribute('type')).toBe('button');
  });

  it('uses a white pill for primary on dark and an ink pill on light', () => {
    expect(buttonClasses({ variant: 'primary', tone: 'dark' })).toContain('bg-white');
    expect(buttonClasses({ variant: 'primary', tone: 'light' })).toContain('bg-ink');
    expect(buttonClasses({ variant: 'secondary', tone: 'dark' })).toContain('glass');
  });
});
