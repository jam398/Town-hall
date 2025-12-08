import request from 'supertest';
import express from 'express';
import crypto from 'crypto';
import webhooksRouter from '../../src/api/webhooks';
import { emailService } from '../../src/services/email';
import { errorHandler } from '../../src/middleware/errorHandler';

// Mock services
jest.mock('../../src/services/email');
jest.mock('../../src/services/sanity');

const app = express();
app.use(express.json());
app.use('/api/webhooks', webhooksRouter);
app.use(errorHandler);

describe('Webhooks API', () => {
  const originalWebhookSecret = process.env.SANITY_WEBHOOK_SECRET;

  beforeEach(() => {
    jest.clearAllMocks();
    // Disable webhook signature verification for most tests
    delete process.env.SANITY_WEBHOOK_SECRET;
  });

  afterAll(() => {
    // Restore original secret
    if (originalWebhookSecret) {
      process.env.SANITY_WEBHOOK_SECRET = originalWebhookSecret;
    }
  });

  describe('POST /api/webhooks/volunteer-approved', () => {
    it('should send approval email when volunteer is approved', async () => {
      const volunteerData = {
        _id: 'volunteer123',
        firstName: 'Jane',
        email: 'jane@example.com',
      };

      (emailService.sendVolunteerApprovedNotification as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post('/api/webhooks/volunteer-approved')
        .send(volunteerData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(emailService.sendVolunteerApprovedNotification).toHaveBeenCalledWith({
        to: volunteerData.email,
        firstName: volunteerData.firstName,
        discordInviteUrl: undefined,
      });
    });

    it('should return 400 when missing required fields', async () => {
      const response = await request(app)
        .post('/api/webhooks/volunteer-approved')
        .send({ _id: 'vol123' }) // Missing firstName and email
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Missing required fields');
    });

    it('should handle email sending errors', async () => {
      const volunteerData = {
        _id: 'volunteer123',
        firstName: 'Jane',
        email: 'jane@example.com',
      };

      (emailService.sendVolunteerApprovedNotification as jest.Mock).mockRejectedValue(
        new Error('Email failed')
      );

      const response = await request(app)
        .post('/api/webhooks/volunteer-approved')
        .send(volunteerData)
        .expect(500);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should verify webhook signature when secret is configured', async () => {
      const originalSecret = process.env.SANITY_WEBHOOK_SECRET;
      process.env.SANITY_WEBHOOK_SECRET = 'test-secret';

      const volunteerData = {
        _id: 'volunteer123',
        firstName: 'Jane',
        email: 'jane@example.com',
      };

      // Test without signature
      await request(app)
        .post('/api/webhooks/volunteer-approved')
        .send(volunteerData)
        .expect(401);

      // Test with invalid signature
      await request(app)
        .post('/api/webhooks/volunteer-approved')
        .set('sanity-webhook-signature', 'sha256=invalid')
        .send(volunteerData)
        .expect(401);

      // Test with valid signature
      const body = JSON.stringify(volunteerData);
      const validSignature = crypto
        .createHmac('sha256', 'test-secret')
        .update(body)
        .digest('hex');

      (emailService.sendVolunteerApprovedNotification as jest.Mock).mockResolvedValue(undefined);

      await request(app)
        .post('/api/webhooks/volunteer-approved')
        .set('sanity-webhook-signature', `sha256=${validSignature}`)
        .set('Content-Type', 'application/json')
        .send(body)
        .expect(200);

      process.env.SANITY_WEBHOOK_SECRET = originalSecret;
    });
  });

  describe('POST /api/webhooks/event-published', () => {
    it('should process event publication webhook', async () => {
      const eventData = {
        _id: 'event123',
        title: 'AI Workshop',
        slug: { current: 'ai-workshop' },
        dateTime: '2025-12-15T18:00:00Z',
        location: 'Newark Public Library',
      };

      const response = await request(app)
        .post('/api/webhooks/event-published')
        .send(eventData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.message).toContain('Event publication processed');
    });

    it('should return 400 when missing required fields', async () => {
      const response = await request(app)
        .post('/api/webhooks/event-published')
        .send({ _id: 'event123' }) // Missing title and slug
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Missing required fields');
    });
  });

  describe('POST /api/webhooks/content-published', () => {
    it('should process blog post publication webhook', async () => {
      const blogData = {
        _id: 'blog123',
        _type: 'blogPost',
        title: 'Getting Started with AI',
        slug: { current: 'getting-started-ai' },
        excerpt: 'Learn the basics of AI',
      };

      const response = await request(app)
        .post('/api/webhooks/content-published')
        .send(blogData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.message).toContain('Content publication processed');
    });

    it('should process vlog publication webhook', async () => {
      const vlogData = {
        _id: 'vlog123',
        _type: 'vlogPost',
        title: 'AI Tutorial Video',
        slug: { current: 'ai-tutorial' },
        excerpt: 'Watch and learn',
      };

      const response = await request(app)
        .post('/api/webhooks/content-published')
        .send(vlogData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });

    it('should return 400 when missing required fields', async () => {
      const response = await request(app)
        .post('/api/webhooks/content-published')
        .send({ _id: 'content123', _type: 'blogPost' }) // Missing title and slug
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Missing required fields');
    });
  });
});
