import React from "react";
import SocialFeed from "@/components/SocialFeed";
import { getPosts } from "@/lib/social-actions";
import { createClient } from "@/lib/supabase/server";

export default async function SocialsPage() {
    const posts = await getPosts();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Map Prisma posts to the format expected by SocialFeed
    const serializedPosts = posts.map((post: any) => ({
        ...post,
        createdAt: post.createdAt,
    }));

    return (
        <div style={{ paddingTop: '8rem', minHeight: '100vh', background: 'var(--bg)' }}>
            <div className="container">
                <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '100px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border)',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--accent)'
                    }}>
                        MBA Community • Network Effects
                    </div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Global Social Feed</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
                        See what your peers across top MBA programs are ranking, planning, and dreaming about.
                    </p>
                </header>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <SocialFeed initialPosts={serializedPosts as any} currentUserId={user?.id} />
                </div>
            </div>
        </div>
    );
}
