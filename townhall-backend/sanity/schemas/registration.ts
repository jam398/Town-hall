import { defineType } from 'sanity';

export default defineType({
  name: 'registration',
  title: 'Event Registration',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'registeredAt',
      title: 'Registered At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'attended',
      title: 'Attended',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'confirmationSent',
      title: 'Confirmation Email Sent',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'hubspotContactId',
      title: 'HubSpot Contact ID',
      type: 'string',
      description: 'ID from HubSpot CRM',
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      event: 'event.title',
    },
    prepare(selection) {
      const { firstName, lastName, email, event } = selection;
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${email} - ${event || 'No event'}`,
      };
    },
  },
});
