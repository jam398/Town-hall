import { defineType } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact Submission',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Resolved', value: 'resolved' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hubspotContactId',
      title: 'HubSpot Contact ID',
      type: 'string',
      description: 'ID from HubSpot CRM',
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Staff notes about this contact submission',
    },
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      subject: 'subject',
      status: 'status',
    },
    prepare(selection) {
      const { name, email, subject, status } = selection;
      return {
        title: `${name} - ${subject}`,
        subtitle: `${email} - ${status}`,
      };
    },
  },
});
