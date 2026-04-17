# TrekRank — UX / UI Implementation Plan

**Author:** Product (PM lead)
**Date:** April 17, 2026
**Status:** Draft v1.0 — for design + eng review
**Scope:** End-to-end UX redesign of the TrekRank web app (Explore, Recommend, Plan, My Trips, Community) plus a net-new onboarding, profile, and trip-detail surface. Grounded in the current Next.js 16 / Prisma / Supabase codebase.

---

## 0. TL;DR

TrekRank has strong *primitives* — an Elo-ranked destination graph, itinerary builder, PDF export, school-aware social feed, and a calendar-aware planner. It is let down by an *incoherent top-level experience*: five nav entries that each fight for the same cognitive real-estate, no onboarding to personalize the feed, empty states that don't teach, and a visual language that is consistently "dark + bold" but inconsistently applied (double navigation, competing CTAs, uneven density).

This plan proposes five moves, in this order:

1. **Rewire the IA** from five peer tabs to three jobs: *Discover*, *Plan*, *Remember*. Collapse Explore and Recommend into one progressive surface. Promote My Trips into the app's true home.
2. **Ship an onboarding** that captures school, cohort year, trip DNA and unlocks personalization — the missing moment that currently makes every surface feel generic.
3. **Rebuild the Planner** into a single-canvas year view with AI-assisted slot optimization, conflict detection, and cohort overlays.
4. **Upgrade the Community loop** from a text feed into a trip-graph: who went where, what they ranked, who's going next, who's inviting you.
5. **Standardize a real design system** — typography scale, spacing, glass-surface hierarchy, motion, empty states, iconography — so every screen feels like the same product.

Target outcomes over a 12-week rollout: **+40% D7 retention**, **+25% trips-planned-per-user**, **+3x invites sent per planned trip**, **ranked destinations per user from ~5 to 20+**.

---

## 1. Current State Audit

### 1.1 What is working

The product thesis is right. MBA treks are high-intent, high-budget, high-social-pressure events. Students are *already* trying to coordinate them in Google Sheets, WhatsApp threads, and Notion docs. TrekRank has:

- A differentiated **ranking engine** (Elo pairwise voting). No competitor has this specific pattern for travel.
- A **calendar-native planner** that understands MBA-specific windows (Pre-Tern, Winter Break, Spring Break, Post-Finals). This is a moat.
- An **itinerary editor** with time-of-day buckets and budget tracking.
- A **social layer** scoped to a school, which creates real network effects.
- A **PDF export** — the single most under-rated feature; it is how trips actually get shared inside MBA cohorts.

### 1.2 Where it breaks today

| # | Observation | Page | Severity |
|---|-------------|------|----------|
| 1 | Double nav bar (top + bottom) duplicates entries and steals ~10% vertical space | All | High |
| 2 | The home screen headline ("Your Global Legacy") is aspirational but tells a signed-out user nothing about what the product *does* | Home | High |
| 3 | "Cards / Map / Timeline" view toggle appears before there is any content, and its live state is ambiguous | My Trips | High |
| 4 | "Capture your trip memories" is both a CTA and the empty-state affordance, but there's also a separate "Add a trip" input below it | My Trips | High |
| 5 | Explore shows filters before it shows destinations — a classic anti-pattern; users bounce before they see an item | Explore | Critical |
| 6 | Region filter list is flat (11+ chips), with no counts and no smart grouping. "Europe / Middle East (Transcontinental)" is a label, not a user need | Explore | High |
| 7 | Recommend is a separate destination despite doing ~80% of the same job Explore should do (surface the right trek). It is also gated to a 5-step wizard with no escape hatch | Recommend | High |
| 8 | Plan uses unexplained "LOCKED" states and "Drop trip here" placeholders with no visible source of trips to drag from in the viewport | Plan | Critical |
| 9 | "Leaderboard" title on the Plan page is inconsistent with every other surface that uses "Rankings" | Plan | Medium |
| 10 | Community uses internal jargon ("Trip DNA") with no tooltip or definition; new users cannot form a post intent | Community | High |
| 11 | Sign In is only in the top-right; the product demands personalization on every page yet never incentivizes signup in-flow | Global | High |
| 12 | No search, no notifications, no profile avatar anywhere on the chrome | Global | High |
| 13 | Empty states across all 5 screenshots are either missing or generic — no illustration, no suggestion, no "start with a template" | Global | High |
| 14 | Every headline uses the same oversized display treatment ("Your Global Legacy", "Explore Treks", "Find Your Perfect Trek", "Plan Your Year", "Global Social Feed"), which flattens the hierarchy and makes every surface feel like a landing page | Global | Medium |
| 15 | Dark-only theme with low contrast on secondary text (e.g., Plan page body copy); likely fails WCAG AA on multiple elements | Global | High |
| 16 | Budget filter lives in Recommend but not in Explore, so two surfaces with overlapping intent have non-overlapping filters | Explore / Recommend | Medium |
| 17 | No visible progress, achievements, or feedback loops for ranking behavior — yet ranking is the core data-generating primitive | Global | High |
| 18 | Trip templates are buried in `/data` and never surfaced in the UI as a first-class "start from" pattern | Plan | Medium |

