import { Metadata } from 'next';
import { Event } from '@/components/ui/EventCard';
import { EventsPageClient } from './EventsPageClient';
import { getEvents } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming AI workshops, meetups, and community events at Town Hall Newark. Free and open to everyone.',
};

// Fetch events from backend API
async function fetchEvents() {
  try {
    const apiEvents = await getEvents();
    return apiEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Get all unique tags from events
function getAllTagsFromEvents(events: Event[]): string[] {
  const tagsSet = new Set<string>();
  events.forEach(event => {
    event.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

export default async function EventsPage() {
  const events = await fetchEvents();
  const allTags = getAllTagsFromEvents(events);
  
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

      {/* Events with Search/Filter */}
      <EventsPageClient events={events} allTags={allTags} />

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
