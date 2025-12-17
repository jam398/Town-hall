import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EventCard } from '@/components/ui/EventCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { AccentBar } from '@/components/ui/AccentBar';
import { getEvents, Event } from '@/lib/api';

function EventsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-swiss-light h-48 mb-4" />
          <div className="h-4 bg-swiss-light w-3/4 mb-2" />
          <div className="h-4 bg-swiss-light w-1/2" />
        </div>
      ))}
    </div>
  );
}

async function EventsList() {
  let events: Event[] = [];
  
  try {
    const allEvents = await getEvents();
    events = allEvents.slice(0, 3);
  } catch {
    // Fallback to empty
  }

  if (events.length === 0) {
    return (
      <EmptyState
        variant="events"
        actionLabel="View All Events"
        actionHref="/events"
      />
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.slug} event={event} />
      ))}
    </div>
  );
}

export function EventsSection() {
  return (
    <section className="py-24 lg:py-32 bg-swiss-white">
      <div className="max-w-swiss mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <AccentBar color="red" size="md" className="mb-6" />
            <h2 className="text-h1 font-bold text-swiss-black">
              Upcoming Events
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end lg:items-end">
            <Link 
              href="/events" 
              className="group inline-flex items-center gap-2 text-swiss-black font-medium hover:text-swiss-red transition-colors"
            >
              View All Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <Suspense fallback={<EventsSkeleton />}>
          <EventsList />
        </Suspense>
      </div>
    </section>
  );
}
