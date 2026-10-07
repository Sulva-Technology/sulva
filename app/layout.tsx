import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HideOnAdmin from '@/components/HideOnAdmin';
import StructuredData from '@/components/StructuredData';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import { absoluteUrl, siteConfig } from '@/lib/site';

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.tagline}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
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
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl('/logo.jpg'),
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: siteConfig.socials.map((social) => social.href),
  founder: {
    '@type': 'Person',
    name: siteConfig.founder.name,
    url: siteConfig.founder.portfolio,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'Nigeria',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl(siteConfig.ogImage),
  description: siteConfig.description,
  areaServed: 'Worldwide',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'Nigeria',
  },
  email: siteConfig.email,
  telephone: siteConfig.phone,
  knowsAbout: siteConfig.services,
};

const navigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    { '@type': 'SiteNavigationElement', position: 1, name: 'Services', url: absoluteUrl('/services') },
    { '@type': 'SiteNavigationElement', position: 2, name: 'Work', url: absoluteUrl('/work') },
    { '@type': 'SiteNavigationElement', position: 3, name: 'About', url: absoluteUrl('/about') },
    { '@type': 'SiteNavigationElement', position: 4, name: 'Insights', url: absoluteUrl('/insights') },
    { '@type': 'SiteNavigationElement', position: 5, name: 'Contact', url: absoluteUrl('/contact') },
  ],
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
        <StructuredData data={serviceJsonLd} />
        <StructuredData data={navigationJsonLd} />
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
