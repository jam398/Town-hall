# Town Hall Newark - Test Checklist for Handoff

This document outlines all features and supporting functions that should be tested to ensure functionality after project handoff.

---

## Quick Start Commands

```bash
# Backend Tests
cd townhall-backend
npm test                    # Run all backend tests
npm run test:coverage       # Run with coverage report

# Frontend Tests
cd townhall-frontend
npm run test:unit           # Jest unit tests
npm run test:e2e            # Playwright E2E tests
npm run test:a11y           # Accessibility tests
npm run test:lighthouse     # Performance tests
npm test                    # Run all tests
```

---

## 1. Critical Path Testing

### 1.1 Event Registration Flow ⭐ HIGH PRIORITY

| Step | Test Case | Expected Result | Status |
|------|-----------|-----------------|--------|
| 1 | Navigate to `/events` | Events page loads with event cards | ☐ |
| 2 | Click on an event card | Event detail page loads | ☐ |
| 3 | Fill registration form with valid data | Form accepts input | ☐ |
| 4 | Submit registration | Success message displayed | ☐ |
| 5 | Check email | Confirmation email received | ☐ |
| 6 | Try duplicate registration | Error message displayed | ☐ |
| 7 | Register for full event | "Event Full" indicator shown | ☐ |

**Test Files:**
- `townhall-frontend/__tests__/components/forms/RegistrationForm.test.tsx`
- `townhall-backend/tests/api/registrations.test.ts`

### 1.2 Volunteer Application Flow ⭐ HIGH PRIORITY

| Step | Test Case | Expected Result | Status |
|------|-----------|-----------------|--------|
| 1 | Navigate to `/volunteer` | Volunteer page loads | ☐ |
| 2 | Fill form with valid data | Form accepts input | ☐ |
| 3 | Submit with missing required fields | Validation errors shown | ☐ |
| 4 | Submit valid application | Success message displayed | ☐ |
| 5 | Check email | Confirmation email received | ☐ |

**Test Files:**
- `townhall-frontend/__tests__/components/forms/VolunteerForm.test.tsx`
- `townhall-backend/tests/api/volunteer.test.ts`

### 1.3 Contact Form Flow

| Step | Test Case | Expected Result | Status |
|------|-----------|-----------------|--------|
| 1 | Navigate to `/contact` | Contact page loads | ☐ |
| 2 | Fill form with valid data | Form accepts input | ☐ |
| 3 | Submit with invalid email | Validation error shown | ☐ |
| 4 | Submit valid form | Success message displayed | ☐ |

**Test Files:**
- `townhall-frontend/__tests__/components/forms/ContactForm.test.tsx`
- `townhall-backend/tests/api/contact.test.ts`

---

## 2. Page Load Testing

### 2.1 All Pages Load Successfully

| Page | Route | Expected Elements | Status |
|------|-------|-------------------|--------|
| Homepage | `/` | Hero, Events section, Blog section | ☐ |
| Events List | `/events` | Event cards, filters | ☐ |
| Event Detail | `/events/[slug]` | Event info, registration form | ☐ |
| Blog List | `/blog` | Blog cards, tags | ☐ |
| Blog Detail | `/blog/[slug]` | Article content, author | ☐ |
| Vlogs | `/vlogs` | Video cards | ☐ |
| Volunteer | `/volunteer` | Application form | ☐ |
| Contact | `/contact` | Contact form | ☐ |
| About | `/about` | About content | ☐ |
| 404 | `/nonexistent` | 404 page | ☐ |

**Test Files:**
- `townhall-frontend/tests/e2e/navigation.spec.ts`

---

## 3. Component Testing

### 3.1 UI Components

| Component | Test Cases | Status |
|-----------|------------|--------|
| **Button** | Renders all variants (primary, secondary, accent, outline, ghost) | ☐ |
| | Renders all sizes (sm, md, lg) | ☐ |
| | Shows loading state | ☐ |
| | Handles disabled state | ☐ |
| | Renders as link when `href` provided | ☐ |
| **Card** | Renders with all subcomponents | ☐ |
| | Applies variant styles | ☐ |
| **Input** | Renders with label | ☐ |
| | Shows error state | ☐ |
| | Shows helper text | ☐ |
| **Modal** | Opens and closes | ☐ |
| | Closes on overlay click | ☐ |
| | Closes on Escape key | ☐ |
| | Traps focus | ☐ |
| **Toast** | Shows success/error/warning/info variants | ☐ |
| | Auto-dismisses after duration | ☐ |
| | Can be manually dismissed | ☐ |
| **Pagination** | Renders page numbers | ☐ |
| | Handles page changes | ☐ |
| | Disables prev/next appropriately | ☐ |
| **SearchInput** | Handles input changes | ☐ |
| | Shows clear button when has value | ☐ |
| | Triggers search on Enter | ☐ |
| **TagFilter** | Renders tags | ☐ |
| | Toggles tag selection | ☐ |
| | Shows clear all button | ☐ |
| **EventCard** | Displays event information | ☐ |
| | Links to event detail | ☐ |
| | Shows "full" indicator | ☐ |
| **BlogCard** | Displays post information | ☐ |
| | Links to blog detail | ☐ |

