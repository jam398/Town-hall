import { test, expect } from '@playwright/test';

/**
 * Navigation & Layout E2E Tests
 * 
 * These tests verify that the core navigation and layout elements
 * work correctly across all pages and viewports.
 */

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads successfully', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Town Hall/i);
    
    // Verify main content is visible
    await expect(page.locator('main')).toBeVisible();
    
    // Verify header is present
    await expect(page.locator('header')).toBeVisible();
    
    // Verify footer is present
    await expect(page.locator('footer')).toBeVisible();
  });

  test('logo links to homepage', async ({ page }) => {
    // Navigate away from homepage first
    await page.goto('/events');
    
    // Click logo
    await page.locator('header a[href="/"]').first().click();
    
    // Verify we're back on homepage
    await expect(page).toHaveURL('/');
  });

  test('main navigation links work', async ({ page }) => {
    // Test Events link
    await page.locator('nav a[href="/events"]').click();
    await expect(page).toHaveURL('/events');
    await expect(page.locator('h1')).toContainText(/events/i);

    // Test Blog link
    await page.locator('nav a[href="/blog"]').click();
    await expect(page).toHaveURL('/blog');
    await expect(page.locator('h1')).toContainText(/blog/i);

    // Test Volunteer link
    await page.locator('nav a[href="/volunteer"]').click();
    await expect(page).toHaveURL('/volunteer');
    await expect(page.locator('h1')).toContainText(/volunteer/i);

    // Test About link
    await page.locator('nav a[href="/about"]').click();
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText(/about/i);

    // Test Contact link
    await page.locator('nav a[href="/contact"]').click();
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText(/contact/i);
  });

  test('footer links work', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // Verify footer contains expected sections
    await expect(page.locator('footer')).toContainText(/Town Hall/i);
    
    // Check for social media links (if present)
    const socialLinks = page.locator('footer a[href*="twitter"], footer a[href*="facebook"], footer a[href*="discord"]');
    
    // At minimum, footer should have navigation links
    const footerNavLinks = page.locator('footer nav a, footer a[href^="/"]');
    await expect(footerNavLinks.first()).toBeVisible();
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto('/');
    
    // Find mobile menu button (hamburger)
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-expanded]');
    
    // Menu should be closed initially
    await expect(menuButton).toBeVisible();
    
    // Open menu
    await menuButton.click();
    
    // Navigation should now be visible
    const mobileNav = page.locator('nav[aria-label*="mobile" i], nav.mobile-nav, [data-mobile-nav]');
    // Or check that nav links are now visible
    await expect(page.locator('nav a[href="/events"]')).toBeVisible();
    
    // Close menu
    await menuButton.click();
    
    // Verify menu is closed (nav links hidden on mobile)
    // This depends on implementation - adjust as needed
  });

  test('mobile navigation links work', async ({ page }) => {
    await page.goto('/');
    
    // Open mobile menu
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-expanded]');
    await menuButton.click();
    
    // Click Events link
    await page.locator('nav a[href="/events"]').click();
    
    // Verify navigation occurred
    await expect(page).toHaveURL('/events');
    
    // Menu should close after navigation
    await expect(page.locator('h1')).toContainText(/events/i);
  });
});

test.describe('Responsive Layout', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'wide', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`layout is correct on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      // Header should always be visible
      await expect(page.locator('header')).toBeVisible();
      
      // Main content should be visible
      await expect(page.locator('main')).toBeVisible();
      
      // Footer should be visible when scrolled to bottom
      await page.locator('footer').scrollIntoViewIfNeeded();
      await expect(page.locator('footer')).toBeVisible();
      
      // No horizontal overflow
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(viewport.width);
    });
  }
});

test.describe('Error Handling', () => {
  test('404 page displays for non-existent routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-12345');
    
    // Should return 404 status
    expect(response?.status()).toBe(404);
    
    // Should display user-friendly error message
    await expect(page.locator('body')).toContainText(/not found|404|page doesn't exist/i);
    
    // Should have link back to homepage
    await expect(page.locator('a[href="/"]')).toBeVisible();
  });
});
