import { Router, Request, Response } from 'express';
import { sanityService } from '../services/sanity';
import { emailService } from '../services/email';

const router = Router();

// GET /api/events - List all published events
router.get('/', async (req: Request, res: Response) => {
  try {
    const events = await sanityService.getEvents();
    
    // Add registered count for each event
    const eventsWithCounts = await Promise.all(
      events.map(async (event) => {
        const registered = await sanityService.getEventRegistrationCount(event._id);
        return {
          slug: event.slug.current,
          title: event.title,
          description: event.description,
          date: event.dateTime.split('T')[0],
          time: new Date(event.dateTime).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          location: event.location,
          capacity: event.maxAttendees,
          registered,
          tags: event.tags || [],
          image: event.featuredImage,
        };
      })
    );

    res.json({ events: eventsWithCounts });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/completed - List completed events from last 24 hours
router.get('/completed', async (req: Request, res: Response) => {
  try {
    const events = await sanityService.getCompletedEvents();
    
    // Format events for n8n workflow
    const formattedEvents = events.map(event => ({
      slug: event.slug.current,
      title: event.title,
      description: event.description,
      date: event.dateTime.split('T')[0],
      time: new Date(event.dateTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      location: event.location,
      recordingUrl: (event as any).recordingUrl,
      summaryUrl: (event as any).summaryUrl,
    }));

    res.json({ events: formattedEvents });
  } catch (error) {
    console.error('Error fetching completed events:', error);
    res.status(500).json({ error: 'Failed to fetch completed events' });
  }
});

// GET /api/events/:slug - Get single event by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const event = await sanityService.getEventBySlug(slug);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const registered = await sanityService.getEventRegistrationCount(event._id);

    const eventData = {
      slug: event.slug.current,
      title: event.title,
      description: event.description,
      longDescription: event.longDescription
        ? sanityService.portableTextToHtml(event.longDescription)
        : null,
      whatYouWillLearn: event.whatYouWillLearn || [],
      date: event.dateTime.split('T')[0],
      time: new Date(event.dateTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      endTime: event.endTime
        ? new Date(event.endTime).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
        : null,
      location: event.location,
      address: event.address,
      capacity: event.maxAttendees,
      registered,
      tags: event.tags || [],
      image: event.featuredImage,
      instructor: event.instructor,
      instructorBio: event.instructorBio,
    };

    res.json({ event: eventData });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST /api/events/:slug/send-reminders - Send reminder emails to all registrants
router.post('/:slug/send-reminders', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    // Get event details
    const event = await sanityService.getEventBySlug(slug);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Get all registrations for this event
    const registrations = await sanityService.getEventRegistrations(event._id);
    
    if (registrations.length === 0) {
      return res.json({ 
        success: true, 
        message: 'No registrations found for this event',
        emailsSent: 0 
      });
    }

    // Send reminder email to each registrant
    const emailPromises = registrations.map(registration =>
      emailService.sendEventReminder({
        to: registration.email,
        firstName: registration.firstName,
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
        eventLocation: event.location || 'TBD',
        eventAddress: event.address || 'Address will be provided',
      })
    );

    await Promise.all(emailPromises);

    res.json({ 
      success: true, 
      message: `Sent ${registrations.length} reminder emails`,
      emailsSent: registrations.length 
    });
  } catch (error) {
    console.error('Error sending reminders:', error);
    res.status(500).json({ error: 'Failed to send reminder emails' });
  }
});

// POST /api/events/:slug/send-followups - Send post-event follow-up emails
router.post('/:slug/send-followups', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    // Get event details
    const event = await sanityService.getEventBySlug(slug);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Get all registrations for this event
    const registrations = await sanityService.getEventRegistrations(event._id);
    
    if (registrations.length === 0) {
      return res.json({ 
        success: true, 
        message: 'No registrations found for this event',
        emailsSent: 0 
      });
    }

    // Get upcoming events for recommendation (next 3)
    const upcomingEvents = await sanityService.getEvents();
    const nextEvents = upcomingEvents.slice(0, 3).map(e => ({
      title: e.title,
      date: new Date(e.dateTime).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      slug: e.slug.current,
    }));

    // Send follow-up email to each registrant
    const emailPromises = registrations.map(registration =>
      emailService.sendPostEventFollowUp({
        to: registration.email,
        firstName: registration.firstName,
        eventTitle: event.title,
        recordingUrl: (event as any).recordingUrl,
        summaryUrl: (event as any).summaryUrl,
        nextEvents,
      })
    );

    await Promise.all(emailPromises);

    res.json({ 
      success: true, 
      message: `Sent ${registrations.length} follow-up emails`,
      emailsSent: registrations.length 
    });
  } catch (error) {
    console.error('Error sending follow-ups:', error);
    res.status(500).json({ error: 'Failed to send follow-up emails' });
  }
});

export default router;
