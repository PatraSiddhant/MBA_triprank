import { getAllTripTemplates, TripTemplate } from "@/data/trip-templates";

export type TravelPersona = "Luxury Voyager" | "Adventure Junkie" | "Cultural Historian" | "Foodie Explorer" | "Party Scout";

export interface SocialUser {
    id: string;
    name: string;
    school: string;
    year: string;
    avatar: string;
    travelPersona: TravelPersona;
    topThreeSlugs: string[];
}

export interface SocialPost {
    id: string;
    userId: string;
    tripSlug: string;
    content: string;
    rating: number;
    timestamp: string;
    likes: number;
    type: "rank_update" | "review" | "itinerary_cloned";
}

export const mockUsers: SocialUser[] = [
    {
        id: "u1",
        name: "Alex Rivera",
        school: "Harvard Business School",
        year: "2026",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        travelPersona: "Adventure Junkie",
        topThreeSlugs: ["patagonia-adventure", "iceland-nature", "kenya-safari"]
    },
    {
        id: "u2",
        name: "Sarah Chen",
        school: "Columbia Business School",
        year: "2027",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        travelPersona: "Cultural Historian",
        topThreeSlugs: ["japan-culture-tech", "egypt-ancient", "peru-machu-picchu"]
    },
    {
        id: "u3",
        name: "Marcus Thorne",
        school: "Wharton",
        year: "2026",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        travelPersona: "Luxury Voyager",
        topThreeSlugs: ["uae-luxury-finance", "egypt-ancient", "portugal-wine"]
    },
    {
        id: "u4",
        name: "Elena Rodriguez",
        school: "Stanford GSB",
        year: "2027",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        travelPersona: "Foodie Explorer",
        topThreeSlugs: ["mexico-treasures", "vietnam-culture", "taiwan-tech-food"]
    },
    {
        id: "u5",
        name: "Jessica Wu",
        school: "Columbia Business School",
        year: "2026",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
        travelPersona: "Party Scout",
        topThreeSlugs: ["colombia-trek", "mexico-treasures", "uae-luxury-finance"]
    }
];

export const mockPosts: SocialPost[] = [
    {
        id: "p1",
        userId: "u1",
        tripSlug: "patagonia-adventure",
        content: "Just finished ranking Patagonia #1. Those granite peaks are calling my name for Spring Break 2027!",
        rating: 5,
        timestamp: "2 hours ago",
        likes: 12,
        type: "rank_update"
    },
    {
        id: "p2",
        userId: "u2",
        tripSlug: "japan-culture-tech",
        content: "Kyoto at sunset is unbeatable. Re-ordering my top 3 to prioritize Temples & Zen.",
        rating: 5,
        timestamp: "5 hours ago",
        likes: 8,
        type: "review"
    },
    {
        id: "p3",
        userId: "u5",
        tripSlug: "colombia-trek",
        content: "Columbia is essential. The Medellin nightlife scene is legendary among CBS students this year.",
        rating: 4.8,
        timestamp: "1 day ago",
        likes: 24,
        type: "rank_update"
    },
    {
        id: "p4",
        userId: "u3",
        tripSlug: "uae-luxury-finance",
        content: "UAE trip DNA: 100% Luxury. Perfect for networking and corporate visits.",
        rating: 5,
        timestamp: "2 days ago",
        likes: 15,
        type: "itinerary_cloned"
    }
];

export function getConsensusData(tripSlug: string) {
    const totalUsers = 100 + Math.floor(Math.random() * 50);
    const votesFor = 70 + Math.floor(Math.random() * 25);
    const percent = Math.floor((votesFor / totalUsers) * 100);

    // School specific
    const schoolLikes = 15 + Math.floor(Math.random() * 10);

    return {
        percent,
        totalVotes: totalUsers,
        schoolFavs: schoolLikes,
        trending: percent > 85
    };
}
