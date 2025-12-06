# Town Hall Brand Guide

## Bauhaus Neo-Modernism Design System

Town Hall's visual identity is inspired by the Bauhaus movement, emphasizing:
- **Form follows function** - Every element has a purpose
- **Geometric clarity** - Clean shapes, precise alignment
- **Primary colors** - Red, yellow, blue + black and white
- **Asymmetric balance** - Dynamic compositions over symmetry

---

## Color Palette

### Primary Colors (Bauhaus)

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| **Bauhaus Blue** | `#0064B4` | `hsl(206, 100%, 35%)` | Primary actions, links, trust |
| **Bauhaus Red** | `#E1000F` | `hsl(356, 100%, 44%)` | Secondary actions, emphasis |
| **Bauhaus Yellow** | `#FFED00` | `hsl(51, 100%, 50%)` | Accents, highlights, CTAs |
| **Black** | `#000000` | `hsl(0, 0%, 0%)` | Text, borders, backgrounds |
| **White** | `#FFFFFF` | `hsl(0, 0%, 100%)` | Backgrounds, text on dark |

### Color Usage

- **Blue**: Primary buttons, links, focus states, trust indicators
- **Red**: Secondary buttons, alerts, important information
- **Yellow**: Highlights, success states, call-to-action backgrounds
- **Black**: Body text, borders, footer backgrounds
- **White**: Page backgrounds, text on dark surfaces

### Accessibility

All color combinations meet WCAG AA standards:
- Blue on White: 7.3:1 ✅
- Red on White: 5.2:1 ✅
- Black on Yellow: 13.6:1 ✅
- White on Blue: 7.3:1 ✅
- White on Red: 5.2:1 ✅

---

## Typography

### Font Family

**Primary Font: Inter**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Inter was chosen for:
- Excellent screen readability
- Variable font support (100-900 weights)
- Neo-grotesque style aligns with Bauhaus aesthetic
- Open source and self-hostable

### Type Scale

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| H1 | 5rem (80px) | 900 (Black) | Page titles |
| H2 | 3.375rem (54px) | 700 (Bold) | Section headings |
| H3 | 2.25rem (36px) | 600 (Semibold) | Subsections |
| H4 | 1.5rem (24px) | 600 (Semibold) | Card titles |
| Body | 1rem (16px) | 400 (Regular) | Paragraph text |
| Small | 0.875rem (14px) | 400 (Regular) | Captions, labels |

### Typography Rules

1. **Headings**: Always uppercase, tight letter-spacing (-0.025em)
2. **Body text**: Max width 65ch for optimal readability
3. **Labels**: Uppercase, wider letter-spacing (0.05em)
4. **Links**: Blue, no underline, underline on hover

---

## Spacing

Based on 8px grid system:

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight gaps |
| space-2 | 8px | Icon gaps |
| space-4 | 16px | Component padding |
| space-6 | 24px | Card padding |
| space-8 | 32px | Section gaps |
| space-16 | 64px | Section padding |
| space-24 | 96px | Large sections |

---

## Components

### Buttons

**Primary Button**
- Background: Bauhaus Blue
- Text: White, uppercase, tracking-wider
- Padding: 12px 24px
- Border: None
- Hover: Darker blue, slight lift

**Secondary Button**
- Background: Bauhaus Red
- Text: White
- Same styling as primary

**Outline Button**
- Background: Transparent
- Border: 2px solid Bauhaus Blue
- Text: Bauhaus Blue
- Hover: Fill with blue, white text

**Accent Button**
- Background: Bauhaus Yellow
- Text: Black
- High visibility CTAs

### Cards

- Background: White
- Border: 2px solid black (Bauhaus style)
- No border-radius (geometric)
- Hover: Slight shadow, lift effect
- Accent variant: 4px left border in brand color

### Forms

- Inputs: 2px border, no border-radius
- Focus: Blue border, no shadow
- Labels: Uppercase, small, above input
- Errors: Red text below input
- Required indicator: Red asterisk

---

## Bauhaus Decorative Elements

### Geometric Shapes

Use circles, squares, and triangles as decorative elements:

```jsx
// Circle
<div className="w-24 h-24 rounded-full bg-bauhaus-blue" />

// Square
<div className="w-24 h-24 bg-bauhaus-red" />

// Triangle (CSS)
<div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[86px] border-l-transparent border-r-transparent border-b-bauhaus-yellow" />
```

### Color Blocks

Large color blocks create visual interest:

```jsx
<section className="bg-bauhaus-blue text-white py-20">
  {/* Content */}
</section>
```

### Asymmetric Layouts

Use 5:7 or 7:5 grid ratios instead of equal columns:

```jsx
<div className="grid grid-cols-12">
  <div className="col-span-5">{/* Smaller */}</div>
  <div className="col-span-7">{/* Larger */}</div>
</div>
```

---

## Voice & Tone

### Principles

1. **Accessible**: No jargon, explain technical terms
2. **Welcoming**: Warm, inclusive, community-focused
3. **Empowering**: Focus on what people can do
4. **Honest**: Clear about limitations and expectations

### Examples

**Do:**
- "Learn AI basics in plain English"
- "No tech background? No problem."
- "Join 500+ neighbors learning together"

**Don't:**
- "Leverage cutting-edge ML algorithms"
- "Prerequisites: Python, statistics"
- "For serious AI practitioners"

---

## Logo Usage

The Town Hall logo consists of three colored squares (blue, red, yellow) followed by "TOWN HALL" in black uppercase text.

### Clear Space

Maintain minimum clear space equal to the height of one square on all sides.

### Minimum Size

- Digital: 120px wide minimum
- Print: 1 inch wide minimum

### Backgrounds

- Use on white or light gray backgrounds
- On dark backgrounds, use white text version
- Never place on busy images without overlay

---

## Implementation

### Tailwind Classes

```jsx
// Primary button
<button className="px-6 py-3 bg-bauhaus-blue text-white font-semibold uppercase tracking-wider hover:bg-blue-800">
  Button
</button>

// Card
<div className="border-2 border-black p-6 hover:shadow-lg transition-shadow">
  {/* Content */}
</div>

// Section heading
<h2 className="text-4xl font-black uppercase tracking-tight">
  Heading
</h2>
```

### CSS Variables

All design tokens are available as CSS custom properties in `globals.css`:

```css
:root {
  --bauhaus-blue: #0064B4;
  --bauhaus-red: #E1000F;
  --bauhaus-yellow: #FFED00;
  /* ... */
}
```

---

**Last Updated:** December 2024
**Version:** 1.0
