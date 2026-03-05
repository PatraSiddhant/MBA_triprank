"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                }
            }
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/login?message=Check your email to verify your account");
        }
    };

    return (
        <div style={{ paddingTop: '8rem', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass" style={{ padding: '3rem', borderRadius: '2rem', width: '100%', maxWidth: '400px', border: '1px solid var(--border)' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Create Account</h1>
                <p style={{ color: 'var(--secondary)', textAlign: 'center', marginBottom: '2rem' }}>Join the global MBA trek community.</p>

                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {error && <div style={{ color: '#ff4d4d', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'white' }}
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.75rem' }}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--secondary)' }}>
                    Already have an account? <a href="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Sign in</a>
                </p>
            </div>
        </div>
    );
}
