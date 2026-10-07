// High-res screenshots of each project's key moments, for AI image-to-video
// tools (Higgsfield etc.) and thumbnails.
// Usage: node stills.mjs [project|all]
// Output: out/stills/<project>-<shot>-<landscape|vertical>.png
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { FORMATS } from './lib/recorder.mjs';
import { director, prepareContext } from './lib/director.mjs';

// Each shot: page path + optional text to bring near the top (null = page top).
const shots = {
  itzlolabeauty: {
    url: 'https://www.itzlolabeauty.com',
    list: [
      { name: 'hero', path: '/' },
      { name: 'about', path: '/', text: 'the makeup artist and creative' },
      { name: 'services', path: '/book', text: 'Choose Your Service', waitFor: 'Soft Glam' },
    ],
  },
  olorunleke: {
    url: 'https://www.olorunleke.com',
    list: [
      { name: 'hero', path: '/' },
      { name: 'ventures', path: '/portfolio', text: 'Venture Showcase' },
      { name: 'portfolio', path: '/portfolio' },
    ],
  },
  mindfirehomes: {
    url: 'https://www.mindfirehomes.com',
    list: [
      { name: 'hero', path: '/' },
      { name: 'featured', path: '/', text: 'Featured properties' },
      { name: 'listing', path: '/properties/prop-5' },
    ],
  },
  innercircle: {
    url: 'https://www.theinnercirclecommunity.org',
    list: [
      { name: 'hero', path: '/' },
      { name: 'leadership', path: '/', text: 'The Minds Behind the Circle' },
      { name: 'join', path: '/', text: 'Ready to stand out?' },
    ],
  },
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
};

const target = process.argv[2] ?? 'all';
const names = target === 'all' ? Object.keys(shots) : target.split(',');
const outDir = path.resolve('out', 'stills');
await mkdir(outDir, { recursive: true });

// Stills render sharper than the videos: 2x landscape (2560x1440), 3x vertical (1170x2079).
const SCALE = { landscape: 2, vertical: 3 };

const browser = await chromium.launch({ channel: 'chromium' });
for (const name of names) {
  const project = shots[name];
  if (!project) { console.error(`Unknown project "${name}"`); continue; }
  for (const format of Object.keys(FORMATS)) {
    const spec = FORMATS[format];
    const context = await browser.newContext({ viewport: spec.viewport, deviceScaleFactor: SCALE[format], isMobile: spec.isMobile, locale: 'en-US' });
    await prepareContext(context);
    await context.addInitScript(() => {
      addEventListener('DOMContentLoaded', () => {
        const s = document.createElement('style');
        s.textContent = '#__rec_cursor,#__rec_ring{display:none!important}';
        document.documentElement.appendChild(s);
      });
    });
    const page = await context.newPage();
    const d = director(page, format);
    for (const shot of project.list) {
      const file = path.join(outDir, `${name}-${shot.name}-${format}.png`);
      try {
        await d.load(project.url + shot.path);
        if (shot.waitFor) await page.getByText(shot.waitFor).first().waitFor({ timeout: 30_000 }).catch(() => {});
        await page.evaluate(() => scrollTo(0, 0));
        if (shot.text) {
          await page.getByText(shot.text).first().evaluate((el) => scrollTo(0, scrollY + el.getBoundingClientRect().top - innerHeight * 0.12)).catch(() => {});
        }
        await page.waitForTimeout(1800); // let scroll-in animations finish
        await page.screenshot({ path: file });
        console.log(`✓ ${path.relative(process.cwd(), file)}`);
      } catch (err) {
        console.log(`✗ ${name}-${shot.name}-${format}: ${err.message.split('\n')[0]}`);
      }
    }
    await context.close();
  }
}
await browser.close();
