"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Compass, Calendar, BookOpen, User as UserIcon,
    Trophy, Map, X, LogOut, Sun, Moon, Menu
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useTheme } from "@/components/ThemeProvider";

export default function ClientHeader() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const supabase = createClient();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (!supabase) return;
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
            setUser(session?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, [supabase]);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    const handleSignOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        setIsMobileMenuOpen(false);
        window.location.reload();
    };

    const desktopNavLinks = [
        { name: "Discover", href: "/discover" },
        { name: "Plan", href: "/plan" },
        { name: "Journal", href: "/journal" },
        { name: "Rank", href: "/rank" },
    ];

    const mobileNavLinks = [
        { name: "Discover", href: "/discover", icon: Compass },
        { name: "Plan", href: "/plan", icon: Calendar },
        { name: "Journal", href: "/journal", icon: BookOpen },
        { name: "Profile", href: "/profile", icon: UserIcon },
    ];

    const isActive = (path: string) =>
        pathname === path || (path !== "/" && pathname.startsWith(path));

    const isDark = theme === "dark";

    return (
        <>
            {/* ── Top Header ── */}
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: scrolled
                        ? isDark
                            ? "rgba(10, 10, 12, 0.85)"
                            : "rgba(245, 245, 247, 0.85)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                    borderBottom: scrolled
                        ? `1px solid var(--border)`
                        : "1px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div
                    className="container"
                    style={{
                        height: "4rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", flex: 1 }}>
                        <Link
                            href="/"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                textDecoration: "none",
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    padding: "6px",
                                    background: "var(--accent)",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 4px 12px rgba(var(--accent-rgb), 0.35)",
                                }}
                            >
                                <Map size={18} color="#fff" />
                            </div>
                            <span
                                style={{
                                    fontSize: "1.15rem",
                                    fontWeight: 800,
                                    letterSpacing: "-0.03em",
                                    color: "var(--fg-0)",
                                    fontFamily: "var(--font-heading)",
                                }}
                            >
                                TrekRank
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav
                            className="desktop-only"
                            style={{ display: "flex", gap: "0.25rem" }}
                        >
                            {desktopNavLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        color: isActive(link.href) ? "var(--fg-0)" : "var(--fg-2)",
                                        padding: "0.4rem 0.75rem",
                                        borderRadius: "0.5rem",
                                        background: isActive(link.href)
                                            ? isDark
                                                ? "rgba(255,255,255,0.08)"
                                                : "rgba(0,0,0,0.06)"
                                            : "transparent",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Side Actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {/* Rank Quick Action - Desktop */}
                        <Link
                            href="/rank"
                            className="desktop-only"
                            style={{
                                background: "rgba(var(--accent-rgb), 0.1)",
                                color: "var(--accent)",
                                border: "1px solid rgba(var(--accent-rgb), 0.2)",
                                padding: "0.35rem 0.85rem",
                                borderRadius: "100px",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                fontWeight: 700,
                                fontSize: "0.75rem",
                                cursor: "pointer",
                                textDecoration: "none",
                                transition: "all 0.2s",
                                minHeight: "unset",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <Trophy size={13} /> Rank Treks
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                            style={{
                                background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                                border: `1px solid var(--border)`,
                                borderRadius: "50%",
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "var(--fg-1)",
                                transition: "all 0.25s",
                                flexShrink: 0,
                            }}
                        >
                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        {/* Auth - Desktop */}
                        <div className="desktop-only">
                            {user ? (
                                <Link href="/profile" style={{ textDecoration: "none" }}>
                                    <div
                                        style={{
                                            width: "34px",
                                            height: "34px",
                                            borderRadius: "50%",
                                            background: "var(--bg-3)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            overflow: "hidden",
                                            border: "2px solid var(--border)",
                                            transition: "border-color 0.2s",
                                        }}
                                    >
                                        {user.user_metadata?.avatar_url ? (
                                            <img
                                                src={user.user_metadata.avatar_url}
                                                alt="Profile"
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <UserIcon size={15} color="var(--fg-1)" />
                                        )}
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    style={{
                                        background: "var(--fg-0)",
                                        color: "var(--bg-0)",
                                        border: "none",
                                        padding: "0.4rem 1rem",
                                        borderRadius: "100px",
                                        fontWeight: 700,
                                        fontSize: "0.8rem",
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        minHeight: "unset",
                                        transition: "opacity 0.2s",
                                    }}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="mobile-only"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            style={{
                                background: "var(--glass-bg)",
                                border: "1px solid var(--border)",
                                borderRadius: "10px",
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--fg-0)",
                                cursor: "pointer",
                            }}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile Bottom Tab Bar ── */}
            <nav
                className="mobile-only"
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "72px",
                    background: isDark
                        ? "rgba(10, 10, 12, 0.95)"
                        : "rgba(245, 245, 247, 0.95)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    borderTop: "1px solid var(--border)",
                    display: "grid",
                    gridTemplateColumns: `repeat(${mobileNavLinks.length}, 1fr)`,
                    paddingBottom: "env(safe-area-inset-bottom)",
                    zIndex: 1000,
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
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textDecoration: "none",
                                gap: "3px",
                                color: active ? "var(--accent)" : "var(--fg-3)",
                                fontSize: "10px",
                                fontWeight: 600,
                                paddingTop: "6px",
                                transition: "color 0.2s",
                            }}
                        >
                            <div
                                style={{
                                    padding: "4px 12px",
                                    borderRadius: "12px",
                                    background: active
                                        ? "rgba(var(--accent-rgb), 0.1)"
                                        : "transparent",
                                    transition: "background 0.2s",
                                }}
                            >
                                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                            </div>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            {/* ── Mobile Full-Screen Menu ── */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-only"
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: isDark
                            ? "rgba(10, 10, 12, 0.97)"
                            : "rgba(245, 245, 247, 0.97)",
                        backdropFilter: "blur(32px)",
                        zIndex: 999,
                        display: "flex",
                        flexDirection: "column",
                        padding: "5.5rem 1.5rem 6rem",
                        gap: "0.5rem",
                        overflowY: "auto",
                    }}
                >
                    <div style={{ marginBottom: "1rem" }}>
                        <p style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-3)", marginBottom: "0.75rem" }}>
                            Navigation
                        </p>
                        {[
                            { name: "Discover", href: "/discover", icon: Compass },
                            { name: "Plan Your Year", href: "/plan", icon: Calendar },
                            { name: "My Journal", href: "/journal", icon: BookOpen },
                            { name: "Rank Treks", href: "/rank", icon: Trophy },
                        ].map(({ name, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    padding: "1rem",
                                    borderRadius: "1rem",
                                    textDecoration: "none",
                                    color: isActive(href) ? "var(--accent)" : "var(--fg-0)",
                                    background: isActive(href)
                                        ? "rgba(var(--accent-rgb), 0.08)"
                                        : "transparent",
                                    fontWeight: 600,
                                    fontSize: "1.05rem",
                                    marginBottom: "0.25rem",
                                    transition: "all 0.2s",
                                }}
                            >
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "10px",
                                        background: isActive(href)
                                            ? "rgba(var(--accent-rgb), 0.12)"
                                            : "var(--glass-bg)",
                                        border: "1px solid var(--border)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Icon size={18} />
                                </div>
                                {name}
                            </Link>
                        ))}
                    </div>

                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                        <p style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-3)", marginBottom: "0.75rem" }}>
                            Appearance
                        </p>
                        <button
                            onClick={toggleTheme}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                padding: "1rem",
                                width: "100%",
                                borderRadius: "1rem",
                                background: "var(--glass-bg)",
                                border: "1px solid var(--border)",
                                color: "var(--fg-0)",
                                fontWeight: 600,
                                fontSize: "1rem",
                                cursor: "pointer",
                                backdropFilter: "blur(8px)",
                            }}
                        >
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "10px",
                                    background: "var(--glass-bg)",
                                    border: "1px solid var(--border)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </div>
                            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        </button>
                    </div>

                    <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", marginTop: "0.5rem" }}>
                        {user ? (
                            <button
                                onClick={handleSignOut}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    padding: "1rem",
                                    width: "100%",
                                    borderRadius: "1rem",
                                    background: "rgba(239, 68, 68, 0.08)",
                                    border: "1px solid rgba(239, 68, 68, 0.15)",
                                    color: "#EF4444",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                }}
                            >
                                <LogOut size={18} />
                                Sign Out ({user.email?.split("@")[0]})
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "1rem",
                                    width: "100%",
                                    borderRadius: "1rem",
                                    background: "var(--fg-0)",
                                    color: "var(--bg-0)",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    textDecoration: "none",
                                }}
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
