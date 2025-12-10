/**
 * Add Sample Blog Posts to Sanity
 * 
 * This script adds sample blog posts to your Sanity CMS.
 * Run with: npm run add-sample-blog
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

const sampleBlogPosts = [
  {
    _type: 'blogPost',
    title: 'AI Isn\'t Magic—It\'s Math (And That\'s Okay)',
    slug: {
      _type: 'slug',
      current: 'ai-isnt-magic-its-math',
    },
    excerpt: 'Let\'s demystify AI. It\'s not sentient, it\'s not magic—it\'s statistics and pattern recognition at scale. Here\'s what you actually need to know.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Everyone\'s talking about AI like it\'s some kind of sorcery. But here\'s the truth: artificial intelligence is just really, really good math.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'What AI Actually Is',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Think of AI as a pattern-matching machine. It looks at millions of examples and learns to recognize patterns. When you ask ChatGPT a question, it\'s not "thinking" in the way you and I think—it\'s predicting what words are most likely to come next based on patterns it\'s seen before.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'That\'s why AI can write a convincing email but might struggle with logic puzzles. It\'s excellent at mimicking patterns it\'s seen, but it doesn\'t truly "understand" the way humans do.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Why This Matters',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Understanding that AI is pattern recognition—not magic—helps you use it better. You know it needs clear patterns to work from. You know it might confidently give you wrong answers. You know it\'s a tool, not a replacement for human judgment.',
          },
        ],
      },
    ],
    publishedAt: '2024-12-05T10:00:00.000Z',
    author: {
      _type: 'reference',
      _ref: 'author-1', // Will be created separately
    },
    status: 'published',
    tags: ['AI Basics', 'Explainer', 'Beginner'],
  },
  {
    _type: 'blogPost',
    title: '5 AI Tools That Actually Save Time (Not Just Hype)',
    slug: {
      _type: 'slug',
      current: 'ai-tools-that-save-time',
    },
    excerpt: 'Cut through the AI hype. These five tools have been tested by our community and genuinely save hours every week.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'There are thousands of AI tools out there, but most are gimmicks. Our community has tested dozens, and these five actually deliver on their promises.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '1. Grammarly (Writing Assistant)',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Best for: Emails, documents, and professional communication. It catches typos, suggests clarity improvements, and adapts tone. Community members report saving 30+ minutes daily on email alone.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '2. Otter.ai (Meeting Transcription)',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Best for: Anyone who attends virtual meetings. It transcribes meetings in real-time, creates summaries, and lets you search past conversations. No more frantic note-taking.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '3. Canva Magic Design (Graphics)',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Best for: Social media posts, flyers, presentations. Describe what you need, and it generates professional designs instantly. Small business owners love this for marketing materials.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '4. ChatGPT (All-Purpose Assistant)',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Best for: First drafts, brainstorming, research summaries. Think of it as a collaborative thinking partner. Community tip: Be specific in your prompts for better results.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: '5. Notion AI (Organization & Notes)',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Best for: Knowledge management and team collaboration. It helps summarize long documents, organize notes, and extract key points from meetings. Especially useful for project management.',
          },
        ],
      },
    ],
    publishedAt: '2024-11-28T14:00:00.000Z',
    author: {
      _type: 'reference',
      _ref: 'author-1',
    },
    status: 'published',
    tags: ['Tools', 'Productivity', 'Practical'],
  },
  {
    _type: 'blogPost',
    title: 'Your Job Won\'t Be Replaced By AI (But It Will Change)',
    slug: {
      _type: 'slug',
      current: 'your-job-wont-be-replaced-by-ai',
    },
    excerpt: 'The headlines are scary, but here\'s the reality: AI is a tool, not a replacement. Learn how to adapt and thrive in an AI-augmented workplace.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The scary headlines write themselves: "AI Will Replace 80% of Jobs!" But the reality is more nuanced—and more interesting.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'What\'s Actually Happening',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'AI isn\'t replacing jobs wholesale. Instead, it\'s changing how we work. Tasks that were manual and repetitive are being automated. But the human skills—creativity, empathy, problem-solving, relationship-building—remain essential.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Think of it this way: Excel didn\'t eliminate accountants—it made them more efficient and allowed them to focus on analysis instead of calculation. AI is the same, just on a larger scale.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'How to Prepare',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The workers who thrive will be those who learn to work alongside AI. Start experimenting with AI tools in your current role. Learn what they\'re good at (and what they\'re not). Think about which parts of your job AI could handle, and which parts only you can do.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The goal isn\'t to compete with AI—it\'s to collaborate with it. Those who do will find their work more interesting, more valuable, and more human.',
          },
        ],
      },
    ],
    publishedAt: '2024-11-15T09:00:00.000Z',
    author: {
      _type: 'reference',
      _ref: 'author-1',
    },
    status: 'published',
    tags: ['Career', 'Future of Work', 'AI Impact'],
  },
];

async function addSampleBlogPosts() {
  console.log('🚀 Adding sample blog posts to Sanity...\n');

  try {
    // First, create an author if one doesn't exist
    console.log('📝 Creating default author...');
    const author = await client.create({
      _id: 'author-1',
      _type: 'author',
      name: 'Town Hall Team',
      slug: {
        _type: 'slug',
        current: 'town-hall-team',
      },
      bio: 'The Town Hall Newark team, bringing AI education and community together.',
    } as any).catch(() => {
      console.log('ℹ️  Author already exists, continuing...');
      return { _id: 'author-1' };
    });

    console.log(`✅ Author ready: ${author._id}\n`);

    for (const post of sampleBlogPosts) {
      console.log(`📰 Creating blog post: ${post.title}`);
      
      const result = await client.create(post as any);
      
      console.log(`✅ Blog post created with ID: ${result._id}\n`);
    }

    console.log('🎉 All sample blog posts added successfully!');
    console.log('\n📍 View them at:');
    console.log('   - Frontend: http://localhost:3000/blog');
    console.log('   - Sanity Studio: http://localhost:3333');
    console.log('   - Backend API: http://localhost:3001/api/blog\n');

  } catch (error) {
    console.error('❌ Error adding blog posts:', error);
    process.exit(1);
  }
}

addSampleBlogPosts();
