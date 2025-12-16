# n8n Integration - Getting Started

## What We Just Did

1. ✅ Updated `TODO_BACKEND.md` with complete n8n implementation tasks
2. ✅ Added n8n service to `docker-compose.yml` (latest version: 2.1.0)
3. ✅ Created `.env.example` with all required n8n environment variables
4. ✅ Created comprehensive setup guide: `docs/N8N_SETUP_GUIDE.md`

---

## What You Need to Provide

Before we can start n8n, I need the following information from you:

### 1. **n8n Encryption Key** (Required)

Generate a secure 64-character encryption key. Choose ONE method:

**Option A - OpenSSL (Linux/Mac):**
```bash
openssl rand -hex 32
```

**Option B - PowerShell (Windows):**
```powershell
-join ((48..57) + (65..70) | Get-Random -Count 64 | % {[char]$_})
```

**Option C - Online Generator:**
- Go to: https://www.random.org/strings/
- Generate: 1 string, 64 characters, alphanumeric
- Copy the result

Once generated, add it to your `.env` file:
```bash
N8N_ENCRYPTION_KEY=your_64_character_key_here
```

⚠️ **IMPORTANT:** Keep this key secure! If you lose it, you'll lose access to all n8n credentials.

---

### 2. **n8n Basic Auth Credentials** (Required)

Choose a secure username and password for accessing n8n UI:

```bash
# In your .env file
N8N_BASIC_AUTH_USER=your_username
N8N_BASIC_AUTH_PASSWORD=your_secure_password
```

**Recommendations:**
- Username: Something memorable (e.g., your name or "admin")
- Password: At least 12 characters, mix of letters/numbers/symbols

---

### 3. **Current .env Values** (Check)

Please confirm you have these already in your `.env` file:

```bash
# Sanity CMS
SANITY_PROJECT_ID=pvm742xo
SANITY_DATASET=production
SANITY_TOKEN=sk_...  # Your Sanity token

# Resend Email
RESEND_API_KEY=re_...  # Your Resend API key

# HubSpot
HUBSPOT_API_KEY=...  # Your HubSpot key
```

---

### 4. **Discord Webhooks** (Optional - Can Add Later)

If you want Discord notifications, provide webhook URLs:

```bash
DISCORD_WEBHOOK_EVENTS=https://discord.com/api/webhooks/...
DISCORD_WEBHOOK_VOLUNTEERS=https://discord.com/api/webhooks/...
```

If you don't have these yet, we can skip Discord workflows for now.

---

## Next Steps - Implementation Order

Once you provide the encryption key and credentials, we'll proceed in this order:

### Phase 1: Setup & Verification ⏱️ ~30 minutes
1. ✅ Generate encryption key (you provide)
2. ⏳ Update `.env` file with n8n credentials
3. ⏳ Start n8n container: `docker-compose up -d n8n`
4. ⏳ Access n8n UI at http://localhost:5678
5. ⏳ Verify n8n is running correctly

### Phase 2: Configure Credentials ⏱️ ~20 minutes
6. ⏳ Add Sanity credentials in n8n UI
7. ⏳ Add Resend email credentials
8. ⏳ Add HubSpot credentials
9. ⏳ Test each credential connection

### Phase 3: Build Event Reminder Workflow ⏱️ ~45 minutes
10. ⏳ Create workflow in n8n UI
11. ⏳ Add Schedule Trigger (daily 9 AM)
12. ⏳ Add Sanity query for upcoming events
13. ⏳ Add email sending logic
14. ⏳ Test with sample data
15. ⏳ Document workflow

### Phase 4: Build Post-Event Workflow ⏱️ ~45 minutes
16. ⏳ Create post-event follow-up workflow
17. ⏳ Add Schedule Trigger (daily 10 AM)
18. ⏳ Add Sanity query for completed events
19. ⏳ Add thank you email logic
20. ⏳ Test and document

### Phase 5: Discord Notifications ⏱️ ~30 minutes (Optional)
21. ⏳ Create Discord webhook workflows
22. ⏳ Add to backend event handlers
23. ⏳ Test end-to-end

**Total Estimated Time:** 2.5 - 3 hours (excluding breaks)

---

## How to Proceed

### Step 1: Generate Encryption Key

Run ONE of these commands and share the output with me:

```bash
# Linux/Mac
openssl rand -hex 32

# Windows PowerShell
-join ((48..57) + (65..70) | Get-Random -Count 64 | % {[char]$_})
```

### Step 2: Choose n8n Credentials

Decide on:
- **Username:** ________________
- **Password:** ________________ (at least 12 characters)

### Step 3: Confirm Existing Keys

Let me know if you have these ready:
- [ ] Sanity token (starts with `sk_`)
- [ ] Resend API key (starts with `re_`)
- [ ] HubSpot API key
- [ ] Discord webhooks (optional)

### Step 4: Tell Me to Proceed

Once you've done the above, just say:

> "I've generated the encryption key: [paste key here]. Username: [username], Password: [password]. All API keys are ready in my .env file."

Then I'll update your `.env` file and start the n8n setup process!

---

## Testing Approach

We'll test each component thoroughly:

✅ **After each credential:** Test API connection  
✅ **After each workflow:** Manual execution test  
✅ **After complete workflow:** End-to-end integration test  
✅ **Before production:** Full scenario test with real data

This ensures we catch issues early and know exactly what's working.

---

## Documentation We'll Create

As we build, I'll document:

1. **N8N_WORKFLOWS.md** - Detailed workflow documentation with:
   - Visual diagrams (if possible via text)
   - Step-by-step node configuration
   - Troubleshooting tips
   - Modification instructions for non-technical users

2. **Training Videos** (Guide for you to record):
   - n8n UI basics (5-10 min)
   - How to modify email templates
   - How to change schedule times
   - How to check execution logs

3. **Quick Reference Card**:
   - Common tasks cheat sheet
   - Credential management
   - Workflow triggers

---

## Questions?

Before we start, do you have any questions about:

- The n8n setup process?
- What workflows we're building?
- How n8n will integrate with your existing backend?
- Security considerations?
- Timeline or time commitment?

---

**Ready to start?** Provide the encryption key and credentials, and we'll begin! 🚀
