import { defineType } from 'sanity';

export default defineType({
  name: 'volunteer',
  title: 'Volunteer',
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
      name: 'interest',
      title: 'Area of Interest',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
    },
    {
      name: 'experience',
      title: 'Relevant Experience',
      type: 'text',
      rows: 4,
    },
    {
      name: 'motivation',
      title: 'Why do you want to volunteer?',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'appliedAt',
      title: 'Applied At',
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
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      status: 'status',
    },
    prepare(selection) {
      const { firstName, lastName, email, status } = selection;
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${email} - ${status}`,
      };
    },
  },
});
