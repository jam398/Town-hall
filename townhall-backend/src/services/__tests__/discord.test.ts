/**
 * Discord Service Tests
 */

import { discordService } from '../discord';

// Mock fetch globally
global.fetch = jest.fn();

describe('Discord Service', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Set up environment variables
    process.env.DISCORD_EVENTS_WEBHOOK_URL = 'https://discord.com/api/webhooks/events/test';
    process.env.DISCORD_ANNOUNCEMENTS_WEBHOOK_URL = 'https://discord.com/api/webhooks/announcements/test';
    process.env.DISCORD_VOLUNTEERS_WEBHOOK_URL = 'https://discord.com/api/webhooks/volunteers/test';
    process.env.FRONTEND_URL = 'http://localhost:3002';
  });

  afterEach(() => {
    delete process.env.DISCORD_EVENTS_WEBHOOK_URL;
    delete process.env.DISCORD_ANNOUNCEMENTS_WEBHOOK_URL;
    delete process.env.DISCORD_VOLUNTEERS_WEBHOOK_URL;
    delete process.env.FRONTEND_URL;
  });

  describe('sendEventNotification', () => {
    it('should send event notification with all fields', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        text: async () => '',
      } as Response);

      const event = {
        title: 'AI Workshop',
        slug: 'ai-workshop',
        description: 'Learn about AI fundamentals',
        date: '2025-12-20',
        time: '6:00 PM',
        location: 'Newark Public Library',
        featuredImage: 'https://example.com/image.jpg',
      };

      await discordService.sendEventNotification(event);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://discord.com/api/webhooks/events/test',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('AI Workshop'),
        })
      );

      const call = mockFetch.mock.calls[0];
      const body = JSON.parse(call[1]?.body as string);
      
      expect(body.content).toBe('🎉 **New Event Published!**');
      expect(body.embeds[0].title).toBe('AI Workshop');
      expect(body.embeds[0].description).toBe('Learn about AI fundamentals');
      expect(body.embeds[0].color).toBe(16739125); // #FF6B35 in decimal
      expect(body.embeds[0].fields).toHaveLength(3);
      expect(body.embeds[0].fields[0].name).toBe('📅 Date & Time');
      expect(body.embeds[0].fields[0].value).toBe('2025-12-20 at 6:00 PM');
      expect(body.embeds[0].fields[1].name).toBe('📍 Location');
      expect(body.embeds[0].fields[1].value).toBe('Newark Public Library');
      expect(body.embeds[0].fields[2].name).toBe('👉 Register');
      expect(body.embeds[0].image.url).toBe('https://example.com/image.jpg');
    });

    it('should send event notification without featured image', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        text: async () => '',
      } as Response);

      const event = {
        title: 'AI Workshop',
        slug: 'ai-workshop',
        description: 'Learn about AI',
        date: '2025-12-20',
        time: '6:00 PM',
        location: 'Newark Public Library',
      };

      await discordService.sendEventNotification(event);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const call = mockFetch.mock.calls[0];
      const body = JSON.parse(call[1]?.body as string);
      
      expect(body.embeds[0].image).toBeUndefined();
    });

    it('should handle missing webhook URL gracefully', async () => {
      delete process.env.DISCORD_EVENTS_WEBHOOK_URL;

      const event = {
        title: 'AI Workshop',
        slug: 'ai-workshop',
        description: 'Learn about AI',
        date: '2025-12-20',
        time: '6:00 PM',
        location: 'Newark Public Library',
      };

      await expect(discordService.sendEventNotification(event)).resolves.not.toThrow();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle Discord API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => 'Bad Request',
      } as Response);

      const event = {
        title: 'AI Workshop',
        slug: 'ai-workshop',
        description: 'Learn about AI',
        date: '2025-12-20',
        time: '6:00 PM',
        location: 'Newark Public Library',
      };

      // Should not throw, errors are logged
      await expect(discordService.sendEventNotification(event)).resolves.not.toThrow();
    });
  });

  describe('sendBlogNotification', () => {
    it('should send blog notification with author', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        text: async () => '',
      } as Response);

      const post = {
        title: 'Understanding Machine Learning',
        slug: 'understanding-ml',
        excerpt: 'A beginner-friendly guide to ML concepts',
        featuredImage: 'https://example.com/ml-image.jpg',
        author: { name: 'Jane Doe' },
      };

      await discordService.sendBlogNotification(post);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const call = mockFetch.mock.calls[0];
      const body = JSON.parse(call[1]?.body as string);
      
      expect(body.content).toBe('📝 **New Blog Post Published!**');
      expect(body.embeds[0].title).toBe('Understanding Machine Learning');
      expect(body.embeds[0].description).toBe('A beginner-friendly guide to ML concepts');
      expect(body.embeds[0].color).toBe(5164484); // #4ECDC4 in decimal
      expect(body.embeds[0].fields[0].name).toBe('✍️ Author');
      expect(body.embeds[0].fields[0].value).toBe('Jane Doe');
      expect(body.embeds[0].image.url).toBe('https://example.com/ml-image.jpg');
    });

    it('should send blog notification without author', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        text: async () => '',
      } as Response);

      const post = {
        title: 'Understanding Machine Learning',
        slug: 'understanding-ml',
        excerpt: 'A beginner-friendly guide to ML concepts',
      };

      await discordService.sendBlogNotification(post);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const call = mockFetch.mock.calls[0];
      const body = JSON.parse(call[1]?.body as string);
      
      expect(body.embeds[0].fields).toHaveLength(1); // Only "Read More" field
      expect(body.embeds[0].fields[0].name).toBe('👉 Read More');
    });

    it('should handle missing webhook URL gracefully', async () => {
      delete process.env.DISCORD_ANNOUNCEMENTS_WEBHOOK_URL;

      const post = {
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'Test excerpt',
      };

      await expect(discordService.sendBlogNotification(post)).resolves.not.toThrow();
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('sendVolunteerNotification', () => {
    it('should send volunteer notification', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        text: async () => '',
      } as Response);

      const volunteer = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@example.com',
        interest: 'Event Planning',
        motivation: 'I want to help organize community events',
      };

      await discordService.sendVolunteerNotification(volunteer);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://discord.com/api/webhooks/volunteers/test',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const call = mockFetch.mock.calls[0];
      const body = JSON.parse(call[1]?.body as string);
      
      expect(body.content).toBe('🙋 **New Volunteer Application!**');
      expect(body.embeds[0].title).toBe('John Smith');
      expect(body.embeds[0].description).toBe('I want to help organize community events');
      expect(body.embeds[0].color).toBe(9822675); // #95E1D3 in decimal
      expect(body.embeds[0].fields[0].name).toBe('📧 Email');
      expect(body.embeds[0].fields[0].value).toBe('john@example.com');
      expect(body.embeds[0].fields[1].name).toBe('💡 Interested In');
      expect(body.embeds[0].fields[1].value).toBe('Event Planning');
      expect(body.embeds[0].fields[2].name).toBe('📋 Next Steps');
    });

    it('should handle missing webhook URL gracefully', async () => {
      delete process.env.DISCORD_VOLUNTEERS_WEBHOOK_URL;

      const volunteer = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@example.com',
        interest: 'Event Planning',
        motivation: 'I want to help',
      };

      await expect(discordService.sendVolunteerNotification(volunteer)).resolves.not.toThrow();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle network errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const volunteer = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@example.com',
        interest: 'Event Planning',
        motivation: 'I want to help',
      };

      // Should not throw, errors are logged
      await expect(discordService.sendVolunteerNotification(volunteer)).resolves.not.toThrow();
    });
  });
});
