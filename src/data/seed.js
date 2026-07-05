// src/data/seed.js
// Idempotent seed: upserts curated attractions by name+region so re-running is safe.
// Run with: node src/data/seed.js
import 'dotenv/config';
import { connectDb } from '../config/db.js';
import { Attraction } from '../models/Attraction.js';
import { bergenAttractions } from './bergen.js';
import { bergenExtraAttractions } from './bergenExtra.js';
import { osloAttractions } from './oslo.js';
import { osloExtraAttractions } from './osloExtra.js';

const ALL = [...bergenAttractions, ...bergenExtraAttractions, ...osloAttractions, ...osloExtraAttractions];

async function seed() {
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/norway_attractions');
  let up = 0;
  for (const a of ALL) {
    await Attraction.updateOne(
      { name: a.name, region: a.region },
      { $set: a },
      { upsert: true }
    );
    up += 1;
  }
  console.log(`Seeded/updated ${up} attractions.`);
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});