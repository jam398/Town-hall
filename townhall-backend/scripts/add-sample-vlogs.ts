/**
 * Add Sample Vlogs to Sanity
 * 
 * This script adds sample vlog posts to your Sanity CMS.
 * Run with: npm run add-sample-vlogs
 */

import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'pvm742xo',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const sampleVlogs = [
  {
    _type: 'vlogPost',
    title: 'Introduction to AI Workshop - Full Recording',
    slug: {
      _type: 'slug',
      current: 'intro-ai-workshop-recording',
    },
    description: 'Missed our intro workshop? Watch the full recording and learn the basics of AI, machine learning, and how to get started with practical tools.',
    youtubeVideoId: 'dQw4w9WgXcQ', // Replace with real YouTube ID
    duration: '1:45:00',
    publishedAt: '2024-12-15T10:00:00.000Z',
    status: 'published',
    tags: ['Workshop', 'AI Basics', 'Tutorial'],
  },
  {
    _type: 'vlogPost',
    title: 'ChatGPT Tips & Tricks You Need to Know',
    slug: {
      _type: 'slug',
      current: 'chatgpt-tips-tricks',
    },
    description: 'Our community shares their favorite ChatGPT prompts and techniques for getting better results. Learn how to write effective prompts and avoid common mistakes.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    duration: '25:30',
    publishedAt: '2024-12-10T14:00:00.000Z',
    status: 'published',
    tags: ['ChatGPT', 'Tips', 'Practical'],
  },
  {
    _type: 'vlogPost',
    title: 'Community Spotlight: Maria\'s AI Journey',
    slug: {
      _type: 'slug',
      current: 'maria-ai-journey',
    },
    description: 'Meet Maria, a Newark small business owner who transformed her bakery using AI tools. Hear her inspiring story and learn what worked (and what didn\'t).',
    youtubeVideoId: 'dQw4w9WgXcQ',
    duration: '12:45',
    publishedAt: '2024-12-05T16:00:00.000Z',
    status: 'published',
    tags: ['Community', 'Business', 'Success Story'],
  },
  {
    _type: 'vlogPost',
    title: 'AI for Job Seekers: Resume & Interview Tips',
    slug: {
      _type: 'slug',
      current: 'ai-job-seekers-resume-interview',
    },
    description: 'Learn how to use AI tools to improve your resume, prepare for interviews, and stand out in the job market. Practical tips from career coaches.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    duration: '35:20',
    publishedAt: '2024-11-28T11:00:00.000Z',
    status: 'published',
    tags: ['Career', 'Job Search', 'Practical'],
  },
  {
    _type: 'vlogPost',
    title: 'Protecting Your Privacy Online - Workshop Recording',
    slug: {
      _type: 'slug',
      current: 'privacy-online-workshop',
    },
    description: 'Full recording of our privacy workshop covering data protection, secure browsing, and AI privacy concerns. Essential knowledge for everyone.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    duration: '1:15:00',
    publishedAt: '2024-11-20T13:00:00.000Z',
    status: 'published',
    tags: ['Privacy', 'Security', 'Workshop'],
  },
  {
    _type: 'vlogPost',
    title: 'Town Hall Year in Review 2024',
    slug: {
      _type: 'slug',
      current: 'town-hall-year-review-2024',
    },
    description: 'Celebrating a year of community, learning, and growth. See highlights from our events, hear from members, and look ahead to 2025.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    duration: '18:30',
    publishedAt: '2024-11-15T15:00:00.000Z',
    status: 'published',
    tags: ['Community', 'Recap', 'Celebration'],
  },
];

async function addSampleVlogs() {
  console.log('🚀 Adding sample vlogs to Sanity...\n');

  try {
    for (const vlog of sampleVlogs) {
      console.log(`🎥 Creating vlog: ${vlog.title}`);
      
      const result = await client.create(vlog as any);
      
      console.log(`✅ Vlog created with ID: ${result._id}\n`);
    }

    console.log('🎉 All sample vlogs added successfully!');
    console.log('\n📍 View them at:');
    console.log('   - Frontend: http://localhost:3000/vlogs');
    console.log('   - Sanity Studio: http://localhost:3333');
    console.log('   - Backend API: http://localhost:3001/api/vlogs\n');
    console.log('⚠️  Note: Update YouTube video IDs in Sanity Studio with real video IDs\n');

  } catch (error) {
    console.error('❌ Error adding vlogs:', error);
    process.exit(1);
  }
}

addSampleVlogs();
