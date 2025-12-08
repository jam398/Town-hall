/**
 * Events Data
 * 
 * Comprehensive event listings for Town Hall Newark.
 * Each event is designed to serve specific personas and learning goals.
 */

export interface EventFull {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  address: string;
  capacity: number;
  registered: number;
  tags: string[];
  instructor?: string;
  instructorBio?: string;
  whatYoullLearn?: string[];
  whoShouldAttend?: string;
  whatToBring?: string[];
  image?: string;
  featured?: boolean;
}

export const events: EventFull[] = [
  {
    slug: 'intro-to-ai-january',
    title: 'Introduction to AI: What Everyone Should Know',
    description: 'A beginner-friendly workshop covering the basics of artificial intelligence, machine learning, and how AI is changing our daily lives. No technical background required!',
    longDescription: `
      <p>Artificial Intelligence is everywhere—from the recommendations on your phone to the tools transforming businesses. But what exactly is AI, and how does it work?</p>
      
      <p>In this beginner-friendly workshop, we'll demystify AI and give you a solid foundation to understand this transformative technology. No technical background needed—just bring your curiosity!</p>
      
      <p>This is our most popular workshop, and it's the perfect starting point for anyone new to AI. We've taught over 500 Newark residents in this workshop series, and the feedback has been overwhelmingly positive.</p>
    `,
    date: '2025-01-15',
    time: '6:00 PM',
    endTime: '8:00 PM',
    location: 'Newark Public Library - Main Branch',
    address: '5 Washington Street, Newark, NJ 07102',
    capacity: 50,
    registered: 32,
    tags: ['Beginner', 'Workshop'],
    instructor: 'Dr. Sarah Chen',
    instructorBio: 'AI researcher and educator with 10+ years of experience making complex topics accessible. Sarah has taught at NJIT and led AI education initiatives across New Jersey.',
    whatYoullLearn: [
      'What AI actually is (and what it isn\'t)',
      'The difference between AI, Machine Learning, and Deep Learning',
      'Real-world examples of AI in everyday life',
      'How to start using AI tools safely and effectively',
      'Common misconceptions and concerns about AI',
    ],
    whoShouldAttend: 'This workshop is perfect for anyone curious about AI, regardless of technical background. Whether you\'re a complete beginner or just want to fill in some gaps in your knowledge, you\'ll find value here.',
    whatToBring: [
      'A laptop or tablet (optional but recommended)',
      'Your questions and curiosity!',
    ],
    featured: true,
  },
  {
    slug: 'ai-for-small-business',
    title: 'AI Tools for Small Business Owners',
    description: 'Learn practical AI tools that can help automate tasks, improve customer service, and grow your small business. Hands-on demonstrations included.',
    longDescription: `
      <p>Running a small business is hard work. What if AI could handle some of the tedious tasks so you can focus on what you do best?</p>
      
      <p>In this hands-on workshop, we'll explore practical AI tools that Newark business owners are already using to save time and grow their businesses. You'll leave with specific tools you can implement immediately.</p>
      
      <p>This workshop features real case studies from local Newark businesses, including a bakery, auto shop, and consulting firm that have successfully integrated AI into their operations.</p>
    `,
    date: '2025-01-22',
    time: '7:00 PM',
    endTime: '9:00 PM',
    location: 'Newark Innovation Center',
    address: '211 Warren Street, Newark, NJ 07103',
    capacity: 30,
    registered: 18,
    tags: ['Business', 'Practical'],
    instructor: 'James Rodriguez',
    instructorBio: 'Small business consultant and Town Hall community manager. James has helped over 100 Newark entrepreneurs leverage technology for growth.',
    whatYoullLearn: [
      'AI tools for customer service (chatbots, email automation)',
      'Marketing with AI (social media, content creation)',
      'Streamlining operations (scheduling, inventory, bookkeeping)',
      'When to use AI vs. when to keep it human',
      'Free and low-cost tools that deliver real results',
    ],
    whoShouldAttend: 'Small business owners, entrepreneurs, and anyone who manages business operations. No technical background required—if you can use a smartphone, you can use these tools.',
    whatToBring: [
      'Laptop or tablet',
      'List of your biggest time-wasters at work',
      'Business cards for networking',
    ],
    featured: true,
  },
  {
    slug: 'community-ai-showcase',
    title: 'Community AI Showcase',
    description: 'See what your neighbors are building! Local community members present their AI projects and share their learning journeys. Networking and refreshments provided.',
    longDescription: `
      <p>The best way to learn is from each other. Join us for an evening of inspiration as Newark community members share their AI projects and learning journeys.</p>
      
      <p>Whether you're just starting out or have been experimenting with AI for a while, you'll find something valuable here. Past showcases have featured everything from AI-generated art to automated small business tools.</p>
      
      <p>This is also a great networking opportunity. Connect with fellow learners, find collaborators, and become part of Newark's growing AI community.</p>
    `,
    date: '2025-02-01',
    time: '5:00 PM',
    endTime: '8:00 PM',
    location: 'Town Hall Community Space',
    address: '540 Broad Street, Newark, NJ 07102',
    capacity: 100,
    registered: 45,
    tags: ['Community', 'Showcase', 'Networking'],
    whatYoullLearn: [
      'Real projects from community members',
      'Practical tips from people just like you',
      'Resources and tools others have found helpful',
      'Connections with fellow AI learners',
    ],
    whoShouldAttend: 'Everyone! Whether you want to present a project, find inspiration, or just meet like-minded neighbors, this event is for you.',
    whatToBring: [
      'Business cards or contact info to share',
      'Your own project to demo (optional)',
      'An appetite—refreshments provided!',
    ],
  },
  {
    slug: 'ai-art-workshop',
    title: 'Creating Art with AI: A Hands-On Workshop',
    description: 'Explore the creative side of AI! Learn to use tools like DALL-E, Midjourney, and Stable Diffusion to create stunning artwork. All skill levels welcome.',
    longDescription: `
      <p>AI isn't just for business and productivity—it's also a powerful creative tool. In this workshop, you'll learn to create stunning artwork using AI image generators.</p>
      
      <p>We'll explore multiple tools, learn the art of "prompt engineering" (writing descriptions that get great results), and discuss the creative and ethical implications of AI art.</p>
      
      <p>No artistic ability required! AI art is about ideas and descriptions, not drawing skills. Some of the best AI artists have never picked up a paintbrush.</p>
    `,
    date: '2025-02-08',
    time: '2:00 PM',
    endTime: '5:00 PM',
    location: 'Newark Arts Center',
    address: '89 Lincoln Park, Newark, NJ 07102',
    capacity: 25,
    registered: 12,
    tags: ['Creative', 'Workshop', 'Art'],
    instructor: 'Maya Thompson',
    instructorBio: 'Digital artist and AI art pioneer. Maya\'s AI-generated work has been featured in galleries across the Northeast.',
    whatYoullLearn: [
      'How AI image generators work',
      'Writing effective prompts for better results',
      'Comparing different AI art tools',
      'Editing and refining AI-generated images',
      'Copyright and ethical considerations',
    ],
    whoShouldAttend: 'Anyone curious about AI art, regardless of artistic background. Great for artists exploring new tools, marketers needing visuals, or anyone who wants to have fun creating.',
    whatToBring: [
      'Laptop (required for this workshop)',
      'Ideas for images you\'d like to create',
      'Sense of experimentation and play',
    ],
  },
  {
    slug: 'ai-ethics-discussion',
    title: 'AI Ethics: A Community Discussion',
    description: 'Join us for an open discussion about the ethical implications of AI in our society. Share your thoughts and concerns in a safe, moderated environment.',
    longDescription: `
      <p>AI raises important questions about privacy, jobs, bias, and the future of society. This isn't a lecture—it's a conversation where your voice matters.</p>
      
      <p>We'll discuss real scenarios and dilemmas, hear different perspectives, and think together about how we want AI to develop in our community and beyond.</p>
      
      <p>There are no wrong answers here. Whether you're excited about AI, concerned about it, or somewhere in between, your perspective is valuable.</p>
    `,
    date: '2025-02-15',
    time: '6:30 PM',
    endTime: '8:30 PM',
    location: 'Town Hall Community Space',
    address: '540 Broad Street, Newark, NJ 07102',
    capacity: 40,
    registered: 22,
    tags: ['Discussion', 'Ethics', 'Community'],
    instructor: 'Dr. Aisha Patel',
    instructorBio: 'AI ethics researcher studying fairness and accountability in machine learning. Dr. Patel facilitates discussions that help communities engage with technology critically.',
    whatYoullLearn: [
      'Key ethical issues in AI development',
      'How to think critically about AI claims',
      'Different perspectives from your neighbors',
      'Ways to advocate for responsible AI',
    ],
    whoShouldAttend: 'Anyone who thinks about AI\'s impact on society. No technical knowledge required—just thoughtful engagement.',
    whatToBring: [
      'Your thoughts, questions, and concerns',
      'Openness to different perspectives',
    ],
  },
  {
    slug: 'chatgpt-deep-dive',
    title: 'ChatGPT Deep Dive: Advanced Prompting Techniques',
    description: 'Already familiar with ChatGPT? Take your skills to the next level with advanced prompting techniques, custom instructions, and real-world applications.',
    longDescription: `
      <p>You've used ChatGPT, but are you getting the most out of it? This workshop is for people who want to go beyond basic questions and unlock ChatGPT's full potential.</p>
      
      <p>We'll cover advanced prompting techniques, custom instructions, and specific use cases for work and personal projects. You'll leave with templates and strategies you can use immediately.</p>
      
      <p>This is a hands-on workshop—bring your laptop and be ready to experiment!</p>
    `,
    date: '2025-02-22',
    time: '7:00 PM',
    endTime: '9:00 PM',
    location: 'Newark Public Library - Main Branch',
    address: '5 Washington Street, Newark, NJ 07102',
    capacity: 35,
    registered: 28,
    tags: ['Intermediate', 'ChatGPT', 'Workshop'],
    instructor: 'Marcus Williams',
    instructorBio: 'Workforce development specialist and prompt engineering enthusiast. Marcus has trained hundreds of professionals to use AI effectively.',
    whatYoullLearn: [
      'Advanced prompting techniques (chain-of-thought, few-shot learning)',
      'Custom instructions for personalized responses',
      'Using ChatGPT for specific professional tasks',
      'Combining ChatGPT with other tools',
      'Troubleshooting when ChatGPT isn\'t helpful',
    ],
    whoShouldAttend: 'People who have used ChatGPT at least a few times and want to get better results. Not for complete beginners—attend our Intro workshop first.',
    whatToBring: [
      'Laptop (required)',
      'ChatGPT account (free tier is fine)',
      'Specific tasks you want to accomplish with AI',
    ],
  },
  {
    slug: 'ai-for-parents',
    title: 'AI for Parents: Understanding What Your Kids Are Using',
    description: 'Learn about the AI tools your children encounter, how to talk about AI safety, and strategies for healthy AI use at home.',
    longDescription: `
      <p>Your kids are probably using AI more than you realize—for homework, entertainment, and social media. This workshop helps parents understand and guide their children's AI use.</p>
      
      <p>We'll cover the most popular AI tools among young people, discuss concerns like academic integrity and privacy, and share strategies for productive family conversations about AI.</p>
      
      <p>This is a judgment-free zone. We're all figuring this out together.</p>
    `,
    date: '2025-03-01',
    time: '10:00 AM',
    endTime: '12:00 PM',
    location: 'Newark Public Library - Main Branch',
    address: '5 Washington Street, Newark, NJ 07102',
    capacity: 40,
    registered: 15,
    tags: ['Parents', 'Safety', 'Family'],
    instructor: 'Dr. Michael Torres',
    instructorBio: 'Child psychologist and parent educator specializing in technology and family dynamics. Dr. Torres helps families navigate the digital world together.',
    whatYoullLearn: [
      'AI tools popular with kids and teens',
      'Academic integrity in the age of AI',
      'Privacy and safety considerations',
      'How to have productive conversations about AI',
      'Setting healthy boundaries',
    ],
    whoShouldAttend: 'Parents and guardians of children of any age. Grandparents and other caregivers also welcome.',
    whatToBring: [
      'Your questions and concerns',
      'Examples of AI your kids have mentioned (if any)',
    ],
  },
  {
    slug: 'ai-job-skills-workshop',
    title: 'AI Skills for the Job Market',
    description: 'Learn the AI skills employers are looking for and how to showcase them on your resume. Includes hands-on practice with in-demand tools.',
    longDescription: `
      <p>AI is changing the job market, but it's also creating new opportunities. This workshop focuses on practical skills that can help you stand out to employers.</p>
      
      <p>We'll cover which AI skills are in demand, how to learn them, and how to demonstrate them on your resume and in interviews. You'll also get hands-on practice with tools employers are asking about.</p>
      
      <p>Whether you're job hunting, looking to advance, or just future-proofing your career, this workshop will give you actionable next steps.</p>
    `,
    date: '2025-03-08',
    time: '1:00 PM',
    endTime: '4:00 PM',
    location: 'Newark Workforce Development Center',
    address: '990 Broad Street, Newark, NJ 07102',
    capacity: 45,
    registered: 20,
    tags: ['Careers', 'Workshop', 'Practical'],
    instructor: 'Aisha Williams',
    instructorBio: 'Career coach and former tech recruiter. Aisha helps Newark residents navigate career transitions and skill development.',
    whatYoullLearn: [
      'AI skills employers are hiring for',
      'Free resources for building AI skills',
      'How to describe AI experience on your resume',
      'Answering AI questions in interviews',
      'Certifications that matter (and those that don\'t)',
    ],
    whoShouldAttend: 'Job seekers, career changers, and anyone wanting to stay competitive in the job market.',
    whatToBring: [
      'Laptop or tablet',
      'Current resume (optional, for personalized feedback)',
      'Questions about your specific career goals',
    ],
    featured: true,
  },
  {
    slug: 'seniors-intro-to-ai',
    title: 'AI for Seniors: A Gentle Introduction',
    description: 'A patient, step-by-step introduction to AI designed specifically for older adults. Learn at your own pace in a supportive environment.',
    longDescription: `
      <p>AI can seem intimidating, but it doesn't have to be. This workshop is designed specifically for older adults who want to understand AI at a comfortable pace.</p>
      
      <p>We'll start with the very basics, take plenty of breaks, and make sure everyone feels confident before moving on. Our volunteer assistants will be available for one-on-one help.</p>
      
      <p>No prior computer experience required—just a willingness to learn something new!</p>
    `,
    date: '2025-03-15',
    time: '10:00 AM',
    endTime: '12:30 PM',
    location: 'Newark Senior Center',
    address: '311 Orange Street, Newark, NJ 07103',
    capacity: 20,
    registered: 8,
    tags: ['Seniors', 'Beginner', 'Workshop'],
    instructor: 'Sarah Johnson',
    instructorBio: 'Technology educator specializing in making AI accessible to everyone. Sarah has taught hundreds of seniors in patient, supportive workshops.',
    whatYoullLearn: [
      'What AI is in simple terms',
      'How AI is already in your life (phone, TV, etc.)',
      'Trying a simple AI tool together',
      'Staying safe when using AI',
      'Where to learn more at your own pace',
    ],
    whoShouldAttend: 'Older adults (55+) who are curious about AI but feel unsure where to start. Complete beginners especially welcome.',
    whatToBring: [
      'Reading glasses if you use them',
      'A smartphone or tablet if you have one (not required)',
      'Patience with yourself—learning takes time!',
    ],
  },
  {
    slug: 'ai-healthcare-info-session',
    title: 'AI in Healthcare: What Patients Should Know',
    description: 'Learn how AI is being used in healthcare, what it means for your care, and questions to ask your doctor about AI-assisted diagnosis and treatment.',
    longDescription: `
      <p>AI is increasingly used in healthcare—from analyzing medical images to predicting health risks. As a patient, understanding these tools helps you be an informed participant in your care.</p>
      
      <p>This information session covers how AI is being used in healthcare today, its benefits and limitations, and what questions you might want to ask your healthcare providers.</p>
      
      <p>This is not medical advice—it's education to help you have better conversations with your doctors.</p>
    `,
    date: '2025-03-22',
    time: '6:00 PM',
    endTime: '7:30 PM',
    location: 'Newark Beth Israel Medical Center - Community Room',
    address: '201 Lyons Avenue, Newark, NJ 07112',
    capacity: 60,
    registered: 25,
    tags: ['Healthcare', 'Information', 'Community'],
    instructor: 'Dr. Robert Kim',
    instructorBio: 'Physician and health informatics specialist. Dr. Kim helps patients understand how technology is changing healthcare.',
    whatYoullLearn: [
      'How AI is used in diagnosis and treatment',
      'Benefits and limitations of AI in healthcare',
      'Your rights regarding AI-assisted care',
      'Questions to ask your healthcare providers',
      'Reliable sources for health AI information',
    ],
    whoShouldAttend: 'Anyone interested in understanding AI in healthcare. Particularly valuable for patients managing chronic conditions or those who want to be informed healthcare consumers.',
    whatToBring: [
      'Questions about AI in healthcare',
      'Notepad for taking notes',
    ],
  },
];

// Helper to get a single event by slug
export function getEvent(slug: string): EventFull | null {
  return events.find(event => event.slug === slug) || null;
}

// Helper to get upcoming events (sorted by date)
export function getUpcomingEvents(): EventFull[] {
  const today = new Date().toISOString().split('T')[0];
  return events
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Helper to get featured events
export function getFeaturedEvents(): EventFull[] {
  return events.filter(event => event.featured);
}

// Get all unique tags
export function getAllEventTags(): string[] {
  return Array.from(new Set(events.flatMap(event => event.tags)));
}

// Get events by tag
export function getEventsByTag(tag: string): EventFull[] {
  return events.filter(event => event.tags.includes(tag));
}
