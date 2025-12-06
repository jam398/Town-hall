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
      <Card
        variant="outlined"
        padding="none"
        interactive
        className="overflow-hidden h-full"
        data-testid="event-card"
      >
        {/* Color accent bar */}
        <div className="h-2 bg-bauhaus-blue group-hover:bg-bauhaus-red transition-colors" />

        <div className="p-6">
          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3
            className="text-xl font-bold text-gray-900 mb-2 group-hover:text-bauhaus-blue transition-colors"
            data-testid="event-title"
          >
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Meta info */}
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <time dateTime={event.date} data-testid="event-date">
                {formattedDate} at {event.time}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
            {event.capacity && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>
                  {event.registered || 0} / {event.capacity} registered
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wider text-bauhaus-blue group-hover:text-bauhaus-red transition-colors">
              Learn More
            </span>
            <ArrowRight
              className="w-4 h-4 text-bauhaus-blue group-hover:text-bauhaus-red group-hover:translate-x-1 transition-all"
              aria-hidden="true"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
