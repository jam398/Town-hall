import '@testing-library/jest-dom';
import {
  ApiError,
  getEvents,
  getEvent,
  registerForEvent,
  getBlogPosts,
  getBlogPost,
  getVlogs,
  submitVolunteerForm,
  submitContactForm,
  subscribeNewsletter,
} from '@/lib/api';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ApiError', () => {
    it('creates error with message and status', () => {
      const error = new ApiError('Not found', 404);
      
      expect(error.message).toBe('Not found');
      expect(error.status).toBe(404);
      expect(error.name).toBe('ApiError');
    });

    it('creates error with optional code', () => {
      const error = new ApiError('Validation failed', 400, 'VALIDATION_ERROR');
      
      expect(error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('getEvents', () => {
    it('fetches events successfully', async () => {
      const mockEvents = [
        { slug: 'event-1', title: 'Event 1' },
        { slug: 'event-2', title: 'Event 2' },
      ];
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockEvents),
      });

      const events = await getEvents();
      
      expect(events).toEqual(mockEvents);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/events'),
        expect.any(Object)
      );
    });

    it('throws ApiError on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'Server error' }),
      });

      await expect(getEvents()).rejects.toThrow(ApiError);
    });
  });

  describe('getEvent', () => {
    it('fetches single event by slug', async () => {
      const mockEvent = { slug: 'test-event', title: 'Test Event' };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockEvent),
      });

      const event = await getEvent('test-event');
      
      expect(event).toEqual(mockEvent);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/events/test-event'),
        expect.any(Object)
      );
    });

    it('returns null for 404', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not found' }),
      });

      const event = await getEvent('non-existent');
      
      expect(event).toBeNull();
    });

    it('throws for other errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'Server error' }),
      });

      await expect(getEvent('test')).rejects.toThrow(ApiError);
    });
  });

  describe('registerForEvent', () => {
    it('submits registration data', async () => {
      const registrationData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        eventSlug: 'test-event',
      };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Registered' }),
      });

      const result = await registerForEvent(registrationData);
      
      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/events/register'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(registrationData),
        })
      );
    });
  });

  describe('getBlogPosts', () => {
    it('fetches blog posts successfully', async () => {
      const mockPosts = [
        { slug: 'post-1', title: 'Post 1' },
        { slug: 'post-2', title: 'Post 2' },
      ];
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

      const posts = await getBlogPosts();
      
      expect(posts).toEqual(mockPosts);
    });
  });

  describe('getBlogPost', () => {
    it('fetches single blog post by slug', async () => {
      const mockPost = { slug: 'test-post', title: 'Test Post' };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPost),
      });

      const post = await getBlogPost('test-post');
      
      expect(post).toEqual(mockPost);
    });

    it('returns null for 404', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not found' }),
      });

      const post = await getBlogPost('non-existent');
      
      expect(post).toBeNull();
    });
  });

  describe('getVlogs', () => {
    it('fetches vlogs successfully', async () => {
      const mockVlogs = [
        { id: '1', title: 'Vlog 1' },
        { id: '2', title: 'Vlog 2' },
      ];
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockVlogs),
      });

      const vlogs = await getVlogs();
      
      expect(vlogs).toEqual(mockVlogs);
    });
  });

  describe('submitVolunteerForm', () => {
    it('submits volunteer data', async () => {
      const volunteerData = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        interest: 'event-support',
        motivation: 'I want to help',
      };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Submitted' }),
      });

      const result = await submitVolunteerForm(volunteerData);
      
      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/volunteer'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  describe('submitContactForm', () => {
    it('submits contact data', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'general',
        message: 'Hello!',
      };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Sent' }),
      });

      const result = await submitContactForm(contactData);
      
      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/contact'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  describe('subscribeNewsletter', () => {
    it('submits newsletter subscription', async () => {
      const newsletterData = { email: 'subscriber@example.com' };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Subscribed' }),
      });

      const result = await subscribeNewsletter(newsletterData);
      
      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/newsletter'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  describe('Error handling', () => {
    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getEvents()).rejects.toThrow('Network error');
    });

    it('handles JSON parse errors in error response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      await expect(getEvents()).rejects.toThrow(ApiError);
    });

    it('sets default error message when none provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      });

      try {
        await getEvents();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toBe('An error occurred');
      }
    });
  });

  describe('Request headers', () => {
    it('includes Content-Type header', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

      await getEvents();
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });
});
