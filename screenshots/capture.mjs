// Homepage screenshots at 1440 and 390 → screenshots/home/.
// Needs the dev server running (npm run dev). Playwright is not a project
// dependency, so run it through npx:
//   npx -p playwright@1.64.1 node screenshots/capture.mjs [url]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

// shortcut: resolves playwright from npx's PATH entry (ESM ignores NODE_PATH); add it as a devDependency to drop this.
function loadPlaywright() {
  for (const dir of (process.env.PATH ?? '').split(path.delimiter)) {
    if (!dir.endsWith(path.join('node_modules', '.bin'))) continue;
    try {
      return createRequire(path.join(dir, '..', 'x.js'))('playwright');
    } catch {}
  }
  throw new Error('playwright not found. Run: npx -p playwright@1.64.1 node screenshots/capture.mjs');
}

const { chromium } = loadPlaywright();
const url = process.argv[2] ?? 'http://localhost:4321/';
const out = path.join(path.dirname(new URL(import.meta.url).pathname), 'home');
mkdirSync(out, { recursive: true });

// Installed Google Chrome, so no Playwright browser download is needed.
const browser = await chromium.launch({ channel: 'chrome' });
let failed = false;

for (const [w, h] of [[1440, 900], [390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove());

  // Scroll through so lazy images load, then wait for every image to decode;
  // otherwise full-page captures show blank frames below the fold.
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += h / 2) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(300);

  await page.screenshot({ path: `${out}/home-${w}.png`, fullPage: true });
  await page.screenshot({ path: `${out}/home-${w}-fold.png` });

  // One shot per section, for close inspection. Hide the sticky header and the
  // fixed mobile bar, or they get captured sitting on top of each section.
  await page.addStyleTag({ content: 'header, [data-visit-bar] { visibility: hidden !important; }' });
  const sections = await page.$$('main > section, footer');
  for (const [i, el] of sections.entries()) {
    const id = await el.evaluate((e) => e.id || e.getAttribute('aria-labelledby')?.replace(/-title$/, '') || e.tagName.toLowerCase());
    if (id === 'hero') continue; // the fold shot covers it; the 300vh box is mostly empty
    await el.screenshot({ path: `${out}/home-${w}-${i}-${id}.png` });
  }

  const checks = await page.evaluate(() => ({
    brokenImages: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src),
    horizontalScroll: document.documentElement.scrollWidth > innerWidth,
    todos: document.querySelectorAll('.todo').length,
  }));
  console.log(`${w}px`, { consoleErrors: errors, ...checks });
  if (errors.length || checks.brokenImages.length || checks.horizontalScroll) failed = true;
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
