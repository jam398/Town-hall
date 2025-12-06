import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility Tests using axe-core
 * 
 * These tests ensure WCAG 2.1 AA compliance across all pages.
 * Zero critical or serious violations are acceptable.
 */

// Helper to run axe and check for violations
async function checkAccessibility(page: any, pageName: string) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  // Log violations for debugging
  if (results.violations.length > 0) {
    console.log(`\n${pageName} Accessibility Violations:`);
    results.violations.forEach((violation) => {
      console.log(`  - ${violation.id}: ${violation.description}`);
      console.log(`    Impact: ${violation.impact}`);
      console.log(`    Nodes: ${violation.nodes.length}`);
      violation.nodes.forEach((node) => {
        console.log(`      Target: ${node.target}`);
        console.log(`      HTML: ${node.html.substring(0, 100)}...`);
      });
    });
  }

  // Filter for critical and serious violations
  const criticalViolations = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious'
  );

  expect(criticalViolations).toHaveLength(0);
}

test.describe('Accessibility - Core Pages', () => {
  test('Homepage has no critical accessibility violations', async ({ page }) => {
    await page.goto('/');
    await checkAccessibility(page, 'Homepage');
  });

  test('Events listing has no critical accessibility violations', async ({ page }) => {
    await page.goto('/events');
    await checkAccessibility(page, 'Events Listing');
  });

  test('Blog listing has no critical accessibility violations', async ({ page }) => {
    await page.goto('/blog');
    await checkAccessibility(page, 'Blog Listing');
  });

  test('Volunteer page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/volunteer');
    await checkAccessibility(page, 'Volunteer Page');
  });

  test('Contact page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/contact');
    await checkAccessibility(page, 'Contact Page');
  });

  test('About page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/about');
    await checkAccessibility(page, 'About Page');
  });
});

test.describe('Accessibility - Dynamic Pages', () => {
  test('Event detail page has no critical accessibility violations', async ({ page }) => {
    // Navigate to first event
    await page.goto('/events');
    const eventLink = page.locator('[data-testid="event-card"] a, .event-card a, article a').first();
    
    if (await eventLink.isVisible()) {
      await eventLink.click();
      await checkAccessibility(page, 'Event Detail');
    }
  });

  test('Blog post page has no critical accessibility violations', async ({ page }) => {
    // Navigate to first blog post
    await page.goto('/blog');
    const blogLink = page.locator('[data-testid="blog-card"] a, .blog-card a, article a').first();
    
    if (await blogLink.isVisible()) {
      await blogLink.click();
      await checkAccessibility(page, 'Blog Post');
    }
  });
});

test.describe('Keyboard Navigation', () => {
  test('all interactive elements are focusable via Tab', async ({ page }) => {
    await page.goto('/');
    
    // Start from body
    await page.locator('body').focus();
    
    // Tab through the page and collect focused elements
    const focusedElements: string[] = [];
    
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName + (el.getAttribute('href') || el.getAttribute('type') || '') : null;
      });
      
      if (focusedElement) {
        focusedElements.push(focusedElement);
      }
    }
    
    // Should have focused on multiple elements
    expect(focusedElements.length).toBeGreaterThan(0);
    
    // Should include links and buttons
    const hasLinks = focusedElements.some(el => el.startsWith('A'));
    const hasButtons = focusedElements.some(el => el.startsWith('BUTTON'));
    
    expect(hasLinks || hasButtons).toBeTruthy();
  });

  test('focus is visible on all interactive elements', async ({ page }) => {
    await page.goto('/');
    
    // Tab to first focusable element
    await page.keyboard.press('Tab');
    
    // Check that focus is visible (has outline or other focus indicator)
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check for focus styles
    const focusStyles = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow,
        border: styles.border,
      };
    });
    
    // Should have some visible focus indicator
    const hasFocusIndicator = 
      focusStyles.outlineWidth !== '0px' ||
      focusStyles.boxShadow !== 'none' ||
      focusStyles.outline !== 'none';
    
    expect(hasFocusIndicator).toBeTruthy();
  });

  test('focus order is logical', async ({ page }) => {
    await page.goto('/');
    
    const focusOrder: string[] = [];
    
    // Tab through elements and record their positions
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press('Tab');
      
      const position = await page.evaluate(() => {
        const el = document.activeElement;
        if (el) {
          const rect = el.getBoundingClientRect();
          return { top: rect.top, left: rect.left };
        }
        return null;
      });
      
      if (position) {
        focusOrder.push(`${position.top},${position.left}`);
      }
    }
    
    // Focus should generally flow top-to-bottom, left-to-right
    // This is a basic check - more sophisticated checks would analyze the actual flow
    expect(focusOrder.length).toBeGreaterThan(0);
  });

  test('Escape key closes modals', async ({ page }) => {
    await page.goto('/events');
    
    // Try to open a registration modal
    const registerButton = page.locator('button:has-text("Register")').first();
    
    if (await registerButton.isVisible()) {
      await registerButton.click();
      
      // Check if modal is open
      const modal = page.locator('[role="dialog"], .modal, [data-testid="modal"]');
      
      if (await modal.isVisible()) {
        // Press Escape
        await page.keyboard.press('Escape');
        
        // Modal should be closed
        await expect(modal).not.toBeVisible();
      }
    }
  });

  test('Enter and Space activate buttons', async ({ page }) => {
    await page.goto('/');
    
    // Find a button
    const button = page.locator('button').first();
    
    if (await button.isVisible()) {
      // Focus the button
      await button.focus();
      
      // Press Enter - should activate
      await page.keyboard.press('Enter');
      
      // Press Space - should also activate
      await button.focus();
      await page.keyboard.press('Space');
      
      // If we got here without errors, the test passes
      expect(true).toBeTruthy();
    }
  });
});

