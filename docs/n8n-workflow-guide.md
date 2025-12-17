# n8n Workflow Import & Usage Guide

## Overview

This guide explains how to import and use n8n workflow exports in your Town Hall Newark project. While the current implementation uses **direct Discord integration** (Sanity webhooks → Backend → Discord), n8n workflows can still be valuable for demonstrations, backups, or future automation needs.

---

## Current Architecture (No n8n Required)

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Sanity    │──────>│   Backend   │──────>│   Discord   │
│  Webhooks   │       │ (webhooks.ts)│       │  Webhooks   │
└─────────────┘       └─────────────┘       └─────────────┘
```

**Benefits:**
- ✅ Simpler architecture (one less service)
- ✅ Faster notifications (no intermediary)
- ✅ Easier to debug and maintain
- ✅ No n8n hosting required

---

## When to Use n8n Workflows

Consider using n8n if you need:

1. **Visual Workflow Builder** - Non-technical users managing automations
2. **Complex Logic** - Conditional routing, data transformations, multi-step workflows
3. **Multiple Integrations** - Need to connect to services beyond Discord (Slack, Email, SMS, etc.)
4. **No-Code Management** - Allow team members to modify workflows without coding
5. **Workflow History** - Built-in execution logs and debugging

---

## How to Import n8n Workflow JSON

### Step 1: Export Workflow from n8n

If you have an existing n8n instance:

1. Open n8n UI (http://localhost:5678 or your n8n cloud URL)
2. Open the workflow you want to export
3. Click the **three dots (⋮)** in the top right
4. Select **Download**
5. Save the `.json` file

Example filename: `discord-event-published.json`

### Step 2: Store Workflow in Repository

Create a directory for n8n workflows:

```bash
mkdir -p n8n-workflows
mv discord-event-published.json n8n-workflows/
```

Recommended structure:
```
n8n-workflows/
├── discord-event-published.json
├── discord-blog-published.json
├── discord-volunteer-signup.json
└── README.md
```

### Step 3: Import Workflow into n8n

**Option A: Import via UI**
1. Open n8n UI
2. Click **Add Workflow** (or use existing workflow)
3. Click the **three dots (⋮)**
4. Select **Import from File**
5. Choose your `.json` file
6. Click **Import**

**Option B: Import via API**
```bash
curl -X POST http://localhost:5678/api/v1/workflows \
  -H "Content-Type: application/json" \
  -d @n8n-workflows/discord-event-published.json
```

**Option C: Import via n8n CLI**
```bash
n8n import:workflow --input=n8n-workflows/discord-event-published.json
```

---

## n8n Workflow Structure

A typical n8n workflow export looks like this:

```json
{
  "name": "Discord - Event Published",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "discord-event-published",
        "responseMode": "onReceived"
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300]
    },
    {
      "parameters": {
        "url": "={{$env.DISCORD_EVENTS_WEBHOOK_URL}}",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "content",
              "value": "🎉 **New Event Published!**"
            },
            {
              "name": "embeds",
              "value": "={{[{\"title\": $json.title, \"description\": $json.description}]}}"
            }
          ]
        }
      },
      "name": "Discord",
      "type": "n8n-nodes-base.httpRequest",
      "position": [450, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "Discord", "type": "main", "index": 0}]]
    }
  }
}
```

---

## Using n8n Workflows with Backend

If you want to re-enable n8n workflows:

### Step 1: Update Backend to Use n8n Service

Edit `townhall-backend/src/api/webhooks.ts`:

```typescript
// Change from:
import { discordService } from '../services/discord';
await discordService.sendEventNotification({...});

// To:
import { n8nService } from '../services/n8n';
await n8nService.notifyEventPublished({...});
```

### Step 2: Configure Environment Variables

In `.env`:
```env
# n8n Configuration
N8N_WEBHOOK_BASE_URL=http://localhost:5678/webhook

# Discord Webhooks (used by n8n, not backend directly)
DISCORD_EVENTS_WEBHOOK_URL=https://discord.com/api/webhooks/...
DISCORD_ANNOUNCEMENTS_WEBHOOK_URL=https://discord.com/api/webhooks/...
DISCORD_VOLUNTEERS_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

### Step 3: Start n8n

```bash
# Using npx (temporary)
npx n8n

# Or using Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Or install globally
npm install -g n8n
n8n start
```

### Step 4: Import & Configure Workflows

1. Open http://localhost:5678
2. Import your workflow JSON files
3. Update webhook paths to match backend calls
4. Add Discord webhook URLs as credentials or environment variables
5. Activate workflows (toggle switch)

---

## Example: Converting Direct Discord to n8n

### Current Direct Implementation (No n8n)

```typescript
// webhooks.ts
await discordService.sendEventNotification({
  title: event.title,
  slug: event.slug.current,
  description: event.description,
  date: dateStr,
  time: timeStr,
  location: event.location,
  featuredImage: event.featuredImage,
});
```

### n8n Implementation

**Backend Change:**
```typescript
// webhooks.ts
await n8nService.notifyEventPublished({
  title: event.title,
  slug: event.slug.current,
  description: event.description,
  date: dateStr,
  time: timeStr,
  location: event.location,
  featuredImage: event.featuredImage,
});
```

