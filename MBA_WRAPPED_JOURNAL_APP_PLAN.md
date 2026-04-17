# MBA Wrapped — Standalone Travel Journal App

**Codename:** `mba-wrapped` (working title — alternates: *TrekLapse*, *ClassOfTheWorld*, *PassportMBA*)
**Author:** Product
**Date:** April 17, 2026
**Deploy target:** Replit (single repo, one-click run, always-on reserved VM)
**Relationship to TrekRank:** Sister product, not a tab. TrekRank plans and ranks; this product *remembers and performs*. The two can later share auth + a trip export format, but this ships standalone.

---

## 0. TL;DR

A single-page, login-optional web app that lets an MBA student catalog every country and city they visit during their two-year program, attach photos and a short memory to each stop, and render a cinematic "MBA Wrapped" — an Instagram-story-style sequence that ends in a **time-lapsed plane animation** tracing their entire MBA journey across a stylized world map.

Designed to be:
- **Buildable on Replit in 4 weekends** (solo, React + Vite + Supabase).
- **Shareable as a 15-second vertical video** (MP4 1080×1920) — the actual unit of virality.
- **Beautiful enough** that a student would post it unprompted to LinkedIn / Instagram Stories / the class Slack.

The single metric that matters: **% of users who export and share their Wrapped reel.**

---

## 1. Why this exists

Every MBA program is, effectively, two years of travel. Between Pre-Tern, Fall Break, Winter Break, Spring Break, Summer Internship weekends, and Post-Finals, a typical student hits 8–20 countries. Today the artifact of that journey is either:

- A cluttered Google Photos "Favorites" folder, or
- A passport they can't share digitally, or
- A LinkedIn "year in review" post that reads like a résumé.

There is no *emotional* artifact. No single shareable thing that says "here's what my MBA felt like." Spotify Wrapped solved this for music. Strava Year-in-Sport solved it for running. Nothing exists for MBA travel. That is the wedge.

---

## 2. Product vision

> **MBA Wrapped turns a two-year blur of plane tickets into a 15-second story your class will rewatch in 2040.**

Three promises:

1. **Two minutes to catalog.** Typing a city should feel as cheap as a tweet.
2. **Zero effort to render.** The Wrapped reel generates itself on command; the user just picks a song and a style.
3. **One tap to share.** MP4 for stories, PNG for feed, link for Slack.

---

## 3. Personas

### 3.1 The Archivist — *primary*

Second-year MBA, retrospectively entering trips at the end of winter break. They already have the photos and the dates. They want a beautiful artifact. **Design target:** their first Wrapped render lands within 10 minutes of signup.

### 3.2 The Trickle Logger — *secondary*

First-year, logs each trip within the week it happens. Wants the app to feel like a journal, not a database. **Design target:** adding a stop takes under 20 seconds on mobile.

### 3.3 The Comparer — *tertiary*

Anyone scrolling through a classmate's shared Wrapped. Read-only mostly, but the single biggest conversion funnel. **Design target:** a shared Wrapped link loads playable in under 2 seconds on mobile 4G.

---

## 4. Core features (scoped by release)

### MVP — "I can catalog and render" (shippable in 2 weekends)

1. Email magic-link auth (Supabase).
2. Add a stop: country, city, start date, end date, one photo, one 140-char caption.
3. World map view with animated pins (clustered by country).
4. Trip list view, sortable by date.
5. **Generate Wrapped** button: renders an in-browser time-lapse — plane flies stop to stop across the map in chronological order, cards float up with city names and dates, ends with a stats card ("12 countries · 23 cities · 187 days on the road").
6. **Export as MP4** (1080×1920, 15s) via `ffmpeg.wasm` or a Replit server-side render.
7. Public share link (`mba-wrapped.app/u/sid-2026`) that plays the reel.

### v1 — "I want it to feel like mine" (weekend 3–4)

1. Multiple photos per stop + captions (becomes a mini photo-story during the reel).
2. Theme picker: *Classic*, *Passport Stamp*, *Retro Airline*, *Minimal Dark*, *Neon Gradient*.
3. Music picker: 6 royalty-free tracks pre-licensed (Epidemic Sound or Uppbeat), one each mood — Epic, Chill, Party, Cinematic, Bollywood-flavored, Lo-fi.
4. Speed control for the plane animation (chill / standard / turbo).
5. Stats dashboard: continents, countries, cities, total days, flights (approx miles), top month, rare countries ("only you in your class went to Uzbekistan").
6. Import from Google Photos (date + geotag).
7. Import from Instagram export (zip).
8. Import from a simple CSV template.

