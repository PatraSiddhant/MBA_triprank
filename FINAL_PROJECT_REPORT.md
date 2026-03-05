# Final Project: TripRank — Solving the MBA Choice Paradox

## 1. Motivation: The Choice Overload and the FOMO Framework
The MBA experience is often characterized by a high-frequency sequence of high-stakes decisions: which internship to take, which electives to choose, and—perhaps most socially fraught—which treks to attend. In my own experience and that of my peers at Columbia Business School, the process of planning an academic year's travel (the 2026-2027 cycle) is often defined not by individual passion, but by a "FOMO" (Fear Of Missing Out) framework. Information is scattered across WhatsApp groups, Reddit threads, and old school blogs. When students see a group of 50 people signing up for the "Colombia Trek," they often follow suit without considering if their own "Trip DNA" might actually lean towards a "Tech & Tradition" exploration of Japan or a "Sustainability" focus in Iceland.

The "Aha!" moment for **TripRank** came during a guest lecture by the founder of **Beli**, an AI-driven restaurant ranking platform. He spoke about the psychological ease of pairwise selection—choosing between two distinct options—as a more accurate way to elicit true preferences than traditional star ratings. I realized that if we could apply this "Beli-style" logic to MBA treks, we could help students navigate the "Choice Paradox." Following that lecture, I set out to build a prototype that uses AI-generated data and an Elo-based ranking algorithm to help students discover their personal travel priorities and translate those priorities into a functional 2027 academic calendar.

## 2. Strategic Framework: Network Effects and Single-Player Utility
A central theme of our Technology Strategy course is the concept of **Network Effects** and the "Chicken-and-Egg" problem. For a travel platform to be valuable, it typically needs a large user base to provide reviews and trending data. However, a new platform has no users, thus no data, thus no value.

To solve this for TripRank, I implemented a **"Single-Player Utility"** strategy. The app is functionally useful to a student who is the *only* person on the platform. By performing pairwise comparisons (e.g., "Would you rather visit the street art of Comuna 13 in Medellin or the neon streets of Shibuya in Tokyo?"), the student builds a private, personalized leaderboard based on their own value system. 

To "seed" the platform—another core strategic concept—I used AI to generate 17 high-quality trek templates. These aren't just placeholders; they are detailed 5-day itineraries covering budget, vibes (e.g., "high-energy," "immersive," "luxury"), and safety ratings. This ensures that the "Supply Side" of the platform is rich and compelling from Day 1. As more students use the tool, these individual preferences aggregate into a **Global Leaderboard**, moving the platform from Single-Player utility to Multi-Player network value, where students can see which treks are "trending" across the school without the noise of a chaotic group chat.

## 3. Implementation and the AI Partnership
Developing a premium, interactive prototype without a large engineering team required a deep partnership with AI. I utilized **Antigravity** (a Gemini-powered assistant) as my "Product Design Partner."

### The Aesthetic Logic
I wanted the UI to feel "photo-forward" and premium, rivaling apps like Beli or Airbnb. I used iterative prompting to develop a **Glassmorphism** design system. The core prompt was: *"Design a modern travel UI using vanilla CSS that leverages glassmorphism (blurred backgrounds), high-end typography (Inter/Outfit), and a dark-mode-first aesthetic. Ensure the experience feels immersive and premium, using vibrant accent colors like #0070f3."* The result is a platform that uses blurred navbars, floating cards, and smooth hover transitions to create a "luxury" feel.

### The Elo Rating System
To power the ranking, I implemented the **Elo Rating System**, famously used in chess. In `lib/ranking-actions.ts`, I worked with the AI to write a server-side algorithm that updates scores based on "win/loss" outcomes:
- **Expected Outcome**: The math calculates the probability of one trip "winning" over another based on current ratings.
- **K-Factor**: We selected a K-factor of 32 to ensure that early rankings have a significant impact, allowing the user's leaderboard to take shape quickly (within 5-10 comparisons).
- **Persistence**: Using **Prisma and SQLite**, every comparison is stored, ensuring the student's ranking persists across sessions.