**Test Files:**
- `townhall-frontend/__tests__/components/ui/*.test.tsx`
- `townhall-frontend/__tests__/components/layout/*.test.tsx`

### 3.2 Form Components

| Component | Test Cases | Status |
|-----------|------------|--------|
| **RegistrationForm** | Validates required fields | ☐ |
| | Validates email format | ☐ |
| | Submits valid data | ☐ |
| | Shows success message | ☐ |
| **VolunteerForm** | Validates required fields | ☐ |
| | Renders interest options | ☐ |
| | Submits valid data | ☐ |
| **ContactForm** | Validates required fields | ☐ |
| | Validates message length | ☐ |
| | Submits valid data | ☐ |

**Test Files:**
- `townhall-frontend/__tests__/components/forms/*.test.tsx`

---

## 4. API Testing

### 4.1 Backend API Endpoints

| Endpoint | Method | Test Cases | Status |
|----------|--------|------------|--------|
| `/api/health` | GET | Returns 200 OK | ☐ |
| `/api/events` | GET | Returns events array | ☐ |
| `/api/events/:slug` | GET | Returns event object | ☐ |
| | | Returns 404 for invalid slug | ☐ |
| `/api/events/register` | POST | Creates registration | ☐ |
| | | Validates required fields | ☐ |
| | | Prevents duplicate registration | ☐ |
| `/api/blog` | GET | Returns posts array | ☐ |
| `/api/blog/:slug` | GET | Returns post object | ☐ |
| | | Returns 404 for invalid slug | ☐ |
| `/api/vlogs` | GET | Returns vlogs array | ☐ |
| `/api/volunteer` | POST | Creates volunteer | ☐ |
| | | Validates required fields | ☐ |
| `/api/contact` | POST | Sends contact form | ☐ |
| | | Validates required fields | ☐ |
| `/api/newsletter` | POST | Subscribes email | ☐ |
| | | Validates email format | ☐ |

**Test Files:**
- `townhall-backend/tests/api/*.test.ts`

### 4.2 Service Layer

| Service | Test Cases | Status |
|---------|------------|--------|
| **sanityService** | Fetches events | ☐ |
| | Fetches blog posts | ☐ |
| | Creates registration | ☐ |
| | Checks duplicate registration | ☐ |
| **emailService** | Sends registration confirmation | ☐ |
| | Sends volunteer confirmation | ☐ |
| | Sends contact notification | ☐ |
| **aiService** | Transcribes audio (mocked) | ☐ |
| | Generates blog post (mocked) | ☐ |
| | Generates workshop outline (mocked) | ☐ |
| **hubspotService** | Creates/updates contact (mocked) | ☐ |

**Test Files:**
- `townhall-backend/tests/services/*.test.ts`

---

## 5. Utility Function Testing

### 5.1 Frontend Utilities

| Function | Test Cases | Status |
|----------|------------|--------|
| `cn()` | Merges class names | ☐ |
| | Handles conditional classes | ☐ |
| | Resolves Tailwind conflicts | ☐ |
| `formatDate()` | Formats ISO date string | ☐ |
| | Handles Date object | ☐ |
| | Applies custom options | ☐ |
| `formatTime()` | Converts 24h to 12h | ☐ |
| | Handles midnight/noon | ☐ |
| `generateGoogleCalendarUrl()` | Generates valid URL | ☐ |
| | Includes all event details | ☐ |
| `generateICalContent()` | Generates valid iCal | ☐ |
| | Includes VCALENDAR/VEVENT | ☐ |
| `downloadICal()` | Triggers download | ☐ |
| | Creates correct filename | ☐ |
| `truncate()` | Truncates long text | ☐ |
| | Preserves short text | ☐ |
| `getShareUrls()` | Generates Twitter URL | ☐ |
| | Generates Facebook URL | ☐ |
| | Generates LinkedIn URL | ☐ |
| `debounce()` | Delays function call | ☐ |
| | Cancels previous calls | ☐ |
| `slugify()` | Converts to lowercase | ☐ |
| | Replaces spaces with hyphens | ☐ |
| | Removes special characters | ☐ |

**Test Files:**
- `townhall-frontend/__tests__/lib/utils.test.ts`

### 5.2 API Client

| Function | Test Cases | Status |
|----------|------------|--------|
| `getEvents()` | Fetches events successfully | ☐ |
| | Handles network errors | ☐ |
| `getEvent()` | Fetches single event | ☐ |
| | Returns null for 404 | ☐ |
| `registerForEvent()` | Submits registration | ☐ |
| | Handles API errors | ☐ |
| `getBlogPosts()` | Fetches posts | ☐ |
| `getBlogPost()` | Fetches single post | ☐ |
| `getVlogs()` | Fetches vlogs | ☐ |
| `submitVolunteerForm()` | Submits application | ☐ |
| `submitContactForm()` | Submits contact | ☐ |
| `subscribeNewsletter()` | Subscribes email | ☐ |

