import request from 'supertest';
import express from 'express';
import blogRouter from '../../src/api/blog';
import { sanityService } from '../../src/services/sanity';

jest.mock('../../src/services/sanity');

const app = express();
app.use(express.json());
app.use('/api/blog', blogRouter);

describe('GET /api/blog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with list of blog posts', async () => {
    const mockPosts = [
      {
        _id: '1',
        title: 'Introduction to AI',
        slug: { current: 'introduction-to-ai' },
        excerpt: 'Learn AI basics',
        publishedAt: '2025-12-01T10:00:00Z',
        author: { name: 'John Doe' },
        tags: ['AI', 'beginner'],
        status: 'published',
      },
    ];

    (sanityService.getBlogPosts as jest.Mock).mockResolvedValue(mockPosts);

    const response = await request(app)
      .get('/api/blog')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('posts');
    expect(response.body.posts).toHaveLength(1);
    expect(response.body.posts[0]).toHaveProperty('title', 'Introduction to AI');
  });

  it('should return empty array when no posts exist', async () => {
    (sanityService.getBlogPosts as jest.Mock).mockResolvedValue([]);

    const response = await request(app).get('/api/blog').expect(200);

    expect(response.body.posts).toEqual([]);
  });

  it('should handle service errors gracefully', async () => {
    (sanityService.getBlogPosts as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = await request(app).get('/api/blog').expect(500);

    expect(response.body).toHaveProperty('error', 'Failed to fetch blog posts');
  });
});

describe('GET /api/blog/:slug', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with blog post details for valid slug', async () => {
    const mockPost = {
      _id: '1',
      title: 'Introduction to AI',
      slug: { current: 'introduction-to-ai' },
      content: '<p>AI is amazing...</p>',
      publishedAt: '2025-12-01T10:00:00Z',
      author: { name: 'John Doe', bio: 'AI Expert' },
      tags: ['AI', 'beginner'],
      status: 'published',
    };

    (sanityService.getBlogPostBySlug as jest.Mock).mockResolvedValue(mockPost);

    const response = await request(app)
      .get('/api/blog/introduction-to-ai')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('post');
    expect(response.body.post).toHaveProperty('title', 'Introduction to AI');
    expect(response.body.post).toHaveProperty('body');
    expect(response.body.post).toHaveProperty('author');
  });

  it('should return 404 when blog post not found', async () => {
    (sanityService.getBlogPostBySlug as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get('/api/blog/nonexistent-post')
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Blog post not found');
  });

  it('should handle service errors gracefully', async () => {
    (sanityService.getBlogPostBySlug as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = await request(app)
      .get('/api/blog/introduction-to-ai')
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Failed to fetch blog post');
  });
});
