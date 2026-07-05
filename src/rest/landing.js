// src/rest/landing.js
// A friendly HTML landing page at the API root, so opening the base URL in a
// browser (desktop or phone) shows readable docs instead of raw JSON or an error.

export function landingPage(baseUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Norway Attractions API</title>
<style>
  :root { --fjord:#1f5673; --rust:#c65a3a; --ink:#12222e; --dim:#5c6b78; --line:#dce4ea; --bg:#eef2f5; }
  * { box-sizing: border-box; }
  body { margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
         background:var(--bg); color:var(--ink); line-height:1.5; }
  .wrap { max-width:760px; margin:0 auto; padding:32px 20px 64px; }
  header { border-bottom:2px solid var(--fjord); padding-bottom:20px; margin-bottom:28px; }
  h1 { margin:0 0 6px; font-size:30px; letter-spacing:-0.5px; }
  .sub { color:var(--dim); font-size:15px; }
  h2 { font-size:14px; text-transform:uppercase; letter-spacing:1px; color:var(--fjord);
       margin:32px 0 12px; }
  .ep { background:#fff; border:1px solid var(--line); border-radius:12px; padding:16px;
        margin-bottom:12px; }
  .ep .method { display:inline-block; background:var(--fjord); color:#fff; font-size:12px;
        font-weight:700; padding:2px 8px; border-radius:6px; margin-right:8px; }
  .ep code { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:13px; word-break:break-all; }
  .ep a { color:var(--rust); text-decoration:none; font-family:ui-monospace,monospace; font-size:13px; word-break:break-all; }
  .ep a:hover { text-decoration:underline; }
  .desc { color:var(--dim); font-size:14px; margin-top:6px; }
  .pill { display:inline-block; background:#eaf1f5; color:var(--fjord); font-size:12px;
          font-weight:600; padding:3px 9px; border-radius:999px; margin:2px 4px 2px 0; }
  footer { margin-top:40px; color:var(--dim); font-size:13px; }
  a.gql { color:var(--fjord); font-weight:600; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>Norway Attractions API</h1>
    <div class="sub">Curated attractions, hikes, and points of interest across Norway. Free, open data.</div>
  </header>

  <h2>Try it — tap any link</h2>

  <div class="ep">
    <div><span class="method">GET</span><a href="${baseUrl}/api/attractions?region=bergen">/api/attractions?region=bergen</a></div>
    <div class="desc">All attractions in a region. Filter by <code>region</code>, <code>category</code>, <code>difficulty</code>, <code>search</code>.</div>
  </div>

  <div class="ep">
    <div><span class="method">GET</span><a href="${baseUrl}/api/attractions?category=hike&difficulty=hard">/api/attractions?category=hike&amp;difficulty=hard</a></div>
    <div class="desc">Combine filters — here, hard hikes anywhere.</div>
  </div>

  <div class="ep">
    <div><span class="method">GET</span><a href="${baseUrl}/api/attractions/near?lat=60.39&lng=5.32&radiusKm=10">/api/attractions/near?lat=60.39&amp;lng=5.32&amp;radiusKm=10</a></div>
    <div class="desc">Geo search — attractions near a coordinate, sorted by distance.</div>
  </div>

  <div class="ep">
    <div><span class="method">GET</span><a href="${baseUrl}/api/regions">/api/regions</a> &nbsp; <a href="${baseUrl}/api/categories">/api/categories</a></div>
    <div class="desc">Available regions and categories with counts.</div>
  </div>

  <h2>Filters</h2>
  <div>
    <span class="pill">region</span><span class="pill">category</span><span class="pill">difficulty</span>
    <span class="pill">search</span><span class="pill">limit</span><span class="pill">offset</span>
  </div>

  <h2>Prefer GraphQL?</h2>
  <div class="ep">
    <div>The same data is available via GraphQL at <a class="gql" href="${baseUrl}/graphql">${baseUrl}/graphql</a></div>
    <div class="desc">POST queries for flexible, exactly-what-you-need responses.</div>
  </div>

  <footer>
    Data is hand-curated for quality. Coordinates are WGS84. Open under NLOD.
  </footer>
</div>
</body>
</html>`;
}
