# Sulva Tech — Glass Redesign (Design Spec)

**Date:** 2026-10-07
**Status:** Draft — awaiting review
**Scope:** All public pages, navbar, footer. Admin, API, database and SEO plumbing unchanged.

---

## 1. Why

The current site reads as a generic agency template: purple gradient blobs, uppercase "Built to solve" hero, Lucide icon cards, and filler copy ("coherent growth system", "senior-led digital execution"). The work page shows abstract "Delivery Themes" instead of real clients. Nothing on the page proves Sulva has shipped anything.

**Goal:** a site that looks like it belongs on Godly, says plainly what Sulva does, and leads with real work.

**Success criteria**

- Every public page rebuilt on one shared visual system (no leftover purple/template styling).
- Six real client projects shown with real footage; Meal Direct featured.
- Copy rewritten: no buzzwords, no invented stats, every claim backed by a real project.
- Lighthouse (mobile) Performance ≥ 85, Accessibility ≥ 95 on home, work, contact.
- Contact form, newsletter signup and insights rendering work exactly as before.

---

## 2. Decisions made

| Decision | Choice |
| --- | --- |
| Visual anchor | **Primefold** (primefold.ai, featured on Godly) — dark cinematic, frosted chips, teal→copper gradient panels holding glass UI |
| Glass philosophy | Aesthetics first; glass only on elements layered over gradients or video |
| Copy voice | Confident + plain |
| Positioning | "Websites that grow brands — and the systems behind them." Proof point from the repos: every client site ships with its own custom admin/dashboard, and Meal Direct is a full multi-app platform |
| Scope | All public pages; admin untouched |
| Build approach | New design system in place: tokens + ~7 shared primitives, then rebuild each page (no UI kit, no parallel route group) |

**Reference ≠ clone.** Primefold informs mood, layering and rhythm. Layouts, copy, imagery and brand are Sulva's own.

---

## 3. Visual system

### 3.1 Colour tokens (`app/globals.css` `@theme`)

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#0B0D0C` | Dark sections, hero, footer, body text on light |
| `--color-ink-soft` | `#151918` | Raised dark surfaces |
| `--color-paper` | `#F4F1EC` | Light sections background |
| `--color-paper-raised` | `#FFFFFF` | Cards on light |
| `--color-teal` | `#0F3B36` | Gradient field |
| `--color-teal-glow` | `#1F6B5F` | Gradient highlight |
| `--color-copper` | `#B8673A` | Accent: CTAs, focus rings, links on dark |
| `--color-copper-soft` | `#E2A57C` | Accent on dark backgrounds where contrast needs it |
| `--color-muted` | `#5E615F` | Secondary text on paper |
| `--color-muted-dark` | `rgba(255,255,255,0.64)` | Secondary text on ink |

All purple tokens (`primary`, `surface-dark`, `background-dark`, etc.) are removed. Admin pages reference some of them, so they get mapped to neutral aliases in a small `admin` block rather than deleted outright — admin keeps working, just loses the purple.

### 3.2 Gradient field

`<GradientField variant="hero" | "panel" | "cta" />` — absolutely positioned layer:

- 3 stacked radial gradients (teal-glow top-left, copper bottom-right, teal centre) over `ink`.
- Grain overlay: inline SVG `feTurbulence` noise at ~6% opacity (no image request).
- Slow drift: gradient positions animate over ~24s via CSS keyframes. Disabled under `prefers-reduced-motion`.
- Pure CSS. No WebGL, no canvas.

### 3.3 Glass recipe (one recipe, used everywhere)

```
background: rgb(255 255 255 / 0.08);
backdrop-filter: blur(24px) saturate(140%);
border: 1px solid rgb(255 255 255 / 0.14);
box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), 0 20px 60px -20px rgb(0 0 0 / 0.5);
```

- Exposed as `<GlassPanel>` and a `.glass` utility.
- **Rule:** glass only on things that sit *over* a gradient or video (nav, chips, hero cards, form, video captions). Content sections on `paper` use solid cards — this restraint is what keeps it tasteful.
- Fallback: `@supports not (backdrop-filter: blur(1px))` → `background: rgb(21 25 24 / 0.92)`.
- Mobile: blur drops to 16px; max ~4 glass layers visible per viewport.

### 3.4 Type

