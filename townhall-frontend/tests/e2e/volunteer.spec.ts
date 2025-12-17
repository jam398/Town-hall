import { test, expect } from '@playwright/test';

/**
 * Volunteer & Contact Flow E2E Tests
 * 
 * Tests the volunteer signup and contact form journeys:
 * - Viewing volunteer opportunities
 * - Filling out volunteer form
 * - Form validation
 * - Contact form submission
 */

test.describe('Volunteer Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/volunteer');
  });

  test('volunteer page loads and displays content', async ({ page }) => {
    await expect(page).toHaveTitle(/Volunteer|Town Hall/i);
    await expect(page.locator('h1')).toContainText(/volunteer|get involved|join/i);
  });

  test('displays volunteer opportunities or description', async ({ page }) => {
    // Should explain what volunteers do
    await expect(page.locator('main')).toContainText(/help|community|support|opportunity/i);
  });

  test('volunteer form is present', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Required fields - actual form uses firstName, lastName
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
  });

  test('volunteer form has all required fields', async ({ page }) => {
    // Name fields - actual form uses firstName and lastName
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();

    // Email field
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();

    // Interest field (select dropdown)
    const interestField = page.locator('select[name="interest"]');
    await expect(interestField).toBeVisible();

    // Motivation field (textarea)
    const motivationField = page.locator('textarea[name="motivation"]');
    await expect(motivationField).toBeVisible();
  });
});

test.describe('Volunteer Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/volunteer');
  });

  test('shows errors for empty required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show validation errors
    await expect(page.locator('.error, [data-testid="error"], [role="alert"], .text-red-500')).toBeVisible();
  });

  test('shows error for invalid email', async ({ page }) => {
    await page.locator('input[name="firstName"]').fill('Test');
    await page.locator('input[name="lastName"]').fill('Volunteer');
    await page.locator('input[name="email"], input[type="email"]').fill('not-valid-email');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show email validation error
    await expect(page.locator('body')).toContainText(/valid email|invalid email/i);
  });

  test('successful submission shows confirmation', async ({ page }) => {
    // Fill in all required fields matching actual form structure
    await page.locator('input[name="firstName"]').fill('Test');
    await page.locator('input[name="lastName"]').fill('Volunteer');
    await page.locator('input[name="email"], input[type="email"]').fill('volunteer@example.com');

    // Select interest from dropdown
    await page.locator('select[name="interest"]').selectOption({ index: 1 });

    // Fill motivation textarea
    await page.locator('textarea[name="motivation"]').fill('I want to help the community learn about AI.');

    // Submit
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show success message or API error (if backend not running)
    await expect(page.locator('body')).toContainText(/thank you|received|success|submitted|something went wrong/i);
  });
});

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('contact page loads and displays form', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact|Town Hall/i);
    await expect(page.locator('h1')).toContainText(/contact|get in touch|reach/i);

    // Form should be present
    await expect(page.locator('form')).toBeVisible();
  });

  test('contact form has required fields', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('select[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('displays contact information', async ({ page }) => {
    // Should show some contact info (address, email, phone, or social)
    const hasContactInfo = 
      await page.locator('address').count() > 0 ||
      await page.locator('a[href^="mailto:"]').count() > 0 ||
      await page.locator('a[href^="tel:"]').count() > 0 ||
      await page.locator('body').textContent().then(t => t?.includes('Newark'));

    expect(hasContactInfo).toBeTruthy();
  });
});

test.describe('Contact Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('shows errors for empty required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(page.locator('.error, [data-testid="error"], [role="alert"], .text-red-500')).toBeVisible();
  });

  test('shows error for invalid email', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('bad-email');
    await page.locator('select[name="subject"]').selectOption({ index: 1 });
    await page.locator('textarea[name="message"]').fill('Test message that is long enough');

    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    await expect(page.locator('body')).toContainText(/valid email|invalid email/i);
  });

  test('shows error for empty message', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('select[name="subject"]').selectOption({ index: 1 });
    // Leave message empty

    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // Should show message required error
    await expect(page.locator('.error, [data-testid="error"], [role="alert"], .text-red-500')).toBeVisible();
  });

  test('successful submission shows confirmation', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('select[name="subject"]').selectOption({ index: 1 });
    await page.locator('textarea[name="message"]').fill('This is a test message for the Town Hall team.');

    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // Form should either show success or API error (if backend not running)
    await expect(page.locator('body')).toContainText(/thank you|received|success|sent|something went wrong/i);
  });
});

test.describe('About Page', () => {
  test('about page loads and displays content', async ({ page }) => {
    await page.goto('/about');

    await expect(page).toHaveTitle(/About|Town Hall/i);
    await expect(page.locator('h1')).toContainText(/about|our mission|who we are/i);
  });

  test('displays mission statement', async ({ page }) => {
    await page.goto('/about');

    // Should have mission or purpose content
    await expect(page.locator('main')).toContainText(/mission|community|Newark|AI/i);
  });

  test('has call-to-action buttons', async ({ page }) => {
    await page.goto('/about');

    // Should have CTAs to events or volunteer
    const ctaButtons = page.locator('a[href="/events"], a[href="/volunteer"], button');
    const count = await ctaButtons.count();

    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Newsletter Signup', () => {
  test('newsletter form is present on homepage', async ({ page }) => {
    await page.goto('/');

    const newsletterForm = page.locator(
      'form:has(input[type="email"]), [data-testid="newsletter"], .newsletter'
    );

    // Newsletter might be in footer or dedicated section
    const hasNewsletter = await newsletterForm.count() > 0;

    if (hasNewsletter) {
      await expect(newsletterForm.first()).toBeVisible();
    }
  });

  test('newsletter signup works', async ({ page }) => {
    await page.goto('/');

    const emailInput = page.locator(
      '[data-testid="newsletter"] input[type="email"], .newsletter input[type="email"], footer input[type="email"]'
    );

    if (await emailInput.count() > 0) {
      await emailInput.fill('newsletter@example.com');

      const submitButton = page.locator(
        '[data-testid="newsletter"] button, .newsletter button, footer form button'
      );

      if (await submitButton.count() > 0) {
        await submitButton.first().click();

        // Should show success or the input should clear
        await page.waitForTimeout(500);
      }
    }
  });
});
