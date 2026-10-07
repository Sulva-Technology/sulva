// Stand-in poster for when a client site can't be captured: a branded title tile, not a screenshot.
// Usage: node placeholder.mjs <slug> "<Display name>"
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const [slug, display] = process.argv.slice(2);
if (!slug || !display) {
  console.error('Usage: node placeholder.mjs <slug> "<Display name>"');
  process.exit(1);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  html, body { margin: 0; width: 1600px; height: 900px; }
  body {
    display: flex; align-items: center; justify-content: center;
    background:
      radial-gradient(900px 700px at 0% 0%, rgb(31 107 95 / .55), transparent 70%),
      radial-gradient(900px 700px at 100% 100%, rgb(184 103 58 / .5), transparent 70%),
      #0B0D0C;
    color: #fff;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 120px; font-weight: 500; letter-spacing: -0.035em;
  }
</style></head><body>${esc(display)}</body></html>`;

const dest = path.resolve('..', 'public', 'work', slug);
mkdirSync(dest, { recursive: true });
const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.setContent(html);
await page.screenshot({ path: path.join(dest, 'poster.jpg'), type: 'jpeg', quality: 85 });
await browser.close();
console.log(`✓ ${slug} placeholder poster`);
