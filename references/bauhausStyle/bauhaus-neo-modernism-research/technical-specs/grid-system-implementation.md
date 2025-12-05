# CSS Grid System Implementation
## 12-Column Bauhaus/Swiss Grid for Modern Web

**Date:** November 6, 2025  
**System:** CSS Grid Layout  
**Inspiration:** Josef Müller-Brockmann, Swiss Design  
**Framework:** Modern CSS Grid

---

## 🎯 Core Grid System

### Container Setup

```css
:root {
  /* Grid Configuration */
  --grid-columns: 12;
  --grid-gap: 1.5rem;          /* 24px */
  --container-max-width: 1280px;
  --container-padding: 1.5rem;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Container */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}

/* Full-width container */
.container-fluid {
  width: 100%;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}
```

---

## 📐 12-Column Grid

### Basic Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap);
}

/* Grid with no gap */
.grid-flush {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0;
}

/* Grid with larger gap */
.grid-wide {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3rem; /* 48px */
}
```

### Column Spanning

```css
/* Span utilities (1-12 columns) */
.col-1  { grid-column: span 1; }
.col-2  { grid-column: span 2; }
.col-3  { grid-column: span 3; }
.col-4  { grid-column: span 4; }
.col-5  { grid-column: span 5; }
.col-6  { grid-column: span 6; }
.col-7  { grid-column: span 7; }
.col-8  { grid-column: span 8; }
.col-9  { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* Full width */
.col-full {
  grid-column: 1 / -1;
}
```

### Column Start/End

```css
/* Start positions */
.col-start-1  { grid-column-start: 1; }
.col-start-2  { grid-column-start: 2; }
.col-start-3  { grid-column-start: 3; }
.col-start-4  { grid-column-start: 4; }
.col-start-5  { grid-column-start: 5; }
.col-start-6  { grid-column-start: 6; }
.col-start-7  { grid-column-start: 7; }
.col-start-8  { grid-column-start: 8; }
.col-start-9  { grid-column-start: 9; }
.col-start-10 { grid-column-start: 10; }
.col-start-11 { grid-column-start: 11; }
.col-start-12 { grid-column-start: 12; }

/* End positions */
.col-end-1  { grid-column-end: 1; }
.col-end-2  { grid-column-end: 2; }
.col-end-3  { grid-column-end: 3; }
.col-end-4  { grid-column-end: 4; }
.col-end-5  { grid-column-end: 5; }
.col-end-6  { grid-column-end: 6; }
.col-end-7  { grid-column-end: 7; }
.col-end-8  { grid-column-end: 8; }
.col-end-9  { grid-column-end: 9; }
.col-end-10 { grid-column-end: 10; }
.col-end-11 { grid-column-end: 11; }
.col-end-12 { grid-column-end: 12; }
.col-end-13 { grid-column-end: 13; } /* End of grid */
```

---

## 🎨 Bauhaus Asymmetric Layouts

### 5:7 Ratio (Bauhaus Principle)

```css
.grid-5-7 {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: var(--grid-gap);
}

/* Reverse order */
.grid-7-5 {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: var(--grid-gap);
}
```

### 4:8 Ratio (1/3 : 2/3)

```css
.grid-4-8 {
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: var(--grid-gap);
}

.grid-8-4 {
  display: grid;
  grid-template-columns: 8fr 4fr;
  gap: var(--grid-gap);
}
```

### 3:9 Ratio (1/4 : 3/4)

```css
.grid-3-9 {
  display: grid;
  grid-template-columns: 3fr 9fr;
  gap: var(--grid-gap);
}

.grid-9-3 {
  display: grid;
  grid-template-columns: 9fr 3fr;
  gap: var(--grid-gap);
}
```

### Three Column Layouts

```css
/* Equal thirds */
.grid-thirds {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-gap);
}

