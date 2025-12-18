# Sanity Webhook Configuration Guide

## Overview

This guide shows you how to configure Sanity webhooks to automatically notify your backend when content is published (events, blog posts, or volunteer approvals).

---

## Prerequisites

- ✅ Sanity project set up and running
- ✅ Backend deployed and accessible (or use ngrok for local testing)
- ✅ Admin or Editor permissions in Sanity project

---

## Webhook Endpoints

Your backend has these webhook endpoints:

| Webhook | Trigger | URL |
|---------|---------|-----|
| **Event Published** | When event status changes to "published" | `/api/webhooks/event-published` |
| **Blog Published** | When blog post is published | `/api/webhooks/content-published` |
| **Volunteer Approved** | When volunteer status changes to "approved" | `/api/webhooks/volunteer-approved` |

---

## Step-by-Step Setup

### Step 1: Access Sanity Manage

1. Go to https://www.sanity.io/manage
2. Log in with your Sanity account
3. Select your project: **Town Hall Newark** (or your project name)

### Step 2: Navigate to API Settings

1. Click on the **API** tab in the left sidebar
2. Click on **Webhooks** section
3. Click **Add Webhook** button

### Step 3: Configure Event Published Webhook

#### Basic Settings

**Name:** `Event Published - Discord Notification`

**URL:** 
- **Production:** `https://your-backend.onrender.com/api/webhooks/event-published`
- **Local Testing:** `https://your-ngrok-url.ngrok-free.app/api/webhooks/event-published`

**Dataset:** `production` (or your dataset name)

**Trigger on:** 
- ✅ **Create** ✅ **Update**

**Filter:**
```groq
_type == "event" && status == "published"
```

**Projection (optional but recommended):**
```groq
{
  _id,
  _type,
  title,
  slug,
  description,
  dateTime,
  location,
  featuredImage,
  status
}
```

**HTTP Method:** `POST`

**HTTP Headers:**
```
Content-Type: application/json
```

**API Version:** `v2021-06-07` (or latest)

#### Secret (Optional but Recommended)

1. Generate a random secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. Add to Sanity webhook configuration:
   - Click **Add secret**
   - Paste the generated secret

3. Add to your backend `.env`:
```env
SANITY_WEBHOOK_SECRET=your_generated_secret_here
```

#### HTTP Request Body

**Include draft:** ❌ No (only send published content)

Click **Save**

---

### Step 4: Configure Blog Published Webhook

**Name:** `Content Published - Discord Notification`

**URL:**
- **Production:** `https://your-backend.onrender.com/api/webhooks/content-published`
- **Local Testing:** `https://your-ngrok-url.ngrok-free.app/api/webhooks/content-published`

**Dataset:** `production`

**Trigger on:** 
- ✅ **Create** ✅ **Update**

**Filter:**
```groq
_type in ["blogPost", "vlog"] && defined(publishedAt)
```

**Projection:**
```groq
{
  _id,
  _type,
  title,
  slug,
  excerpt,
  featuredImage,
  "author": author->{name, bio},
  publishedAt
}
```

**HTTP Method:** `POST`

**Secret:** (Use same secret as Event webhook)

Click **Save**

---

### Step 5: Configure Volunteer Approved Webhook

**Name:** `Volunteer Approved - Email Notification`

**URL:**
- **Production:** `https://your-backend.onrender.com/api/webhooks/volunteer-approved`
- **Local Testing:** `https://your-ngrok-url.ngrok-free.app/api/webhooks/volunteer-approved`

**Dataset:** `production`

**Trigger on:** 
- ✅ **Update** (when status changes)

**Filter:**
```groq
_type == "volunteer" && status == "approved"
```

**Projection:**
```groq
{
  _id,
  firstName,
  lastName,
  email,
  status
}
```

**HTTP Method:** `POST`

**Secret:** (Use same secret as other webhooks)

Click **Save**

---

## Testing Webhooks

### Option 1: Test with Sanity UI

