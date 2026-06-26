import puppeteer from './node_modules/puppeteer/lib/puppeteer/puppeteer.js';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));
await page.evaluate(() => {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 500));

const sections = [
  { name: 'm-hero',      y: 0,    h: 844 },
  { name: 'm-device',    y: 750,  h: 900 },
  { name: 'm-compare',   y: 1600, h: 900 },
  { name: 'm-daynight',  y: 2600, h: 900 },
  { name: 'm-analytics', y: 3600, h: 1200 },
  { name: 'm-seo',       y: 5000, h: 1400 },
  { name: 'm-cta',       y: 6500, h: 700  },
];

for (const s of sections) {
  await page.screenshot({
    path: `temporary screenshots/${s.name}.png`,
    clip: { x: 0, y: s.y, width: 390, height: s.h }
  });
  console.log(`Saved ${s.name}.png`);
}

await browser.close();
