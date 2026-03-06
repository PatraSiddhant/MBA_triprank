# MBA Trek Destinations: Research Prompt

## Task Overview
Research **30 MBA trek destinations** by identifying real, existing tour packages and consolidating them into a structured JSON dataset. Focus on actual tour operators, hotels, and publicly available itineraries—not speculative content.

---

## For Each Destination, Gather:

### 1. **Tour Packages (3–5 per destination)**
Find actual 5–7 day group tours from major operators:
- **G Adventures** (gadventures.com)
- **Intrepid Travel** (intrepidtravel.com)
- **Abercrombie & Kent** (abercrombiekent.com)
- **Trafalgar** (trafalgartours.com)
- **Local DMCs** (destination management companies)
- **Boutique tour operators** by region

For each package, document:
- Operator name
- Exact package name/title
- Duration (days)
- Group size capacity
- Cost per person (USD)
- Full daily itinerary (actual activities listed)
- Included accommodations (hotel names)
- Departure dates/seasons
- Link/source

### 2. **Hotels & Accommodations (2–3 per destination)**
Identify 4–5 star hotels suitable for business groups:
- Hotel name
- City/location
- Star rating
- Nightly rate (USD)
- Why it works for MBA groups (location, amenities, group services)
- Contact/booking info
- Source (Booking.com, hotel website, etc.)

### 3. **Key Activities by Category**
List actual activities available in the destination:
- **Cultural/Historical**: museums, landmarks, heritage sites
- **Business/Innovation Hubs**: startup ecosystems, business districts, tech parks (if relevant)
- **Outdoor/Adventure**: hiking, water sports, nature experiences
- **Dining & Nightlife**: Michelin restaurants, wine bars, nightclubs, food markets
- **Group Bonding**: team activities, classes (cooking, dance, language), sports

### 4. **Logistics & Essentials**
- Best season(s) to visit
- Visa requirements (yes/no, how long)
- Estimated daily budget range (USD, per person)
- Primary airport(s)
- Ground transport: taxis, Uber, rental cars, public transit
- Language(s) spoken
- Currency & exchange rate context
- Health/safety notes (if relevant)

### 5. **Cultural Intelligence Notes**
Brief (2–3 sentences):
- Communication style (high-context vs. low-context)
- Business etiquette expectations
- Social customs to respect
- Dining/entertainment norms

### 6. **Group Bonding Activities**
3–5 unique activities that work well for MBA cohorts:
- Activity name
- Duration
- Estimated cost
- Why it's good for group bonding

---

## JSON Output Schema

