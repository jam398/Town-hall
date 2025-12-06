# Frontend Developer & QA TODO List

## Town Hall – Newark AI Community Nonprofit

**Owner:** Frontend Developer (You)  
**Stack:** Next.js + TailwindCSS + Playwright + Lighthouse  
**Requirement:** 100% test coverage, heavy emphasis on UI/UX testing

---

## Phase 1: Project Setup

### 1.1 Next.js Initialization
- [x] **Create Next.js app** with TypeScript (structure created)
  ```bash
  npx create-next-app@latest townhall-frontend --typescript --tailwind --eslint --app
  ```
- [x] **Configure project structure:**
  ```
  townhall-frontend/
  ├── app/                    # Next.js App Router
  │   ├── layout.tsx          # Root layout with nav/footer
  │   ├── page.tsx            # Homepage
  │   ├── events/
  │   │   ├── page.tsx        # Events listing
  │   │   └── [slug]/page.tsx # Event detail + registration
  │   ├── blog/
  │   │   ├── page.tsx        # Blog listing
  │   │   └── [slug]/page.tsx # Blog post
  │   ├── vlogs/page.tsx      # Vlog listing
  │   ├── volunteer/page.tsx  # Volunteer signup
  │   ├── about/page.tsx      # About Town Hall
  │   └── contact/page.tsx    # Contact form
  ├── components/             # Reusable UI components
  ├── lib/                    # API client, utilities
  ├── styles/                 # Global styles
  ├── tests/                  # Playwright tests
  │   ├── e2e/                # End-to-end tests
  │   ├── accessibility/      # A11y tests
  │   ├── visual/             # Visual regression
  │   └── performance/        # Lighthouse tests
  └── public/                 # Static assets
  ```
- [x] **Install dependencies:**
  - [x] `@playwright/test` - E2E testing
  - [x] `@axe-core/playwright` - Accessibility testing
  - [x] `lighthouse` - Performance testing
  - [x] `playwright-lighthouse` - Lighthouse in Playwright
  - [x] `lucide-react` - Icons
  - [x] `react-hook-form` - Form handling
  - [x] `zod` - Validation
  - [x] `date-fns` - Date formatting

### 1.2 Docker Setup
- [x] **Create `Dockerfile`** for frontend
- [x] **Add to `docker-compose.yml`:**
  ```yaml
  frontend:
    build: ./townhall-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3001/api
    depends_on:
      - backend
  ```
- [ ] **Create `Dockerfile.test`** for running tests in CI

---

## Phase 2: Design System & Branding

### 2.1 Brand Guide Implementation
- [x] **Define brand tokens** in `tailwind.config.js` (Bauhaus colors):
  ```js
  // Colors: Trust + Accessibility focused
  colors: {
    primary: { /* Blue - trust, stability */ },
    secondary: { /* Green - community, growth */ },
    accent: { /* Orange - energy, action */ },
    neutral: { /* Grays for text/backgrounds */ },
  }
  ```
- [x] **Typography system:**
  - [x] Headings: Clear, bold, accessible (Bauhaus uppercase style)
  - [x] Body: Readable at all sizes (min 16px)
  - [x] Ensure contrast ratios meet WCAG AA (4.5:1 for text)
- [x] **Create `docs/BRAND_GUIDE.md`** documenting all design decisions

### 2.2 Component Library
- [x] **Layout components:**
  - [x] `Header` - Logo, navigation, mobile menu
  - [x] `Footer` - Links, social, newsletter signup
  - [x] `Container` - Max-width wrapper (via Tailwind)
  - [x] `Section` - Consistent vertical spacing (via Tailwind)
- [x] **UI components:**
  - [x] `Button` - Primary, secondary, outline, accent, ghost variants
  - [x] `Card` - Event card, blog card, etc.
  - [x] `Badge` - Status indicators (via tags)
  - [x] `Input` - Text, email, textarea with validation states
  - [x] `Select` - Dropdown with accessible markup
  - [ ] `Modal` - Accessible dialog
  - [ ] `Toast` - Success/error notifications
