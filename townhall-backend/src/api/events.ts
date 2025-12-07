import { Router, Request, Response } from 'express';
import { sanityService } from '../services/sanity';

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
          image: event.featuredImage?.asset?.url,
        };
      })
    );

    res.json({ events: eventsWithCounts });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
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
      image: event.featuredImage?.asset?.url,
      instructor: event.instructor,
      instructorBio: event.instructorBio,
    };

    res.json({ event: eventData });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

export default router;