```json
{
  "destination": "Colombia",
  "region": "South America",
  "best_season": "December-March, July-August",
  "visa_required": false,
  "visa_notes": "US citizens get 90 days on arrival",
  "estimated_daily_budget_usd": "120-200",
  "primary_airport": "El Dorado International (BOG)",
  "language": "Spanish",
  "currency": "Colombian Peso (COP)",
  "health_notes": "Yellow fever vaccine recommended for some regions",
  "hotels": [
    {
      "name": "Casa Medina Boutique Hotel",
      "city": "Bogotá",
      "stars": 5,
      "nightly_rate_usd": 280,
      "group_friendly": true,
      "why_good_for_groups": "Central location, excellent concierge, group dining options"
    },
    {
      "name": "Then Hotel Cartagena",
      "city": "Cartagena",
      "stars": 4,
      "nightly_rate_usd": 220,
      "group_friendly": true,
      "why_good_for_groups": "Colonial charm, rooftop bar, walking distance to old city"
    }
  ],
  "tour_packages": [
    {
      "operator": "G Adventures",
      "name": "Colombia Highlights",
      "url": "https://example.com/...",
      "duration_days": 7,
      "group_size_capacity": "8-12",
      "cost_per_person_usd": 1850,
      "accommodation_included": "Casa Medina Boutique (3 nights), Local eco-lodge (2 nights)",
      "best_for": "MBA Iconic (cultural immersion)",
      "itinerary": [
        {
          "day": 1,
          "title": "Arrive Bogotá",
          "activities": [
            "Hotel check-in at Casa Medina",
            "Welcome dinner at local restaurant",
            "Evening walk through La Candelaria"
          ]
        },
        {
          "day": 2,
          "title": "Bogotá City Tour",
          "activities": [
            "Gold Museum visit (3 hours)",
            "Street art walking tour in Usaquén neighborhood",
            "Lunch at local market (Paloquemao)",
            "Group dinner at rooftop restaurant"
          ]
        },
        {
          "day": 3,
          "title": "Coffee Region - Salento",
          "activities": [
            "Domestic flight to Armenia",
            "Drive to Salento (2 hours)",
            "Visit working coffee plantation",
            "Coffee cupping ceremony",
            "Overnight in coffee lodge"
          ]
        },
        {
          "day": 4,
          "title": "Coffee Region Exploration",
          "activities": [
            "Hike through Valle de Cocora (cloud forest)",
            "Visit wax palm trees (world's tallest)",
            "Local community visit",
            "Traditional Colombian lunch"
          ]
        },
        {
          "day": 5,
          "title": "Return to Bogotá",
          "activities": [
            "Drive back to Armenia",
            "Domestic flight to Bogotá",
            "Afternoon free",
            "Group dinner & reflection session"
          ]
        },
        {
          "day": 6,
          "title": "Cartagena - Departure",
          "activities": [
            "Domestic flight to Cartagena",
            "Walking tour of walled old city",
            "Dinner in colonial district",
            "Overnight in Cartagena"
          ]
        },
        {
          "day": 7,
          "title": "Cartagena Beach & Departure",
          "activities": [
            "Private yacht sunset cruise",
            "Free morning for shopping",
            "Lunch at beachfront restaurant",
            "Departure to airport"
          ]
        }
      ]
    },
    {
      "operator": "Intrepid Travel",
      "name": "Colombian Adventure",
      "url": "https://example.com/...",
      "duration_days": 5,
      "group_size_capacity": "10-14",
      "cost_per_person_usd": 1520,
      "accommodation_included": "Hotel names listed",
      "best_for": "MBA Iconic",
      "itinerary": [
        {
          "day": 1,
          "title": "Bogotá Arrival & Introduction",
          "activities": ["Check-in", "Orientation walk", "Welcome dinner"]
        }
        // ... continue for 5 days
      ]
    }
  ],
  "key_experiences": [
    {
      "name": "Coffee Plantation Tour & Cupping",
      "category": "Cultural",
      "duration_hours": 4,
      "cost_per_person_usd": 45,
      "group_friendly": true,
      "description": "Visit a working coffee finca, learn cultivation methods, participate in professional cupping ceremony"
    },
    {
      "name": "Cartagena Old City Walking Tour",
      "category": "Cultural",
      "duration_hours": 3,
      "cost_per_person_usd": 25,
      "group_friendly": true,
      "description": "Guided tour through UNESCO-listed colonial streets, fortifications, and plazas"
    },
    {
      "name": "Salsa Dancing Class & Nightclub",
      "category": "Group Bonding",
      "duration_hours": 3,
      "cost_per_person_usd": 35,
      "group_friendly": true,
      "description": "1-hour professional salsa lesson followed by group night out at local club"
    },
    {
      "name": "Street Art Tour in Bogotá",
      "category": "Cultural",
      "duration_hours": 2.5,
      "cost_per_person_usd": 30,
      "group_friendly": true,
      "description": "Explore Usaquén neighborhood with local artist, learn about street art movement"
    }
  ],
  "dining_highlights": [
    {
      "name": "Andres DC",
      "city": "Bogotá",
      "cuisine": "Colombian Contemporary",
      "michelin": false,
      "group_friendly": true,
      "notes": "Modern Colombian cuisine, excellent for group dining, rooftop atmosphere"
    },
    {
      "name": "Club de Pesca",
      "city": "Cartagena",
      "cuisine": "Seafood",
      "michelin": false,
      "group_friendly": true,
      "notes": "Waterfront dining, fresh fish, perfect for celebratory group meal"
    }
  ],
  "cultural_intelligence": {
    "communication_style": "High-context, warm and expressive. Colombians value personal relationships before business.",
    "business_etiquette": "Greetings are warm; handshakes and direct eye contact are standard. Business cards exchanged formally. Hierarchy is respected.",
    "social_customs": "Dinners are social events—expect longer meal times. Punctuality is flexible (Latin time). Don't discuss politics or violence.",
    "dining_norms": "Business dinners often extend 2-3 hours. Coffee is central to culture. Tipping 10% expected in restaurants."
  },
  "ground_transport": {
    "airport_to_hotel": "Uber or pre-arranged shuttle recommended",
    "within_city": "Uber, taxis, or organized group transport",
    "between_destinations": "Domestic flights (Avianca, LATAM) or group coach transport",
    "car_rental": "Not recommended—hire driver or use tour operator transport"
  },
  "group_bonding_activities": [
    {
      "activity": "Salsa Dancing Class",
      "duration_hours": 1.5,
      "cost_per_person_usd": 25,
      "group_size": "8-20",
      "why_it_works": "Fun, energetic, breaks ice, quintessentially Colombian"
    },
    {
      "activity": "Coffee Cupping Ceremony",
      "duration_hours": 2,
      "cost_per_person_usd": 40,
      "group_size": "6-15",
      "why_it_works": "Educational, sensory experience, shared learning moment"
    },
    {
      "activity": "Cartagena Sunset Yacht Cruise",
      "duration_hours": 2.5,
      "cost_per_person_usd": 60,
      "group_size": "8-25",
      "why_it_works": "Relaxing, scenic, great for informal networking"
    },
    {
      "activity": "Volunteer Community Visit",
      "duration_hours": 3,
      "cost_per_person_usd": 35,
      "group_size": "10-20",
      "why_it_works": "Meaningful, builds group purpose, local impact"
    },
    {
      "activity": "Street Art & Market Food Tour",
      "duration_hours": 3,
      "cost_per_person_usd": 30,
      "group_size": "8-15",
      "why_it_works": "Authentic, exploratory, supports local artists and vendors"
    }
  ],
  "summary": "Colombia offers a vibrant mix of cultural immersion, natural beauty, and warm hospitality. Perfect for MBA cohorts seeking authentic experiences beyond typical business centers. The country excels at group activities—from coffee plantations to salsa dancing—while maintaining strong luxury hotel options in Bogotá and Cartagena. Best visited in dry seasons (Dec-Mar, Jul-Aug). Highly recommended for first-time visitors to South America."
}
```

