# Frontend-Backend Integration Guide

## Town Hall - Integration Documentation

This document maps the integration between the frontend (Next.js) and backend (Express/Sanity) systems.

**Branch:** `integration`  
**Last Updated:** December 8, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints Mapping](#api-endpoints-mapping)
3. [Data Type Compatibility](#data-type-compatibility)
4. [Environment Configuration](#environment-configuration)
5. [Integration Testing](#integration-testing)
6. [Known Issues](#known-issues)
7. [Deployment](#deployment)

---

## Overview

### Architecture

```
Frontend (Next.js 14)     Backend (Express + TypeScript)
Port: 3000                Port: 3001
├── Pages/Routes          ├── API Routes
├── API Client            ├── Services (Sanity, Email, AI)
└── Components            └── Types/Interfaces
```

### Communication

- **Protocol:** HTTP/HTTPS REST API
- **Format:** JSON
- **CORS:** Enabled for `http://localhost:3000` (dev) and production URLs
- **Authentication:** Public endpoints (no auth required for MVP)

---

## API Endpoints Mapping

### ✅ Events API

| Frontend Expectation | Backend Implementation | Status |
|---------------------|------------------------|--------|
| `GET /api/events` | `GET /api/events` | ✅ Compatible |
| Returns: `{ events: Event[] }` | Returns: `{ events: Event[] }` | ✅ Match |
| `GET /api/events/:slug` | `GET /api/events/:slug` | ✅ Compatible |
| Returns: `{ event: Event }` | Returns: `{ event: Event }` | ✅ Match |
| `POST /api/events/:slug/register` | `POST /api/events/:slug/register` | ✅ Compatible |
| Body: `{ firstName, lastName, email, phone? }` | Body: `{ firstName, lastName, email, phone? }` | ✅ Match |

**Frontend Type:**
```typescript
interface Event {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;        // YYYY-MM-DD format
  time: string;        // "6:00 PM" format
  endTime?: string;
  location: string;
  address?: string;
  capacity: number;
  registered: number;
  tags: string[];
  image?: string;
  instructor?: string;
  instructorBio?: string;
}
```

**Backend Output:**
```typescript
{
  slug: event.slug.current,
  title: event.title,
  description: event.description,
  date: event.dateTime.split('T')[0],  // ✅ Matches frontend
  time: new Date(event.dateTime).toLocaleTimeString(...),  // ✅ Matches frontend
  location: event.location,
  capacity: event.maxAttendees,
  registered: registrationCount,
  tags: event.tags || [],
  image: event.featuredImage?.asset?.url
}
```

**Status:** ✅ **Fully Compatible**

---

### ✅ Blog API

| Frontend Expectation | Backend Implementation | Status |
|---------------------|------------------------|--------|
| `GET /api/blog` | `GET /api/blog` | ✅ Compatible |
| Returns: `{ posts: BlogPost[] }` | Returns: `{ posts: BlogPost[] }` | ✅ Match |
| `GET /api/blog/:slug` | `GET /api/blog/:slug` | ✅ Compatible |
| Returns: `{ post: BlogPost }` | Returns: `{ post: BlogPost }` | ✅ Match |

**Frontend Type:**
```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  authorBio?: string;
  tags: string[];
  image?: string;
  readTime?: string;
}
```

**Backend Output:**
```typescript
{
  slug: post.slug.current,
  title: post.title,
  excerpt: post.excerpt,
  content: sanityService.portableTextToHtml(post.content),
  date: post.publishedAt,
  author: post.author.name,
  authorBio: post.author.bio,
  tags: post.tags || [],
  image: post.featuredImage?.asset?.url,
  readTime: post.readTime
}
```

**Status:** ✅ **Fully Compatible**

---

### ✅ Vlogs API

| Frontend Expectation | Backend Implementation | Status |
|---------------------|------------------------|--------|
| `GET /api/vlogs` | `GET /api/vlogs` | ✅ Compatible |
| Returns: `{ vlogs: Vlog[] }` | Returns: `{ vlogs: VlogPost[] }` | ✅ Match |

**Frontend Type:**
```typescript
interface Vlog {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;      // ⚠️ Not in backend
  date: string;
  youtubeId: string;
}
```

**Backend Output:**
```typescript
{
  id: vlog._id,
  title: vlog.title,
  description: vlog.description || vlog.summary,
  thumbnail: vlog.thumbnail?.asset?.url,
  duration: vlog.duration,
  date: vlog.publishedAt,
  youtubeId: vlog.youtubeId,
  // views: NOT IMPLEMENTED ⚠️
}
```

**Status:** ⚠️ **Mostly Compatible** (views field missing from backend)

**Resolution:** Frontend should handle missing `views` field gracefully (default to 0 or hide display).

---

### ✅ Volunteer API

| Frontend Expectation | Backend Implementation | Status |
|---------------------|------------------------|--------|
| `POST /api/volunteer` | `POST /api/volunteer` | ✅ Compatible |
| Body: `VolunteerData` | Body: `VolunteerRequest` | ✅ Match |

**Frontend Type:**
```typescript
interface VolunteerData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest: string;
  availability?: string;
  experience?: string;
  motivation: string;
}
```

**Backend Type:**
```typescript
interface VolunteerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest: string;
  availability?: string;
  experience?: string;
  motivation: string;
}
```

**Status:** ✅ **Fully Compatible**

---

### ✅ Contact API

| Frontend Expectation | Backend Implementation | Status |
|---------------------|------------------------|--------|
| `POST /api/contact` | `POST /api/contact` | ✅ Compatible |
| Body: `ContactData` | Body: matches | ✅ Match |

**Frontend Type:**
```typescript
interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

**Backend Expected:**
```typescript
{
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

**Status:** ✅ **Fully Compatible**

---

### 🆕 AI API (Backend Only)

**Note:** These endpoints exist in the backend but are not yet integrated into the frontend.

| Endpoint | Purpose | Status |
|----------|---------|--------|
| `POST /api/ai/transcribe-event` | Audio transcription → Blog post | 🟡 Not integrated |
| `POST /api/ai/generate-outline` | Workshop outline generator | 🟡 Not integrated |
| `POST /api/ai/generate-flyer` | Event flyer generation | 🟡 Not integrated |

**Future Integration:** These can be added to an admin dashboard or content creation workflow.

---

### 🆕 Webhooks API (Backend Only)

**Note:** These are webhook receivers for external triggers, not used by frontend.

| Endpoint | Purpose | Status |
|----------|---------|--------|
| `POST /api/webhooks/volunteer-approved` | Volunteer approval notification | ✅ Backend only |
| `POST /api/webhooks/event-published` | Event publication notification | ✅ Backend only |
| `POST /api/webhooks/content-published` | Content publication notification | ✅ Backend only |

---

## Data Type Compatibility

### ✅ Compatible Types

All core types are compatible between frontend and backend:

| Type | Frontend | Backend | Status |
|------|----------|---------|--------|
| Event | ✅ | ✅ | Fully compatible |
| BlogPost | ✅ | ✅ | Fully compatible |
| Registration | ✅ | ✅ | Fully compatible |
| Volunteer | ✅ | ✅ | Fully compatible |
| Contact | ✅ | ✅ | Fully compatible |

### ⚠️ Minor Differences

**1. Vlog.views**
- Frontend expects `views: number`
- Backend doesn't provide this field
- **Fix:** Frontend defaults to 0 or hides view count

**2. Date Formats**
- Frontend expects: `"2025-12-15"` (YYYY-MM-DD)
- Backend provides: `"2025-12-15"` ✅ Compatible
- Time format: `"6:00 PM"` ✅ Compatible

**3. Slug Format**
- Frontend expects: `slug: string`
- Backend has: `slug: { current: string }`
- Backend transforms to: `slug.current` ✅ Compatible

---

## Environment Configuration

### Frontend (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# For production
# NEXT_PUBLIC_API_URL=https://api.townhallnewark.org/api
```

### Backend (.env)

```bash
# Server
NODE_ENV=development
PORT=3001
API_BASE_URL=http://localhost:3001

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# For production
# FRONTEND_URL=https://townhallnewark.org

# Sanity CMS
SANITY_PROJECT_ID=pvm742xo
SANITY_DATASET=production
SANITY_TOKEN=sk_...

# Email Service
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@townhallnewark.org

# HubSpot CRM
HUBSPOT_API_KEY=pat-na1-...

# OpenAI (Optional - AI features)
OPENAI_API_KEY=sk-proj-...
```

### Docker Compose

```yaml
services:
  frontend:
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3001/api
    depends_on:
      - backend
  
  backend:
    environment:
      - FRONTEND_URL=http://frontend:3000
```

---

## Integration Testing

### Local Development Setup

**1. Start Backend:**
```bash
cd townhall-backend
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
# Backend running on http://localhost:3001
```

**2. Start Frontend:**
```bash
cd townhall-frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local
npm run dev
# Frontend running on http://localhost:3000
```

**3. Test Integration:**
```bash
# In browser, visit:
http://localhost:3000/events        # Should load events from backend
http://localhost:3000/blog          # Should load blog posts
http://localhost:3000/volunteer     # Should submit to backend
```

### Testing Checklist

- [ ] Events page loads and displays events from backend
- [ ] Event registration form submits successfully
- [ ] Confirmation email received after registration
- [ ] Blog posts load with correct formatting
- [ ] Volunteer form submits successfully
- [ ] Contact form submits successfully
- [ ] Error messages display correctly on failures
- [ ] CORS works (no browser console errors)
- [ ] Images load correctly from Sanity CDN

### Integration Test Suite

**Frontend Integration Tests:**
```bash
cd townhall-frontend
npm test -- tests/integration/api.spec.ts
```

**Backend API Tests:**
```bash
cd townhall-backend
npm test
```

**E2E Tests:**
```bash
cd townhall-frontend
npm run test:e2e
```

---

## Known Issues

### ⚠️ Issue 1: Vlog Views Counter

**Problem:** Frontend expects `views` field but backend doesn't track views.

**Impact:** Low - Views counter will show 0 or be hidden.

**Resolution Options:**
1. Frontend: Default to 0 and hide if 0
2. Backend: Add view tracking (future enhancement)
3. Backend: Fetch from YouTube API (requires API key)

**Status:** 🟡 Documented, low priority

---

### ⚠️ Issue 2: Newsletter Subscription

**Problem:** Frontend has newsletter signup, but backend doesn't have endpoint.

**Impact:** Medium - Newsletter signups won't work.

**Resolution:**
1. Remove newsletter form from frontend, OR
2. Add `/api/newsletter` endpoint to backend

**Status:** 🟡 Needs decision

---

### ✅ Issue 3: Rate Limiting

**Problem:** Backend rate limits may affect frontend during development.

**Impact:** Low - Only affects high-frequency testing.

**Resolution:** Increase rate limit in backend `.env`:
```bash
RATE_LIMIT_MAX_REQUESTS=10000  # For development
```

**Status:** ✅ Documented

---

## Deployment

### Option 1: Monorepo Deployment (Recommended)

**Deploy both together:**

```bash
# Build both applications
cd townhall-backend && npm run build
cd townhall-frontend && npm run build

# Deploy with Docker Compose
docker-compose up -d
```

### Option 2: Separate Deployments

**Backend:**
- Deploy to: Render, Railway, AWS, or DigitalOcean
- Get backend URL: `https://api.townhallnewark.org`

**Frontend:**
- Deploy to: Vercel, Netlify, or same platform as backend
- Set environment variable:
  ```
  NEXT_PUBLIC_API_URL=https://api.townhallnewark.org/api
  ```

### Environment Variables Checklist

**Frontend Production:**
- ✅ `NEXT_PUBLIC_API_URL` = backend API URL

**Backend Production:**
- ✅ `FRONTEND_URL` = frontend URL (for CORS)
- ✅ `SANITY_PROJECT_ID` = pvm742xo
- ✅ `SANITY_TOKEN` = production token
- ✅ `RESEND_API_KEY` = production key
- ✅ `HUBSPOT_API_KEY` = production key
- ✅ `OPENAI_API_KEY` = optional, for AI features

---

## Testing Production Integration

### 1. Health Check

```bash
# Backend health
curl https://api.townhallnewark.org/api/health

# Expected: { "status": "healthy", ... }
```

### 2. CORS Verification

```bash
# Check CORS headers
curl -I -X OPTIONS https://api.townhallnewark.org/api/events \
  -H "Origin: https://townhallnewark.org"

# Should include:
# Access-Control-Allow-Origin: https://townhallnewark.org
```

### 3. End-to-End Test

1. Visit production frontend
2. Navigate to Events page
3. Register for an event
4. Check email for confirmation
5. Verify registration in Sanity CMS
6. Verify contact in HubSpot

---

## API Contract Validation

### Automated Contract Testing

Create `integration-tests.sh`:

```bash
#!/bin/bash

API_URL="http://localhost:3001/api"

echo "Testing API contract..."

# Test events endpoint
echo "Testing GET /events..."
curl -s $API_URL/events | jq '.events[0] | has("slug", "title", "date")'

# Test blog endpoint
echo "Testing GET /blog..."
curl -s $API_URL/blog | jq '.posts[0] | has("slug", "title", "author")'

# Test event registration
echo "Testing POST /events/:slug/register..."
curl -s -X POST $API_URL/events/test-event/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com"}' \
  | jq 'has("success", "registration")'

echo "Contract validation complete!"
```

Run with:
```bash
chmod +x integration-tests.sh
./integration-tests.sh
```

---

## Support

For integration issues:
- Backend API docs: `townhall-backend/docs/API.md`
- Frontend docs: `townhall-frontend/docs/`
- GitHub Issues: [Town Hall Repository](https://github.com/jam398/Town-hall)
- Email: hello@townhallnewark.org

---

## Version Compatibility

| Component | Version | Status |
|-----------|---------|--------|
| Frontend (Next.js) | 14.x | ✅ Stable |
| Backend (Node.js) | 20.x | ✅ Stable |
| Sanity CMS | v3 | ✅ Stable |
| API Version | 1.0 | ✅ Stable |

**Last Integration Test:** December 8, 2025  
**Test Status:** ✅ All core endpoints compatible