/* Asymmetric thirds (4:4:4 of 12) */
.grid-thirds-narrow {
  display: grid;
  grid-template-columns: 3fr 6fr 3fr; /* sidebar, content, sidebar */
  gap: var(--grid-gap);
}
```

---

## 📱 Responsive Grid

### Mobile-First Breakpoints

```css
/* Mobile (default) - Stack everything */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--grid-gap);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(6, 1fr); /* 6 columns on tablet */
  }
  
  /* Responsive column spans */
  .col-md-1  { grid-column: span 1; }
  .col-md-2  { grid-column: span 2; }
  .col-md-3  { grid-column: span 3; }
  .col-md-4  { grid-column: span 4; }
  .col-md-5  { grid-column: span 5; }
  .col-md-6  { grid-column: span 6; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(12, 1fr); /* Full 12 columns */
  }
  
  .col-lg-1  { grid-column: span 1; }
  .col-lg-2  { grid-column: span 2; }
  .col-lg-3  { grid-column: span 3; }
  .col-lg-4  { grid-column: span 4; }
  .col-lg-5  { grid-column: span 5; }
  .col-lg-6  { grid-column: span 6; }
  .col-lg-7  { grid-column: span 7; }
  .col-lg-8  { grid-column: span 8; }
  .col-lg-9  { grid-column: span 9; }
  .col-lg-10 { grid-column: span 10; }
  .col-lg-11 { grid-column: span 11; }
  .col-lg-12 { grid-column: span 12; }
}
```

### Responsive Asymmetric Layouts

```css
/* Stack on mobile, asymmetric on desktop */
.layout-asymmetric {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: stack */
  gap: var(--grid-gap);
}

@media (min-width: 768px) {
  .layout-asymmetric {
    grid-template-columns: 5fr 7fr; /* Tablet+: asymmetric */
  }
}
```

---

## 🏗️ Common Layout Patterns

### Hero Section (Full Width)

```css
.hero {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap);
  min-height: 80vh;
  align-items: center;
}

.hero-content {
  grid-column: 2 / 8; /* Columns 2-7 (6 columns) */
}

.hero-image {
  grid-column: 8 / -1; /* Columns 8-12 */
}

/* Mobile */
@media (max-width: 767px) {
  .hero-content,
  .hero-image {
    grid-column: 1 / -1; /* Full width */
  }
}
```

### Sidebar Layout

```css
.sidebar-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap);
}

.main-content {
  grid-column: 1 / 9; /* 8 columns */
}

.sidebar {
  grid-column: 9 / -1; /* 4 columns */
}

@media (max-width: 1023px) {
  .main-content,
  .sidebar {
    grid-column: 1 / -1; /* Stack on mobile/tablet */
  }
}
```

### Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap);
}

.card {
  grid-column: span 4; /* 3 cards per row (4 + 4 + 4 = 12) */
}

@media (max-width: 1023px) {
  .card {
    grid-column: span 6; /* 2 cards per row on tablet */
  }
}

@media (max-width: 767px) {
  .card {
    grid-column: span 12; /* 1 card per row on mobile */
  }
}
```

### Feature Grid

```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap);
}

.feature {
  grid-column: span 3; /* 4 features per row */
}

@media (max-width: 1023px) {
  .feature {
    grid-column: span 6; /* 2 per row on tablet */
  }
}

@media (max-width: 767px) {
  .feature {
    grid-column: span 12; /* 1 per row on mobile */
  }
}
```

---

## 📐 Grid Template Areas (Named Regions)

### Layout with Named Areas

```css
.page-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header header header header header header header header header header"
    "main main main main main main main main main sidebar sidebar sidebar"
    "footer footer footer footer footer footer footer footer footer footer footer footer";
  gap: var(--grid-gap);
  min-height: 100vh;
}

.page-header {
  grid-area: header;
}

.page-main {
  grid-area: main;
}

.page-sidebar {
  grid-area: sidebar;
}

.page-footer {
  grid-area: footer;
}

/* Mobile: Stack everything */
@media (max-width: 767px) {
  .page-layout {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}
```

---

## 🎯 Bauhaus-Specific Patterns

### Mondrian-Style Grid

