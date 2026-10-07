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
