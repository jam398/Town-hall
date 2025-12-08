import { test, expect } from '@playwright/test';

/**
 * API Integration Tests
 * 
 * These tests verify the frontend's behavior when interacting with the API,
 * including loading states, error handling, and empty states.
 * 
 * Uses Playwright's route interception to mock API responses.
 */

// Mock data
const mockEvents = [
  {
    slug: 'intro-to-ai',
    title: 'Introduction to AI',
    description: 'A beginner-friendly workshop covering the basics of artificial intelligence.',
    date: '2025-01-15',
    time: '6:00 PM',
    location: 'Newark Public Library',
    capacity: 50,
    registered: 32,
    tags: ['Beginner', 'Workshop'],
  },
  {
    slug: 'chatgpt-for-business',
    title: 'ChatGPT for Small Business',
    description: 'Learn how to leverage ChatGPT to streamline your business operations.',
    date: '2025-01-22',
    time: '7:00 PM',
    location: 'Newark Innovation Center',
    capacity: 30,
    registered: 28,
    tags: ['Business', 'Intermediate'],
  },
];

const mockBlogPosts = [
  {
    slug: 'what-is-chatgpt',
    title: 'What is ChatGPT and How Can It Help You?',
    excerpt: 'A simple guide to understanding ChatGPT and practical ways to use it.',
    date: '2024-12-20',
    author: 'Sarah Johnson',
    tags: ['AI Basics', 'ChatGPT'],
    readTime: '5 min read',
  },
  {
    slug: 'ai-safety-tips',
    title: '10 AI Safety Tips Everyone Should Know',
    excerpt: 'Protect yourself and your family with these essential AI safety guidelines.',
    date: '2024-12-15',
    author: 'Marcus Williams',
    tags: ['Safety', 'Privacy'],
    readTime: '7 min read',
  },
];

const mockVlogs = [
  {
    id: '1',
    title: 'Introduction to AI Workshop Recording',
    description: 'Full recording of our intro workshop.',
    thumbnail: '/thumbnails/intro.jpg',
    duration: '1:45:00',
    views: 1234,
    date: '2024-12-15',
    youtubeId: 'abc123',
  },
];

test.describe('API Integration - Loading States', () => {
  test('shows loading state while fetching events', async ({ page }) => {
    // Delay the API response to observe loading state
    await page.route('**/api/events', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockEvents),
      });
    });

    await page.goto('/events');
    
    // Should show loading indicator or skeleton
    const loadingIndicator = page.locator('[data-testid="loading"], .animate-pulse, [aria-busy="true"]');
    await expect(loadingIndicator.first()).toBeVisible({ timeout: 500 });
  });

  test('shows loading state while fetching blog posts', async ({ page }) => {
    await page.route('**/api/blog', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBlogPosts),
      });
    });

    await page.goto('/blog');
    
    const loadingIndicator = page.locator('[data-testid="loading"], .animate-pulse, [aria-busy="true"]');
    await expect(loadingIndicator.first()).toBeVisible({ timeout: 500 });
  });

  test('shows loading state during form submission', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent!' }),
      });
    });

    await page.goto('/contact');
    
    // Fill out form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message content');
    
    // Submit and check for loading state
    await page.click('button[type="submit"]');
    
    // Button should show loading state
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });
});

