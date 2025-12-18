#!/usr/bin/env node
/**
 * Import 7 Fully Detailed Events to Sanity CMS
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

// 7 Fully detailed events - dates set for upcoming months in 2025
const events = [
  {
    _id: 'event-ai-basics-jan-2025',
    _type: 'event',
    title: 'Introduction to AI: Understanding the Basics',
    slug: { _type: 'slug', current: 'intro-to-ai-basics-jan-2025' },
    description: 'A beginner-friendly workshop covering AI fundamentals, how machine learning works, and real-world applications you encounter daily.',
    longDescription: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Join us for an engaging introduction to Artificial Intelligence! This workshop is designed for complete beginners who want to understand what AI really is, beyond the buzzwords and hype.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'We\'ll explore how AI powers everyday tools like voice assistants, recommendation systems, and spam filters. You\'ll leave with a clear understanding of AI terminology and the confidence to explore further.',
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'What AI, machine learning, and deep learning actually mean',
      'How AI is used in everyday applications (Netflix, Spotify, Google)',
      'The difference between narrow AI and general AI',
      'Common misconceptions about AI debunked',
      'How to identify AI-powered features in apps you use',
    ],
    dateTime: '2025-01-25T10:00:00.000Z',
    endTime: '2025-01-25T12:30:00.000Z',
    location: 'Newark Public Library - Main Branch',
    address: '5 Washington Street, Newark, NJ 07102',
    maxAttendees: 40,
    registrationDeadline: '2025-01-24T23:59:00.000Z',
    status: 'published',
    tags: ['AI Basics', 'Beginner', 'Workshop'],
    instructor: 'Dr. Sarah Chen',
    instructorBio: 'Dr. Chen is a computer science professor at NJIT with 15 years of experience in AI research. She specializes in making complex technical concepts accessible to everyone.',
  },
  {
    _id: 'event-chatgpt-mastery-feb-2025',
    _type: 'event',
    title: 'ChatGPT Mastery: From Beginner to Power User',
    slug: { _type: 'slug', current: 'chatgpt-mastery-feb-2025' },
    description: 'Learn to use ChatGPT effectively for work, school, and personal projects. Hands-on practice with prompting techniques that get better results.',
    longDescription: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'ChatGPT has changed how millions of people work and learn, but most users only scratch the surface of what\'s possible. This hands-on workshop will transform you from a casual user into a power user.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Bring your laptop or tablet - we\'ll practice together! You\'ll learn prompting frameworks, how to chain conversations for complex tasks, and ethical considerations for AI-assisted work.',
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'The CRISP prompting framework for better responses',
      'How to use ChatGPT for writing, research, and brainstorming',
      'Advanced techniques: role-playing, chain-of-thought, and few-shot prompting',
      'When NOT to use ChatGPT (limitations and risks)',
      'Privacy considerations and data safety tips',
    ],
    dateTime: '2025-02-08T14:00:00.000Z',
    endTime: '2025-02-08T17:00:00.000Z',
    location: 'Town Hall Newark Community Center',
    address: '280 Broadway, Newark, NJ 07104',
    maxAttendees: 30,
    registrationDeadline: '2025-02-07T23:59:00.000Z',
    status: 'published',
    tags: ['ChatGPT', 'Hands-On', 'Intermediate'],
    instructor: 'Marcus Williams',
    instructorBio: 'Marcus is a productivity consultant and AI trainer who has helped over 500 professionals integrate AI tools into their workflows. He\'s known for his practical, no-jargon teaching style.',
  },
  {
    _id: 'event-ai-job-search-feb-2025',
    _type: 'event',
    title: 'AI-Powered Job Search: Resume, LinkedIn & Interview Prep',
    slug: { _type: 'slug', current: 'ai-job-search-feb-2025' },
    description: 'Use AI tools to supercharge your job search. Learn to optimize your resume, enhance your LinkedIn profile, and prepare for interviews with AI assistance.',
    longDescription: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'The job market is competitive, but AI tools can give you an edge. This workshop covers practical strategies for using AI throughout your job search - from crafting the perfect resume to acing your interview.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'We\'ll work through real examples together. Bring your current resume and LinkedIn profile - you\'ll leave with an improved version and a toolkit of AI prompts for your job search.',
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'How to use AI to tailor your resume for specific job postings',
      'Optimizing your LinkedIn profile with AI-generated content',
      'Practice interview questions with AI mock interviews',
      'Using AI to research companies before interviews',
      'Ethical considerations: what to disclose about AI assistance',
    ],
    dateTime: '2025-02-22T10:00:00.000Z',
    endTime: '2025-02-22T13:00:00.000Z',
    location: 'Newark Workforce Development Center',
    address: '990 Broad Street, Newark, NJ 07102',
    maxAttendees: 25,
    registrationDeadline: '2025-02-21T23:59:00.000Z',
    status: 'published',
    tags: ['Career', 'Job Search', 'Resume', 'Practical'],
    instructor: 'Angela Torres',
    instructorBio: 'Angela is a career coach with 12 years of experience in HR and recruiting. She now helps job seekers leverage technology to stand out in competitive markets.',
  },
  {
    _id: 'event-seniors-tech-march-2025',
    _type: 'event',
    title: 'Tech for Seniors: Smartphones, Apps & Staying Connected',
    slug: { _type: 'slug', current: 'seniors-tech-march-2025' },
    description: 'A patient, supportive workshop for seniors who want to feel more confident with their smartphones and stay connected with family through technology.',
    longDescription: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Technology should bring us together, not frustrate us! This workshop is specifically designed for seniors who want to get more comfortable with their smartphones and tablets.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'We move at your pace with plenty of one-on-one help available. Bring your device (iPhone, Android, or tablet) and all your questions - no question is too basic!',
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'How to video call family using FaceTime, Zoom, or WhatsApp',
      'Setting up and using text messaging with photos',
      'Adjusting phone settings for easier use (larger text, louder volume)',
      'Staying safe from phone scams and suspicious messages',
      'Useful apps for health, news, and entertainment',
    ],
    dateTime: '2025-03-08T10:00:00.000Z',
    endTime: '2025-03-08T12:00:00.000Z',
    location: 'Newark Senior Center',
    address: '311 Roseville Avenue, Newark, NJ 07107',
    maxAttendees: 20,
    registrationDeadline: '2025-03-07T23:59:00.000Z',
    status: 'published',
    tags: ['Seniors', 'Beginner', 'Smartphones', 'Digital Literacy'],
    instructor: 'Patricia Johnson',
    instructorBio: 'Patricia is a retired teacher who now volunteers teaching technology to seniors. She\'s patient, encouraging, and understands the challenges of learning new technology later in life.',
  },
  {
    _id: 'event-small-business-ai-march-2025',
    _type: 'event',
    title: 'AI for Small Business Owners: Practical Tools That Save Time',
    slug: { _type: 'slug', current: 'small-business-ai-march-2025' },
    description: 'Discover affordable AI tools that can help your small business with marketing, customer service, bookkeeping, and more. Real examples from Newark businesses.',
    longDescription: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'As a small business owner, you wear many hats. AI tools can help you work smarter, not harder - without breaking the bank. This workshop focuses on practical, affordable solutions.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'We\'ll hear from local Newark business owners who are already using AI, and you\'ll get hands-on time with tools you can implement immediately. Bring your business challenges!',
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'Free and low-cost AI tools for social media content creation',
      'Automating customer inquiries with AI chatbots',
      'Using AI for bookkeeping and invoice management',
      'AI-powered email marketing that actually converts',
      'Case studies from Newark small businesses using AI',
    ],
    dateTime: '2025-03-22T09:00:00.000Z',
    endTime: '2025-03-22T12:00:00.000Z',
    location: 'Newark Business Hub',
    address: '24 Commerce Street, Newark, NJ 07102',
    maxAttendees: 35,
    registrationDeadline: '2025-03-21T23:59:00.000Z',
    status: 'published',
    tags: ['Small Business', 'Entrepreneurship', 'Marketing', 'Practical'],
    instructor: 'David Okonkwo',
    instructorBio: 'David runs a digital marketing agency in Newark and has helped over 100 local businesses adopt AI tools. He focuses on solutions that deliver ROI for small budgets.',
  },
  {
    _id: 'event-online-safety-april-2025',
    _type: 'event',
    title: 'Staying Safe Online: Scams, Privacy & Digital Security',
    slug: { _type: 'slug', current: 'online-safety-april-2025' },
    description: 'Protect yourself and your family from online threats. Learn to spot scams, secure your accounts, and maintain your privacy in an increasingly digital world.',
    longDescription: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Online scams are getting more sophisticated, and AI is making them even harder to detect. This workshop arms you with the knowledge to protect yourself, your family, and your finances.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'We\'ll cover real examples of scams targeting our community, show you how to spot red flags, and set up security measures that actually work. Bring your phone to configure security settings together.',
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'How to identify phishing emails, texts, and phone calls',
      'Setting up two-factor authentication on your accounts',
      'Password best practices (and tools to make it easy)',
      'Recognizing AI-generated deepfakes and voice clones',
      'What to do if you\'ve been scammed (recovery steps)',
    ],
    dateTime: '2025-04-05T14:00:00.000Z',
    endTime: '2025-04-05T16:30:00.000Z',
    location: 'Newark Public Library - Main Branch',
    address: '5 Washington Street, Newark, NJ 07102',
    maxAttendees: 50,
    registrationDeadline: '2025-04-04T23:59:00.000Z',
    status: 'published',
    tags: ['Security', 'Privacy', 'Scams', 'Essential'],
    instructor: 'Officer Michael Rivera & Tech Expert Lisa Park',
    instructorBio: 'Officer Rivera from Newark PD\'s Cyber Crimes Unit teams up with cybersecurity consultant Lisa Park to deliver practical safety advice backed by real-world experience.',
  },
  {
    _id: 'event-ai-creativity-april-2025',
    _type: 'event',
    title: 'AI & Creativity: Art, Music, and Writing with AI Tools',
    slug: { _type: 'slug', current: 'ai-creativity-april-2025' },
    description: 'Explore the creative side of AI! Generate images, compose music, and enhance your writing with AI tools. A fun, hands-on workshop for all skill levels.',
    longDescription: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'AI isn\'t just for business - it\'s a powerful creative tool! Whether you\'re an artist, musician, writer, or just curious, this workshop will open your eyes to new possibilities.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'We\'ll experiment with image generators like DALL-E and Midjourney, try AI music composition, and explore AI writing assistants. You\'ll create your own AI-assisted artwork to take home!',
          },
        ],
      },
    ],
    whatYouWillLearn: [
      'How AI image generators work (DALL-E, Midjourney, Stable Diffusion)',
      'Writing effective prompts for visual AI tools',
      'AI music composition and audio tools',
      'Using AI to enhance (not replace) your creative process',
      'Copyright and ethical considerations for AI-generated content',
    ],
    dateTime: '2025-04-19T13:00:00.000Z',
    endTime: '2025-04-19T16:00:00.000Z',
    location: 'Newark Arts Council Gallery',
    address: '17 Academy Street, Newark, NJ 07102',
    maxAttendees: 25,
    registrationDeadline: '2025-04-18T23:59:00.000Z',
    status: 'published',
    tags: ['Creative', 'Art', 'Music', 'Fun', 'Hands-On'],
    instructor: 'Jasmine Lee',
    instructorBio: 'Jasmine is a digital artist and educator who combines traditional art techniques with cutting-edge AI tools. Her AI-assisted artwork has been featured in galleries across New Jersey.',
  },
];

async function createEvent(event) {
  const response = await fetch(SANITY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          createOrReplace: event,
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
  console.log('📅 Importing 7 Detailed Events to Sanity CMS...');
  console.log('');

  let success = 0;
  let failed = 0;

  for (const event of events) {
    try {
      await createEvent(event);
      success++;
      const eventDate = new Date(event.dateTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      console.log(`✅ ${event.title}`);
      console.log(`   📍 ${event.location} | 📆 ${eventDate}`);
      console.log(`   👥 Max ${event.maxAttendees} attendees | 🏷️  ${event.tags.join(', ')}`);
      console.log('');
    } catch (error) {
      failed++;
      console.error(`❌ ${event.title}: ${error.message}`);
    }
  }

  console.log('📊 Import Summary:');
  console.log(`   ✅ Created: ${success}`);
  console.log(`   ❌ Failed: ${failed}`);
  
  if (success > 0) {
    console.log('');
    console.log('🎉 Events imported successfully!');
    console.log('   View them at: https://townhall-backend-vpyh.onrender.com/api/events');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
