import request from 'supertest';
import express from 'express';
import registrationsRouter from '../../src/api/registrations';
import { sanityService } from '../../src/services/sanity';
import { hubspotService } from '../../src/services/hubspot';
import { emailService } from '../../src/services/email';
import { errorHandler } from '../../src/middleware/errorHandler';

jest.mock('../../src/services/sanity');
jest.mock('../../src/services/hubspot');
jest.mock('../../src/services/email');

const app = express();
app.use(express.json());
app.use('/api/events', registrationsRouter);
app.use(errorHandler);

describe('POST /api/events/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validRegistration = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    eventSlug: 'ai-workshop',
  };

  it('should return 201 for valid registration', async () => {
    const mockEvent = {
      _id: 'event123',
      title: 'AI Workshop',
      slug: { current: 'ai-workshop' },
      dateTime: '2025-12-15T18:00:00Z',
      location: 'Newark Public Library',
      maxAttendees: 50,
    };

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrationCount as jest.Mock).mockResolvedValue(25);
    (sanityService.checkExistingRegistration as jest.Mock).mockResolvedValue(false);
    (hubspotService.createOrUpdateContact as jest.Mock).mockResolvedValue({
      id: 'hubspot123',
    });
    (sanityService.createRegistration as jest.Mock).mockResolvedValue({
      _id: 'reg123',
    });
    (emailService.sendEventRegistrationConfirmation as jest.Mock).mockResolvedValue(
      undefined
    );

    const response = await request(app)
      .post('/api/events/register')
      .send(validRegistration)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('registrationId');
    expect(sanityService.createRegistration).toHaveBeenCalledTimes(1);
    expect(hubspotService.createOrUpdateContact).toHaveBeenCalledTimes(1);
    expect(emailService.sendEventRegistrationConfirmation).toHaveBeenCalledTimes(1);
  });

  it('should return 400 for missing required fields', async () => {
    const response = await request(app)
      .post('/api/events/register')
      .send({
        firstName: 'John',
        // missing lastName, email, eventSlug
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 for invalid email format', async () => {
    const response = await request(app)
      .post('/api/events/register')
      .send({
        ...validRegistration,
        email: 'invalid-email',
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 404 when event not found', async () => {
    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/api/events/register')
      .send(validRegistration)
      .expect(404);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Event not found');
  });

  it('should return 400 when event is full', async () => {
    const mockEvent = {
      _id: 'event123',
      title: 'AI Workshop',
      maxAttendees: 50,
    };

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrationCount as jest.Mock).mockResolvedValue(50); // Full!

    const response = await request(app)
      .post('/api/events/register')
      .send(validRegistration)
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Event is full');
  });

  it('should return 400 when already registered', async () => {
    const mockEvent = {
      _id: 'event123',
      title: 'AI Workshop',
      maxAttendees: 50,
    };

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrationCount as jest.Mock).mockResolvedValue(25);
    (sanityService.checkExistingRegistration as jest.Mock).mockResolvedValue(true); // Already registered!

    const response = await request(app)
      .post('/api/events/register')
      .send(validRegistration)
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'You are already registered for this event');
  });

  it('should handle HubSpot errors gracefully', async () => {
    const mockEvent = {
      _id: 'event123',
      title: 'AI Workshop',
      maxAttendees: 50,
    };

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrationCount as jest.Mock).mockResolvedValue(25);
    (sanityService.checkExistingRegistration as jest.Mock).mockResolvedValue(false);
    (hubspotService.createOrUpdateContact as jest.Mock).mockRejectedValue(
      new Error('HubSpot API error')
    );

    // HubSpot errors are caught and don't fail registration
    const response = await request(app)
      .post('/api/events/register')
      .send(validRegistration)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });

  it('should handle email sending errors gracefully', async () => {
    const mockEvent = {
      _id: 'event123',
      title: 'AI Workshop',
      maxAttendees: 50,
    };

    (sanityService.getEventBySlug as jest.Mock).mockResolvedValue(mockEvent);
    (sanityService.getEventRegistrationCount as jest.Mock).mockResolvedValue(25);
    (sanityService.checkExistingRegistration as jest.Mock).mockResolvedValue(false);
    (hubspotService.createOrUpdateContact as jest.Mock).mockResolvedValue({
      id: 'hubspot123',
    });
    (sanityService.createRegistration as jest.Mock).mockResolvedValue({
      _id: 'reg123',
    });
    (emailService.sendEventRegistrationConfirmation as jest.Mock).mockRejectedValue(
      new Error('Email service error')
    );

    // Should still succeed even if email fails
    const response = await request(app)
      .post('/api/events/register')
      .send(validRegistration)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
  });
});
