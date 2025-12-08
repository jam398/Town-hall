import request from 'supertest';
import express from 'express';
import contactRouter from '../../src/api/contact';
import { emailService } from '../../src/services/email';
import { errorHandler } from '../../src/middleware/errorHandler';

jest.mock('../../src/services/email');

const app = express();
app.use(express.json());
app.use('/api/contact', contactRouter);
app.use(errorHandler);

describe('POST /api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validContact = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    subject: 'Question about AI event',
    message: 'I would like to know more about the upcoming AI workshop.',
  };

  it('should return 200 for valid contact form submission', async () => {
    (emailService.sendContactFormNotification as jest.Mock).mockResolvedValue(
      undefined
    );

    const response = await request(app)
      .post('/api/contact')
      .send(validContact)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Thank you for contacting us! We will get back to you soon.');
    expect(emailService.sendContactFormNotification).toHaveBeenCalledTimes(1);
    expect(emailService.sendContactFormNotification).toHaveBeenCalledWith({
      name: validContact.name,
      email: validContact.email,
      subject: validContact.subject,
      message: validContact.message,
    });
  });

  it('should return 400 for missing required fields', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        // missing email, subject, message
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 for invalid email format', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        ...validContact,
        email: 'invalid-email',
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 for message that is too short', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        ...validContact,
        message: 'Hi', // Too short
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  it('should handle email service errors gracefully', async () => {
    (emailService.sendContactFormNotification as jest.Mock).mockRejectedValue(
      new Error('Email service error')
    );

    const response = await request(app)
      .post('/api/contact')
      .send(validContact)
      .expect(500);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message');
  });

  it('should accept valid contact with extra whitespace and send successfully', async () => {
    (emailService.sendContactFormNotification as jest.Mock).mockResolvedValue(
      undefined
    );

    const contactWithExtraSpaces = {
      name: 'John Doe',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a valid message with enough characters',
    };

    const response = await request(app)
      .post('/api/contact')
      .send(contactWithExtraSpaces)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(emailService.sendContactFormNotification).toHaveBeenCalled();
  });
});