### 1.3 Heuristic scorecard (Nielsen, 1–5)

| Heuristic | Score | Notes |
|---|---|---|
| Visibility of system status | 2 | No loading/empty/error taxonomy |
| Match with real world | 3 | MBA-native calendar is great; "Trip DNA" breaks it |
| User control & freedom | 2 | Recommend wizard has no "skip" |
| Consistency & standards | 2 | Leaderboard vs Rankings; top nav vs bottom nav |
| Error prevention | 2 | Filters can produce zero-result states silently |
| Recognition > recall | 3 | Good chip filters, but no saved filters |
| Flexibility & efficiency | 2 | No keyboard shortcuts, no power-user tools |
| Aesthetic & minimalist design | 4 | Strong visual instinct, over-applied |
| Help users recover | 1 | No empty-state recovery copy |
| Help & documentation | 1 | No onboarding, no tooltips |

**Composite:** 2.2 / 5. Room to move.

---

## 2. Product Vision & North Star

### 2.1 Vision

> **TrekRank is the operating system for MBA travel.** Every cohort arrives with a blank two-year calendar and leaves with a ranked, planned, documented, shareable global legacy. We are not a travel-booking tool — we are the memory and decision layer on top of it.

### 2.2 North-star metric

**Planned-and-ranked trips per active MBA user per quarter.** This one number captures discovery (rank), intent (plan), and retention (quarter). Supporting metrics below.

### 2.3 Guardrail metrics

