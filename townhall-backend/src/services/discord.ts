/**
 * Discord Notification Service
 * 
 * Sends formatted notifications to Discord channels via webhooks.
 * Supports event announcements, blog posts, and volunteer signups.
 */

interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number;
  image?: {
    url: string;
  };
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
}

interface DiscordMessage {
  content?: string;
  embeds?: DiscordEmbed[];
}

interface Event {
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  location: string;
  featuredImage?: string;
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  author?: {
    name: string;
  };
}

interface Volunteer {
  firstName: string;
  lastName: string;
  email: string;
  interest: string;
  motivation: string;
}

class DiscordService {
  private get eventsWebhookUrl(): string {
    return process.env.DISCORD_EVENTS_WEBHOOK_URL || '';
  }

  private get announcementsWebhookUrl(): string {
    return process.env.DISCORD_ANNOUNCEMENTS_WEBHOOK_URL || '';
  }

  private get volunteersWebhookUrl(): string {
    return process.env.DISCORD_VOLUNTEERS_WEBHOOK_URL || '';
  }

  private get frontendUrl(): string {
    return process.env.FRONTEND_URL || 'http://localhost:3002';
  }

  /**
   * Send a Discord webhook notification
   */
  private async sendWebhook(webhookUrl: string, message: DiscordMessage): Promise<void> {
    if (!webhookUrl) {
      console.warn('[Discord] Webhook URL not configured, skipping notification');
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Discord webhook failed: ${response.status} ${errorText}`);
      }

      console.log('[Discord] Notification sent successfully');
    } catch (error) {
      // Non-blocking: Log error but don't throw
      console.error('[Discord] Failed to send notification:', error);
    }
  }

  /**
   * Convert hex color to Discord decimal color
   */
  private hexToDecimal(hex: string): number {
    return parseInt(hex.replace('#', ''), 16);
  }

  /**
   * Send event published notification to #events channel
   */
  async sendEventNotification(event: Event): Promise<void> {
    const registrationUrl = `${this.frontendUrl}/events/${event.slug}`;
    
    const message: DiscordMessage = {
      content: '🎉 **New Event Published!**',
      embeds: [
        {
          title: event.title,
          description: event.description,
          color: this.hexToDecimal('#FF6B35'), // Brand orange
          fields: [
            {
              name: '📅 Date & Time',
              value: `${event.date} at ${event.time}`,
              inline: true,
            },
            {
              name: '📍 Location',
              value: event.location,
              inline: true,
            },
            {
              name: '👉 Register',
              value: `[Click here to register](${registrationUrl})`,
              inline: false,
            },
          ],
          ...(event.featuredImage && {
            image: {
              url: event.featuredImage,
            },
          }),
        },
      ],
    };

    await this.sendWebhook(this.eventsWebhookUrl, message);
  }

  /**
   * Send blog post notification to #announcements channel
   */
  async sendBlogNotification(post: BlogPost): Promise<void> {
    const postUrl = `${this.frontendUrl}/blog/${post.slug}`;
    
    const message: DiscordMessage = {
      content: '📝 **New Blog Post Published!**',
      embeds: [
        {
          title: post.title,
          description: post.excerpt,
          color: this.hexToDecimal('#4ECDC4'), // Brand cyan
          fields: [
            ...(post.author ? [{
              name: '✍️ Author',
              value: post.author.name,
              inline: true,
            }] : []),
            {
              name: '👉 Read More',
              value: `[Click here to read the full post](${postUrl})`,
              inline: false,
            },
          ],
          ...(post.featuredImage && {
            image: {
              url: post.featuredImage,
            },
          }),
        },
      ],
    };

    await this.sendWebhook(this.announcementsWebhookUrl, message);
  }

  /**
   * Send volunteer signup notification to #volunteers channel
   */
  async sendVolunteerNotification(volunteer: Volunteer): Promise<void> {
    const message: DiscordMessage = {
      content: '🙋 **New Volunteer Application!**',
      embeds: [
        {
          title: `${volunteer.firstName} ${volunteer.lastName}`,
          description: volunteer.motivation,
          color: this.hexToDecimal('#95E1D3'), // Brand green
          fields: [
            {
              name: '📧 Email',
              value: volunteer.email,
              inline: true,
            },
            {
              name: '💡 Interested In',
              value: volunteer.interest,
              inline: true,
            },
            {
              name: '📋 Next Steps',
              value: 'Review and approve in Sanity CMS',
              inline: false,
            },
          ],
        },
      ],
    };

    await this.sendWebhook(this.volunteersWebhookUrl, message);
  }
}

// Export singleton instance
export const discordService = new DiscordService();
