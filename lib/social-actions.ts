"use server";

import prisma from "./prisma";
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import { CreatePostSchema } from "./validations";

export async function createPost(content: string, tripSlug?: string, imageUrl?: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("You must be logged in to post.");
    }

    const validated = CreatePostSchema.parse({ content, tripSlug, imageUrl });

    await prisma.user.upsert({
        where: { id: user.id },
        update: { email: user.email! },
        create: {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || user.email?.split('@')[0],
            avatar: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
        },
    });

    const post = await prisma.post.create({
        data: {
            content: validated.content,
            tripSlug: validated.tripSlug ?? null,
            imageUrl: validated.imageUrl || null,
            userId: user.id,
            type: "update",
        },
    });

    revalidatePath("/socials");
    return post;
}

export async function getPosts(page = 0, limit = 20) {
    return prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: true },
        skip: page * limit,
        take: limit,
    });
}

export async function getPostCount() {
    return prisma.post.count();
}
