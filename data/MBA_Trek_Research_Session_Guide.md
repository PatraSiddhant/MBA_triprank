# MBA Trek Research: Session-Based, Modular Approach
## Avoid Token Limits & Process Interruptions

---

## Overview
**Research 30 MBA trek destinations in parallel, modular sessions.** Each session completes **1-3 countries**, saves results immediately, and exits cleanly. Next session picks up where you left off.

---

## Session Structure

### Session 1: Research → Save → Exit
- Research 3 countries
- Save JSON for those 3 countries to a file
- Close the session
- **No token accumulation**

### Session 2: Load Previous Data → Research → Append → Save → Exit
- Load the JSON file from Session 1
- Research 3 NEW countries
- Append new data to existing JSON
- Save updated file
- Close the session

### Repeat until all 30 countries are done

---

## File Management Strategy

### Master File Structure
```
/mnt/user-data/outputs/mba_treks_data.json
```

**Contains**: Running compilation of all completed countries

### Format:
```json
{
  "metadata": {
    "total_destinations": 30,
    "completed": 3,
    "last_updated": "2026-03-06",
    "sessions": ["Session_1", "Session_2", "Session_3"],
    "next_batch": ["Iceland", "South Africa", "Vietnam"]
  },
  "destinations": {
    "Colombia": { /* full country data */ },
    "Peru": { /* full country data */ },
    "Argentina": { /* full country data */ }
  }
}
```

---

## Session Batches (3 countries per session = 10 sessions total)

### **Session 1: South America Foundation**
- Colombia
- Peru
- Argentina
→ Save to `mba_treks_data.json`

### **Session 2: South America + Central America**
- Chile/Patagonia
- Costa Rica
- Brazil
→ Append to `mba_treks_data.json`

### **Session 3: Southern Europe**
- Portugal
- Iceland
- Greece
→ Append to `mba_treks_data.json`

### **Session 4: Eastern Europe & Balkans**
- Croatia
- Turkey
- Berlin/Germany
→ Append to `mba_treks_data.json`

### **Session 5: Western Europe & Mediterranean**
- Scotland
- Spain (Madrid or Barcelona)
- (Reserve slot)
→ Append to `mba_treks_data.json`

### **Session 6: Africa**
- South Africa
- Kenya
- Morocco
→ Append to `mba_treks_data.json`

### **Session 7: Middle East**
- UAE
- Jordan
- (Reserve slot)
→ Append to `mba_treks_data.json`

### **Session 8: East Asia**
- Japan
- South Korea
- Taiwan
→ Append to `mba_treks_data.json`

### **Session 9: Southeast Asia**
- Vietnam
- Philippines
- Thailand
→ Append to `mba_treks_data.json`

### **Session 10: South & Central Asia + Oceania**
- India
- China
- Australia
- Indonesia/Bali
- Singapore
→ Append to `mba_treks_data.json`

---

## Session Workflow Template

### **Before Starting a Session:**

1. **Check what's completed**
   - Open `/mnt/user-data/outputs/mba_treks_data.json`
   - Look at `"completed"` field
   - Identify your 3 countries for this session

2. **Load existing data** (if not Session 1)
   ```python
   import json
   
   with open('/mnt/user-data/outputs/mba_treks_data.json', 'r') as f:
       master_data = json.load(f)
   
   completed = list(master_data['destinations'].keys())
   print(f"Already completed: {completed}")
   ```

### **During the Session:**

3. **Research your 3 countries**
   - Use the Research Prompt for each
   - Document findings in a temporary file or note
   - Focus: tour packages, hotels, activities, logistics, cultural notes

4. **Build JSON for each country**
   - Use the schema from the Research Prompt
   - Validate JSON syntax
   - Save each country's JSON separately first

### **After Research (Saving Data):**

5. **Append new countries to master file**
   ```python
   import json
   from datetime import datetime
   
   # Load existing master data
   with open('/mnt/user-data/outputs/mba_treks_data.json', 'r') as f:
       master_data = json.load(f)
   
   # Add new countries
   master_data['destinations']['Colombia'] = { /* full country data */ }
   master_data['destinations']['Peru'] = { /* full country data */ }
   master_data['destinations']['Argentina'] = { /* full country data */ }
   
   # Update metadata
   master_data['metadata']['completed'] = len(master_data['destinations'])
   master_data['metadata']['last_updated'] = datetime.now().isoformat()
   master_data['metadata']['sessions'].append('Session_1')
   
   # Update next_batch
   all_30 = [
       'Colombia', 'Peru', 'Argentina', 'Chile', 'Costa Rica', 'Brazil',
       'Portugal', 'Iceland', 'Greece', 'Croatia', 'Scotland', 'Turkey', 'Berlin', 'Spain',
       'South Africa', 'Kenya', 'Morocco',
       'UAE', 'Jordan',
       'Japan', 'South Korea', 'Vietnam', 'Philippines', 'India', 'Taiwan', 'Thailand', 'Australia', 'China', 'Indonesia', 'Singapore'
   ]
   completed_list = list(master_data['destinations'].keys())
   remaining = [c for c in all_30 if c not in completed_list]
   master_data['metadata']['next_batch'] = remaining[:3]  # Next 3 to research
   
   # Save
   with open('/mnt/user-data/outputs/mba_treks_data.json', 'w') as f:
       json.dump(master_data, f, indent=2)
   
   print(f"✅ Saved {len(master_data['destinations'])} countries")
   print(f"📊 Progress: {master_data['metadata']['completed']}/30")
   print(f"📝 Next batch: {master_data['metadata']['next_batch']}")
   ```

