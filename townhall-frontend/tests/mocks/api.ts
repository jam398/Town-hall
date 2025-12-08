/**
 * API Mocking Utilities for Playwright Tests
 * 
 * Provides consistent mock responses for all API endpoints.
 */

import { Page, Route } from '@playwright/test';

// Base API URL pattern
const API_PATTERN = '**/api/**';

// Mock data
export const mockEvents = [
  {
    slug: 'intro-to-ai-january',
    title: 'Introduction to AI: What Everyone Should Know',
    description: 'A beginner-friendly workshop covering the basics of artificial intelligence, machine learning, and how AI is changing our daily lives.',
    longDescription: `Join us for an engaging introduction to artificial intelligence! This workshop is designed for complete beginners—no technical background required.

**What You'll Learn:**
- What AI actually is (and isn't)
- How AI is already part of your daily life
- Practical ways to use AI tools like ChatGPT
- How to think critically about AI claims

**Who Should Attend:**
Anyone curious about AI! Whether you're a parent wanting to understand what your kids are using, a professional looking to stay current, or simply curious about technology.`,
    date: '2025-01-15',
    time: '18:00',
    endTime: '20:00',
    location: 'Newark Public Library - Main Branch',
    address: '5 Washington Street, Newark, NJ 07102',
    capacity: 50,
    registered: 32,
    tags: ['Beginner', 'Workshop', 'Free'],
    instructor: 'Dr. Sarah Chen',
    instructorBio: 'Former university professor with 15 years of experience making complex technology accessible to all learners.',
  },
  {
    slug: 'ai-for-small-business',
    title: 'AI Tools for Small Business Owners',
    description: 'Learn practical AI tools that can help automate tasks, improve customer service, and grow your business.',
    date: '2025-01-22',
    time: '19:00',
    endTime: '21:00',
    location: 'Newark Innovation Center',
    address: '123 Innovation Way, Newark, NJ 07102',
    capacity: 30,
    registered: 18,
    tags: ['Business', 'Practical', 'Intermediate'],
    instructor: 'Marcus Johnson',
    instructorBio: 'Local entrepreneur and tech educator passionate about helping small businesses leverage technology.',
  },
  {
    slug: 'chatgpt-hands-on',
    title: 'ChatGPT Hands-On Workshop',
    description: 'Bring your laptop and learn to use ChatGPT effectively with guided exercises and real-world examples.',
    date: '2025-01-29',
    time: '18:30',
    endTime: '20:30',
    location: 'Newark Public Library - Main Branch',
    address: '5 Washington Street, Newark, NJ 07102',
    capacity: 25,
    registered: 25,
    tags: ['Hands-On', 'ChatGPT', 'Beginner'],
    instructor: 'Aisha Williams',
    instructorBio: 'Programs coordinator and AI enthusiast who loves helping people discover the power of AI tools.',
  },
];

export const mockBlogPosts = [
  {
    slug: 'what-is-chatgpt',
    title: 'What is ChatGPT and How Can It Help You?',
    excerpt: 'A simple guide to understanding ChatGPT and practical ways to use it in your daily life.',
    content: `ChatGPT has taken the world by storm, but what exactly is it? In simple terms, ChatGPT is an AI assistant that can have conversations with you, answer questions, and help with various tasks.

## What Can ChatGPT Do?

- **Answer questions** on almost any topic
- **Write and edit** emails, essays, and documents
- **Explain concepts** in simple terms
- **Help brainstorm** ideas for projects
- **Assist with coding** and technical tasks

## Getting Started

To use ChatGPT, simply visit chat.openai.com and create a free account. The basic version is completely free to use.

## Tips for Better Results

1. **Be specific** - The more detail you provide, the better the response
2. **Ask follow-up questions** - Refine the answer by asking for clarification
3. **Verify important information** - Always double-check facts for important decisions

## Join Our Workshop

Want to learn more? Join our upcoming ChatGPT Hands-On Workshop where we'll guide you through practical exercises!`,
    date: '2024-12-20',
    author: 'Sarah Chen',
    authorBio: 'Education Lead at Town Hall Newark',
    tags: ['AI Basics', 'ChatGPT', 'Tutorial'],
    readTime: '5 min read',
    image: '/images/blog/chatgpt-guide.jpg',
  },
  {
    slug: 'ai-job-market-newark',
    title: 'AI and the Job Market: Opportunities in Newark',
    excerpt: 'Exploring how AI is creating new job opportunities in our community and how to prepare.',
    content: `The rise of AI isn't just about robots taking jobs—it's creating entirely new opportunities, especially in communities like Newark.

## New Roles Emerging

- **AI Trainers** - Teaching AI systems to be more accurate
- **Prompt Engineers** - Crafting effective instructions for AI
- **AI Ethics Specialists** - Ensuring AI is used responsibly
- **Data Annotators** - Labeling data for machine learning

## Local Opportunities

Several Newark-based companies are actively hiring for AI-related positions. Our community partners report increased demand for workers who understand AI basics.

## How to Prepare

1. **Learn the fundamentals** - Attend our free workshops
2. **Practice with AI tools** - Hands-on experience matters
3. **Stay curious** - The field evolves rapidly
4. **Network** - Join our Discord community

## Resources

- Town Hall Newark workshops (free!)
- Coursera AI courses (many free options)
- Local library resources`,
    date: '2024-12-15',
    author: 'Marcus Johnson',
    authorBio: 'Founder & Director at Town Hall Newark',
    tags: ['Careers', 'Local', 'Opportunities'],
    readTime: '7 min read',
    image: '/images/blog/ai-jobs.jpg',
  },
  {
    slug: 'ai-safety-tips-parents',
    title: 'AI Safety Tips for Parents',
    excerpt: 'What parents need to know about AI tools and how to guide children in using them responsibly.',
    content: `As AI becomes more prevalent, parents have important questions about how to guide their children. Here's what you need to know.

## Understanding the Landscape

Your children are likely already using AI—through search engines, social media algorithms, and tools like ChatGPT. Understanding these tools helps you have informed conversations.

## Key Safety Considerations

### Privacy
- AI tools may store conversation data
- Teach children not to share personal information
- Review privacy settings together

### Accuracy
- AI can make mistakes or "hallucinate" facts
- Encourage fact-checking important information
- Use AI as a starting point, not the final answer

### Academic Integrity
- Schools have varying policies on AI use
- Discuss what's appropriate for homework
- Focus on learning, not just getting answers

## Starting the Conversation

Ask your children:
- "What AI tools do you use?"
- "How do you decide if AI information is accurate?"
- "What would you do if AI gave you wrong information?"

## Resources for Families

Join our family-friendly workshops where parents and children learn together!`,
    date: '2024-12-10',
    author: 'James Rodriguez',
    authorBio: 'Community Manager at Town Hall Newark',
    tags: ['Parents', 'Safety', 'Education'],
    readTime: '6 min read',
    image: '/images/blog/ai-parents.jpg',
  },
];

