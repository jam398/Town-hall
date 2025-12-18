import { test, expect } from '@playwright/test';

/**
 * API Health Check Tests
 * 
 * CRITICAL: These tests verify that the backend API is reachable and returning data.
 * If these tests fail, it indicates a fundamental connectivity issue that will
 * cause all content pages (events, blog, vlogs) to appear empty.
 * 
 * These tests should run FIRST and fail fast if the API is unreachable.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

test.describe('API Health Check', () => {
  test.describe.configure({ mode: 'serial' });

  test('backend API is reachable', async ({ request }) => {
    // Try to reach the backend health endpoint or events endpoint
    const response = await request.get(`${API_URL}/events`);
    
    expect(response.ok(), `Backend API at ${API_URL} is not reachable. Status: ${response.status()}`).toBeTruthy();
  });

  test('blog API returns posts', async ({ request }) => {
    const response = await request.get(`${API_URL}/blog`);
    
    expect(response.ok(), `Blog API failed with status ${response.status()}`).toBeTruthy();
    
    const data = await response.json();
    expect(data.posts, 'Blog API should return a posts array').toBeDefined();
    expect(Array.isArray(data.posts), 'posts should be an array').toBeTruthy();
    expect(data.posts.length, 'Blog API should return at least one post. Check Sanity CMS content.').toBeGreaterThan(0);
  });

  test('vlogs API returns videos', async ({ request }) => {
    const response = await request.get(`${API_URL}/vlogs`);
    
    expect(response.ok(), `Vlogs API failed with status ${response.status()}`).toBeTruthy();
    
    const data = await response.json();
    expect(data.vlogs, 'Vlogs API should return a vlogs array').toBeDefined();
    expect(Array.isArray(data.vlogs), 'vlogs should be an array').toBeTruthy();
    expect(data.vlogs.length, 'Vlogs API should return at least one vlog. Check Sanity CMS content.').toBeGreaterThan(0);
  });

  test('events API returns events', async ({ request }) => {
    const response = await request.get(`${API_URL}/events`);
    
    expect(response.ok(), `Events API failed with status ${response.status()}`).toBeTruthy();
    
    const data = await response.json();
    expect(data.events, 'Events API should return an events array').toBeDefined();
    expect(Array.isArray(data.events), 'events should be an array').toBeTruthy();
    // Events may be empty if none are scheduled, so we don't require > 0
  });
});

test.describe('Frontend API Integration', () => {
  test('blog page fetches and displays posts from API', async ({ page }) => {
    // Listen for API calls
    const apiCalls: string[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        apiCalls.push(request.url());
      }
    });

    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Verify API was called (either directly or via SSR)
    const blogCards = page.locator('[data-testid="blog-card"], article');
    const count = await blogCards.count();

    // This is the critical assertion - blog posts MUST load
    expect(count, `
      CRITICAL: No blog posts displayed!
      
      Possible causes:
      1. Backend not running (check: npm start in townhall-backend)
      2. Wrong API URL in .env.local (should be: NEXT_PUBLIC_API_URL=http://localhost:3001/api)
      3. CORS issue between frontend and backend
      4. Sanity CMS has no published blog posts
      
      API calls detected: ${apiCalls.join(', ') || 'none (SSR may have fetched)'}
    `).toBeGreaterThan(0);
  });

  test('vlogs page fetches and displays videos from API', async ({ page }) => {
    await page.goto('/vlogs');
    await page.waitForLoadState('networkidle');

    const vlogCards = page.locator('[data-testid="vlog-card"], article');
    const count = await vlogCards.count();

    expect(count, `
      CRITICAL: No vlogs displayed!
      
      Possible causes:
      1. Backend not running
      2. Wrong API URL in .env.local
      3. Sanity CMS has no published vlogs
    `).toBeGreaterThan(0);
  });
});
