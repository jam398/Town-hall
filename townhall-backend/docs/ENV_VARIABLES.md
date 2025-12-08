# Environment Variables Reference

## Town Hall Backend - Complete Environment Configuration

This document explains all environment variables used by the Town Hall backend application.

---

## Quick Setup

```bash
# Copy example file
cp .env.example .env

# Edit with your actual values
nano .env
```

**⚠️ Security Note:** Never commit `.env` files to version control. The `.env.example` file should contain placeholder values only.

---

## Required Variables

These variables **must** be set for the application to function.

### Server Configuration

```bash
# Node environment
NODE_ENV=development
# Options: development, production, test

# Server port
PORT=3001
# Default: 3001

# API base URL (for links in emails, webhooks)
API_BASE_URL=http://localhost:3001
# Production example: https://api.townhallnewark.org
```

**Why Required:**
- `NODE_ENV`: Controls logging, error handling, and performance optimizations
- `PORT`: Defines which port the server listens on
- `API_BASE_URL`: Used in email templates and webhook callbacks

---

### Sanity CMS

```bash
# Sanity project ID
SANITY_PROJECT_ID=pvm742xo
# Get from: https://sanity.io/manage

# Dataset name
SANITY_DATASET=production
# Options: production, development, staging

# API version
SANITY_API_VERSION=2024-01-01
# Format: YYYY-MM-DD (use latest stable version)

# Authentication token
SANITY_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# Get from: https://sanity.io/manage/project/pvm742xo/api
```

