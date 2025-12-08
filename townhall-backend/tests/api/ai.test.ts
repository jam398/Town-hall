import request from 'supertest';
import express from 'express';
import path from 'path';

// Mock OpenAI before importing anything that uses it
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      audio: {
        transcriptions: {
          create: jest.fn(),
        },
      },
      chat: {
        completions: {
          create: jest.fn(),
        },
      },
      images: {
        generate: jest.fn(),
      },
    })),
  };
});

import aiRouter from '../../src/api/ai';
import { aiService } from '../../src/services/ai';
import { sanityService } from '../../src/services/sanity';
import { errorHandler } from '../../src/middleware/errorHandler';

// Mock services
jest.mock('../../src/services/ai');
jest.mock('../../src/services/sanity');

const app = express();
app.use(express.json());
app.use('/api/ai', aiRouter);
app.use(errorHandler);

describe('AI API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/ai/transcribe-event', () => {
    it('should transcribe audio and generate blog post', async () => {
      const mockTranscript = 'This is a test transcript.';
      const mockBlogPost = {
        title: 'Test Blog Post',
        excerpt: 'Test excerpt',
        content: '## Test Content',
        keyTakeaways: ['Key 1', 'Key 2'],
        tags: ['test', 'ai'],
      };

      (aiService.transcribeAudio as jest.Mock).mockResolvedValue(mockTranscript);
      (aiService.generateBlogPostFromTranscript as jest.Mock).mockResolvedValue(mockBlogPost);

      const response = await request(app)
        .post('/api/ai/transcribe-event')
        .field('eventTitle', 'Test Event')
        .field('eventDate', '2025-12-15')
        .field('speakerName', 'John Doe')
        .attach('audio', Buffer.from('fake audio data'), 'test.mp3')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.transcript).toBe(mockTranscript);
      expect(response.body.data.blogPost).toEqual(mockBlogPost);
      expect(aiService.transcribeAudio).toHaveBeenCalled();
      expect(aiService.generateBlogPostFromTranscript).toHaveBeenCalledWith({
        transcript: mockTranscript,
        eventTitle: 'Test Event',
        eventDate: '2025-12-15',
        speakerName: 'John Doe',
      });
    });

    it('should return 400 when no audio file provided', async () => {
      const response = await request(app)
        .post('/api/ai/transcribe-event')
        .field('eventTitle', 'Test Event')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('No audio file');
    });

    it('should return 400 when eventTitle is missing', async () => {
      const response = await request(app)
        .post('/api/ai/transcribe-event')
        .attach('audio', Buffer.from('fake audio data'), 'test.mp3')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Event title is required');
    });

    it('should create Sanity draft when shouldPublish is true', async () => {
      const mockTranscript = 'Test transcript';
      const mockBlogPost = {
        title: 'Test Post',
        excerpt: 'Excerpt',
        content: 'Content',
        keyTakeaways: ['Key 1'],
        tags: ['test'],
      };
      const mockSanityPost = { _id: 'post-123', ...mockBlogPost };

      (aiService.transcribeAudio as jest.Mock).mockResolvedValue(mockTranscript);
      (aiService.generateBlogPostFromTranscript as jest.Mock).mockResolvedValue(mockBlogPost);
      (sanityService.createBlogPost as jest.Mock).mockResolvedValue(mockSanityPost);

      const response = await request(app)
        .post('/api/ai/transcribe-event')
        .field('eventTitle', 'Test Event')
        .field('shouldPublish', 'true')
        .attach('audio', Buffer.from('fake audio data'), 'test.mp3')
        .expect(200);

      expect(response.body.data.sanityPostId).toBe('post-123');
      expect(sanityService.createBlogPost).toHaveBeenCalled();
    });

    it('should handle transcription errors', async () => {
      (aiService.transcribeAudio as jest.Mock).mockRejectedValue(
        new Error('Transcription failed')
      );

      const response = await request(app)
        .post('/api/ai/transcribe-event')
        .field('eventTitle', 'Test Event')
        .attach('audio', Buffer.from('fake audio data'), 'test.mp3')
        .expect(500);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/ai/generate-outline', () => {
    it('should generate workshop outline successfully', async () => {
      const mockOutline = {
        title: 'Test Workshop',
        description: 'Test description',
        outline: [
          {
            section: 'Introduction',
            duration: 15,
            topics: ['Topic 1'],
            activities: ['Activity 1'],
          },
        ],
        materials: ['Material 1'],
        prerequisites: ['Prerequisite 1'],
      };

      (aiService.generateWorkshopOutline as jest.Mock).mockResolvedValue(mockOutline);

      const response = await request(app)
        .post('/api/ai/generate-outline')
        .send({
          topic: 'Introduction to AI',
          duration: 60,
          audienceLevel: 'beginner',
          objectives: JSON.stringify(['Learn AI basics', 'Build first model']),
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockOutline);
      expect(aiService.generateWorkshopOutline).toHaveBeenCalledWith({
        topic: 'Introduction to AI',
        duration: 60,
        audienceLevel: 'beginner',
        objectives: ['Learn AI basics', 'Build first model'],
      });
    });

    it('should return 400 when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/ai/generate-outline')
        .send({ topic: 'Test Topic' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('required');
    });

    it('should return 400 for invalid audience level', async () => {
      const response = await request(app)
        .post('/api/ai/generate-outline')
        .send({
          topic: 'Test Topic',
          duration: 60,
          audienceLevel: 'invalid',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Audience level must be');
    });

    it('should return 400 for invalid duration', async () => {
      const response = await request(app)
        .post('/api/ai/generate-outline')
        .send({
          topic: 'Test Topic',
          duration: 10, // Too short
          audienceLevel: 'beginner',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Duration must be between');
    });

    it('should handle generation errors', async () => {
      (aiService.generateWorkshopOutline as jest.Mock).mockRejectedValue(
        new Error('Generation failed')
      );

      const response = await request(app)
        .post('/api/ai/generate-outline')
        .send({
          topic: 'Test Topic',
          duration: 60,
          audienceLevel: 'beginner',
        })
        .expect(500);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/ai/generate-flyer', () => {
    it('should generate event flyer successfully', async () => {
      const mockFlyer = {
        imageUrl: 'https://example.com/flyer.png',
        prompt: 'Test prompt',
      };

      (aiService.generateEventFlyer as jest.Mock).mockResolvedValue(mockFlyer);

      const response = await request(app)
        .post('/api/ai/generate-flyer')
        .send({
          eventTitle: 'AI Workshop',
          eventDate: 'December 15, 2025',
          eventTime: '6:00 PM',
          location: 'Newark Public Library',
          description: 'Learn about AI',
          theme: 'Modern tech',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(mockFlyer);
      expect(aiService.generateEventFlyer).toHaveBeenCalledWith({
        eventTitle: 'AI Workshop',
        eventDate: 'December 15, 2025',
        eventTime: '6:00 PM',
        location: 'Newark Public Library',
        description: 'Learn about AI',
        theme: 'Modern tech',
      });
    });

    it('should return 400 when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/ai/generate-flyer')
        .send({
          eventTitle: 'Test Event',
          // Missing date, time, location
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('required');
    });

    it('should handle generation errors', async () => {
      (aiService.generateEventFlyer as jest.Mock).mockRejectedValue(
        new Error('DALL-E error')
      );

      const response = await request(app)
        .post('/api/ai/generate-flyer')
        .send({
          eventTitle: 'Test Event',
          eventDate: '2025-12-15',
          eventTime: '6:00 PM',
          location: 'Test Location',
        })
        .expect(500);

      expect(response.body.success).toBe(false);
    });
  });
});
