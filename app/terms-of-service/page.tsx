import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'General terms governing use of the Sulva Tech website.',
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full px-6 py-16 md:py-24">
      <article className="prose prose-lg mx-auto max-w-4xl prose-headings:font-heading prose-headings:text-text-main prose-p:text-text-muted prose-li:text-text-muted">
        <h1>Terms of Service</h1>
        <p>
          By using the Sulva Tech website, you agree to use it lawfully and not to interfere with
          its operation, security, or availability.
        </p>
        <p>
          Website content is provided for general informational purposes and may be updated,
          replaced, or removed without notice.
        </p>
        <p>
          Submitting a form through this website does not create a client relationship by itself.
          Any commercial engagement must be confirmed separately in writing.
        </p>
        <p>
          You must not attempt unauthorized access, automated abuse, spam submission, scraping of
          protected data, or misuse of the admin functionality.
        </p>
        <p>
          These terms should be reviewed and finalized with legal counsel before production launch.
        </p>
      </article>
    </div>
  );
}
