import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Navbar from '@/components/Navbar';

const nav = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('next/navigation', () => ({ usePathname: () => nav.pathname }));

describe('Navbar', () => {
  beforeEach(() => {
    nav.pathname = '/';
  });

  it('shows the four main links and the CTA', () => {
    render(<Navbar />);
    const main = screen.getByRole('navigation', { name: 'Main' });
    for (const name of ['Work', 'Services', 'About', 'Insights']) {
      expect(within(main).getByRole('link', { name })).toBeTruthy();
    }
    expect(within(main).getByRole('link', { name: 'Start a project' }).getAttribute('href')).toBe('/contact');
  });

  it('marks the current section, including nested pages', () => {
    nav.pathname = '/insights/some-post';
    render(<Navbar />);
    const main = screen.getByRole('navigation', { name: 'Main' });
    expect(within(main).getByRole('link', { name: 'Insights' }).getAttribute('aria-current')).toBe('page');
    expect(within(main).getByRole('link', { name: 'Work' }).getAttribute('aria-current')).toBeNull();
  });

  it('opens the mobile menu and closes it with Escape', () => {
    render(<Navbar />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(document.getElementById('mobile-menu')).not.toBeNull();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.getElementById('mobile-menu')).toBeNull();
  });
});
