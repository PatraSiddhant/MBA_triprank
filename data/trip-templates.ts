export type ItineraryItem = {
    title: string;
    description: string;
    timeBucket: "Morning" | "Afternoon" | "Evening" | "Night";
    costEstimate?: string;
    link?: string;
};

export type ItineraryDay = {
    dayIndex: number;
    title: string;
    items: ItineraryItem[];
};

export type ReviewSnippet = {
    text: string;
    sourceName: string;
    sourceUrl?: string;
    tag: "logistics" | "nightlife" | "culture" | "value";
};

export type TripTemplate = {
    slug: string;
    title: string;
    primaryDestinationCity: string;
    primaryDestinationCountry: string;
    durationDays: number;
    roughBudgetUsd: number;
    themes: ("Adventure" | "Culture" | "Business" | "Party" | "Luxury" | "Sustainability" | "Food & Wine" | "Tech")[];
    summary: string;
    schoolSlugs: string[];
    days: ItineraryDay[];
    photos: {
        path: string;
        alt: string;
        attribution?: string;
        isHero?: boolean;
    }[];
    reviewSnippets: ReviewSnippet[];
    safetyRating: number;
    comfortRating: number;
    vibes: string[];
};

export const tripTemplates: TripTemplate[] = [
    {
        slug: "colombia-trek",
        title: "Colombia: The Biggest MBA Trek",
        primaryDestinationCity: "Medellin",
        primaryDestinationCountry: "Colombia",
        durationDays: 5,
        roughBudgetUsd: 2000,
        themes: ["Party", "Culture"],
        summary: "High-energy exploration of Medellin and Cartagena, featuring vibrant street art, Caribbean beaches, and legendary nightlife.",
        schoolSlugs: ["wharton", "columbia", "harvard", "booth", "kellogg", "stanford"],
        safetyRating: 4,
        comfortRating: 4,
        vibes: ["high-energy", "colorful", "nightlife", "transformation"],
        days: [
            {
                dayIndex: 1,
                title: "Medellin Arrival & Street Art",
                items: [
                    { title: "Arrival", description: "Check into El Poblado hotel.", timeBucket: "Morning" },
                    { title: "Comuna 13 Tour", description: "Graffiti tour with local guides showing transformation.", timeBucket: "Afternoon" },
                    { title: "Poblado Nightlife", description: "Dinner and drinks in Medellin's most famous nightlife district.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 2,
                title: "Guatape Adventure",
                items: [
                    { title: "El Peñol Climb", description: "740 steps to the top for 360-degree views.", timeBucket: "Morning" },
                    { title: "Lakeside Lunch", description: "Fresh trout by the reservoir.", timeBucket: "Afternoon" },
                    { title: "Paisa Party", description: "Traditional Colombian music and aguardiente.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 3,
                title: "Fly to Cartagena",
                items: [
                    { title: "Walled City Walk", description: "Explore the historic UNESCO heritage site.", timeBucket: "Afternoon" },
                    { title: "Sunset at Cafe del Mar", description: "Drinks on the city walls.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Rosario Islands",
                items: [
                    { title: "Boat Trip", description: "Snorkeling and beach hopping.", timeBucket: "Morning" },
                    { title: "Playa Blanca", description: "Lunch and relaxation on the white sand.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 5,
                title: "Departure",
                items: [
                    { title: "Last Tacos", description: "Final Colombian delicacies before flight.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [
            { path: "/trips/colombia/hero.png", alt: "Cartagena Walled City", isHero: true },
            { path: "/trips/colombia/comuna13.png", alt: "Medellin Street Art" }
        ],
        reviewSnippets: [
            { text: "Mix of party, culture, and activities tailored to pace desired by each group.", sourceName: "Reddit MBA", tag: "logistics" },
            { text: "Full-on networking events on flights. Paisa Party is a must.", sourceName: "Wharton Student Blog", tag: "nightlife" }
        ]
    },
    {
        slug: "japan-culture-tech",
        title: "Japan: Tech & Tradition",
        primaryDestinationCity: "Tokyo",
        primaryDestinationCountry: "Japan",
        durationDays: 5,
        roughBudgetUsd: 3500,
        themes: ["Business", "Tech", "Culture"],
        summary: "An immersive journey from the neon streets of Tokyo to the serene temples of Kyoto, blending business insights with deep cultural experiences.",
        schoolSlugs: ["columbia", "wharton", "harvard", "booth", "kellogg", "stanford"],
        safetyRating: 5,
        comfortRating: 5,
        vibes: ["immersive", "organized", "tech-focused", "traditional"],
        days: [
            {
                dayIndex: 1,
                title: "Tokyo Modernity",
                items: [
                    { title: "Shibuya Crossing", description: "Witness the world's busiest intersection.", timeBucket: "Afternoon" },
                    { title: "Shinjuku Night Walk", description: "Exploration of Omoide Yokocho (Piss Alley).", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 2,
                title: "Tech Corporate Visits",
                items: [
                    { title: "Samsung R&D / Startups", description: "Insight into Asian corporate giants and innovation.", timeBucket: "Morning" },
                    { title: "Akihabara Tech District", description: "Electronic town and gaming culture.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 3,
                title: "Kyoto Heritage",
                items: [
                    { title: "Shinkansen", description: "Bullet train ride to Kyoto.", timeBucket: "Morning" },
                    { title: "Gion District", description: "Geisha district evening walk.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Temples & Zen",
                items: [
                    { title: "Golden Pavilion", description: "Visit the stunning Kinkakuji.", timeBucket: "Morning" },
                    { title: "Zen Meditation", description: "Private session at a local temple.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 5,
                title: "Osaka Food Extension",
                items: [
                    { title: "Dotonbori", description: "The nation's kitchen food tour.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [
            { path: "/trips/japan/hero.png", alt: "Tokyo Tower Skyline", isHero: true },
            { path: "/trips/japan/kyoto.png", alt: "Golden Pavilion Kyoto" }
        ],
        reviewSnippets: [
            { text: "Everything runs on time to the minute. Karaoke final night was a must!", sourceName: "IESE Blog", tag: "logistics" },
            { text: "STEP was one of the biggest highlights of my whole GSB experience.", sourceName: "Stanford GSB Student", tag: "culture" }
        ]
    },
    {
        slug: "uae-luxury-finance",
        title: "UAE: The Future of Finance",
        primaryDestinationCity: "Dubai",
        primaryDestinationCountry: "UAE",
        durationDays: 5,
        roughBudgetUsd: 3000,
        themes: ["Business", "Luxury"],
        summary: "Explore the global financial hub of Dubai and the cultural heart of Abu Dhabi, featuring top-tier corporate visits and luxury desert experiences.",
        schoolSlugs: ["columbia", "wharton", "harvard", "lbs"],
        safetyRating: 5,
        comfortRating: 5,
        vibes: ["luxury", "modern", "networking", "futuristic"],
        days: [
            {
                dayIndex: 1,
                title: "Dubai Skyline",
                items: [
                    { title: "Burj Khalifa", description: "Sunset from the world's tallest building.", timeBucket: "Evening" },
                    { title: "Dubai Marina", description: "Dinner with views of the artificial marina.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 2,
                title: "Corporate Excellence",
                items: [
                    { title: "McKinsey/Bain Visits", description: "Meetings with regional leadership.", timeBucket: "Morning" },
                    { title: "Emaar Real Estate", description: "Tour of mega-development projects.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 3,
                title: "Abu Dhabi Day Trip",
                items: [
                    { title: "Sheikh Zayed Mosque", description: "Architectural marvel visit.", timeBucket: "Morning" },
                    { title: "Louvre Abu Dhabi", description: "Art and architecture on Saadiyat Island.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 4,
                title: "Desert Adventure",
                items: [
                    { title: "Desert Safari", description: "Dune bashing and traditional dinner under stars.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 5,
                title: "Networking",
                items: [
                    { title: "Alumni Brunch", description: "Meet with Gulf region MBA alumni.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [
            { path: "/trips/uae/hero.png", alt: "Dubai Marina at Night", isHero: true },
            { path: "/trips/uae/mosque.png", alt: "Sheikh Zayed Mosque" }
        ],
        reviewSnippets: [
            { text: "Impressive alumni network in Gulf region. Welcoming companies.", sourceName: "LBS Blog", tag: "value" }
        ]
    },
    {
        slug: "india-heritage",
        title: "India: The Golden Triangle",
        primaryDestinationCity: "Delhi",
        primaryDestinationCountry: "India",
        durationDays: 5,
        roughBudgetUsd: 1500,
        themes: ["Culture", "Business"],
        summary: "A journey through the heart of India, visiting the Taj Mahal and the royal palaces of Jaipur, with insights into emerging markets.",
        schoolSlugs: ["columbia", "wharton", "harvard", "booth", "kellogg"],
        safetyRating: 3,
        comfortRating: 3,
        vibes: ["immersive", "historical", "chaotic", "colorful"],
        days: [
            {
                dayIndex: 1,
                title: "Delhi Senses",
                items: [
                    { title: "Chandni Chowk", description: "Old Delhi rickshaw and food tour.", timeBucket: "Morning" },
                    { title: "New Delhi Tour", description: "India Gate and Rashtrapati Bhavan.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 2,
                title: "Taj Mahal Sunrise",
                items: [
                    { title: "Sunrise Visit", description: "Witness the iconic Seven Wonder.", timeBucket: "Morning" },
                    { title: "Agra Fort", description: "Explore the Mughal capital.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 3,
                title: "The Pink City",
                items: [
                    { title: "Amber Fort", description: "Palatial complex on the hill.", timeBucket: "Morning" },
                    { title: "Hawa Mahal", description: "Photo op at Palace of Winds.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 4,
                title: "Mumbai Business",
                items: [
                    { title: "Fintech Visits", description: "Insight into India's digital payments boom.", timeBucket: "Morning" }
                ]
            },
            {
                dayIndex: 5,
                title: "Departure",
                items: [
                    { title: "Final Market Shopping", description: "Souvenirs from Colaba Causeway.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [
            { path: "/trips/india/hero.png", alt: "Taj Mahal at Sunrise", isHero: true }
        ],
        reviewSnippets: [
            { text: "Eye-opening socio-economic contrasts. Food tours are the highlight.", sourceName: "Columbia Student", tag: "culture" }
        ]
    },
    {
        slug: "mexico-treasures",
        title: "Mexico: Ruins & Riviera",
        primaryDestinationCity: "Mexico City",
        primaryDestinationCountry: "Mexico",
        durationDays: 5,
        roughBudgetUsd: 2000,
        themes: ["Food \u0026 Wine", "Culture", "Adventure"],
        summary: "The ultimate balance of historic Mexico City culture and the pristine beaches of Tulum, with a focus on world-class gastronomy.",
        schoolSlugs: ["columbia", "wharton", "kellogg", "booth"],
        safetyRating: 4,
        comfortRating: 4,
        vibes: ["vibrant", "historic", "beach", "foodie paradise"],
        days: [
            {
                dayIndex: 1,
                title: "CDMX Gastronomy",
                items: [
                    { title: "Roma/Condesa Taco Tour", description: "Best street food in the city.", timeBucket: "Afternoon" },
                    { title: "Pujol Dinner", description: "World-class dining experience.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 2,
                title: "Ancient Pyramids",
                items: [
                    { title: "Teotihuacan", description: "Climb the Pyramid of the Sun.", timeBucket: "Morning" },
                    { title: "Anthropology Museum", description: "World-leading historical collection.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 3,
                title: "Fly to the Coast",
                items: [
                    { title: "Tulum Arrival", description: "Check into eco-resort.", timeBucket: "Afternoon" },
                    { title: "Beach Sunset", description: "Sunset drinks by the Caribbean.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Cenotes & Ruins",
                items: [
                    { title: "Tulum Ruins", description: "Mayan city on the cliff.", timeBucket: "Morning" },
                    { title: "Gran Cenote Swim", description: "Refreshment in underground caves.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 5,
                title: "Departure",
                items: [
                    { title: "Yoga & Brunch", description: "Typical Tulum morning.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [
            { path: "/trips/mexico/hero.png", alt: "Teotihuacan Pyramids", isHero: true }
        ],
        reviewSnippets: [
            { text: "Incredible food scene and rich cultural depth. Perfect balance of history and beach.", sourceName: "Kellogg Student", tag: "culture" }
        ]
    },
    {
        slug: "iceland-nature",
        title: "Iceland: Fire & Ice",
        primaryDestinationCity: "Reykjavik",
        primaryDestinationCountry: "Iceland",
        durationDays: 4,
        roughBudgetUsd: 3000,
        themes: ["Sustainability", "Adventure"],
        summary: "Witness the raw power of nature with geothermal spas, volcanic landscapes, and insights into 100% renewable energy systems.",
        schoolSlugs: ["harvard", "wharton", "booth"],
        safetyRating: 5,
        comfortRating: 4,
        vibes: ["ethereal", "remote", "pristine", "adventurous"],
        days: [
            {
                dayIndex: 1,
                title: "Reykjavik Vibe",
                items: [
                    { title: "City Exploration", description: "Rainbow street and Hallgrimskirkja.", timeBucket: "Afternoon" },
                    { title: "Northern Lights Hunt", description: "Guided search for the Aurora (Seasonal).", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 2,
                title: "The Golden Circle",
                items: [
                    { title: "Gullfoss Waterfall", description: "The Golden Falls.", timeBucket: "Morning" },
                    { title: "Geysir", description: "Erupting hot springs.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 3,
                title: "Geothermal Power",
                items: [
                    { title: "Blue Lagoon Spa", description: "Milky blue waters geothermal experience.", timeBucket: "Morning" },
                    { title: "Renewable Tech Visits", description: "Insight into Iceland's energy grid.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 4,
                title: "Glacier Hike",
                items: [
                    { title: "Solheimajokull", description: "Hiking on ancient ice.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [
            { path: "/trips/iceland/hero.png", alt: "Blue Lagoon Iceland", isHero: true }
        ],
        reviewSnippets: [
            { text: "Giving sense for how powerful HBS network is - got access to tons of startups.", sourceName: "HBS Blog", tag: "value" }
        ]
    },
    {
        slug: "south-africa-adventure",
        title: "South Africa: The Rainbow Nation",
        primaryDestinationCity: "Cape Town",
        primaryDestinationCountry: "South Africa",
        durationDays: 5,
        roughBudgetUsd: 3000,
        themes: ["Adventure", "Culture"],
        summary: "From the peak of Table Mountain to the winelands of Stellenbosch and the penguin colonies of Boulder's Beach.",
        schoolSlugs: ["columbia", "wharton", "insead"],
        safetyRating: 4,
        comfortRating: 5,
        vibes: ["scenic", "vibrant", "diverse", "adventurous"],
        days: [
            {
                dayIndex: 1,
                title: "Table Mountain",
                items: [
                    { title: "Cable Car", description: "Check out the views of the city.", timeBucket: "Morning" },
                    { title: "V&A Waterfront", description: "Shopping and dining at the harbor.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 2,
                title: "Cape Peninsula",
                items: [
                    { title: "Boulders Beach", description: "Visit the penguin colony.", timeBucket: "Morning" },
                    { title: "Cape of Good Hope", description: "The southern tip of Africa.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 3,
                title: "Winelands",
                items: [
                    { title: "Stellenbosch Tour", description: "Wine tasting in the valleys.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 4,
                title: "Shark Diving",
                items: [
                    { title: "Gansbaai", description: "Cage diving with Great Whites (Optional).", timeBucket: "Morning" }
                ]
            },
            {
                dayIndex: 5,
                title: "Departure",
                items: [
                    { title: "Kirstenbosch Garden", description: "Walk through the botanical gardens.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [
            { path: "/trips/south-africa/hero.png", alt: "Table Mountain View", isHero: true }
        ],
        reviewSnippets: [
            { text: "Food and wine quality for the price is unbeatable.", sourceName: "TripAdvisor", tag: "value" }
        ]
    },
    {
        slug: "vietnam-culture",
        title: "Vietnam: North to Central",
        primaryDestinationCity: "Hanoi",
        primaryDestinationCountry: "Vietnam",
        durationDays: 5,
        roughBudgetUsd: 1800,
        themes: ["Food \u0026 Wine", "Culture"],
        summary: "Navigate the chaos of Hanoi, cruise through Ha Long Bay, and experience the lantern-lit charm of Hoi An.",
        schoolSlugs: ["columbia", "wharton", "kellogg"],
        safetyRating: 5,
        comfortRating: 4,
        vibes: ["bustling", "cultural", "scenic", "foodie"],
        days: [
            {
                dayIndex: 1,
                title: "Hanoi Old Quarter",
                items: [
                    { title: "Street Food Tour", description: "Bun Cha and Egg Coffee.", timeBucket: "Afternoon" },
                    { title: "Night Market", description: "Shopping in the historic center.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 2,
                title: "Ha Long Bay",
                items: [
                    { title: "Cruise", description: "Full day boat trip through limestone karsts.", timeBucket: "Morning" },
                    { title: "Kayaking", description: "Explore the hidden lagoons.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 3,
                title: "Fly to Da Nang",
                items: [
                    { title: "Hoi An Walk", description: "Ancient town and Japanese Bridge.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Tailor Made",
                items: [
                    { title: "Suit Tailoring", description: "Get custom suits made in 24h.", timeBucket: "Morning" },
                    { title: "Lantern Making", description: "Traditional craft workshop.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 5,
                title: "Departure",
                items: [
                    { title: "Final Banh Mi", description: "One last sandwich for the road.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [
            { path: "/trips/vietnam/hero.png", alt: "Ha Long Bay", isHero: true }
        ],
        reviewSnippets: [
            { text: "Incredibly affordable and the people are so friendly.", sourceName: "MBA Reddit", tag: "value" }
        ]
    },
    {
        slug: "patagonia-adventure",
        title: "Patagonia: Base of the Towers",
        primaryDestinationCity: "El Calafate",
        primaryDestinationCountry: "Argentina",
        durationDays: 5,
        roughBudgetUsd: 3500,
        themes: ["Adventure"],
        summary: "A rugged expedition through the glaciers of Argentina and the granite peaks of Chile's Torres del Paine.",
        schoolSlugs: ["columbia", "harvard", "booth", "kellogg"],
        safetyRating: 4,
        comfortRating: 3,
        vibes: ["remote", "rugged", "breathtaking", "outdoor-focused"],
        days: [
            {
                dayIndex: 1,
                title: "Perito Moreno Glacier",
                items: [
                    { title: "Ice Trekking", description: "Walk on the world's most famous advancing glacier.", timeBucket: "Morning" }
                ]
            },
            {
                dayIndex: 2,
                title: "El Chalten Hiking",
                items: [
                    { title: "Fitz Roy Base", description: "Hike to Laguna de los Tres for iconic views.", timeBucket: "Morning" }
                ]
            },
            {
                dayIndex: 3,
                title: "Torres del Paine",
                items: [
                    { title: "Base Towers Hike", description: "Strenuous 8-10 hour hike to the granite pillars.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [{ path: "/trips/patagonia/hero.png", alt: "Fitz Roy Peak", isHero: true }],
        reviewSnippets: [{ text: "Once-in-a-lifetime adventure. Incredible natural beauty.", sourceName: "Booth Blog", tag: "culture" }]
    },
    {
        slug: "portugal-wine",
        title: "Portugal: Douro Valley & Fado",
        primaryDestinationCity: "Lisbon",
        primaryDestinationCountry: "Portugal",
        durationDays: 5,
        roughBudgetUsd: 2500,
        themes: ["Food \u0026 Wine", "Culture", "Luxury"],
        summary: "Savor the flavors of Portugal from the historic hills of Lisbon to the terraced vineyards of the Douro Valley.",
        schoolSlugs: ["columbia", "wharton", "booth", "iese"],
        safetyRating: 5,
        comfortRating: 5,
        vibes: ["laid-back", "culinary", "scenic", "historic"],
        days: [
            {
                dayIndex: 1,
                title: "Lisbon Soul",
                items: [
                    { title: "Alfama Walk", description: "Medieval streets and Fado music.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 2,
                title: "Sintra Fairy Tale",
                items: [
                    { title: "Pena Palace", description: "Visit the colorful 19th-century romanticist castle.", timeBucket: "Morning" }
                ]
            },
            {
                dayIndex: 3,
                title: "Porto & Ribera",
                items: [
                    { title: "Wine Cellars", description: "Port tasting at Graham's or Taylor's.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/portugal/hero.png", alt: "Lisbon Yellow Tram", isHero: true }],
        reviewSnippets: [{ text: "Perfect mix of culture and relaxation. Douro Valley is the highlight.", sourceName: "Columbia Wine Club", tag: "value" }]
    },
    {
        slug: "south-korea-tech",
        title: "South Korea: Seoul 24/7",
        primaryDestinationCity: "Seoul",
        primaryDestinationCountry: "South Korea",
        durationDays: 5,
        roughBudgetUsd: 2500,
        themes: ["Tech", "Culture"],
        summary: "Experience the frenetic energy of Seoul, from cutting-edge tech Samsung visits to late-night Gangnam K-BBQ, balanced with ancient palaces and world-class nightlife.",
        schoolSlugs: ["columbia", "wharton", "harvard", "stanford"],
        safetyRating: 5,
        comfortRating: 5,
        vibes: ["fast-paced", "innovative", "trendy", "efficient"],
        days: [
            {
                dayIndex: 1,
                title: "Arrival & Gangnam",
                items: [
                    { title: "Arrival", description: "Check in near Gangnam or Myeongdong.", timeBucket: "Afternoon" },
                    { title: "K-BBQ Dinner", description: "BBQ dinner, stroll Gangnam streets, dessert cafés.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "K-Tech & Startups",
                items: [
                    { title: "Tech Visits", description: "Major tech companies (Samsung HQ) or Pangyo Techno Valley.", timeBucket: "Morning" },
                    { title: "Startup Hub", description: "Hub/co-working space, guest talk with founder.", timeBucket: "Afternoon" },
                    { title: "Soju Bars", description: "Craft beer + soju bars; optional karaoke.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 3,
                title: "Palaces & History",
                items: [
                    { title: "Gyeongbokgung", description: "Palace + changing of the guard, Bukchon Hanok Village.", timeBucket: "Morning" },
                    { title: "Insadong", description: "Traditional shops, tea house stop.", timeBucket: "Afternoon" },
                    { title: "Night Market", description: "Myeongdong night market and street food.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "DMZ or Digital Culture",
                items: [
                    { title: "DMZ Option", description: "Half-day DMZ tour or E-sports arena.", timeBucket: "Morning" },
                    { title: "Hongdae Night", description: "Hongdae nightlife (live music, clubs).", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 5,
                title: "Cafés & Departure",
                items: [
                    { title: "Trendy Seongsu", description: "Café in Seongsu or Ikseon-dong; last shopping.", timeBucket: "Morning" },
                    { title: "Departure", description: "Airport transfer.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/south-korea/hero.png", alt: "Seoul Skyline at Night", isHero: true }],
        reviewSnippets: [
            { text: "Cutting-edge technology and amazing food scene every block.", sourceName: "Columbia Chazen", tag: "culture" },
            { text: "The efficiency is mind-blowing. Highest speed internet on earth.", sourceName: "Stanford Business", tag: "logistics" }
        ]
    },
    {
        slug: "china-scale",
        title: "China: The Great Wall & Tech Hubs",
        primaryDestinationCity: "Beijing",
        primaryDestinationCountry: "China",
        durationDays: 5,
        roughBudgetUsd: 3000,
        themes: ["Business", "Tech", "Culture"],
        summary: "Witness the massive scale of China's development, visiting the Great Wall and the tech ecosystems of Shenzhen.",
        schoolSlugs: ["columbia", "wharton", "harvard", "stanford", "booth"],
        safetyRating: 4,
        comfortRating: 4,
        vibes: ["fast-paced", "tech-heavy", "massive scale"],
        days: [
            {
                dayIndex: 1,
                title: "Beijing History",
                items: [
                    { title: "Great Wall Hike", description: "Mutianyu section cable car and walk.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [{ path: "/trips/china/hero.png", alt: "Great Wall of China", isHero: true }],
        reviewSnippets: [{ text: "Massive scale of everything. Incredibly fast-paced development.", sourceName: "Stanford STEP", tag: "logistics" }]
    },
    {
        slug: "kenya-safari",
        title: "Kenya: Maasai Mara & Impact",
        primaryDestinationCity: "Nairobi",
        primaryDestinationCountry: "Kenya",
        durationDays: 5,
        roughBudgetUsd: 4000,
        themes: ["Adventure", "Culture"],
        summary: "Bucket-list Big Five safari combined with visits to Kenya's leading social enterprises and tech hubs.",
        schoolSlugs: ["columbia", "harvard"],
        safetyRating: 4,
        comfortRating: 4,
        vibes: ["adventurous", "wildlife", "remote", "immersive"],
        days: [
            {
                dayIndex: 1,
                title: "Nairobi Impact",
                items: [
                    { title: "Giraffe Centre", description: "Feed endangered Rothschild giraffes.", timeBucket: "Morning" },
                    { title: "Social Enterprise Visit", description: "Meet with local founders.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/kenya/hero.png", alt: "Maasai Mara Lion", isHero: true }],
        reviewSnippets: [{ text: "Life-changing wildlife experiences. Inspiring social enterprises.", sourceName: "Columbia Student", tag: "culture" }]
    },
    {
        slug: "tanzania-safari",
        title: "Tanzania: Serengeti & Zanzibar",
        primaryDestinationCity: "Arusha",
        primaryDestinationCountry: "Tanzania",
        durationDays: 5,
        roughBudgetUsd: 4500,
        themes: ["Luxury", "Adventure"],
        summary: "The ultimate bucket-list adventure: witness the Great Migration on the Serengeti plains and unwind on the spice-scented beaches of Zanzibar.",
        schoolSlugs: ["booth"],
        safetyRating: 4,
        comfortRating: 4,
        vibes: ["luxurious", "wildlife", "beach", "remote"],
        days: [
            {
                dayIndex: 1,
                title: "Into the Serengeti",
                items: [{ title: "Game Drive", description: "Spot the Big Five in the endless plains.", timeBucket: "Afternoon" }]
            },
            {
                dayIndex: 3,
                title: "Zanzibar White Sands",
                items: [{ title: "Beach Landing", description: "Fly to the island of Zanzibar.", timeBucket: "Morning" }]
            }
        ],
        photos: [{ path: "/trips/tanzania/hero.png", alt: "Serengeti Wildebeest", isHero: true }],
        reviewSnippets: [{ text: "Perfect combination of adventure and beach. Luxurious tented camps.", sourceName: "Booth Student", tag: "value" }]
    },
    {
        slug: "taiwan-tech-food",
        title: "Taiwan: Semiconductors & Night Markets",
        primaryDestinationCity: "Taipei",
        primaryDestinationCountry: "Taiwan",
        durationDays: 4,
        roughBudgetUsd: 2200,
        themes: ["Tech", "Food \u0026 Wine"],
        summary: "Dive into the heart of global tech manufacturing and explore some of the world's best night market food scenes.",
        schoolSlugs: ["columbia"],
        safetyRating: 5,
        comfortRating: 5,
        vibes: ["tech-focused", "food-paradise", "efficient", "modern"],
        days: [
            {
                dayIndex: 1,
                title: "Night Market Feast",
                items: [{ title: "Shilin Night Market", description: "Oyster omelets and stinky tofu adventure.", timeBucket: "Night" }]
            },
            {
                dayIndex: 2,
                title: "Silicon Island",
                items: [{ title: "TSMC Area Visit", description: "Insight into the world's most critical supply chain.", timeBucket: "Morning" }]
            }
        ],
        photos: [{ path: "/trips/taiwan/hero.png", alt: "Taipei 101 Skyline", isHero: true }],
        reviewSnippets: [{ text: "Tech manufacturing heart of the world. Incredibly friendly locals.", sourceName: "Columbia Chazen", tag: "culture" }]
    },
    {
        slug: "peru-machu-picchu",
        title: "Peru: Empire of the Sun",
        primaryDestinationCity: "Cusco",
        primaryDestinationCountry: "Peru",
        durationDays: 5,
        roughBudgetUsd: 2500,
        themes: ["Culture", "Adventure"],
        summary: "Trek through the Andes to the lost city of Machu Picchu and savor world-class Peruvian cuisine in Lima.",
        schoolSlugs: ["wharton", "columbia", "kellogg"],
        safetyRating: 4,
        comfortRating: 4,
        vibes: ["historical", "mystical", "culinary", "adventurous"],
        days: [
            {
                dayIndex: 1,
                title: "Cusco Acclimatization",
                items: [{ title: "San Blas Quarter", description: "Artisan shops and cobble streets.", timeBucket: "Afternoon" }]
            },
            {
                dayIndex: 3,
                title: "Machu Picchu",
                items: [{ title: "Lost City Tour", description: "Sunrise visit to the iconic Inca ruins.", timeBucket: "Morning" }]
            }
        ],
        photos: [{ path: "/trips/peru/hero.png", alt: "Machu Picchu Ruins", isHero: true }],
        reviewSnippets: [{ text: "The altitude is tough but the views are worth every step.", sourceName: "Reddit MBA", tag: "logistics" }]
    },
    {
        slug: "morocco-magic",
        title: "Morocco: Medinas & Desert",
        primaryDestinationCity: "Marrakech",
        primaryDestinationCountry: "Morocco",
        durationDays: 5,
        roughBudgetUsd: 2200,
        themes: ["Culture", "Adventure"],
        summary: "Navigate the labyrinthine souks of Marrakech and sleep under the stars in a luxury Sahara desert camp.",
        schoolSlugs: ["columbia", "wharton", "insead"],
        safetyRating: 4,
        comfortRating: 4,
        vibes: ["mystical", "chaotic", "vibrant", "ancient"],
        days: [
            {
                dayIndex: 1,
                title: "Jemaa el-Fnaa",
                items: [{ title: "Night Market", description: "Storytellers, snake charmers, and street food.", timeBucket: "Night" }]
            },
            {
                dayIndex: 3,
                title: "Sahara Sunset",
                items: [{ title: "Camel Trek", description: "Ride into the Erg Chebbi dunes.", timeBucket: "Evening" }]
            }
        ],
        photos: [{ path: "/trips/morocco/hero.png", alt: "Marrakech Medina Souk", isHero: true }],
        reviewSnippets: [{ text: "Marrakech is an assault on the senses in the best way possible.", sourceName: "Student Blog", tag: "culture" }]
    },
    {
        slug: "egypt-ancient",
        title: "Egypt: Pyramids & The Nile",
        primaryDestinationCity: "Cairo",
        primaryDestinationCountry: "Egypt",
        durationDays: 5,
        roughBudgetUsd: 1800,
        themes: ["Culture", "Adventure"],
        summary: "Step back 5,000 years to the era of the Pharaohs. Explore the Great Pyramids and sail the Nile on a traditional Felucca.",
        schoolSlugs: ["columbia", "harvard", "wharton"],
        safetyRating: 3,
        comfortRating: 4,
        vibes: ["historical", "mystical", "epic", "hot"],
        days: [
            {
                dayIndex: 1,
                title: "Cairo: Ancient Wonders Warm-Up",
                items: [
                    { title: "Arrival", description: "Arrive Cairo, check in near Giza or Zamalek.", timeBucket: "Morning" },
                    { title: "Egyptian Museum", description: "Highlights: King Tut galleries, walk Tahrir Square.", timeBucket: "Afternoon" },
                    { title: "Welcome Dinner", description: "Dinner on Nile corniche; optional felucca sunset sail.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Giza Plateau & Sphinx",
                items: [
                    { title: "Pyramids of Giza", description: "Guided tour, panoramic viewpoint photos, optional camel ride.", timeBucket: "Morning" },
                    { title: "Sphinx + Valley Temple", description: "Lunch with pyramid views.", timeBucket: "Afternoon" },
                    { title: "Sound & Light Show", description: "Pyramids Sound & Light Show; rooftop bar hang.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 3,
                title: "Old Cairo & Islamic Cairo",
                items: [
                    { title: "Coptic Cairo", description: "Hanging Church, Ben Ezra Synagogue.", timeBucket: "Morning" },
                    { title: "Khan el-Khalili", description: "Bazaar, Al-Azhar Mosque, tea at historic café.", timeBucket: "Afternoon" },
                    { title: "Local Food Crawl", description: "Koshary, falafel, grilled meats.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Luxor Highlights",
                items: [
                    { title: "Fly to Luxor", description: "Early morning flight to Luxor.", timeBucket: "Morning" },
                    { title: "West & East Bank", description: "Valley of the Kings, Hatshepsut Temple, Karnak & Luxor Temple.", timeBucket: "Afternoon" },
                    { title: "Fly back to Cairo", description: "Return to Cairo; low-key dinner.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 5,
                title: "Nile Brunch & Departure",
                items: [
                    { title: "Relaxed Morning", description: "Nile brunch cruise or spa.", timeBucket: "Morning" },
                    { title: "Final Shopping", description: "Last-minute souk shopping; transfer to airport.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/egypt/hero.png", alt: "Pyramids of Giza", isHero: true }],
        reviewSnippets: [{ text: "The scale is unimaginable. A true bucket-list MBA trek.", sourceName: "HBS Student", tag: "culture" }]
    },
    {
        slug: "greece-yacht",
        title: "Greece: Yacht Week Cyclades",
        primaryDestinationCity: "Athens",
        primaryDestinationCountry: "Greece",
        durationDays: 7,
        roughBudgetUsd: 3500,
        themes: ["Party", "Luxury"],
        summary: "The quintessential MBA rite of passage. Sail the Aegean, jump into turquoise waters, and dance until sunrise in Mykonos.",
        schoolSlugs: ["insead", "lbs", "columbia", "wharton"],
        safetyRating: 4,
        comfortRating: 3,
        vibes: ["nautical", "electric", "social", "sun-drenched"],
        days: [
            {
                dayIndex: 1,
                title: "Athens → Marina Check-In",
                items: [
                    { title: "Marina Arrival", description: "Transfer to marina, boat briefing, provisioning.", timeBucket: "Afternoon" },
                    { title: "Welcome Sail", description: "Nearby anchorage; swim + sunset drinks onboard.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Kea or Kythnos",
                items: [
                    { title: "Morning Sail", description: "Sail 3–4 hours, swim stop in a sheltered bay.", timeBucket: "Morning" },
                    { title: "Island Walk", description: "Dock/anchor; island walk or beach bar.", timeBucket: "Afternoon" },
                    { title: "Group Dinner", description: "Group taverna dinner, first big night out.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 3,
                title: "Serifos / Sifnos",
                items: [
                    { title: "Next Island", description: "Sail to next island; snorkeling + paddleboarding.", timeBucket: "Morning" },
                    { title: "Explore Chora", description: "Explore whitewashed hilltop town, viewpoint hike.", timeBucket: "Afternoon" },
                    { title: "Bar Hop", description: "Bar hop in town; late-night souvlaki stop.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Milos",
                items: [
                    { title: "Long Sail", description: "Stops at coves (e.g., Kleftiko sea caves).", timeBucket: "Morning" },
                    { title: "Cliff Jumps", description: "Cliff jumps, dinghy exploring, photoshoot.", timeBucket: "Afternoon" },
                    { title: "Sunset Plaka", description: "Sunset from Plaka, upscale dinner.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 5,
                title: "Paros / Antiparos",
                items: [
                    { title: "Beach Club", description: "Short sail, beach club time.", timeBucket: "Morning" },
                    { title: "Watersports", description: "Watersports, volleyball, chill at beach bars.", timeBucket: "Afternoon" },
                    { title: "Theme Night", description: "Theme night onboard; then into town clubs.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 6,
                title: "Ios or Mykonos",
                items: [
                    { title: "Swim & Sail", description: "Swim stop + relaxed sail.", timeBucket: "Afternoon" },
                    { title: "Big Party Night", description: "Iconic clubs, DJ sets till sunrise.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 7,
                title: "Return & Departure",
                items: [
                    { title: "Return Sail", description: "Sail back toward base marina.", timeBucket: "Morning" },
                    { title: "Disembark", description: "Disembark, transfer to airport.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/greece/hero.png", alt: "Yacht Week Cyclades", isHero: true }],
        reviewSnippets: [{ text: "Total chaos but the best bonding experience of the MBA.", sourceName: "INSEAD Trek", tag: "value" }]
    },
    {
        slug: "vietnam-hanoi",
        title: "Vietnam: Ha Long & Hanoi",
        primaryDestinationCity: "Hanoi",
        primaryDestinationCountry: "Vietnam",
        durationDays: 5,
        roughBudgetUsd: 1500,
        themes: ["Culture", "Food \u0026 Wine"],
        summary: "A sensory journey through the Old Quarter of Hanoi and an overnight luxury cruise in the emerald waters of Ha Long Bay.",
        schoolSlugs: ["columbia", "stanford"],
        safetyRating: 5,
        comfortRating: 4,
        vibes: ["vibrant", "serene", "culinary", "lush"],
        days: [
            {
                dayIndex: 1,
                title: "Hanoi Old Quarter",
                items: [
                    { title: "Arrival", description: "Arrive Hanoi, check in near Hoan Kiem Lake.", timeBucket: "Morning" },
                    { title: "Walking Tour", description: "Old Quarter, lake, Ngoc Son Temple.", timeBucket: "Afternoon" },
                    { title: "Street Food", description: "Street food tour (bun cha, pho, egg coffee).", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Hanoi Heritage & History",
                items: [
                    { title: "Ho Chi Minh area", description: "Mausoleum area, One Pillar Pagoda, Presidential Palace grounds.", timeBucket: "Morning" },
                    { title: "Cultural Museums", description: "Temple of Literature, Women’s Museum.", timeBucket: "Afternoon" },
                    { title: "Water Puppet Show", description: "Show + craft beer / cocktail bars.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 3,
                title: "Ha Long Bay Cruise (Day 1)",
                items: [
                    { title: "Drive to Ha Long", description: "Drive to Ha Long (3–3.5 hours).", timeBucket: "Morning" },
                    { title: "Overnight Cruise", description: "Board cruise; lunch onboard, limestone karst sailing, kayaking.", timeBucket: "Afternoon" },
                    { title: "Sunset & Squid", description: "Sunset on deck, cooking class, squid fishing.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Ha Long Bay Cruise (Day 2)",
                items: [
                    { title: "Tai Chi & Village", description: "Tai chi on deck, visit floating village; brunch while cruising back.", timeBucket: "Morning" },
                    { title: "Return Hanoi", description: "Return drive to Hanoi; café/work/wander time.", timeBucket: "Afternoon" },
                    { title: "Final Dinner", description: "Final dinner in French Quarter; rooftop drinks.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 5,
                title: "Shopping & Departure",
                items: [
                    { title: "Coffee Crawl", description: "Coffee crawl and souvenir shopping in Old Quarter.", timeBucket: "Morning" },
                    { title: "Departure", description: "Airport transfer and flights out.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/vietnam/hanoi-hero.png", alt: "Ha Long & Hanoi", isHero: true }],
        reviewSnippets: [{ text: "The food alone is worth the flight. Ha Long is magical.", sourceName: "Stanford Student", tag: "culture" }]
    },
    {
        slug: "jordan-petra",
        title: "Jordan: Petra & Dead Sea",
        primaryDestinationCity: "Amman",
        primaryDestinationCountry: "Jordan",
        durationDays: 4,
        roughBudgetUsd: 2000,
        themes: ["Adventure", "Culture"],
        summary: "Walk through the Siq to the Treasury of Petra, float in the hypersaline Dead Sea, and camp in the Martian landscape of Wadi Rum.",
        schoolSlugs: ["wharton", "insead"],
        safetyRating: 4,
        comfortRating: 4,
        vibes: ["ancient", "otherworldly", "stunning", "peaceful"],
        days: [
            {
                dayIndex: 1,
                title: "Amman & Jerash",
                items: [
                    { title: "Arrival Amman", description: "Arrive Amman, quick rest.", timeBucket: "Morning" },
                    { title: "Ancient Ruins", description: "Jerash Roman ruins or Amman Citadel & Roman Theatre.", timeBucket: "Afternoon" },
                    { title: "Rainbow Street", description: "Dinner on Rainbow Street, shisha lounge.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Petra by Day",
                items: [
                    { title: "Drive to Petra", description: "Drive to Petra (3 hours).", timeBucket: "Morning" },
                    { title: "Hike Petra", description: "Hike through Siq to Treasury, continue to Monastery viewpoint.", timeBucket: "Afternoon" },
                    { title: "Wadi Musa", description: "Overnight in Wadi Musa; optional Petra by Night.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 3,
                title: "Wadi Rum & Dead Sea",
                items: [
                    { title: "Wadi Rum", description: "Drive to Wadi Rum; 4x4 desert tour, sandboarding.", timeBucket: "Morning" },
                    { title: "Dead Sea Float", description: "Transfer to resort, float in Dead Sea, mud baths.", timeBucket: "Afternoon" },
                    { title: "Resort Dinner", description: "Resort dinner & pool.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Chill & Departure",
                items: [
                    { title: "Slow Morning", description: "Resort morning (spa, pool, Dead Sea time).", timeBucket: "Morning" },
                    { title: "Departure", description: "Drive back to Amman airport for departure.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/jordan/hero.png", alt: "Petra & Dead Sea", isHero: true }],
        reviewSnippets: [{ text: "Floating in the Dead Sea is the weirdest and coolest sensation.", sourceName: "Wharton Global", tag: "logistics" }]
    },
    {
        slug: "ibiza-party",
        title: "Ibiza: Summer Closing",
        primaryDestinationCity: "Ibiza Town",
        primaryDestinationCountry: "Spain",
        durationDays: 4,
        roughBudgetUsd: 3000,
        themes: ["Party", "Luxury"],
        summary: "Join the world's best DJs for the legendary closing parties of Ibiza. Luxury villas, beach clubs, and non-stop energy.",
        schoolSlugs: ["lbs", "insead", "wharton"],
        safetyRating: 4,
        comfortRating: 5,
        vibes: ["hedonistic", "luxurious", "vibrant", "sun-soaked"],
        days: [
            {
                dayIndex: 1,
                title: "Arrival & Sunset",
                items: [
                    { title: "Arrival", description: "Arrive Ibiza, check in.", timeBucket: "Morning" },
                    { title: "Beach Time", description: "Playa d’en Bossa or Cala Comte.", timeBucket: "Afternoon" },
                    { title: "Sunset & Clubbing", description: "Sunset at Café del Mar/Mambo; opening night.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Beach Clubs & Superclub",
                items: [
                    { title: "Day Events", description: "Pool or beach club (e.g., Ushuaïa day events).", timeBucket: "Afternoon" },
                    { title: "Superclub", description: "Big-name DJ at Amnesia, Pacha, Hï Ibiza or DC-10.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 3,
                title: "Formentera Day Trip",
                items: [
                    { title: "Formentera", description: "Boat/ferry to Formentera; scooters, beaches.", timeBucket: "Afternoon" },
                    { title: "Chill Dinner", description: "Chill dinner back on Ibiza; optional bar crawl.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Recovery & Departure",
                items: [
                    { title: "Recovery Brunch", description: "Recovery brunch; swim or walk through Old Town.", timeBucket: "Morning" },
                    { title: "Departure", description: "Airport transfer and departure.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/ibiza/hero.png", alt: "Ibiza Summer Closing", isHero: true }],
        reviewSnippets: [{ text: "Peak networking. Everyone is there for the vibes.", sourceName: "LBS Party Trek", tag: "value" }]
    },
    {
        slug: "croatia-sail",
        title: "Croatia: Sailing the Adriatic",
        primaryDestinationCity: "Split",
        primaryDestinationCountry: "Croatia",
        durationDays: 5,
        roughBudgetUsd: 2200,
        themes: ["Luxury", "Adventure"],
        summary: "Island hop between Hvar, Vis, and Korcula on a private catamaran. Mediterranean lifestyle at its finest.",
        schoolSlugs: ["insead", "columbia"],
        safetyRating: 5,
        comfortRating: 5,
        vibes: ["elegant", "nautical", "relaxed", "chic"],
        days: [
            {
                dayIndex: 1,
                title: "Split & Embarkation",
                items: [
                    { title: "Split Old Town", description: "Explore Split Old Town & Diocletian’s Palace.", timeBucket: "Afternoon" },
                    { title: "Embarkation", description: "Check onto boat; sunset sail, dinner onboard.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Hvar",
                items: [
                    { title: "Hvar Sail", description: "Sail to Hvar with swim stop.", timeBucket: "Morning" },
                    { title: "Fortress Hike", description: "St. Stephen’s Square, hilltop fortress hike.", timeBucket: "Afternoon" },
                    { title: "Hvar Nightlife", description: "Waterfront cocktails, upscale dinner, nightlife.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 3,
                title: "Vis & Blue Cave",
                items: [
                    { title: "Blue Cave", description: "Early sail; Blue Cave (weather permitting).", timeBucket: "Morning" },
                    { title: "Vis Town", description: "Explore Vis town, wine tasting.", timeBucket: "Afternoon" },
                    { title: "Quiet Evening", description: "Quiet dinner in bay; stargazing on deck.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Korčula or Brač",
                items: [
                    { title: "Swim Stops", description: "Sail with swim/snorkel stops.", timeBucket: "Morning" },
                    { title: "Island Explor", description: "Korčula’s old town or Zlatni Rat beach on Brač.", timeBucket: "Afternoon" },
                    { title: "Seafood Dinner", description: "Seafood dinner & relaxed drinks.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 5,
                title: "Return & Departure",
                items: [
                    { title: "Return Split", description: "Sail back toward Split.", timeBucket: "Morning" },
                    { title: "Departure", description: "Disembark, transfers for onward travel.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/croatia/hero.png", alt: "Sailing the Adriatic", isHero: true }],
        reviewSnippets: [{ text: "The most beautiful coastline in Europe. Private chefs on board!", sourceName: "INSEAD Student", tag: "logistics" }]
    },
    {
        slug: "mendoza-wine",
        title: "Argentina: Malbec & Mountains",
        primaryDestinationCity: "Mendoza",
        primaryDestinationCountry: "Argentina",
        durationDays: 4,
        roughBudgetUsd: 2400,
        themes: ["Luxury", "Food \u0026 Wine"],
        summary: "Discover the world's best Malbecs in the shadow of the Andes. Vineyard luncheons and sunset horseback riding.",
        schoolSlugs: ["wharton", "kellogg"],
        safetyRating: 4,
        comfortRating: 5,
        vibes: ["sophisticated", "scenic", "culinary", "relaxed"],
        days: [
            {
                dayIndex: 1,
                title: "Arrival & City Stroll",
                items: [
                    { title: "Arrival", description: "Arrive Mendoza; check into boutique wine hotel.", timeBucket: "Morning" },
                    { title: "City Tour", description: "Plaza Independencia, tree-lined streets, café stop.", timeBucket: "Afternoon" },
                    { title: "Steak & Malbec", description: "Steakhouse dinner with Malbec pairing.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Luján de Cuyo Wineries",
                items: [
                    { title: "Bodega Tour", description: "Private driver to 2–3 iconic bodegas; cellar tours, tastings.", timeBucket: "Afternoon" },
                    { title: "Vineyard Lunch", description: "Special lunch in the vineyards.", timeBucket: "Afternoon" },
                    { title: "Evening Tapas", description: "Light dinner/tapas, wine bar hopping.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 3,
                title: "Uco Valley & Andes Views",
                items: [
                    { title: "Uco Wineries", description: "Wineries with stunning mountain backdrops, tasting menus.", timeBucket: "Afternoon" },
                    { title: "Hotel Chill", description: "Sunset views from hotel; spa or pool time.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Departure Excursion",
                items: [
                    { title: "Andes Outing", description: "Short Andes outing (viewpoints, easy hike).", timeBucket: "Morning" },
                    { title: "Departure", description: "Airport transfer for flights out.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/argentina/hero.png", alt: "Malbec & Mountains", isHero: true }],
        reviewSnippets: [{ text: "Incredible value for luxury. Best steak and wine of my life.", sourceName: "Kellogg Student", tag: "value" }]
    },
    {
        slug: "costa-rica-pura",
        title: "Costa Rica: Pura Vida",
        primaryDestinationCity: "San Jose",
        primaryDestinationCountry: "Costa Rica",
        durationDays: 5,
        roughBudgetUsd: 1800,
        themes: ["Adventure", "Sustainability"],
        summary: "Zipline through cloud forests, soak in volcanic hot springs, and learn about sustainable ecotourism models.",
        schoolSlugs: ["kellogg", "booth"],
        safetyRating: 5,
        comfortRating: 4,
        vibes: ["green", "adventurous", "sustainable", "lush"],
        days: [
            {
                dayIndex: 1,
                title: "San José → Arenal",
                items: [
                    { title: "Arrival SJO", description: "Arrive SJO, meet group, drive to La Fortuna.", timeBucket: "Morning" },
                    { title: "Settle In", description: "Check into eco-lodge; soak in hot springs.", timeBucket: "Afternoon" },
                    { title: "Welcome Dinner", description: "Welcome dinner with volcano views.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Arenal Adventure",
                items: [
                    { title: "Cloud Forest", description: "Ziplining or hanging bridges tour.", timeBucket: "Morning" },
                    { title: "Waterfall Hike", description: "La Fortuna Falls hike & swim.", timeBucket: "Afternoon" },
                    { title: "Hot Springs", description: "Thermal pools or spa time.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 3,
                title: "Transfer to Manuel Antonio",
                items: [
                    { title: "Scenic Drive", description: "Drive to Pacific coast (4–5 hours).", timeBucket: "Morning" },
                    { title: "Beach Sunset", description: "Beach time, sunset from oceanside bar.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "National Park & Surf",
                items: [
                    { title: "Wildlife Walk", description: "Guided wildlife walk in Manuel Antonio National Park.", timeBucket: "Morning" },
                    { title: "Catamaran", description: "Catamaran cruise or surfing lesson.", timeBucket: "Afternoon" },
                    { title: "Farewell Drinks", description: "Sunset drinks and relaxed final dinner.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 5,
                title: "Final Swim & Departure",
                items: [
                    { title: "Ocean Dip", description: "Last morning swim.", timeBucket: "Morning" },
                    { title: "Departure", description: "Drive back to SJO, fly out.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/costarica/hero.png", alt: "Pura Vida", isHero: true }],
        reviewSnippets: [{ text: "The perfect detox from the MBA stress. Incredible biodiveristy.", sourceName: "Kellogg Trek", tag: "culture" }]
    },
    {
        slug: "turkey-magic",
        title: "Turkey: East Meets West",
        primaryDestinationCity: "Istanbul",
        primaryDestinationCountry: "Turkey",
        durationDays: 5,
        roughBudgetUsd: 2000,
        themes: ["Culture", "Adventure"],
        summary: "Cross continents between Europe and Asia in Istanbul, and drift over the fairy chimneys of Cappadocia in a hot air balloon.",
        schoolSlugs: ["lbs", "insead", "columbia"],
        safetyRating: 4,
        comfortRating: 4,
        vibes: ["historical", "mystical", "culinary", "stunning"],
        days: [
            {
                dayIndex: 1,
                title: "Istanbul Classics",
                items: [
                    { title: "Arrival", description: "Arrive Istanbul, check into Sultanahmet area.", timeBucket: "Morning" },
                    { title: "Hagia Sophia", description: "Hagia Sophia & Blue Mosque tour.", timeBucket: "Afternoon" },
                    { title: "Bosphorus Cruise", description: "Private sunset cruise between two continents.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Bazaars & Palace",
                items: [
                    { title: "Topkapi", description: "Topkapi Palace and Harem.", timeBucket: "Morning" },
                    { title: "Grand Bazaar", description: "Grand Bazaar & Spice Bazaar explorations.", timeBucket: "Afternoon" },
                    { title: "Galata Views", description: "Galata Tower area, drinks with Golden Horn views.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 3,
                title: "Cappadocia Flight",
                items: [
                    { title: "Fly Cappadocia", description: "Short flight to Cappadocia.", timeBucket: "Morning" },
                    { title: "Cave Churches", description: "Valley hike, cave churches, underground city.", timeBucket: "Afternoon" },
                    { title: "Cave Hotel", description: "Cave hotel stay, local Anatolian dinner.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 4,
                title: "Hot Air Balloon",
                items: [
                    { title: "Balloon Flight", description: "Sunrise hot air balloon flight.", timeBucket: "Morning" },
                    { title: "Exploration", description: "Brunch, further valley exploration.", timeBucket: "Morning" },
                    { title: "Fly Istanbul", description: "Fly back to Istanbul.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 5,
                title: "Neighborhoods & Departure",
                items: [
                    { title: "Trendy Districts", description: "Explore Kadıköy or Karaköy; local workshops.", timeBucket: "Morning" },
                    { title: "Departure", description: "Airport transfer.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/turkey/hero.png", alt: "East Meets West", isHero: true }],
        reviewSnippets: [{ text: "Cappadocia at sunrise is the most instagrammable place on earth.", sourceName: "Student Leader", tag: "culture" }]
    },
    {
        slug: "philippines-islands",
        title: "Philippines: Island Hopping",
        primaryDestinationCity: "El Nido",
        primaryDestinationCountry: "Philippines",
        durationDays: 5,
        roughBudgetUsd: 1400,
        themes: ["Adventure"],
        summary: "Explore the hidden lagoons of Palawan and the crystal clear waters of Coron on a private expedition boat.",
        schoolSlugs: ["insead", "columbia"],
        safetyRating: 4,
        comfortRating: 3,
        vibes: ["tropical", "aquatic", "stunning", "relaxed"],
        days: [
            {
                dayIndex: 1,
                title: "Manila → Palawan",
                items: [
                    { title: "Connection", description: "Arrival Manila, connect to El Nido/Coron flight.", timeBucket: "Morning" },
                    { title: "Check-in", description: "Check-in + town stroll or beach sunset.", timeBucket: "Afternoon" },
                    { title: "Islands Dinner", description: "Beachfront seafood dinner.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Island Hopping Tour A",
                items: [
                    { title: "Big Lagoon", description: "Boat tour to lagoons (kayaking), snorkeling spots.", timeBucket: "Afternoon" },
                    { title: "Town Vibes", description: "Sunset drinks in town, casual bars.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 3,
                title: "Island Hopping Tour C",
                items: [
                    { title: "Hidden Beaches", description: "Second tour with different islands and secret beaches.", timeBucket: "Afternoon" },
                    { title: "Massage", description: "Filipino Hilot massage, quiet dinner.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 4,
                title: "Free Adventure Day",
                items: [
                    { title: "Options", description: "Diving, kayak rentals, or private beach club.", timeBucket: "Afternoon" },
                    { title: "Final Party", description: "Final night out with group.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 5,
                title: "Fly Back & Departure",
                items: [
                    { title: "Last Dip", description: "Last morning dip or café stop.", timeBucket: "Morning" },
                    { title: "Back to Manila", description: "Fly back to Manila for onward flights.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/philippines/hero.png", alt: "Island Hopping", isHero: true }],
        reviewSnippets: [{ text: "The most beautiful water I've ever seen. Pure paradise.", sourceName: "INSEAD Student", tag: "culture" }]
    },
    {
        slug: "scotland-highlands",
        title: "Scotland: Highlands & Whisky",
        primaryDestinationCity: "Edinburgh",
        primaryDestinationCountry: "Scotland",
        durationDays: 4,
        roughBudgetUsd: 2200,
        themes: ["Luxury", "Food \u0026 Wine"],
        summary: "Private road trip through the Isle of Skye and the rugged Highlands, with exclusive distillery tours and castle stays.",
        schoolSlugs: ["lbs", "wharton"],
        safetyRating: 5,
        comfortRating: 5,
        vibes: ["moody", "luxurious", "scenic", "historical"],
        days: [
            {
                dayIndex: 1,
                title: "Edinburgh Old Town",
                items: [
                    { title: "Arrival", description: "Arrive Edinburgh; Old Town walking tour, Royal Mile.", timeBucket: "Morning" },
                    { title: "Whisky Experience", description: "Guided whisky tasting experience in the city.", timeBucket: "Afternoon" },
                    { title: "Gastropub", description: "Gastropub dinner, historic whisky bar crawl.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Highlands & Glencoe",
                items: [
                    { title: "Highlands Tour", description: "Guided tour: Glencoe landscapes, Loch Ness viewpoints.", timeBucket: "Morning" },
                    { title: "Loch Side lunch", description: "Lunch with Loch views; scenic photography.", timeBucket: "Afternoon" },
                    { title: "Country Inn", description: "Stay in a cozy country inn or return to Edinburgh.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 3,
                title: "Speyside Distilleries",
                items: [
                    { title: "Distillery Tour", description: "Private distillery visits with tastings and masterclasses.", timeBucket: "Afternoon" },
                    { title: "Cozy Night", description: "Fireplace dinner, single malt flights.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 4,
                title: "Brunch & Departure",
                items: [
                    { title: "City Brunch", description: "Leisurely café brunch in Edinburgh.", timeBucket: "Morning" },
                    { title: "Departure", description: "Airport transfer.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/scotland/hero.png", alt: "Highlands & Whisky", isHero: true }],
        reviewSnippets: [{ text: "Rugged beauty and incredibly high-end lodges.", sourceName: "LBS Student", tag: "logistics" }]
    },
    {
        slug: "australia-outback",
        title: "Australia: Reef & Red Centre",
        primaryDestinationCity: "Cairns",
        primaryDestinationCountry: "Australia",
        durationDays: 7,
        roughBudgetUsd: 4000,
        themes: ["Adventure", "Culture"],
        summary: "Dive the Great Barrier Reef and watch the sunrise over Uluru (Ayers Rock). The ultimate Australian experience.",
        schoolSlugs: ["stanford", "wharton"],
        safetyRating: 5,
        comfortRating: 4,
        vibes: ["epic", "vast", "adventurous", "stunning"],
        days: [
            {
                dayIndex: 1,
                title: "Sydney to Cairns",
                items: [
                    { title: "Sydney morning", description: "Light sightseeing (Opera House, Circular Quay).", timeBucket: "Morning" },
                    { title: "Fly North", description: "Fly to Cairns; settle into resort.", timeBucket: "Afternoon" },
                    { title: "Esplanade", description: "Waterfront dinner at Cairns Esplanade.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "Great Barrier Reef",
                items: [
                    { title: "Reef Boat", description: "Board high-speed reef day boat.", timeBucket: "Morning" },
                    { title: "Snorkel & Dive", description: "Snorkeling/diving at two different reef sites.", timeBucket: "Afternoon" },
                    { title: "Seafood Feast", description: "Fresh seafood dinner.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 3,
                title: "Rainforest & Culture",
                items: [
                    { title: "Skyrail", description: "Kuranda Scenic Railway / Daintree Rainforest tour.", timeBucket: "Afternoon" },
                    { title: "Aboriginal Culture", description: "Cultural performance and education.", timeBucket: "Afternoon" }
                ]
            },
            {
                dayIndex: 4,
                title: "The Red Centre",
                items: [
                    { title: "Fly Uluru", description: "Fly to Ayers Rock (Uluru).", timeBucket: "Morning" },
                    { title: "Sounds of Silence", description: "Uluru sunset viewing, stargazing dinner.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 5,
                title: "Uluru Sunrise",
                items: [
                    { title: "Base Walk", description: "Uluru base walk at sunrise.", timeBucket: "Morning" },
                    { title: "Kata Tjuta", description: "Kata Tjuta (The Olgas) valley walk.", timeBucket: "Afternoon" },
                    { title: "Dune Dinner", description: "Second stargazing or luxury dinner.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 6,
                title: "Flight & Farewell",
                items: [
                    { title: "Fly back", description: "Fly back to major hub city.", timeBucket: "Afternoon" },
                    { title: "Farewell Dinner", description: "Group farewell dinner.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 7,
                title: "Departure",
                items: [
                    { title: "Last Aussie Café", description: "Morning café breakfast; depart.", timeBucket: "Morning" }
                ]
            }
        ],
        photos: [{ path: "/trips/australia/hero.png", alt: "Reef & Red Centre", isHero: true }],
        reviewSnippets: [{ text: "The scale is massive. Uluru is very spiritual.", sourceName: "Stanford Student", tag: "culture" }]
    },
    {
        slug: "berlin-techno",
        title: "Berlin: Techno & History",
        primaryDestinationCity: "Berlin",
        primaryDestinationCountry: "Germany",
        durationDays: 4,
        roughBudgetUsd: 1500,
        themes: ["Party", "Culture"],
        summary: "Deep dive into the world's best industrial warehouses for techno, balanced with moving visits to the Berlin Wall and Reichstag.",
        schoolSlugs: ["lbs", "insead", "columbia"],
        safetyRating: 5,
        comfortRating: 4,
        vibes: ["gritty", "underground", "historical", "creative"],
        days: [
            {
                dayIndex: 1,
                title: "Arrival & Orientation",
                items: [
                    { title: "Check-in", description: "Arrive, check in near Mitte/Kreuzberg.", timeBucket: "Afternoon" },
                    { title: "Canal Bars", description: "Casual bar hopping by the canal in Kreuzberg.", timeBucket: "Evening" }
                ]
            },
            {
                dayIndex: 2,
                title: "History & Nightlife",
                items: [
                    { title: "Walking Tour", description: "Brandenburg Gate, Holocaust Memorial, Reichstag.", timeBucket: "Morning" },
                    { title: "East Side Gallery", description: "Berlin Wall remains, Oberbaumbrücke.", timeBucket: "Afternoon" },
                    { title: "Clubbing Begin", description: "Industrial warehouse club night.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 3,
                title: "Museums & Techno",
                items: [
                    { title: "Culture Morning", description: "Museum Island or DDR Museum.", timeBucket: "Morning" },
                    { title: "Rest & Prep", description: "Nap/recovery, street food burger stop.", timeBucket: "Afternoon" },
                    { title: "Peak Techno", description: "Long night at Berghain, Watergate, or Sisyphos.", timeBucket: "Night" }
                ]
            },
            {
                dayIndex: 4,
                title: "Recovery & Departure",
                items: [
                    { title: "Prenzlauer Berg", description: "Hangover brunch; Mauerpark stroll.", timeBucket: "Morning" },
                    { title: "Departure", description: "Final transfer to airport.", timeBucket: "Afternoon" }
                ]
            }
        ],
        photos: [{ path: "/trips/berlin/hero.png", alt: "Techno & History", isHero: true }],
        reviewSnippets: [{ text: "Incredible energy. Berghain is legendary.", sourceName: "LBS Party Trek", tag: "culture" }]
    }
];

export const getTripTemplateBySlug = (slug: string) => tripTemplates.find((t) => t.slug === slug);
export const getAllTripTemplates = () => tripTemplates;
