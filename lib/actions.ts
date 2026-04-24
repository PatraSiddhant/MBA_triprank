"use server";

import prisma from "./prisma";
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { tripTemplates } from "@/data/trip-templates";
import type { User } from "@supabase/supabase-js";
import {
    TripStatusSchema,
    UpdateTripDateSchema,
    UpdateTripDestinationSchema,
    TemplateSlugSchema,
    LogPastTripDetailsSchema,
} from "./validations";
import { signTripId } from "./guest-auth";

async function addGuestTrip(tripId: string) {
    const cookieStore = await cookies();
    const existing = cookieStore.get("guest_trips")?.value;
    let guestTrips: string[] = [];
    if (existing) {
        try { guestTrips = JSON.parse(existing); } catch { }
    }
    const signed = signTripId(tripId);
    if (!guestTrips.includes(signed)) {
        guestTrips.push(signed);
    }
    // Guard against cookie size overflow (max ~50 IDs)
    if (guestTrips.length > 50) guestTrips = guestTrips.slice(-50);
    cookieStore.set("guest_trips", JSON.stringify(guestTrips), { maxAge: 60 * 60 * 24 * 365, path: '/' });
}

async function upsertUser(user: User) {
    await prisma.user.upsert({
        where: { id: user.id },
        update: {
            email: user.email || '',
            name: user.user_metadata?.name || user.email?.split('@')[0],
            avatar: user.user_metadata?.avatar_url || null
        },
        create: {
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            avatar: user.user_metadata?.avatar_url || null
        }
    });
}

function buildItineraryCreate(template: NonNullable<ReturnType<typeof tripTemplates.find>>) {
    return {
        create: {
            days: {
                create: template.days?.map((d: { dayIndex?: number; title?: string; items?: Array<{ title?: string; description?: string; timeBucket?: string }> }) => ({
                    dayIndex: d.dayIndex || 1,
                    title: d.title || "Day",
                    items: {
                        create: d.items?.map((item) => ({
                            title: item.title || "Activity",
                            description: item.description || "",
                            timeBucket: item.timeBucket || "Anytime"
                        })) || []
                    }
                })) || []
            }
        }
    };
}

export async function addTripFromTemplateAction(templateSlug: string) {
    const slug = TemplateSlugSchema.parse(templateSlug);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const template = tripTemplates.find(t => t.slug === slug);
    if (!template) throw new Error("Template not found");

    if (user) await upsertUser(user);

    const trip = await prisma.tripCandidate.create({
        data: {
            name: `My ${template.title}`,
            primaryDestinationCity: template.primaryDestinationCity,
            primaryDestinationCountry: template.primaryDestinationCountry,
            durationDays: Number(template.durationDays) || 1,
            roughBudgetUsd: Number(template.roughBudgetUsd) || 0,
            templateSlug: template.slug,
            theme: template.themes?.[0] || 'Adventure',
            tags: JSON.stringify(template.vibes || []),
            status: "planning",
            userId: user?.id || null,
            itinerary: buildItineraryCreate(template)
        }
    });

    if (!user) await addGuestTrip(trip.id);

    revalidatePath("/journal");
    redirect("/journal");
}

export async function logPastTripFromTemplateAction(templateSlug: string) {
    const slug = TemplateSlugSchema.parse(templateSlug);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const template = tripTemplates.find(t => t.slug === slug);
    if (!template) throw new Error("Template not found");

    if (user) await upsertUser(user);

    const trip = await prisma.tripCandidate.create({
        data: {
            name: `Log: ${template.title}`,
            primaryDestinationCity: template.primaryDestinationCity,
            primaryDestinationCountry: template.primaryDestinationCountry,
            durationDays: Number(template.durationDays) || 1,
            roughBudgetUsd: Number(template.roughBudgetUsd) || 0,
            templateSlug: template.slug,
            theme: template.themes?.[0] || 'Adventure',
            tags: JSON.stringify(template.vibes || []),
            status: "completed",
            userId: user?.id || null,
            itinerary: buildItineraryCreate(template)
        }
    });

    if (!user) await addGuestTrip(trip.id);

    revalidatePath("/journal");
    redirect("/journal");
}

async function requireTripAccess(tripId: string, userId?: string) {
    const trip = await prisma.tripCandidate.findUnique({ where: { id: tripId } });
    if (!trip) return null;
    if (trip.userId && trip.userId !== userId) redirect("/login");
    return trip;
}

export async function updateTripStatusAction(tripId: string, status: 'planning' | 'booked' | 'completed') {
    const validatedStatus = TripStatusSchema.parse(status);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!await requireTripAccess(tripId, user?.id)) return;

    await prisma.tripCandidate.update({
        where: { id: tripId },
        data: { status: validatedStatus }
    });

    revalidatePath("/journal");
    revalidatePath(`/journal/${tripId}`);
}

