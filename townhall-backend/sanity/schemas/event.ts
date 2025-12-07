import { defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'longDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'whatYouWillLearn',
      title: 'What You Will Learn',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key takeaways',
    },
    {
      name: 'dateTime',
      title: 'Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'Location Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 2,
    },
    {
      name: 'maxAttendees',
      title: 'Maximum Attendees',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'registrationDeadline',
      title: 'Registration Deadline',
      type: 'datetime',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'instructor',
      title: 'Instructor Name',
      type: 'string',
    },
    {
      name: 'instructorBio',
      title: 'Instructor Bio',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'dateTime',
      status: 'status',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, date, status } = selection;
      return {
        title,
        subtitle: `${status} - ${new Date(date).toLocaleDateString()}`,
        media: selection.media,
      };
    },
  },
});
