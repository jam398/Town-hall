import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { formLimiter } from '../middleware/rateLimit';
import { aiService } from '../services/ai';
import { sanityService } from '../services/sanity';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit (Whisper max)
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/mp4',
      'audio/wav',
      'audio/webm',
      'video/mp4',
      'video/mpeg',
      'video/webm',
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio/video files are allowed.'));
    }
  },
});

// POST /api/ai/transcribe-event - Transcribe event and generate blog post
router.post(
  '/transcribe-event',
  formLimiter,
  upload.single('audio'),
  async (req: Request, res: Response) => {
    let filePath: string | undefined;

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No audio file provided',
        });
      }

      filePath = req.file.path;
      const { eventTitle, eventDate, speakerName, shouldPublish } = req.body;

      if (!eventTitle) {
        return res.status(400).json({
          success: false,
          message: 'Event title is required',
        });
      }

      // Step 1: Transcribe audio
      console.log('Transcribing audio file:', req.file.originalname);
      const transcript = await aiService.transcribeAudio(filePath);

      // Step 2: Generate blog post from transcript
      console.log('Generating blog post from transcript...');
      const blogPost = await aiService.generateBlogPostFromTranscript({
        transcript,
        eventTitle,
        eventDate,
        speakerName,
      });

      // Step 3: Optionally save to Sanity as draft
      let sanityPostId: string | undefined;
      if (shouldPublish === 'true' || shouldPublish === true) {
        console.log('Creating blog post draft in Sanity...');
        
        // Convert markdown content to portable text blocks
        const contentBlocks = blogPost.content.split('\n\n').map((paragraph) => ({
          _type: 'block',
          children: [{ _type: 'span', text: paragraph.replace(/^#+\s/, '') }],
          style: paragraph.startsWith('#') ? 'h2' : 'normal',
        }));

        const draftPost = {
          _type: 'blogPost' as const,
          title: blogPost.title,
          slug: { current: blogPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
          excerpt: blogPost.excerpt,
          content: contentBlocks,
          status: 'draft' as const,
          publishedAt: new Date().toISOString(),
          tags: blogPost.tags,
          readTime: `${Math.ceil(transcript.split(' ').length / 200)} min`, // ~200 words/min
        };

        const created = await sanityService.createBlogPost(draftPost);
        sanityPostId = created._id;
      }

      res.json({
        success: true,
        message: 'Event transcribed and blog post generated successfully',
        data: {
          transcript,
          blogPost,
          sanityPostId,
        },
      });
    } catch (error) {
      console.error('Transcribe event error:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to process audio file',
      });
    } finally {
      // Clean up uploaded file
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }
);

// POST /api/ai/generate-outline - Generate workshop outline
router.post('/generate-outline', formLimiter, async (req: Request, res: Response) => {
  try {
    const { topic, duration, audienceLevel, objectives } = req.body;

    if (!topic || !duration || !audienceLevel) {
      return res.status(400).json({
        success: false,
        message: 'Topic, duration, and audience level are required',
      });
    }

    if (!['beginner', 'intermediate', 'advanced'].includes(audienceLevel)) {
      return res.status(400).json({
        success: false,
        message: 'Audience level must be: beginner, intermediate, or advanced',
      });
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum < 15 || durationNum > 480) {
      return res.status(400).json({
        success: false,
        message: 'Duration must be between 15 and 480 minutes',
      });
    }

    console.log('Generating workshop outline for:', topic);
    const outline = await aiService.generateWorkshopOutline({
      topic,
      duration: durationNum,
      audienceLevel,
      objectives: objectives ? JSON.parse(objectives) : undefined,
    });

    res.json({
      success: true,
      message: 'Workshop outline generated successfully',
      data: outline,
    });
  } catch (error) {
    console.error('Generate outline error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to generate workshop outline',
    });
  }
});

// POST /api/ai/generate-flyer - Generate event flyer
router.post('/generate-flyer', formLimiter, async (req: Request, res: Response) => {
  try {
    const { eventTitle, eventDate, eventTime, location, description, theme } = req.body;

    if (!eventTitle || !eventDate || !eventTime || !location) {
      return res.status(400).json({
        success: false,
        message: 'Event title, date, time, and location are required',
      });
    }

    console.log('Generating event flyer for:', eventTitle);
    const flyer = await aiService.generateEventFlyer({
      eventTitle,
      eventDate,
      eventTime,
      location,
      description: description || '',
      theme,
    });

    res.json({
      success: true,
      message: 'Event flyer generated successfully',
      data: flyer,
    });
  } catch (error) {
    console.error('Generate flyer error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to generate event flyer',
    });
  }
});

export default router;
