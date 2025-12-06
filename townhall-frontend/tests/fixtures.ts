/**
 * Test Fixtures
 * 
 * Common test data used across test suites.
 */

export const mockEvents = [
  {
    slug: 'intro-to-ai-january',
    title: 'Introduction to AI: What Everyone Should Know',
    description: 'A beginner-friendly workshop covering the basics of artificial intelligence.',
    date: '2025-01-15',
    time: '6:00 PM',
    endTime: '8:00 PM',
    location: 'Newark Public Library',
    address: '5 Washington Street, Newark, NJ 07102',
    capacity: 50,
    registered: 32,
    tags: ['Beginner', 'Workshop'],
  },
  {
    slug: 'ai-for-small-business',
    title: 'AI Tools for Small Business Owners',
    description: 'Learn practical AI tools that can help automate tasks and grow your business.',
    date: '2025-01-22',
    time: '7:00 PM',
    endTime: '9:00 PM',
    location: 'Newark Innovation Center',
    address: '123 Innovation Way, Newark, NJ 07102',
    capacity: 30,
    registered: 18,
    tags: ['Business', 'Practical'],
  },
];

export const mockBlogPosts = [
  {
    slug: 'what-is-chatgpt',
    title: 'What is ChatGPT and How Can It Help You?',
    excerpt: 'A simple guide to understanding ChatGPT and practical ways to use it.',
    date: '2024-12-20',
    author: 'Sarah Johnson',
    tags: ['AI Basics', 'ChatGPT'],
    readTime: '5 min read',
  },
  {
    slug: 'ai-job-market-newark',
    title: 'AI and the Job Market: Opportunities in Newark',
    excerpt: 'Exploring how AI is creating new job opportunities in our community.',
    date: '2024-12-15',
    author: 'Marcus Williams',
    tags: ['Careers', 'Local'],
    readTime: '7 min read',
  },
];

export const mockVlogs = [
  {
    id: '1',
    title: 'Introduction to AI Workshop - Full Recording',
    description: 'Watch the full recording of our intro workshop.',
    thumbnail: '/thumbnails/intro-ai.jpg',
    duration: '1:45:00',
    views: 1234,
    date: '2024-12-15',
    youtubeId: 'dQw4w9WgXcQ',
  },
];

export const validRegistrationData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '555-123-4567',
};

export const validVolunteerData = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  phone: '555-987-6543',
  interest: 'workshop-facilitator',
  availability: 'weekday-evening',
  experience: 'I have experience teaching technology to seniors.',
  motivation: 'I want to help my community learn about AI.',
};

export const validContactData = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  subject: 'general',
  message: 'I have a question about your upcoming workshops.',
};

export const invalidEmails = [
  '',
  'notanemail',
  'missing@domain',
  '@nodomain.com',
  'spaces in@email.com',
];

export const testPages = [
  { path: '/', name: 'Homepage' },
  { path: '/events', name: 'Events' },
  { path: '/blog', name: 'Blog' },
  { path: '/vlogs', name: 'Vlogs' },
  { path: '/volunteer', name: 'Volunteer' },
  { path: '/contact', name: 'Contact' },
  { path: '/about', name: 'About' },
];

export const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
  largeDesktop: { width: 1920, height: 1080 },
};

export const lighthouseThresholds = {
  desktop: {
    performance: 90,
    accessibility: 100,
    'best-practices': 90,
    seo: 90,
  },
  mobile: {
    performance: 80,
    accessibility: 100,
    'best-practices': 90,
    seo: 90,
  },
};
