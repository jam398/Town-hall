#!/usr/bin/env node
/**
 * Query all vlog documents to get their _id and slug
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'pvm742xo';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN;
const SANITY_API_VERSION = '2024-01-01';

async function main() {
  const queryUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=*[_type == "vlogPost"]{_id, "slug": slug.current, title, youtubeId}`;
  
  const response = await fetch(queryUrl, {
    headers: {
      'Authorization': `Bearer ${SANITY_TOKEN}`,
    },
  });
  
  const result = await response.json();
  
  console.log('Vlogs in Sanity:');
  console.log(JSON.stringify(result.result, null, 2));
}

main();
