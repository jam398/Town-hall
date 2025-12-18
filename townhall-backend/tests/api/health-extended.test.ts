import request from 'supertest';
import express from 'express';
import healthRouter from '../../src/api/health';
import { sanityService } from '../../src/services/sanity';

jest.mock('../../src/services/sanity');

const app = express();
app.use(express.json());
app.use('/api/health', healthRouter);

describe('GET /api/health - Extended Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Healthy state', () => {
    it('should return 200 when Sanity is accessible', async () => {
      (sanityService.getEvents as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.status).toBe('healthy');
      expect(response.body.services.api).toBe('up');
      expect(response.body.services.sanity).toBe('up');
    });

    it('should include valid ISO timestamp', async () => {
      (sanityService.getEvents as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .get('/api/health')
        .expect(200);

      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.getTime()).not.toBeNaN();
      // Timestamp should be recent (within last minute)
      expect(Date.now() - timestamp.getTime()).toBeLessThan(60000);
    });
  });

  describe('Unhealthy state', () => {
    it('should return 503 when Sanity is down', async () => {
      (sanityService.getEvents as jest.Mock).mockRejectedValue(
        new Error('Sanity connection failed')
      );

      const response = await request(app)
        .get('/api/health')
        .expect(503);

      expect(response.body.status).toBe('unhealthy');
      expect(response.body.services.api).toBe('up');
      expect(response.body.services.sanity).toBe('down');
    });

    it('should still include timestamp when unhealthy', async () => {
      (sanityService.getEvents as jest.Mock).mockRejectedValue(
        new Error('Database timeout')
      );

      const response = await request(app)
        .get('/api/health')
        .expect(503);

      expect(response.body).toHaveProperty('timestamp');
      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.getTime()).not.toBeNaN();
    });

    it('should handle network timeout errors', async () => {
      (sanityService.getEvents as jest.Mock).mockRejectedValue(
        new Error('ETIMEDOUT')
      );

      const response = await request(app)
        .get('/api/health')
        .expect(503);

      expect(response.body.status).toBe('unhealthy');
    });

    it('should handle authentication errors', async () => {
      (sanityService.getEvents as jest.Mock).mockRejectedValue(
        new Error('Unauthorized: Invalid token')
      );

      const response = await request(app)
        .get('/api/health')
        .expect(503);

      expect(response.body.status).toBe('unhealthy');
      expect(response.body.services.sanity).toBe('down');
    });
  });
});