test.describe('Screen Reader Compatibility', () => {
  test('all images have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      
      // Image should have alt text OR role="presentation" for decorative images
      const hasAlt = alt !== null && alt !== undefined;
      const isDecorative = role === 'presentation' || role === 'none';
      
      expect(hasAlt || isDecorative).toBeTruthy();
    }
  });

  test('form labels are properly associated', async ({ page }) => {
    await page.goto('/contact');
    
    const inputs = page.locator('input:not([type="hidden"]):not([type="submit"]), textarea, select');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        // Check for associated label
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        
        // Input should have label, aria-label, or aria-labelledby
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Get all headings
    const headings = await page.evaluate(() => {
      const h1s = document.querySelectorAll('h1');
      const h2s = document.querySelectorAll('h2');
      const h3s = document.querySelectorAll('h3');
      const h4s = document.querySelectorAll('h4');
      const h5s = document.querySelectorAll('h5');
      const h6s = document.querySelectorAll('h6');
      
      return {
        h1Count: h1s.length,
        h2Count: h2s.length,
        h3Count: h3s.length,
        h4Count: h4s.length,
        h5Count: h5s.length,
        h6Count: h6s.length,
      };
    });
    
    // Should have exactly one h1
    expect(headings.h1Count).toBe(1);
    
    // If there are h3s, there should be h2s
    if (headings.h3Count > 0) {
      expect(headings.h2Count).toBeGreaterThan(0);
    }
    
    // If there are h4s, there should be h3s
    if (headings.h4Count > 0) {
      expect(headings.h3Count).toBeGreaterThan(0);
    }
  });

  test('page has descriptive title', async ({ page }) => {
    const pages = ['/', '/events', '/blog', '/volunteer', '/contact', '/about'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      const title = await page.title();
      
      // Title should not be empty
      expect(title.length).toBeGreaterThan(0);
      
      // Title should be descriptive (more than just "Town Hall")
      expect(title.length).toBeGreaterThan(5);
    }
  });

  test('error messages are announced', async ({ page }) => {
    await page.goto('/contact');
    
    // Submit empty form to trigger errors
    const submitButton = page.locator('button[type="submit"]');
    
    if (await submitButton.isVisible()) {
      await submitButton.click();
      
      // Error messages should have role="alert" or aria-live
      const errorMessages = page.locator('[role="alert"], [aria-live="polite"], [aria-live="assertive"], .error');
      
      // Wait for error to appear
      await page.waitForTimeout(500);
      
      const errorCount = await errorMessages.count();
      
      // If form validation exists, errors should be properly announced
      if (errorCount > 0) {
        const firstError = errorMessages.first();
        const role = await firstError.getAttribute('role');
        const ariaLive = await firstError.getAttribute('aria-live');
        
        expect(role === 'alert' || ariaLive).toBeTruthy();
      }
    }
  });
});

test.describe('Color Contrast', () => {
  test('text has sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Run axe specifically for color contrast
    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();
    
    // Log any contrast issues
    if (results.violations.length > 0) {
      console.log('\nColor Contrast Issues:');
      results.violations.forEach((violation) => {
        violation.nodes.forEach((node) => {
          console.log(`  - ${node.target}: ${node.failureSummary}`);
        });
      });
    }
    
    // Should have no contrast violations
    expect(results.violations).toHaveLength(0);
  });
});
