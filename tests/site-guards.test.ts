import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function listFiles(dir: string): string[] {
  return (readdirSync(path.join(root, dir), { recursive: true }) as string[]).map((file) =>
    path.join(dir, file).split(path.sep).join('/'),
  );
}

const PUBLIC_FILES = [
  ...listFiles('app').filter((file) => !file.startsWith('app/admin/') && !file.startsWith('app/api/')),
  ...listFiles('components').filter((file) => !file.startsWith('components/admin/')),
  'lib/site.ts',
  'lib/work.ts',
  'lib/services.ts',
].filter((file) => /\.tsx?$/.test(file) && !/\.test\.tsx?$/.test(file));

const BANNED = [
  'senior-led',
  'growth system',
  'premium digital execution',
  'end-to-end',
  'cutting-edge',
  'solutions',
  'synergy',
  'world-class',
  'leverage',
];

const LEGACY_TOKEN =
  /\b(?:bg|text|border|ring|from|via|to|shadow|outline|decoration|fill|stroke|placeholder)-(?:primary(?:-dark|-light)?|surface-(?:dark|light)|background-(?:dark|light)|text-main|text-muted)\b|\bfont-heading\b|\bpurple-\d/;

describe('site guards', () => {
  it('finds the public files', () => {
    expect(PUBLIC_FILES).toContain('app/page.tsx');
    expect(PUBLIC_FILES).not.toContain('app/admin/page.tsx');
  });

  it.each(PUBLIC_FILES)('%s uses no banned copy', (file) => {
    const text = readFileSync(path.join(root, file), 'utf8').toLowerCase();
    for (const phrase of BANNED) expect(text, `"${phrase}" in ${file}`).not.toContain(phrase);
  });

  it.each(PUBLIC_FILES)('%s uses no legacy purple-era tokens', (file) => {
    const text = readFileSync(path.join(root, file), 'utf8');
    expect(text.match(LEGACY_TOKEN)?.[0] ?? null, file).toBeNull();
  });
});
