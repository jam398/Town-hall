import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { RegistrationForm } from '@/components/forms/RegistrationForm';

// This would come from API in production
const getEvent = (slug: string) => {
  const events: Record<string, any> = {
    'intro-to-ai-january': {
      slug: 'intro-to-ai-january',
      title: 'Introduction to AI: What Everyone Should Know',
      description: 'A beginner-friendly workshop covering the basics of artificial intelligence, machine learning, and how AI is changing our daily lives.',
      longDescription: `
        <p>Artificial Intelligence is everywhere—from the recommendations on your phone to the tools transforming businesses. But what exactly is AI, and how does it work?</p>
        
        <p>In this beginner-friendly workshop, we'll demystify AI and give you a solid foundation to understand this transformative technology.</p>
        
        <h3>What You'll Learn</h3>
        <ul>
          <li>What AI actually is (and isn't)</li>
          <li>The difference between AI, Machine Learning, and Deep Learning</li>
          <li>Real-world examples of AI in everyday life</li>
          <li>How to start using AI tools safely and effectively</li>
          <li>Common misconceptions and concerns about AI</li>
        </ul>
        
        <h3>Who Should Attend</h3>
        <p>This workshop is perfect for anyone curious about AI, regardless of technical background. Whether you're a complete beginner or just want to fill in some gaps in your knowledge, you'll find value here.</p>
        
        <h3>What to Bring</h3>
        <ul>
          <li>A laptop or tablet (optional but recommended)</li>
          <li>Your questions and curiosity!</li>
        </ul>
      `,
      date: '2025-01-15',
      time: '6:00 PM',
      endTime: '8:00 PM',
      location: 'Newark Public Library',
      address: '5 Washington Street, Newark, NJ 07102',
      capacity: 50,
      registered: 32,
      tags: ['Beginner', 'Workshop'],
      instructor: 'Dr. Sarah Chen',
      instructorBio: 'AI researcher and educator with 10+ years of experience making complex topics accessible.',
    },
  };
  return events[slug] || null;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = getEvent(params.slug);
  if (!event) {
    return { title: 'Event Not Found' };
  }
  return {
    title: event.title,
    description: event.description,
  };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEvent(params.slug);

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
  const calendarDate = event.date.replace(/-/g, '');
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${calendarDate}/${calendarDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.address)}`;

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
                  <button
                    className="block w-full px-4 py-2 text-center bg-gray-100 text-gray-700 font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
                    onClick={() => {
                      // Generate iCal file
                      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${calendarDate}T180000
DTEND:${calendarDate}T200000
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.address}
END:VEVENT
END:VCALENDAR`;
                      const blob = new Blob([icsContent], { type: 'text/calendar' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${event.slug}.ics`;
                      a.click();
                    }}
                  >
                    Download .ics
                  </button>
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
