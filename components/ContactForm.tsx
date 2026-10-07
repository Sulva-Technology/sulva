'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';

const emptyForm = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
  website: '',
};

const fieldClasses =
  'w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-[15px] text-white placeholder:text-white/40 outline-none transition focus:border-copper-soft focus:bg-white/10';
const labelClasses = 'mb-2 block text-sm text-white/80';

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Failed to submit');
      setIsSubmitted(true);
      setForm(emptyForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-10 text-center">
        <CheckCircle size={40} aria-hidden="true" className="mx-auto text-copper-soft" />
        <h2 className="mt-6 text-3xl font-medium tracking-tight">Message sent</h2>
        <p className="mx-auto mt-3 max-w-sm text-white/75">We&apos;ll be in touch within a working day.</p>
        <button type="button" onClick={() => setIsSubmitted(false)} className="mt-8 text-sm text-copper-soft underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={handleChange} className={`${fieldClasses} h-12`} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} className={`${fieldClasses} h-12`} />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClasses}>Business name <span className="text-white/45">(optional)</span></label>
        <input id="company" name="company" type="text" autoComplete="organization" value={form.company} onChange={handleChange} className={`${fieldClasses} h-12`} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="projectType" className={labelClasses}>What do you need?</label>
          <select id="projectType" name="projectType" value={form.projectType} onChange={handleChange} className={`${fieldClasses} h-12 [&>option]:bg-ink`}>
            <option value="">Choose one…</option>
            <option value="web">Website</option>
            <option value="mobile">Mobile app</option>
            <option value="software">Web app or platform</option>
            <option value="branding">Branding &amp; design</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClasses}>Budget</label>
          <select id="budget" name="budget" value={form.budget} onChange={handleChange} className={`${fieldClasses} h-12 [&>option]:bg-ink`}>
            <option value="">Choose a range…</option>
            <option value="10-25k">$10k – $25k</option>
            <option value="25-50k">$25k – $50k</option>
            <option value="50-100k">$50k – $100k</option>
            <option value="100k+">$100k+</option>
          </select>
        </div>
      </div>

      <div>
        <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <label htmlFor="message" className={labelClasses}>Tell us about it</label>
        <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className={`${fieldClasses} resize-none py-3`} placeholder="What does your business do, and what should the site help with?" />
      </div>

      <button type="submit" disabled={isSubmitting} className={buttonClasses({ className: 'w-full' })}>
        {isSubmitting ? 'Sending…' : (<>Send message <ArrowRight size={18} aria-hidden="true" /></>)}
      </button>
      {error ? <p role="alert" className="text-sm text-copper-soft">{error}</p> : null}
    </form>
  );
}
