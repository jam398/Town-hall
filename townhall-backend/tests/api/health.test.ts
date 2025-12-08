import request from 'supertest';
import express from 'express';
import healthRouter from '../../src/api/health';

// Create test app
const app = express();
app.use(express.json());
app.use('/api/health', healthRouter);

describe('GET /api/health', () => {
  it('should return 200 with healthy status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('services');
    expect(response.body.services).toHaveProperty('api', 'up');
    expect(response.body.services).toHaveProperty('sanity');
  });

  it('should return a valid ISO timestamp', async () => {
    const response = await request(app).get('/api/health');
    
    const timestamp = new Date(response.body.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.getTime()).not.toBeNaN();
  });

  it('should include sanity service status', async () => {
    const response = await request(app).get('/api/health');
    
    expect(['up', 'down']).toContain(response.body.services.sanity);
  });
});
