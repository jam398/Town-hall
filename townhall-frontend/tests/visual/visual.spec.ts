import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests
 * 
 * These tests capture screenshots and compare against baselines
 * to detect unintended visual changes.
 * 
 * To update baselines: npm run test:visual:update
 */

test.describe('Visual Regression - Desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('Homepage visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for any animations to complete
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Events page visual snapshot', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('events-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Blog page visual snapshot', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('blog-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Volunteer page visual snapshot', async ({ page }) => {
    await page.goto('/volunteer');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('volunteer-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Contact page visual snapshot', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('contact-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('About page visual snapshot', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('about-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});

test.describe('Visual Regression - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Homepage mobile visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Events page mobile visual snapshot', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('events-mobile.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Blog page mobile visual snapshot', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('blog-mobile.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Volunteer page mobile visual snapshot', async ({ page }) => {
    await page.goto('/volunteer');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('volunteer-mobile.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Contact page mobile visual snapshot', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('contact-mobile.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});

test.describe('Visual Regression - Components', () => {
  test('Header component snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header.png');
  });

  test('Footer component snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toHaveScreenshot('footer.png');
  });

  test('Event card component snapshot', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    
    const eventCard = page.locator('[data-testid="event-card"], .event-card, article').first();
    
    if (await eventCard.isVisible()) {
      await expect(eventCard).toHaveScreenshot('event-card.png');
    }
  });

  test('Blog card component snapshot', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    
    const blogCard = page.locator('[data-testid="blog-card"], .blog-card, article').first();
    
    if (await blogCard.isVisible()) {
      await expect(blogCard).toHaveScreenshot('blog-card.png');
    }
  });
});

test.describe('Visual Regression - Form States', () => {
  test('Contact form empty state', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    const form = page.locator('form');
    await expect(form).toHaveScreenshot('contact-form-empty.png');
  });

  test('Contact form filled state', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    // Fill form
    await page.locator('input[name="name"], input[placeholder*="name" i]').fill('Test User');
    await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"], textarea').fill('This is a test message.');
    
    const form = page.locator('form');
    await expect(form).toHaveScreenshot('contact-form-filled.png');
  });

  test('Contact form error state', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    // Submit empty form to trigger errors
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Wait for error state
    await page.waitForTimeout(500);
    
    const form = page.locator('form');
    await expect(form).toHaveScreenshot('contact-form-error.png');
  });

  test('Volunteer form empty state', async ({ page }) => {
    await page.goto('/volunteer');
    await page.waitForLoadState('networkidle');
    
    const form = page.locator('form');
    await expect(form).toHaveScreenshot('volunteer-form-empty.png');
  });
});

test.describe('Visual Regression - Interactive States', () => {
  test('Button hover state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const button = page.locator('button, a.btn, .button').first();
    
    if (await button.isVisible()) {
      await button.hover();
      await expect(button).toHaveScreenshot('button-hover.png');
    }
  });

  test('Button focus state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const button = page.locator('button, a.btn, .button').first();
    
    if (await button.isVisible()) {
      await button.focus();
      await expect(button).toHaveScreenshot('button-focus.png');
    }
  });

  test('Input focus state', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('input').first();
    await input.focus();
    await expect(input).toHaveScreenshot('input-focus.png');
  });

  test('Link hover state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const link = page.locator('nav a').first();
    await link.hover();
    await expect(link).toHaveScreenshot('link-hover.png');
  });
});

test.describe('Visual Regression - Dark Mode', () => {
  test.use({ colorScheme: 'dark' });

  test('Homepage dark mode snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Only run if dark mode is supported
    const hasDarkMode = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ||
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    
    if (hasDarkMode) {
      await expect(page).toHaveScreenshot('homepage-dark.png', {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    }
  });
});

test.describe('Visual Regression - Tablet', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('Homepage tablet visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Events page tablet visual snapshot', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('events-tablet.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});