### v2 — "I want to share and compare" (post-launch)

1. Class leaderboards per school ("CBS '26 · most countries, most continents, rarest visit").
2. Side-by-side Wrapped comparison (your reel and your friend's play together).
3. Group Wrapped: invite your travel crew, combined reel.
4. Printed-photobook export (via Lulu or Blurb API).
5. Apple Maps / Google Maps export as a personal KML.
6. Alumni-year Wrapped: annual replay delivered on graduation day.

Everything beyond v2 is parking-lot.

---

## 5. Data model (Supabase / Postgres)

Minimal. Eight tables, tight foreign keys, row-level security tied to `auth.uid()`.

```
user
 - id (uuid, pk)
 - email
 - display_name
 - school            -- e.g., "Columbia Business School"
 - cohort_year       -- e.g., 2026
 - avatar_url
 - wrapped_handle    -- unique slug, used in share URL
 - created_at

stop
 - id (uuid, pk)
 - user_id (fk -> user)
 - country_iso3      -- ISO-3166 alpha-3, authoritative
 - city_name
 - city_lat
 - city_lng
 - start_date        -- date (not timestamp)
 - end_date          -- nullable (single-day trips)
 - caption           -- 280 chars max
 - mood_tag          -- enum: epic, chill, party, culture, adventure, food, family, solo
 - created_at

photo
 - id (uuid, pk)
 - stop_id (fk -> stop)
 - storage_path      -- Supabase storage
 - width, height
 - is_cover (bool)
 - order_idx

reel
 - id (uuid, pk)
 - user_id (fk -> user)
 - title             -- e.g., "My MBA, 2024–2026"
 - theme             -- enum
 - music_track_id    -- fk -> music
 - speed             -- enum: chill, standard, turbo
 - visibility        -- public | unlisted | private
 - last_rendered_at
 - mp4_url           -- generated
 - poster_url

music_track
 - id, name, artist, url, license, bpm

share_event
 - id, reel_id, platform, created_at

reaction
 - id, reel_id, actor_id, emoji  -- ❤️ 🔥 ✈️ 😭 🤌

friend
 - user_id, friend_id, status    -- accepted | pending | blocked
```

Indexes on `stop(user_id, start_date)` and `stop(country_iso3)`. Row-level security: a user can read their own rows + any `reel` marked public. Photos are served via signed URLs that expire in 1 hour.

A canonical `country_catalog` table (seeded from a public ISO dataset) ships with the app; never ask the user to free-type a country.

---

## 6. Architecture (Replit-friendly)

**Stack decision:** optimize for "runs on Replit with zero DevOps."

- **Frontend:** Vite + React 18 + TypeScript. Tailwind CSS. Framer Motion for animations. React Router. Zustand for small global state.
- **Map:** MapLibre GL JS (free fork of Mapbox, no token required) with a minimal custom style. Fallback to plain SVG world map for the Wrapped render (faster, export-safe).
- **Plane / path animation:** SVG path with `getPointAtLength()` for the trail; Framer Motion for camera pan; Canvas for the final compositing step (so we can grab frames for video export).
- **Video export:** `@ffmpeg/ffmpeg` (WASM) in-browser for the MVP. If browsers choke on long reels, offload to a Replit Node service that runs headless Chromium + `ffmpeg` to produce the MP4.
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions) as the always-on layer. Replit runs the frontend + a small Node service for render jobs.
- **Deploy on Replit:** single monorepo with `client/` and `server/`. Replit's "Always-On" reserved VM for the render worker. Environment variables for Supabase keys. A `.replit` file with `run = "npm run dev:all"` using `concurrently` to start both client and server.

### Why not Next.js?
Next is great but heavier on Replit (dev-server memory, SSR). Vite gives us instant HMR and a trivial build artifact. If/when we need SSR for share-link previews, a single `server/share/[handle].ts` Express route handles the OG-image generation.

### Secrets & keys
Supabase URL + anon key in `.env`. Service role key only in the server. No paid map tokens needed (MapLibre + OSM tiles, or Protomaps for offline tiles).

### Storage & CDN
Supabase storage bucket `photos/` for uploads, `reels/` for rendered MP4s. Public reel URLs served via Supabase CDN (Cloudflare-backed).

---

## 7. The Wrapped experience — detailed spec

