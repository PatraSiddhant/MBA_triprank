# Final Project Write-Up: TripRank — An Operating System for MBA Travel

**Course:** Technology Strategy, Spring 2026 · Prof. Dan Wang
**Student:** Siddhant Patra (sp4352) · Columbia Business School
**Prototype:** [link to deployed app] · **Feedback Survey:** [unique survey URL]

---

## 1. Motivation

Every MBA program is, in practice, two years of travel. Between Pre-Term, Fall Break, Winter Break, Spring Break, internship weekends, and Post-Finals, a typical CBS student visits 8–20 countries. Yet the *decision-making* process behind those trips is astonishingly broken. Information is scattered across fourteen WhatsApp groups, three Reddit threads, a Notion someone made in 2022, and a Google Sheet that nobody updates after week two. When fifty classmates start signing up for the "Colombia Trek," the rest of the cohort follows — not because Colombia is the right trip for them, but because the *Cost of Coordination* of doing anything else is prohibitively high.

The motivating insight came during Beli founder Eytan Seidman's guest lecture. He framed pairwise comparison ("would you rather A or B?") as a way to surface true preferences that star ratings systematically destroy. I sat there realizing the MBA-trek problem is structurally identical: high-stakes social choice, drowning in unstructured signal, a vocal minority dictating the consensus. If Beli could turn a city's restaurants into a ranked, comparable graph, the same primitive could turn a cohort's travel options into a ranked, plannable one.

**TripRank** is the result. It is a personalization-first travel operating system for MBA students that helps a user (a) discover what *they* actually want, (b) plan it across the specific time-windows of an MBA calendar, and (c) remember and share it after the fact. The thesis is that the artifact of two years of travel should not be a cluttered Google Photos folder — it should be a ranked, planned, shareable global legacy.

## 2. Connection to Class Concepts

TripRank is, deliberately, a synthesis of four threads from the course.

**Demand-side disruption and the Innovator's Dilemma.** Incumbents like Excel-based planners and TripAdvisor compete on *granular control* — more filters, more reviews, more knobs. TripRank does the opposite: it redefines the dimension of performance from "control" to **speed of consensus**. This is the same playbook as Netflix vs. Blockbuster. Blockbuster optimized for "availability of new releases"; Netflix changed the question to "ease of selecting from the long tail." TripRank changes it from "richest information set" to "fastest path from chaos to a ranked plan." That is a low-end / fringe entry point — it is initially worse for the power-user planner who already has a perfect spreadsheet, and decisively better for the 80% who don't.

**Market frictions and the Cost of Coordination (Session 5).** The product is built to attack three specific frictions head-on. *Search costs* are cut by reducing a 30-trip choice set into binary swipes via the SwipeArena. *Preference elicitation* is solved by an Elo rating system that converts unstructured "likes" into a numerical ranking — the user does not have to know what they want; the system infers it from revealed preference. *Information asymmetry* is mitigated by aggregating pairwise votes into a school-scoped "Cohort Pulse" that surfaces collective signal, not the loudest voice in the WhatsApp.

**Cold start, single-player utility, and seeding (Sessions 7–12).** A travel-ranking platform with zero users has zero data and therefore zero value. To bridge the chicken-and-egg gap, I followed the *single-player utility* doctrine: the app must be useful to the *only* student on it. I did this with three concrete moves. (1) I seeded the platform with 30 fully-fleshed trip templates — each carrying a 5-day itinerary, hero imagery, budget bands, vibes, safety notes, and visa intel — so the supply side is rich on day one. (2) Pairwise voting produces a *personal* leaderboard from the very first session, regardless of network size. (3) Trip DNA onboarding (three swipe pairs: Beach↔Mountain, Crew↔Solo, Party↔Quiet) personalizes the feed from minute one. The handoff to multi-player utility happens naturally once a school crosses ~10 accounts: the personal Elo leaderboard begins to overlay a cohort one, and the school-scoped Socials feed surfaces what classmates are booking, ranking, and reviewing. This mirrors the **Beli case** (Session 11): standardize a unit of unstructured social data — a restaurant rating, or an MBA trek — and the standardization itself becomes the moat.

