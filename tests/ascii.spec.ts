import { test, expect } from '@playwright/test';

const ROUTES_TO_CHECK = [
  '/blog/ascii-art-guide',
  '/generators/text-to-ascii',
  '/generators/image-to-ascii',
  '/styles/standard',
  '/styles/doom',
  '/styles/ghost',
  '/use-cases/discord-ascii-art',
  '/use-cases/github-readme-ascii',
  '/use-cases/terminal-ascii-art'
];

test.describe('HTTP Status Checks', () => {
  for (const route of ROUTES_TO_CHECK) {
    test(`Route ${route} should return 200 OK`, async ({ request }) => {
      const response = await request.get(`http://localhost:3000${route}`);
      expect(response.status()).toBe(200);
    });
  }
});

test.describe('Core Functionality Checks', () => {
  test('Text to ASCII generator works without errors', async ({ page }) => {
    // Navigate to the Text to ASCII page
    await page.goto('http://localhost:3000/text-to-ascii');

    // Ensure there are no console errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    // Wait for the textarea to be available and type something
    await page.waitForSelector('textarea[placeholder="Type something..."]');
    await page.fill('textarea[placeholder="Type something..."]', 'Playwright Test');

    // Verify that the output <pre> element gets populated
    const outputPre = page.locator('pre.font-mono');
    await expect(outputPre).toBeVisible();
    await expect(outputPre).not.toBeEmpty();

    // Test a different font style
    await page.click('button[role="combobox"]:has-text("Standard")');
    await page.click('div[role="option"]:has-text("Doom")');
    await expect(outputPre).not.toBeEmpty();

    // Check for errors
    expect(errors).toHaveLength(0);
  });

  test('Image to ASCII main page loads without errors', async ({ page }) => {
    // For Image to ASCII, we will verify the page loads and the upload area is visible
    // as mocking a file upload can sometimes be flaky without proper setup.
    await page.goto('http://localhost:3000/image-to-ascii');

    // Ensure there are no console errors
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      // Ignore some common hydration/extension errors if necessary, but fail on real app errors.
      if (msg.type() === 'error' && !msg.text().includes('favicon.ico')) errors.push(msg.text());
    });

    // Verify the dropzone/upload area is present
    const dropzone = page.locator('div[role="presentation"] p:has-text("Drag & drop an image")');
    await expect(dropzone).toBeVisible();

    // We will upload a simple image
    const fileChooserPromise = page.waitForEvent('filechooser');
    await dropzone.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('src/app/favicon.ico');

    // Test resolution adjustment
    // Note: using precise slider testing can be complex, so we ensure the elements are visible and interactable
    const scaleSlider = page.locator('[data-slot="slider-thumb"]').first();
    await expect(scaleSlider).toBeVisible();

    // Check brightness slider
    const brightnessSlider = page.locator('[data-slot="slider-thumb"]').nth(1);
    await expect(brightnessSlider).toBeVisible();

    // Check contrast slider
    const contrastSlider = page.locator('[data-slot="slider-thumb"]').nth(2);
    await expect(contrastSlider).toBeVisible();

    // Verify output area populated
    const outputPre = page.locator('pre.font-mono');
    await expect(outputPre).toBeVisible();
    await expect(outputPre).not.toBeEmpty();

    // Check for errors
    expect(errors).toHaveLength(0);
  });
});
