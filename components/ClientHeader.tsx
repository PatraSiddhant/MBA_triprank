"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Compass, Sword, Users, Map, Menu, X, LogOut } from "lucide-react";
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

    const navLinks = [
        { name: "Explore", href: "/discover", icon: Compass },
        { name: "Arena", href: "/rank", icon: Sword },
        { name: "Community", href: "/socials", icon: Users },
        { name: "My Trips", href: "/trips", icon: Map },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: "rgba(10, 10, 10, 0.8)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
            >
                <div
                    className="container"
                    style={{
                        height: "5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
                        <div style={{ padding: '8px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Map size={24} color="#000" />
                        </div>
                        <span style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>
                            TrekRank
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="desktop-only" style={{ display: "flex", gap: "2.5rem" }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    textDecoration: "none",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    color: isActive(link.href) ? "var(--accent)" : "var(--secondary)",
                                    transition: "color 0.2s",
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                        {user ? (
                            <div className="desktop-only" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
                                    {user.user_metadata?.name || user.email?.split('@')[0]}
                                </span>
                                <button onClick={handleSignOut} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="btn btn-primary desktop-only" style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem", textDecoration: 'none' }}>
                                Sign In
                            </Link>
                        )}

                        <button
                            className="mobile-only"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            style={{ background: 'transparent', border: 'none', color: '#fff', padding: '8px', cursor: 'pointer' }}
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
                    height: '70px',
                    background: 'rgba(15, 15, 15, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${navLinks.length}, 1fr)`,
                    paddingBottom: 'env(safe-area-inset-bottom)',
                    zIndex: 1000
                }}
            >
                {navLinks.map((link) => {
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
                                color: active ? 'var(--accent)' : 'var(--secondary)',
                                fontSize: '10px',
                                fontWeight: 600
                            }}
                        >
                            <Icon size={20} style={{ opacity: active ? 1 : 0.6 }} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'var(--bg)',
                    zIndex: 999,
                    padding: '8rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{ fontSize: '2rem', fontWeight: 800, textDecoration: 'none', color: isActive(link.href) ? 'var(--accent)' : '#fff' }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
                    {user ? (
                        <button onClick={handleSignOut} className="btn btn-secondary" style={{ padding: '1.5rem', fontSize: '1.25rem' }}>
                            Log Out ({user.email?.split('@')[0]})
                        </button>
                    ) : (
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary" style={{ padding: '1.5rem', fontSize: '1.25rem', textAlign: 'center', textDecoration: 'none' }}>
                            Sign In
                        </Link>
                    )}
                </div>
            )}
        </>
    );
}
