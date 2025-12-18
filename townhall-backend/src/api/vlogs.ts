import { Router, Request, Response } from 'express';
import { sanityService } from '../services/sanity';
import { youtubeService } from '../services/youtube';

const router = Router();

// GET /api/vlogs - List all vlogs with YouTube stats
router.get('/', async (req: Request, res: Response) => {
  try {
    const vlogs = await sanityService.getVlogPosts();

    // Extract YouTube video IDs
    const videoIds = vlogs
      .map((vlog) => {
        if (vlog.youtubeId) return vlog.youtubeId;
        if (vlog.youtubeUrl) return youtubeService.extractVideoId(vlog.youtubeUrl);
        return null;
      })
      .filter((id): id is string => id !== null);

    // Batch fetch YouTube stats
    const youtubeStats = await youtubeService.getBatchVideoStats(videoIds);

    // Combine Sanity data with YouTube stats
    const vlogPosts = vlogs.map((vlog) => {
      const videoId = vlog.youtubeId || youtubeService.extractVideoId(vlog.youtubeUrl || '');
      const stats = videoId ? youtubeStats.get(videoId) : null;

      return {
        slug: vlog.slug?.current || vlog.slug,
        title: vlog.title,
        description: vlog.description,
        publishedAt: stats?.publishedAt || vlog.publishedAt,
        youtubeId: videoId,
        youtubeUrl: vlog.youtubeUrl,
        thumbnail: vlog.thumbnail?.asset?.url,
        duration: vlog.duration,
        tags: vlog.tags || [],
        // YouTube stats
        viewCount: stats ? parseInt(stats.viewCount, 10) : 0,
        likeCount: stats ? parseInt(stats.likeCount, 10) : 0,
        commentCount: stats ? parseInt(stats.commentCount, 10) : 0,
      };
    });

    res.json({ vlogs: vlogPosts });
  } catch (error) {
    console.error('Error fetching vlogs:', error);
    res.status(500).json({ error: 'Failed to fetch vlogs' });
  }
});

export default router;
