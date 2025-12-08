import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('displays about page with all sections', async ({ page }) => {
    // Check hero section
    await expect(page.getByRole('heading', { level: 1, name: /about town hall/i })).toBeVisible();
    await expect(page.getByText(/our story/i)).toBeVisible();

    // Check mission section
    await expect(page.getByRole('heading', { name: /our mission/i })).toBeVisible();
    await expect(page.getByText(/democratize ai education/i)).toBeVisible();

    // Check values section
    await expect(page.getByRole('heading', { name: /our values/i })).toBeVisible();
    await expect(page.getByText(/accessibility/i)).toBeVisible();
    await expect(page.getByText(/community/i)).toBeVisible();
    await expect(page.getByText(/transparency/i)).toBeVisible();
    await expect(page.getByText(/empowerment/i)).toBeVisible();

    // Check team section
    await expect(page.getByRole('heading', { name: /our team/i })).toBeVisible();

    // Check journey/timeline section
    await expect(page.getByRole('heading', { name: /our journey/i })).toBeVisible();

    // Check CTA section
    await expect(page.getByRole('heading', { name: /join our community/i })).toBeVisible();
  });

  test('displays team members', async ({ page }) => {
    // Check for team member names
    await expect(page.getByText(/marcus johnson/i)).toBeVisible();
    await expect(page.getByText(/dr\. sarah chen/i)).toBeVisible();
    await expect(page.getByText(/james rodriguez/i)).toBeVisible();
    await expect(page.getByText(/aisha williams/i)).toBeVisible();

    // Check for roles
    await expect(page.getByText(/founder & director/i)).toBeVisible();
    await expect(page.getByText(/education lead/i)).toBeVisible();
    await expect(page.getByText(/community manager/i)).toBeVisible();
    await expect(page.getByText(/programs coordinator/i)).toBeVisible();
  });

  test('displays timeline milestones', async ({ page }) => {
    // Check for milestone years
    await expect(page.getByText('2023').first()).toBeVisible();
    await expect(page.getByText('2024').first()).toBeVisible();
    await expect(page.getByText('2025').first()).toBeVisible();

    // Check for milestone events
    await expect(page.getByText(/town hall founded/i)).toBeVisible();
    await expect(page.getByText(/discord community/i)).toBeVisible();
  });

  test('CTA buttons link to correct pages', async ({ page }) => {
    // Check Upcoming Events link
    const eventsLink = page.getByRole('link', { name: /upcoming events/i });
    await expect(eventsLink).toBeVisible();
    await expect(eventsLink).toHaveAttribute('href', '/events');

    // Check Volunteer link
    const volunteerLink = page.getByRole('link', { name: /become a volunteer/i });
    await expect(volunteerLink).toBeVisible();
    await expect(volunteerLink).toHaveAttribute('href', '/volunteer');
  });

  test('navigates to events page from CTA', async ({ page }) => {
    await page.getByRole('link', { name: /upcoming events/i }).click();
    await expect(page).toHaveURL(/\/events/);
  });

  test('navigates to volunteer page from CTA', async ({ page }) => {
    await page.getByRole('link', { name: /become a volunteer/i }).click();
    await expect(page).toHaveURL(/\/volunteer/);
  });

  test('values section has icons', async ({ page }) => {
    // Check that value cards have icons (SVG elements)
    const valuesSection = page.locator('section').filter({ hasText: /our values/i });
    const icons = valuesSection.locator('svg');
    await expect(icons).toHaveCount(4);
  });

  test('team members have avatar initials', async ({ page }) => {
    // Check for avatar with initials
    await expect(page.getByText('MJ')).toBeVisible(); // Marcus Johnson
    await expect(page.getByText('SC')).toBeVisible(); // Sarah Chen
    await expect(page.getByText('JR')).toBeVisible(); // James Rodriguez
    await expect(page.getByText('AW')).toBeVisible(); // Aisha Williams
  });
});

test.describe('About Page - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('displays correctly on mobile', async ({ page }) => {
    await page.goto('/about');

    // Check main elements are visible
    await expect(page.getByRole('heading', { level: 1, name: /about town hall/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /our mission/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /our values/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /our team/i })).toBeVisible();
  });

  test('team cards stack vertically on mobile', async ({ page }) => {
    await page.goto('/about');

    // Get team section
    const teamSection = page.locator('section').filter({ hasText: /our team/i });
    
    // Team cards should be visible
    const teamCards = teamSection.locator('.bg-white.border-2');
    await expect(teamCards.first()).toBeVisible();
  });
});

test.describe('About Page - Accessibility', () => {
  test('has proper heading hierarchy', async ({ page }) => {
    await page.goto('/about');

    // Check h1 exists
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveCount(1);

    // Check h2 headings exist for sections
    const h2s = page.getByRole('heading', { level: 2 });
    expect(await h2s.count()).toBeGreaterThanOrEqual(4);
  });

  test('images have alt text or are decorative', async ({ page }) => {
    await page.goto('/about');

    // Check that any images have alt text
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');
      
      // Image should have alt text or be marked as decorative
      expect(alt !== null || ariaHidden === 'true').toBeTruthy();
    }
  });

  test('links have descriptive text', async ({ page }) => {
    await page.goto('/about');

    // Check that links don't just say "click here"
    const links = page.getByRole('link');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      expect(text?.toLowerCase()).not.toBe('click here');
      expect(text?.toLowerCase()).not.toBe('here');
    }
  });
});
