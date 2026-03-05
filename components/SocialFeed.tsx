"use client";

import React, { useState } from "react";
import { getAllTripTemplates } from "@/data/trip-templates";
import { Heart, Share2, MessageSquare, ShieldCheck, Trophy, Send } from "lucide-react";
import { createPost } from "@/lib/social-actions";

interface PostWithUser {
    id: string;
    content: string;
    userId: string;
    tripSlug: string | null;
    type: string;
    likes: number;
    createdAt: Date;
    user: {
        id: string;
        name: string | null;
        avatar: string | null;
        school: string | null;
        travelPersona: string | null;
    };
}

interface SocialFeedProps {
    initialPosts: PostWithUser[];
    currentUserId?: string;
}

export default function SocialFeed({ initialPosts, currentUserId }: SocialFeedProps) {
    const [activeTab, setActiveTab] = useState<"global" | "school">("global");
    const [posts, setPosts] = useState(initialPosts);
    const [newPostContent, setNewPostContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const templates = getAllTripTemplates();

    const filteredPosts = activeTab === "school"
        ? posts.filter(p => p.user.school === "Columbia Business School")
        : posts;

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        setIsSubmitting(true);
        try {
            const post = await createPost(newPostContent);
            // In a real app, revalidatePath would handle this, but for SPA feel we can optimistic update
            // However, since we are using server actions and revalidatePath, let's just clear and wait for refresh or manual update
            setNewPostContent("");
            // Refreshing posts would be better, but for now let's just reload or trust the server action
            window.location.reload();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to post");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            background: "rgba(255,255,255,0.02)",
            borderRadius: "2rem",
            border: "1px solid var(--border)",
            padding: "2rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>MBA Global Feed</h3>
                <div style={{
                    display: "flex",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "100px",
                    padding: "4px",
                    border: "1px solid var(--border)"
                }}>
                    <button
                        onClick={() => setActiveTab("global")}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "100px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            background: activeTab === "global" ? "var(--accent)" : "transparent",
                            color: activeTab === "global" ? "white" : "var(--secondary)",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                    >
                        Global
                    </button>
                    <button
                        onClick={() => setActiveTab("school")}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "100px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            background: activeTab === "school" ? "var(--accent)" : "transparent",
                            color: activeTab === "school" ? "white" : "var(--secondary)",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                    >
                        My School
                    </button>
                </div>
            </div>

            {/* Post Creation Banner at the TOP */}
            <form onSubmit={handlePostSubmit} style={{
                background: "rgba(0,112,243,0.05)",
                border: "1px dashed var(--accent)",
                borderRadius: "1rem",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--accent)" }}>
                    Create a new post: What kind of trip have you been to recently?
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Share your Trip DNA with your school community..."
                        style={{
                            flex: 1,
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid var(--border)",
                            borderRadius: "0.75rem",
                            padding: "0.75rem",
                            color: "white",
                            fontSize: "0.875rem",
                            resize: "none",
                            minHeight: "80px"
                        }}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting || !newPostContent.trim()}
                        className="btn btn-primary"
                        style={{
                            alignSelf: "flex-end",
                            padding: "0.75rem",
                            borderRadius: "0.75rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                overflowY: "auto",
                maxHeight: "700px",
                paddingRight: "0.5rem"
            }} className="custom-scrollbar">
                {filteredPosts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--secondary)' }}>
                        No posts yet. Be the first to share!
                    </div>
                )}
                {filteredPosts.map(post => {
                    const user = post.user;
                    const trip = templates.find(t => t.slug === post.tripSlug);

                    return (
                        <div key={post.id} className="glass" style={{
                            padding: "1.5rem",
                            borderRadius: "1.25rem",
                            border: "1px solid rgba(255,255,255,0.05)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                <div style={{ display: "flex", gap: "0.875rem", alignItems: "center" }}>
                                    <img src={user.avatar || ""} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{user.name}</span>
                                            {user.travelPersona && (
                                                <span style={{
                                                    fontSize: "0.6rem",
                                                    background: "rgba(0,112,243,0.1)",
                                                    color: "var(--accent)",
                                                    padding: "2px 6px",
                                                    borderRadius: "4px",
                                                    fontWeight: 800,
                                                    textTransform: "uppercase"
                                                }}>
                                                    {user.travelPersona}
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--secondary)" }}>
                                            {user.school || "MBA Student"} • {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ color: "var(--accent)", opacity: 0.5 }}>
                                    {post.type === "rank_update" && <Trophy size={16} />}
                                    {post.type === "review" && <MessageSquare size={16} />}
                                    {post.type === "itinerary_cloned" && <Share2 size={16} />}
                                </div>
                            </div>

                            <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.5, color: "var(--foreground)" }}>
                                {post.content}
                            </p>

                            {trip && (
                                <div style={{
                                    display: "flex",
                                    gap: "1rem",
                                    background: "rgba(255,255,255,0.03)",
                                    borderRadius: "0.75rem",
                                    padding: "0.75rem",
                                    alignItems: "center"
                                }}>
                                    <img src={trip.photos[0].path} alt="" style={{ width: "60px", height: "40px", borderRadius: "4px", objectFit: "cover" }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: "0.8rem", fontWeight: 700 }}>{trip.title}</div>
                                        <div suppressHydrationWarning style={{ fontSize: "0.7rem", color: "var(--accent)", fontWeight: 600 }}>
                                            Trip Matching Enabled
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.7rem" }}>
                                        Clone
                                    </button>
                                </div>
                            )}

                            <div style={{ display: "flex", gap: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--secondary)", fontSize: "0.75rem", cursor: "pointer" }}>
                                    <Heart size={14} /> {post.likes}
                                </div>
                                <div suppressHydrationWarning style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--secondary)", fontSize: "0.75rem", cursor: "pointer" }}>
                                    <MessageSquare size={14} /> 0
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
