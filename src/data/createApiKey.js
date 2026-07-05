// src/data/createApiKey.js
// Generate an API key for a consumer.
// Usage: node src/data/createApiKey.js "app-name" "email@example.com"
import 'dotenv/config';
import { connectDb } from '../config/db.js';
import { ApiKey } from '../models/ApiKey.js';

async function run() {
  const name = process.argv[2];
  const email = process.argv[3] || '';
  if (!name) {
    console.error('Usage: node src/data/createApiKey.js "app-name" [email]');
    process.exit(1);
  }
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/norway_attractions');
  const key = ApiKey.generateKey();
  await ApiKey.create({ key, name, email });
  console.log(`API key for "${name}":\n${key}`);
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });