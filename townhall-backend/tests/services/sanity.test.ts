// Mock Sanity client first before any imports
const mockFetch = jest.fn();
const mockCreate = jest.fn();
const mockCommit = jest.fn();
const mockSet = jest.fn().mockReturnThis();
const mockPatch = jest.fn();

jest.mock('@sanity/client', () => ({
  createClient: jest.fn(() => ({
    fetch: mockFetch,
    create: mockCreate,
    patch: mockPatch,
  })),
}));

// Import after mock
import { sanityService } from '../../src/services/sanity';

describe('Sanity Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPatch.mockReturnValue({
      set: mockSet.mockReturnThis(),
      commit: mockCommit.mockResolvedValue({}),
    });
  });

  describe('getEvents', () => {
    it('should return list of published events', async () => {
      const mockEvents = [
        {
          _id: '1',
          title: 'AI Workshop',
          slug: { current: 'ai-workshop' },
          dateTime: '2025-12-15T18:00:00Z',
        },
      ];

      mockFetch.mockResolvedValue(mockEvents);

      const result = await sanityService.getEvents();

      expect(result).toEqual(mockEvents);
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('event'));
    });
  });

  describe('getEventBySlug', () => {
    it('should return event for valid slug', async () => {
      const mockEvent = {
        _id: '1',
        title: 'AI Workshop',
        slug: { current: 'ai-workshop' },
      };

      mockFetch.mockResolvedValue(mockEvent);

      const result = await sanityService.getEventBySlug('ai-workshop');

      expect(result).toEqual(mockEvent);
    });

    it('should return null for non-existent slug', async () => {
      mockFetch.mockResolvedValue(null);

      const result = await sanityService.getEventBySlug('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('getBlogPosts', () => {
    it('should return list of published blog posts', async () => {
      const mockPosts = [
        {
          _id: '1',
          title: 'AI Introduction',
          slug: { current: 'ai-intro' },
        },
      ];

      mockFetch.mockResolvedValue(mockPosts);

      const result = await sanityService.getBlogPosts();

      expect(result).toEqual(mockPosts);
    });
  });

  describe('getVlogPosts', () => {
    it('should return list of published vlog posts', async () => {
      const mockVlogs = [
        {
          _id: '1',
          title: 'AI Basics Video',
          youtubeId: 'dQw4w9WgXcQ',
        },
      ];

      mockFetch.mockResolvedValue(mockVlogs);

      const result = await sanityService.getVlogPosts();

      expect(result).toEqual(mockVlogs);
    });
  });

  describe('createRegistration', () => {
    it('should create a new registration', async () => {
      const mockRegistration = {
        _id: 'reg123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      };

      mockCreate.mockResolvedValue(mockRegistration);

      const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        eventId: 'event123',
      };

      const result = await sanityService.createRegistration(data);

      expect(result).toEqual(mockRegistration);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          _type: 'registration',
        })
      );
    });
  });

  describe('createVolunteer', () => {
    it('should create a new volunteer application', async () => {
      const mockVolunteer = {
        _id: 'vol123',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
      };

      mockCreate.mockResolvedValue(mockVolunteer);

      const data = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        interest: 'event-planning',
        motivation: 'Want to help',
      };

      const result = await sanityService.createVolunteer(data);

      expect(result).toEqual(mockVolunteer);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          _type: 'volunteer',
        })
      );
    });
  });

  describe('getBlogPostBySlug', () => {
    it('should return blog post for valid slug', async () => {
      const mockPost = {
        _id: '3',
        title: 'Single Post',
        slug: { current: 'single-post' },
      };

      mockFetch.mockResolvedValue(mockPost);

      const result = await sanityService.getBlogPostBySlug('single-post');

      expect(result).toEqual(mockPost);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ slug: 'single-post' })
      );
    });

    it('should return null for non-existent slug', async () => {
      mockFetch.mockResolvedValue(null);

      const result = await sanityService.getBlogPostBySlug('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('checkExistingRegistration', () => {
    it('should return true if registration exists', async () => {
      mockFetch.mockResolvedValue(true);

      const result = await sanityService.checkExistingRegistration(
        'test@example.com',
        'event123'
      );

      expect(result).toBe(true);
    });

    it('should return false if registration does not exist', async () => {
      mockFetch.mockResolvedValue(false);

      const result = await sanityService.checkExistingRegistration(
        'new@example.com',
        'event123'
      );

      expect(result).toBe(false);
    });
  });

  describe('updateRegistration', () => {
    it('should update a registration', async () => {
      const updatedData = { attended: true };
      mockCommit.mockResolvedValue({ _id: 'reg123', ...updatedData });

      const result = await sanityService.updateRegistration('reg123', updatedData);

      expect(mockPatch).toHaveBeenCalledWith('reg123');
      expect(mockSet).toHaveBeenCalledWith(updatedData);
      expect(mockCommit).toHaveBeenCalled();
    });
  });

  describe('updateVolunteer', () => {
    it('should update a volunteer', async () => {
      const updatedData = { status: 'approved' as const };
      mockCommit.mockResolvedValue({ _id: 'vol123', ...updatedData });

      const result = await sanityService.updateVolunteer('vol123', updatedData);

      expect(mockPatch).toHaveBeenCalledWith('vol123');
      expect(mockSet).toHaveBeenCalledWith(updatedData);
      expect(mockCommit).toHaveBeenCalled();
    });
  });

  describe('portableTextToHtml', () => {
    it('should convert portable text blocks to HTML', () => {
      const blocks = [
        {
          _type: 'block',
          children: [{ text: 'Hello World' }],
        },
      ];

      const result = sanityService.portableTextToHtml(blocks);

      expect(result).toContain('Hello World');
      expect(result).toContain('<p>');
    });

    it('should handle empty blocks', () => {
      const result = sanityService.portableTextToHtml([]);

      expect(result).toBe('');
    });

    it('should handle null input', () => {
      const result = sanityService.portableTextToHtml(null as any);

      expect(result).toBe('');
    });
  });
});