6. **Create backup of today's session**
   - Copy to: `mba_treks_data_backup_[DATE].json`
   - Keeps version history
   - Safety net if something goes wrong

---

## Starter Template for Session 1

When you start Session 1, use this as your baseline JSON file:

```json
{
  "metadata": {
    "total_destinations": 30,
    "completed": 0,
    "last_updated": "2026-03-06",
    "sessions_completed": [],
    "next_batch": ["Colombia", "Peru", "Argentina"],
    "notes": "Modular research approach - 3 countries per session"
  },
  "destinations": {}
}
```

Save this as `/mnt/user-data/outputs/mba_treks_data.json` before starting.

---

## Country Data Template (For Each Session)

When researching a country, capture this minimal structure:

```json
{
  "destination": "Colombia",
  "region": "South America",
  "research_date": "2026-03-06",
  "best_season": "December-March, July-August",
  "visa_required": false,
  "estimated_daily_budget_usd": "120-200",
  "primary_airport": "El Dorado International (BOG)",
  "language": "Spanish",
  "currency": "Colombian Peso (COP)",
  
  "hotels": [
    {
      "name": "Casa Medina Boutique Hotel",
      "city": "Bogotá",
      "stars": 5,
      "nightly_rate_usd": 280
    }
  ],
  
  "tour_packages": [
    {
      "operator": "G Adventures",
      "name": "Colombia Highlights",
      "duration_days": 7,
      "cost_per_person_usd": 1850,
      "itinerary": [
        {
          "day": 1,
          "title": "Arrive Bogotá",
          "activities": ["Hotel check-in", "Welcome dinner"]
        }
      ]
    }
  ],
  
  "key_experiences": [
    {
      "name": "Coffee Plantation Tour",
      "category": "Cultural",
      "cost_per_person_usd": 45
    }
  ],
  
  "group_bonding_activities": [
    {
      "activity": "Salsa Dancing Class",
      "cost_per_person_usd": 25
    }
  ],
  
  "cultural_intelligence": "High-context, warm communication...",
  
  "summary": "Colombia offers vibrant cultural immersion..."
}
```

---

## Checkpoint Checklist (After Each Session)

Before closing a session, verify:

- [ ] All 3 countries have complete JSON entries
- [ ] JSON is valid syntax (no missing brackets)
- [ ] Metadata shows correct count of completed countries
- [ ] File saved to `/mnt/user-data/outputs/mba_treks_data.json`
- [ ] Backup created with date stamp
- [ ] `next_batch` in metadata updated with next 3 countries
- [ ] All hotel names, tour operators, costs are real (not fabricated)

---

## Recovery Plan (If Session Interrupts)

If you get cut off mid-session:

1. **Check what was saved**
   ```bash
   cat /mnt/user-data/outputs/mba_treks_data.json | tail -20
   ```

2. **See completed count**
   ```bash
   grep "completed" /mnt/user-data/outputs/mba_treks_data.json
   ```

3. **Resume from last checkpoint**
   - Load master file
   - Identify what's missing
   - Research and append only incomplete countries
   - Resave

---

## Parallel Session Option (If You Have Help)

If researching with another person:
- **Person A**: Sessions 1, 3, 5, 7, 9 (odd)
- **Person B**: Sessions 2, 4, 6, 8, 10 (even)

Each person:
1. Researches 3 countries independently
2. Saves to `mba_treks_country_[PERSON]_[COUNTRY].json`
3. At end of session, **one person** merges all into master file

---

## Estimated Timeline

- **3 countries per session**: 45-60 minutes
- **10 sessions total**: ~7.5 hours (spread across 10 days or more)
- **Token efficiency**: 0 token carryover between sessions
- **Backup frequency**: After every session

---

## Summary

✅ Research in bite-sized chunks (3 countries/session)  
✅ Save after every session (no token loss)  
✅ Load previous data and append new data  
✅ Metadata tracks progress and next steps  
✅ Backup after each session for safety  
✅ Clean exit/entry between sessions  

**Start Session 1 when ready. Research Colombia, Peru, Argentina. Then come back for Session 2.**

