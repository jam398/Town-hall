import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { emailService } from '../services/email';
import { sanityService } from '../services/sanity';

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

    const { _id, title, slug, dateTime, location } = req.body;

    if (!_id || !title || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: _id, title, slug',
      });
    }

    // TODO: Send Discord notification when Phase 2.2 is implemented
    // const discordWebhookUrl = process.env.DISCORD_WEBHOOK_EVENTS;
    // if (discordWebhookUrl) {
    //   await sendDiscordNotification(discordWebhookUrl, {
    //     title: `New Event: ${title}`,
    //     url: `${process.env.FRONTEND_URL}/events/${slug.current}`,
    //     description: `📅 ${dateTime} | 📍 ${location}`,
    //   });
    // }

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

    const { _id, _type, title, slug, excerpt } = req.body;

    if (!_id || !_type || !title || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: _id, _type, title, slug',
      });
    }

    const contentType = _type === 'blogPost' ? 'Blog Post' : 'Vlog';

    // TODO: Send Discord notification when Phase 2.2 is implemented
    // const discordWebhookUrl = process.env.DISCORD_WEBHOOK_ANNOUNCEMENTS;
    // if (discordWebhookUrl) {
    //   await sendDiscordNotification(discordWebhookUrl, {
    //     title: `New ${contentType}: ${title}`,
    //     url: `${process.env.FRONTEND_URL}/${_type === 'blogPost' ? 'blog' : 'vlogs'}/${slug.current}`,
    //     description: excerpt || 'Check it out!',
    //   });
    // }

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
