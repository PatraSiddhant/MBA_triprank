"use server";

import prisma from "./prisma";
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";

export async function updateItineraryItem(
    itemId: string,
    data: { title?: string; description?: string; timeBucket?: string }
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const item = await (prisma as any).itineraryItem.update({
        where: { id: itemId },
        data,
    });

    revalidatePath("/trips");
    return item;
}

export async function addItineraryItem(
    dayId: string,
    data: { title: string; description: string; timeBucket: string }
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();


    const item = await (prisma as any).itineraryItem.create({
        data: {
            ...data,
            itineraryDayId: dayId,
        },
    });

    revalidatePath("/trips");
    return item;
}

export async function deleteItineraryItem(itemId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    await (prisma as any).itineraryItem.delete({
        where: { id: itemId },
    });

    revalidatePath("/trips");
}

export async function addItineraryDay(
    itineraryId: string,
    title: string
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const existingDays = await (prisma as any).itineraryDay.findMany({
        where: { itineraryId },
        orderBy: { dayIndex: 'desc' },
        take: 1,
    });

    const newIndex = existingDays.length > 0 ? existingDays[0].dayIndex + 1 : 1;

    const day = await (prisma as any).itineraryDay.create({
        data: {
            itineraryId,
            dayIndex: newIndex,
            title,
        },
    });

    revalidatePath("/trips");
    return day;
}

export async function deleteItineraryDay(dayId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Delete all items in the day first
    await (prisma as any).itineraryItem.deleteMany({
        where: { dayId },
    });

    await (prisma as any).itineraryDay.delete({
        where: { id: dayId },
    });

    revalidatePath("/trips");
}
