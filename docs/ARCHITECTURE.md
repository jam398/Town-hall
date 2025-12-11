# Town Hall Newark - Architecture Document

## System Overview

Town Hall Newark follows a **decoupled architecture** with a Next.js frontend, Express.js backend API, and Sanity.io as the headless CMS.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │   Web Browser   │    │  Mobile Browser │    │  Discord Bot    │         │
│  └────────┬────────┘    └────────┬────────┘    └────────┬────────┘         │
└───────────┼──────────────────────┼──────────────────────┼───────────────────┘
            │                      │                      │
            ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (Next.js 14)                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  App Router │ React 18 │ TailwindCSS │ TypeScript │ React Hook Form  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  Port: 3000                                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
            │
            │ REST API Calls
            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BACKEND API (Express.js)                            │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Routes │ Middleware │ Services │ Validation │ Error Handling        │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  Port: 3001                                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
            │
            │ Service Layer
            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL SERVICES                                  │
├─────────────────┬─────────────────┬─────────────────┬───────────────────────┤
│   Sanity CMS    │     Resend      │    HubSpot      │       OpenAI          │
│   (Content)     │    (Email)      │     (CRM)       │    (AI Services)      │
└─────────────────┴─────────────────┴─────────────────┴───────────────────────┘
```

---

## 1. Frontend Architecture

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.0 | React framework with App Router |
| React | 18.2.0 | UI library |
| TypeScript | 5.3.x | Type safety |
| TailwindCSS | 3.4.x | Utility-first CSS |
| React Hook Form | 7.49.x | Form management |
| Zod | 3.22.x | Schema validation |
| Lucide React | 0.300.x | Icon library |
| Inter Font | Variable | Swiss Modern typography |

### Design System: Swiss Modern Style

The frontend implements the **Swiss Modern (International Typographic Style)** design system, characterized by:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SWISS DESIGN PRINCIPLES                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │   GRID SYSTEM   │  │   TYPOGRAPHY    │  │   WHITESPACE    │              │
│  │  12-col layout  │  │  Inter font     │  │  Generous gaps  │              │
│  │  24px gutters   │  │  Bold headlines │  │  Content focus  │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │  MINIMALISM     │  │  HIGH CONTRAST  │  │  ASYMMETRY      │              │
│  │  No decoration  │  │  Black/White    │  │  Dynamic layout │              │
│  │  Purpose-driven │  │  Red accents    │  │  Visual flow    │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Color System

| Token | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Black | `#0A0A0A` | `--swiss-black` | Headlines, primary text |
| White | `#FFFFFF` | `--swiss-white` | Backgrounds, cards |
| Red | `#E53935` | `--swiss-red` | CTAs, accents |
| Gray 600 | `#6B7280` | `--swiss-gray` | Secondary text |
| Gray 100 | `#F5F5F5` | `--swiss-light` | Section backgrounds |

#### Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Display | 64px | 700 | 1.0 |
| H1 | 48px | 700 | 1.1 |
| H2 | 32px | 600 | 1.2 |
| H3 | 24px | 600 | 1.3 |
| Body | 16px | 400 | 1.6 |
| Caption | 14px | 400 | 1.5 |

#### Spacing System (8px base unit)

```
xs:  4px  │  sm:  8px  │  md: 16px  │  lg: 24px
xl: 32px  │ 2xl: 48px  │ 3xl: 64px  │ 4xl: 96px
```

### Directory Structure

