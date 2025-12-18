import { Event } from '@/lib/api';

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders JSON-LD structured data for SEO
 * Used for rich snippets in search results
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Convert 12-hour time to 24-hour format for ISO 8601
 */
function convertTo24Hour(time: string): string {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return '12:00:00';
  
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3]?.toUpperCase();
  
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
}

/**
 * Generate Event schema for JSON-LD
 * https://schema.org/Event
 */
export function generateEventJsonLd(event: Event, baseUrl: string): Record<string, unknown> {
  const eventUrl = `${baseUrl}/events/${event.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: `${event.date}T${convertTo24Hour(event.time || '12:00 PM')}`,
    endDate: `${event.date}T${convertTo24Hour(event.endTime || '14:00')}`,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Town Hall Newark',
      url: baseUrl,
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: event.registered < event.capacity 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/SoldOut',
      url: eventUrl,
    },
    url: eventUrl,
  };
}

/**
 * Generate Organization schema for JSON-LD
 */
export function generateOrganizationJsonLd(baseUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Town Hall Newark',
    description: "Newark's nonprofit community hub for AI education, workshops, and events.",
    url: baseUrl,
    sameAs: [
      'https://twitter.com/townhallnewark',
      'https://linkedin.com/company/townhallnewark',
      'https://youtube.com/@townhallnewark',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Newark',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
  };
}

/**
 * Generate BlogPosting schema for JSON-LD
 */
export function generateBlogPostJsonLd(
  post: { title: string; excerpt: string; date: string; author: string; slug: string },
  baseUrl: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Town Hall Newark',
      url: baseUrl,
    },
    url: `${baseUrl}/blog/${post.slug}`,
  };
}
