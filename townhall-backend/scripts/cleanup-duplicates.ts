/**
 * Clean up duplicate events in Sanity
 * 
 * This script removes duplicate events with the same slug,
 * keeping only the most recent version of each.
 */

import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'pvm742xo',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function cleanupDuplicates() {
  console.log('🔍 Scanning for duplicate events...\n');

  try {
    // Get all events with their IDs and slugs
    const query = `*[_type == "event"] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      status
    } | order(_createdAt desc)`;

    const allEvents = await client.fetch(query);
    console.log(`Found ${allEvents.length} total events\n`);

    // Group by slug
    const eventsBySlug = new Map<string, any[]>();
    
    for (const event of allEvents) {
      const slug = event.slug;
      if (!eventsBySlug.has(slug)) {
        eventsBySlug.set(slug, []);
      }
      eventsBySlug.get(slug)!.push(event);
    }

    // Find and delete duplicates
    let deletedCount = 0;
    
    for (const [slug, events] of eventsBySlug.entries()) {
      if (events.length > 1) {
        console.log(`📋 Slug "${slug}" has ${events.length} duplicates`);
        console.log(`   Keeping: ${events[0].title} (${events[0]._id})`);
        
        // Delete all but the first (most recent) one
        for (let i = 1; i < events.length; i++) {
          const eventToDelete = events[i];
          console.log(`   🗑️  Deleting: ${eventToDelete.title} (${eventToDelete._id})`);
          
          await client.delete(eventToDelete._id);
          deletedCount++;
        }
        console.log();
      }
    }

    if (deletedCount === 0) {
      console.log('✅ No duplicates found!');
    } else {
      console.log(`🎉 Cleanup complete! Deleted ${deletedCount} duplicate events.`);
      console.log(`📊 Remaining events: ${allEvents.length - deletedCount}`);
    }

    // Show remaining events
    console.log('\n📍 Current events in Sanity:');
    const remainingEvents = await client.fetch(`*[_type == "event"] {
      title,
      "slug": slug.current,
      status,
      dateTime
    } | order(dateTime asc)`);

    remainingEvents.forEach((event: any, index: number) => {
      const date = new Date(event.dateTime).toLocaleDateString();
      console.log(`   ${index + 1}. ${event.title} (${date}) - ${event.status}`);
    });

  } catch (error) {
    console.error('❌ Error cleaning up duplicates:', error);
    process.exit(1);
  }
}

cleanupDuplicates();
