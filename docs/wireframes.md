# Wireframes Documentation

## Town Hall Newark - UI/UX Wireframes

*Design Phase: December 2024*

---

## Overview

This document provides low-to-mid fidelity wireframe descriptions for the Town Hall Newark website. The wireframes follow the Swiss Modern design system established in the Brand Guide.

---

## 1. Homepage Wireframe

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [Logo] Town Hall          Home Events Blog Vlogs About [CTA]││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  HERO SECTION                                                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (red accent bar)                                          ││
│  │                                                              ││
│  │ Newark's Free                                                ││
│  │ AI Education Hub                                             ││
│  │                                                              ││
│  │ Learn artificial intelligence with your neighbors.          ││
│  │ No experience needed. No cost. Just curiosity.              ││
│  │                                                              ││
│  │ [Browse Events]  [Join Discord]                              ││
│  │                                                              ││
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             ││
│  │ │  500+   │ │   50+   │ │  100%   │ │  Weekly │             ││
│  │ │Attendees│ │Workshops│ │  Free   │ │ Events  │             ││
│  │ └─────────┘ └─────────┘ └─────────┘ └─────────┘             ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  UPCOMING EVENTS SECTION                                         │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (black accent bar)                                        ││
│  │ Upcoming Events                          [View All Events →]││
│  │                                                              ││
│  │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐       ││
│  │ │▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│ │▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│ │▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│       ││
│  │ │ [Tag]         │ │ [Tag]         │ │ [Tag]         │       ││
│  │ │ Event Title   │ │ Event Title   │ │ Event Title   │       ││
│  │ │ Description...│ │ Description...│ │ Description...│       ││
│  │ │ 📅 Date       │ │ 📅 Date       │ │ 📅 Date       │       ││
│  │ │ 📍 Location   │ │ 📍 Location   │ │ 📍 Location   │       ││
│  │ │ Learn More →  │ │ Learn More →  │ │ Learn More →  │       ││
│  │ └───────────────┘ └───────────────┘ └───────────────┘       ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  ABOUT SECTION (Dark Background)                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (red accent bar)                                          ││
│  │                                                              ││
│  │ What is Town Hall?          │  AI education shouldn't be    ││
│  │                             │  exclusive. We bring free     ││
│  │                             │  workshops to Newark...       ││
│  │                             │                               ││
│  │                             │  [Learn About Us →]           ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  LATEST CONTENT SECTION                                          │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (red accent bar)                                          ││
│  │ Latest from Town Hall                                       ││
│  │                                                              ││
│  │ ┌─────────────────────────┐  ┌─────────────────────────┐    ││
│  │ │ [Blog Image]            │  │ [Vlog Thumbnail]        │    ││
│  │ │ Blog Post Title         │  │ ▶ Vlog Title            │    ││
│  │ │ Excerpt text...         │  │ Duration • Views        │    ││
│  │ │ Read Article →          │  │ Watch Now →             │    ││
│  │ └─────────────────────────┘  └─────────────────────────┘    ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  CTA SECTION (Dark Background)                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (red accent bar)                                          ││
│  │                                                              ││
│  │ Ready to Start Learning?                                    ││
│  │ Join our next workshop or connect with the community.       ││
│  │                                                              ││
│  │ [Browse Events]  [Join Discord]                              ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                          │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Town Hall Newark              Quick Links    Connect        ││
│  │ Newark's AI Education Hub     Home           Discord        ││
│  │                               Events         Twitter        ││
│  │ © 2024 Town Hall Newark       Blog           YouTube        ││
│  │ Privacy Policy | Terms        About          Email          ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Component Specifications

| Component | Behavior | Notes |
|-----------|----------|-------|
| Header | Sticky on scroll | Logo links to home |
| Hero Stats | Animate on scroll | Numbers count up |
| Event Cards | Hover state | Border darkens, slight lift |
| CTA Buttons | Primary/Secondary | Red primary, outline secondary |

---

## 2. Event Registration Workflow (Primary Workflow)

