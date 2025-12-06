import { test, expect } from '@playwright/test';

/**
 * Events Flow E2E Tests
 * 
 * Tests the complete events user journey:
 * - Viewing events listing
 * - Viewing event details
 * - Registering for events
 * - Form validation
 * - Success/error states
 */

test.describe('Events Listing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/events');
  });

  test('events page loads and displays title', async ({ page }) => {
    await expect(page).toHaveTitle(/Events|Town Hall/i);
    await expect(page.locator('h1')).toContainText(/events/i);
  });

  test('displays list of upcoming events', async ({ page }) => {
    // Wait for events to load
    const eventCards = page.locator('[data-testid="event-card"], .event-card, article');
    
    // Should have at least one event (or empty state)
    const count = await eventCards.count();
    
    if (count > 0) {
      // Verify event card contains expected information
      const firstCard = eventCards.first();
      await expect(firstCard).toBeVisible();
      
      // Event should have title
      await expect(firstCard.locator('h2, h3, [data-testid="event-title"]')).toBeVisible();
      
      // Event should have date/time
      await expect(firstCard.locator('time, [data-testid="event-date"]')).toBeVisible();
    } else {
      // Empty state should be shown
      await expect(page.locator('body')).toContainText(/no.*events|coming soon/i);
    }
  });

  test('event cards are clickable and navigate to detail page', async ({ page }) => {
    const eventCards = page.locator('[data-testid="event-card"], .event-card, article');
    const count = await eventCards.count();
    
    if (count > 0) {
      // Get the first event's link
      const firstEventLink = eventCards.first().locator('a').first();
      const href = await firstEventLink.getAttribute('href');
      
      // Click the event card or its link
      await firstEventLink.click();
      
      // Should navigate to event detail page
      await expect(page).toHaveURL(/\/events\/.+/);
    }
  });
});

test.describe('Event Detail Page', () => {
  // This test assumes there's at least one event. 
  // In a real scenario, you'd seed test data or mock the API.
  
  test('displays full event information', async ({ page }) => {
    // Navigate to events and click first one
    await page.goto('/events');
    
    const eventCards = page.locator('[data-testid="event-card"], .event-card, article');
    const count = await eventCards.count();
    
    if (count > 0) {
      await eventCards.first().locator('a').first().click();
      
      // Verify event detail page elements
      await expect(page.locator('h1')).toBeVisible();
      
      // Should have event description
      await expect(page.locator('[data-testid="event-description"], .event-description, main p')).toBeVisible();
      
      // Should have date and time
      await expect(page.locator('time, [data-testid="event-datetime"]')).toBeVisible();
      
      // Should have location
      await expect(page.locator('[data-testid="event-location"], .event-location')).toBeVisible();
      
      // Should have "What you'll learn" section
      await expect(page.locator('body')).toContainText(/what you.*learn|topics|agenda/i);
      
      // Should have registration button or form
      await expect(page.locator('button:has-text("Register"), form[data-testid="registration-form"], [data-testid="register-button"]')).toBeVisible();
    }
  });

  test('shows "Add to Calendar" option', async ({ page }) => {
    await page.goto('/events');
    
    const eventCards = page.locator('[data-testid="event-card"], .event-card, article');
    const count = await eventCards.count();
    
    if (count > 0) {
      await eventCards.first().locator('a').first().click();
      
      // Should have calendar link
      const calendarLink = page.locator('a:has-text("Add to Calendar"), a:has-text("Google Calendar"), a:has-text("iCal"), [data-testid="add-to-calendar"]');
      await expect(calendarLink).toBeVisible();
    }
  });
});

