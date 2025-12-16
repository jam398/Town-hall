/**
 * n8n Workflow Service
 * 
 * Triggers n8n workflows for event-driven automations.
 * n8n handles the actual Discord API calls, keeping workflows centralized.
 */

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

class N8nService {
  private get baseUrl(): string {
    return process.env.N8N_WEBHOOK_BASE_URL || 'http://localhost:5678/webhook';
  }

  private get frontendUrl(): string {
    return process.env.FRONTEND_URL || 'http://localhost:3002';
  }

  /**
   * Trigger an n8n webhook
   */
  private async triggerWebhook(path: string, data: any): Promise<void> {
    const webhookUrl = `${this.baseUrl}/${path}`;

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`n8n webhook failed: ${response.status} ${errorText}`);
      }

      console.log(`[n8n] Triggered workflow: ${path}`);
    } catch (error) {
      // Non-blocking: Log error but don't throw
      console.error(`[n8n] Failed to trigger workflow ${path}:`, error);
    }
  }

  /**
   * Trigger Discord event notification workflow
   */
  async notifyEventPublished(event: Event): Promise<void> {
    await this.triggerWebhook('discord-event-published', {
      title: event.title,
      slug: event.slug,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      featuredImage: event.featuredImage,
      registrationUrl: `${this.frontendUrl}/events/${event.slug}`,
    });
  }

  /**
   * Trigger Discord blog notification workflow
   */
  async notifyBlogPublished(post: BlogPost): Promise<void> {
    await this.triggerWebhook('discord-blog-published', {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      author: post.author,
      postUrl: `${this.frontendUrl}/blog/${post.slug}`,
    });
  }

  /**
   * Trigger Discord volunteer notification workflow
   */
  async notifyVolunteerSignup(volunteer: Volunteer): Promise<void> {
    await this.triggerWebhook('discord-volunteer-signup', {
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      email: volunteer.email,
      interest: volunteer.interest,
      motivation: volunteer.motivation,
    });
  }
}

// Export singleton instance
export const n8nService = new N8nService();
