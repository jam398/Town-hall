/**
 * YouTube Data API Service
 * 
 * Fetches video metadata (view count, publish date, duration) from YouTube API.
 * Requires YOUTUBE_API_KEY environment variable.
 */

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideoStats {
  viewCount: number;
  likeCount: number;
  publishedAt: string;
  duration: string;
  title: string;
  description: string;
  thumbnail: string;
}

/**
 * Fetch video statistics from YouTube API
 */
export async function getVideoStats(videoId: string): Promise<YouTubeVideoStats | null> {
  if (!YOUTUBE_API_KEY) {
    console.warn('[YouTube] API key not configured - returning null');
    return null;
  }

  try {
    const url = `${YOUTUBE_API_BASE}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`[YouTube] API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.warn(`[YouTube] Video not found: ${videoId}`);
      return null;
    }

    const video = data.items[0];
    const snippet = video.snippet;
    const statistics = video.statistics;
    const contentDetails = video.contentDetails;

    return {
      viewCount: parseInt(statistics.viewCount || '0', 10),
      likeCount: parseInt(statistics.likeCount || '0', 10),
      publishedAt: snippet.publishedAt,
      duration: parseDuration(contentDetails.duration),
      title: snippet.title,
      description: snippet.description,
      thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
    };
  } catch (error) {
    console.error(`[YouTube] Error fetching video ${videoId}:`, error);
    return null;
  }
}

/**
 * Fetch stats for multiple videos in a single API call
 */
export async function getMultipleVideoStats(videoIds: string[]): Promise<Map<string, YouTubeVideoStats>> {
  const results = new Map<string, YouTubeVideoStats>();
  
  if (!YOUTUBE_API_KEY || videoIds.length === 0) {
    return results;
  }

  try {
    // YouTube API allows up to 50 video IDs per request
    const batchSize = 50;
    for (let i = 0; i < videoIds.length; i += batchSize) {
      const batch = videoIds.slice(i, i + batchSize);
      const ids = batch.join(',');
      
      const url = `${YOUTUBE_API_BASE}/videos?part=snippet,statistics,contentDetails&id=${ids}&key=${YOUTUBE_API_KEY}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`[YouTube] API error: ${response.status}`);
        continue;
      }

      const data = await response.json();
      
      for (const video of data.items || []) {
        const snippet = video.snippet;
        const statistics = video.statistics;
        const contentDetails = video.contentDetails;

        results.set(video.id, {
          viewCount: parseInt(statistics.viewCount || '0', 10),
          likeCount: parseInt(statistics.likeCount || '0', 10),
          publishedAt: snippet.publishedAt,
          duration: parseDuration(contentDetails.duration),
          title: snippet.title,
          description: snippet.description,
          thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
        });
      }
    }
  } catch (error) {
    console.error('[YouTube] Error fetching multiple videos:', error);
  }

  return results;
}

/**
 * Parse ISO 8601 duration (PT1H2M3S) to human-readable format (1:02:03)
 */
function parseDuration(isoDuration: string): string {
  if (!isoDuration) return '';
  
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return isoDuration;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format view count for display (e.g., 1.2K, 3.4M)
 */
export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export const youtubeService = {
  getVideoStats,
  getMultipleVideoStats,
  formatViewCount,
};
