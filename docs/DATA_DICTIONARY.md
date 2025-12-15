# Town Hall Newark - Data Dictionary

This document provides a comprehensive reference of all data types, functions, utilities, and components used throughout the Town Hall Newark project.

---

## Table of Contents

1. [Design Tokens](#1-design-tokens)
2. [TypeScript Interfaces](#2-typescript-interfaces)
3. [API Functions](#3-api-functions)
4. [Utility Functions](#4-utility-functions)
5. [React Components](#5-react-components)
6. [Backend Services](#6-backend-services)
7. [Environment Variables](#7-environment-variables)

---

## 1. Design Tokens

The Town Hall design system uses Swiss Modern (International Typographic Style) design tokens for consistent styling across all components.

### Color Tokens

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `swiss-black` | `#0A0A0A` | `text-swiss-black`, `bg-swiss-black` | Headlines, primary text, primary buttons |
| `swiss-white` | `#FFFFFF` | `text-swiss-white`, `bg-swiss-white` | Backgrounds, cards, button text |
| `swiss-red` | `#E53935` | `text-swiss-red`, `bg-swiss-red` | CTAs, accents, focus states |
| `swiss-gray` | `#6B7280` | `text-swiss-gray`, `bg-swiss-gray` | Secondary text, icons |
| `swiss-light` | `#F5F5F5` | `text-swiss-light`, `bg-swiss-light` | Section backgrounds |
| `swiss-border` | `#E5E5E5` | `border-swiss-border` | Borders, dividers |
| `swiss-success` | `#10B981` | `text-swiss-success`, `bg-swiss-success` | Success states |
| `swiss-error` | `#EF4444` | `text-swiss-error`, `bg-swiss-error` | Error states |
| `swiss-warning` | `#F59E0B` | `text-swiss-warning`, `bg-swiss-warning` | Warning states |

### Typography Tokens

| Token | Font | Size | Weight | Line Height | Tailwind Class |
|-------|------|------|--------|-------------|----------------|
| `display` | Inter | 64px | 700 | 1.0 | `text-display` |
| `h1` | Inter | 48px | 700 | 1.1 | `text-h1` |
| `h2` | Inter | 32px | 600 | 1.2 | `text-h2` |
| `h3` | Inter | 24px | 600 | 1.3 | `text-h3` |
| `h4` | Inter | 20px | 600 | 1.4 | `text-h4` |
| `body` | Inter | 16px | 400 | 1.6 | `text-body` |
| `body-sm` | Inter | 14px | 400 | 1.5 | `text-body-sm` |
| `caption` | Inter | 12px | 400 | 1.5 | `text-caption` |
| `button` | Inter | 14px | 500 | 1.0 | `text-button` |

### Spacing Tokens

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `space-xs` | 4px | `p-1`, `m-1`, `gap-1` | Tight spacing |
| `space-sm` | 8px | `p-2`, `m-2`, `gap-2` | Small gaps |
| `space-md` | 16px | `p-4`, `m-4`, `gap-4` | Default spacing |
| `space-lg` | 24px | `p-6`, `m-6`, `gap-6` | Section padding |
| `space-xl` | 32px | `p-8`, `m-8`, `gap-8` | Large sections |
| `space-2xl` | 48px | `p-12`, `m-12`, `gap-12` | Hero sections |
| `space-3xl` | 64px | `p-16`, `m-16`, `gap-16` | Page sections |
| `space-4xl` | 96px | `p-24`, `m-24`, `gap-24` | Major divisions |

### Border Radius Tokens

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `radius-none` | 0px | `rounded-none` | Swiss Modern default |
| `radius-sm` | 2px | `rounded-sm` | Subtle rounding |
| `radius-md` | 4px | `rounded` | Cards, buttons |
| `radius-lg` | 8px | `rounded-lg` | Modals (use sparingly) |

### Shadow Tokens

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `shadow-none` | none | `shadow-none` | Flat elements |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-sm` | Cards |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | `shadow-md` | Elevated cards |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | `shadow-lg` | Modals, dropdowns |

### Grid Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `grid-cols-12` | 12 columns | Desktop layout |
| `grid-cols-8` | 8 columns | Tablet layout |
| `grid-cols-4` | 4 columns | Mobile layout |
| `gutter` | 24px | Column gaps |
| `max-width` | 1280px | Content container |

---

## 2. TypeScript Interfaces

### Frontend Types (`townhall-frontend/lib/api.ts`)

#### `Event`
Represents a community event.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `slug` | `string` | ✓ | URL-friendly identifier |
| `title` | `string` | ✓ | Event title |
| `description` | `string` | ✓ | Short description |
| `longDescription` | `string` | | Detailed description |
| `whatYouWillLearn` | `string[]` | | Learning outcomes |
| `date` | `string` | ✓ | Event date (ISO format) |
| `time` | `string` | ✓ | Start time (HH:mm) |
| `endTime` | `string` | | End time (HH:mm) |
| `location` | `string` | ✓ | Venue name |
| `address` | `string` | | Full address |
| `capacity` | `number` | ✓ | Maximum attendees |
| `registered` | `number` | ✓ | Current registrations |
| `tags` | `string[]` | ✓ | Category tags |
| `image` | `string` | | Featured image URL |
| `instructor` | `string` | | Instructor name |
| `instructorBio` | `string` | | Instructor biography |

#### `BlogPost`
Represents a blog article.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `slug` | `string` | ✓ | URL-friendly identifier |
| `title` | `string` | ✓ | Article title |
| `excerpt` | `string` | ✓ | Short summary |
| `content` | `string` | | Full article content |
| `date` | `string` | ✓ | Publication date |
| `author` | `string` | ✓ | Author name |
| `authorBio` | `string` | | Author biography |
| `tags` | `string[]` | ✓ | Category tags |
| `image` | `string` | | Featured image URL |
| `readTime` | `string` | | Estimated read time |

#### `Vlog`
Represents a video post.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | ✓ | Unique identifier |
| `title` | `string` | ✓ | Video title |
| `description` | `string` | ✓ | Video description |
| `thumbnail` | `string` | ✓ | Thumbnail URL |
| `duration` | `string` | ✓ | Video duration |
| `views` | `number` | ✓ | View count |
| `date` | `string` | ✓ | Publication date |
| `youtubeId` | `string` | ✓ | YouTube video ID |

#### `RegistrationData`
Data submitted when registering for an event.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `firstName` | `string` | ✓ | Registrant's first name |
| `lastName` | `string` | ✓ | Registrant's last name |
| `email` | `string` | ✓ | Email address |
| `phone` | `string` | | Phone number |
| `eventSlug` | `string` | ✓ | Event identifier |

#### `VolunteerData`
Data submitted in volunteer application.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `firstName` | `string` | ✓ | Applicant's first name |
| `lastName` | `string` | ✓ | Applicant's last name |
| `email` | `string` | ✓ | Email address |
| `phone` | `string` | | Phone number |
| `interest` | `string` | ✓ | Area of interest |
| `availability` | `string` | | Time availability |
| `experience` | `string` | | Relevant experience |
| `motivation` | `string` | ✓ | Why they want to volunteer |

#### `ContactData`
Data submitted via contact form.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✓ | Sender's name |
| `email` | `string` | ✓ | Email address |
| `subject` | `string` | ✓ | Message subject |
| `message` | `string` | ✓ | Message content |

#### `NewsletterData`
Newsletter subscription data.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `email` | `string` | ✓ | Subscriber email |

---

### Backend Types (`townhall-backend/src/types/index.ts`)

#### `Registration` (Sanity Document)

| Property | Type | Description |
|----------|------|-------------|
| `_id` | `string` | Sanity document ID |
| `_type` | `'registration'` | Document type |
| `firstName` | `string` | First name |
| `lastName` | `string` | Last name |
| `email` | `string` | Email address |
| `phone` | `string?` | Phone number |
| `event` | `Event \| string` | Reference to event |
| `registeredAt` | `string` | Registration timestamp |
| `attended` | `boolean?` | Attendance status |
| `confirmationSent` | `boolean?` | Email sent flag |
| `hubspotContactId` | `string?` | HubSpot contact ID |

#### `Volunteer` (Sanity Document)

| Property | Type | Description |
|----------|------|-------------|
| `_id` | `string` | Sanity document ID |
| `_type` | `'volunteer'` | Document type |
| `firstName` | `string` | First name |
| `lastName` | `string` | Last name |
| `email` | `string` | Email address |
| `interest` | `string` | Area of interest |
| `motivation` | `string` | Motivation statement |
| `status` | `'pending' \| 'approved' \| 'active' \| 'inactive'` | Application status |
| `appliedAt` | `string?` | Application timestamp |

---

## 2. API Functions

### Frontend API Client (`townhall-frontend/lib/api.ts`)

#### Events

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getEvents()` | none | `Promise<Event[]>` | Fetch all published events |
| `getEvent(slug)` | `slug: string` | `Promise<Event \| null>` | Fetch single event by slug |
| `registerForEvent(data)` | `data: RegistrationData` | `Promise<{success, message}>` | Register for an event |

#### Blog

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getBlogPosts()` | none | `Promise<BlogPost[]>` | Fetch all published posts |
| `getBlogPost(slug)` | `slug: string` | `Promise<BlogPost \| null>` | Fetch single post by slug |

#### Vlogs

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getVlogs()` | none | `Promise<Vlog[]>` | Fetch all published vlogs |

#### Forms

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `submitVolunteerForm(data)` | `data: VolunteerData` | `Promise<{success, message}>` | Submit volunteer application |
| `submitContactForm(data)` | `data: ContactData` | `Promise<{success, message}>` | Submit contact form |
| `subscribeNewsletter(data)` | `data: NewsletterData` | `Promise<{success, message}>` | Subscribe to newsletter |

#### Error Handling

```typescript
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,    // HTTP status code
    public code?: string      // Error code
  ) {}
}
```

---

## 3. Utility Functions

### Frontend Utilities (`townhall-frontend/lib/utils.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `cn(...inputs)` | `(...inputs: ClassValue[]) => string` | Merge Tailwind CSS classes with conflict resolution |
| `formatDate(date, options?)` | `(date: string \| Date, options?: Intl.DateTimeFormatOptions) => string` | Format date for display (e.g., "January 15, 2025") |
| `formatTime(time)` | `(time: string) => string` | Convert 24h to 12h format (e.g., "18:00" → "6:00 PM") |
| `generateGoogleCalendarUrl(event)` | `(event: CalendarEvent) => string` | Generate Google Calendar add URL |
| `generateICalContent(event)` | `(event: CalendarEvent) => string` | Generate iCal file content |
| `downloadICal(event)` | `(event: CalendarEvent) => void` | Trigger iCal file download |
| `truncate(text, maxLength)` | `(text: string, maxLength: number) => string` | Truncate text with ellipsis |
| `getShareUrls(url, title)` | `(url: string, title: string) => ShareUrls` | Generate social share URLs |
| `debounce(func, wait)` | `<T>(func: T, wait: number) => (...args) => void` | Debounce function calls |
| `slugify(text)` | `(text: string) => string` | Convert text to URL-friendly slug |

#### CalendarEvent Type

```typescript
interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  startDate: string;  // YYYY-MM-DD
  startTime: string;  // HH:mm
  endTime?: string;   // HH:mm
}
```

#### ShareUrls Type

```typescript
interface ShareUrls {
  twitter: string;
  facebook: string;
  linkedin: string;
  email: string;
}
```

---

## 4. React Components

### UI Components (`townhall-frontend/components/ui/`)

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `loading`, `disabled`, `asChild`, `href` | Multi-variant button with loading state |
| `Card` | `variant`, `className`, `children` | Container card with header/content/footer |
| `Input` | `label`, `error`, `helperText`, `type` | Form input with label and validation |
| `Textarea` | `label`, `error`, `helperText`, `rows` | Multi-line text input |
| `Select` | `label`, `error`, `options` | Dropdown select input |
| `Modal` | `isOpen`, `onClose`, `title`, `size`, `closeOnOverlayClick` | Dialog modal |
| `Toast` | (via context) | Notification toast system |
| `Pagination` | `currentPage`, `totalPages`, `onPageChange` | Page navigation |
| `SearchInput` | `value`, `onChange`, `onSearch`, `placeholder` | Search input with clear button |
| `TagFilter` | `tags`, `selectedTags`, `onTagToggle`, `onClearAll` | Tag filter chips |
| `EventCard` | `event` | Event listing card |
| `BlogCard` | `post` | Blog post listing card |

#### Button Variants

| Variant | Description |
|---------|-------------|
| `primary` | Blue background, white text |
| `secondary` | Gray background |
| `accent` | Red background (CTA) |
| `outline` | Border only |
| `ghost` | No background |

#### Button Sizes

| Size | Description |
|------|-------------|
| `sm` | Small (px-3 py-1.5) |
| `md` | Medium (px-4 py-2) - default |
| `lg` | Large (px-6 py-3) |

### Form Components (`townhall-frontend/components/forms/`)

| Component | Purpose | Validation |
|-----------|---------|------------|
| `RegistrationForm` | Event registration | Name, email required; email format |
| `VolunteerForm` | Volunteer application | Name, email, interest, motivation required |
| `ContactForm` | Contact submission | Name, email, subject, message required |

### Layout Components (`townhall-frontend/components/layout/`)

| Component | Description |
|-----------|-------------|
| `Header` | Navigation header with mobile menu |
| `Footer` | Site footer with links and newsletter |

### Toast System

```typescript
// Usage
const { addToast } = useToast();

addToast({
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message?: string,
  duration?: number  // ms, default 5000
});

// Helper functions
toastHelpers.success(context, title, message?);
toastHelpers.error(context, title, message?);
toastHelpers.warning(context, title, message?);
toastHelpers.info(context, title, message?);
```

---

## 5. Backend Services

### Sanity Service (`townhall-backend/src/services/sanity.ts`)

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getEvents()` | none | `Promise<Event[]>` | Fetch published events |
| `getEventBySlug(slug)` | `slug: string` | `Promise<Event \| null>` | Fetch event by slug |
| `getEventRegistrationCount(eventId)` | `eventId: string` | `Promise<number>` | Count registrations |
| `getBlogPosts()` | none | `Promise<BlogPost[]>` | Fetch published posts |
| `getBlogPostBySlug(slug)` | `slug: string` | `Promise<BlogPost \| null>` | Fetch post by slug |
| `createBlogPost(data)` | `data: Partial<BlogPost>` | `Promise<BlogPost>` | Create new post |
| `getVlogPosts()` | none | `Promise<VlogPost[]>` | Fetch published vlogs |
| `createRegistration(data)` | registration data | `Promise<Registration>` | Create registration |
| `checkExistingRegistration(email, eventId)` | `email`, `eventId` | `Promise<boolean>` | Check duplicate |
| `createVolunteer(data)` | volunteer data | `Promise<Volunteer>` | Create volunteer |

### Email Service (`townhall-backend/src/services/email.ts`)

| Function | Parameters | Description |
|----------|------------|-------------|
| `sendEventRegistrationConfirmation(data)` | `{to, firstName, eventTitle, eventDate, eventTime, eventLocation}` | Registration confirmation |
| `sendVolunteerApplicationConfirmation(data)` | `{to, firstName}` | Volunteer confirmation |
| `sendContactFormNotification(data)` | `{name, email, subject, message}` | Contact form notification |
| `sendEventReminder(data)` | `{to, firstName, eventTitle, ...}` | 24h event reminder |
| `sendPostEventFollowUp(data)` | `{to, firstName, eventTitle, recordingUrl?, ...}` | Post-event follow-up |
| `sendVolunteerApprovedNotification(data)` | `{to, firstName, discordInviteUrl?}` | Volunteer approval |

### AI Service (`townhall-backend/src/services/ai.ts`)

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `transcribeAudio(filePath)` | `filePath: string` | `Promise<string>` | Transcribe audio via Whisper |
| `generateBlogPostFromTranscript(data)` | `{transcript, eventTitle, ...}` | `Promise<BlogPost>` | Generate blog from transcript |
| `generateWorkshopOutline(data)` | `{topic, duration, audienceLevel, ...}` | `Promise<Outline>` | Generate workshop outline |
| `generateEventFlyer(data)` | `{eventTitle, eventDate, ...}` | `Promise<{imageUrl, prompt}>` | Generate flyer via DALL-E |
| `generateFlyerVariation(data)` | `{originalPrompt, variation}` | `Promise<string>` | Generate flyer variation |

### HubSpot Service (`townhall-backend/src/services/hubspot.ts`)

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `createOrUpdateContact(data)` | contact data | `Promise<{id}>` | Create/update CRM contact |
| `addContactToList(contactId, listId)` | IDs | `Promise<void>` | Add contact to list |

---

## 6. Environment Variables

### Root `.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | ✓ | Environment (development/production) |
| `PORT` | | Backend port (default: 3001) |
| `FRONTEND_URL` | ✓ | Frontend URL for CORS |
| `SANITY_PROJECT_ID` | ✓ | Sanity project ID |
| `SANITY_DATASET` | ✓ | Sanity dataset name |
| `SANITY_API_VERSION` | | Sanity API version |
| `SANITY_TOKEN` | ✓ | Sanity write token |
| `RESEND_API_KEY` | ✓ | Resend API key |
| `RESEND_FROM_EMAIL` | ✓ | Sender email address |
| `HUBSPOT_API_KEY` | | HubSpot API key |
| `OPENAI_API_KEY` | | OpenAI API key |
| `OPENAI_MODEL` | | OpenAI model (default: gpt-4o-mini) |
| `DISCORD_WEBHOOK_EVENTS` | | Discord webhook for events |
| `DISCORD_WEBHOOK_VOLUNTEERS` | | Discord webhook for volunteers |
| `RATE_LIMIT_WINDOW_MS` | | Rate limit window (default: 60000) |
| `RATE_LIMIT_MAX_REQUESTS` | | Max requests per window (default: 100) |

### Frontend `.env.local`

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | ✓ | Backend API URL |

---

## 7. NPM Scripts Reference

### Backend (`townhall-backend/`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `tsx src/index.ts` | Start dev server |
| `dev:watch` | `tsx watch src/index.ts` | Start with hot reload |
| `build` | `tsc` | Compile TypeScript |
| `start` | `node dist/index.js` | Start production server |
| `test` | `jest` | Run tests |
| `test:coverage` | `jest --coverage` | Run tests with coverage |

### Frontend (`townhall-frontend/`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start dev server |
| `build` | `next build` | Build for production |
| `start` | `next start` | Start production server |
| `test:unit` | `jest --coverage` | Run unit tests |
| `test:e2e` | `playwright test tests/e2e` | Run E2E tests |
| `test:a11y` | `playwright test tests/accessibility` | Run accessibility tests |
| `test:lighthouse` | `playwright test tests/performance` | Run performance tests |
