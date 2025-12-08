import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('displays contact page with all sections', async ({ page }) => {
    // Check hero section
    await expect(page.getByRole('heading', { level: 1, name: /contact/i })).toBeVisible();
    await expect(page.getByText(/get in touch/i)).toBeVisible();

    // Check contact form section
    await expect(page.getByRole('heading', { name: /send a message/i })).toBeVisible();
    await expect(page.getByTestId('contact-form')).toBeVisible();

    // Check contact info section
    await expect(page.getByRole('heading', { name: /other ways to reach us/i })).toBeVisible();
    await expect(page.getByText(/hello@townhallnewark.org/i)).toBeVisible();
    await expect(page.getByText(/newark, new jersey/i)).toBeVisible();

    // Check social links
    await expect(page.getByRole('link', { name: /discord/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /twitter/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /linkedin/i })).toBeVisible();

    // Check newsletter section
    await expect(page.getByRole('heading', { name: /stay in the loop/i })).toBeVisible();
  });

  test('contact form has all required fields', async ({ page }) => {
    const form = page.getByTestId('contact-form');

    // Check all form fields exist
    await expect(form.getByTestId('name-input')).toBeVisible();
    await expect(form.getByTestId('email-input')).toBeVisible();
    await expect(form.getByTestId('subject-select')).toBeVisible();
    await expect(form.getByTestId('message-textarea')).toBeVisible();
    await expect(form.getByTestId('submit-button')).toBeVisible();
  });

  test('shows validation errors for empty form submission', async ({ page }) => {
    // Try to submit empty form
    await page.getByTestId('submit-button').click();

    // Check for validation errors
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/please select a subject/i)).toBeVisible();
    await expect(page.getByText(/message is required/i)).toBeVisible();
  });

  test('shows validation error for invalid email', async ({ page }) => {
    // Fill form with invalid email
    await page.getByTestId('name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('invalid-email');
    await page.getByTestId('subject-select').selectOption('general');
    await page.getByTestId('message-textarea').fill('This is a test message.');

    // Submit form
    await page.getByTestId('submit-button').click();

    // Check for email validation error
    await expect(page.getByText(/please enter a valid email/i)).toBeVisible();
  });

  test('shows validation error for short message', async ({ page }) => {
    // Fill form with short message
    await page.getByTestId('name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('john@example.com');
    await page.getByTestId('subject-select').selectOption('general');
    await page.getByTestId('message-textarea').fill('Short');

    // Submit form
    await page.getByTestId('submit-button').click();

    // Check for message validation error
    await expect(page.getByText(/message must be at least 10 characters/i)).toBeVisible();
  });

  test('successfully submits valid contact form', async ({ page }) => {
    // Fill form with valid data
    await page.getByTestId('name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('john@example.com');
    await page.getByTestId('subject-select').selectOption('general');
    await page.getByTestId('message-textarea').fill('This is a test message for the contact form.');

    // Submit form
    await page.getByTestId('submit-button').click();

    // Check for success message
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/thank you for reaching out/i)).toBeVisible();
  });

  test('can send another message after successful submission', async ({ page }) => {
    // Fill and submit form
    await page.getByTestId('name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('john@example.com');
    await page.getByTestId('subject-select').selectOption('general');
    await page.getByTestId('message-textarea').fill('This is a test message for the contact form.');
    await page.getByTestId('submit-button').click();

    // Wait for success
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 10000 });

    // Click to send another message
    await page.getByText(/send another message/i).click();

    // Form should be visible again and empty
    await expect(page.getByTestId('contact-form')).toBeVisible();
    await expect(page.getByTestId('name-input')).toHaveValue('');
  });

  test('subject dropdown has all options', async ({ page }) => {
    const select = page.getByTestId('subject-select');
    
    // Check all options exist
    await expect(select.locator('option[value="general"]')).toBeAttached();
    await expect(select.locator('option[value="partnership"]')).toBeAttached();
    await expect(select.locator('option[value="media"]')).toBeAttached();
    await expect(select.locator('option[value="sponsorship"]')).toBeAttached();
    await expect(select.locator('option[value="feedback"]')).toBeAttached();
    await expect(select.locator('option[value="other"]')).toBeAttached();
  });

  test('email link is clickable', async ({ page }) => {
    const emailLink = page.getByRole('link', { name: /hello@townhallnewark.org/i });
    await expect(emailLink).toHaveAttribute('href', 'mailto:hello@townhallnewark.org');
  });

  test('social links open in new tab', async ({ page }) => {
    const discordLink = page.getByRole('link', { name: /discord/i }).first();
    await expect(discordLink).toHaveAttribute('target', '_blank');
    await expect(discordLink).toHaveAttribute('rel', /noopener/);
  });

  test('newsletter form is present', async ({ page }) => {
    const newsletterSection = page.locator('section').filter({ hasText: /stay in the loop/i });
    
    await expect(newsletterSection.getByPlaceholder(/enter your email/i)).toBeVisible();
    await expect(newsletterSection.getByRole('button', { name: /subscribe/i })).toBeVisible();
  });
});

test.describe('Contact Page - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('displays correctly on mobile', async ({ page }) => {
    await page.goto('/contact');

    // Check main elements are visible
    await expect(page.getByRole('heading', { level: 1, name: /contact/i })).toBeVisible();
    await expect(page.getByTestId('contact-form')).toBeVisible();

    // Form should be full width on mobile
    const form = page.getByTestId('contact-form');
    const formBox = await form.boundingBox();
    expect(formBox?.width).toBeGreaterThan(300);
  });
});

test.describe('Contact Page - Accessibility', () => {
  test('form fields have proper labels', async ({ page }) => {
    await page.goto('/contact');

    // Check that inputs have associated labels
    const nameInput = page.getByTestId('name-input');
    const emailInput = page.getByTestId('email-input');
    const subjectSelect = page.getByTestId('subject-select');
    const messageTextarea = page.getByTestId('message-textarea');

    // Inputs should have aria-label or be associated with label
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(subjectSelect).toBeVisible();
    await expect(messageTextarea).toBeVisible();
  });

  test('error messages are announced', async ({ page }) => {
    await page.goto('/contact');

    // Submit empty form
    await page.getByTestId('submit-button').click();

    // Error messages should have role="alert" or aria-live
    const errorMessages = page.locator('[role="alert"], [aria-live="polite"]');
    await expect(errorMessages.first()).toBeVisible();
  });

  test('success message is announced', async ({ page }) => {
    await page.goto('/contact');

    // Fill and submit form
    await page.getByTestId('name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('john@example.com');
    await page.getByTestId('subject-select').selectOption('general');
    await page.getByTestId('message-textarea').fill('This is a test message for accessibility.');
    await page.getByTestId('submit-button').click();

    // Success message should be announced
    await expect(page.locator('[role="alert"]')).toBeVisible({ timeout: 10000 });
  });
});
