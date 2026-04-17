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

    // Ensure user exists in our DB
    const dbUser = await prisma.user.upsert({
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
        users: interests.map((i) => ({
            name: i.user.name,
            avatar: i.user.avatar,
            school: i.user.school
        }))
    };
}
