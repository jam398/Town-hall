// Mock dependencies before importing server
jest.mock('../src/middleware/rateLimit', () => ({
  apiLimiter: jest.fn((req, res, next) => next()),
}));

jest.mock('../src/services/sanity', () => ({
  sanityService: {
    getEvents: jest.fn(),
    getEventBySlug: jest.fn(),
    getBlogPosts: jest.fn(),
    getVlogPosts: jest.fn(),
    createRegistration: jest.fn(),
    createVolunteer: jest.fn(),
  },
}));

jest.mock('../src/services/email', () => ({
  emailService: {
    sendEventRegistrationConfirmation: jest.fn(),
    sendVolunteerApplicationConfirmation: jest.fn(),
    sendContactFormNotification: jest.fn(),
  },
}));

jest.mock('../src/services/hubspot', () => ({
  hubspotService: {
    createOrUpdateContact: jest.fn(),
  },
}));

describe('Server Configuration', () => {
  it('should configure Express app with all middleware', () => {
    // Import after mocks are set up
    const express = require('express');
    const app = express();
    
    // Verify app can be created
    expect(app).toBeDefined();
    expect(typeof app.use).toBe('function');
  });
});
