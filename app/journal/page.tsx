import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { verifySignedTripId } from "@/lib/guest-auth";
import TripsPageClient from "./TripsPageClient";

export default async function UserTripsIndex() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const cookieStore = await cookies();
    const guestTripsCookie = cookieStore.get("guest_trips")?.value;
    let guestTripIds: string[] = [];
    if (guestTripsCookie) {
        try {
            const raw: string[] = JSON.parse(guestTripsCookie);
            // Verify each signed token — reject any that don't pass HMAC check
            guestTripIds = raw
                .map(verifySignedTripId)
                .filter((id): id is string => id !== null);
        } catch { }
    }

    let trips: {
        id: string;
        name: string;
        primaryDestinationCity: string;
        primaryDestinationCountry: string;
        durationDays: number;
        roughBudgetUsd: number;
        status: string;
        travelDateStart: Date | null;
        travelDateEnd: Date | null;
        createdAt: Date;
        updatedAt: Date;
        itinerary: object | null;
        memory: {
            highlightMoment: string | null;
            overallRating: number | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }[] = [];

    try {
        if (user) {
            trips = await prisma.tripCandidate.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: 'desc' },
                include: { itinerary: true, memory: true },
            });
        } else if (guestTripIds.length > 0) {
            trips = await prisma.tripCandidate.findMany({
                where: { id: { in: guestTripIds }, userId: null },
                orderBy: { createdAt: 'desc' },
                include: { itinerary: true, memory: true },
            });
        }
    } catch (e) {
        console.error("Prisma error:", e);
    }

    const serialized = trips.map(t => ({
        ...t,
        createdAt: t.createdAt?.toISOString?.() ?? null,
        updatedAt: t.updatedAt?.toISOString?.() ?? null,
        travelDateStart: t.travelDateStart?.toISOString?.() ?? null,
        travelDateEnd: t.travelDateEnd?.toISOString?.() ?? null,
        memory: t.memory ? {
            ...t.memory,
            createdAt: t.memory.createdAt?.toISOString?.() ?? null,
            updatedAt: t.memory.updatedAt?.toISOString?.() ?? null,
        } : null,
    }));

    return <TripsPageClient trips={serialized} userId={user?.id ?? null} />;
}
