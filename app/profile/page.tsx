import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
            _count: { select: { trips: true, posts: true } },
        },
    }).catch(() => null);

    return (
        <ProfileClient
            email={user.email ?? ""}
            name={dbUser?.name ?? user.user_metadata?.name ?? ""}
            avatar={dbUser?.avatar ?? user.user_metadata?.avatar_url ?? null}
            school={dbUser?.school ?? null}
            cohortYear={dbUser?.cohortYear ?? null}
            travelPersona={dbUser?.travelPersona ?? null}
            tripCount={dbUser?._count.trips ?? 0}
            postCount={dbUser?._count.posts ?? 0}
        />
    );
}
