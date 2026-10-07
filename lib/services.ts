import { getCaseStudy, type CaseStudy } from '@/lib/work';

export type Faq = { question: string; answer: string };

export type Service = {
  slug: 'brand-websites' | 'online-stores' | 'products-apps';
  name: string;
  summary: string;
  forWho: string;
  deliverables: string[];
  exampleSlugs: string[];
  // Search-facing copy for the service's own page.
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  headline: string;
  intro: string[];
  faqs: Faq[];
};

export const processSteps = [
  { title: 'Call', body: 'A 30-minute call about your business, what you need, and what it should cost.' },
  { title: 'Plan & quote', body: 'A written plan: pages, features, price. You approve it before we start.' },
  { title: 'Design & build', body: 'You see designs first, then a working site you can click through as we build.' },
  { title: 'Launch & look after', body: 'We launch, walk you through your dashboard, and stay on hand for changes.' },
];

const pricingFaq: Faq = {
  question: 'How much does it cost?',
  answer:
    'It depends on the pages and features you need. After a 30-minute call we send a written plan with the pages, features and price. You approve it before any work starts.',
};

const dashboardFaq: Faq = {
  question: 'Can I update it myself?',
  answer:
    'Yes. Every project comes with its own dashboard, built around the jobs your business does every week, so you can make changes without emailing us.',
};

const locationFaq: Faq = {
  question: 'Do you only work with businesses in Lagos?',
  answer:
    "No. We're based in Lagos and work with clients wherever they are. Recent projects include a real estate firm in Abuja and a makeup artist in Arizona.",
};

const afterLaunchFaq: Faq = {
  question: 'What happens after launch?',
  answer:
    'We walk you through your dashboard and stay on hand for changes. Day-to-day updates are yours; bigger changes, you call us.',
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
    seoTitle: 'Business & Personal Brand Websites in Lagos',
    seoDescription:
      'Website design and development in Lagos for businesses and personal brands. Design, build, copy help, SEO basics and your own dashboard to run it.',
    keywords: ['website design Lagos', 'website designer Nigeria', 'business website design', 'personal brand website'],
    headline: 'Website design for businesses and personal brands.',
    intro: [
      'Your website is often the first place people check before they call, book or buy. It should look as good as your business is, explain what you do in plain words, and make it easy to get in touch.',
      'We design and build brand websites in Lagos for companies, founders and personal brands, from property listings for Mindfire Homes to the personal site of its MD/CEO. Every site comes with a dashboard for your blog, leads and listings, so it keeps up with your business after launch.',
    ],
    faqs: [
      pricingFaq,
      {
        question: 'Will my website show up on Google?',
        answer:
          'SEO basics are included: page titles and descriptions written for search, a clean page structure and analytics so you can see who visits. Nobody can honestly promise a top ranking, but a well-built site you keep updated gives you the best start.',
      },
      {
        question: 'Do you help with the writing?',
        answer: "Yes. We help you shape your copy so it says what you do and who it's for in plain words.",
      },
      dashboardFaq,
      locationFaq,
      afterLaunchFaq,
    ],
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
    seoTitle: 'Ecommerce Website Development in Nigeria',
    seoDescription:
      'Ecommerce websites built in Lagos: product pages, checkout and payments, bookings and a dashboard for products, orders and customers. See our live stores.',
    keywords: ['ecommerce website Nigeria', 'online store development Lagos', 'ecommerce website designer', 'booking website'],
    headline: 'Online stores that are easy to buy from.',
    intro: [
      "A good online store gets out of the way: products are easy to find, checkout is quick, and you can see every order without digging through emails.",
      'We build ecommerce websites with product pages, checkout and payments, customer accounts and bookings where you need them. Itzlolabeauty sells makeup and books appointments with live availability; theDMAshop sells clothing and everyday essentials. Both run from their own dashboard.',
    ],
    faqs: [
      pricingFaq,
      {
        question: 'Can customers book appointments as well as buy products?',
        answer:
          'Yes. Itzlolabeauty takes service bookings with live availability alongside its shop, all managed from one dashboard.',
      },
      {
        question: 'How do I manage products and orders?',
        answer:
          'From your dashboard. Add and edit products, see new orders and keep track of customers without touching code.',
      },
      locationFaq,
      afterLaunchFaq,
    ],
  },
  {
    slug: 'products-apps',
    name: 'Products & apps',
    summary: "When a website isn't enough: customer apps, partner portals and the control centre to run it all — like Meal Direct.",
    forWho: 'For founders with an operation to run.',
    deliverables: ['Customer app', 'Partner and vendor portals', 'Internal control centre', 'API and database', 'Launch support'],
    exampleSlugs: ['mealdirect'],
    seoTitle: 'Web App & Platform Development in Lagos',
    seoDescription:
      'Custom web app development in Lagos: customer apps, partner and vendor portals, control centres and APIs, like the five-app Meal Direct platform we built.',
    keywords: ['web app development Lagos', 'custom software development Nigeria', 'startup MVP development', 'delivery app development'],
    headline: "Apps and platforms, when a website isn't enough.",
    intro: [
      'Some businesses need more than a website. They have customers, partners and staff who each need their own tools, and an operation that has to run on time.',
      'For Meal Direct we built the whole platform: a student app for ordering ahead, a vendor portal for batch cooking, a rider app for scheduled delivery, a control centre for the team, and the API and database that connect them. If you have an operation to run, we can build the apps behind it.',
    ],
    faqs: [
      pricingFaq,
      {
        question: 'Can you build the whole platform, not just one app?',
        answer:
          'Yes. Meal Direct runs on five connected apps we built together: student app, vendor portal, rider app, control centre and API.',
      },
      {
        question: 'How does my team run it day to day?',
        answer:
          "From a control centre built around your operation. Meal Direct's team runs vendors, riders and orders from one place.",
      },
      locationFaq,
    ],
  },
];

export function getServiceExamples(service: Service): CaseStudy[] {
  return service.exampleSlugs.map(getCaseStudy);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
