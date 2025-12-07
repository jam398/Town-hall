import { Router, Request, Response } from 'express';
import { sanityService } from '../services/sanity';

const router = Router();

// GET /api/health - Health check endpoint
router.get('/', async (req: Request, res: Response) => {
  try {
    // Check if Sanity is accessible
    await sanityService.getEvents();

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'up',
        sanity: 'up',
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'up',
        sanity: 'down',
      },
    });
  }
});

export default router;
