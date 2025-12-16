# n8n Workflow Automation Setup Guide

## Overview

This guide will walk you through setting up n8n for the Town Hall project. n8n is a visual workflow automation platform that will handle scheduled tasks like event reminders, post-event follow-ups, and Discord notifications.

**Latest Version:** n8n 2.1.0 (as of December 2025)  
**Docker Image:** `docker.n8n.io/n8nio/n8n:latest`

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Steps](#setup-steps)
3. [Accessing n8n](#accessing-n8n)
4. [Configuring Credentials](#configuring-credentials)
5. [Testing the Setup](#testing-the-setup)
6. [Next Steps](#next-steps)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- ✅ Docker and Docker Compose installed
- ✅ `.env` file in project root (copy from `.env.example`)
- ✅ All API keys ready (Sanity, Resend, HubSpot, Discord)
- ✅ Backend running on port 3001
- ✅ Port 5678 available for n8n

---

## Setup Steps

### Step 1: Generate n8n Encryption Key

n8n uses an encryption key to securely store credentials. Generate one with:

```bash
# On Linux/Mac
openssl rand -hex 32

# On Windows (PowerShell)
-join ((48..57) + (65..70) | Get-Random -Count 64 | % {[char]$_})

# Or use an online generator (make sure it's 64 characters)
# Example: https://www.random.org/strings/
```

Copy the generated key and add it to your `.env` file:

```bash
N8N_ENCRYPTION_KEY=your_generated_64_character_key_here
```

⚠️ **IMPORTANT:** Keep this key secure! If you lose it, you'll lose access to all stored credentials.

---

### Step 2: Configure n8n Credentials

Update your `.env` file with n8n credentials:

```bash
# n8n Basic Auth (Change these!)
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_secure_password_here

# Encryption Key (from Step 1)
N8N_ENCRYPTION_KEY=your_generated_64_character_key_here

# Timezone (for scheduled workflows)
TZ=America/New_York
```

---

### Step 3: Start n8n with Docker Compose

From the project root directory, start all services:

```bash
# Start all services (including n8n)
docker-compose up -d

# Or start only n8n
docker-compose up -d n8n

# Check if n8n is running
docker-compose ps

# View n8n logs
docker-compose logs -f n8n
```

Expected output:
```
townhall-n8n    | n8n ready on port 5678
townhall-n8n    | Version: 2.1.0
```

---

## Accessing n8n

### Open n8n UI

1. Open your browser and go to: **http://localhost:5678**
2. You'll be prompted for Basic Auth credentials
3. Enter the username and password from your `.env` file
4. You should see the n8n welcome screen

### First-Time Setup

On first access, n8n will ask you to:
1. Set your name and email (optional)
2. Choose a password (if not using Basic Auth)
3. Complete the quick tour (recommended)

---

## Configuring Credentials

Before creating workflows, add all necessary credentials. This is a one-time setup.

### 1. Sanity CMS Credentials

1. In n8n UI, click **"Credentials"** in the left sidebar
2. Click **"Add Credential"**
3. Search for **"HTTP Header Auth"** (or "Generic")
4. Name it: `Sanity API`
5. Add header:
   - **Name:** `Authorization`
   - **Value:** `Bearer YOUR_SANITY_TOKEN`
6. Click **"Save"**

Alternative: Use **"Sanity"** credential type if available:
- Project ID: `pvm742xo`
- Dataset: `production`
- Token: `YOUR_SANITY_TOKEN`

---

### 2. Resend Email Credentials

1. Click **"Add Credential"**
2. Search for **"Resend API"** or **"HTTP Header Auth"**
3. Name it: `Resend Email`

**If using Resend API credential type:**
- API Key: `YOUR_RESEND_API_KEY`

**If using HTTP Header Auth:**
- Name: `Authorization`
- Value: `Bearer YOUR_RESEND_API_KEY`

4. Click **"Save"**
5. Click **"Test"** to verify connection

---

### 3. HubSpot CRM Credentials

1. Click **"Add Credential"**
2. Search for **"HubSpot API"**
3. Name it: `HubSpot CRM`
4. Choose authentication method:
   - **API Key:** `YOUR_HUBSPOT_API_KEY`
   - Or use OAuth2 (recommended for production)
5. Click **"Save"**
6. Click **"Test"** to verify

---

### 4. Discord Webhooks

For each Discord channel, add a webhook credential:

1. Click **"Add Credential"**
2. Search for **"Discord Webhook"** or use **"HTTP Request"**
3. Name it: `Discord - Events Channel`
4. Webhook URL: `YOUR_DISCORD_WEBHOOK_URL`
5. Repeat for:
   - `Discord - Volunteers Channel`
   - `Discord - General Channel`

---

## Testing the Setup

### Test 1: Create a Simple Workflow

1. Click **"Workflows"** in sidebar
2. Click **"Add Workflow"**
3. Name it: `Test Workflow`
4. Add a **"Schedule Trigger"** node
   - Set to trigger every 1 hour
5. Add a **"HTTP Request"** node
   - Method: GET
   - URL: `http://backend:3001/api/health`
6. Click **"Execute Workflow"** (play button)
7. Check if both nodes show green checkmarks

✅ **Success:** Both nodes execute without errors

---

### Test 2: Test Email Sending

1. Create a new workflow: `Test Email`
2. Add a **"Manual Trigger"** node
3. Add a **"Resend"** node (or HTTP Request to Resend API)
   - Select your `Resend Email` credential
   - To: Your email address
   - Subject: `n8n Test Email`
   - Body: `This is a test from n8n!`
4. Click **"Test Workflow"**
5. Check your email inbox

✅ **Success:** You receive the test email

---

### Test 3: Test Sanity Connection

1. Create workflow: `Test Sanity`
2. Add a **"Manual Trigger"**
3. Add a **"HTTP Request"** node:
   - Method: GET
   - URL: `https://pvm742xo.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == "event"][0...5]{ title, slug }`
   - Authentication: Use `Sanity API` credential
4. Click **"Test Workflow"**
5. Check the output

✅ **Success:** You see a list of events from Sanity

---

## Next Steps

Now that n8n is set up and credentials are configured, you can start building workflows:

### Workflow Priority Order

1. **Event Reminder Workflow** (High Priority)
   - Send reminder emails 24 hours before events
   - See: [Creating Event Reminder Workflow](./N8N_WORKFLOWS.md#event-reminders)

2. **Post-Event Follow-up Workflow** (High Priority)
   - Send thank you emails with recordings after events
   - See: [Creating Post-Event Workflow](./N8N_WORKFLOWS.md#post-event-followups)

3. **Discord Notification Workflows** (Medium Priority)
   - Auto-post new events, blog posts, and volunteer signups
   - See: [Creating Discord Workflows](./N8N_WORKFLOWS.md#discord-notifications)

### Documentation to Create

- [ ] Create detailed workflow documentation in `N8N_WORKFLOWS.md`
- [ ] Document each workflow with screenshots
- [ ] Create team training videos
- [ ] Write troubleshooting guide

---

## Troubleshooting

### Issue: Can't Access n8n UI

**Check 1:** Is n8n running?
```bash
docker-compose ps
```

**Check 2:** Check n8n logs
```bash
docker-compose logs n8n
```

**Check 3:** Try restarting n8n
```bash
docker-compose restart n8n
```

**Check 4:** Verify port 5678 is not in use
```bash
# Windows
netstat -ano | findstr :5678

# Linux/Mac
lsof -i :5678
```

---

### Issue: Basic Auth Not Working

**Solution 1:** Check `.env` file has correct values:
```bash
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password
```

**Solution 2:** Restart n8n after changing env vars:
```bash
docker-compose restart n8n
```

---

### Issue: Credentials Not Saving

**Solution:** Check encryption key is set:
```bash
# Should be 64 characters
echo $N8N_ENCRYPTION_KEY
```

If missing, generate and add to `.env`, then restart:
```bash
docker-compose restart n8n
```

---

### Issue: Workflow Can't Connect to Backend

**Solution:** Use service name, not localhost:
- ❌ Wrong: `http://localhost:3001`
- ✅ Correct: `http://backend:3001`

All services in docker-compose can communicate using service names.

---

### Issue: Timezone Issues with Scheduled Workflows

**Solution:** Verify timezone in `.env`:
```bash
TZ=America/New_York
```

Then restart n8n:
```bash
docker-compose restart n8n
```

---

## Security Best Practices

### For Production Deployment

1. **Change Default Credentials**
   ```bash
   N8N_BASIC_AUTH_USER=your_unique_username
   N8N_BASIC_AUTH_PASSWORD=very_secure_password_here
   ```

2. **Use HTTPS**
   ```bash
   N8N_PROTOCOL=https
   N8N_HOST=n8n.yourdomain.com
   ```

3. **Backup Encryption Key**
   - Store `N8N_ENCRYPTION_KEY` securely (password manager)
   - Never commit to Git

4. **Regular Backups**
   ```bash
   # Backup n8n data volume
   docker run --rm -v n8n_data:/data -v $(pwd):/backup ubuntu tar czf /backup/n8n-backup.tar.gz /data
   ```

5. **Keep n8n Updated**
   ```bash
   docker-compose pull n8n
   docker-compose up -d n8n
   ```

---

## Additional Resources

- 📚 [n8n Official Documentation](https://docs.n8n.io/)
- 🔧 [n8n Integrations](https://n8n.io/integrations)
- 💡 [Example Workflows](https://n8n.io/workflows)
- 👥 [n8n Community Forum](https://community.n8n.io/)
- 📖 [n8n GitHub Repository](https://github.com/n8n-io/n8n)

---

## Support

If you encounter issues not covered here:

1. Check n8n logs: `docker-compose logs n8n`
2. Search [n8n Community Forum](https://community.n8n.io/)
3. Review [n8n Documentation](https://docs.n8n.io/)
4. Ask in Town Hall team chat

---

**Next:** [Create Your First Workflow →](./N8N_WORKFLOWS.md)
