# n8n Workflow Documentation

## Overview

This project uses **n8n** (workflow automation tool) to handle Discord notifications for:
- Event publications (from Sanity CMS)
- Blog post publications (from Sanity CMS)  
- Volunteer form submissions (from frontend)

**Architecture:**
```
Sanity CMS → Backend API → n8n Workflows → Discord Channels
Frontend Form → Backend API → n8n Workflows → Discord Channels
```

---

## 🚀 Quick Start

### 1. Install n8n

**Local Development:**
```bash
npx n8n
# Runs on http://localhost:5678
```

**Production (Docker):**
```yaml
# Add to docker-compose.yml
n8n:
  image: n8nio/n8n:latest
  ports:
    - "5678:5678"
  environment:
    - N8N_BASIC_AUTH_ACTIVE=true
    - N8N_BASIC_AUTH_USER=admin
    - N8N_BASIC_AUTH_PASSWORD=your_secure_password
    - WEBHOOK_URL=https://your-domain.com
  volumes:
    - n8n_data:/home/node/.n8n
  restart: unless-stopped
```

### 2. Configure Environment Variables

Add to `townhall-backend/.env`:

```env
# n8n Configuration
N8N_WEBHOOK_BASE_URL=http://localhost:5678/webhook

# Discord Webhooks (used by n8n workflows)
DISCORD_EVENTS_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_EVENTS_WEBHOOK
DISCORD_ANNOUNCEMENTS_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ANNOUNCEMENTS_WEBHOOK
DISCORD_VOLUNTEERS_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_VOLUNTEERS_WEBHOOK
```

### 3. Import Workflows

1. Open n8n: http://localhost:5678
2. Go to **Workflows** → **Import from File**
3. Import the following files from `n8n-workflows/`:
   - `discord-event-published.json`
   - `discord-blog-published.json`
   - `discord-volunteer-signup.json`

### 4. Configure Discord Credentials

For each workflow:
1. Open the workflow
2. Click on the **Discord** node
3. Click **"Create New Credential"**
4. Paste the Discord webhook URL:
   - **Events workflow**: Use `DISCORD_EVENTS_WEBHOOK_URL`
   - **Blog workflow**: Use `DISCORD_ANNOUNCEMENTS_WEBHOOK_URL`
   - **Volunteer workflow**: Use `DISCORD_VOLUNTEERS_WEBHOOK_URL`
5. Save credential with descriptive name (e.g., "Discord Events Channel")

### 5. Activate Workflows

For each workflow:
1. Click **"Save"** button
2. Toggle to **"Active"** (or click **"Publish"**)
3. Note the production webhook URL (changes from `/webhook-test/` to `/webhook/`)

---

## 📋 Workflow Details

### 1. Discord - Event Published

**Purpose:** Sends Discord notification when an event is published in Sanity CMS

**Trigger:** Backend webhook at `http://localhost:5678/webhook/discord-event-published`

**Expected Data Format:**
```json
{
  "title": "AI Workshop",
  "slug": "ai-workshop",
  "description": "Learn AI fundamentals",
  "date": "December 20, 2025",
  "time": "6:00 PM",
  "location": "Newark Public Library",
  "registrationUrl": "http://localhost:3000/events/ai-workshop",
  "featuredImage": "https://cdn.sanity.io/images/..."
}
```

**Discord Message Format:**
```
🎉 **New Event Published!**

**AI Workshop**

📅 December 20, 2025 at 6:00 PM
📍 Newark Public Library

Learn AI fundamentals

👉 Register here: http://localhost:3000/events/ai-workshop
```

**Discord Channel:** #events

---

### 2. Discord - Blog Published

**Purpose:** Sends Discord notification when a blog post is published in Sanity CMS

**Trigger:** Backend webhook at `http://localhost:5678/webhook/discord-blog-published`

**Expected Data Format:**
```json
{
  "title": "The Future of AI in Newark",
  "slug": "future-of-ai-newark",
  "excerpt": "Exploring how AI is transforming our community",
  "author": {
    "name": "John Doe"
  },
  "postUrl": "http://localhost:3000/blog/future-of-ai-newark",
  "featuredImage": "https://cdn.sanity.io/images/..."
}
```

**Discord Message Format:**
```
📝 **New Blog Post!**

**The Future of AI in Newark**

Exploring how AI is transforming our community

✍️ By John Doe

👉 Read more: http://localhost:3000/blog/future-of-ai-newark
```

