import { hubspotService } from '../../src/services/hubspot';

// Mock global fetch
global.fetch = jest.fn();

describe('HubSpot Service', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrUpdateContact', () => {
    it('should create a new contact successfully', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({
          id: 'hubspot123',
          properties: {
            email: 'test@example.com',
            firstname: 'John',
            lastname: 'Doe',
          },
        }),
      };

      mockFetch.mockResolvedValue(mockResponse as Response);

      const contactData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        tags: ['event:ai-workshop'],
      };

      const result = await hubspotService.createOrUpdateContact(contactData);

      expect(result).toBe('hubspot123');
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/contacts'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: expect.any(String),
          }),
        })
      );
    });

    it('should handle API errors gracefully and return empty string', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      const contactData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      const result = await hubspotService.createOrUpdateContact(contactData);
      expect(result).toBe('');
    });

    it('should handle network errors gracefully and return empty string', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const contactData = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      const result = await hubspotService.createOrUpdateContact(contactData);
      expect(result).toBe('');
    });

    it('should update existing contact on 409 conflict', async () => {
      // First call returns 409 (conflict)
      const conflict409Response = {
        ok: false,
        status: 409,
        statusText: 'Conflict',
      };

      // Second call (search) returns existing contact
      const searchResponse = {
        ok: true,
        json: async () => ({
          results: [{ id: 'existing-contact-123' }],
        }),
      };

      // Third call (update) succeeds
      const updateResponse = {
        ok: true,
        json: async () => ({ id: 'existing-contact-123' }),
      };

      mockFetch
        .mockResolvedValueOnce(conflict409Response as Response)
        .mockResolvedValueOnce(searchResponse as Response)
        .mockResolvedValueOnce(updateResponse as Response);

      const contactData = {
        email: 'existing@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
      };

      const result = await hubspotService.createOrUpdateContact(contactData);
      expect(result).toBe('existing-contact-123');
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });
  });
});
