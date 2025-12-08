import request from 'supertest';
import express from 'express';
import vlogsRouter from '../../src/api/vlogs';
import { sanityService } from '../../src/services/sanity';

jest.mock('../../src/services/sanity');

const app = express();
app.use(express.json());
app.use('/api/vlogs', vlogsRouter);

describe('GET /api/vlogs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with list of vlog posts', async () => {
    const mockVlogs = [
      {
        _id: '1',
        title: 'AI Basics Video',
        slug: { current: 'ai-basics-video' },
        description: 'Learn AI in 10 minutes',
        youtubeId: 'dQw4w9WgXcQ',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        publishedAt: '2025-12-01T10:00:00Z',
        duration: 600,
        tags: ['AI', 'tutorial'],
      },
    ];

    (sanityService.getVlogPosts as jest.Mock).mockResolvedValue(mockVlogs);

    const response = await request(app)
      .get('/api/vlogs')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('vlogs');
    expect(response.body.vlogs).toHaveLength(1);
    expect(response.body.vlogs[0]).toHaveProperty('title', 'AI Basics Video');
    expect(response.body.vlogs[0]).toHaveProperty('youtubeId', 'dQw4w9WgXcQ');
    expect(response.body.vlogs[0]).toHaveProperty('youtubeUrl');
  });

  it('should return empty array when no vlogs exist', async () => {
    (sanityService.getVlogPosts as jest.Mock).mockResolvedValue([]);

    const response = await request(app).get('/api/vlogs').expect(200);

    expect(response.body.vlogs).toEqual([]);
  });

  it('should handle missing slug field gracefully', async () => {
    const mockVlogs = [
      {
        _id: '1',
        title: 'Video without slug',
        slug: null,
        youtubeId: 'dQw4w9WgXcQ',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        publishedAt: '2025-12-01T10:00:00Z',
      },
    ];

    (sanityService.getVlogPosts as jest.Mock).mockResolvedValue(mockVlogs);

    const response = await request(app).get('/api/vlogs').expect(200);

    expect(response.body.vlogs[0].slug).toBeNull();
  });

  it('should handle service errors gracefully', async () => {
    (sanityService.getVlogPosts as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = await request(app).get('/api/vlogs').expect(500);

    expect(response.body).toHaveProperty('error', 'Failed to fetch vlogs');
  });
});