- [x] **Content components:**
  - [x] `EventCard` - Event preview for listings
  - [x] `BlogCard` - Blog post preview
  - [x] `VlogCard` - Video thumbnail + title (inline in vlogs page)
  - [x] `RegistrationForm` - Event registration
  - [x] `VolunteerForm` - Volunteer signup
  - [x] `ContactForm` - General contact

---

## Phase 3: Page Implementation

### 3.1 Homepage
- [x] **Hero section:**
  - [x] Compelling headline about Town Hall mission
  - [x] CTA buttons: "Upcoming Events" + "Get Involved"
  - [x] Bauhaus geometric background
- [x] **Upcoming events preview** (3 most recent)
- [x] **Latest blog posts** (3 most recent)
- [x] **About snippet** with link to full about page
- [x] **Newsletter signup** form (in CTA section)

### 3.2 Events Pages
- [x] **Events listing (`/events`):**
  - [x] Grid/list of upcoming events
  - [ ] Filter by date range (optional)
  - [x] Empty state if no events
- [x] **Event detail (`/events/[slug]`):**
  - [x] Full event information
  - [x] "What you'll learn" section
  - [x] Registration form (inline)
  - [x] Share buttons
  - [x] "Add to calendar" link (Google Calendar, iCal)

### 3.3 Blog/Vlog Pages
- [x] **Blog listing (`/blog`):**
  - [x] Grid of blog posts with thumbnails
  - [ ] Pagination or infinite scroll
- [x] **Blog detail (`/blog/[slug]`):**
  - [x] Full article with rich text rendering
  - [x] Author info
  - [x] Related posts
  - [x] Share buttons
- [x] **Vlogs listing (`/vlogs`):**
  - [x] Video thumbnails with play button overlay
  - [x] Links to YouTube

### 3.4 Volunteer & Contact
- [x] **Volunteer page (`/volunteer`):**
  - [x] Explanation of volunteer opportunities
  - [x] Signup form with validation
  - [x] Success confirmation
- [x] **Contact page (`/contact`):**
  - [x] Contact form
  - [x] Location/address info
  - [x] Social media links

### 3.5 About Page
- [x] **Mission statement**
- [x] **Team/leadership**
- [x] **History/background** (timeline)
- [ ] **Partners/sponsors** (if applicable)

---

## Phase 4: API Integration

### 4.1 API Client
- [x] **Create `lib/api.ts`:**
  ```typescript
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  export async function getEvents() { ... }
  export async function getEvent(slug: string) { ... }
  export async function registerForEvent(slug: string, data: RegistrationData) { ... }
  export async function getBlogPosts() { ... }
  export async function getBlogPost(slug: string) { ... }
  export async function getVlogs() { ... }
  export async function submitVolunteerForm(data: VolunteerData) { ... }
  export async function submitContactForm(data: ContactData) { ... }
  ```
- [x] **Error handling** for all API calls (ApiError class)
- [x] **Loading states** for all data fetching (form states)
- [x] **Type definitions** matching backend API contract

### 4.2 Forms
- [x] **Event registration form:**
  - [x] Client-side validation
  - [x] Server-side submission (mocked)
  - [x] Success/error feedback
  - [x] Prevent double submission (isLoading state)
- [x] **Volunteer form:** Same pattern
- [x] **Contact form:** Same pattern
- [x] **Newsletter signup:** Same pattern

---

## Phase 5: Testing (CRITICAL - Heavy Emphasis)

### 5.1 Test Infrastructure Setup
- [x] **Initialize Playwright:**
  ```bash
  npm init playwright@latest
  ```
- [x] **Configure `playwright.config.ts`:**
  - [x] Multiple browsers (Chromium, Firefox, WebKit)
  - [x] Mobile viewports (iPhone, Android)
  - [x] Screenshot on failure
  - [x] Video recording for debugging
  - [x] HTML reporter
- [x] **Create test utilities:**
  - [x] `tests/fixtures.ts` - Common test data
  - [x] `tests/helpers.ts` - Reusable test functions
  - [ ] `tests/mocks/` - API mocking utilities

### 5.2 End-to-End Tests (Playwright)

#### Navigation & Layout
- [x] `tests/e2e/navigation.spec.ts`:
  - [ ] Homepage loads correctly
  - [ ] All nav links work
  - [ ] Mobile menu opens/closes
  - [ ] Footer links work
  - [ ] Logo links to homepage

