"use server";

import prisma from "./prisma";
import { getTripTemplateBySlug } from "@/data/trip-templates";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";

export async function cloneTemplateAction(slug: string) {
    const template = getTripTemplateBySlug(slug);

    if (!template) {
        throw new Error("Template not found");
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const trip = await prisma.tripCandidate.create({
        data: {
            name: `My ${template.title}`,
            primaryDestinationCity: template.primaryDestinationCity,
            primaryDestinationCountry: template.primaryDestinationCountry,
            durationDays: template.durationDays,
            roughBudgetUsd: template.roughBudgetUsd,
            theme: template.themes.join(', '),
            tags: JSON.stringify(template.vibes),
            templateSlug: template.slug,
            status: "planning",
            userId: user?.id || null, // Attach user if logged in
            itinerary: {
                create: {
                    days: {
                        create: template.days.map((day) => ({
                            dayIndex: day.dayIndex,
                            title: day.title,
                            items: {
                                create: day.items.map((item) => ({
                                    title: item.title,
                                    description: item.description,
                                    timeBucket: item.timeBucket,
                                    costEstimate: item.costEstimate,
                                    link: item.link,
                                })),
                            },
                        })),
                    },
                },
            },
        },
    });

    revalidatePath("/trips");
    redirect(`/trips/${trip.id}`);
}

export async function updateTripStatusAction(tripId: string, status: 'planning' | 'booked' | 'completed') {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    await (prisma as any).tripCandidate.update({
        where: { id: tripId, userId: user.id },
        data: { status }
    });

    revalidatePath("/trips");
    revalidatePath(`/trips/${tripId}`);
}
