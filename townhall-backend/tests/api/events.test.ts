import request from 'supertest';
import express from 'express';
import eventsRouter from '../../src/api/events';
import { sanityService } from '../../src/services/sanity';

// Mock the sanity service
jest.mock('../../src/services/sanity');

// Create test app
const app = express();
app.use(express.json());
app.use('/api/events', eventsRouter);

describe('GET /api/events', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with list of events', async () => {
    const mockEvents = [
      {
        _id: '1',
        title: 'AI Workshop',
        slug: { current: 'ai-workshop' },
        description: 'Learn AI basics',
        dateTime: '2025-12-15T18:00:00Z',
        location: 'Newark Public Library',
        status: 'published',
      },
      {
        _id: '2',
        title: 'ML Meetup',
        slug: { current: 'ml-meetup' },
        description: 'Discuss ML trends',
        dateTime: '2025-12-20T19:00:00Z',
        location: 'Tech Hub',
        status: 'published',
      },
    ];

    (sanityService.getEvents as jest.Mock).mockResolvedValue(mockEvents);

    const response = await request(app)
      .get('/api/events')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('events');
    expect(response.body.events).toHaveLength(2);
    expect(response.body.events[0]).toHaveProperty('title', 'AI Workshop');
    expect(response.body.events[0]).toHaveProperty('slug', 'ai-workshop');
  });

  it('should return empty array when no events exist', async () => {
    (sanityService.getEvents as jest.Mock).mockResolvedValue([]);

    const response = await request(app)
      .get('/api/events')
      .expect(200);

    expect(response.body.events).toEqual([]);
  });

  it('should handle service errors gracefully', async () => {
    (sanityService.getEvents as jest.Mock).mockRejectedValue(
      new Error('Sanity connection failed')
    );

    const response = await request(app)
      .get('/api/events')
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Failed to fetch events');
  });
});

describe('GET /api/events/:slug', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with event details for valid slug', async () => {
    const mockEvent = {
      _id: '1',
      title: 'AI Workshop',
      slug: { current: 'ai-workshop' },
      description: 'Learn AI basics',
      dateTime: '2025-12-15T18:00:00Z',
      location: 'Newark Public Library',
      whatYouWillLearn: ['AI fundamentals', 'Hands-on practice'],
      maxAttendees: 50,
      currentAttendees: 25,
      status: 'published',
    };

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);

    const response = await request(app)
      .get('/api/events/ai-workshop')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('event');
    expect(response.body.event).toHaveProperty('title', 'AI Workshop');
    expect(response.body.event).toHaveProperty('slug', 'ai-workshop');
    expect(response.body.event).toHaveProperty('whatYouWillLearn');
    expect(response.body.event.whatYouWillLearn).toHaveLength(2);
  });

  it('should return 404 when event not found', async () => {
    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get('/api/events/nonexistent-event')
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Event not found');
  });

  it('should handle service errors gracefully', async () => {
    (sanityService.getEventBySlug as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = await request(app)
      .get('/api/events/ai-workshop')
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Failed to fetch event');
  });
});
