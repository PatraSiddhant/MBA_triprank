import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import TripsPageClient from "./TripsPageClient";

export default async function UserTripsIndex() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const cookieStore = await cookies();
    const guestTripsCookie = cookieStore.get("guest_trips")?.value;
    let guestTripIds: string[] = [];
    if (guestTripsCookie) {
        try { guestTripIds = JSON.parse(guestTripsCookie); } catch (e) { }
    }

    let trips: any[] = [];
    try {
        if (user) {
            trips = await (prisma as any).tripCandidate.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: 'desc' },
                include: {
                    itinerary: true,
                    memory: true,
                }
            });
        } else if (guestTripIds.length > 0) {
            trips = await (prisma as any).tripCandidate.findMany({
                where: { id: { in: guestTripIds } },
                orderBy: { createdAt: 'desc' },
                include: {
                    itinerary: true,
                    memory: true,
                }
            });
        }
    } catch (e) {
        console.error("Prisma error:", e);
    }

    // Serialize dates for client components
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
