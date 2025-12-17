# Information Architecture

## Town Hall Newark - Site Structure & Content Organization

*Version 1.0 - December 2024*

---

## Site Map

```
Town Hall Newark
│
├── Home (/)
│   ├── Hero Section
│   ├── Stats Bar
│   ├── Upcoming Events Preview
│   ├── About Preview
│   ├── Latest Content (Blog + Vlogs)
│   └── CTA Section
│
├── Events (/events)
│   ├── Events Listing
│   │   ├── Featured Event
│   │   ├── Stats Bar
│   │   ├── Search & Filter
│   │   └── Events Grid
│   │
│   └── Event Detail (/events/[slug])
│       ├── Event Hero
│       ├── Event Details
│       ├── Registration Form
│       └── Related Events
│
├── Blog (/blog)
│   ├── Blog Listing
│   │   ├── Featured Article
│   │   ├── Stats Bar
│   │   ├── Search & Filter
│   │   └── Articles Grid
│   │
│   └── Article Detail (/blog/[slug])
│       ├── Article Header
│       ├── Article Content
│       ├── Author Bio
│       └── Related Articles
│
├── Vlogs (/vlogs)
│   ├── Vlogs Listing
│   │   ├── Featured Video
│   │   ├── Stats Bar
│   │   └── Videos Grid
│   │
│   └── Video Detail (External: YouTube)
│
├── About (/about)
│   ├── Mission Section
│   ├── Values Section
│   ├── Team Section
│   ├── Timeline/History
│   ├── Partners Section
│   └── CTA Section
│
├── Volunteer (/volunteer)
│   ├── Hero Section
│   ├── Volunteer Roles
│   ├── Application Form
│   ├── FAQ Section
│   └── CTA Section
│
├── Contact (/contact)
│   ├── Contact Form
│   ├── Contact Information
│   ├── Social Links
│   └── Newsletter Signup
│
├── Privacy Policy (/privacy)
│   ├── Data Collection
│   ├── Data Storage
│   ├── Cookies & Analytics
│   ├── User Rights
│   └── Contact Information
│
└── Terms of Service (/terms)
    ├── Acceptance of Terms
    ├── Use of Service
    ├── User Conduct
    └── Disclaimers
```

---

## Navigation Map

### Primary Navigation (Header)

| Label | URL | Priority | Notes |
|-------|-----|----------|-------|
| Home | / | 1 | Logo also links here |
| Events | /events | 2 | Primary user action |
| Blog | /blog | 3 | Content discovery |
| Vlogs | /vlogs | 4 | Video content |
| About | /about | 5 | Organization info |
| Get Involved | /volunteer | CTA | Primary CTA button |

### Secondary Navigation (Footer)

| Section | Links |
|---------|-------|
| **Quick Links** | Home, Events, Blog, Vlogs, About |
| **Get Involved** | Volunteer, Contact, Discord |
| **Legal** | Privacy Policy, Terms of Service |
| **Connect** | Discord, Twitter, YouTube, Email |

### Breadcrumb Structure

| Page | Breadcrumb |
|------|------------|
| Event Detail | Home > Events > [Event Title] |
| Blog Article | Home > Blog > [Article Title] |
| Volunteer | Home > Volunteer |
| Contact | Home > Contact |

---

## Content Models (Sanity CMS)

### Event

```typescript
{
  _type: 'event',
  title: string,
  slug: { current: string },
  date: date,
  time: string,
  location: string,
  address: string,
  description: text,
  longDescription: blockContent,
  image: image,
  tags: string[],
  capacity: number,
  registered: number,
  instructor: string,
  instructorBio: text,
  whatYouWillLearn: string[],
  whoShouldAttend: string[],
  whatToBring: string[],
  isFeatured: boolean,
  status: 'upcoming' | 'past' | 'cancelled'
}
```

### Blog Post

```typescript
{
  _type: 'blogPost',
  title: string,
  slug: { current: string },
  date: date,
  author: reference(author),
  excerpt: text,
  content: blockContent,
  image: image,
  tags: string[],
  readTime: string,
  isFeatured: boolean
}
```

### Vlog

```typescript
{
  _type: 'vlog',
  title: string,
  slug: { current: string },
  date: date,
  youtubeId: string,
  description: text,
  duration: string,
  views: number,
  tags: string[],
  isFeatured: boolean
}
```

### Author

```typescript
{
  _type: 'author',
  name: string,
  slug: { current: string },
  role: string,
  bio: text,
  image: image,
  social: {
    twitter: string,
    linkedin: string
  }
}
```

