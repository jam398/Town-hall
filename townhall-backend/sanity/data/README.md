# Sanity Content Import

This folder contains content data ready to be imported into Sanity CMS.

## Content Summary

### Blog Posts (7)
1. **Prompt Engineering 101** - Master AI communication techniques
2. **AI for Newark Small Businesses** - Local success stories
3. **AI Ethics for Everyone** - Critical thinking about AI
4. **AI-Powered Job Hunting** - Resume and interview strategies
5. **AI as a Creative Partner** - For artists and writers
6. **AI for Seniors** - Gentle introduction to helpful tech
7. **Protecting Your Privacy** - Data protection in an AI world

### Vlog Posts (7)
1. **ChatGPT for Complete Beginners** - Full tutorial (18:45)
2. **Build a Better Resume with AI** - Practical demo (22:30)
3. **5 AI Tools for Small Business** - Tool showcase (15:20)
4. **Spot AI Scams and Deepfakes** - Safety guide (12:15)
5. **Smart Speaker Setup Guide** - For beginners (25:00)
6. **AI Writing Improvement** - Ethical use (16:40)
7. **Community Spotlight December** - Monthly highlights (8:30)

### Events (7)
1. **Prompt Engineering Masterclass** - Jan 25, 2025
2. **AI for Small Business Owners** - Jan 28, 2025
3. **Seniors: Voice Assistants** - Feb 1, 2025
4. **AI Job Search Workshop** - Feb 5, 2025
5. **AI Ethics Discussion** - Feb 8, 2025
6. **Creative AI Workshop** - Feb 12, 2025
7. **Privacy & Security Workshop** - Feb 15, 2025

## Import Methods

### Method 1: Sanity CLI (Recommended)

```bash
# Navigate to the sanity directory
cd townhall-backend/sanity

# Import the content
npx sanity dataset import data/content-import.ndjson production --replace
```

### Method 2: Manual Import via Sanity Studio

1. Open Sanity Studio at https://townhall.sanity.studio
2. For each content type, create a new document
3. Copy the content from the NDJSON file

### Method 3: API Import Script

```javascript
// Run this script with Node.js
const { createClient } = require('@sanity/client');
const fs = require('fs');

const client = createClient({
  projectId: 'pvm742xo',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const content = fs.readFileSync('./content-import.ndjson', 'utf8')
  .split('\n')
  .filter(line => line.trim())
  .map(line => JSON.parse(line));

async function importContent() {
  for (const doc of content) {
    try {
      await client.createOrReplace(doc);
      console.log(`Imported: ${doc._type} - ${doc.title}`);
    } catch (error) {
      console.error(`Failed: ${doc._id}`, error.message);
    }
  }
}

importContent();
```

## Notes

- All blog posts reference an author. You may need to create an author document first or update the references.
- YouTube IDs in vlogs are placeholder IDs from public videos. Replace with actual Town Hall YouTube videos.
- Event dates are set for January-February 2025. Update as needed.
- All content is set to `status: "published"` for immediate visibility.

## After Import

1. Verify content appears in Sanity Studio
2. Check the frontend at `/blog`, `/vlogs`, and `/events`
3. Update any placeholder YouTube IDs with real videos
4. Add featured images via Sanity Studio
5. Create/link author references for blog posts
