import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { emailService } from '../services/email';
import { sanityService } from '../services/sanity';
import { n8nService } from '../services/n8n';

const router = Router();

// Verify Sanity webhook signature
function verifySanityWebhook(req: Request): boolean {
  const signature = req.headers['sanity-webhook-signature'] as string;
  const secret = process.env.SANITY_WEBHOOK_SECRET;

  if (!secret || !signature) {
    return false;
  }

  const body = JSON.stringify(req.body);
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return `sha256=${hash}` === signature;
}

// POST /api/webhooks/volunteer-approved - Triggered when admin approves volunteer
router.post('/volunteer-approved', async (req: Request, res: Response) => {
  try {
    // Verify webhook signature (optional but recommended)
    if (process.env.SANITY_WEBHOOK_SECRET && !verifySanityWebhook(req)) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Invalid webhook signature',
      });
    }

    const { _id, firstName, email } = req.body;

    if (!_id || !firstName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: _id, firstName, email',
      });
    }

    // Send approval notification email
    await emailService.sendVolunteerApprovedNotification({
      to: email,
      firstName,
      discordInviteUrl: process.env.DISCORD_INVITE_VOLUNTEER,
    });

    console.log(`Volunteer approved notification sent to: ${email}`);

    res.json({
      success: true,
      message: 'Volunteer approval notification sent',
    });
  } catch (error) {
    console.error('Volunteer approval webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process volunteer approval',
    });
  }
});

// POST /api/webhooks/event-published - Triggered when event is published
router.post('/event-published', async (req: Request, res: Response) => {
  try {
    // Verify webhook signature
    if (process.env.SANITY_WEBHOOK_SECRET && !verifySanityWebhook(req)) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Invalid webhook signature',
      });
    }

    const { _id, title, slug, description, dateTime, location, featuredImage } = req.body;

    if (!_id || !title || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: _id, title, slug',
      });
    }

    // Get full event details from Sanity
    const event = await sanityService.getEventBySlug(slug.current);
    if (event) {
      // Parse dateTime into date and time
      const eventDate = new Date(event.dateTime);
      const dateStr = eventDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const timeStr = eventDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });

      // Trigger n8n workflow for Discord notification
      await n8nService.notifyEventPublished({
        title: event.title,
        slug: event.slug.current,
        description: event.description,
        date: dateStr,
        time: timeStr,
        location: event.location,
        featuredImage: event.featuredImage,
      });
    }

    console.log(`Event published: ${title} (${slug.current})`);

    res.json({
      success: true,
      message: 'Event publication processed',
    });
  } catch (error) {
    console.error('Event published webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process event publication',
    });
  }
});

// POST /api/webhooks/content-published - Triggered when blog/vlog is published
router.post('/content-published', async (req: Request, res: Response) => {
  try {
    // Verify webhook signature
    if (process.env.SANITY_WEBHOOK_SECRET && !verifySanityWebhook(req)) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Invalid webhook signature',
      });
    }

    const { _id, _type, title, slug, excerpt, featuredImage, author } = req.body;

    if (!_id || !_type || !title || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: _id, _type, title, slug',
      });
    }

    const contentType = _type === 'blogPost' ? 'Blog Post' : 'Vlog';

    // Trigger n8n workflow for Discord notification (blog posts only)
    if (_type === 'blogPost') {
      await n8nService.notifyBlogPublished({
        title,
        slug: slug.current,
        excerpt: excerpt || 'Check out our latest blog post!',
        featuredImage: featuredImage?.asset?.url,
        author: author ? { name: author.name } : undefined,
      });
    }

    console.log(`Content published: ${contentType} - ${title} (${slug.current})`);

    res.json({
      success: true,
      message: 'Content publication processed',
    });
  } catch (error) {
    console.error('Content published webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process content publication',
    });
  }
});

export default router;
