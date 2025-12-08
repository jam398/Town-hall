# Automation Workflows

## Town Hall Newark - Backend Automation Documentation

This document describes all automated workflows in the Town Hall Newark backend system.

---

## Overview

The backend uses a combination of:
- **Direct integrations** (Resend, HubSpot, Sanity)
- **Webhook endpoints** (for external triggers)
- **Scheduled jobs** (future: cron/task scheduler for reminders)

---

## Current Automated Workflows

### 1. Event Registration Flow

**Trigger:** User submits registration form via `POST /api/events/register`

**Steps:**
1. ✅ Validate registration data (Zod schema)
2. ✅ Check if event exists and is available
3. ✅ Check if event is full (`currentRegistrations >= maxAttendees`)
4. ✅ Check if user already registered (prevent duplicates)
5. ✅ Create registration in Sanity CMS
6. ✅ Sync contact to HubSpot CRM with tags: `['event:${eventSlug}']`
7. ✅ Send confirmation email to user (Resend)

**Error Handling:**
- HubSpot failures are logged but don't block registration
- Email failures throw error and rollback registration

**Files:**
- `src/api/registrations.ts`
- `src/services/sanity.ts`
- `src/services/hubspot.ts`
- `src/services/email.ts`

---

### 2. Volunteer Application Flow

**Trigger:** User submits volunteer form via `POST /api/volunteer`

**Steps:**
1. ✅ Validate volunteer data (Zod schema)
2. ✅ Create volunteer record in Sanity CMS (status: 'pending')
3. ✅ Sync contact to HubSpot CRM with tags: `['volunteer', 'interest:${interest}']`
4. ✅ Link HubSpot contact ID back to Sanity volunteer record
5. ✅ Send confirmation email to applicant (Resend)

**Error Handling:**
- HubSpot failures are logged but don't block application
- Email failures throw error

**Files:**
- `src/api/volunteer.ts`
- `src/services/sanity.ts`
- `src/services/hubspot.ts`
- `src/services/email.ts`

---

### 3. Contact Form Flow

**Trigger:** User submits contact form via `POST /api/contact`

**Steps:**
1. ✅ Validate contact form data (Zod schema)
2. ✅ Send notification email to team with inquiry details
3. ✅ Send confirmation email to user
4. ✅ Sync contact to HubSpot CRM with tags: `['contact-form']`

**Error Handling:**
- HubSpot failures are logged but don't block form submission
- Email failures throw error

**Files:**
- `src/api/contact.ts`
- `src/services/hubspot.ts`
- `src/services/email.ts`

---

## Planned Automated Workflows

### 4. Event Reminder Flow (To Be Implemented)

**Trigger:** Scheduled job 24 hours before event start time

**Steps:**
1. Query Sanity for events happening in next 24 hours
2. Query all registrations for those events
3. For each registration:
   - Send reminder email with event details
   - Include location, address, what to bring
4. Log reminder status in Sanity

**Implementation Options:**
- **Option A:** Use Vercel Cron Jobs (if deployed on Vercel)
- **Option B:** Use GitHub Actions scheduled workflow
- **Option C:** Use external cron service (cron-job.org)
- **Option D:** Use n8n self-hosted workflow

**Required:**
- New endpoint: `GET /api/events/upcoming` (filtered by next 24h)
- Email method: ✅ `emailService.sendEventReminder()` (already implemented)
- Cron job scheduler

---

### 5. Post-Event Follow-Up Flow (To Be Implemented)

**Trigger:** Scheduled job 24 hours after event end time

**Steps:**
1. Query Sanity for events that ended 24 hours ago
2. Query all registrations for those events
3. For each registration:
   - Send thank you email
   - Include recording link (if available)
   - Include summary blog post link (if available)
   - Suggest 3 upcoming related events
4. Update registration record with `followUpSent: true`

**Implementation:**
- Email method: ✅ `emailService.sendPostEventFollowUp()` (already implemented)
- Needs: Event recording URL field in Sanity schema
- Needs: Cron job scheduler

---

### 6. Volunteer Approval Flow (Manual Trigger)

**Trigger:** Admin approves volunteer in Sanity Studio

**Steps:**
1. Admin changes volunteer status from 'pending' to 'approved'
2. Webhook from Sanity triggers backend endpoint (or manual API call)
3. Send approval notification email
4. Include Discord invite link for volunteer channel
5. Optionally: Auto-assign Discord role (if bot implemented)

**Implementation:**
- Email method: ✅ `emailService.sendVolunteerApprovedNotification()` (already implemented)
- Needs: Webhook endpoint `POST /api/webhooks/volunteer-approved`
- Needs: Sanity webhook configuration

---

### 7. Discord Event Announcement (Deferred to Phase 2.2)

**Trigger:** New event published in Sanity CMS

**Steps:**
1. Sanity webhook fires when event status changes to 'published'
2. Backend receives webhook at `POST /api/webhooks/event-published`
3. Format event details into Discord embed
4. POST to Discord webhook URL for #events channel

**Implementation:**
- Needs: Webhook endpoint for Sanity
- Needs: Discord webhook integration
- Discord webhook URLs collected but not yet integrated

---

### 8. Discord Blog/Vlog Announcement (Deferred to Phase 2.2)