This is the beating heart of the product. Treat it like a film.

### 7.1 Structure — a 15-second short film

```
t=0.0–1.0s   Title card: "<Name>'s MBA, <startYear>–<endYear>"
             Soft plane hum fades in.
t=1.0–2.0s   Stats flash: "12 countries · 23 cities · 187 days"
             Numbers count up with a small bounce.
t=2.0–11.5s  Map sequence (9.5s, the centerpiece):
             - World map zooms to first stop.
             - Pin drops with city name.
             - Plane takes off, traces arc to next stop.
             - Camera pans with plane.
             - Photo card slides in over pin when plane arrives.
             - Repeat for each stop.
             - Speed adjusts dynamically to fit the 9.5s budget.
t=11.5–13.5s "Rare finds" card:
             - Shows 1-3 unusual countries with "first in your class" or "1 of 3 from CBS" badges.
t=13.5–14.5s Mood breakdown:
             - Radial bar chart of Adventure / Culture / Party / Chill %.
t=14.5–15.0s End card:
             - "My MBA Wrapped — mba-wrapped.app/u/<handle>"
             - QR code in corner for the share.
```

### 7.2 Camera and motion

- World uses an **equirectangular** projection at rest; when zooming in to a region, we cross-fade to **orthographic** so the globe feels alive. Both supported by d3-geo.
- Plane follows a **great-circle arc** between two lat/lng points, computed via `d3.geoInterpolate`. Arc is rendered as an SVG path; plane `<svg>` uses `getPointAtLength()` to get its position at each frame. The trail is a `<path>` with a progressively incrementing `stroke-dasharray`.
- Plane rotation matches the tangent of the path (so it points where it's going). Small oscillation for life.
- Exhaust trail is a semi-transparent dashed stroke that fades behind the plane.
- Camera pans ahead of the plane by ~200 pixels so the destination is visible before arrival (cinematic rule: never center on subject mid-motion).

### 7.3 Pacing math

Total map sequence budget = 9.5 seconds. Let `n` = number of stops.

```
per-segment time  = max(0.4s, 9.5 / n)
arc travel time   = 0.7 × per-segment time
card dwell time   = 0.3 × per-segment time
```

Users on turbo mode: budget → 6.5s. Chill mode: → 13.5s (reel becomes 19s). Speed doesn't break the shape — it adjusts scalars only.

### 7.4 Themes (initial 5)

| Theme | Map palette | Plane | Typography | Music default |
|---|---|---|---|---|
| Classic | Navy land / blue water / gold accents | Commercial jet silhouette | Outfit 700 | Cinematic |
| Passport Stamp | Off-white paper, watercolor continents | Tiny stamped plane silhouette | Courier mono | Lo-fi |
| Retro Airline | Cream + terracotta + teal, mid-century illo | Propeller plane | Playfair | Bossa-nova |
| Minimal Dark | Pure black, white land strokes | Line-drawn plane | Inter | Ambient |
| Neon Gradient | Synthwave magenta→cyan | Chrome plane with glow trail | Space Grotesk | Synthwave |

All themes share the same motion rig; only tokens differ.

### 7.5 Music

Six royalty-free licensed tracks (Uppbeat creator plan or one-time Epidemic Sound sync). Pre-cut to 15, 19, and 11 seconds so speed changes pick the right master. Music ducks -3 dB during voiceover if voiceover is ever added (v3).

### 7.6 Export pipeline

**Path A — in-browser (MVP, up to ~25 stops):**
- Render the whole reel into an off-screen `<canvas>` at 1080×1920, 30 fps.
- Capture frames with `canvas.captureStream()`, encode via `MediaRecorder` to WebM.
- Transcode WebM → MP4 with `ffmpeg.wasm` so it plays on iOS.
- Save to Supabase storage; return a public URL.

**Path B — server-side (fallback, any length):**
- Replit Node worker spawns headless Chromium (Playwright).
- Opens a private reel URL with a `?render=1` flag.
- The page sends a `PuppeteerReady` event; worker grabs screenshots at 30 fps using the DevTools screencast API, pipes into `ffmpeg` as a stream, muxes in the chosen audio track, outputs MP4.
- Uploads to Supabase storage.

Render SLA: p50 under 20s on path A, under 45s on path B.

### 7.7 Social share

- **Instagram Story:** MP4 1080×1920, 15s, with end card. Copy-to-clipboard URL.
- **Feed (PNG):** Single-frame poster image at 1080×1350 with the map, city list, and handle.
- **LinkedIn:** 16:9 crop of the reel, 30s max.
- **Slack / WhatsApp:** direct link with OG image preview (generated server-side from the poster).
- **QR code:** embedded in the end card for classmate scanning.

---

## 8. UI / UX

### 8.1 Screens

Six screens is the entire app. Don't let it bloat.

1. **Landing** — one-screen pitch, "See a demo Wrapped" button plays someone else's reel. Signup CTA.
2. **Home (logged in)** — map of your stops, list view toggle, big "Render Wrapped" CTA at bottom.
3. **Add stop** — bottom-sheet modal on mobile, side drawer on desktop.
4. **Edit stop** — same shell as Add.
5. **Wrapped player** — full-bleed vertical canvas + playback controls + theme / music / speed picker.
6. **Share** — after render: MP4 preview, buttons for IG / LinkedIn / Slack / QR / download.

Settings and profile are drawers opened from the top bar avatar.

### 8.2 Interaction details

- **Add stop input** is a single smart field: "I went to `Tokyo, Japan` in `March 2025`." A parser extracts city, country, date; fallback form if parse fails. This one input is the signature.
- **Map pins cluster** by country when zoomed out. Tapping a cluster expands to cities.
- **Photos** drag-and-drop anywhere on the screen; browser catches the drop, opens the Add Stop sheet with the photo pre-attached and attempts EXIF geolocation + date parsing.
- **Timeline view** is a horizontal scroll with MBA windows marked (Pre-Tern, Winter, Spring, Summer, Post-Finals). Pull this from a shared constant across TrekRank and Wrapped.
- **Wrapped player** has keyboard shortcuts: `space` play/pause, `↑/↓` theme, `←/→` scrub, `s` share, `d` download.

### 8.3 Visual language

- **Default dark.** Editable in settings.
- **Accent color:** chosen per user from 6 options at signup (sky / rose / amber / mint / violet / slate).
- **Typography:** Outfit for display, Inter for body. Same as TrekRank — intentional family feel.
- **Motion:** all transitions `cubic-bezier(0.2, 0.8, 0.2, 1)`, 220ms default.
- **Empty states:** illustrated, on-brand, never generic. First stop empty state shows a world map with a pulsing pin on the user's school location saying "Start here."

### 8.4 Accessibility

- WCAG 2.2 AA for every screen.
- Map has a tabbable list fallback.
- Wrapped player has a "non-motion" mode (captions + slideshow) for users with vestibular disorders.
- Reel captions auto-generated (city names + dates) for screen reader + silent scrolling on Instagram.

---

## 9. Onboarding (three-step, ≤ 60 seconds)

1. Magic-link sign-in + school / cohort-year.
2. "Import your history or start fresh" — three tiles: *Paste a CSV*, *Drag Google Photos export*, *Add manually*.
3. Add first stop (prefilled with their school city for comedic effect) and immediately tease: "Render your first Wrapped now? (30 seconds)".

If they render a Wrapped with 1 stop, it still works — it just becomes a short "The journey begins" teaser reel with their school city.

---

## 10. Privacy, safety, and etiquette

- Every reel defaults to **unlisted**. Public requires one extra tap with a "this shows your travel dates" warning.
- Location granularity is city, never exact address. No live location ever.
- Photos are stored in private buckets; only shared via signed URLs scoped to the reel URL.
- "Hide specific stops from reel" toggle — some students don't want home-country family trips in the public version.
- A nuclear **Delete my account** option wipes everything (auth, stops, photos, reels) within 30 days, with a confirmation that requires typing the user's handle.

---

## 11. Edge cases & constraints to get right

- User with 0 stops → onboarding nudge.
- User with 1 stop → "round trip" reel with a cute twist.
- User with > 50 stops → stops get grouped into regional "chapters" so the reel stays 15s; show full list in a scrollable appendix card.
- Stops in the same city within 14 days get merged into one with extra photos.
- Multi-day overland trips (e.g., Europe rail) interpolate through each city as a short ground-segment instead of a plane arc.
- Impossible dates (end < start) blocked at input.
- Duplicate stops auto-deduped.
- No coordinates for city → fallback to country centroid with a visible "approx" pin style.
- Map offline / tile failure → degrade to the internal SVG world map used for export.
- Generated reels cached by a hash of (stops + theme + music + speed) so re-renders are instant when nothing changed.

---

## 12. Success metrics

| Metric | 30-day target | 90-day target |
|---|---|---|
| Signups | 500 | 3,000 |
| Stops added per active user | 4 | 12 |
| First-Wrapped render rate (of signups) | 60% | 75% |
| Share rate (of rendered Wrappeds) | 25% | 40% |
| Median time from signup to first share | < 15 min | < 10 min |
| Return users (W2) | 30% | 45% |
| Schools with ≥ 10 accounts | 5 | 25 |

**Primary metric:** share rate × rendered count = *shares per week*. Everything else is an input.

---

## 13. Growth loops

1. **Viral reel loop.** Every shared reel ends with a QR + URL pointing to `mba-wrapped.app/u/<handle>`; landing page shows the reel, then "Make yours."
2. **School leaderboards.** Once ≥ 10 students from a school sign up, unlock a class Wrapped page ("CBS '26 — 418 countries collectively"). This gets shared in class Slacks.
3. **End-of-semester trigger.** Email + push on Dec 20 and May 15: "Wrapped is ready — you traveled to X new places this semester." Pre-rendered preview in the email.
4. **Group Wrapped.** Invite a travel crew → everyone's reel blends → all four friends share one thing. Each co-creator invite adds ~1 new signup in tests of similar products.
5. **Alumni annual replay.** Every June, a one-click "My year in travel" reel sent to alumni.

---

## 14. Roadmap (4 weekend sprints → launch)

### Weekend 1 — foundations

- Replit repo scaffold (Vite + Tailwind + React Router + Zustand).
- Supabase project + auth + schema migration.
- Landing page + magic-link login.
- Home screen with empty map.
- Add-stop sheet + smart parser (client-side only).
- Country + city geocode via a small bundled `cities500.json` dataset (public domain, ~150KB gzipped, ~25k cities).

### Weekend 2 — the reel

- SVG world map renderer + plane component with great-circle arc math.
- Framer Motion choreography for the 15s reel.
- Theme 1 (Classic) and one music track end-to-end.
- In-browser MP4 export via `MediaRecorder` + `ffmpeg.wasm`.
- Share screen with download + copy link.

### Weekend 3 — polish + personalization

- 4 more themes + 5 more music tracks.
- Stats card + rare-finds card.
- Poster image (PNG) export for feed.
- OG-image server route for shared links.
- CSV import + Google Photos ingest.
- Mobile-first polish: gestures, bottom-sheet, haptics.

### Weekend 4 — launch prep

- Empty-state illustrations, onboarding copy pass.
- Server-side render worker (path B) for long reels.
- Analytics instrumentation (PostHog self-hosted on Replit, or Plausible).
- Privacy review + delete-my-data flow.
- Soft launch in 2–3 MBA Slacks; iterate on feedback before wider push.

### Post-launch backlog (parked)

School leaderboards · Group Wrapped · Printed photobook · KML export · Apple Wallet "Travel Pass" · AI voiceover narration · TrekRank integration (auto-populate Wrapped from planned trips).

---

## 15. File / folder layout on Replit

```
mba-wrapped/
├─ .replit
├─ package.json                 // npm workspaces
├─ client/
│  ├─ index.html
│  ├─ src/
│  │  ├─ main.tsx
│  │  ├─ App.tsx
│  │  ├─ routes/
│  │  │  ├─ Landing.tsx
│  │  │  ├─ Home.tsx
│  │  │  ├─ Wrapped.tsx
│  │  │  └─ Share.tsx
│  │  ├─ components/
│  │  │  ├─ map/WorldMap.tsx
│  │  │  ├─ map/PlanePath.tsx
│  │  │  ├─ stops/AddStopSheet.tsx
│  │  │  ├─ stops/StopsList.tsx
│  │  │  ├─ wrapped/Reel.tsx
│  │  │  ├─ wrapped/Scenes/TitleScene.tsx
│  │  │  ├─ wrapped/Scenes/MapScene.tsx
│  │  │  ├─ wrapped/Scenes/StatsScene.tsx
│  │  │  ├─ wrapped/Scenes/EndScene.tsx
│  │  │  ├─ wrapped/Themes.ts
│  │  │  └─ ui/*                // shared primitives
│  │  ├─ lib/
│  │  │  ├─ supabase.ts
│  │  │  ├─ geo.ts              // great-circle, projection helpers
│  │  │  ├─ parser.ts           // "Tokyo, Japan in March 2025" → struct
│  │  │  ├─ stats.ts            // counts, rarity calc
│  │  │  └─ export/
│  │  │     ├─ canvasRecorder.ts
│  │  │     └─ ffmpeg.ts
│  │  └─ styles/
│  │     └─ tokens.css
│  └─ vite.config.ts
├─ server/
│  ├─ index.ts                  // express
│  ├─ routes/
│  │  ├─ share.ts               // OG image + handle fetch
│  │  └─ render.ts              // headless chromium render worker
│  └─ supabaseAdmin.ts
├─ supabase/
│  ├─ migrations/               // SQL files
│  └─ seed/
│     └─ country_catalog.sql
└─ data/
   ├─ cities500.json
   └─ music/
      ├─ epic.mp3
      └─ ...
```

---

## 16. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| In-browser video export too slow on low-end phones | High | Gracefully fall back to server render with a progress bar |
| Map tile dependency (OSM) rate-limits at scale | Medium | Cache tiles for common zooms; swap to Protomaps when usage > 50k tiles/day |
| Music licensing surprises | Medium | Use Uppbeat or Epidemic Sound creator plans that explicitly cover user-generated video |
| Photo-storage cost creep | Medium | 20 MB per user Supabase free tier → enforce 10 photo × 1 MB cap in MVP |
| Replit cold starts kill share links | Medium | Put share-link + OG-image generation on Supabase Edge Functions instead of the Replit server |
| User privacy concerns over public travel dates | High | Unlisted by default, clear warning before going public, easy delete |
| Wrapped looks the same across users (visual monotony) | Medium | Themes + music + accent color + photo variety produce ≥ 1,000 visibly distinct outputs |
| App feels like a toy, not a product | Medium | Polish the typography, add motion, invest in the landing page demo reel |

---

## 17. Open decisions needed before weekend 1

1. **Handle naming:** auto-generated from name+cohort (`sid-2026`) or user-picked?
2. **Free forever vs freemium?** First instinct: free forever for MBAs (student-verified via `.edu`), later monetize via the printed photobook and premium themes.
3. **Auth:** magic link only (friction-minimal) or Google OAuth too?
4. **Map visual:** OSM tiles (realistic) or stylized SVG only (faster, more "brand")? Leaning stylized SVG for v1, OSM behind a toggle.
5. **Music rights budget:** Uppbeat creator plan ($12/mo) vs Epidemic ($20/mo) vs commissioning six original 15s loops from one composer (~$800 one-time)?
6. **Server render worker location:** Replit always-on VM (easier) or Supabase Edge Function + a small Fly.io render box (more reliable)?

---

## 18. First 48 hours after "go" decision

- **Hour 0–2:** Spin up Replit, `npm create vite@latest client -- --template react-ts`, commit.
- **Hour 2–4:** Supabase project, schema migration, auth working end-to-end.
- **Hour 4–8:** Add-stop flow working against Supabase, stops list renders on home.
- **Hour 8–14:** World map with animated pins + basic plane arc between two hard-coded stops.
- **Hour 14–20:** Full reel scaffolded with title + map + stats + end card, plays to 15s.
- **Hour 20–28:** In-browser MP4 export via `MediaRecorder` + `ffmpeg.wasm`, drops into Supabase storage.
- **Hour 28–36:** Share screen, copy-link, QR, OG preview via server route.
- **Hour 36–44:** First theme polish, pick one music track, test on three phones.
- **Hour 44–48:** Ship private beta to 10 MBA friends. Watch them. Take notes.

---

## 19. Why this is the right product to build on Replit

- Self-contained. No third-party heavy dependencies beyond Supabase.
- All interesting work is front-end (animation, theme system, export) — which is where Replit shines.
- No cron jobs, no background workers in MVP.
- Zero spend to launch if music licensing is deferred to free library.
- The single viral surface (the 15-second reel) is *also* the demo. There is no marketing site vs product gap — the demo IS the product.

---

## 20. What "done" looks like on day 30

A student at any top-25 MBA can:

1. Land on `mba-wrapped.app` from a classmate's Slack.
2. See a shimmering 15-second reel in 2 seconds.
3. Sign in with their school email.
4. Paste a CSV of their past 12 trips OR add them one at a time.
5. Tap **Render Wrapped**, wait 20 seconds, and watch their own version.
6. Tap **Share to Instagram**, get an MP4 in the Photos app, post it to their story.
7. Send the link to 3 classmates.
8. Two of them sign up the same night.

Loop closed.

---

*End of document.*
