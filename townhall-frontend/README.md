# Town Hall Frontend

Newark AI Community Nonprofit - Frontend Application

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **Language:** TypeScript
- **Testing:** Playwright (E2E, A11y, Visual, Performance)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## Testing

This project has comprehensive test coverage across multiple dimensions:

### Test Commands

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:e2e           # End-to-end tests
npm run test:a11y          # Accessibility tests
npm run test:visual        # Visual regression tests
npm run test:lighthouse    # Performance tests
npm run test:unit          # Unit tests

# Run with UI (see browser)
npm run test:e2e:headed

# Update visual baselines
npm run test:visual:update

# View test report
npm run test:report
```

### Test Coverage Requirements

| Category | Target | Description |
|----------|--------|-------------|
| E2E | 100% | All user journeys covered |
| Accessibility | 100% | Zero WCAG violations |
| Visual | All pages | Desktop + Mobile snapshots |
| Performance | 90+ | Lighthouse scores |
| Unit | 100% | All components tested |

### Test Structure

```
tests/
├── e2e/                    # End-to-end user journey tests
│   ├── navigation.spec.ts  # Navigation & layout
│   ├── events.spec.ts      # Events flow
│   ├── blog.spec.ts        # Blog & vlogs
│   └── volunteer.spec.ts   # Volunteer & contact forms
├── accessibility/          # WCAG compliance tests
│   └── a11y.spec.ts        # axe-core accessibility audits
├── visual/                 # Screenshot comparison tests
│   └── visual.spec.ts      # Visual regression
└── performance/            # Lighthouse audits
    └── lighthouse.spec.ts  # Performance metrics
```

## Project Structure

```
townhall-frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── events/             # Events pages
│   ├── blog/               # Blog pages
│   ├── vlogs/              # Vlog pages
│   ├── volunteer/          # Volunteer signup
│   ├── contact/            # Contact form
│   └── about/              # About page
├── components/             # Reusable UI components
│   ├── ui/                 # Base UI components
│   └── forms/              # Form components
├── lib/                    # Utilities and API client
│   ├── api.ts              # API client
│   └── utils.ts            # Helper functions
├── styles/                 # Global styles
├── tests/                  # Test files
└── public/                 # Static assets
```

## Environment Variables

Create a `.env.local` file:

```env
# API URL (backend)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Optional: Analytics
NEXT_PUBLIC_GA_ID=
```

## Docker

```bash
# Build image
docker build -t townhall-frontend .

# Run container
docker run -p 3000:3000 townhall-frontend
```

## API Integration

The frontend consumes the backend API:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/events` | GET | List upcoming events |
| `/events/:slug` | GET | Event details |
| `/events/:slug/register` | POST | Register for event |
| `/blog` | GET | List blog posts |
| `/blog/:slug` | GET | Blog post details |
| `/vlogs` | GET | List vlogs |
| `/volunteer` | POST | Volunteer signup |
| `/contact` | POST | Contact form |

## Accessibility

This application follows WCAG 2.1 AA guidelines:

- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Screen reader compatible
- ✅ Color contrast (4.5:1 minimum)
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ Form labels

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | ≥ 90 |
| Lighthouse SEO | ≥ 90 |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |

## Contributing

1. Create a feature branch
2. Write tests first (TDD)
3. Implement feature
4. Ensure all tests pass
5. Submit PR

## License

MIT
