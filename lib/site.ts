import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Sulva Tech',
  shortName: 'Sulva',
  url: 'https://sulvatech.com',
  email: 'hello@sulvatech.com',
  careersEmail: 'careers@sulvatech.com',
  phone: '+234 901 000 0000',
  location: 'Lagos, Nigeria',
  tagline: 'Built to solve, designed to last.',
  description:
    'Sulva Tech designs, builds, and grows premium digital products with senior-led engineering, product strategy, and brand-grade execution.',
  ogImage: '/og-image.jpg',
  keywords: [
    'Sulva Tech',
    'software development agency',
    'product engineering',
    'web development Nigeria',
    'digital product studio',
    'technical partner',
    'UI UX design agency',
  ],
  services: [
    'Product engineering',
    'Technical strategy',
    'Design systems',
    'Growth-focused websites',
  ],
} as const;

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export function absoluteUrl(path: string) {
  if (!path) return siteConfig.url;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image = siteConfig.ogImage,
}: MetadataInput): Metadata {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

