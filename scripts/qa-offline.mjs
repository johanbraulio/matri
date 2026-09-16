import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ offline: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve('artifacts/Invitacion-Johan-y-Marylia.html')).href);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator('[data-gallery-image]').count(), 5);
  const content = await page.locator('body').innerText();
  assert(!content.includes('Muy pronto compartiremos aquí'));
  assert(!content.includes('Los horarios de cena y celebración se confirmarán'));
  assert(content.includes('Iglesia Inmaculada Concepción'));
  assert(content.includes('Salón de Eventos La Duquesa'));
  assert.equal(await page.locator('a[href="https://maps.app.goo.gl/hJcShWK1Vh9YRGgM6"]').count(), 1);
  assert.equal(await page.locator('a[href="https://maps.app.goo.gl/WNpThYArYK4pNncp9"]').count(), 1);
  assert.equal(await page.locator('body').innerText().then(text => /fotografías? de prueba/i.test(text)), false);
  for (const width of [360, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const img of await page.locator('picture img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => el.decode());
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if ([390, 1440].includes(width)) {
      await page.locator('#inicio').screenshot({ path: `artifacts/portada-final-${width}.png` });
      await page.locator('#gran-dia').screenshot({ path: `artifacts/eventos-final-${width}.png` });
      await page.locator('#galeria').screenshot({ path: `artifacts/galeria-real-${width}.png` });
      await page.locator('#historia').screenshot({ path: `artifacts/historia-real-${width}.png` });
    }
  }
  await page.locator('[data-gallery-image]').first().click();
  for (let i = 0; i < 5; i++) {
    await page.locator('.lightbox-image').evaluate(el => el.decode());
    assert.equal(await page.locator('.lightbox-image').evaluate(el => getComputedStyle(el).objectFit), 'contain');
    await page.keyboard.press('ArrowRight');
  }
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('[data-gallery-image]').first().evaluate(el => el === document.activeElement), true);
  const audio = page.locator('#wedding-music');
  assert((await audio.getAttribute('src')).startsWith('data:audio/mpeg;base64,'));
  assert.equal(await audio.getAttribute('autoplay'), '');
  if (await audio.evaluate(el => el.paused)) await page.locator('#music-toggle').click();
  await page.waitForFunction(() => document.querySelector('audio').currentTime > 0);
  await page.locator('#music-toggle').click();
  assert.equal(await audio.evaluate(el => el.paused), true);
  assert.equal(await page.locator('#music-toggle').getAttribute('aria-pressed'), 'false');
  // Simular bloqueo de autoplay y comprobar reproducción tras pulsar el botón.
  const blocked = await context.newPage();
  await blocked.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      if (!navigator.userActivation.isActive) return Promise.reject(new DOMException('Autoplay bloqueado', 'NotAllowedError'));
      return play.call(this);
    };
  });
  await blocked.goto(page.url());
  await blocked.getByRole('button', { name: 'Reproducir Nuestra canción' }).click();
  await blocked.waitForFunction(() => !document.querySelector('audio').paused);
  await blocked.close();
  assert.deepEqual(errors, []);
  console.log('HTML sin conexión: cinco fotos, seis tamaños, galería y foco correctos. Sin errores de JavaScript.');
} finally { await browser.close(); }
