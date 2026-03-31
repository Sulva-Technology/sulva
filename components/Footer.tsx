import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import Logo from '@/components/Logo';
import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 pb-12 pt-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1">
            <Link href="/" className="group mb-4 flex items-center gap-2 text-primary">
              <Logo className="h-6 w-6 transition-transform group-hover:scale-110" />
              <span className="font-heading text-xl font-bold tracking-tight text-text-main">
                Sulva Tech
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-text-muted">
              Senior-led product strategy, software delivery, and design systems for teams that need clarity and momentum.
            </p>
            <div className="space-y-3 text-sm text-text-muted">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-primary">
                  {siteConfig.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>{siteConfig.location}</span>
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-text-main transition-colors hover:text-primary">
                Start a project <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-heading font-bold text-text-main">Company</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className="text-sm text-text-muted transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-heading font-bold text-text-main">Services</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/services" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Product Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-heading font-bold text-text-main">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/privacy-policy" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-sm text-text-muted transition-colors hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-gray-100 pt-8 text-sm text-text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} Sulva Tech Inc. All rights reserved.</p>
          <div className="mt-4 flex items-center gap-2 md:mt-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Ready for new engagements</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
