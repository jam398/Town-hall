# Backend Developer TODO List

## Town Hall – Newark AI Community Nonprofit

**Owner:** Backend Developer  
**Stack:** CMS (Sanity/Strapi) + Automation (Zapier/n8n) + Discord Bot + Docker  
**Requirement:** 100% test coverage on all backend code

---

## Phase 1: Infrastructure Setup

### 1.1 CMS Setup
- [ ] **Evaluate and choose CMS** (Sanity vs Strapi vs Headless WordPress)
  - Document decision in `docs/ARCHITECTURE.md`
- [ ] **Initialize CMS project**
  - Create CMS workspace/project
  - Configure environment variables
- [ ] **Define content schemas:**
  - [ ] `Event` schema:
    - `title` (string, required)
    - `slug` (string, auto-generated)
    - `description` (rich text)
    - `whatYouWillLearn` (array of strings)
    - `location` (string)
    - `dateTime` (datetime)
    - `registrationDeadline` (datetime)
    - `maxAttendees` (number)
    - `currentAttendees` (number, computed)
    - `status` (enum: draft, published, cancelled, completed)
  - [ ] `BlogPost` schema:
    - `title` (string)
    - `slug` (string)
    - `content` (rich text/markdown)
    - `author` (reference to Author)
    - `publishedAt` (datetime)
    - `status` (enum: draft, ready, published)
    - `tags` (array of strings)
    - `featuredImage` (image)
  - [ ] `VlogPost` schema:
    - `title` (string)
    - `videoUrl` (string - YouTube/Vimeo embed)
    - `transcript` (rich text, AI-generated)
    - `summary` (text, AI-generated)
    - `publishedAt` (datetime)
  - [ ] `Registration` schema:
    - `name` (string)
    - `email` (string)
    - `neighborhood` (string)
    - `interestLevel` (enum: curious, interested, committed)
    - `events` (array of references to Event)
    - `createdAt` (datetime)
    - `discordInviteSent` (boolean)
  - [ ] `Volunteer` schema:
    - `name` (string)
    - `email` (string)
    - `skills` (array of strings)
    - `availability` (string)
    - `discordUsername` (string)
    - `status` (enum: pending, approved, active)
  - [ ] `Author` schema:
    - `name` (string)
    - `bio` (text)
    - `avatar` (image)
    - `role` (enum: staff, volunteer, guest)

### 1.2 API Layer
- [ ] **Create API endpoints** (REST or GraphQL):
  - [ ] `GET /api/events` - List upcoming events
  - [ ] `GET /api/events/:slug` - Single event details
  - [ ] `POST /api/events/:slug/register` - Register for event
  - [ ] `GET /api/blog` - List blog posts
  - [ ] `GET /api/blog/:slug` - Single blog post
  - [ ] `GET /api/vlogs` - List vlog posts
  - [ ] `POST /api/volunteer` - Volunteer signup
  - [ ] `POST /api/contact` - Contact form submission
- [ ] **Implement input validation** on all endpoints
- [ ] **Implement rate limiting** to prevent abuse
- [ ] **Add error handling middleware**

### 1.3 Database/CMS Tests
- [ ] **Unit tests for all schemas** (validation rules)
- [ ] **Integration tests for API endpoints**
- [ ] **Test coverage report** (must be 100%)

---

## Phase 2: Automation & Integrations

### 2.1 Email Automation
- [ ] **Choose email provider** (SendGrid, Mailchimp, Resend)
- [ ] **Implement email templates:**
  - [ ] Event registration confirmation
  - [ ] Event reminder (24h before)
  - [ ] Post-event follow-up (recording, summary, next events)
  - [ ] Volunteer application received
  - [ ] Volunteer approved notification
- [ ] **Create email sending service**
- [ ] **Tests for email service** (mock SMTP)

### 2.2 Discord Integration
- [ ] **Create Discord bot** or use webhook-based approach
- [ ] **Implement Discord automations:**
  - [ ] Auto-post new events to `#events`
  - [ ] Auto-post new blog/vlog to `#announcements`
  - [ ] Send Discord invite link on registration (optional)
  - [ ] Auto-assign `volunteer` role on approval
- [ ] **Discord bot commands** (if using bot):
  - [ ] `!events` - List upcoming events
  - [ ] `!register <event-slug>` - Quick registration
- [ ] **Tests for Discord integration** (mocked Discord API)

### 2.3 CRM/Mailing List Integration
- [ ] **Choose CRM** (HubSpot free tier, Mailchimp, Airtable)
- [ ] **Implement contact sync:**
  - [ ] On registration → add/update contact
  - [ ] Tag contacts by event attended
  - [ ] Tag volunteers separately
