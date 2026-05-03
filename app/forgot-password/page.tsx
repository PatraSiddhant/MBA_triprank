"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Map, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);
    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!supabase) {
            setError("Authentication service unavailable. Check your environment configuration.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSent(true);
            setLoading(false);
        }
    };

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
                        Reset password
                    </h1>
                    <p style={{ color: "var(--fg-2)", fontSize: "0.95rem" }}>
                        We'll send you a link to reset your password
                    </p>
                </div>

                <div className="glass-strong" style={{ padding: "2rem", borderRadius: "1.75rem" }}>
                    {sent ? (
                        <div style={{ textAlign: "center", padding: "1rem 0" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", background: "rgba(34,197,94,0.15)", borderRadius: "50%", marginBottom: "1rem" }}>
                                <CheckCircle size={28} color="#16a34a" />
                            </div>
                            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>Check your email</h3>
                            <p style={{ color: "var(--fg-2)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                                We sent a password reset link to <strong style={{ color: "var(--fg-0)" }}>{email}</strong>. Click the link in your email to set a new password.
                            </p>
                            <p style={{ color: "var(--fg-3)", fontSize: "0.8rem", marginTop: "1rem" }}>
                                Didn't receive it? Check your spam folder or{" "}
                                <button onClick={() => setSent(false)} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", padding: 0 }}>
                                    try again
                                </button>.
                            </p>
                        </div>
                    ) : (
                        <>
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

                            <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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

                                <button
                                    type="submit"
                                    disabled={loading || !email}
                                    style={{
                                        width: "100%",
                                        padding: "0.9rem",
                                        borderRadius: "0.875rem",
                                        background: loading || !email ? "rgba(var(--accent-rgb), 0.5)" : "var(--accent)",
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: "1rem",
                                        border: "none",
                                        cursor: loading || !email ? "not-allowed" : "pointer",
                                        transition: "all 0.2s",
                                        marginTop: "0.5rem",
                                    }}
                                >
                                    {loading ? "Sending…" : "Send Reset Link"}
                                </button>
                            </form>
                        </>
                    )}
                </div>

                <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem", color: "var(--fg-2)" }}>
                    <Link href="/login" style={{ color: "var(--accent)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                        <ArrowLeft size={14} /> Back to sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
