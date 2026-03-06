"use server";

import prisma from "./prisma";
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { tripTemplates } from "@/data/trip-templates";

export async function addTripFromTemplateAction(templateSlug: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const template = tripTemplates.find(t => t.slug === templateSlug);
    if (!template) throw new Error("Template not found");

    // Ensure user exists if logged in
    if (user) {
        await (prisma as any).user.upsert({
            where: { id: user.id },
            update: { email: user.email || '' },
            create: { id: user.id, email: user.email || '', name: user.email?.split('@')[0] || 'User' }
        });
    }

    const trip = await (prisma as any).tripCandidate.create({
        data: {
            name: `My ${template.title}`,
            primaryDestinationCity: template.primaryDestinationCity,
            primaryDestinationCountry: template.primaryDestinationCountry,
            durationDays: template.durationDays,
            roughBudgetUsd: template.roughBudgetUsd,
            templateSlug: template.slug,
            status: "planning",
            userId: user?.id || null,
            itinerary: {
                create: {
                    days: {
                        create: template.days?.map((d: any) => ({
                            dayIndex: d.dayIndex || 1,
                            title: d.title || "Day",
                            items: {
                                create: d.items?.map((item: any) => ({
                                    title: item.title,
                                    description: item.description,
                                    timeBucket: item.timeBucket
                                })) || []
                            }
                        })) || []
                    }
                }
            }
        }
    });

    revalidatePath("/trips");
    redirect("/trips");
}

export async function logPastTripFromTemplateAction(templateSlug: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const template = tripTemplates.find(t => t.slug === templateSlug);
    if (!template) throw new Error("Template not found");

    // Ensure user exists if logged in
    if (user) {
        await (prisma as any).user.upsert({
            where: { id: user.id },
            update: { email: user.email || '' },
            create: { id: user.id, email: user.email || '', name: user.email?.split('@')[0] || 'User' }
        });
    }

    const trip = await (prisma as any).tripCandidate.create({
        data: {
            name: `Log: ${template.title}`,
            primaryDestinationCity: template.primaryDestinationCity,
            primaryDestinationCountry: template.primaryDestinationCountry,
            durationDays: template.durationDays,
            roughBudgetUsd: template.roughBudgetUsd,
            templateSlug: template.slug,
            status: "completed",
            userId: user?.id || null,
            itinerary: {
                create: {
                    days: {
                        create: template.days?.map((d: any) => ({
                            dayIndex: d.dayIndex || 1,
                            title: d.title || "Day",
                            items: {
                                create: d.items?.map((item: any) => ({
                                    title: item.title,
                                    description: item.description,
                                    timeBucket: item.timeBucket
                                })) || []
                            }
                        })) || []
                    }
                }
            }
        }
    });

    revalidatePath("/trips");
    redirect("/trips");
}

export async function updateTripStatusAction(tripId: string, status: 'planning' | 'booked' | 'completed') {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const trip = await (prisma as any).tripCandidate.findUnique({ where: { id: tripId } });
    if (!trip) return;
    if (trip.userId && trip.userId !== user?.id) redirect("/login");

    await (prisma as any).tripCandidate.update({
        where: { id: tripId },
        data: { status }
    });

    revalidatePath("/trips");
    revalidatePath(`/trips/${tripId}`);
}

export async function updateTripDateAction(tripId: string, startDate: string | null, endDate: string | null) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const trip = await (prisma as any).tripCandidate.findUnique({ where: { id: tripId } });
    if (!trip) return;
    if (trip.userId && trip.userId !== user?.id) redirect("/login");

    await (prisma as any).tripCandidate.update({
        where: { id: tripId },
        data: {
            travelDateStart: startDate ? new Date(startDate) : null,
            travelDateEnd: endDate ? new Date(endDate) : null,
        }
    });

    revalidatePath("/trips");
}

export async function updateTripDestinationAction(tripId: string, city: string, country: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const trip = await (prisma as any).tripCandidate.findUnique({ where: { id: tripId } });
    if (!trip) return;
    if (trip.userId && trip.userId !== user?.id) redirect("/login");

    await (prisma as any).tripCandidate.update({
        where: { id: tripId },
        data: {
            primaryDestinationCity: city,
            primaryDestinationCountry: country,
        }
    });

    revalidatePath("/trips");
}

export async function createWorldMapTripAction(country: string, cities: { name: string, lat: number, lng: number }[]) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        await (prisma as any).user.upsert({
            where: { id: user.id },
            update: {
                email: user.email || '',
                name: user.user_metadata?.name || user.email?.split('@')[0],
                avatar: user.user_metadata?.avatar_url || null
            },
            create: {
                id: user.id,
                email: user.email || '',
                name: user.user_metadata?.name || user.email?.split('@')[0],
                avatar: user.user_metadata?.avatar_url || null
            }
        });
    }

    const firstCity = cities.length > 0 ? cities[0].name : "TBD";

    const trip = await (prisma as any).tripCandidate.create({
        data: {
            name: `${country} Expedition`,
            primaryDestinationCity: firstCity,
            primaryDestinationCountry: country,
            durationDays: cities.length * 3,
            roughBudgetUsd: cities.length * 500,
            status: "completed",
            userId: user?.id || null,
            tags: JSON.stringify(cities),
            itinerary: {
                create: {
                    days: {
                        create: cities.map((c, i) => ({ dayIndex: i + 1, title: `Explore ${c.name}` }))
                    }
                }
            }
        }
    });

    revalidatePath("/trips");
    return trip.id;
}

export async function createCustomTripAction() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // Ensure user exists in our DB
        await (prisma as any).user.upsert({
            where: { id: user.id },
            update: {
                email: user.email || '',
                name: user.user_metadata?.name || user.email?.split('@')[0],
                avatar: user.user_metadata?.avatar_url || null
            },
            create: {
                id: user.id,
                email: user.email || '',
                name: user.user_metadata?.name || user.email?.split('@')[0],
                avatar: user.user_metadata?.avatar_url || null
            }
        });
    }

    const trip = await (prisma as any).tripCandidate.create({
        data: {
            name: "New Adventure",
            primaryDestinationCity: "TBD",
            primaryDestinationCountry: "TBD",
            durationDays: 1,
            roughBudgetUsd: 0,
            status: "planning",
            userId: user?.id || null,
            itinerary: {
                create: {
                    days: {
                        create: [{ dayIndex: 1, title: "Day 1", items: { create: [] } }]
                    }
                }
            }
        }
    });

    revalidatePath("/trips");
    redirect(`/trips/${trip.id}`);
}
