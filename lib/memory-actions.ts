"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";

export async function saveMemoryAction(tripId: string, data: {
    highlightMoment?: string;
    foodPick?: string;
    hiddenGem?: string;
    wouldReturn?: boolean;
    overallRating?: number;
    travelTip?: string;
    photoUrl?: string;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("You must be signed in to save memories.");
    }

    // Ensure trip exists and belongs to user
    const trip = await prisma.tripCandidate.findUnique({
        where: { id: tripId, userId: user.id }
    });

    if (!trip) {
        throw new Error("Trip not found or unauthorized.");
    }

    await prisma.tripMemory.upsert({
        where: { tripCandidateId: tripId },
        update: {
            ...data,
            updatedAt: new Date()
        },
        create: {
            tripCandidateId: tripId,
            ...data
        }
    });

    revalidatePath("/journal");
    revalidatePath(`/journal/${tripId}`);
}

export async function getMemoryAction(tripId: string) {
    return await prisma.tripMemory.findUnique({
        where: { tripCandidateId: tripId }
    });
}
