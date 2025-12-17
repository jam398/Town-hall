# EAiKW Harvest Notes

## Overview

This document contains AI-generated analysis of the EAiKW (Education AI Knowledge Workers) reference site, documenting reusable techniques, patterns, and approaches that have been adapted for the Town Hall Newark project.

**Reference Repository:** `references/eaikw-main/`

---

## 1. Eleventy Configuration Analysis

### File: `.eleventy.js`

**Key Patterns Identified:**

```javascript
// Passthrough copy for static assets
eleventyConfig.addPassthroughCopy("src/assets");
eleventyConfig.addPassthroughCopy("src/css");

// Custom collections
eleventyConfig.addCollection("posts", collection => {
  return collection.getFilteredByGlob("src/posts/*.md");
});

// Shortcodes for reusable components
eleventyConfig.addShortcode("image", imageShortcode);
```

**Techniques Harvested:**
- Collection-based content organization
- Passthrough copy for static assets
- Custom shortcodes for component reuse
- Markdown processing with custom plugins

**Adaptation for Town Hall:**
- Used similar content organization in Sanity schemas
- Implemented component-based architecture in React
- Created reusable UI components instead of shortcodes

---

## 2. CSS Architecture Notes

### Structure Analysis

```
src/css/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── components/
│   ├── buttons.css
│   ├── cards.css
│   └── navigation.css
├── layouts/
│   ├── grid.css
│   └── containers.css
└── utilities/
    └── helpers.css
```

**Key Patterns:**
- CSS custom properties for theming
- Mobile-first responsive design
- BEM-like naming conventions
- Utility classes for spacing/layout

**CSS Variables Example:**
```css
:root {
  --color-primary: #FF6B35;
  --color-secondary: #4ECDC4;
  --font-heading: 'Inter', sans-serif;
  --spacing-unit: 8px;
}
```

**Adaptation for Town Hall:**
- Implemented via Tailwind CSS configuration
- Custom color palette in `tailwind.config.ts`
- Swiss Modern design system with similar variable structure

---

## 3. Accessibility Findings

### WCAG Compliance Patterns

**Semantic HTML:**
```html
<main id="main-content">
  <article>
    <header>
      <h1>Page Title</h1>
    </header>
    <section aria-labelledby="section-heading">
      <!-- Content -->
    </section>
  </article>
</main>
```

**Skip Links:**
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

**Focus Management:**
```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

**ARIA Patterns:**
- `aria-label` for icon buttons
- `aria-expanded` for accordions
- `aria-current="page"` for navigation
- `role="alert"` for notifications

**Adaptation for Town Hall:**
- Implemented semantic HTML structure
- Added skip links in layout
- Focus-visible styles in Tailwind config
- ARIA attributes on interactive components

---

## 4. SEO Strategy

### Meta Tags Pattern

```html
<head>
  <title>Page Title | Site Name</title>
  <meta name="description" content="Page description...">
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description...">
  <meta property="og:image" content="/images/og-image.jpg">
  <meta property="og:type" content="website">
  <link rel="canonical" href="https://example.com/page">
</head>
```

### Structured Data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Organization Name",
  "url": "https://example.com"
}
</script>
```

### SEO Techniques:
- Unique titles per page
- Meta descriptions under 160 chars
- Open Graph tags for social sharing
- JSON-LD structured data
- Canonical URLs
- Sitemap generation

**Adaptation for Town Hall:**
- Next.js Metadata API for SEO
- JSON-LD component for structured data
- Dynamic OG images per page
- Sitemap via Next.js

---

## 5. Layout Approach

### Grid System

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-md);
}

.col-span-4 { grid-column: span 4; }
.col-span-6 { grid-column: span 6; }
.col-span-12 { grid-column: span 12; }
```

### Responsive Patterns

```css
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

### Layout Components:
- Header with sticky navigation
- Main content area
- Footer with multi-column layout
- Sidebar for secondary content

**Adaptation for Town Hall:**
- Tailwind grid utilities
- `max-w-swiss` custom container
- Responsive breakpoints matching EAiKW
- Swiss Modern grid proportions

---

## 6. Performance Techniques

### Image Optimization

```javascript
// Eleventy Image plugin
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600, 900],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/img/"
  });
  // Generate responsive image markup
}
```

### Critical CSS

```html
<style>
  /* Inline critical CSS */
</style>
<link rel="preload" href="/css/main.css" as="style">
<link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
```

### Performance Patterns:
- Lazy loading images
- Responsive images with srcset
- Critical CSS inlining
- Deferred JavaScript loading
- Preconnect to external domains
- Font subsetting

**Adaptation for Town Hall:**
- Next.js Image component for optimization
- Automatic code splitting
- Font optimization via next/font
- Lazy loading via Intersection Observer

---

## 7. Component Patterns

### Card Component

```html
<article class="card">
  <div class="card__image">
    <img src="..." alt="..." loading="lazy">
  </div>
  <div class="card__content">
    <h3 class="card__title">Title</h3>
    <p class="card__excerpt">Excerpt...</p>
    <a href="..." class="card__link">Read more</a>
  </div>
</article>
```

### Button Variants

```css
.btn { /* base styles */ }
.btn--primary { /* primary variant */ }
.btn--secondary { /* secondary variant */ }
.btn--outline { /* outline variant */ }
.btn--sm { /* small size */ }
.btn--lg { /* large size */ }
```

**Adaptation for Town Hall:**
- React component architecture
- Props-based variants
- TypeScript for type safety
- Tailwind for styling

---

## 8. Build & Deploy Patterns

### Makefile Commands

```makefile
build:
	npm run build

dev:
	npm run dev

test:
	npm run test

deploy:
	npm run build && netlify deploy --prod
```

### GitHub Actions

```yaml
- name: Build
  run: npm run build
  
- name: Test
  run: npm run test
  
- name: Lighthouse
  uses: treosh/lighthouse-ci-action@v9
```

**Adaptation for Town Hall:**
- Similar CI/CD structure
- Added coverage thresholds
- Docker build verification
- Playwright for E2E tests

---

## 9. Content Structure

### Frontmatter Pattern

```yaml
---
title: "Post Title"
date: 2024-01-15
author: "Author Name"
tags:
  - category1
  - category2
excerpt: "Brief description..."
featuredImage: "/images/post.jpg"
---
```

**Adaptation for Town Hall:**
- Sanity schemas mirror frontmatter structure
- Same field names for consistency
- Rich text via Portable Text

---

## 10. Key Takeaways

### What We Adopted:
1. ✅ Semantic HTML structure
2. ✅ Accessibility patterns (skip links, ARIA)
3. ✅ SEO meta tag strategy
4. ✅ Responsive grid system
5. ✅ Component-based architecture
6. ✅ Performance optimization techniques
7. ✅ CI/CD pipeline structure

### What We Modified:
1. 🔄 Eleventy → Next.js (framework choice)
2. 🔄 CSS → Tailwind (styling approach)
3. 🔄 Markdown → Sanity (content management)
4. 🔄 Shortcodes → React components

### Why Next.js Over Eleventy:
- Team familiarity with React
- Better TypeScript support
- Rich component ecosystem
- API routes for backend
- Easier CMS integration

---

## Conclusion

The EAiKW reference site provided valuable patterns for accessibility, SEO, performance, and content structure. While we chose Next.js over Eleventy for implementation, the core principles and techniques have been successfully adapted to the Town Hall Newark project.

---

*Document created: December 2024*
*AI-assisted analysis with human validation*
