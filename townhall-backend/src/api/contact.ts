import { Router, Request, Response } from 'express';
import { formLimiter } from '../middleware/rateLimit';
import { validate, contactSchema } from '../middleware/validation';
import { emailService } from '../services/email';
import { hubspotService } from '../services/hubspot';
import { ContactRequest } from '../types';

const router = Router();

// POST /api/contact - Submit contact form
router.post(
  '/',
  formLimiter,
  validate(contactSchema),
  async (req: Request, res: Response) => {
    try {
      const data: ContactRequest = req.body;
      const { name, email, subject, message } = data;

      // Send notification to team and confirmation to user
      await emailService.sendContactFormNotification({
        name,
        email,
        subject,
        message,
      });

      // Add to HubSpot CRM
      try {
        await hubspotService.createOrUpdateContact({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' ') || '',
          tags: ['contact-form'],
        });
      } catch (hubspotError) {
        console.error('Failed to sync with HubSpot:', hubspotError);
        // Don't fail the contact form if HubSpot fails
      }

      res.json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form',
      });
    }
  }
);

export default router;
