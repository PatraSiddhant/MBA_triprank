"use server";

import prisma from "./prisma";
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, tripSlug?: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("You must be logged in to post.");
    }

    // Ensure user exists in Prisma
    await (prisma as any).user.upsert({
        where: { id: user.id },
        update: { email: user.email! },
        create: {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || user.email?.split('@')[0],
            avatar: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
        },
    });

    const post = await (prisma as any).post.create({
        data: {
            content,
            tripSlug,
            userId: user.id,
            type: "update",
        },
    });

    revalidatePath("/socials");
    return post;
}

export async function getPosts() {
    const posts = await (prisma as any).post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: true,
        },
    });

    return posts;
}
