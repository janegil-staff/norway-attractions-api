# Norway Attractions API

**A free, open API of curated Norwegian attractions, hikes, and points of interest — for anyone to use.**

No sign-up, no cost. Point your app, script, or browser at it and start pulling real data about places across Norway. The API currently covers Bergen, the surrounding fjords, and Oslo, and is expanding toward nationwide coverage.

**Base URL:** `https://norway-attractions-api-sq4ye.ondigitalocean.app`

Open the base URL in a browser for a live, tappable overview of every endpoint.

---

## Who this is for

Anyone building something that needs Norwegian travel data — a trip planner, a map app, a hiking guide, a hackathon project, a class assignment. The data is hand-curated for quality and free to use under Norway's open-data licence (NLOD). Attribution is appreciated but not required.

You do **not** need an API key to get started. Just make requests.

---

## Two ways to use it

The same data is available two ways — pick whichever suits you.

### REST (browsable URLs)

Open these in a browser, `curl` them, or `fetch()` them. They return JSON.

```
GET /api/attractions?region=bergen
GET /api/attractions?category=hike&difficulty=hard
GET /api/attractions/near?lat=60.39&lng=5.32&radiusKm=10
GET /api/attractions/:id
GET /api/regions
GET /api/categories
```

**Example:**

```bash
curl "https://norway-attractions-api-sq4ye.ondigitalocean.app/api/attractions?region=oslo"
```

Returns:

```json
{
  "count": 44,
  "results": [
    {
      "id": "…",
      "name": "Vigelandsparken",
      "nameEn": "Vigeland Sculpture Park",
      "region": "oslo",
      "category": "park",
      "location": { "lat": 59.927, "lng": 10.7005 },
      "nearestStopName": null,
      "description": "…"
    }
  ]
}
```

**Query parameters** (all optional):

| Param | Values | Notes |
|-------|--------|-------|
| `region` | `bergen`, `fjords`, `oslo`, … | Filter by region |
| `category` | `hike`, `viewpoint`, `museum`, `landmark`, `beach`, `waterfall`, `park`, `church`, `district`, `cable_car` | Filter by type |
| `difficulty` | `easy`, `moderate`, `hard` | Hikes only |
| `search` | free text | Full-text search on name and description |
| `limit` | number (max 200) | Page size, default 50 |
| `offset` | number | Pagination offset |

The `/api/attractions/near` endpoint takes `lat`, `lng`, and optional `radiusKm` (default 10) and returns attractions sorted by distance.

### GraphQL (flexible queries)

Ask for exactly the fields you need in one request.

```
POST /graphql
Content-Type: application/json
```

```graphql
query {
  attractions(region: bergen, category: hike, difficulty: hard) {
    name
    distanceKm
    elevationGainM
    location { lat lng }
  }
}
```

Explore the schema interactively at `/graphql` in a browser.

---

## What's in the data

Each attraction includes:

- **Names** in Norwegian and English
- **Location** as latitude/longitude (WGS84)
- **Category** (hike, viewpoint, museum, landmark, beach, waterfall, park, church, district, cable car)
- **Region** and municipality
- For hikes: **difficulty, distance, duration, elevation gain**
- **Season** (which months it's realistically visitable)
- **Descriptions** in both languages
- **`nearestStopId`** — links to the nearest [Entur](https://developer.entur.org/) public-transport stop, so you can chain attraction discovery with real journey planning
- **`verifiedAt`** — a freshness timestamp for each record

---

## Quick start in code

```javascript
// REST
const res = await fetch(
  "https://norway-attractions-api-sq4ye.ondigitalocean.app/api/attractions?region=fjords&category=hike"
);
const { results } = await res.json();

// GraphQL
const res2 = await fetch(
  "https://norway-attractions-api-sq4ye.ondigitalocean.app/graphql",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{ attractions(region: oslo) { name category location { lat lng } } }`,
    }),
  }
);
const { data } = await res2.json();
```

---

## Coverage & roadmap

- Bergen + fjords — live
- Oslo — live
- Nationwide coverage — in progress
- `nearestStopId` populated for every attraction (Entur transport linking) — in progress

Coverage grows over time. Query `/api/regions` for the current live list and counts.

---

## Running your own instance

The API is open source. To run it locally:

```bash
npm install
cp .env.example .env          # point MONGODB_URI at your MongoDB
npm run seed                  # load the curated dataset
npm run dev                   # http://localhost:4000
```

Built with Node, Express, MongoDB, and Apollo Server.

---

## Licence & fair use

Data is provided free under Norway's open-data licence (NLOD). Please be reasonable with request volume so the service stays fast for everyone. If you're planning heavy usage, get in touch.