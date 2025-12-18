/**
 * YouTube Data API Service
 * 
 * Fetches video statistics and metadata from YouTube API v3
 */

interface YouTubeVideoStats {
  viewCount: string;
  likeCount: string;
  commentCount: string;
  publishedAt: string;
}

interface YouTubeVideoData {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string;
  thumbnail: string;
}

interface YouTubeAPIResponse {
  items?: Array<{
    id: string;
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        default?: { url: string };
        high?: { url: string };
      };
    };
    statistics: {
      viewCount?: string;
      likeCount?: string;
      commentCount?: string;
    };
    contentDetails?: {
      duration: string;
    };
  }>;
}

class YouTubeService {
  private apiKey: string;
  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️  YOUTUBE_API_KEY not set. YouTube features will be limited.');
    }
  }

  /**
   * Extract video ID from YouTube URL
   */
  extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // If URL is just the video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return url;
    }

    return null;
  }

  /**
   * Fetch video statistics from YouTube API
   */
  async getVideoStats(videoId: string): Promise<YouTubeVideoStats | null> {
    if (!this.apiKey) {
      console.warn('Cannot fetch YouTube stats: API key not configured');
      return null;
    }

    try {
      const url = `${this.baseUrl}/videos?part=statistics,snippet&id=${videoId}&key=${this.apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error('YouTube API error:', response.status, response.statusText);
        return null;
      }

      const data = await response.json() as YouTubeAPIResponse;

      if (!data.items || data.items.length === 0) {
        console.warn(`No YouTube video found for ID: ${videoId}`);
        return null;
      }

      const video = data.items[0];
      return {
        viewCount: video.statistics.viewCount || '0',
        likeCount: video.statistics.likeCount || '0',
        commentCount: video.statistics.commentCount || '0',
        publishedAt: video.snippet.publishedAt,
      };
    } catch (error) {
      console.error('Failed to fetch YouTube video stats:', error);
      return null;
    }
  }

  /**
   * Fetch complete video data including stats
   */
  async getVideoData(videoIdOrUrl: string): Promise<YouTubeVideoData | null> {
    const videoId = this.extractVideoId(videoIdOrUrl);
    if (!videoId) {
      console.error('Invalid YouTube URL or video ID:', videoIdOrUrl);
      return null;
    }

    if (!this.apiKey) {
      console.warn('Cannot fetch YouTube data: API key not configured');
      return null;
    }

    try {
      const url = `${this.baseUrl}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${this.apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error('YouTube API error:', response.status, response.statusText);
        return null;
      }

      const data = await response.json() as YouTubeAPIResponse;

      if (!data.items || data.items.length === 0) {
        console.warn(`No YouTube video found for ID: ${videoId}`);
        return null;
      }

      const video = data.items[0];
      return {
        id: videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        viewCount: parseInt(video.statistics.viewCount || '0', 10),
        likeCount: parseInt(video.statistics.likeCount || '0', 10),
        commentCount: parseInt(video.statistics.commentCount || '0', 10),
        duration: this.parseDuration(video.contentDetails.duration),
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
      };
    } catch (error) {
      console.error('Failed to fetch YouTube video data:', error);
      return null;
    }
  }

  /**
   * Parse ISO 8601 duration to readable format
   */
  private parseDuration(isoDuration: string): string {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Batch fetch stats for multiple videos
   */
  async getBatchVideoStats(videoIds: string[]): Promise<Map<string, YouTubeVideoStats>> {
    const statsMap = new Map<string, YouTubeVideoStats>();

    if (!this.apiKey || videoIds.length === 0) {
      return statsMap;
    }

    try {
      // YouTube API allows up to 50 video IDs per request
      const chunks = this.chunkArray(videoIds, 50);

      for (const chunk of chunks) {
        const ids = chunk.join(',');
        const url = `${this.baseUrl}/videos?part=statistics,snippet&id=${ids}&key=${this.apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          console.error('YouTube API error:', response.status, response.statusText);
          continue;
        }

        const data = await response.json() as YouTubeAPIResponse;

        if (data.items) {
          for (const video of data.items) {
            statsMap.set(video.id, {
              viewCount: video.statistics.viewCount || '0',
              likeCount: video.statistics.likeCount || '0',
              commentCount: video.statistics.commentCount || '0',
              publishedAt: video.snippet.publishedAt,
            });
          }
        }
      }
    } catch (error) {
      console.error('Failed to batch fetch YouTube stats:', error);
    }

    return statsMap;
  }

  /**
   * Utility to chunk array
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

// Export singleton instance
export const youtubeService = new YouTubeService();
