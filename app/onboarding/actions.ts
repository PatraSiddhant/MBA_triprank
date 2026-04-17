"use server";

import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveOnboardingProfileArea(
    school: string,
    cohortYear: string,
    section: string
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Must be logged in to save onboarding");
    }

    await prisma.user.upsert({
        where: { id: user.id },
        update: {
            school,
            cohortYear,
            section,
        },
        create: {
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.name || user.email?.split('@')[0],
            avatar: user.user_metadata?.avatar_url || null,
            school,
            cohortYear,
            section
        }
    });

    return { success: true };
}

export async function saveOnboardingDna(
    tripDnaVector: any
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Must be logged in to save onboarding");
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            tripDna: JSON.stringify(tripDnaVector)
        }
    });

    return { success: true };
}
