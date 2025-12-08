import request from 'supertest';
import express from 'express';
import newsletterRouter from '../../src/api/newsletter';
import { hubspotService } from '../../src/services/hubspot';
import { errorHandler } from '../../src/middleware/errorHandler';

// Mock HubSpot service
jest.mock('../../src/services/hubspot');

const app = express();
app.use(express.json());
app.use('/api/newsletter', newsletterRouter);
app.use(errorHandler);

describe('Newsletter API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/newsletter', () => {
    it('should subscribe email to newsletter', async () => {
      (hubspotService.createOrUpdateContact as jest.Mock).mockResolvedValue('contact-123');

      const response = await request(app)
        .post('/api/newsletter')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Successfully subscribed');
      expect(hubspotService.createOrUpdateContact).toHaveBeenCalledWith({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'Newsletter Subscriber',
        tags: ['newsletter'],
      });
    });

    it('should return 400 for missing email', async () => {
      const response = await request(app)
        .post('/api/newsletter')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('email is required');
    });

    it('should return 400 for invalid email format', async () => {
      const response = await request(app)
        .post('/api/newsletter')
        .send({ email: 'invalid-email' });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid email format');
    });

    it('should handle already subscribed users', async () => {
      (hubspotService.createOrUpdateContact as jest.Mock).mockRejectedValue(
        new Error('Contact already exists for this email')
      );

      const response = await request(app)
        .post('/api/newsletter')
        .send({ email: 'existing@example.com' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('already subscribed');
    });

    it('should handle HubSpot errors', async () => {
      (hubspotService.createOrUpdateContact as jest.Mock).mockRejectedValue(
        new Error('HubSpot API error')
      );

      const response = await request(app)
        .post('/api/newsletter')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(500);
      expect(response.body.error).toContain('Failed to subscribe');
    });

    it('should capitalize first name from email', async () => {
      (hubspotService.createOrUpdateContact as jest.Mock).mockResolvedValue('contact-123');

      await request(app)
        .post('/api/newsletter')
        .send({ email: 'john.doe@example.com' });

      expect(hubspotService.createOrUpdateContact).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'John',
        })
      );
    });
  });
});
