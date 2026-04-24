"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { SaveMemorySchema } from "./validations";

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

    const validated = SaveMemorySchema.parse({ tripId, ...data });

    const trip = await prisma.tripCandidate.findUnique({
        where: { id: tripId, userId: user.id }
    });

    if (!trip) {
        throw new Error("Trip not found or unauthorized.");
    }

    await prisma.tripMemory.upsert({
        where: { tripCandidateId: tripId },
        update: {
            ...validated,
            updatedAt: new Date()
        },
        create: {
            tripCandidateId: tripId,
            ...validated,
        }
    });

    revalidatePath(`/journal/${tripId}`);
    revalidatePath("/journal");
}

export async function getMemoryAction(tripId: string) {
    return await prisma.tripMemory.findUnique({
        where: { tripCandidateId: tripId }
    });
}
