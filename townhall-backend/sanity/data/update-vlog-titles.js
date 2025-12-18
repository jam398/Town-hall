#!/usr/bin/env node
/**
 * Update Vlog Titles to Match Actual YouTube Videos
 * Also replaces the test video with the correct link
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'pvm742xo';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN;
const SANITY_API_VERSION = '2024-01-01';

if (!SANITY_TOKEN) {
  console.error('❌ SANITY_TOKEN environment variable is required');
  process.exit(1);
}

const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;

// Updates with titles matching actual YouTube videos
const vlogUpdates = [
  // Replace the Shia LaBeouf test video with the correct AI video
  {
    _id: '866608f0-3390-48aa-9554-e38e840dc228',
    youtubeId: 'K7wufpKdCGc',
    title: 'What Is Artificial Intelligence? | Introduction to AI',
    description: 'An introduction to artificial intelligence explaining what AI is, how it works, and its applications in everyday life. Perfect starting point for beginners.',
    slug: { _type: 'slug', current: 'what-is-ai-introduction' }
  },
  // Update titles to match actual YouTube video titles
  {
    _id: 'vlog-chatgpt-beginners',
    title: 'ChatGPT Tutorial for Beginners',
    description: 'Complete beginner tutorial for ChatGPT. Learn how to use ChatGPT effectively with practical examples and tips.'
  },
  {
    _id: 'vlog-ai-resume',
    title: 'How to Use AI to Write Your Resume',
    description: 'Learn how to leverage AI tools to create a professional resume that stands out to employers and ATS systems.'
  },
  {
    _id: 'vlog-small-business-ai',
    title: 'AI Tools for Small Business',
    description: 'Discover the best AI tools for small business owners to automate tasks, improve productivity, and grow your business.'
  },
  {
    _id: 'vlog-ai-scams',
    title: 'How to Spot Deepfakes and AI Scams',
    description: 'Learn to identify AI-generated deepfakes and protect yourself from sophisticated AI-powered scams.'
  },
  {
    _id: 'vlog-voice-assistants',
    title: 'Smart Speaker Setup Guide for Beginners',
    description: 'Step-by-step guide to setting up your first smart speaker, whether it\'s Alexa, Google Home, or Apple HomePod.'
  },
  {
    _id: 'vlog-ai-writing',
    title: 'Using AI to Improve Your Writing',
    description: 'How to use AI as a writing assistant to improve your skills without relying on it to write for you.'
  },
  {
    _id: 'vlog-community-spotlight-dec',
    title: 'Town Hall Newark - December 2024 Highlights',
    description: 'Highlights from Town Hall Newark\'s December 2024 workshops and community events.'
  },
  {
    _id: 'sEwqPSZdqGfKU8SKfxQgcF',
    title: 'Introduction to Artificial Intelligence - Full Workshop',
    description: 'Complete recording of our Introduction to AI workshop covering fundamentals, applications, and hands-on exercises.'
  },
  {
    _id: 'sEwqPSZdqGfKU8SKfxQghx',
    title: 'ChatGPT Tips and Tricks',
    description: 'Advanced tips and tricks for getting better results from ChatGPT and other AI chatbots.'
  },
  {
    _id: 'ZUZBVVyNirYXjyHrV1H62O',
    title: 'Small Business AI Success Story',
    description: 'How a Newark small business owner transformed her bakery using AI tools - an inspiring community spotlight.'
  },
  {
    _id: 'jDUl1qG6X1kWnc37oUYEbV',
    title: 'AI for Job Seekers - Resume and Interview Tips',
    description: 'Practical guide for job seekers on using AI for resume writing, interview prep, and job search optimization.'
  },
  {
    _id: 'ZUZBVVyNirYXjyHrV1H66P',
    title: 'Online Privacy Workshop Recording',
    description: 'Full workshop recording on protecting your privacy online, covering data security, browsing habits, and AI privacy concerns.'
  },
  {
    _id: 'sEwqPSZdqGfKU8SKfxQgpZ',
    title: 'Town Hall Newark - 2024 Year in Review',
    description: 'Celebrating a year of community learning and growth at Town Hall Newark. Highlights, achievements, and plans for 2025.'
  }
];

async function updateVlog(update) {
  const setFields = {
    title: update.title,
    description: update.description,
  };
  
  // Add youtubeId if provided
  if (update.youtubeId) {
    setFields.youtubeId = update.youtubeId;
  }
  
  // Add slug if provided
  if (update.slug) {
    setFields.slug = update.slug;
  }

  const response = await fetch(SANITY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          patch: {
            id: update._id,
            set: setFields,
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  return true;
}

async function main() {
  console.log('🎬 Updating Vlog Titles to Match YouTube Videos...');
  console.log('');

  let success = 0;
  let failed = 0;

  for (const update of vlogUpdates) {
    try {
      await updateVlog(update);
      success++;
      console.log(`✅ ${update.title}`);
      if (update.youtubeId) {
        console.log(`   New YouTube ID: ${update.youtubeId}`);
      }
    } catch (error) {
      failed++;
      console.error(`❌ ${update.title}: ${error.message}`);
    }
  }

  console.log('');
  console.log('📊 Update Summary:');
  console.log(`   ✅ Updated: ${success}`);
  console.log(`   ❌ Failed: ${failed}`);
  
  if (success > 0) {
    console.log('');
    console.log('🎉 Vlog titles updated to match YouTube videos!');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
