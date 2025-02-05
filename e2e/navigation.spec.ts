import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('main', { timeout: 60000 });
  });

  test('should navigate to all sections', async ({ page }) => {
    // Check hero section
    const mainElement = page.locator('main');
    await expect(mainElement).toBeVisible({ timeout: 60000 });
    await expect(page.locator('img.w-11\\/12')).toBeVisible({ timeout: 60000 });
    
    // Check shows section
    await page.waitForSelector('h2:has-text("Próximos Conciertos")', { timeout: 60000 });
    const showsSection = page.getByRole('heading', { name: 'Próximos Conciertos', exact: true });
    await expect(showsSection).toBeVisible({ timeout: 60000 });
    await showsSection.scrollIntoViewIfNeeded();
    
    // Check shop section
    await page.waitForSelector('h2:has-text("Tienda")', { timeout: 60000 });
    const shopSection = page.getByRole('heading', { name: 'Tienda', exact: true });
    await expect(shopSection).toBeVisible({ timeout: 60000 });
    await shopSection.scrollIntoViewIfNeeded();
    
    // Check footer
    await page.waitForSelector('footer', { timeout: 60000 });
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible({ timeout: 60000 });
    await footer.scrollIntoViewIfNeeded();
    await expect(page.getByText(/© 2025/)).toBeVisible({ timeout: 60000 });
  });

  test('social links should open in new tab', async ({ page }) => {
    await page.waitForSelector('footer', { timeout: 60000 });
    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible({ timeout: 60000 });
    await footer.scrollIntoViewIfNeeded();
    
    const socialLinks = await footer.getByRole('link').all();
    expect(socialLinks.length).toBeGreaterThan(0);
    for (const link of socialLinks) {
      expect(await link.getAttribute('target')).toBe('_blank');
      expect(await link.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });
}); 
