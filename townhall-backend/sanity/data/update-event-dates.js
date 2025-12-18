#!/usr/bin/env node
/**
 * Update Event Dates to be at least 2 months in the future
 * Current date: Dec 18, 2025 → Events should be Feb 2025+
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'pvm742xo';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN;
const SANITY_API_VERSION = '2024-01-01';

if (!SANITY_TOKEN) {
  console.error('❌ SANITY_TOKEN environment variable is required');
  process.exit(1);
}

const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;

// Updated event dates - all at least 2 months from now (Feb 2025+)
const eventUpdates = [
  {
    _id: 'event-ai-basics-jan-2025',
    dateTime: '2025-02-22T10:00:00.000Z',
    endTime: '2025-02-22T12:30:00.000Z',
    registrationDeadline: '2025-02-21T23:59:00.000Z',
  },
  {
    _id: 'event-chatgpt-mastery-feb-2025',
    dateTime: '2025-03-08T14:00:00.000Z',
    endTime: '2025-03-08T17:00:00.000Z',
    registrationDeadline: '2025-03-07T23:59:00.000Z',
  },
  {
    _id: 'event-ai-job-search-feb-2025',
    dateTime: '2025-03-22T10:00:00.000Z',
    endTime: '2025-03-22T13:00:00.000Z',
    registrationDeadline: '2025-03-21T23:59:00.000Z',
  },
  {
    _id: 'event-seniors-tech-march-2025',
    dateTime: '2025-04-05T10:00:00.000Z',
    endTime: '2025-04-05T12:00:00.000Z',
    registrationDeadline: '2025-04-04T23:59:00.000Z',
  },
  {
    _id: 'event-small-business-ai-march-2025',
    dateTime: '2025-04-19T09:00:00.000Z',
    endTime: '2025-04-19T12:00:00.000Z',
    registrationDeadline: '2025-04-18T23:59:00.000Z',
  },
  {
    _id: 'event-online-safety-april-2025',
    dateTime: '2025-05-03T14:00:00.000Z',
    endTime: '2025-05-03T16:30:00.000Z',
    registrationDeadline: '2025-05-02T23:59:00.000Z',
  },
  {
    _id: 'event-ai-creativity-april-2025',
    dateTime: '2025-05-17T13:00:00.000Z',
    endTime: '2025-05-17T16:00:00.000Z',
    registrationDeadline: '2025-05-16T23:59:00.000Z',
  },
];

async function updateEvent(update) {
  const response = await fetch(SANITY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          patch: {
            id: update._id,
            set: {
              dateTime: update.dateTime,
              endTime: update.endTime,
              registrationDeadline: update.registrationDeadline,
            },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  return true;
}

async function main() {
  console.log('📅 Updating Event Dates (2+ months in future)...');
  console.log('');

  let success = 0;
  let failed = 0;

  for (const update of eventUpdates) {
    try {
      await updateEvent(update);
      success++;
      const eventDate = new Date(update.dateTime).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      console.log(`✅ ${update._id}`);
      console.log(`   📆 New date: ${eventDate}`);
    } catch (error) {
      failed++;
      console.error(`❌ ${update._id}: ${error.message}`);
    }
  }

  console.log('');
  console.log('📊 Update Summary:');
  console.log(`   ✅ Updated: ${success}`);
  console.log(`   ❌ Failed: ${failed}`);
  
  if (success > 0) {
    console.log('');
    console.log('🎉 Event dates updated!');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
