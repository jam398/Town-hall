/**
 * Test Helpers
 * 
 * Reusable test utility functions.
 */

import { Page, expect } from '@playwright/test';

/**
 * Wait for page to be fully loaded
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Fill a form field by label
 */
export async function fillField(page: Page, label: string, value: string) {
  const field = page.getByLabel(label, { exact: false });
  await field.fill(value);
}

/**
 * Submit a form and wait for response
 */
export async function submitForm(page: Page, buttonText: string = 'Submit') {
  const button = page.getByRole('button', { name: buttonText });
  await button.click();
  await page.waitForLoadState('networkidle');
}

/**
 * Check if element is visible and contains text
 */
export async function expectTextVisible(page: Page, text: string) {
  await expect(page.getByText(text)).toBeVisible();
}

/**
 * Navigate and wait for page load
 */
export async function navigateTo(page: Page, path: string) {
  await page.goto(path);
  await waitForPageLoad(page);
}

/**
 * Check page title
 */
export async function expectPageTitle(page: Page, title: string) {
  await expect(page).toHaveTitle(new RegExp(title, 'i'));
}

/**
 * Check heading exists
 */
export async function expectHeading(page: Page, text: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 1) {
  await expect(page.getByRole('heading', { level, name: text })).toBeVisible();
}

/**
 * Fill registration form
 */
export async function fillRegistrationForm(
  page: Page,
  data: { firstName: string; lastName: string; email: string; phone?: string }
) {
  await page.getByTestId('first-name-input').fill(data.firstName);
  await page.getByTestId('last-name-input').fill(data.lastName);
  await page.getByTestId('email-input').fill(data.email);
  if (data.phone) {
    await page.getByTestId('phone-input').fill(data.phone);
  }
}

/**
 * Fill volunteer form
 */
export async function fillVolunteerForm(
  page: Page,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    interest: string;
    availability?: string;
    experience?: string;
    motivation: string;
  }
) {
  await page.getByTestId('first-name-input').fill(data.firstName);
  await page.getByTestId('last-name-input').fill(data.lastName);
  await page.getByTestId('email-input').fill(data.email);
  if (data.phone) {
    await page.getByTestId('phone-input').fill(data.phone);
  }
  await page.getByTestId('interest-select').selectOption(data.interest);
  if (data.availability) {
    await page.getByTestId('availability-select').selectOption(data.availability);
  }
  if (data.experience) {
    await page.getByTestId('experience-textarea').fill(data.experience);
  }
  await page.getByTestId('motivation-textarea').fill(data.motivation);
}

/**
 * Fill contact form
 */
export async function fillContactForm(
  page: Page,
  data: { name: string; email: string; subject: string; message: string }
) {
  await page.getByTestId('name-input').fill(data.name);
  await page.getByTestId('email-input').fill(data.email);
  await page.getByTestId('subject-select').selectOption(data.subject);
  await page.getByTestId('message-textarea').fill(data.message);
}

/**
 * Check for accessibility violations using axe
 */
export async function checkAccessibility(page: Page) {
  const AxeBuilder = (await import('@axe-core/playwright')).default;
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  return results;
}

/**
 * Take screenshot with consistent naming
 */
export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
}

/**
 * Check navigation links work
 */
export async function checkNavLinks(page: Page, links: { href: string; label: string }[]) {
  for (const link of links) {
    const navLink = page.getByRole('link', { name: link.label });
    await expect(navLink).toBeVisible();
    await expect(navLink).toHaveAttribute('href', link.href);
  }
}

/**
 * Check mobile menu functionality
 */
export async function checkMobileMenu(page: Page) {
  // Open menu
  const menuButton = page.getByRole('button', { name: /menu/i });
  await menuButton.click();
  
  // Check menu is visible
  const mobileNav = page.locator('#mobile-menu');
  await expect(mobileNav).toBeVisible();
  
  // Close menu
  await menuButton.click();
  await expect(mobileNav).not.toBeVisible();
}

/**
 * Mock API response
 */
export async function mockApiResponse(
  page: Page,
  endpoint: string,
  response: any,
  status: number = 200
) {
  await page.route(`**/api${endpoint}`, async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

/**
 * Wait for animation to complete
 */
export async function waitForAnimation(page: Page, selector: string) {
  const element = page.locator(selector);
  await element.evaluate((el) => {
    return new Promise((resolve) => {
      const animations = el.getAnimations();
      if (animations.length === 0) {
        resolve(true);
        return;
      }
      Promise.all(animations.map((a) => a.finished)).then(() => resolve(true));
    });
  });
}
