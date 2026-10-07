import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NewsletterForm from '@/components/NewsletterForm';

describe('NewsletterForm', () => {
  it('posts the email and confirms', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'ada@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect((await screen.findByRole('status')).textContent).toContain("you're on the list");
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/newsletter',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ email: 'ada@example.com' }) }),
    );
  });

  it('shows the API error message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'Too many requests' }) }));
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'ada@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect((await screen.findByRole('alert')).textContent).toBe('Too many requests');
  });
});
