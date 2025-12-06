/**
 * Town Hall API Client
 * 
 * Centralized API client for all backend communication.
 * Uses environment variable for API URL configuration.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types
export interface Event {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  address?: string;
  capacity: number;
  registered: number;
  tags: string[];
  image?: string;
  instructor?: string;
  instructorBio?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  authorBio?: string;
  tags: string[];
  image?: string;
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

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || 'An error occurred',
      response.status,
      errorData.code
    );
  }

  return response.json();
}

// Events API
export async function getEvents(): Promise<Event[]> {
  return apiRequest<Event[]>('/events');
}

export async function getEvent(slug: string): Promise<Event | null> {
  try {
    return await apiRequest<Event>(`/events/${slug}`);
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

// Blog API
export async function getBlogPosts(): Promise<BlogPost[]> {
  return apiRequest<BlogPost[]>('/blog');
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await apiRequest<BlogPost>(`/blog/${slug}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Vlogs API
export async function getVlogs(): Promise<Vlog[]> {
  return apiRequest<Vlog[]>('/vlogs');
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
