# TrekRank (MBA TripRank) ✈️🌍

**TrekRank** is a premium social platform and itinerary building application engineered specifically for MBA students. It reinvents how cohorts discover, rank, plan, and immortalize their travel expeditions (treks) by combining dynamic Elo-style destination voting with robust trip planning tools.

---

## ✨ Key Features

🏆 **Destination Ranking System:**
Vote on curated MBA trips using pairwise comparisons. Our Elo ranking engine automatically bubbles up the absolute best treks across categories like *Party*, *Culture*, and *Adventure*.

🗺️ **Comprehensive Itinerary Builder:**
Create day-by-day expedition plans. Add activities, edit time buckets (Morning, Afternoon, Night), and track your budget. Built with dynamic drag-and-drop mechanics. 

📸 **"MBA Wrapped" & Legacy Memories:**
Log past trips and create an interactive "Trip Memory". Note hidden gems, provide actionable tips for future cohorts, and lock in your "best meal" to help future MBAs replicate your success.

👥 **Intelligent Social Feed:**
Stay up to date with your cohort. See when peers book new adventures, clone their itineraries in a single click, or read their post-trip updates.

📊 **Rich Cultural & Logistical Intelligence:**
Every trip template comes loaded with MBA-specific intel—from business etiquette and communication styles to safety ratings, visa notes, and top group-bonding activities.

📥 **Export to PDF:**
Download your pristine, formatted itinerary highlight sheet to a beautifully organized PDF, ideal for sharing via WhatsApp or Slack bounds.

---

## 🛠️ Tech Stack 

TrekRank is built with a modern, high-performance web stack natively targeting fluid, glass-morphism aesthetics:

- **Framework:** Next.js 16.1 (App Router, Turbopack)
- **Database & Auth:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **UI & Icons:** Vanilla CSS with custom design tokens, `lucide-react`
- **Map Visualizations:** `react-simple-maps`
- **PDF Generation:** `jspdf` & `html2canvas`
- **Deployment:** Netlify 

---

## 🚀 Getting Started Locally

### 1. Clone & Install
```bash
git clone https://github.com/your-username/trekrank.git
cd trekrank
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials:
```env
DATABASE_URL="postgres://..."
DIRECT_URL="postgres://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

### 3. Sync the Database
Push the Prisma schema to your Supabase instance:
```bash
npx prisma db push
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app!

---

## 📂 Project Structure

- `/app`: Next.js App Router (Pages, Layouts, API routes)
- `/components`: Reusable UI components (ItineraryEditor, MemoryCard, SocialFeed, etc.)
- `/data`: Static trip templates and robust JSON definitions for baseline MBA treks.
- `/lib`: Server actions, Prisma client initialization, and Supabase SSR utilities.
- `/prisma`: Database schema definitions (`schema.prisma`).

---

## 🎨 Design Philosophy

TrekRank favors **rich aesthetics** over generic frameworks. Expect vibrant dynamic gradients, frosted "glassmorphic" paneling, responsive auto-playing mechanics, and modern typography tailored via the *Outfit* and *Inter* fonts. Every interaction is mapped out to feel premium and fast.
