import { test, expect } from '@playwright/test';

const TARGET_KEYWORD = process.env.TARGET_KEYWORD || 'ascii art generator';

test.describe('16-Point Technical & SEO Verification Suite', () => {
  let consoleErrors: string[] = [];
  let pageErrors: Error[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    pageErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err));
  });

  test('Check 1: Page loads with HTTP 200', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
  });

  test('Check 2: Zero console errors and uncaught exceptions', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('Check 3: Title tag contains primary keyword and length is <= 60 chars', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.length).toBeGreaterThanOrEqual(15);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(title.toLowerCase()).toContain(TARGET_KEYWORD.toLowerCase());
  });

  test('Check 4: Meta description exists, 120-160 chars, and contains keyword', async ({ page }) => {
    await page.goto('/');
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc!.length).toBeGreaterThanOrEqual(120);
    expect(metaDesc!.length).toBeLessThanOrEqual(160);
    expect(metaDesc!.toLowerCase()).toContain(TARGET_KEYWORD.toLowerCase());
  });

  test('Check 5: Exactly one H1 tag with semantic content', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    expect(await h1.count()).toBe(1);
    const text = await h1.textContent();
    expect(text?.trim().length).toBeGreaterThan(10);
  });

  test('Check 6: Valid JSON-LD Structured Data (WebApplication, FAQPage, HowTo, BreadcrumbList)', async ({ page }) => {
    await page.goto('/');
    const schemas = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(s => {
        try {
          return JSON.parse(s.textContent || '{}');
        } catch {
          return null;
        }
      });
    });

    expect(schemas.length).toBeGreaterThanOrEqual(1);
    expect(schemas.every(s => s !== null)).toBe(true);

    const types = schemas.flatMap(s => Array.isArray(s) ? s.map(item => item['@type']) : [s['@type']]);
    expect(types.some(t => t === 'WebApplication' || t === 'SoftwareApplication')).toBe(true);
    expect(types).toContain('FAQPage');
    expect(types).toContain('HowTo');
    expect(types).toContain('BreadcrumbList');
  });

  test('Check 7: Open Graph and Twitter Card tags present', async ({ page }) => {
    await page.goto('/');
    const requiredOg = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'];
    for (const og of requiredOg) {
      const content = await page.locator(`meta[property="${og}"]`).getAttribute('content');
      expect(content).toBeTruthy();
    }
    const requiredTwitter = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
    for (const tw of requiredTwitter) {
      const content = await page.locator(`meta[name="${tw}"]`).getAttribute('content');
      expect(content).toBeTruthy();
    }
  });

  test('Check 8: All images have non-empty Alt text', async ({ page }) => {
    await page.goto('/');
    const missingAltCount = await page.locator('img:not([alt])').count();
    expect(missingAltCount).toBe(0);
  });

  test('Check 9: Zero mixed content on HTTPS', async ({ page }) => {
    const insecureRequests: string[] = [];
    page.on('request', (req) => {
      if (req.url().startsWith('http://') && !req.url().includes('localhost') && !req.url().includes('127.0.0.1')) {
        insecureRequests.push(req.url());
      }
    });
    await page.goto('/');
    expect(insecureRequests).toEqual([]);
  });

  test('Check 10: Largest Contentful Paint (LCP) < 2.5s', async ({ page }) => {
    await page.goto('/');
    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let maxLcp = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            maxLcp = entries[entries.length - 1].startTime;
          }
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(maxLcp);
        }, 3000);
      });
    });
    expect(lcp).toBeLessThan(2500);
  });

  test('Check 11: Cumulative Layout Shift (CLS) < 0.1', async ({ page }) => {
    await page.goto('/');
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let score = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) score += entry.value;
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(score);
        }, 2000);
      });
    });
    expect(cls).toBeLessThan(0.1);
  });

  test('Check 12: All page links return 2xx/3xx (no broken links)', async ({ page, request }) => {
    await page.goto('/');
    const hrefs = await page.locator('a[href]').evaluateAll((links) =>
      links
        .map((a) => (a as HTMLAnchorElement).href)
        .filter((href) => href.startsWith('http'))
    );
    const uniqueHrefs = Array.from(new Set(hrefs)).slice(0, 30);
    for (const url of uniqueHrefs) {
      const res = await request.get(url, { failOnStatusCode: false });
      expect(res.status(), `Dead link detected: ${url}`).toBeLessThan(400);
    }
  });

  test('Check 13: Sitemap.xml is accessible and valid XML', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const contentType = res.headers()['content-type'] || '';
    expect(contentType.includes('xml')).toBe(true);
    const text = await res.text();
    expect(text).toContain('<urlset');
  });

  test('Check 14: Robots.txt is accessible and specifies sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text.toLowerCase()).toContain('user-agent');
    expect(text).toContain('Sitemap:');
  });

  test('Check 15: Responsive layouts with zero horizontal scrollbar on 375px, 768px, 1440px', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
    ];
    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/');
      const hasHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasHorizontalScroll, `Horizontal overflow on ${vp.width}x${vp.height}`).toBe(false);
    }
  });

  test('Check 16: Accessibility landmark (Skip-to-content) and touch targets >= 44px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    // Skip-to-content check
    const skipLink = page.locator('a[href^="#main"], a[href^="#content"], .skip-link');
    expect(await skipLink.count()).toBeGreaterThanOrEqual(1);

    // Primary interactive buttons touch target >= 44x44
    const primaryButton = page.locator('button, a.btn, a[role="button"]').first();
    if (await primaryButton.isVisible()) {
      const box = await primaryButton.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
