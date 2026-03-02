import Link from 'next/link';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white pt-16 pb-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-primary mb-4 group">
              <Logo className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span className="text-text-main font-heading font-bold text-xl tracking-tight">
                Sulva Tech
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Premium digital solutions for the modern enterprise. We build the future.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/sulvatech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com/company/sulvatech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com/sulvatech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-text-main mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className="text-text-muted hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-text-main mb-6">Services</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/services" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Product Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-text-main mb-6">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-muted hover:text-primary text-sm transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-text-muted pt-8 border-t border-gray-100">
          <p>© {new Date().getFullYear()} Sulva Tech Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
