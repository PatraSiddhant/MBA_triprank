export type ItineraryItem = {
    title: string;
    description: string;
    timeBucket: string;
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
    tag: "adventure" | "culture" | "nightlife" | "luxury";
};

export type TripTemplate = {
    slug: string;
    title: string;
    primaryDestinationCity: string;
    primaryDestinationCountry: string;
    region: string;
    durationDays: number | string;
    roughBudgetUsd: number | string;
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
    // New exhaustive fields
    logistics: {
        bestSeason: string;
        visaNotes: string;
        dailyBudgetRange: string;
        primaryAirport: string;
        currency: string;
        healthNotes: string;
        transport: {
            airportToHotel: string;
            withinCity: string;
            betweenDestinations: string;
        };
    };
    culturalIntelligence: {
        communicationStyle: string;
        businessEtiquette: string;
        socialCustoms: string;
        diningNorms: string;
    };
    groupBondingActivities: {
        activity: string;
        durationHours: number | string;
        costPerPerson: number | string;
        whyItWorks: string;
    }[];
    premiumAccommodations: {
        name: string;
        city: string;
        stars: number;
        whyGoodForGroups: string;
    }[];
};
