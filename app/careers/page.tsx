import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'We are growing carefully. Tell us what you build best and we will reach out when a matching role opens.',
};

export default function CareersPage() {
  return (
    <div className="w-full px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto rounded-3xl border border-gray-200 bg-white p-10 md:p-16 text-center shadow-sm">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
          Careers
        </span>
        <h1 className="mt-6 text-4xl font-heading font-black tracking-tight text-text-main md:text-5xl">
          Build With Sulva Tech
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted">
          We are not listing open roles publicly yet, but we are actively meeting exceptional engineers,
          designers, and product thinkers for future opportunities.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-text-muted">
          If you would like to be considered for upcoming roles, send us your background and the kind of
          work you do best.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white transition-all hover:bg-primary-dark"
          >
            Contact the Team
          </Link>
          <a
            href="mailto:careers@sulvatech.com"
            className="flex h-12 items-center justify-center rounded-full border border-gray-200 px-8 text-base font-bold text-text-main transition-colors hover:border-primary hover:text-primary"
          >
            careers@sulvatech.com
          </a>
        </div>
      </div>
    </div>
  );
}
