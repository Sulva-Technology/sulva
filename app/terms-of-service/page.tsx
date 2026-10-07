import { buildMetadata } from '@/lib/site';
import LegalPage from '@/components/LegalPage';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'General terms governing use of the Sulva Tech website, forms, content, and admin access.',
  path: '/terms-of-service',
});

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service">
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
          Sulva Tech may suspend access or block activity that appears abusive, unlawful, or harmful to the site,
          our systems, or other users.
        </p>
    </LegalPage>
  );
}
