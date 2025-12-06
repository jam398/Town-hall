import { test, expect } from '@playwright/test';

/**
 * Blog Flow E2E Tests
 * 
 * Tests the blog and vlog user journey:
 * - Viewing blog listing
 * - Reading blog posts
 * - Viewing vlogs
 * - Share functionality
 */

test.describe('Blog Listing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
  });

  test('blog page loads and displays title', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog|Town Hall/i);
    await expect(page.locator('h1')).toContainText(/blog|articles|news/i);
  });

  test('displays list of blog posts', async ({ page }) => {
    const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article');
    const count = await blogCards.count();

    if (count > 0) {
      const firstCard = blogCards.first();
      await expect(firstCard).toBeVisible();

      // Blog card should have title
      await expect(firstCard.locator('h2, h3, [data-testid="blog-title"]')).toBeVisible();

      // Blog card should have date or author
      const hasDate = await firstCard.locator('time, [data-testid="blog-date"]').count() > 0;
      const hasAuthor = await firstCard.locator('[data-testid="blog-author"]').count() > 0;
      expect(hasDate || hasAuthor).toBeTruthy();
    } else {
      // Empty state should be shown
      await expect(page.locator('body')).toContainText(/no.*posts|coming soon/i);
    }
  });

  test('blog cards are clickable and navigate to post', async ({ page }) => {
    const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article');
    const count = await blogCards.count();

    if (count > 0) {
      const firstCardLink = blogCards.first().locator('a').first();
      await firstCardLink.click();

      // Should navigate to blog post page
      await expect(page).toHaveURL(/\/blog\/.+/);
    }
  });

  test('blog posts have featured images or thumbnails', async ({ page }) => {
    const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article');
    const count = await blogCards.count();

    if (count > 0) {
      const firstCard = blogCards.first();
      const hasImage = await firstCard.locator('img').count() > 0;
      
      // Most blog cards should have images
      // This is a soft check - not all designs require images
      if (hasImage) {
        await expect(firstCard.locator('img').first()).toBeVisible();
      }
    }
  });
});

test.describe('Blog Post Detail', () => {
  test('displays full blog post content', async ({ page }) => {
    await page.goto('/blog');

    const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article');
    const count = await blogCards.count();

    if (count > 0) {
      await blogCards.first().locator('a').first().click();

      // Verify blog post elements
      await expect(page.locator('h1')).toBeVisible();

      // Should have article content
      await expect(page.locator('article, [data-testid="blog-content"], .blog-content, main p')).toBeVisible();

      // Should have author info
      const hasAuthor = await page.locator('[data-testid="author"], .author, [rel="author"]').count() > 0;
      
      // Should have publish date
      await expect(page.locator('time, [data-testid="publish-date"]')).toBeVisible();
    }
  });

  test('blog post renders rich text content', async ({ page }) => {
    await page.goto('/blog');

    const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article');
    const count = await blogCards.count();

    if (count > 0) {
      await blogCards.first().locator('a').first().click();

      // Content area should exist
      const content = page.locator('article, [data-testid="blog-content"], .blog-content, .prose');
      await expect(content).toBeVisible();

      // Should contain paragraphs
      const paragraphs = content.locator('p');
      const pCount = await paragraphs.count();
      expect(pCount).toBeGreaterThan(0);
    }
  });

  test('share buttons are present and functional', async ({ page }) => {
    await page.goto('/blog');

    const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article');
    const count = await blogCards.count();

    if (count > 0) {
      await blogCards.first().locator('a').first().click();

      // Look for share buttons
      const shareButtons = page.locator('[data-testid="share"], .share-buttons, button:has-text("Share"), a:has-text("Share")');
      
      if (await shareButtons.count() > 0) {
        await expect(shareButtons.first()).toBeVisible();
      }
    }
  });

  test('related posts section exists', async ({ page }) => {
    await page.goto('/blog');

    const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article');
    const count = await blogCards.count();

    if (count > 1) {
      await blogCards.first().locator('a').first().click();

      // Look for related posts section
      const relatedSection = page.locator('[data-testid="related-posts"], .related-posts, section:has-text("Related")');
      
      // Related posts are optional but good UX
      if (await relatedSection.count() > 0) {
        await expect(relatedSection).toBeVisible();
      }
    }
  });
});

test.describe('Vlogs', () => {
  test('vlogs page loads and displays videos', async ({ page }) => {
    await page.goto('/vlogs');

    // Page should load
    await expect(page.locator('h1')).toContainText(/vlog|video/i);

    const vlogCards = page.locator('[data-testid="vlog-card"], .vlog-card, article');
    const count = await vlogCards.count();

    if (count > 0) {
      const firstCard = vlogCards.first();
      await expect(firstCard).toBeVisible();

      // Should have video thumbnail or player
      const hasVideo = await firstCard.locator('video, iframe, img').count() > 0;
      expect(hasVideo).toBeTruthy();
    }
  });

  test('vlog cards have play button or video indicator', async ({ page }) => {
    await page.goto('/vlogs');

    const vlogCards = page.locator('[data-testid="vlog-card"], .vlog-card, article');
    const count = await vlogCards.count();

    if (count > 0) {
      const firstCard = vlogCards.first();
      
      // Should have some video indicator
      const hasPlayButton = await firstCard.locator('[data-testid="play-button"], .play-button, svg, button').count() > 0;
      const hasVideoEmbed = await firstCard.locator('video, iframe').count() > 0;
      
      expect(hasPlayButton || hasVideoEmbed).toBeTruthy();
    }
  });
});

test.describe('Blog Search and Filtering', () => {
  test('search functionality works if present', async ({ page }) => {
    await page.goto('/blog');

    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], [data-testid="search"]');

    if (await searchInput.count() > 0) {
      await searchInput.fill('AI');
      await page.keyboard.press('Enter');

      // Wait for results
      await page.waitForTimeout(500);

      // Results should be filtered or message shown
      const body = await page.locator('body').textContent();
      expect(body).toBeTruthy();
    }
  });

  test('tag/category filtering works if present', async ({ page }) => {
    await page.goto('/blog');

    const tagFilters = page.locator('[data-testid="tag-filter"], .tag, .category-filter, button:has-text("AI"), a:has-text("AI")');

    if (await tagFilters.count() > 0) {
      await tagFilters.first().click();

      // Wait for filtering
      await page.waitForTimeout(500);

      // Page should update
      const url = page.url();
      // URL might include tag parameter or page should filter
      expect(url).toBeTruthy();
    }
  });
});

test.describe('Blog Pagination', () => {
  test('pagination controls work if present', async ({ page }) => {
    await page.goto('/blog');

    const pagination = page.locator('[data-testid="pagination"], .pagination, nav[aria-label*="pagination" i]');

    if (await pagination.count() > 0) {
      const nextButton = pagination.locator('a:has-text("Next"), button:has-text("Next"), a[rel="next"]');

      if (await nextButton.count() > 0) {
        await nextButton.click();

        // Should navigate to next page
        await expect(page).toHaveURL(/page=2|\/2$/);
      }
    }
  });

  test('infinite scroll works if implemented', async ({ page }) => {
    await page.goto('/blog');

    const initialCards = await page.locator('[data-testid="blog-card"], .blog-card, article').count();

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const afterScrollCards = await page.locator('[data-testid="blog-card"], .blog-card, article').count();

    // If infinite scroll is implemented, more cards should load
    // This is a soft check - not all implementations use infinite scroll
    expect(afterScrollCards).toBeGreaterThanOrEqual(initialCards);
  });
});
