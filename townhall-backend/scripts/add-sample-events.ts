/**
 * Add Sample Events to Sanity
 * 
 * This script adds sample events to your Sanity CMS.
 * Run with: npm run add-sample-events
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

const sampleEvents = [
  {
    _type: 'event',
    title: 'Introduction to AI: What Everyone Should Know',
    slug: {
      _type: 'slug',
      current: 'introduction-to-ai-what-everyone-should-know',
    },
    description: 'A beginner-friendly workshop covering the basics of artificial intelligence, machine learning, and how AI impacts our daily lives.',
    longDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Join us for an engaging introduction to artificial intelligence! This workshop is perfect for beginners who want to understand AI without getting lost in technical jargon.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "We'll cover: What AI really is (and isn't), real-world applications you interact with daily, common misconceptions about AI, how machine learning works at a basic level, and ethical considerations in AI development.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "No technical background required. All materials will be provided, and we'll have plenty of time for Q&A.",
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'Understand the fundamentals of artificial intelligence',
      'Identify AI applications in your daily life',
      'Distinguish between narrow AI and general AI',
      'Learn basic machine learning concepts',
      'Explore ethical implications of AI technology',
    ],
    dateTime: '2026-01-14T18:00:00.000Z',
    endTime: '2026-01-14T20:00:00.000Z',
    location: 'Newark Public Library - Main Branch',
    address: '5 Washington Street\nNewark, NJ 07102',
    maxAttendees: 50,
    registrationDeadline: '2026-01-13T23:59:00.000Z',
    status: 'published',
    tags: ['BEGINNER', 'WORKSHOP', 'COMMUNITY'],
    instructor: 'Dr. Sarah Chen',
    instructorBio: 'Dr. Chen is a machine learning researcher and educator with 10 years of experience making AI accessible to non-technical audiences.',
  },
  {
    _type: 'event',
    title: 'AI Tools for Small Business Owners',
    slug: {
      _type: 'slug',
      current: 'ai-tools-for-small-business-owners',
    },
    description: 'Learn practical AI tools that can help automate tasks, improve customer service, and grow your small business.',
    longDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Running a small business? Discover how AI can help you work smarter, not harder. This practical workshop shows you real AI tools you can start using today—no coding required.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "We'll explore: AI writing assistants for marketing and emails, chatbots for customer service automation, AI tools for social media management, automated bookkeeping and invoicing solutions, and AI-powered analytics to understand your customers.",
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'Identify AI tools suitable for your business needs',
      'Automate repetitive tasks to save 5-10 hours per week',
      'Improve customer response times with AI chatbots',
      'Use AI for content creation and marketing',
      'Make data-driven decisions with AI analytics',
    ],
    dateTime: '2026-01-21T19:00:00.000Z',
    endTime: '2026-01-21T21:00:00.000Z',
    location: 'Newark Innovation Center',
    address: '55 Washington Street\nNewark, NJ 07102',
    maxAttendees: 30,
    registrationDeadline: '2026-01-20T23:59:00.000Z',
    status: 'published',
    tags: ['BUSINESS', 'PRACTICAL', 'WORKSHOP'],
    instructor: 'Marcus Rodriguez',
    instructorBio: 'Marcus is a small business consultant and AI implementation specialist who helps entrepreneurs leverage technology for growth.',
  },
  {
    _type: 'event',
    title: 'Community AI Showcase',
    slug: {
      _type: 'slug',
      current: 'community-ai-showcase',
    },
    description: 'See what your neighbors are building! Local community members present their AI projects and creative experiments.',
    longDescription: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Join us for an inspiring evening of creativity and innovation! Local Newark residents will showcase their AI projects, from art and music generation to practical tools and community solutions.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'This is a great opportunity to network with other AI enthusiasts, get inspired by creative applications, and see firsthand how AI is being used to solve local challenges.',
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'Discover innovative AI applications from your community',
      'Network with local AI enthusiasts and creators',
      'Get inspired by creative uses of AI technology',
      'Learn about resources available in Newark',
      'Find potential collaboration opportunities',
    ],
    dateTime: '2026-01-31T17:00:00.000Z',
    endTime: '2026-01-31T20:00:00.000Z',
    location: 'Town Hall Community Space',
    address: '1 Center Street\nNewark, NJ 07102',
    maxAttendees: 100,
    registrationDeadline: '2026-01-30T23:59:00.000Z',
    status: 'published',
    tags: ['COMMUNITY', 'SHOWCASE', 'NETWORKING'],
  },
];

async function addSampleEvents() {
  console.log('🚀 Adding sample events to Sanity...\n');

  try {
    for (const event of sampleEvents) {
      console.log(`📅 Creating event: ${event.title}`);
      
      const result = await client.create(event as any);
      
      console.log(`✅ Event created with ID: ${result._id}\n`);
    }

    console.log('🎉 All sample events added successfully!');
    console.log('\n📍 View them at:');
    console.log('   - Frontend: http://localhost:3000/events');
    console.log('   - Sanity Studio: http://localhost:3333');
    console.log('   - Backend API: http://localhost:3001/api/events\n');

  } catch (error) {
    console.error('❌ Error adding events:', error);
    process.exit(1);
  }
}

addSampleEvents();
