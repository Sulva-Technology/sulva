import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Sulva Tech collects, uses, and protects personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full px-6 py-16 md:py-24">
      <article className="prose prose-lg mx-auto max-w-4xl prose-headings:font-heading prose-headings:text-text-main prose-p:text-text-muted prose-li:text-text-muted">
        <h1>Privacy Policy</h1>
        <p>
          Sulva Tech collects the information you submit through contact and newsletter forms
          so we can respond to enquiries, manage project conversations, and share requested
          updates.
        </p>
        <p>
          We only collect information that is relevant to those purposes, such as your name,
          email address, company, project details, and newsletter subscription status.
        </p>
        <p>
          We use service providers such as Supabase and Resend to process form submissions and
          notifications. Access to submitted information is restricted to authorized personnel.
        </p>
        <p>
          You may request correction or deletion of your information by contacting Sulva Tech
          directly. We will handle those requests in line with applicable law and our operational
          obligations.
        </p>
        <p>
          This policy should be reviewed and adapted with legal counsel before production launch.
        </p>
      </article>
    </div>
  );
}