### Step 1: Events Listing Page

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
├─────────────────────────────────────────────────────────────────┤
│  PAGE HERO                                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (red accent bar)                                          ││
│  │ Events                       │  Free workshops, meetups,    ││
│  │                              │  and community events...     ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  FEATURED EVENT                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ┌─────────────────┐  ┌─────────────────────────────────────┐││
│  │ │                 │  │ ▬ Featured                          │││
│  │ │  [Event Image]  │  │ Introduction to ChatGPT             │││
│  │ │                 │  │ Learn the basics of AI...           │││
│  │ │                 │  │ 📅 Dec 20 • 📍 Newark Library       │││
│  │ │                 │  │ [Register Now →]                    │││
│  │ └─────────────────┘  └─────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  STATS BAR                                                       │
│  ┌─────────┬─────────┬─────────┬─────────┐                      │
│  │ 12      │ 150     │ 100%    │ Weekly  │                      │
│  │ Events  │ Spots   │ Free    │ New     │                      │
│  └─────────┴─────────┴─────────┴─────────┘                      │
├─────────────────────────────────────────────────────────────────┤
│  SEARCH & FILTER                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [🔍 Search events...]  [All] [Beginner] [Workshop] [Meetup] ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  EVENTS GRID                                                     │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐          │
│  │▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│ │▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│ │▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│          │
│  │ Event Card 1  │ │ Event Card 2  │ │ Event Card 3  │          │
│  └───────────────┘ └───────────────┘ └───────────────┘          │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐          │
│  │ Event Card 4  │ │ Event Card 5  │ │ Event Card 6  │          │
│  └───────────────┘ └───────────────┘ └───────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Event Detail Page

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
├─────────────────────────────────────────────────────────────────┤
│  BREADCRUMB                                                      │
│  Events > Introduction to ChatGPT                                │
├─────────────────────────────────────────────────────────────────┤
│  EVENT HERO                                                      │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ┌─────────────────┐  ┌─────────────────────────────────────┐││
│  │ │                 │  │ [Beginner] [Workshop]               │││
│  │ │  [Event Image]  │  │ ▬ (red accent bar)                  │││
│  │ │                 │  │ Introduction to ChatGPT             │││
│  │ │                 │  │                                     │││
│  │ │                 │  │ 📅 Friday, December 20, 2024        │││
│  │ │                 │  │ 🕐 6:00 PM - 8:00 PM                │││
│  │ │                 │  │ 📍 Newark Public Library            │││
│  │ │                 │  │ 👥 12/30 spots remaining            │││
│  │ │                 │  │                                     │││
│  │ │                 │  │ [Register for This Event]           │││
│  │ └─────────────────┘  └─────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  EVENT DETAILS                                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ About This Event                                            ││
│  │ ─────────────────                                           ││
│  │ Long description of the event, what attendees will learn,  ││
│  │ prerequisites, what to bring, etc.                          ││
│  │                                                              ││
│  │ What You'll Learn                                           ││
│  │ ─────────────────                                           ││
│  │ • Understanding AI basics                                   ││
│  │ • Writing effective prompts                                 ││
│  │ • Practical applications                                    ││
│  │                                                              ││
│  │ Instructor                                                  ││
│  │ ─────────────────                                           ││
│  │ [Photo] Dr. Sarah Chen - Education Lead                     ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  REGISTRATION FORM (Modal or Inline)                             │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Register for This Event                                     ││
│  │                                                              ││
│  │ First Name*        [________________]                       ││
│  │ Last Name*         [________________]                       ││
│  │ Email*             [________________]                       ││
│  │ Phone (optional)   [________________]                       ││
│  │                                                              ││
│  │ How did you hear about us?                                  ││
│  │ [▼ Select one________________]                              ││
│  │                                                              ││
│  │ [✓] I agree to receive event updates                        ││
│  │                                                              ││
│  │ [Complete Registration]                                     ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                          │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3: Registration Confirmation

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
├─────────────────────────────────────────────────────────────────┤
│  CONFIRMATION                                                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                      ✓                                      ││
│  │                                                              ││
│  │            You're Registered!                               ││
│  │                                                              ││
│  │  Thank you for registering for Introduction to ChatGPT.    ││
│  │  We've sent a confirmation email to your inbox.             ││
│  │                                                              ││
│  │  ┌─────────────────────────────────────────────────────┐   ││
│  │  │ Event Details                                        │   ││
│  │  │ 📅 Friday, December 20, 2024 at 6:00 PM             │   ││
│  │  │ 📍 Newark Public Library, 5 Washington St           │   ││
│  │  └─────────────────────────────────────────────────────┘   ││
│  │                                                              ││
│  │  [Add to Calendar]  [Join Discord]  [Browse More Events]   ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Volunteer Signup Page (Secondary Page)

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                          │
├─────────────────────────────────────────────────────────────────┤
│  PAGE HERO                                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (red accent bar)                                          ││
│  │                                                              ││
│  │ Become a Volunteer          │  Help us bring AI education  ││
│  │                             │  to Newark. No experience    ││
│  │                             │  required—just enthusiasm.   ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  VOLUNTEER ROLES                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (black accent bar)                                        ││
│  │ Ways to Help                                                ││
│  │                                                              ││
│  │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐       ││
│  │ │ 🎓            │ │ 📸            │ │ 🤝            │       ││
│  │ │ Workshop      │ │ Content       │ │ Community     │       ││
│  │ │ Assistant     │ │ Creator       │ │ Ambassador    │       ││
│  │ │               │ │               │ │               │       ││
│  │ │ Help run      │ │ Photo, video, │ │ Spread the    │       ││
│  │ │ workshops     │ │ social media  │ │ word locally  │       ││
│  │ └───────────────┘ └───────────────┘ └───────────────┘       ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  VOLUNTEER FORM                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (red accent bar)                                          ││
│  │ Apply to Volunteer                                          ││
│  │                                                              ││
│  │ First Name*        [________________]                       ││
│  │ Last Name*         [________________]                       ││
│  │ Email*             [________________]                       ││
│  │                                                              ││
│  │ What interests you most?                                    ││
│  │ [▼ Select a role________________]                           ││
│  │                                                              ││
│  │ Why do you want to volunteer? (optional)                    ││
│  │ [________________________________]                          ││
│  │ [________________________________]                          ││
│  │ [________________________________]                          ││
│  │                                                              ││
│  │ [Submit Application]                                        ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  FAQ SECTION                                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (black accent bar)                                        ││
│  │ Frequently Asked Questions                                  ││
│  │                                                              ││
│  │ ┌─────────────────────────────────────────────────────────┐ ││
│  │ │ ▶ Do I need AI experience?                              │ ││
│  │ └─────────────────────────────────────────────────────────┘ ││
│  │ ┌─────────────────────────────────────────────────────────┐ ││
│  │ │ ▶ How much time is required?                            │ ││
│  │ └─────────────────────────────────────────────────────────┘ ││
│  │ ┌─────────────────────────────────────────────────────────┐ ││
│  │ │ ▶ What training is provided?                            │ ││
│  │ └─────────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  CTA SECTION (Dark Background)                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ▬ (red accent bar)                                          ││
│  │ Not Ready to Volunteer?                                     ││
│  │ Join our Discord to connect with the community first.       ││
│  │ [Join Discord]                                              ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Design Specifications

