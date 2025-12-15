import { Metadata } from 'next';
import Link from 'next/link';
import { Event } from '@/components/ui/EventCard';
import { EventsPageClient } from './EventsPageClient';
import { getEvents } from '@/lib/api';
import { ArrowRight, Calendar, MapPin, Users, Clock } from 'lucide-react';

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

// Featured Event Card - Large format
function FeaturedEvent({ event }: { event: Event }) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <article className="grid lg:grid-cols-12 gap-0 bg-swiss-black overflow-hidden">
        {/* Date display area */}
        <div className="lg:col-span-4 relative aspect-video lg:aspect-auto lg:min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
          {/* Large date display - Swiss Modern typographic element */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <span className="text-caption font-medium text-swiss-red tracking-widest mb-2">
              {month}
            </span>
            <span className="text-[100px] lg:text-[140px] font-bold text-white leading-none">
              {day}
            </span>
          </div>
          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {event.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-swiss-red text-swiss-white text-caption font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="absolute top-0 right-0 w-px h-full bg-neutral-700 hidden lg:block" />
        </div>
        
        {/* Content area */}
        <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-12 h-1 bg-swiss-red mb-6" />
          <p className="text-caption font-medium text-swiss-red mb-4 tracking-wide">
            NEXT EVENT
          </p>
          <h2 className="text-h2 lg:text-h1 font-bold text-swiss-white mb-4 group-hover:text-swiss-red transition-colors line-clamp-2">
            {event.title}
          </h2>
          <p className="text-body text-neutral-400 mb-6 line-clamp-2">
            {event.description}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-body-sm text-neutral-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-swiss-red" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-swiss-red" aria-hidden="true" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-swiss-red" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-swiss-white group-hover:text-swiss-red transition-colors">
            <span className="font-medium">Register Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}

// Stats component
function EventStats({ events }: { events: Event[] }) {
  const totalEvents = events.length;
  const totalCapacity = events.reduce((sum, e) => sum + (e.capacity || 0), 0);
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-swiss-border">
      {[
        { value: totalEvents, label: 'Upcoming Events' },
        { value: totalCapacity || '∞', label: 'Available Spots' },
        { value: '100%', label: 'Free to Attend' },
        { value: 'Weekly', label: 'New Events' },
      ].map((stat, index) => (
        <div key={index} className="bg-swiss-white p-6 lg:p-8 text-center">
          <p className="text-h2 lg:text-h1 font-bold text-swiss-black mb-1">{stat.value}</p>
          <p className="text-body-sm text-swiss-gray">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default async function EventsPage() {
  const events = await fetchEvents();
  const allTags = getAllTagsFromEvents(events);
  const featuredEvent = events[0];
  const remainingEvents = events.slice(1);
  
  return (
    <div className="min-h-screen bg-swiss-white">
      {/* Hero with Featured Event - Swiss Modern */}
      <section className="bg-swiss-white">
        <div className="max-w-swiss mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-6">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h1 className="text-display font-bold text-swiss-black mb-6">
                Events
              </h1>
            </div>
            <div className="lg:col-span-6 flex items-end">
              <p className="text-body-lg text-swiss-gray">
                Free workshops, meetups, and community events. No registration fees, 
                no prerequisites—just bring your curiosity.
              </p>
            </div>
          </div>
        </div>
        
        {/* Featured Event */}
        {featuredEvent && (
          <div className="max-w-swiss mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
            <FeaturedEvent event={featuredEvent} />
          </div>
        )}
      </section>

      {/* Stats Bar */}
      {events.length > 0 && (
        <section className="border-y border-swiss-border">
          <div className="max-w-swiss mx-auto">
            <EventStats events={events} />
          </div>
        </section>
      )}

      {/* Events with Search/Filter */}
      <EventsPageClient events={remainingEvents} allTags={allTags} />

      {/* Past Events CTA - Swiss Modern with visual enhancement */}
      <section className="relative py-24 lg:py-32 bg-swiss-light overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-swiss-border/50 to-transparent" />
        
        <div className="max-w-swiss mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="w-12 h-1 bg-swiss-red mb-6" />
              <h2 className="text-h1 font-bold text-swiss-black mb-4">
                Can&apos;t Make It?
              </h2>
              <p className="text-body-lg text-swiss-gray max-w-lg mb-8">
                Many of our workshops are recorded. Check out our vlogs for 
                past content, or join our Discord to stay updated.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/vlogs"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-swiss-black text-swiss-white font-medium hover:bg-neutral-800 transition-colors group"
                >
                  Watch Recordings
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
            <div className="lg:col-span-5 hidden lg:flex justify-end">
              {/* Decorative calendar element */}
              <div className="w-48 h-48 border-2 border-swiss-border flex items-center justify-center">
                <Calendar className="w-20 h-20 text-swiss-border" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
