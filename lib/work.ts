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
    media: media('thedmashop', false),
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
