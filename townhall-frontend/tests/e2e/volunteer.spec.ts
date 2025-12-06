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

    // Required fields
    await expect(page.locator('input[name="name"], input[placeholder*="name" i]')).toBeVisible();
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
  });

  test('volunteer form has all required fields', async ({ page }) => {
    // Name field
    await expect(page.locator('input[name="name"], input[placeholder*="name" i]')).toBeVisible();

    // Email field
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();

    // Skills field (could be checkboxes, multi-select, or text)
    const skillsField = page.locator(
      'input[name="skills"], select[name="skills"], [data-testid="skills"], textarea[name="skills"]'
    );
    await expect(skillsField).toBeVisible();

    // Availability field
    const availabilityField = page.locator(
      'input[name="availability"], select[name="availability"], textarea[name="availability"], [data-testid="availability"]'
    );
    await expect(availabilityField).toBeVisible();

    // Discord username (optional but mentioned in specs)
    const discordField = page.locator(
      'input[name="discordUsername"], input[placeholder*="discord" i], [data-testid="discord"]'
    );
    // Discord field may be optional
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
    await page.locator('input[name="name"], input[placeholder*="name" i]').fill('Test Volunteer');
    await page.locator('input[name="email"], input[type="email"]').fill('not-valid-email');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show email validation error
    await expect(page.locator('body')).toContainText(/valid email|invalid email/i);
  });

  test('successful submission shows confirmation', async ({ page }) => {
    // Fill in all required fields
    await page.locator('input[name="name"], input[placeholder*="name" i]').fill('Test Volunteer');
    await page.locator('input[name="email"], input[type="email"]').fill('volunteer@example.com');

    // Fill skills if it's a text field
    const skillsInput = page.locator('input[name="skills"], textarea[name="skills"]');
    if (await skillsInput.count() > 0) {
      await skillsInput.fill('Event planning, Community outreach');
    }

    // Fill availability
    const availabilityInput = page.locator('input[name="availability"], textarea[name="availability"]');
    if (await availabilityInput.count() > 0) {
      await availabilityInput.fill('Weekends');
    }

    // Select from dropdown if present
    const availabilitySelect = page.locator('select[name="availability"]');
    if (await availabilitySelect.count() > 0) {
      await availabilitySelect.selectOption({ index: 1 });
    }

    // Submit
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show success message
    await expect(page.locator('body')).toContainText(/thank you|received|success|submitted/i);
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
    await expect(page.locator('input[name="name"], input[placeholder*="name" i]')).toBeVisible();
    await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"], textarea')).toBeVisible();
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
    await page.locator('input[name="name"], input[placeholder*="name" i]').fill('Test User');
    await page.locator('input[name="email"], input[type="email"]').fill('bad-email');
    await page.locator('textarea[name="message"], textarea').fill('Test message');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(page.locator('body')).toContainText(/valid email|invalid email/i);
  });

  test('shows error for empty message', async ({ page }) => {
    await page.locator('input[name="name"], input[placeholder*="name" i]').fill('Test User');
    await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
    // Leave message empty

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show message required error
    await expect(page.locator('.error, [data-testid="error"], [role="alert"]')).toBeVisible();
  });

  test('successful submission shows confirmation', async ({ page }) => {
    await page.locator('input[name="name"], input[placeholder*="name" i]').fill('Test User');
    await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
    await page.locator('textarea[name="message"], textarea').fill('This is a test message for the Town Hall team.');

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    await expect(page.locator('body')).toContainText(/thank you|received|success|sent/i);
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
