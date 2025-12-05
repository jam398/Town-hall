# Inter Font - Complete Implementation Guide
## Ready-to-Use Code for Bauhaus Neo-Modernism Project

**Date:** November 6, 2025  
**Source:** https://rsms.me/inter/  
**License:** SIL Open Font License (free, open-source)

---

## 🎯 Quick Start Implementation

### HTML (Add to `<head>`)

```html
<!-- Preconnect to Inter font CDN -->
<link rel="preconnect" href="https://rsms.me/">

<!-- Load Inter CSS -->
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
```

### CSS (Base Typography Setup)

```css
/* CSS */
:root {
  font-family: Inter, sans-serif;
  font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
}

/* Use variable font if browser supports it */
@supports (font-variation-settings: normal) {
  :root { 
    font-family: InterVariable, sans-serif; 
  }
}
```

**Note:** Global CDN sponsored by Cloudflare - fast, reliable worldwide delivery

---

## 📊 Inter Font Specifications

### Weight Range (9 Weights Available)

| Weight Name | CSS Value | Use Case |
|-------------|-----------|----------|
| Thin | 100 | Large display text, delicate emphasis |
| ExtraLight | 200 | Subtle headlines, light UI elements |
| Light | 300 | Secondary text, captions |
| Regular | 400 | **Body text** (most common) |
| Medium | 500 | **Subheadings**, emphasized body text |
| SemiBold | 600 | **Section headings**, call-to-action buttons |
| Bold | 700 | **Main headlines**, important emphasis |
| ExtraBold | 800 | Hero headlines, strong emphasis |
| Black | 900 | Maximum impact, large titles |

### Implementation Example

```css
/* Bauhaus Neo-Modernism Typography Scale */
:root {
  /* Font family */
  --font-primary: InterVariable, Inter, system-ui, sans-serif;
  
  /* Font weights */
  --font-weight-thin: 100;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-black: 900;
}

/* Apply to elements */
body {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-regular);
  font-size: 16px;
  line-height: 1.5;
}

h1 {
  font-weight: var(--font-weight-bold);
  font-size: 3.583rem; /* 57.33px - Perfect Fifth scale */
  line-height: 1.2;
  letter-spacing: -0.02em;
}

h2 {
  font-weight: var(--font-weight-semibold);
  font-size: 2.986rem; /* 47.78px */
  line-height: 1.25;
}

h3 {
  font-weight: var(--font-weight-semibold);
  font-size: 2.488rem; /* 39.81px */
  line-height: 1.3;
}

.lead-text {
  font-weight: var(--font-weight-light);
  font-size: 1.44rem; /* 23.04px */
  line-height: 1.6;
}

.caption {
  font-weight: var(--font-weight-regular);
  font-size: 0.833rem; /* 13.33px */
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.6);
}
```

---

## ⚙️ OpenType Features

### Available Features in Inter

```css
/* Enable all recommended features */
.typography-enhanced {
  font-feature-settings: 
    'liga' 1,    /* Ligatures (fi, fl) */
    'calt' 1,    /* Contextual alternates (automatic) */
    'kern' 1;    /* Kerning (spacing between letters) */
}

/* Tabular numbers for data/tables */
.data-table {
  font-feature-settings: 'tnum' 1;
  /* Makes all numbers same width for alignment */
}

/* Fractions */
.fractions {
  font-feature-settings: 'frac' 1;
  /* Converts 1/2 to ½ automatically */
}

/* Slashed zero (distinguish 0 from O) */
.code-display {
  font-feature-settings: 'zero' 1;
}

/* Case-sensitive punctuation (for all-caps text) */
.all-caps {
  text-transform: uppercase;
  font-feature-settings: 'case' 1;
  /* Adjusts punctuation height for capitals */
}
```

### Stylistic Sets (Optional Alternatives)