### The Draggable MBA Journey
Transitioning from "Choice" to "Action" is where the **MbaCalendar** component comes in. This was the most technically challenging part of the build. I used the `@hello-pangea/dnd` library to create a draggable interface where students can move their #1, #2, and #3 ranked trips into specific "Slots" in the 2026-2027 academic year (e.g., Fall Break, Winter Break, Spring Break). The AI assisted in writing the complex state management logic to ensure that if a student moves a trip back to the "Leaderboard pool," it maintains its rank and data.

## 4. Problems, Challenges, and Iterations
The development process was not without its "Product Management" hurdles:
- **The Cold Start Visuals**: A travel app with no photos is useless. I used the `generate_image` tool to create 17 unique hero images in a consistent "Nano Banana" style. This ensured visual harmony. However, the first batch of images was too generic; I had to refine the prompts to focus on "iconic markers" (like the Taj Mahal or the Shibuya Crossing) to make the trips feel authentic.
- **State Synchronization**: Initially, the UI would "flicker" when a user made a selection. I had to implement React's `useTransition` and Next.js server actions to ensure the "Elo" update happened in the background while the UI instantly moved to the next pair, maintaining the "Beli" speed.
- **PDF Generation**: I realized that a prototype's value is limited if you can't "take it with you." I implemented `jspdf` to allow users to download their final scheduled itinerary. Debugging the table layouts for 17 different possible trip combinations required several rounds of AI-assisted refactoring to ensure the PDF was professional and readable.

To move from conceptual ranking to a functional travel ecosystem, I implemented several advanced strategic layers:
- **Network Consensus (FOMO Engine)**: The dedicated **Socials** tab leverages peer influence by showing real-time rankings and reviews from other students. We added "Synergy Scores" to each post, using AI to calculate how well a friend's top-ranked trip aligns with your own "Trip DNA."
- **AI Budget & "Vibe" Optimizer**: In the **MbaCalendar**, I added a "Strategy Slider." This allows students to optimize their 2027 calendar for "Efficiency" (lowest cost per trek) or "YOLO Vibes" (maximizing high-Elo, high-cost trips), simulating a personalized AI travel advisor.
- **Group Synergy & Fulfillment**: Each trek detail page now includes a "Who's Going?" layer to solve the coordination problem. By integrating a "Fulfillment Layer" (e.g., "Book with MBA Discount"), the app moves from a discovery tool to a transactional platform, exploring the final stage of the user journey.
- **The Supply-Side Review Loop**: To ensure the platform's longevity (a key requirement for maintaining network effects), I added a review loop where students can upload their "Photo DNA" and experiences, constantly refreshing the platform's value for the next academic year.

## 5. Value, Synthesis, and Future Ambitions
**TripRank** is no longer just a prototype; it is a synthesis of Technology Strategy and AI-Native development. It demonstrates conceptual clarity by transforming the **Choice Paradox** into a gamified, peer-validated exploration of individual preferences.

For me, this project has developed the "Capacity and Confidence" to use AI as a high-level product architect. Instead of seeing AI as a tool to write simple code, I used it to:
1.  **Seed a Marketplace**: Generating 1,600+ lines of rich itinerary data to solve the "empty world" problem.
2.  **Architect Social Proof**: Designing consensus-driven UI elements that map directly to the strategic concept of Social Signaling.
3.  **Bridge Discovery and Action**: Creating the "Fulfillment Loop" that demonstrates a clear understanding of the full consumer lifecycle.

In my future career, I hope to use this "AI Partnership" to rapidly prototype platforms that solve information asymmetry and preference discovery across complex industries. TripRank proves that with a good command of language and a willingness to experiment, the barrier between a "Strategic Idea" and a "Finished Product" has effectively vanished.

---

**Prototype Link**: [Deploy Link Here]
**Feedback Survey**: [Link to Submissions]
**Project Artifacts**: View the [Itinerary Data](file:///c:/Users/Siddhant%20Patra/OneDrive%20-%20Columbia%20Business%20School/Documents/Antigravity_tool/triprank/data/trip-templates.ts) and the [Ranking Logic](file:///c:/Users/Siddhant%20Patra/OneDrive%20-%20Columbia%20Business%20School/Documents/Antigravity_tool/triprank/lib/ranking-actions.ts).
