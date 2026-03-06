export * from "./types";

import { TripTemplate } from "./types";

export const tripTemplates: TripTemplate[] = [
    {
        "slug": "costa-rica-trek",
        "title": "Costa Rica",
        "primaryDestinationCountry": "Costa Rica",
        "primaryDestinationCity": "San Jose",
        "region": "Central America",
        "durationDays": 7,
        "roughBudgetUsd": 1500,
        "themes": ["Adventure", "Sustainability", "Luxury"],
        "summary": "Costa Rica offers the perfect balance of thrilling adventure, breathtaking nature, and relaxing beach vibes. Ideal for MBA cohorts looking to bond over ziplining, surfing, and exploring lush rainforests while enjoying the famous 'Pura Vida' lifestyle.",
        "schoolSlugs": ["wharton", "harvard", "stanford"],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in San Jose",
                "items": [
                    { "title": "Welcome Dinner", "description": "Meet the cohort in San Jose.", "timeBucket": "Night" }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Arenal Volcano",
                "items": [
                    { "title": "Hot Springs", "description": "Relax in the natural hot springs.", "timeBucket": "Afternoon" }
                ]
            },
            {
                "dayIndex": 3,
                "title": "Ziplining Adventure",
                "items": [
                    { "title": "Canopy Tour", "description": "Zipline through the cloud forest.", "timeBucket": "Morning" }
                ]
            },
            {
                "dayIndex": 4,
                "title": "Manuel Antonio",
                "items": [
                    { "title": "Beach Day", "description": "Relax and surf at the national park.", "timeBucket": "All Day" }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Departure",
                "items": [
                    { "title": "Farewell", "description": "Flights home.", "timeBucket": "Morning" }
                ]
            }
        ],
        "photos": [{ "path": "/trips/costarica/hero.png", "alt": "Costa Rica Volcano", "isHero": true }],
        "reviewSnippets": [{ "text": "The perfect mix of adventure and relaxation. Great for bonding!", "sourceName": "MBA Trek Hub", "tag": "adventure" }],
        "safetyRating": 4,
        "comfortRating": 4,
        "vibes": ["adventure", "tropical", "relaxed"],
        "logistics": {
            "bestSeason": "December-April",
            "visaNotes": "US citizens do not need a visa",
            "dailyBudgetRange": "100-200",
            "primaryAirport": "SJO or LIR",
            "currency": "Colon (CRC)",
            "healthNotes": "Routine vaccines recommended",
            "transport": { "airportToHotel": "Shuttle", "withinCity": "Shuttle or Uber", "betweenDestinations": "Charter Bus" }
        },
        "culturalIntelligence": {
            "communicationStyle": "Friendly and indirect.",
            "businessEtiquette": "Punctual but relaxed.",
            "socialCustoms": "'Pura Vida' is a way of life.",
            "diningNorms": "Casual dining is common."
        },
        "groupBondingActivities": [{ "activity": "Catamaran Cruise", "durationHours": 3, "costPerPerson": 80, "whyItWorks": "Great sunset views and open bar." }],
        "premiumAccommodations": [{ "name": "Nayara Gardens", "stars": 5, "city": "Arenal", "whyGoodForGroups": "Luxury villas with volcano views." }]
    },
    {
        "slug": "dominican-republic-trek",
        "title": "Dominican Republic",
        "primaryDestinationCountry": "Dominican Republic",
        "primaryDestinationCity": "Punta Cana",
        "region": "Caribbean",
        "durationDays": 6,
        "roughBudgetUsd": 1200,
        "themes": ["Party", "Luxury", "Culture"],
        "summary": "Punta Cana is the ultimate Caribbean getaway for MBA students looking for beautiful white sand beaches, all-inclusive luxury, and vibrant nightlife. It's the perfect setting to decompress after finals and celebrate with the cohort.",
        "schoolSlugs": ["columbia", "booth", "kellogg"],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in Punta Cana",
                "items": [
                    { "title": "Resort Check-In", "description": "Settle into the all-inclusive resort.", "timeBucket": "Afternoon" }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Beach & Pool Day",
                "items": [
                    { "title": "Group Swim", "description": "Relax by the pool with open bar.", "timeBucket": "All Day" }
                ]
            },
            {
                "dayIndex": 3,
                "title": "Island Excursion",
                "items": [
                    { "title": "Saona Island", "description": "Catamaran trip to a pristine island.", "timeBucket": "All Day" }
                ]
            },
            {
                "dayIndex": 4,
                "title": "Nightlife",
                "items": [
                    { "title": "Coco Bongo", "description": "Famous nightclub show and party.", "timeBucket": "Night" }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Departure",
                "items": [
                    { "title": "Farewell", "description": "Flights home.", "timeBucket": "Morning" }
                ]
            }
        ],
        "photos": [{ "path": "/trips/dominicanrepublic/hero.png", "alt": "Punta Cana Beach", "isHero": true }],
        "reviewSnippets": [{ "text": "Unbeatable resort experience. Pure relaxation and fun.", "sourceName": "MBA Trek Hub", "tag": "nightlife" }],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": ["tropical", "party", "luxury"],
        "logistics": {
            "bestSeason": "December-April",
            "visaNotes": "US citizens just need a tourist card",
            "dailyBudgetRange": "150-300",
            "primaryAirport": "PUJ",
            "currency": "Dominican Peso (DOP)",
            "healthNotes": "Drink bottled water",
            "transport": { "airportToHotel": "Pre-booked transfer", "withinCity": "Resort transport", "betweenDestinations": "Charter Bus" }
        },
        "culturalIntelligence": {
            "communicationStyle": "Expressive and warm.",
            "businessEtiquette": "Relationship-driven.",
            "socialCustoms": "Music and dancing are central to life.",
            "diningNorms": "Late dinners are common."
        },
        "groupBondingActivities": [{ "activity": "Private Yacht Charter", "durationHours": 4, "costPerPerson": 120, "whyItWorks": "Exclusive party on the water." }],
        "premiumAccommodations": [{ "name": "Hard Rock Hotel", "stars": 5, "city": "Punta Cana", "whyGoodForGroups": "Massive resort with endless entertainment." }]
    },
    {
        "slug": "jamaica-trek",
        "title": "Jamaica",
        "primaryDestinationCountry": "Jamaica",
        "primaryDestinationCity": "Montego Bay",
        "region": "Caribbean",
        "durationDays": 6,
        "roughBudgetUsd": 1350,
        "themes": ["Culture", "Party", "Adventure"],
        "summary": "Experience the vibrant culture, incredible food, and stunning beaches of Jamaica. This trek offers MBA cohorts a chance to unwind to reggae rhythms, climb iconic waterfalls, and enjoy world-class Caribbean hospitality.",
        "schoolSlugs": ["stern", "haas", "tuck"],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in MBJ",
                "items": [
                    { "title": "Welcome Cocktail", "description": "Rum punch reception at the resort.", "timeBucket": "Afternoon" }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Dunn's River Falls",
                "items": [
                    { "title": "Waterfall Climb", "description": "Group climb up the famous falls.", "timeBucket": "Morning" }
                ]
            },
            {
                "dayIndex": 3,
                "title": "Catamaran & Snorkel",
                "items": [
                    { "title": "Sail the Coast", "description": "Snorkeling and sunset sailing.", "timeBucket": "Afternoon" }
                ]
            },
            {
                "dayIndex": 4,
                "title": "Cultural Day",
                "items": [
                    { "title": "Bob Marley Museum", "description": "Visit the legendary musician's home.", "timeBucket": "Morning" }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Departure",
                "items": [
                    { "title": "Farewell", "description": "Flights home.", "timeBucket": "Morning" }
                ]
            }
        ],
        "photos": [{ "path": "/trips/jamaica/hero.png", "alt": "Jamaica Waterfalls", "isHero": true }],
        "reviewSnippets": [{ "text": "Amazing vibes and the people are incredible. So relaxing.", "sourceName": "MBA Trek Hub", "tag": "culture" }],
        "safetyRating": 3,
        "comfortRating": 4,
        "vibes": ["chill", "tropical", "cultural"],
        "logistics": {
            "bestSeason": "November-Mid December",
            "visaNotes": "US citizens do not need a visa",
            "dailyBudgetRange": "100-250",
            "primaryAirport": "MBJ",
            "currency": "Jamaican Dollar (JMD)",
            "healthNotes": "Mosquito repellant is a must",
            "transport": { "airportToHotel": "Resort shuttle", "withinCity": "Taxis", "betweenDestinations": "Charter Bus" }
        },
        "culturalIntelligence": {
            "communicationStyle": "Direct but friendly.",
            "businessEtiquette": "Relaxed pacing.",
            "socialCustoms": "'Island time' is real.",
            "diningNorms": "Jerk chicken is a staple."
        },
        "groupBondingActivities": [{ "activity": "Bioluminescent Bay Tour", "durationHours": 2, "costPerPerson": 60, "whyItWorks": "Magical night-time experience." }],
        "premiumAccommodations": [{ "name": "Half Moon", "stars": 5, "city": "Montego Bay", "whyGoodForGroups": "Spacious luxury compound." }]
    },
    {
        "slug": "colombia-trek",
        "title": "Colombia",
        "primaryDestinationCity": "Bogotá",
        "primaryDestinationCountry": "Colombia",
        "region": "South America",
        "durationDays": 10,
        "roughBudgetUsd": 1950,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Colombia offers a vibrant mix of cultural immersion, natural beauty, and warm hospitality. Perfect for MBA cohorts seeking authentic experiences with excellent food and adventure. Excels at group activities—coffee plantations, salsa dancing, yacht cruises—while maintaining strong luxury hotel options in Bogotá and Cartagena. Best visited in dry seasons (Dec-Mar, Jul-Aug). Highly recommended for groups seeking first-time South America experiences with strong social/cultural elements.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in BOG",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Bogotá",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "coffee region hacienda stay",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Salsa Dancing Class",
                        "description": "Fun, energetic, breaks ice, quintessentially Colombian, all skill levels welcome",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/colombia/hero.png",
                "alt": "Colombia Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Colombia offers a vibrant mix of cultural immersion, natural beauty, and warm hospitality. Perfect for MBA cohorts seeking authentic experiences with excellent food and adventure. Excels at group activities—coffee plantations, salsa dancing, yacht cruises—while maintaining strong luxury hotel options in Bogotá and Cartagena. Best visited in dry seasons (Dec-Mar, Jul-Aug). Highly recommended for groups seeking first-time South America experiences with strong social/cultural elements.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "South America"
        ],
        "logistics": {
            "bestSeason": "December-March, July-August",
            "visaNotes": "US citizens get 90 days on arrival",
            "dailyBudgetRange": "120-200",
            "primaryAirport": "El Dorado International (BOG)",
            "currency": "Colombian Peso (COP)",
            "healthNotes": "Yellow fever vaccine recommended for some regions",
            "transport": {
                "airportToHotel": "Uber or pre-arranged shuttle recommended",
                "withinCity": "Uber, taxis, organized group transport",
                "betweenDestinations": "Domestic flights (Avianca, LATAM) or group coach transport"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "High-context, warm and expressive. Colombians value personal relationships before business. Direct eye contact and warm greetings are standard.",
            "businessEtiquette": "Formal handshakes, business cards exchanged. Hierarchy is respected in professional settings. Business lunch/dinner is social—expect 2-3 hour meals.",
            "socialCustoms": "Punctuality is flexible (Latin time). Don't discuss violence or politics. Coffee is central to culture. Sunday is family time.",
            "diningNorms": "Business dinners are social events. Expect longer meal times (2-3 hours). 10% tipping standard in restaurants; 15-20% for exceptional service."
        },
        "groupBondingActivities": [
            {
                "activity": "Salsa Dancing Class",
                "durationHours": 1.5,
                "costPerPerson": 25,
                "whyItWorks": "Fun, energetic, breaks ice, quintessentially Colombian, all skill levels welcome"
            },
            {
                "activity": "Coffee Cupping Ceremony",
                "durationHours": 2,
                "costPerPerson": 40,
                "whyItWorks": "Educational, sensory experience, shared learning moment, connects to Colombian identity"
            },
            {
                "activity": "Cartagena Sunset Yacht Cruise",
                "durationHours": 2.5,
                "costPerPerson": 60,
                "whyItWorks": "Relaxing, scenic, great for informal networking, Caribbean vibe"
            },
            {
                "activity": "Street Art & Market Food Tour",
                "durationHours": 3,
                "costPerPerson": 30,
                "whyItWorks": "Authentic, exploratory, supports local artists, authentic cuisine experience"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Four Seasons Casa Medina",
                "city": "Bogotá",
                "stars": 5,
                "whyGoodForGroups": "Historic colonial mansion, Zona G location, excellent concierge, group dining options"
            },
            {
                "name": "Sofitel Legend Santa Clara Cartagena",
                "city": "Cartagena",
                "stars": 5,
                "whyGoodForGroups": "17th-century converted convent, UNESCO walled city location, largest pool in city, group facilities"
            },
            {
                "name": "Hotel Las Islas",
                "city": "Rosario Islands",
                "stars": 5,
                "whyGoodForGroups": "Luxury eco-retreat, island privacy, perfect for group bonding, water activities"
            }
        ]
    },
    {
        "slug": "peru-trek",
        "title": "Peru",
        "primaryDestinationCity": "Aguas Calientes",
        "primaryDestinationCountry": "Peru",
        "region": "South America",
        "durationDays": 7,
        "roughBudgetUsd": 1680,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Peru is the ultimate South American adventure destination. Machu Picchu is non-negotiable; but Peru offers equally compelling experiences: Lake Titicaca homestays, Inca Trail treks, Sacred Valley culture, Lima's world-class food scene, and Amazon exploration. Best for MBA groups seeking serious adventure combined with deep cultural immersion. May-October ideal for trekking. Altitude requires respect and acclimatization time. Groups bonded through shared challenge and awe-inspiring landscapes.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in Lima",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Lima introduction",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Sacred Valley",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Inca Trail Trek (4 days)",
                        "description": "Ultimate shared challenge, bonding through shared hardship, legendary accomplishment arriving at Machu Picchu",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/peru/hero.png",
                "alt": "Peru Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Peru is the ultimate South American adventure destination. Machu Picchu is non-negotiable; but Peru offers equally compelling experiences: Lake Titicaca homestays, Inca Trail treks, Sacred Valley culture, Lima's world-class food scene, and Amazon exploration. Best for MBA groups seeking serious adventure combined with deep cultural immersion. May-October ideal for trekking. Altitude requires respect and acclimatization time. Groups bonded through shared challenge and awe-inspiring landscapes.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "South America"
        ],
        "logistics": {
            "bestSeason": "May-October (dry season)",
            "visaNotes": "US citizens get 90 days on arrival",
            "dailyBudgetRange": "100-180",
            "primaryAirport": "Jorge Chávez International (Lima)",
            "currency": "Peruvian Sol (PEN)",
            "healthNotes": "Altitude sickness common—acclimatization essential. Yellow fever vaccine recommended for Amazon region.",
            "transport": {
                "airportToHotel": "Uber, taxis (Alo Taxi safe option), or pre-arranged shuttle",
                "withinCity": "Metro in Lima (modern), taxis, Uber in larger cities",
                "betweenDestinations": "Domestic flights (LATAM, Sky), scenic train to Machu Picchu region, buses for budget travel"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Mix of high and low-context depending on region. Urban areas more direct; rural/Andean communities value relationship-building and respect for authority.",
            "businessEtiquette": "Formal titles used initially. Handshakes are standard. Hierarchy is important; elders/leaders given respect. Business can be mixed with social time.",
            "socialCustoms": "Family and community are central. Sundays reserved for family. Don't photograph people without permission. Altitude respect—take time to acclimatize.",
            "diningNorms": "Ceviche is national dish—fresh fish marinated in lime juice. Meals are leisurely. Tipping 10% standard in restaurants; not expected for street food."
        },
        "groupBondingActivities": [
            {
                "activity": "Inca Trail Trek (4 days)",
                "durationHours": 96,
                "costPerPerson": 600,
                "whyItWorks": "Ultimate shared challenge, bonding through shared hardship, legendary accomplishment arriving at Machu Picchu"
            },
            {
                "activity": "Lake Titicaca Homestay Experience",
                "durationHours": "overnight",
                "costPerPerson": 80,
                "whyItWorks": "Intimate cultural immersion, living with local family, shared meals, connection to place and people"
            },
            {
                "activity": "Sacred Valley Cooking Class",
                "durationHours": 4,
                "costPerPerson": 65,
                "whyItWorks": "Hands-on, fun, learn traditional Peruvian cuisine, group meal together at end"
            },
            {
                "activity": "Cusco Planetarium & Stargazing",
                "durationHours": 2,
                "costPerPerson": 35,
                "whyItWorks": "Educational, unique perspective on Inca astronomy, clear southern hemisphere skies, reflection moment"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Belmond Hiram Bingham",
                "city": "Aguas Calientes",
                "stars": 5,
                "whyGoodForGroups": "Luxury train journey included, exclusive Machu Picchu access, premium but worth it"
            },
            {
                "name": "Aranwa Sacred Valley Hotel & Wellness Spa",
                "city": "Urubamba",
                "stars": 5,
                "whyGoodForGroups": "Mountain views, group spa facilities, excellent Andean cuisine, outdoor activities"
            },
            {
                "name": "JW Marriott Lima",
                "city": "Lima",
                "stars": 5,
                "whyGoodForGroups": "Miraflores location, ocean views, world-class dining, concierge group services"
            }
        ]
    },
    {
        "slug": "argentina-trek",
        "title": "Argentina",
        "primaryDestinationCity": "Buenos Aires",
        "primaryDestinationCountry": "Argentina",
        "region": "South America",
        "durationDays": 10,
        "roughBudgetUsd": 1850,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Argentina is South America's most European destination—sophisticated, wine-focused, and culturally rich. Buenos Aires rivals global cities for nightlife and food; Mendoza is world-class wine country beneath the Andes. Perfect for MBA cohorts seeking wine education, tango experiences, and gaucho culture. Fall (Mar-May) and spring (Sep-Nov) offer ideal weather. Groups excel at long dinners, wine tastings, and cultural immersion. Strong for mature, experienced travelers and wine enthusiasts. Great pre- or post-MBA relaxation destination.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in Ezeiza, Buenos Aires",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Buenos Aires tango",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Tigre Delta",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Tango Lesson & Show",
                        "description": "Fun, romantic, quintessentially Argentine, hilarious for beginners, great memories",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/argentina/hero.png",
                "alt": "Argentina Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Argentina is South America's most European destination—sophisticated, wine-focused, and culturally rich. Buenos Aires rivals global cities for nightlife and food; Mendoza is world-class wine country beneath the Andes. Perfect for MBA cohorts seeking wine education, tango experiences, and gaucho culture. Fall (Mar-May) and spring (Sep-Nov) offer ideal weather. Groups excel at long dinners, wine tastings, and cultural immersion. Strong for mature, experienced travelers and wine enthusiasts. Great pre- or post-MBA relaxation destination.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "South America"
        ],
        "logistics": {
            "bestSeason": "March-May (fall), September-November (spring)",
            "visaNotes": "US citizens get 90 days on arrival",
            "dailyBudgetRange": "90-180",
            "primaryAirport": "Ministro Pistarini International (Ezeiza, Buenos Aires)",
            "currency": "Argentine Peso (ARS)",
            "healthNotes": "Generally low health risks. Tap water safe in major cities. Yellow fever not required.",
            "transport": {
                "airportToHotel": "Uber, pre-arranged shuttle, or Remise (radio taxi)—safer than hailing on street",
                "withinCity": "Modern subway in Buenos Aires (Subte), buses, Uber, taxis",
                "betweenDestinations": "Domestic flights (Aerolíneas Argentinas, LATAM) to Mendoza/Patagonia, long-distance buses for budget travel"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "European-influenced, direct and friendly. Argentines pride themselves on sophistication and European heritage. Warm but not overly hierarchical.",
            "businessEtiquette": "Formal greetings with handshakes. Eye contact expected. Business cards exchanged. Social time mixed with business—coffee and conversation valued.",
            "socialCustoms": "Very social culture; outdoor gatherings and meals are central. Sunday is family time. Mate (herbal tea) is shared as sign of friendship/bonding.",
            "diningNorms": "Asado (BBQ) is sacred—slow-cooked, social occasion. Meals are late (dinner 9-10pm). Beef is staple. 10% tipping standard; 15% for excellent service."
        },
        "groupBondingActivities": [
            {
                "activity": "Tango Lesson & Show",
                "durationHours": 2.5,
                "costPerPerson": 65,
                "whyItWorks": "Fun, romantic, quintessentially Argentine, hilarious for beginners, great memories"
            },
            {
                "activity": "Estancia Gaucho Experience",
                "durationHours": "full day",
                "costPerPerson": 120,
                "whyItWorks": "Immersive cultural experience, horseback riding together, authentic asado feast, authentic Argentine tradition"
            },
            {
                "activity": "Wine Tasting with Sommelier",
                "durationHours": 4,
                "costPerPerson": 95,
                "whyItWorks": "Educational, collaborative tasting, vineyard walks, gourmet lunch, shared appreciation for world-class wines"
            },
            {
                "activity": "Buenos Aires Food Tour",
                "durationHours": 3,
                "costPerPerson": 60,
                "whyItWorks": "Walk historic neighborhoods (San Telmo, La Boca), taste local specialties, learn street culture and history"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Fierro Hotel Buenos Aires",
                "city": "Buenos Aires",
                "stars": 5,
                "whyGoodForGroups": "Boutique luxury in San Telmo, group dining, tango experiences arranged, rooftop bar"
            },
            {
                "name": "Park Hyatt Mendoza",
                "city": "Mendoza",
                "stars": 5,
                "whyGoodForGroups": "Vineyard views, group wine tastings, spa facilities, perfect for wine country base"
            },
            {
                "name": "Cavas Wine Lodge",
                "city": "Mendoza (Luján de Cuyo)",
                "stars": 5,
                "whyGoodForGroups": "Ultra-luxury vineyard stay, private tastings, gourmet meals, intimate groups only"
            }
        ]
    },
    {
        "slug": "chile-trek",
        "title": "Chile",
        "primaryDestinationCity": "Torres del Paine National Park",
        "primaryDestinationCountry": "Chile",
        "region": "South America",
        "durationDays": 9,
        "roughBudgetUsd": 2200,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Chile's Patagonia is one of Earth's most dramatic landscapes—perfect for groups seeking serious adventure combined with luxury accommodation options. Torres del Paine is world-class trekking territory: granite peaks, turquoise lakes, massive glaciers, and wildlife-rich. Best September-April. Sophisticated Santiago offers wine country, urban culture, and culinary excellence (Boragó). Chile is efficient, safe, and well-organized—ideal for groups valuing both adventure and comfort. Multi-country appeal: can combine with Argentina Patagonia or Peru for broader South America experience.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in SCL, Santiago",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Full circuit O Trek through Torres del Paine",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Grey Glacier",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Torres del Paine Trekking",
                        "description": "Shared challenge in world-class landscape, bonding through physical adventure, unforgettable memories",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/chile/hero.png",
                "alt": "Chile Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Chile's Patagonia is one of Earth's most dramatic landscapes—perfect for groups seeking serious adventure combined with luxury accommodation options. Torres del Paine is world-class trekking territory: granite peaks, turquoise lakes, massive glaciers, and wildlife-rich. Best September-April. Sophisticated Santiago offers wine country, urban culture, and culinary excellence (Boragó). Chile is efficient, safe, and well-organized—ideal for groups valuing both adventure and comfort. Multi-country appeal: can combine with Argentina Patagonia or Peru for broader South America experience.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "South America"
        ],
        "logistics": {
            "bestSeason": "September-April (spring/summer Southern Hemisphere)",
            "visaNotes": "US citizens get 90 days on arrival",
            "dailyBudgetRange": "100-180",
            "primaryAirport": "Arturo Merino Benítez International (SCL, Santiago)",
            "currency": "Chilean Peso (CLP)",
            "healthNotes": "Low health risks. Altitude sickness possible in high Andes. Yellow fever not required.",
            "transport": {
                "airportToHotel": "Uber, taxis, pre-arranged shuttle",
                "withinCity": "Metro in Santiago (modern), buses, Uber, taxis",
                "betweenDestinations": "Domestic flights (LATAM, Sky Airline) to Patagonia, long-distance buses for budget travel"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Direct, formal initially. Chileans are European-influenced, educated, professional. Less warm than other Latin Americans but reliable and efficient.",
            "businessEtiquette": "Formal greetings, professional distance respected. Hierarchy important. Business cards exchanged. Punctuality expected (more European-aligned than rest of region).",
            "socialCustoms": "Sundays are family time. Siesta culture less pronounced than rest of Latin America. Outdoor activities highly valued.",
            "diningNorms": "Meals are leisurely but not as extended as Argentina. 10% tipping standard. Seafood is staple (fresh fish, ceviche)."
        },
        "groupBondingActivities": [
            {
                "activity": "Torres del Paine Trekking",
                "durationHours": "60+ (multi-day)",
                "costPerPerson": "1600-2200",
                "whyItWorks": "Shared challenge in world-class landscape, bonding through physical adventure, unforgettable memories"
            },
            {
                "activity": "Wine Tasting Tour",
                "durationHours": "6",
                "costPerPerson": "120",
                "whyItWorks": "Educational, relaxing, vineyard landscapes, Chilean wine culture, group lunch experience"
            },
            {
                "activity": "Kayaking Grey Lake Icebergs",
                "durationHours": "4",
                "costPerPerson": "110",
                "whyItWorks": "Unique activity, stunning glacier scenery, adventure on water, wildlife spotting"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Hotel Lago Grey",
                "city": "Torres del Paine National Park",
                "stars": 5,
                "whyGoodForGroups": "Breathtaking glacier views, all-inclusive meals, perfect base for park exploration"
            },
            {
                "name": "Explora Patagonia",
                "city": "Torres del Paine",
                "stars": 5,
                "whyGoodForGroups": "All-inclusive luxury lodge, expert naturalist guides, group activities coordinated"
            },
            {
                "name": "The Singular Santiago",
                "city": "Santiago",
                "stars": 5,
                "whyGoodForGroups": "Urban luxury, central Lastarria location, wine tastings, group dining options"
            }
        ]
    },
    {
        "slug": "costa-rica-trek",
        "title": "Costa Rica",
        "primaryDestinationCity": "Guanacaste",
        "primaryDestinationCountry": "Costa Rica",
        "region": "Central America",
        "durationDays": 7,
        "roughBudgetUsd": 1680,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Costa Rica is the adventure capital of Central America—perfect for MBA groups seeking adrenaline mixed with culture and nature. Zip-lining through cloud forests is iconic; combined with Arenal's volcano/hot springs and Manuel Antonio's beach/jungle balance, Costa Rica delivers diversity. Country is safe, well-developed for tourism, and eco-conscious. Warm 'pura vida' culture is infectious. Best December-April (dry season). Consider combining with Belize or Panama for regional depth. Slightly expensive but worth it for group experience.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in SJO, Liberia International ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Arenal Volcano",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "hot springs",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Zip-Lining Canopy Tour",
                        "description": "Fun, thrilling, hilarious group moments, wildlife from unique perspective, photos",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/costa-rica/hero.png",
                "alt": "Costa Rica Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Costa Rica is the adventure capital of Central America—perfect for MBA groups seeking adrenaline mixed with culture and nature. Zip-lining through cloud forests is iconic; combined with Arenal's volcano/hot springs and Manuel Antonio's beach/jungle balance, Costa Rica delivers diversity. Country is safe, well-developed for tourism, and eco-conscious. Warm 'pura vida' culture is infectious. Best December-April (dry season). Consider combining with Belize or Panama for regional depth. Slightly expensive but worth it for group experience.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Central America"
        ],
        "logistics": {
            "bestSeason": "December-April (dry), May-November (green/rainy but fewer tourists)",
            "visaNotes": "US citizens get 90 days on arrival",
            "dailyBudgetRange": "120-200",
            "primaryAirport": "San José (SJO), Liberia International (LIR)",
            "currency": "Costa Rican Colón (₡)",
            "healthNotes": "Yellow fever not required but recommended for some regions. Malaria risk in some lowland areas—use prophylaxis.",
            "transport": {
                "airportToHotel": "Uber, taxis, pre-arranged shuttle (recommended)",
                "withinCity": "Taxis, Uber (in San José), local buses for budget travel",
                "betweenDestinations": "Domestic flights (Nature Air, SANSA) most efficient; long-distance buses scenic alternative"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, friendly, relaxed. 'Pura vida' (pure life) is national attitude. Less formal than South America. Strong emphasis on happiness and well-being.",
            "businessEtiquette": "Handshakes and direct eye contact standard. Professional but personable. Relationship-building valued. Business can be flexible/relaxed compared to North America.",
            "socialCustoms": "Nature and outdoor activities deeply valued. Environmental consciousness high. Family-oriented. Avoid rush—'Tico time' is slower pace culturally.",
            "diningNorms": "Casado (traditional lunch plate) is staple. Meals leisurely. 10% tipping expected but not always included. Coffee culture strong throughout day."
        },
        "groupBondingActivities": [
            {
                "activity": "Zip-Lining Canopy Tour",
                "durationHours": "3",
                "costPerPerson": "73",
                "whyItWorks": "Fun, thrilling, hilarious group moments, wildlife from unique perspective, photos"
            },
            {
                "activity": "Coffee Plantation Tour & Tasting",
                "durationHours": "3",
                "costPerPerson": "40",
                "whyItWorks": "Educational, sensory experience, farm family interaction, group tasting ceremony"
            },
            {
                "activity": "Arenal Volcano Hike + Hot Springs",
                "durationHours": "5",
                "costPerPerson": "64",
                "whyItWorks": "Natural beauty, waterfall swimming, warm springs relaxation, shared outdoor adventure"
            },
            {
                "activity": "Manuel Antonio Catamaran Sunset Cruise",
                "durationHours": "3",
                "costPerPerson": "80",
                "whyItWorks": "Relaxing, scenic, dolphin spotting, snorkeling opportunities, tropical sunset"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Four Seasons Resort Costa Rica Peninsula Papagayo",
                "city": "Guanacaste",
                "stars": 5,
                "whyGoodForGroups": "All-inclusive luxury, beach access, activities coordinated, golf, spa, group facilities"
            },
            {
                "name": "Arenal Nayara",
                "city": "La Fortuna",
                "stars": 5,
                "whyGoodForGroups": "Volcano views, hot springs access, adventure activities hub, group-friendly"
            },
            {
                "name": "Los Espuelas Eco-Lodge & Resort",
                "city": "Monteverde Cloud Forest",
                "stars": 5,
                "whyGoodForGroups": "Cloud forest location, nature-focused, zip-lining hub, naturalist-led activities"
            }
        ]
    },
    {
        "slug": "brazil-trek",
        "title": "Brazil",
        "primaryDestinationCity": "Rio de Janeiro",
        "primaryDestinationCountry": "Brazil",
        "region": "South America",
        "durationDays": 9,
        "roughBudgetUsd": 2100,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Brazil is a South American superlative: Rio's iconic beauty and beaches, Iguazu Falls (world's largest), and Amazon rainforest. Perfect for MBA groups seeking iconic landmarks + diverse nature + infectious culture. Portuguese language and visa requirement add slight complexity but worth it. Carnival (February) is world-class group experience if timing allows. Combine 3-country South America super-trip with Argentina and Chile. Safety requires awareness in major cities but tourist areas well-developed. Brazil delivers energy, nature, culture, and unforgettable experiences.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in GIG, Rio de Janeiro, Congoñhas ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Buenos Aires",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Iguazu Falls (both sides)",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Rio Carnival (if February)",
                        "description": "Once-in-lifetime experience, infectious samba energy, group immersion in Brazilian culture, unforgettable celebration",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/brazil/hero.png",
                "alt": "Brazil Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Brazil is a South American superlative: Rio's iconic beauty and beaches, Iguazu Falls (world's largest), and Amazon rainforest. Perfect for MBA groups seeking iconic landmarks + diverse nature + infectious culture. Portuguese language and visa requirement add slight complexity but worth it. Carnival (February) is world-class group experience if timing allows. Combine 3-country South America super-trip with Argentina and Chile. Safety requires awareness in major cities but tourist areas well-developed. Brazil delivers energy, nature, culture, and unforgettable experiences.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "South America"
        ],
        "logistics": {
            "bestSeason": "December-March Rio/beaches, June-November Amazon, October-March Iguazu",
            "visaNotes": "US citizens need visa (90 days tourist); apply at Brazilian embassy",
            "dailyBudgetRange": "100-200",
            "primaryAirport": "Tom Jobim International (GIG, Rio de Janeiro), Congoñhas (CGH, São Paulo)",
            "currency": "Brazilian Real (R$)",
            "healthNotes": "Yellow fever vaccination highly recommended for Amazon region. Malaria prophylaxis for some areas. Zika awareness.",
            "transport": {
                "airportToHotel": "Uber, taxis, pre-arranged shuttle (safer than hailing on street)",
                "withinCity": "Metro in Rio and São Paulo, taxis, Uber, buses",
                "betweenDestinations": "Domestic flights (LATAM, Gol, Azul) most efficient for long distances; buses scenic but long"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, expressive, rhythmic. Brazilians are emotionally expressive and relationship-focused. Infectious energy and optimism (jogo de cintura—'hip movement' flexibility).",
            "businessEtiquette": "Handshakes and warm greetings standard. Personal relationships matter. Formal initially but quickly become casual. Business can be flexible/relationship-driven.",
            "socialCustoms": "Samba, music, dance are central to culture. Beaches are social gathering places. Family-oriented. Carnival season (Feb) is national celebration. Religion (Catholicism/Spiritualism) influences culture.",
            "diningNorms": "Feijoada (bean stew) is national dish. Churrasco (BBQ) for celebrations. Meals leisurely. 10% tipping standard in restaurants. Caipirinha (cachaça drink) cultural staple."
        },
        "groupBondingActivities": [
            {
                "activity": "Rio Carnival (if February)",
                "durationHours": "all-night",
                "costPerPerson": "200-400",
                "whyItWorks": "Once-in-lifetime experience, infectious samba energy, group immersion in Brazilian culture, unforgettable celebration"
            },
            {
                "activity": "Iguazu Falls Exploration",
                "durationHours": "6",
                "costPerPerson": "120",
                "whyItWorks": "Natural wonder spectacle, boardwalk exploration together, shared awe at scale, both-sides perspective"
            },
            {
                "activity": "Amazon Rainforest Canoe Adventure",
                "durationHours": "4-8",
                "costPerPerson": "150",
                "whyItWorks": "Immersive nature, wildlife spotting together, expert guide commentary, unique ecosystem experience"
            },
            {
                "activity": "Rio Beach Culture Day",
                "durationHours": "6",
                "costPerPerson": "50",
                "whyItWorks": "Beach volleyball, caipirinha by the ocean, people-watching, Brazilian social vibe, sunset together"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Copacabana Palace",
                "city": "Rio de Janeiro",
                "stars": 5,
                "whyGoodForGroups": "Iconic luxury beachfront, rooftop bar, group dining, Carnival access, prime location"
            },
            {
                "name": "Tivoli Eco Resort Praia do Rosa",
                "city": "Santa Catarina",
                "stars": 5,
                "whyGoodForGroups": "Beach luxury, nature-focused, group activities, sustainable luxury"
            },
            {
                "name": "Cristalino Lodge",
                "city": "Cristalino, Amazon",
                "stars": 5,
                "whyGoodForGroups": "Amazon eco-lodge, all-inclusive with naturalist guides, canoe excursions, wildlife observation"
            }
        ]
    },
    {
        "slug": "portugal-trek",
        "title": "Portugal",
        "primaryDestinationCity": "Lisbon",
        "primaryDestinationCountry": "Portugal",
        "region": "Europe",
        "durationDays": 8,
        "roughBudgetUsd": 1680,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Portugal is Europe's undiscovered gem—warm, affordable, and deeply charming. Perfect for MBA groups seeking culture, wine, food, and history without the crowds of Spain/France. Lisbon is vibrant and walkable; Porto is romantic and riverside; Douro Valley is wine country perfection. Fado music captures Portuguese soul. Excellent food scene combining tradition with innovation. Best April-May or September-October. Highly recommended for groups seeking European sophistication at reasonable prices with authentic experiences.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in Madeira, Humberto Delgado ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Lisbon city",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Sintra",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Douro Valley Wine Tour",
                        "description": "Educational, scenic vineyards, sommelier guidance, shared tasting experience",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/portugal/hero.png",
                "alt": "Portugal Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Portugal is Europe's undiscovered gem—warm, affordable, and deeply charming. Perfect for MBA groups seeking culture, wine, food, and history without the crowds of Spain/France. Lisbon is vibrant and walkable; Porto is romantic and riverside; Douro Valley is wine country perfection. Fado music captures Portuguese soul. Excellent food scene combining tradition with innovation. Best April-May or September-October. Highly recommended for groups seeking European sophistication at reasonable prices with authentic experiences.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Europe"
        ],
        "logistics": {
            "bestSeason": "April-May, September-October",
            "visaNotes": "US citizens need Schengen visa or ETIAS; EU citizens visa-free",
            "dailyBudgetRange": "80-150",
            "primaryAirport": "Cristiano Ronaldo International (Madeira), Humberto Delgado (Lisbon)",
            "currency": "Euro (EUR)",
            "healthNotes": "Excellent healthcare. No vaccinations required.",
            "transport": {
                "airportToHotel": "Uber, taxis, pre-arranged shuttle",
                "withinCity": "Metro in Lisbon, buses, trams, Uber, taxis",
                "betweenDestinations": "Trains (efficient, comfortable), flights for distance, coaches for scenic routes"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, friendly, relaxed. Portuguese value personal relationships. Emotional expressiveness appreciated. Less formal than other European countries.",
            "businessEtiquette": "Handshakes standard. Business cards exchanged. Relationship-building over efficiency. Hierarchy respected but approachable.",
            "socialCustoms": "Family very important. Lunch is main meal (typically 1-3pm). Dinner late (8pm+). Sunday is family time. Fado music is cultural soul.",
            "diningNorms": "Meals are leisurely, social occasions. 10% tipping standard for good service. Coffee culture strong (morning espresso ritual)."
        },
        "groupBondingActivities": [
            {
                "activity": "Douro Valley Wine Tour",
                "durationHours": "6",
                "costPerPerson": "95",
                "whyItWorks": "Educational, scenic vineyards, sommelier guidance, shared tasting experience"
            },
            {
                "activity": "Fado Dinner Experience",
                "durationHours": "3",
                "costPerPerson": "65",
                "whyItWorks": "Intimate cultural moment, live music, traditional food, emotional connection"
            },
            {
                "activity": "Portuguese Cooking Class",
                "durationHours": "4",
                "costPerPerson": "55",
                "whyItWorks": "Hands-on learning, culinary collaboration, group meal at end"
            },
            {
                "activity": "Sintra Palace & Gardens Day",
                "durationHours": "8",
                "costPerPerson": "75",
                "whyItWorks": "Fairy-tale romance, hiking through gardens, historic exploration, picturesque villages"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Memmo Alfama Hotel",
                "city": "Lisbon",
                "stars": 5,
                "whyGoodForGroups": "Modern luxury in historic quarter, group dining, rooftop bar with Tagus views"
            },
            {
                "name": "The Vintage House Hotel",
                "city": "Douro Valley",
                "stars": 5,
                "whyGoodForGroups": "Wine country base, vineyard views, group tastings coordinated"
            },
            {
                "name": "Pestana Palace",
                "city": "Lisbon",
                "stars": 5,
                "whyGoodForGroups": "Historic palace hotel, group facilities, central Lisbon location"
            }
        ]
    },
    {
        "slug": "iceland-trek",
        "title": "Iceland",
        "primaryDestinationCity": "Reykjavik",
        "primaryDestinationCountry": "Iceland",
        "region": "Europe",
        "durationDays": 5,
        "roughBudgetUsd": 1680,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Iceland is a geological and natural wonder—perfect for MBA groups seeking dramatic landscapes and natural phenomena. Northern Lights (Sept-March) is iconic; midnight sun (June-Aug) alternative. Expensive but unforgettable. Blue Lagoon, Golden Circle, waterfalls, glaciers, ice caves—concentrated natural attractions. Warm hospitality despite reserved first impression. Luxury accommodations and food scene excellent. Best for adventurous groups seeking 'off the beaten path' Europe combined with comfort. Investment worthwhile for unique experiences.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in KEF",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Reykjavik",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Golden Circle (Geysir",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Northern Lights Hunting Tour",
                        "description": "Shared awe at natural wonder, group anticipation, unforgettable if lights appear, professional guides",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/iceland/hero.png",
                "alt": "Iceland Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Iceland is a geological and natural wonder—perfect for MBA groups seeking dramatic landscapes and natural phenomena. Northern Lights (Sept-March) is iconic; midnight sun (June-Aug) alternative. Expensive but unforgettable. Blue Lagoon, Golden Circle, waterfalls, glaciers, ice caves—concentrated natural attractions. Warm hospitality despite reserved first impression. Luxury accommodations and food scene excellent. Best for adventurous groups seeking 'off the beaten path' Europe combined with comfort. Investment worthwhile for unique experiences.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Europe"
        ],
        "logistics": {
            "bestSeason": "September-March (Northern Lights), June-August (midnight sun)",
            "visaNotes": "US citizens visa-free for 90 days; need ETIAS from 2025",
            "dailyBudgetRange": "150-250",
            "primaryAirport": "Keflavík International (KEF)",
            "currency": "Icelandic Króna (ISK)",
            "healthNotes": "Excellent healthcare. No vaccinations required.",
            "transport": {
                "airportToHotel": "Flybus shuttle (most common), rental car, pre-arranged pickup",
                "withinCity": "Buses in Reykjavik, car rental for countryside",
                "betweenDestinations": "Domestic flights for far distances, organized tours, rental 4x4 for winter"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Reserved initially but warm once you know them. Direct and honest. Icelandic pride in independence. Egalitarian culture—hierarchy minimal.",
            "businessEtiquette": "Handshakes formal. First names used quickly. Equality valued. Decisions can be slow but well-thought-out.",
            "socialCustoms": "Nature deeply respected. Punctuality important. Alcohol culture strong (expensive). Sunbathing and swimming in hot springs are social rituals.",
            "diningNorms": "Fresh seafood staple. Meals often simple but high-quality. 10% tipping expected. Coffee strong and frequent. Dinner around 7-8pm."
        },
        "groupBondingActivities": [
            {
                "activity": "Northern Lights Hunting Tour",
                "durationHours": "4",
                "costPerPerson": "80",
                "whyItWorks": "Shared awe at natural wonder, group anticipation, unforgettable if lights appear, professional guides"
            },
            {
                "activity": "Blue Lagoon Geothermal Spa",
                "durationHours": "2-3",
                "costPerPerson": "65",
                "whyItWorks": "Relaxing together in milky-blue waters, surreal landscape, year-round accessible"
            },
            {
                "activity": "Golden Circle Day Tour",
                "durationHours": "8",
                "costPerPerson": "110",
                "whyItWorks": "3 iconic experiences in one day, geysers and waterfalls together, high-energy adventure"
            },
            {
                "activity": "Glacier Ice Cave & Lagoon Exploration",
                "durationHours": "8",
                "costPerPerson": "150",
                "whyItWorks": "Unique adventure inside glacier, stunning lagoon with icebergs, professional guides, shared discovery"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Retreat Hotel",
                "city": "Reykjavik",
                "stars": 5,
                "whyGoodForGroups": "Modern luxury, Blue Lagoon proximity, geothermal heating, group dining options"
            },
            {
                "name": "Deplar Farm",
                "city": "North Iceland",
                "stars": 5,
                "whyGoodForGroups": "All-inclusive luxury lodge, group activities, waterfall/glacier access, remote nature"
            },
            {
                "name": "Geyser Geothermal Hotel",
                "city": "Haukadalur",
                "stars": 5,
                "whyGoodForGroups": "Golden Circle base, geothermal features, group-friendly, natural hot springs"
            }
        ]
    },
    {
        "slug": "greece-trek",
        "title": "Greece",
        "primaryDestinationCity": "Athens",
        "primaryDestinationCountry": "Greece",
        "region": "Europe",
        "durationDays": 8,
        "roughBudgetUsd": 1680,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Greece is Mediterranean romance personified—ancient history, island beauty, and warm hospitality. Perfect for MBA groups seeking culture, archaeology, beaches, and nightlife combined. Athens is foundational (Acropolis, Delphi, Meteora); island-hopping (Mykonos, Santorini) is iconic. Santorini offers romance; Mykonos offers nightlife; Naxos offers quiet charm. Excellent food and wine scene. May-June or Sept-Oct ideal (avoid August crowds). Budget-friendly with world-class experiences. Highly recommended for groups seeking complete Mediterranean experience with history, nature, and social atmosphere.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in ATH",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Athens Acropolis",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "ferry to Paros (traditional villages)",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Santorini Caldera Rim Hike",
                        "description": "Iconic shared experience, stunning views throughout, group pacing together, legendary sunset at Oia endpoint",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/greece/hero.png",
                "alt": "Greece Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Greece is Mediterranean romance personified—ancient history, island beauty, and warm hospitality. Perfect for MBA groups seeking culture, archaeology, beaches, and nightlife combined. Athens is foundational (Acropolis, Delphi, Meteora); island-hopping (Mykonos, Santorini) is iconic. Santorini offers romance; Mykonos offers nightlife; Naxos offers quiet charm. Excellent food and wine scene. May-June or Sept-Oct ideal (avoid August crowds). Budget-friendly with world-class experiences. Highly recommended for groups seeking complete Mediterranean experience with history, nature, and social atmosphere.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Europe"
        ],
        "logistics": {
            "bestSeason": "May-June, September-October",
            "visaNotes": "US citizens need ETIAS from 2025; Schengen visa or visa-free",
            "dailyBudgetRange": "100-180",
            "primaryAirport": "Athens International 'Eleftherios Venizelos' (ATH)",
            "currency": "Euro (EUR)",
            "healthNotes": "Good healthcare. No vaccinations required.",
            "transport": {
                "airportToHotel": "Taxis, Metro from Athens airport, pre-arranged shuttle",
                "withinCity": "Metro in Athens, buses, walking (especially island towns)",
                "betweenDestinations": "Ferries (frequent, scenic), internal flights for far islands, organized tours"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, expressive, passionate. Greeks value personal relationships and family. Direct conversation, animated discussions normal. Patriotic about culture/history.",
            "businessEtiquette": "Handshakes firm. Business cards important. Hierarchy respected but approachable. Relationship-building over efficiency.",
            "socialCustoms": "Family paramount. Siesta (2-4pm) still observed in some areas. Sunday important for family. Religion (Orthodox Church) influences culture.",
            "diningNorms": "Social dining is ritual. Long meals (2-3 hours). Tipping 10% standard. Ouzo/wine central to meals. Coffee culture strong (Greek coffee ritual)."
        },
        "groupBondingActivities": [
            {
                "activity": "Santorini Caldera Rim Hike",
                "durationHours": "3-4",
                "costPerPerson": "Free (or $60 guide)",
                "whyItWorks": "Iconic shared experience, stunning views throughout, group pacing together, legendary sunset at Oia endpoint"
            },
            {
                "activity": "Greek Island Sailing Cruise",
                "durationHours": "8",
                "costPerPerson": "150",
                "whyItWorks": "Group relaxation on deck, swimming coves, snorkeling, fresh seafood lunch together, sunset sailing"
            },
            {
                "activity": "Delphi & Meteora Guided Tour",
                "durationHours": "10",
                "costPerPerson": "120",
                "whyItWorks": "Ancient history shared learning, dramatic monastery locations, archaeological significance, scenic mountain drive"
            },
            {
                "activity": "Greek Wine Tasting & Dinner",
                "durationHours": "3",
                "costPerPerson": "80",
                "whyItWorks": "Santorini volcanic wines, local taverna meal, ouzo/Greek spirits, convivial Greek dining culture, sunset toasts"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Hotel Grande Bretagne",
                "city": "Athens",
                "stars": 5,
                "whyGoodForGroups": "Iconic luxury overlooking Acropolis, group dining, central Syntagma location, rooftop bar"
            },
            {
                "name": "Canaves Oia Suites",
                "city": "Santorini",
                "stars": 5,
                "whyGoodForGroups": "Caldera views, infinity pools, group spa facilities, sunset vantage point"
            },
            {
                "name": "Mykonos Blu",
                "city": "Mykonos",
                "stars": 5,
                "whyGoodForGroups": "Beach luxury, group beach access, nightlife proximity, Aegean views"
            }
        ]
    },
    {
        "slug": "croatia-trek",
        "title": "Croatia",
        "primaryDestinationCity": "Dubrovnik",
        "primaryDestinationCountry": "Croatia",
        "region": "Europe",
        "durationDays": 8,
        "roughBudgetUsd": 1850,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Croatia is the Adriatic's crown jewel—stunning coastline, medieval walled cities, island culture, and underrated wine/food scene. Dubrovnik is iconic (Game of Thrones) but crowded; smaller islands (Hvar, Korcula, Vis) offer authentic Mediterranean charm. Small-ship cruising is perfect for MBA groups seeking relaxation + adventure. Affordable, welcoming, and delivering major historical/cultural moments. May-June or Sept-Oct ideal (July-Aug too hot/crowded). Highly recommended for groups seeking European coastal beauty with authentic Balkan culture.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in ZAG Zagreb, Split Airport ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Split",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Hvar island",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Dalmatian Coastal Cruise & Island Hopping",
                        "description": "Shared sailing adventure, swimming coves, relaxation on deck, group meals",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/croatia/hero.png",
                "alt": "Croatia Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Croatia is the Adriatic's crown jewel—stunning coastline, medieval walled cities, island culture, and underrated wine/food scene. Dubrovnik is iconic (Game of Thrones) but crowded; smaller islands (Hvar, Korcula, Vis) offer authentic Mediterranean charm. Small-ship cruising is perfect for MBA groups seeking relaxation + adventure. Affordable, welcoming, and delivering major historical/cultural moments. May-June or Sept-Oct ideal (July-Aug too hot/crowded). Highly recommended for groups seeking European coastal beauty with authentic Balkan culture.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Europe"
        ],
        "logistics": {
            "bestSeason": "May-June, September-October",
            "visaNotes": "US citizens need ETIAS from 2025 or Schengen visa",
            "dailyBudgetRange": "80-150",
            "primaryAirport": "Franjo Tuđman (ZAG) Zagreb, Split Airport (SPU)",
            "currency": "Croatian Kuna (HRK)",
            "healthNotes": "Good healthcare. No vaccinations required.",
            "transport": {
                "airportToHotel": "Buses, taxis, pre-arranged transfers",
                "withinCity": "Buses, taxis, walking (especially Dubrovnik Old Town)",
                "betweenDestinations": "Ferries (scenic), boats (tours), buses, internal flights for distance"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, hospitable, direct. Strong national pride post-independence. Family-focused culture. Mediterranean relaxation attitudes.",
            "businessEtiquette": "Handshakes formal. Business cards exchanged. Relationship-building important. Hierarchy respected but approachable.",
            "socialCustoms": "Family paramount. Coffee culture central. Dinner late (8-9pm). Tourism-savvy population. War history sensitive but discussed openly.",
            "diningNorms": "Meals leisurely. Seafood central to coast culture. 10% tipping standard. Wine and rakija (brandy) important socially."
        },
        "groupBondingActivities": [
            {
                "activity": "Dalmatian Coastal Cruise & Island Hopping",
                "durationHours": "8",
                "costPerPerson": "120",
                "whyItWorks": "Shared sailing adventure, swimming coves, relaxation on deck, group meals"
            },
            {
                "activity": "Dubrovnik Wall Walk Tour",
                "durationHours": "2-3",
                "costPerPerson": "35",
                "whyItWorks": "Iconic shared experience, incredible views, leisurely pace, photo opportunities"
            },
            {
                "activity": "Mostar Day Trip & Bosnian Experience",
                "durationHours": "8",
                "costPerPerson": "85",
                "whyItWorks": "Cultural immersion, UNESCO bridge, coffee ceremony, neighboring country adventure"
            },
            {
                "activity": "Wine & Olive Oil Tasting (Korcula)",
                "durationHours": "3",
                "costPerPerson": "70",
                "whyItWorks": "Educational tasting, local producers, island setting, shared appreciation"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Hilton Imperial Dubrovnik",
                "city": "Dubrovnik",
                "stars": 5,
                "whyGoodForGroups": "Old Town location, sea views, group dining, central position"
            },
            {
                "name": "Villa Koruna",
                "city": "Korcula",
                "stars": 5,
                "whyGoodForGroups": "Harborfront, group packages, wine region access, intimate"
            },
            {
                "name": "Hotel Luxe",
                "city": "Split",
                "stars": 5,
                "whyGoodForGroups": "Diocletian's Palace nearby, waterfront promenade, group-friendly"
            }
        ]
    },
    {
        "slug": "scotland-trek",
        "title": "Scotland",
        "primaryDestinationCity": "Edinburgh",
        "primaryDestinationCountry": "Scotland",
        "region": "Europe",
        "durationDays": 5,
        "roughBudgetUsd": 1280,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Scotland is wild, historic, and enchanting—perfect for MBA groups seeking dramatic landscapes + cultural depth. Isle of Skye is magical; Highlands offer serious adventure; Edinburgh blends history with nightlife. Jacobite Steam Train (Hogwarts Express) iconic. Loch Ness mystery fun. Excellent whisky culture and food scene. May-Sept ideal (warmest, long daylight). Ceilidh dancing a must-do group activity. Highly recommended for groups seeking rugged nature, historical immersion, and lively Scottish hospitality.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in EDI, Glasgow Airport ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Edinburgh",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Stirling Castle",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Isle of Skye Full-Day Exploration",
                        "description": "Magical landscape shared experience, hikes together, photo moments, natural wonder",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/scotland/hero.png",
                "alt": "Scotland Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Scotland is wild, historic, and enchanting—perfect for MBA groups seeking dramatic landscapes + cultural depth. Isle of Skye is magical; Highlands offer serious adventure; Edinburgh blends history with nightlife. Jacobite Steam Train (Hogwarts Express) iconic. Loch Ness mystery fun. Excellent whisky culture and food scene. May-Sept ideal (warmest, long daylight). Ceilidh dancing a must-do group activity. Highly recommended for groups seeking rugged nature, historical immersion, and lively Scottish hospitality.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Europe"
        ],
        "logistics": {
            "bestSeason": "May-September (summer), December (Christmas markets)",
            "visaNotes": "UK citizen rights apply; US citizens need ETIAS from 2025",
            "dailyBudgetRange": "100-200",
            "primaryAirport": "Edinburgh Airport (EDI), Glasgow Airport (GLA)",
            "currency": "British Pound Sterling (GBP)",
            "healthNotes": "Excellent healthcare. No vaccinations required.",
            "transport": {
                "airportToHotel": "Buses, taxis, pre-arranged transfers",
                "withinCity": "Buses, taxis, walking (Edinburgh very walkable)",
                "betweenDestinations": "Coaches/buses (common for tours), trains, rental cars for flexibility"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Friendly, witty, proud of independence. Dark humor appreciated. Direct speech. Warm despite reserved first impression. Strong regional identity.",
            "businessEtiquette": "Handshakes firm. First names used quickly. Egalitarian culture. Respect for local traditions and history.",
            "socialCustoms": "Ceilidh dancing is social ritual. Whisky culture central. Football (soccer) passion. Burns Night (Jan 25) important. Independence movements significant.",
            "diningNorms": "Meals hearty. Haggis iconic (organ meat dish). Seafood excellent (smoked salmon). Fish & chips beloved. 10% tipping standard. Coffee/tea central."
        },
        "groupBondingActivities": [
            {
                "activity": "Isle of Skye Full-Day Exploration",
                "durationHours": "8-10",
                "costPerPerson": "80",
                "whyItWorks": "Magical landscape shared experience, hikes together, photo moments, natural wonder"
            },
            {
                "activity": "Jacobite Steam Train + Glenfinnan Viaduct",
                "durationHours": "2",
                "costPerPerson": "95",
                "whyItWorks": "Harry Potter connection, iconic ride, shared experience, scenic views together"
            },
            {
                "activity": "Loch Ness Cruise & Castle Visit",
                "durationHours": "3",
                "costPerPerson": "65",
                "whyItWorks": "Mystery hunting together, cruise relaxation, history exploration, group energy"
            },
            {
                "activity": "Whisky Distillery Tour & Traditional Ceilidh",
                "durationHours": "4",
                "costPerPerson": "85",
                "whyItWorks": "Whisky education, tasting together, ceilidh dancing (group participation), cultural immersion"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "The Balmoral Hotel",
                "city": "Edinburgh",
                "stars": 5,
                "whyGoodForGroups": "Royal Mile location, castle views, group dining, historic"
            },
            {
                "name": "Portree Hotel",
                "city": "Isle of Skye",
                "stars": 4,
                "whyGoodForGroups": "Skye hub, group base, local character, harbor location"
            },
            {
                "name": "Loch Ness Lodge",
                "city": "Inverness/Loch Ness",
                "stars": 4,
                "whyGoodForGroups": "Loch-side base, Highlands access, group activities, whisky nearby"
            }
        ]
    },
    {
        "slug": "turkey-trek",
        "title": "Turkey",
        "primaryDestinationCity": "Istanbul",
        "primaryDestinationCountry": "Turkey",
        "region": "Europe/Middle East (Transcontinental)",
        "durationDays": 9,
        "roughBudgetUsd": 2150,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Turkey is a transcontinental bridge—rich history, dramatic landscapes, and vibrant culture. Istanbul is chaotic/magical; Cappadocia is otherworldly (fairy chimneys, caves, hot-air balloons); Ephesus is archaeological treasure; Pamukkale is natural wonder. Hot-air balloon sunrise iconic. Excellent food scene and hospitality culture. Budget-friendly with world-class experiences. April-May or Sept-Oct ideal. Perfect for groups seeking history, adventure, and cross-cultural immersion. Highly recommended.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in IST, Sabiha Gökçen ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Istanbul Hagia Sophia/Blue Mosque",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Ephesus ancient city",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Cappadocia Hot Air Balloon Sunrise",
                        "description": "Magical shared moment, stunning views, group excitement, unforgettable experience",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/turkey/hero.png",
                "alt": "Turkey Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Turkey is a transcontinental bridge—rich history, dramatic landscapes, and vibrant culture. Istanbul is chaotic/magical; Cappadocia is otherworldly (fairy chimneys, caves, hot-air balloons); Ephesus is archaeological treasure; Pamukkale is natural wonder. Hot-air balloon sunrise iconic. Excellent food scene and hospitality culture. Budget-friendly with world-class experiences. April-May or Sept-Oct ideal. Perfect for groups seeking history, adventure, and cross-cultural immersion. Highly recommended.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Europe/Middle East (Transcontinental)"
        ],
        "logistics": {
            "bestSeason": "April-May, September-October",
            "visaNotes": "US citizens need e-Visa (Turkey eVisa online, ~$20, instant approval)",
            "dailyBudgetRange": "70-150",
            "primaryAirport": "Istanbul Airport (IST), Sabiha Gökçen (SAW)",
            "currency": "Turkish Lira (TRY)",
            "healthNotes": "Good healthcare in major cities. Recommended: Hepatitis A/B, tetanus, rabies.",
            "transport": {
                "airportToHotel": "Buses, taxis (metered), pre-arranged transfers",
                "withinCity": "Istanbul Metro/taxis/buses, Istanbulkart money-saving card",
                "betweenDestinations": "Domestic flights (Istanbul to Cappadocia), overnight buses (common), car rental options"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, hospitable, enthusiastic. Haggling cultural in bazaars. Relationship-building valued. Direct but respectful. Pride in Turkish history.",
            "businessEtiquette": "Handshakes formal. Business cards exchanged. Hierarchy respected. Building personal relationships important before business.",
            "socialCustoms": "Tea/coffee ritual central to life. Hospitality paramount (guests treated like family). Prayer times affect business. Conservative outside major cities.",
            "diningNorms": "Meals social events. Kebabs iconic. Turkish coffee/tea ceremonies important. 10% tipping standard. Meals leisurely, late dinner (8-9pm)."
        },
        "groupBondingActivities": [
            {
                "activity": "Cappadocia Hot Air Balloon Sunrise",
                "durationHours": "4",
                "costPerPerson": "180",
                "whyItWorks": "Magical shared moment, stunning views, group excitement, unforgettable experience"
            },
            {
                "activity": "Istanbul Grand Bazaar & Turkish Coffee Ceremony",
                "durationHours": "4",
                "costPerPerson": "45",
                "whyItWorks": "Sensory immersion, haggling/shopping together, traditional ceremony, cultural bonding"
            },
            {
                "activity": "Cappadocia Valley Hiking with Cave Villages",
                "durationHours": "5",
                "costPerPerson": "65",
                "whyItWorks": "Physical challenge, otherworldly landscape shared experience, adventure bonding"
            },
            {
                "activity": "Pamukkale Travertine Pools & Cleopatra Bath",
                "durationHours": "3-4",
                "costPerPerson": "75",
                "whyItWorks": "Swimming together in thermal pools, healing waters, natural wonder, relaxation + nature combo"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Four Seasons Hotel Sultanahmet",
                "city": "Istanbul",
                "stars": 5,
                "whyGoodForGroups": "Old City location, Blue Mosque views, luxury group facilities, Ottoman bathhouse"
            },
            {
                "name": "Cappadocia Cave Resort",
                "city": "Cappadocia",
                "stars": 5,
                "whyGoodForGroups": "Cave suites unique experience, group packages, fairy chimney views, special atmosphere"
            },
            {
                "name": "Hilton Kusadasi",
                "city": "Kusadasi",
                "stars": 5,
                "whyGoodForGroups": "Ephesus gateway, beach access, group dining, strategic location"
            }
        ]
    },
    {
        "slug": "berlin-trek",
        "title": "Berlin",
        "primaryDestinationCity": "Berlin",
        "primaryDestinationCountry": "Berlin",
        "region": "Europe",
        "durationDays": 5,
        "roughBudgetUsd": 1180,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Berlin is Europe's most historically significant city—divided past, Cold War legacy, Nazi history, and contemporary reinvention. Perfect for MBA groups seeking serious history combined with edgy modernity. East Side Gallery iconic. Sachsenhausen essential. World-class museums (Pergamon, Neues). Excellent nightlife. Affordable. Direct communication style. April-May or Sept-Oct ideal. Highly recommended for intellectually curious groups.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in BER",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Berlin Wall East Side Gallery",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "WWII sites",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "East Side Gallery Street Art + Wall Walk",
                        "description": "Powerful shared historical moment, open-air gallery, colorful backgrounds for photos, emotional connection",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/berlin/hero.png",
                "alt": "Berlin Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Berlin is Europe's most historically significant city—divided past, Cold War legacy, Nazi history, and contemporary reinvention. Perfect for MBA groups seeking serious history combined with edgy modernity. East Side Gallery iconic. Sachsenhausen essential. World-class museums (Pergamon, Neues). Excellent nightlife. Affordable. Direct communication style. April-May or Sept-Oct ideal. Highly recommended for intellectually curious groups.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Europe"
        ],
        "logistics": {
            "bestSeason": "April-May, September-October",
            "visaNotes": "US citizens need ETIAS from 2025; Germany is Schengen",
            "dailyBudgetRange": "70-120",
            "primaryAirport": "Berlin Brandenburg (BER)",
            "currency": "Euro (EUR)",
            "healthNotes": "Excellent healthcare. No vaccinations required.",
            "transport": {
                "airportToHotel": "S-Bahn train (excellent), taxis, shuttles",
                "withinCity": "Excellent U-Bahn metro, S-Bahn, buses, bike rentals, walking",
                "betweenDestinations": "Trains (fast, efficient), buses"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Direct, punctual, efficient. Dark humor appreciated. Intellectual rigor valued. Emotional reserve maintained. Straightforward business etiquette.",
            "businessEtiquette": "Handshakes firm. Titles and last names important. Hierarchy respected. Meetings start/end on time (punctuality crucial). Efficient + purposeful.",
            "socialCustoms": "Coffee/beer culture important. History is serious topic (WWII/Cold War). Environmental consciousness high. Techno music & nightlife famous. Direct criticism normal.",
            "diningNorms": "Schnitzel iconic. Bread variety extensive. Breakfast hearty. Dinner smaller than lunch. Rounding up bills for tips (~5-10%). Strict dining hours."
        },
        "groupBondingActivities": [
            {
                "activity": "East Side Gallery Street Art + Wall Walk",
                "durationHours": "2-3",
                "costPerPerson": "0",
                "whyItWorks": "Powerful shared historical moment, open-air gallery, colorful backgrounds for photos, emotional connection"
            },
            {
                "activity": "Sachsenhausen Concentration Camp (Guided Group Tour)",
                "durationHours": "5",
                "costPerPerson": "70",
                "whyItWorks": "Serious group learning, historical education, respectful group reflection, deeper understanding"
            },
            {
                "activity": "Reichstag Dome + Parliament Debate",
                "durationHours": "2",
                "costPerPerson": "15",
                "whyItWorks": "Iconic architecture, democratic symbol, city views together, accessible entry"
            },
            {
                "activity": "Underground Electronic Music Club Tour",
                "durationHours": "4",
                "costPerPerson": "45",
                "whyItWorks": "Berlin nightlife energy, group dancing, alternative culture experience, memorable night out"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Adlon Kempinski",
                "city": "Berlin",
                "stars": 5,
                "whyGoodForGroups": "Brandenburg Gate location, luxury, group dining, iconic"
            },
            {
                "name": "The Westin Grand Berlin",
                "city": "Berlin",
                "stars": 5,
                "whyGoodForGroups": "Mitte district, modern luxury, group facilities"
            },
            {
                "name": "Hotel de Rome",
                "city": "Berlin",
                "stars": 5,
                "whyGoodForGroups": "Central location, luxury ambiance, roof terrace views"
            }
        ]
    },
    {
        "slug": "spain-trek",
        "title": "Spain",
        "primaryDestinationCity": "Madrid",
        "primaryDestinationCountry": "Spain",
        "region": "Europe",
        "durationDays": 7,
        "roughBudgetUsd": 1420,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Spain is passion incarnate—flamenco, tapas, Moorish palaces, Gaudí's surrealism, world-class art. Perfect for MBA groups seeking culture + nightlife + food + history. Alhambra iconic. Flamenco unforgettable. Sagrada Familia architectural marvel (completing 2026). Regional diversity (Andalusia, Catalonia, Basque). April-May or Sept-Oct ideal. Highly recommended for culturally curious, socially engaged groups.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in MAD, Barcelona ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Madrid art museums",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Granada Alhambra palace",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Flamenco Show with Traditional Dinner",
                        "description": "Spanish passion shared experience, live music/dance, group dinner, cultural immersion",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/spain/hero.png",
                "alt": "Spain Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Spain is passion incarnate—flamenco, tapas, Moorish palaces, Gaudí's surrealism, world-class art. Perfect for MBA groups seeking culture + nightlife + food + history. Alhambra iconic. Flamenco unforgettable. Sagrada Familia architectural marvel (completing 2026). Regional diversity (Andalusia, Catalonia, Basque). April-May or Sept-Oct ideal. Highly recommended for culturally curious, socially engaged groups.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Europe"
        ],
        "logistics": {
            "bestSeason": "April-May, September-October",
            "visaNotes": "US citizens need ETIAS from 2025; EU Schengen",
            "dailyBudgetRange": "80-150",
            "primaryAirport": "Madrid (MAD), Barcelona (BCN)",
            "currency": "Euro (EUR)",
            "healthNotes": "Excellent healthcare. No vaccinations required.",
            "transport": {
                "airportToHotel": "Buses, trains (AVE high-speed), taxis",
                "withinCity": "Metro excellent (Madrid, Barcelona), buses, taxis, walking",
                "betweenDestinations": "Trains (fast AVE), flights for distance, buses"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Passionate, expressive, warm. Gesticulation important. High-context communication. Family & personal relationships prioritized. Animated discussions normal.",
            "businessEtiquette": "Handshakes formal. Hierarchy respected. Building personal relationships before business important. Meals are social occasions (not rushed).",
            "socialCustoms": "Dinner late (8-9pm). Siestas still observed in some areas. Fiesta culture important (fiestas nationwide). Religion (Catholicism) influences traditions. Independence movements (Catalonia) sensitive.",
            "diningNorms": "Meals leisurely, 2-3 hours common. Tapas are social dining. Wine central to meals. 10% tipping standard. Conversation during meals important."
        },
        "groupBondingActivities": [
            {
                "activity": "Flamenco Show with Traditional Dinner",
                "durationHours": "3",
                "costPerPerson": "70",
                "whyItWorks": "Spanish passion shared experience, live music/dance, group dinner, cultural immersion"
            },
            {
                "activity": "Paella Cooking Class + Group Meal",
                "durationHours": "3",
                "costPerPerson": "55",
                "whyItWorks": "Hands-on learning, culinary collaboration, group meal, authentic recipe mastery"
            },
            {
                "activity": "Alhambra Palace Full Tour",
                "durationHours": "4",
                "costPerPerson": "50",
                "whyItWorks": "Stunning shared experience, Islamic architecture wonder, historical education, group photos"
            },
            {
                "activity": "Tapas Bar Crawl with Local Guide",
                "durationHours": "3",
                "costPerPerson": "40",
                "whyItWorks": "Spanish social dining culture, food tasting together, local insights, group bonding in bars"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "The Principal Madrid",
                "city": "Madrid",
                "stars": 5,
                "whyGoodForGroups": "Gran Via location, luxury, group dining, iconic Madrid"
            },
            {
                "name": "Mandarin Oriental Barcelona",
                "city": "Barcelona",
                "stars": 5,
                "whyGoodForGroups": "Passeig de Gracia, sea views, group facilities, Gaudí proximity"
            },
            {
                "name": "Hotel Alfonso XIII",
                "city": "Seville",
                "stars": 5,
                "whyGoodForGroups": "Andalusia flagship, historic, flamenco culture, group-friendly"
            }
        ]
    },
    {
        "slug": "south-africa-trek",
        "title": "South Africa",
        "primaryDestinationCity": "Kruger area",
        "primaryDestinationCountry": "South Africa",
        "region": "Africa",
        "durationDays": 9,
        "roughBudgetUsd": 2450,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "South Africa is Africa's most accessible safari + adventure destination—perfect for MBA groups. Kruger National Park world-famous (Big Five almost guaranteed). Cape Town is vibrant, sophisticated city. Excellent food/wine (Stellenbosch). Wildlife immersion unforgettable. Ubuntu hospitality warm. June-September ideal (dry, cool, best wildlife viewing). Highly recommended for adventure-seeking groups combining serious safari with city culture.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in JNB, Cape Town ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Cape Town Table Mountain",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Kruger full-day safari",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Kruger Full-Day Safari Game Drive",
                        "description": "Shared wildlife awe, Big Five search together, expert guide insights, unforgettable moments",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/south-africa/hero.png",
                "alt": "South Africa Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "South Africa is Africa's most accessible safari + adventure destination—perfect for MBA groups. Kruger National Park world-famous (Big Five almost guaranteed). Cape Town is vibrant, sophisticated city. Excellent food/wine (Stellenbosch). Wildlife immersion unforgettable. Ubuntu hospitality warm. June-September ideal (dry, cool, best wildlife viewing). Highly recommended for adventure-seeking groups combining serious safari with city culture.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Africa"
        ],
        "logistics": {
            "bestSeason": "June-September (dry, cool, best wildlife)",
            "visaNotes": "US citizens visa-free for 90 days (passport must be valid 6 months)",
            "dailyBudgetRange": "130-250",
            "primaryAirport": "Johannesburg (JNB), Cape Town (CPT)",
            "currency": "South African Rand (ZAR)",
            "healthNotes": "Good healthcare in major cities. Malaria risk in certain areas. Consider prophylaxis. Yellow fever vaccination recommended.",
            "transport": {
                "airportToHotel": "Shuttles, pre-arranged transfers, Uber",
                "withinCity": "Uber, taxis, buses, walking (Cape Town)",
                "betweenDestinations": "Domestic flights (long distances), 4x4 safari vehicles, coaches"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, hospitable, Ubuntu (interconnectedness) philosophy. Direct but respectful. Rainbow nation diversity creates openness. Personal relationships valued. Infectious energy.",
            "businessEtiquette": "Handshakes warm. First names used quickly. Relationship-building before business important. Hierarchy respected but approachable. Equality values strong.",
            "socialCustoms": "Family paramount. Rainbow nation celebrates diversity. Ubuntu philosophy: humanity toward others. Apartheid history sensitive but openly discussed. Nature/wildlife respected.",
            "diningNorms": "Braai is sacred social ritual. Meat-centric cuisine. Friendly, informal meals. Group dining important. 10% tipping standard. Wine culture strong (Cape wine regions)."
        },
        "groupBondingActivities": [
            {
                "activity": "Kruger Full-Day Safari Game Drive",
                "durationHours": "8",
                "costPerPerson": "200",
                "whyItWorks": "Shared wildlife awe, Big Five search together, expert guide insights, unforgettable moments"
            },
            {
                "activity": "Traditional Braai Dinner with Local Family",
                "durationHours": "3",
                "costPerPerson": "85",
                "whyItWorks": "Cultural immersion, cooking together, South African tradition, family hospitality, group bonding"
            },
            {
                "activity": "Table Mountain Hike or Cable Car Experience",
                "durationHours": "3-4",
                "costPerPerson": "30",
                "whyItWorks": "Iconic landmark shared experience, 360° views, physical challenge option, group photos"
            },
            {
                "activity": "Bush Walk with Tracker Guide",
                "durationHours": "4",
                "costPerPerson": "100",
                "whyItWorks": "Intimate group wildlife encounter, tracker expertise, slow immersion in nature, shared discovery moments"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Singita Lodges",
                "city": "Kruger area",
                "stars": 5,
                "whyGoodForGroups": "Ultra-luxury safari lodge, intimate, exclusive experiences, wildlife access"
            },
            {
                "name": "Table Bay Hotel",
                "city": "Cape Town",
                "stars": 5,
                "whyGoodForGroups": "Table Mountain views, waterfront, group facilities, iconic"
            },
            {
                "name": "The Conservancy Tented Camp",
                "city": "Kruger",
                "stars": 5,
                "whyGoodForGroups": "Premium safari camp, group dining, expert guides, immersive experience"
            }
        ]
    },
    {
        "slug": "kenya-trek",
        "title": "Kenya",
        "primaryDestinationCity": "Masai Mara",
        "primaryDestinationCountry": "Kenya",
        "region": "Africa",
        "durationDays": 5,
        "roughBudgetUsd": 1750,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Kenya is Africa's safari capital—Masai Mara is non-negotiable for Big Five and Great Migration (July-Oct). Iconic wildlife experience with professional guides, luxury lodges, and genuine Maasai culture. Hot air balloons at sunrise are bucket-list experiences. Affordable luxury compared to other African safaris. Visa required but simple online process. June-Oct ideal for dry season visibility. Highly recommended for groups seeking world-class wildlife adventure with cultural immersion.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in NBO Nairobi",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Masai Mara game drives (Big Five)",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "flamingos at Lake Nakuru",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Group Game Drive in Masai Mara",
                        "description": "Shared wildlife searching, excitement when Big Five spotted, professional guides build camaraderie",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/kenya/hero.png",
                "alt": "Kenya Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Kenya is Africa's safari capital—Masai Mara is non-negotiable for Big Five and Great Migration (July-Oct). Iconic wildlife experience with professional guides, luxury lodges, and genuine Maasai culture. Hot air balloons at sunrise are bucket-list experiences. Affordable luxury compared to other African safaris. Visa required but simple online process. June-Oct ideal for dry season visibility. Highly recommended for groups seeking world-class wildlife adventure with cultural immersion.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Africa"
        ],
        "logistics": {
            "bestSeason": "June-October (dry), January-March (short dry)",
            "visaNotes": "US citizens need e-Visa (online, ~$50, instant). Tourist visa 90 days.",
            "dailyBudgetRange": "100-250",
            "primaryAirport": "Jomo Kenyatta International (NBO) Nairobi",
            "currency": "Kenyan Shilling (KES)",
            "healthNotes": "Yellow fever vaccination recommended. Malaria prophylaxis for certain areas.",
            "transport": {
                "airportToHotel": "Shuttle buses, taxis, pre-arranged transfers (recommended)",
                "withinCity": "Taxis, Uber, buses, walking in safe areas",
                "betweenDestinations": "Internal flights (Nairobi to Mara common), road transfers, safari vehicles"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, friendly, direct. English widely spoken. Business handshakes formal. Proud of wildlife conservation.",
            "businessEtiquette": "Respect hierarchy. Handshakes formal with both hands appreciated. Punctuality valued though 'African time' exists.",
            "socialCustoms": "Family-oriented. Ubuntu philosophy (shared humanity). Greetings important. Wildlife respect paramount.",
            "diningNorms": "Nyama choma (grilled meat) iconic. Ugali (corn staple) common. Chai (tea) social ritual. Tipping 10% appreciated."
        },
        "groupBondingActivities": [
            {
                "activity": "Group Game Drive in Masai Mara",
                "durationHours": "4-8",
                "costPerPerson": "0",
                "whyItWorks": "Shared wildlife searching, excitement when Big Five spotted, professional guides build camaraderie"
            },
            {
                "activity": "Hot Air Balloon Safari at Sunrise",
                "durationHours": "4",
                "costPerPerson": "400",
                "whyItWorks": "Magical shared moment floating over wildlife, champagne breakfast together, unforgettable photos"
            },
            {
                "activity": "Maasai Village Cultural Visit",
                "durationHours": "2-3",
                "costPerPerson": "35",
                "whyItWorks": "Cultural exchange together, warrior dances, jewelry trading, learning shared history"
            },
            {
                "activity": "Picnic Lunch by Mara River",
                "durationHours": "1-2",
                "costPerPerson": "0",
                "whyItWorks": "Shared meal in wilderness, hippo/croc watching from shore, relaxation + nature combo"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Serena Safari Lodge",
                "city": "Masai Mara",
                "stars": 5,
                "whyGoodForGroups": "Inside park, group dining, game drives, all-inclusive"
            },
            {
                "name": "Tamarind Group Hotel",
                "city": "Nairobi",
                "stars": 4,
                "whyGoodForGroups": "Pre/post-safari base, group-friendly, safe location"
            },
            {
                "name": "Lake Naivasha Sopa Resort",
                "city": "Lake Naivasha",
                "stars": 4,
                "whyGoodForGroups": "Wildlife access, group activities, boat safaris"
            }
        ]
    },
    {
        "slug": "morocco-trek",
        "title": "Morocco",
        "primaryDestinationCity": "Marrakech",
        "primaryDestinationCountry": "Morocco",
        "region": "Africa/Europe (Transcontinental)",
        "durationDays": 8,
        "roughBudgetUsd": 1680,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Morocco is North Africa's cultural crown—medinas are magical mazes, Sahara desert is iconic bucket-list, mountain villages are charming. Casablanca, Fez, Marrakech offer authentic culture; Sahara desert camping is unforgettable. Affordable with world-class experiences. April-May or Sept-Oct ideal (extreme heat summer, cold desert winter). Visa-free for US citizens (90 days). Perfect for MBA groups seeking North African adventure, culture, food, history. Highly recommended.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in RAK, Casablanca ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Casablanca Hassan II Mosque",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Fes medina",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Sahara Desert Camel Trek & Camp Night",
                        "description": "Magical shared desert experience, camel riding together, fire/music/food under stars, unforgettable bonding",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/morocco/hero.png",
                "alt": "Morocco Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Morocco is North Africa's cultural crown—medinas are magical mazes, Sahara desert is iconic bucket-list, mountain villages are charming. Casablanca, Fez, Marrakech offer authentic culture; Sahara desert camping is unforgettable. Affordable with world-class experiences. April-May or Sept-Oct ideal (extreme heat summer, cold desert winter). Visa-free for US citizens (90 days). Perfect for MBA groups seeking North African adventure, culture, food, history. Highly recommended.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Africa/Europe (Transcontinental)"
        ],
        "logistics": {
            "bestSeason": "April-May, September-October",
            "visaNotes": "US citizens visa-free for 90 days. Turkey/EU entry approved.",
            "dailyBudgetRange": "80-150",
            "primaryAirport": "Marrakech Menara (RAK), Casablanca (CMN)",
            "currency": "Moroccan Dirham (MAD)",
            "healthNotes": "No vaccinations required. Hepatitis A/B recommended. Tap water generally safe in cities.",
            "transport": {
                "airportToHotel": "Buses, grand taxis (shared), pre-arranged transfers",
                "withinCity": "Walking (medinas pedestrian), buses, taxis, petit taxis (shared)",
                "betweenDestinations": "Buses (comfortable, cheap), trains (scenic but slow), internal flights (quick)"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, hospitable, relationship-focused. Haggling expected in souks. French spoken alongside Arabic. Direct eye contact respectful.",
            "businessEtiquette": "Handshakes formal. Hierarchy respected. Building trust/relationships important before business. Conservative outside tourist areas.",
            "socialCustoms": "Family paramount. Islam significant but Morocco liberal. Hospitality sacred. Shared meals important social ritual.",
            "diningNorms": "Eat with hands (right hand only). Tagines iconic slow-cooked stews. Couscous Fridays traditional. Mint tea ritualistic. Tipping 10% appreciated."
        },
        "groupBondingActivities": [
            {
                "activity": "Sahara Desert Camel Trek & Camp Night",
                "durationHours": "10",
                "costPerPerson": "150",
                "whyItWorks": "Magical shared desert experience, camel riding together, fire/music/food under stars, unforgettable bonding"
            },
            {
                "activity": "Medina Walking Tour (Fez or Marrakech)",
                "durationHours": "4",
                "costPerPerson": "40",
                "whyItWorks": "Getting lost together in chaotic medinas, shared discoveries, haggling for souvenirs, cultural immersion"
            },
            {
                "activity": "Djemaa el-Fna Street Food Experience",
                "durationHours": "2-3",
                "costPerPerson": "20-30",
                "whyItWorks": "Group food exploration, sharing tagines/couscous, street performers, vibrant energy, sensory overload"
            },
            {
                "activity": "Ait Benhaddou & Todra Valley Adventure",
                "durationHours": "8",
                "costPerPerson": "100",
                "whyItWorks": "UNESCO site exploration, dramatic gorge hiking, mountain scenery, shared adventure photography"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "La Mamounia Marrakech",
                "city": "Marrakech",
                "stars": 5,
                "whyGoodForGroups": "Iconic palace hotel, gardens, group dining, Djemaa el-Fna location"
            },
            {
                "name": "Riad Karmela",
                "city": "Fez",
                "stars": 4,
                "whyGoodForGroups": "Traditional riad, medina location, group breakfast, authentic experience"
            },
            {
                "name": "Tiziri Desert Camp",
                "city": "Erg Chebbi (Merzouga)",
                "stars": 4,
                "whyGoodForGroups": "Bedouin camp experience, camel treks, stars, group dining, music"
            }
        ]
    },
    {
        "slug": "uae-trek",
        "title": "UAE",
        "primaryDestinationCity": "Dubai",
        "primaryDestinationCountry": "UAE",
        "region": "Middle East",
        "durationDays": 1,
        "roughBudgetUsd": "90-150",
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "UAE is ultramodern Middle East—Dubai is luxury, excess, innovation; Abu Dhabi is cultural sophistication. Desert safaris are iconic experiences (dune bashing, camps, BBQ under stars). Perfect blend of modern attractions (Burj Khalifa, malls) + desert adventure + culture. English widely spoken, safe, efficient. November-March ideal (avoid summer 50°C heat). Visa-free entry. Excellent infrastructure. Expensive but worth it for groups seeking modern luxury + authentic desert. Highly recommended for groups seeking adventure + glamour + culture combo.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in DXB, Abu Dhabi International ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "4x4 dune bashing",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "sunset stop",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Evening Desert Safari & Bedouin Camp",
                        "description": "Thrilling dune bashing together, camel ride, stargazing under stars, group BBQ/shows, cultural immersion bonding",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/uae/hero.png",
                "alt": "UAE Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "UAE is ultramodern Middle East—Dubai is luxury, excess, innovation; Abu Dhabi is cultural sophistication. Desert safaris are iconic experiences (dune bashing, camps, BBQ under stars). Perfect blend of modern attractions (Burj Khalifa, malls) + desert adventure + culture. English widely spoken, safe, efficient. November-March ideal (avoid summer 50°C heat). Visa-free entry. Excellent infrastructure. Expensive but worth it for groups seeking modern luxury + authentic desert. Highly recommended for groups seeking adventure + glamour + culture combo.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Middle East"
        ],
        "logistics": {
            "bestSeason": "November-March (perfect weather, not extreme heat)",
            "visaNotes": "US citizens visa-free for 30 days (on arrival)",
            "dailyBudgetRange": "150-250",
            "primaryAirport": "Dubai International (DXB), Abu Dhabi International (AUH)",
            "currency": "UAE Dirham (AED)",
            "healthNotes": "Excellent healthcare. No vaccinations required. Very safe.",
            "transport": {
                "airportToHotel": "Buses, taxis, pre-arranged transfers",
                "withinCity": "Metro (Dubai), buses, taxis, Uber, walking in malls",
                "betweenDestinations": "Flights within UAE (Abu Dhabi-Dubai 1hr), buses (comfortable), car rentals"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Formal initially, warm with relationships. English widely understood. Business handshakes with right hand. Respect for Islam important.",
            "businessEtiquette": "Handshakes formal. Hierarchy respected. Building relationships first. Conservative dress in public.",
            "socialCustoms": "Islam influences culture but UAE liberal compared to region. Modesty respected. Family important. Alcohol in hotels OK.",
            "diningNorms": "Arabic coffee ritual. Iftar (Ramadan breaking fast) important cultural event. Group dining social. Tipping 10-15% in restaurants."
        },
        "groupBondingActivities": [
            {
                "activity": "Evening Desert Safari & Bedouin Camp",
                "durationHours": "6",
                "costPerPerson": "110",
                "whyItWorks": "Thrilling dune bashing together, camel ride, stargazing under stars, group BBQ/shows, cultural immersion bonding"
            },
            {
                "activity": "Burj Khalifa Group Visit at Sunset",
                "durationHours": "2-3",
                "costPerPerson": "120",
                "whyItWorks": "Stunning shared views, iconic photo moment, Dubai overview together, modern luxury spectacle"
            },
            {
                "activity": "Gold Souk Haggling & Spice Market Tour",
                "durationHours": "3",
                "costPerPerson": "30",
                "whyItWorks": "Group shopping adventure, cultural immersion, negotiation fun together, traditional souks experience"
            },
            {
                "activity": "Dhow Dinner Cruise Dubai Marina",
                "durationHours": "3-4",
                "costPerPerson": "75",
                "whyItWorks": "Group sailing experience, buffet dinner together, sunset/night marina views, romantic Arabian Nights vibe"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Burj Al Arab",
                "city": "Dubai",
                "stars": 7,
                "whyGoodForGroups": "Ultra-luxury, iconic, but small groups only; better for celebratory night"
            },
            {
                "name": "Hilton Dubai Al Mina",
                "city": "Dubai",
                "stars": 5,
                "whyGoodForGroups": "Central location, group-friendly, beach access, desert safari pickups easy"
            },
            {
                "name": "Qasr Al Sarab Desert Resort",
                "city": "Abu Dhabi Desert",
                "stars": 5,
                "whyGoodForGroups": "Luxury desert resort, all-inclusive options, group activities, immersive desert experience"
            }
        ]
    },
    {
        "slug": "jordan-trek",
        "title": "Jordan",
        "primaryDestinationCity": "Dead Sea",
        "primaryDestinationCountry": "Jordan",
        "region": "Middle East",
        "durationDays": 2,
        "roughBudgetUsd": 680,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Jordan is the Middle East's bucket-list destination—Petra (New Seven Wonders) is non-negotiable for architectural wonder and UNESCO significance. Wadi Rum desert overnight camping is iconic adventure (Lawrence of Arabia backdrop). Dead Sea floating is unique wellness experience (lowest point on Earth). Comprehensive tourism infrastructure. English widely spoken. Safe, welcoming culture. March-May & Sept-Nov ideal (avoid summer heat). 2-7 day options available. Highly recommended for groups seeking ancient history, desert adventure, and cultural immersion in accessible Middle Eastern setting.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in AMM Amman",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Petra Siq walk",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Wadi Rum jeep tour & camping",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Wadi Rum Desert Jeep Safari & Overnight Camp",
                        "description": "Thrilling dune bashing together, magical desert night under stars, shared Zarb dinner by fire, music/storytelling, unforgettable bonding moment",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/jordan/hero.png",
                "alt": "Jordan Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Jordan is the Middle East's bucket-list destination—Petra (New Seven Wonders) is non-negotiable for architectural wonder and UNESCO significance. Wadi Rum desert overnight camping is iconic adventure (Lawrence of Arabia backdrop). Dead Sea floating is unique wellness experience (lowest point on Earth). Comprehensive tourism infrastructure. English widely spoken. Safe, welcoming culture. March-May & Sept-Nov ideal (avoid summer heat). 2-7 day options available. Highly recommended for groups seeking ancient history, desert adventure, and cultural immersion in accessible Middle Eastern setting.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Middle East"
        ],
        "logistics": {
            "bestSeason": "March-May, September-November",
            "visaNotes": "US citizens need visa on arrival or e-visa online (~$40). Tourist visas 30 days.",
            "dailyBudgetRange": "120-200",
            "primaryAirport": "Queen Alia International (AMM) Amman",
            "currency": "Jordanian Dinar (JOD)",
            "healthNotes": "No vaccinations required. Tap water safe in cities. Very safe destination.",
            "transport": {
                "airportToHotel": "Taxis (pre-arranged best), buses, airport shuttles",
                "withinCity": "Taxis, buses, walking in safe areas (Amman downtown)",
                "betweenDestinations": "Private drivers/guides recommended, buses available but slow, domestic flights (Aqaba option)"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, hospitable, relationship-focused. Arabic dominant but English widely spoken. Business handshakes formal, right hand important.",
            "businessEtiquette": "Hierarchy respected. Building trust/relationships first. Patience valued. Conservative outside tourist areas.",
            "socialCustoms": "Family paramount. Islam significant. Hospitality sacred (tea/coffee ritual). Shared meals important. Modest dress appreciated.",
            "diningNorms": "Hummus, falafel, kebabs iconic. Bread staple. Tea/coffee social rituals. Ramadan affects restaurant hours. Tipping 10% appreciated."
        },
        "groupBondingActivities": [
            {
                "activity": "Wadi Rum Desert Jeep Safari & Overnight Camp",
                "durationHours": "24",
                "costPerPerson": "120",
                "whyItWorks": "Thrilling dune bashing together, magical desert night under stars, shared Zarb dinner by fire, music/storytelling, unforgettable bonding moment"
            },
            {
                "activity": "Petra Siq Walk & Treasury Exploration",
                "durationHours": "4-6",
                "costPerPerson": "70",
                "whyItWorks": "Shared awe walking through dramatic canyon, iconic photo moment together, UNESCO exploration, group discussion of history"
            },
            {
                "activity": "Dead Sea Floating & Mud Therapy",
                "durationHours": "3-4",
                "costPerPerson": "50",
                "whyItWorks": "Unique shared experience floating together (physically impossible to sink!), mud spa fun, relaxation/wellness bonding"
            },
            {
                "activity": "Jerash Ruins Walking Tour",
                "durationHours": "3",
                "costPerPerson": "35",
                "whyItWorks": "Expert guide brings Roman history alive, group photo opportunities, cultural education shared"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Dead Sea Spa Resort",
                "city": "Dead Sea",
                "stars": 5,
                "whyGoodForGroups": "All-inclusive spa, group dining, float activities, relaxation hub"
            },
            {
                "name": "Petra Palace Hotel",
                "city": "Petra",
                "stars": 4,
                "whyGoodForGroups": "Gate entrance location, group-friendly, Petra access perfect"
            },
            {
                "name": "Memories Aicha Luxury Camp",
                "city": "Wadi Rum",
                "stars": 4,
                "whyGoodForGroups": "Luxury Bedouin camp, group activities, stars/music/food"
            }
        ]
    },
    {
        "slug": "japan-trek",
        "title": "Japan",
        "primaryDestinationCity": "Tokyo",
        "primaryDestinationCountry": "Japan",
        "region": "Asia",
        "durationDays": 7,
        "roughBudgetUsd": 2180,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Japan is Asia's most sophisticated destination—cherry blossoms (late March-early April) are iconic natural phenomenon worth planning trip around. Tokyo ultra-modern contrasts beautifully with Kyoto traditional temples. Mt Fuji iconic mountain pilgrimage. Onsen (hot springs) offer unique wellness bonding. Shinkansen bullet train iconic travel experience. Excellent infrastructure, English signage, safe, efficient. 2026 advantageous: weak yen = better value, fewer Chinese tourists = less crowded. JR Pass cost-effective for group travel. Highly recommended for MBA groups seeking cultural depth, natural beauty, technological contrast, and group bonding through shared traditions (hanami, onsen, cultural experiences).",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in Tokyo, Kansai ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Tokyo cherry blossoms (Ueno",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Shinjuku Gyoen)",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Cherry Blossom Picnic & Park Viewing",
                        "description": "Shared tradition (hanami cultural experience), group picnicking under blooms, sunset viewing, photos together, ephemeral beauty appreciation",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/japan/hero.png",
                "alt": "Japan Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Japan is Asia's most sophisticated destination—cherry blossoms (late March-early April) are iconic natural phenomenon worth planning trip around. Tokyo ultra-modern contrasts beautifully with Kyoto traditional temples. Mt Fuji iconic mountain pilgrimage. Onsen (hot springs) offer unique wellness bonding. Shinkansen bullet train iconic travel experience. Excellent infrastructure, English signage, safe, efficient. 2026 advantageous: weak yen = better value, fewer Chinese tourists = less crowded. JR Pass cost-effective for group travel. Highly recommended for MBA groups seeking cultural depth, natural beauty, technological contrast, and group bonding through shared traditions (hanami, onsen, cultural experiences).",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Asia"
        ],
        "logistics": {
            "bestSeason": "Late March-Early April (cherry blossoms), October-November (autumn foliage)",
            "visaNotes": "US citizens visa-free for 90 days (tourism only). New visa fee coming April 2026 (~¥15,000/$80).",
            "dailyBudgetRange": "100-200",
            "primaryAirport": "Haneda (Tokyo), Kansai (Osaka), Narita (Tokyo alt)",
            "currency": "Japanese Yen (JPY)",
            "healthNotes": "Excellent healthcare. No vaccinations required. Very safe. Water excellent.",
            "transport": {
                "airportToHotel": "Narita Express, airport buses, pre-arranged transfers (convenient)",
                "withinCity": "Trains/subway (most efficient), buses, taxis expensive, walking",
                "betweenDestinations": "Shinkansen bullet train (iconic, fast, scenic), buses (budget option), flights (domestic)"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Formal, respectful, indirect. Bow important (deeper = more respect). Quiet/reserved in public. Business cards exchanged formally (both hands).",
            "businessEtiquette": "Hierarchy paramount. Punctuality sacred. Group harmony (wa) valued over individual. Silence respected. Indirect communication norm.",
            "socialCustoms": "Shoes off indoors (temples, homes, onsen). Respect for nature. Seasonal awareness important. Group dynamics emphasized. Discipline/dedication valued.",
            "diningNorms": "Chopsticks used properly (not stuck in rice). Slurp noodles (respectful). Itadakimasu/gochisousama (respect meal ritual). Tipping NOT expected/appreciated."
        },
        "groupBondingActivities": [
            {
                "activity": "Cherry Blossom Picnic & Park Viewing",
                "durationHours": "3-4",
                "costPerPerson": "20",
                "whyItWorks": "Shared tradition (hanami cultural experience), group picnicking under blooms, sunset viewing, photos together, ephemeral beauty appreciation"
            },
            {
                "activity": "Maiko Dinner & Geisha Entertainment (Kyoto)",
                "durationHours": "2-3",
                "costPerPerson": "100",
                "whyItWorks": "Cultural immersion together, group dining ritual, traditional performance, intimate group experience, unforgettable memories"
            },
            {
                "activity": "Mt Fuji Day Trip & Hakone Hot Springs",
                "durationHours": "10-12",
                "costPerPerson": "120",
                "whyItWorks": "Iconic shared experience, natural wonder viewing together, onsen bathing group bonding, cable car adventure, scenic beauty appreciation"
            },
            {
                "activity": "Fushimi Inari 1000s Torii Gates Hike",
                "durationHours": "2-4",
                "costPerPerson": "0",
                "whyItWorks": "Surreal shared landscape experience, physical challenge together, spiritual/meditative atmosphere, Instagram moment sharing"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Hyatt Centric Ginza Tokyo",
                "city": "Tokyo",
                "stars": 5,
                "whyGoodForGroups": "Central location, modern, easy access to all districts, group packages"
            },
            {
                "name": "The Ritz-Carlton Kyoto",
                "city": "Kyoto",
                "stars": 5,
                "whyGoodForGroups": "Luxury ryokan experience, traditional gardens, cultural immersion, group dining"
            },
            {
                "name": "Hakone Yumoto Fujiya Hotel",
                "city": "Hakone (Mt Fuji)",
                "stars": 5,
                "whyGoodForGroups": "Hot springs, Mt Fuji views, traditional onsen, group activities"
            }
        ]
    },
    {
        "slug": "south-korea-trek",
        "title": "South Korea",
        "primaryDestinationCity": "Seoul",
        "primaryDestinationCountry": "South Korea",
        "region": "Asia",
        "durationDays": 9,
        "roughBudgetUsd": 1980,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "South Korea is Asia's rising star—cherry blossoms (late March-early April) are spectacular with massive festivals (Jinhae famous). Seoul vibrant capital blends K-culture (K-pop, K-drama) with ancient palaces & temples. DMZ border tour is profound historical/political experience (unique global access). Jeju Island volcanic natural beauty offers wellness escape. KTX trains connect major cities efficiently. Very affordable compared to Japan. English increasingly available, K-pop culture appeals broadly. Group dining culture (Korean BBQ, soju sharing) naturally bonds groups. Highly recommended for MBA groups seeking cultural immersion, historical depth, K-culture engagement, natural beauty, and group bonding through shared dining/drinking traditions.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in Seoul, Busan, Jeju",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Seoul palaces (Gyeongbokgung",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "cherry blossoms Seokchon Lake)",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Cherry Blossom Festival & Park Picnic (Jinhae or Yeouido)",
                        "description": "Festival atmosphere together, group picnicking under blossoms, street food exploration, photography memories, K-cultural tradition experience",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/south-korea/hero.png",
                "alt": "South Korea Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "South Korea is Asia's rising star—cherry blossoms (late March-early April) are spectacular with massive festivals (Jinhae famous). Seoul vibrant capital blends K-culture (K-pop, K-drama) with ancient palaces & temples. DMZ border tour is profound historical/political experience (unique global access). Jeju Island volcanic natural beauty offers wellness escape. KTX trains connect major cities efficiently. Very affordable compared to Japan. English increasingly available, K-pop culture appeals broadly. Group dining culture (Korean BBQ, soju sharing) naturally bonds groups. Highly recommended for MBA groups seeking cultural immersion, historical depth, K-culture engagement, natural beauty, and group bonding through shared dining/drinking traditions.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Asia"
        ],
        "logistics": {
            "bestSeason": "Late March-Early April (cherry blossoms), October-November (autumn)",
            "visaNotes": "US citizens visa-free for 90 days (K-ETA online recommended, ~$20).",
            "dailyBudgetRange": "80-150",
            "primaryAirport": "Incheon International (Seoul), Busan, Jeju",
            "currency": "South Korean Won (KRW)",
            "healthNotes": "Excellent healthcare. No vaccinations required. Very safe. Healthcare modern.",
            "transport": {
                "airportToHotel": "Airport Express buses, trains (AREX), taxis, pre-arranged transfers",
                "withinCity": "Subway (efficient, cheap), buses, taxis, walking",
                "betweenDestinations": "KTX trains (fast, scenic, comfortable), buses (budget), flights (Jeju)"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, friendly, enthusiastic. Age/hierarchy important (respectful language for elders). Direct speech appreciated. Group harmony emphasized.",
            "businessEtiquette": "Hierarchy respected. Bowing appropriate. Business card exchange formal (both hands). Punctuality valued. Group decisions valued over individual.",
            "socialCustoms": "Family paramount. K-culture pride (K-pop, K-drama). Communal dining rituals. Younger generation very tech-savvy. Night culture active (ajumma culture, noraebang).",
            "diningNorms": "Soju/alcohol social rituals. Banchan (side dishes) communal. Rice staple. Sharing meals at table. Respectful elder service. Tipping NOT expected."
        },
        "groupBondingActivities": [
            {
                "activity": "Cherry Blossom Festival & Park Picnic (Jinhae or Yeouido)",
                "durationHours": "3-5",
                "costPerPerson": "30",
                "whyItWorks": "Festival atmosphere together, group picnicking under blossoms, street food exploration, photography memories, K-cultural tradition experience"
            },
            {
                "activity": "Korean BBQ Group Dinner & Soju Night",
                "durationHours": "2-3",
                "costPerPerson": "40-60",
                "whyItWorks": "Interactive table-top grilling together, communal eating ritual, Soju toasting culture, laughter/bonding, karaoke follow-up (noraebang)"
            },
            {
                "activity": "DMZ Border Tour & Historical Learning",
                "durationHours": "6-8",
                "costPerPerson": "100",
                "whyItWorks": "Profound shared historical experience, educational depth, emotional connection, group reflection on division/peace, rare access to world's border"
            },
            {
                "activity": "Jeju Island Nature Exploration & Haenyeo Experience",
                "durationHours": "6-8",
                "costPerPerson": "80",
                "whyItWorks": "Natural beauty shared, volcanic landscapes group hiking, sea diver (haenyeo) cultural exchange, island relaxation bonding, seafood feasting"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "The Shilla Seoul",
                "city": "Seoul",
                "stars": 5,
                "whyGoodForGroups": "Central location, Korean luxury, group dining, group rates available"
            },
            {
                "name": "Paradise Hotel Busan",
                "city": "Busan",
                "stars": 5,
                "whyGoodForGroups": "Coastal views, group activities, spa facilities, beach access"
            },
            {
                "name": "Lotte Hotel Jeju",
                "city": "Jeju Island",
                "stars": 5,
                "whyGoodForGroups": "Beach resort, group packages, natural landscape access, relaxation hub"
            }
        ]
    },
    {
        "slug": "vietnam-trek",
        "title": "Vietnam",
        "primaryDestinationCity": "Hanoi",
        "primaryDestinationCountry": "Vietnam",
        "region": "Southeast Asia",
        "durationDays": 10,
        "roughBudgetUsd": 1640,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Vietnam is Southeast Asia's rising gem—Halong Bay (UNESCO limestone karsts) is iconic natural wonder perfect for group cruising. Hanoi vibrant capital with Old Quarter energy, street food culture, water puppet shows. Hoi An lantern-lit ancient town magical at night + cooking class bonding. Ho Chi Minh City modern chaos blending war history & street food. Mekong Delta rural floating markets offer authentic cultural immersion. Excellent value (very affordable). October-April ideal weather. Very group-friendly with shared meals, boat experiences, cultural immersion. Highly recommended for MBA groups seeking adventure, culture, food, natural beauty, history, and strong group bonding through unique experiences.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in HAN, Ho Chi Minh Tan Son Nhat ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Hanoi Old Quarter",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Halong Bay overnight junk cruise",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Halong Bay Overnight Junk Cruise",
                        "description": "Magical shared experience on limestone karsts, group meals on deck, stargazing, kayaking together, sleeping together creates bonding, UNESCO beauty, unforgettable moment",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/vietnam/hero.png",
                "alt": "Vietnam Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Vietnam is Southeast Asia's rising gem—Halong Bay (UNESCO limestone karsts) is iconic natural wonder perfect for group cruising. Hanoi vibrant capital with Old Quarter energy, street food culture, water puppet shows. Hoi An lantern-lit ancient town magical at night + cooking class bonding. Ho Chi Minh City modern chaos blending war history & street food. Mekong Delta rural floating markets offer authentic cultural immersion. Excellent value (very affordable). October-April ideal weather. Very group-friendly with shared meals, boat experiences, cultural immersion. Highly recommended for MBA groups seeking adventure, culture, food, natural beauty, history, and strong group bonding through unique experiences.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Southeast Asia"
        ],
        "logistics": {
            "bestSeason": "October-April (cool, dry)",
            "visaNotes": "US citizens need e-Visa (online, ~$25, instant) or visa on arrival. Tourist visas 30-90 days.",
            "dailyBudgetRange": "40-100",
            "primaryAirport": "Hanoi Noi Bai (HAN), Ho Chi Minh Tan Son Nhat (SGN)",
            "currency": "Vietnamese Dong (VND)",
            "healthNotes": "Malaria in rural areas. Hepatitis A/B recommended. Tap water unsafe - use bottled.",
            "transport": {
                "airportToHotel": "Airport buses, taxis (use Grab app), pre-arranged transfers",
                "withinCity": "Cyclos (traditional), buses, Grab app (ride-share), motorbikes",
                "betweenDestinations": "Overnight trains (scenic, social), buses, domestic flights, overnight junk cruises (Halong)"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Indirect, modest, hierarchical. Family paramount. Respect for elders important. Direct eye contact acceptable. English limited - learn key phrases.",
            "businessEtiquette": "Hierarchy respected. Business cards formal (both hands). Building relationships important. Patience valued.",
            "socialCustoms": "Communal, collectivist culture. Shared meals important. Tea/coffee rituals. Family loyalty paramount. Modest dress appreciated at temples.",
            "diningNorms": "Family-style shared dishes. Chopsticks proper use. Slurping noodles respectful. Don't leave rice uneaten. Tipping not expected but appreciated."
        },
        "groupBondingActivities": [
            {
                "activity": "Halong Bay Overnight Junk Cruise",
                "durationHours": "24-48",
                "costPerPerson": "110",
                "whyItWorks": "Magical shared experience on limestone karsts, group meals on deck, stargazing, kayaking together, sleeping together creates bonding, UNESCO beauty, unforgettable moment"
            },
            {
                "activity": "Street Food Tour (Hanoi Old Quarter)",
                "durationHours": "3-4",
                "costPerPerson": "30",
                "whyItWorks": "Group food exploration together, sampling authentic tastes, navigating chaotic streets together, shared cultural immersion, laughter at food discoveries"
            },
            {
                "activity": "Hoi An Cooking Class & Market Visit",
                "durationHours": "5-6",
                "costPerPerson": "40",
                "whyItWorks": "Hands-on cooking together, market haggling, group meal at end, cultural education, culinary team bonding, shared meal celebration"
            },
            {
                "activity": "Mekong Delta Floating Market & Boat Tours",
                "durationHours": "8",
                "costPerPerson": "50",
                "whyItWorks": "Unique floating market experience together, boat touring, village interactions, rowing boat adventure, authentic delta life observation, group exploration"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Sofitel Legend Metropole Hanoi",
                "city": "Hanoi",
                "stars": 5,
                "whyGoodForGroups": "Historic luxury, group dining, Old Quarter location, colonial charm"
            },
            {
                "name": "Emeraude Classic Halong Bay Cruise",
                "city": "Halong Bay",
                "stars": 4,
                "whyGoodForGroups": "Overnight junk boat cruise, UNESCO limestone karsts, group activities, all-inclusive"
            },
            {
                "name": "Riverside Boutique Resort",
                "city": "Hoi An",
                "stars": 4,
                "whyGoodForGroups": "Ancient town location, group dining, lantern-lit streets, cultural hub"
            }
        ]
    },
    {
        "slug": "philippines-trek",
        "title": "Philippines",
        "primaryDestinationCity": "Boracay",
        "primaryDestinationCountry": "Philippines",
        "region": "Southeast Asia",
        "durationDays": 8,
        "roughBudgetUsd": 1680,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Philippines is Southeast Asia's tropical island paradise—7,641 islands mean endless exploration. Boracay iconic white sand beach, perfect for group relaxation + water sports. Palawan (El Nido) features dramatic limestone cliffs framing turquoise lagoons—postcard perfect. Cebu offers whale sharks (largest fish!) + sardine run spectacle. Bohol has unique Chocolate Hills + world's tiniest primate. Excellent value (very affordable). English widely spoken (easiest in SE Asia). November-May ideal. Strong group bonding through island hopping, boat experiences, unique wildlife encounters, shared beach relaxation. Highly recommended for MBA groups seeking tropical paradise, adventure, wildlife, natural beauty, affordability, and group bonding through island experiences.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in MNL Manila, Caticlan ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "White Beach Boracay",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "island hopping",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Island Hopping Tours (Boracay, El Nido, Cebu)",
                        "description": "Shared boat exploration, group swimming/snorkeling, island discoveries together, lunch on islands, bonding in paradise, Instagram moments shared",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/philippines/hero.png",
                "alt": "Philippines Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Philippines is Southeast Asia's tropical island paradise—7,641 islands mean endless exploration. Boracay iconic white sand beach, perfect for group relaxation + water sports. Palawan (El Nido) features dramatic limestone cliffs framing turquoise lagoons—postcard perfect. Cebu offers whale sharks (largest fish!) + sardine run spectacle. Bohol has unique Chocolate Hills + world's tiniest primate. Excellent value (very affordable). English widely spoken (easiest in SE Asia). November-May ideal. Strong group bonding through island hopping, boat experiences, unique wildlife encounters, shared beach relaxation. Highly recommended for MBA groups seeking tropical paradise, adventure, wildlife, natural beauty, affordability, and group bonding through island experiences.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Southeast Asia"
        ],
        "logistics": {
            "bestSeason": "November-May (dry season)",
            "visaNotes": "US citizens visa-free for 30 days. K-ETA online recommended (~$20). Tourist visas extendable to 59 days.",
            "dailyBudgetRange": "50-150",
            "primaryAirport": "Ninoy Aquino (MNL) Manila, Caticlan (Boracay), Puerto Princesa (Palawan)",
            "currency": "Philippine Peso (PHP)",
            "healthNotes": "Malaria risk in some areas. Hepatitis A/B recommended. Tap water unsafe - bottled only.",
            "transport": {
                "airportToHotel": "Airport buses, metered taxis (use Grab app), hotel transfers",
                "withinCity": "Jeepneys (iconic minibuses), tricycles, taxis, Grab app, walking",
                "betweenDestinations": "Domestic flights (necessary between islands), ferries, speedboats, overnight ferries"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Warm, friendly, English widely spoken, humor-oriented. Direct but charming. Respect for authority important.",
            "businessEtiquette": "Handshakes formal. Hierarchy respected. Relationship-building important. Smiling common. Filipino hospitality paramount.",
            "socialCustoms": "Family-focused, communal, strong Catholic influence. Fiestas important. Bayanihan (community spirit) valued. Respect for elders.",
            "diningNorms": "Family-style sharing. Rice staple. Seafood iconic. Eating with hands acceptable. Tipping 10-15% in restaurants appreciated."
        },
        "groupBondingActivities": [
            {
                "activity": "Island Hopping Tours (Boracay, El Nido, Cebu)",
                "durationHours": "6-8",
                "costPerPerson": "50",
                "whyItWorks": "Shared boat exploration, group swimming/snorkeling, island discoveries together, lunch on islands, bonding in paradise, Instagram moments shared"
            },
            {
                "activity": "El Nido Big Lagoon Kayaking & Swimming",
                "durationHours": "6",
                "costPerPerson": "60",
                "whyItWorks": "Surreal turquoise lagoon exploration together, dramatic limestone cliffs, cave exploration, group kayaking, swimming, natural wonder appreciation"
            },
            {
                "activity": "Whale Shark Interaction & Sardine Run (Cebu)",
                "durationHours": "6",
                "costPerPerson": "70",
                "whyItWorks": "Unique wildlife encounter together, group adrenaline rush swimming with whale sharks, sardine run spectacle, bucket-list experience shared"
            },
            {
                "activity": "White Beach Sunset Paraw Sailing (Boracay)",
                "durationHours": "2-3",
                "costPerPerson": "40",
                "whyItWorks": "Romantic tropical sunset together, traditional outrigger boat sailing, group toasting, golden hour photography, blissful island finale"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Boracay Shangrila Resort & Spa",
                "city": "Boracay",
                "stars": 5,
                "whyGoodForGroups": "Luxury beach resort, group dining, water activities, white beach access, party/relaxation balance"
            },
            {
                "name": "El Nido Resorts Miniloc",
                "city": "El Nido, Palawan",
                "stars": 5,
                "whyGoodForGroups": "All-inclusive island resort, group island hopping, lagoon access, water sports, exclusive feel"
            },
            {
                "name": "Jpark Island Resort & Waterpark",
                "city": "Cebu",
                "stars": 4,
                "whyGoodForGroups": "Beach resort, waterpark, group activities, marine wildlife access, Central Visayas hub"
            }
        ]
    },
    {
        "slug": "india-trek",
        "title": "India",
        "primaryDestinationCity": "Delhi",
        "primaryDestinationCountry": "India",
        "region": "South Asia",
        "durationDays": 8,
        "roughBudgetUsd": 1580,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "India's Golden Triangle is Asia's most iconic tourist circuit—Taj Mahal (one of Seven Wonders) is transcendent monument. Delhi thriving capital blends Mughal heritage, British architecture, modern chaos. Agra Taj Mahal perfection + Mughal architecture. Jaipur Pink City offers royal palaces, Amber Fort, Hawa Mahal architecture. Exceptional value (very affordable). English widely spoken. October-March ideal (cool weather). Group-friendly with shared experiences (rickshaw rides, elephant rides, street food, heritage stays). Diverse cultural immersion, spiritual depth, architectural wonders. Highly recommended for MBA groups seeking iconic world heritage sights, cultural depth, spiritual experiences, budget value, and strong group bonding through shared bucket-list moments and authentic street-level India.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in DEL Delhi, Amagedpur ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Delhi Old Quarter by rickshaw",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Red Fort",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Taj Mahal Sunrise Visit",
                        "description": "Iconic shared bucket-list moment, magical sunrise together, awe-inspiring architecture, emotional connection to monument, group photos, lifetime memory",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/india/hero.png",
                "alt": "India Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "India's Golden Triangle is Asia's most iconic tourist circuit—Taj Mahal (one of Seven Wonders) is transcendent monument. Delhi thriving capital blends Mughal heritage, British architecture, modern chaos. Agra Taj Mahal perfection + Mughal architecture. Jaipur Pink City offers royal palaces, Amber Fort, Hawa Mahal architecture. Exceptional value (very affordable). English widely spoken. October-March ideal (cool weather). Group-friendly with shared experiences (rickshaw rides, elephant rides, street food, heritage stays). Diverse cultural immersion, spiritual depth, architectural wonders. Highly recommended for MBA groups seeking iconic world heritage sights, cultural depth, spiritual experiences, budget value, and strong group bonding through shared bucket-list moments and authentic street-level India.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "South Asia"
        ],
        "logistics": {
            "bestSeason": "October-March (cool, dry)",
            "visaNotes": "US citizens need e-Tourist Visa (online, ~$25, instant) or embassy visa. Tourist visas 1 year multiple entry.",
            "dailyBudgetRange": "30-80",
            "primaryAirport": "Indira Gandhi International (DEL) Delhi, Amagedpur (AGX) alternative",
            "currency": "Indian Rupee (INR)",
            "healthNotes": "Hepatitis A/B, Typhoid recommended. Malaria in some areas. Tap water unsafe - bottled only. Travel insurance important.",
            "transport": {
                "airportToHotel": "Airport taxis (use Uber/Ola apps), hotel pre-arranged transfers",
                "withinCity": "Taxis (Uber/Ola), metro (Delhi, Jaipur), rickshaws (traditional 3-wheelers), buses",
                "betweenDestinations": "Flights (fastest, good value), trains (scenic, social, overnight sleeper), coaches"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Indirect, hierarchical, respectful. Head wobble means yes. Family paramount. English widely spoken in tourist areas. Namaste greeting respectful.",
            "businessEtiquette": "Right hand for eating/giving. Remove shoes at temples. Hierarchy respected. Building relationships important. Patience valued.",
            "socialCustoms": "Collectivist, family-focused. Diverse religions (Hinduism, Buddhism, Sikhism, Islam, Christianity). Caste system legacy (outdated legally). Respect for elders paramount.",
            "diningNorms": "Many vegetarians (religious/cultural). Spicy food dominant. Bread staple (naan, roti). Right hand for eating (forks acceptable in hotels). Tipping 10% appreciated."
        },
        "groupBondingActivities": [
            {
                "activity": "Taj Mahal Sunrise Visit",
                "durationHours": "4",
                "costPerPerson": "40",
                "whyItWorks": "Iconic shared bucket-list moment, magical sunrise together, awe-inspiring architecture, emotional connection to monument, group photos, lifetime memory"
            },
            {
                "activity": "Amber Fort Elephant Ride & Exploration",
                "durationHours": "5",
                "costPerPerson": "50",
                "whyItWorks": "Unique adventure together riding camels, hilltop fort exploration, panoramic views, Sheesh Mahal mirror palace wonder, group adrenaline"
            },
            {
                "activity": "Delhi Old Quarter Rickshaw Spice Market Tour",
                "durationHours": "3-4",
                "costPerPerson": "25",
                "whyItWorks": "Group rickshaw adventure through chaos, street food sampling together, sensory overload sharing, chaotic authenticity bonding, cultural immersion"
            },
            {
                "activity": "Hawa Mahal Photo Moment & Pink City Exploration",
                "durationHours": "2-3",
                "costPerPerson": "15",
                "whyItWorks": "Iconic pink building group photos, architectural marvel appreciation, exploring painted city together, souvenir shopping, playful energy"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "The Oberoi New Delhi",
                "city": "Delhi",
                "stars": 5,
                "whyGoodForGroups": "Luxury gateway, group dining, central location, Delhi exploration base"
            },
            {
                "name": "Oberoi Amarvilas Agra",
                "city": "Agra",
                "stars": 5,
                "whyGoodForGroups": "Taj Mahal views from rooms!, luxury resort, group dining, perfect photo backdrop"
            },
            {
                "name": "Rambagh Palace Jaipur",
                "city": "Jaipur",
                "stars": 5,
                "whyGoodForGroups": "Former royal palace, luxury Rajasthani experience, group events, royal heritage immersion"
            }
        ]
    },
    {
        "slug": "taiwan-trek",
        "title": "Taiwan",
        "primaryDestinationCity": "Taipei",
        "primaryDestinationCountry": "Taiwan",
        "region": "East Asia",
        "durationDays": 5,
        "roughBudgetUsd": 1120,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Taiwan is East Asia's hidden gem—Taipei vibrant yet livable capital blending modernity with temples. Jiufen nostalgic gold-mining town with lantern-lit alleyways + iconic peanut ice cream. Shifen sky lantern experience magical collective moment (bucket-list). Sun Moon Lake (largest freshwater lake) serenely beautiful with Thao indigenous culture. Alishan forest railway iconic narrow-gauge train through mountain forests with sunrise viewing. Taroko Gorge dramatic marble cliffs. Hot springs throughout island for group relaxation. Excellent value (very affordable). Visa-free, tap water safe, friendly locals. October-November / March-April ideal. Strong group bonding through shared rituals (lantern releases, sky gazing, mountain trains, lake cruises). Highly recommended for MBA groups seeking cultural immersion, natural beauty, budget value, unique experiences, and strong group bonding through iconic Asian moments.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in TPE near Taipei",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Jiufen old streets (lanterns",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "taro balls)",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Jiufen Old Street Night Market Exploration",
                        "description": "Nostalgic alleyway exploration together, group food sampling, lantern-lit atmosphere, shared discovery of hidden vendors, playful energy, iconic photo moments",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/taiwan/hero.png",
                "alt": "Taiwan Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Taiwan is East Asia's hidden gem—Taipei vibrant yet livable capital blending modernity with temples. Jiufen nostalgic gold-mining town with lantern-lit alleyways + iconic peanut ice cream. Shifen sky lantern experience magical collective moment (bucket-list). Sun Moon Lake (largest freshwater lake) serenely beautiful with Thao indigenous culture. Alishan forest railway iconic narrow-gauge train through mountain forests with sunrise viewing. Taroko Gorge dramatic marble cliffs. Hot springs throughout island for group relaxation. Excellent value (very affordable). Visa-free, tap water safe, friendly locals. October-November / March-April ideal. Strong group bonding through shared rituals (lantern releases, sky gazing, mountain trains, lake cruises). Highly recommended for MBA groups seeking cultural immersion, natural beauty, budget value, unique experiences, and strong group bonding through iconic Asian moments.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "East Asia"
        ],
        "logistics": {
            "bestSeason": "October-November, March-April (mild, clear)",
            "visaNotes": "US citizens visa-free 90 days. Easy arrival process. Electronic entry form online.",
            "dailyBudgetRange": "50-120",
            "primaryAirport": "Taiwan Taoyuan International (TPE) near Taipei",
            "currency": "New Taiwan Dollar (TWD)",
            "healthNotes": "No vaccinations required. Tap water drinkable in cities. Excellent healthcare.",
            "transport": {
                "airportToHotel": "Airport MRT trains (convenient, cheap), buses, pre-arranged transfers",
                "withinCity": "MRT metro (Taipei), buses, taxis (apps: Uber, Didi), walking",
                "betweenDestinations": "High-speed trains (fast, scenic), buses, domestic flights, hired cars with drivers"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Indirect, modest, hierarchical. Family-focused. English limited but hospitality warm. Formal greetings appreciated.",
            "businessEtiquette": "Business cards formal (both hands). Hierarchy respected. Building relationships important. Patience valued. Tradition respected.",
            "socialCustoms": "Collectivist culture. Respect for elders paramount. Buddhism/Taoism influence. Temple etiquette important (modest dress). Hospitality warm.",
            "diningNorms": "Shared communal dishes. Chopsticks proper use. Don't stick chopsticks upright in rice (funeral ritual). Slurping noodles acceptable. Tea culture important. Tipping not expected."
        },
        "groupBondingActivities": [
            {
                "activity": "Jiufen Old Street Night Market Exploration",
                "durationHours": "2-3",
                "costPerPerson": "20",
                "whyItWorks": "Nostalgic alleyway exploration together, group food sampling, lantern-lit atmosphere, shared discovery of hidden vendors, playful energy, iconic photo moments"
            },
            {
                "activity": "Shifen Sky Lantern Release",
                "durationHours": "1-2",
                "costPerPerson": "12",
                "whyItWorks": "Collective wish-making ritual, watching group lanterns ascend together, spiritual shared moment, bucket-list experience, magical memory"
            },
            {
                "activity": "Sun Moon Lake Scenic Cruise + Cycling",
                "durationHours": "4",
                "costPerPerson": "35",
                "whyItWorks": "Group boat exploration of pristine lake, scenic cycling paths together, peaceful mountain bonding, indigenous village interactions, natural beauty appreciation"
            },
            {
                "activity": "Alishan Forest Railway Sunrise Expedition",
                "durationHours": "8",
                "costPerPerson": "60",
                "whyItWorks": "Unique mountain train experience together, predawn group anticipation, collective sunrise moment over forest canopy, forest trail exploration, memorable adventure"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Mandarin Oriental Taipei",
                "city": "Taipei",
                "stars": 5,
                "whyGoodForGroups": "Luxury base, group dining, central Taipei location, modern amenities"
            },
            {
                "name": "Lealea Garden Hotel Sun Moon Lake",
                "city": "Sun Moon Lake",
                "stars": 4,
                "whyGoodForGroups": "Lakeside location, group activities, hot springs access, scenic views"
            },
            {
                "name": "Orient Luxury Hotel Alishan",
                "city": "Alishan",
                "stars": 4,
                "whyGoodForGroups": "Mountain forest location, sunrise viewing, hiking access, group dining"
            }
        ]
    },
    {
        "slug": "thailand-trek",
        "title": "Thailand",
        "primaryDestinationCity": "Bangkok",
        "primaryDestinationCountry": "Thailand",
        "region": "Southeast Asia",
        "durationDays": 5,
        "roughBudgetUsd": 980,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Thailand is Southeast Asia's quintessential destination—Bangkok vibrant capital with glittering temples, floating markets, street food chaos. Grand Palace iconic spiritual site. Chiang Mai northern culture hub with ethical elephant sanctuaries, ancient temples, night bazaars, cooking classes. Phuket island beaches + Phi Phi Islands turquoise snorkeling paradise. Phang Nga Bay dramatic limestone cliffs + James Bond Island scenery. Affordable value (very budget-friendly). English increasingly common. November-February ideal weather (cool, dry, 20-30°C). Visa-free. Strong group bonding through shared spiritual experiences (temples), wildlife interaction (ethical elephant sanctuaries), island adventures (snorkeling, speedboats), and group dining/cooking classes. Highly recommended for MBA groups seeking cultural immersion, island paradise, wildlife experiences, spiritual depth, budget value, and exceptional group bonding through diverse activities.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in BKK Bangkok",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Sun Moon Lake yacht cruise + Thao village",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Alishan forest train",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Grand Palace & Temples Complex Tour",
                        "description": "Awe-inspiring architecture shared, spiritual atmosphere, group photo moments, cultural education, collective wonder at intricate details, Thai culture immersion",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/thailand/hero.png",
                "alt": "Thailand Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Thailand is Southeast Asia's quintessential destination—Bangkok vibrant capital with glittering temples, floating markets, street food chaos. Grand Palace iconic spiritual site. Chiang Mai northern culture hub with ethical elephant sanctuaries, ancient temples, night bazaars, cooking classes. Phuket island beaches + Phi Phi Islands turquoise snorkeling paradise. Phang Nga Bay dramatic limestone cliffs + James Bond Island scenery. Affordable value (very budget-friendly). English increasingly common. November-February ideal weather (cool, dry, 20-30°C). Visa-free. Strong group bonding through shared spiritual experiences (temples), wildlife interaction (ethical elephant sanctuaries), island adventures (snorkeling, speedboats), and group dining/cooking classes. Highly recommended for MBA groups seeking cultural immersion, island paradise, wildlife experiences, spiritual depth, budget value, and exceptional group bonding through diverse activities.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Southeast Asia"
        ],
        "logistics": {
            "bestSeason": "November-February (cool, dry, 20-30°C)",
            "visaNotes": "US citizens visa-free for 30 days (visa exemption). Visa-on-arrival available online.",
            "dailyBudgetRange": "40-120",
            "primaryAirport": "Suvarnabhumi International (BKK) Bangkok",
            "currency": "Thai Baht (THB)",
            "healthNotes": "Malaria in rural areas (rare in tourist zones). Hepatitis A/B recommended. Tap water not drinkable - use bottled.",
            "transport": {
                "airportToHotel": "Airport taxis (use meter), public buses, pre-arranged transfers, ride-sharing (Grab)",
                "withinCity": "BTS Skytrain + MRT metro (Bangkok), songthaews (shared minibuses, Chiang Mai), tuk-tuks, Grab ride-sharing, motorbike taxis",
                "betweenDestinations": "Domestic flights (fast, affordable), buses (overnight sleeper buses save accommodation), trains (scenic, social)"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Indirect, modest, friendly. Smile important (Land of Smiles). Respect for Thai Royal Family paramount. Humor valued. English growing among younger people.",
            "businessEtiquette": "Wai greeting (palms together, bow) respectful. Hierarchy important. Building relationships before business. 'Never hurry' (sabai sabai) philosophy. Patience valued.",
            "socialCustoms": "Buddhism paramount. Temple etiquette (shoes off, modest dress, respect). Monarchy venerated (never disrespect). Communal, family-focused. Harmony (kreng jai) valued.",
            "diningNorms": "Shared communal dishes. Spicy is default (ask mild if needed). Sticky rice staple. Eating with spoon + fork (knife rare). Don't leave food uneaten (wasteful). Tipping 10-15% appreciated."
        },
        "groupBondingActivities": [
            {
                "activity": "Grand Palace & Temples Complex Tour",
                "durationHours": "5",
                "costPerPerson": "30",
                "whyItWorks": "Awe-inspiring architecture shared, spiritual atmosphere, group photo moments, cultural education, collective wonder at intricate details, Thai culture immersion"
            },
            {
                "activity": "Elephant Nature Park Sanctuary Visit",
                "durationHours": "7",
                "costPerPerson": "75",
                "whyItWorks": "Unique ethical wildlife interaction together, feeding/bathing elephants creates bonding, group learning about conservation, emotional connection to animals, memorable adventure"
            },
            {
                "activity": "Phi Phi Islands Speedboat + Snorkeling Tour",
                "durationHours": "8-10",
                "costPerPerson": "60",
                "whyItWorks": "Group speedboat adventure, shared snorkeling experience, turquoise water magic, island discoveries together, group meals on boat, tropical paradise bonding"
            },
            {
                "activity": "Chiang Mai Cooking Class",
                "durationHours": "4-5",
                "costPerPerson": "40",
                "whyItWorks": "Hands-on group activity, market exploration together, culinary learning, group meal celebration of cooked dishes, interactive cultural bonding"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Mandarin Oriental Bangkok",
                "city": "Bangkok",
                "stars": 5,
                "whyGoodForGroups": "Luxury flagship, riverside location, group dining, cultural immersion"
            },
            {
                "name": "Four Seasons Chiang Mai",
                "city": "Chiang Mai",
                "stars": 5,
                "whyGoodForGroups": "Luxury resort, elephant sanctuary, group activities, northern culture"
            },
            {
                "name": "Paresa Resort Phuket",
                "city": "Phuket",
                "stars": 5,
                "whyGoodForGroups": "Luxury beachfront, island access, water activities, sunset views"
            }
        ]
    },
    {
        "slug": "australia-trek",
        "title": "Australia",
        "primaryDestinationCity": "Sydney",
        "primaryDestinationCountry": "Australia",
        "region": "Oceania",
        "durationDays": 21,
        "roughBudgetUsd": 2840,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Australia is world's natural wonder destination—Sydney iconic city with Opera House, Harbour Bridge, Bondi Beach. Uluru (Ayers Rock) Red Centre monolith sacred to Aboriginal Anangu people, sunrise/sunset watching (spiritual moments), Sounds of Silence dinner under stars unforgettable. Kata Tjuta dramatic rock domes. Great Barrier Reef (2,300km coral ecosystem, UNESCO) world's largest, snorkeling/diving magical underwater world. Daintree Rainforest oldest tropical rainforest on Earth. Port Douglas tropical gateway. Mossman Gorge indigenous experiences. Melbourne cultural city, Great Ocean Road scenic drive. Diverse landscapes (beaches, outback, rainforest, mountains). English-speaking, excellent infrastructure. November-April best (warm). Very expensive ($$$) vs other destinations but worth for bucket-list wonders. Excellent value for experiences. Strong group bonding through awe-inspiring natural moments (Uluru sunrise, reef snorkeling, rainforest exploration, Sounds of Silence dinner). Highly recommended for MBA groups seeking world-class natural wonders, spiritual/Aboriginal cultural immersion, ultimate bucket-list experiences, stunning landscapes, and exceptional group bonding through once-in-lifetime moments.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in SYD, Melbourne ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Sydney Opera House + Harbour + Bondi Beach",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Blue Mountains day trip",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Uluru Sunrise Jeep Expedition",
                        "description": "Pre-dawn group anticipation, desert awakening together, color transformation moment, shared awe at monolith, picnic breakfast bonding, spiritual collective experience",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/australia/hero.png",
                "alt": "Australia Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Australia is world's natural wonder destination—Sydney iconic city with Opera House, Harbour Bridge, Bondi Beach. Uluru (Ayers Rock) Red Centre monolith sacred to Aboriginal Anangu people, sunrise/sunset watching (spiritual moments), Sounds of Silence dinner under stars unforgettable. Kata Tjuta dramatic rock domes. Great Barrier Reef (2,300km coral ecosystem, UNESCO) world's largest, snorkeling/diving magical underwater world. Daintree Rainforest oldest tropical rainforest on Earth. Port Douglas tropical gateway. Mossman Gorge indigenous experiences. Melbourne cultural city, Great Ocean Road scenic drive. Diverse landscapes (beaches, outback, rainforest, mountains). English-speaking, excellent infrastructure. November-April best (warm). Very expensive ($$$) vs other destinations but worth for bucket-list wonders. Excellent value for experiences. Strong group bonding through awe-inspiring natural moments (Uluru sunrise, reef snorkeling, rainforest exploration, Sounds of Silence dinner). Highly recommended for MBA groups seeking world-class natural wonders, spiritual/Aboriginal cultural immersion, ultimate bucket-list experiences, stunning landscapes, and exceptional group bonding through once-in-lifetime moments.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Oceania"
        ],
        "logistics": {
            "bestSeason": "November-April (warm, December-February hottest, April best weather)",
            "visaNotes": "US citizens: eTA (ETA) online ~$20, instant, valid 12 months. Applied online via AusTrade.",
            "dailyBudgetRange": "80-200",
            "primaryAirport": "Sydney Kingsford Smith (SYD), Melbourne (MEL), Brisbane (BNE)",
            "currency": "Australian Dollar (AUD)",
            "healthNotes": "Excellent healthcare. Tap water excellent. Sun protection critical (UV intense). Travel insurance recommended.",
            "transport": {
                "airportToHotel": "Airport taxis, rental cars, Uber/ride-sharing, pre-arranged hotel transfers",
                "withinCity": "Sydney: light rail + metro + buses, Melbourne: trams + metro, Brisbane: ferry + bus + metro, walking",
                "betweenDestinations": "Domestic flights (necessary for vast distances), rental cars (scenic drives), motorcoach tours"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Direct, friendly, informal (first names common). Laid-back, casual. Humor/self-deprecating jokes appreciated. Egalitarian culture. English fluent (native).",
            "businessEtiquette": "Handshakes firm and casual. No hierarchy formality. Equality emphasized. Direct communication valued. Informality norm. Australians straightforward, no-nonsense.",
            "socialCustoms": "Beach culture paramount (Bondi). Sports obsession (AFL, cricket). Indigenous Aboriginal culture sacred (respect needed). Environmentally conscious. Multi-cultural society.",
            "diningNorms": "Casual dining culture. Outdoor BBQs common. Tipping 10-15% discretionary (not mandatory). Excellent coffee culture (Melbourne). Craft beer popular. Wine regions (Barossa, Yarra Valley)."
        },
        "groupBondingActivities": [
            {
                "activity": "Uluru Sunrise Jeep Expedition",
                "durationHours": "3-4",
                "costPerPerson": "80",
                "whyItWorks": "Pre-dawn group anticipation, desert awakening together, color transformation moment, shared awe at monolith, picnic breakfast bonding, spiritual collective experience"
            },
            {
                "activity": "Sounds of Silence Dinner (Uluru)",
                "durationHours": "4",
                "costPerPerson": "100",
                "whyItWorks": "Group gourmet outdoor dinner on sand dune, champagne toasting, didgeridoo music, stargazing together, 360° landscape views, unforgettable group memory, bucket-list moment"
            },
            {
                "activity": "Great Barrier Reef Snorkeling Expedition",
                "durationHours": "6-8",
                "costPerPerson": "120",
                "whyItWorks": "Group snorkeling together, underwater wonder observation, tropical fish + coral + turtles, shared magic beneath surface, group boat meals, life-changing natural experience"
            },
            {
                "activity": "Mossman Gorge Rainforest + Indigenous Cultural Tour",
                "durationHours": "4",
                "costPerPerson": "60",
                "whyItWorks": "Ancient rainforest exploration together, native tree identification, wildlife spotting group excitement, indigenous guide storytelling, traditional ceremony participation, cultural education bonding"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Park Hyatt Sydney Harbour",
                "city": "Sydney",
                "stars": 5,
                "whyGoodForGroups": "Iconic Opera House views, group dining, luxury base, prime location"
            },
            {
                "name": "Desert Gardens Hotel Uluru",
                "city": "Uluru",
                "stars": 4,
                "whyGoodForGroups": "Only Uluru-facing hotel, group tours, sunset/sunrise viewing, Red Centre access"
            },
            {
                "name": "Paresa Resort Port Douglas",
                "city": "Port Douglas",
                "stars": 4,
                "whyGoodForGroups": "Great Barrier Reef gateway, beach resort, group water activities, tropical paradise"
            }
        ]
    },
    {
        "slug": "china-trek",
        "title": "China",
        "primaryDestinationCity": "Beijing",
        "primaryDestinationCountry": "China",
        "region": "East Asia",
        "durationDays": 10,
        "roughBudgetUsd": 1850,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "China is civilization's cradle—Beijing iconic capital with imperial Forbidden City (UNESCO), Summer Palace, Temple of Heaven, hutong neighborhoods. Great Wall (13,000 miles) hiking through history at Mutianyu or Jinshanling (less crowded, beautiful). Xi'an home to Terracotta Warriors (8,000+ life-size warriors, 2,200 years old) archaeological wonder. City wall bicycle rides. Shaolin Monastery Kung Fu. Mount Huashan world's 'most dangerous' plank walk adventure. Shanghai futuristic (Bund, skyscrapers, modern contrast). Chengdu Giant Pandas. Zhangjiajie mountains (Avatar inspiration). Excellent value (affordable). VPN needed for Western apps. Visa process requires planning. April-May / September-October ideal. Group bonding through iconic historical moments (Great Wall, Terracotta Warriors), shared adventures (Huashan plank walk), and cultural immersion (hutong food tours, cooking classes). Highly recommended for MBA groups seeking world history, iconic landmarks, cultural depth, adventure, and exceptional group bonding.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in PEI, Shanghai ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Beijing Forbidden City + Temple of Heaven + hutong rickshaw tours + acrobatic show",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Huanghuacheng Great Wall section",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Great Wall Hiking (Mutianyu or Jinshanling)",
                        "description": "Group hikes through history together, shared mountain vistas, watchtower exploration, collective sense of accomplishment, iconic photo moments, bonding through physical challenge",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/china/hero.png",
                "alt": "China Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "China is civilization's cradle—Beijing iconic capital with imperial Forbidden City (UNESCO), Summer Palace, Temple of Heaven, hutong neighborhoods. Great Wall (13,000 miles) hiking through history at Mutianyu or Jinshanling (less crowded, beautiful). Xi'an home to Terracotta Warriors (8,000+ life-size warriors, 2,200 years old) archaeological wonder. City wall bicycle rides. Shaolin Monastery Kung Fu. Mount Huashan world's 'most dangerous' plank walk adventure. Shanghai futuristic (Bund, skyscrapers, modern contrast). Chengdu Giant Pandas. Zhangjiajie mountains (Avatar inspiration). Excellent value (affordable). VPN needed for Western apps. Visa process requires planning. April-May / September-October ideal. Group bonding through iconic historical moments (Great Wall, Terracotta Warriors), shared adventures (Huashan plank walk), and cultural immersion (hutong food tours, cooking classes). Highly recommended for MBA groups seeking world history, iconic landmarks, cultural depth, adventure, and exceptional group bonding.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "East Asia"
        ],
        "logistics": {
            "bestSeason": "April-May, September-October (mild weather, clear skies)",
            "visaNotes": "US citizens: 30-day visa-free transit (extended to Dec 31, 2026). Otherwise e-Visa or embassy visa required. Visa process 4-6 weeks.",
            "dailyBudgetRange": "50-150",
            "primaryAirport": "Beijing Capital International (PEI), Shanghai (PVG)",
            "currency": "Chinese Yuan (CNY)",
            "healthNotes": "No specific vaccinations required. Tap water unsafe - use bottled. Air quality varies by region.",
            "transport": {
                "airportToHotel": "Airport express trains, taxis (use meters), ride-sharing (Didi app), pre-arranged transfers",
                "withinCity": "Metro systems (Beijing, Shanghai), buses, taxis (Didi), walking in city centers",
                "betweenDestinations": "High-speed trains (fast, scenic, social), domestic flights, overnight trains (experience)"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Formal, hierarchical, indirect. Face-saving important. Patience valued. Respect for authority. Long-term relationship building prioritized.",
            "businessEtiquette": "Hierarchy paramount. Business cards formal (both hands, careful placement). Titles important. Building personal relationships before business. Patience essential.",
            "socialCustoms": "Collectivist culture. Family paramount. Communist party respected. Harmony valued. Gifts appreciated but check appropriateness. Age respected.",
            "diningNorms": "Shared communal dishes (lazy susan). Toasting common (gunbei = cheers). Never stick chopsticks upright (funeral ritual). Slurping acceptable. Tipping NOT expected (discouraged)."
        },
        "groupBondingActivities": [
            {
                "activity": "Great Wall Hiking (Mutianyu or Jinshanling)",
                "durationHours": "6-8",
                "costPerPerson": "60",
                "whyItWorks": "Group hikes through history together, shared mountain vistas, watchtower exploration, collective sense of accomplishment, iconic photo moments, bonding through physical challenge"
            },
            {
                "activity": "Terracotta Warriors Exploration",
                "durationHours": "4",
                "costPerPerson": "40",
                "whyItWorks": "Awe-inspiring shared moment before 8,000 warriors, group guide explains history, archaeological wonder appreciation, bucket-list collective experience"
            },
            {
                "activity": "Mount Huashan Plank Walk Adventure",
                "durationHours": "6",
                "costPerPerson": "70",
                "whyItWorks": "Extreme group adventure on narrow cliffs, adrenaline rush together, mutual encouragement, breathtaking mountain vistas, unforgettable shared thrill"
            },
            {
                "activity": "Beijing Hutong Food Tour & Cooking Experience",
                "durationHours": "3-4",
                "costPerPerson": "45",
                "whyItWorks": "Group street food exploration, local vendor interactions, cooking class together, group meal celebration, cultural immersion bonding"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Peninsula Beijing",
                "city": "Beijing",
                "stars": 5,
                "whyGoodForGroups": "Luxury base, group dining, near Forbidden City, imperial service"
            },
            {
                "name": "Pullman Xi'an",
                "city": "Xi'an",
                "stars": 4,
                "whyGoodForGroups": "City center location, group tours, Terracotta Warriors nearby"
            },
            {
                "name": "Portman Ritz-Carlton Shanghai",
                "city": "Shanghai",
                "stars": 5,
                "whyGoodForGroups": "Luxury on the Bund, group services, modern China showcase"
            }
        ]
    },
    {
        "slug": "indonesia-trek",
        "title": "Indonesia",
        "primaryDestinationCity": "Jakarta",
        "primaryDestinationCountry": "Indonesia",
        "region": "Southeast Asia",
        "durationDays": 15,
        "roughBudgetUsd": 2180,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Indonesia archipelago of 17,000 islands offers extraordinary cultural/natural diversity—Jakarta bustling capital gateway, colonial Kota Tua old town. Yogyakarta cultural heart with UNESCO Borobudur (world's largest Buddhist temple, sunrise iconic) + Prambanan (Hindu architectural masterpiece), Imperial Palace, Water Castle. Mount Bromo active volcano sunrise trek (sea of clouds dramatic). Ubud spiritual Bali center with rice terraces, Barong traditional dances, family cooking experiences. Bali beaches + Hindu temples (Tanah Lot, Ulun Danu Beratan) + nightlife. Lake Toba world's largest volcanic lake with Batak culture on Samosir Island. Excellent value (very affordable). Visa-free, English growing, friendly. May-September ideal (dry). Group bonding through spiritual temple experiences (Borobudur sunrise), volcano adventures (Mount Bromo), cultural immersion (family dinners, cooking classes, traditional dances), and shared island exploration. Highly recommended for MBA groups seeking spiritual depth, archaeological wonders, natural beauty, cultural immersion, and exceptional group bonding through authentic experiences.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in CGK, Bali Denpasar ",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Jakarta Old Town (Kota Tua)",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Yogyakarta Borobudur temple sunrise + Prambanan + Imperial Palace + Water Castle",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Borobudur Sunrise Trek & Temple Exploration",
                        "description": "Predawn group anticipation, shared sunrise moment over UNESCO temple, group climb through 9 platforms, spiritual collective experience, bucket-list bonding",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/indonesia/hero.png",
                "alt": "Indonesia Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Indonesia archipelago of 17,000 islands offers extraordinary cultural/natural diversity—Jakarta bustling capital gateway, colonial Kota Tua old town. Yogyakarta cultural heart with UNESCO Borobudur (world's largest Buddhist temple, sunrise iconic) + Prambanan (Hindu architectural masterpiece), Imperial Palace, Water Castle. Mount Bromo active volcano sunrise trek (sea of clouds dramatic). Ubud spiritual Bali center with rice terraces, Barong traditional dances, family cooking experiences. Bali beaches + Hindu temples (Tanah Lot, Ulun Danu Beratan) + nightlife. Lake Toba world's largest volcanic lake with Batak culture on Samosir Island. Excellent value (very affordable). Visa-free, English growing, friendly. May-September ideal (dry). Group bonding through spiritual temple experiences (Borobudur sunrise), volcano adventures (Mount Bromo), cultural immersion (family dinners, cooking classes, traditional dances), and shared island exploration. Highly recommended for MBA groups seeking spiritual depth, archaeological wonders, natural beauty, cultural immersion, and exceptional group bonding through authentic experiences.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Southeast Asia"
        ],
        "logistics": {
            "bestSeason": "May-September (dry season, ideal weather)",
            "visaNotes": "US citizens visa-free 30 days. Visa on arrival available. Extensions limited. Tourist visas straightforward.",
            "dailyBudgetRange": "30-100",
            "primaryAirport": "Jakarta Soekarno-Hatta (CGK), Bali Denpasar (DPS)",
            "currency": "Indonesian Rupiah (IDR)",
            "healthNotes": "Malaria in rural areas (rare in tourist zones). Hepatitis A/B recommended. Tap water unsafe - bottled only. Travel insurance recommended.",
            "transport": {
                "airportToHotel": "Airport taxis, ride-sharing (Gojek, Grab), hotel transfers, shuttles",
                "withinCity": "Taxis, ride-sharing, traditional becak (3-wheelers), motorbikes, buses",
                "betweenDestinations": "Trains (Java, scenic), flights (necessary between islands), ferries, buses"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Polite, indirect, warm. Hierarchy respected. Relationship-building important. Smiles common. Respect for elders paramount. Religion (Islam/Hinduism) significant.",
            "businessEtiquette": "Handshakes common but gentle. Right hand important. Business cards formal. Building personal relationships before business. Patience valued.",
            "socialCustoms": "Communal, family-focused. Hindu-Muslim respect important. Temple etiquette (remove shoes, modest dress). Respect for religious sites. Hospitality paramount.",
            "diningNorms": "Shared dishes common. Spicy is default. Rice staple. Eating with right hand acceptable. Never waste food (disrespectful). Tipping appreciated but not mandatory."
        },
        "groupBondingActivities": [
            {
                "activity": "Borobudur Sunrise Trek & Temple Exploration",
                "durationHours": "5",
                "costPerPerson": "65",
                "whyItWorks": "Predawn group anticipation, shared sunrise moment over UNESCO temple, group climb through 9 platforms, spiritual collective experience, bucket-list bonding"
            },
            {
                "activity": "Mount Bromo Sunrise Jeep Adventure",
                "durationHours": "6",
                "costPerPerson": "55",
                "whyItWorks": "Group jeep adventure at dawn, summit climb together, sunrise over volcanic crater + sea of clouds, shared adrenaline, dramatic landscape appreciation"
            },
            {
                "activity": "Ubud Rice Field Exploration & Barong Dance",
                "durationHours": "4-5",
                "costPerPerson": "60",
                "whyItWorks": "Group rickshaw through emerald terraces, traditional dance performance together, cultural education, group photo moments in iconic landscape"
            },
            {
                "activity": "Family Home Cooking Class & Group Dinner (Ubud)",
                "durationHours": "4-5",
                "costPerPerson": "50",
                "whyItWorks": "Hands-on group cooking with Balinese family, market exploration, group meal in home, intimate cultural exchange, authentic community connection"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Mandarin Oriental Jakarta",
                "city": "Jakarta",
                "stars": 5,
                "whyGoodForGroups": "Luxury gateway, group dining, cultural base"
            },
            {
                "name": "The Oberoi Bali",
                "city": "Bali",
                "stars": 5,
                "whyGoodForGroups": "Beach resort, cultural immersion, group activities"
            },
            {
                "name": "Amanjiwo (near Borobudur)",
                "city": "Yogyakarta",
                "stars": 5,
                "whyGoodForGroups": "Temple location, luxury, group experiences"
            }
        ]
    },
    {
        "slug": "singapore-trek",
        "title": "Singapore",
        "primaryDestinationCity": "Marina Bay",
        "primaryDestinationCountry": "Singapore",
        "region": "Southeast Asia",
        "durationDays": 3,
        "roughBudgetUsd": 620,
        "themes": [
            "Culture",
            "Adventure",
            "Business"
        ],
        "summary": "Singapore is Asia's ultra-modern city-state—Marina Bay iconic with glittering Marina Bay Sands hotel (200m rooftop infinity pool) + Gardens by the Bay (Flower Dome, Cloud Forest, Supertree Grove magical light shows). Sentosa Island resort destination (Universal Studios, S.E.A Aquarium, beaches, ziplining). Chinatown multicultural heart (temples, hawker centers street food heaven, shopping). Little India fragrant bazaars + Hindu temples. Kampong Glam Arab Street heritage + Haji Lane trendy nightlife. Singapore Zoo award-winning (4,200+ animals, open-concept). Singapore Botanic Gardens UNESCO. Orchard Road luxury shopping. Excellent English-speaking, ultra-safe, world-class public transport (MRT), impeccable infrastructure. Very expensive ($$$$) but premium experience. November-March ideal (cooler). Efficient 3-5 day visit covers everything. Strong group bonding through iconic urban moments (Marina Bay Sands SkyPark), island adventures (Sentosa), multicultural exploration (three neighborhoods in one day), and night experiences (light shows, rooftop bars, Haji Lane nightlife). Highly recommended for MBA groups seeking modern Asian showcase, efficient urban exploration, world-class attractions, ultimate convenience, and group bonding through contemporary luxury experiences and multicultural immersion.",
        "schoolSlugs": [
            "columbia",
            "wharton",
            "harvard",
            "booth",
            "kellogg",
            "stanford"
        ],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in SIN, excellent global hub",
                "items": [
                    {
                        "title": "Landing & Check-in",
                        "description": "Arrive at primary gateway and transfer to group hotel.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Welcome Dinner",
                        "description": "Meet the cohort for a traditional welcome banquet.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Cultural Immersion",
                "items": [
                    {
                        "title": "Marina Bay Sands + Gardens by the Bay (Supertree Grove light show) + Merlion Park photos",
                        "description": "Explore iconic landmarks and historical sites.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Networking Lunch",
                        "description": "Group lunch with local insights.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 3,
                "title": "The Main Event",
                "items": [
                    {
                        "title": "Sentosa Island cable car + Universal Studios OR Siloso Beach",
                        "description": "Deep dive into the region's most famous natural wonder.",
                        "timeBucket": "Afternoon"
                    },
                    {
                        "title": "Group Social",
                        "description": "Evening networking and cultural performance.",
                        "timeBucket": "Night"
                    }
                ]
            },
            {
                "dayIndex": 4,
                "title": "MBA Special Activity",
                "items": [
                    {
                        "title": "Marina Bay Sands SkyPark Observation + Gardens by the Bay Evening Show",
                        "description": "Group at 200m observatory deck with 360° views, photos together against skyline, Gardens evening light show group spectacle, iconic Singapore moment, magical synchronization",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Local Market Visit",
                        "description": "Interactive session with local artisans and vendors.",
                        "timeBucket": "Afternoon"
                    }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Final Farewells",
                "items": [
                    {
                        "title": "Reflection Session",
                        "description": "Morning debrief and photos.",
                        "timeBucket": "Morning"
                    },
                    {
                        "title": "Departure",
                        "description": "Transfer to airport for flights back to campus.",
                        "timeBucket": "Afternoon"
                    }
                ]
            }
        ],
        "photos": [
            {
                "path": "/trips/singapore/hero.png",
                "alt": "Singapore Skyline",
                "isHero": true
            }
        ],
        "reviewSnippets": [
            {
                "text": "Singapore is Asia's ultra-modern city-state—Marina Bay iconic with glittering Marina Bay Sands hotel (200m rooftop infinity pool) + Gardens by the Bay (Flower Dome, Cloud Forest, Supertree Grove magical light shows). Sentosa Island resort destination (Universal Studios, S.E.A Aquarium, beaches, ziplining). Chinatown multicultural heart (temples, hawker centers street food heaven, shopping). Little India fragrant bazaars + Hindu temples. Kampong Glam Arab Street heritage + Haji Lane trendy nightlife. Singapore Zoo award-winning (4,200+ animals, open-concept). Singapore Botanic Gardens UNESCO. Orchard Road luxury shopping. Excellent English-speaking, ultra-safe, world-class public transport (MRT), impeccable infrastructure. Very expensive ($$$$) but premium experience. November-March ideal (cooler). Efficient 3-5 day visit covers everything. Strong group bonding through iconic urban moments (Marina Bay Sands SkyPark), island adventures (Sentosa), multicultural exploration (three neighborhoods in one day), and night experiences (light shows, rooftop bars, Haji Lane nightlife). Highly recommended for MBA groups seeking modern Asian showcase, efficient urban exploration, world-class attractions, ultimate convenience, and group bonding through contemporary luxury experiences and multicultural immersion.",
                "sourceName": "MBA Trek Hub",
                "tag": "culture"
            }
        ],
        "safetyRating": 4,
        "comfortRating": 5,
        "vibes": [
            "immersive",
            "well-organized",
            "Southeast Asia"
        ],
        "logistics": {
            "bestSeason": "November-March (cooler, less humid, 24-31°C)",
            "visaNotes": "US citizens visa-free 90 days. Entry straightforward, no visa required. Easy exit/entry for regional travel.",
            "dailyBudgetRange": "80-200",
            "primaryAirport": "Changi International (SIN), excellent global hub",
            "currency": "Singapore Dollar (SGD)",
            "healthNotes": "Excellent healthcare. Tap water excellent. Very safe. No vaccinations required. Insurance optional but recommended.",
            "transport": {
                "airportToHotel": "Trains (fast, cheap, convenient to city), taxis, ride-sharing (Grab), hotel shuttles",
                "withinCity": "MRT metro system (world-class, English signs, easy), buses, taxis, walk between neighborhoods, no tipping taxis",
                "betweenDestinations": "High-speed trains to Malaysia, ferries to islands, flights regional"
            }
        },
        "culturalIntelligence": {
            "communicationStyle": "Formal, English proficient, direct. Multicultural respect important. Efficiency valued. Humor appreciated. Modesty around religious sites.",
            "businessEtiquette": "Handshakes standard. Business cards formal (right hand). Hierarchy respected but more egalitarian than Asia generally. Efficiency emphasized.",
            "socialCustoms": "Multicultural harmony paramount (Chinese, Malay, Indian, Western influence). Religion respected (Islam, Buddhism, Hinduism, Christianity). Diverse festivals. Clean, orderly society.",
            "diningNorms": "Diverse cuisines (Asian fusion, Western). Rice staple at hawker centers. Fork/spoon standard. Tipping 10% appreciated (service charge often included in restaurants). Hawker culture iconic."
        },
        "groupBondingActivities": [
            {
                "activity": "Marina Bay Sands SkyPark Observation + Gardens by the Bay Evening Show",
                "durationHours": "3-4",
                "costPerPerson": "85",
                "whyItWorks": "Group at 200m observatory deck with 360° views, photos together against skyline, Gardens evening light show group spectacle, iconic Singapore moment, magical synchronization"
            },
            {
                "activity": "Sentosa Island Full Day (Universal Studios or Beach)",
                "durationHours": "8-10",
                "costPerPerson": "120",
                "whyItWorks": "All-day group fun, theme park rides together, island atmosphere, cable car arrival scenic, group memories, party island vibe in evening"
            },
            {
                "activity": "Chinatown/Little India/Kampong Glam Multicultural Walking Tour",
                "durationHours": "4-5",
                "costPerPerson": "40",
                "whyItWorks": "Group cultural exploration, street food sampling together, temple visits, diverse neighborhood discovery, authentic local interactions, shopping together"
            },
            {
                "activity": "Singapore Zoo & Mandai Wildlife Reserve Nature Day",
                "durationHours": "6-8",
                "costPerPerson": "60",
                "whyItWorks": "Group wildlife appreciation, open-concept enclosure exploration, family-friendly bonding, garden strolls, ecological education, peaceful nature contrast to urban intensity"
            }
        ],
        "premiumAccommodations": [
            {
                "name": "Marina Bay Sands",
                "city": "Marina Bay",
                "stars": 5,
                "whyGoodForGroups": "Iconic location, group dining, rooftop infinity pool, theater, premium experience"
            },
            {
                "name": "Four Seasons Singapore",
                "city": "Orchard Road",
                "stars": 5,
                "whyGoodForGroups": "Luxury gardens location, shopping, convenient"
            },
            {
                "name": "Shangri-La's Rasa Sentosa",
                "city": "Sentosa Island",
                "stars": 5,
                "whyGoodForGroups": "Beach resort, island location, activities hub"
            }
        ]
    },
    {
        "slug": "tanzania-trek",
        "title": "Tanzania",
        "primaryDestinationCountry": "Tanzania",
        "primaryDestinationCity": "Serengeti",
        "region": "Africa",
        "durationDays": 8,
        "roughBudgetUsd": 3500,
        "themes": ["Adventure", "Luxury"],
        "summary": "Tanzania offers the ultimate African safari experience. From witnessing the Great Migration in the Serengeti to the breathtaking Ngorongoro Crater, this trek is a once-in-a-lifetime journey to the heart of the wild.",
        "schoolSlugs": ["wharton", "harvard", "kellogg"],
        "days": [
            {
                "dayIndex": 1,
                "title": "Arrival in Kilimanjaro",
                "items": [
                    { "title": "Touchdown", "description": "Arrive at JRO and transfer to the lodge in Arusha.", "timeBucket": "Evening" }
                ]
            },
            {
                "dayIndex": 2,
                "title": "Tarangire National Park",
                "items": [
                    { "title": "First Safari", "description": "Witness massive elephant herds and Baobab trees.", "timeBucket": "All Day" }
                ]
            },
            {
                "dayIndex": 3,
                "title": "Ngorongoro Crater",
                "items": [
                    { "title": "Crater Descent", "description": "Search for the Big Five in this ancient caldera.", "timeBucket": "Morning" }
                ]
            },
            {
                "dayIndex": 4,
                "title": "Serengeti Migration",
                "items": [
                    { "title": "Plains Expedition", "description": "Drive into the endless plains of the Serengeti.", "timeBucket": "All Day" }
                ]
            },
            {
                "dayIndex": 5,
                "title": "Serengeti Deep Safari",
                "items": [
                    { "title": "Hot Air Balloon Flight", "description": "Optional sunrise balloon ride over the herds.", "timeBucket": "Morning" },
                    { "title": "Afternoon Drive", "description": "Leopard and cheetah tracking.", "timeBucket": "Afternoon" }
                ]
            },
            {
                "dayIndex": 6,
                "title": "Maasai Village Visit",
                "items": [
                    { "title": "Cultural Exchange", "description": "Learn about traditional Maasai culture.", "timeBucket": "Morning" }
                ]
            },
            {
                "dayIndex": 7,
                "title": "Zanzibar Extension (Optional)",
                "items": [
                    { "title": "Fly to Stone Town", "description": "Leave the plains for the spice island beaches.", "timeBucket": "Morning" }
                ]
            },
            {
                "dayIndex": 8,
                "title": "Farewell",
                "items": [
                    { "title": "Departure", "description": "Fly home from JRO or ZNZ.", "timeBucket": "Morning" }
                ]
            }
        ],
        "photos": [{ "path": "/trips/tanzania/hero.png", "alt": "Serengeti Safari", "isHero": true }],
        "reviewSnippets": [{ "text": "A life-changing experience seeing the migration.", "sourceName": "MBA Trek Hub", "tag": "adventure" }],
        "safetyRating": 4,
        "comfortRating": 4,
        "vibes": ["wild", "safari", "scenic"],
        "logistics": {
            "bestSeason": "June-October",
            "visaNotes": "eVisa required for most",
            "dailyBudgetRange": "300-600",
            "primaryAirport": "JRO",
            "currency": "Tanzanian Shilling (TZS)",
            "healthNotes": "Yellow fever and malaria prohylaxis recommended",
            "transport": { "airportToHotel": "Transfer", "withinCity": "4x4 Safari Vehicle", "betweenDestinations": "Bush flights" }
        },
        "culturalIntelligence": {
            "communicationStyle": "Direct and welcoming",
            "businessEtiquette": "Polite and respectful",
            "socialCustoms": "Greeting elders first is polite",
            "diningNorms": "Eat with the right hand if eating traditionally"
        },
        "groupBondingActivities": [{ "activity": "Bush Dinner", "durationHours": 3, "costPerPerson": 100, "whyItWorks": "Dinner under the stars with a bonfire." }],
        "premiumAccommodations": [{ "name": "Four Seasons Safari Lodge", "stars": 5, "city": "Serengeti", "whyGoodForGroups": "Luxury in the wild, great pool." }]
    }
];

export const getTripTemplateBySlug = (slug: string) => {
    return tripTemplates.find((t) => t.slug === slug);
};

export const getAllTripTemplates = () => tripTemplates;
