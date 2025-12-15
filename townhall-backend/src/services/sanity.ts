import { createClient, SanityClient } from '@sanity/client';
import { Event, BlogPost, VlogPost, Registration, Volunteer } from '../types';

// Create client lazily to ensure env vars are loaded first
let client: SanityClient | null = null;

function getClient(): SanityClient {
  if (!client) {
    console.log('🔧 Creating Sanity client with dataset:', process.env.SANITY_DATASET);
    client = createClient({
      projectId: process.env.SANITY_PROJECT_ID || 'pvm742xo',
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
      token: process.env.SANITY_TOKEN,
      useCdn: false, // Use false for write operations
    });
  }
  return client;
}

// Helper to convert portable text to HTML (simple version)
function portableTextToHtml(blocks: any[]): string {
  if (!blocks) return '';
  return blocks
    .map((block: any) => {
      if (block._type === 'block') {
        const text = block.children?.map((child: any) => child.text).join('') || '';
        return `<p>${text}</p>`;
      }
      return '';
    })
    .join('\n');
}

export const sanityService = {
  // Events
  async getEvents(): Promise<Event[]> {
    const query = `*[_type == "event" && status == "published" && dateTime >= now()] | order(dateTime asc) {
      _id,
      title,
      slug,
      description,
      dateTime,
      endTime,
      location,
      address,
      maxAttendees,
      tags,
      featuredImage,
      instructor
    }`;
    return getClient().fetch(query);
  },

  async getEventBySlug(slug: string): Promise<Event | null> {
    const query = `*[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      longDescription,
      whatYouWillLearn,
      dateTime,
      endTime,
      location,
      address,
      maxAttendees,
      registrationDeadline,
      status,
      tags,
      featuredImage,
      instructor,
      instructorBio
    }`;
    return getClient().fetch(query, { slug });
  },

  async getEventRegistrationCount(eventId: string): Promise<number> {
    const query = `count(*[_type == "registration" && references($eventId)])`;
    return getClient().fetch(query, { eventId });
  },

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    const query = `*[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      tags,
      featuredImage,
      readTime,
      "author": author->name
    }`;
    return getClient().fetch(query);
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      tags,
      featuredImage,
      readTime,
      "author": author->{name, bio, avatar}
    }`;
    return getClient().fetch(query, { slug });
  },

  async createBlogPost(data: Partial<BlogPost>): Promise<BlogPost> {
    const doc = {
      _type: 'blogPost' as const,
      ...data,
    };
    return getClient().create(doc) as Promise<BlogPost>;
  },

  // Vlog Posts
  async getVlogPosts(): Promise<VlogPost[]> {
    const query = `*[_type == "vlogPost" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      youtubeId,
      "youtubeUrl": "https://www.youtube.com/watch?v=" + youtubeId,
      thumbnail,
      duration,
      publishedAt,
      summary,
      tags
    }`;
    return getClient().fetch(query);
  },

  // Registrations
  async createRegistration(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    eventId: string;
  }): Promise<Registration> {
    const doc = {
      _type: 'registration' as const,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      event: {
        _type: 'reference',
        _ref: data.eventId,
      },
      registeredAt: new Date().toISOString(),
      attended: false,
      confirmationSent: false,
    };
    return getClient().create(doc) as unknown as Promise<Registration>;
  },

  async checkExistingRegistration(email: string, eventId: string): Promise<boolean> {
    const query = `count(*[_type == "registration" && email == $email && references($eventId)]) > 0`;
    return getClient().fetch(query, { email, eventId });
  },

  async updateRegistration(id: string, data: Partial<Registration>): Promise<Registration> {
    return getClient().patch(id).set(data).commit();
  },

  // Volunteers
  async createVolunteer(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    interest: string;
    availability?: string;
    experience?: string;
    motivation: string;
  }): Promise<Volunteer> {
    const doc = {
      _type: 'volunteer' as const,
      ...data,
      status: 'pending' as const,
      appliedAt: new Date().toISOString(),
    };
    return getClient().create(doc) as Promise<Volunteer>;
  },

  async updateVolunteer(id: string, data: Partial<Volunteer>): Promise<Volunteer> {
    return getClient().patch(id).set(data).commit();
  },

  // Utility
  portableTextToHtml,
};
