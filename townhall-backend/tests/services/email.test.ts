// Set mock API key before importing the service
process.env.RESEND_API_KEY = 'test_api_key';

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

  describe('sendEventReminder', () => {
    it('should send event reminder email', async () => {
      const data = {
        to: 'attendee@example.com',
        firstName: 'John',
        eventTitle: 'AI Workshop',
        eventDate: 'December 15, 2025',
        eventTime: '6:00 PM',
        eventLocation: 'Newark Public Library',
        eventAddress: '5 Washington St, Newark, NJ 07102',
      };

      await emailService.sendEventReminder(data);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: data.to,
          subject: expect.stringContaining('Tomorrow'),
          html: expect.stringContaining(data.firstName),
        })
      );
    });

    it('should handle email sending errors', async () => {
      mockSend.mockRejectedValue(new Error('Send failed'));

      const data = {
        to: 'attendee@example.com',
        firstName: 'John',
        eventTitle: 'AI Workshop',
        eventDate: 'December 15, 2025',
        eventTime: '6:00 PM',
        eventLocation: 'Newark Public Library',
        eventAddress: '5 Washington St, Newark, NJ 07102',
      };

      await expect(
        emailService.sendEventReminder(data)
      ).rejects.toThrow('Failed to send event reminder');
    });
  });

  describe('sendPostEventFollowUp', () => {
    it('should send post-event follow-up with all optional content', async () => {
      const data = {
        to: 'attendee@example.com',
        firstName: 'John',
        eventTitle: 'AI Workshop',
        recordingUrl: 'https://example.com/recording',
        summaryUrl: 'https://example.com/summary',
        nextEvents: [
          { title: 'Next Workshop', date: 'January 15, 2026', slug: 'next-workshop' },
        ],
      };

      await emailService.sendPostEventFollowUp(data);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: data.to,
          subject: expect.stringContaining('Thanks for attending'),
          html: expect.stringContaining(data.recordingUrl),
        })
      );
    });

    it('should send post-event follow-up without optional content', async () => {
      const data = {
        to: 'attendee@example.com',
        firstName: 'John',
        eventTitle: 'AI Workshop',
      };

      await emailService.sendPostEventFollowUp(data);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: data.to,
          subject: expect.stringContaining('Thanks for attending'),
        })
      );
    });

    it('should handle email sending errors', async () => {
      mockSend.mockRejectedValue(new Error('Send failed'));

      const data = {
        to: 'attendee@example.com',
        firstName: 'John',
        eventTitle: 'AI Workshop',
      };

      await expect(
        emailService.sendPostEventFollowUp(data)
      ).rejects.toThrow('Failed to send post-event follow-up');
    });
  });

  describe('sendVolunteerApprovedNotification', () => {
    it('should send volunteer approved notification with Discord invite', async () => {
      const data = {
        to: 'volunteer@example.com',
        firstName: 'Jane',
        discordInviteUrl: 'https://discord.gg/example',
      };

      await emailService.sendVolunteerApprovedNotification(data);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: data.to,
          subject: expect.stringContaining('approved'),
          html: expect.stringContaining(data.discordInviteUrl),
        })
      );
    });

    it('should send volunteer approved notification without Discord invite', async () => {
      const data = {
        to: 'volunteer@example.com',
        firstName: 'Jane',
      };

      await emailService.sendVolunteerApprovedNotification(data);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: data.to,
          subject: expect.stringContaining('approved'),
        })
      );
    });

    it('should handle email sending errors', async () => {
      mockSend.mockRejectedValue(new Error('Send failed'));

      const data = {
        to: 'volunteer@example.com',
        firstName: 'Jane',
      };

      await expect(
        emailService.sendVolunteerApprovedNotification(data)
      ).rejects.toThrow('Failed to send volunteer approved notification');
    });
  });
});
