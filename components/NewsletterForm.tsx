'use client';

import { useId, useState } from 'react';
import { buttonClasses } from '@/components/ui/Button';

export default function NewsletterForm() {
  const inputId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Failed to subscribe');
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe. Try again.');
    }
  };

  if (status === 'success') {
    return (
      <p role="status" className="glass rounded-full px-5 py-3 text-sm text-white">
        Thanks — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubscribe}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          className="glass h-12 w-full rounded-full px-5 text-[15px] text-white placeholder:text-white/45 outline-none focus-visible:outline-2 focus-visible:outline-copper"
        />
        <button type="submit" disabled={status === 'loading'} className={buttonClasses({ className: 'shrink-0' })}>
          {status === 'loading' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' ? (
        <p role="alert" className="mt-2 pl-5 text-sm text-copper-soft">
          {message}
        </p>
      ) : null}
    </form>
  );
}
