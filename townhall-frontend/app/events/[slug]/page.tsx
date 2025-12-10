import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Share2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { RegistrationForm } from '@/components/forms/RegistrationForm';
import { ICalButton } from './ICalButton';
import { getEvent } from '@/lib/api';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await getEvent(params.slug);
  if (!event) {
    return { title: 'Event Not Found' };
  }
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">This event doesn&apos;t exist or has been removed.</p>
          <Link href="/events">
            <Button variant="primary">View All Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const spotsLeft = event.capacity - event.registered;
  const isAlmostFull = spotsLeft <= 10;

  // Generate calendar links
  const calendarDate = event.date?.replace(/-/g, '') || '';
  const eventLocation = event.address || event.location || '';
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${calendarDate}/${calendarDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(eventLocation)}`;

  return (
    <div className="min-h-screen">
      {/* Back link */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-600 hover:text-bauhaus-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Events
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-bauhaus-yellow text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black uppercase mb-6" data-testid="event-title">
              {event.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-bauhaus-blue" aria-hidden="true" />
                <time dateTime={event.date}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-bauhaus-blue" aria-hidden="true" />
                <span>{event.time} - {event.endTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-bauhaus-blue" aria-hidden="true" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Description */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: event.longDescription }}
            />

            {/* What You'll Learn */}
            {event.whatYoullLearn && event.whatYoullLearn.length > 0 && (
              <div className="bg-gray-50 p-6 mb-8 border-l-4 border-bauhaus-blue">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4">
                  What You&apos;ll Learn
                </h2>
                <ul className="space-y-3">
                  {event.whatYoullLearn.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-bauhaus-blue flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Who Should Attend */}
            {event.whoShouldAttend && (
              <div className="mb-8">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4">
                  Who Should Attend
                </h2>
                <p className="text-gray-700">{event.whoShouldAttend}</p>
              </div>
            )}

            {/* What to Bring */}
            {event.whatToBring && event.whatToBring.length > 0 && (
              <div className="bg-bauhaus-yellow/10 p-6 mb-8 border-l-4 border-bauhaus-yellow">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4">
                  What to Bring
                </h2>
                <ul className="space-y-2">
                  {event.whatToBring.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-bauhaus-yellow">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructor */}
            {event.instructor && (
              <div className="border-t-2 border-black pt-8 mt-8">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4">
                  Your Instructor
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-bauhaus-blue flex items-center justify-center text-white font-bold text-xl">
                    {event.instructor.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{event.instructor}</p>
                    <p className="text-gray-600">{event.instructorBio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Share */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5" aria-hidden="true" />
                Share This Event
              </h2>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(`https://townhallnewark.org/events/${event.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
                  aria-label="Share on Twitter"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://townhallnewark.org/events/${event.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
                  aria-label="Share on Facebook"
                >
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://townhallnewark.org/events/${event.slug}`)}&title=${encodeURIComponent(event.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Registration Card */}
              <div className="border-2 border-black p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                    Registration
                  </span>
                  <span className="text-2xl font-black text-bauhaus-blue">FREE</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-gray-500" aria-hidden="true" />
                  <span className={isAlmostFull ? 'text-bauhaus-red font-semibold' : 'text-gray-600'}>
                    {spotsLeft} spots remaining
                  </span>
                </div>

                <div className="w-full bg-gray-200 h-2 mb-6">
                  <div
                    className="bg-bauhaus-blue h-2 transition-all"
                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                  />
                </div>

                <RegistrationForm eventSlug={event.slug} eventTitle={event.title} />
              </div>

              {/* Add to Calendar */}
              <div className="border border-gray-200 p-6">
                <h3 className="font-bold uppercase tracking-wider mb-4">
                  Add to Calendar
                </h3>
                <div className="space-y-2">
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 text-center bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
                  >
                    Google Calendar
                  </a>
                  <ICalButton
                    eventSlug={event.slug}
                    eventTitle={event.title}
                    eventDescription={event.description}
                    eventAddress={event.address}
                    calendarDate={calendarDate}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="border border-gray-200 p-6 mt-6">
                <h3 className="font-bold uppercase tracking-wider mb-4">
                  Location
                </h3>
                <p className="font-semibold">{event.location}</p>
                <p className="text-gray-600 text-sm">{event.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm font-semibold uppercase tracking-wider text-bauhaus-blue hover:text-bauhaus-red transition-colors"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