#### Events Flow
- [x] `tests/e2e/events.spec.ts`:
  - [ ] Events page displays list of events
  - [ ] Event cards show correct information
  - [ ] Clicking event card navigates to detail page
  - [ ] Event detail page shows all information
  - [ ] Registration form appears
  - [ ] Valid registration submits successfully
  - [ ] Invalid registration shows errors
  - [ ] Success message appears after registration
  - [ ] "Add to calendar" link works

#### Blog Flow
- [x] `tests/e2e/blog.spec.ts`:
  - [ ] Blog listing shows posts
  - [ ] Blog cards display correctly
  - [ ] Clicking post navigates to detail
  - [ ] Blog post renders rich content
  - [ ] Share buttons work

#### Volunteer Flow
- [x] `tests/e2e/volunteer.spec.ts`:
  - [ ] Volunteer page loads
  - [ ] Form validation works (empty fields)
  - [ ] Form validation works (invalid email)
  - [ ] Valid submission succeeds
  - [ ] Success message displays

#### Contact Flow
- [ ] `tests/e2e/contact.spec.ts`:
  - [ ] Contact page loads
  - [ ] Form validation works
  - [ ] Valid submission succeeds

### 5.3 Accessibility Tests (axe-playwright)

- [x] `tests/accessibility/a11y.spec.ts`:
  - [ ] **Homepage** - Zero critical/serious violations
  - [ ] **Events listing** - Zero violations
  - [ ] **Event detail** - Zero violations
  - [ ] **Blog listing** - Zero violations
  - [ ] **Blog post** - Zero violations
  - [ ] **Volunteer page** - Zero violations
  - [ ] **Contact page** - Zero violations
  - [ ] **About page** - Zero violations

- [ ] **Keyboard navigation tests:**
  - [ ] All interactive elements focusable
  - [ ] Focus order is logical
  - [ ] Focus visible on all elements
  - [ ] Escape closes modals
  - [ ] Enter/Space activates buttons

- [ ] **Screen reader tests:**
  - [ ] All images have alt text
  - [ ] Form labels are associated
  - [ ] Error messages announced
  - [ ] Page titles are descriptive
  - [ ] Headings are hierarchical (h1 → h2 → h3)

### 5.4 Visual Regression Tests

- [x] `tests/visual/visual.spec.ts`:
  - [ ] **Homepage** - Desktop + Mobile snapshots
  - [ ] **Events page** - Desktop + Mobile
  - [ ] **Event detail** - Desktop + Mobile
  - [ ] **Blog page** - Desktop + Mobile
  - [ ] **Forms** - Empty, filled, error states
  - [ ] **Components** - Button variants, cards, etc.

- [ ] **Create baseline screenshots** on first run
- [ ] **Document threshold** for acceptable diff (e.g., 0.1%)

### 5.5 Performance Tests (Lighthouse)

- [x] `tests/performance/lighthouse.spec.ts`:
  - [ ] **Homepage:**
    - [ ] Performance score ≥ 90
    - [ ] Accessibility score = 100
    - [ ] Best Practices score ≥ 90
    - [ ] SEO score ≥ 90
  - [ ] **Events page:** Same thresholds
  - [ ] **Blog page:** Same thresholds
  - [ ] **Event detail:** Same thresholds

- [ ] **Mobile performance tests:**
  - [ ] Test on simulated 3G
  - [ ] Test on mobile viewport
  - [ ] LCP (Largest Contentful Paint) < 2.5s
  - [ ] FID (First Input Delay) < 100ms
  - [ ] CLS (Cumulative Layout Shift) < 0.1

- [ ] **Create `tests/performance/thresholds.ts`:**
  ```typescript
  export const LIGHTHOUSE_THRESHOLDS = {
    performance: 90,
    accessibility: 100,
    'best-practices': 90,
    seo: 90,
  };
  ```

### 5.6 Component Unit Tests

- [ ] **Install Jest + React Testing Library:**
  ```bash
  npm install -D jest @testing-library/react @testing-library/jest-dom
  ```
