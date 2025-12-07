export interface Event {
  _id: string;
  _type: 'event';
  slug: { current: string };
  title: string;
  description: string;
  longDescription?: any;
  whatYouWillLearn?: string[];
  dateTime: string;
  endTime?: string;
  location: string;
  address?: string;
  maxAttendees: number;
  registrationDeadline?: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  tags?: string[];
  featuredImage?: any;
  instructor?: string;
  instructorBio?: string;
}

export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  slug: { current: string };
  title: string;
  excerpt: string;
  body?: any;
  content?: any;
  author: Author | string;
  publishedAt?: string;
  status: 'draft' | 'ready' | 'published';
  tags?: string[];
  categories?: string[];
  featuredImage?: any;
  mainImage?: any;
  readTime?: string;
  seo?: any;
}

export interface VlogPost {
  _id: string;
  _type: 'vlogPost';
  slug: { current: string };
  title: string;
  description?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  thumbnail?: any;
  duration?: string;
  publishedAt: string;
  transcript?: any;
  summary?: string;
  tags?: string[];
  status: 'draft' | 'published';
}

export interface Registration {
  _id: string;
  _type: 'registration';
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  event: Event | string;
  registeredAt: string;
  attended?: boolean;
  confirmationSent?: boolean;
  hubspotContactId?: string;
}

export interface Volunteer {
  _id: string;
  _type: 'volunteer';
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest: string;
  availability?: string;
  experience?: string;
  motivation: string;
  status?: 'pending' | 'approved' | 'active' | 'inactive';
  appliedAt?: string;
  confirmationSent?: boolean;
  hubspotContactId?: string;
}

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  bio?: string;
  avatar?: any;
  image?: any;
  role?: 'staff' | 'volunteer' | 'guest';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  eventSlug: string;
}

export interface VolunteerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest: string;
  availability?: string;
  experience?: string;
  motivation: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}