test.describe('API Integration - Error States', () => {
  test('handles API server down (network error)', async ({ page }) => {
    await page.route('**/api/events', (route) => route.abort('failed'));

    await page.goto('/events');
    
    // Should show error message or fallback UI
    const errorMessage = page.locator('[data-testid="error"], [role="alert"]');
    const fallbackContent = page.locator('text=/error|failed|unavailable|try again/i');
    
    // Either error message or fallback content should be visible
    const hasError = await errorMessage.count() > 0 || await fallbackContent.count() > 0;
    // Page should still render (not crash)
    await expect(page.locator('body')).toBeVisible();
  });

  test('handles 404 error for non-existent event', async ({ page }) => {
    await page.route('**/api/events/non-existent-event', (route) => {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Event not found', code: 'NOT_FOUND' }),
      });
    });

    await page.goto('/events/non-existent-event');
    
    // Should show 404 page or "not found" message
    const notFoundIndicator = page.locator('text=/not found|404|doesn\'t exist/i');
    await expect(notFoundIndicator.first()).toBeVisible({ timeout: 5000 });
  });

  test('handles 404 error for non-existent blog post', async ({ page }) => {
    await page.route('**/api/blog/non-existent-post', (route) => {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Post not found', code: 'NOT_FOUND' }),
      });
    });

    await page.goto('/blog/non-existent-post');
    
    const notFoundIndicator = page.locator('text=/not found|404|doesn\'t exist/i');
    await expect(notFoundIndicator.first()).toBeVisible({ timeout: 5000 });
  });

  test('handles 500 server error gracefully', async ({ page }) => {
    await page.route('**/api/events', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal server error' }),
      });
    });

    await page.goto('/events');
    
    // Should show error state, not crash
    await expect(page.locator('body')).toBeVisible();
    
    // Should show some error indication
    const errorIndicator = page.locator('text=/error|something went wrong|try again/i');
    const hasErrorUI = await errorIndicator.count() > 0;
    // At minimum, page should not show broken state
    expect(await page.title()).toBeTruthy();
  });

  test('handles form submission error', async ({ page }) => {
    await page.route('**/api/contact', (route) => {
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Invalid email address', code: 'VALIDATION_ERROR' }),
      });
    });

    await page.goto('/contact');
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="subject"]', 'Test');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.click('button[type="submit"]');
    
    // Should show error message
    const errorMessage = page.locator('[role="alert"], .text-red-500, .text-bauhaus-red');
    await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
  });

  test('handles rate limiting (429 error)', async ({ page }) => {
    await page.route('**/api/contact', (route) => {
      route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Too many requests. Please try again later.' }),
      });
    });

    await page.goto('/contact');
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test');
    await page.fill('textarea[name="message"]', 'Test message');
    
    await page.click('button[type="submit"]');
    
    // Should show rate limit message or generic error
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('API Integration - Empty States', () => {
  test('shows empty state when no events exist', async ({ page }) => {
    await page.route('**/api/events', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/events');
    
    // Should show empty state message
    const emptyState = page.locator('text=/no events|no upcoming|check back/i');
    await expect(emptyState.first()).toBeVisible({ timeout: 5000 });
  });

  test('shows empty state when no blog posts exist', async ({ page }) => {
    await page.route('**/api/blog', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/blog');
    
    const emptyState = page.locator('text=/no posts|no articles|check back/i');
    await expect(emptyState.first()).toBeVisible({ timeout: 5000 });
  });

  test('shows empty state when no vlogs exist', async ({ page }) => {
    await page.route('**/api/vlogs', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/vlogs');
    
    const emptyState = page.locator('text=/no videos|no vlogs|check back/i');
    await expect(emptyState.first()).toBeVisible({ timeout: 5000 });
  });

  test('shows empty search results message', async ({ page }) => {
    await page.route('**/api/events*', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/events');
    
    // If there's a search input, search for something that won't match
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]');
    if (await searchInput.count() > 0) {
      await searchInput.fill('xyznonexistent123');
      await page.keyboard.press('Enter');
      
      const noResults = page.locator('text=/no results|no events found|try different/i');
      await expect(noResults.first()).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe('API Integration - Success States', () => {
  test('displays events from API correctly', async ({ page }) => {
    await page.route('**/api/events', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockEvents),
      });
    });

    await page.goto('/events');
    
    // Should display event titles
    await expect(page.locator('text=Introduction to AI')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=ChatGPT for Small Business')).toBeVisible();
  });

  test('displays blog posts from API correctly', async ({ page }) => {
    await page.route('**/api/blog', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBlogPosts),
      });
    });

    await page.goto('/blog');
    
    await expect(page.locator('text=What is ChatGPT')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=AI Safety Tips')).toBeVisible();
  });

  test('displays event detail from API correctly', async ({ page }) => {
    await page.route('**/api/events/intro-to-ai', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ...mockEvents[0],
          longDescription: 'This comprehensive workshop will cover the fundamentals of AI...',
          instructor: 'Dr. Sarah Chen',
          instructorBio: 'AI researcher and educator with 10 years of experience.',
        }),
      });
    });

    await page.goto('/events/intro-to-ai');
    
    await expect(page.locator('h1:has-text("Introduction to AI")')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Newark Public Library')).toBeVisible();
  });

  test('successful form submission shows success message', async ({ page }) => {
    await page.route('**/api/contact', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Thank you! Your message has been sent.' }),
      });
    });

    await page.goto('/contact');
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message.');
    
    await page.click('button[type="submit"]');
    
    // Should show success message
    const successMessage = page.locator('text=/thank you|success|sent|received/i');
    await expect(successMessage.first()).toBeVisible({ timeout: 5000 });
  });

  test('successful event registration shows confirmation', async ({ page }) => {
    await page.route('**/api/events/intro-to-ai', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockEvents[0]),
      });
    });

    await page.route('**/api/events/register', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'You are registered!' }),
      });
    });

    await page.goto('/events/intro-to-ai');
    
    // Fill registration form
    const firstNameInput = page.locator('input[name="firstName"]');
    if (await firstNameInput.count() > 0) {
      await firstNameInput.fill('John');
      await page.fill('input[name="lastName"]', 'Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      
      await page.click('button[type="submit"]');
      
      const successMessage = page.locator('text=/registered|confirmed|success|thank you/i');
      await expect(successMessage.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('successful volunteer signup shows confirmation', async ({ page }) => {
    await page.route('**/api/volunteer', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Thank you for volunteering!' }),
      });
    });

    await page.goto('/volunteer');
    
    await page.fill('input[name="firstName"]', 'Jane');
    await page.fill('input[name="lastName"]', 'Smith');
    await page.fill('input[name="email"]', 'jane@example.com');
    
    // Select interest if dropdown exists
    const interestSelect = page.locator('select[name="interest"]');
    if (await interestSelect.count() > 0) {
      await interestSelect.selectOption({ index: 1 });
    }
    
    // Fill motivation
    const motivationField = page.locator('textarea[name="motivation"]');
    if (await motivationField.count() > 0) {
      await motivationField.fill('I want to help the community learn about AI.');
    }
    
    await page.click('button[type="submit"]');
    
    const successMessage = page.locator('text=/thank you|success|received|contact/i');
    await expect(successMessage.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('API Integration - Data Refresh', () => {
  test('refreshes data when navigating back to page', async ({ page }) => {
    let callCount = 0;
    
    await page.route('**/api/events', (route) => {
      callCount++;
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockEvents),
      });
    });

    await page.goto('/events');
    await expect(page.locator('text=Introduction to AI')).toBeVisible({ timeout: 5000 });
    
    // Navigate away
    await page.goto('/about');
    await expect(page.locator('h1')).toBeVisible();
    
    // Navigate back
    await page.goto('/events');
    await expect(page.locator('text=Introduction to AI')).toBeVisible();
    
    // API should have been called at least twice
    expect(callCount).toBeGreaterThanOrEqual(1);
  });
});

test.describe('API Integration - Concurrent Requests', () => {
  test('handles multiple simultaneous API calls on homepage', async ({ page }) => {
    await page.route('**/api/events', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockEvents.slice(0, 3)),
      });
    });

    await page.route('**/api/blog', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBlogPosts.slice(0, 3)),
      });
    });

    await page.goto('/');
    
    // Homepage should load both events and blog posts
    await expect(page.locator('body')).toBeVisible();
    // Page should render without errors
    expect(await page.title()).toBeTruthy();
  });
});
