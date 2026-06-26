import puppeteer from './node_modules/puppeteer/lib/puppeteer/puppeteer.js';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));
await page.evaluate(() => {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 600));

await page.screenshot({
  path: 'temporary screenshots/seo-section-check.png',
  clip: { x: 0, y: 5150, width: 1440, height: 1000 }
});

await browser.close();
console.log('Done');