export const mockVlogs = [
  {
    id: '1',
    title: 'Introduction to AI Workshop - Full Recording',
    description: 'Watch the complete recording of our December Introduction to AI workshop. Perfect for those who couldn\'t attend in person.',
    thumbnail: '/images/vlogs/intro-ai-thumb.jpg',
    duration: '1:45:00',
    views: 1234,
    date: '2024-12-15',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'ChatGPT Tips & Tricks',
    description: 'Quick tips for getting better results from ChatGPT, demonstrated with real examples.',
    thumbnail: '/images/vlogs/chatgpt-tips-thumb.jpg',
    duration: '12:30',
    views: 856,
    date: '2024-12-08',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: '3',
    title: 'Community Spotlight: How Newark Residents Use AI',
    description: 'Interviews with community members about how they\'ve incorporated AI into their daily lives.',
    thumbnail: '/images/vlogs/community-spotlight-thumb.jpg',
    duration: '18:45',
    views: 543,
    date: '2024-12-01',
    youtubeId: 'dQw4w9WgXcQ',
  },
];

// Mock API handlers
export async function mockApiRoutes(page: Page) {
  // Events endpoints
  await page.route('**/api/events', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockEvents),
    });
  });

  await page.route('**/api/events/*', async (route: Route) => {
    const url = route.request().url();
    const slug = url.split('/').pop();
    const event = mockEvents.find((e) => e.slug === slug);
    
    if (event) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(event),
      });
    } else {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Event not found' }),
      });
    }
  });

  // Blog endpoints
  await page.route('**/api/blog', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockBlogPosts),
    });
  });

  await page.route('**/api/blog/*', async (route: Route) => {
    const url = route.request().url();
    const slug = url.split('/').pop();
    const post = mockBlogPosts.find((p) => p.slug === slug);
    
    if (post) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(post),
      });
    } else {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Post not found' }),
      });
    }
  });

  // Vlogs endpoint
  await page.route('**/api/vlogs', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockVlogs),
    });
  });

  // Form submissions
  await page.route('**/api/events/register', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Registration successful' }),
    });
  });

  await page.route('**/api/volunteer', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Volunteer application submitted' }),
    });
  });

  await page.route('**/api/contact', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Message sent' }),
    });
  });

  await page.route('**/api/newsletter', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Subscribed to newsletter' }),
    });
  });
}

// Mock error responses
export async function mockApiError(page: Page, endpoint: string, status: number, message: string) {
  await page.route(`**/api/${endpoint}`, async (route: Route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ message }),
    });
  });
}

// Mock empty responses
export async function mockEmptyResponses(page: Page) {
  await page.route('**/api/events', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/blog', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/vlogs', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
}

// Mock slow responses for loading state testing
export async function mockSlowResponses(page: Page, delayMs: number = 2000) {
  await page.route(API_PATTERN, async (route: Route) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route.continue();
  });
}
