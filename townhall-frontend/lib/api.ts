/**
 * Town Hall API Client
 * 
 * Centralized API client for all backend communication.
 * Uses environment variable for API URL configuration.
 */

// Production Render backend URL as fallback if env var not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://townhall-backend-vpyh.onrender.com/api';

// Debug: Log API URL on startup (server-side only)
if (typeof window === 'undefined') {
  console.log('[API] Server-side API_URL:', API_URL);
}

// Types
export interface Event {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  whatYouWillLearn?: string[];
  whoShouldAttend?: string;
  whatToBring?: string[];
  date: string;
  time: string;
  endTime?: string;
  location: string;
  address?: string;
  capacity: number;
  registered: number;
  tags?: string[];
  image?: string;
  instructor?: string;
  instructorBio?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: any; // Portable Text blocks or HTML string
  date: string;
  author: string | { name: string; bio?: string; avatar?: string };
  authorBio?: string;
  tags?: string[];
  image?: string;
  readTime?: string;
}

interface SanityBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
    bio?: string;
    avatar?: string;
  } | null;
  mainImage?: string;
  body?: any; // Portable Text blocks or HTML string
  content?: any; // Alternative name for body
  categories?: string[];
  tags: string[];
  readTime?: string;
}

export interface Vlog {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  date: string;
  youtubeId: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  eventSlug: string;
}

export interface VolunteerData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest: string;
  availability?: string;
  experience?: string;
  motivation: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

// Validation error detail from backend
export interface ValidationErrorDetail {
  field: string;
  message: string;
}

// API Error class with enhanced error handling
export class ApiError extends Error {
  public details?: ValidationErrorDetail[];
  
  constructor(
    message: string,
    public status: number,
    public code?: string,
    details?: ValidationErrorDetail[]
  ) {
    super(message);
    this.name = 'ApiError';
    this.details = details;
  }

  /**
   * Get a user-friendly error message based on error code/status
   */
  getUserMessage(): string {
    // Rate limiting
    if (this.status === 429 || this.code === 'RATE_LIMITED') {
      return 'Too many attempts. Please wait a minute and try again.';
    }
    
    // Validation errors - show first field error or generic
    if (this.status === 400 || this.code === 'VALIDATION_ERROR') {
      if (this.details && this.details.length > 0) {
        return this.details[0].message;
      }
      return 'Please check your input and try again.';
    }
    
    // Auth errors
    if (this.status === 401 || this.status === 403) {
      return 'You are not authorized to perform this action.';
    }
    
    // Not found
    if (this.status === 404) {
      return 'The requested resource was not found.';
    }
    
    // Server errors
    if (this.status >= 500) {
      return 'Our server is having issues. Please try again later.';
    }
    
    // Default to the message from backend or generic
    return this.message || 'Something went wrong. Please try again.';
  }
}

// Cache configuration for different request types
const CACHE_CONFIG = {
  // Static content - cache for 5 minutes, revalidate in background
  static: { next: { revalidate: 300 } } as RequestInit,
  // Dynamic content - cache for 1 minute
  dynamic: { next: { revalidate: 60 } } as RequestInit,
  // No cache for mutations
  mutation: { cache: 'no-store' } as RequestInit,
} as const;

type CacheStrategy = keyof typeof CACHE_CONFIG;

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  cacheStrategy: CacheStrategy = 'dynamic'
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  // Debug logging
  console.log(`[API] Fetching: ${url}`);
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Apply cache strategy for GET requests, no-store for mutations
  const cacheConfig = options.method && options.method !== 'GET' 
    ? CACHE_CONFIG.mutation 
    : CACHE_CONFIG[cacheStrategy];

  let response: Response;
  try {
    response = await fetch(url, {
      ...cacheConfig,
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });
  } catch (fetchError) {
    console.error(`[API] Network error fetching ${url}:`, fetchError);
    throw new ApiError(
      `Network error: Unable to connect to API at ${url}`,
      0,
      'NETWORK_ERROR'
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.error || errorData.message || 'An error occurred',
      response.status,
      errorData.code,
      errorData.details
    );
  }

  return response.json();
}

// Events API
export async function getEvents(): Promise<Event[]> {
  const response = await apiRequest<{ events: Event[] }>('/events', {}, 'dynamic');
  return response.events;
}

export async function getEvent(slug: string): Promise<Event | null> {
  try {
    const response = await apiRequest<{ event: Event }>(`/events/${slug}`);
    return response.event;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function registerForEvent(data: RegistrationData): Promise<{ success: boolean; message: string }> {
  return apiRequest('/events/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Helper to convert Sanity blog post format to frontend format
function mapSanityBlogPost(post: SanityBlogPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content || post.body, // Try 'content' first (from backend), then 'body'
    date: post.publishedAt,
    author: post.author || 'Town Hall Team', // Keep full author object or string fallback
    tags: post.tags || [],
    image: post.mainImage,
    readTime: post.readTime,
  };
}

// Blog API
export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await apiRequest<{ posts: SanityBlogPost[] }>('/blog', {}, 'static');
  return response.posts.map(mapSanityBlogPost);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await apiRequest<{ post: SanityBlogPost }>(`/blog/${slug}`);
    return mapSanityBlogPost(response.post);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Vlogs API
export async function getVlogs(): Promise<Vlog[]> {
  const response = await apiRequest<{ vlogs: Vlog[] }>('/vlogs', {}, 'static');
  return response.vlogs;
}

// Forms API
export async function submitVolunteerForm(data: VolunteerData): Promise<{ success: boolean; message: string }> {
  return apiRequest('/volunteer', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function submitContactForm(data: ContactData): Promise<{ success: boolean; message: string }> {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function subscribeNewsletter(data: NewsletterData): Promise<{ success: boolean; message: string }> {
  return apiRequest('/newsletter', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
