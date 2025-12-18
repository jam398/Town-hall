/**
 * n8n Service Tests
 * Tests webhook triggering functionality
 */

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Import after mocking
import { n8nService } from '../../src/services/n8n';

describe('n8nService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.N8N_WEBHOOK_BASE_URL = 'http://localhost:5678/webhook';
    process.env.FRONTEND_URL = 'http://localhost:3000';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('notifyEventPublished', () => {
    it('should trigger webhook with correct payload', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      await n8nService.notifyEventPublished({
        title: 'AI Workshop',
        slug: 'ai-workshop',
        description: 'Learn AI basics',
        date: 'December 20, 2025',
        time: '6:00 PM',
        location: 'Newark Library',
        featuredImage: 'https://example.com/image.jpg',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:5678/webhook/discord-event-published',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('AI Workshop'),
        })
      );
    });

    it('should include registration URL in payload', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      await n8nService.notifyEventPublished({
        title: 'AI Workshop',
        slug: 'ai-workshop',
        description: 'Learn AI',
        date: 'Dec 20',
        time: '6 PM',
        location: 'Newark',
      });

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.registrationUrl).toBe('http://localhost:3000/events/ai-workshop');
    });

    it('should not throw on webhook failure', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500, text: () => 'Server error' });

      // Should not throw
      await expect(
        n8nService.notifyEventPublished({
          title: 'Event',
          slug: 'event',
          description: 'Desc',
          date: 'Date',
          time: 'Time',
          location: 'Location',
        })
      ).resolves.not.toThrow();
    });

    it('should not throw on network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(
        n8nService.notifyEventPublished({
          title: 'Event',
          slug: 'event',
          description: 'Desc',
          date: 'Date',
          time: 'Time',
          location: 'Location',
        })
      ).resolves.not.toThrow();
    });
  });

  describe('notifyBlogPublished', () => {
    it('should trigger webhook with correct payload', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      await n8nService.notifyBlogPublished({
        title: 'New Blog Post',
        slug: 'new-blog-post',
        excerpt: 'This is a great post',
        featuredImage: 'https://example.com/image.jpg',
        author: { name: 'John Doe' },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:5678/webhook/discord-blog-published',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('New Blog Post'),
        })
      );
    });

    it('should include post URL in payload', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      await n8nService.notifyBlogPublished({
        title: 'Post',
        slug: 'my-post',
        excerpt: 'Excerpt',
      });

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.postUrl).toBe('http://localhost:3000/blog/my-post');
    });
  });

  describe('notifyVolunteerSignup', () => {
    it('should trigger webhook with volunteer data', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });

      await n8nService.notifyVolunteerSignup({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        interest: 'teaching',
        motivation: 'I want to help the community',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:5678/webhook/discord-volunteer-signup',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('John'),
        })
      );

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.firstName).toBe('John');
      expect(callBody.lastName).toBe('Doe');
      expect(callBody.interest).toBe('teaching');
    });
  });
});
