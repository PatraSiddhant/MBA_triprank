"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { getAllTripTemplates } from "@/data/trip-templates";
import { Heart, Share2, MessageSquare, Trophy, Send, Image as ImageIcon } from "lucide-react";
import { createPost, getPosts } from "@/lib/social-actions";
import { useToast } from "@/components/Toast";

interface PostWithUser {
    id: string;
    content: string;
    userId: string;
    tripSlug: string | null;
    type: string;
    imageUrl: string | null;
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
    totalCount: number;
    currentUserId?: string;
}

const PAGE_SIZE = 20;

export default function SocialFeed({ initialPosts, totalCount, currentUserId }: SocialFeedProps) {
    const [activeTab, setActiveTab] = useState<"global" | "school">("global");
    const [posts, setPosts] = useState(initialPosts);
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostImageUrl, setNewPostImageUrl] = useState("");
    const [showImageInput, setShowImageInput] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingMore, startLoadMore] = useTransition();
    const [page, setPage] = useState(0);
    const hasMore = posts.length < totalCount;
    const templates = getAllTripTemplates();
    const { success, error } = useToast();

    const filteredPosts = activeTab === "school"
        ? posts.filter(p => p.user.school === "Columbia Business School")
        : posts;

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        setIsSubmitting(true);
        try {
            await createPost(newPostContent, undefined, newPostImageUrl || undefined);
            setNewPostContent("");
            setNewPostImageUrl("");
            setShowImageInput(false);
            success("Post shared with the community!");
            window.location.reload();
        } catch (err) {
            error(err instanceof Error ? err.message : "Failed to post");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLoadMore = () => {
        startLoadMore(async () => {
            try {
                const nextPage = page + 1;
                const morePosts = await getPosts(nextPage, PAGE_SIZE);
                setPosts(prev => [...prev, ...morePosts as PostWithUser[]]);
                setPage(nextPage);
            } catch {
                error("Failed to load more posts");
            }
        });
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

            {/* Post Creation */}
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
                {showImageInput && (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                            type="url"
                            value={newPostImageUrl}
                            onChange={(e) => setNewPostImageUrl(e.target.value)}
                            placeholder="Paste image URL..."
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border)',
                                borderRadius: '0.75rem',
                                padding: '0.75rem',
                                color: 'white',
                                fontSize: '0.825rem'
                            }}
                        />
                    </div>
                )}
                {newPostImageUrl && (
                    <div style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', maxHeight: '200px' }}>
                        <img src={newPostImageUrl} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '0.75rem' }} />
                        <button
                            type="button"
                            onClick={() => { setNewPostImageUrl(''); setShowImageInput(false); }}
                            style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >×</button>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        type="button"
                        onClick={() => setShowImageInput(!showImageInput)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: 'none',
                            border: '1px solid var(--border)',
                            borderRadius: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            color: showImageInput ? 'var(--accent)' : 'var(--secondary)',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}
                    >
                        <ImageIcon size={14} />
                        Add Photo
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
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt={user.name || ""}
                                            width={40}
                                            height={40}
                                            style={{ borderRadius: "50%", objectFit: "cover" }}
                                            unoptimized
                                        />
                                    ) : (
                                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                                    )}
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

                            {post.imageUrl && (
                                <div style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                                    <img
                                        src={post.imageUrl}
                                        alt="Post attachment"
                                        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '0.75rem' }}
                                    />
                                </div>
                            )}

                            {trip && (
                                <div style={{
                                    display: "flex",
                                    gap: "1rem",
                                    background: "rgba(255,255,255,0.03)",
                                    borderRadius: "0.75rem",
                                    padding: "0.75rem",
                                    alignItems: "center"
                                }}>
                                    <Image
                                        src={trip.photos[0].path}
                                        alt={trip.title}
                                        width={60}
                                        height={40}
                                        style={{ borderRadius: "4px", objectFit: "cover" }}
                                        unoptimized
                                    />
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

                {hasMore && activeTab === "global" && (
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        style={{
                            width: "100%",
                            padding: "0.875rem",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid var(--border)",
                            borderRadius: "0.875rem",
                            color: "var(--secondary)",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: isLoadingMore ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        {isLoadingMore ? "Loading…" : `Load more (${totalCount - posts.length} remaining)`}
                    </button>
                )}
            </div>
        </div>
    );
}
