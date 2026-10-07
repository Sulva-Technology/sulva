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
