// Usage:
//   node record.mjs <project|all> [--kind teaser|walkthrough] [--format landscape|vertical] [--headed]
// Output: out/<project>-<kind>-<format>.mp4
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { FORMATS, startRecording } from './lib/recorder.mjs';
import { director, prepareContext } from './lib/director.mjs';
import { projects } from './projects.mjs';

const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const target = args.find((a) => !a.startsWith('--') && !args[args.indexOf(a) - 1]?.startsWith('--')) ?? 'all';
const kinds = flag('kind') ? [flag('kind')] : ['teaser', 'walkthrough'];
const formats = flag('format') ? [flag('format')] : Object.keys(FORMATS);
const names = target === 'all' ? Object.keys(projects) : target.split(',');

for (const n of names) if (!projects[n]) { console.error(`Unknown project "${n}". Options: ${Object.keys(projects).join(', ')}`); process.exit(1); }

const outDir = path.resolve('out');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chromium', headless: !args.includes('--headed') });
const failures = [];

for (const name of names) {
  const project = projects[name];
  for (const kind of kinds) {
    for (const format of formats) {
      const spec = FORMATS[format];
      const file = path.join(outDir, `${name}-${kind}-${format}.mp4`);
      const context = await browser.newContext({
        viewport: spec.viewport,
        deviceScaleFactor: spec.deviceScaleFactor,
        isMobile: spec.isMobile,
        hasTouch: false,
        reducedMotion: 'no-preference',
        locale: 'en-US',
      });
      await prepareContext(context);
      const page = await context.newPage();
      const d = director(page, format);
      process.stdout.write(`● ${name} ${kind} ${format} … `);

      // Load once before recording so the video doesn't open on a blank page.
      let stop;
      try {
        await d.load(project.url);
        await project.ready?.(page);
        const rec = await startRecording(page, file, spec.out);
        stop = rec.stop;
        d.rec = rec;
        await project[kind](d);
        const secs = await stop();
        console.log(`${secs.toFixed(1)}s -> ${path.relative(process.cwd(), file)}`);
      } catch (err) {
        await stop?.().catch(() => {});
        await rm(file, { force: true });
        console.log('FAILED');
        failures.push(`${name} ${kind} ${format}: ${err.message}`);
      }
      await context.close();
    }
  }
}

await browser.close();
if (failures.length) {
  console.error('\nFailures:\n  ' + failures.join('\n  '));
  process.exit(1);
}