1. Go to your Sanity Studio (http://localhost:3333 or your Studio URL)
2. Create or edit an event
3. Change **Status** to "Published"
4. Click **Publish**
5. Check:
   - Sanity webhook logs (Manage → API → Webhooks → Click webhook → Deliveries)
   - Backend logs
   - Discord channel for notification

### Option 2: Test with ngrok (Local Development)

#### Install ngrok
```bash
# Mac/Linux
brew install ngrok

# Windows
choco install ngrok

# Or download from https://ngrok.com/download
```

#### Start ngrok tunnel
```bash
# Start your backend first
cd townhall-backend
npm run dev

# In another terminal, start ngrok
ngrok http 3001
```

You'll see output like:
```
Forwarding    https://abc123.ngrok-free.app -> http://localhost:3001
```

#### Configure Sanity webhook
Use the ngrok URL:
```
https://abc123.ngrok-free.app/api/webhooks/event-published
```

#### Test
1. Publish an event in Sanity
2. Check ngrok web interface: http://127.0.0.1:4040
3. See real-time webhook requests and responses

### Option 3: Manual Test with curl

```bash
# Test event-published webhook
curl -X POST http://localhost:3001/api/webhooks/event-published \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "test-123",
    "title": "Test Event",
    "slug": {"current": "test-event"},
    "description": "Testing webhook",
    "dateTime": "2025-12-20T18:00:00Z",
    "location": "Town Hall Newark",
    "status": "published"
  }'

# Test content-published webhook
curl -X POST http://localhost:3001/api/webhooks/content-published \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "test-456",
    "_type": "blogPost",
    "title": "Test Blog Post",
    "slug": {"current": "test-post"},
    "excerpt": "Testing blog webhook",
    "publishedAt": "2025-12-17T10:00:00Z"
  }'

# Test volunteer-approved webhook
curl -X POST http://localhost:3001/api/webhooks/volunteer-approved \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "test-789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "status": "approved"
  }'
```

---

## Webhook Delivery Logs

### View in Sanity

1. Go to https://www.sanity.io/manage
2. Select your project
3. Click **API** → **Webhooks**
4. Click on a webhook name
5. Click **Deliveries** tab

You'll see:
- Timestamp of each webhook call
- HTTP status code (200 = success)
- Request payload
- Response from your backend
- Retry attempts

### Debug Failed Webhooks

**Common Issues:**

**404 Not Found**
- ❌ Wrong URL in webhook configuration
- ✅ Fix: Verify backend URL is correct

**401 Unauthorized**
- ❌ Invalid webhook secret
- ✅ Fix: Ensure `SANITY_WEBHOOK_SECRET` matches in both Sanity and backend `.env`

**500 Internal Server Error**
- ❌ Backend error processing webhook
- ✅ Fix: Check backend logs for error details

**Timeout**
- ❌ Backend not responding within 30 seconds
- ✅ Fix: Optimize backend processing (send Discord notification asynchronously)

---

## Webhook Security

### Enable Signature Verification

Your backend already has signature verification:

```typescript
// webhooks.ts
function verifySanityWebhook(req: Request): boolean {
  const signature = req.headers['sanity-webhook-signature'];
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  
  const body = JSON.stringify(req.body);
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  return `sha256=${hash}` === signature;
}
```

**To enable:**
1. Generate secret (see Step 3)
2. Add to Sanity webhook configuration
3. Add to backend `.env` as `SANITY_WEBHOOK_SECRET`

### Best Practices

✅ **Always use HTTPS** in production  
✅ **Use webhook secrets** to verify requests  
✅ **Return 200 OK quickly** (process async if needed)  
✅ **Log webhook failures** for debugging  
✅ **Test webhooks** before production deploy  

---

## Production Deployment

### Step 1: Deploy Backend

See [docs/DOCKER.md](DOCKER.md) for deployment options:
- Render (recommended)
- Railway
- Docker

### Step 2: Get Production URL

Example: `https://townhall-backend.onrender.com`

### Step 3: Update Sanity Webhooks

1. Go to Sanity Manage → API → Webhooks
2. Click on each webhook
3. Update URL to production backend URL
4. Save

### Step 4: Test Production

1. Publish content in Sanity Studio
2. Check Sanity webhook logs
3. Check Discord for notifications
4. Verify in backend logs (Render logs)

---

## Troubleshooting

### Webhook Not Triggering

**Check:**
1. ✅ Is webhook active? (toggle should be green in Sanity)
2. ✅ Does content match the filter? (test filter in Sanity Vision)
3. ✅ Is content published? (not draft)
4. ✅ Check Sanity webhook delivery logs

### Discord Notification Not Appearing

**Check:**
1. ✅ Backend received webhook? (check logs)
2. ✅ Discord webhook URL correct in `.env`?
3. ✅ Test Discord webhook manually:
```bash
curl -X POST "$DISCORD_EVENTS_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"content": "Test from curl"}'
```

### Local Testing with ngrok

**Issue:** ngrok URL changes every restart

**Solution:**
- Use ngrok paid plan for persistent URLs
- OR update Sanity webhook URL each time
- OR test with curl commands instead

---

## Sanity GROQ Filter Examples

### Event Filters

**Only future events:**
```groq
_type == "event" && status == "published" && dateTime >= now()
```

**Only past events:**
```groq
_type == "event" && status == "published" && dateTime < now()
```

**Specific event type:**
```groq
_type == "event" && status == "published" && eventType == "workshop"
```

### Blog Post Filters

**Only published posts:**
```groq
_type == "blogPost" && defined(publishedAt) && publishedAt <= now()
```

**Specific category:**
```groq
_type == "blogPost" && "AI" in categories[]->title
```

### Volunteer Filters

**Only approved volunteers:**
```groq
_type == "volunteer" && status == "approved"
```

**Rejected volunteers (for different handling):**
```groq
_type == "volunteer" && status == "rejected"
```

---

## Environment Variables Reference

Add these to your `.env` file:

```env
# Sanity Configuration
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
SANITY_WEBHOOK_SECRET=your_webhook_secret_here

# Discord Webhooks (used by backend)
DISCORD_EVENTS_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_EVENTS_WEBHOOK
DISCORD_ANNOUNCEMENTS_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ANNOUNCEMENTS_WEBHOOK
DISCORD_VOLUNTEERS_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_VOLUNTEERS_WEBHOOK

# Backend URL (for constructing links)
FRONTEND_URL=https://townhall-newark.vercel.app
```

---

## Quick Reference Card

### Webhook URLs
```
Event Published:     /api/webhooks/event-published
Content Published:   /api/webhooks/content-published
Volunteer Approved:  /api/webhooks/volunteer-approved
```

### Required Headers
```
Content-Type: application/json
sanity-webhook-signature: sha256=<signature>
```

### Test Commands
```bash
# Start backend
npm run dev

# Start ngrok (separate terminal)
ngrok http 3001

# Update Sanity webhook with ngrok URL
# Publish content in Sanity
# Check Discord for notification
```

---

## Next Steps

1. ✅ Configure webhooks in Sanity (follow this guide)
2. ✅ Test with ngrok or curl
3. ✅ Deploy backend to production
4. ✅ Update Sanity webhooks with production URL
5. ✅ Test end-to-end in production
6. ✅ Monitor webhook delivery logs

**Need help?** Check [docs/AUTOMATIONS.md](AUTOMATIONS.md) for automation details or [docs/API.md](API.md) for endpoint documentation.
