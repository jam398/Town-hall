import { Router, Request, Response } from 'express';
import { formLimiter } from '../middleware/rateLimit';
import { validate, volunteerSchema } from '../middleware/validation';
import { sanityService } from '../services/sanity';
import { emailService } from '../services/email';
import { hubspotService } from '../services/hubspot';
import { VolunteerRequest } from '../types';

const router = Router();

// POST /api/volunteer - Submit volunteer application
router.post(
  '/',
  formLimiter,
  validate(volunteerSchema),
  async (req: Request, res: Response) => {
    try {
      const data: VolunteerRequest = req.body;
      const { firstName, lastName, email, phone, interest, availability, experience, motivation } = data;

      // Create volunteer application
      const volunteer = await sanityService.createVolunteer({
        firstName,
        lastName,
        email,
        phone,
        interest,
        availability,
        experience,
        motivation,
      });

      // Send confirmation email
      try {
        await emailService.sendVolunteerApplicationConfirmation({
          to: email,
          firstName,
        });

        // Update volunteer to mark email as sent
        await sanityService.updateVolunteer(volunteer._id, {
          confirmationSent: true,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the application if email fails
      }

      // Add to HubSpot CRM
      try {
        const hubspotContactId = await hubspotService.createOrUpdateContact({
          email,
          firstName,
          lastName,
          phone,
          tags: ['volunteer', `interest:${interest}`],
        });

        if (hubspotContactId) {
          await sanityService.updateVolunteer(volunteer._id, {
            hubspotContactId,
          });
        }
      } catch (hubspotError) {
        console.error('Failed to sync with HubSpot:', hubspotError);
        // Don't fail the application if HubSpot fails
      }

      res.json({
        success: true,
        message: 'Thank you for your interest in volunteering! We will be in touch soon.',
        volunteerId: volunteer._id,
      });
    } catch (error) {
      console.error('Volunteer application error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit volunteer application',
      });
    }
  }
);

export default router;