export async function updateTripDateAction(tripId: string, startDate: string | null, endDate: string | null) {
    UpdateTripDateSchema.parse({ tripId, startDate, endDate });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!await requireTripAccess(tripId, user?.id)) return;

    await prisma.tripCandidate.update({
        where: { id: tripId },
        data: {
            travelDateStart: startDate ? new Date(startDate) : null,
            travelDateEnd: endDate ? new Date(endDate) : null,
        }
    });

    revalidatePath("/journal");
    revalidatePath(`/journal/${tripId}`);
}

export async function updateTripDestinationAction(tripId: string, city: string, country: string) {
    UpdateTripDestinationSchema.parse({ tripId, city, country });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!await requireTripAccess(tripId, user?.id)) return;

    await prisma.tripCandidate.update({
        where: { id: tripId },
        data: {
            primaryDestinationCity: city,
            primaryDestinationCountry: country,
        }
    });

    revalidatePath("/journal");
    revalidatePath(`/journal/${tripId}`);
}

export async function createWorldMapTripAction(country: string, cities: { name: string, lat: number, lng: number }[]) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) await upsertUser(user);

    const firstCity = cities[0]?.name ?? "TBD";

    const trip = await prisma.tripCandidate.create({
        data: {
            name: `${country} Expedition`,
            primaryDestinationCity: firstCity,
            primaryDestinationCountry: country,
            durationDays: cities.length * 3,
            roughBudgetUsd: cities.length * 500,
            theme: "Explorer",
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

    if (!user) await addGuestTrip(trip.id);

    revalidatePath("/journal");
    return trip.id;
}

export async function logPastTripWithDetailsAction(
    templateSlug: string | null,
    details: {
        city: string;
        country: string;
        startDate: string | null;
        endDate: string | null;
        overallRating: number;
        highlightMoment?: string;
        durationDays?: number;
    }
) {
    const validatedDetails = LogPastTripDetailsSchema.parse(details);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) await upsertUser(user);

    const template = templateSlug ? tripTemplates.find(t => t.slug === templateSlug) : null;

    const trip = await prisma.tripCandidate.create({
        data: {
            name: template ? `Log: ${template.title}` : `${validatedDetails.city} Trip`,
            primaryDestinationCity: validatedDetails.city || template?.primaryDestinationCity || "TBD",
            primaryDestinationCountry: validatedDetails.country || template?.primaryDestinationCountry || "TBD",
            durationDays: validatedDetails.durationDays || Number(template?.durationDays) || 1,
            roughBudgetUsd: Number(template?.roughBudgetUsd) || 0,
            templateSlug: template?.slug ?? null,
            theme: template?.themes?.[0] || 'Adventure',
            tags: template ? JSON.stringify(template.vibes || []) : "[]",
            status: "completed",
            travelDateStart: validatedDetails.startDate ? new Date(validatedDetails.startDate) : null,
            travelDateEnd: validatedDetails.endDate ? new Date(validatedDetails.endDate) : null,
            userId: user?.id || null,
            itinerary: template ? buildItineraryCreate(template) : {
                create: { days: { create: [{ dayIndex: 1, title: `Explore ${validatedDetails.city}` }] } }
            },
            memory: validatedDetails.overallRating ? {
                create: {
                    overallRating: validatedDetails.overallRating,
                    highlightMoment: validatedDetails.highlightMoment || "",
                    foodPick: "",
                    hiddenGem: "",
                    travelTip: "",
                    wouldReturn: validatedDetails.overallRating >= 4,
                }
            } : undefined,
        }
    });

    if (!user) await addGuestTrip(trip.id);

    revalidatePath("/journal");
    redirect(`/journal/${trip.id}`);
}

export async function deleteTripAction(tripId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const trip = await prisma.tripCandidate.findUnique({ where: { id: tripId } });
    if (!trip) return;
    if (trip.userId && trip.userId !== user?.id) return;

    await prisma.tripMemory.deleteMany({ where: { tripCandidateId: tripId } });
    const itinerary = await prisma.itinerary.findUnique({ where: { tripCandidateId: tripId } });
    if (itinerary) {
        const days = await prisma.itineraryDay.findMany({ where: { itineraryId: itinerary.id } });
        for (const day of days) {
            await prisma.itineraryItem.deleteMany({ where: { itineraryDayId: day.id } });
        }
        await prisma.itineraryDay.deleteMany({ where: { itineraryId: itinerary.id } });
        await prisma.itinerary.delete({ where: { id: itinerary.id } });
    }
    await prisma.tripCandidate.delete({ where: { id: tripId } });

    revalidatePath("/journal");
}

export async function createCustomTripAction() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) await upsertUser(user);

    const trip = await prisma.tripCandidate.create({
        data: {
            name: "New Adventure",
            primaryDestinationCity: "TBD",
            primaryDestinationCountry: "TBD",
            durationDays: 1,
            roughBudgetUsd: 0,
            theme: "Custom",
            tags: "[]",
            status: "planning",
            userId: user?.id || null,
            itinerary: {
                create: {
                    days: {
                        create: [{ dayIndex: 1, title: "Day 1" }]
                    }
                }
            }
        }
    });

    if (!user) await addGuestTrip(trip.id);

    revalidatePath("/journal");
    redirect(`/journal/${trip.id}`);
}
