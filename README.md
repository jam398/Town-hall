# Town Hall Newark

[![Tests](https://github.com/jam398/Town-hall/actions/workflows/test.yml/badge.svg)](https://github.com/jam398/Town-hall/actions/workflows/test.yml)

**Newark's Free AI Education Hub** — Community workshops, events, and resources for learning artificial intelligence.

## 🌐 Live Demo

- **Frontend:** [https://townhall-newark.vercel.app](https://townhall-newark.vercel.app)
- **Backend API:** [https://townhall-backend-vpyh.onrender.com/api](https://townhall-backend-vpyh.onrender.com/api)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, TailwindCSS, TypeScript |
| Backend | Node.js, Express, TypeScript |
| CMS | Sanity.io |
| Database | Sanity (hosted) |
| Email | Resend |
| CRM | HubSpot |
| Automation | n8n (Discord notifications) |
| Analytics | Plausible (privacy-focused, GDPR-compliant) |
| Hosting | Vercel (frontend), Render (backend) |

## Project Structure

```
373_Final/
├── townhall-frontend/     # Next.js frontend application
├── townhall-backend/      # Express API + Sanity CMS
├── docs/                  # Project documentation
├── .github/workflows/     # CI/CD pipeline
└── docker-compose.yml     # Local development environment
```

## Quick Start

```bash
# Clone the repository
git clone https://github.com/jam398/Town-hall.git
cd Town-hall

# Start frontend
cd townhall-frontend
npm install
npm run dev

# Start backend (in another terminal)
cd townhall-backend
npm install
npm run build
npm start
```

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

- **Linting:** ESLint, Prettier, Stylelint, Markdownlint
- **Testing:** Jest (unit), Playwright (E2E, accessibility, integration)
- **Performance:** Lighthouse audits
- **Bundle Size:** Enforced < 5MB threshold
- **Deploy:** Automatic to Vercel on push to `main`

## Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](townhall-backend/docs/API.md)
- [Requirements Checklist](docs/REQUIREMENTS_CHECKLIST.md)
- [QA Report](docs/qa-report.md)

## License

MIT