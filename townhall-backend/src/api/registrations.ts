import { Router, Request, Response } from 'express';
import { formLimiter } from '../middleware/rateLimit';
import { validate, registrationSchema } from '../middleware/validation';
import { sanityService } from '../services/sanity';
import { emailService } from '../services/email';
import { hubspotService } from '../services/hubspot';
import { RegistrationRequest } from '../types';

const router = Router();

// POST /api/events/register - Register for an event
router.post(
  '/register',
  formLimiter,
  validate(registrationSchema),
  async (req: Request, res: Response) => {
    try {
      const data: RegistrationRequest = req.body;
      const { firstName, lastName, email, phone, eventSlug } = data;

      // Get event by slug
      const event = await sanityService.getEventBySlug(eventSlug);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found',
        });
      }

      // Check if event is full
      const currentRegistrations = await sanityService.getEventRegistrationCount(event._id);
      if (currentRegistrations >= event.maxAttendees) {
        return res.status(400).json({
          success: false,
          message: 'Event is full',
        });
      }

      // Check if already registered
      const alreadyRegistered = await sanityService.checkExistingRegistration(
        email,
        event._id
      );
      if (alreadyRegistered) {
        return res.status(400).json({
          success: false,
          message: 'You are already registered for this event',
        });
      }

      // Create registration
      const registration = await sanityService.createRegistration({
        firstName,
        lastName,
        email,
        phone,
        eventId: event._id,
      });

      // Send confirmation email
      try {
        await emailService.sendEventRegistrationConfirmation({
          to: email,
          firstName,
          eventTitle: event.title,
          eventDate: new Date(event.dateTime).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          eventTime: new Date(event.dateTime).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          eventLocation: event.location,
        });

        // Update registration to mark email as sent
        await sanityService.updateRegistration(registration._id, {
          confirmationSent: true,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the registration if email fails
      }

      // Add to HubSpot CRM
      try {
        const hubspotContactId = await hubspotService.createOrUpdateContact({
          email,
          firstName,
          lastName,
          phone,
          tags: [`event:${eventSlug}`],
        });

        if (hubspotContactId) {
          await sanityService.updateRegistration(registration._id, {
            hubspotContactId,
          });
        }
      } catch (hubspotError) {
        console.error('Failed to sync with HubSpot:', hubspotError);
        // Don't fail the registration if HubSpot fails
      }

      res.json({
        success: true,
        message: 'Successfully registered for the event',
        registrationId: registration._id,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to register for event',
      });
    }
  }
);

export default router;