**Discord Channel:** #announcements

---

### 3. Discord - Volunteer Signup

**Purpose:** Sends Discord notification when someone submits volunteer form

**Trigger:** Backend webhook at `http://localhost:5678/webhook/discord-volunteer-signup`

**Expected Data Format:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "interest": "Community Outreach",
  "motivation": "I want to help build a stronger AI-literate community"
}
```

**Discord Message Format:**
```
🙋 **New Volunteer Application!**

👤 **Jane Smith**
📧 jane@example.com

**Interest:** Community Outreach

**Why they want to help:**
I want to help build a stronger AI-literate community
```

**Discord Channel:** #volunteers

---

## 🔗 Backend Integration

The backend triggers n8n workflows via the `n8nService`:

**File:** `townhall-backend/src/services/n8n.ts`

### Event Published
```typescript
// When event is published in Sanity
await n8nService.notifyEventPublished({
  title: event.title,
  slug: event.slug.current,
  description: event.description,
  date: "December 20, 2025",
  time: "6:00 PM",
  location: event.location,
  featuredImage: event.featuredImage,
});
```

### Blog Published
```typescript
// When blog post is published in Sanity
await n8nService.notifyBlogPublished({
  title: post.title,
  slug: post.slug.current,
  excerpt: post.excerpt,
  featuredImage: post.featuredImage,
  author: post.author,
});
```

### Volunteer Signup
```typescript
// When volunteer form is submitted
await n8nService.notifyVolunteerSignup({
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  interest: "Community Outreach",
  motivation: "I want to help...",
});
```

---

## 🔧 Sanity CMS Webhook Configuration

To enable Event and Blog notifications, configure webhooks in Sanity:

### Access Webhooks
1. Go to: https://www.sanity.io/manage
2. Select **Town Hall Newark** project
3. Navigate to **API → Webhooks**

### Webhook 1: Event Published

**Configuration:**
- **Name:** `Event Published`
- **URL:** `https://your-backend-url.com/api/webhooks/event-published`
  - Local dev: Use ngrok URL (e.g., `https://abc123.ngrok.io/api/webhooks/event-published`)
  - Production: Use deployed backend URL
- **Dataset:** `production`
- **Trigger on:**
  - ✅ Create
  - ✅ Update
- **Filter (GROQ):** `_type == "event"`
- **HTTP Method:** `POST`
- **API version:** `v2024-01-01`
- **Include drafts:** ❌ No (only published)

### Webhook 2: Blog Published

**Configuration:**
- **Name:** `Blog Published`
- **URL:** `https://your-backend-url.com/api/webhooks/content-published`
- **Dataset:** `production`
- **Trigger on:**
  - ✅ Create
  - ✅ Update
- **Filter (GROQ):** `_type == "blogPost"`
- **HTTP Method:** `POST`
- **API version:** `v2024-01-01`
- **Include drafts:** ❌ No (only published)

**Note:** Sanity webhooks don't work with `localhost`. For local development:
1. Use ngrok: `ngrok http 3001`
2. Use the ngrok URL in Sanity webhook configuration
3. Or test with curl commands (see Testing section)

---

## 🧪 Testing Workflows

### Test Event Notification
```bash
curl -X POST http://localhost:5678/webhook/discord-event-published \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI Workshop Test",
    "slug": "ai-workshop-test",
    "description": "Testing event notification",
    "date": "December 20, 2025",
    "time": "6:00 PM",
    "location": "Newark Public Library",
    "registrationUrl": "http://localhost:3000/events/ai-workshop-test"
  }'
```

### Test Blog Notification
```bash
curl -X POST http://localhost:5678/webhook/discord-blog-published \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog Post",
    "slug": "test-blog",
    "excerpt": "This is a test blog post",
    "author": {"name": "John Doe"},
    "postUrl": "http://localhost:3000/blog/test-blog"
  }'
```

### Test Volunteer Notification
```bash
curl -X POST http://localhost:5678/webhook/discord-volunteer-signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "interest": "Community Outreach",
    "motivation": "I want to help build a stronger community"
  }'
```

**Or test via frontend:**
- Navigate to http://localhost:3000/volunteer
- Fill out and submit the form
- Check Discord #volunteers channel

---

## 📦 Exporting Workflows

To export workflows for version control:

