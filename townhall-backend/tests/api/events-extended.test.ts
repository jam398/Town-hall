import request from 'supertest';
import express from 'express';
import eventsRouter from '../../src/api/events';
import { sanityService } from '../../src/services/sanity';
import { emailService } from '../../src/services/email';

jest.mock('../../src/services/sanity');
jest.mock('../../src/services/email');

const app = express();
app.use(express.json());
app.use('/api/events', eventsRouter);

describe('GET /api/events/completed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with list of completed events', async () => {
    const mockCompletedEvents = [
      {
        _id: '1',
        title: 'Past AI Workshop',
        slug: { current: 'past-ai-workshop' },
        description: 'Completed workshop',
        dateTime: '2025-12-10T18:00:00Z',
        location: 'Newark Library',
        recordingUrl: 'https://youtube.com/watch?v=123',
        summaryUrl: 'https://example.com/summary',
      },
    ];

    (sanityService.getCompletedEvents as jest.Mock).mockResolvedValue(mockCompletedEvents);

    const response = await request(app)
      .get('/api/events/completed')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('events');
    expect(response.body.events).toHaveLength(1);
    expect(response.body.events[0]).toHaveProperty('title', 'Past AI Workshop');
    expect(response.body.events[0]).toHaveProperty('recordingUrl');
  });

  it('should return empty array when no completed events', async () => {
    (sanityService.getCompletedEvents as jest.Mock).mockResolvedValue([]);

    const response = await request(app)
      .get('/api/events/completed')
      .expect(200);

    expect(response.body.events).toEqual([]);
  });

  it('should handle service errors gracefully', async () => {
    (sanityService.getCompletedEvents as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = await request(app)
      .get('/api/events/completed')
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Failed to fetch completed events');
  });
});

describe('POST /api/events/:slug/send-reminders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 when event not found', async () => {
    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/api/events/nonexistent/send-reminders')
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Event not found');
  });

  it('should return success with 0 emails when no registrations', async () => {
    const mockEvent = {
      _id: 'event-1',
      title: 'AI Workshop',
      slug: { current: 'ai-workshop' },
      dateTime: '2025-12-20T18:00:00Z',
      location: 'Newark Library',
    };

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrations as jest.Mock).mockResolvedValue([]);

    const response = await request(app)
      .post('/api/events/ai-workshop/send-reminders')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('emailsSent', 0);
    expect(response.body.message).toContain('No registrations');
  });

  it('should send reminder emails to all registrants', async () => {
    const mockEvent = {
      _id: 'event-1',
      title: 'AI Workshop',
      slug: { current: 'ai-workshop' },
      dateTime: '2025-12-20T18:00:00Z',
      location: 'Newark Library',
      address: '123 Main St',
    };

    const mockRegistrations = [
      { _id: 'reg-1', firstName: 'John', email: 'john@example.com' },
      { _id: 'reg-2', firstName: 'Jane', email: 'jane@example.com' },
    ];

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrations as jest.Mock).mockResolvedValue(mockRegistrations);
    (emailService.sendEventReminder as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app)
      .post('/api/events/ai-workshop/send-reminders')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('emailsSent', 2);
    expect(emailService.sendEventReminder).toHaveBeenCalledTimes(2);
  });

  it('should handle email service errors gracefully', async () => {
    const mockEvent = {
      _id: 'event-1',
      title: 'AI Workshop',
      slug: { current: 'ai-workshop' },
      dateTime: '2025-12-20T18:00:00Z',
    };

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrations as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = await request(app)
      .post('/api/events/ai-workshop/send-reminders')
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Failed to send reminder emails');
  });
});

describe('POST /api/events/:slug/send-followups', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 when event not found', async () => {
    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/api/events/nonexistent/send-followups')
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Event not found');
  });

  it('should return success with 0 emails when no registrations', async () => {
    const mockEvent = {
      _id: 'event-1',
      title: 'AI Workshop',
      slug: { current: 'ai-workshop' },
      dateTime: '2025-12-10T18:00:00Z',
    };

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrations as jest.Mock).mockResolvedValue([]);

    const response = await request(app)
      .post('/api/events/ai-workshop/send-followups')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('emailsSent', 0);
  });

  it('should send follow-up emails with next events', async () => {
    const mockEvent = {
      _id: 'event-1',
      title: 'Past Workshop',
      slug: { current: 'past-workshop' },
      dateTime: '2025-12-10T18:00:00Z',
      recordingUrl: 'https://youtube.com/123',
      summaryUrl: 'https://example.com/summary',
    };

    const mockRegistrations = [
      { _id: 'reg-1', firstName: 'John', email: 'john@example.com' },
    ];

    const mockUpcomingEvents = [
      { title: 'Next Event', dateTime: '2025-12-25T18:00:00Z', slug: { current: 'next-event' } },
    ];

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrations as jest.Mock).mockResolvedValue(mockRegistrations);
    (sanityService.getEvents as jest.Mock).mockResolvedValue(mockUpcomingEvents);
    (emailService.sendPostEventFollowUp as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app)
      .post('/api/events/past-workshop/send-followups')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('emailsSent', 1);
    expect(emailService.sendPostEventFollowUp).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'john@example.com',
        firstName: 'John',
        eventTitle: 'Past Workshop',
        nextEvents: expect.any(Array),
      })
    );
  });

  it('should handle errors gracefully', async () => {
    (sanityService.getEventBySlug as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const response = await request(app)
      .post('/api/events/ai-workshop/send-followups')
      .expect(500);

    expect(response.body).toHaveProperty('error', 'Failed to send follow-up emails');
  });
});
