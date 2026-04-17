"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function updateItineraryItem(
    itemId: string,
    data: { title?: string; description?: string; timeBucket?: string }
) {
    const item = await prisma.itineraryItem.update({
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
    const item = await prisma.itineraryItem.create({
        data: {
            ...data,
            itineraryDayId: dayId,
        },
    });

    revalidatePath("/trips");
    return item;
}

export async function deleteItineraryItem(itemId: string) {
    await prisma.itineraryItem.delete({
        where: { id: itemId },
    });

    revalidatePath("/trips");
}

export async function addItineraryDay(itineraryId: string, title: string) {
    const lastDay = await prisma.itineraryDay.findFirst({
        where: { itineraryId },
        orderBy: { dayIndex: 'desc' },
    });

    const day = await prisma.itineraryDay.create({
        data: {
            itineraryId,
            dayIndex: lastDay ? lastDay.dayIndex + 1 : 1,
            title,
        },
    });

    revalidatePath("/trips");
    return day;
}

export async function deleteItineraryDay(dayId: string) {
    // Items are cascade-deleted by the DB relation (onDelete: Cascade)
    await prisma.itineraryDay.delete({
        where: { id: dayId },
    });

    revalidatePath("/trips");
}
