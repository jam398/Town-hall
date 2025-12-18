import { Router, Request, Response } from 'express';
import { sanityService } from '../services/sanity';
import { youtubeService } from '../services/youtube';

const router = Router();

// Cache for YouTube stats (refresh every 5 minutes)
let youtubeStatsCache: Map<string, any> = new Map();
let lastCacheUpdate = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// GET /api/vlogs - List all vlogs with YouTube stats
router.get('/', async (req: Request, res: Response) => {
  try {
    const vlogs = await sanityService.getVlogPosts();

    // Collect all YouTube IDs
    const youtubeIds = vlogs
      .map((vlog) => vlog.youtubeId)
      .filter((id): id is string => !!id);

    // Fetch YouTube stats if cache is stale
    const now = Date.now();
    if (now - lastCacheUpdate > CACHE_TTL && youtubeIds.length > 0) {
      try {
        youtubeStatsCache = await youtubeService.getMultipleVideoStats(youtubeIds);
        lastCacheUpdate = now;
        console.log(`[Vlogs] Refreshed YouTube stats for ${youtubeStatsCache.size} videos`);
      } catch (ytError) {
        console.error('[Vlogs] Failed to fetch YouTube stats:', ytError);
        // Continue with cached/empty data
      }
    }

    const vlogPosts = vlogs.map((vlog) => {
      const youtubeId = vlog.youtubeId;
      const ytStats = youtubeId ? youtubeStatsCache.get(youtubeId) : null;

      return {
        slug: vlog.slug?.current || vlog.slug,
        title: vlog.title,
        description: vlog.description,
        // Use YouTube publish date if available, otherwise use Sanity date
        publishedAt: ytStats?.publishedAt || vlog.publishedAt,
        youtubeId: youtubeId,
        youtubeUrl: youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : null,
        thumbnail: vlog.thumbnail?.asset?.url || ytStats?.thumbnail,
        // Use YouTube duration if available
        duration: ytStats?.duration || vlog.duration,
        tags: vlog.tags || [],
        // Dynamic stats from YouTube
        views: ytStats?.viewCount || 0,
        viewsFormatted: ytStats ? youtubeService.formatViewCount(ytStats.viewCount) : '0',
        likes: ytStats?.likeCount || 0,
      };
    });

    res.json({ vlogs: vlogPosts });
  } catch (error) {
    console.error('Error fetching vlogs:', error);
    res.status(500).json({ error: 'Failed to fetch vlogs' });
  }
});

export default router;
