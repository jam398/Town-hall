# Troubleshooting Guide

## Common Issues and Solutions

### 1. Environment Variables Not Loading

**Problem:** Backend shows correct env vars in logs but still uses default values (e.g., `production` dataset when `.env` says `development`)

**Root Cause:** Services import and initialize at module load time, BEFORE `dotenv.config()` runs.

**Solution:** Use lazy initialization for services that depend on env vars.

#### Fix for Sanity Client

**Before:**
```typescript
const client = createClient({
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
});
```

**After:**
```typescript
let client: SanityClient | null = null;

function getClient(): SanityClient {
  if (!client) {
    console.log('🔧 Creating Sanity client with dataset:', process.env.SANITY_DATASET);
    client = createClient({
      dataset: process.env.SANITY_DATASET || 'production',
      token: process.env.SANITY_TOKEN,
      useCdn: false,
    });
  }
  return client;
}

// Then use getClient().fetch() instead of client.fetch()
```

#### Fix for HubSpot API Key

**Before:**
```typescript
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

// Later in code
Authorization: `Bearer ${HUBSPOT_API_KEY}`
```

**After:**
```typescript
function getApiKey(): string {
  const key = process.env.HUBSPOT_API_KEY;
  if (!key) {
    console.error('⚠️ HUBSPOT_API_KEY is not set!');
  }
  return key || '';
}

// Later in code
Authorization: `Bearer ${getApiKey()}`
```

### 2. Dotenv Path Issues

**Problem:** `.env` file not being loaded in development mode

**Root Cause:** Incorrect path in `dotenv.config()`

**Solution:** Fix the path in `src/index.ts`:

```typescript
// WRONG - tries to load from Town-hall/.env (doesn't exist)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// CORRECT - loads from townhall-backend/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
```

Add debug logging to verify:
```typescript
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });
console.log('📝 Loaded .env from:', envPath);
console.log('🗄️  SANITY_DATASET:', process.env.SANITY_DATASET);
console.log('🔑 SANITY_TOKEN:', process.env.SANITY_TOKEN ? '✅ Set' : '❌ Not set');
```

### 3. Sanity Token Permissions

**Problem:** Getting "insufficient permissions; permission 'create' required" errors

**Possible Causes:**
1. Token has wrong permission level (Viewer/Reader instead of Editor/Developer)
2. Token is for wrong dataset
3. Dataset has private access restrictions

**Solutions:**

#### Create Token with Write Permissions
1. Go to: https://www.sanity.io/manage/personal/project/pvm742xo/api/tokens
2. Click "Add API token"
3. Name: `Backend Write Token`
4. Permissions: **Editor** or **Developer** (NOT Viewer)
5. Copy the token immediately (shown only once)
6. Update `.env`: `SANITY_TOKEN=<new-token>`

#### Dataset Access Issues
- **Production dataset** on Growth Trial plan may have restrictions
- **Development dataset** (public) works without restrictions
- Create development dataset: `npx sanity dataset create development`

### 4. Switching Between Datasets

When switching between `production` and `development` datasets:

**Files to update:**
1. `townhall-backend/.env`:
   ```
   SANITY_DATASET=production  # or development
   ```

2. `townhall-backend/sanity/sanity.config.ts`:
   ```typescript
   export default defineConfig({
     dataset: 'production',  // or 'development'
   });
   ```

**After changing:**
1. Kill all node processes: `taskkill //F //IM node.exe`
2. Restart backend: `cd townhall-backend && npm run dev`
3. Restart Sanity Studio: `cd townhall-backend/sanity && npx sanity dev`

### 5. HubSpot Unauthorized Errors

**Problem:** Getting "HubSpot API error: Unauthorized"

**Causes:**
1. Token expired or invalid
2. Token doesn't have required scopes
3. Token not loaded from env vars (lazy loading issue - see #1)

**Solution:**
1. Create new Private App token: https://app.hubspot.com/settings/244541404/integrations/private-apps
2. Required scopes:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
3. Copy token (starts with `pat-...`)
4. Update `.env`: `HUBSPOT_API_KEY=<new-token>`
5. Restart backend

### 6. Next.js Build Errors (Frontend)

**Problem:** `EINVAL: invalid argument, readlink '.next/types/...'`

**Solution:** Delete `.next` cache and rebuild:
```bash
cd townhall-frontend
rm -rf .next
npm run build
```

**Problem:** TypeScript errors about undefined properties

**Solution:** Add optional chaining or fallbacks:
```typescript
// Before
post.tags.forEach(tag => ...)
dangerouslySetInnerHTML={{ __html: event.longDescription }}

// After
post.tags?.forEach(tag => ...)
dangerouslySetInnerHTML={{ __html: event.longDescription || '' }}
```

### 7. Port Already in Use

**Problem:** "Port 3001 is already in use"

**Solution:**
```bash
# Kill process on specific port
netstat -ano | findstr ":3001" | awk '{print $5}' | xargs -I {} taskkill //PID {} //F

# Or kill all node processes
taskkill //F //IM node.exe
```

## Testing Checklist

After making changes, verify:

1. **Backend Running:**
   ```bash
   netstat -ano | findstr ":3001"
   # Should show LISTENING
   ```

2. **Environment Variables Loaded:**
   - Check backend startup logs for env values
   - Look for "🗄️ SANITY_DATASET:" in logs

3. **Sanity Client Working:**
   - Look for "🔧 Creating Sanity client with dataset:" in logs
   - Should show correct dataset name

4. **Forms Working:**
   - Test registration form: http://localhost:3000/events
   - Test contact form: http://localhost:3000/contact
   - Test volunteer form: http://localhost:3000/volunteer

5. **Data Saved:**
   - Check Sanity Studio: http://localhost:3333
   - Check HubSpot: https://app.hubspot.com/contacts/244541404/contacts

6. **Emails Sent:**
   - Check Resend dashboard: https://resend.com/emails
   - Check your email inbox

## Quick Restart All Services

```bash
# Kill everything
taskkill //F //IM node.exe 2>/dev/null

# Start backend
cd townhall-backend && npm run dev &

# Start frontend
cd townhall-frontend && npm run dev &

# Start Sanity Studio
cd townhall-backend/sanity && npx sanity dev &
```

## Environment Variables Reference

**Backend (.env):**
```env
# Sanity
SANITY_PROJECT_ID=pvm742xo
SANITY_DATASET=production  # or development
SANITY_TOKEN=sk...  # Must have Editor/Developer permissions

# Email
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=onboarding@resend.dev  # or your verified domain

# HubSpot
HUBSPOT_API_KEY=pat-...  # Must have contacts read/write scopes
HUBSPOT_PORTAL_ID=244541404
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```
