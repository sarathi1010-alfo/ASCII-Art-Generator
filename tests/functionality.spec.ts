import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('Core Functionality Verification', () => {
  test('verify Text to ASCII conversion', async ({ page }) => {
    await page.goto(`${baseURL}/text-to-ascii`);

    // Wait for the input to be available
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeVisible();

    // Type some text
    await textarea.fill('TEST');

    // Check if the output (usually in a <pre> tag) is generated and not empty
    const output = page.locator('pre').first();
    await expect(output).toBeVisible();
    const text = await output.innerText();
    expect(text.length).toBeGreaterThan(0);

    // verify output contains bits of the ASCII representation
    // (Actual characters depend on the default font, but it shouldn't be empty)
    expect(text).toMatch(/[|_/\\]/);
  });

  test('verify Image to ASCII conversion', async ({ page }) => {
    await page.goto(`${baseURL}/image-to-ascii`);

    // Verify the dropzone is present
    const dropzoneText = page.locator('text=Drag & drop an image').first();
    await expect(dropzoneText).toBeVisible();

    // Check if "Image to ASCII Generator" title is present
    const title = page.locator('h1', { hasText: 'Image to ASCII Generator' });
    await expect(title).toBeVisible();
  });
});
