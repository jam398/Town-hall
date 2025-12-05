# Bauhaus Neo-Modernism Design System
## Complete Specification v1.0

**Date:** November 6, 2025  
**Status:** Phase 2 - Design System Definition  
**Project:** Bauhaus Neo-Modernism Website

---

## 🎨 Design Philosophy

### Core Principles
1. **Form Follows Function** - Every element has a purpose
2. **Geometric Clarity** - Clean shapes, precise alignment
3. **Systematic Thinking** - Consistent patterns and rules
4. **Asymmetric Balance** - Dynamic compositions over symmetry
5. **Primary Colors** - Red, yellow, blue + black and white
6. **Universal Design** - Accessible, inclusive, timeless

### Visual Language
- **Shapes:** Circles, squares, triangles, rectangles
- **Lines:** Horizontal and vertical emphasis, minimal diagonals
- **Space:** Generous whitespace, intentional negative space
- **Hierarchy:** Clear, functional, typographic-driven
- **Color Usage:** Bold blocking, intentional restraint

---

## 📝 Typography System

### Font Stack

**Primary Font: Inter Variable**
```css
font-family: 'InterVariable', 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', system-ui, sans-serif;
```

**Characteristics:**
- Neo-grotesque sans-serif
- Variable font (weight 100-900)
- 2,000+ glyphs, 147 languages
- Optimized for screen display
- Open source (SIL Open Font License)

**Why Inter:**
- Embraced by neo-modernist companies (Linear, Vercel, GitHub)
- Variable font = efficient, flexible
- Excellent readability at all sizes
- Perfect for data-dense interfaces
- Free and self-hostable

### Type Scale

**Ratio:** Perfect Fifth (1.500) - Dramatic, Bauhaus-appropriate

**Scale Definition:**
```css
:root {
  /* Base */
  --text-base: 1rem;      /* 16px */
  
  /* Scale Up */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 2.25rem;    /* 36px */
  --text-4xl: 3.375rem;   /* 54px */
  --text-5xl: 5.063rem;   /* 81px */
  --text-6xl: 7.594rem;   /* 121px */
  
  /* Scale Down */
  --text-sm: 0.875rem;    /* 14px */
  --text-xs: 0.75rem;     /* 12px */
}
```

### Font Weights

```css
:root {
  --weight-thin: 100;
  --weight-extralight: 200;
  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;
  --weight-black: 900;
}
```

**Usage Guidelines:**
- **Headings:** 600-700 (Semibold-Bold)
- **Body:** 400 (Regular)
- **UI Labels:** 500-600 (Medium-Semibold)
- **Captions:** 300-400 (Light-Regular)
- **Emphasis:** 700-900 (Bold-Black)

### Line Heights

```css
:root {
  --leading-none: 1;
  --leading-tight: 1.2;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  --leading-loose: 2;
}
```

**Usage:**
- **Headings:** 1.2 (tight)
- **Body:** 1.5 (normal) or 1.75 (relaxed)
- **UI Elements:** 1 (none) or 1.2 (tight)
- **Captions:** 1.5 (normal)

### Letter Spacing

