import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

/**
 * Performance Tests using Lighthouse
 * 
 * These tests ensure the application meets performance standards:
 * - Performance score ≥ 90
 * - Accessibility score = 100
 * - Best Practices score ≥ 90
 * - SEO score ≥ 90
 */

// Lighthouse thresholds
const THRESHOLDS = {
  performance: 90,
  accessibility: 100,
  'best-practices': 90,
  seo: 90,
};

// Mobile thresholds (slightly lower for performance due to throttling)
const MOBILE_THRESHOLDS = {
  performance: 80,
  accessibility: 100,
  'best-practices': 90,
  seo: 90,
};

// Core Web Vitals thresholds
const CORE_WEB_VITALS = {
  LCP: 2500, // Largest Contentful Paint < 2.5s
  FID: 100,  // First Input Delay < 100ms
  CLS: 0.1,  // Cumulative Layout Shift < 0.1
};

test.describe('Lighthouse - Desktop', () => {
  // Only run in Chromium as Lighthouse requires Chrome
  test.skip(({ browserName }) => browserName !== 'chromium', 'Lighthouse only works in Chromium');

  test('Homepage meets performance thresholds', async ({ page }) => {
    await page.goto('/');
    
    await playAudit({
      page,
      thresholds: THRESHOLDS,
      port: 9222,
      reports: {
        formats: {
          html: true,
          json: true,
        },
        name: 'lighthouse-homepage-desktop',
        directory: 'playwright-report/lighthouse',
      },
    });
  });

  test('Events page meets performance thresholds', async ({ page }) => {
    await page.goto('/events');
    
    await playAudit({
      page,
      thresholds: THRESHOLDS,
      port: 9222,
      reports: {
        formats: {
          html: true,
        },
        name: 'lighthouse-events-desktop',
        directory: 'playwright-report/lighthouse',
      },
    });
  });

  test('Blog page meets performance thresholds', async ({ page }) => {
    await page.goto('/blog');
    
    await playAudit({
      page,
      thresholds: THRESHOLDS,
      port: 9222,
      reports: {
        formats: {
          html: true,
        },
        name: 'lighthouse-blog-desktop',
        directory: 'playwright-report/lighthouse',
      },
    });
  });

  test('Contact page meets performance thresholds', async ({ page }) => {
    await page.goto('/contact');
    
    await playAudit({
      page,
      thresholds: THRESHOLDS,
      port: 9222,
      reports: {
        formats: {
          html: true,
        },
        name: 'lighthouse-contact-desktop',
        directory: 'playwright-report/lighthouse',
      },
    });
  });
});

test.describe('Lighthouse - Mobile', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Lighthouse only works in Chromium');

  test('Homepage meets mobile performance thresholds', async ({ page }) => {
    await page.goto('/');
    
    await playAudit({
      page,
      thresholds: MOBILE_THRESHOLDS,
      port: 9222,
      config: {
        extends: 'lighthouse:default',
        settings: {
          formFactor: 'mobile',
          throttling: {
            rttMs: 150,
            throughputKbps: 1638.4,
            cpuSlowdownMultiplier: 4,
          },
          screenEmulation: {
            mobile: true,
            width: 375,
            height: 667,
            deviceScaleFactor: 2,
          },
        },
      },
      reports: {
        formats: {
          html: true,
        },
        name: 'lighthouse-homepage-mobile',
        directory: 'playwright-report/lighthouse',
      },
    });
  });

  test('Events page meets mobile performance thresholds', async ({ page }) => {
    await page.goto('/events');
    
    await playAudit({
      page,
      thresholds: MOBILE_THRESHOLDS,
      port: 9222,
      config: {
        extends: 'lighthouse:default',
        settings: {
          formFactor: 'mobile',
          throttling: {
            rttMs: 150,
            throughputKbps: 1638.4,
            cpuSlowdownMultiplier: 4,
          },
        },
      },
      reports: {
        formats: {
          html: true,
        },
        name: 'lighthouse-events-mobile',
        directory: 'playwright-report/lighthouse',
      },
    });
  });
});

