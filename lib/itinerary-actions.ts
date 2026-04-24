"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { ItineraryItemSchema } from "./validations";
import { z } from "zod";

export async function updateItineraryItem(
    itemId: string,
    data: { title?: string; description?: string; timeBucket?: string }
) {
    const validated = ItineraryItemSchema.partial().parse(data);
    const item = await prisma.itineraryItem.update({
        where: { id: itemId },
        data: validated,
    });

    const day = await prisma.itineraryDay.findFirst({ where: { items: { some: { id: itemId } } }, include: { itinerary: true } });
    if (day?.itinerary.tripCandidateId) {
        revalidatePath(`/journal/${day.itinerary.tripCandidateId}`);
    }
    return item;
}

export async function addItineraryItem(
    dayId: string,
    data: { title: string; description: string; timeBucket: string }
) {
    const validated = ItineraryItemSchema.parse(data);
    const item = await prisma.itineraryItem.create({
        data: {
            ...validated,
            itineraryDayId: dayId,
        },
    });

    const day = await prisma.itineraryDay.findUnique({ where: { id: dayId }, include: { itinerary: true } });
    if (day?.itinerary.tripCandidateId) {
        revalidatePath(`/journal/${day.itinerary.tripCandidateId}`);
    }
    return item;
}

export async function deleteItineraryItem(itemId: string) {
    const item = await prisma.itineraryItem.findUnique({
        where: { id: itemId },
        include: { itineraryDay: { include: { itinerary: true } } },
    });

    await prisma.itineraryItem.delete({ where: { id: itemId } });

    if (item?.itineraryDay?.itinerary?.tripCandidateId) {
        revalidatePath(`/journal/${item.itineraryDay.itinerary.tripCandidateId}`);
    }
}

export async function addItineraryDay(itineraryId: string, title: string) {
    const validTitle = z.string().min(1).max(100).parse(title);
    const lastDay = await prisma.itineraryDay.findFirst({
        where: { itineraryId },
        orderBy: { dayIndex: 'desc' },
    });

    const day = await prisma.itineraryDay.create({
        data: {
            itineraryId,
            dayIndex: lastDay ? lastDay.dayIndex + 1 : 1,
            title: validTitle,
        },
    });

    const itinerary = await prisma.itinerary.findUnique({ where: { id: itineraryId } });
    if (itinerary?.tripCandidateId) {
        revalidatePath(`/journal/${itinerary.tripCandidateId}`);
    }
    return day;
}

export async function deleteItineraryDay(dayId: string) {
    const day = await prisma.itineraryDay.findUnique({
        where: { id: dayId },
        include: { itinerary: true },
    });

    await prisma.itineraryDay.delete({ where: { id: dayId } });

    if (day?.itinerary?.tripCandidateId) {
        revalidatePath(`/journal/${day.itinerary.tripCandidateId}`);
    }
}
