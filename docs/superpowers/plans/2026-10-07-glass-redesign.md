# Sulva Glass Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild every public page of sulvatech.com on a Primefold-inspired dark-gradient + glass design system, with plain copy and the six real client projects (Meal Direct featured) as the proof.

**Architecture:** New design tokens in `app/globals.css` plus a small set of primitives in `components/ui/`. Case-study and service content lives in typed data modules (`lib/work.ts`, `lib/services.ts`) consumed by the pages. Project footage comes from the existing Playwright recorder in `videos/`, converted to short web loops in `public/work/`. API routes, admin, Supabase, middleware and SEO helpers are untouched.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4 (`@theme`, `@utility`), `motion` 12, `lucide-react`, Vitest 3 + Testing Library + jsdom (added in Task 1), Playwright + `ffmpeg-static` (already in `videos/`).

**Spec:** `docs/superpowers/specs/2026-10-07-glass-redesign-design.md`

## Global Constraints

- Branch: all work on `redesign/glass`, never on `main`.
- Colours (exact): ink `#0B0D0C`, ink-soft `#151918`, paper `#F4F1EC`, paper-raised `#FFFFFF`, teal `#0F3B36`, teal-glow `#1F6B5F`, copper `#B8673A`, copper-soft `#E2A57C`, muted `#5E615F`, muted-dark `rgba(255,255,255,0.64)`.
- Glass recipe (exact, one recipe only): `background rgb(255 255 255 / 0.08); backdrop-filter blur(24px) saturate(140%); border 1px solid rgb(255 255 255 / 0.14); box-shadow inset 0 1px 0 rgb(255 255 255 / 0.18), 0 20px 60px -20px rgb(0 0 0 / 0.5)`. Mobile blur 16px. Fallback without backdrop-filter: `rgb(21 25 24 / 0.92)`.
- Glass is only used on elements layered over a gradient or video. Content on `paper` uses solid surfaces.
- Type: Geist (display + body) and Geist Mono (labels). Sentence-case headlines, no uppercase headlines, no italic accent words.
- Radii: panels 28px, cards 20px, pills 999px. Content max width 1240px. Side gutter 20px mobile / 40px desktop.
- All motion respects `prefers-reduced-motion` (no drift, no auto-advance, videos show poster only).
- Copy banned words (case-insensitive): "senior-led", "growth system", "premium digital execution", "end-to-end", "cutting-edge", "solutions", "synergy", "world-class", "leverage".
- No numbers/stats about clients. No details from private repos (pilot campus, infra hosts, internal URLs).
- Contact facts: email `hello@sulvatech.com`, phone `+234 701 743 9615`, location Lagos, Nigeria, Instagram `https://www.instagram.com/sulvatech`, TikTok `https://www.tiktok.com/@sulvatech`, founder Iyiola Ogunjobi → `https://iyiola.sulvatech.com`.
- No prices. Not hiring. "We reply within 1 working day" is allowed; no project timelines.
- Contact form: field names, select values and `POST /api/contact` payload must stay exactly the same (`name, email, company, projectType, budget, message, website`; projectType ∈ `web|mobile|software|branding|other`; budget ∈ `10-25k|25-50k|50-100k|100k+`).
- Do not modify: `app/api/**`, `app/admin/**`, `components/admin/**`, `lib/supabase/**`, `lib/insights.ts`, `lib/rate-limit.ts`, `middleware.ts`, `supabase_schema.sql`, `app/sitemap.ts`, `app/robots.ts`.
- Every commit message ends with the trailer line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Shell: Git Bash on Windows. Run commands from the repo root `C:\server\sulva` unless a step says otherwise.

## File map

| File | Responsibility |
| --- | --- |
| `vitest.config.ts`, `vitest.setup.tsx`, `test/utils.ts` | Test harness (jsdom, `@` alias, `next/image` stub, matchMedia/IntersectionObserver stubs) |
| `lib/site.ts` | Site facts: contact, socials, founder, positioning copy, metadata helpers |
| `app/globals.css` | Tokens, `glass`/`grain`/`display-*` utilities, drift animation, typography plugin |
| `app/layout.tsx` | Fonts, structured data, chrome (nav/footer hidden on `/admin`) |
| `components/HideOnAdmin.tsx` | Renders children except under `/admin` |
| `components/ui/Button.tsx` | Pill button/link + `buttonClasses()` |
| `components/ui/Chip.tsx` | Pill label + `chipClasses()` |
| `components/ui/GlassPanel.tsx` | Glass surface |
| `components/ui/GradientField.tsx` | Teal→copper gradient + grain background layer |
| `components/ui/Section.tsx` | Page band (ink/paper) + `Eyebrow` |
| `components/ui/PageHero.tsx` | Standard dark page header |
| `components/ui/Reveal.tsx` | Fade-and-rise on scroll |
| `components/ui/usePrefersReducedMotion.ts` | Reduced-motion hook |
| `components/ui/useTabs.ts` | Tablist state + keyboard nav + `wrapIndex()` |
| `components/ui/VideoFrame.tsx` | Poster + muted loop video, plays in view or on hover |
| `videos/projects.mjs`, `videos/stills.mjs`, `videos/web.mjs`, `videos/package.json`, `videos/README.md` | Footage capture + web loop export |
| `public/work/<slug>/{teaser.mp4,poster.jpg}` | Project media |
| `lib/work.ts` | Six case studies + lookups/filters |
| `lib/services.ts` | Three services + example lookups |
| `components/Navbar.tsx` | Floating pill nav + mobile sheet |
| `components/Footer.tsx`, `components/NewsletterForm.tsx`, `components/CtaBand.tsx`, `app/not-found.tsx` | Shared chrome |
| `components/home/HeroShowcase.tsx`, `components/home/ServicesShowcase.tsx` | Home interactive blocks |
| `components/work/FeaturedCaseStudy.tsx`, `components/work/WorkCard.tsx`, `components/WorkShowcase.tsx` | Work presentation |
| `components/InsightCard.tsx`, `components/InsightsFeed.tsx` | Insights presentation |
| `components/ContactForm.tsx` | Contact form (client) |
| `components/LegalPage.tsx` | Legal page shell |
| `app/page.tsx`, `app/work/page.tsx`, `app/services/page.tsx`, `app/about/page.tsx`, `app/careers/page.tsx`, `app/contact/page.tsx`, `app/contact/layout.tsx`, `app/insights/page.tsx`, `app/insights/[slug]/page.tsx`, legal pages | Pages |
| `tests/site-guards.test.ts` | Enforces banned copy + no legacy tokens on public files |

---

### Task 1: Branch, test harness, site facts

**Files:**
- Modify: `package.json` (scripts + devDependencies)
- Create: `vitest.config.ts`, `vitest.setup.tsx`, `test/utils.ts`
- Modify: `lib/site.ts:3-31`
- Test: `lib/site.test.ts`

**Interfaces:**
- Produces: `siteConfig` with new fields `phoneHref: string`, `founder: { name: string; role: string; portfolio: string }`, `socials: ReadonlyArray<{ name: string; handle: string; href: string }>`; `setReducedMotion(reduce: boolean): void` in `test/utils.ts`; `npm test` script.

- [ ] **Step 1: Create the branch**

```bash
git checkout -b redesign/glass
```

- [ ] **Step 2: Install test dependencies**

```bash
npm install -D vitest@^3 jsdom@^26 @testing-library/react@^16 @testing-library/dom@^10
```

Then add to `package.json` `"scripts"` (keep existing scripts):

```json
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { jsx: 'automatic' },
  resolve: {
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.tsx'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', 'videos/**', '.next/**'],
    css: false,
  },
});
```

- [ ] **Step 4: Create `test/utils.ts`**

```ts
// Test helpers shared across component tests.

export function setReducedMotion(reduce: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
```

- [ ] **Step 5: Create `vitest.setup.tsx`**

```tsx
import type { ImgHTMLAttributes } from 'react';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { setReducedMotion } from './test/utils';

type NextImageProps = ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean };

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: NextImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ),
}));

class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
HTMLMediaElement.prototype.play = function play() {
  return Promise.resolve();
};
HTMLMediaElement.prototype.pause = function pause() {};

beforeEach(() => setReducedMotion(false));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
```

- [ ] **Step 6: Write the failing test `lib/site.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/lib/site';

describe('siteConfig', () => {
  it('uses the real phone number with a matching tel: link', () => {
    expect(siteConfig.phone).toBe('+234 701 743 9615');
    expect(siteConfig.phoneHref).toBe('tel:+2347017439615');
  });

  it('lists Instagram and TikTok as @sulvatech', () => {
    expect(siteConfig.socials.map((s) => s.href)).toEqual([
      'https://www.instagram.com/sulvatech',
      'https://www.tiktok.com/@sulvatech',
    ]);
  });

  it('links the founder portfolio', () => {
    expect(siteConfig.founder).toEqual({
      name: 'Iyiola Ogunjobi',
      role: 'Founder',
      portfolio: 'https://iyiola.sulvatech.com',
    });
  });

  it('describes the new positioning', () => {
    expect(siteConfig.tagline).toBe('Websites that grow your brand.');
    expect(siteConfig.description).toContain('systems behind them');
  });
});
```

- [ ] **Step 7: Run it to verify it fails**

Run: `npx vitest run lib/site.test.ts`
Expected: FAIL — `expected '+234 901 000 0000' to be '+234 701 743 9615'` (and `phoneHref`/`founder`/`socials` undefined).

- [ ] **Step 8: Replace the `siteConfig` object in `lib/site.ts` (lines 3–31; keep everything below it unchanged)**

```ts
export const siteConfig = {
  name: 'Sulva Tech',
  shortName: 'Sulva',
  url: 'https://sulvatech.com',
  email: 'hello@sulvatech.com',
  careersEmail: 'careers@sulvatech.com',
  phone: '+234 701 743 9615',
  phoneHref: 'tel:+2347017439615',
  location: 'Lagos, Nigeria',
  tagline: 'Websites that grow your brand.',
  description:
    'Sulva Tech designs and builds websites, online stores and the systems behind them for founders and growing businesses. Every site comes with its own dashboard.',
  ogImage: '/og-image.jpg',
  founder: {
    name: 'Iyiola Ogunjobi',
    role: 'Founder',
    portfolio: 'https://iyiola.sulvatech.com',
  },
  socials: [
    { name: 'Instagram', handle: '@sulvatech', href: 'https://www.instagram.com/sulvatech' },
    { name: 'TikTok', handle: '@sulvatech', href: 'https://www.tiktok.com/@sulvatech' },
  ],
  keywords: [
    'Sulva Tech',
    'web design Lagos',
    'website design Nigeria',
    'ecommerce website Nigeria',
    'web app development Nigeria',
    'business website with dashboard',
  ],
  services: ['Brand websites', 'Online stores', 'Products and apps'],
} as const;
```

- [ ] **Step 9: Run it to verify it passes**

Run: `npx vitest run lib/site.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.tsx test/utils.ts lib/site.ts lib/site.test.ts
git commit -m "chore: add vitest harness and update site facts" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Design tokens, fonts, layout chrome

**Files:**
- Modify: `app/globals.css` (full replace)
- Modify: `app/layout.tsx` (fonts, JSON-LD, body, chrome)
- Create: `components/HideOnAdmin.tsx`
- Test: `components/HideOnAdmin.test.tsx`

**Interfaces:**
- Consumes: `siteConfig.phone`, `siteConfig.socials`, `siteConfig.founder` (Task 1).
- Produces: Tailwind classes `bg-ink`, `bg-ink-soft`, `bg-paper`, `bg-paper-raised`, `text-copper`, `text-copper-soft`, `text-muted`, `text-muted-dark`, `rounded-card`, `rounded-panel`, `animate-drift`, `glass`, `grain`, `display-xl`, `display-lg`, `display-md`, `font-mono`; prose classes via typography plugin; `<HideOnAdmin>{children}</HideOnAdmin>`.

- [ ] **Step 1: Write the failing test `components/HideOnAdmin.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HideOnAdmin from '@/components/HideOnAdmin';

const nav = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('next/navigation', () => ({ usePathname: () => nav.pathname }));

