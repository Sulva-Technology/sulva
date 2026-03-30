import Link from 'next/link';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from '@/components/Logo';

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
              Premium digital solutions for the modern enterprise. We build the future.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/sulvatech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com/company/sulvatech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com/sulvatech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
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
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
