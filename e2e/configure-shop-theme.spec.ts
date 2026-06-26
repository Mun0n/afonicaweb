import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ADMIN_BASE =
  process.env.PS_ADMIN_URL ||
  'https://shop.afonicanaranjo.com/admin243eyasfea98u6ippix';
const INJECT_HTML = fs.readFileSync(
  path.join(process.cwd(), 'public/shop/inject-snippet.html'),
  'utf8'
).trim();

test.describe.configure({ mode: 'serial' });

test('configure PrestaShop dark theme', async ({ page }) => {
  test.setTimeout(300000);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${ADMIN_BASE}/index.php?controller=AdminDashboard`, {
    waitUntil: 'domcontentloaded',
  });

  if (await page.locator('input[name="email"]').isVisible({ timeout: 5000 }).catch(() => false)) {
    const email = process.env.PS_ADMIN_EMAIL;
    const password = process.env.PS_ADMIN_PASSWORD;
    if (!email || !password) {
      throw new Error(
        'Admin login required. Set PS_ADMIN_EMAIL and PS_ADMIN_PASSWORD env vars, or log in manually within 2 minutes.'
      );
    }
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="passwd"]', password);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
  }

  await page.goto(`${ADMIN_BASE}/index.php/improve/modules/manage`, {
    waitUntil: 'domcontentloaded',
  });

  const search = page.locator('#module-search-bar, input[placeholder*="módulo" i]').first();
  await search.fill('texto personalizado');
  await search.press('Enter');
  await page.waitForTimeout(1500);

  const moduleCard = page
    .locator('.module-item-wrapper, .module-item, [class*="module"]')
    .filter({ hasText: /texto personalizado|Bloque de texto/i })
    .first();
  await expect(moduleCard).toBeVisible({ timeout: 15000 });

  const configureLink = moduleCard.getByRole('link', { name: /Configurar/i }).first();
  await configureLink.click();
  await page.waitForLoadState('domcontentloaded');

  const editor = page
    .locator('textarea, iframe, .mce-edit-area, [contenteditable="true"]')
    .first();
  await expect(editor).toBeVisible({ timeout: 20000 });

  if (await page.locator('iframe').count()) {
    const frame = page.frameLocator('iframe').first();
    await frame.locator('body').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(INJECT_HTML);
  } else if (await editor.evaluate((el) => el.tagName === 'TEXTAREA')) {
    await editor.fill(INJECT_HTML);
  } else {
    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.type(INJECT_HTML);
  }

  await page.getByRole('button', { name: /Guardar|Save/i }).first().click();
  await page.waitForTimeout(2000);

  await page.goto(
    `${ADMIN_BASE}/index.php/configure/advanced/performance/?_token=`,
    { waitUntil: 'domcontentloaded' }
  ).catch(() => {});

  await page.goto(`${ADMIN_BASE}/index.php?controller=AdminPerformance`, {
    waitUntil: 'domcontentloaded',
  });

  const clearCache = page.getByRole('button', { name: /Vaciar caché|Clear cache/i });
  if (await clearCache.isVisible({ timeout: 10000 }).catch(() => false)) {
    await clearCache.click();
    await page.waitForTimeout(2000);
  }

  await page.goto('https://shop.afonicanaranjo.com/', { waitUntil: 'domcontentloaded' });
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toMatch(/rgb\(0,\s*0,\s*0\)|#000000/i);
});
