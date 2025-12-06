import { Metadata } from 'next';
import { EventCard, Event } from '@/components/ui/EventCard';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming AI workshops, meetups, and community events at Town Hall Newark. Free and open to everyone.',
};

// Mock data - will be replaced with API calls
const events: Event[] = [
  {
    slug: 'intro-to-ai-january',
    title: 'Introduction to AI: What Everyone Should Know',
    description: 'A beginner-friendly workshop covering the basics of artificial intelligence, machine learning, and how AI is changing our daily lives. No technical background required!',
    date: '2025-01-15',
    time: '6:00 PM',
    location: 'Newark Public Library',
    capacity: 50,
    registered: 32,
    tags: ['Beginner', 'Workshop'],
  },
  {
    slug: 'ai-for-small-business',
    title: 'AI Tools for Small Business Owners',
    description: 'Learn practical AI tools that can help automate tasks, improve customer service, and grow your small business. Hands-on demonstrations included.',
    date: '2025-01-22',
    time: '7:00 PM',
    location: 'Newark Innovation Center',
    capacity: 30,
    registered: 18,
    tags: ['Business', 'Practical'],
  },
  {
    slug: 'community-ai-showcase',
    title: 'Community AI Showcase',
    description: 'See what your neighbors are building! Local community members present their AI projects and share their learning journeys. Networking and refreshments provided.',
    date: '2025-02-01',
    time: '5:00 PM',
    location: 'Town Hall Community Space',
    capacity: 100,
    registered: 45,
    tags: ['Community', 'Showcase'],
  },
  {
    slug: 'ai-art-workshop',
    title: 'Creating Art with AI',
    description: 'Explore the creative side of AI! Learn to use tools like DALL-E and Midjourney to create stunning artwork. All skill levels welcome.',
    date: '2025-02-08',
    time: '2:00 PM',
    location: 'Newark Arts Center',
    capacity: 25,
    registered: 12,
    tags: ['Creative', 'Workshop'],
  },
  {
    slug: 'ai-ethics-discussion',
    title: 'AI Ethics: A Community Discussion',
    description: 'Join us for an open discussion about the ethical implications of AI in our society. Share your thoughts and concerns in a safe, moderated environment.',
    date: '2025-02-15',
    time: '6:30 PM',
    location: 'Town Hall Community Space',
    capacity: 40,
    registered: 22,
    tags: ['Discussion', 'Ethics'],
  },
  {
    slug: 'chatgpt-deep-dive',
    title: 'ChatGPT Deep Dive: Advanced Prompting',
    description: 'Already familiar with ChatGPT? Take your skills to the next level with advanced prompting techniques, custom instructions, and real-world applications.',
    date: '2025-02-22',
    time: '7:00 PM',
    location: 'Newark Public Library',
    capacity: 35,
    registered: 28,
    tags: ['Intermediate', 'ChatGPT'],
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        {/* Bauhaus decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-bauhaus-blue/20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-bauhaus-red/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-sm font-bold uppercase tracking-widest text-bauhaus-yellow mb-4">
            Learn & Connect
          </p>
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Free workshops, meetups, and community events. No registration fees, 
            no prerequisites—just bring your curiosity.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 flex items-center justify-center">
                <span className="text-4xl">📅</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">No Upcoming Events</h2>
              <p className="text-gray-600 mb-6">
                Check back soon for new workshops and meetups!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">
            Can&apos;t Make It?
          </h2>
          <p className="text-gray-600 mb-6">
            Many of our workshops are recorded. Check out our blog and vlogs for 
            past content, or join our Discord to stay updated on future events.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/vlogs"
              className="px-6 py-3 bg-bauhaus-blue text-white font-semibold uppercase tracking-wider hover:bg-blue-800 transition-colors"
            >
              Watch Recordings
            </a>
            <a
              href="https://discord.gg/townhall"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
