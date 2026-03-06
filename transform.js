const fs = require('fs');

const rawData = JSON.parse(fs.readFileSync('c:/Users/Siddhant Patra/OneDrive - Columbia Business School/Documents/Antigravity_tool/mbatriprank/triprank/data/mba_treks_data.json', 'utf8'));
const destinations = rawData.destinations;

const templates = Object.entries(destinations).map(([country, data]) => {
    const slug = country.toLowerCase().replace(/\s+/g, '-') + '-trek';

    // Generate 5 days of itinerary
    const highlights = data.tour_packages?.[0]?.highlights?.split(', ') || ['Explore ' + country];
    const summary = data.tour_packages?.[0]?.itinerary_summary || data.summary;

    const days = [
        {
            dayIndex: 1,
            title: "Arrival in " + (data.primary_airport ? data.primary_airport.split('(')[1]?.replace(')', '') || 'Capital' : 'Capital'),
            items: [
                { title: "Landing & Check-in", description: "Arrive at primary gateway and transfer to group hotel.", timeBucket: "Morning" },
                { title: "Welcome Dinner", description: "Meet the cohort for a traditional welcome banquet.", timeBucket: "Night" }
            ]
        },
        {
            dayIndex: 2,
            title: "Cultural Immersion",
            items: [
                { title: highlights[0] || "City Tour", description: "Explore iconic landmarks and historical sites.", timeBucket: "Morning" },
                { title: "Networking Lunch", description: "Group lunch with local insights.", timeBucket: "Afternoon" }
            ]
        },
        {
            dayIndex: 3,
            title: "The Main Event",
            items: [
                { title: highlights[1] || "Nature Expedition", description: "Deep dive into the region's most famous natural wonder.", timeBucket: "Afternoon" },
                { title: "Group Social", description: "Evening networking and cultural performance.", timeBucket: "Night" }
            ]
        },
        {
            dayIndex: 4,
            title: "MBA Special Activity",
            items: [
                {
                    title: data.group_bonding_activities?.[0]?.activity || "Group Challenge",
                    description: data.group_bonding_activities?.[0]?.why_it_works || "Collaborative group experience.",
                    timeBucket: "Morning"
                },
                { title: "Local Market Visit", description: "Interactive session with local artisans and vendors.", timeBucket: "Afternoon" }
            ]
        },
        {
            dayIndex: 5,
            title: "Final Farewells",
            items: [
                { title: "Reflection Session", description: "Morning debrief and photos.", timeBucket: "Morning" },
                { title: "Departure", description: "Transfer to airport for flights back to campus.", timeBucket: "Afternoon" }
            ]
        }
    ];

    const schoolSlugs = ["columbia", "wharton", "harvard", "booth", "kellogg", "stanford"];

    return {
        slug,
        title: country + ": The Iconic MBA Trek",
        primaryDestinationCity: data.hotels?.[0]?.city || country,
        primaryDestinationCountry: country,
        region: data.region || "Global",
        durationDays: data.tour_packages?.[0]?.duration_days || 5,
        roughBudgetUsd: parseInt(data.tour_packages?.[0]?.cost_per_person_usd) || 2000,
        themes: ["Culture", "Adventure", "Business"],
        summary: data.summary,
        schoolSlugs,
        days,
        photos: [
            { path: "/trips/" + country.toLowerCase().replace(/\s+/g, '-') + "/hero.png", alt: country + " Skyline", isHero: true }
        ],
        reviewSnippets: [
            { text: data.summary, sourceName: "MBA Trek Hub", tag: "culture" }
        ],
        safetyRating: 4,
        comfortRating: 5,
        vibes: ["immersive", "well-organized", data.region],
        logistics: {
            bestSeason: data.best_season || "Annual",
            visaNotes: data.visa_notes || "Not required for most visitors",
            dailyBudgetRange: data.estimated_daily_budget_usd || "150-250",
            primaryAirport: data.primary_airport || "International Gateway",
            currency: data.currency || "Local Currency",
            healthNotes: data.health_notes || "Standard travel precautions",
            transport: {
                airportToHotel: data.ground_transport?.airport_to_hotel || "Pre-arranged transfer",
                withinCity: data.ground_transport?.within_city || "Uber and organized transport",
                betweenDestinations: data.ground_transport?.between_destinations || "Domestic flights/Private coach"
            }
        },
        culturalIntelligence: {
            communicationStyle: data.cultural_intelligence?.communication_style || "Standard professional",
            businessEtiquette: data.cultural_intelligence?.business_etiquette || "Business casual/Formal",
            socialCustoms: data.cultural_intelligence?.social_customs || "Friendly and welcoming",
            diningNorms: data.cultural_intelligence?.dining_norms || "Standard international tips"
        },
        groupBondingActivities: (data.group_bonding_activities || []).map(a => ({
            activity: a.activity,
            durationHours: a.duration_hours,
            costPerPerson: a.cost_per_person_usd,
            whyItWorks: a.why_it_works
        })),
        premiumAccommodations: (data.hotels || []).map(h => ({
            name: h.name,
            city: h.city,
            stars: h.stars,
            whyGoodForGroups: h.why_good_for_groups
        }))
    };
});

const output = `
import { TripTemplate } from "./types";

export const tripTemplates: TripTemplate[] = ${JSON.stringify(templates, null, 4)};

export const getTripTemplateBySlug = (slug: string) => {
    return tripTemplates.find((t) => t.slug === slug);
};
`;

fs.writeFileSync('c:/Users/Siddhant Patra/OneDrive - Columbia Business School/Documents/Antigravity_tool/mbatriprank/triprank/data/trip-templates.gen.ts', output);
