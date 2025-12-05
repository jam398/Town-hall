# 1. The Ecosystem: One "Stack", Three Organizations

## Overview

You can frame this to students as:

> "You're building three organizations that could actually run tomorrow. Your job is to design the workflows, choose the tools, and implement just enough of the stack that a real person could use it."

---

## Common Expectations Across All Three

### Professional Discovery & UX Process

- Stakeholder interviews (even if simulated)
- Personas
- Customer journey maps
- Information architecture / sitemap
- Low-/mid-fidelity wireframes
- Brand guide (logo, colors, typography, tone of voice)

### Tool Evaluation

Compare at least 2 options for each category:

- **CMS:** Sanity / WordPress / Strapi / Notion-as-CMS, etc.
- **Automation:** Zapier / Make / n8n
- **CRM / Contact Management:** HubSpot / Mailchimp / Airtable
- **Community:** Discord vs Slack vs "nothing"

### AI Usage

- "Vibe coding" with AI to generate boilerplate, content, and UX ideas
- Use AI for process, not just code: interview scripts, persona drafts, journey maps, brand voice, etc.

---

# 2. Town Hall – Newark AI Community Nonprofit

## Concept

A community-facing nonprofit that hosts AI town halls, free training sessions, and has a content hub (blog/vlog) plus Discord for ongoing conversation.

## Primary Users

- Newark residents (low to moderate tech literacy)
- Local educators, community organizers
- Students & volunteers from NJIT who want to help

## Key Features & Workflows

### a. Events

#### Events Listing

- Title, description (plain-language), location (physical or Zoom), date/time.
- "What you'll learn in this session" in accessible language.

#### Registration

- Simple form: name, email, neighborhood, interest level.
- Choose event(s) to attend.

#### Automation

**On registration:**
- Add to HubSpot or mailing list as "Community Member".
- Send confirmation email (and/or SMS if integrated).
- Optionally auto-generate a Discord invite link.

**Post-event:**

Email follow-up with:
- Recording or summary.
- Slide deck link.
- Next events.

### b. Content (Blog/Vlog)

**Blog:**
- Plain-language posts like "What is AI?", "How can AI help my small business?", "AI and privacy: What should I know?"

**Vlog:**
- Short recap videos of Town Halls.

**Workflow:**
- Editors create content in CMS → mark as draft, ready, published.
- Auto-post to Discord #announcements when new piece is published.

### c. Discord Community

**Channels like:**
- #announcements
- #events
- #ai-questions
- #volunteers

**Automations:**
- When someone registers as a volunteer → give them volunteer role in Discord.
- Use Zapier to bridge forms ↔ Discord.

## AI Usage for Town Hall

**Summarize event transcripts into:**
- Blog posts
- "Key takeaways" bullet lists
- Social media copy

**Generate:**
- Draft workshop outlines
- Visuals (flyers, banners) with AI assistance (but human review)

## Good Assignment Asks

**Town Hall teams must:**

1. **Design a customer journey like:**
   - "Newark resident sees a flyer → visits site → registers for event → attends → stays in touch with community."

2. **Implement:**
   - Event creation + listing + registration + confirmation flow.
   - Blog/vlog content model in CMS (even if content is minimal).

3. **Deliver:**
   - Personas including "low-tech literacy" and "concerned parent / small business owner."
   - Brand guide that emphasizes trust, accessibility, and inclusion.
