import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const base = process.env.QA_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch({ headless: true });
const artifacts = new URL('../artifacts/', import.meta.url);
await mkdir(artifacts, { recursive: true });
const report = { viewports: [], checks: [], errors: [] };
try {
  const page = await browser.newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  page.on('pageerror', error => report.errors.push(error.message));
  await page.clock.install({ time: new Date('2026-09-05T18:00:00Z') });
  for (const width of [360, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    const response = await page.goto(base);
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.countdown-grid:not([hidden])').waitFor();
    assert.equal(await page.locator('main h1').count(), 1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert.equal(overflow, false, `Desbordamiento en ${width}px`);
    const h1 = await page.locator('main h1').boundingBox();
    assert(h1 && h1.x >= 0 && h1.x + h1.width <= width, `Nombres visibles en ${width}px`);
    for (const picture of await page.locator('picture img').all()) {
      await picture.scrollIntoViewIfNeeded();
      await picture.evaluate(img => img.decode());
    }
    assert.equal(await page.locator('a[href="null"]').count(), 0);
    assert.equal(await page.locator('#music-toggle').count(), 1);
    await page.evaluate(() => scrollTo(0, 0));
    if ([390, 1440].includes(width)) {
      await page.screenshot({ path: new URL(`preview-${width}.png`, artifacts).pathname.replace(/^\/(?=[A-Z]:)/, ''), fullPage: true });
      await page.screenshot({ path: new URL(`hero-${width}.png`, artifacts).pathname.replace(/^\/(?=[A-Z]:)/, '') });
    }
    report.viewports.push({ width, noOverflow: true, imagesLoaded: true });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement?.textContent?.trim()), 'Ir al contenido');
  await page.keyboard.press('Enter');
  assert.equal(new URL(page.url()).hash, '#bienvenida');
  await page.locator('nav a[href="#gran-dia"]').click();
  assert.equal(new URL(page.url()).hash, '#gran-dia');
  report.checks.push('Navegación interna y enlace de salto con teclado');
  await page.evaluate(() => document.documentElement.style.fontSize = '200%');
  const enlargedOverflow = await page.evaluate(() => [...document.querySelectorAll('main *, footer *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).map(el => ({ tag: el.tagName, class: el.className, text: el.textContent?.trim().slice(0, 45) })).slice(0, 30));
  if (enlargedOverflow.length) console.log('Elementos al ampliar texto:', enlargedOverflow);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Texto al 200% sin desbordamiento');
  await page.evaluate(() => document.documentElement.style.fontSize = '');
  report.checks.push('Texto ampliado al 200%');
  const actualPhotos = page.locator('[data-gallery-image]');
  assert.equal(await actualPhotos.count(), 5);
  await actualPhotos.first().click();
  await page.locator('.lightbox-image').evaluate(img => img.decode());
  assert.equal(await page.locator('.lightbox').isVisible(), true);
  assert.equal(await page.locator('.lightbox-image').evaluate(img => getComputedStyle(img).objectFit), 'contain');
  for (let i = 1; i < 5; i++) {
    await page.keyboard.press('ArrowRight');
    await page.locator('.lightbox-image').evaluate(img => img.decode());
  }
  assert.match(await page.locator('.lightbox figcaption').textContent(), /^5 \/ 5/);
  await page.keyboard.press('Escape');
  assert.equal(await actualPhotos.first().evaluate(el => el === document.activeElement), true);
  report.checks.push('Cinco fotos definitivas: carga, recorrido y vista completa sin deformación');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(base);
  assert.equal(await page.locator('html').getAttribute('data-motion'), 'on');
  assert.equal(await page.locator('.hero h1').evaluate(el => getComputedStyle(el).animationName), 'invitation-enter');
  await page.locator('.story-copy').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.story-copy')?.classList.contains('is-visible'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.hero h1').evaluate(el => getComputedStyle(el).animationName), 'none');
  assert.equal(await page.locator('.story-copy').evaluate(el => getComputedStyle(el).opacity), '1');
  report.checks.push('Entrada y aparición al desplazar activas; reducción de movimiento en vivo respetada');
  await page.clock.setSystemTime(new Date('2026-10-10T18:00:00Z'));
  await page.reload();
  await page.waitForFunction(() => document.querySelector('.countdown-message')?.textContent === '¡Llegó nuestro gran día!');
  assert.equal(await page.locator('.countdown-grid').isHidden(), true);
  await page.clock.setSystemTime(new Date('2026-10-11T05:00:00Z'));
  await page.reload();
  await page.waitForFunction(() => document.querySelector('.countdown-message')?.textContent?.startsWith('Gracias por acompañarnos'));
  report.checks.push('Cuenta regresiva y mensajes del día de boda y posterior');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => document.documentElement.dataset.motion = 'on');
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  report.checks.push('Preferencia de movimiento reducido');
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await noJs.newPage();
  await staticPage.goto(base);
  assert.equal(await staticPage.locator('.countdown-message').isVisible(), true);
  assert.equal(await staticPage.locator('.countdown-grid').isVisible(), false);
  assert.equal(await staticPage.locator('#events-heading').isVisible(), true);
  report.checks.push('Información principal disponible sin JavaScript');
  await noJs.close();

  // Fixture aislado: prueba el módulo real de galería sin introducir fotos falsas en la invitación.
  const fixture = await browser.newPage();
  fixture.on('pageerror', error => report.errors.push(error.message));
  await fixture.route('**/__qa-gallery', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><html lang="es"><head><title>Prueba de galería</title></head><body>
  <button data-gallery-image="/favicon.svg" data-alt="Imagen de prueba uno" data-caption="Uno">Foto uno</button>
  <button data-gallery-image="/favicon.svg" data-alt="Imagen de prueba dos" data-caption="Dos">Foto dos</button>
  <dialog class="lightbox" aria-label="Galería"><button class="lightbox-close" autofocus>Cerrar</button><button class="lightbox-prev">Anterior</button><figure><img class="lightbox-image" alt=""><figcaption></figcaption></figure><button class="lightbox-next">Siguiente</button></dialog>
  <script type="module" src="/src/scripts/gallery.ts"></script></body></html>` }));
  await fixture.goto(`${base}/__qa-gallery`);
  await fixture.waitForLoadState('networkidle');
  await fixture.getByRole('button', { name: 'Foto uno', exact: true }).click();
  assert.equal(await fixture.locator('dialog').isVisible(), true);
  await fixture.keyboard.press('ArrowRight');
  assert.equal(await fixture.locator('figcaption').textContent(), '2 / 2 — Dos');
  await fixture.keyboard.press('ArrowRight');
  assert.equal(await fixture.locator('figcaption').textContent(), '1 / 2 — Uno');
  await fixture.keyboard.press('Escape');
  assert.equal(await fixture.locator('dialog').isVisible(), false);
  assert.equal(await fixture.evaluate(() => document.activeElement?.textContent), 'Foto uno');
  assert.equal(await fixture.evaluate(() => document.body.style.overflow), '');
  report.checks.push('Lightbox: apertura, flechas, recorrido circular, Escape y restauración del foco');
  assert.deepEqual(report.errors, []);
  await writeFile(new URL('qa-report.json', artifacts), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
