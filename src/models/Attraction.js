// src/models/Attraction.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Enums kept as constants so resolvers and validation share one source of truth.
export const REGIONS = ['bergen', 'fjords', 'oslo', 'stavanger', 'trondheim', 'tromso', 'lofoten', 'other'];
export const CATEGORIES = ['hike', 'viewpoint', 'museum', 'landmark', 'beach', 'waterfall', 'park', 'church', 'district', 'cable_car', 'other'];
export const DIFFICULTIES = ['easy', 'moderate', 'hard'];

const AttractionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    nameEn: { type: String, trim: true },

    region: { type: String, enum: REGIONS, required: true, index: true },
    municipality: { type: String, trim: true },

    category: { type: String, enum: CATEGORIES, required: true, index: true },

    // GeoJSON point for $near queries. NOTE order is [lng, lat].
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },

    // Hike-specific (optional for non-hikes)
    difficulty: { type: String, enum: DIFFICULTIES, index: true },
    durationMinutes: Number,
    distanceKm: Number,
    elevationGainM: Number,

    // Months the attraction is realistically visitable, 1-12. Empty = year-round.
    season: { type: [Number], default: [] },

    description: { type: String, trim: true },
    descriptionEn: { type: String, trim: true },

    // Link to Entur transport — lets API consumers chain to journey planning.
    nearestStopId: { type: String, trim: true },
    nearestStopName: { type: String, trim: true },

    images: { type: [String], default: [] },

    // Provenance + freshness: what makes a real service trustworthy to build on.
    source: { type: String, trim: true },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

// 2dsphere index enables geo `near` queries.
AttractionSchema.index({ location: '2dsphere' });
// Text index for name/description search.
AttractionSchema.index({ name: 'text', nameEn: 'text', description: 'text' });

export const Attraction = mongoose.model('Attraction', AttractionSchema);