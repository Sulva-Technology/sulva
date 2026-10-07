import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Sulva Tech',
  alternateName: 'Sulva Technology',
  shortName: 'Sulva',
  url: 'https://sulvatech.com',
  email: 'hello@sulvatech.com',
  careersEmail: 'careers@sulvatech.com',
  phone: '+234 701 743 9615',
  phoneHref: 'tel:+2347017439615',
  location: 'Lagos, Nigeria',
  tagline: 'Websites that grow your brand.',
  // What people type into Google. Used for the home page title.
  seoTitle: 'Web Design Company in Lagos, Nigeria',
  description:
    'Sulva Tech designs and builds websites, online stores and the systems behind them for founders and growing businesses. Every site comes with its own dashboard.',
  ogImage: '/og-image.jpg',
  founder: {
    name: 'Iyiola Ogunjobi',
    role: 'Founder',
    portfolio: 'https://iyiola.sulvatech.com',
  },
  socials: [
    { name: 'Instagram', handle: '@sulvatech', href: 'https://www.instagram.com/sulvatech' },
    { name: 'TikTok', handle: '@sulvatech', href: 'https://www.tiktok.com/@sulvatech' },
  ],
  keywords: [
    'Sulva Tech',
    'Sulva Technology',
    'web design company Lagos',
    'website design Nigeria',
    'web developer Lagos',
    'ecommerce website Nigeria',
    'web app development Nigeria',
    'business website with dashboard',
  ],
  services: ['Brand websites', 'Online stores', 'Products and apps'],
} as const;

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  // Use the title as written, without the "| Sulva Tech" suffix.
  absoluteTitle?: boolean;
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
  absoluteTitle = false,
}: MetadataInput): Metadata {
  const fullTitle = absoluteTitle || title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
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


export function buildFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
