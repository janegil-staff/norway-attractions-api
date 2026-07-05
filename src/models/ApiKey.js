// src/models/ApiKey.js
import mongoose from 'mongoose';
import crypto from 'crypto';

const { Schema } = mongoose;

const ApiKeySchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true }, // consumer/app name, like Entur's ET-Client-Name
    email: { type: String, trim: true },
    tier: { type: String, enum: ['free', 'partner'], default: 'free' },
    active: { type: Boolean, default: true },
    requestCount: { type: Number, default: 0 },
    lastUsedAt: { type: Date },
  },
  { timestamps: true }
);

// Generate a fresh key string.
ApiKeySchema.statics.generateKey = function () {
  return 'nak_' + crypto.randomBytes(24).toString('hex');
};

export const ApiKey = mongoose.model('ApiKey', ApiKeySchema);