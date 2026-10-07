#!/usr/bin/env node
// Renders the Thrive Together Circle session graphics (all five sizes) to PNG.
//
// Usage:  node render-graphics.mjs config.json out-dir/
//
// config.json example:
// {
//   "slug": "sandra-akashic",
//   "eyebrow": "Guest Expert Session",
//   "title": "Come Home to *Calm*",            // one *word* = the italic gold accent
//   "subtitle": "A guided Akashic Records healing for your nervous system & energy",
//   "guestLabel": "With",
//   "guestName": "Sandra",
//   "guestRole": "Akashic Records Consultant & Teacher",
//   "date": "Thursday 23 October",
//   "time": "7pm UK · Live on Skool",
//   "cta": "Join us in the Circle",
//   "tagline": "Clarity, Connection and Support.",
//   "photo": "path/to/headshot.jpg",           // optional; the Circle mark is used if empty
//   "overrides": { "story": { "subtitle": "" } } // optional per-size tweaks
// }
//
// Needs Playwright (npm i playwright). If `import 'playwright'` fails, set
// NODE_PATH to a global node_modules that has it.

import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = await import('playwright')); }

const SIZES = [
  { key: 'eventbrite-header', width: 1460, height: 752,  format: 'landscape' },
  { key: 'facebook-post',     width: 1080, height: 1350, format: 'portrait' },
  { key: 'skool-post',        width: 777,  height: 777,  format: 'square' },
  { key: 'linkedin-post',     width: 1200, height: 1200, format: 'square' },
  { key: 'instagram-story',   width: 1080, height: 1920, format: 'story' },
];

const [cfgPath, outDir = 'graphics'] = process.argv.slice(2);
if (!cfgPath) { console.error('Usage: node render-graphics.mjs config.json out-dir/'); process.exit(1); }

const here = dirname(fileURLToPath(import.meta.url));
const template = pathToFileURL(resolve(here, '../assets/graphic-template.html')).href;
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
if (cfg.photo && !/^(https?:|data:|file:)/.test(cfg.photo)) {
  const p = resolve(dirname(resolve(cfgPath)), cfg.photo);
  if (!existsSync(p)) { console.error(`Photo not found: ${p}`); process.exit(1); }
  cfg.photo = pathToFileURL(p).href;
}
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const slug = cfg.slug ? cfg.slug + '-' : '';
for (const s of SIZES) {
  const conf = { ...cfg, ...(cfg.overrides?.[s.format] || {}), ...(cfg.overrides?.[s.key] || {}), ...s };
  delete conf.overrides;
  const page = await browser.newPage({ viewport: { width: s.width, height: s.height } });
  await page.addInitScript(c => { window.CONFIG = c; }, conf);
  await page.goto(template, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // warn if any text box overflows the canvas
  const overflow = await page.evaluate(() => {
    const cv = document.getElementById('canvas').getBoundingClientRect();
    return [...document.querySelectorAll('[data-f]:not(.hide)')]
      .filter(el => { const r = el.getBoundingClientRect(); return r.bottom > cv.bottom + 1 || r.right > cv.right + 1 || r.top < cv.top - 1; })
      .map(el => el.dataset.f);
  });
  const file = join(outDir, `${slug}${s.key}-${s.width}x${s.height}.png`);
  await page.locator('#canvas').screenshot({ path: file });
  console.log(`✓ ${file}${overflow.length ? `  ⚠ overflow: ${overflow.join(', ')}` : ''}`);
  await page.close();
}
await browser.close();
