import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiService = {
  /**
   * Transcribe audio/video file using Whisper API
   */
  async transcribeAudio(filePath: string): Promise<string> {
    try {
      const fileStream = fs.createReadStream(filePath);
      
      const transcription = await openai.audio.transcriptions.create({
        file: fileStream,
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
      });

      return transcription;
    } catch (error) {
      console.error('Whisper transcription error:', error);
      throw new Error('Failed to transcribe audio');
    }
  },

  /**
   * Generate blog post from transcript
   */
  async generateBlogPostFromTranscript(data: {
    transcript: string;
    eventTitle: string;
    eventDate?: string;
    speakerName?: string;
  }): Promise<{
    title: string;
    excerpt: string;
    content: string;
    keyTakeaways: string[];
    tags: string[];
  }> {
    const { transcript, eventTitle, eventDate, speakerName } = data;

    try {
      const prompt = `You are a professional content writer for Town Hall Newark, an AI community nonprofit.

Convert this event transcript into a well-structured blog post.

Event Title: ${eventTitle}
${eventDate ? `Event Date: ${eventDate}` : ''}
${speakerName ? `Speaker: ${speakerName}` : ''}

Transcript:
${transcript}

Generate a blog post with:
1. An engaging title (different from event title if needed)
2. A compelling excerpt (2-3 sentences, ~150 chars)
3. Well-structured content with headers and paragraphs (use markdown formatting)
4. 5-7 key takeaways as bullet points
5. 3-5 relevant tags

Format your response as JSON:
{
  "title": "Blog post title",
  "excerpt": "Brief summary",
  "content": "Full markdown content with ## headers and paragraphs",
  "keyTakeaways": ["takeaway 1", "takeaway 2", ...],
  "tags": ["tag1", "tag2", ...]
}`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional content writer specializing in AI and technology topics. Generate engaging, informative blog posts from transcripts.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 3000,
      });

      const response = completion.choices[0].message.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const blogPost = JSON.parse(response);
      return blogPost;
    } catch (error) {
      console.error('Blog post generation error:', error);
      throw new Error('Failed to generate blog post from transcript');
    }
  },

  /**
   * Generate workshop outline
   */
  async generateWorkshopOutline(data: {
    topic: string;
    duration: number; // in minutes
    audienceLevel: 'beginner' | 'intermediate' | 'advanced';
    objectives?: string[];
  }): Promise<{
    title: string;
    description: string;
    outline: Array<{
      section: string;
      duration: number;
      topics: string[];
      activities?: string[];
    }>;
    materials: string[];
    prerequisites: string[];
  }> {
    const { topic, duration, audienceLevel, objectives } = data;

    try {
      const prompt = `You are an experienced workshop facilitator and educator for Town Hall Newark, an AI community nonprofit.

Create a detailed workshop outline for:

Topic: ${topic}
Duration: ${duration} minutes
Audience Level: ${audienceLevel}
${objectives ? `Learning Objectives: ${objectives.join(', ')}` : ''}

Generate a structured workshop outline including:
1. Workshop title and description
2. Time-segmented outline with sections, topics, and activities
3. Required materials and resources
4. Prerequisites (if any)

Ensure the timing adds up to ${duration} minutes total.

Format your response as JSON:
{
  "title": "Workshop title",
  "description": "2-3 sentence description",
  "outline": [
    {
      "section": "Introduction",
      "duration": 10,
      "topics": ["topic 1", "topic 2"],
      "activities": ["activity 1"]
    }
  ],
  "materials": ["material 1", "material 2"],
  "prerequisites": ["prerequisite 1"]
}`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an experienced educator and workshop facilitator specializing in AI and technology education.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8,
        max_tokens: 2000,
      });

      const response = completion.choices[0].message.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const outline = JSON.parse(response);
      return outline;
    } catch (error) {
      console.error('Workshop outline generation error:', error);
      throw new Error('Failed to generate workshop outline');
    }
  },

  /**
   * Generate event flyer image using DALL-E
   */
  async generateEventFlyer(data: {
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    location: string;
    description: string;
    theme?: string;
  }): Promise<{
    imageUrl: string;
    prompt: string;
  }> {
    const { eventTitle, eventDate, eventTime, location, description, theme } = data;

    try {
      // Create a detailed prompt for DALL-E
      const prompt = `Create a modern, professional event flyer for an AI community event:

Title: "${eventTitle}"
Date: ${eventDate} at ${eventTime}
Location: ${location}

Style: ${theme || 'Modern tech aesthetic with Bauhaus-inspired design'}
Colors: Blue (#0064B4), Red (#E1000F), Black, White
Elements: Clean typography, geometric shapes, tech/AI iconography
Mood: Professional, innovative, community-focused, welcoming

The flyer should be eye-catching, suitable for social media, and clearly communicate that this is a free community AI event in Newark, NJ.`;

      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid',
      });

      if (!response.data || response.data.length === 0) {
        throw new Error('No image data returned from DALL-E');
      }

      const imageUrl = response.data[0].url;
      if (!imageUrl) {
        throw new Error('No image URL returned from DALL-E');
      }

      return {
        imageUrl,
        prompt,
      };
    } catch (error) {
      console.error('Event flyer generation error:', error);
      throw new Error('Failed to generate event flyer');
    }
  },

  /**
   * Generate smaller variations or edits of existing flyers
   */
  async generateFlyerVariation(data: {
    originalPrompt: string;
    variation: string;
  }): Promise<string> {
    try {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `${data.originalPrompt}\n\nVariation: ${data.variation}`,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      });

      if (!response.data || response.data.length === 0) {
        throw new Error('No image data returned from DALL-E');
      }

      const imageUrl = response.data[0].url;
      if (!imageUrl) {
        throw new Error('No image URL returned from DALL-E');
      }

      return imageUrl;
    } catch (error) {
      console.error('Flyer variation generation error:', error);
      throw new Error('Failed to generate flyer variation');
    }
  },
};
