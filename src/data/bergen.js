// src/data/bergen.js
// Curated launch dataset: real Bergen + nearby fjord attractions.
// Coordinates are [lng, lat]. Expand this file, then add oslo.js, then more.

export const bergenAttractions = [
  {
    name: 'Fløyen', nameEn: 'Mount Fløyen', region: 'bergen', municipality: 'Bergen',
    category: 'viewpoint', location: { type: 'Point', coordinates: [5.3283, 60.3963] },
    description: 'Byfjell med panoramautsikt over Bergen, tilgjengelig med Fløibanen.',
    descriptionEn: 'City mountain with panoramic views over Bergen, reached by the Fløibanen funicular.',
    nearestStopName: 'Bergen', season: [], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'Ulriken', nameEn: 'Mount Ulriken', region: 'bergen', municipality: 'Bergen',
    category: 'cable_car', location: { type: 'Point', coordinates: [5.3878, 60.3760] },
    difficulty: 'moderate', elevationGainM: 600,
    description: 'Høyeste av Bergens syv fjell, nås med Ulriksbanen eller til fots.',
    descriptionEn: 'The highest of Bergen\'s seven mountains, reached by cable car or on foot.',
    season: [], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'Bryggen', nameEn: 'Bryggen Hanseatic Wharf', region: 'bergen', municipality: 'Bergen',
    category: 'district', location: { type: 'Point', coordinates: [5.3221, 60.3975] },
    description: 'UNESCO-listet hanseatisk brygge med fargerike trehus.',
    descriptionEn: 'UNESCO-listed Hanseatic wharf with colourful wooden houses.',
    season: [], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'Vidden', nameEn: 'Vidden Trail (Ulriken to Fløyen)', region: 'bergen', municipality: 'Bergen',
    category: 'hike', location: { type: 'Point', coordinates: [5.3878, 60.3760] },
    difficulty: 'hard', durationMinutes: 300, distanceKm: 13, elevationGainM: 650,
    description: 'Klassisk høyfjellstur mellom Ulriken og Fløyen.',
    descriptionEn: 'Classic high-plateau hike connecting Ulriken and Fløyen.',
    season: [6, 7, 8, 9], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'Fisketorget', nameEn: 'Bergen Fish Market', region: 'bergen', municipality: 'Bergen',
    category: 'landmark', location: { type: 'Point', coordinates: [5.3245, 60.3956] },
    description: 'Historisk fisketorg i hjertet av Bergen.',
    descriptionEn: 'Historic fish market in the heart of Bergen.',
    season: [], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'KODE Kunstmuseer', nameEn: 'KODE Art Museums', region: 'bergen', municipality: 'Bergen',
    category: 'museum', location: { type: 'Point', coordinates: [5.3300, 60.3920] },
    description: 'Ett av Nordens største kunst- og designmuseer.',
    descriptionEn: 'One of the largest art and design museums in the Nordic countries.',
    season: [], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'Gamle Bergen Museum', nameEn: 'Old Bergen Museum', region: 'bergen', municipality: 'Bergen',
    category: 'museum', location: { type: 'Point', coordinates: [5.3097, 60.4128] },
    description: 'Friluftsmuseum med over 50 trehus fra 1700- og 1800-tallet.',
    descriptionEn: 'Open-air museum with over 50 wooden houses from the 18th and 19th centuries.',
    season: [5, 6, 7, 8, 9], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'Mount Løvstakken', nameEn: 'Mount Løvstakken', region: 'bergen', municipality: 'Bergen',
    category: 'hike', location: { type: 'Point', coordinates: [5.3200, 60.3600] },
    difficulty: 'moderate', durationMinutes: 150, elevationGainM: 470,
    description: 'Et av Bergens syv fjell, roligere enn Fløyen og Ulriken.',
    descriptionEn: 'One of Bergen\'s seven mountains, quieter than Fløyen and Ulriken.',
    season: [], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  // ---- Nearby fjords ----
  {
    name: 'Mostraumen', nameEn: 'Mostraumen Fjord Cruise', region: 'fjords', municipality: 'Modalen',
    category: 'viewpoint', location: { type: 'Point', coordinates: [5.6500, 60.6200] },
    description: 'Smal fjordarm nord for Bergen med fossefall og bratte fjell.',
    descriptionEn: 'Narrow fjord arm north of Bergen with waterfalls and steep mountains.',
    season: [4, 5, 6, 7, 8, 9, 10], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'Steinsdalsfossen', nameEn: 'Steinsdalsfossen Waterfall', region: 'fjords', municipality: 'Kvam',
    category: 'waterfall', location: { type: 'Point', coordinates: [6.1450, 60.3830] },
    description: 'Foss du kan gå bak, ved Norheimsund.',
    descriptionEn: 'Waterfall you can walk behind, near Norheimsund.',
    season: [], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'Trolltunga', nameEn: 'Trolltunga', region: 'fjords', municipality: 'Ullensvang',
    category: 'hike', location: { type: 'Point', coordinates: [6.7400, 60.1240] },
    difficulty: 'hard', durationMinutes: 600, distanceKm: 28, elevationGainM: 1200,
    description: 'Berømt fjellhylle 700 meter over Ringedalsvatnet.',
    descriptionEn: 'Famous rock ledge 700 metres above Ringedalsvatnet lake.',
    season: [6, 7, 8, 9], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
  {
    name: 'Vøringsfossen', nameEn: 'Vøringsfossen Waterfall', region: 'fjords', municipality: 'Eidfjord',
    category: 'waterfall', location: { type: 'Point', coordinates: [7.2470, 60.4260] },
    description: 'En av Norges mest kjente fosser med 182 meter fall.',
    descriptionEn: 'One of Norway\'s most famous waterfalls with a 182-metre drop.',
    season: [5, 6, 7, 8, 9, 10], source: 'curated', verifiedAt: new Date('2026-01-15'),
  },
];