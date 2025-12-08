import { Router, Request, Response } from 'express';
import { hubspotService } from '../services/hubspot';

const router = Router();

// POST /api/newsletter - Subscribe to newsletter
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Add to HubSpot as newsletter subscriber
    try {
      // Extract name from email if not provided (firstname@domain.com)
      const emailUser = email.split('@')[0];
      // Remove dots and capitalize first letter
      const cleanName = emailUser.split('.')[0];
      const firstName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      
      await hubspotService.createOrUpdateContact({
        email,
        firstName,
        lastName: 'Newsletter Subscriber',
        tags: ['newsletter'],
      });

      res.json({
        success: true,
        message: 'Successfully subscribed to newsletter',
      });
    } catch (hubspotError: any) {
      // Handle duplicate subscription gracefully
      if (hubspotError.message && hubspotError.message.includes('already exists')) {
        return res.json({
          success: true,
          message: 'You are already subscribed to our newsletter',
        });
      }
      throw hubspotError;
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  }
});

export default router;
