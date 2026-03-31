'use client';

import { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
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
            <div className="bg-white/10 border border-green-500/30 rounded-full px-6 py-4 text-green-300 font-medium animate-in fade-in zoom-in duration-300 shadow-inner">
                Thanks for subscribing! Welcome to the loop.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow flex flex-col gap-1">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/20 transition-all"
                />
                {status === 'error' && (
                    <span className="text-red-400 text-sm pl-4 text-left">{message || 'Failed to subscribe. Try again.'}</span>
                )}
            </div>
            <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-70 text-white font-bold transition-colors shadow-lg whitespace-nowrap h-[58px]"
            >
                {status === 'loading' ? 'Sending...' : 'Subscribe'}
            </button>
        </form>
    );
}
