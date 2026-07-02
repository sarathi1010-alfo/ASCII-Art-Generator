import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

const urls = [
  '/blog/ascii-art-guide',
  '/generators/text-to-ascii',
  '/generators/image-to-ascii',
  '/styles/standard',
  '/styles/doom',
  '/styles/ghost',
  '/use-cases/discord-ascii-art',
  '/use-cases/github-readme-ascii',
  '/use-cases/terminal-ascii-art',
  '/history-of-ascii-art',
  '/how-ascii-art-works'
];

test.describe('Content and Redirect Verification', () => {
  for (const url of urls) {
    test(`verify ${url} returns 200 OK and has JSON-LD`, async ({ page }) => {
      const response = await page.goto(`${baseURL}${url}`);
      expect(response?.status()).toBe(200);

      // Check for JSON-LD script
      const jsonLd = await page.locator('script[type="application/ld+json"]').first();
      await expect(jsonLd).toBeAttached();
      const content = await jsonLd.innerHTML();
      expect(content.length).toBeGreaterThan(50);

      // Check for console errors
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await page.waitForLoadState('networkidle');
      expect(errors).toEqual([]);
    });
  }

  test('verify redirects', async ({ page }) => {
    const redirects = [
      { from: '/generator/text-to-ascii', to: '/generators/text-to-ascii' },
      { from: '/discord-ascii-art', to: '/use-cases/discord-ascii-art' },
      { from: '/github-readme-art', to: '/use-cases/github-readme-ascii' },
      { from: '/terminal-customization', to: '/use-cases/terminal-ascii-art' }
    ];

    for (const r of redirects) {
      await page.goto(`${baseURL}${r.from}`);
      await expect(page).toHaveURL(new RegExp(r.to));
    }
  });
});
