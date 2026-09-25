// Camera-style helpers the project scripts use: smooth scrolls, a visible
// cursor that glides to targets, holds, and page changes that work on both
// desktop (click the nav) and phone (nav is behind a menu, so go direct).

const CURSOR_SCRIPT = () => {
  const mount = () => {
    if (document.getElementById('__rec_cursor')) return;
    const c = document.createElement('div');
    c.id = '__rec_cursor';
    c.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2l16 9.5-7 1.5-3.5 6.5z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
    Object.assign(c.style, { position: 'fixed', left: '0', top: '0', zIndex: '2147483647', pointerEvents: 'none', transform: 'translate(-100px,-100px)', transition: 'transform 16ms linear', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.35))' });
    document.documentElement.appendChild(c);
    const ring = document.createElement('div');
    ring.id = '__rec_ring';
    Object.assign(ring.style, { position: 'fixed', width: '44px', height: '44px', margin: '-22px 0 0 -22px', borderRadius: '50%', border: '3px solid rgba(105,13,171,.85)', zIndex: '2147483646', pointerEvents: 'none', opacity: '0' });
    document.documentElement.appendChild(ring);
    addEventListener('mousemove', (e) => { c.style.transform = `translate(${e.clientX - 3}px,${e.clientY - 2}px)`; }, true);
    addEventListener('mousedown', (e) => {
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
      ring.animate([{ opacity: 1, transform: 'scale(.4)' }, { opacity: 0, transform: 'scale(1.4)' }], { duration: 500, easing: 'ease-out' });
    }, true);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
};

// Hides scrollbars so frames look clean.
const CLEAN_CSS = `::-webkit-scrollbar{display:none!important} html{scrollbar-width:none!important}`;

export async function prepareContext(context) {
  await context.addInitScript(CURSOR_SCRIPT);
  await context.addInitScript((css) => {
    const add = () => { const s = document.createElement('style'); s.textContent = css; document.documentElement.appendChild(s); };
    if (document.documentElement) add(); else document.addEventListener('DOMContentLoaded', add);
  }, CLEAN_CSS);
}

export function director(page, format) {
  const mobile = format === 'vertical';
  const vp = page.viewportSize();
  let mouse = { x: vp.width * 0.6, y: vp.height * 0.55 };

  const d = {
    mobile,
    page,

    // Set by record.mjs once recording starts; lets waits happen off camera.
    rec: null,

    hold: (ms) => page.waitForTimeout(ms),

    // Run fn with the recording paused, so slow loads become a clean cut.
    async offCamera(fn) {
      d.rec?.pause();
      try { return await fn(); } finally { d.rec?.resume(); }
    },

    // Wait (off camera) for something to show up, e.g. data loaded by the site.
    async waitFor(target, timeout = 30_000) {
      const loc = typeof target === 'string' ? page.locator(target).first() : target;
      await d.offCamera(() => loc.waitFor({ timeout }).then(() => page.waitForTimeout(400)).catch(() => {}));
    },

    // Let the page settle, then run through it once so lazy images and
    // scroll-in animations are loaded before the camera sees them.
    async settle() {
      await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
      await page.evaluate(() => document.fonts?.ready).catch(() => {});
      await page.evaluate(async () => {
        const y0 = scrollY;
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        scrollTo(0, y0);
      }).catch(() => {});
      await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {});
      await page.evaluate(() => Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 5000); })))).catch(() => {});
      await page.waitForTimeout(700);
    },

    async load(url) {
      // Already here (record.mjs pre-loads the start page): don't reload on camera.
      const norm = (u) => u.replace(/\/$/, '');
      if (norm(page.url()) === norm(url)) {
        if (!mobile) await page.mouse.move(mouse.x, mouse.y);
        return;
      }
      await d.offCamera(async () => {
        for (let attempt = 1; ; attempt++) {
          try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
            break;
          } catch (err) {
            if (attempt >= 3) throw err;
            await page.waitForTimeout(3000);
          }
        }
        await d.settle();
      });
      if (!mobile) await page.mouse.move(mouse.x, mouse.y);
    },

    // Eased scroll by `px` over `ms`.
    async scroll(px, ms = 1800) {
      await page.evaluate(([px, ms]) => new Promise((done) => {
        const start = scrollY, t0 = performance.now();
        const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        const step = (now) => {
          const t = Math.min(1, (now - t0) / ms);
          scrollTo({ top: start + px * ease(t), behavior: 'instant' }); // 'instant' overrides CSS scroll-behavior: smooth
          t < 1 ? requestAnimationFrame(step) : done();
        };
        requestAnimationFrame(step);
      }), [px, ms]);
    },

    // Scroll by a number of screen heights.
    async screens(n, ms) {
      await d.scroll(Math.round(vp.height * n), ms ?? Math.round(1500 * Math.min(Math.abs(n), 2)));
    },

    // Bring a locator near the top third of the screen.
    async scrollTo(target, ms = 1800) {
      const loc = typeof target === 'string' ? page.locator(target).first() : target;
      const delta = await loc.evaluate((el) => el.getBoundingClientRect().top - innerHeight * 0.18, null, { timeout: 3000 }).catch(() => null);
      if (delta != null) await d.scroll(delta, ms);
    },

    // Slow scroll through the rest of the page (for the long "tour" beats).
    async cruise(maxScreens = 6, perScreenMs = 1400) {
      const remaining = await page.evaluate(() => document.documentElement.scrollHeight - scrollY - innerHeight);
      const px = Math.min(remaining, vp.height * maxScreens);
      if (px > 0) await d.scroll(px, Math.round((px / vp.height) * perScreenMs));
    },

    async top(ms = 1200) {
      const y = await page.evaluate(() => scrollY);
      if (y > 0) await d.scroll(-y, ms);
    },

    // Glide cursor to a locator (desktop only) and optionally click it.
    async point(target, { click = false, ms = 700 } = {}) {
      const loc = typeof target === 'string' ? page.locator(target).first() : target;
      if (mobile) {
        if (click) await loc.click({ timeout: 5000 }).catch(() => {});
        return;
      }
      const box = await loc.boundingBox({ timeout: 3000 }).catch(() => null);
      if (!box) return;
      const to = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      const steps = Math.max(12, Math.round(ms / 16));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps, e = 1 - Math.pow(1 - t, 3);
        await page.mouse.move(mouse.x + (to.x - mouse.x) * e, mouse.y + (to.y - mouse.y) * e);
      }
      mouse = to;
      await page.waitForTimeout(250);
      if (click) {
        await page.mouse.down();
        await page.waitForTimeout(90);
        await page.mouse.up();
      }
    },

    // Click something that opens a new page (e.g. a listing card) and cut past the load.
    async open(target) {
      const loc = typeof target === 'string' ? page.locator(target).first() : target;
      await d.point(loc, { click: true });
      await page.waitForTimeout(250);
      await d.offCamera(async () => {
        await page.waitForLoadState('domcontentloaded').catch(() => {});
        await d.settle();
      });
    },

    // Change page: click the visible nav link on desktop, go direct on phone.
    async nav(linkText, url) {
      const link = page.locator('header, nav').getByRole('link', { name: linkText, exact: false }).first();
      if (!mobile && (await link.isVisible().catch(() => false))) {
        const before = new URL(page.url()).pathname;
        await d.point(link, { click: true });
        await page.waitForTimeout(250);
        await d.offCamera(async () => {
          await page.waitForLoadState('domcontentloaded').catch(() => {});
          if (new URL(page.url()).pathname !== before) await d.settle();
          else await page.waitForTimeout(900); // in-page anchor: let it scroll
        });
        if (url && !page.url().includes(new URL(url).pathname)) await d.load(url);
      } else {
        await d.load(url);
      }
    },
  };
  return d;
}
