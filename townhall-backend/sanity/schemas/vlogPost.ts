import { defineType } from 'sanity';

export default defineType({
  name: 'vlogPost',
  title: 'Vlog Post',
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
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'The ID from YouTube URL (e.g., "dQw4w9WgXcQ")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'image',
      description: 'Optional - will use YouTube thumbnail if not provided',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "12:34"',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'transcript',
      title: 'Transcript',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'AI-generated or manual transcript',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      description: 'AI-generated or manual summary',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { title, status } = selection;
      return {
        title,
        subtitle: status,
        media: selection.media,
      };
    },
  },
});
