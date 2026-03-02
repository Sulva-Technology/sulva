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
    default: 'Sulva Tech | Digital Powerhouse',
    template: '%s | Sulva Tech',
  },
  description: 'Transforming businesses through premium software development, strategic digital innovation, and future-ready technology solutions.',
  keywords: ['Software Development', 'Digital Transformation', 'UI/UX Design', 'Brand Strategy', 'Enterprise Software', 'Sulva Tech', 'Tech Agency'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sulva Tech | Digital Powerhouse',
    description: 'Transforming businesses through premium software development, strategic digital innovation, and future-ready technology solutions.',
    url: 'https://sulvatech.com',
    siteName: 'Sulva Tech',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sulva Tech - Digital Powerhouse',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sulva Tech | Digital Powerhouse',
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
  description: 'Transforming businesses through premium software development, strategic digital innovation, and future-ready technology solutions.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'Nigeria',
  },
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
      </head>
      <body className="bg-background-light text-text-main font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