---

## Research Sources to Use

### Tour Operators:
- G Adventures: gadventures.com
- Intrepid Travel: intrepidtravel.com
- Abercrombie & Kent: abercrombiekent.com
- Trafalgar: trafalgartours.com
- ToursByLocals: toursbylocals.com
- Viator: viator.com
- GetYourGuide: getyourguide.com

### Hotels:
- Booking.com (filter by 4-5 stars, read group reviews)
- TripAdvisor (group amenities section)
- Hotel websites directly (look for group packages)
- Luxury hotel chains: Aman, Rosewood, Belmond, Four Seasons

### Logistics:
- Google Maps (transport options)
- Official tourism boards (visa info, seasonal data)
- CDC/WHO (health recommendations)
- XE.com or OANDA (currency/exchange rates)

### Activities:
- Viator
- GetYourGuide
- ToursByLocals
- Local tourism websites

---

## 30 Destinations to Cover

**South America (6)**
1. Colombia
2. Peru
3. Argentina
4. Chile/Patagonia
5. Costa Rica
6. Brazil

**Europe (8)**
7. Portugal
8. Iceland
9. Greece
10. Croatia
11. Scotland
12. Turkey
13. Berlin/Germany
14. Spain (Madrid or Barcelona)

**Africa (3)**
15. South Africa
16. Kenya
17. Morocco

**Middle East (2)**
18. UAE
19. Jordan

**Asia-Pacific (11)**
20. Japan
21. South Korea
22. Vietnam
23. Philippines
24. India
25. Taiwan
26. Thailand
27. Australia
28. China
29. Indonesia/Bali
30. Singapore

---

## Deliverables

### Output Format:
1. **JSON file** (`mba_treks_30_destinations.json`)
   - Complete data for all 30 destinations
   - Structured per schema above
   - Valid JSON syntax

2. **Markdown Summary File** (`MBA_Trek_Summaries.md`)
   - 1-2 paragraph summary per destination
   - Quick reference for each trek
   - Key highlights and recommendations

3. **Optional: Google Sheet or CSV**
   - Quick lookup table
   - Operator names, costs, group sizes
   - Best-for categories

---

## Research Tips

- **Save links** as you go (for verification/updating later)
- **Prioritize G Adventures & Intrepid** first (most comprehensive catalogs)
- **For smaller destinations**, check local DMCs and boutique operators
- **Note seasonal pricing variations** (peak vs. shoulder vs. off-season)
- **Verify current pricing** (tour packages change monthly)
- **Look for MBA-specific or group discount packages** where available
- **Document source URLs** for all data points

---

## Quality Checklist

✅ All 30 destinations have entries  
✅ Each destination has 3+ real, named tour packages  
✅ All itineraries are actual (not invented)  
✅ Hotels are real, current, with real pricing  
✅ Logistics info is accurate and current  
✅ Activities have realistic costs & durations  
✅ Cultural notes are respectful and accurate  
✅ JSON is valid and properly formatted  
✅ All URLs/sources are documented  

---

## Notes

- **Be exhaustive but selective**: Prioritize packages with good reviews and strong group feedback.
- **Focus on transparency**: If you can't find a package detail, note it as "TBD" or "Contact operator."
- **Capture the vibe**: Each destination's summary should convey why an MBA cohort would choose it.
- **Group focus**: Emphasize group amenities, bonding activities, and ease of logistics.

---

**Start with Colombia, Peru, and Japan.** Then batch the remaining 27 into geographic regions for consistent research rhythm.

**Good luck!** 🌍
