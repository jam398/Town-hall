// Mock Resend BEFORE importing the service
const mockSend = jest.fn();
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}));

import { emailService } from '../../src/services/email';

describe('Email Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSend.mockResolvedValue({ id: 'test-email-id' });
  });

  describe('sendEventRegistrationConfirmation', () => {
    it('should send event registration confirmation email', async () => {
      const data = {
        to: 'test@example.com',
        firstName: 'John',
        eventTitle: 'AI Workshop',
        eventDate: '2025-12-15',
        eventTime: '6:00 PM',
        eventLocation: 'Newark Public Library',
      };

      await emailService.sendEventRegistrationConfirmation(data);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: expect.any(String),
          to: data.to,
          subject: expect.stringContaining(data.eventTitle),
        })
      );
    });

    it('should handle email sending errors', async () => {
      mockSend.mockRejectedValue(new Error('Email failed'));

      const data = {
        to: 'test@example.com',
        firstName: 'John',
        eventTitle: 'AI Workshop',
        eventDate: '2025-12-15',
        eventTime: '6:00 PM',
        eventLocation: 'Newark Public Library',
      };

      await expect(
        emailService.sendEventRegistrationConfirmation(data)
      ).rejects.toThrow('Failed to send confirmation email');
    });
  });

  describe('sendVolunteerApplicationConfirmation', () => {
    it('should send volunteer application confirmation email', async () => {
      const data = {
        to: 'volunteer@example.com',
        firstName: 'Jane',
        interest: 'event-planning',
      };

      await emailService.sendVolunteerApplicationConfirmation(data);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: expect.any(String),
          to: data.to,
          subject: expect.stringContaining('Volunteer'),
        })
      );
    });

    it('should handle email sending errors', async () => {
      mockSend.mockRejectedValue(new Error('Send failed'));

      const data = {
        to: 'volunteer@example.com',
        firstName: 'Jane',
        interest: 'event-planning',
      };

      await expect(
        emailService.sendVolunteerApplicationConfirmation(data)
      ).rejects.toThrow('Failed to send volunteer confirmation email');
    });
  });

  describe('sendContactFormNotification', () => {
    it('should send contact form notification email', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question',
        message: 'I have a question about your events',
      };

      await emailService.sendContactFormNotification(data);

      expect(mockSend).toHaveBeenCalledTimes(2); // One to team, one to user
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: expect.stringContaining(data.subject),
        })
      );
    });

    it('should handle email sending errors', async () => {
      mockSend.mockRejectedValue(new Error('Send failed'));

      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question',
        message: 'I have a question about your events',
      };

      await expect(
        emailService.sendContactFormNotification(data)
      ).rejects.toThrow('Failed to send contact form notification');
    });
  });
});