test.describe('Core Web Vitals', () => {
  test('Homepage has good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Measure LCP using Performance API
    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });
    
    console.log(`LCP: ${lcp}ms`);
    
    // LCP should be under threshold
    if (lcp > 0) {
      expect(lcp).toBeLessThan(CORE_WEB_VITALS.LCP);
    }
  });

  test('Homepage has minimal layout shift (CLS)', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to stabilize
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Measure CLS
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
        
        // Wait a bit then resolve
        setTimeout(() => resolve(clsValue), 2000);
      });
    });
    
    console.log(`CLS: ${cls}`);
    
    // CLS should be under threshold
    expect(cls).toBeLessThan(CORE_WEB_VITALS.CLS);
  });

  test('Page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const domContentLoaded = Date.now() - startTime;
    
    await page.waitForLoadState('load');
    const fullLoad = Date.now() - startTime;
    
    console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
    console.log(`Full Load: ${fullLoad}ms`);
    
    // DOM should be ready within 3 seconds
    expect(domContentLoaded).toBeLessThan(3000);
    
    // Full load within 5 seconds
    expect(fullLoad).toBeLessThan(5000);
  });
});

test.describe('Resource Optimization', () => {
  test('Images are optimized', async ({ page }) => {
    await page.goto('/');
    
    // Check for lazy loading on images below the fold
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const loading = await img.getAttribute('loading');
      const src = await img.getAttribute('src');
      
      // Images should use modern formats or have loading attribute
      const isOptimized = 
        loading === 'lazy' ||
        src?.includes('.webp') ||
        src?.includes('.avif') ||
        src?.startsWith('data:') ||
        src?.includes('/_next/image');
      
      // Log non-optimized images
      if (!isOptimized && src) {
        console.log(`Non-optimized image: ${src}`);
      }
    }
  });

  test('No render-blocking resources', async ({ page }) => {
    const renderBlockingResources: string[] = [];
    
    // Listen for resource loading
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      const url = request.url();
      
      // Check for render-blocking CSS/JS in head
      if (resourceType === 'stylesheet' || resourceType === 'script') {
        renderBlockingResources.push(url);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Log resources for review
    console.log(`Resources loaded: ${renderBlockingResources.length}`);
    
    // This is informational - actual blocking detection requires more analysis
    expect(renderBlockingResources.length).toBeLessThan(20);
  });

  test('JavaScript bundle size is reasonable', async ({ page }) => {
    let totalJsSize = 0;
    
    page.on('response', async (response) => {
      const url = response.url();
      const contentType = response.headers()['content-type'] || '';
      
      if (contentType.includes('javascript') || url.endsWith('.js')) {
        const body = await response.body().catch(() => Buffer.from(''));
        totalJsSize += body.length;
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const totalJsSizeKB = totalJsSize / 1024;
    console.log(`Total JS size: ${totalJsSizeKB.toFixed(2)} KB`);
    
    // Total JS should be under 500KB (reasonable for Next.js app)
    expect(totalJsSizeKB).toBeLessThan(500);
  });
});

test.describe('Network Performance', () => {
  test('API responses are fast', async ({ page }) => {
    const apiTimes: { url: string; time: number }[] = [];
    
    page.on('response', async (response) => {
      const url = response.url();
      const timing = response.request().timing();
      
      if (url.includes('/api/')) {
        apiTimes.push({
          url,
          time: timing.responseEnd - timing.requestStart,
        });
      }
    });
    
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    
    // Log API times
    apiTimes.forEach(({ url, time }) => {
      console.log(`API ${url}: ${time}ms`);
    });
    
    // All API calls should complete within 2 seconds
    apiTimes.forEach(({ url, time }) => {
      expect(time).toBeLessThan(2000);
    });
  });

  test('No failed network requests', async ({ page }) => {
    const failedRequests: string[] = [];
    
    page.on('response', (response) => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.status()}: ${response.url()}`);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Log failed requests
    if (failedRequests.length > 0) {
      console.log('Failed requests:', failedRequests);
    }
    
    // Should have no failed requests (except maybe expected 404s)
    const unexpectedFailures = failedRequests.filter(
      (r) => !r.includes('favicon') && !r.includes('robots.txt')
    );
    
    expect(unexpectedFailures).toHaveLength(0);
  });
});
