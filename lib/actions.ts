"use server";

import prisma from "./prisma";
import { getTripTemplateBySlug } from "@/data/trip-templates";
import { redirect } from "next/navigation";

export async function cloneTemplateAction(slug: string) {
    const template = getTripTemplateBySlug(slug);

    if (!template) {
        throw new Error("Template not found");
    }

    const trip = await prisma.tripCandidate.create({
        data: {
            name: `My ${template.title}`,
            primaryDestinationCity: template.primaryDestinationCity,
            primaryDestinationCountry: template.primaryDestinationCountry,
            durationDays: template.durationDays,
            roughBudgetUsd: template.roughBudgetUsd,
            theme: template.theme,
            tags: JSON.stringify(template.vibes),
            templateSlug: template.slug,
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

    redirect(`/trips/${trip.id}`);
}
