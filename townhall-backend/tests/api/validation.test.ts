import request from 'supertest';
import express from 'express';
import volunteerRouter from '../../src/api/volunteer';
import contactRouter from '../../src/api/contact';
import registrationsRouter from '../../src/api/registrations';
import newsletterRouter from '../../src/api/newsletter';
import { sanityService } from '../../src/services/sanity';
import { emailService } from '../../src/services/email';
import { hubspotService } from '../../src/services/hubspot';
import { n8nService } from '../../src/services/n8n';
import { errorHandler } from '../../src/middleware/errorHandler';

jest.mock('../../src/services/sanity');
jest.mock('../../src/services/email');
jest.mock('../../src/services/hubspot');
jest.mock('../../src/services/n8n');

const app = express();
app.use(express.json());
app.use('/api/volunteer', volunteerRouter);
app.use('/api/contact', contactRouter);
app.use('/api/registrations', registrationsRouter);
app.use('/api/newsletter', newsletterRouter);
app.use(errorHandler);

describe('Volunteer Form Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reject empty body', async () => {
    const response = await request(app)
      .post('/api/volunteer')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should reject missing firstName', async () => {
    const response = await request(app)
      .post('/api/volunteer')
      .send({
        lastName: 'Doe',
        email: 'john@example.com',
        interest: 'teaching',
        motivation: 'I want to help the community grow',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'firstName' })])
    );
  });

  it('should reject missing lastName', async () => {
    const response = await request(app)
      .post('/api/volunteer')
      .send({
        firstName: 'John',
        email: 'john@example.com',
        interest: 'teaching',
        motivation: 'I want to help the community grow',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'lastName' })])
    );
  });

  it('should reject invalid email format', async () => {
    const response = await request(app)
      .post('/api/volunteer')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'not-an-email',
        interest: 'teaching',
        motivation: 'I want to help the community grow',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'email' })])
    );
  });

  it('should reject missing interest', async () => {
    const response = await request(app)
      .post('/api/volunteer')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        motivation: 'I want to help the community grow',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'interest' })])
    );
  });

  it('should reject motivation less than 10 characters', async () => {
    const response = await request(app)
      .post('/api/volunteer')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        interest: 'teaching',
        motivation: 'short',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'motivation' })])
    );
  });

  it('should accept valid volunteer application', async () => {
    (sanityService.createVolunteer as jest.Mock).mockResolvedValue({ _id: 'vol-1' });
    (emailService.sendVolunteerApplicationConfirmation as jest.Mock).mockResolvedValue(undefined);
    (sanityService.updateVolunteer as jest.Mock).mockResolvedValue({});
    (hubspotService.createOrUpdateContact as jest.Mock).mockResolvedValue('hubspot-123');
    (n8nService.notifyVolunteerSignup as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app)
      .post('/api/volunteer')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        interest: 'teaching',
        motivation: 'I want to help the community grow and learn together',
      })
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('volunteerId');
  });
});

describe('Contact Form Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reject empty body', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should reject missing name', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        email: 'john@example.com',
        subject: 'Question',
        message: 'This is my question about the program.',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'name' })])
    );
  });

  it('should reject invalid email', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Question',
        message: 'This is my question about the program.',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'email' })])
    );
  });

  it('should reject missing subject', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is my question about the program.',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'subject' })])
    );
  });

  it('should reject message less than 10 characters', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question',
        message: 'Hi',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'message' })])
    );
  });

  it('should accept valid contact form', async () => {
    (emailService.sendContactFormNotification as jest.Mock).mockResolvedValue(undefined);
    (hubspotService.createOrUpdateContact as jest.Mock).mockResolvedValue('hubspot-123');

    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question about workshops',
        message: 'I would like to know more about your AI workshops.',
      })
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });
});

describe('Registration Form Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reject empty body', async () => {
    const response = await request(app)
      .post('/api/registrations/register')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should reject missing firstName', async () => {
    const response = await request(app)
      .post('/api/registrations/register')
      .send({
        lastName: 'Doe',
        email: 'john@example.com',
        eventSlug: 'ai-workshop',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'firstName' })])
    );
  });

  it('should reject invalid email', async () => {
    const response = await request(app)
      .post('/api/registrations/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'not-valid',
        eventSlug: 'ai-workshop',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'email' })])
    );
  });

  it('should reject missing eventSlug', async () => {
    const response = await request(app)
      .post('/api/registrations/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      })
      .expect(400);

    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'eventSlug' })])
    );
  });
});

describe('Newsletter Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reject empty email', async () => {
    const response = await request(app)
      .post('/api/newsletter')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should reject invalid email format', async () => {
    const response = await request(app)
      .post('/api/newsletter')
      .send({ email: 'not-an-email' })
      .expect(400);

    expect(response.body.error).toContain('email');
  });
});
