import Link from 'next/link';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import { Event } from '@/lib/api';

interface FeaturedEventProps {
  event: Event;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
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
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </div>
        </div>
      </article>
    </Link>
  );
}
