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
    event.tags?.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

export default async function EventsPage() {
  const events = await fetchEvents();
  const allTags = getAllTagsFromEvents(events);
  
  return (
    <div className="min-h-screen bg-swiss-white">
      {/* Hero - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-white border-b border-swiss-border">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h1 className="text-h1 font-bold text-swiss-black mb-6">
                Upcoming Events
              </h1>
              <p className="text-body-lg text-swiss-gray max-w-2xl">
                Free workshops, meetups, and community events. No registration fees, 
                no prerequisites—just bring your curiosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events with Search/Filter */}
      <EventsPageClient events={events} allTags={allTags} />

      {/* Past Events CTA - Swiss Modern */}
      <section className="py-24 lg:py-32 bg-swiss-light">
        <div className="max-w-swiss mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-1 bg-swiss-black mb-6" />
              <h2 className="text-h2 font-bold text-swiss-black mb-4">
                Can&apos;t Make It?
              </h2>
              <p className="text-body-lg text-swiss-gray max-w-lg">
                Many of our workshops are recorded. Check out our vlogs for 
                past content, or join our Discord to stay updated.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/vlogs"
                  className="inline-flex items-center justify-center px-8 py-4 bg-swiss-black text-swiss-white font-medium hover:bg-neutral-800 transition-colors"
                >
                  Watch Recordings
                </a>
                <a
                  href="https://discord.gg/townhall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-swiss-black text-swiss-black font-medium hover:bg-swiss-black hover:text-swiss-white transition-colors"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
