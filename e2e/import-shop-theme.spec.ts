import { test, expect } from '@playwright/test';

const ADMIN_BASE =
  process.env.PS_ADMIN_URL ||
  'https://shop.afonicanaranjo.com/admin243eyasfea98u6ippix';
const THEME_ZIP_URL =
  process.env.PS_THEME_ZIP_URL ||
  'https://afonicanaranjo.com/shop/afonica-child-theme.zip';

test('import and activate Afonica Dark theme', async ({ page }) => {
  test.setTimeout(300000);
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto(`${ADMIN_BASE}/index.php?controller=AdminDashboard`, {
    waitUntil: 'domcontentloaded',
  });

  if (await page.locator('input[name="email"]').isVisible({ timeout: 5000 }).catch(() => false)) {
    const email = process.env.PS_ADMIN_EMAIL;
    const password = process.env.PS_ADMIN_PASSWORD;
    if (!email || !password) {
      throw new Error('Set PS_ADMIN_EMAIL and PS_ADMIN_PASSWORD, or log in manually then re-run.');
    }
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="passwd"]', password);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
  }

  await page.goto(`${ADMIN_BASE}/index.php/modules/improve/design/themes`, {
    waitUntil: 'domcontentloaded',
  });

  await page.getByRole('button', { name: /Importar tema/i }).click();
  await page.getByRole('button', { name: /Importar desde la web/i }).click();

  const urlInput = page.locator('#theme-web-path');
  await expect(urlInput).toBeVisible({ timeout: 10000 });
  await urlInput.fill(THEME_ZIP_URL);

  const importModal = page.locator('.modal.show, [role="dialog"]').filter({ hasText: /Importar desde la web/i });
  await importModal.getByRole('button', { name: /^Importar$/i }).click();

  await expect(page.getByRole('heading', { name: /Afonica Dark/i })).toBeVisible({
    timeout: 120000,
  });

  await page.getByRole('button', { name: /^Utilizar$/i }).first().click();
  await page.getByRole('button', { name: /^Utilizar$/i }).last().click().catch(() => {});

  await page.goto(`${ADMIN_BASE}/index.php?controller=AdminPerformance`, {
    waitUntil: 'domcontentloaded',
  });
  const clearCache = page.getByRole('button', { name: /Vaciar caché|Clear cache/i });
  if (await clearCache.isVisible({ timeout: 10000 }).catch(() => false)) {
    await clearCache.click();
    await page.waitForTimeout(2000);
  }

  await page.goto('https://shop.afonicanaranjo.com/', { waitUntil: 'domcontentloaded' });
  const cssLinks = await page.locator('link[rel="stylesheet"][href*="afonica"]').count();
  const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(cssLinks + (bodyBg.match(/rgb\(0,\s*0,\s*0\)/) ? 1 : 0)).toBeGreaterThan(0);
});
