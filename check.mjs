import puppeteer from './node_modules/puppeteer/lib/puppeteer/puppeteer.js';
import fs from 'fs';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox'], headless: true
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 800));

// Scroll to trigger all animations
const h = await page.evaluate(() => document.body.scrollHeight);
console.log('Page height:', h);
for (let y = 0; y <= h; y += 600) {
  await page.evaluate(pos => window.scrollTo(0, pos), y);
  await new Promise(r => setTimeout(r, 100));
}

const info = await page.evaluate(() => {
  return ['#how','#testimonials','#join','footer'].map(sel => {
    const el = document.querySelector(sel);
    if (!el) return sel + ': NOT FOUND';
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const visible = el.classList.contains('visible') || window.getComputedStyle(el).opacity !== '0';
    const fadeUps = el.querySelectorAll('.fade-up');
    const visibleFadeUps = el.querySelectorAll('.fade-up.visible');
    return `${sel}: top=${Math.round(top)} fadeUps=${fadeUps.length} visible=${visibleFadeUps.length}`;
  });
});
info.forEach(s => console.log(s));
await browser.close();
