import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card } from './Card';

export interface Event {
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity?: number;
  registered?: number;
  image?: string;
  tags?: string[];
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/events/${event.slug}`} className="block group">
      <article
        className="bg-swiss-white border border-swiss-border h-full flex flex-col hover:border-swiss-black transition-colors"
        data-testid="event-card"
      >
        {/* Swiss Modern accent line */}
        <div className="h-1 bg-swiss-red" />

        <div className="p-6 flex flex-col flex-grow">
          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-caption font-medium bg-swiss-light text-swiss-gray"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className="text-h3 font-semibold text-swiss-black mb-3 group-hover:text-swiss-red transition-colors"
            data-testid="event-title"
          >
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-body-sm text-swiss-gray mb-6 line-clamp-2 flex-grow">
            {event.description}
          </p>

          {/* Meta info */}
          <div className="space-y-2 text-body-sm text-swiss-gray">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 flex-shrink-0 text-swiss-black" aria-hidden="true" />
              <time dateTime={event.date} data-testid="event-date">
                {formattedDate} at {event.time}
              </time>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 flex-shrink-0 text-swiss-black" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
            {event.capacity && (
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 flex-shrink-0 text-swiss-black" aria-hidden="true" />
                <span>
                  {event.registered || 0} / {event.capacity} registered
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-6 pt-4 border-t border-swiss-border flex items-center justify-between">
            <span className="text-body-sm font-medium text-swiss-black group-hover:text-swiss-red transition-colors">
              Learn More
            </span>
            <ArrowRight
              className="w-4 h-4 text-swiss-black group-hover:text-swiss-red group-hover:translate-x-1 transition-all"
              aria-hidden="true"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
