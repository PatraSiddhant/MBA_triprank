"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";

export async function toggleInterest(templateSlug: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("You must be signed in to show interest");
    }

    // Get user info from our DB to get school
    const dbUser = await prisma.user.findUnique({
        where: { id: user.id }
    });

    const existing = await prisma.tripInterest.findUnique({
        where: {
            templateSlug_userId: {
                templateSlug,
                userId: user.id
            }
        }
    });

    if (existing) {
        await prisma.tripInterest.delete({
            where: { id: existing.id }
        });
    } else {
        await prisma.tripInterest.create({
            data: {
                templateSlug,
                userId: user.id,
                school: dbUser?.school || null
            }
        });
    }

    revalidatePath(`/templates/${templateSlug}`);
}

export async function getInterestData(templateSlug: string) {
    const interests = await prisma.tripInterest.findMany({
        where: { templateSlug },
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    school: true
                }
            }
        }
    });

    return {
        count: interests.length,
        users: interests.map(i => ({
            name: i.user.name,
            avatar: i.user.avatar,
            school: i.user.school
        }))
    };
}
