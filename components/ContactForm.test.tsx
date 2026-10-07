import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ContactForm from '@/components/ContactForm';

function fill() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
  fireEvent.change(screen.getByLabelText('What do you need?'), { target: { value: 'web' } });
  fireEvent.change(screen.getByLabelText('Tell us about it'), { target: { value: 'A site for my bakery.' } });
}

describe('ContactForm', () => {
  it('posts the same payload shape the API expects', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(await screen.findByRole('heading', { name: 'Message sent' })).toBeTruthy();

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/contact');
    const body = JSON.parse(init.body);
    expect(Object.keys(body).sort()).toEqual(['budget', 'company', 'email', 'message', 'name', 'projectType', 'website']);
    expect(body).toMatchObject({ name: 'Ada', email: 'ada@example.com', projectType: 'web', message: 'A site for my bakery.', website: '' });
  });

  it('keeps the API option values', () => {
    render(<ContactForm />);
    const types = Array.from((screen.getByLabelText('What do you need?') as HTMLSelectElement).options).map((o) => o.value);
    expect(types).toEqual(['', 'web', 'mobile', 'software', 'branding', 'other']);
    const budgets = Array.from((screen.getByLabelText('Budget') as HTMLSelectElement).options).map((o) => o.value);
    expect(budgets).toEqual(['', '10-25k', '25-50k', '50-100k', '100k+']);
  });

  it('shows the API error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'Invalid email address' }) }));
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect((await screen.findByRole('alert')).textContent).toBe('Invalid email address');
  });
});