**How to Get:**
1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project → API → Tokens
3. Create a token with `Editor` permissions
4. Copy the token immediately (you won't see it again)

**Why Required:**
- All content (events, blog posts, registrations) is stored in Sanity
- Without valid credentials, the API cannot read or write data

**Cost:** Free tier includes:
- 3 users
- 10GB bandwidth/month
- 100,000 API requests/month

---

### Email Service (Resend)

```bash
# Resend API key
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
# Get from: https://resend.com/api-keys

# From email address
RESEND_FROM_EMAIL=hello@townhallnewark.org
# Must be a verified domain in Resend
```

**How to Get:**
1. Sign up at [Resend.com](https://resend.com)
2. Verify your domain (or use `onboarding@resend.dev` for testing)
3. Go to API Keys → Create new key
4. Copy the key (starts with `re_`)

**Why Required:**
- Sends registration confirmations
- Sends volunteer application confirmations
- Sends contact form notifications
- Sends volunteer approval notifications

**Cost:** Free tier includes:
- 100 emails/day
- 3,000 emails/month

**Emails Sent:**
- Registration confirmation (per attendee)
- Volunteer confirmation (per application)
- Contact form notification (per submission)
- Volunteer approval welcome (per approval)
- Event reminders (per attendee)
- Registration cancellations (per cancellation)

---

### HubSpot CRM

```bash
# HubSpot API key (Private App token)
HUBSPOT_API_KEY=pat-na1-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
# Get from: https://app.hubspot.com/private-apps

# HubSpot portal ID (optional, for reference)
HUBSPOT_PORTAL_ID=12345678
# Find in: Settings → Account & Billing
```

**How to Get:**
1. Go to HubSpot → Settings → Integrations → Private Apps
2. Click "Create private app"
3. Name: "Town Hall Backend"
4. Scopes needed:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
5. Create app and copy the access token

**Why Required:**
- Syncs event registrations to HubSpot contacts
- Syncs volunteer applications to HubSpot contacts
- Tags contacts by event attended
- Enables email marketing and CRM workflows

**Cost:** Free tier includes:
- 1,000 contacts
- Basic email marketing
- CRM functionality

---

## Optional Variables

These variables enable additional features but are not required for basic functionality.

### OpenAI API (Phase 3 - AI Features)

```bash
# OpenAI API key
OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
# Get from: https://platform.openai.com/api-keys

# Model selection (optional)
OPENAI_MODEL=gpt-4o-mini
# Options: gpt-4o-mini, gpt-4o, gpt-4-turbo, gpt-3.5-turbo
# Default: gpt-4o-mini (recommended for cost)
```

**How to Get:**
1. Sign up at [OpenAI Platform](https://platform.openai.com)
2. Add payment method (required for API access)
3. Go to API Keys → Create new secret key
4. Copy the key (starts with `sk-proj-` or `sk-`)

**Features Enabled:**
- Audio transcription (Whisper API)
- Blog post generation from transcripts
- Workshop outline generator
- Event flyer generation (DALL-E 3)

**Cost Estimates:**
- Whisper (transcription): $0.006/minute
- GPT-4o-mini (text): ~$0.002/request
- DALL-E 3 (images): $0.04/image
- **Total: $5-10/month** with moderate usage

**If Not Set:**
- AI endpoints will return 500 errors
- Transcription feature unavailable
- Flyer generation unavailable
- Workshop outline generator unavailable
- All other features work normally

---

### Discord Webhooks (Phase 2.2)

```bash
# Events channel webhook
DISCORD_WEBHOOK_EVENTS=https://discord.com/api/webhooks/123456789/XXXXXXXXXXXXXXXXXXXX
# For: New event announcements

# Volunteers channel webhook
DISCORD_WEBHOOK_VOLUNTEERS=https://discord.com/api/webhooks/123456789/XXXXXXXXXXXXXXXXXXXX
# For: New volunteer applications

# General announcements webhook
DISCORD_WEBHOOK_GENERAL=https://discord.com/api/webhooks/123456789/XXXXXXXXXXXXXXXXXXXX
# For: Blog posts, vlogs, general updates
```

**How to Get:**
1. Go to Discord Server Settings → Integrations → Webhooks
2. Click "New Webhook"
3. Name it (e.g., "Town Hall Events")
4. Select the channel
5. Copy webhook URL

**Features Enabled:**
- Auto-post new events to Discord
- Auto-post blog/vlog content
- Notify about new volunteer applications

**If Not Set:**
- Discord notifications disabled
- Webhook endpoints return success but do nothing
- All other features work normally

**Cost:** Free (Discord webhooks are free)

---

### Rate Limiting

```bash
# Rate limit window (milliseconds)
RATE_LIMIT_WINDOW_MS=60000
# Default: 60000 (1 minute)

# Max requests per window
RATE_LIMIT_MAX_REQUESTS=100
# Default: 100 requests/minute
```

**Why Adjust:**
- **Increase limit** for high-traffic events
- **Decrease limit** to protect against abuse
- **Development**: Set high limits for testing

**Recommended Values:**
- Development: `1000` requests/minute
- Production: `100` requests/minute
- High traffic: `200` requests/minute

---

### Frontend Configuration

```bash
# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
# Production example: https://townhallnewark.org
```

**Why Required:**
- Enables CORS for frontend requests
- Without this, browser will block API calls

**Multiple Origins:**
```bash
# Comma-separated list
FRONTEND_URL=http://localhost:3000,https://townhallnewark.org
```

---

## Environment-Specific Configurations

### Development (.env.development)

```bash
NODE_ENV=development
PORT=3001
API_BASE_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000

# Use test credentials
SANITY_PROJECT_ID=pvm742xo
SANITY_DATASET=development
SANITY_TOKEN=sk_test_xxxx

# Use Resend test domain
RESEND_FROM_EMAIL=onboarding@resend.dev

# Disable rate limiting
RATE_LIMIT_MAX_REQUESTS=10000

# Optional: Use test OpenAI key with lower limits
OPENAI_API_KEY=sk-test-xxxx
```

---

### Production (.env.production)

```bash
NODE_ENV=production
PORT=3001
API_BASE_URL=https://api.townhallnewark.org
FRONTEND_URL=https://townhallnewark.org

# Production Sanity
SANITY_PROJECT_ID=pvm742xo
SANITY_DATASET=production
SANITY_TOKEN=sk_prod_xxxx

# Production email
RESEND_FROM_EMAIL=hello@townhallnewark.org

# Production HubSpot
HUBSPOT_API_KEY=pat-na1-prod-xxxx

# Enable all features
OPENAI_API_KEY=sk-proj-prod-xxxx
DISCORD_WEBHOOK_EVENTS=https://discord.com/api/webhooks/prod/xxxx

# Stricter rate limiting
RATE_LIMIT_MAX_REQUESTS=100
```

---

### Testing (.env.test)

```bash
NODE_ENV=test
PORT=3002

# Mock services (no real API calls in tests)
SANITY_PROJECT_ID=test-project
SANITY_TOKEN=test-token

RESEND_API_KEY=test-key
HUBSPOT_API_KEY=test-key
OPENAI_API_KEY=test-key
```

---

## Security Best Practices

### ✅ DO

- ✅ Use `.env` file for local development
- ✅ Add `.env` to `.gitignore`
- ✅ Use environment variables in CI/CD (GitHub Secrets, etc.)
- ✅ Rotate API keys regularly (quarterly)
- ✅ Use different keys for dev/staging/production
- ✅ Set expiration dates on tokens when possible
- ✅ Use minimal permissions for API keys

### ❌ DON'T

- ❌ Commit `.env` files to git
- ❌ Share API keys in Slack/email
- ❌ Use production keys in development
- ❌ Hardcode secrets in source code
- ❌ Use same keys across multiple projects
- ❌ Store keys in browser/client-side code

---

## Validation

### Check Required Variables

The application validates required variables on startup:

```bash
npm start
# Will fail if required variables are missing
```

**Error Example:**
```
Error: Missing required environment variables:
  - SANITY_PROJECT_ID
  - SANITY_TOKEN
  - RESEND_API_KEY

Please check your .env file.
```

### Manual Validation

```bash
# Check all variables are loaded
node -e "require('dotenv').config(); console.log(process.env)"

# Check specific variable
node -e "require('dotenv').config(); console.log(process.env.SANITY_PROJECT_ID)"
```

---

## Troubleshooting

### Variables Not Loading

**Problem:** Variables undefined in application

**Solutions:**
1. Check `.env` file exists in project root
2. Verify no syntax errors (no quotes needed, no spaces around `=`)
3. Restart application after changes
4. Check file name is exactly `.env` (not `.env.txt`)

### Invalid API Keys

**Problem:** `401 Unauthorized` or `403 Forbidden` errors

**Solutions:**
1. Verify key is copied correctly (no extra spaces)
2. Check key hasn't expired
3. Verify key has correct permissions/scopes
4. Test key with provider's API directly

### CORS Errors

**Problem:** Browser blocks API requests

**Solutions:**
1. Set `FRONTEND_URL` to match your frontend URL
2. Ensure protocol matches (http vs https)
3. Check port numbers are correct
4. Clear browser cache

### Rate Limit Issues

**Problem:** `429 Too Many Requests` errors

**Solutions:**
1. Increase `RATE_LIMIT_MAX_REQUESTS`
2. Implement request caching on frontend
3. Use request debouncing for user inputs

---

## Docker Configuration

### Using .env File

```bash
docker run --env-file .env -p 3001:3001 townhall-backend
```

### Using Individual Variables

```bash
docker run \
  -e NODE_ENV=production \
  -e SANITY_PROJECT_ID=pvm742xo \
  -e SANITY_TOKEN=sk_xxxx \
  -p 3001:3001 \
  townhall-backend
```

### Docker Compose

```yaml
services:
  backend:
    image: townhall-backend
    env_file:
      - .env
    # OR
    environment:
      - NODE_ENV=${NODE_ENV}
      - SANITY_PROJECT_ID=${SANITY_PROJECT_ID}
```

---

## Cloud Deployment

### Render.com

```yaml
# render.yaml
envVars:
  - key: NODE_ENV
    value: production
  - key: SANITY_PROJECT_ID
    sync: false  # Set in Render dashboard
  - key: SANITY_TOKEN
    sync: false
  - key: OPENAI_API_KEY
    sync: false
```

### Railway.app

```bash
# Set via CLI
railway variables set SANITY_PROJECT_ID=pvm742xo
railway variables set SANITY_TOKEN=sk_xxxx

# Or via dashboard: Settings → Variables
```

### AWS ECS

```bash
# Create secrets in AWS Systems Manager Parameter Store
aws ssm put-parameter \
  --name "/townhall/SANITY_TOKEN" \
  --value "sk_xxxx" \
  --type "SecureString"

# Reference in task definition
{
  "secrets": [
    {
      "name": "SANITY_TOKEN",
      "valueFrom": "/townhall/SANITY_TOKEN"
    }
  ]
}
```

---

## Cost Summary

### Required Services

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| Sanity CMS | 10GB/month, 100k requests | Free (within limits) |
| Resend Email | 3,000 emails/month | Free (within limits) |
| HubSpot CRM | 1,000 contacts | Free (within limits) |
| **Total Required** | | **$0/month** |

### Optional Services

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| OpenAI API | None (pay-as-you-go) | $5-10/month |
| Discord Webhooks | Unlimited | Free |
| **Total Optional** | | **$5-10/month** |

### Hosting

| Platform | Tier | Cost |
|----------|------|------|
| Render.com | Starter | $7/month |
| Railway.app | Hobby | $5/month |
| DigitalOcean | Basic | $5/month |
| AWS ECS | Fargate 0.5 vCPU | ~$15/month |

**Total Estimated Cost:**
- **Minimum (no AI):** $5-7/month (hosting only)
- **With AI features:** $10-17/month (hosting + OpenAI)

---

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Resend Documentation](https://resend.com/docs)
- [HubSpot API Reference](https://developers.hubspot.com/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)

---

## Support

For environment configuration issues:
- GitHub Issues: [Town Hall Repository](https://github.com/jam398/Town-hall)
- Email: hello@townhallnewark.org
- Documentation: `townhall-backend/docs/`