### Grid System
- **Max Width:** 1280px (max-w-swiss)
- **Columns:** 12-column grid
- **Gutter:** 24px (gap-6)
- **Padding:** 24px mobile, 32px desktop

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| py-16 | 64px | Small sections |
| py-24 | 96px | Standard sections |
| py-32 | 128px | Large sections |
| mb-6 | 24px | After accent bars |
| gap-6 | 24px | Card grids |

### Typography
| Element | Class | Size |
|---------|-------|------|
| Display | text-display | 72px |
| H1 | text-h1 | 48px |
| H2 | text-h2 | 36px |
| H3 | text-h3 | 24px |
| Body | text-body | 16px |
| Caption | text-caption | 12px |

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| swiss-black | #1a1a1a | Primary text, dark sections |
| swiss-white | #ffffff | Backgrounds |
| swiss-red | #e53935 | Accent bars, CTAs |
| swiss-gray | #6b7280 | Secondary text |
| swiss-light | #f5f5f5 | Light backgrounds |
| swiss-border | #e5e5e5 | Borders |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 768px | Single column, stacked cards |
| Tablet | 768px - 1024px | 2-column grids |
| Desktop | > 1024px | Full 12-column grid |

---

## Interaction States

### Buttons
- **Default:** Solid background
- **Hover:** Darker shade, slight scale
- **Active:** Pressed state
- **Disabled:** 50% opacity

### Cards
- **Default:** 1px border
- **Hover:** Border darkens, -2px translateY
- **Focus:** Outline for accessibility

### Form Inputs
- **Default:** 1px border
- **Focus:** 2px black border
- **Error:** Red border, error message
- **Success:** Green checkmark

---

*Wireframes created with ASCII art for documentation purposes. High-fidelity mockups available in design tools upon request.*
