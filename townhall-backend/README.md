# Town Hall Backend

Backend API and CMS for Town Hall Newark AI Community Nonprofit.

## Tech Stack

- **API Framework:** Node.js + Express + TypeScript
- **CMS:** Sanity.io
- **Email:** Resend
- **Discord:** Webhooks
- **CRM:** HubSpot Free Tier
- **Automation:** n8n (self-hosted)
- **Testing:** Jest + Supertest
- **Validation:** Zod

## Project Structure

```
townhall-backend/
├── src/
│   ├── api/              # API route handlers
│   │   ├── events.ts     # GET/POST event endpoints
│   │   ├── blog.ts       # Blog endpoints
│   │   ├── vlogs.ts      # Vlog endpoints
│   │   ├── volunteer.ts  # Volunteer signup
│   │   ├── contact.ts    # Contact form
│   │   └── health.ts     # Health check
│   ├── services/         # Business logic & external integrations
│   │   ├── sanity.ts     # Sanity CMS client
│   │   ├── email.ts      # Resend email service
│   │   ├── discord.ts    # Discord webhooks
│   │   └── hubspot.ts    # HubSpot CRM integration
│   ├── middleware/       # Express middleware
│   │   ├── validation.ts # Input validation (Zod)
│   │   ├── rateLimit.ts  # Rate limiting
│   │   ├── errorHandler.ts # Error handling
│   │   └── cors.ts       # CORS configuration
│   ├── types/            # TypeScript interfaces
│   │   └── index.ts      # Shared types
│   ├── utils/            # Helper functions
│   └── index.ts          # Express app entry point
├── sanity/               # Sanity Studio
│   ├── schemas/          # Content schemas
│   │   ├── event.ts
│   │   ├── blogPost.ts
│   │   ├── vlogPost.ts
│   │   ├── registration.ts
│   │   ├── volunteer.ts
│   │   └── author.ts
│   └── sanity.config.ts
├── tests/                # Jest tests
│   ├── api/              # API endpoint tests
│   └── services/         # Service layer tests
├── docs/                 # Documentation
│   ├── ARCHITECTURE.md   # System architecture
│   ├── API.md            # API documentation
│   └── SETUP.md          # Setup instructions
└── Dockerfile            # Docker configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity CLI (`npm install -g @sanity/cli`)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your credentials
```

### Development

```bash
# Build the project first
npm run build

# Start API server (http://localhost:3001)
# On Windows PowerShell:
.\start.ps1

# On Windows CMD:
start.bat

# On Linux/Mac/Git Bash:
npm start

# Development with hot reload (may have issues on Windows Git Bash):
npm run dev:watch

# Start Sanity Studio (http://localhost:3333)
npm run sanity

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/events` | GET | List events |
| `/api/events/:slug` | GET | Get event by slug |
| `/api/events/register` | POST | Register for event |
| `/api/blog` | GET | List blog posts |
| `/api/blog/:slug` | GET | Get blog post |
| `/api/vlogs` | GET | List vlogs |
| `/api/volunteer` | POST | Volunteer signup |
| `/api/contact` | POST | Contact form |

## Environment Variables

See `.env.example` for required environment variables.

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Deployment

See `docs/DEPLOYMENT.md` for deployment instructions.

## License

MIT
