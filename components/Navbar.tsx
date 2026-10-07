'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonClasses } from '@/components/ui/Button';

export const navLinks = [
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Insights', href: '/insights' },
];

// Pages that open on a light section (no dark hero), so the nav starts solid.
const LIGHT_TOP_ROUTES = ['/privacy-policy', '/terms-of-service', '/cookie-policy'];

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname() ?? '/';
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers the page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusables = () => Array.from(sheetRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []);
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenOn(null);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open || LIGHT_TOP_ROUTES.includes(pathname);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6">
      <nav
        aria-label="Main"
        className={cn(
          'mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-300',
          solid
            ? 'border-white/10 bg-ink/70 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.6)] backdrop-blur-xl'
            : 'border-transparent',
        )}
      >
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          Sulva<span className="text-copper-soft">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const current = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm transition-colors',
                    current ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white',
                  )}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/contact" className={buttonClasses({ className: 'hidden h-10 px-5 text-sm md:inline-flex' })}>
            Start a project
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpenOn(open ? null : pathname)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          ref={sheetRef}
          className="glass mx-auto mt-2 flex h-[calc(100dvh-6rem)] max-w-[1240px] flex-col justify-between rounded-panel bg-ink/80 p-4 md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                  className="block rounded-2xl px-3 py-3 text-3xl font-medium tracking-tight text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className={buttonClasses({ className: 'w-full' })}>
            Start a project
          </Link>
        </div>
      ) : null}
    </header>
  );
}
