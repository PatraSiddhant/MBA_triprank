"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Compass, Calendar, BookOpen, User as UserIcon, Search, Bell, Trophy, Map, Menu, X, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function ClientHeader() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();

    useEffect(() => {
        if (!supabase) return;

        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const handleSignOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        window.location.reload();
    };

    const desktopNavLinks = [
        { name: "Discover", href: "/discover" },
        { name: "Plan", href: "/plan" },
        { name: "Journal", href: "/journal" },
    ];

    const mobileNavLinks = [
        { name: "Discover", href: "/discover", icon: Compass },
        { name: "Plan", href: "/plan", icon: Calendar },
        { name: "Journal", href: "/journal", icon: BookOpen },
        { name: "Profile", href: "/profile", icon: UserIcon },
    ];

    // Determine current section even for dynamic routes like /journal/[id]
    const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: "rgba(var(--bg-0-rgb, 10, 10, 12), 0.8)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(var(--fg-0-rgb, 255, 255, 255), 0.05)",
                }}
            >
                <div
                    className="container"
                    style={{
                        height: "4.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                            <div style={{ padding: '6px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Map size={20} color="#fff" />
                            </div>
                            <span style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--fg-0)" }}>
                                TrekRank
                            </span>
                        </Link>

                        {/* Desktop Nav - Middle */}
                        <nav className="desktop-only" style={{ display: "flex", gap: "2rem" }}>
                            {desktopNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        color: isActive(link.href) ? "var(--fg-0)" : "var(--fg-2)",
                                        borderBottom: isActive(link.href) ? "2px solid var(--accent)" : "2px solid transparent",
                                        paddingBottom: "1.25rem",
                                        marginTop: "1.25rem",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        {/* Top Right Desktop Chrome */}
                        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--fg-1)', cursor: 'pointer', padding: '0.5rem' }}>
                                <Search size={18} />
                            </button>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--fg-1)', cursor: 'pointer', padding: '0.5rem' }}>
                                <Bell size={18} />
                            </button>
                            {/* Rank Quick Action */}
                            <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.25rem' }} />
                            <button style={{ background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', border: '1px solid rgba(var(--accent-rgb), 0.2)', padding: '0.4rem 0.8rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}>
                                <Trophy size={14} /> Rank 3
                            </button>
                        </div>
                        
                        <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }} className="desktop-only" />

                        {user ? (
                            <div className="desktop-only" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        {user.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <UserIcon size={16} color="var(--fg-1)" />
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <Link href="/login" className="btn btn-primary desktop-only" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", textDecoration: 'none', minHeight: 'unset' }}>
                                Sign In
                            </Link>
                        )}

                        {/* Mobile Menu Toggle - Only visible on mobile, replacing full menu with a simpler drawer later */}
                        <button
                            className="mobile-only"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--fg-0)', padding: '8px', cursor: 'pointer' }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Tab Bar */}
            <nav
                className="mobile-only"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '80px',
                    background: 'rgba(var(--bg-0-rgb, 10, 10, 12), 0.95)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${mobileNavLinks.length}, 1fr)`,
                    paddingBottom: 'env(safe-area-inset-bottom)',
                    zIndex: 1000
                }}
            >
                {mobileNavLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textDecoration: 'none',
                                gap: '4px',
                                color: active ? 'var(--fg-0)' : 'var(--fg-2)',
                                fontSize: '10px',
                                fontWeight: 600,
                                paddingTop: '8px'
                            }}
                        >
                            <Icon size={24} style={{ opacity: active ? 1 : 0.7, color: active ? 'var(--accent)' : 'inherit', transition: 'all 0.2s' }} fill={active ? 'currentColor' : 'none'} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Basic Mobile Menu Drawer for missing actions */}
            {isMobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'var(--bg-0)',
                    zIndex: 999,
                    padding: '6rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }} className="mobile-only">
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ padding: '12px', background: 'rgba(var(--accent-rgb), 0.1)', borderRadius: '12px', color: 'var(--accent)' }}>
                            <Trophy size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem' }}>Rank 3 Treks</h3>
                            <p style={{ color: 'var(--fg-2)', fontSize: '0.875rem' }}>Help build the leaderboard</p>
                        </div>
                    </div>
                    
                    <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
                    
                    {user ? (
                        <button onClick={handleSignOut} className="btn btn-secondary" style={{ padding: '1rem', width: '100%' }}>
                            <LogOut size={18} style={{ marginRight: '8px' }} /> Log Out ({user.email?.split('@')[0]})
                        </button>
                    ) : (
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary" style={{ padding: '1rem', width: '100%', textAlign: 'center' }}>
                            Sign In
                        </Link>
                    )}
                </div>
            )}
        </>
    );
}
