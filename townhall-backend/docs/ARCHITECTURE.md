# Town Hall Backend Architecture

## Technology Stack Decision

### CMS: Sanity.io ✅

**Chosen over:** Strapi, Headless WordPress

**Reasons:**
1. **Real-time collaboration** - Multiple team members can edit content
2. **Structured content** - Strongly-typed schemas perfect for events/blogs
3. **Free tier** - Generous limits (unlimited documents, 3 users)
4. **TypeScript support** - Excellent type safety
5. **Portable Text** - Secure rich text (no XSS risks)
6. **Image optimization** - Built-in CDN
7. **Webhooks** - Can trigger automations on content changes
8. **Easy deployment** - Sanity Studio hosted or self-hosted

### API Framework: Node.js + Express + TypeScript ✅

**Reasons:**
1. **Language consistency** - Same as frontend (TypeScript)
2. **Easy integration** - Sanity has official Node.js SDK
3. **Simple REST APIs** - Quick to build required endpoints
4. **Middleware ecosystem** - Validation, rate limiting, error handling
5. **Team familiarity** - Standard Node.js stack

### Email Service: Resend ✅

**Chosen over:** SendGrid, Mailchimp

**Reasons:**
1. **Simple API** - Easy to integrate
2. **React Email templates** - Build emails like React components
3. **Free tier** - 100 emails/day (sufficient for starting)
4. **Good deliverability** - Better than SendGrid free tier
5. **Modern** - Built for developers

### Discord: Webhooks ✅

**Chosen over:** Discord Bot

**Reasons:**
1. **No bot hosting** - Just HTTP POST requests
2. **Instant setup** - Create webhook in channel settings
3. **Perfect for notifications** - Post events, registrations, blogs
4. **Can upgrade to bot later** - If commands needed

### CRM: HubSpot Free Tier ✅

**Chosen over:** Mailchimp, Airtable

**Reasons:**
1. **Free forever** - Up to 1M contacts
2. **Good API** - Easy contact sync
3. **Email marketing** - Built-in newsletters
4. **Tags/lists** - Track event attendees, volunteers
5. **Nonprofit-friendly** - Good for community organizations

### Automation: n8n (self-hosted) ✅

**Reasons:**
1. **Free if self-hosted** - Open source
2. **Docker-friendly** - Easy to add to docker-compose
3. **Visual workflows** - Easy to maintain
4. **No external dependencies** - Full control

## System Architecture

```
┌─────────────┐
│   Frontend  │
│  (Next.js)  │
└──────┬──────┘
       │
       │ HTTP/REST
       ▼
┌─────────────────────────────────────┐
│      Express API (Port 3001)        │
│                                     │
│  ┌──────────────────────────────┐  │
│  │     API Routes               │  │
│  │  - /api/events               │  │
│  │  - /api/blog                 │  │
│  │  - /api/volunteer            │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │     Middleware               │  │
│  │  - CORS                      │  │
│  │  - Rate Limiting             │  │
│  │  - Validation (Zod)          │  │
│  │  - Error Handling            │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │     Services                 │  │
│  │  - Sanity Client             │  │
│  │  - Email (Resend)            │  │
│  │  - Discord Webhooks          │  │
│  │  - HubSpot CRM               │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
       │       │       │       │
       │       │       │       │
       ▼       ▼       ▼       ▼
   ┌────┐  ┌────┐  ┌────┐  ┌────┐
   │Sani│  │Rese│  │Disc│  │HubS│
   │ty  │  │nd  │  │ord │  │pot │
   └────┘  └────┘  └────┘  └────┘
```

## Data Flow Examples

### Event Registration Flow

```
1. User submits form on frontend
   ↓
2. POST /api/events/register
   ↓
3. Validation middleware (Zod)
   ↓
4. API Route Handler
   ↓
5. Create registration in Sanity
   ↓
6. Trigger automations:
   ├─→ Send confirmation email (Resend)
   ├─→ Add contact to HubSpot
   └─→ Post to Discord webhook
   ↓
7. Return success response
```

### Content Publishing Flow

```
1. Editor publishes event in Sanity Studio
   ↓
2. Sanity webhook triggers
   ↓
3. n8n workflow receives webhook
   ↓
4. n8n posts to Discord #events channel
   ↓
5. n8n adds to HubSpot campaign (optional)
```

## Security Considerations

1. **Input Validation** - Zod schemas for all inputs
2. **Rate Limiting** - Prevent abuse
3. **CORS** - Restrict to frontend domain
4. **Environment Variables** - All secrets in .env
5. **Error Handling** - No sensitive data in error messages
6. **HTTPS** - All external API calls use HTTPS

## Scalability Considerations

- **Caching** - Add Redis for frequently accessed content
- **Queue System** - Add Bull/BullMQ for background jobs
- **Load Balancing** - Multiple API instances behind load balancer
- **CDN** - Sanity images served via CDN
- **Database** - Sanity handles scaling automatically

## Testing Strategy

1. **Unit Tests** - All services and utilities
2. **Integration Tests** - API endpoints with mocked services
3. **Coverage** - 100% requirement
4. **CI/CD** - Tests run on every commit

## Deployment

- **Development** - Docker Compose locally
- **Production** - Deploy to cloud (Vercel, Railway, or DigitalOcean)
- **Monitoring** - Health check endpoint for uptime monitoring
