import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const browser = await chromium.launch({ args: ['--autoplay-policy=user-gesture-required'] });
const url = pathToFileURL(path.resolve('artifacts/Invitacion-Johan-y-Marylia-Sobre.html')).href;
const errors = [];
try {
  const context = await browser.newContext({ offline: true, reducedMotion: 'reduce' });
  for (const width of [360, 390, 430, 768, 1024, 1440]) {
    const page = await context.newPage({ viewport: { width, height: 900 } });
    await page.setViewportSize({ width, height: 900 });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('.envelope-welcome').isVisible(), true);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'envelope-heading');
    assert.equal(await page.locator('#envelope-heading').evaluate(el => getComputedStyle(el).outlineStyle), 'none');
    assert.equal(await page.locator('#invitation-content').isVisible(), false);
    assert.equal(await page.locator('audio').evaluate(el => el.paused), true);
    assert.equal(await page.locator('audio').getAttribute('autoplay'), null);
    assert.equal(await page.locator('.envelope-welcome').evaluate(el => el.scrollWidth > el.clientWidth), false);
    if ([390, 1440].includes(width)) await page.screenshot({ path: `artifacts/sobre-cerrado-${width}.png` });
    await page.getByRole('button', { name: 'Abrir sin música', exact: true }).click();
    assert.equal(await page.locator('.envelope-welcome').isVisible(), false);
    assert.equal(await page.locator('#invitation-content').isVisible(), true);
    assert.equal(await page.locator('audio').evaluate(el => el.paused), true);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'couple-names');
    assert.equal(await page.locator('#couple-names').evaluate(el => getComputedStyle(el).outlineStyle), 'none');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Desbordamiento a ${width}`);
    for (const img of await page.locator('picture img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => el.decode());
    }
    if ([390, 1440].includes(width)) {
      await page.locator('#inicio').screenshot({ path: `artifacts/sobre-portada-${width}.png` });
      await page.locator('#gran-dia').screenshot({ path: `artifacts/sobre-eventos-${width}.png` });
      await page.locator('#galeria').screenshot({ path: `artifacts/sobre-galeria-${width}.png` });
      await page.screenshot({ path: `artifacts/sobre-completa-${width}.png`, fullPage: true });
    }
    await page.locator('[data-gallery-image]').first().click();
    await page.locator('.lightbox-image').evaluate(el => el.decode());
    assert.equal(await page.locator('.lightbox').isVisible(), true);
    await page.keyboard.press('Escape');
    await page.close();
  }
  const music = await context.newPage();
  music.on('pageerror', error => errors.push(error.message));
  await music.emulateMedia({ reducedMotion: 'no-preference' });
  await music.goto(url);
  await music.keyboard.press('Tab');
  assert.equal(await music.evaluate(() => document.activeElement.id), 'open-envelope');
  assert.equal(await music.locator('#open-envelope').evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
  await music.getByRole('button', { name: 'Abrir invitación con música', exact: true }).press('Enter');
  await music.waitForFunction(() => {
    const dialog = document.querySelector('.envelope-welcome');
    const opacity = Number(getComputedStyle(dialog).opacity);
    return opacity > 0 && opacity < 0.9;
  });
  assert.equal(await music.locator('#invitation-content').isVisible(), true);
  await music.screenshot({ path: 'artifacts/sobre-transicion.png' });
  await music.waitForFunction(() => document.documentElement.dataset.envelope === 'open');
  await music.waitForFunction(() => document.querySelector('audio').currentTime > 0);
  assert.equal(await music.locator('#music-toggle').getAttribute('aria-pressed'), 'true');
  await music.locator('#music-toggle').click();
  assert.equal(await music.locator('audio').evaluate(el => el.paused), true);
  const noJS = await browser.newContext({ offline: true, javaScriptEnabled: false });
  const fallback = await noJS.newPage();
  await fallback.goto(url);
  assert.equal(await fallback.locator('.envelope-welcome').isVisible(), false);
  assert.equal(await fallback.locator('#invitation-content').isVisible(), true);
  await noJS.close();
  assert.deepEqual(errors, []);
  const snapshot = await readFile('artifacts/versiones/Invitacion-Clasica-2026-09-15.html');
  assert.equal(createHash('sha256').update(snapshot).digest('hex'), '4e783e861e2f6d5213fe a829a1d49b68cec9e8381633cd1b656dfcadca655022'.replaceAll(' ', ''));
  console.log('Sobre verificado offline en seis tamaños; apertura con música y sin música; teclado, galería y alternativa sin JavaScript. Copia clásica intacta.');
} finally { await browser.close(); }