1. Open workflow in n8n
2. Click **three dots (⋮)** menu → **Download**
3. Save to `n8n-workflows/` directory
4. Commit to Git

**Export all 3 workflows:**
```bash
# Navigate to n8n UI
# Export each workflow:
# - Discord - Event Published → discord-event-published.json
# - Discord - Blog Published → discord-blog-published.json
# - Discord - Volunteer Signup → discord-volunteer-signup.json
```

---

## 🚢 Production Deployment

### Option 1: n8n Cloud (Easiest)
1. Sign up at https://n8n.io/cloud
2. Import workflows
3. Update webhook URLs to use n8n.cloud domain
4. Update backend `N8N_WEBHOOK_BASE_URL` to n8n.cloud URL

### Option 2: Self-Hosted (Docker)
```yaml
# docker-compose.yml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - WEBHOOK_URL=https://n8n.your-domain.com
      - N8N_HOST=n8n.your-domain.com
      - N8N_PROTOCOL=https
    volumes:
      - n8n_data:/home/node/.n8n
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.n8n.rule=Host(`n8n.your-domain.com`)"
      - "traefik.http.routers.n8n.tls=true"
      - "traefik.http.routers.n8n.tls.certresolver=letsencrypt"

volumes:
  n8n_data:
```

### Update Production URLs
1. **Backend `.env`:**
   ```env
   N8N_WEBHOOK_BASE_URL=https://n8n.your-domain.com/webhook
   ```

2. **Sanity webhooks:**
   - Update event webhook URL to production backend
   - Update blog webhook URL to production backend

3. **Discord webhooks:**
   - Keep Discord webhook URLs the same (they don't change)

---

## 🔒 Security Best Practices

### 1. Webhook Authentication
Add webhook secrets to verify requests:

**In n8n workflows:**
- Add "Header Auth" credential
- Set custom header: `X-Webhook-Secret: your_secret`

**In backend:**
```typescript
// Verify n8n webhook signature
const webhookSecret = process.env.N8N_WEBHOOK_SECRET;
if (req.headers['x-webhook-secret'] !== webhookSecret) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

### 2. Discord Webhook Protection
- Never commit Discord webhook URLs to Git
- Use environment variables
- Rotate webhooks if exposed

### 3. n8n Access Control
- Enable basic auth in production
- Use strong passwords
- Consider OAuth for team access

---

## 📊 Monitoring & Debugging

### View Execution History
1. Open n8n dashboard
2. Go to **Executions** tab
3. View logs, data, and errors for each workflow run

### Common Issues

**Issue:** Workflow not triggering
- **Solution:** Check workflow is "Active" (published)
- Verify webhook URL in backend matches n8n
- Check backend logs for webhook call

**Issue:** Discord message not appearing
- **Solution:** Verify Discord credential in n8n
- Check Discord webhook URL is valid
- Test webhook URL with curl directly

**Issue:** Data not showing in message
- **Solution:** Check expression syntax: `{{ $json.body.field }}`
- Use Test mode to inspect webhook data
- Verify backend is sending correct data format

---

## 🎓 For Professor/Reviewers

### Why n8n?
- **Visual workflows:** Easy to understand automation logic
- **Exportable:** Workflows saved as JSON for version control
- **No-code modifications:** Change message format without coding
- **Extensible:** Easy to add Slack, email, SMS notifications
- **Production-ready:** Enterprise features (retries, error handling, monitoring)

### Demonstrating the System
1. Start all services: `docker-compose up`
2. Open n8n: http://localhost:5678
3. Show visual workflows (Event, Blog, Volunteer)
4. Submit volunteer form: http://localhost:3000/volunteer
5. Watch Discord notification appear in real-time
6. Show execution logs in n8n

### Importing Project
```bash
# Clone repository
git clone https://github.com/your-username/town-hall.git
cd town-hall

# Start all services
docker-compose up -d

# Import n8n workflows
# 1. Open http://localhost:5678
# 2. Go to Workflows → Import
# 3. Select files from n8n-workflows/
# 4. Activate each workflow

# Configure Sanity webhooks (requires admin access)
# See "Sanity CMS Webhook Configuration" section above
```

---

## 📞 Support

For questions or issues:
- Check execution logs in n8n dashboard
- Review backend logs: `docker-compose logs backend`
- Test webhooks with curl commands
- Verify environment variables are set correctly

**Contact:** [Your Email]
