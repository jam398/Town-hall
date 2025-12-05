# Bauhaus Neo-Modernism Portfolio

> A modern web portfolio demonstrating Bauhaus design principles through contemporary web development — where form follows function meets the digital age.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

🌐 [Live Demo](https://jam398.github.io/bauhausStyle/bauhaus-website/index.html) | 📚 [Design System](./bauhaus-neo-modernism-research/DESIGN-SYSTEM.md) | 📖 [Documentation](./bauhaus-neo-modernism-research/)

---

## 🎨 Overview

**Bauhaus Neo-Modernism** is a comprehensive design research project and interactive web portfolio that translates the revolutionary principles of the Bauhaus movement into the modern digital landscape. This project demonstrates how geometric clarity, systematic thinking, and functional design can create compelling web experiences.

### Design Philosophy

- **Form Follows Function** — Every element serves a clear purpose
- **Geometric Clarity** — Bold shapes, precise alignment, systematic layouts
- **Primary Color System** — Red `#E1000F` · Blue `#0064B4` · Yellow `#FFED00`
- **Typographic Hierarchy** — Inter variable font with modular scale (1.5 ratio)
- **Asymmetric Balance** — Dynamic compositions inspired by Bauhaus pioneers
- **Universal Design** — Accessible, inclusive, and timeless

---

## ✨ Features

### Design & Visual

- 🎨 **Authentic Bauhaus Color Palette** — Primary colors with systematic tints/shades
- 📐 **Geometric Decorative Elements** — Circles, triangles, rectangles as visual accents
- 🔷 **Sharp Geometric Edges** — Zero border-radius on buttons and cards for authentic Bauhaus forms
- 💪 **Bold Typography** — Heading weights 700-900 (Bold to Black) for maximum impact
- 📏 **Geometric Precision** — Tight letter-spacing (-0.05em) on large headings
- 🏷️ **Enhanced Labels** — ALL CAPS with bold weight and wide spacing (0.15em)
- 🌓 **Clean, Minimal Interface** — Generous whitespace and intentional negative space
- 📱 **Mobile-First Responsive Design** — Fluid layouts that adapt elegantly
- ♿ **WCAG 2.1 AA Accessible** — Semantic HTML, keyboard navigation, ARIA labels
- 🎭 **Flat Design Aesthetic** — Reduced shadows/3D effects for poster-like 2D composition

### Technical

- ⚡ **Pure HTML/CSS/JavaScript** — No frameworks, no build step required
- 🎯 **CSS Custom Properties** — Systematic design tokens for easy theming
- 📏 **12-Column Grid System** — Flexible, responsive layout foundation
- 🔤 **Inter Variable Font** — Single font file, multiple weights (100-900)
- 🎪 **Component Architecture** — Modular CSS for maintainability
- 📦 **Zero Dependencies** — Lightweight, fast-loading pages

### Content & Features

- 🏠 **Hero Section** — Bold typography with geometric decorative elements
- 📖 **About/Legacy Section** — Design philosophy and Bauhaus history
- 🎯 **Principles Showcase** — Core design tenets with visual cards
- 📅 **Interactive Timeline** — Bauhaus history milestones
- 👥 **Designer Profiles** — Showcasing influential Bauhaus masters
- 📧 **Contact Form** — Functional with validation
- 🍔 **Mobile Navigation** — Animated hamburger menu with smooth transitions

---

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Python 3.x or Node.js for local server

### Installation

**Option 1: Direct Open**

```bash
# Clone the repository
git clone https://github.com/jam398/bauhausStyle.git
cd bauhausStyle

# Open in browser
open bauhaus-website/index.html
# or on Windows: start bauhaus-website/index.html
```

**Option 2: Local Server (Recommended)**

```bash
# Using Python 3
python -m http.server 8000
# Open http://localhost:8000/bauhaus-website/

# Using Node.js
npx http-server -p 8000
# Open http://localhost:8000/bauhaus-website/

# Using VS Code
# Install "Live Server" extension, right-click index.html → "Open with Live Server"
```

**Option 3: Quick Preview**

```bash
# View the live site
https://jam398.github.io/bauhausStyle/
```

---

## 📁 Project Structure

```
bauhausStyle/
├── bauhaus-website/              # Main website prototype
│   ├── index.html                # Homepage (single-page application)
│   ├── css/                      # Modular stylesheets
│   │   ├── variables.css         # Design tokens (colors, type, spacing)
│   │   ├── base.css              # Reset, typography, base styles
│   │   ├── layout.css            # Grid system, containers, sections
│   │   ├── components.css        # Reusable UI components
│   │   ├── decorations.css       # Geometric shapes & visual elements
│   │   └── sections.css          # Page-specific section styles
│   ├── js/                       # JavaScript modules
│   │   └── main.js               # Mobile menu, smooth scroll, animations
│   └── README.md                 # Website-specific documentation
│
├── bauhaus-neo-modernism-research/   # Design research & documentation
│   ├── DESIGN-SYSTEM.md          # Complete design system specification
│   ├── START-HERE.md             # Project introduction & roadmap
│   ├── PROJECT-README.md         # Detailed project documentation
│   ├── PHASE-2-COMPLETE.md       # Phase 2 completion summary
│   ├── SPRINT-PLAN.md            # Development sprint planning
│   ├── NEXT-STEPS.md             # Future enhancements
│   ├── references/               # Design research & theory
│   │   ├── bauhaus-history-deep-dive.md
│   │   └── neo-modernism-evolution.md
│   ├── technical-specs/          # Implementation guidelines
│   │   ├── color-system-implementation.md
│   │   ├── color-theory.md
│   │   ├── typography-system.md
│   │   ├── grid-architecture.md
│   │   ├── grid-system-implementation.md
│   │   ├── inter-font-implementation.md
│   │   └── component-patterns.md
│   └── visual-references/        # Inspiration & reference images
│       ├── 01-historical-bauhaus/    # Original Bauhaus works
│       ├── 02-contemporary-websites/ # Modern neo-modernist sites
│       ├── 03-typography-examples/   # Type treatment references
│       └── page-example/             # Layout mockups & examples
│
└── README.md                     # This file
```

---

## 🎨 Design System

### Color Palette

```css
/* Bauhaus Primary Colors */
--bauhaus-red:    #E1000F   /* hsl(356, 100%, 44%) */
--bauhaus-blue:   #0064B4   /* hsl(206, 100%, 35%) */
--bauhaus-yellow: #FFED00   /* hsl(51, 100%, 50%)  */
--bauhaus-black:  #000000   /* Neutrals */
--bauhaus-white:  #FFFFFF
```

**Extended Palette:** Each primary color includes a 10-step tint/shade scale (50-900) for UI flexibility.

### Typography

- **Font Family:** Inter Variable (100-900 weights)
- **Type Scale:** Perfect Fifth ratio (1.500)
  - Base: 16px / 1rem
  - Scale: xs (12px) → sm (14px) → base (16px) → lg (18px) → xl (20px) → 2xl (24px) → 3xl (36px) → 4xl (54px) → 5xl (81px) → 6xl (121px)
- **Heading Weights:** Bold to Black (700-900)
- **Line Heights:** 1.2 (tight) for headings, 1.75 (relaxed) for body
- **Letter Spacing:** -0.05em on large headings for geometric precision
- **Body Text:** Pure black (#000000) for maximum contrast

### Spacing System

Golden ratio-based spacing using 8px base unit:

```css
--space-xs:   0.25rem  /* 4px  */
--space-sm:   0.5rem   /* 8px  */
--space-md:   1rem     /* 16px */
--space-lg:   1.5rem   /* 24px */
--space-xl:   2rem     /* 32px */
--space-2xl:  3rem     /* 48px */
--space-3xl:  4rem     /* 64px */
--space-4xl:  6rem     /* 96px */
--space-5xl:  8rem     /* 128px */
```

### Grid System

- **Columns:** 12-column flexible grid
- **Max Width:** 1280px (desktop)
- **Breakpoints:**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Gutters:** 1.5rem (24px) responsive

---

## 📝 Development

### File Organization

The project uses a **component-based CSS architecture**:

1. **variables.css** — All design tokens (colors, typography, spacing)
2. **base.css** — Reset, global styles, typography base
3. **layout.css** — Grid system, containers, page layout
4. **components.css** — Reusable UI components (buttons, cards, forms)
5. **decorations.css** — Geometric shapes and visual accents
6. **sections.css** — Page-specific section styles

### CSS Custom Properties

All design tokens are defined as CSS custom properties for easy theming:

```css
/* Example usage */
.button {
  background-color: var(--color-primary);
  padding: var(--space-md) var(--space-lg);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
}
```

### JavaScript Features

- **Mobile Menu Toggle** — Hamburger menu with ARIA support
- **Smooth Scroll Navigation** — Enhanced UX for anchor links
- **Active Nav State** — Auto-updates on scroll
- **Header Scroll Effects** — Background appears on scroll
- **Form Validation** — Client-side validation with visual feedback

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔧 Customization

### Changing Colors

Edit `bauhaus-website/css/variables.css`:

```css
:root {
  --bauhaus-red: hsl(356, 100%, 44%);     /* Change hue/saturation */
  --bauhaus-blue: hsl(206, 100%, 35%);
  --bauhaus-yellow: hsl(51, 100%, 50%);
}
```

### Adjusting Typography

Modify type scale or font in `variables.css`:

```css
:root {
  --font-primary: 'YourFont', sans-serif;
  --text-base: 1.125rem;  /* Increase base size */
}
```

### Adding New Sections

1. Add HTML structure in `index.html`
2. Style in `sections.css` or create new file
3. Link stylesheet in `<head>`
4. Add navigation link if needed

---

## 📦 Deployment

### GitHub Pages (Current Setup)

1. **Enable GitHub Pages**
   - Go to Repository Settings → Pages
   - Source: Deploy from `main` branch
   - Folder: `/` (root)

2. **Access your site**
   ```
   https://jam398.github.io/bauhausStyle/
   ```

3. **Custom Domain (Optional)**
   - Add `CNAME` file to repository root
   - Configure DNS settings with your provider

### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=bauhaus-website --prod
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Traditional Hosting (FTP)

1. Upload `bauhaus-website/` contents to your web server
2. Ensure `index.html` is in the root directory
3. Configure `.htaccess` for clean URLs (optional)

---

## 🧪 Testing & Validation

### Performance Testing

```bash
# Using Lighthouse
lighthouse https://jam398.github.io/bauhausStyle/ --view

# Expected scores:
# Performance: 95+
# Accessibility: 95+
# Best Practices: 100
# SEO: 95+
```

### HTML/CSS Validation

- **HTML:** [W3C Markup Validator](https://validator.w3.org/)
- **CSS:** [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

### Accessibility Testing

- **WAVE:** [Browser extension](https://wave.webaim.org/extension/)
- **axe DevTools:** [Chrome/Firefox extension](https://www.deque.com/axe/devtools/)
- **Keyboard Navigation:** Test all interactive elements with Tab/Enter
- **Screen Readers:** VoiceOver (macOS), NVDA (Windows), JAWS

### Cross-Browser Testing

Test on major browsers and devices:
- Desktop: Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Mobile (Android)
- Tablet: iPad Safari, Android Chrome

---

## 📚 Documentation

### Design Research

Explore comprehensive design documentation in `bauhaus-neo-modernism-research/`:

- **[START-HERE.md](./bauhaus-neo-modernism-research/START-HERE.md)** — Project introduction
- **[DESIGN-SYSTEM.md](./bauhaus-neo-modernism-research/DESIGN-SYSTEM.md)** — Complete design system spec
- **[references/](./bauhaus-neo-modernism-research/references/)** — Historical context & theory
- **[technical-specs/](./bauhaus-neo-modernism-research/technical-specs/)** — Implementation guides

### Key Concepts

1. **Form Follows Function** — Every design choice serves user needs
2. **Geometric Abstraction** — Circles, squares, triangles as foundational elements
3. **Systematic Color Use** — Limited palette applied with intention
4. **Universal Typography** — Clear hierarchy, excellent readability
5. **Grid-Based Layout** — Mathematical precision in composition

---

## 🛠️ Troubleshooting

### Common Issues

**Issue:** Fonts not loading

```css
/* Solution: Check font CDN link in index.html */
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
```

**Issue:** Styles not applying

```bash
# Solution: Check CSS file order in HTML
# variables.css must load before other stylesheets
```

**Issue:** Mobile menu not working

```javascript
// Solution: Ensure main.js is loaded and menu IDs match
<button id="menuToggle">...</button>
<nav id="mainNav">...</nav>
```

**Issue:** Smooth scroll not working in Safari

```css
/* Solution: Already included in base.css */
html { scroll-behavior: smooth; }
```

---

## 🤝 Contributing

Contributions are welcome! This project follows Bauhaus principles — keep it **simple, functional, and purposeful**.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with clear messages
   ```bash
   git commit -m "feat: add geometric shape animation"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request with:
   - Description of changes
   - Screenshots (for visual changes)
   - Testing notes

### Contribution Guidelines

- ✅ Follow existing code style and conventions
- ✅ Maintain accessibility (WCAG 2.1 AA)
- ✅ Test on multiple browsers
- ✅ Update documentation if needed
- ✅ Keep commits focused and atomic
- ❌ No external dependencies without discussion
- ❌ No breaking changes without version bump

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Design Inspiration

- **Bauhaus Movement** (1919-1933) — Walter Gropius, László Moholy-Nagy, Josef Albers
- **Swiss Design** — Max Bill, Emil Ruder, Josef Müller-Brockmann
- **Neo-Modernism** — Contemporary companies embracing systematic design

### Technical Resources

- **[Inter Font](https://rsms.me/inter/)** by Rasmus Andersson — Open source typeface
- **[MDN Web Docs](https://developer.mozilla.org/)** — Web standards documentation
- **[CSS-Tricks](https://css-tricks.com/)** — CSS techniques and best practices
- **[A11y Project](https://www.a11yproject.com/)** — Accessibility resources

### Modern Neo-Modernist References

- [Linear](https://linear.app/) — Issue tracking with Bauhaus influence
- [Stripe](https://stripe.com/) — Payment platform with systematic design
- [Vercel](https://vercel.com/) — Deployment platform embracing minimalism

---

## 📧 Contact

**José** — [@jam398](https://github.com/jam398)

**Project Link:** [https://github.com/jam398/bauhausStyle](https://github.com/jam398/bauhausStyle)

**Live Site:** [https://jam398.github.io/bauhausStyle/](https://jam398.github.io/bauhausStyle/)

---

<div align="center">

**Built with** ❤️ **using Bauhaus principles**

*Form follows function. Design serves people.*

</div>