```css
/* Alternative digit style */
.alt-digits {
  font-feature-settings: 'ss01' 1;
}

/* Disambiguation set (makes similar letters more distinct) */
.clear-typography {
  font-feature-settings: 'ss02' 1;
  /* Makes 1 l I 0 O more distinguishable */
}

/* Circular quotes */
.round-quotes {
  font-feature-settings: 'ss03' 1;
}
```

---

## 🎨 Bauhaus Neo-Modernism Typography System

### Complete Implementation

```css
/* ===================================
   BAUHAUS NEO-MODERNISM TYPOGRAPHY
   Using Inter Variable Font
   =================================== */

:root {
  /* Font Family */
  --font-primary: InterVariable, Inter, system-ui, -apple-system, sans-serif;
  
  /* Font Weights */
  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  
  /* Type Scale - Perfect Fifth (1.500) */
  --text-xs: 0.694rem;    /* 11.11px */
  --text-sm: 0.833rem;    /* 13.33px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.2rem;      /* 19.2px */
  --text-xl: 1.44rem;     /* 23.04px */
  --text-2xl: 1.728rem;   /* 27.65px */
  --text-3xl: 2.074rem;   /* 33.18px */
  --text-4xl: 2.488rem;   /* 39.81px */
  --text-5xl: 2.986rem;   /* 47.78px */
  --text-6xl: 3.583rem;   /* 57.33px */
  
  /* Line Heights */
  --leading-tight: 1.2;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}

/* Base Typography */
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-primary);
  font-weight: var(--weight-regular);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  font-feature-settings: 'liga' 1, 'calt' 1;
}

/* Variable font support */
@supports (font-variation-settings: normal) {
  body {
    font-family: InterVariable, sans-serif;
  }
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin-top: 0;
  margin-bottom: 0.5em;
}

h1 {
  font-size: var(--text-6xl);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-tighter);
}

h2 {
  font-size: var(--text-5xl);
  font-weight: var(--weight-semibold);
}

h3 {
  font-size: var(--text-4xl);
  font-weight: var(--weight-semibold);
}

h4 {
  font-size: var(--text-3xl);
  font-weight: var(--weight-medium);
}

h5 {
  font-size: var(--text-2xl);
  font-weight: var(--weight-medium);
}

h6 {
  font-size: var(--text-xl);
  font-weight: var(--weight-medium);
}

/* Paragraphs */
p {
  margin-top: 0;
  margin-bottom: 1em;
  line-height: var(--leading-relaxed);
}

/* Lead text (intro paragraphs) */
.lead {
  font-size: var(--text-xl);
  font-weight: var(--weight-light);
  line-height: var(--leading-relaxed);
  color: rgba(0, 0, 0, 0.8);
}

/* Small text */
.small, small {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

/* Extra small */
.text-xs {
  font-size: var(--text-xs);
}

/* Strong emphasis */
strong, b {
  font-weight: var(--weight-semibold);
}

/* Code */
code {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
  font-size: 0.9em;
  font-feature-settings: 'zero' 1; /* Slashed zero */
}

/* Links */
a {
  color: currentColor;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition: opacity 0.2s ease;
}

a:hover {
  opacity: 0.7;
}

/* Lists */
ul, ol {
  padding-left: 1.5em;
  margin-bottom: 1em;
}

li {
  margin-bottom: 0.5em;
  line-height: var(--leading-relaxed);
}

/* Blockquotes */
blockquote {
  margin: 2em 0;
  padding-left: 2em;
  border-left: 4px solid currentColor;
  font-style: italic;
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  opacity: 0.9;
}
```

---

## 📱 Responsive Typography

