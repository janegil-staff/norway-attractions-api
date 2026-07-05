// src/resolvers/index.js
import { Attraction, REGIONS, CATEGORIES } from '../models/Attraction.js';

// Map a Mongoose doc to the GraphQL shape (location -> {lat,lng}).
function toGql(doc) {
  if (!doc) return null;
  const o = doc.toObject ? doc.toObject() : doc;
  return {
    ...o,
    id: o._id.toString(),
    location: {
      lng: o.location.coordinates[0],
      lat: o.location.coordinates[1],
    },
    verifiedAt: o.verifiedAt ? o.verifiedAt.toISOString() : null,
    createdAt: o.createdAt ? o.createdAt.toISOString() : null,
    updatedAt: o.updatedAt ? o.updatedAt.toISOString() : null,
  };
}

export const resolvers = {
  Query: {
    async attractions(_, { region, category, difficulty, search, limit, offset }) {
      const q = {};
      if (region) q.region = region;
      if (category) q.category = category;
      if (difficulty) q.difficulty = difficulty;
      if (search) q.$text = { $search: search };
      const docs = await Attraction.find(q)
        .limit(Math.min(limit ?? 50, 200))
        .skip(offset ?? 0)
        .sort({ name: 1 });
      return docs.map(toGql);
    },

    async attraction(_, { id }) {
      const doc = await Attraction.findById(id);
      return toGql(doc);
    },

    async attractionsNear(_, { input, category, limit }) {
      const { lat, lng, radiusKm = 10 } = input;
      const match = {
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [lng, lat] },
            $maxDistance: radiusKm * 1000, // meters
          },
        },
      };
      if (category) match.category = category;
      const docs = await Attraction.find(match).limit(Math.min(limit ?? 20, 100));
      // compute distance for each (haversine)
      return docs.map((doc) => ({
        attraction: toGql(doc),
        distanceKm: haversineKm(lat, lng, doc.location.coordinates[1], doc.location.coordinates[0]),
      }));
    },

    async regions() {
      const agg = await Attraction.aggregate([
        { $group: { _id: '$region', count: { $sum: 1 } } },
      ]);
      const map = Object.fromEntries(agg.map((a) => [a._id, a.count]));
      return REGIONS.map((region) => ({ region, count: map[region] ?? 0 }));
    },

    async categories() {
      const agg = await Attraction.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]);
      const map = Object.fromEntries(agg.map((a) => [a._id, a.count]));
      return CATEGORIES.map((category) => ({ category, count: map[category] ?? 0 }));
    },
  },
};

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}