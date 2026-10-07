import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WorkShowcase from '@/components/WorkShowcase';
import { caseStudies } from '@/lib/work';

const projectNames = () => screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

describe('WorkShowcase', () => {
  it('shows all six projects by default', () => {
    render(<WorkShowcase studies={caseStudies} />);
    expect(projectNames()).toHaveLength(6);
    expect(screen.getByRole('button', { name: 'All' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('filters to stores', () => {
    render(<WorkShowcase studies={caseStudies} />);
    fireEvent.click(screen.getByRole('button', { name: 'Store' }));
    expect(projectNames()).toEqual(['Itzlolabeauty', 'theDMAshop']);
    expect(screen.getByRole('button', { name: 'Store' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('shows what we built on each card', () => {
    render(<WorkShowcase studies={caseStudies} />);
    expect(screen.getByText(/five connected apps/)).toBeTruthy();
  });
});