**Make–Partner–Buy and Capacity & Competence (Session 19).** The contrast with the **Rivian case** is sharp. Rivian's vertical integration created the *interdependence-of-parts* trap that surfaced in the now-infamous $775 battery replacement. TripRank deliberately does the opposite: every non-core capability is *partnered*, not built. Auth and storage are Supabase. Maps are MapLibre/Leaflet on free OSM tiles. The 3D globe is the open-source `cobe` library. Drag-and-drop is `@hello-pangea/dnd`. PDF export is `jspdf`. The proprietary surface is intentionally narrow — the Elo engine, the Trip DNA model, the year-canvas planner, the cohort-aggregation logic. Everything else is partnered, which is what lets a single MBA student ship a product this large.

## 3. How I Put It Together

TripRank is a Next.js 16 / React 19 / Prisma / Supabase application. The shipped surfaces are **Discover** (browse the seeded template library with theme/region/budget filters), **Rank** (the SwipeArena pairwise voting flow with an Elo leaderboard), **Plan** (the draggable MBA-year calendar with PDF export), **Journal** (the user's saved trips, the world-map view, and the Memory questionnaire for past trips), **Socials** (a school-scoped feed of peer activity), plus **Onboarding**, **Profile**, **Templates**, and **About**. The information architecture went through one deliberate rewrite mid-build: an early version had five peer tabs that each fought for the same cognitive real estate, and I collapsed them into three jobs — **Discover, Plan, Journal** — after a heuristic audit (documented in `TREKRANK_UX_UI_IMPLEMENTATION_PLAN.md`) revealed that a user's intent is always one of three things: *find something*, *organize something I already found*, *remember something I did*. That single IA decision did more for usability than any individual feature.

### The AI partnership

I treated AI as a *Product Design Partner*, not a code-completion tool. Three models did distinct jobs:

- **Antigravity (Gemini-powered)** was my primary architect. I used it to brainstorm IA, draft the design system, generate the 30-template seed dataset (~1,600 lines of TypeScript, including budgets, themes, school relevance, and day-by-day itineraries), and write the Elo math. The most useful prompt pattern was *role-then-constraint-then-artifact*: "You are a senior product designer. The constraint is that every screen ships with one Display headline, content-first, filters as modifiers. Produce the redline for the Discover page."
- **Claude Code** owned implementation. I used it for the Next.js server actions, the Prisma schema, the SwipeArena state machine, and the year-canvas drag-and-drop. The pattern that worked best was *spec-then-diff*: I'd hand it the rubric of design tokens and ask for the smallest possible diff to comply, which kept the visual language coherent across 17 components.
- **Nano Banana / image-gen models** produced the 30 hero images. The first batch was generic ("a beach"). I refined toward *iconic markers* ("Comuna 13 graffiti at golden hour with a tram in the background, photorealistic, low saturation") and got a visually coherent set on the third pass.

Notable prompting techniques I leaned on: **iterative refinement** with explicit "what's wrong" critiques between passes; **constraint stacking** (typography rule + spacing grid + accessibility floor in one prompt); and **persona-conditioned prompts** ("write this empty state for The Aspirational Planner — second-year, money to spend, allergic to filter walls"). I also wrote two long-form planning documents *with* AI as the drafting partner — the TrekRank UX/UI Implementation Plan and the MBA Wrapped Standalone App Plan — and used those as the canonical specs that every subsequent code session cited back to.

### The two-product family

A late-stage decision was to scope a *sister product*, **MBA Wrapped**, as a separate but linked surface. TripRank handles the *prospective* (rank → plan); MBA Wrapped handles the *retrospective* — a 15-second cinematic time-lapse of a student's two-year journey, plane arcs across a stylized world map, ending in a shareable MP4. This is the viral artifact: the "Spotify Wrapped of an MBA." Inside TripRank, every Journal entry already feeds the Wrapped reel via shared `country_iso3` and `start_date` fields, so the moment the second product ships, the data graph is already populated. This is the *standardization-as-moat* lesson from Beli: own the data structure, and the next product is cheap.

## 4. Problems and Challenges

The hardest problems were not technical.

**The IA was wrong, and I had to admit it.** My first build had five peer tabs (Explore, Recommend, Plan, My Trips, Community) where every page tried to be a hero landing page. After watching three classmates use it, every one of them bounced when the Explore page presented filters before any content. I rebuilt around three jobs (Discover, Plan, Journal), adopted a "results first, filters second" rule, and dropped the Recommender wizard from the critical path entirely — it remains in the codebase as a scaffold but is intentionally not promoted in the nav, because a half-working personalization wizard is worse than none. The class-level lesson: **filters before content is an anti-pattern**, and I had committed it twice.

**The cold-start visual problem.** Without imagery, a travel app reads as spam. Generating 30 visually-coherent hero photos was a multi-day effort in itself; the prompts had to specify subject, lighting, era, and saturation to get a set that felt like the same product, not a stock-photo collage.

**State synchronization in the SwipeArena.** Naïve implementations made the UI flicker on every Elo update. I rewired it with React's `useTransition` plus Next.js server actions so the rank update happens in the background while the UI advances to the next pair instantly — the "Beli speed" feel.

**Plan-page drag-and-drop with no source.** My first Plan page had "Drop trip here" placeholders but no visible candidates rail. Every single test user asked the same question: *drag from where?* The fix was a persistent left-side Candidates rail with the user's ranked-but-unscheduled trips, and explicit conflict detection ("Patagonia ends Mar 22, Kenya starts Mar 20").

**Honest scope cuts.** Two surfaces I prototyped — a natural-language "TrekConcierge" chat and an end-to-end Recommender wizard — are not part of the live experience. Both could have shipped as half-working features, but a recommender that returns generic results or a chatbot that hallucinates a $400 flight that doesn't exist would have done more brand damage than the absent feature. The discipline of *not* shipping turned out to be one of the most useful lessons of the project: in an AI-assisted workflow where building is cheap, deciding what to *cut* is where the strategy actually lives.

## 5. Why This Is Valuable

For me, TripRank was the proof that the gap between a *strategic idea* and a *finished product* has effectively collapsed. I am not an engineer by training, and yet the combination of clear product specs, a partnered AI architect, and modular open-source primitives let me ship 9 routes, 17 components, an Elo engine, a draggable year-planner, a PDF exporter, a 3D globe, a memory journal, and a fully scoped sister product in a few weeks. The capability I built — using AI as a high-leverage product partner rather than a code-completer — is the single most transferable skill I am taking out of this course.

For the user, TripRank fills a hole that no incumbent fills. WhatsApp coordinates, but doesn't decide. TripAdvisor reviews, but doesn't personalize. Spotify and Strava have proven that an annual *Wrapped* artifact is a magnet for organic sharing in dense, identity-rich communities — and an MBA cohort is exactly that community. By owning the data structure of an MBA trek (window, budget, vibe, cohort overlap, ranked moments) before anyone else does, TripRank establishes the same kind of switching cost Beli established for restaurants: once your two-year travel record lives here, the cost of going back to the Google Sheet is no longer measured in convenience — it is measured in *legacy*.

The deeper bet is on **demand-side disruption**: that a tool which is initially "worse" for the obsessive spreadsheet planner is decisively better for the 80% of students who never had a tool at all, and that this fringe entry point — done well, seeded right, standardized early — is exactly the kind of low-end disruption the course taught us to recognize.

---

*Word count: ~1,790 words.*
