/**
 * Extended HubSpot Service Tests
 * Tests for updateContactByEmail and addContactToList
 */

const mockFetch = jest.fn();
global.fetch = mockFetch;

import { hubspotService } from '../../src/services/hubspot';

describe('hubspotService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.HUBSPOT_API_KEY = 'test-api-key';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('createOrUpdateContact', () => {
    it('should create contact successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 'contact-123' }),
      });

      const result = await hubspotService.createOrUpdateContact({
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(result).toBe('contact-123');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-api-key',
          }),
        })
      );
    });

    it('should include phone when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 'contact-123' }),
      });

      await hubspotService.createOrUpdateContact({
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '555-1234',
      });

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.properties.phone).toBe('555-1234');
    });

    it('should update contact when 409 conflict returned', async () => {
      // First call returns 409 (conflict)
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        statusText: 'Conflict',
      });

      // Search call
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [{ id: 'existing-123' }] }),
      });

      // Update call
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

      const result = await hubspotService.createOrUpdateContact({
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(result).toBe('existing-123');
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('should return empty string on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const result = await hubspotService.createOrUpdateContact({
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(result).toBe('');
    });

    it('should return empty string on network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await hubspotService.createOrUpdateContact({
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(result).toBe('');
    });
  });

  describe('updateContactByEmail', () => {
    it('should find and update contact', async () => {
      // Search call
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [{ id: 'contact-456' }] }),
      });

      // Update call
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

      const result = await hubspotService.updateContactByEmail('john@example.com', {
        firstname: 'John',
        lastname: 'Updated',
      });

      expect(result).toBe('contact-456');
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should return empty string when contact not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      });

      const result = await hubspotService.updateContactByEmail('notfound@example.com', {
        firstname: 'John',
      });

      expect(result).toBe('');
    });

    it('should return empty string on error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('API error'));

      const result = await hubspotService.updateContactByEmail('john@example.com', {
        firstname: 'John',
      });

      expect(result).toBe('');
    });
  });

  describe('addContactToList', () => {
    it('should add contact to list', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      });

      await hubspotService.addContactToList('contact-123', 'list-456');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.hubapi.com/contacts/v1/lists/list-456/add',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('contact-123'),
        })
      );
    });

    it('should not throw on error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('API error'));

      // Should not throw
      await expect(
        hubspotService.addContactToList('contact-123', 'list-456')
      ).resolves.not.toThrow();
    });
  });

  describe('missing API key', () => {
    it('should handle missing API key gracefully', async () => {
      delete process.env.HUBSPOT_API_KEY;

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      });

      const result = await hubspotService.createOrUpdateContact({
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(result).toBe('');
    });
  });
});