```
townhall-frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   ├── about/              # About page
│   ├── blog/               # Blog listing & detail pages
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── events/             # Events listing & detail pages
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── vlogs/              # Vlog listing page
│   ├── volunteer/          # Volunteer application page
│   └── contact/            # Contact form page
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   └── ...
│   ├── forms/              # Form components
│   │   ├── ContactForm.tsx
│   │   ├── RegistrationForm.tsx
│   │   └── VolunteerForm.tsx
│   └── layout/             # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── api.ts              # API client functions
│   ├── utils.ts            # Utility functions
│   └── data/               # Static/mock data
├── __tests__/              # Jest unit tests
└── tests/                  # Playwright E2E tests
    ├── e2e/
    ├── accessibility/
    ├── visual/
    └── performance/
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        App Layout                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                      Header                            │  │
│  │  Logo │ Navigation │ Mobile Menu                       │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    Page Content                        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│  │  │  EventCard  │  │  BlogCard   │  │    Forms    │    │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                      Footer                            │  │
│  │  Links │ Newsletter │ Social │ Copyright               │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   Toast Provider                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Backend Architecture

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Express.js | 4.18.x | Web framework |
| TypeScript | 5.3.x | Type safety |
| Sanity Client | 6.10.x | CMS integration |
| Resend | 3.0.x | Email service |
| OpenAI | 6.10.x | AI services |
| Zod | 3.22.x | Validation |
| Helmet | 7.1.x | Security headers |

### Directory Structure

```
townhall-backend/
├── src/
│   ├── index.ts            # Application entry point
│   ├── api/                # Route handlers
│   │   ├── events.ts       # GET /events, GET /events/:slug
│   │   ├── registrations.ts # POST /events/register
│   │   ├── blog.ts         # GET /blog, GET /blog/:slug
│   │   ├── vlogs.ts        # GET /vlogs
│   │   ├── volunteer.ts    # POST /volunteer
│   │   ├── contact.ts      # POST /contact
│   │   ├── newsletter.ts   # POST /newsletter
│   │   ├── ai.ts           # AI endpoints
│   │   ├── webhooks.ts     # Discord/HubSpot webhooks
│   │   └── health.ts       # Health check endpoint
│   ├── services/           # Business logic
│   │   ├── sanity.ts       # Sanity CMS operations
│   │   ├── email.ts        # Email templates & sending
│   │   ├── hubspot.ts      # CRM integration
│   │   └── ai.ts           # OpenAI integrations
│   ├── middleware/         # Express middleware
│   │   ├── rateLimit.ts    # Rate limiting
│   │   └── errorHandler.ts # Error handling
│   └── types/              # TypeScript types
│       └── index.ts
├── tests/                  # Jest tests
│   ├── api/
│   └── services/
└── dist/                   # Compiled JavaScript
```

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/events` | List all events |
| GET | `/api/events/:slug` | Get event by slug |
| POST | `/api/events/register` | Register for event |
| GET | `/api/blog` | List all blog posts |
| GET | `/api/blog/:slug` | Get blog post by slug |
| GET | `/api/vlogs` | List all vlogs |
| POST | `/api/volunteer` | Submit volunteer application |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter` | Subscribe to newsletter |
| POST | `/api/ai/transcribe` | Transcribe audio |
| POST | `/api/ai/generate-blog` | Generate blog from transcript |
| POST | `/api/ai/workshop-outline` | Generate workshop outline |
| POST | `/api/ai/generate-flyer` | Generate event flyer |

### Middleware Pipeline

```
Request → Rate Limiter → CORS → Helmet → JSON Parser → Route Handler → Error Handler → Response
```

---

## 3. Data Architecture

### Sanity CMS Schemas

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│      Event      │     │    BlogPost     │     │    VlogPost     │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ _id             │     │ _id             │     │ _id             │
│ slug            │     │ slug            │     │ slug            │
│ title           │     │ title           │     │ title           │
│ description     │     │ excerpt         │     │ description     │
│ dateTime        │     │ content         │     │ youtubeId       │
│ location        │     │ author ────────►│     │ thumbnail       │
│ maxAttendees    │     │ publishedAt     │     │ duration        │
│ tags            │     │ tags            │     │ publishedAt     │
│ status          │     │ status          │     │ status          │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         │ references
         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Registration   │     │    Volunteer    │     │     Author      │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ _id             │     │ _id             │     │ _id             │
│ firstName       │     │ firstName       │     │ name            │
│ lastName        │     │ lastName        │     │ bio             │
│ email           │     │ email           │     │ avatar          │
│ event ─────────►│     │ interest        │     │ role            │
│ registeredAt    │     │ motivation      │     └─────────────────┘
│ attended        │     │ status          │
└─────────────────┘     └─────────────────┘
```

