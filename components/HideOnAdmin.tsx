'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Public chrome (nav, footer) stays out of the admin dashboard.
export default function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '';
  if (pathname.startsWith('/admin')) return null;
  return <>{children}</>;
}