### Volunteer

```typescript
{
  _type: 'volunteer',
  firstName: string,
  lastName: string,
  email: string,
  interest: string,
  motivation: text,
  status: 'pending' | 'approved' | 'active',
  createdAt: datetime
}
```

### Event Registration

```typescript
{
  _type: 'registration',
  event: reference(event),
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  source: string,
  marketingConsent: boolean,
  createdAt: datetime
}
```

---

## Page Templates

### Template 1: Listing Page
Used by: Events, Blog, Vlogs

```
┌─────────────────────────────┐
│ Page Hero                   │
├─────────────────────────────┤
│ Featured Item               │
├─────────────────────────────┤
│ Stats Bar                   │
├─────────────────────────────┤
│ Search & Filter             │
├─────────────────────────────┤
│ Content Grid                │
├─────────────────────────────┤
│ CTA Section                 │
└─────────────────────────────┘
```

### Template 2: Detail Page
Used by: Event Detail, Blog Article

```
┌─────────────────────────────┐
│ Breadcrumb                  │
├─────────────────────────────┤
│ Content Hero                │
├─────────────────────────────┤
│ Main Content                │
├─────────────────────────────┤
│ Action Area (Form/CTA)      │
├─────────────────────────────┤
│ Related Items               │
└─────────────────────────────┘
```

### Template 3: Form Page
Used by: Volunteer, Contact

```
┌─────────────────────────────┐
│ Page Hero                   │
├─────────────────────────────┤
│ Info Cards (optional)       │
├─────────────────────────────┤
│ Form Section                │
├─────────────────────────────┤
│ FAQ (optional)              │
├─────────────────────────────┤
│ CTA Section                 │
└─────────────────────────────┘
```

### Template 4: Content Page
Used by: About, Privacy, Terms

```
┌─────────────────────────────┐
│ Page Hero                   │
├─────────────────────────────┤
│ Content Section 1           │
├─────────────────────────────┤
│ Content Section 2           │
├─────────────────────────────┤
│ Content Section N           │
├─────────────────────────────┤
│ CTA Section                 │
└─────────────────────────────┘
```

---

## URL Structure

| Pattern | Example | Description |
|---------|---------|-------------|
| `/` | / | Homepage |
| `/[page]` | /about | Static pages |
| `/events` | /events | Events listing |
| `/events/[slug]` | /events/intro-to-chatgpt | Event detail |
| `/blog` | /blog | Blog listing |
| `/blog/[slug]` | /blog/ai-for-beginners | Article detail |
| `/vlogs` | /vlogs | Vlogs listing |

---

## User Flows

### Flow 1: Event Registration
```
Home → Events → Event Detail → Register → Confirmation
                    ↓
              Discord CTA
```

### Flow 2: Volunteer Signup
```
Home → About/Volunteer → Application Form → Confirmation
                              ↓
                        Discord CTA
```

### Flow 3: Content Discovery
```
Home → Blog/Vlogs → Article/Video → Related Content
         ↓                              ↓
    Newsletter CTA              Discord CTA
```

### Flow 4: Contact
```
Any Page → Contact → Contact Form → Confirmation
              ↓
        Social Links
```

---

## SEO Structure

### Meta Tags per Page

| Page | Title Pattern | Description |
|------|---------------|-------------|
| Home | Town Hall Newark - Free AI Education | Newark's community hub for AI education... |
| Events | Events \| Town Hall Newark | Upcoming AI workshops and events... |
| Event Detail | [Event Title] \| Town Hall Newark | [Event description excerpt] |
| Blog | Blog \| Town Hall Newark | Articles about AI and technology... |
| Article | [Article Title] \| Town Hall Newark | [Article excerpt] |
| About | About \| Town Hall Newark | Learn about our mission... |

### Structured Data

- **Organization** - On all pages
- **Event** - On event detail pages
- **Article** - On blog article pages
- **BreadcrumbList** - On detail pages
- **FAQPage** - On volunteer page

---

## Accessibility Structure

### Heading Hierarchy

```
<h1> - Page Title (one per page)
  <h2> - Section Titles
    <h3> - Subsection Titles
      <h4> - Card Titles (if needed)
```

### Landmark Regions

```html
<header> - Site header with navigation
<nav> - Primary navigation
<main> - Main content area
<aside> - Sidebar content (if applicable)
<footer> - Site footer
```

### Skip Links

```html
<a href="#main-content">Skip to main content</a>
<a href="#navigation">Skip to navigation</a>
```

---

*Document maintained as part of UX documentation. Update when site structure changes.*