- **Geist** (via `next/font/google`) for display and body; **Geist Mono** for small labels/step numbers. Replaces Inter + Outfit.
- Display: sentence case, weight 500–600, tracking −0.035em, line-height 0.95. Hero `clamp(3rem, 8vw, 7.5rem)`.
- Body: 17–18px, line-height 1.6, max 62ch.
- No uppercase headlines, no italic accent words. Small mono eyebrow labels only (e.g. `01 — Featured`).

### 3.5 Buttons & chips

- **Primary:** white pill, ink text (on dark) / ink pill, white text (on paper). Height 48px.
- **Secondary:** glass pill (on dark) / outline pill (on paper).
- **Chip:** glass, 36px, icon + label — used for hero project tabs and tags.
- Focus: 2px copper ring, 2px offset. Hover: subtle lift (−1px) + brightness.

### 3.6 Motion (`motion`, already installed)

- `<Reveal>`: fade + 16px rise on enter, once, staggered 60ms in lists.
- Navbar: transparent at top → glass pill after 24px scroll.
- Hero project tabs crossfade the background video (400ms).
- Work videos play when ≥50% in view, pause when out.
- Everything respects `prefers-reduced-motion` (reveals become instant, videos show poster).

### 3.7 Section rhythm

Pages alternate **ink (with gradient) ↔ paper** bands, like Primefold. Large radius (28px) on panels; 20px on cards; 999px on pills. Max content width 1240px; side gutter 20px mobile / 40px desktop.

---

## 4. Shared components

New folder `components/ui/`. Each is small, single-purpose, server component unless noted.

| Component | Purpose | Notes |
| --- | --- | --- |
| `GradientField.tsx` | Background gradient + grain layer | `variant` prop |
| `GlassPanel.tsx` | Glass surface wrapper | `as`, `className` passthrough |
| `Chip.tsx` | Glass pill label/tab | optional `active`, `icon` |
| `Button.tsx` | Primary/secondary pill link or button | `variant`, `tone="dark"|"light"`, `href` or `onClick` |
| `Section.tsx` | Band wrapper: tone (ink/paper), padding, container, optional eyebrow | |
| `Reveal.tsx` | Motion wrapper | client |
| `VideoFrame.tsx` | Muted looping video in a glass frame with poster, in-view play/pause | client |

Existing components rebuilt: `Navbar`, `Footer`, `NewsletterForm`, `InsightsFeed`, `WorkShowcase`. `Logo` is left as-is (nav uses a text wordmark). `RemoteSafeImage`, `StructuredData`, `AnalyticsScripts` unchanged.

---

## 5. Case studies (real work)

### 5.1 Data — `lib/work.ts` (new, single source of truth)

```ts
type CaseStudy = {
  slug: string;            // 'meal-direct'
  name: string;            // 'Meal Direct'
  url: string;             // 'https://www.mealdirectly.com'
  category: 'Product' | 'Store' | 'Brand' | 'Community';
  oneLiner: string;        // what the client is
  whatWeDid: string;       // what Sulva built — see open question Q1
  tags: string[];          // e.g. ['Web app', 'Ordering flow', '3D hero']
  featured?: boolean;
  media: { video: string; poster: string };  // /work/<slug>/teaser.mp4, poster.jpg
};
```

Used by home (featured + hero tabs + grid) and `/work`.

### 5.2 The six

"What we did" is taken from the actual repos (`C:\sulvatech\*`, `C:\server\*`).

| Project | Category | What it is | What Sulva built |
| --- | --- | --- | --- |
| **Meal Direct** (featured) | Product | Nigeria's first scheduled campus meal delivery — students pre-order from campus vendors, food arrives at a fixed time. | The whole platform: landing site, student ordering app (PWA, Paystack payments), vendor portal (orders, menus, batches, payouts), rider app (live jobs, push notifications), admin control centre (dispatch, settlements, escalations) and the API + database behind all of it. |
| Itzlolabeauty | Store | Makeup artist and beauty shop | Shop, service booking with availability, checkout, and an admin for bookings, products, orders, customers, gallery and reports. |
| theDMAshop | Store | Online store | Storefront, Stripe checkout, customer accounts, and an admin for products, orders, customers, content and analytics. |
| Mindfire Homes | Brand | Real estate | Property listings and detail pages, blog, enquiry capture, and an admin for properties, leads, blog and newsletter. |
| Olorunleke Ojuolape | Brand | Personal brand | Portfolio, leadership and vision pages, and insights. |
| The Inner Circle | Community | Community organisation | Community and department pages, leadership, join flow, FAQ, and an admin with media uploads. |

