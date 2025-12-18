#!/usr/bin/env node
/**
 * Sanity Content Import Script
 * 
 * Imports blog posts, vlogs, and events from the NDJSON file into Sanity.
 * 
 * Usage:
 *   SANITY_TOKEN=your_token node import-content.js
 * 
 * Or set SANITY_TOKEN in your .env file and run:
 *   node import-content.js
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'pvm742xo';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN;
const SANITY_API_VERSION = '2024-01-01';

if (!SANITY_TOKEN) {
  console.error('❌ SANITY_TOKEN environment variable is required');
  console.error('   Set it in your .env file or run with: SANITY_TOKEN=xxx node import-content.js');
  process.exit(1);
}

const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;

async function importDocument(doc) {
  const response = await fetch(SANITY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          createOrReplace: doc,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  return response.json();
}

async function main() {
  console.log('🚀 Starting Sanity content import...');
  console.log(`   Project: ${SANITY_PROJECT_ID}`);
  console.log(`   Dataset: ${SANITY_DATASET}`);
  console.log('');

  const ndjsonPath = path.join(__dirname, 'content-import.ndjson');
  const content = fs.readFileSync(ndjsonPath, 'utf8')
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line));

  console.log(`📦 Found ${content.length} documents to import`);
  console.log('');

  const results = {
    success: 0,
    failed: 0,
    byType: {},
  };

  for (const doc of content) {
    try {
      await importDocument(doc);
      results.success++;
      results.byType[doc._type] = (results.byType[doc._type] || 0) + 1;
      console.log(`✅ ${doc._type}: ${doc.title}`);
    } catch (error) {
      results.failed++;
      console.error(`❌ ${doc._type}: ${doc.title}`);
      console.error(`   Error: ${error.message}`);
    }
  }

  console.log('');
  console.log('📊 Import Summary:');
  console.log(`   ✅ Success: ${results.success}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log('');
  console.log('   By type:');
  for (const [type, count] of Object.entries(results.byType)) {
    console.log(`   - ${type}: ${count}`);
  }
  console.log('');

  if (results.failed > 0) {
    console.log('⚠️  Some imports failed. Check the errors above.');
    process.exit(1);
  } else {
    console.log('🎉 All content imported successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Open Sanity Studio to verify content');
    console.log('2. Add featured images to posts');
    console.log('3. Link author references for blog posts');
    console.log('4. Replace placeholder YouTube IDs with real videos');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