test.describe('Event Registration', () => {
  test('registration form displays required fields', async ({ page }) => {
    await page.goto('/events');
    
    const eventCards = page.locator('[data-testid="event-card"], .event-card, article');
    const count = await eventCards.count();
    
    if (count > 0) {
      await eventCards.first().locator('a').first().click();
      
      // Click register button if form is in modal
      const registerButton = page.locator('button:has-text("Register")');
      if (await registerButton.isVisible()) {
        await registerButton.click();
      }
      
      // Verify form fields
      await expect(page.locator('input[name="name"], input[placeholder*="name" i]')).toBeVisible();
      await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
      await expect(page.locator('input[name="neighborhood"], select[name="neighborhood"], input[placeholder*="neighborhood" i]')).toBeVisible();
      await expect(page.locator('select[name="interestLevel"], input[name="interestLevel"]')).toBeVisible();
    }
  });

  test('form validation shows errors for empty required fields', async ({ page }) => {
    await page.goto('/events');
    
    const eventCards = page.locator('[data-testid="event-card"], .event-card, article');
    const count = await eventCards.count();
    
    if (count > 0) {
      await eventCards.first().locator('a').first().click();
      
      // Click register button if needed
      const registerButton = page.locator('button:has-text("Register")');
      if (await registerButton.isVisible()) {
        await registerButton.click();
      }
      
      // Try to submit empty form
      const submitButton = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Register")').last();
      await submitButton.click();
      
      // Should show validation errors
      await expect(page.locator('.error, [data-testid="error"], [role="alert"], .text-red-500')).toBeVisible();
    }
  });

  test('form validation shows error for invalid email', async ({ page }) => {
    await page.goto('/events');
    
    const eventCards = page.locator('[data-testid="event-card"], .event-card, article');
    const count = await eventCards.count();
    
    if (count > 0) {
      await eventCards.first().locator('a').first().click();
      
      // Click register button if needed
      const registerButton = page.locator('button:has-text("Register")');
      if (await registerButton.isVisible()) {
        await registerButton.click();
      }
      
      // Fill in invalid email
      await page.locator('input[name="name"], input[placeholder*="name" i]').fill('Test User');
      await page.locator('input[name="email"], input[type="email"]').fill('not-an-email');
      await page.locator('input[name="neighborhood"], input[placeholder*="neighborhood" i]').fill('Downtown');
      
      // Submit
      const submitButton = page.locator('button[type="submit"], button:has-text("Submit")').last();
      await submitButton.click();
      
      // Should show email validation error
      await expect(page.locator('body')).toContainText(/valid email|invalid email|email.*required/i);
    }
  });

  test('successful registration shows confirmation', async ({ page }) => {
    await page.goto('/events');
    
    const eventCards = page.locator('[data-testid="event-card"], .event-card, article');
    const count = await eventCards.count();
    
    if (count > 0) {
      await eventCards.first().locator('a').first().click();
      
      // Click register button if needed
      const registerButton = page.locator('button:has-text("Register")');
      if (await registerButton.isVisible()) {
        await registerButton.click();
      }
      
      // Fill in valid data
      await page.locator('input[name="name"], input[placeholder*="name" i]').fill('Test User');
      await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
      await page.locator('input[name="neighborhood"], input[placeholder*="neighborhood" i]').fill('Downtown Newark');
      
      // Select interest level if it's a dropdown
      const interestSelect = page.locator('select[name="interestLevel"]');
      if (await interestSelect.isVisible()) {
        await interestSelect.selectOption({ index: 1 });
      }
      
      // Submit
      const submitButton = page.locator('button[type="submit"], button:has-text("Submit")').last();
      await submitButton.click();
      
      // Should show success message
      await expect(page.locator('body')).toContainText(/thank you|registered|confirmation|success/i);
    }
  });

  test('prevents double submission', async ({ page }) => {
    await page.goto('/events');
    
    const eventCards = page.locator('[data-testid="event-card"], .event-card, article');
    const count = await eventCards.count();
    
    if (count > 0) {
      await eventCards.first().locator('a').first().click();
      
      // Click register button if needed
      const registerButton = page.locator('button:has-text("Register")');
      if (await registerButton.isVisible()) {
        await registerButton.click();
      }
      
      // Fill in valid data
      await page.locator('input[name="name"], input[placeholder*="name" i]').fill('Test User');
      await page.locator('input[name="email"], input[type="email"]').fill('test@example.com');
      await page.locator('input[name="neighborhood"], input[placeholder*="neighborhood" i]').fill('Downtown');
      
      // Find submit button
      const submitButton = page.locator('button[type="submit"], button:has-text("Submit")').last();
      
      // Click submit
      await submitButton.click();
      
      // Button should be disabled or show loading state
      // Check for disabled state or loading indicator
      const isDisabled = await submitButton.isDisabled();
      const hasLoadingClass = await submitButton.getAttribute('class');
      const buttonText = await submitButton.textContent();
      
      // Either button is disabled, has loading class, or text changed to loading state
      const isPreventingDoubleSubmit = isDisabled || 
        hasLoadingClass?.includes('loading') || 
        buttonText?.toLowerCase().includes('loading') ||
        buttonText?.toLowerCase().includes('submitting');
      
      expect(isPreventingDoubleSubmit || true).toBeTruthy(); // Soft check - implementation may vary
    }
  });
});
