import request from 'supertest';
import express from 'express';
import crypto from 'crypto';
import webhooksRouter from '../../src/api/webhooks';
import { sanityService } from '../../src/services/sanity';
import { emailService } from '../../src/services/email';
import { n8nService } from '../../src/services/n8n';

jest.mock('../../src/services/sanity');
jest.mock('../../src/services/email');
jest.mock('../../src/services/n8n');

const app = express();
app.use(express.json());
app.use('/api/webhooks', webhooksRouter);

// Helper to generate valid webhook signature
function generateSignature(body: object, secret: string): string {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  return `sha256=${hash}`;
}

describe('Webhook Security - Signature Verification', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('POST /api/webhooks/volunteer-approved', () => {
    it('should reject request with missing signature when secret is configured', async () => {
      process.env.SANITY_WEBHOOK_SECRET = 'test-secret-123';

      const response = await request(app)
        .post('/api/webhooks/volunteer-approved')
        .send({ _id: '123', firstName: 'John', email: 'john@example.com' })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Unauthorized');
    });

    it('should reject request with invalid signature', async () => {
      process.env.SANITY_WEBHOOK_SECRET = 'test-secret-123';

      const response = await request(app)
        .post('/api/webhooks/volunteer-approved')
        .set('sanity-webhook-signature', 'sha256=invalid-signature')
        .send({ _id: '123', firstName: 'John', email: 'john@example.com' })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should accept request with valid signature', async () => {
      process.env.SANITY_WEBHOOK_SECRET = 'test-secret-123';
      const body = { _id: '123', firstName: 'John', email: 'john@example.com' };
      const signature = generateSignature(body, 'test-secret-123');

      (emailService.sendVolunteerApprovedNotification as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post('/api/webhooks/volunteer-approved')
        .set('sanity-webhook-signature', signature)
        .send(body)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });

    it('should allow request without signature when secret is not configured', async () => {
      delete process.env.SANITY_WEBHOOK_SECRET;

      (emailService.sendVolunteerApprovedNotification as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post('/api/webhooks/volunteer-approved')
        .send({ _id: '123', firstName: 'John', email: 'john@example.com' })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });

    it('should reject request with missing required fields', async () => {
      delete process.env.SANITY_WEBHOOK_SECRET;

      const response = await request(app)
        .post('/api/webhooks/volunteer-approved')
        .send({ _id: '123' }) // Missing firstName and email
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.message).toContain('Missing required fields');
    });
  });

  describe('POST /api/webhooks/event-published', () => {
    it('should reject with invalid signature', async () => {
      process.env.SANITY_WEBHOOK_SECRET = 'test-secret-123';

      const response = await request(app)
        .post('/api/webhooks/event-published')
        .set('sanity-webhook-signature', 'sha256=wrong')
        .send({ _id: '1', title: 'Event', slug: { current: 'event' } })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should accept valid event publication', async () => {
      delete process.env.SANITY_WEBHOOK_SECRET;

      const mockEvent = {
        _id: '1',
        title: 'AI Workshop',
        slug: { current: 'ai-workshop' },
        description: 'Learn AI',
        dateTime: '2025-12-20T18:00:00Z',
        location: 'Newark',
        featuredImage: 'https://example.com/image.jpg',
      };

      (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
      (n8nService.notifyEventPublished as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post('/api/webhooks/event-published')
        .send({ _id: '1', title: 'AI Workshop', slug: { current: 'ai-workshop' } })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });

    it('should reject missing required fields', async () => {
      delete process.env.SANITY_WEBHOOK_SECRET;

      const response = await request(app)
        .post('/api/webhooks/event-published')
        .send({ _id: '1' }) // Missing title and slug
        .expect(400);

      expect(response.body.message).toContain('Missing required fields');
    });
  });

  describe('POST /api/webhooks/content-published', () => {
    it('should reject with invalid signature', async () => {
      process.env.SANITY_WEBHOOK_SECRET = 'test-secret-123';

      const response = await request(app)
        .post('/api/webhooks/content-published')
        .set('sanity-webhook-signature', 'sha256=invalid')
        .send({ _id: '1', _type: 'blogPost', title: 'Post', slug: { current: 'post' } })
        .expect(401);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should process blog post publication', async () => {
      delete process.env.SANITY_WEBHOOK_SECRET;

      (n8nService.notifyBlogPublished as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .post('/api/webhooks/content-published')
        .send({
          _id: '1',
          _type: 'blogPost',
          title: 'New Blog Post',
          slug: { current: 'new-blog-post' },
          excerpt: 'This is a great post',
        })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(n8nService.notifyBlogPublished).toHaveBeenCalled();
    });

    it('should process vlog publication without Discord notification', async () => {
      delete process.env.SANITY_WEBHOOK_SECRET;

      const response = await request(app)
        .post('/api/webhooks/content-published')
        .send({
          _id: '1',
          _type: 'vlogPost',
          title: 'New Vlog',
          slug: { current: 'new-vlog' },
        })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      // notifyBlogPublished should NOT be called for vlogs
      expect(n8nService.notifyBlogPublished).not.toHaveBeenCalled();
    });

    it('should reject missing required fields', async () => {
      delete process.env.SANITY_WEBHOOK_SECRET;

      const response = await request(app)
        .post('/api/webhooks/content-published')
        .send({ _id: '1', _type: 'blogPost' }) // Missing title and slug
        .expect(400);

      expect(response.body.message).toContain('Missing required fields');
    });
  });
});
