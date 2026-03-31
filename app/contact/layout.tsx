import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
    title: 'Contact',
    description: 'Get in touch with Sulva Tech to discuss your next website, product, system, or content-led growth project.',
    path: '/contact',
});

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
