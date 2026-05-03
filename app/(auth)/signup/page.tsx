"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Map, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        if (!supabase) {
            setError("Authentication service is unavailable. Check your environment configuration.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/login?message=Account created! Check your email to verify before signing in.");
        }
    };

    const passwordsMatch = confirmPassword === "" || password === confirmPassword;

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6rem 1rem 2rem",
                background: "var(--bg-0)",
            }}
        >
            <div style={{ width: "100%", maxWidth: "420px" }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "56px",
                            height: "56px",
                            background: "var(--accent)",
                            borderRadius: "16px",
                            marginBottom: "1.25rem",
                            boxShadow: "0 8px 24px rgba(var(--accent-rgb), 0.35)",
                        }}
                    >
                        <Map size={28} color="#fff" />
                    </div>
                    <h1
                        style={{
                            fontSize: "1.85rem",
                            fontWeight: 900,
                            letterSpacing: "-0.04em",
                            color: "var(--fg-0)",
                            marginBottom: "0.4rem",
                        }}
                    >
                        Join TrekRank
                    </h1>
                    <p style={{ color: "var(--fg-2)", fontSize: "0.95rem" }}>
                        The global MBA trek community
                    </p>
                </div>

                {/* Card */}
                <div className="glass-strong" style={{ padding: "2rem", borderRadius: "1.75rem" }}>
                    {error && (
                        <div
                            style={{
                                background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.25)",
                                borderRadius: "0.875rem",
                                padding: "0.875rem 1rem",
                                marginBottom: "1.25rem",
                                color: "#EF4444",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                            }}
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {/* Full Name */}
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "var(--fg-2)",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                Full Name
                            </label>
                            <div style={{ position: "relative" }}>
                                <User
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        left: "1rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--fg-3)",
                                        pointerEvents: "none",
                                    }}
                                />
                                <input
                                    type="text"
                                    required
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jane Smith"
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 1rem 0.875rem 2.75rem",
                                        borderRadius: "0.875rem",
                                        fontSize: "0.95rem",
                                        color: "var(--fg-0)",
                                        background: "var(--bg-2)",
                                        border: "1px solid var(--border)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "var(--fg-2)",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                Email Address
                            </label>
                            <div style={{ position: "relative" }}>
                                <Mail
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        left: "1rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--fg-3)",
                                        pointerEvents: "none",
                                    }}
                                />
                                <input
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@school.edu"
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 1rem 0.875rem 2.75rem",
                                        borderRadius: "0.875rem",
                                        fontSize: "0.95rem",
                                        color: "var(--fg-0)",
                                        background: "var(--bg-2)",
                                        border: "1px solid var(--border)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "var(--fg-2)",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <Lock
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        left: "1rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--fg-3)",
                                        pointerEvents: "none",
                                    }}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 3rem 0.875rem 2.75rem",
                                        borderRadius: "0.875rem",
                                        fontSize: "0.95rem",
                                        color: "var(--fg-0)",
                                        background: "var(--bg-2)",
                                        border: "1px solid var(--border)",
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "0.875rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        color: "var(--fg-3)",
                                        cursor: "pointer",
                                        padding: "4px",
                                        display: "flex",
                                        minHeight: "unset",
                                        minWidth: "unset",
                                    }}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "var(--fg-2)",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                Confirm Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <Lock
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        left: "1rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--fg-3)",
                                        pointerEvents: "none",
                                    }}
                                />
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    required
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter your password"
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 3rem 0.875rem 2.75rem",
                                        borderRadius: "0.875rem",
                                        fontSize: "0.95rem",
                                        color: "var(--fg-0)",
                                        background: "var(--bg-2)",
                                        border: `1px solid ${!passwordsMatch ? "#EF4444" : "var(--border)"}`,
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    style={{
                                        position: "absolute",
                                        right: "0.875rem",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        color: "var(--fg-3)",
                                        cursor: "pointer",
                                        padding: "4px",
                                        display: "flex",
                                        minHeight: "unset",
                                        minWidth: "unset",
                                    }}
                                >
                                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {!passwordsMatch && (
                                <p style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "0.4rem" }}>
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email || !password || !confirmPassword || !name || !passwordsMatch}
                            style={{
                                width: "100%",
                                padding: "0.9rem",
                                borderRadius: "0.875rem",
                                background: loading || !email || !password || !confirmPassword || !name || !passwordsMatch
                                    ? "rgba(var(--accent-rgb), 0.5)"
                                    : "var(--accent)",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "1rem",
                                border: "none",
                                cursor: loading || !email || !password || !confirmPassword || !name || !passwordsMatch ? "not-allowed" : "pointer",
                                transition: "all 0.2s",
                                marginTop: "0.5rem",
                            }}
                        >
                            {loading ? "Creating account…" : "Create Account"}
                        </button>
                    </form>
                </div>

                <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem", color: "var(--fg-2)" }}>
                    Already have an account?{" "}
                    <Link href="/login" style={{ color: "var(--accent)", fontWeight: 700 }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
