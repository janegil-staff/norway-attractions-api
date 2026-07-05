// src/rest/routes.js
// REST layer alongside GraphQL. Same data, browsable URLs.
//   GET /api/attractions?region=oslo&category=museum&search=munch
//   GET /api/attractions/:id
//   GET /api/attractions/near?lat=60.39&lng=5.32&radiusKm=10
//   GET /api/regions
//   GET /api/categories
import express from 'express';
import { Attraction, REGIONS, CATEGORIES } from '../models/Attraction.js';

export const restRouter = express.Router();

// Shape a Mongoose doc into clean JSON (location -> {lat,lng}).
function toJson(doc) {
  const o = doc.toObject ? doc.toObject() : doc;
  return {
    id: o._id.toString(),
    name: o.name,
    nameEn: o.nameEn,
    region: o.region,
    municipality: o.municipality,
    category: o.category,
    difficulty: o.difficulty,
    durationMinutes: o.durationMinutes,
    distanceKm: o.distanceKm,
    elevationGainM: o.elevationGainM,
    season: o.season,
    location: { lat: o.location.coordinates[1], lng: o.location.coordinates[0] },
    description: o.description,
    descriptionEn: o.descriptionEn,
    nearestStopId: o.nearestStopId,
    nearestStopName: o.nearestStopName,
    images: o.images,
    source: o.source,
    verifiedAt: o.verifiedAt,
  };
}

// GET /api/attractions?region=&category=&difficulty=&search=&limit=&offset=
restRouter.get('/attractions', async (req, res) => {
  try {
    const { region, category, difficulty, search } = req.query;
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;

    if (region && !REGIONS.includes(region))
      return res.status(400).json({ error: `Invalid region. Valid: ${REGIONS.join(', ')}` });
    if (category && !CATEGORIES.includes(category))
      return res.status(400).json({ error: `Invalid category. Valid: ${CATEGORIES.join(', ')}` });

    const q = {};
    if (region) q.region = region;
    if (category) q.category = category;
    if (difficulty) q.difficulty = difficulty;
    if (search) q.$text = { $search: search };

    const docs = await Attraction.find(q).limit(limit).skip(offset).sort({ name: 1 });
    res.json({ count: docs.length, results: docs.map(toJson) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/attractions/near?lat=&lng=&radiusKm=&category=
restRouter.get('/attractions/near', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radiusKm = parseFloat(req.query.radiusKm) || 10;
    if (Number.isNaN(lat) || Number.isNaN(lng))
      return res.status(400).json({ error: 'lat and lng query params are required numbers' });

    const match = {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radiusKm * 1000,
        },
      },
    };
    if (req.query.category) match.category = req.query.category;

    const docs = await Attraction.find(match).limit(Math.min(parseInt(req.query.limit) || 20, 100));
    res.json({ count: docs.length, results: docs.map(toJson) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/attractions/:id
restRouter.get('/attractions/:id', async (req, res) => {
  try {
    const doc = await Attraction.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Attraction not found' });
    res.json(toJson(doc));
  } catch (e) {
    res.status(400).json({ error: 'Invalid id' });
  }
});

// GET /api/regions
restRouter.get('/regions', async (_req, res) => {
  const agg = await Attraction.aggregate([{ $group: { _id: '$region', count: { $sum: 1 } } }]);
  const map = Object.fromEntries(agg.map((a) => [a._id, a.count]));
  res.json(REGIONS.map((region) => ({ region, count: map[region] || 0 })).filter((r) => r.count > 0));
});

// GET /api/categories
restRouter.get('/categories', async (_req, res) => {
  const agg = await Attraction.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]);
  const map = Object.fromEntries(agg.map((a) => [a._id, a.count]));
  res.json(CATEGORIES.map((category) => ({ category, count: map[category] || 0 })).filter((c) => c.count > 0));
});