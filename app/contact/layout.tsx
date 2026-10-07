import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
    title: 'Contact Us for a Website Quote',
    description:
        'Tell Sulva Tech about your website, online store or app. We reply within 1 working day, then send a written plan and quote you approve first.',
    keywords: ['website quote Lagos', 'hire web designer Nigeria'],
    path: '/contact',
});

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
