// src/schema/typeDefs.js
// GraphQL schema for the Norway Attractions API.
// Self-documenting via Apollo's playground/introspection.

export const typeDefs = `#graphql
  "A geographic point."
  type GeoPoint {
    lat: Float!
    lng: Float!
  }

  enum Region {
    bergen
    fjords
    oslo
    stavanger
    trondheim
    tromso
    lofoten
    other
  }

  enum Category {
    hike
    viewpoint
    museum
    landmark
    beach
    waterfall
    park
    church
    district
    cable_car
    other
  }

  enum Difficulty {
    easy
    moderate
    hard
  }

  "A curated Norwegian attraction, hike, or point of interest."
  type Attraction {
    id: ID!
    name: String!
    nameEn: String
    region: Region!
    municipality: String
    category: Category!
    location: GeoPoint!

    "Hike-specific fields (null for non-hikes)."
    difficulty: Difficulty
    durationMinutes: Int
    distanceKm: Float
    elevationGainM: Int

    "Months visitable (1-12). Empty means year-round."
    season: [Int!]!

    description: String
    descriptionEn: String

    "Nearest Entur public-transport stop — chain this to the Entur Journey Planner API."
    nearestStopId: String
    nearestStopName: String

    images: [String!]!
    source: String
    verifiedAt: String
    createdAt: String!
    updatedAt: String!
  }

  "Distance-annotated result for geo searches."
  type NearbyAttraction {
    attraction: Attraction!
    distanceKm: Float!
  }

  input NearInput {
    lat: Float!
    lng: Float!
    radiusKm: Float = 10
  }

  type Query {
    "List attractions with optional filters."
    attractions(
      region: Region
      category: Category
      difficulty: Difficulty
      search: String
      limit: Int = 50
      offset: Int = 0
    ): [Attraction!]!

    "Fetch a single attraction by id."
    attraction(id: ID!): Attraction

    "Find attractions near a coordinate, sorted by distance."
    attractionsNear(input: NearInput!, category: Category, limit: Int = 20): [NearbyAttraction!]!

    "Available regions with attraction counts."
    regions: [RegionCount!]!

    "Available categories with attraction counts."
    categories: [CategoryCount!]!
  }

  type RegionCount {
    region: Region!
    count: Int!
  }

  type CategoryCount {
    category: Category!
    count: Int!
  }
`;