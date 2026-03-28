import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sulvatech.com'),
  title: {
    default: 'Sulva Tech | BUILT TO SOLVE, DESIGNED TO LAST',
    template: '%s | Sulva Tech',
  },
  description: 'Transforming businesses through premium software development, strategic digital innovation, and future-ready technology solutions.',
  keywords: ['Software Development', 'Digital Transformation', 'UI/UX Design', 'Brand Strategy', 'Enterprise Software', 'Sulva Tech', 'Tech Agency'],
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sulva Tech | BUILT TO SOLVE, DESIGNED TO LAST',
    description: 'Transforming businesses through premium software development, strategic digital innovation, and future-ready technology solutions.',
    url: 'https://sulvatech.com',
    siteName: 'Sulva Tech',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sulva Tech - BUILT TO SOLVE, DESIGNED TO LAST',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sulva Tech | BUILT TO SOLVE, DESIGNED TO LAST',
    description: 'Transforming businesses through premium software development, strategic digital innovation, and future-ready technology solutions.',
    images: ['/og-image.jpg'],
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sulva Tech',
  url: 'https://sulvatech.com',
  logo: 'https://sulvatech.com/logo.jpg',
  sameAs: [
    'https://twitter.com/sulvatech',
    'https://linkedin.com/company/sulvatech',
  ],
  description: 'BUILT TO SOLVE, DESIGNED TO LAST - Premium software development and digital transformation.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'Nigeria',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sulva Tech',
  url: 'https://sulvatech.com',
};

const navigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    { '@type': 'SiteNavigationElement', position: 1, name: 'Services', url: 'https://sulvatech.com/services' },
    { '@type': 'SiteNavigationElement', position: 2, name: 'Work', url: 'https://sulvatech.com/work' },
    { '@type': 'SiteNavigationElement', position: 3, name: 'About', url: 'https://sulvatech.com/about' },
    { '@type': 'SiteNavigationElement', position: 4, name: 'Insights', url: 'https://sulvatech.com/insights' },
    { '@type': 'SiteNavigationElement', position: 5, name: 'Contact', url: 'https://sulvatech.com/contact' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationJsonLd) }}
        />
      </head>
      <body className="bg-background-light text-text-main font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
