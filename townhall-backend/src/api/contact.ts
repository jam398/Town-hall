import { Router, Request, Response } from 'express';
import { formLimiter } from '../middleware/rateLimit';
import { validate, contactSchema } from '../middleware/validation';
import { sanityService } from '../services/sanity';
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

      // Save to Sanity CMS
      const contact = await sanityService.createContact({
        name,
        email,
        subject,
        message,
      });

      // Send notification to team and confirmation to user
      await emailService.sendContactFormNotification({
        name,
        email,
        subject,
        message,
      });

      // Add to HubSpot CRM
      try {
        const hubspotContactId = await hubspotService.createOrUpdateContact({
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' ') || '',
          tags: ['contact-form'],
        });

        // Update contact with HubSpot ID if successful
        if (hubspotContactId && contact._id) {
          await sanityService.client.patch(contact._id).set({ hubspotContactId }).commit();
        }
      } catch (hubspotError) {
        console.error('Failed to sync with HubSpot:', hubspotError);
        // Don't fail the contact form if HubSpot fails
      }

      res.json({
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        contactId: contact._id,
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
