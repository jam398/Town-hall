# Town Hall Newark - Eleventy Site

Static site built with Eleventy (11ty) for Town Hall Newark's AI education community.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Project Structure

```
townhall-eleventy/
├── src/
│   ├── _data/          # Global data files
│   │   └── site.json   # Site configuration
│   ├── _includes/      # Partial templates
│   │   ├── header.njk
│   │   ├── footer.njk
│   │   └── cookie-consent.njk
│   ├── _layouts/       # Page layouts
│   │   └── base.njk
│   ├── css/            # Stylesheets
│   │   └── style.css
│   ├── js/             # JavaScript
│   │   └── main.js
│   ├── events/         # Event content
│   ├── blog/           # Blog posts
│   └── *.njk           # Page templates
├── _site/              # Built output (gitignored)
├── .eleventy.js        # Eleventy configuration
└── package.json
```

## Features

- **Swiss Modern Design** - Clean, minimal aesthetic
- **GDPR Compliant** - Cookie consent banner with preferences
- **Privacy-Focused Analytics** - Plausible Analytics (loads after consent)
- **Accessible** - WCAG 2.1 AA compliant
- **Fast** - Minimal JavaScript footprint
- **SEO Optimized** - Meta tags, structured data, semantic HTML

## Technology Stack

- **Eleventy (11ty)** - Static site generator
- **Nunjucks** - Templating
- **CSS** - Custom Swiss Modern design system
- **Vanilla JS** - Minimal, no frameworks

## Content Management

Content is managed through Markdown files in the `src/events/` and `src/blog/` directories.

### Adding an Event

Create a new `.md` file in `src/events/`:

```markdown
---
title: Event Title
slug: event-slug
date: 2024-12-20
time: "6:00 PM"
location: Newark Public Library
description: Short description
tags:
  - Beginner
  - Workshop
---

Event content here...
```

### Adding a Blog Post

Create a new `.md` file in `src/blog/`:

```markdown
---
title: Post Title
slug: post-slug
date: 2024-12-15
author: Author Name
excerpt: Short excerpt
tags:
  - AI
  - Tutorial
---

Post content here...
```

## Deployment

Build the site and deploy the `_site` folder:

```bash
npm run build
```

Deploy to:
- **Netlify** - Drag and drop `_site` folder
- **GitHub Pages** - Push `_site` to `gh-pages` branch
- **Vercel** - Connect repository

## Environment Variables

Create a `.env` file for local development:

```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
```

## License

MIT License - Town Hall Newark