**Test Files:**
- `townhall-frontend/__tests__/lib/api.test.ts`

---

## 6. Accessibility Testing

### 6.1 WCAG 2.1 AA Compliance

| Page | Test Cases | Status |
|------|------------|--------|
| All Pages | No critical axe violations | ☐ |
| | Proper heading hierarchy | ☐ |
| | All images have alt text | ☐ |
| | Form labels associated | ☐ |
| | Color contrast meets standards | ☐ |
| | Focus visible on all elements | ☐ |
| | Keyboard navigation works | ☐ |

**Test Files:**
- `townhall-frontend/tests/accessibility/a11y.spec.ts`

### 6.2 Screen Reader Compatibility

| Feature | Test Cases | Status |
|---------|------------|--------|
| Navigation | Landmarks properly labeled | ☐ |
| Forms | Error messages announced | ☐ |
| Modals | Focus trapped correctly | ☐ |
| Toasts | Alerts announced | ☐ |

---

## 7. Performance Testing

### 7.1 Lighthouse Scores

| Metric | Target | Status |
|--------|--------|--------|
| Performance | > 80 | ☐ |
| Accessibility | > 90 | ☐ |
| Best Practices | > 90 | ☐ |
| SEO | > 90 | ☐ |

**Test Files:**
- `townhall-frontend/tests/performance/lighthouse.spec.ts`

---

## 8. Integration Testing

### 8.1 End-to-End Flows

| Flow | Steps | Status |
|------|-------|--------|
| **Event Discovery to Registration** | Home → Events → Detail → Register → Confirmation | ☐ |
| **Blog Reading** | Home → Blog → Article → Share | ☐ |
| **Volunteer Application** | Home → Volunteer → Form → Submit → Confirmation | ☐ |
| **Contact Submission** | Home → Contact → Form → Submit → Confirmation | ☐ |
| **Newsletter Signup** | Footer → Email → Submit → Confirmation | ☐ |

---

## 9. Error Handling Testing

### 9.1 Frontend Error States

| Scenario | Expected Behavior | Status |
|----------|-------------------|--------|
| API unavailable | Shows error message | ☐ |
| Invalid form data | Shows validation errors | ☐ |
| 404 page | Shows custom 404 | ☐ |
| Network timeout | Shows retry option | ☐ |

### 9.2 Backend Error States

| Scenario | Expected Response | Status |
|----------|-------------------|--------|
| Invalid request body | 400 Bad Request | ☐ |
| Resource not found | 404 Not Found | ☐ |
| Rate limit exceeded | 429 Too Many Requests | ☐ |
| Server error | 500 Internal Server Error | ☐ |

---

## 10. Pre-Deployment Checklist

### 10.1 Environment Setup

| Item | Verified | Status |
|------|----------|--------|
| All environment variables set | | ☐ |
| Sanity CMS accessible | | ☐ |
| Resend API key valid | | ☐ |
| HubSpot API key valid (if used) | | ☐ |
| OpenAI API key valid (if used) | | ☐ |
| Discord webhooks configured | | ☐ |

### 10.2 Build Verification

| Item | Command | Status |
|------|---------|--------|
| Backend builds | `cd townhall-backend && npm run build` | ☐ |
| Frontend builds | `cd townhall-frontend && npm run build` | ☐ |
| No TypeScript errors | Both builds pass | ☐ |
| No lint errors | `npm run lint` | ☐ |

### 10.3 Test Suite Passes

| Suite | Command | Status |
|-------|---------|--------|
| Backend unit tests | `cd townhall-backend && npm test` | ☐ |
| Frontend unit tests | `cd townhall-frontend && npm run test:unit` | ☐ |
| E2E tests | `cd townhall-frontend && npm run test:e2e` | ☐ |
| Accessibility tests | `cd townhall-frontend && npm run test:a11y` | ☐ |

---

## 11. Manual Testing Checklist

### 11.1 Cross-Browser Testing

| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | ☐ | ☐ | |
| Firefox | ☐ | ☐ | |
| Safari | ☐ | ☐ | |
| Edge | ☐ | N/A | |

### 11.2 Responsive Design

| Breakpoint | Width | Status |
|------------|-------|--------|
| Mobile | 320px | ☐ |
| Mobile | 375px | ☐ |
| Tablet | 768px | ☐ |
| Desktop | 1024px | ☐ |
| Large Desktop | 1440px | ☐ |

---

## Test Coverage Targets

| Area | Target | Current |
|------|--------|---------|
| Frontend Statements | 70% | ~98% |
| Frontend Branches | 70% | ~96% |
| Frontend Functions | 70% | ~97% |
| Backend Statements | 70% | TBD |
| Backend Branches | 70% | TBD |
| Backend Functions | 70% | TBD |

---

## Notes for Testers

1. **Before testing**, ensure both frontend and backend servers are running
2. **For email tests**, check the Resend dashboard or use a test email
3. **For CMS tests**, verify Sanity Studio has test content
4. **For AI tests**, these are mocked in unit tests; manual testing requires valid API keys
5. **Report bugs** with steps to reproduce, expected vs actual behavior, and screenshots
