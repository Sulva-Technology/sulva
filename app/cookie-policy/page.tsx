import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information about how Sulva Tech may use cookies and similar technologies.',
};

export default function CookiePolicyPage() {
  return (
    <div className="w-full px-6 py-16 md:py-24">
      <article className="prose prose-lg mx-auto max-w-4xl prose-headings:font-heading prose-headings:text-text-main prose-p:text-text-muted prose-li:text-text-muted">
        <h1>Cookie Policy</h1>
        <p>
          Sulva Tech may use cookies and similar technologies to support essential site
          functionality, understand usage patterns, and improve user experience.
        </p>
        <p>
          Essential cookies may be required for authentication, session continuity, and security.
          Analytics or marketing cookies should only be enabled once the site has the appropriate
          consent experience in place.
        </p>
        <p>
          If analytics or advertising tools are introduced, this policy should be updated to list
          the categories of cookies in use and the controls available to visitors.
        </p>
        <p>
          This policy should be reviewed and completed with legal counsel before production launch.
        </p>
      </article>
    </div>
  );
}