- [ ] **Test all components:**
  - [ ] `Button` - All variants render, click handlers work
  - [ ] `Card` - Renders content correctly
  - [ ] `Input` - Validation states, error messages
  - [ ] `EventCard` - Displays event data
  - [ ] `RegistrationForm` - Validation, submission
  - [ ] etc.

### 5.7 API Integration Tests

- [ ] `tests/integration/api.spec.ts`:
  - [ ] Mock API responses
  - [ ] Test loading states
  - [ ] Test error states (API down, 404, 500)
  - [ ] Test empty states (no events, no posts)

---

## Phase 6: Documentation

### 6.1 UX Documentation
- [ ] **`docs/PERSONAS.md`:**
  - [ ] "Low-tech literacy resident" - Needs simple, clear UI
  - [ ] "Concerned parent" - Needs trust signals, privacy info
  - [ ] "Small business owner" - Needs practical value proposition
- [ ] **`docs/CUSTOMER_JOURNEY.md`:**
  - [ ] Map: "Sees flyer → Visits site → Registers → Attends → Stays connected"
  - [ ] Identify touchpoints and potential friction
- [ ] **`docs/BRAND_GUIDE.md`:**
  - [ ] Logo usage
  - [ ] Color palette with hex codes
  - [ ] Typography (fonts, sizes, weights)
  - [ ] Voice and tone guidelines
  - [ ] Component examples

### 6.2 Technical Documentation
- [x] **`docs/TESTING.md`:**
  - [ ] How to run all tests
  - [ ] How to run specific test suites
  - [ ] How to update visual baselines
  - [ ] How to interpret Lighthouse reports
  - [ ] Coverage requirements and how to check
- [ ] **`docs/COMPONENTS.md`:**
  - [ ] Component API documentation
  - [ ] Usage examples
- [ ] **`README.md`** in `townhall-frontend/`:
  - [ ] Setup instructions
  - [ ] Available scripts
  - [ ] Environment variables

---

## Phase 7: CI/CD Integration

### 7.1 GitHub Actions
- [x] **Create `.github/workflows/test.yml`:**
  ```yaml
  name: Tests
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
        - run: npm ci
        - run: npm run lint
        - run: npm run test:unit
        - run: npx playwright install --with-deps
        - run: npm run test:e2e
        - run: npm run test:a11y
        - run: npm run test:lighthouse
        - uses: actions/upload-artifact@v4
          if: always()
          with:
            name: test-results
            path: |
              playwright-report/
              coverage/
  ```
- [ ] **Add coverage badge** to README
- [ ] **Fail CI if coverage < 100%**

---

## Test Commands Reference

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit          # Jest unit tests
npm run test:e2e           # Playwright E2E tests
npm run test:a11y          # Accessibility tests
npm run test:visual        # Visual regression tests
npm run test:lighthouse    # Performance tests

# Run with coverage
npm run test:coverage

# Update visual baselines
npm run test:visual:update

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test tests/e2e/events.spec.ts

# Generate HTML report
npx playwright show-report
```

---

## Testing Checklist (Per Feature)

For every new feature or page, complete this checklist:

- [ ] **E2E test** - Happy path works
- [ ] **E2E test** - Error paths handled
- [ ] **A11y test** - Zero violations
- [ ] **Keyboard test** - Fully navigable
- [ ] **Visual test** - Baseline captured
- [ ] **Mobile test** - Works on small screens
- [ ] **Lighthouse test** - Meets thresholds
- [ ] **Unit tests** - Components tested
- [ ] **Coverage** - 100% on new code

---

## Definition of Done

A task is complete when:
- [ ] Feature implemented and working
- [ ] All test types pass (E2E, A11y, Visual, Performance, Unit)
- [ ] 100% code coverage on new code
- [ ] Responsive on mobile and desktop
- [ ] Accessible (keyboard + screen reader)
- [ ] Documentation updated
- [ ] Code committed with descriptive message

---

## Coordination Points

These require sync with Backend Developer:

1. **API contract** - Agree on endpoints and response shapes
2. **Environment variables** - `NEXT_PUBLIC_API_URL` etc.
3. **Docker networking** - Frontend must reach backend
4. **Test data** - Need seed data for E2E tests
5. **Error responses** - Agree on error format for proper UI handling
