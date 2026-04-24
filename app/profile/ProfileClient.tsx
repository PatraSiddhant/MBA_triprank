"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    User, Mail, GraduationCap, MapPin, BookOpen,
    MessageSquare, LogOut, Settings, ChevronRight
} from "lucide-react";

interface ProfileClientProps {
    email: string;
    name: string;
    avatar: string | null;
    school: string | null;
    cohortYear: string | null;
    travelPersona: string | null;
    tripCount: number;
    postCount: number;
}

export default function ProfileClient({
    email, name, avatar, school, cohortYear, travelPersona, tripCount, postCount
}: ProfileClientProps) {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    const initials = name
        ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
        : email[0]?.toUpperCase() ?? "?";

    return (
        <div style={{ minHeight: "100vh", paddingTop: "7rem", paddingBottom: "5rem" }}>
            <div className="container" style={{ maxWidth: "560px" }}>
                {/* Avatar + Name */}
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div style={{
                        width: "88px", height: "88px", borderRadius: "50%",
                        margin: "0 auto 1.25rem",
                        background: avatar ? "transparent" : "var(--accent)",
                        border: "3px solid var(--border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        overflow: "hidden",
                        fontSize: "2rem", fontWeight: 800, color: "#fff",
                    }}>
                        {avatar
                            ? <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : initials}
                    </div>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 900, marginBottom: "0.25rem" }}>
                        {name || "MBA Explorer"}
                    </h1>
                    <p style={{ color: "var(--secondary)", fontSize: "0.9rem" }}>{email}</p>
                    {travelPersona && (
                        <span style={{
                            display: "inline-block", marginTop: "0.6rem",
                            padding: "0.3rem 0.85rem", borderRadius: "100px",
                            background: "rgba(var(--accent-rgb), 0.1)",
                            color: "var(--accent)", fontSize: "0.75rem", fontWeight: 800,
                            textTransform: "uppercase", letterSpacing: "0.08em",
                        }}>
                            {travelPersona}
                        </span>
                    )}
                </div>

                {/* Stats */}
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "1rem", marginBottom: "1.5rem",
                }}>
                    {[
                        { label: "Trips", value: tripCount, icon: MapPin },
                        { label: "Posts", value: postCount, icon: MessageSquare },
                    ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="glass" style={{
                            padding: "1.25rem", borderRadius: "1rem", textAlign: "center",
                            border: "1px solid var(--border)",
                        }}>
                            <Icon size={20} color="var(--accent)" style={{ margin: "0 auto 0.5rem" }} />
                            <div style={{ fontSize: "1.75rem", fontWeight: 900 }}>{value}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--secondary)", fontWeight: 600 }}>{label}</div>
                        </div>
                    ))}
                </div>

                {/* Info card */}
                <div className="glass" style={{
                    borderRadius: "1.25rem", border: "1px solid var(--border)",
                    overflow: "hidden", marginBottom: "1rem",
                }}>
                    {[
                        { icon: Mail, label: "Email", value: email },
                        { icon: GraduationCap, label: "School", value: school ?? "Not set" },
                        { icon: User, label: "Cohort", value: cohortYear ?? "Not set" },
                    ].map(({ icon: Icon, label, value }, i, arr) => (
                        <div key={label} style={{
                            display: "flex", alignItems: "center", gap: "1rem",
                            padding: "1rem 1.25rem",
                            borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                        }}>
                            <Icon size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "0.7rem", color: "var(--secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                                <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <Link href="/onboarding" style={{
                        display: "flex", alignItems: "center", gap: "1rem",
                        padding: "1rem 1.25rem", borderRadius: "1rem",
                        background: "rgba(var(--accent-rgb), 0.06)",
                        border: "1px solid rgba(var(--accent-rgb), 0.15)",
                        textDecoration: "none", color: "var(--foreground)",
                        fontWeight: 600, fontSize: "0.95rem",
                    }}>
                        <Settings size={18} color="var(--accent)" />
                        <span style={{ flex: 1 }}>Edit Profile & Travel Persona</span>
                        <ChevronRight size={16} color="var(--secondary)" />
                    </Link>

                    <Link href="/journal" style={{
                        display: "flex", alignItems: "center", gap: "1rem",
                        padding: "1rem 1.25rem", borderRadius: "1rem",
                        background: "var(--glass-bg)", border: "1px solid var(--border)",
                        textDecoration: "none", color: "var(--foreground)",
                        fontWeight: 600, fontSize: "0.95rem",
                    }}>
                        <BookOpen size={18} color="var(--accent)" />
                        <span style={{ flex: 1 }}>My Trip Journal</span>
                        <ChevronRight size={16} color="var(--secondary)" />
                    </Link>

                    <button
                        onClick={handleSignOut}
                        style={{
                            display: "flex", alignItems: "center", gap: "1rem",
                            padding: "1rem 1.25rem", borderRadius: "1rem", width: "100%",
                            background: "rgba(239,68,68,0.06)",
                            border: "1px solid rgba(239,68,68,0.15)",
                            color: "#EF4444", fontWeight: 600, fontSize: "0.95rem",
                            cursor: "pointer",
                        }}
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
