"use client";

import { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Calendar, CheckCircle2, MapPin, Globe, List, Clock,
    Star, Plus, ChevronDown, ChevronUp, Save, X,
    Sparkles, Trash2, Search, ArrowRight,
} from "lucide-react";
import StatusSelector from "@/components/StatusSelector";
import TripDownloadButton from "@/components/TripDownloadButton";
import WorldMap from "@/components/WorldMap";
import TripWrappedAnimation from "@/components/TripWrappedAnimation";
import {
    updateTripDateAction,
    createCustomTripAction,
    updateTripDestinationAction,
    logPastTripFromTemplateAction,
    logPastTripWithDetailsAction,
    deleteTripAction,
} from "@/lib/actions";
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

const ALL_COUNTRIES = Array.from(
    new Set(tripTemplates.map((t) => t.primaryDestinationCountry))
).sort();

// ── Log Trip Modal ──────────────────────────────────────────────────
interface LogModalProps {
    template: any | null; // null = custom
    onClose: () => void;
    onSubmit: (details: {
        city: string;
        country: string;
        startDate: string | null;
        endDate: string | null;
        overallRating: number;
        highlightMoment: string;
        durationDays: number;
    }) => void;
    isPending: boolean;
}

function LogTripModal({ template, onClose, onSubmit, isPending }: LogModalProps) {
    const [city, setCity] = useState(template?.primaryDestinationCity || "");
    const [country, setCountry] = useState(template?.primaryDestinationCountry || "");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [rating, setRating] = useState(5);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [highlight, setHighlight] = useState("");

    const durationDays = useMemo(() => {
        if (startDate && endDate) {
            const diff = Math.round(
                (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000
            );
            return Math.max(1, diff);
        }
        return template?.durationDays || 1;
    }, [startDate, endDate, template]);

    const canSubmit = city.trim() && country.trim();

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="glass-strong"
                style={{
                    width: "100%",
                    maxWidth: "480px",
                    borderRadius: "1.75rem",
                    overflow: "hidden",
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "1.5rem 1.75rem 1rem",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--fg-0)", margin: 0 }}>
                            Log a Past Trip
                        </h2>
                        {template && (
                            <p style={{ fontSize: "0.8rem", color: "var(--fg-3)", margin: "0.2rem 0 0" }}>
                                Based on: {template.title}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "var(--glass-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "var(--fg-0)",
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>

                <div style={{ padding: "1.5rem 1.75rem" }}>
                    {/* Where */}
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label style={labelStyle}>Where did you go?</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                            <div>
                                <span style={subLabelStyle}>City / Region</span>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="e.g. Tokyo"
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <span style={subLabelStyle}>Country</span>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    style={inputStyle}
                                >
                                    <option value="">Select…</option>
                                    {ALL_COUNTRIES.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* When */}
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label style={labelStyle}>When did you travel? <span style={{ fontWeight: 400, color: "var(--fg-3)" }}>(optional)</span></label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                            <div>
                                <span style={subLabelStyle}>Departure</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <span style={subLabelStyle}>Return</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || undefined}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        {durationDays > 1 && startDate && endDate && (
                            <p style={{ fontSize: "0.75rem", color: "var(--accent)", marginTop: "0.4rem", fontWeight: 600 }}>
                                {durationDays} days abroad
                            </p>
                        )}
                    </div>

                    {/* Rating */}
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label style={labelStyle}>How was it?</label>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    onClick={() => setRating(star)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "2px",
                                        transition: "transform 0.15s",
                                        transform: (hoveredStar || rating) >= star ? "scale(1.15)" : "scale(1)",
                                        minHeight: "unset",
                                        minWidth: "unset",
                                    }}
                                >
                                    <Star
                                        size={32}
                                        fill={(hoveredStar || rating) >= star ? "#fbbf24" : "transparent"}
                                        color={(hoveredStar || rating) >= star ? "#fbbf24" : "var(--border)"}
                                        strokeWidth={1.5}
                                    />
                                </button>
                            ))}
                            <span style={{ fontSize: "0.8rem", color: "var(--fg-3)", marginLeft: "0.5rem", fontWeight: 600 }}>
                                {["", "Poor", "Fair", "Good", "Great", "Legendary"][hoveredStar || rating]}
                            </span>
                        </div>
                    </div>

                    {/* Highlight */}
                    <div style={{ marginBottom: "1.75rem" }}>
                        <label style={labelStyle}>
                            Best moment <span style={{ fontWeight: 400, color: "var(--fg-3)" }}>(optional)</span>
                        </label>
                        <textarea
                            value={highlight}
                            onChange={(e) => setHighlight(e.target.value)}
                            placeholder="e.g. Watching sunrise over Mount Fuji…"
                            rows={2}
                            style={{
                                ...inputStyle,
                                resize: "none",
                                fontFamily: "var(--font-body)",
                            }}
                        />
                    </div>

                    <button
                        onClick={() =>
                            onSubmit({ city, country, startDate: startDate || null, endDate: endDate || null, overallRating: rating, highlightMoment: highlight, durationDays })
                        }
                        disabled={!canSubmit || isPending}
                        style={{
                            width: "100%",
                            padding: "0.9rem",
                            borderRadius: "0.875rem",
                            background: canSubmit ? "var(--accent)" : "var(--border)",
                            color: canSubmit ? "#fff" : "var(--fg-3)",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            border: "none",
                            cursor: canSubmit && !isPending ? "pointer" : "not-allowed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            transition: "all 0.2s",
                        }}
                    >
                        {isPending ? "Saving…" : <>Log Trip <ArrowRight size={16} /></>}
                    </button>
                </div>
            </div>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "var(--fg-2)",
    marginBottom: "0.5rem",
};

const subLabelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.7rem",
    color: "var(--fg-3)",
    marginBottom: "0.3rem",
    fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.7rem 0.875rem",
    borderRadius: "0.75rem",
    fontSize: "0.9rem",
    color: "var(--fg-0)",
    background: "var(--glass-bg)",
    border: "1px solid var(--border)",
};

// ── Main Page ───────────────────────────────────────────────────────
export default function TripsPageClient({ trips, userId }: { trips: Trip[]; userId: string | null }) {
    const [view, setView] = useState<ViewMode>("cards");
    const [createPending, startCreateTransition] = useTransition();
    const [logPending, startLogTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showWrapped, setShowWrapped] = useState(false);
    const [logModal, setLogModal] = useState<{ template: any | null } | null>(null);
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
            .slice(0, 6);
    }, [searchTerm]);

    const handleCreate = () => {
        startCreateTransition(async () => {
            try { await createCustomTripAction(); } catch {}
            setView("cards");
        });
    };

    const handleLogSubmit = (details: any) => {
        if (!logModal) return;
        startLogTransition(async () => {
            try {
                await logPastTripWithDetailsAction(logModal.template?.slug ?? null, details);
            } catch (e) {
                console.error(e);
            }
            setLogModal(null);
            setSearchTerm("");
        });
    };

    return (
        <div style={{ paddingTop: "5.5rem", paddingBottom: "5rem", minHeight: "100vh" }}>
            {/* Wrapped animation overlay */}
            {showWrapped && <TripWrappedAnimation trips={trips} onClose={() => setShowWrapped(false)} />}

            {/* Log trip modal */}
            {logModal && (
                <LogTripModal
                    template={logModal.template}
                    onClose={() => setLogModal(null)}
                    onSubmit={handleLogSubmit}
                    isPending={logPending}
                />
            )}

            <div className="container">
                {/* Header */}
                <header style={{ marginBottom: "2.5rem", textAlign: "center" }}>
                    <h1
                        style={{
                            fontSize: "clamp(2.25rem, 7vw, 4.5rem)",
                            fontWeight: 900,
                            marginBottom: "0.6rem",
                            letterSpacing: "-0.04em",
                        }}
                    >
                        Your Global Legacy
                    </h1>
                    <p style={{ color: "var(--fg-2)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
                        Track, remember, and visualize every iconic MBA journey.
                    </p>

                    {trips.length > 0 && (
                        <button
                            onClick={() => setShowWrapped(true)}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.55rem 1.4rem",
                                borderRadius: "100px",
                                background: "linear-gradient(135deg, #667eea, #764ba2)",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 6px 20px rgba(102,126,234,0.3)",
                                transition: "all 0.25s",
                            }}
                        >
                            <Sparkles size={15} /> Trek Wrapped
                        </button>
                    )}
                </header>

                {/* Controls bar */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "2.5rem",
                        flexWrap: "wrap",
                    }}
                >
                    {/* View toggle */}
                    <div
                        style={{
                            display: "inline-flex",
                            background: "var(--glass-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: "100px",
                            padding: "3px",
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
                                        padding: "0.4rem 1rem",
                                        borderRadius: "100px",
                                        border: "none",
                                        cursor: "pointer",
                                        fontWeight: 700,
                                        fontSize: "0.8rem",
                                        transition: "all 0.2s",
                                        background: view === id ? "rgba(var(--accent-rgb), 0.12)" : "transparent",
                                        color: view === id ? "var(--accent)" : "var(--fg-2)",
                                    }}
                                >
                                    <Icon size={14} /> {label}
                                </button>
                            )
                        )}
                    </div>

                    <button
                        onClick={handleCreate}
                        disabled={createPending}
                        className="btn btn-primary"
                        style={{ borderRadius: "100px", padding: "0.45rem 1.2rem", fontSize: "0.8rem", fontWeight: 800, minHeight: "unset" }}
                    >
                        {createPending ? <Clock size={14} className="animate-spin" /> : <Plus size={15} />}
                        New Trip
                    </button>
                </div>

                {/* ── Quick Trip Logger ── */}
                <div style={{ maxWidth: "560px", margin: "0 auto 3rem", position: "relative" }}>
                    <div style={{ position: "relative" }}>
                        <Search
                            size={17}
                            style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--accent)",
                                zIndex: 1,
                                pointerEvents: "none",
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Log a past trip — search Japan, Peru, Colombia…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                            style={{
                                width: "100%",
                                padding: "0.9rem 2.75rem 0.9rem 2.75rem",
                                borderRadius: "0.875rem",
                                fontSize: "0.9rem",
                                boxShadow: isSearchFocused ? "0 0 0 3px rgba(var(--accent-rgb), 0.15)" : "none",
                            }}
                        />
                        {searchTerm && (
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setSearchTerm("")}
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
                                <X size={15} />
                            </button>
                        )}
                    </div>

                    {/* Template results dropdown */}
                    {isSearchFocused && filteredTemplates.length > 0 && (
                        <div
                            className="glass-strong"
                            style={{
                                position: "absolute",
                                top: "calc(100% + 6px)",
                                left: 0,
                                right: 0,
                                zIndex: 100,
                                borderRadius: "1rem",
                                overflow: "hidden",
                                boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
                            }}
                        >
                            <div
                                style={{
                                    padding: "0.5rem 1rem",
                                    fontSize: "0.62rem",
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    color: "var(--fg-3)",
                                    borderBottom: "1px solid var(--border)",
                                }}
                            >
                                Tap to log with details
                            </div>
                            {filteredTemplates.map((template) => (
                                <button
                                    key={template.slug}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        setLogModal({ template });
                                        setSearchTerm("");
                                    }}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.875rem",
                                        padding: "0.8rem 1rem",
                                        background: "none",
                                        border: "none",
                                        color: "var(--fg-0)",
                                        textAlign: "left",
                                        cursor: "pointer",
                                        borderBottom: "1px solid var(--border)",
                                        transition: "background 0.15s",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(var(--accent-rgb), 0.05)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                                >
                                    <div
                                        style={{
                                            background: "rgba(var(--accent-rgb), 0.1)",
                                            color: "var(--accent)",
                                            padding: "0.4rem",
                                            borderRadius: "8px",
                                            display: "flex",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <MapPin size={14} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 700, fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {template.title}
                                        </div>
                                        <div style={{ fontSize: "0.72rem", color: "var(--fg-3)" }}>
                                            {template.primaryDestinationCity}, {template.primaryDestinationCountry} · {template.durationDays}d
                                        </div>
                                    </div>
                                    <ArrowRight size={14} color="var(--fg-3)" />
                                </button>
                            ))}
                            {/* Custom entry */}
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    setLogModal({ template: null });
                                    setSearchTerm("");
                                }}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.875rem",
                                    padding: "0.8rem 1rem",
                                    background: "none",
                                    border: "none",
                                    color: "var(--fg-2)",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    transition: "background 0.15s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(var(--accent-rgb), 0.05)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                            >
                                <Plus size={14} /> Add &quot;{searchTerm}&quot; as custom trip
                            </button>
                        </div>
                    )}

                    {/* No results */}
                    {isSearchFocused && searchTerm && filteredTemplates.length === 0 && (
                        <div
                            className="glass-strong"
                            style={{
                                position: "absolute",
                                top: "calc(100% + 6px)",
                                left: 0,
                                right: 0,
                                zIndex: 100,
                                borderRadius: "1rem",
                                padding: "1.25rem",
                                textAlign: "center",
                            }}
                        >
                            <p style={{ color: "var(--fg-2)", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                                No templates matched. Add it manually.
                            </p>
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => { setLogModal({ template: null }); setSearchTerm(""); }}
                                className="btn btn-accent"
                                style={{ fontSize: "0.8rem", padding: "0.5rem 1.25rem", minHeight: "unset", borderRadius: "100px" }}
                            >
                                <Plus size={14} /> Log Custom Trip
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
                        <p style={{ color: "var(--fg-2)", marginBottom: "2rem", maxWidth: "360px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
                            Start by exploring templates or log a trip you&apos;ve already taken.
                        </p>
                        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/discover" className="btn btn-secondary" style={{ borderRadius: "100px" }}>Explore Templates</Link>
                            <button onClick={handleCreate} className="btn btn-primary" style={{ borderRadius: "100px" }}>Create Custom Trip</button>
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
                                <h3 style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>Timeline Empty</h3>
                                <p style={{ color: "var(--fg-2)" }}>Set travel dates on trip cards to populate this view.</p>
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
                                            style={{ display: "flex", justifyContent: isLeft ? "flex-start" : "flex-end", width: "100%", marginBottom: "3rem", position: "relative" }}
                                        >
                                            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "1.25rem", zIndex: 2 }}>
                                                <div style={{ background: "var(--background)", border: "2px solid var(--accent)", color: "var(--accent)", padding: "0.2rem 0.6rem", borderRadius: "100px", fontSize: "0.68rem", fontWeight: 900, whiteSpace: "nowrap" }}>
                                                    {startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                                </div>
                                            </div>
                                            <div style={{ width: "44%" }}>
                                                <div className="glass card" style={{ padding: "1.25rem", borderRadius: "1.25rem" }}>
                                                    <span style={{ fontSize: "0.6rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: trip.status === "completed" ? "var(--success)" : "var(--accent)", display: "block", marginBottom: "0.4rem" }}>
                                                        {trip.status || "planning"}
                                                    </span>
                                                    <h3 style={{ fontSize: "1rem", fontWeight: 900, marginBottom: "0.3rem" }}>{trip.name}</h3>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--fg-2)", fontSize: "0.78rem", marginBottom: "0.6rem" }}>
                                                        <MapPin size={11} color="var(--accent)" />
                                                        {trip.primaryDestinationCity}, {trip.primaryDestinationCountry}
                                                    </div>
                                                    {trip.memory?.highlightMoment && (
                                                        <p style={{ fontStyle: "italic", color: "var(--fg-2)", fontSize: "0.78rem", borderLeft: "2px solid var(--accent)", paddingLeft: "0.6rem", lineHeight: 1.5 }}>
                                                            &ldquo;{trip.memory.highlightMoment}&rdquo;
                                                        </p>
                                                    )}
                                                    {trip.memory?.overallRating && (
                                                        <div style={{ display: "flex", gap: "2px", marginTop: "0.5rem" }}>
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={10} fill={i < trip.memory.overallRating ? "#fbbf24" : "transparent"} color={i < trip.memory.overallRating ? "#fbbf24" : "var(--border)"} />
                                                            ))}
                                                        </div>
                                                    )}
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
                        {[
                            { title: "In Planning", data: planning, icon: Calendar, color: "var(--accent)" },
                            { title: "Locked In", data: booked, icon: CheckCircle2, color: "var(--success)" },
                            { title: "Past Legends", data: completed, icon: Globe, color: "var(--fg-3)" },
                        ].map((section) => {
                            const Icon = section.icon;
                            return section.data.length > 0 ? (
                                <section key={section.title}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                                        <Icon size={18} color={section.color} />
                                        <h2 style={{ fontSize: "1.15rem", fontWeight: 900 }}>{section.title}</h2>
                                        <span style={{ fontSize: "0.82rem", color: "var(--fg-3)", fontWeight: 500 }}>({section.data.length})</span>
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

// ── Trip Card ───────────────────────────────────────────────────────
function TripQuickDashboard({ trip }: { trip: Trip }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();
    const [confirmDelete, setConfirmDelete] = useState(false);

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

    const handleDelete = () => {
        startDeleteTransition(async () => {
            await deleteTripAction(trip.id);
        });
    };

    return (
        <div className="glass card animate-fade-in" style={{ borderRadius: "1.5rem", overflow: "hidden" }}>
            <div style={{ padding: "1.5rem" }}>
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <StatusSelector tripId={trip.id} currentStatus={(trip.status || "planning") as any} />
                    <div style={{ display: "flex", gap: "0.35rem" }}>
                        <TripDownloadButton trip={trip} />
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{ background: "var(--glass-bg)", border: "1px solid var(--border)", color: "var(--fg-0)", borderRadius: "0.6rem", padding: "0.35rem", cursor: "pointer", display: "flex" }}
                        >
                            {isExpanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                        </button>
                        {/* Delete */}
                        {confirmDelete ? (
                            <div style={{ display: "flex", gap: "0.25rem" }}>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#EF4444", borderRadius: "0.6rem", padding: "0.35rem 0.6rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", fontWeight: 700 }}
                                >
                                    {isDeleting ? "…" : "Delete"}
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(false)}
                                    style={{ background: "var(--glass-bg)", border: "1px solid var(--border)", color: "var(--fg-2)", borderRadius: "0.6rem", padding: "0.35rem", cursor: "pointer", display: "flex" }}
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setConfirmDelete(true)}
                                style={{ background: "var(--glass-bg)", border: "1px solid var(--border)", color: "var(--fg-3)", borderRadius: "0.6rem", padding: "0.35rem", cursor: "pointer", display: "flex" }}
                                title="Delete trip"
                            >
                                <Trash2 size={15} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Name + location */}
                <h3 style={{ fontSize: "1.35rem", fontWeight: 900, marginBottom: "0.3rem" }}>{trip.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--fg-2)", fontSize: "0.83rem", marginBottom: "1rem" }}>
                    <MapPin size={13} color="var(--accent)" />
                    {trip.primaryDestinationCity}, {trip.primaryDestinationCountry}
                </div>

                {/* Date + CTA */}
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div style={{ flex: 1, padding: "0.75rem", background: "rgba(var(--accent-rgb), 0.05)", borderRadius: "0.75rem", border: "1px solid rgba(var(--accent-rgb), 0.08)" }}>
                        <div style={{ fontSize: "0.55rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-3)", marginBottom: "0.2rem" }}>Dates</div>
                        <div style={{ fontSize: "0.78rem", fontWeight: 700, color: trip.travelDateStart ? "var(--accent)" : "var(--fg-3)" }}>
                            {trip.travelDateStart ? new Date(trip.travelDateStart).toLocaleDateString() : "Unscheduled"}
                        </div>
                    </div>
                    <Link href={`/journal/${trip.id}`} className="btn btn-primary" style={{ height: "44px", padding: "0 1.1rem", borderRadius: "0.75rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                        View →
                    </Link>
                </div>

                {/* Memory snippet */}
                {trip.memory && (
                    <div style={{ marginTop: "0.875rem", padding: "0.75rem", background: "rgba(var(--accent-rgb), 0.04)", borderRadius: "0.75rem", border: "1px solid rgba(var(--accent-rgb), 0.08)" }}>
                        {trip.memory.highlightMoment && (
                            <p style={{ fontSize: "0.78rem", fontStyle: "italic", color: "var(--fg-2)", margin: "0 0 0.4rem", lineHeight: 1.5 }}>
                                &ldquo;{trip.memory.highlightMoment}&rdquo;
                            </p>
                        )}
                        <div style={{ display: "flex", gap: "2px" }}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} fill={i < (trip.memory.overallRating || 0) ? "#fbbf24" : "transparent"} color={i < (trip.memory.overallRating || 0) ? "#fbbf24" : "var(--border)"} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Expanded form */}
            {isExpanded && (
                <div className="animate-slide-in" style={{ padding: "0 1.5rem 1.5rem", borderTop: "1px solid var(--border)" }}>
                    <div style={{ paddingTop: "1.25rem" }}>
                        <div style={{ marginBottom: "1rem" }}>
                            <label style={labelStyle}>Destination</label>
                            <div className="grid-2">
                                <div>
                                    <span style={subLabelStyle}>Country</span>
                                    <select value={country} onChange={(e) => setCountry(e.target.value)} style={inputStyle}>
                                        <option value="">Select Country</option>
                                        {ALL_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <span style={subLabelStyle}>City</span>
                                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Kyoto" style={inputStyle} />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: "1.25rem" }}>
                            <label style={labelStyle}>Travel Dates</label>
                            <div className="grid-2">
                                <div>
                                    <span style={subLabelStyle}>Departure</span>
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
                                </div>
                                <div>
                                    <span style={subLabelStyle}>Return</span>
                                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button onClick={handleSave} disabled={isPending} className="btn btn-primary" style={{ flex: 1, minHeight: "unset", padding: "0.6rem", fontSize: "0.82rem", borderRadius: "0.75rem" }}>
                                <Save size={13} /> {isPending ? "Saving…" : "Save"}
                            </button>
                            <button onClick={() => setIsExpanded(false)} className="btn btn-secondary" style={{ padding: "0.6rem", minHeight: "unset", borderRadius: "0.75rem" }}>
                                <X size={15} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
