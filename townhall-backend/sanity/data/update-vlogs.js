#!/usr/bin/env node
/**
 * Update Vlog YouTube IDs and Descriptions
 * 
 * Updates existing vlog posts with real YouTube video IDs and appropriate descriptions.
 * 
 * Usage:
 *   node update-vlogs.js
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
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

// Vlog updates with real YouTube IDs - using actual document _id from Sanity
const vlogUpdates = [
  {
    _id: 'vlog-chatgpt-beginners',
    youtubeId: 'g5oEAoKdrdw',
    title: 'ChatGPT for Complete Beginners - Full Tutorial',
    description: 'A comprehensive beginner-friendly guide to using ChatGPT. Learn how to create an account, navigate the interface, write effective prompts, and get the most out of AI conversations.'
  },
  {
    _id: 'vlog-ai-resume',
    youtubeId: 'XJ7bYdjKDcA',
    title: 'Build a Better Resume with AI in 20 Minutes',
    description: 'Transform your resume using AI tools in just 20 minutes. Real techniques for optimizing your resume, tailoring it to job descriptions, and making it stand out to recruiters.'
  },
  {
    _id: 'vlog-small-business-ai',
    youtubeId: 'Ir08j2uot_0',
    title: '5 AI Tools Every Small Business Owner Should Know',
    description: 'Discover five essential AI tools that can revolutionize how you run your small business. From automating customer service to creating marketing content.'
  },
  {
    _id: 'vlog-ai-scams',
    youtubeId: 'Z14zy7uyXnA',
    title: 'How to Spot AI-Generated Scams and Deepfakes',
    description: 'Protect yourself and your family from AI-powered scams. Learn to identify deepfake videos, voice cloning attempts, and AI-generated phishing messages.'
  },
  {
    _id: 'vlog-voice-assistants',
    youtubeId: 'yz1BkbkgC-Y',
    title: 'Setting Up Your First Smart Speaker - Complete Guide',
    description: 'A patient, step-by-step guide to setting up your first smart speaker. Whether you chose Amazon Echo, Google Home, or Apple HomePod, we walk you through the entire process.'
  },
  {
    _id: 'vlog-ai-writing',
    youtubeId: 'TWfiPJKd9po',
    title: 'Using AI to Improve Your Writing (Without Cheating)',
    description: 'Learn how to use AI as a writing coach rather than a replacement. Discover ethical ways to get feedback, improve grammar, and overcome writer\'s block.'
  },
  {
    _id: 'vlog-community-spotlight-dec',
    youtubeId: '4Jz2LRNLf0',
    title: 'Community Spotlight: December 2024 Workshop Highlights',
    description: 'Relive the best moments from Town Hall Newark\'s December 2024 workshops. Featuring member success stories and exciting announcements about 2025.'
  },
  // Older vlogs with generated Sanity IDs
  {
    _id: 'sEwqPSZdqGfKU8SKfxQgcF',
    youtubeId: 'olA_XqcAxQQ',
    title: 'Introduction to AI Workshop - Full Recording',
    description: 'The complete recording of our popular Introduction to AI workshop. Learn the fundamentals of artificial intelligence and practical tools you can start using today.'
  },
  {
    _id: 'sEwqPSZdqGfKU8SKfxQghx',
    youtubeId: 'SPxJq7SocGw',
    title: 'ChatGPT Tips & Tricks You Need to Know',
    description: 'Level up your ChatGPT skills with these community-tested tips and tricks. Learn advanced prompting techniques and creative ways to get better results.'
  },
  {
    _id: 'ZUZBVVyNirYXjyHrV1H62O',
    youtubeId: 'D77eU327jD0',
    title: 'Community Spotlight: Maria\'s AI Journey',
    description: 'Meet Maria, a Newark bakery owner who transformed her business using AI tools. Hear her inspiring story and advice for other small business owners.'
  },
  {
    _id: 'jDUl1qG6X1kWnc37oUYEbV',
    youtubeId: 'KprWxa9WtIk',
    title: 'AI for Job Seekers: Resume & Interview Tips',
    description: 'Comprehensive guide for job seekers on leveraging AI throughout your job search. From resume optimization to interview preparation.'
  },
  {
    _id: 'ZUZBVVyNirYXjyHrV1H66P',
    youtubeId: 'yfShrF2HlUM',
    title: 'Protecting Your Privacy Online - Workshop Recording',
    description: 'Full recording of our essential privacy workshop. Learn about data protection, secure browsing habits, and privacy-focused tools.'
  },
  {
    _id: 'sEwqPSZdqGfKU8SKfxQgpZ',
    youtubeId: 'P29heiZAqOQ',
    title: 'Town Hall Year in Review 2024',
    description: 'Celebrating an incredible year at Town Hall Newark! Watch highlights from our workshops and events, and get a preview of exciting plans for 2025.'
  }
];

async function updateVlog(update) {
  // Patch the document directly by _id
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
            set: {
              youtubeId: update.youtubeId,
              title: update.title,
              description: update.description,
            },
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
  console.log('🎬 Updating Vlog YouTube IDs and Descriptions...');
  console.log(`   Project: ${SANITY_PROJECT_ID}`);
  console.log(`   Dataset: ${SANITY_DATASET}`);
  console.log('');

  let success = 0;
  let failed = 0;
  let notFound = 0;

  for (const update of vlogUpdates) {
    try {
      const result = await updateVlog(update);
      if (result) {
        success++;
        console.log(`✅ ${update.title}`);
        console.log(`   YouTube ID: ${update.youtubeId}`);
      } else {
        notFound++;
      }
    } catch (error) {
      failed++;
      console.error(`❌ ${update.title}: ${error.message}`);
    }
  }

  console.log('');
  console.log('📊 Update Summary:');
  console.log(`   ✅ Updated: ${success}`);
  console.log(`   ⚠️  Not found: ${notFound}`);
  console.log(`   ❌ Failed: ${failed}`);
  
  if (success > 0) {
    console.log('');
    console.log('🎉 Vlogs updated! YouTube links are now active.');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
