// Runs axe (WCAG 2 A/AA, 2.1 AA, best practice) on every story of the static build.
//
// Setup, once, outside the repo so it adds no dependencies:
//   mkdir -p /tmp/axe && cd /tmp/axe && npm i puppeteer-core@23 axe-core@4
// Then, from the repo:
//   npm run build
//   npx http-server storybook-static -p 6007 -s &   (or: python3 -m http.server 6007 --directory storybook-static)
//   NODE_PATH=/tmp/axe/node_modules CHROME=/path/to/chrome node scripts/a11y-check.mjs
//
// Prints the stories with violations and the number of stories checked.
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(process.env.NODE_PATH ? process.env.NODE_PATH + '/' : import.meta.url);
const puppeteer = require('puppeteer-core');
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.env.STORYBOOK_URL ?? 'http://localhost:6007';
const index = JSON.parse(fs.readFileSync('storybook-static/index.json', 'utf8'));
const ids = Object.values(index.entries).filter((e) => e.type === 'story').map((e) => e.id);

const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
const out = {};
for (const id of ids) {
  await page.goto(`${base}/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));
  await page.evaluate(axeSrc);
  const violations = await page.evaluate(async () => {
    const r = await window.axe.run(document.querySelector('#storybook-root'), { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, first: v.nodes[0].target.join(' '), why: v.nodes[0].failureSummary.slice(0, 160) }));
  });
  if (violations.length) out[id] = violations;
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
console.log('stories checked:', ids.length);