```css
.mondrian-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, minmax(80px, 1fr));
  gap: 4px;
  background-color: var(--bauhaus-black);
}

.mondrian-block-1 {
  grid-column: 1 / 6;
  grid-row: 1 / 5;
  background-color: var(--bauhaus-red);
}

.mondrian-block-2 {
  grid-column: 6 / 13;
  grid-row: 1 / 3;
  background-color: var(--bauhaus-yellow);
}

.mondrian-block-3 {
  grid-column: 6 / 10;
  grid-row: 3 / 9;
  background-color: var(--bauhaus-blue);
}

.mondrian-block-4 {
  grid-column: 10 / 13;
  grid-row: 3 / 6;
  background-color: var(--bauhaus-white);
}

.mondrian-block-5 {
  grid-column: 1 / 6;
  grid-row: 5 / 9;
  background-color: var(--bauhaus-white);
}

.mondrian-block-6 {
  grid-column: 10 / 13;
  grid-row: 6 / 9;
  background-color: var(--bauhaus-white);
}
```

### Overlapping Grid (Modern Bauhaus)

```css
.overlap-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap);
  position: relative;
}

.overlap-main {
  grid-column: 1 / 8;
  z-index: 1;
}

.overlap-accent {
  grid-column: 7 / -1;
  margin-top: 4rem; /* Offset for overlap effect */
  z-index: 2;
}
```

---

## 🔧 Helper Classes

### Alignment

```css
/* Horizontal alignment */
.justify-start   { justify-items: start; }
.justify-center  { justify-items: center; }
.justify-end     { justify-items: end; }
.justify-stretch { justify-items: stretch; }

/* Vertical alignment */
.align-start   { align-items: start; }
.align-center  { align-items: center; }
.align-end     { align-items: end; }
.align-stretch { align-items: stretch; }

/* Center both axes */
.place-center {
  place-items: center;
}
```

### Gap Utilities

```css
.gap-0    { gap: 0; }
.gap-xs   { gap: 0.5rem; }   /* 8px */
.gap-sm   { gap: 1rem; }     /* 16px */
.gap-md   { gap: 1.5rem; }   /* 24px */
.gap-lg   { gap: 2rem; }     /* 32px */
.gap-xl   { gap: 3rem; }     /* 48px */
.gap-2xl  { gap: 4rem; }     /* 64px */

/* Row and column gap separately */
.row-gap-md    { row-gap: 1.5rem; }
.column-gap-md { column-gap: 1.5rem; }
```

### Auto-fit & Auto-fill

```css
/* Responsive card grid that auto-adjusts columns */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--grid-gap);
}

/* Auto-fill (creates as many columns as possible) */
.auto-grid-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--grid-gap);
}
```

---

## 📊 Modular Grid (Swiss Design)

### Square Module Grid

```css
.modular-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(80px, auto); /* Square-ish modules */
  gap: 1rem;
}

/* Span both columns and rows */
.module-2x2 {
  grid-column: span 2;
  grid-row: span 2;
}

.module-3x3 {
  grid-column: span 3;
  grid-row: span 3;
}

.module-4x2 {
  grid-column: span 4;
  grid-row: span 2;
}
```

---

## 🎨 Complete Grid System

```css
/* ===================================
   BAUHAUS GRID SYSTEM
   12-Column CSS Grid Layout
   =================================== */

:root {
  --grid-columns: 12;
  --grid-gap: 1.5rem;
  --container-max-width: 1280px;
  --container-padding: 1.5rem;
}

/* Container */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gap);
}

/* Column spans */
.col-1  { grid-column: span 1; }
.col-2  { grid-column: span 2; }
.col-3  { grid-column: span 3; }
.col-4  { grid-column: span 4; }
.col-5  { grid-column: span 5; }
.col-6  { grid-column: span 6; }
.col-7  { grid-column: span 7; }
.col-8  { grid-column: span 8; }
.col-9  { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* Asymmetric layouts (Bauhaus) */
.grid-5-7 {
  grid-template-columns: 5fr 7fr;
}

.grid-7-5 {
  grid-template-columns: 7fr 5fr;
}

/* Responsive */
@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  [class*="col-"] {
    grid-column: 1 / -1;
  }
}
```

---

## 📐 Grid Debugging

```css
/* Visualize grid during development */
.grid-debug {
  position: relative;
}

.grid-debug::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      to right,
      rgba(255, 0, 0, 0.1) 0,
      rgba(255, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent calc(100% / 12)
    );
  pointer-events: none;
  z-index: 9999;
}
```

---

**Status:** ✅ Production Ready  
**Browser Support:** ✅ All modern browsers  
**Responsive:** ✅ Mobile-first  
**Bauhaus Principles:** ✅ Asymmetric layouts supported