```css
/* Mobile First Approach */

/* Base (mobile) - already defined above */

/* Tablet (768px+) */
@media (min-width: 768px) {
  html {
    font-size: 17px; /* Slightly larger on tablets */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  html {
    font-size: 18px; /* Larger on desktop */
  }
  
  h1 {
    font-size: 4.3rem; /* ~77px */
  }
}

/* Large Desktop (1280px+) */
@media (min-width: 1280px) {
  html {
    font-size: 18px;
  }
}

/* Fluid Typography (Alternative: Scales smoothly) */
h1 {
  font-size: clamp(2.5rem, 5vw + 1rem, 5rem);
  /* Min: 40px, Scales with viewport, Max: 80px */
}

body {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  /* Min: 16px, Scales with viewport, Max: 18px */
}
```

---

## 🎯 Bauhaus-Specific Typography Patterns

### Hero Section Typography

```css
.hero-title {
  font-size: var(--text-6xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tighter);
  text-transform: uppercase;
  margin-bottom: 0.5em;
}

.hero-subtitle {
  font-size: var(--text-2xl);
  font-weight: var(--weight-light);
  line-height: var(--leading-normal);
  opacity: 0.8;
}
```

### Section Headings

```css
.section-heading {
  font-size: var(--text-4xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-subheading {
  font-size: var(--text-xl);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  opacity: 0.7;
  margin-bottom: 2rem;
}
```

### Card Typography

```css
.card-title {
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  margin-bottom: 0.5em;
}

.card-body {
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-relaxed);
  color: rgba(0, 0, 0, 0.8);
}
```

### Button Typography

```css
.btn {
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  line-height: 1;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.btn-large {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
}
```

---

## ✅ Why Inter is Perfect for Bauhaus Neo-Modernism

### Alignment with Bauhaus Principles

1. **Form Follows Function** ✅
   - Designed for screens and UI
   - Optimized for readability
   - No decorative elements

2. **Geometric Construction** ✅
   - Neo-grotesque sans-serif
   - Clean, geometric letterforms
   - Mathematical precision

3. **Industrial Aesthetic** ✅
   - Modern, technical feel
   - Systematic weight progression
   - Engineered for digital era

4. **Universal Design** ✅
   - 2000+ glyphs
   - 147 languages
   - Accessible and inclusive

5. **Open and Free** ✅
   - Open-source (SIL OFL)
   - Free for all uses
   - Community-driven

---

## 📦 Self-Hosting Option (Alternative to CDN)

If you want to host Inter locally instead of using CDN:

### 1. Download Inter

Visit: https://rsms.me/inter/download/

### 2. Add to Your Project

```
project/
├── fonts/
│   ├── Inter-Variable.woff2
│   ├── Inter-Variable.ttf
│   └── (other formats)
```

### 3. CSS @font-face

```css
@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/Inter-Variable-Italic.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
```

---

## 🚀 Performance Optimization

### Font Loading Strategy

```html
<!-- Preload critical font -->
<link rel="preload" 
      href="https://rsms.me/inter/inter.css" 
      as="style">

<link rel="stylesheet" 
      href="https://rsms.me/inter/inter.css">
```

### font-display Strategy

```css
@font-face {
  font-family: 'Inter';
  src: url('...') format('woff2');
  font-display: swap; /* Show fallback immediately, swap when loaded */
}
```

### Subset Font (Advanced)

For production, subset Inter to only include characters you need:

```bash
# Using pyftsubset
pyftsubset Inter-Variable.ttf \
  --output-file=Inter-Subset.woff2 \
  --flavor=woff2 \
  --unicodes=U+0020-007E  # Basic Latin only
```

---

## 📚 Resources

- **Official Site:** https://rsms.me/inter/
- **GitHub:** https://github.com/rsms/inter
- **Google Fonts:** https://fonts.google.com/specimen/Inter
- **License:** SIL Open Font License 1.1
- **CDN:** Cloudflare (global, fast, reliable)

---

**Implementation Status:** ✅ Ready to use  
**Bauhaus Alignment:** ✅ Perfect fit  
**Performance:** ✅ CDN-optimized  
**Cost:** ✅ Free and open-source

**Start using Inter in your Bauhaus neo-modernism project today!** 🎨✨
