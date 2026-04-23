"use client";

import { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, CheckCircle2, MapPin, MoreHorizontal, Globe, List, Clock, Star, Plus, ChevronDown, ChevronUp, Save, X, Sparkles } from "lucide-react";
import StatusSelector from "@/components/StatusSelector";
import TripDownloadButton from "@/components/TripDownloadButton";
import WorldMap from "@/components/WorldMap";
import TripWrappedAnimation from "@/components/TripWrappedAnimation";
import { updateTripDateAction, createCustomTripAction, updateTripDestinationAction, logPastTripFromTemplateAction } from "@/lib/actions";
import { tripTemplates } from "@/data/trip-templates";

interface Trip {
    id: string;
    name: string;
    primaryDestinationCity: string;
    primaryDestinationCountry: string;
    durationDays: number;
    roughBudgetUsd: number;
    status: string;
    travelDateStart: string | null;
    travelDateEnd: string | null;
    itinerary: any;
    memory: any;
    createdAt: string;
}

type ViewMode = "cards" | "map" | "timeline";

const ALL_COUNTRIES = Array.from(new Set(tripTemplates.map((t) => t.primaryDestinationCountry))).sort();

export default function TripsPageClient({ trips, userId }: { trips: Trip[]; userId: string | null }) {
    const [view, setView] = useState<ViewMode>("cards");
    const [createPending, startCreateTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLogging, setIsLogging] = useState(false);
    const [showWrapped, setShowWrapped] = useState(false);
    const router = useRouter();

    const planning = trips.filter((t) => t.status === "planning" || !t.status);
    const booked = trips.filter((t) => t.status === "booked");
    const completed = trips.filter((t) => t.status === "completed");

    const datedTrips = useMemo(
        () =>
            [...trips]
                .filter((t) => t.travelDateStart)
                .sort((a, b) => new Date(a.travelDateStart!).getTime() - new Date(b.travelDateStart!).getTime()),
        [trips]
    );

    const filteredTemplates = useMemo(() => {
        if (!searchTerm) return [];
        return tripTemplates
            .filter(
                (t) =>
                    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.primaryDestinationCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    t.primaryDestinationCity.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 5);
    }, [searchTerm]);

    const handleQuickLog = (template: any) => {
        if (!userId) { router.push("/login"); return; }
        startCreateTransition(async () => {
            try { await logPastTripFromTemplateAction(template.slug); } catch {}
            setSearchTerm("");
            setIsLogging(false);
            setView("cards");
        });
    };

    const handleCreate = () => {
        startCreateTransition(async () => {
            try { await createCustomTripAction(); } catch {}
            setView("cards");
        });
    };

    return (
        <div style={{ paddingTop: "5.5rem", paddingBottom: "5rem", minHeight: "100vh" }}>
            {showWrapped && (
                <TripWrappedAnimation trips={trips} onClose={() => setShowWrapped(false)} />
            )}

            <div className="container">
                {/* Header */}
                <header style={{ marginBottom: "2.5rem", textAlign: "center" }}>
                    <h1
                        style={{
                            fontSize: "clamp(2.25rem, 7vw, 4.5rem)",
                            fontWeight: 900,
                            marginBottom: "0.75rem",
                            letterSpacing: "-0.04em",
                            color: "var(--fg-0)",
                        }}
                    >
                        Your Global Legacy
                    </h1>
                    <p style={{ color: "var(--fg-2)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
                        Track, remember, and visualize every iconic MBA journey.
                    </p>

                    {/* Wrapped CTA — show if any trips */}
                    {trips.length > 0 && (
                        <button
                            onClick={() => setShowWrapped(true)}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.6rem 1.5rem",
                                borderRadius: "100px",
                                background: "linear-gradient(135deg, #667eea, #764ba2)",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 8px 24px rgba(102,126,234,0.35)",
                                transition: "all 0.25s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(102,126,234,0.45)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 24px rgba(102,126,234,0.35)"; }}
                        >
                            <Sparkles size={16} />
                            Trek Wrapped
                        </button>
                    )}
                </header>

                {/* View Toggle + Actions */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "2.5rem",
                        flexWrap: "wrap",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            background: "var(--glass-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: "100px",
                            padding: "4px",
                            gap: "2px",
                        }}
                    >
                        {([["cards", List, "Cards"], ["map", Globe, "Map"], ["timeline", Clock, "Timeline"]] as const).map(
                            ([id, Icon, label]) => (
                                <button
                                    key={id}
                                    onClick={() => setView(id)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.4rem",
                                        padding: "0.45rem 1.1rem",
                                        borderRadius: "100px",
                                        border: "none",
                                        cursor: "pointer",
                                        fontWeight: 700,
                                        fontSize: "0.82rem",
                                        transition: "all 0.2s",
                                        background: view === id ? "rgba(var(--accent-rgb), 0.12)" : "transparent",
                                        color: view === id ? "var(--accent)" : "var(--fg-2)",
                                    }}
                                >
                                    <Icon size={15} />
                                    {label}
                                </button>
                            )
                        )}
                    </div>

                    <button
                        onClick={handleCreate}
                        disabled={createPending}
                        className="btn btn-primary"
                        style={{ borderRadius: "100px", padding: "0.5rem 1.25rem", fontSize: "0.82rem", fontWeight: 800, minHeight: "unset" }}
                    >
                        {createPending ? <Clock size={15} className="animate-spin" /> : <Plus size={16} />}
                        New Trip
                    </button>
                </div>

                {/* Quick Trip Logger */}
                <div style={{ maxWidth: "560px", margin: "0 auto 3rem", position: "relative" }}>
                    <div style={{ position: "relative" }}>
                        <Star
                            size={18}
                            style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--accent)", zIndex: 1 }}
                        />
                        <input
                            type="text"
                            placeholder="Log a trip you've done (e.g. Japan, Peru…)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsLogging(true)}
                            style={{
                                width: "100%",
                                padding: "1rem 3rem 1rem 2.75rem",
                                borderRadius: "1rem",
                                fontSize: "0.95rem",
                                boxShadow: isLogging ? "0 0 0 3px rgba(var(--accent-rgb), 0.15)" : "none",
                            }}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                style={{
                                    position: "absolute",
                                    right: "1rem",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    color: "var(--fg-3)",
                                    cursor: "pointer",
                                    padding: "4px",
                                    display: "flex",
                                }}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {isLogging && filteredTemplates.length > 0 && (
                        <div
                            className="glass-strong"
                            style={{
                                position: "absolute",
                                top: "calc(100% + 8px)",
                                left: 0,
                                right: 0,
                                zIndex: 100,
                                borderRadius: "1rem",
                                overflow: "hidden",
                            }}
                        >
                            <div style={{ padding: "0.6rem 1rem", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-3)", borderBottom: "1px solid var(--border)" }}>
                                Templates Found
                            </div>
                            {filteredTemplates.map((template) => (
                                <button
                                    key={template.slug}
                                    onClick={() => handleQuickLog(template)}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.875rem",
                                        padding: "0.875rem 1rem",
                                        background: "none",
                                        border: "none",
                                        color: "var(--fg-0)",
                                        textAlign: "left",
                                        cursor: "pointer",
                                        borderRadius: 0,
                                        transition: "background 0.15s",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(var(--accent-rgb), 0.06)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                                >
                                    <div style={{ background: "rgba(var(--accent-rgb), 0.1)", padding: "0.4rem", borderRadius: "8px", display: "flex", color: "var(--accent)" }}>
                                        <Plus size={14} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{template.title}</div>
                                        <div style={{ fontSize: "0.75rem", color: "var(--fg-3)" }}>
                                            {template.primaryDestinationCity}, {template.primaryDestinationCountry}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {isLogging && searchTerm && filteredTemplates.length === 0 && (
                        <div
                            className="glass-strong"
                            style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 100, borderRadius: "1rem", padding: "1.5rem", textAlign: "center" }}
                        >
                            <p style={{ color: "var(--fg-2)", fontSize: "0.875rem", marginBottom: "1rem" }}>No matching templates found.</p>
                            <button onClick={handleCreate} className="btn btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", minHeight: "unset" }}>
                                Add Custom Trip
                            </button>
                        </div>
                    )}
                </div>

                {/* Empty state */}
                {trips.length === 0 && !createPending && (
                    <div
                        className="glass"
                        style={{ padding: "5rem 2rem", textAlign: "center", borderRadius: "2rem", border: "2px dashed var(--border)" }}
                    >
                        <div style={{ fontSize: "3rem", marginBottom: "1.25rem" }}>🌍</div>
                        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.75rem", fontWeight: 800 }}>No Expeditions Yet</h2>
                        <p style={{ color: "var(--fg-2)", marginBottom: "2rem", maxWidth: "380px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
                            Start by exploring templates or design a custom journey to build your legacy.
                        </p>
                        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/discover" className="btn btn-secondary">Explore Templates</Link>
                            <button onClick={handleCreate} className="btn btn-primary">Create Custom Trip</button>
                        </div>
                    </div>
                )}

                {/* MAP VIEW */}
                {view === "map" && trips.length > 0 && (
                    <div className="animate-fade-in">
                        <WorldMap trips={trips} />
                    </div>
                )}

                {/* TIMELINE VIEW */}
                {view === "timeline" && trips.length > 0 && (
                    <div className="animate-fade-in">
                        {datedTrips.length === 0 ? (
                            <div className="glass" style={{ padding: "5rem 2rem", textAlign: "center", borderRadius: "2rem" }}>
                                <Calendar size={44} color="var(--fg-3)" style={{ margin: "0 auto 1.25rem", opacity: 0.4 }} />
                                <h3 style={{ fontSize: "1.4rem", marginBottom: "0.6rem", fontWeight: 800 }}>Timeline Empty</h3>
                                <p style={{ color: "var(--fg-2)" }}>Set travel dates on your trip cards to populate this view.</p>
                            </div>
                        ) : (
                            <div style={{ position: "relative", maxWidth: "720px", margin: "0 auto" }}>
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: 0,
                                        bottom: 0,
                                        width: "2px",
                                        background: "linear-gradient(to bottom, transparent, var(--border) 10%, var(--border) 90%, transparent)",
                                        transform: "translateX(-50%)",
                                    }}
                                />

                                {datedTrips.map((trip, idx) => {
                                    const isLeft = idx % 2 === 0;
                                    const startDate = new Date(trip.travelDateStart!);

                                    return (
                                        <div
                                            key={trip.id}
                                            className="animate-fade-in"
                                            style={{
                                                display: "flex",
                                                justifyContent: isLeft ? "flex-start" : "flex-end",
                                                width: "100%",
                                                marginBottom: "3rem",
                                                position: "relative",
                                            }}
                                        >
                                            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "1.5rem", zIndex: 2 }}>
                                                <div
                                                    style={{
                                                        background: "var(--background)",
                                                        border: "2px solid var(--accent)",
                                                        color: "var(--accent)",
                                                        padding: "0.2rem 0.65rem",
                                                        borderRadius: "100px",
                                                        fontSize: "0.7rem",
                                                        fontWeight: 900,
                                                        whiteSpace: "nowrap",
                                                        boxShadow: "0 0 12px rgba(var(--accent-rgb), 0.25)",
                                                    }}
                                                >
                                                    {startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                                </div>
                                            </div>

                                            <div style={{ width: "44%" }}>
                                                <div
                                                    className="glass card"
                                                    style={{ padding: "1.5rem", borderRadius: "1.25rem" }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "0.6rem",
                                                            fontWeight: 900,
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.1em",
                                                            color: trip.status === "completed" ? "var(--success)" : "var(--accent)",
                                                            display: "block",
                                                            marginBottom: "0.5rem",
                                                        }}
                                                    >
                                                        {trip.status || "planning"}
                                                    </span>
                                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 900, marginBottom: "0.35rem" }}>{trip.name}</h3>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "var(--fg-2)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                                                        <MapPin size={12} color="var(--accent)" />
                                                        {trip.primaryDestinationCity}, {trip.primaryDestinationCountry}
                                                    </div>
                                                    {trip.memory?.highlightMoment && (
                                                        <p style={{ fontStyle: "italic", color: "var(--fg-2)", fontSize: "0.82rem", borderLeft: "2px solid var(--accent)", paddingLeft: "0.75rem", lineHeight: 1.5 }}>
                                                            &ldquo;{trip.memory.highlightMoment}&rdquo;
                                                        </p>
                                                    )}
                                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.75rem", color: "var(--fg-3)", marginTop: "0.75rem" }}>
                                                        <span>{trip.durationDays}d</span>
                                                        {trip.memory?.overallRating && (
                                                            <div style={{ display: "flex", gap: "2px" }}>
                                                                {[...Array(trip.memory.overallRating)].map((_, i) => (
                                                                    <Star key={i} size={10} fill="#fbbf24" color="#fbbf24" />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* CARDS VIEW */}
                {view === "cards" && trips.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
                        {[
                            { title: "In Planning", data: planning, icon: Calendar, color: "var(--accent)" },
                            { title: "Locked In", data: booked, icon: CheckCircle2, color: "var(--success)" },
                            { title: "Past Legends", data: completed, icon: Globe, color: "var(--fg-3)" },
                        ].map((section) => {
                            const Icon = section.icon;
                            return section.data.length > 0 ? (
                                <section key={section.title}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
                                        <Icon size={20} color={section.color} />
                                        <h2 style={{ fontSize: "1.25rem", fontWeight: 900 }}>{section.title}</h2>
                                        <span style={{ fontSize: "0.85rem", color: "var(--fg-3)", fontWeight: 500 }}>({section.data.length})</span>
                                    </div>
                                    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                                        {section.data.map((trip) => (
                                            <TripQuickDashboard key={trip.id} trip={trip} />
                                        ))}
                                    </div>
                                </section>
                            ) : null;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

function TripQuickDashboard({ trip }: { trip: Trip }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [startDate, setStartDate] = useState(trip.travelDateStart ? trip.travelDateStart.slice(0, 10) : "");
    const [endDate, setEndDate] = useState(trip.travelDateEnd ? trip.travelDateEnd.slice(0, 10) : "");
    const [country, setCountry] = useState(trip.primaryDestinationCountry || "");
    const [city, setCity] = useState(trip.primaryDestinationCity || "");

    const handleSave = () => {
        startTransition(async () => {
            await Promise.all([
                updateTripDateAction(trip.id, startDate || null, endDate || null),
                updateTripDestinationAction(trip.id, city, country),
            ]);
            setIsExpanded(false);
        });
    };

    return (
        <div
            className="glass card animate-fade-in"
            style={{ borderRadius: "1.5rem", overflow: "hidden" }}
        >
            <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                    <StatusSelector tripId={trip.id} currentStatus={(trip.status || "planning") as any} />
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                        <TripDownloadButton trip={trip} />
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{
                                background: "var(--glass-bg)",
                                border: "1px solid var(--border)",
                                color: "var(--fg-0)",
                                borderRadius: "0.6rem",
                                padding: "0.4rem",
                                cursor: "pointer",
                                display: "flex",
                            }}
                        >
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: "0.35rem" }}>{trip.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--fg-2)", fontSize: "0.85rem" }}>
                        <MapPin size={14} color="var(--accent)" />
                        {trip.primaryDestinationCity}, {trip.primaryDestinationCountry}
                    </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div
                        style={{
                            flex: 1,
                            padding: "0.875rem",
                            background: "rgba(var(--accent-rgb), 0.04)",
                            borderRadius: "0.875rem",
                            border: "1px solid rgba(var(--accent-rgb), 0.08)",
                        }}
                    >
                        <div style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-3)", marginBottom: "0.25rem" }}>
                            Dates
                        </div>
                        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: trip.travelDateStart ? "var(--accent)" : "var(--fg-3)" }}>
                            {trip.travelDateStart ? new Date(trip.travelDateStart).toLocaleDateString() : "Unscheduled"}
                        </div>
                    </div>
                    <Link
                        href={`/journal/${trip.id}`}
                        className="btn btn-primary"
                        style={{ height: "48px", padding: "0 1.25rem", borderRadius: "0.875rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}
                    >
                        Itinerary →
                    </Link>
                </div>

                {trip.memory && (
                    <div style={{ marginTop: "1rem", padding: "0.875rem", background: "rgba(var(--accent-rgb), 0.04)", borderRadius: "0.875rem", border: "1px solid rgba(var(--accent-rgb), 0.08)" }}>
                        <p style={{ fontSize: "0.8rem", fontStyle: "italic", color: "var(--fg-2)", margin: 0, lineHeight: 1.5 }}>
                            &ldquo;{trip.memory.highlightMoment}&rdquo;
                        </p>
                        {trip.memory.overallRating && (
                            <div style={{ display: "flex", gap: "3px", marginTop: "0.5rem" }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={11} fill={i < trip.memory.overallRating ? "#fbbf24" : "transparent"} color={i < trip.memory.overallRating ? "#fbbf24" : "var(--border)"} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isExpanded && (
                <div
                    className="animate-slide-in"
                    style={{ padding: "0 1.5rem 1.5rem", borderTop: "1px solid var(--border)" }}
                >
                    <div style={{ paddingTop: "1.5rem" }}>
                        <div style={{ marginBottom: "1.25rem" }}>
                            <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", marginBottom: "0.6rem" }}>
                                Destination
                            </label>
                            <div className="grid-2">
                                <div>
                                    <span style={{ fontSize: "0.7rem", color: "var(--fg-3)", display: "block", marginBottom: "0.35rem" }}>Country</span>
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.85rem" }}
                                    >
                                        <option value="">Select Country</option>
                                        {ALL_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <span style={{ fontSize: "0.7rem", color: "var(--fg-3)", display: "block", marginBottom: "0.35rem" }}>City</span>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="e.g. Kyoto"
                                        style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.85rem" }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", marginBottom: "0.6rem" }}>
                                Travel Dates
                            </label>
                            <div className="grid-2">
                                <div>
                                    <span style={{ fontSize: "0.7rem", color: "var(--fg-3)", display: "block", marginBottom: "0.35rem" }}>Departure</span>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.85rem" }}
                                    />
                                </div>
                                <div>
                                    <span style={{ fontSize: "0.7rem", color: "var(--fg-3)", display: "block", marginBottom: "0.35rem" }}>Return</span>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        style={{ width: "100%", padding: "0.6rem 0.75rem", fontSize: "0.85rem" }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "0.6rem" }}>
                            <button
                                onClick={handleSave}
                                disabled={isPending}
                                className="btn btn-primary"
                                style={{ flex: 1, minHeight: "unset", padding: "0.65rem", fontSize: "0.85rem" }}
                            >
                                <Save size={14} /> {isPending ? "Saving…" : "Save"}
                            </button>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="btn btn-secondary"
                                style={{ padding: "0.65rem", minHeight: "unset" }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
