import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import { getServiceExamples, services } from '@/lib/services';

const items = services.map((service) => ({ service, example: getServiceExamples(service)[0] }));

describe('ServicesShowcase', () => {
  it('starts on brand websites and switches the example on click', () => {
    render(<ServicesShowcase items={items} />);
    expect(screen.getByRole('tabpanel').textContent).toContain('Mindfire Homes');
    fireEvent.click(screen.getByRole('tab', { name: /Products & apps/ }));
    expect(screen.getByRole('tabpanel').textContent).toContain('Meal Direct');
  });

  it('moves down the list with the arrow keys', () => {
    render(<ServicesShowcase items={items} />);
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowDown' });
    expect(screen.getByRole('tab', { selected: true }).textContent).toContain('Online stores');
  });
});