describe('HideOnAdmin', () => {
  it('renders children on public pages', () => {
    nav.pathname = '/work';
    render(<HideOnAdmin><p>chrome</p></HideOnAdmin>);
    expect(screen.getByText('chrome')).toBeTruthy();
  });

  it('renders nothing under /admin', () => {
    nav.pathname = '/admin/insights';
    render(<HideOnAdmin><p>chrome</p></HideOnAdmin>);
    expect(screen.queryByText('chrome')).toBeNull();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/HideOnAdmin.test.tsx`
Expected: FAIL — cannot resolve `@/components/HideOnAdmin`.

- [ ] **Step 3: Create `components/HideOnAdmin.tsx`**

```tsx
'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Public chrome (nav, footer) stays out of the admin dashboard.
export default function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '';
  if (pathname.startsWith('/admin')) return null;
  return <>{children}</>;
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/HideOnAdmin.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Replace `app/globals.css` entirely**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-ink: #0b0d0c;
  --color-ink-soft: #151918;
  --color-paper: #f4f1ec;
  --color-paper-raised: #ffffff;
  --color-teal: #0f3b36;
  --color-teal-glow: #1f6b5f;
  --color-copper: #b8673a;
  --color-copper-soft: #e2a57c;
  --color-muted: #5e615f;
  --color-muted-dark: rgb(255 255 255 / 0.64);

  /* Legacy names so not-yet-migrated pages and components/admin/* keep compiling.
     Trimmed to --color-primary only in Task 16. */
  --color-primary: #b8673a;
  --color-primary-dark: #8f4d29;
  --color-primary-light: #e2a57c;
  --color-background-light: #f4f1ec;
  --color-background-dark: #0b0d0c;
  --color-surface-light: #ffffff;
  --color-surface-dark: #151918;
  --color-text-main: #0b0d0c;
  --color-text-muted: #5e615f;
  --font-heading: var(--font-geist), ui-sans-serif, system-ui, sans-serif;

  --font-sans: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;

  --radius-card: 20px;
  --radius-panel: 28px;

  --animate-drift: drift 24s ease-in-out infinite alternate;

  @keyframes drift {
    from {
      transform: translate3d(0, 0, 0) scale(1);
    }
    to {
      transform: translate3d(-4%, 3%, 0) scale(1.08);
    }
  }
}

@layer base {
  html {
    background-color: var(--color-paper);
    color: var(--color-ink);
  }

  ::selection {
    background-color: var(--color-copper);
    color: #fff;
  }

  :focus-visible {
    outline: 2px solid var(--color-copper);
    outline-offset: 2px;
  }
}

/* The one glass recipe. Only for elements layered over a gradient or video. */
@utility glass {
  background-color: rgb(255 255 255 / 0.08);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgb(255 255 255 / 0.14);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), 0 20px 60px -20px rgb(0 0 0 / 0.5);

  @media (max-width: 767px) {
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    backdrop-filter: blur(16px) saturate(140%);
  }

  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    background-color: rgb(21 25 24 / 0.92);
  }
}

/* Fine film grain, inline SVG so it costs no request. */
@utility grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@utility display-xl {
  font-size: clamp(3rem, 8vw, 7.5rem);
  line-height: 0.95;
  letter-spacing: -0.035em;
  font-weight: 500;
  text-wrap: balance;
}

@utility display-lg {
  font-size: clamp(2.5rem, 5.5vw, 4.75rem);
  line-height: 1;
  letter-spacing: -0.035em;
  font-weight: 500;
  text-wrap: balance;
}

@utility display-md {
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 500;
  text-wrap: balance;
}

@media (prefers-reduced-motion: reduce) {
  .animate-drift {
    animation: none;
  }
}
```

- [ ] **Step 6: Update `app/layout.tsx`**

Replace the font imports/constants (lines 2 and 10–20) with:

```tsx
import { Geist, Geist_Mono } from 'next/font/google';
```

```tsx
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
```

Add the import below the `Footer` import:

```tsx
import HideOnAdmin from '@/components/HideOnAdmin';
```

Replace `organizationJsonLd` with:

```tsx
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
```

In `serviceJsonLd`, add `telephone: siteConfig.phone,` after `email: siteConfig.email,`.

Replace the `return (...)` of `RootLayout` with:

```tsx
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
```

- [ ] **Step 7: Verify build and tests**

Run: `npm test && npm run build`
Expected: tests PASS; build completes with no errors (old pages still render with the legacy aliases).

- [ ] **Step 8: Commit**

```bash
git add app/globals.css app/layout.tsx components/HideOnAdmin.tsx components/HideOnAdmin.test.tsx
git commit -m "feat: add glass design tokens, Geist fonts and admin-free chrome" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: UI primitives

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Chip.tsx`, `components/ui/GlassPanel.tsx`, `components/ui/GradientField.tsx`, `components/ui/Section.tsx`, `components/ui/PageHero.tsx`, `components/ui/Reveal.tsx`, `components/ui/usePrefersReducedMotion.ts`
- Test: `components/ui/Button.test.tsx`, `components/ui/Section.test.tsx`

**Interfaces:**
- Consumes: tokens/utilities from Task 2.
- Produces:
  - `buttonClasses(opts?: { variant?: 'primary' | 'secondary'; tone?: 'dark' | 'light'; className?: string }): string`; default export `Button` (props `variant`, `tone`, `className`, `children`, plus either `href: string` + anchor attrs, or native button attrs).
  - `chipClasses(opts?: { active?: boolean; tone?: 'dark' | 'light'; className?: string }): string`; default export `Chip` (span).
  - default export `GlassPanel({ as?, className, ...htmlAttrs })`.
  - `type GradientVariant = 'hero' | 'panel' | 'cta'`; default export `GradientField({ variant?, solid?: boolean = true, className? })`.
  - `type SectionTone = 'ink' | 'paper'`; named `Eyebrow({ children, tone?, className? })`; default `Section({ id?, tone?, gradient?, eyebrow?, className?, containerClassName?, children })`.
  - default `PageHero({ eyebrow?, title, sub?, children? })`.
  - default `Reveal({ children, delay?: number, className? })`.
  - `usePrefersReducedMotion(): boolean`.

- [ ] **Step 1: Write the failing tests**

`components/ui/Button.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button, { buttonClasses } from '@/components/ui/Button';

describe('Button', () => {
  it('renders an internal link without target', () => {
    render(<Button href="/contact">Start a project</Button>);
    const link = screen.getByRole('link', { name: 'Start a project' });
    expect(link.getAttribute('href')).toBe('/contact');
    expect(link.getAttribute('target')).toBeNull();
  });

  it('opens external http links in a new tab safely', () => {
    render(<Button href="https://www.mealdirectly.com">Visit</Button>);
    const link = screen.getByRole('link', { name: 'Visit' });
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('keeps mailto links in the same tab', () => {
    render(<Button href="mailto:hello@sulvatech.com">Email</Button>);
    expect(screen.getByRole('link', { name: 'Email' }).getAttribute('target')).toBeNull();
  });

  it('renders a type=button element without href', () => {
    render(<Button>Send</Button>);
    expect(screen.getByRole('button', { name: 'Send' }).getAttribute('type')).toBe('button');
  });

  it('uses a white pill for primary on dark and an ink pill on light', () => {
    expect(buttonClasses({ variant: 'primary', tone: 'dark' })).toContain('bg-white');
    expect(buttonClasses({ variant: 'primary', tone: 'light' })).toContain('bg-ink');
    expect(buttonClasses({ variant: 'secondary', tone: 'dark' })).toContain('glass');
  });
});
```

`components/ui/Section.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Section from '@/components/ui/Section';

describe('Section', () => {
  it('renders an ink band with eyebrow and decorative gradient', () => {
    const { container } = render(
      <Section tone="ink" gradient="hero" eyebrow="01 — Featured">
        <h2>Title</h2>
      </Section>,
    );
    const section = container.querySelector('section')!;
    expect(section.className).toContain('bg-ink');
    expect(screen.getByText('01 — Featured')).toBeTruthy();
    expect(section.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('defaults to a paper band without gradient', () => {
    const { container } = render(<Section><p>Body</p></Section>);
    const section = container.querySelector('section')!;
    expect(section.className).toContain('bg-paper');
    expect(section.querySelector('[aria-hidden="true"]')).toBeNull();
  });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run components/ui`
Expected: FAIL — cannot resolve `@/components/ui/Button` / `@/components/ui/Section`.

- [ ] **Step 3: Create `components/ui/Button.tsx`**

```tsx
import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonTone = 'dark' | 'light';

const base =
  'inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium transition duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonTone, Record<ButtonVariant, string>> = {
  dark: {
    primary: 'bg-white text-ink hover:bg-white/90',
    secondary: 'glass text-white hover:text-white/90',
  },
  light: {
    primary: 'bg-ink text-white hover:bg-ink-soft',
    secondary: 'border border-ink/15 text-ink hover:border-ink/40',
  },
};

export function buttonClasses({
  variant = 'primary',
  tone = 'dark',
  className,
}: { variant?: ButtonVariant; tone?: ButtonTone; className?: string } = {}) {
  return cn(base, variants[tone][variant], className);
}

type CommonProps = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'children'
  >;

type NativeButtonProps = CommonProps & { href?: never } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  >;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const EXTERNAL = /^(https?:|mailto:|tel:)/;

export default function Button(props: ButtonProps) {
  if (typeof props.href === 'string') {
    const { variant, tone, className, children, href, ...anchorProps } = props as LinkButtonProps;
    const classes = buttonClasses({ variant, tone, className });
    if (EXTERNAL.test(href)) {
      const newTab = href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
      return (
        <a href={href} className={classes} {...newTab} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { variant, tone, className, children, type = 'button', ...buttonProps } = props as NativeButtonProps;
  return (
    <button type={type} className={buttonClasses({ variant, tone, className })} {...buttonProps}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Create `components/ui/Chip.tsx`**

```tsx
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type ChipTone = 'dark' | 'light';

export function chipClasses({
  active = false,
  tone = 'dark',
  className,
}: { active?: boolean; tone?: ChipTone; className?: string } = {}) {
  const toneClasses =
    tone === 'dark'
      ? active
        ? 'bg-white text-ink'
        : 'glass text-white/80 hover:text-white'
      : active
        ? 'bg-ink text-white'
        : 'border border-ink/15 bg-paper-raised text-ink/75 hover:text-ink';
  return cn(
    'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm transition-colors duration-200',
    toneClasses,
    className,
  );
}

export default function Chip({
  active,
  tone,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { active?: boolean; tone?: ChipTone }) {
  return <span className={chipClasses({ active, tone, className })} {...props} />;
}
```

- [ ] **Step 5: Create `components/ui/GlassPanel.tsx`**

```tsx
import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function GlassPanel({
  as: Tag = 'div',
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType }) {
  return <Tag className={cn('glass rounded-panel text-white', className)} {...props} />;
}
```

- [ ] **Step 6: Create `components/ui/GradientField.tsx`**

```tsx
import { cn } from '@/lib/utils';

export type GradientVariant = 'hero' | 'panel' | 'cta';

// Teal-glow top-left, copper bottom-right, deep teal centre — over ink.
const layers: Record<GradientVariant, string> = {
  hero: [
    'radial-gradient(55% 50% at 12% 8%, rgb(31 107 95 / 0.55), transparent 70%)',
    'radial-gradient(45% 45% at 92% 88%, rgb(184 103 58 / 0.5), transparent 70%)',
    'radial-gradient(70% 60% at 55% 45%, rgb(15 59 54 / 0.65), transparent 80%)',
  ].join(', '),
  panel: [
    'radial-gradient(60% 70% at 0% 100%, rgb(31 107 95 / 0.6), transparent 70%)',
    'radial-gradient(55% 60% at 100% 0%, rgb(184 103 58 / 0.45), transparent 70%)',
  ].join(', '),
  cta: [
    'radial-gradient(50% 80% at 50% 120%, rgb(184 103 58 / 0.6), transparent 70%)',
    'radial-gradient(60% 60% at 10% 0%, rgb(31 107 95 / 0.5), transparent 70%)',
  ].join(', '),
};

export default function GradientField({
  variant = 'hero',
  solid = true,
  className,
}: {
  variant?: GradientVariant;
  solid?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', solid && 'bg-ink', className)}
    >
      <div className="absolute -inset-[12%] animate-drift" style={{ backgroundImage: layers[variant] }} />
      <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
```

- [ ] **Step 7: Create `components/ui/Section.tsx`**

```tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import GradientField, { type GradientVariant } from '@/components/ui/GradientField';

export type SectionTone = 'ink' | 'paper';

export function Eyebrow({
  children,
  tone = 'paper',
  className,
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
}) {
  return (
    <p className={cn('font-mono text-xs tracking-wide', tone === 'ink' ? 'text-white/60' : 'text-muted', className)}>
      {children}
    </p>
  );
}

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  gradient?: GradientVariant;
  eyebrow?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export default function Section({
  id,
  tone = 'paper',
  gradient,
  eyebrow,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative isolate overflow-hidden px-5 py-24 md:px-10 md:py-32',
        tone === 'ink' ? 'bg-ink text-white' : 'bg-paper text-ink',
        className,
      )}
    >
      {gradient ? <GradientField variant={gradient} className="-z-10" /> : null}
      <div className={cn('mx-auto w-full max-w-[1240px]', containerClassName)}>
        {eyebrow ? (
          <Eyebrow tone={tone} className="mb-8">
            {eyebrow}
          </Eyebrow>
        ) : null}
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Create `components/ui/PageHero.tsx`**

```tsx
import type { ReactNode } from 'react';
import Section from '@/components/ui/Section';

export default function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <Section tone="ink" gradient="hero" eyebrow={eyebrow} className="pb-20 pt-40 md:pb-28 md:pt-48">
      <h1 className="display-lg max-w-4xl">{title}</h1>
      {sub ? <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{sub}</p> : null}
      {children}
    </Section>
  );
}
```

- [ ] **Step 9: Create `components/ui/usePrefersReducedMotion.ts`**

```ts
'use client';

import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(query.matches);
    const onChange = () => setReduce(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduce;
}
```

- [ ] **Step 10: Create `components/ui/Reveal.tsx`**

```tsx
'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/components/ui/usePrefersReducedMotion';

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 11: Run tests to verify they pass**

Run: `npx vitest run components/ui`
Expected: PASS (7 tests).

- [ ] **Step 12: Commit**

```bash
git add components/ui
git commit -m "feat: add glass UI primitives" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: VideoFrame and tab state

**Files:**
- Create: `components/ui/VideoFrame.tsx`, `components/ui/useTabs.ts`
- Test: `components/ui/VideoFrame.test.tsx`, `components/ui/useTabs.test.ts`

**Interfaces:**
- Consumes: `setReducedMotion` from `test/utils.ts` (Task 1).
- Produces:
  - `canAutoplay(): boolean`; default `VideoFrame({ src?: string; poster: string; alt: string; playOn?: 'view' | 'hover'; framed?: boolean = true; priority?: boolean; className?: string; sizes?: string })`.
  - `wrapIndex(index: number, length: number): number`; `useTabs(length: number): { active: number; interacted: boolean; select(index: number, focus?: boolean): void; advance(): void; onKeyDown(event: KeyboardEvent<HTMLElement>): void; tabRefs: MutableRefObject<Array<HTMLButtonElement | null>> }`.

- [ ] **Step 1: Write the failing tests**

`components/ui/useTabs.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { wrapIndex } from '@/components/ui/useTabs';

describe('wrapIndex', () => {
  it('wraps forward past the end', () => {
    expect(wrapIndex(6, 6)).toBe(0);
  });
  it('wraps backward past the start', () => {
    expect(wrapIndex(-1, 6)).toBe(5);
  });
  it('keeps in-range indexes', () => {
    expect(wrapIndex(3, 6)).toBe(3);
  });
});
```

`components/ui/VideoFrame.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import VideoFrame from '@/components/ui/VideoFrame';
import { setReducedMotion } from '@/test/utils';

const props = { src: '/work/mealdirect/teaser.mp4', poster: '/work/mealdirect/poster.jpg', alt: 'Meal Direct website' };

describe('VideoFrame', () => {
  it('renders a muted looping inline video over the poster', () => {
    const { container } = render(<VideoFrame {...props} />);
    expect(screen.getByAltText('Meal Direct website')).toBeTruthy();
    const video = container.querySelector('video')!;
    expect(video).not.toBeNull();
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.hasAttribute('playsinline')).toBe(true);
    expect(video.getAttribute('aria-hidden')).toBe('true');
  });

  it('shows only the poster when the visitor prefers reduced motion', () => {
    setReducedMotion(true);
    const { container } = render(<VideoFrame {...props} />);
    expect(container.querySelector('video')).toBeNull();
    expect(screen.getByAltText('Meal Direct website')).toBeTruthy();
  });

  it('shows only the poster when there is no video', () => {
    const { container } = render(<VideoFrame poster={props.poster} alt={props.alt} />);
    expect(container.querySelector('video')).toBeNull();
  });

  it('plays on hover and pauses on leave in hover mode', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play');
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause');
    const { container } = render(<VideoFrame {...props} playOn="hover" framed={false} />);
    const frame = container.firstElementChild!;
    fireEvent.mouseEnter(frame);
    expect(play).toHaveBeenCalled();
    fireEvent.mouseLeave(frame);
    expect(pause).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run components/ui/VideoFrame.test.tsx components/ui/useTabs.test.ts`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `components/ui/useTabs.ts`**

```ts
'use client';

import { useRef, useState, type KeyboardEvent } from 'react';

export function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

// Roving-tabindex tablist state: arrows move selection and focus.
export function useTabs(length: number) {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number, focus = false) => {
    const next = wrapIndex(index, length);
    setInteracted(true);
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const advance = () => setActive((current) => wrapIndex(current + 1, length));

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      select(active + 1, true);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      select(active - 1, true);
    }
  };

  return { active, interacted, select, advance, onKeyDown, tabRefs };
}
```

- [ ] **Step 4: Create `components/ui/VideoFrame.tsx`**

```tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type VideoFrameProps = {
  src?: string;
  poster: string;
  alt: string;
  playOn?: 'view' | 'hover';
  framed?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function canAutoplay() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

export default function VideoFrame({
  src,
  poster,
  alt,
  playOn = 'view',
  framed = true,
  priority = false,
  className,
  sizes = '(min-width: 1024px) 60vw, 100vw',
}: VideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(Boolean(src) && canAutoplay());
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || playOn !== 'view' || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [enabled, playOn]);

  const hoverHandlers =
    enabled && playOn === 'hover'
      ? {
          onMouseEnter: () => void videoRef.current?.play().catch(() => {}),
          onMouseLeave: () => videoRef.current?.pause(),
        }
      : {};

  return (
    <div className={cn(framed && 'glass rounded-panel p-2', className)} {...hoverHandlers}>
      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-ink-soft">
        <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        {enabled ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload={priority ? 'metadata' : 'none'}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : null}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run components/ui`
Expected: PASS (14 tests).

- [ ] **Step 6: Commit**

```bash
git add components/ui/VideoFrame.tsx components/ui/VideoFrame.test.tsx components/ui/useTabs.ts components/ui/useTabs.test.ts
git commit -m "feat: add VideoFrame and tablist state hook" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Project footage pipeline

**Files:**
- Modify: `videos/projects.mjs` (add `mealdirect` entry at the end of `projects`)
- Modify: `videos/stills.mjs` (add `mealdirect`, `thedmashop` to `shots`)
- Create: `videos/web.mjs`
- Modify: `videos/package.json` (scripts), `videos/README.md` (web export section)
- Create (generated): `public/work/{mealdirect,itzlolabeauty,thedmashop,mindfirehomes,olorunleke,innercircle}/{teaser.mp4,poster.jpg}`

**Interfaces:**
- Produces: for each recorder key `<slug>` above, `public/work/<slug>/poster.jpg` (1600px wide) and normally `public/work/<slug>/teaser.mp4` (8s, 1280×720, no audio, ≤ 2.5 MB). Slugs equal recorder keys; Task 6 relies on these exact paths.

- [ ] **Step 1: Add the Meal Direct recording script to `videos/projects.mjs`**

Insert this entry as the last property of the `projects` object (after `innercircle`):

```js
  mealdirect: {
    name: 'Meal Direct',
    url: 'https://www.mealdirectly.com',
    // Hero has a 3D model you can drag to spin. Drag right and back so the cursor ends where it started.
    async spin(d) {
      if (d.page.viewportSize().width < 768) return;
      const canvas = d.page.locator('canvas').first();
      const box = await canvas.boundingBox({ timeout: 5000 }).catch(() => null);
      if (!box) return;
      await d.point(canvas);
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await d.page.mouse.down();
      for (let i = 1; i <= 40; i++) await d.page.mouse.move(x + i * 6, y);
      for (let i = 39; i >= 0; i--) await d.page.mouse.move(x + i * 6, y);
      await d.page.mouse.up();
    },
    async teaser(d) {
      await d.load(this.url);
      await d.hold(2000);
      await this.spin(d);
      await d.hold(1500);
      await d.scrollTo(d.page.getByText('A Better Way To Eat On Campus').first(), 2400);
      await d.hold(3000);
      await d.scrollTo(d.page.getByText('Why Students Choose Us').first(), 2400);
      await d.hold(3000);
      await d.scrollTo(d.page.getByText('The Ultimate Student App Experience').first(), 2400);
      await d.hold(3500);
    },
    async walkthrough(d) {
      await d.load(this.url);
      await d.hold(3000);
      await this.spin(d);
      await d.hold(2000);
      await d.scrollTo(d.page.getByText("Campus Food Shouldn't Be Stressful").first(), 2400);
      await d.hold(3500);
      await d.scrollTo(d.page.getByText('A Better Way To Eat On Campus').first(), 2400);
      await d.hold(4000);
      await d.scrollTo(d.page.getByText('Why Students Choose Us').first(), 2400);
      await d.hold(4000);
      await d.scrollTo(d.page.getByText('The Ultimate Student App Experience').first(), 2400);
      await d.hold(4000);
      await d.cruise(4, 2600);
      await d.hold(3000);
      await d.top(2000);
      await d.hold(3000);
    },
  },
```

- [ ] **Step 2: Add stills for Meal Direct and theDMAshop in `videos/stills.mjs`**

Insert into the `shots` object after `innercircle`:

```js
  mealdirect: {
    url: 'https://www.mealdirectly.com',
    list: [
      { name: 'hero', path: '/' },
      { name: 'how', path: '/', text: 'A Better Way To Eat On Campus' },
      { name: 'app', path: '/', text: 'The Ultimate Student App Experience' },
    ],
  },
  thedmashop: {
    url: 'https://www.thedmashop.com',
    list: [
      { name: 'hero', path: '/', waitFor: 'Shop' },
      { name: 'shop', path: '/shop' },
    ],
  },
```

- [ ] **Step 3: Create `videos/web.mjs`**

```js
// Turns recordings + hero stills into web media for the Sulva site.
// Usage: node web.mjs [project|all]
// Input:  out/<project>-teaser-landscape.mp4 (falls back to the walkthrough), out/stills/<project>-hero-landscape.png
// Output: ../public/work/<project>/teaser.mp4 (8s loop, 1280x720, no audio) and poster.jpg (1600px wide)
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import path from 'node:path';
import ffmpeg from 'ffmpeg-static';
import { projects } from './projects.mjs';

const START = 1; // skip the first second of page settle
const LENGTH = 8;
const MAX_BYTES = 2.5 * 1024 * 1024;

const target = process.argv[2] ?? 'all';
const names = target === 'all' ? Object.keys(projects) : target.split(',');

function run(args) {
  const res = spawnSync(ffmpeg, ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
  if (res.status !== 0) throw new Error(`ffmpeg failed: ${args.join(' ')}`);
}

const failures = [];
for (const name of names) {
  if (!projects[name]) {
    failures.push(`${name}: unknown project`);
    continue;
  }
  const src = ['teaser', 'walkthrough']
    .map((kind) => path.resolve('out', `${name}-${kind}-landscape.mp4`))
    .find((file) => existsSync(file));
  const still = path.resolve('out', 'stills', `${name}-hero-landscape.png`);
  if (!existsSync(still)) {
    failures.push(`${name}: no hero still. Run: node stills.mjs ${name}`);
    continue;
  }

  const dest = path.resolve('..', 'public', 'work', name);
  mkdirSync(dest, { recursive: true });
  run(['-i', still, '-vf', 'scale=1600:-2:flags=lanczos', '-q:v', '3', path.join(dest, 'poster.jpg')]);

  if (!src) {
    failures.push(`${name}: poster only, no landscape recording. Run: node record.mjs ${name} --kind teaser --format landscape`);
    continue;
  }

  const video = path.join(dest, 'teaser.mp4');
  const fade = `fade=t=in:st=0:d=0.4,fade=t=out:st=${LENGTH - 0.4}:d=0.4`;
  for (const crf of [28, 31, 34]) {
    run([
      '-ss', String(START), '-t', String(LENGTH), '-i', src, '-an',
      '-vf', `scale=1280:720:flags=lanczos,${fade},format=yuv420p`,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-movflags', '+faststart', video,
    ]);
    if (statSync(video).size <= MAX_BYTES) break;
  }
  console.log(`✓ ${name}  ${(statSync(video).size / 1024 / 1024).toFixed(2)} MB`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
```

- [ ] **Step 4: Add scripts to `videos/package.json`**

Add inside `"scripts"`:

```json
    "record:mealdirect": "node record.mjs mealdirect",
    "web": "node web.mjs all"
```

- [ ] **Step 5: Document the export in `videos/README.md`**

Append:

~~~markdown
## Web loops for sulvatech.com

The site shows an 8-second muted loop and a poster for each project, read from `public/work/<project>/`.

```bash
node record.mjs all --kind teaser --format landscape   # source clips
node stills.mjs all                                    # hero posters
npm run web                                            # writes ../public/work/<project>/teaser.mp4 + poster.jpg
```

Loops are re-encoded until each is 2.5 MB or less. Commit the files in `public/work/`.
~~~

- [ ] **Step 6: Record and export**

```bash
cd videos
npm install
npx playwright install chromium
node record.mjs all --kind teaser --format landscape
node stills.mjs mealdirect
node stills.mjs thedmashop
node web.mjs all
cd ..
```

Expected: six `✓ <name>  x.xx MB` lines, each ≤ 2.50 MB, exit code 0.
If `thedmashop` fails with "Storefront setup required", its site is down: stop and tell the user — do not ship a screenshot of an error page. If only the recording fails but the poster is fine, `web.mjs` reports "poster only" and Task 6 sets `hasVideo: false` for it.

- [ ] **Step 7: Eyeball every poster**

Open each `public/work/*/poster.jpg` (Read tool shows images). Each must show the client's real homepage hero — no cookie banner covering the hero, no error screen, no loader. If a cookie banner covers it, re-run `node stills.mjs <name>` once; if still covered, report it to the user.

- [ ] **Step 8: Commit**

```bash
git add videos/projects.mjs videos/stills.mjs videos/web.mjs videos/package.json videos/README.md public/work
git commit -m "feat: export project loops and posters for the site" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Case study and service content

**Files:**
- Create: `lib/work.ts`, `lib/services.ts`
- Test: `lib/work.test.ts`, `lib/services.test.ts`

**Interfaces:**
- Consumes: media files from Task 5.
- Produces:
  - `workCategories = ['All', 'Product', 'Store', 'Brand', 'Community'] as const`; `type WorkCategory`; `type CaseStudyCategory = Exclude<WorkCategory, 'All'>`; `type CaseStudyMedia = { poster: string; video?: string }`; `type CaseStudy = { slug; name; url; category; oneLiner; whatWeDid; tags: string[]; featured?: boolean; headline?: string; problem?: string; media: CaseStudyMedia }`; `type FeaturedCaseStudy = CaseStudy & { featured: true; headline: string; problem: string }`.
  - `caseStudies: CaseStudy[]`, `getCaseStudy(slug): CaseStudy`, `getFeaturedCaseStudy(): FeaturedCaseStudy`, `getOtherCaseStudies(): CaseStudy[]`, `filterCaseStudies(list, category): CaseStudy[]`, `displayDomain(url): string`.
  - `type Service = { slug: 'brand-websites' | 'online-stores' | 'products-apps'; name; summary; forWho; deliverables: string[]; exampleSlugs: string[] }`; `services: Service[]`; `getServiceExamples(service): CaseStudy[]`.

- [ ] **Step 1: Write the failing tests**

`lib/work.test.ts`:

```ts
import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  caseStudies,
  displayDomain,
  filterCaseStudies,
  getCaseStudy,
  getFeaturedCaseStudy,
  getOtherCaseStudies,
} from '@/lib/work';

describe('case studies', () => {
  it('lists the six client projects with unique slugs', () => {
    expect(caseStudies.map((s) => s.slug)).toEqual([
      'mealdirect',
      'itzlolabeauty',
      'thedmashop',
      'mindfirehomes',
      'olorunleke',
      'innercircle',
    ]);
  });

  it('features Meal Direct with a headline and problem statement', () => {
    const featured = getFeaturedCaseStudy();
    expect(featured.slug).toBe('mealdirect');
    expect(featured.headline).toBe('Campus food, on schedule.');
    expect(featured.problem.length).toBeGreaterThan(40);
    expect(caseStudies.filter((s) => s.featured)).toHaveLength(1);
  });

  it('has media files on disk for every project', () => {
    for (const study of caseStudies) {
      expect(existsSync(path.join(process.cwd(), 'public', study.media.poster)), study.media.poster).toBe(true);
      if (study.media.video) {
        expect(existsSync(path.join(process.cwd(), 'public', study.media.video)), study.media.video).toBe(true);
      }
    }
  });

  it('links to live https sites', () => {
    for (const study of caseStudies) expect(study.url).toMatch(/^https:\/\//);
  });

  it('separates the featured project from the rest', () => {
    expect(getOtherCaseStudies().map((s) => s.slug)).not.toContain('mealdirect');
    expect(getOtherCaseStudies()).toHaveLength(5);
  });

  it('filters by category', () => {
    expect(filterCaseStudies(caseStudies, 'Store').map((s) => s.slug)).toEqual(['itzlolabeauty', 'thedmashop']);
    expect(filterCaseStudies(caseStudies, 'All')).toHaveLength(6);
  });

  it('looks up by slug and fails loudly on unknown slugs', () => {
    expect(getCaseStudy('innercircle').name).toBe('The Inner Circle');
    expect(() => getCaseStudy('nope')).toThrow('Unknown case study "nope"');
  });

  it('formats display domains', () => {
    expect(displayDomain('https://www.mealdirectly.com')).toBe('mealdirectly.com');
  });
});
```

`lib/services.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getServiceExamples, services } from '@/lib/services';

describe('services', () => {
  it('offers exactly three services', () => {
    expect(services.map((s) => s.name)).toEqual(['Brand websites', 'Online stores', 'Products & apps']);
  });

  it('points every service at real case studies', () => {
    for (const service of services) {
      const examples = getServiceExamples(service);
      expect(examples.length).toBeGreaterThan(0);
      expect(examples.map((e) => e.slug)).toEqual(service.exampleSlugs);
    }
  });

  it('uses Meal Direct as the products example', () => {
    const products = services.find((s) => s.slug === 'products-apps')!;
    expect(getServiceExamples(products)[0].slug).toBe('mealdirect');
  });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run lib/work.test.ts lib/services.test.ts`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `lib/work.ts`**

If Task 5 reported "poster only" for any project, pass `false` as the second argument to its `media()` call.

```ts
export const workCategories = ['All', 'Product', 'Store', 'Brand', 'Community'] as const;
export type WorkCategory = (typeof workCategories)[number];
export type CaseStudyCategory = Exclude<WorkCategory, 'All'>;

export type CaseStudyMedia = { poster: string; video?: string };

export type CaseStudy = {
  slug: string;
  name: string;
  url: string;
  category: CaseStudyCategory;
  oneLiner: string;
  whatWeDid: string;
  tags: string[];
  featured?: boolean;
  headline?: string;
  problem?: string;
  media: CaseStudyMedia;
};

export type FeaturedCaseStudy = CaseStudy & { featured: true; headline: string; problem: string };

// Media comes from videos/web.mjs (slug = recorder project key).
function media(slug: string, hasVideo = true): CaseStudyMedia {
  return {
    poster: `/work/${slug}/poster.jpg`,
    ...(hasVideo ? { video: `/work/${slug}/teaser.mp4` } : {}),
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'mealdirect',
    name: 'Meal Direct',
    url: 'https://www.mealdirectly.com',
    category: 'Product',
    oneLiner: 'Scheduled campus meal delivery. Students order ahead from verified campus vendors and get food at a fixed time.',
    whatWeDid:
      'We built the whole platform — five connected apps. Students order, vendors cook in batches, riders deliver on schedule, and the Meal Direct team runs everything from one control centre.',
    tags: ['Student app', 'Vendor portal', 'Rider app', 'Control centre', 'API'],
    featured: true,
    headline: 'Campus food, on schedule.',
    problem:
      'Students lose time queueing for food between lectures, vendors run out, and on-demand delivery is too expensive for a daily meal. Meal Direct lets them order ahead and get food at a fixed time.',
    media: media('mealdirect'),
  },
  {
    slug: 'itzlolabeauty',
    name: 'Itzlolabeauty',
    url: 'https://www.itzlolabeauty.com',
    category: 'Store',
    oneLiner: 'Luxury makeup appointments and a beauty shop, based in Arizona.',
    whatWeDid:
      'Shop, service booking with live availability, checkout, and a dashboard for bookings, products, orders, customers and the gallery.',
    tags: ['Bookings', 'Shop', 'Checkout', 'Dashboard'],
    media: media('itzlolabeauty'),
  },
  {
    slug: 'thedmashop',
    name: 'theDMAshop',
    url: 'https://www.thedmashop.com',
    category: 'Store',
    oneLiner: 'Minimalist clothing and everyday essentials, sold online.',
    whatWeDid:
      'Storefront, secure checkout, customer accounts, and a dashboard for products, orders, customers, content and sales.',
    tags: ['Storefront', 'Checkout', 'Accounts', 'Dashboard'],
    media: media('thedmashop'),
  },
  {
    slug: 'mindfirehomes',
    name: 'Mindfire Homes',
    url: 'https://www.mindfirehomes.com',
    category: 'Brand',
    oneLiner: 'Verified homes and investment property in Abuja, with the title checked first.',
    whatWeDid:
      'Property listings and detail pages, a blog, enquiry capture, and a dashboard for properties, leads, posts and the newsletter.',
    tags: ['Listings', 'Blog', 'Lead capture', 'Dashboard'],
    media: media('mindfirehomes'),
  },
  {
    slug: 'olorunleke',
    name: 'Olorunleke Ojuolape',
    url: 'https://www.olorunleke.com',
    category: 'Brand',
    oneLiner: 'Personal site for the MD/CEO of Mindfire Homes & Investments.',
    whatWeDid: 'A personal brand site: portfolio, leadership and vision pages, and an insights section.',
    tags: ['Personal brand', 'Portfolio', 'Insights'],
    media: media('olorunleke'),
  },
  {
    slug: 'innercircle',
    name: 'The Inner Circle',
    url: 'https://www.theinnercirclecommunity.org',
    category: 'Community',
    oneLiner: 'A faith-centred community for intentional leaders.',
    whatWeDid:
      'Community and department pages, leadership profiles, a join flow, FAQ, and a dashboard with media uploads.',
    tags: ['Community', 'Join flow', 'Dashboard'],
    media: media('innercircle'),
  },
];

export function getCaseStudy(slug: string): CaseStudy {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) throw new Error(`Unknown case study "${slug}"`);
  return study;
}

export function getFeaturedCaseStudy(): FeaturedCaseStudy {
  const study = caseStudies.find((item) => item.featured);
  if (!study?.headline || !study.problem) throw new Error('Featured case study needs a headline and problem');
  return study as FeaturedCaseStudy;
}

export function getOtherCaseStudies(): CaseStudy[] {
  return caseStudies.filter((item) => !item.featured);
}

export function filterCaseStudies(list: CaseStudy[], category: WorkCategory): CaseStudy[] {
  return category === 'All' ? list : list.filter((item) => item.category === category);
}

export function displayDomain(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
```

- [ ] **Step 4: Create `lib/services.ts`**

```ts
import { getCaseStudy, type CaseStudy } from '@/lib/work';

export type Service = {
  slug: 'brand-websites' | 'online-stores' | 'products-apps';
  name: string;
  summary: string;
  forWho: string;
  deliverables: string[];
  exampleSlugs: string[];
};

export const services: Service[] = [
  {
    slug: 'brand-websites',
    name: 'Brand websites',
    summary: 'Sites that make a business look as good as it is, and turn visitors into enquiries.',
    forWho: 'For businesses and personal brands.',
    deliverables: [
      'Design and build',
      'Help with your copy',
      'SEO basics and analytics',
      'Your own dashboard for blog, leads and listings',
      'Handover training',
    ],
    exampleSlugs: ['mindfirehomes', 'olorunleke', 'innercircle'],
  },
  {
    slug: 'online-stores',
    name: 'Online stores',
    summary: 'Shops that are easy to browse, quick to check out, and simple for you to manage.',
    forWho: 'For brands selling online.',
    deliverables: [
      'Catalogue and product pages',
      'Checkout and payments',
      'Bookings, where you need them',
      'Order emails',
      'Dashboard for products, orders and customers',
    ],
    exampleSlugs: ['itzlolabeauty', 'thedmashop'],
  },
  {
    slug: 'products-apps',
    name: 'Products & apps',
    summary: "When a website isn't enough: customer apps, partner portals and the control centre to run it all — like Meal Direct.",
    forWho: 'For founders with an operation to run.',
    deliverables: ['Customer app', 'Partner and vendor portals', 'Internal control centre', 'API and database', 'Launch support'],
    exampleSlugs: ['mealdirect'],
  },
];

export function getServiceExamples(service: Service): CaseStudy[] {
  return service.exampleSlugs.map(getCaseStudy);
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run lib`
Expected: PASS (all `lib` tests).

- [ ] **Step 6: Commit**

```bash
git add lib/work.ts lib/work.test.ts lib/services.ts lib/services.test.ts
git commit -m "feat: add case study and service content" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Navbar, footer, newsletter, CTA band, 404

**Files:**
- Modify: `components/Navbar.tsx` (full replace), `components/Footer.tsx` (full replace), `components/NewsletterForm.tsx` (full replace)
- Create: `components/CtaBand.tsx`, `app/not-found.tsx`
- Test: `components/Navbar.test.tsx`, `components/NewsletterForm.test.tsx`

**Interfaces:**
- Consumes: `buttonClasses`, `Button`, `GradientField`, `Section`, `siteConfig` (Tasks 1, 3).
- Produces: `navLinks`, `isActive(pathname, href): boolean` from `Navbar.tsx`; default `CtaBand({ title?: string; sub?: string })`; `NewsletterForm` (no props).

- [ ] **Step 1: Write the failing tests**

`components/Navbar.test.tsx`:

```tsx
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Navbar from '@/components/Navbar';

const nav = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('next/navigation', () => ({ usePathname: () => nav.pathname }));

describe('Navbar', () => {
  beforeEach(() => {
    nav.pathname = '/';
  });

  it('shows the four main links and the CTA', () => {
    render(<Navbar />);
    const main = screen.getByRole('navigation', { name: 'Main' });
    for (const name of ['Work', 'Services', 'About', 'Insights']) {
      expect(within(main).getByRole('link', { name })).toBeTruthy();
    }
    expect(within(main).getByRole('link', { name: 'Start a project' }).getAttribute('href')).toBe('/contact');
  });

  it('marks the current section, including nested pages', () => {
    nav.pathname = '/insights/some-post';
    render(<Navbar />);
    const main = screen.getByRole('navigation', { name: 'Main' });
    expect(within(main).getByRole('link', { name: 'Insights' }).getAttribute('aria-current')).toBe('page');
    expect(within(main).getByRole('link', { name: 'Work' }).getAttribute('aria-current')).toBeNull();
  });

  it('opens the mobile menu and closes it with Escape', () => {
    render(<Navbar />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(document.getElementById('mobile-menu')).not.toBeNull();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.getElementById('mobile-menu')).toBeNull();
  });
});
```

`components/NewsletterForm.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NewsletterForm from '@/components/NewsletterForm';

describe('NewsletterForm', () => {
  it('posts the email and confirms', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'ada@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect((await screen.findByRole('status')).textContent).toContain("you're on the list");
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/newsletter',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ email: 'ada@example.com' }) }),
    );
  });

  it('shows the API error message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'Too many requests' }) }));
    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'ada@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect((await screen.findByRole('alert')).textContent).toBe('Too many requests');
  });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run components/Navbar.test.tsx components/NewsletterForm.test.tsx`
Expected: FAIL — no navigation named "Main"; no label "Email address".

- [ ] **Step 3: Replace `components/Navbar.tsx`**

```tsx
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
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const focusables = () => Array.from(sheetRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []);
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
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
            onClick={() => setOpen((value) => !value)}
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
```

- [ ] **Step 4: Replace `components/NewsletterForm.tsx`**

```tsx
'use client';

import { useId, useState } from 'react';
import { buttonClasses } from '@/components/ui/Button';

export default function NewsletterForm() {
  const inputId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Failed to subscribe');
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe. Try again.');
    }
  };

  if (status === 'success') {
    return (
      <p role="status" className="glass rounded-full px-5 py-3 text-sm text-white">
        Thanks — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubscribe}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          className="glass h-12 w-full rounded-full px-5 text-[15px] text-white placeholder:text-white/45 outline-none focus-visible:outline-2 focus-visible:outline-copper"
        />
        <button type="submit" disabled={status === 'loading'} className={buttonClasses({ className: 'shrink-0' })}>
          {status === 'loading' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' ? (
        <p role="alert" className="mt-2 pl-5 text-sm text-copper-soft">
          {message}
        </p>
      ) : null}
    </form>
  );
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run components/Navbar.test.tsx components/NewsletterForm.test.tsx`
Expected: PASS (5 tests).

- [ ] **Step 6: Create `components/CtaBand.tsx`**

```tsx
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';

export default function CtaBand({
  title = 'Your brand deserves a better website.',
  sub,
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <Section tone="ink" gradient="cta" className="py-28 md:py-40" containerClassName="text-center">
      <h2 className="display-lg mx-auto max-w-3xl">{title}</h2>
      {sub ? <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/75">{sub}</p> : null}
      <div className="mt-10 flex flex-col items-center gap-4">
        <Button href="/contact">Start a project</Button>
        <a href={`mailto:${siteConfig.email}`} className="text-sm text-white/60 transition-colors hover:text-white">
          {siteConfig.email}
        </a>
      </div>
    </Section>
  );
}
```

- [ ] **Step 7: Replace `components/Footer.tsx`**

```tsx
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
```

- [ ] **Step 8: Create `app/not-found.tsx`**

```tsx
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section tone="ink" gradient="hero" className="flex min-h-[80vh] items-center pt-40">
      <p className="font-mono text-sm text-white/60">404</p>
      <h1 className="display-lg mt-4 max-w-3xl">This page wandered off.</h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Home</Button>
        <Button href="/work" variant="secondary">
          See our work
        </Button>
      </div>
    </Section>
  );
}
```

- [ ] **Step 9: Verify in the browser**

Run: `npm test && npm run dev` (leave the dev server running for later tasks).
Open `http://localhost:3000/does-not-exist` at 1440px and 375px: floating pill nav, dark gradient 404 page, footer with newsletter, three link columns, email/phone/location, Instagram/TikTok pills, giant faint "Sulva" wordmark. On 375px, open the menu: full-height glass sheet; Tab cycles inside it; Escape closes it.

- [ ] **Step 10: Commit**

```bash
git add components/Navbar.tsx components/Navbar.test.tsx components/NewsletterForm.tsx components/NewsletterForm.test.tsx components/Footer.tsx components/CtaBand.tsx app/not-found.tsx
git commit -m "feat: rebuild navbar, footer, newsletter and 404 in glass style" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Home interactive blocks

**Files:**
- Create: `components/home/HeroShowcase.tsx`, `components/home/ServicesShowcase.tsx`
- Test: `components/home/HeroShowcase.test.tsx`, `components/home/ServicesShowcase.test.tsx`

**Interfaces:**
- Consumes: `useTabs`, `wrapIndex` (Task 4); `usePrefersReducedMotion`, `chipClasses` (Task 3); `VideoFrame` (Task 4); `CaseStudy` (Task 6); `Service` (Task 6).
- Produces: `HERO_INTERVAL_MS = 6000`; default `HeroShowcase({ studies: CaseStudy[] })` — must be rendered inside a `relative isolate` section (its backdrop is `absolute inset-0 -z-20`); default `ServicesShowcase({ items: Array<{ service: Service; example: CaseStudy }> })`.

- [ ] **Step 1: Write the failing tests**

`components/home/HeroShowcase.test.tsx`:

```tsx
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HeroShowcase, { HERO_INTERVAL_MS } from '@/components/home/HeroShowcase';
import { caseStudies } from '@/lib/work';
import { setReducedMotion } from '@/test/utils';

const selectedName = () => screen.getByRole('tab', { selected: true }).textContent;

describe('HeroShowcase', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the selected project in the caption', () => {
    render(<HeroShowcase studies={caseStudies} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Mindfire Homes' }));
    expect(screen.getByRole('tabpanel').textContent).toContain('Abuja');
  });

  it('moves selection with arrow keys', () => {
    render(<HeroShowcase studies={caseStudies} />);
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowLeft' });
    expect(selectedName()).toBe('The Inner Circle');
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(selectedName()).toBe('Meal Direct');
  });

  it('auto-advances until the visitor interacts', () => {
    vi.useFakeTimers();
    render(<HeroShowcase studies={caseStudies} />);
    act(() => {
      vi.advanceTimersByTime(HERO_INTERVAL_MS);
    });
    expect(selectedName()).toBe('Itzlolabeauty');
    fireEvent.click(screen.getByRole('tab', { name: 'Olorunleke Ojuolape' }));
    act(() => {
      vi.advanceTimersByTime(HERO_INTERVAL_MS * 3);
    });
    expect(selectedName()).toBe('Olorunleke Ojuolape');
  });

  it('does not auto-advance with reduced motion', () => {
    setReducedMotion(true);
    vi.useFakeTimers();
    render(<HeroShowcase studies={caseStudies} />);
    act(() => {
      vi.advanceTimersByTime(HERO_INTERVAL_MS * 2);
    });
    expect(selectedName()).toBe('Meal Direct');
  });
});
```

`components/home/ServicesShowcase.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import { getServiceExamples, services } from '@/lib/services';

const items = services.map((service) => ({ service, example: getServiceExamples(service)[0] }));

describe('ServicesShowcase', () => {
  it('starts on brand websites and switches the example on click', () => {
    render(<ServicesShowcase items={items} />);
    expect(screen.getByRole('tabpanel').textContent).toContain('Mindfire Homes');
    fireEvent.click(screen.getByRole('tab', { name: /Products & apps/ }));
    expect(screen.getByRole('tabpanel').textContent).toContain('Meal Direct');
  });

  it('moves down the list with the arrow keys', () => {
    render(<ServicesShowcase items={items} />);
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowDown' });
    expect(screen.getByRole('tab', { selected: true }).textContent).toContain('Online stores');
  });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx vitest run components/home`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `components/home/HeroShowcase.tsx`**

```tsx
'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { chipClasses } from '@/components/ui/Chip';
import { usePrefersReducedMotion } from '@/components/ui/usePrefersReducedMotion';
import { useTabs } from '@/components/ui/useTabs';
import { cn } from '@/lib/utils';
import type { CaseStudy } from '@/lib/work';

export const HERO_INTERVAL_MS = 6000;

export default function HeroShowcase({ studies }: { studies: CaseStudy[] }) {
  const { active, interacted, select, advance, onKeyDown, tabRefs } = useTabs(studies.length);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (interacted || reduceMotion || studies.length < 2) return;
    const id = window.setInterval(advance, HERO_INTERVAL_MS);
    return () => window.clearInterval(id);
    // advance is stable in behaviour (functional setState); re-run only when these change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interacted, reduceMotion, studies.length]);

  const current = studies[active];

  return (
    <>
      {/* Backdrop: one layer per project, crossfaded. Only the active layer plays video. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {studies.map((study, index) => (
          <div
            key={study.slug}
            className={cn('absolute inset-0 transition-opacity duration-500', index === active ? 'opacity-100' : 'opacity-0')}
          >
            <Image src={study.media.poster} alt="" fill priority={index === 0} sizes="100vw" className="object-cover object-top" />
            {index === active && study.media.video && !reduceMotion ? (
              <video
                key={study.slug}
                src={study.media.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : null}
          </div>
        ))}
        <div className="absolute inset-0 bg-ink/60" />
      </div>

      <div className="mt-auto pt-16">
        <div
          id="hero-project-panel"
          role="tabpanel"
          aria-labelledby={`hero-tab-${current.slug}`}
          className="glass mb-4 max-w-md rounded-card p-5"
        >
          <p className="text-sm font-medium text-white">{current.name}</p>
          <p className="mt-1 text-sm leading-6 text-white/70">{current.oneLiner}</p>
          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm text-copper-soft transition-colors hover:text-white"
          >
            View site <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div
          role="tablist"
          aria-label="Featured projects"
          onKeyDown={onKeyDown}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:px-0"
        >
          {studies.map((study, index) => (
            <button
              key={study.slug}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`hero-tab-${study.slug}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="hero-project-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => select(index)}
              className={chipClasses({ active: index === active, className: 'shrink-0' })}
            >
              {study.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Create `components/home/ServicesShowcase.tsx`**

```tsx
'use client';

import VideoFrame from '@/components/ui/VideoFrame';
import { useTabs } from '@/components/ui/useTabs';
import { cn } from '@/lib/utils';
import type { Service } from '@/lib/services';
import type { CaseStudy } from '@/lib/work';

type Item = { service: Service; example: CaseStudy };

export default function ServicesShowcase({ items }: { items: Item[] }) {
  const { active, select, onKeyDown, tabRefs } = useTabs(items.length);
  const current = items[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      <div role="tablist" aria-label="What we do" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col gap-3">
        {items.map(({ service }, index) => (
          <button
            key={service.slug}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`service-tab-${service.slug}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="service-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => select(index)}
            className={cn(
              'glass rounded-card p-6 text-left transition-opacity duration-200',
              index === active ? 'ring-1 ring-white/30' : 'opacity-60 hover:opacity-100',
            )}
          >
            <span className="font-mono text-xs text-white/50">0{index + 1}</span>
            <span className="mt-2 block text-2xl font-medium tracking-tight text-white">{service.name}</span>
            <span className="mt-2 block text-[15px] leading-6 text-white/70">{service.summary}</span>
          </button>
        ))}
      </div>
      <div id="service-panel" role="tabpanel" aria-labelledby={`service-tab-${current.service.slug}`}>
        <VideoFrame
          key={current.example.slug}
          src={current.example.media.video}
          poster={current.example.media.poster}
          alt={`${current.example.name} website`}
        />
        <p className="mt-4 text-sm text-white/60">
          Example: <span className="text-white">{current.example.name}</span> — {current.example.oneLiner}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run components/home`
Expected: PASS (6 tests).

- [ ] **Step 6: Commit**

```bash
git add components/home
git commit -m "feat: add hero project tabs and services showcase" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Shared cards and the home page

**Files:**
- Create: `components/work/FeaturedCaseStudy.tsx`, `components/work/WorkCard.tsx`, `components/InsightCard.tsx`
- Modify: `app/page.tsx` (full replace)

**Interfaces:**
- Consumes: everything from Tasks 3–8.
- Produces:
  - default `FeaturedCaseStudy({ study: FeaturedCaseStudy; eyebrow?: string = '01 — Featured work' })` — renders a section with `id={study.slug}`.
  - default `WorkCard({ study: CaseStudy; detailed?: boolean })` — heading is `<h3>` with the project name.
  - `type InsightListItem = { slug; title; category; excerpt; author; image_url: string | null; website_url: string | null; published_at: string; featured?: boolean }`; `formatPublishDate(value: string, month?: 'short' | 'long'): string`; default `InsightCard({ article: InsightListItem; featured?: boolean; as?: 'h2' | 'h3' })`.

- [ ] **Step 1: Create `components/work/WorkCard.tsx`**

```tsx
import { ArrowUpRight } from 'lucide-react';
import GradientField from '@/components/ui/GradientField';
import VideoFrame from '@/components/ui/VideoFrame';
import type { CaseStudy } from '@/lib/work';

export default function WorkCard({ study, detailed = false }: { study: CaseStudy; detailed?: boolean }) {
  return (
    <a href={study.url} target="_blank" rel="noopener noreferrer" className="group block rounded-card">
      <div className="relative isolate overflow-hidden rounded-card bg-ink p-2">
        <GradientField variant="panel" className="-z-10" />
        <VideoFrame
          src={study.media.video}
          poster={study.media.poster}
          alt={`${study.name} website`}
          playOn="hover"
          framed={false}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-ink">{study.name}</h3>
          <p className="mt-1 text-[15px] leading-6 text-muted">{study.oneLiner}</p>
        </div>
        <span className="mt-1 shrink-0 font-mono text-xs text-muted">{study.category}</span>
      </div>
      {detailed ? <p className="mt-3 text-[15px] leading-7 text-ink/80">{study.whatWeDid}</p> : null}
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ink">
        Visit site
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}
```

- [ ] **Step 2: Create `components/work/FeaturedCaseStudy.tsx`**

```tsx
import { ArrowUpRight } from 'lucide-react';
import Chip from '@/components/ui/Chip';
import GradientField from '@/components/ui/GradientField';
import Reveal from '@/components/ui/Reveal';
import Section from '@/components/ui/Section';
import VideoFrame from '@/components/ui/VideoFrame';
import { displayDomain, type FeaturedCaseStudy as Featured } from '@/lib/work';

export default function FeaturedCaseStudy({
  study,
  eyebrow = '01 — Featured work',
}: {
  study: Featured;
  eyebrow?: string;
}) {
  return (
    <Section id={study.slug} tone="paper" eyebrow={eyebrow}>
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="font-mono text-sm text-copper">{study.name}</p>
          <h2 className="display-lg mt-3">{study.headline}</h2>
          <p className="mt-6 text-lg leading-8 text-muted">{study.problem}</p>
          <p className="mt-4 text-lg leading-8 text-ink">{study.whatWeDid}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <li key={tag}>
                <Chip tone="light">{tag}</Chip>
              </li>
            ))}
          </ul>
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1 font-medium text-ink underline decoration-copper underline-offset-4"
          >
            Visit {displayDomain(study.url)} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative isolate overflow-hidden rounded-panel p-3 md:p-6">
            <GradientField variant="panel" className="-z-10" />
            <VideoFrame src={study.media.video} poster={study.media.poster} alt={`${study.name} website`} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create `components/InsightCard.tsx`**

```tsx
import Link from 'next/link';
import RemoteSafeImage from '@/components/RemoteSafeImage';
import { chipClasses } from '@/components/ui/Chip';
import { cn } from '@/lib/utils';

export type InsightListItem = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  image_url: string | null;
  website_url: string | null;
  published_at: string;
  featured?: boolean;
};

export function formatPublishDate(value: string, month: 'short' | 'long' = 'short') {
  return new Intl.DateTimeFormat('en-US', { month, day: 'numeric', year: 'numeric' }).format(new Date(value));
}

export default function InsightCard({
  article,
  featured = false,
  as: Heading = 'h3',
}: {
  article: InsightListItem;
  featured?: boolean;
  as?: 'h2' | 'h3';
}) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className={cn('group grid gap-6 rounded-card', featured && 'md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10')}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-ink-soft">
        <RemoteSafeImage
          src={article.image_url || '/og-image.jpg'}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority={featured}
        />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className={chipClasses({ tone: 'light' })}>{article.category}</span>
          <time dateTime={article.published_at}>{formatPublishDate(article.published_at)}</time>
        </div>
        <Heading className={cn('mt-4 font-medium tracking-tight text-ink', featured ? 'display-md' : 'text-2xl')}>
          {article.title}
        </Heading>
        <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-muted">{article.excerpt}</p>
        <span className="mt-4 inline-flex text-sm font-medium text-ink underline decoration-copper underline-offset-4">
          Read
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Replace `app/page.tsx`**

```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import HeroShowcase from '@/components/home/HeroShowcase';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import InsightCard, { type InsightListItem } from '@/components/InsightCard';
import StructuredData from '@/components/StructuredData';
import Button from '@/components/ui/Button';
import GradientField from '@/components/ui/GradientField';
import Reveal from '@/components/ui/Reveal';
import Section, { Eyebrow } from '@/components/ui/Section';
import FeaturedCaseStudy from '@/components/work/FeaturedCaseStudy';
import WorkCard from '@/components/work/WorkCard';
import { fetchPublishedInsights } from '@/lib/insights';
import { reportError } from '@/lib/monitoring';
import { getServiceExamples, services } from '@/lib/services';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import { createClient } from '@/lib/supabase/server';
import { caseStudies, getFeaturedCaseStudy, getOtherCaseStudies } from '@/lib/work';

export const metadata = buildMetadata({
  title: 'Websites that grow your brand',
  description:
    'Sulva Tech designs and builds websites, online stores and the systems behind them for founders and growing businesses. Every site comes with its own dashboard.',
  path: '/',
  keywords: ['web design agency Lagos', 'website with admin dashboard', 'Meal Direct'],
});

const steps = [
  { title: 'Call', body: 'A 30-minute call about your business, what you need, and what it should cost.' },
  { title: 'Plan & quote', body: 'A written plan: pages, features, price. You approve it before we start.' },
  { title: 'Design & build', body: 'You see designs first, then a working site you can click through as we build.' },
  { title: 'Launch & look after', body: 'We launch, walk you through your dashboard, and stay on hand for changes.' },
];

async function getLatestInsights(): Promise<InsightListItem[]> {
  try {
    const supabase = await createClient();
    const { data } = await fetchPublishedInsights(supabase);
    return (data as InsightListItem[]).slice(0, 3);
  } catch (error) {
    reportError(error, { scope: 'home.insights' });
    return [];
  }
}

export default async function Home() {
  const featured = getFeaturedCaseStudy();
  const others = getOtherCaseStudies();
  const insights = await getLatestInsights();
  const serviceItems = services.map((service) => ({ service, example: getServiceExamples(service)[0] }));

  return (
    <>
      <StructuredData data={buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }])} />

      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink px-5 pb-8 pt-32 text-white md:px-10 md:pb-10 md:pt-40">
        <GradientField variant="hero" solid={false} className="-z-10 opacity-80" />
        <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col">
          <Eyebrow tone="ink">Sulva — Lagos, Nigeria</Eyebrow>
          <h1 className="display-xl mt-6 max-w-5xl">Websites that grow your brand.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            We design and build websites — and the systems behind them — for founders and growing businesses. Every
            site comes with its own dashboard, so you run it, not us.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact">Start a project</Button>
            <Button href="/work" variant="secondary">
              See our work
            </Button>
          </div>
          <HeroShowcase studies={caseStudies} />
        </div>
      </section>

      <FeaturedCaseStudy study={featured} />

      <Section tone="ink" gradient="panel" eyebrow="02 — What we do">
        <h2 className="display-lg max-w-3xl">Three things, done properly.</h2>
        <div className="mt-14">
          <ServicesShowcase items={serviceItems} />
        </div>
      </Section>

      <Section tone="paper" eyebrow="03 — More work">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg max-w-3xl">Live sites, real businesses.</h2>
          <Link href="/work" className="inline-flex items-center gap-2 font-medium text-ink underline decoration-copper underline-offset-4">
            All work <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {others.map((study, index) => (
            <Reveal key={study.slug} delay={(index % 2) * 0.08}>
              <WorkCard study={study} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" className="border-t border-ink/10" eyebrow="04 — How we work">
        <h2 className="display-lg max-w-3xl">From first call to launch.</h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="font-mono text-sm text-copper">0{index + 1}</span>
              <h3 className="mt-3 text-xl font-medium tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {insights.length > 0 ? (
        <Section tone="paper" className="border-t border-ink/10" eyebrow="05 — Insights">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-lg max-w-3xl">Notes on building websites that work.</h2>
            <Link href="/insights" className="inline-flex items-center gap-2 font-medium text-ink underline decoration-copper underline-offset-4">
              All insights <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {insights.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm test && npx tsc --noEmit`
Expected: tests PASS, no type errors.
Open `http://localhost:3000/` at 1440px and 375px:
- Hero: full-height, client video behind the gradient, headline legible (white on darkened video), glass caption card + chip row at the bottom; chips auto-advance every 6s and stop after a click; arrow keys move between chips.
- Featured Meal Direct section on paper, video in glass frame over a gradient panel, five tag chips, "Visit mealdirectly.com" link.
- "What we do" dark band: three glass rows; clicking a row swaps the example video.
- Five work cards; hovering a card plays its loop (desktop).
- Four steps; insights row appears only if the database returns posts.
- CTA band, then footer.
No horizontal scroll at 375px.

- [ ] **Step 6: Commit**

```bash
git add components/work/WorkCard.tsx components/work/FeaturedCaseStudy.tsx components/InsightCard.tsx app/page.tsx
git commit -m "feat: rebuild home page around real client work" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Work page

**Files:**
- Modify: `components/WorkShowcase.tsx` (full replace), `app/work/page.tsx` (full replace)
- Test: `components/WorkShowcase.test.tsx`

**Interfaces:**
- Consumes: `WorkCard` (Task 9), `workCategories`, `filterCaseStudies`, `caseStudies`, `getFeaturedCaseStudy` (Task 6), `chipClasses`, `PageHero`, `Section` (Task 3), `FeaturedCaseStudy` (Task 9), `CtaBand` (Task 7).
- Produces: default `WorkShowcase({ studies: CaseStudy[] })`.

- [ ] **Step 1: Write the failing test `components/WorkShowcase.test.tsx`**

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WorkShowcase from '@/components/WorkShowcase';
import { caseStudies } from '@/lib/work';

const projectNames = () => screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

describe('WorkShowcase', () => {
  it('shows all six projects by default', () => {
    render(<WorkShowcase studies={caseStudies} />);
    expect(projectNames()).toHaveLength(6);
    expect(screen.getByRole('button', { name: 'All' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('filters to stores', () => {
    render(<WorkShowcase studies={caseStudies} />);
    fireEvent.click(screen.getByRole('button', { name: 'Store' }));
    expect(projectNames()).toEqual(['Itzlolabeauty', 'theDMAshop']);
    expect(screen.getByRole('button', { name: 'Store' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('shows what we built on each card', () => {
    render(<WorkShowcase studies={caseStudies} />);
    expect(screen.getByText(/five connected apps/)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/WorkShowcase.test.tsx`
Expected: FAIL — the current component expects `projects` with `title/desc` and renders "Delivery Themes".

- [ ] **Step 3: Replace `components/WorkShowcase.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { chipClasses } from '@/components/ui/Chip';
import WorkCard from '@/components/work/WorkCard';
import { filterCaseStudies, workCategories, type CaseStudy, type WorkCategory } from '@/lib/work';

export default function WorkShowcase({ studies }: { studies: CaseStudy[] }) {
  const [category, setCategory] = useState<WorkCategory>('All');
  const visible = filterCaseStudies(studies, category);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {workCategories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={item === category}
            onClick={() => setCategory(item)}
            className={chipClasses({ active: item === category, tone: 'light' })}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {visible.map((study) => (
          <WorkCard key={study.slug} study={study} detailed />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/WorkShowcase.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Replace `app/work/page.tsx`**

```tsx
import CtaBand from '@/components/CtaBand';
import StructuredData from '@/components/StructuredData';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import FeaturedCaseStudy from '@/components/work/FeaturedCaseStudy';
import WorkShowcase from '@/components/WorkShowcase';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import { caseStudies, getFeaturedCaseStudy } from '@/lib/work';

export const metadata = buildMetadata({
  title: 'Work',
  description:
    'Live websites and platforms we designed and built: Meal Direct, Itzlolabeauty, theDMAshop, Mindfire Homes, Olorunleke Ojuolape and The Inner Circle.',
  path: '/work',
  keywords: ['web design portfolio Nigeria', 'Meal Direct', 'Mindfire Homes website'],
});

export default function WorkPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <PageHero eyebrow="Work" title="Work we're proud of." sub="Real businesses, live sites. Click through and try them." />
      <FeaturedCaseStudy study={getFeaturedCaseStudy()} eyebrow="Featured" />
      <Section tone="paper" className="border-t border-ink/10" eyebrow="All projects">
        <WorkShowcase studies={caseStudies} />
      </Section>
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit`, then open `http://localhost:3000/work` (1440px and 375px): dark hero, Meal Direct featured block, filter chips (All/Product/Store/Brand/Community) filter the six cards, each card shows "what we built", links open the live site in a new tab. `http://localhost:3000/work#mealdirect` scrolls to the featured block.

- [ ] **Step 7: Commit**

```bash
git add components/WorkShowcase.tsx components/WorkShowcase.test.tsx app/work/page.tsx
git commit -m "feat: rebuild work page with the six client projects" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Services page

**Files:**
- Modify: `app/services/page.tsx` (full replace)

**Interfaces:**
- Consumes: `services`, `getServiceExamples` (Task 6); `WorkCard` (Task 9); `PageHero`, `Section`, `Eyebrow`, `GlassPanel`, `Reveal` (Task 3); `CtaBand` (Task 7).

- [ ] **Step 1: Replace `app/services/page.tsx`**

```tsx
import { Check } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import StructuredData from '@/components/StructuredData';
import GlassPanel from '@/components/ui/GlassPanel';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import Section, { Eyebrow } from '@/components/ui/Section';
import WorkCard from '@/components/work/WorkCard';
import { getServiceExamples, services } from '@/lib/services';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import { cn } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Brand websites, online stores, and products & apps. Each comes with its own dashboard, so you run your business without waiting on us.',
  path: '/services',
  keywords: ['brand website design', 'ecommerce website Nigeria', 'web app development Lagos'],
});

export default function ServicesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <PageHero eyebrow="Services" title="What we build." sub="Three things, done properly." />

      {services.map((service, index) => {
        const [lead, ...rest] = getServiceExamples(service);
        return (
          <Section
            key={service.slug}
            id={service.slug}
            tone="paper"
            eyebrow={`0${index + 1}`}
            className={index > 0 ? 'border-t border-ink/10' : undefined}
          >
            <div className={cn('grid items-start gap-12 lg:grid-cols-2', index % 2 === 1 && 'lg:[&>*:first-child]:order-2')}>
              <Reveal>
                <h2 className="display-md">{service.name}</h2>
                <p className="mt-3 font-mono text-xs text-muted">{service.forWho}</p>
                <p className="mt-6 text-lg leading-8 text-ink/80">{service.summary}</p>
                <ul className="mt-8 space-y-3">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-6">
                      <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1}>
                <WorkCard study={lead} />
                {rest.length > 0 ? (
                  <p className="mt-6 text-sm text-muted">Also: {rest.map((study) => study.name).join(', ')}</p>
                ) : null}
              </Reveal>
            </div>
          </Section>
        );
      })}

      <Section tone="ink" gradient="panel">
        <GlassPanel className="mx-auto max-w-3xl p-8 md:p-12">
          <Eyebrow tone="ink">Included with every project</Eyebrow>
          <h2 className="display-md mt-4">Every site comes with a dashboard.</h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Update your content, see new enquiries and orders, and manage your business yourself — without sending us
            an email for every change.
          </p>
        </GlassPanel>
      </Section>

      <CtaBand title="Not sure which you need?" sub="Tell us what you're trying to do. We'll tell you honestly what it takes." />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`, then open `http://localhost:3000/services` (1440px, 375px): three alternating rows (text left/right swaps on desktop), each with a checklist and an example project card; "Also: …" under brand websites and online stores; dashboard glass panel on a gradient; CTA band. No prices anywhere.

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx
git commit -m "feat: rebuild services page around three offers" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: About and Careers pages

**Files:**
- Modify: `app/about/page.tsx` (full replace), `app/careers/page.tsx` (full replace)

**Interfaces:**
- Consumes: `siteConfig.founder`, `siteConfig.careersEmail` (Task 1); `PageHero`, `Section`, `Eyebrow`, `GlassPanel`, `Button`, `Reveal` (Task 3); `CtaBand` (Task 7).

- [ ] **Step 1: Replace `app/about/page.tsx`**

```tsx
import CtaBand from '@/components/CtaBand';
import StructuredData from '@/components/StructuredData';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import Section, { Eyebrow } from '@/components/ui/Section';
import { buildBreadcrumbJsonLd, buildMetadata, siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'About',
  description:
    'Sulva Tech is a Lagos studio that designs and builds websites, online stores and the systems behind them. Every client gets their own dashboard.',
  path: '/about',
  keywords: ['about Sulva Tech', 'Iyiola Ogunjobi', 'web studio Lagos'],
});

const principles = [
  { title: 'Straight talk.', body: "We tell you what it costs, how long it takes, and what we'd do differently." },
  { title: 'The builder is on the call.', body: 'The person you talk to is the person building it.' },
  { title: 'Built to hand over.', body: 'You run your site from your own dashboard, without calling us for every change.' },
];

export default function AboutPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);
  const { founder } = siteConfig;

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <PageHero
        eyebrow="About"
        title="Built in Lagos, by people who ship."
        sub="Sulva Tech designs and builds websites, online stores and the systems behind them for founders and growing businesses."
      />

      <Section tone="paper">
        <Reveal className="max-w-3xl space-y-6 text-xl leading-9 text-ink/85">
          <p>
            Our clients range from a campus food-delivery startup to a real estate firm in Abuja and a makeup artist in
            Arizona. What they have in common: they needed a website that looks the part and actually does a job.
          </p>
          <p>
            One habit runs through all of it. Every client gets their own dashboard, so they can update content, see
            enquiries and orders, and run their business without waiting on us.
          </p>
        </Reveal>
      </Section>

      <Section tone="ink" gradient="panel">
        <GlassPanel className="max-w-2xl p-8 md:p-12">
          <Eyebrow tone="ink">{founder.role}</Eyebrow>
          <h2 className="display-md mt-4">{founder.name}</h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Leads design and engineering at Sulva, from the first call to launch.
          </p>
          <div className="mt-8">
            <Button href={founder.portfolio}>See my portfolio ↗</Button>
          </div>
        </GlassPanel>
      </Section>

      <Section tone="paper" eyebrow="How we work">
        <Reveal>
          <ul className="grid gap-10 md:grid-cols-3">
            {principles.map((principle) => (
              <li key={principle.title}>
                <h2 className="text-2xl font-medium tracking-tight">{principle.title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-muted">{principle.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
```

- [ ] **Step 2: Replace `app/careers/page.tsx`**

```tsx
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import Section, { Eyebrow } from '@/components/ui/Section';
import { buildMetadata, siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Careers',
  description: "Sulva Tech isn't hiring right now. If you design or build for the web, send us your work.",
  path: '/careers',
});

export default function CareersPage() {
  return (
    <Section tone="ink" gradient="hero" className="flex min-h-[80vh] items-center pt-40">
      <GlassPanel className="max-w-2xl p-8 md:p-12">
        <Eyebrow tone="ink">Careers</Eyebrow>
        <h1 className="display-lg mt-4">Work with us.</h1>
        <p className="mt-6 text-lg leading-8 text-white/75">
          We&apos;re not hiring right now. If you design or build for the web and want to be on our radar, send your
          work to {siteConfig.careersEmail}.
        </p>
        <div className="mt-8">
          <Button href={`mailto:${siteConfig.careersEmail}`}>Send your work</Button>
        </div>
      </GlassPanel>
    </Section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`, then open `/about` and `/careers` (1440px, 375px). About: hero, two-paragraph story, founder glass card with working "See my portfolio ↗" (new tab to iyiola.sulvatech.com), three principles, CTA. Careers: gradient page with one glass panel and a mailto button.

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/careers/page.tsx
git commit -m "feat: rebuild about and careers pages" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 13: Contact page

**Files:**
- Create: `components/ContactForm.tsx`
- Modify: `app/contact/page.tsx` (full replace), `app/contact/layout.tsx:3-7` (metadata description)
- Test: `components/ContactForm.test.tsx`

**Interfaces:**
- Consumes: `buttonClasses` (Task 3), `GradientField`, `GlassPanel`, `Eyebrow` (Task 3), `siteConfig` (Task 1).
- Produces: default `ContactForm()` (client, no props).

- [ ] **Step 1: Write the failing test `components/ContactForm.test.tsx`**

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ContactForm from '@/components/ContactForm';

function fill() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
  fireEvent.change(screen.getByLabelText('What do you need?'), { target: { value: 'web' } });
  fireEvent.change(screen.getByLabelText('Tell us about it'), { target: { value: 'A site for my bakery.' } });
}

describe('ContactForm', () => {
  it('posts the same payload shape the API expects', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(await screen.findByRole('heading', { name: 'Message sent' })).toBeTruthy();

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/contact');
    const body = JSON.parse(init.body);
    expect(Object.keys(body).sort()).toEqual(['budget', 'company', 'email', 'message', 'name', 'projectType', 'website']);
    expect(body).toMatchObject({ name: 'Ada', email: 'ada@example.com', projectType: 'web', message: 'A site for my bakery.', website: '' });
  });

  it('keeps the API option values', () => {
    render(<ContactForm />);
    const types = Array.from((screen.getByLabelText('What do you need?') as HTMLSelectElement).options).map((o) => o.value);
    expect(types).toEqual(['', 'web', 'mobile', 'software', 'branding', 'other']);
    const budgets = Array.from((screen.getByLabelText('Budget') as HTMLSelectElement).options).map((o) => o.value);
    expect(budgets).toEqual(['', '10-25k', '25-50k', '50-100k', '100k+']);
  });

  it('shows the API error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'Invalid email address' }) }));
    render(<ContactForm />);
    fill();
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect((await screen.findByRole('alert')).textContent).toBe('Invalid email address');
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/ContactForm.test.tsx`
Expected: FAIL — cannot resolve `@/components/ContactForm`.

- [ ] **Step 3: Create `components/ContactForm.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';

const emptyForm = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
  website: '',
};

const fieldClasses =
  'w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-[15px] text-white placeholder:text-white/40 outline-none transition focus:border-copper-soft focus:bg-white/10';
const labelClasses = 'mb-2 block text-sm text-white/80';

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Failed to submit');
      setIsSubmitted(true);
      setForm(emptyForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-10 text-center">
        <CheckCircle size={40} aria-hidden="true" className="mx-auto text-copper-soft" />
        <h2 className="mt-6 text-3xl font-medium tracking-tight">Message sent</h2>
        <p className="mx-auto mt-3 max-w-sm text-white/75">We&apos;ll be in touch within a working day.</p>
        <button type="button" onClick={() => setIsSubmitted(false)} className="mt-8 text-sm text-copper-soft underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={handleChange} className={`${fieldClasses} h-12`} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} className={`${fieldClasses} h-12`} />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClasses}>Business name <span className="text-white/45">(optional)</span></label>
        <input id="company" name="company" type="text" autoComplete="organization" value={form.company} onChange={handleChange} className={`${fieldClasses} h-12`} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="projectType" className={labelClasses}>What do you need?</label>
          <select id="projectType" name="projectType" value={form.projectType} onChange={handleChange} className={`${fieldClasses} h-12 [&>option]:bg-ink`}>
            <option value="">Choose one…</option>
            <option value="web">Website</option>
            <option value="mobile">Mobile app</option>
            <option value="software">Web app or platform</option>
            <option value="branding">Branding &amp; design</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClasses}>Budget</label>
          <select id="budget" name="budget" value={form.budget} onChange={handleChange} className={`${fieldClasses} h-12 [&>option]:bg-ink`}>
            <option value="">Choose a range…</option>
            <option value="10-25k">$10k – $25k</option>
            <option value="25-50k">$25k – $50k</option>
            <option value="50-100k">$50k – $100k</option>
            <option value="100k+">$100k+</option>
          </select>
        </div>
      </div>

      <div>
        <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <label htmlFor="message" className={labelClasses}>Tell us about it</label>
        <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className={`${fieldClasses} resize-none py-3`} placeholder="What does your business do, and what should the site help with?" />
      </div>

      <button type="submit" disabled={isSubmitting} className={buttonClasses({ className: 'w-full' })}>
        {isSubmitting ? 'Sending…' : (<>Send message <ArrowRight size={18} aria-hidden="true" /></>)}
      </button>
      {error ? <p role="alert" className="text-sm text-copper-soft">{error}</p> : null}
    </form>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/ContactForm.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Replace `app/contact/page.tsx`**

```tsx
import ContactForm from '@/components/ContactForm';
import GlassPanel from '@/components/ui/GlassPanel';
import GradientField from '@/components/ui/GradientField';
import { Eyebrow } from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';

const nextSteps = [
  'We reply within 1 working day.',
  'A 30-minute call about what you need.',
  'A written plan and quote.',
];

export default function ContactPage() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-ink px-5 pb-20 pt-36 text-white md:px-10 md:pt-44">
      <GradientField variant="hero" className="-z-10" />
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow tone="ink">Contact</Eyebrow>
          <h1 className="display-lg mt-6">Tell us what you&apos;re building.</h1>
          <ol className="mt-12 space-y-5">
            {nextSteps.map((step, index) => (
              <li key={step} className="flex gap-4 text-lg text-white/80">
                <span className="font-mono text-sm leading-7 text-copper-soft">0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <dl className="mt-12 grid gap-4 text-white/75 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <dt className="font-mono text-xs text-white/50">Email</dt>
              <dd><a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a></dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-white/50">Phone</dt>
              <dd><a href={siteConfig.phoneHref} className="hover:text-white">{siteConfig.phone}</a></dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-white/50">Based in</dt>
              <dd>{siteConfig.location}</dd>
            </div>
          </dl>
        </div>
        <GlassPanel className="p-6 md:p-8">
          <ContactForm />
        </GlassPanel>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Update the description in `app/contact/layout.tsx`**

Replace the `description` line with:

```tsx
    description: 'Tell Sulva Tech about your website, online store or app. We reply within 1 working day.',
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit`, then open `/contact` (1440px, 375px): gradient page, three steps, email/phone (`tel:` link)/location, glass form with visible labels and copper focus. Do not submit a real message here — Task 16 does that with the user's OK.

- [ ] **Step 8: Commit**

```bash
git add components/ContactForm.tsx components/ContactForm.test.tsx app/contact/page.tsx app/contact/layout.tsx
git commit -m "feat: rebuild contact page with glass form" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 14: Insights list and post

**Files:**
- Modify: `components/InsightsFeed.tsx` (full replace), `app/insights/page.tsx` (full replace), `app/insights/[slug]/page.tsx` (full replace)
- Test: `components/InsightsFeed.test.tsx`

**Interfaces:**
- Consumes: `InsightCard`, `InsightListItem`, `formatPublishDate` (Task 9); `PageHero`, `Section`, `GlassPanel`, `GradientField`, `chipClasses` (Task 3); `NewsletterForm` (Task 7).
- Produces: default `InsightsFeed({ articles: InsightListItem[] })`.

- [ ] **Step 1: Write the failing test `components/InsightsFeed.test.tsx`**

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InsightsFeed from '@/components/InsightsFeed';
import type { InsightListItem } from '@/components/InsightCard';

const article = (slug: string, category: string): InsightListItem => ({
  slug,
  title: `Post ${slug}`,
  category,
  excerpt: 'Excerpt',
  author: 'Sulva',
  image_url: null,
  website_url: null,
  published_at: '2026-09-01T00:00:00Z',
});

describe('InsightsFeed', () => {
  it('filters posts by topic', () => {
    render(<InsightsFeed articles={[article('a', 'Design'), article('b', 'Engineering'), article('c', 'Design')]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)).toEqual(['Post b']);
  });

  it('hides the filter when there is only one topic', () => {
    render(<InsightsFeed articles={[article('a', 'Design')]} />);
    expect(screen.queryByRole('group', { name: 'Filter by topic' })).toBeNull();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/InsightsFeed.test.tsx`
Expected: FAIL — headings are `h3` in the old feed / filter shown for one topic.

- [ ] **Step 3: Replace `components/InsightsFeed.tsx`**

```tsx
'use client';

import { useState } from 'react';
import InsightCard, { type InsightListItem } from '@/components/InsightCard';
import { chipClasses } from '@/components/ui/Chip';

export default function InsightsFeed({ articles }: { articles: InsightListItem[] }) {
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(articles.map((article) => article.category))];
  const visible = category === 'All' ? articles : articles.filter((article) => article.category === category);

  if (articles.length === 0) return null;

  return (
    <>
      {categories.length > 2 ? (
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={item === category}
              onClick={() => setCategory(item)}
              className={chipClasses({ active: item === category, tone: 'light' })}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
      <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {visible.map((article) => (
          <InsightCard key={article.slug} article={article} as="h2" />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/InsightsFeed.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Replace `app/insights/page.tsx`**

```tsx
import InsightCard, { type InsightListItem } from '@/components/InsightCard';
import InsightsFeed from '@/components/InsightsFeed';
import NewsletterForm from '@/components/NewsletterForm';
import StructuredData from '@/components/StructuredData';
import GlassPanel from '@/components/ui/GlassPanel';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { fetchPublishedInsights } from '@/lib/insights';
import { buildBreadcrumbJsonLd, buildMetadata } from '@/lib/site';
import { createClient } from '@/lib/supabase/server';

export const metadata = buildMetadata({
  title: 'Insights',
  description: 'Notes from Sulva Tech on building websites, online stores and the systems behind them.',
  path: '/insights',
  keywords: ['website tips Nigeria', 'ecommerce advice', 'web design blog'],
});

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const supabase = await createClient();
  const { data, error } = await fetchPublishedInsights(supabase);

  if (error) {
    console.error('Failed to fetch insights:', error);
  }

  const articles = (data ?? []) as InsightListItem[];
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const others = articles.filter((article) => article.slug !== featured?.slug);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <PageHero title="Insights" sub="Notes on building websites that work." />

      <Section tone="paper">
        {featured ? (
          <InsightCard article={featured} featured as="h2" />
        ) : (
          <p className="rounded-card border border-dashed border-ink/20 p-12 text-center text-muted">
            No posts yet. Check back soon.
          </p>
        )}
        {others.length > 0 ? (
          <div className="mt-20 border-t border-ink/10 pt-16">
            <InsightsFeed articles={others} />
          </div>
        ) : null}
      </Section>

      <Section id="newsletter" tone="ink" gradient="cta">
        <GlassPanel className="mx-auto max-w-2xl p-8 text-center md:p-12">
          <h2 className="display-md">Get new posts by email.</h2>
          <p className="mt-4 text-white/75">One short email when we publish something useful. No spam.</p>
          <div className="mt-8 text-left">
            <NewsletterForm />
          </div>
        </GlassPanel>
      </Section>
    </>
  );
}
```

- [ ] **Step 6: Replace `app/insights/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import StructuredData from '@/components/StructuredData';
import RemoteSafeImage from '@/components/RemoteSafeImage';
import { formatPublishDate } from '@/components/InsightCard';
import { chipClasses } from '@/components/ui/Chip';
import GradientField from '@/components/ui/GradientField';
import { absoluteUrl, buildBreadcrumbJsonLd } from '@/lib/site';
import { fetchPublishedInsightBySlug } from '@/lib/insights';

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

async function getInsight(slug: string) {
  const supabase = await createClient();
  const { data, error } = await fetchPublishedInsightBySlug(supabase, slug);

  if (error) {
    console.error('Failed to fetch insight:', error);
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);

  if (!insight) {
    return {
      title: 'Insight Not Found',
    };
  }

  return {
    title: insight.seo_title || insight.title,
    description: insight.seo_description || insight.excerpt,
    alternates: {
      canonical: insight.canonical_url || absoluteUrl(`/insights/${slug}`),
    },
    openGraph: {
      title: insight.seo_title || insight.title,
      description: insight.seo_description || insight.excerpt,
      type: 'article',
      url: insight.canonical_url || absoluteUrl(`/insights/${slug}`),
      images: [insight.og_image_url || insight.image_url || absoluteUrl('/og-image.jpg')],
    },
    twitter: {
      card: 'summary_large_image',
      title: insight.seo_title || insight.title,
      description: insight.seo_description || insight.excerpt,
      images: [insight.og_image_url || insight.image_url || absoluteUrl('/og-image.jpg')],
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = await getInsight(slug);

  if (!insight) {
    notFound();
  }

  const paragraphs: string[] = insight.content.split('\n\n').filter(Boolean);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: insight.title, path: `/insights/${insight.slug}` },
  ]);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.seo_title || insight.title,
    description: insight.seo_description || insight.excerpt,
    image: [insight.og_image_url || insight.image_url || absoluteUrl('/og-image.jpg')],
    author: {
      '@type': 'Person',
      name: insight.author,
      jobTitle: insight.author_role || undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sulva Tech',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.jpg'),
      },
    },
    mainEntityOfPage: insight.canonical_url || absoluteUrl(`/insights/${insight.slug}`),
    datePublished: insight.published_at,
    dateModified: insight.published_at,
  };

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={articleJsonLd} />

      <header className="relative isolate overflow-hidden bg-ink px-5 pb-16 pt-36 text-white md:px-10 md:pt-44">
        <GradientField variant="panel" className="-z-10" />
        <div className="mx-auto max-w-[68ch]">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
            <ArrowLeft size={16} aria-hidden="true" />
            All insights
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span className={chipClasses()}>{insight.category}</span>
            <time dateTime={insight.published_at}>{formatPublishDate(insight.published_at, 'long')}</time>
            <span>· {insight.author}</span>
          </div>
          <h1 className="display-md mt-6">{insight.title}</h1>
          <p className="mt-5 text-lg leading-8 text-white/75">{insight.excerpt}</p>
          {insight.website_url ? (
            <a
              href={insight.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1 text-sm text-copper-soft hover:text-white"
            >
              Visit live website <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </header>

      <article className="bg-paper px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[68ch]">
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-card bg-ink-soft">
            <RemoteSafeImage
              src={insight.image_url || '/og-image.jpg'}
              alt={insight.title}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
          <div className="prose prose-lg max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:text-ink/80 prose-a:text-copper">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit`, then open `/insights` and one post (click any card). List: hero, large featured card, topic chips (only if >1 topic), 2-col grid, newsletter glass panel. Post: gradient header with title/category/date/author, image, readable prose on paper (Geist, copper links). Legacy remote images (http URLs) still render.

- [ ] **Step 8: Commit**

```bash
git add components/InsightsFeed.tsx components/InsightsFeed.test.tsx app/insights/page.tsx "app/insights/[slug]/page.tsx"
git commit -m "feat: rebuild insights list and post pages" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 15: Legal pages

**Files:**
- Create: `components/LegalPage.tsx`
- Modify: `app/privacy-policy/page.tsx`, `app/terms-of-service/page.tsx`, `app/cookie-policy/page.tsx`

**Interfaces:**
- Produces: default `LegalPage({ title: string; children: ReactNode })`.

- [ ] **Step 1: Create `components/LegalPage.tsx`**

```tsx
import type { ReactNode } from 'react';

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-paper px-5 pb-24 pt-36 md:px-10">
      <article className="prose prose-lg mx-auto max-w-[68ch] prose-headings:font-medium prose-headings:tracking-tight prose-h1:text-5xl prose-p:text-ink/80 prose-li:text-ink/80 prose-a:text-copper">
        <h1>{title}</h1>
        {children}
      </article>
    </div>
  );
}
```

- [ ] **Step 2: Wrap each legal page**

In each of the three files, add `import LegalPage from '@/components/LegalPage';` below the existing import, then make exactly these two replacements (text content stays unchanged):

Opening — replace:

```tsx
    <div className="w-full px-6 py-16 md:py-24">
      <article className="prose prose-lg mx-auto max-w-4xl prose-headings:font-heading prose-headings:text-text-main prose-p:text-text-muted prose-li:text-text-muted">
        <h1>Privacy Policy</h1>
```

with:

```tsx
    <LegalPage title="Privacy Policy">
```

(use `Terms of Service` / `Cookie Policy` as the `<h1>` text and `title` in the other two files; if a file's `<article>` className differs, replace whatever `<div …><article …><h1>…</h1>` opening it has).

Closing — replace:

```tsx
      </article>
    </div>
```

with:

```tsx
    </LegalPage>
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`, then open `/privacy-policy`, `/terms-of-service`, `/cookie-policy`: paper background, the nav pill is solid dark from the top (readable), large H1, prose. Text unchanged from before.

- [ ] **Step 4: Commit**

```bash
git add components/LegalPage.tsx app/privacy-policy/page.tsx app/terms-of-service/page.tsx app/cookie-policy/page.tsx
git commit -m "feat: restyle legal pages" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 16: Guards, legacy cleanup, final QA

**Files:**
- Create: `tests/site-guards.test.ts`
- Modify: `app/globals.css` (trim legacy block), `.gitignore` (add `.lighthouse/`)

**Interfaces:**
- Consumes: all public files.

- [ ] **Step 1: Write the guard test `tests/site-guards.test.ts`**

```ts
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function listFiles(dir: string): string[] {
  return (readdirSync(path.join(root, dir), { recursive: true }) as string[]).map((file) =>
    path.join(dir, file).split(path.sep).join('/'),
  );
}

const PUBLIC_FILES = [
  ...listFiles('app').filter((file) => !file.startsWith('app/admin/') && !file.startsWith('app/api/')),
  ...listFiles('components').filter((file) => !file.startsWith('components/admin/')),
  'lib/site.ts',
  'lib/work.ts',
  'lib/services.ts',
].filter((file) => /\.tsx?$/.test(file) && !/\.test\.tsx?$/.test(file));

const BANNED = [
  'senior-led',
  'growth system',
  'premium digital execution',
  'end-to-end',
  'cutting-edge',
  'solutions',
  'synergy',
  'world-class',
  'leverage',
];

const LEGACY_TOKEN =
  /\b(?:bg|text|border|ring|from|via|to|shadow|outline|decoration|fill|stroke|placeholder)-(?:primary(?:-dark|-light)?|surface-(?:dark|light)|background-(?:dark|light)|text-main|text-muted)\b|\bfont-heading\b|\bpurple-\d/;

describe('site guards', () => {
  it('finds the public files', () => {
    expect(PUBLIC_FILES).toContain('app/page.tsx');
    expect(PUBLIC_FILES).not.toContain('app/admin/page.tsx');
  });

  it.each(PUBLIC_FILES)('%s uses no banned copy', (file) => {
    const text = readFileSync(path.join(root, file), 'utf8').toLowerCase();
    for (const phrase of BANNED) expect(text, `"${phrase}" in ${file}`).not.toContain(phrase);
  });

  it.each(PUBLIC_FILES)('%s uses no legacy purple-era tokens', (file) => {
    const text = readFileSync(path.join(root, file), 'utf8');
    expect(text.match(LEGACY_TOKEN)?.[0] ?? null, file).toBeNull();
  });
});
```

- [ ] **Step 2: Run it and fix anything it finds**

Run: `npx vitest run tests/site-guards.test.ts`
Expected: PASS. If a file fails, fix that file's copy or classes (replace legacy tokens with `ink`/`paper`/`copper`/`muted` equivalents) — never weaken the test. Files not rebuilt by earlier tasks (e.g. `components/Logo.tsx`, `components/RemoteSafeImage.tsx`) should already pass.

- [ ] **Step 3: Trim the legacy block in `app/globals.css`**

Replace the legacy block (the comment and every line from `--color-primary` through `--font-heading`) with:

```css
  /* Legacy name used only by components/admin/*. Public pages must not use it
     (tests/site-guards.test.ts enforces this). */
  --color-primary: #b8673a;
```

- [ ] **Step 4: Full test, lint, build**

```bash
npm test
npm run lint
npm run build
```

Expected: all tests PASS; lint exits 0 (warnings allowed, no errors); build succeeds.

- [ ] **Step 5: Admin smoke test**

```bash
npm start
```

Open `http://localhost:3000/admin/login`: no public nav/footer; page readable. If you can sign in with the project's test admin, open `/admin`, `/admin/insights`, `/admin/contacts`: layout intact, accents copper instead of purple.

- [ ] **Step 6: Responsive and reduced-motion pass**

With `npm start` running, check every public page (`/`, `/work`, `/services`, `/about`, `/careers`, `/contact`, `/insights`, one post, three legal pages, a 404) at 375×812, 768×1024 and 1440×900:
- no horizontal scroll; nav pill readable at the top of every page;
- one `<h1>` per page;
- every focusable element shows the copper focus ring when tabbing.
Then in Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", reload `/`: gradients don't drift, hero chips don't auto-advance, posters show instead of video, sections appear without fade.

- [ ] **Step 7: Lighthouse**

Add `.lighthouse/` to `.gitignore`, then with `npm start` running:

```bash
npx --yes lighthouse@12 http://localhost:3000/ --only-categories=performance,accessibility --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless=new" --output=json --output-path=.lighthouse/home.json --quiet
npx --yes lighthouse@12 http://localhost:3000/work --only-categories=performance,accessibility --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless=new" --output=json --output-path=.lighthouse/work.json --quiet
npx --yes lighthouse@12 http://localhost:3000/contact --only-categories=performance,accessibility --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless=new" --output=json --output-path=.lighthouse/contact.json --quiet
node -e "for (const p of ['home','work','contact']) { const r = require('./.lighthouse/' + p + '.json'); console.log(p, Math.round(r.categories.performance.score*100), Math.round(r.categories.accessibility.score*100)); }"
```

Expected: performance ≥ 85 and accessibility ≥ 95 for each. If below, fix the top Lighthouse opportunity (usually: hero poster `priority`, video `preload`, image `sizes`, colour contrast on glass) and re-run.

- [ ] **Step 8: Live form check — ask the user first**

Submitting the contact and newsletter forms against the local `.env.local` writes to the real Supabase project and emails `hello@sulvatech.com`. Ask the user before doing it. If they agree: submit one contact message and one newsletter signup with an address they provide, confirm the success states, and confirm the rows appear in `/admin/contacts` and `/admin/newsletter`.

- [ ] **Step 9: Commit**

```bash
git add tests/site-guards.test.ts app/globals.css .gitignore
git commit -m "test: guard copy rules and legacy tokens; trim legacy styles" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 10: Hand off**

Report to the user: test/lint/build results, Lighthouse scores, any page that needed changes in Steps 2/7, and that the branch `redesign/glass` is ready. Use superpowers:finishing-a-development-branch to decide merge/PR.
