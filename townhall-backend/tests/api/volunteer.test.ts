import request from 'supertest';
import express from 'express';
import volunteerRouter from '../../src/api/volunteer';
import { sanityService } from '../../src/services/sanity';
import { hubspotService } from '../../src/services/hubspot';
import { emailService } from '../../src/services/email';
import { errorHandler } from '../../src/middleware/errorHandler';

jest.mock('../../src/services/sanity');
jest.mock('../../src/services/hubspot');
jest.mock('../../src/services/email');

const app = express();
app.use(express.json());
app.use('/api/volunteer', volunteerRouter);
app.use(errorHandler);

describe('POST /api/volunteer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validVolunteer = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567890',
    interest: 'event-planning',
    availability: 'weekends',
    experience: 'Organized community events',
    motivation: 'Want to support AI education',
  };

  it('should return 201 for valid volunteer application', async () => {
    (hubspotService.createOrUpdateContact as jest.Mock).mockResolvedValue({
      id: 'hubspot123',
    });
    (sanityService.createVolunteer as jest.Mock).mockResolvedValue({
      _id: 'vol123',
    });
    (emailService.sendVolunteerApplicationConfirmation as jest.Mock).mockResolvedValue(
      undefined
    );

    const response = await request(app)
      .post('/api/volunteer')
      .send(validVolunteer)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('volunteerId');
    expect(sanityService.createVolunteer).toHaveBeenCalledTimes(1);
    expect(hubspotService.createOrUpdateContact).toHaveBeenCalledTimes(1);
    expect(emailService.sendVolunteerApplicationConfirmation).toHaveBeenCalledTimes(1);
  });

  it('should return 400 for missing required fields', async () => {
    const response = await request(app)
      .post('/api/volunteer')
      .send({
        firstName: 'Jane',
        // missing lastName, email, interest, motivation
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 for invalid email format', async () => {
    const response = await request(app)
      .post('/api/volunteer')
      .send({
        ...validVolunteer,
        email: 'invalid-email',
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  it('should accept application without optional fields', async () => {
    (hubspotService.createOrUpdateContact as jest.Mock).mockResolvedValue({
      id: 'hubspot123',
    });
    (sanityService.createVolunteer as jest.Mock).mockResolvedValue({
      _id: 'vol123',
    });
    (emailService.sendVolunteerApplicationConfirmation as jest.Mock).mockResolvedValue(
      undefined
    );

    const minimalVolunteer = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      interest: 'event-planning',
      motivation: 'Want to help',
      // no phone, availability, experience
    };

    const response = await request(app)
      .post('/api/volunteer')
      .send(minimalVolunteer)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
  });

  it('should handle HubSpot errors gracefully', async () => {
    (hubspotService.createOrUpdateContact as jest.Mock).mockRejectedValue(
      new Error('HubSpot API error')
    );

    // HubSpot errors are caught and don't fail the application
    const response = await request(app)
      .post('/api/volunteer')
      .send(validVolunteer)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });

  it('should handle email sending errors gracefully', async () => {
    (hubspotService.createOrUpdateContact as jest.Mock).mockResolvedValue({
      id: 'hubspot123',
    });
    (sanityService.createVolunteer as jest.Mock).mockResolvedValue({
      _id: 'vol123',
    });
    (emailService.sendVolunteerApplicationConfirmation as jest.Mock).mockRejectedValue(
      new Error('Email service error')
    );

    // Should still succeed even if email fails
    const response = await request(app)
      .post('/api/volunteer')
      .send(validVolunteer)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
  });
});
