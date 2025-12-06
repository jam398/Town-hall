# Testing Guide

## Overview

Town Hall frontend uses a comprehensive testing strategy with 100% coverage requirement:

- **E2E Tests**: Playwright for user journey testing
- **Accessibility Tests**: axe-core for WCAG compliance
- **Visual Tests**: Screenshot comparison for UI consistency
- **Performance Tests**: Lighthouse for Core Web Vitals
- **Unit Tests**: Jest + React Testing Library for components

---

## Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Run all tests
npm test

# Run specific test suites
npm run test:e2e        # End-to-end tests
npm run test:a11y       # Accessibility tests
npm run test:visual     # Visual regression tests
npm run test:lighthouse # Performance tests
npm run test:unit       # Unit tests
```

---

## Test Structure

```
tests/
├── e2e/                    # End-to-end user journey tests
│   ├── navigation.spec.ts  # Navigation and layout
│   ├── events.spec.ts      # Events flow
│   ├── blog.spec.ts        # Blog/vlog flow
│   └── volunteer.spec.ts   # Forms and contact
├── accessibility/          # WCAG compliance tests
│   └── a11y.spec.ts
├── visual/                 # Screenshot comparison
│   └── visual.spec.ts
└── performance/            # Lighthouse audits
    └── lighthouse.spec.ts
```

---

## Running Tests

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test tests/e2e/events.spec.ts

# Run tests matching pattern
npx playwright test -g "registration"
```

### Accessibility Tests

```bash
# Run accessibility tests
npm run test:a11y

# Tests check for:
# - WCAG 2.1 AA violations
# - Keyboard navigation
# - Screen reader compatibility
# - Color contrast
```

### Visual Regression Tests

```bash
# Run visual tests
npm run test:visual

# Update baselines after intentional changes
npm run test:visual:update

# Baselines stored in:
# tests/visual/__snapshots__/
```

### Performance Tests

```bash
# Run Lighthouse tests
npm run test:lighthouse

# Thresholds:
# - Performance: ≥90 (desktop), ≥80 (mobile)
# - Accessibility: 100
# - Best Practices: ≥90
# - SEO: ≥90
```

### Unit Tests

```bash
# Run unit tests
npm run test:unit

# Run with coverage
npm run test:unit -- --coverage

# Watch mode
npm run test:unit -- --watch
```

---

## Test Reports

### HTML Report

```bash
# Generate and view HTML report
npx playwright show-report
```

### Coverage Report

```bash
# Generate coverage report
npm run test:coverage

# View at coverage/lcov-report/index.html
```

### CI Artifacts

In CI, test artifacts are uploaded:
- `playwright-report/` - HTML test report
- `test-results/` - Screenshots, videos, traces
- `coverage/` - Code coverage report

---

## Writing Tests

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Events Page', () => {
  test('displays upcoming events', async ({ page }) => {
    await page.goto('/events');
    
    // Check page loaded
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Events');
    
    // Check events are displayed
    const eventCards = page.getByTestId('event-card');
    await expect(eventCards).toHaveCount.greaterThan(0);
  });

  test('can register for an event', async ({ page }) => {
    await page.goto('/events/intro-to-ai-january');
    
    // Fill registration form
    await page.getByTestId('first-name-input').fill('John');
    await page.getByTestId('last-name-input').fill('Doe');
    await page.getByTestId('email-input').fill('john@example.com');
    
    // Submit
    await page.getByTestId('submit-button').click();
    
    // Check success
    await expect(page.getByText("You're Registered")).toBeVisible();
  });
});
```

### Accessibility Test Example

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  
  expect(results.violations).toEqual([]);
});
```

### Visual Test Example

```typescript
import { test, expect } from '@playwright/test';

test('homepage matches snapshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixelRatio: 0.01,
  });
});
```

---

## Test Data

### Mock Data

Tests use mock data defined in test files. For integration with backend:

```typescript
// Mock API responses
await page.route('**/api/events', async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify([
      { slug: 'test-event', title: 'Test Event', ... }
    ]),
  });
});
```

### Test IDs

Components include `data-testid` attributes for reliable selection:

```jsx
<button data-testid="submit-button">Submit</button>
```

```typescript
await page.getByTestId('submit-button').click();
```

---

## Coverage Requirements

| Metric | Requirement |
|--------|-------------|
| Statements | 100% |
| Branches | 100% |
| Functions | 100% |
| Lines | 100% |

CI will fail if coverage drops below these thresholds.

---

## Debugging

### Headed Mode

```bash
npx playwright test --headed
```

### Debug Mode

```bash
npx playwright test --debug
```

### Trace Viewer

```bash
# Run with trace
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip
```

### Screenshots on Failure

Configured in `playwright.config.ts`:
```typescript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}
```

---

## CI Integration

Tests run automatically on:
- Push to `main` or `Beginning` branches
- Pull requests

See `.github/workflows/test.yml` for configuration.

---

## Troubleshooting

### Tests Timeout

Increase timeout in test or config:
```typescript
test.setTimeout(60000);
```

### Flaky Tests

1. Add explicit waits: `await page.waitForLoadState('networkidle')`
2. Use `toBeVisible()` instead of `toHaveText()`
3. Check for race conditions

### Visual Test Failures

1. Review diff images in `test-results/`
2. If change is intentional, update baseline
3. Check for dynamic content (dates, animations)

---

**Last Updated:** December 2024
