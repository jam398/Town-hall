/**
 * Clean up all duplicates in Sanity
 * 
 * This script removes duplicate documents (events, blog posts, vlogs)
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

async function cleanupDuplicates(docType: string, slugField: string = 'slug.current') {
  console.log(`🔍 Scanning for duplicate ${docType}...\n`);

  try {
    const query = `*[_type == "${docType}"] {
      _id,
      _createdAt,
      title,
      "slug": ${slugField}
    } | order(_createdAt desc)`;

    const allDocs = await client.fetch(query);
    console.log(`Found ${allDocs.length} total ${docType}\n`);

    const docsBySlug = new Map<string, any[]>();
    
    for (const doc of allDocs) {
      const slug = doc.slug;
      if (!docsBySlug.has(slug)) {
        docsBySlug.set(slug, []);
      }
      docsBySlug.get(slug)!.push(doc);
    }

    let deletedCount = 0;
    
    for (const [slug, docs] of docsBySlug.entries()) {
      if (docs.length > 1) {
        console.log(`📋 Slug "${slug}" has ${docs.length} duplicates`);
        console.log(`   Keeping: ${docs[0].title} (${docs[0]._id})`);
        
        for (let i = 1; i < docs.length; i++) {
          const docToDelete = docs[i];
          console.log(`   🗑️  Deleting: ${docToDelete.title} (${docToDelete._id})`);
          
          await client.delete(docToDelete._id);
          deletedCount++;
        }
        console.log();
      }
    }

    if (deletedCount === 0) {
      console.log(`✅ No duplicates found for ${docType}!`);
    } else {
      console.log(`🎉 Deleted ${deletedCount} duplicate ${docType}.`);
      console.log(`📊 Remaining: ${allDocs.length - deletedCount}`);
    }

    console.log('\n');

  } catch (error) {
    console.error(`❌ Error cleaning up ${docType}:`, error);
  }
}

async function main() {
  console.log('🚀 Cleaning up all duplicates in Sanity...\n');
  
  await cleanupDuplicates('event');
  await cleanupDuplicates('blogPost');
  await cleanupDuplicates('vlogPost');
  
  console.log('✅ Cleanup complete!\n');
}

main();