**Trigger:** New blog post or vlog published in Sanity CMS

**Steps:**
1. Sanity webhook fires when post status changes to 'published'
2. Backend receives webhook
3. Format post details into Discord embed
4. POST to Discord webhook URL for #announcements channel

**Implementation:**
- Needs: Webhook endpoint for Sanity
- Needs: Discord webhook integration

---

## Webhook Endpoints (To Be Implemented)

### Event Published Webhook
```
POST /api/webhooks/event-published
Content-Type: application/json

{
  "_id": "event-id",
  "title": "AI Workshop",
  "slug": { "current": "ai-workshop" },
  "dateTime": "2025-12-15T18:00:00Z",
  "location": "Newark Public Library"
}
```

### Volunteer Approved Webhook
```
POST /api/webhooks/volunteer-approved
Content-Type: application/json

{
  "_id": "volunteer-id",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com"
}
```

### Content Published Webhook (Blog/Vlog)
```
POST /api/webhooks/content-published
Content-Type: application/json

{
  "_id": "post-id",
  "_type": "blogPost", // or "vlogPost"
  "title": "Getting Started with AI",
  "slug": { "current": "getting-started-ai" },
  "excerpt": "Learn the basics..."
}
```

---

## Security Considerations

### Webhook Authentication

All webhook endpoints must verify the request source:

1. **Sanity Webhooks:**
   - Verify signature using Sanity webhook secret
   - Check `sanity-webhook-signature` header
   
2. **Discord Webhooks (outgoing):**
   - Store Discord webhook URLs in environment variables
   - Never expose in client code

3. **Rate Limiting:**
   - Apply stricter rate limits to webhook endpoints
   - Current: 10 requests per 15 minutes per IP

---

## External Service Integration

### Resend (Email)
- **Status:** ✅ Integrated
- **Usage:** All transactional emails
- **Rate Limit:** 100 emails/day (free tier)
- **Error Handling:** Failures throw errors, logged

### HubSpot (CRM)
- **Status:** ✅ Integrated
- **Usage:** Contact sync, tagging, list management
- **Rate Limit:** 100 API calls/10 seconds
- **Error Handling:** Failures logged but don't block operations

### Sanity CMS
- **Status:** ✅ Integrated
- **Usage:** Primary data storage
- **Rate Limit:** Generous (not a concern)
- **Error Handling:** Failures throw errors

### Discord (Webhooks)
- **Status:** ⏸️ Deferred
- **Usage:** Community notifications
- **Rate Limit:** 30 webhooks/minute per URL
- **Error Handling:** TBD

---

## Monitoring & Logging

### Current Logging
- All email sends logged to console
- HubSpot sync failures logged to console
- API errors caught by error handler middleware

### Future Enhancements
- Structured logging (Winston or Pino)
- Error tracking service (Sentry free tier)
- Webhook delivery status tracking
- Email delivery tracking via Resend webhooks

---

## Testing Strategy

### Current Tests (✅ Implemented)
- 74 total tests passing
- API endpoint tests with mocked services
- Service layer tests with mocked external APIs
- Error handling tests

### Future Tests
- Webhook endpoint tests
- Scheduled job tests (with mocked timers)
- Integration tests for full flows
- Discord webhook tests

---

## Deployment Considerations

### Environment Variables Required
```env
# Email (Resend)
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=noreply@townhallnewark.org

# CRM (HubSpot)
HUBSPOT_API_KEY=pat-xxx

# CMS (Sanity)
SANITY_PROJECT_ID=pvm742xo
SANITY_DATASET=production
SANITY_TOKEN=skxxx
SANITY_API_VERSION=2024-01-01

# Discord (for future use)
DISCORD_WEBHOOK_EVENTS=https://discord.com/api/webhooks/xxx
DISCORD_WEBHOOK_ANNOUNCEMENTS=https://discord.com/api/webhooks/xxx
DISCORD_WEBHOOK_TEAM=https://discord.com/api/webhooks/xxx

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Scheduled Jobs Setup
- If using Vercel: Configure in `vercel.json`
- If using GitHub Actions: Configure in `.github/workflows/`
- If using n8n: Configure workflows in n8n UI

---

## Next Steps

1. ✅ Complete email automation (Phase 2.1)
2. ⏸️ Implement Discord integration (Phase 2.2 - deferred)
3. ✅ Complete CRM integration tests (Phase 2.3)
4. ⏳ Implement webhook endpoints (Phase 2.4)
5. ⏳ Set up scheduled jobs for reminders (Phase 2.4)
6. 📋 Document API endpoints (Phase 5)

---

## Architecture Diagram

```
┌─────────────────┐
│   User/Admin    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│  API Endpoints  │◄────►│   Sanity     │
│  (Express.js)   │      │    CMS       │
└────────┬────────┘      └──────────────┘
         │
         ├──────────────┐
         │              │
         ▼              ▼
┌─────────────┐  ┌─────────────┐
│   Resend    │  │   HubSpot   │
│  (Email)    │  │    (CRM)    │
└─────────────┘  └─────────────┘
         │
         ▼
┌─────────────────┐
│ Discord Webhook │
│   (Future)      │
└─────────────────┘
```

---

**Last Updated:** December 8, 2025  
**Maintainer:** Backend Team  
**Status:** Phase 2 In Progress
