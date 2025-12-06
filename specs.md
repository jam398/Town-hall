# Project Specifications: AI-Era Organizations Ecosystem

This document outlines three interconnected organizations forming a mini ecosystem for AI-era needs: a design museum, a career accelerator, and a civic nonprofit.

## Table of Contents
1. [Ecosystem Overview](#1-the-ecosystem-one-stack-three-orgs)
2. [MyWebClass.org](#2-mywebclassorg--design-styles-as-living-websites)
3. [Job Club](#3-job-club--ai-careers--consulting-onboarding-machine)
4. [Town Hall](#4-town-hall--newark-ai-community-nonprofit)

## Overview

This document is structured to provide clear specifications for three related projects that share common infrastructure and design principles. Each section details the purpose, workflows, and implementation requirements for its respective organization.

---

# 1. The Ecosystem: One Stack, Three Orgs

## Project Philosophy

> "You're building three organizations that could actually run tomorrow.  
> Your job is to design the workflows, choose the tools, and implement just enough of the stack that a real person could use it."

## Common Expectations Across All Projects

### Professional Discovery & UX Process

- Stakeholder interviews (even if simulated)
- Personas
- Customer journey maps
- Information architecture / sitemap
- Low-/mid-fidelity wireframes
- Brand guide (logo, colors, typography, tone of voice)

### Tool Evaluation

Compare at least 2 options for each category:

- **CMS**: Sanity / WordPress / Strapi / Notion-as-CMS
- **Automation**: Zapier / Make / n8n
- **CRM/Contact Management**: HubSpot / Mailchimp / Airtable
- **Community**: Discord / Slack / None

### AI Integration

- Use AI for generating boilerplate, content, and UX ideas
- Apply AI to process documentation: interview scripts, persona drafts, journey maps, brand voice, etc.
- Implement AI-assisted code generation and review

### Team Structure

- **Team Size**: 2 members
  - One member focuses on UX/strategy
  - One member focuses on implementation
  - Both members must contribute to all aspects
- **Infrastructure**: Shared global infrastructure allowed (e.g., Discord), but must maintain separate brands/sites

---

# 2. MyWebClass.org – Design Styles as Living Websites

## Concept
A living gallery of web pages, each one demonstrating a specific design style (Swiss, Bauhaus, Flat, Brutalist, Neumorphism, etc.), wrapped in an educational platform about design and web technology.

### Primary Users
- Design & CS/IS students  
- Educators seeking examples  
- Web developers and designers  
- Future students

## Required Features & Workflows

### A. Design Gallery Submission System

#### Submission Form

**Required Fields:**
- **Contact Information**
  - Full Name
  - Email Address
  - Role (select one):
    - Student
    - External Contributor
    - Instructor
- **Submission Details**
  - Design Style (dropdown selection)
  - Live Demo URL or Git Repository
  - Description (min. 100 characters):
    - Explain how this submission exemplifies the chosen design style
- **Supporting Assets**
  - Screenshots (JPG/PNG, max 5MB)
  - Optional: Figma/Adobe XD link

#### Moderation Workflow

**Submission States:**
1. `Submitted` - Initial state when received
2. `Under Review` - Currently being evaluated
3. `Approved` - Accepted into gallery
4. `Rejected` - Not accepted (with feedback)

**Review Process:**
- All submissions are reviewed within 3-5 business days
- Submitters receive email notifications for status changes
- Rejected submissions include constructive feedback

#### Gallery Display

- Filter chips or tags by style  
- Each gallery item: thumbnail, style, short blurb, link to “Learn more”  
- Detail page: explanation of the style, what the implementation demonstrates, links to code  

### B. Technical Implementation

#### Content Management System (CMS)
**Recommended:** Sanity.io
- Strongly-typed schema
- Custom content modeling
- Required schemas:
  - `Style` - Design style definitions
  - `GalleryEntry` - Submissions
  - `Author` - Contributor profiles
  - `Article` - Educational content

#### Frontend Framework
- **Primary:** Next.js or Astro
- **Key Requirements:**
  - Server-side rendering
  - Responsive design
  - Accessibility compliance (WCAG 2.1 AA)

#### Automation Workflows
1. **Form Submission**
   - Create CMS document in `submitted` state
   - Send confirmation email to submitter
   - Post notification to `#mywebclass-submissions`
   - Optional: Add to HubSpot CRM

### C. Educational Content Requirements

#### Style Profile Page
Each design style must include:

1. **Historical Context**
   - Origin and evolution
   - Key figures and influences
   - Historical examples

2. **Design Principles**
   - Key characteristics
   - Color palettes
   - Typography guidelines
   - Layout patterns

3. **Web Implementation**
   - Modern web examples
   - Code snippets
   - Do's and Don'ts
   - Accessibility considerations

#### Live Demo
- Fully functional implementation
- Responsive across devices
- Documented code with comments
- Performance optimized

### D. AI Integration

#### Implementation Ideas
1. **Content Generation**
   - First-draft style explanations
   - CSS/HTML snippets based on design parameters
   - Accessibility recommendations

2. **Submission Analysis**
   - Style consistency checking
   - Code quality assessment
   - Design principle validation

3. **Interactive Learning**
   - AI tutor for design principles
   - Code review assistant
   - Design pattern suggestions

## Project Deliverables

### Required Components

#### Design System
- 3–4 distinct design styles with complete documentation
- 3+ gallery entries demonstrating these styles
- 2–3 in-depth learning articles

#### Technical Implementation
- Functional submission form
- CMS integration with moderation workflow
- Automated gallery updates
- Responsive design implementation

#### Documentation
1. **User Research**
   - 3 Personas:
     - Design Student
     - High School Teacher
     - Self-taught Developer
   - Customer Journey Map (example: "HS teacher creates lesson plan")

2. **Brand Guidelines**
   - Logo and usage
   - Color palette
   - Typography system
   - UI component library
   - Voice and tone guide

3. **Technical Documentation**
   - System architecture
   - API documentation
   - Deployment guide

# 3. Job Club – AI Careers & Consulting Onboarding Machine

### Concept
A club that onboards students into being AI consultants / startup builders; provides community, structure, and a “career stack.”

### Primary Users
### Primary users
- NJIT students seeking AI careers  
- Secondary: mentors, alumni, employer partners  

---

## Core requirement: Onboarding workflow

Turn your constraints into a pipeline:

**Landing page → “Join Job Club” CTA → Onboarding form**

Form fields:
- Name, major, grad year  
- Existing links: LinkedIn, GitHub, personal site  
- Career goal  
- Skill self-assessment  

**Automated checklist**
- If LinkedIn missing → send LinkedIn setup guide  
- If GitHub missing → send GitHub starter guide  
- If site missing → suggest templates  
- Send personalized onboarding checklist (email/Discord DM)  

**Calendly + Zapier**
- Calendly event booked → update HubSpot contact  
- Auto-post intro in `#jobclub-intros` with summary info  

**Discord integration**
- Form submission + email confirmation → auto-invite  
- Roles: member, mentor, admin  
- Optional: auto-role by career path  

---

## Events & ongoing support

**Recurring**
- Weekly standup  
- Monthly workshops (LinkedIn, outreach, consulting)  

**Events system**
- Events stored in CMS  
- Events page lists upcoming sessions  
- Provide “Add to calendar” links  

---

## AI usage
- AI reviewing LinkedIn profiles  
- AI generating GitHub README templates  
- AI drafting outreach messages  
- Discord bot with commands (`!career-plan`, etc.)  

---

## Good assignment asks

**Teams must:**

Produce:
- Customer journey: “hears about club → onboarded → first AI opportunity”

Implement:
- Onboarding form → automations → Discord invite + HubSpot update + email  
- Events page (3+ events)

Deliver:
- Personas (“zero experience sophomore”, “business → AI pivot”, “experienced grad student”)  
- Brand guide (optimistic, practical, builder-energy)  

---

# 4. Town Hall – Newark AI Community Nonprofit

### Concept
A nonprofit that hosts AI town halls, training sessions, and maintains a content hub + community Discord.

### Primary users
- Newark residents  
- Local educators, organizers  
- NJIT students + volunteers  

---

## Key features & workflows

### a. Events

**Listings**
- Title  
- Plain-language description  
- Location  
- Date/time  
- “What you’ll learn” section  

**Registration**
- Name, email, neighborhood, interest level  
- Select event(s)

**Automations**
- Add contact to HubSpot/mailing list  
- Send confirmation email (and optional SMS)  
- Optional Discord invite  

**Post-event**
- Email with recording, summary, slides, next events  

---

### b. Content (Blog/Vlog)

**Blog topics**
- “What is AI?”  
- “How AI helps small business”  
- “AI + privacy basics”  

**Vlog**
- Recap videos  

**Workflow**
- Draft → ready → publish  
- Auto-post to Discord `#announcements`  

---

### c. Discord community

Channels:
- #announcements  
- #events  
- #ai-questions  
- #volunteers  

Automations:
- Volunteer sign-up → auto-assign volunteer role  

---

## AI usage for Town Hall
- Summarize event transcripts into blogs + “key takeaways”  
- Generate workshop outlines  
- Generate visuals (flyers, banners) → human-reviewed  

---

## Good assignment asks

**Teams must:**

Design:
- Customer journey: “resident sees flyer → visits site → registers → attends → stays connected”

Implement:
- Event creation + listing + registration + confirmation  
- Blog/vlog CMS model  

Deliver:
- Personas: “low-tech literacy resident”, “concerned parent”, “small business owner”  
- Brand guide emphasizing trust + accessibility  