---

## 4. Integration Architecture

### Email Flow (Resend)

```
User Action → Backend → Email Service → Template Selection → Send → User Inbox
                              │
                              ├── Event Registration Confirmation
                              ├── Volunteer Application Confirmation
                              ├── Contact Form Notification
                              ├── Event Reminder (24h before)
                              ├── Post-Event Follow-up
                              └── Volunteer Approval Notification
```

### CRM Flow (HubSpot)

```
Form Submission → Backend → HubSpot Service → Create/Update Contact → Add to List
                                    │
                                    ├── Event Registrants List
                                    ├── Volunteers List
                                    └── Newsletter Subscribers List
```

### AI Services Flow (OpenAI)

```
┌─────────────────────────────────────────────────────────────┐
│                      AI Service Layer                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Whisper   │  │   GPT-4o    │  │   DALL-E    │         │
│  │ (Transcribe)│  │  (Generate) │  │  (Images)   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  Audio → Text     Text → Blog      Prompt → Flyer          │
│                   Text → Outline                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Testing Architecture

### Test Pyramid

```
                    ┌───────────────┐
                    │   E2E Tests   │  ← Playwright
                    │  (Few, Slow)  │
                   ─┴───────────────┴─
                  ┌───────────────────┐
                  │ Integration Tests │  ← Playwright
                  │    (Some, Med)    │
                 ─┴───────────────────┴─
                ┌───────────────────────┐
                │     Unit Tests        │  ← Jest
                │    (Many, Fast)       │
               ─┴───────────────────────┴─
```

### Test Coverage

| Layer | Tool | Coverage Target |
|-------|------|-----------------|
| Frontend Unit | Jest + Testing Library | 70%+ |
| Backend Unit | Jest + Supertest | 70%+ |
| E2E | Playwright | Critical paths |
| Accessibility | axe-core + Playwright | WCAG 2.1 AA |
| Performance | Lighthouse | Score > 80 |

---

## 6. Deployment Architecture

### Environment Configuration

```
┌─────────────────────────────────────────────────────────────┐
│                    Environment Variables                     │
├─────────────────────────────────────────────────────────────┤
│  .env (root)                                                 │
│  ├── SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN        │
│  ├── RESEND_API_KEY, RESEND_FROM_EMAIL                      │
│  ├── HUBSPOT_API_KEY                                        │
│  ├── OPENAI_API_KEY                                         │
│  ├── DISCORD_WEBHOOK_*                                      │
│  └── NODE_ENV, PORT, FRONTEND_URL                           │
│                                                              │
│  townhall-frontend/.env.local                                │
│  └── NEXT_PUBLIC_API_URL                                    │
└─────────────────────────────────────────────────────────────┘
```

### Docker Support

```yaml
# docker-compose.yml
services:
  frontend:
    build: ./townhall-frontend
    ports: ["3000:3000"]
    depends_on: [backend]
    
  backend:
    build: ./townhall-backend
    ports: ["3001:3001"]
    env_file: .env
```

---

## 7. Security Architecture

### Security Measures

| Layer | Measure | Implementation |
|-------|---------|----------------|
| Transport | HTTPS | Deployment platform |
| Headers | Security headers | Helmet.js |
| Input | Validation | Zod schemas |
| Rate Limiting | Request throttling | express-rate-limit |
| CORS | Origin restriction | cors middleware |
| Secrets | Environment variables | dotenv |

### Rate Limits

| Endpoint | Limit |
|----------|-------|
| General API | 100 req/min |
| Form submissions | 10 req/min |
| AI endpoints | 5 req/min |