- [ ] **Tests for CRM sync**

### 2.4 Automation Workflow Engine
- [ ] **Choose automation tool** (Zapier, Make, n8n self-hosted, or custom)
- [ ] **Document all automation flows** in `docs/AUTOMATIONS.md`
- [ ] **Implement webhook receivers** for external triggers

---

## Phase 3: AI Integration

### 3.1 Content Generation
- [ ] **Event transcript → Blog post pipeline:**
  - [ ] Accept audio/video upload or URL
  - [ ] Transcribe using Whisper (via `references/eai` tools)
  - [ ] Summarize into blog post draft
  - [ ] Generate "key takeaways" list
- [ ] **Workshop outline generator:**
  - [ ] Input: topic + duration + audience level
  - [ ] Output: structured outline with talking points
- [ ] **Tests for AI pipelines** (mocked OpenAI responses)

### 3.2 Visual Generation
- [ ] **Event flyer generator:**
  - [ ] Input: event details
  - [ ] Output: image suitable for social media
  - [ ] Store in CMS for human review
- [ ] **Tests for image generation**

---

## Phase 4: Docker & Deployment

### 4.1 Dockerization
- [ ] **Create `Dockerfile`** for backend services
- [ ] **Create `docker-compose.yml`:**
  - [ ] Backend API service
  - [ ] CMS service (if self-hosted like Strapi)
  - [ ] Database service (if needed)
  - [ ] Discord bot service (if separate)
- [ ] **Create `.env.example`** with all required variables
- [ ] **Document Docker setup** in `docs/DOCKER.md`

### 4.2 Health & Monitoring
- [ ] **Health check endpoint** (`GET /api/health`)
- [ ] **Structured logging** (JSON format)
- [ ] **Error tracking** (Sentry or similar, if free tier available)

### 4.3 Deployment Tests
- [ ] **Docker build test** (CI should build successfully)
- [ ] **Container startup test**
- [ ] **API smoke tests** against running container

---

## Phase 5: Documentation

### 5.1 Technical Docs
- [ ] `docs/ARCHITECTURE.md` - System overview, data flow diagrams
- [ ] `docs/API.md` - Full API documentation with examples
- [ ] `docs/AUTOMATIONS.md` - All automation workflows documented
- [ ] `docs/DOCKER.md` - Docker setup and deployment guide
- [ ] `docs/TESTING.md` - How to run tests, coverage requirements

### 5.2 Handoff Docs
- [ ] `docs/ENV_VARIABLES.md` - All environment variables explained
- [ ] `docs/CMS_GUIDE.md` - How to use the CMS (for content editors)

---

## API Contract (For Frontend Integration)

The frontend will consume these endpoints. **Do not change these without coordinating.**

```
Base URL: http://localhost:3001/api (dev) or configured via env

GET  /events              → { events: Event[] }
GET  /events/:slug        → { event: Event }
POST /events/:slug/register → { success: boolean, registrationId: string }
     Body: { name, email, neighborhood, interestLevel }

GET  /blog                → { posts: BlogPost[] }
GET  /blog/:slug          → { post: BlogPost }

GET  /vlogs               → { vlogs: VlogPost[] }

POST /volunteer           → { success: boolean }
     Body: { name, email, skills[], availability, discordUsername }

POST /contact             → { success: boolean }
     Body: { name, email, message }

GET  /health              → { status: "ok", timestamp: string }
```

---

## Testing Requirements

| Category | Coverage Target | Notes |
|----------|-----------------|-------|
| Schema validation | 100% | All fields, all edge cases |
| API endpoints | 100% | Success + error paths |
| Email service | 100% | Mock SMTP, verify templates |
| Discord integration | 100% | Mock Discord API |
| AI pipelines | 100% | Mock OpenAI, test prompts |
| Docker | Build + smoke | Must build and start |

**Test command:** `npm test` or `pytest` (depending on language)  
**Coverage command:** `npm run coverage` or `pytest --cov`

---

## Coordination Points

These require sync with Frontend Developer:

1. **API contract changes** - Must notify frontend before changing
2. **CMS schema changes** - Frontend queries depend on field names
3. **Environment variables** - Share `.env.example` updates
4. **Docker networking** - Agree on ports and service names
5. **Webhook URLs** - Frontend may need to trigger backend actions

---

## Definition of Done

A task is complete when:
- [ ] Code is written and follows project style
- [ ] Unit tests pass with 100% coverage
- [ ] Integration tests pass
- [ ] Documentation is updated
- [ ] Code is committed with descriptive message
- [ ] PR is ready for review (if using PR workflow)
