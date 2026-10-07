import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HideOnAdmin from '@/components/HideOnAdmin';
import StructuredData from '@/components/StructuredData';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import { services } from '@/lib/services';
import { absoluteUrl, organizationId, siteConfig, websiteId } from '@/lib/site';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const viewport: Viewport = {
  themeColor: '#0b0d0c',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.seoTitle} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder.name, url: siteConfig.founder.portfolio }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'technology',
  keywords: [...siteConfig.keywords],
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: `${siteConfig.seoTitle} | ${siteConfig.name}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}: ${siteConfig.tagline}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.seoTitle} | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}),
  },
};

// One entity for the business, referenced by @id from the website and from pages.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': organizationId,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/logo.jpg'),
    width: 512,
    height: 512,
  },
  image: absoluteUrl(siteConfig.ogImage),
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: siteConfig.socials.map((social) => social.href),
  founder: {
    '@type': 'Person',
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.role,
    url: siteConfig.founder.portfolio,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressRegion: 'Lagos',
    addressCountry: 'NG',
  },
  areaServed: [{ '@type': 'Country', name: 'Nigeria' }, 'Worldwide'],
  knowsAbout: ['Web design', 'Web development', 'Ecommerce websites', 'Web app development', 'SEO'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.seoDescription,
        url: absoluteUrl(`/services/${service.slug}`),
      },
    })),
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: siteConfig.url,
  inLanguage: 'en',
  publisher: { '@id': organizationId },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <StructuredData data={organizationJsonLd} />
        <StructuredData data={websiteJsonLd} />
        <AnalyticsScripts />
      </head>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <HideOnAdmin>
          <Navbar />
        </HideOnAdmin>
        <main className="flex-grow">{children}</main>
        <HideOnAdmin>
          <Footer />
        </HideOnAdmin>
      </body>
    </html>
  );
}