- Week-1 activation (user completes onboarding + ranks ≥ 5 destinations + adds ≥ 1 trip to calendar)
- Cohort coverage (% of a given school's MBA class with an account)
- Invite conversion (sent invite → accepted invite)
- Content velocity (ranked trips, social posts, memory entries per week)

---

## 3. Personas

We design for three, optimizing for **The Aspirational Planner** as primary.

### 3.1 The Aspirational Planner — *primary*

Second-year MBA, 27, looking ahead to Spring Break and Post-Finals. Has money to spend but not to waste. Wants social proof from their cohort and from alumni. Chief pain: "I have 14 WhatsApp groups and I still don't know where to go." KPI for them: time-to-first-ranked-trip under 90 seconds.

### 3.2 The Cohort Organizer — *secondary*

First-year MBA, 25, the person in their section who ends up running the group. Manages 8–30-person trips. Needs: collaborative itineraries, budget transparency, easy-for-laggards RSVP. KPI for them: successful group-trip publication rate.

### 3.3 The Alumni Curator — *tertiary*

Graduated 2–5 years ago, revisits to reminisce, give tips, and tag favorite spots for current students. Read-heavy, light writer. KPI for them: weekly return visits + tips written.

---

## 4. Primary user journeys

### 4.1 "Help me pick a trip for Spring Break"

**Today:** Home → confusion → Explore → filter fatigue → bounces to Google Sheets.
**Tomorrow:** Home (personalized) → "Spring Break 2026 — 12 picks for CBS '26" module → tap a card → swipe-rank → land on a planner-ready itinerary in 3 taps.

### 4.2 "Plan the year at a glance"

**Today:** Plan page → "LOCKED" slots with no explanation → drags with no source panel visible → abandons.
**Tomorrow:** Plan is the home screen. Year canvas shows all 6 MBA windows with visible capacity, dollar-budget pacing, and a dockable "Candidates" rail.

### 4.3 "Remember and share what I did"

**Today:** Capture memory → disappears into a card → hard to find later.
**Tomorrow:** A trip's detail page is a living journal: photos, ranked meals, tips, PDF. One-tap "share as recap" produces a social-ready card.

### 4.4 "Vote / rank destinations"

**Today:** Pairwise rank lives on /rank but is orphaned — no entry point from home.
**Tomorrow:** Ranking is the core engagement loop, surfaced as a persistent 30-second micro-session ("Rank 3 quick matchups") on the home page.

### 4.5 "Invite my friends"

**Today:** WhatsApp invite component exists, but there is no viral moment — invites are buried in a trip detail.
**Tomorrow:** Every created trip ends in an "invite your crew" sheet with auto-generated WhatsApp + email + QR-code handoffs.

---

## 5. Design principles

Adopted as design-review criteria. Every PR in UX scope must be scored against these.

1. **Teach by doing, not by telling.** Empty states, inline coach-marks, and progressive disclosure over modal tutorials.
2. **One headline per screen.** Stop turning every page into a hero landing page.
3. **Content-first, filters-second.** Always show results above the filter interface; filters are modifiers, not gates.
4. **The calendar is the canonical axis.** Every trip has to know what window it lives in.
5. **Social proof is a first-class UI primitive.** "4 of your classmates ranked this top-3" beats "★ 4.8 (132 reviews)".
6. **Dark by default, bright on demand.** Ship a true light theme. Fix contrast.
7. **Performance is a feature.** Every route under 200ms LCP on a 4G MBA-dorm Wi-Fi.
8. **Opinionated defaults, escape hatches everywhere.** Power users must always be able to skip, edit, or undo.
9. **Mobile is the design truth.** Design at 390px first; desktop is a scaled-up special case.
10. **Copy is UX.** Every label ships with a 5-word max plain-English fallback.

---

## 6. Information Architecture redesign

### 6.1 Current IA (5 peer tabs + hidden Rank)

```
[ Explore ] [ Recommend ] [ Plan ] [ My Trips ] [ Community ]    (+ /rank hidden)
```

Five equal entries, two of which (Explore, Recommend) overlap, and one of which (Rank) is invisible. This is a classic case of feature-led IA.

### 6.2 Proposed IA (3 jobs + persistent actions)

```
[ Discover ]       [ Plan ]       [ Journal ]

  ↳ contains:       ↳ contains:    ↳ contains:
    • Feed           • Year view    • My Trips (past)
    • Rankings       • Trip builder • Memories
    • Explore        • Calendar     • Shareables
    • Recommender    • Budget       • Achievements
```

Persistent global actions in the top bar: **Search · Notifications · Invite · Profile**.

Rationale: a user's intent is always one of three things — "help me find something", "help me organize what I already found", "help me remember / show off what I did". Everything else is a sub-view.

### 6.3 Mapping from old → new

| Old route | Old page | New route | New treatment |
|---|---|---|---|
| `/` | Home / My Trips mixed | `/` | New personalized dashboard |
| `/discover` | Explore Treks | `/discover` | Subsumes Recommend; filters become modifiers |
| `/recommend` | 5-step wizard | `/discover?onboarded=true` | Becomes one of several ranking/filter modes; standalone page deprecated |
| `/plan` | Year planner | `/plan` | Rebuilt as single canvas |
| `/trips` | My Trips | `/journal` | Renamed; includes memories + exports |
| `/socials` | Community | `/` + `/discover` | Feed absorbed into Discover as a tab |
| `/rank` | Pairwise rank | surfaced as a widget on `/` + modal everywhere | No longer a standalone page |

---

## 7. Design system v2

Single source of truth shipped as a `@trekrank/ui` folder under `/components/ui/*` and design tokens under `/lib/tokens.ts`.

### 7.1 Typography

| Role | Font | Weight | Size (desktop / mobile) | Line-height |
|---|---|---|---|---|
| Display XL (hero only) | Outfit | 800 | 72 / 44 | 1.02 |
| Display L (one per page) | Outfit | 700 | 48 / 32 | 1.08 |
| Heading M | Outfit | 600 | 28 / 22 | 1.2 |
| Heading S | Outfit | 600 | 20 / 18 | 1.25 |
| Body L | Inter | 400 | 18 / 16 | 1.5 |
| Body M | Inter | 400 | 16 / 15 | 1.5 |
| Body S | Inter | 400 | 14 / 13 | 1.45 |
| Label / caps | Inter | 600 | 12 / 12 | 1.2, tracking 0.08em |
| Mono (data) | JetBrains Mono | 500 | 14 / 13 | 1.35 |

Rule: exactly one Display XL or Display L per page. Everything else caps at Heading M.

### 7.2 Color & surfaces

Dark theme (current) remains default. Ship light theme simultaneously.

```
--bg-0       : #0A0A0C  (dark)  | #FAFAFC (light)
--bg-1       : #141418  (dark)  | #F2F2F6 (light)     -- glass surface base
--bg-2       : #1C1C22  (dark)  | #E8E8EE (light)     -- elevated card
--bg-3       : #26262E  (dark)  | #DCDCE4 (light)     -- input / chip
--fg-0       : #FAFAFC  (dark)  | #0A0A0C (light)     -- titles
--fg-1       : #C8C8D2  (dark)  | #2A2A34 (light)     -- body
--fg-2       : #8A8A96  (dark)  | #5A5A66 (light)     -- tertiary (MUST pass 4.5:1)
--fg-3       : #5A5A66  (dark)  | #8A8A96 (light)     -- disabled
--accent     : #3B82F6  (both)
--accent-2   : #A78BFA  (both)  -- planning/budget
--success    : #22C55E
--warn       : #F59E0B
--danger     : #EF4444
```

Three glass tiers: `--glass-subtle`, `--glass-medium`, `--glass-strong` (backdrop-blur 8/16/24px). Today's code uses glass on everything; v2 uses it sparingly on modal and navigation only.

### 7.3 Spacing (8-pt grid)

`4, 8, 12, 16, 24, 32, 48, 64, 96`. No off-grid spacing in PRs.

### 7.4 Motion

Global motion token: `--ease-soft: cubic-bezier(0.2, 0.8, 0.2, 1)`. Durations: 120ms micro, 220ms standard, 400ms page. Respect `prefers-reduced-motion` everywhere.

### 7.5 Component library (first pass)

Build or harden: `Button`, `IconButton`, `Input`, `Select`, `Combobox`, `Chip`, `Tag`, `Card`, `TripCard`, `Avatar`, `AvatarStack`, `Sheet`, `Drawer`, `Dialog`, `Toast`, `Tooltip`, `Popover`, `Tabs`, `Segment`, `ProgressRing`, `EmptyState`, `Skeleton`, `ErrorBoundary`, `DataGrid`, `CalendarSlot`, `MapCanvas`, `RankingArena`, `BudgetBar`.

### 7.6 Empty-state pattern

Every empty state ships with (a) a single-sentence explanation of what goes here, (b) one illustration, (c) exactly one primary action, (d) optional secondary "see an example". Enforced via a shared `<EmptyState>` component.

### 7.7 Iconography

Consolidate on `lucide-react` (already in deps). Ban ad-hoc emoji as icons in chrome surfaces.

---

## 8. Page-by-page redesign specs

Each sub-section below follows the format: **Goal → Jobs → Layout → Interaction → Content → Edge states → Analytics**.

### 8.1 Home `/`

**Goal:** 90-second activation: sign in, see the year ahead, take one action.

**Jobs.** (a) Show me my next window. (b) Help me rank something. (c) Show me what my cohort is doing. (d) Let me plan.

**Layout.**

```
┌──────────────────────────────────────────────────┐
│ top-bar: logo · search · rank-badge · notifs · avatar │
├──────────────────────────────────────────────────┤
│ Hero strip (personalized)                        │
│   "Spring Break is 42 days away. 6 picks left."  │
│   [ Plan spring break ]  [ Skip for now ]        │
├──────────────────────────────────────────────────┤
│ 3-up widgets                                     │
│ ┌─ Rank 3 quick matchups ──┐ ┌─ Cohort pulse ──┐ │
│ │ [card A] vs [card B]     │ │ 14 CBS '26      │ │
│ │                          │ │ students are    │ │
│ │    ← A    TIE    B →     │ │ going to Tokyo  │ │
│ └──────────────────────────┘ └─────────────────┘ │
│ ┌─ Your next trip ─────────────────────────────┐ │
│ │ Patagonia, Mar 14–22 · 6 of 8 RSVPs · Budget │ │
│ │ 62% ──────────────── edit · invite · PDF     │ │
│ └──────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────┤
│ "For you" trip feed (infinite)                   │
│   mixed: ranked destinations, social posts,      │
│   memory cards from alumni, saved candidates     │
└──────────────────────────────────────────────────┘
```

**Interaction.** Hero CTA is dynamic; next-most-relevant action is chosen from a rule set (active trip > upcoming window > no trips → onboarding). "Rank 3 matchups" is a persistent 30-second loop, dismissible per session.

**Content.** Copy-driven; avoid the word "Legacy" on the home screen unless the user has > 5 past trips.

**Edge states.** New user sees onboarding strip; lapsed user (> 30 days) sees "welcome back" summary.

**Analytics.** Hero impression + click-through, widget engagement, rank pairs completed, feed dwell, card-tap to detail.

### 8.2 Discover `/discover`

**Goal:** Find the right trek for me right now.

**Structure.** Four modes, available as segmented control at the top: **For you · Trending · Browse · Recommender**.

- **For you** is the default; ranked by a blend of (user DNA, cohort signal, windows, budget).
- **Trending** is the cohort + global leaderboard with "rising" indicators.
- **Browse** is the current Explore page, repaired.
- **Recommender** is the 5-step wizard, now opt-in rather than mandatory.

**Repairs to Browse:**

1. Show results **first**, filters as a right-side rail on desktop and a bottom sheet on mobile.
2. Reduce region chips from 11 flat entries to 6 grouped ones with "more" expander (Americas, Europe, Middle East & Africa, Asia, Oceania, Transcontinental).
3. Add filters that are missing and actually matter: **budget** (synced with Recommender), **window** (Spring Break, Post-Finals, Pre-Tern, etc.), **vibe** (keeps the existing themes), **group size**, **intensity** (chill ↔ adventure), **visa complexity**.
4. Every filter chip shows **result count** next to it, grayed-out when zero.
5. Add **saved searches** and **alerts** ("Ping me when Kenya drops below $2,200").
6. Every trip card shows: hero image, 3 icons (vibe), peer signal ("4 CBS '26 ranked top-3"), budget band, window fit.
7. Sort control: Relevance (default), Peer popularity, Price ↑/↓, New this week.

**Interaction.** Multi-select filters commit via explicit "Show X results" button — no destructive live-filter that makes the list jump.

**Edge states.** Zero-result state shows three nearest-match expansions ("Relax budget to $2,500 · Remove window filter · Add 1 vibe").

**Analytics.** Filter-chip click CTR, zero-result expansion acceptance, card-to-detail conversion, add-to-plan rate from Discover.

### 8.3 Plan `/plan`

**Goal:** Give users a single-canvas year view where every window is visible, draggable, and budget-aware.

**Layout.**

```
┌───────────────────────────────────────────────────────────────┐
│ Year selector · Budget strategy slider · Optimize with AI ✨   │
├───────────────┬───────────────────────────────────────────────┤
│ Candidates    │           MBA year canvas                     │
│ (draggable)   │                                               │
│               │  ┌──────── Pre-Tern ────────┐                 │
│ Patagonia ▸   │  │  May 24 – Jun 1 · 8 days │                 │
│ Tokyo     ▸   │  │  Budget $1.8k · 2 slots  │                 │
│ Kenya     ▸   │  └──────────────────────────┘                 │
│ Morocco   ▸   │  ┌──────── Summer Intern ───┐ locked          │
│ +  Add more   │  │  (internship; no trips)  │                 │
│               │  └──────────────────────────┘                 │
│               │  ┌──────── Fall Break ──────┐ …               │
│               │  └──────────────────────────┘                 │
└───────────────┴───────────────────────────────────────────────┘
```

**Core changes from today:**

1. A **persistent Candidates rail** on the left. Users drag from here. Today, nothing on the Plan page shows what to drag *from*.
2. Each window shows **length, remaining budget, and slot count** inline; "LOCKED" gets a proper tooltip ("Internship — add a weekend trip instead").
3. **AI Optimizer** ("Maximize Vibes vs. Budget") becomes a real action, not just a label: clicking it proposes an assignment, highlights conflicts, and offers accept/reject/partial.
4. **Conflict surfaces** are explicit: overlapping dates, over-budget windows, flight-gap warnings ("Patagonia ends Mar 22, but Kenya starts Mar 20").
5. **Cohort overlay** toggle: see where classmates are going in the same window.
6. Rename "Leaderboard" → "Top picks". Use "Rankings" consistently.
7. PDF download moves to a per-window or year-wide export, not as a label on a title card.

**Interaction.** Drag with inertia on desktop; tap-to-assign and bottom-sheet slot picker on mobile.

**Edge states.** Over-budget window shows a red diff and offers cheaper swap suggestions.

**Analytics.** Drags completed, AI-optimize acceptance, conflicts shown → resolved, export rate.

### 8.4 Journal `/journal` (replaces My Trips)

**Goal:** Make the past legible and shareable.

**Structure.** Three views, toggle at top: **Cards · Map · Timeline** (existing affordance, finally used correctly).

- **Cards:** grid of past trips, each with cover photo, dates, memory highlight, and "share" button.
- **Map:** a single world map showing all pins; clicking a pin opens the trip detail.
- **Timeline:** chronological with altitudes of "before MBA / Year 1 / Year 2 / post-MBA".

**Trip detail** (new canonical page) contains:

1. Hero strip with cover + dates + crew (avatars).
2. Ranked moments: top meal, top activity, must-do, don't-do.
3. Photos + notes.
4. Budget retro (planned vs actual).
5. Tips for next cohort (these roll up into `/discover`).
6. One-click share: WhatsApp / email / PDF / social-card.

**Empty state.** Illustrates a blank map with "Add your first trek in 30 seconds". Offers three starter templates.

**Analytics.** View switches, share-card generations, tips published.

### 8.5 Community (absorbed into Home + Discover)

**Goal:** Make every social interaction feed the graph.

**Rationale.** A standalone "Community" tab is a low-engagement pattern (cf. every product that tried to add a separate Feed tab and sunsetted it). Move the feed inline on Home, keep a "My School" filter and a Global filter as a top-of-feed segment.

**Upgrades:**

1. Replace the "Trip DNA" jargon with plain prompts: *"Share what made this trip great — one line, one photo, one tip."*
2. Post types become structured: **Booked · Went · Ranked · Recommending · Asking**.
3. A "Going?" one-tap reply on every Booked post opens an RSVP sheet and joins the trip group.
4. Filters: My school · My section · My cohort year · Global. Default to the tightest non-empty scope.
5. Weekly **digest** email + in-app: "Your CBS '26 classmates planned 4 trips this week."

### 8.6 Onboarding (net-new)

**Goal:** Convert a cold visitor into a personalized account in under 90 seconds.

**Steps.**

1. Email or Google sign-in (Supabase).
2. School + cohort year (single combobox, 50 school directory).
3. Year-in-program (pre-MBA / Y1 / Y2 / alumni).
4. Trip DNA: 3 swipe cards ("Beach ↔ Mountain", "Crew ↔ Solo", "Party ↔ Quiet"). Generates a seed vector.
5. First rank: 3 pairwise matchups to bootstrap Elo.
6. Invite 2 classmates (skippable) — this is the viral moment.
7. Drop into personalized Home.

**Principles.** Every step is skippable after step 2; progress bar visible; each answer immediately reflected in a "preview" card to teach the user how their data is used.

### 8.7 Profile (net-new)

**Goal:** A canonical "me" surface for sharing, tracking, and bragging-rights.

**Sections:** header (avatar, school, cohort, year), stats (trips planned, trips done, trips ranked, countries, continents, trip DNA radar chart), past trips (lightweight), achievements, shareable "MBA Wrapped" card.

**Shareable card** is a 1080×1080 image for Instagram / LinkedIn with opt-in. This is the single highest-virality surface in the whole product.

---

## 9. Net-new feature concepts

Tied to the roadmap in §14. Proposed, not committed.

1. **TrekConcierge (AI chat).** One input that accepts natural language: "Plan me a 10-day trip to Japan for spring break under $2k with my finance crew." Uses the existing templates + Elo data + user DNA. MVP: single-turn plan generation; v2: multi-turn negotiation.
2. **Group mode.** Any trip can become a group trip; RSVP, split-budget, shared itinerary. Consolidates the existing `WhatsAppInvite.tsx` component.
3. **TrekCash (budget assistant).** Runway meter per user per MBA year. Warns when two windows will overspend.
4. **Live presence.** "3 classmates are viewing Patagonia right now" — creates urgency without being creepy (aggregate only).
5. **Alumni layer.** Past graduates opt-in to donate tips for specific destinations; they show up as "🎓 from CBS '23".
6. **Templates marketplace.** First-class UI for the existing `/data` templates; students can fork, edit, publish.
7. **Calendar sync.** Two-way iCal / Google Calendar sync.
8. **Flight-graph intelligence.** Plug into Kiwi / Skyscanner via API to show realistic fare floors per window.

---

## 10. Mobile-first and responsive strategy

Today the product is responsive but desktop-biased (double navigation, large hero titles, right-side filter rails). Rewriting layouts at 390px first:

- **Top bar collapses** to: logo, search icon, notifications, avatar. Actions move into a bottom floating action button that contextualizes per tab.
- **Bottom nav** stays on mobile only (3 tabs: Discover, Plan, Journal). On desktop, the top bar owns nav.
- **Plan page** on mobile becomes a horizontal snap-scroll of window cards, with a pull-up Candidates sheet.
- **Discover** cards are 1.25× aspect ratio on mobile and 1× on desktop; cards open as a full-screen sheet on mobile and a right-side drawer on desktop.
- **Ranking arena** is optimized for portrait thumb-reach; left/right swipe + up-swipe for "tie / show me something else".

Break-points: 390 (mobile), 768 (tablet), 1024 (laptop), 1440 (desktop wide). No horizontal scroll ever on mobile except intentional carousels.

---

## 11. Accessibility & inclusivity

Ship an a11y audit with every release. Minimum bar:

- WCAG 2.2 AA.
- Every interactive element has a focus ring with 3:1 contrast.
- All icons in chrome have an accessible name.
- Keyboard shortcuts: `/` search, `g d` discover, `g p` plan, `g j` journal, `?` help.
- Screen-reader labels on drag-and-drop with announced state changes (we're using `@hello-pangea/dnd` which has first-class a11y — use it).
- Respect `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`.
- Support system-level text scaling up to 200% without layout breakage.
- All maps have a keyboard-accessible list fallback.
- Form fields use labels + descriptions, not placeholder-as-label.
- Ship content in English only at launch, but use ICU message format from day one so localization is cheap later.

---

## 12. Performance budget

| Metric | Target | Today (assumed) |
|---|---|---|
| LCP (p75, 4G) | < 2.0s | ~3.5s |
| INP (p75) | < 200ms | unknown |
| CLS | < 0.05 | unknown |
| JS bundle (first load, per route) | < 180 KB gz | unknown |
| Image payload per route | < 500 KB | unknown |
| Cold build time | < 60s | unknown |

Interventions: route-level code splitting for `jspdf`, `html2canvas`, `react-simple-maps` (load on demand), switch the map to an SVG sprite of regions instead of full topojson where possible, `next/image` with AVIF everywhere, server components for above-the-fold.

---

## 13. Analytics, experimentation, and measurement

### 13.1 Event taxonomy

Every instrumented event has: `event`, `actor_id`, `timestamp`, `route`, `surface`, `props`. Central registry in `/lib/analytics/events.ts`.

Minimum MVP event set:

```
onboarding_started, onboarding_step_completed, onboarding_finished, onboarding_skipped
discover_filter_applied, discover_card_impression, discover_card_clicked
rank_pair_shown, rank_vote_cast, rank_session_finished
plan_trip_added, plan_trip_moved, plan_conflict_shown, plan_ai_optimize_clicked
trip_created, trip_invited, trip_rsvp, trip_published
memory_created, memory_shared, recap_downloaded
feed_post_created, feed_post_reacted, feed_post_commented
signup_prompt_shown, signup_prompt_converted
```

Persisted in Supabase → shipped daily to a warehouse (Postgres `analytics` schema is fine to start; BigQuery when ≥ 10k MAU).

### 13.2 Experimentation

Stand up a feature-flag + A/B framework (GrowthBook self-hosted is the cheapest path on the current stack). Every roadmap item in §14 ships behind a flag. Default exposure: 10% → 50% → 100% based on guardrails.

### 13.3 Success criteria per roadmap phase

| Phase | Primary metric | Target delta |
|---|---|---|
| P1 Foundations | W1 activation | +25% |
| P2 Discover rebuild | Add-to-plan rate | +40% |
| P3 Plan rebuild | Trips planned per user | +25% |
| P4 Community graph | Invites sent per trip | 3× |
| P5 AI concierge | Time-to-first-plan | -50% |

---

## 14. Implementation roadmap

12 calendar weeks, two-week sprints. Each phase has a clear scope, a demo-able deliverable, and an A/B flag.

### Phase 1 — Foundations (Weeks 1–2)

- Finalize design tokens (`/lib/tokens.ts`) + Tailwind / CSS-var wiring.
- Build the core component library (Button, Input, Card, TripCard, EmptyState, Chip, Sheet, Dialog, Toast).
- Add analytics wrapper + feature-flag SDK.
- Stand up Storybook or an internal `/_dev` route to showcase components.
- Fix top vs bottom nav duplication — single top nav on desktop, single bottom nav on mobile.
- Ship onboarding (§8.6).

**Exit criteria:** New onboarding in prod behind 10% flag. Activation dashboard live.

### Phase 2 — Discover rebuild (Weeks 3–5)

- Merge `/recommend` into `/discover` as a mode.
- Results-first layout, filter rail, count chips, zero-state recovery.
- Save-search + alert infra.
- Trip card v2 with peer signal + window fit.
- Personalized "For you" ranking (blend: DNA + cohort + windows + budget).

**Exit criteria:** Discover add-to-plan rate +40%. Recommender usage unchanged or higher.

### Phase 3 — Plan rebuild (Weeks 6–8)

- Candidates rail.
- Year canvas with window metadata (dates, budget, capacity).
- Conflict detection and AI Optimizer v1.
- Cohort overlay.
- Consolidated PDF export at window + year level.
- Calendar sync (iCal out, Google import).

**Exit criteria:** Trips-planned-per-user +25%. AI Optimize used by ≥ 30% of planners.

### Phase 4 — Journal + Community graph (Weeks 9–10)

- `/journal` with Cards / Map / Timeline.
- Trip detail page with ranked moments, photos, budget retro.
- "MBA Wrapped" shareable card.
- Absorb `/socials` into `/` (home feed) + `/discover` (trending + cohort).
- RSVP flow for Booked posts.

**Exit criteria:** Invites sent per trip 3×. Wrapped-card shares at ≥ 20% of eligible users.

### Phase 5 — TrekConcierge + polish (Weeks 11–12)

- AI chat panel ("Plan me a trip…") using existing templates + user DNA.
- Live presence (aggregate).
- Accessibility fixes, contrast pass, light theme.
- Performance pass to hit §12 budgets.

**Exit criteria:** Time-to-first-plan −50%. Lighthouse > 95 across the board. WCAG 2.2 AA audit passes.

### Parking lot (post-12-week)

Group mode (beyond RSVP), TrekCash budget assistant, Alumni layer, Templates marketplace, Flight-graph intelligence, mobile app (React Native or PWA first).

---

## 15. Team & resourcing

Assuming a realistic early-stage team; adjust up or down.

- **1 PM** (this role) — spec, prioritize, measure.
- **1 Design lead** — owns tokens + flows + prototypes. 1 part-time visual designer for marketing-grade cards / illustrations.
- **2 full-stack engineers** — one front-end-leaning (Next, TS, RSC, animation), one back-end-leaning (Supabase, Prisma, Elo, API).
- **0.5 data/ML engineer** — joins at Phase 5 for Concierge.
- **0.25 QA / a11y consultant** — ships at the end of each phase.

Rituals: Monday planning, Wed midweek check, Friday design review, biweekly demo to an MBA cohort focus group (8 students across 2 schools). The cohort feedback loop is non-negotiable.

---

## 16. Risks & mitigations

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| We rebuild IA and churn existing users | High | Medium | Flag-gated rollout, in-app "what's new" tour, preserve old URLs via redirects |
| Onboarding friction drops signup conversion | High | Medium | Gate personalization after Step 2; everything beyond that is skippable |
| AI Concierge hallucinates destinations / prices | High | Medium | Constrain to template + structured data; never invent a flight price |
| School-gated network effects fail at small schools | Medium | Medium | Blend in alumni + global signal under a threshold |
| Performance regresses with new components | Medium | Low | Performance budget in CI (fail PR if bundle grows > 5%) |
| Visual redesign feels colder than today | Medium | Low | Keep glass-morphism sparingly; invest in motion + illustration budget |
| Data privacy concerns re: peer signals | High | Low | All peer signals aggregate-only, min-n = 3, opt-out in profile |

---

## 17. Appendix

### 17.1 Copy rewrites (selected)

| Screen | Today | Tomorrow |
|---|---|---|
| Home hero (signed out) | "Your Global Legacy" | "Plan the MBA trips that'll define your class." |
| Home hero (signed in) | "Your Global Legacy" | "Spring Break is 42 days away." |
| My Trips CTA | "Capture your trip memories" | "Add a trip" |
| Explore headline | "Explore Treks" | "Find your next trip" |
| Explore sub | "Curated by MBA students, for MBA students." | "MBA-curated. Ranked by your cohort." |
| Recommend title | "Find Your Perfect Trek" | "Get a recommendation in 30 seconds" |
| Plan headline | "Plan Your Year" | "Your MBA year at a glance" |
| Community headline | "Global Social Feed" | "What your classmates are doing" |
| Community prompt | "Share your Trip DNA with your school community…" | "Just back from a trip? Drop a photo and a tip." |

### 17.2 Nav schema (final)

```
Top bar (desktop):
   [ TrekRank ]    Discover · Plan · Journal          search · 🔔 · Rank-3 · avatar

Bottom bar (mobile):
   Discover · Plan · Journal · Profile
```

### 17.3 Component inventory rationalization

Current `/components` (17 components) collapse into a cleaner library:

| Today | Future home |
|---|---|
| `ClientHeader.tsx` | `components/chrome/TopBar.tsx` |
| `BookingTrigger.tsx` + `ReviewTrigger.tsx` + `WhatsAppInvite.tsx` | `components/trip/ActionSheet.tsx` |
| `ItineraryEditor.tsx` | `components/plan/ItineraryEditor.tsx` (unchanged) |
| `MbaCalendar.tsx` | `components/plan/YearCanvas.tsx` |
| `MemoryCard.tsx` + `MemoryQuestionnaire.tsx` | `components/journal/MemoryEditor.tsx` |
| `RankingCard.tsx` | `components/rank/Arena.tsx` |
| `SocialFeed.tsx` | `components/feed/Feed.tsx` |
| `StatusBadge.tsx` + `StatusSelector.tsx` | `components/ui/Status.tsx` |
| `TemplateInterestWidget.tsx` | `components/discover/TemplateCard.tsx` |
| `TripDetailModal.tsx` | `components/trip/DetailPage.tsx` (promoted to a full route) |
| `TripDownloadButton.tsx` | `components/trip/ShareSheet.tsx` |
| `UseTemplateButton.tsx` | absorbed into `TemplateCard` |
| `WorldMap.tsx` | `components/journal/JournalMap.tsx` |

### 17.4 Database / schema touchpoints

Minimal schema additions expected in Prisma (non-breaking):

- `User.tripDna` (JSON: swipe vector + themes).
- `User.cohortYear`, `User.section`.
- `TripCandidate` (draft trips, decoupled from `Trip`).
- `TripSlotAssignment` (trip ↔ MBA window).
- `Reaction`, `Comment` on feed posts.
- `SavedSearch`, `Alert` on Discover.
- `SharedCard` (audit of generated MBA Wrapped cards).

### 17.5 Decisions needed before Phase 1 kick-off

1. Keep Elo as the single ranking model, or add a collaborative-filter layer for cold-start?
2. Ship light theme in P1 or defer to P5?
3. Do we build a native mobile app in 2026, or commit to PWA through the year?
4. What's the school directory source of truth (manual top-50 list vs. pulled from a public dataset)?
5. Pricing model — free forever, school-licensed, or freemium with premium templates?

These five decisions gate the roadmap; everything else can be sequenced.

---

*End of document.*
