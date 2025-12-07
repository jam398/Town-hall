import { Router, Request, Response } from 'express';
import { sanityService } from '../services/sanity';

const router = Router();

// GET /api/vlogs - List all vlogs
router.get('/', async (req: Request, res: Response) => {
  try {
    const vlogs = await sanityService.getVlogPosts();

    const vlogPosts = vlogs.map((vlog) => ({
      slug: vlog.slug?.current || vlog.slug,
      title: vlog.title,
      description: vlog.description,
      publishedAt: vlog.publishedAt,
      youtubeId: vlog.youtubeId,
      youtubeUrl: vlog.youtubeUrl,
      thumbnail: vlog.thumbnail?.asset?.url,
      duration: vlog.duration,
      tags: vlog.tags || [],
    }));

    res.json({ vlogs: vlogPosts });
  } catch (error) {
    console.error('Error fetching vlogs:', error);
    res.status(500).json({ error: 'Failed to fetch vlogs' });
  }
});

export default router;