**n8n Workflow:**
```json
{
  "name": "Discord - Event Published",
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "discord-event-published"
      }
    },
    {
      "name": "Discord",
      "type": "n8n-nodes-base.discord",
      "parameters": {
        "webhook": "={{$env.DISCORD_EVENTS_WEBHOOK_URL}}",
        "text": "🎉 **New Event Published!**",
        "embeds": {
          "title": "={{$json.title}}",
          "description": "={{$json.description}}",
          "fields": [
            {
              "name": "📅 Date & Time",
              "value": "={{$json.date}} at {{$json.time}}"
            }
          ]
        }
      }
    }
  ]
}
```

---

## Workflow Management Best Practices

### Version Control

**DO:**
- ✅ Store workflow JSON files in Git
- ✅ Include workflow README with descriptions
- ✅ Document workflow changes in commit messages

**Example:**
```bash
git add n8n-workflows/
git commit -m "Add n8n workflow for event notifications"
```

### Environment-Specific Configurations

Use environment variables in n8n:

```javascript
// In n8n nodes, use expressions:
{{$env.DISCORD_EVENTS_WEBHOOK_URL}}
{{$env.FRONTEND_URL}}
{{$env.SLACK_WEBHOOK_URL}}
```

### Testing Workflows

**Test Mode:**
1. Click "Execute Workflow" in n8n UI
2. Click "Listen for Test Event" on webhook node
3. Send test curl request:
```bash
curl -X POST http://localhost:5678/webhook-test/discord-event-published \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Event",
    "slug": "test-event",
    "description": "Testing webhook",
    "date": "December 20, 2025",
    "time": "6:00 PM",
    "location": "Town Hall"
  }'
```

**Production Mode:**
- Activate workflow (toggle switch)
- Webhook URL changes from `/webhook-test/` to `/webhook/`
- Test with actual Sanity webhook or backend trigger

---

## Troubleshooting n8n Workflows

### Workflow Not Receiving Data

**Check:**
1. Is workflow activated? (green toggle)
2. Is webhook path correct? (matches backend call)
3. Is n8n running? (http://localhost:5678 accessible)
4. Check n8n logs:
```bash
# If using npx
npx n8n --log-level debug

# If using Docker
docker logs n8n
```

### Discord Notification Not Sending

**Check:**
1. Discord webhook URL correct in n8n?
2. Discord webhook URL still valid? (test manually)
3. Check n8n execution history (click workflow → Executions)
4. Verify payload format matches Discord requirements

**Manual Test:**
```bash
curl -X POST "$DISCORD_EVENTS_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"content": "Test from curl"}'
```

### n8n Not Starting

**Common Issues:**
- Port 5678 already in use: `lsof -i :5678` (kill process)
- Node.js version < 18: Update Node.js
- Permissions: Try `sudo npx n8n` or fix file permissions

---

## Migration Path: Direct Discord ↔ n8n

### Switching TO n8n (from current direct Discord)

1. Start n8n: `npx n8n`
2. Import workflow JSON files
3. Configure Discord webhook URLs in n8n
4. Update backend imports:
   ```typescript
   // webhooks.ts
   import { n8nService } from '../services/n8n';
   // volunteer.ts
   import { n8nService } from '../services/n8n';
   ```
5. Update method calls:
   ```typescript
   // sendEventNotification → notifyEventPublished
   // sendBlogNotification → notifyBlogPublished
   // sendVolunteerNotification → notifyVolunteerSignup
   ```
6. Test end-to-end
7. Deploy n8n to production (Render, Railway, or n8n Cloud)

### Switching FROM n8n (to direct Discord) - Current Setup

Already done! ✅

---

## Production Deployment

### Option 1: n8n Cloud (Easiest)

1. Sign up: https://n8n.cloud
2. Import workflows
3. Set environment variables
4. Update backend `N8N_WEBHOOK_BASE_URL` to cloud URL
5. Done!

**Pricing:** Free tier includes 5,000 executions/month

### Option 2: Self-Host on Render

```yaml
# render.yaml
services:
  - type: web
    name: n8n
    env: docker
    dockerfilePath: ./n8n.Dockerfile
    envVars:
      - key: N8N_BASIC_AUTH_ACTIVE
        value: true
      - key: N8N_BASIC_AUTH_USER
        sync: false
      - key: N8N_BASIC_AUTH_PASSWORD
        sync: false
```

**Dockerfile:**
```dockerfile
FROM n8nio/n8n:latest
EXPOSE 5678
CMD ["n8n"]
```

### Option 3: Docker Compose (Local/VPS)

```yaml
# docker-compose.yml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}

volumes:
  n8n_data:
```

---

## Conclusion

### Current Setup (Direct Discord) ✅
- **Pros:** Simple, fast, no extra service
- **Cons:** Less flexible, requires code changes

### n8n Setup (Optional)
- **Pros:** Visual builder, flexible, no-code changes
- **Cons:** Extra service to host, slightly more complex

**Recommendation:** 
- Keep current direct Discord integration for production
- Use n8n workflows for demonstrations or future complex automations
- Store workflow JSON in `n8n-workflows/` directory for reference

---

## Additional Resources

- n8n Documentation: https://docs.n8n.io
- n8n Community: https://community.n8n.io
- Discord Webhook Guide: https://discord.com/developers/docs/resources/webhook
- Town Hall Backend Docs: See `docs/AUTOMATIONS.md`

**Questions?** Check `docs/N8N_WORKFLOWS.md` for detailed workflow documentation.
