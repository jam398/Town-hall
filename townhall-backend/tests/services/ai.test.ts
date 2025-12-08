// Mock OpenAI before importing the service
const mockCreateTranscription = jest.fn();
const mockCreateChatCompletion = jest.fn();
const mockCreateImage = jest.fn();

jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      audio: {
        transcriptions: {
          create: mockCreateTranscription,
        },
      },
      chat: {
        completions: {
          create: mockCreateChatCompletion,
        },
      },
      images: {
        generate: mockCreateImage,
      },
    })),
  };
});

jest.mock('fs', () => ({
  createReadStream: jest.fn(() => 'mock-stream'),
  existsSync: jest.fn(() => true),
  unlinkSync: jest.fn(),
}));

import { aiService } from '../../src/services/ai';

describe('AI Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('transcribeAudio', () => {
    it('should transcribe audio file successfully', async () => {
      const mockTranscript = 'This is a test transcript of the audio file.';
      mockCreateTranscription.mockResolvedValue(mockTranscript);

      const result = await aiService.transcribeAudio('/path/to/audio.mp3');

      expect(result).toBe(mockTranscript);
      expect(mockCreateTranscription).toHaveBeenCalledWith({
        file: 'mock-stream',
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
      });
    });

    it('should handle transcription errors', async () => {
      mockCreateTranscription.mockRejectedValue(new Error('API error'));

      await expect(
        aiService.transcribeAudio('/path/to/audio.mp3')
      ).rejects.toThrow('Failed to transcribe audio');
    });
  });

  describe('generateBlogPostFromTranscript', () => {
    it('should generate blog post from transcript', async () => {
      const mockBlogPost = {
        title: 'Understanding AI Basics',
        excerpt: 'A comprehensive introduction to AI concepts.',
        content: '## Introduction\n\nAI is transforming technology...',
        keyTakeaways: [
          'AI is a broad field',
          'Machine learning is a subset of AI',
          'Deep learning uses neural networks',
        ],
        tags: ['ai', 'machine-learning', 'technology'],
      };

      mockCreateChatCompletion.mockResolvedValue({
        choices: [
          {
            message: {
              content: JSON.stringify(mockBlogPost),
            },
          },
        ],
      });

      const result = await aiService.generateBlogPostFromTranscript({
        transcript: 'This is a transcript about AI basics...',
        eventTitle: 'AI Workshop',
        eventDate: '2025-12-15',
        speakerName: 'John Doe',
      });

      expect(result).toEqual(mockBlogPost);
      expect(mockCreateChatCompletion).toHaveBeenCalledWith(
        expect.objectContaining({
          model: expect.any(String),
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'system',
            }),
            expect.objectContaining({
              role: 'user',
            }),
          ]),
          response_format: { type: 'json_object' },
        })
      );
    });

    it('should handle missing response from OpenAI', async () => {
      mockCreateChatCompletion.mockResolvedValue({
        choices: [{ message: { content: null } }],
      });

      await expect(
        aiService.generateBlogPostFromTranscript({
          transcript: 'Test transcript',
          eventTitle: 'Test Event',
        })
      ).rejects.toThrow('Failed to generate blog post from transcript');
    });

    it('should handle API errors', async () => {
      mockCreateChatCompletion.mockRejectedValue(new Error('API rate limit'));

      await expect(
        aiService.generateBlogPostFromTranscript({
          transcript: 'Test transcript',
          eventTitle: 'Test Event',
        })
      ).rejects.toThrow('Failed to generate blog post from transcript');
    });
  });

  describe('generateWorkshopOutline', () => {
    it('should generate workshop outline successfully', async () => {
      const mockOutline = {
        title: 'Introduction to Machine Learning',
        description: 'Learn the basics of ML in this hands-on workshop.',
        outline: [
          {
            section: 'Introduction',
            duration: 15,
            topics: ['What is ML?', 'Types of ML'],
            activities: ['Group discussion'],
          },
          {
            section: 'Hands-on Practice',
            duration: 45,
            topics: ['Building your first model'],
            activities: ['Coding exercise'],
          },
        ],
        materials: ['Laptop', 'Python installed', 'Jupyter notebook'],
        prerequisites: ['Basic Python knowledge'],
      };

      mockCreateChatCompletion.mockResolvedValue({
        choices: [
          {
            message: {
              content: JSON.stringify(mockOutline),
            },
          },
        ],
      });

      const result = await aiService.generateWorkshopOutline({
        topic: 'Introduction to Machine Learning',
        duration: 60,
        audienceLevel: 'beginner',
        objectives: ['Understand ML basics', 'Build first model'],
      });

      expect(result).toEqual(mockOutline);
      expect(mockCreateChatCompletion).toHaveBeenCalled();
    });

    it('should handle different audience levels', async () => {
      const mockOutline = {
        title: 'Advanced Deep Learning',
        description: 'Deep dive into neural networks.',
        outline: [],
        materials: [],
        prerequisites: ['ML experience', 'Python proficiency'],
      };

      mockCreateChatCompletion.mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(mockOutline) } }],
      });

      const result = await aiService.generateWorkshopOutline({
        topic: 'Advanced Deep Learning',
        duration: 120,
        audienceLevel: 'advanced',
      });

      expect(result.prerequisites).toContain('ML experience');
    });

    it('should handle errors', async () => {
      mockCreateChatCompletion.mockRejectedValue(new Error('API error'));

      await expect(
        aiService.generateWorkshopOutline({
          topic: 'Test Topic',
          duration: 60,
          audienceLevel: 'beginner',
        })
      ).rejects.toThrow('Failed to generate workshop outline');
    });
  });

  describe('generateEventFlyer', () => {
    it('should generate event flyer successfully', async () => {
      const mockImageUrl = 'https://example.com/flyer.png';
      
      mockCreateImage.mockResolvedValue({
        data: [{ url: mockImageUrl }],
      });

      const result = await aiService.generateEventFlyer({
        eventTitle: 'AI Workshop',
        eventDate: 'December 15, 2025',
        eventTime: '6:00 PM',
        location: 'Newark Public Library',
        description: 'Learn about AI',
        theme: 'Modern tech',
      });

      expect(result.imageUrl).toBe(mockImageUrl);
      expect(result.prompt).toContain('AI Workshop');
      expect(mockCreateImage).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'dall-e-3',
          n: 1,
          size: '1024x1024',
        })
      );
    });

    it('should handle missing image data', async () => {
      mockCreateImage.mockResolvedValue({
        data: undefined,
      });

      await expect(
        aiService.generateEventFlyer({
          eventTitle: 'Test Event',
          eventDate: '2025-12-15',
          eventTime: '6:00 PM',
          location: 'Test Location',
          description: 'Test',
        })
      ).rejects.toThrow('Failed to generate event flyer');
    });

    it('should handle empty data array', async () => {
      mockCreateImage.mockResolvedValue({
        data: [],
      });

      await expect(
        aiService.generateEventFlyer({
          eventTitle: 'Test Event',
          eventDate: '2025-12-15',
          eventTime: '6:00 PM',
          location: 'Test Location',
          description: 'Test',
        })
      ).rejects.toThrow('Failed to generate event flyer');
    });

    it('should handle API errors', async () => {
      mockCreateImage.mockRejectedValue(new Error('DALL-E API error'));

      await expect(
        aiService.generateEventFlyer({
          eventTitle: 'Test Event',
          eventDate: '2025-12-15',
          eventTime: '6:00 PM',
          location: 'Test Location',
          description: 'Test',
        })
      ).rejects.toThrow('Failed to generate event flyer');
    });
  });

  describe('generateFlyerVariation', () => {
    it('should generate flyer variation successfully', async () => {
      const mockImageUrl = 'https://example.com/flyer-variation.png';
      
      mockCreateImage.mockResolvedValue({
        data: [{ url: mockImageUrl }],
      });

      const result = await aiService.generateFlyerVariation({
        originalPrompt: 'Original flyer prompt',
        variation: 'Make it more colorful',
      });

      expect(result).toBe(mockImageUrl);
      expect(mockCreateImage).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      mockCreateImage.mockRejectedValue(new Error('API error'));

      await expect(
        aiService.generateFlyerVariation({
          originalPrompt: 'Original prompt',
          variation: 'New variation',
        })
      ).rejects.toThrow('Failed to generate flyer variation');
    });
  });
});