Copy only states what's visible on each client's public site or is a plain description of what was built — no internal details from private repos (pilot campus, infrastructure hosts, internal URLs). Only these six are shown (other repos — Born of God Ministries, VUI Founder's Week, Sulva's own products — are deliberately excluded). **No stats** for any client (Meal Direct's live "23% on-time success" looks like a placeholder — excluded until real numbers exist). Tech names (Stripe, NestJS…) stay out of headline copy; they may appear as small tags.

### 5.3 Media pipeline

- Add `mealdirect` to `videos/projects.mjs` (teaser + walkthrough: spin the 3D hero, scroll the 4-step flow, the comparison table) and to `videos/stills.mjs` (hero, how-it-works, app section).
- New script `videos/web.mjs`: takes each project's landscape teaser from `out/`, trims to an ~8s seamless loop, encodes H.264 1280×720, CRF 28, no audio, `+faststart` using the already-installed `ffmpeg-static`. Target ≤ 2.5 MB each. Also writes a 1600px JPEG poster from the hero still.
- Output committed to `public/work/<slug>/teaser.mp4` and `poster.jpg` (6 × ~3 MB ≈ 18 MB in repo — acceptable; revisit with Vercel Blob if it grows).
- `VideoFrame` uses `preload="none"`, poster first, `muted playsInline loop`, plays only in view. On `Save-Data` / reduced motion: poster only.

---

## 6. Page-by-page

Copy below is draft — final wording tuned during build, but the voice and claims are fixed.

### 6.1 Navbar (all pages)

- Floating pill, centred, 12px from top. Transparent over dark hero → glass after scroll. On paper pages starts as glass.
- Left: Sulva wordmark. Centre: **Work · Services · About · Insights**. Right: **Start a project** (primary pill).
- Home link dropped from menu (logo does it). Contact reached via CTA.
- Mobile: wordmark + menu button → full-height glass sheet, large links, CTA at bottom. Focus-trapped, Esc closes.

### 6.2 Home `/`

1. **Hero (ink + gradient + video)** — full viewport.
   - Background: Meal Direct teaser video, darkened 55%, under the gradient field.
   - Eyebrow: `Sulva — Lagos, Nigeria`
   - H1: **Websites that grow your brand.**
   - Sub: *We design and build websites — and the systems behind them — for founders and growing businesses. Every site comes with its own dashboard, so you run it, not us.*
   - Buttons: **Start a project** · **See our work** (glass)
   - Bottom row of glass **project chips** (Meal Direct · Mindfire Homes · theDMAshop · Itzlolabeauty · Olorunleke · The Inner Circle). Selecting one crossfades the background video and shows a small glass caption card: name + one-liner + "View site ↗". Auto-advances every 6s until the user interacts. (Direct nod to Primefold's bottom tab row.)
2. **Featured: Meal Direct (paper)**
   - Eyebrow `01 — Featured work`
   - H2: **Campus food, on schedule.**
   - 2 short paragraphs: the problem (queues between lectures, unreliable vendors, missed meals) and what we built — five connected apps: students order, vendors cook in batches, riders deliver on schedule, the Meal Direct team runs it all from one control centre.
   - Small row of 5 glass chips: **Student app · Vendor portal · Rider app · Control centre · API**.
   - Right: large `VideoFrame` of the project loop (one 8s loop per project is used everywhere). Tags as chips. Link: "Visit mealdirectly.com ↗".
3. **What we do (ink + gradient panel)** — Primefold "How a question becomes a next move" layout: left column of 3 glass rows, right a glass device frame showing the matching project.
   - **Brand websites** — Sites that make a business look as good as it is, and turn visitors into enquiries.
   - **Online stores** — Shops that are easy to browse, quick to check out, and simple for you to manage.
   - **Products & apps** — When a website isn't enough: customer apps, partner portals and the control centre to run it all — like Meal Direct.
4. **More work (paper)** — grid of the other 5 case studies, 2-up desktop / 1-up mobile. Card = poster/video, name, category, one-liner, "Visit ↗". Link "All work →".
5. **How we work (paper, inline)** — 4 numbered steps in mono: **Call** → **Plan & quote** → **Design & build** → **Launch & look after**. One plain sentence each. No timelines promised (see Q5).
6. **Insights (paper)** — latest 3 posts via existing `fetchPublishedInsights`; hidden if none.
7. **CTA band (ink + gradient)** — H2 **Your brand deserves a better website.** Button **Start a project**. Small line: `hello@sulvatech.com`.

### 6.3 Work `/work`

- Hero (ink + gradient): H1 **Work we're proud of.** Sub: *Real businesses, live sites. Click through and try them.*
- Featured Meal Direct block (same as home §2, larger).
- Filter chips: **All · Product · Store · Brand · Community** (client, reuses `WorkShowcase` logic, restyled).
- Grid: all 6, video on hover (desktop) / poster (mobile). Each card links to the live site in a new tab.
- No per-project case-study pages in this phase (YAGNI — add later if needed).
- CTA band.

### 6.4 Services `/services`

- Hero: H1 **What we build.** Sub: *Three things, done properly.*
- Three large alternating rows (paper), each: name, who it's for, what you get (4–5 bullet deliverables), example project with poster linking to it.
  - **Brand websites** — for businesses and personal brands. Design, copy help, build, SEO basics, analytics, your own admin (blog, leads, listings), handover training. Examples: Mindfire Homes, Olorunleke, The Inner Circle.
  - **Online stores** — for brands selling online. Catalogue, checkout, payments, bookings where needed, order emails, admin for products/orders/customers. Examples: Itzlolabeauty, theDMAshop.
  - **Products & apps** — for founders with an operation to run. Customer app, partner/vendor portals, internal control centre, API and database. Example: Meal Direct.
- "Every site comes with a dashboard" strip: one glass panel explaining that clients update content, see enquiries/orders and manage their business themselves.
- "Not sure which?" glass panel on gradient → **Start a project**.
- No pricing.

### 6.5 About `/about`

- Hero (ink + gradient): H1 **Built in Lagos, by people who ship.** Sub: one sentence on what Sulva is.
- Story (paper): 2 short paragraphs — what Sulva does and who for; the habit of giving every client their own dashboard.
- **Founder card** (glass on a small gradient panel): **Iyiola Ogunjobi — Founder**, one line, link **See my portfolio ↗** → `https://iyiola.sulvatech.com`. No other team members, no stock faces.
- **How we work** — 3 plain principles replacing the 4 icon cards:
  - **Straight talk.** We tell you what it costs, how long it takes, and what we'd do differently.
  - **The builder is on the call.** The person you talk to is the person building it.
  - **Built to hand over.** You run your site from your own dashboard, without calling us for every change.
- CTA band.

### 6.6 Careers `/careers`

- Paper page, single glass panel on a small gradient header.
- H1 **Work with us.** *We're not hiring right now. If you design or build for the web and want to be on our radar, send your work to careers@sulvatech.com.*

### 6.7 Contact `/contact`

- Full ink + gradient page. Left: H1 **Tell us what you're building.** + 3-step "what happens next" (We reply within 1 working day → 30-min call → Written plan & quote) + email, phone **+234 701 743 9615** (tel: link), location Lagos.
- Right: form in a `GlassPanel`. **Fields, names, validation and `POST /api/contact` unchanged** — only markup/styling. Inputs: glass-tinted, copper focus ring, visible labels (no placeholder-only labels).
- Success state restyled in place (glass panel, check icon, "We'll be in touch within a working day").

### 6.8 Insights `/insights` and `/insights/[slug]`

- List: paper. Short ink hero (H1 **Insights** · *Notes on building websites that work.*). Feature the newest post large, rest in a 2-col grid (image, category, date, title, excerpt — the list query has no body text, so no read time). Newsletter signup in a glass panel on gradient at the end.
- Post: reading-first. Small gradient header with title/date; body on paper using `@tailwindcss/typography` with Geist, 68ch, copper links. Glass used only in header. Existing `RemoteSafeImage` + legacy image fixes preserved.

### 6.9 Legal pages (privacy, terms, cookies)

- Shared simple layout: paper, H1, prose (no "Last updated" line — no review date exists to state). No gradient, no glass. Text unchanged.

### 6.10 Footer (all pages)

- Ink + faint gradient. Top: newsletter (glass input + button). Middle: 3 link columns (Work / Company / Legal) + email + location. Bottom: very large "Sulva" wordmark cropped at the baseline (Primefold-style sign-off), © line.
- Contact: hello@sulvatech.com · +234 701 743 9615. Socials: Instagram `instagram.com/sulvatech`, TikTok `tiktok.com/@sulvatech` (glass icon buttons). Also added to `lib/site.ts` and Organization structured data (`sameAs`).

### 6.11 Not found

- New `app/not-found.tsx`: ink + gradient, H1 **This page wandered off.**, buttons Home / Work.

---

## 7. Copy rules (apply everywhere)

- Say what we do and who it's for. Short sentences.
- Banned: "senior-led", "growth system", "premium digital execution", "end-to-end", "cutting-edge", "solutions", "synergy", "world-class", "leverage".
- No numbers unless real and confirmed.
- Every claim points at a project where possible.
- Metadata titles/descriptions in `buildMetadata` calls and `lib/site.ts` (`tagline`, `description`, `keywords`, `services`) rewritten to match. `lib/site.ts` also gets `phone: '+234 701 743 9615'` and a `socials` object (Instagram, TikTok).

---

## 8. Technical notes

- **Unchanged:** `app/api/**`, `app/admin/**`, `components/admin/**`, `lib/supabase/**`, `lib/insights.ts`, `lib/rate-limit.ts`, `middleware.ts`, `supabase_schema.sql`, sitemap/robots/structured-data helpers.
- **Fonts:** swap Inter/Outfit → Geist/Geist Mono in `app/layout.tsx`; CSS vars `--font-sans`, `--font-mono`.
- **Admin safety:** admin uses `primary`/`text-main`/etc. Keep those token names as neutral aliases so admin compiles and stays readable.
- **Images/video:** local files in `public/work/`; posters via `next/image`; videos plain `<video>`.
- **Performance:** hero video ≤ 2.5 MB, `preload="metadata"` for hero only; others `none`. Limit simultaneous playing videos to 2. Fonts `display: swap`.
- **Accessibility:** text on glass must hit 4.5:1 (glass sits on ink-darkened layers to guarantee it); chip tabs are a proper `role="tablist"`; videos are decorative (`aria-hidden`) with project info in text; all motion respects reduced-motion; visible focus everywhere.
- **SEO:** headings hierarchy one H1/page; metadata updated; OG image regenerated later (out of scope unless quick).

---

## 9. Rollout order

1. Tokens, fonts, glass/gradient utilities, `components/ui/*`.
2. Navbar + Footer + layout + not-found.
3. Media: add Meal Direct to recorder, build `videos/web.mjs`, generate & commit `public/work/*`, write `lib/work.ts`.
4. Home.
5. Work.
6. Services.
7. About + Careers.
8. Contact (verify form submit).
9. Insights list + post.
10. Legal pages.
11. Copy pass on `lib/site.ts` + all metadata.
12. QA: `npm run lint`, `npm run build`, browser pass at 375 / 768 / 1440, reduced-motion pass, Lighthouse on home/work/contact, contact + newsletter submit against local env, admin smoke test (login page renders, dashboards readable).

Each step leaves the site building and deployable.

---

## 10. Out of scope

Admin redesign · API/DB changes · per-project case-study pages · CMS for work items · dark/light theme toggle · new OG image (unless trivial) · WebGL/3D effects.

---

## 11. Resolved questions

| # | Question | Answer |
| --- | --- | --- |
| Q1 | What did Sulva build per client? | Researched from repos — see §5.2 |
| Q2 | About content | Founder only (Iyiola Ogunjobi), link to https://iyiola.sulvatech.com |
| Q3 | Phone & socials | +234 701 743 9615; Instagram + TikTok `@sulvatech` |
| Q4 | Show prices? | No |
| Q5 | "Reply within 1 working day"? | Yes. No project timelines promised |
| Q6 | Hiring? | No |
| Q7 | Meal Direct stats? | Not yet — no numbers shown |
| — | Extra projects (BOG, Founder's Week, Sulva products)? | No — six clients only |

No open questions remain.