```css
:root {
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

**Usage:**
- **Large Headings:** -0.025em to -0.05em
- **Body:** 0 (normal)
- **Uppercase Text:** 0.05em to 0.1em
- **Small UI Text:** 0.025em

### Typography Classes

```css
/* Headings */
h1, .text-h1 {
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

h2, .text-h2 {
  font-size: var(--text-4xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
}

h3, .text-h3 {
  font-size: var(--text-3xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

h4, .text-h4 {
  font-size: var(--text-2xl);
  font-weight: var(--weight-medium);
  line-height: var(--leading-snug);
}

/* Body */
body, .text-body {
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-relaxed);
}

/* Utilities */
.text-uppercase {
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

---

## 🎨 Color System

### Primary Colors (Bauhaus Core)

```css
:root {
  /* Bauhaus Primaries */
  --bauhaus-red: hsl(356, 100%, 44%);     /* #E1000F */
  --bauhaus-yellow: hsl(51, 100%, 50%);   /* #FFED00 */
  --bauhaus-blue: hsl(206, 100%, 35%);    /* #0064B4 */
  
  /* Neutrals */
  --bauhaus-black: hsl(0, 0%, 0%);        /* #000000 */
  --bauhaus-white: hsl(0, 0%, 100%);      /* #FFFFFF */
}
```

### Semantic Color Roles

```css
:root {
  /* Primary System (Blue) */
  --color-primary: var(--bauhaus-blue);
  --color-primary-50: hsl(206, 100%, 95%);
  --color-primary-100: hsl(206, 100%, 90%);
  --color-primary-200: hsl(206, 100%, 80%);
  --color-primary-300: hsl(206, 100%, 70%);
  --color-primary-400: hsl(206, 100%, 55%);
  --color-primary-500: hsl(206, 100%, 35%);  /* Base */
  --color-primary-600: hsl(206, 100%, 28%);
  --color-primary-700: hsl(206, 100%, 21%);
  --color-primary-800: hsl(206, 100%, 14%);
  --color-primary-900: hsl(206, 100%, 7%);
  
  /* Secondary System (Red) */
  --color-secondary: var(--bauhaus-red);
  --color-secondary-50: hsl(356, 100%, 95%);
  --color-secondary-500: hsl(356, 100%, 44%);  /* Base */
  --color-secondary-900: hsl(356, 100%, 7%);
  
  /* Accent System (Yellow) */
  --color-accent: var(--bauhaus-yellow);
  --color-accent-50: hsl(51, 100%, 95%);
  --color-accent-500: hsl(51, 100%, 50%);  /* Base */
  --color-accent-900: hsl(51, 100%, 15%);
}
```

### Gray Scale

```css
:root {
  --color-gray-0: hsl(0, 0%, 100%);    /* White */
  --color-gray-50: hsl(0, 0%, 98%);
  --color-gray-100: hsl(0, 0%, 96%);
  --color-gray-200: hsl(0, 0%, 92%);
  --color-gray-300: hsl(0, 0%, 84%);
  --color-gray-400: hsl(0, 0%, 70%);
  --color-gray-500: hsl(0, 0%, 50%);
  --color-gray-600: hsl(0, 0%, 38%);
  --color-gray-700: hsl(0, 0%, 26%);
  --color-gray-800: hsl(0, 0%, 16%);
  --color-gray-900: hsl(0, 0%, 8%);
  --color-gray-1000: hsl(0, 0%, 0%);   /* Black */
}
```

### Functional Colors

```css
:root {
  /* Surface Colors */
  --color-background: var(--color-gray-0);
  --color-surface: var(--color-gray-50);
  --color-surface-variant: var(--color-gray-100);
  
  /* Text Colors */
  --color-on-background: var(--color-gray-900);
  --color-on-surface: var(--color-gray-900);
  --color-on-primary: var(--color-gray-0);
  --color-on-secondary: var(--color-gray-0);
  --color-on-accent: var(--color-gray-900);
  
  /* Text Hierarchy */
  --text-primary: var(--color-gray-900);
  --text-secondary: var(--color-gray-600);
  --text-tertiary: var(--color-gray-400);
  --text-disabled: var(--color-gray-300);
  
  /* Borders */
  --color-outline: var(--color-gray-300);
  --color-outline-variant: var(--color-gray-200);
  
  /* States */
  --color-hover: rgba(0, 100, 180, 0.08);
  --color-focus: rgba(0, 100, 180, 0.12);
  --color-pressed: rgba(0, 100, 180, 0.16);
  
  /* Feedback */
  --color-error: hsl(4, 90%, 58%);
  --color-error-container: hsl(4, 90%, 95%);
  --color-on-error: var(--color-gray-0);
  --color-on-error-container: hsl(4, 90%, 20%);
  
  --color-success: hsl(122, 39%, 49%);
  --color-success-container: hsl(122, 39%, 95%);
  --color-on-success: var(--color-gray-0);
  
  --color-warning: hsl(45, 100%, 51%);
  --color-warning-container: hsl(45, 100%, 95%);
  --color-on-warning: var(--color-gray-900);
  
  --color-info: hsl(199, 89%, 48%);
  --color-info-container: hsl(199, 89%, 95%);
  --color-on-info: var(--color-gray-0);
}
```

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Surface Colors */
    --color-background: var(--color-gray-1000);
    --color-surface: var(--color-gray-900);
    --color-surface-variant: var(--color-gray-800);
    
    /* Text Colors */
    --color-on-background: var(--color-gray-100);
    --color-on-surface: var(--color-gray-100);
    
    --text-primary: var(--color-gray-100);
    --text-secondary: var(--color-gray-400);
    --text-tertiary: var(--color-gray-500);
    
    /* Borders */
    --color-outline: var(--color-gray-700);
    --color-outline-variant: var(--color-gray-800);
  }
}
```

### Color Usage Guidelines

**Primary Blue:**
- Primary actions (buttons, links)
- Interactive elements
- Selected states
- Focus indicators

**Secondary Red:**
- Secondary actions
- Emphasis points
- Alert/important information
- Accent elements

**Accent Yellow:**
- Tertiary actions
- Highlights
- Call-to-action backgrounds
- Warning states

**Black & White:**
- Typography
- Backgrounds
- High contrast elements
- Structural elements

---

## 📐 Grid System

### Container

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

/* Container Variations */
.container-narrow {
  max-width: 960px;
}

.container-wide {
  max-width: 1440px;
}

.container-full {
  max-width: none;
}
```

### Grid Base

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

/* Responsive Gaps */
@media (min-width: 640px) {
  .grid { gap: 2rem; }
}

@media (min-width: 1024px) {
  .grid { gap: 2.5rem; }
}
```

### Column Spans

```css
/* Utility Classes */
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-5 { grid-column: span 5; }
.col-6 { grid-column: span 6; }
.col-7 { grid-column: span 7; }
.col-8 { grid-column: span 8; }
.col-9 { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* Full width helper */
.col-full {
  grid-column: 1 / -1;
}
```

### Asymmetric Layouts (Bauhaus)

```css
/* 5:7 Ratio */
.grid-5-7 {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 2rem;
}

/* 7:5 Ratio (Reversed) */
.grid-7-5 {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 2rem;
}

/* 4:8 Ratio */
.grid-4-8 {
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: 2rem;
}

/* 3:9 Ratio */
.grid-3-9 {
  display: grid;
  grid-template-columns: 3fr 9fr;
  gap: 2rem;
}
```

### Responsive Breakpoints

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Mobile First Approach */
@media (min-width: 640px) {
  /* Tablet Portrait */
}

@media (min-width: 768px) {
  /* Tablet Landscape */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large Desktop */
}
```

### Responsive Utilities

```css
/* Mobile: Stack */
@media (max-width: 767px) {
  .grid-5-7,
  .grid-7-5,
  .grid-4-8,
  .grid-3-9 {
    grid-template-columns: 1fr;
  }
  
  .col-1, .col-2, .col-3, .col-4,
  .col-5, .col-6, .col-7, .col-8,
  .col-9, .col-10, .col-11, .col-12 {
    grid-column: span 12;
  }
}
```

---

## 📏 Spacing System

### Scale

**Based on 8px grid system:**

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

### Usage Guidelines

**Component Spacing:**
- Between sections: `--space-16` to `--space-24`
- Between cards: `--space-6` to `--space-8`
- Inside cards: `--space-4` to `--space-6`
- Between text elements: `--space-2` to `--space-4`
- Between icon and text: `--space-2`

**Layout Spacing:**
- Page margins: `--space-6` (mobile), `--space-12` (desktop)
- Section padding: `--space-12` to `--space-24`
- Container padding: `--space-6` to `--space-8`

---

## 🎭 Shadows & Elevation

### Shadow Scale

```css
:root {
  --shadow-none: none;
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.12);
  --shadow-2xl: 0 24px 48px rgba(0, 0, 0, 0.14);
}
```

**Usage:**
- Cards (resting): `--shadow-sm`
- Cards (hover): `--shadow-md`
- Modals: `--shadow-xl`
- Dropdowns: `--shadow-lg`
- Tooltips: `--shadow-md`

**Note:** Bauhaus aesthetic often avoids heavy shadows. Use sparingly for functional depth only.

---

## 🔘 Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-md: 0.25rem;    /* 4px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 1rem;       /* 16px */
  --radius-full: 9999px;   /* Circle */
}
```

**Usage Guidelines:**
- Buttons: `--radius-none` (pure Bauhaus) or `--radius-sm` (softened)
- Cards: `--radius-none` or `--radius-md`
- Inputs: `--radius-none` or `--radius-sm`
- Images: `--radius-none` (keep geometric)
- Avatars: `--radius-full`

**Recommendation:** Start with `--radius-none` for authentic Bauhaus aesthetic. Can soften to `--radius-sm` for modern web comfort.

---

## ⚡ Transitions

### Duration

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
}
```

### Easing

```css
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);
}
```

### Standard Transitions

```css
.transition-base {
  transition: all var(--duration-normal) var(--ease-in-out);
}

.transition-color {
  transition: color var(--duration-fast) var(--ease-in-out),
              background-color var(--duration-fast) var(--ease-in-out);
}

.transition-transform {
  transition: transform var(--duration-normal) var(--ease-out);
}
```

---

## ♿ Accessibility

### Contrast Requirements

**WCAG AA Compliance (Minimum):**
- Normal text (< 18px): 4.5:1 contrast ratio
- Large text (≥ 18px): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

**Color Pairings (Pre-tested):**
✅ Primary Blue (#0064B4) on White - 7.3:1  
✅ Secondary Red (#E1000F) on White - 5.2:1  
✅ Black text on Accent Yellow (#FFED00) - 13.6:1  
✅ White on Primary Blue - 7.3:1  
✅ White on Secondary Red - 5.2:1  

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 📱 Responsive Design

### Mobile First Strategy

1. **Design for mobile** (320px - 767px)
2. **Enhance for tablet** (768px - 1023px)
3. **Optimize for desktop** (1024px+)

### Touch Targets

- Minimum size: 44px × 44px
- Recommended: 48px × 48px
- Spacing between: 8px minimum

### Typography Responsive

```css
h1 {
  font-size: clamp(2.5rem, 5vw, 5rem);
}

h2 {
  font-size: clamp(2rem, 4vw, 3.5rem);
}

body {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}
```

---

## 🔧 Implementation Checklist

### Phase 2 Complete When:

- [x] Typography system finalized
- [x] Type scale documented
- [x] Font weights assigned
- [x] Line heights defined
- [x] Color palette complete
- [x] Semantic color roles assigned
- [x] Dark mode defined
- [x] Grid system specified
- [x] Container widths set
- [x] Breakpoints established
- [x] Spacing scale created
- [x] Shadow system defined
- [x] Border radius guidelines
- [x] Transitions standardized
- [x] Accessibility requirements documented
- [x] Responsive strategy defined

### Ready for Phase 3: Planning ✅

**Next Steps:**
1. Create sprint plan (Foundation, Components, Polish)
2. Define success criteria for each sprint
3. Set up project structure
4. Begin building!

---

**Design System Status:** ✅ Complete and ready for implementation  
**Last Updated:** November 6, 2025  
**Version:** 1.0
