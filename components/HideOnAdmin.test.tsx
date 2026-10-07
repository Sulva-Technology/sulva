import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HideOnAdmin from '@/components/HideOnAdmin';

const nav = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('next/navigation', () => ({ usePathname: () => nav.pathname }));

describe('HideOnAdmin', () => {
  it('renders children on public pages', () => {
    nav.pathname = '/work';
    render(<HideOnAdmin><p>chrome</p></HideOnAdmin>);
    expect(screen.getByText('chrome')).toBeTruthy();
  });

  it('renders nothing under /admin', () => {
    nav.pathname = '/admin/insights';
    render(<HideOnAdmin><p>chrome</p></HideOnAdmin>);
    expect(screen.queryByText('chrome')).toBeNull();
  });
});
