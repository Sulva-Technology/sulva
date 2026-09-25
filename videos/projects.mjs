// One entry per showcased project. Each has a ~30s teaser and a ~90s walkthrough.
// Scripts only browse and click through to non-committal steps; they never
// submit forms, book, or check out.

export const projects = {
  itzlolabeauty: {
    name: 'Itzlolabeauty',
    url: 'https://www.itzlolabeauty.com',
    async teaser(d) {
      await d.load(this.url);
      await d.hold(2500);
      await d.scrollTo(d.page.getByText('the makeup artist and creative').first(), 2400);
      await d.hold(3000);
      await d.screens(1.2, 2400);
      await d.hold(1000);
      await d.nav('Book', `${this.url}/book`);
      await d.waitFor(d.page.getByText('Soft Glam').first());
      await d.hold(1500);
      await d.scrollTo(d.page.getByText('Soft Glam').first(), 1600);
      await d.point(d.page.getByText('Soft Glam').first());
      await d.hold(1500);
      await d.point(d.page.getByText('Full Glam').first());
      await d.hold(2500);
      await d.top(1200);
      await d.point('header a[href="/book"]:visible');
      await d.hold(3000);
    },
    async walkthrough(d) {
      await d.load(this.url);
      await d.hold(3500);
      await d.cruise(8, 2600);
      await d.hold(2000);
      await d.top(1800);
      await d.nav('About', `${this.url}/#about`);
      await d.hold(3500);
      await d.screens(1, 2200);
      await d.hold(2500);
      await d.nav('Book', `${this.url}/book`);
      await d.waitFor(d.page.getByText('Soft Glam').first());
      await d.hold(2500);
      await d.scrollTo(d.page.getByText('Soft Glam').first(), 1800);
      await d.point(d.page.getByText('Soft Glam').first());
      await d.hold(2500);
      await d.point(d.page.getByText('Full Glam').first());
      await d.hold(2500);
      await d.cruise(3, 2600);
      await d.hold(2500);
      await d.scrollTo(d.page.getByText('Soft Glam').first(), 1800);
      await d.point(d.page.getByText('Soft Glam').first(), { click: true });
      await d.hold(4000); // time-picker step; nothing is booked
      await d.screens(0.8, 2000);
      await d.hold(3000);
      await d.nav('Contact', `${this.url}/contact`);
      await d.hold(3500);
      await d.cruise(2, 2600);
      await d.hold(4000);
    },
  },

  olorunleke: {
    name: 'Olorunleke Ojuolape',
    url: 'https://www.olorunleke.com',
    async teaser(d) {
      await d.load(this.url);
      await d.hold(3000);
      await d.screens(1.3, 2400);
      await d.hold(1200);
      await d.screens(1.5, 2600);
      await d.hold(1000);
      await d.nav('Portfolio', `${this.url}/portfolio`);
      await d.hold(2500);
      await d.scrollTo(d.page.getByText('The Ecosystem').first(), 2200);
      await d.hold(2000);
      await d.scrollTo(d.page.getByText('Venture Showcase').first(), 2200);
      await d.hold(3000);
      await d.screens(0.8, 1800);
      await d.hold(2500);
    },
    async walkthrough(d) {
      await d.load(this.url);
      await d.hold(4000);
      await d.cruise(6, 2400);
      await d.hold(2000);
      await d.nav('About', `${this.url}/about`);
      await d.hold(3500);
      await d.cruise(5, 2200);
      await d.hold(1500);
      await d.nav('Vision', `${this.url}/vision`);
      await d.hold(3500);
      await d.cruise(3, 2400);
      await d.hold(1500);
      await d.nav('Portfolio', `${this.url}/portfolio`);
      await d.hold(3000);
      await d.scrollTo(d.page.getByText('The Ecosystem').first(), 2200);
      await d.hold(2500);
      await d.scrollTo(d.page.getByText('Venture Showcase').first(), 2200);
      await d.hold(3000);
      await d.scrollTo(d.page.getByText('Impact Dashboard').first(), 2400);
      await d.hold(3000);
      await d.nav('Contact', `${this.url}/contact`);
      await d.hold(3500);
      await d.cruise(2, 2400);
      await d.hold(3500);
    },
  },

  thedmashop: {
    name: 'theDMAshop',
    url: 'https://www.thedmashop.com',
    // Storefront content is CMS-driven. Runs before recording starts; refuses to record the error screen.
    async ready(page) {
      // A "Setting the scene" loader shows while CMS content is fetched; wait it out first.
      await page.getByText('Setting the scene').first().waitFor({ state: 'hidden', timeout: 30_000 }).catch(() => {});
      await page.waitForTimeout(1000);
      const broken = await page.getByText('Storefront setup required').isVisible().catch(() => false);
      if (broken) throw new Error('thedmashop.com shows "Storefront setup required" (CMS/Supabase not reachable). Fix the site, then re-record.');
    },
    async teaser(d) {
      await d.load(this.url);
      await d.hold(2000);
      await d.screens(1.2, 2400);
      await d.hold(1500);
      await d.screens(1.5, 2600);
      await d.hold(1500);
      await d.cruise(4, 2400);
      await d.hold(2000);
      await d.top(1500);
      await d.hold(3000);
    },
    async walkthrough(d) {
      await d.load(this.url);
      await d.hold(3000);
      await d.cruise(10, 3000);
      await d.hold(2500);
      await d.top(2000);
      await d.nav('Shop', `${this.url}/shop`);
      await d.hold(4000);
      await d.cruise(6, 3000);
      await d.hold(4000);
    },
  },

  mindfirehomes: {
    name: 'Mindfire Homes',
    url: 'https://www.mindfirehomes.com',
    async teaser(d) {
      await d.load(this.url);
      await d.hold(3000);
      await d.scrollTo(d.page.getByText('Featured properties').first(), 2400);
      await d.hold(2500);
      await d.scrollTo(d.page.getByText('What we check before a property is listed').first(), 2400);
      await d.hold(2500);
      await d.nav('Properties', `${this.url}/properties`);
      await d.hold(2000);
      const card = d.page.locator('a[href^="/properties/prop-"]').first();
      await d.scrollTo(card, 1600);
      await d.open(card);
      await d.hold(2500);
      await d.screens(1.2, 2400);
      await d.hold(3000);
    },
    async walkthrough(d) {
      await d.load(this.url);
      await d.hold(4000);
      await d.scrollTo(d.page.getByText('Search properties').first(), 2200);
      await d.hold(2500);
      await d.scrollTo(d.page.getByText('Featured properties').first(), 2200);
      await d.hold(3000);
      await d.scrollTo(d.page.getByText('What we check before a property is listed').first(), 2400);
      await d.hold(3500);
      await d.scrollTo(d.page.getByText('Talk to someone who has visited').first(), 2400);
      await d.hold(3000);
      await d.nav('Properties', `${this.url}/properties`);
      await d.hold(3000);
      await d.cruise(2, 2400);
      await d.hold(1500);
      await d.top(1500);
      const card = d.page.locator('a[href="/properties/prop-5"]').first();
      await d.scrollTo(card, 1600);
      await d.open(card);
      await d.hold(3500);
      await d.scrollTo(d.page.getByText('About this property').first(), 2200);
      await d.hold(3000);
      await d.scrollTo(d.page.getByText('What the property includes').first(), 2200);
      await d.hold(3000);
      await d.scrollTo(d.page.getByText('Documentation and process').first(), 2200);
      await d.hold(3500);
      await d.nav('Journal', `${this.url}/blog`);
      await d.hold(3000);
      await d.cruise(2, 2400);
      await d.hold(3500);
    },
  },

  innercircle: {
    name: 'The Inner Circle',
    url: 'https://www.theinnercirclecommunity.org',
    // Single-page app: each nav button swaps in a whole page (/communities, /leadership, ...).
    // Leadership and Testimonials sit under the About dropdown. On phone, go straight to the URL.
    async go(d, label, path, { underAbout = false } = {}) {
      if (d.mobile) return d.load(this.url + path);
      const nav = d.page.locator('nav');
      if (underAbout) {
        await d.point(nav.getByRole('button', { name: /About/ }).first());
        await d.page.locator('nav').getByRole('button', { name: /About/ }).first().hover();
        await d.hold(500);
      }
      const btn = nav.getByRole('button', { name: label, exact: true }).first();
      if (!(await btn.isVisible().catch(() => false))) return d.load(this.url + path);
      await d.point(btn, { click: true });
      await d.page.waitForTimeout(250);
      await d.offCamera(() => d.settle());
    },
    async teaser(d) {
      await d.load(this.url);
      await d.hold(3000);
      await d.screens(1.2, 2400);
      await d.hold(1500);
      await this.go(d, 'Communities', '/communities');
      await d.hold(2000);
      await d.screens(1, 2200);
      await d.hold(1500);
      await this.go(d, 'Leadership', '/leadership', { underAbout: true });
      await d.hold(2000);
      await d.screens(0.8, 2000);
      await d.hold(2000);
      await this.go(d, 'Departments', '/departments');
      await d.hold(2000);
      await d.screens(0.8, 2000);
      await d.hold(2500);
    },
    async walkthrough(d) {
      await d.load(this.url);
      await d.hold(4000);
      await d.screens(1, 2200);
      await d.hold(2500);
      await d.screens(1.2, 2600);
      await d.hold(2000);
      await this.go(d, 'Communities', '/communities');
      await d.hold(3000);
      await d.screens(1.2, 2600);
      await d.hold(2000);
      await d.screens(1.2, 2600);
      await d.hold(2000);
      await this.go(d, 'Leadership', '/leadership', { underAbout: true });
      await d.hold(3000);
      await d.cruise(2, 2400);
      await d.hold(2500);
      await this.go(d, 'Testimonials', '/testimonials', { underAbout: true });
      await d.hold(3000);
      await d.screens(1, 2400);
      await d.hold(2500);
      await this.go(d, 'Departments', '/departments');
      await d.hold(3000);
      await d.screens(1.2, 2600);
      await d.hold(2000);
      await this.go(d, 'FAQ', '/faq');
      await d.hold(2500);
      await d.point(d.page.locator('main button').filter({ hasText: '?' }).first(), { click: true });
      await d.hold(3000);
      await this.go(d, 'Join', '/join');
      await d.hold(3000);
      await d.screens(1, 2400);
      await d.hold(3500);
    },
  },
};
