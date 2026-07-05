// src/middleware/apiKeyAuth.js
import { ApiKey } from '../models/ApiKey.js';

// Reads x-api-key header, validates it, and attaches the consumer to context.
// Mirrors Entur's model: consumers must identify themselves.
export async function resolveApiKey(req) {
  const key = req.headers['x-api-key'];
  if (!key) return { apiKey: null, error: 'Missing x-api-key header' };

  const record = await ApiKey.findOne({ key, active: true });
  if (!record) return { apiKey: null, error: 'Invalid or inactive API key' };

  // fire-and-forget usage tracking
  ApiKey.updateOne(
    { _id: record._id },
    { $inc: { requestCount: 1 }, $set: { lastUsedAt: new Date() } }
  ).catch(() => {});

  return { apiKey: record, error: null };
}