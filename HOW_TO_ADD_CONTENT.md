# How to Add Content to Town Hall

This guide shows you how to add events, blog posts, and other content to your Town Hall website using Sanity Studio.

## 🚀 Quick Start

### Option 1: Access Sanity Studio Online
1. Go to: **https://townhall.sanity.studio**
2. Login with your Sanity account
3. Start adding content immediately

### Option 2: Run Sanity Studio Locally
```bash
cd townhall-backend
npm run sanity:start
```
This will open Sanity Studio at `http://localhost:3333`

---

## 📅 Adding Events

### Step 1: Access Sanity Studio
- Online: https://townhall.sanity.studio
- Local: http://localhost:3333

### Step 2: Create New Event
1. Click **"Event"** in the left sidebar
2. Click **"Create new Event"** button (+ icon)

### Step 3: Fill in Required Fields

#### **Title** *(Required)*
Example: `Introduction to AI: What Everyone Should Know`

#### **Slug** *(Required)*
1. Click "Generate" button next to slug field
2. It will auto-create from title: `introduction-to-ai-what-everyone-should-know`

#### **Short Description** *(Required, max 200 chars)*
Example:
```
A beginner-friendly workshop covering the basics of artificial intelligence, machine learning, and how AI impacts our daily lives.
```

#### **Full Description** *(Optional)*
Add detailed paragraphs about the event. This rich text editor supports:
- **Bold** and *italic* text
- Bullet lists
- Numbered lists
- Links

Example:
```
Join us for an engaging introduction to artificial intelligence! This workshop is perfect for beginners who want to understand AI without getting lost in technical jargon.

We'll cover:
• What AI really is (and isn't)
• Real-world applications you interact with daily
• Common misconceptions about AI
• How machine learning works at a basic level
• Ethical considerations in AI development

No technical background required. All materials will be provided, and we'll have plenty of time for Q&A.
```

#### **What You Will Learn** *(Optional)*
Click "Add item" to add bullet points:
```
- Understand the fundamentals of artificial intelligence
- Identify AI applications in your daily life
- Distinguish between narrow AI and general AI
- Learn basic machine learning concepts
- Explore ethical implications of AI technology
```

#### **Date & Time** *(Required)*
1. Click the date field
2. Select date: `January 14, 2025`
3. Select time: `6:00 PM`

#### **End Time** *(Optional)*
Select when the event ends: `8:00 PM`

#### **Location Name** *(Required)*
Example: `Newark Public Library - Main Branch`

#### **Full Address** *(Optional)*
Example:
```
5 Washington Street
Newark, NJ 07102
```

#### **Maximum Attendees** *(Required)*
Example: `50`

#### **Registration Deadline** *(Optional)*
Example: `January 13, 2025 at 11:59 PM`

#### **Status** *(Required)*
Select one:
- **Draft** - Event is being prepared (not visible on website)
- **Published** - Event is live on website
- **Cancelled** - Event was cancelled
- **Completed** - Event already happened

Choose: `Published`

#### **Tags** *(Optional)*
Click "Add item" to add tags that help users filter events:
```
- BEGINNER
- WORKSHOP
- AI
- COMMUNITY
```

Available tags:
- BEGINNER, INTERMEDIATE, ADVANCED
- WORKSHOP, BUSINESS, PRACTICAL
- COMMUNITY, SHOWCASE, NETWORKING
- CREATIVE, ART, DISCUSSION, ETHICS
- CHATGPT, PARENTS, SAFETY, FAMILY
- CAREERS, SENIORS, HEALTHCARE, INFORMATION

#### **Featured Image** *(Optional)*
1. Click "Upload" or drag and drop an image
2. Recommended size: 1200x630px
3. Adjust the hotspot (the important part of the image that should always be visible)

#### **Instructor Name** *(Optional)*
Example: `Dr. Sarah Chen`

#### **Instructor Bio** *(Optional)*
Example:
```
Dr. Chen is a machine learning researcher and educator with 10 years of experience making AI accessible to non-technical audiences.
```

### Step 4: Save & Publish
1. Click **"Publish"** button in the bottom right
2. Your event will now appear on the website!

---

## 📝 Example: Complete Event

Here's a complete example you can use as a template:

```
Title: AI Tools for Small Business Owners
Slug: ai-tools-for-small-business-owners

Short Description:
Learn practical AI tools that can help automate tasks, improve customer service, and grow your small business.

Full Description:
Running a small business? Discover how AI can help you work smarter, not harder. This practical workshop shows you real AI tools you can start using today—no coding required.

We'll explore:
• AI writing assistants for marketing and emails
• Chatbots for customer service automation
• AI tools for social media management
• Automated bookkeeping and invoicing solutions
• AI-powered analytics to understand your customers

Each tool demonstration includes hands-on practice time. Bring your laptop and leave with actionable strategies you can implement immediately.

What You Will Learn:
- Identify AI tools suitable for your business needs
- Automate repetitive tasks to save 5-10 hours per week
- Improve customer response times with AI chatbots
- Use AI for content creation and marketing
- Make data-driven decisions with AI analytics

Date & Time: January 21, 2025 at 7:00 PM
End Time: January 21, 2025 at 9:00 PM
Location: Newark Innovation Center
Address: 55 Washington Street, Newark, NJ 07102

Maximum Attendees: 30
Registration Deadline: January 20, 2025 at 11:59 PM
Status: Published

Tags:
- BUSINESS
- PRACTICAL
- WORKSHOP

Instructor: Marcus Rodriguez
Instructor Bio:
Marcus is a small business consultant and AI implementation specialist who helps entrepreneurs leverage technology for growth.
```

---

## 📰 Adding Blog Posts

1. Click **"Blog Post"** in sidebar
2. Click **"Create new Blog Post"**

### Required Fields:
- **Title**: Post title
- **Slug**: Auto-generate from title
- **Excerpt**: Short summary (max 300 chars)
- **Content**: Full blog post content (rich text)
- **Published Date**: When to publish
- **Author**: Select from Authors list (create one first if needed)
- **Status**: Draft or Published

### Optional Fields:
- **Featured Image**: Post thumbnail
- **Tags**: Category tags
- **SEO Title**: Custom title for search engines
- **SEO Description**: Custom description for search engines

---

## 🎥 Adding Vlogs

1. Click **"Vlog Post"** in sidebar
2. Click **"Create new Vlog Post"**

### Required Fields:
- **Title**: Video title
- **Slug**: Auto-generate from title
- **Description**: Video description
- **YouTube Video ID**: The ID from your YouTube URL
  - Example: From `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  - Use: `dQw4w9WgXcQ`
- **Published Date**: When to publish
- **Status**: Draft or Published

### Optional Fields:
- **Thumbnail**: Custom thumbnail (otherwise uses YouTube thumbnail)
- **Duration**: Video length (e.g., "15:30")
- **Tags**: Category tags

---

## 👤 Adding Authors

Before adding blog posts, you need at least one author:

1. Click **"Author"** in sidebar
2. Click **"Create new Author"**

### Fields:
- **Name**: Author's full name
- **Slug**: Auto-generate from name
- **Bio**: Short biography
- **Image**: Author photo
- **Email**: Contact email
- **Social Links**: Twitter, LinkedIn, website

---

## ⚙️ Sanity Studio Commands

### Start Local Studio
```bash
cd townhall-backend
npm run sanity:start
```
Opens at http://localhost:3333

### Deploy Studio to Production
```bash
cd townhall-backend
npm run sanity:deploy
```
Deploys to https://townhall.sanity.studio

---

## 🔍 Viewing Your Content

After publishing content in Sanity:

1. **Frontend automatically updates** - No need to restart servers
2. **Check the website**: http://localhost:3000
3. **Events page**: http://localhost:3000/events
4. **Blog page**: http://localhost:3000/blog
5. **Vlogs page**: http://localhost:3000/vlogs

Content should appear within **1-2 seconds** of publishing!

---

## 🐛 Troubleshooting

### Content Not Appearing?

1. **Check Status**: Make sure content is "Published" not "Draft"
2. **Check Backend Logs**: Look for API errors in backend terminal
3. **Verify API Connection**:
   ```bash
   curl http://localhost:3001/api/events
   ```
4. **Check Sanity Token**: Verify `SANITY_TOKEN` in backend `.env`

### "Cannot Read Properties" Error?

Make sure all required fields are filled:
- Events: title, slug, description, dateTime, location, maxAttendees, status
- Blog: title, slug, excerpt, content, publishedAt, author, status

### Images Not Loading?

1. Sanity images need the project ID in the URL
2. Check `SANITY_PROJECT_ID` in `.env` matches your project: `pvm742xo`
3. Make sure images are uploaded to Sanity, not just linked externally

---

## 📊 Content Best Practices

### Events
- **Title**: Clear and descriptive (40-60 characters)
- **Description**: Engaging first sentence, clear learning outcomes
- **Tags**: Use 2-4 relevant tags for filtering
- **Images**: Use high-quality images (1200x630px)
- **Dates**: Set registration deadlines 24-48 hours before event

### Blog Posts
- **Length**: 800-2000 words for optimal engagement
- **Images**: Include at least one featured image
- **Tags**: Use 3-5 tags for categorization
- **SEO**: Always fill SEO title and description

### Vlogs
- **Thumbnails**: Eye-catching thumbnails increase views
- **Description**: Include timestamps for key sections
- **Duration**: Show video length so users know time commitment

---

## 🎯 Next Steps

1. **Add Your First Event**: Follow the example above
2. **Create an Author**: For blog posts
3. **Publish a Blog Post**: Share insights about your events
4. **Test the Integration**: Visit website and verify content appears
5. **Try Registration**: Fill out event registration form to test email flow

Need help? Check the backend logs or contact your developer!
