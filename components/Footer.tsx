import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import NewsletterForm from '@/components/NewsletterForm';
import GradientField from '@/components/ui/GradientField';
import { siteConfig } from '@/lib/site';

const columns = [
  {
    title: 'Work',
    links: [
      { name: 'All work', href: '/work' },
      { name: 'Meal Direct', href: '/work#mealdirect' },
      { name: 'Services', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Insights', href: '/insights' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '/privacy-policy' },
      { name: 'Terms', href: '/terms-of-service' },
      { name: 'Cookies', href: '/cookie-policy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink px-5 pt-20 text-white md:px-10">
      <GradientField variant="panel" className="-z-10 opacity-60" />
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="max-w-md text-3xl font-medium tracking-tight md:text-4xl">
              Notes on building websites that work.
            </h2>
            <p className="mt-3 max-w-md text-muted-dark">One short email when we publish something useful. No spam.</p>
            <div className="mt-6 max-w-lg">
              <NewsletterForm />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-xs text-white/50">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/75 transition-colors hover:text-white">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-sm text-white/75">
            <a href={`mailto:${siteConfig.email}`} className="block transition-colors hover:text-white">
              {siteConfig.email}
            </a>
            <a href={siteConfig.phoneHref} className="block transition-colors hover:text-white">
              {siteConfig.phone}
            </a>
            <p>{siteConfig.location}</p>
          </div>
          <ul className="flex gap-2">
            {siteConfig.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} on ${social.name}`}
                  className="glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm text-white/85 transition-colors hover:text-white"
                >
                  {social.name}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none select-none text-center text-[26vw] font-semibold leading-[0.75] tracking-[-0.06em] text-white/[0.06]"
        >
          Sulva
        </p>
        <p className="relative pb-8 pt-4 text-xs text-white/40">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
