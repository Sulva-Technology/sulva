import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
    title: 'Contact',
    description: 'Tell Sulva Tech about your website, online store or app. We reply within 1 working day.',
    path: '/contact',
});

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
