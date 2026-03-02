'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4',
        isScrolled ? 'py-2' : 'py-6'
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300',
          isScrolled || isMobileMenuOpen
            ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/20'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-primary transition-transform group-hover:scale-110">
            <Logo className="w-8 h-8" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-text-main">
            Sulva Tech
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary font-bold' : 'text-text-muted'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary-dark text-white rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-text-main"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5 fade-in duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'text-lg font-medium py-2 border-b border-gray-50 last:border-0',
                pathname === link.href ? 'text-primary' : 'text-text-main'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-primary text-white text-center rounded-xl py-3 font-bold mt-2"
          >
            Start a Project
          </Link>
        </div>
      )}
    </nav>
  );
}
