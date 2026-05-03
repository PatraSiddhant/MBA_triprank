"use client";

import { useState } from "react";
import { tripTemplates, TripTemplate } from "@/data/trip-templates";
import Link from "next/link";
import {
    Search, MapPin, Clock, Filter, TrendingUp, Sparkles,
    SlidersHorizontal, Bell, ArrowRight, Heart, ChevronRight, ChevronLeft,
    CheckCircle2, DollarSign, Globe, Compass, Star
} from "lucide-react";

// Region grouping map
const REGION_GROUPS: Record<string, string[]> = {
    "Americas": ["Central America", "Caribbean", "South America", "North America"],
    "Europe": ["Europe", "Europe/Middle East (Transcontinental)"],
    "Africa & Middle East": ["Africa", "Africa/Europe (Transcontinental)", "Middle East"],
    "Asia": ["Asia", "Southeast Asia", "South Asia", "East Asia"],
    "Oceania": ["Oceania"],
};

function getBudgetNum(b: number | string): number {
    if (typeof b === "number") return b;
    return parseInt(b.replace(/[^0-9]/g, "").split("-")[0]) || 0;
}

function getDurationNum(d: number | string): number {
    if (typeof d === "number") return d;
    return parseInt(String(d)) || 5;
}

function tripMatchesRegionGroup(trip: TripTemplate, selectedGroups: string[]): boolean {
    if (selectedGroups.length === 0) return true;
    return selectedGroups.some(group => {
        const subRegions = REGION_GROUPS[group] || [];
        return subRegions.includes(trip.region) || trip.region === group;
    });
}

interface RecommenderPrefs {
    budgetMax: number;
    themes: string[];
    durationPref: "short" | "medium" | "long" | "any";
    regions: string[];
    vibes: string[];
}

const ALL_THEMES = ["Adventure", "Culture", "Business", "Party", "Luxury", "Sustainability", "Food & Wine", "Tech"] as const;
const ALL_VIBES = [
    { id: "adventure", label: "Off the Beaten Path", emoji: "🏔️" },
    { id: "tropical", label: "Beach & Tropical", emoji: "🏖️" },
    { id: "cultural", label: "Cultural Immersion", emoji: "🏛️" },
    { id: "nightlife", label: "Party & Nightlife", emoji: "🎉" },
    { id: "business", label: "Business Networking", emoji: "💼" },
    { id: "foodie", label: "Food & Gastronomy", emoji: "🍷" },
    { id: "relaxed", label: "Relaxed & Chill", emoji: "😌" },
    { id: "urban", label: "Urban Explorer", emoji: "🏙️" },
];
const DURATION_OPTIONS = [
    { id: "short", label: "Short", sublabel: "3–5 days", range: [3, 5] },
    { id: "medium", label: "Medium", sublabel: "6–9 days", range: [6, 9] },
    { id: "long", label: "Long", sublabel: "10+ days", range: [10, 99] },
    { id: "any", label: "Any Length", sublabel: "No preference", range: [0, 99] },
];
const BUDGET_OPTIONS = [
    { value: 1000, label: "Under $1k", sublabel: "Budget-friendly" },
    { value: 2000, label: "Up to $2k", sublabel: "Mid-range" },
    { value: 3500, label: "Up to $3.5k", sublabel: "Comfortable" },
    { value: 5000, label: "Up to $5k", sublabel: "Premium" },
    { value: 99999, label: "$5k+", sublabel: "No limit" },
];

function scoreTrip(trip: TripTemplate, prefs: RecommenderPrefs): number {
    let score = 0;
    const budget = getBudgetNum(trip.roughBudgetUsd);
    const duration = getDurationNum(trip.durationDays);

    // Budget match (30 pts)
    if (budget <= prefs.budgetMax) score += 30;
    else score -= 10;

    // Theme match (15 pts each, max 45)
    const themeMatches = trip.themes.filter(t => prefs.themes.includes(t)).length;
    score += Math.min(themeMatches * 15, 45);

    // Duration match (20 pts)
    if (prefs.durationPref !== "any") {
        const dur = DURATION_OPTIONS.find(d => d.id === prefs.durationPref);
        if (dur && duration >= dur.range[0] && duration <= dur.range[1]) score += 20;
    } else {
        score += 10;
    }

    // Region match (25 pts)
    if (prefs.regions.length === 0) {
        score += 10;
    } else if (tripMatchesRegionGroup(trip, prefs.regions)) {
        score += 25;
    }

    // Vibe match (10 pts each, max 20)
    const vibeMatches = (trip.vibes || []).filter(v => prefs.vibes.includes(v)).length;
    score += Math.min(vibeMatches * 10, 20);

    return Math.max(score, 0);
}

function getMatchPct(score: number): number {
    const max = 30 + 45 + 20 + 25 + 20; // 140 max
    return Math.min(Math.round((score / max) * 100), 99);
}

type RecommenderStep = "budget" | "themes" | "duration" | "region" | "vibes" | "results";
const STEPS: RecommenderStep[] = ["budget", "themes", "duration", "region", "vibes", "results"];

function RecommenderFlow({ onBack }: { onBack: () => void }) {
    const [step, setStep] = useState<RecommenderStep>("budget");
    const [prefs, setPrefs] = useState<RecommenderPrefs>({
        budgetMax: 99999,
        themes: [],
        durationPref: "any",
        regions: [],
        vibes: [],
    });

    const stepIndex = STEPS.indexOf(step);
    const progress = ((stepIndex) / (STEPS.length - 1)) * 100;

    const rankedTrips = tripTemplates
        .map(trip => ({ trip, score: scoreTrip(trip, prefs) }))
        .filter(({ score }) => score > 20)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12);

    const toggleTheme = (theme: string) => {
        setPrefs(p => ({
            ...p,
            themes: p.themes.includes(theme)
                ? p.themes.filter(t => t !== theme)
                : [...p.themes, theme]
        }));
    };
    const toggleRegion = (r: string) => {
        setPrefs(p => ({
            ...p,
            regions: p.regions.includes(r) ? p.regions.filter(x => x !== r) : [...p.regions, r]
        }));
    };
    const toggleVibe = (v: string) => {
        setPrefs(p => ({
            ...p,
            vibes: p.vibes.includes(v) ? p.vibes.filter(x => x !== v) : [...p.vibes, v]
        }));
    };
    const goNext = () => {
        const next = STEPS[stepIndex + 1];
        if (next) setStep(next);
    };
    const goPrev = () => {
        if (stepIndex === 0) { onBack(); return; }
        const prev = STEPS[stepIndex - 1];
        if (prev) setStep(prev);
    };

    const themeEmojis: Record<string, string> = {
        Adventure: "🏔️", Culture: "🏛️", Business: "💼", Party: "🎉",
        Luxury: "✨", Sustainability: "🌱", "Food & Wine": "🍷", Tech: "💻"
    };

    if (step === "results") {
        return (
            <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    <button onClick={goPrev} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.5rem 1rem", color: "var(--fg-1)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
                        <ChevronLeft size={16} /> Back
                    </button>
                    <div>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>Your Top Matches</h2>
                        <p style={{ color: "var(--fg-2)", margin: 0, fontSize: "0.9rem" }}>
                            {rankedTrips.length} trips matched your preferences
                        </p>
                    </div>
                    <button onClick={() => { setPrefs({ budgetMax: 99999, themes: [], durationPref: "any", regions: [], vibes: [] }); setStep("budget"); }} style={{ marginLeft: "auto", background: "transparent", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.5rem 1rem", color: "var(--fg-2)", cursor: "pointer", fontSize: "0.875rem" }}>
                        Start Over
                    </button>
                </div>

                {rankedTrips.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "4rem", background: "var(--bg-1)", borderRadius: "24px", border: "1px dashed var(--border)" }}>
                        <Compass size={48} color="var(--fg-3)" style={{ marginBottom: "1rem" }} />
                        <h3 style={{ marginBottom: "0.5rem" }}>No exact matches found</h3>
                        <p style={{ color: "var(--fg-2)", marginBottom: "1.5rem" }}>Try relaxing your preferences — increase your budget or select fewer themes.</p>
                        <button onClick={() => setStep("budget")} className="btn btn-primary">Adjust Preferences</button>
                    </div>
                ) : (
                    <div className="grid">
                        {rankedTrips.map(({ trip, score }, i) => {
                            const matchPct = getMatchPct(score);
                            const matchColor = matchPct >= 80 ? "#22c55e" : matchPct >= 60 ? "var(--accent)" : "var(--fg-2)";
                            return (
                                <Link
                                    key={trip.slug}
                                    href={`/templates/${trip.slug}`}
                                    className="glass animate-fade-in"
                                    style={{ textDecoration: "none", color: "inherit", borderRadius: "var(--radius)", overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid var(--border)", transition: "all 0.3s ease", position: "relative" }}
                                >
                                    {i < 3 && (
                                        <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 10, background: i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : "#CD7F32", color: "#000", borderRadius: "100px", padding: "0.25rem 0.75rem", fontSize: "0.7rem", fontWeight: 800 }}>
                                            {i === 0 ? "🥇 Top Pick" : i === 1 ? "🥈 #2" : "🥉 #3"}
                                        </div>
                                    )}
                                    <div style={{ height: "200px", width: "100%", position: "relative" }}>
                                        <img src={trip.photos[0].path} alt={trip.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(0,0,0,0.85)", padding: "0.4rem 0.8rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>
                                            ${trip.roughBudgetUsd}
                                        </div>
                                        <div style={{ position: "absolute", bottom: "1rem", right: "1rem", background: "rgba(0,0,0,0.85)", padding: "0.35rem 0.75rem", borderRadius: "100px", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: matchColor }} />
                                            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: matchColor }}>{matchPct}% match</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                                        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem", fontWeight: 700, lineHeight: 1.3 }}>{trip.title}</h3>
                                        <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem", color: "var(--fg-2)", fontSize: "0.8rem" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Clock size={12} /> {trip.durationDays}d</div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><MapPin size={12} /> {trip.primaryDestinationCountry}</div>
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
                                            {trip.themes.filter(t => prefs.themes.includes(t)).map(t => (
                                                <span key={t} style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(var(--accent-rgb), 0.15)", color: "var(--accent)", padding: "0.25rem 0.6rem", borderRadius: "100px", fontWeight: 700 }}>{t}</span>
                                            ))}
                                            {trip.themes.filter(t => !prefs.themes.includes(t)).slice(0, 2 - trip.themes.filter(t => prefs.themes.includes(t)).length).map(t => (
                                                <span key={t} style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.05em", background: "var(--bg-2)", color: "var(--fg-2)", padding: "0.25rem 0.6rem", borderRadius: "100px" }}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            {/* Progress bar */}
            <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--fg-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Step {stepIndex + 1} of {STEPS.length - 1}
                    </span>
                    <button onClick={goPrev} style={{ background: "transparent", border: "none", color: "var(--fg-3)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", padding: "0.25rem 0.5rem", borderRadius: "6px" }}>
                        <ChevronLeft size={14} /> Back
                    </button>
                </div>
                <div style={{ height: "4px", background: "var(--bg-2)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent)", borderRadius: "2px", transition: "width 0.4s ease" }} />
                </div>
            </div>

            {step === "budget" && (
                <div>
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "rgba(var(--accent-rgb), 0.15)", borderRadius: "12px", marginBottom: "1rem" }}>
                            <DollarSign size={24} color="var(--accent)" />
                        </div>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>What's your budget?</h2>
                        <p style={{ color: "var(--fg-2)", fontSize: "0.95rem" }}>Per person, including flights and accommodation</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {BUDGET_OPTIONS.map(opt => (
                            <button key={opt.value} onClick={() => setPrefs(p => ({ ...p, budgetMax: opt.value }))}
                                style={{ padding: "1.25rem 1.5rem", borderRadius: "16px", border: `2px solid ${prefs.budgetMax === opt.value ? "var(--accent)" : "var(--border)"}`, background: prefs.budgetMax === opt.value ? "rgba(var(--accent-rgb), 0.1)" : "var(--bg-1)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}>
                                <div style={{ textAlign: "left" }}>
                                    <div style={{ fontWeight: 700, fontSize: "1.05rem", color: prefs.budgetMax === opt.value ? "var(--accent)" : "var(--fg-0)" }}>{opt.label}</div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--fg-3)", marginTop: "0.2rem" }}>{opt.sublabel}</div>
                                </div>
                                {prefs.budgetMax === opt.value && <CheckCircle2 size={22} color="var(--accent)" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === "themes" && (
                <div>
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "rgba(var(--accent-rgb), 0.15)", borderRadius: "12px", marginBottom: "1rem" }}>
                            <Sparkles size={24} color="var(--accent)" />
                        </div>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>What kind of trip?</h2>
                        <p style={{ color: "var(--fg-2)", fontSize: "0.95rem" }}>Select all that interest you — the more you pick, the better we match</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        {ALL_THEMES.map(theme => (
                            <button key={theme} onClick={() => toggleTheme(theme)}
                                style={{ padding: "1.25rem", borderRadius: "16px", border: `2px solid ${prefs.themes.includes(theme) ? "var(--accent)" : "var(--border)"}`, background: prefs.themes.includes(theme) ? "rgba(var(--accent-rgb), 0.1)" : "var(--bg-1)", cursor: "pointer", display: "flex", flexDirection: "column", gap: "0.5rem", transition: "all 0.2s", textAlign: "left" }}>
                                <span style={{ fontSize: "1.5rem" }}>{themeEmojis[theme]}</span>
                                <span style={{ fontWeight: 700, fontSize: "0.95rem", color: prefs.themes.includes(theme) ? "var(--accent)" : "var(--fg-0)" }}>{theme}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === "duration" && (
                <div>
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "rgba(var(--accent-rgb), 0.15)", borderRadius: "12px", marginBottom: "1rem" }}>
                            <Clock size={24} color="var(--accent)" />
                        </div>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>How long can you go?</h2>
                        <p style={{ color: "var(--fg-2)", fontSize: "0.95rem" }}>MBA breaks move fast — pick what fits your schedule</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {DURATION_OPTIONS.map(opt => (
                            <button key={opt.id} onClick={() => setPrefs(p => ({ ...p, durationPref: opt.id as RecommenderPrefs["durationPref"] }))}
                                style={{ padding: "1.25rem 1.5rem", borderRadius: "16px", border: `2px solid ${prefs.durationPref === opt.id ? "var(--accent)" : "var(--border)"}`, background: prefs.durationPref === opt.id ? "rgba(var(--accent-rgb), 0.1)" : "var(--bg-1)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}>
                                <div style={{ textAlign: "left" }}>
                                    <div style={{ fontWeight: 700, fontSize: "1.05rem", color: prefs.durationPref === opt.id ? "var(--accent)" : "var(--fg-0)" }}>{opt.label}</div>
                                    <div style={{ fontSize: "0.8rem", color: "var(--fg-3)", marginTop: "0.2rem" }}>{opt.sublabel}</div>
                                </div>
                                {prefs.durationPref === opt.id && <CheckCircle2 size={22} color="var(--accent)" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === "region" && (
                <div>
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "rgba(var(--accent-rgb), 0.15)", borderRadius: "12px", marginBottom: "1rem" }}>
                            <Globe size={24} color="var(--accent)" />
                        </div>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>Where in the world?</h2>
                        <p style={{ color: "var(--fg-2)", fontSize: "0.95rem" }}>Select regions you're open to — or leave blank for global results</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        {Object.keys(REGION_GROUPS).map(region => {
                            const regionEmojis: Record<string, string> = {
                                Americas: "🌎", Europe: "🇪🇺", "Africa & Middle East": "🌍", Asia: "🌏", Oceania: "🦘"
                            };
                            return (
                                <button key={region} onClick={() => toggleRegion(region)}
                                    style={{ padding: "1.25rem", borderRadius: "16px", border: `2px solid ${prefs.regions.includes(region) ? "var(--accent)" : "var(--border)"}`, background: prefs.regions.includes(region) ? "rgba(var(--accent-rgb), 0.1)" : "var(--bg-1)", cursor: "pointer", display: "flex", flexDirection: "column", gap: "0.5rem", transition: "all 0.2s", textAlign: "left" }}>
                                    <span style={{ fontSize: "1.5rem" }}>{regionEmojis[region] || "🗺️"}</span>
                                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: prefs.regions.includes(region) ? "var(--accent)" : "var(--fg-0)" }}>{region}</span>
                                    <span style={{ fontSize: "0.75rem", color: "var(--fg-3)" }}>
                                        {tripTemplates.filter(t => tripMatchesRegionGroup(t, [region])).length} trips
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {step === "vibes" && (
                <div>
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", background: "rgba(var(--accent-rgb), 0.15)", borderRadius: "12px", marginBottom: "1rem" }}>
                            <Star size={24} color="var(--accent)" />
                        </div>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>What's your vibe?</h2>
                        <p style={{ color: "var(--fg-2)", fontSize: "0.95rem" }}>Pick the experiences that excite you most</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        {ALL_VIBES.map(vibe => (
                            <button key={vibe.id} onClick={() => toggleVibe(vibe.id)}
                                style={{ padding: "1.25rem", borderRadius: "16px", border: `2px solid ${prefs.vibes.includes(vibe.id) ? "var(--accent)" : "var(--border)"}`, background: prefs.vibes.includes(vibe.id) ? "rgba(var(--accent-rgb), 0.1)" : "var(--bg-1)", cursor: "pointer", display: "flex", flexDirection: "column", gap: "0.5rem", transition: "all 0.2s", textAlign: "left" }}>
                                <span style={{ fontSize: "1.5rem" }}>{vibe.emoji}</span>
                                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: prefs.vibes.includes(vibe.id) ? "var(--accent)" : "var(--fg-0)" }}>{vibe.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Next button — "results" is handled by early return above */}
            <button
                onClick={goNext}
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "2rem", padding: "1rem", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
                {step === "vibes" ? "Find My Trips" : "Continue"}
                <ChevronRight size={18} />
            </button>
            {step !== "budget" && (
                <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--fg-3)" }}>
                    {step === "themes" || step === "region" || step === "vibes" ? "You can skip this step" : ""}
                </p>
            )}
        </div>
    );
}

export default function DiscoverPage() {
    const [mode, setMode] = useState<"foryou" | "trending" | "browse" | "recommender">("foryou");
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [maxBudget, setMaxBudget] = useState<number>(5000);

    const regionsRaw = Array.from(new Set(tripTemplates.map(t => t.region)));

    const filteredTrips = tripTemplates.filter(trip => {
        const parseBudget = (b: number | string) => {
            if (typeof b === "number") return b;
            return parseInt(b.replace(/[^0-9]/g, "").split("-")[0]) || 0;
        };
        const matchesTheme = !selectedTheme || trip.themes.includes(selectedTheme as any);
        const matchesRegion = !selectedRegion || trip.region === selectedRegion;
        const matchesBudget = parseBudget(trip.roughBudgetUsd) <= maxBudget;
        const matchesSearch = !searchQuery ||
            trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.primaryDestinationCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.primaryDestinationCountry.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTheme && matchesRegion && matchesBudget && matchesSearch;
    });

    const modeLabels: Record<string, string> = {
        foryou: "For You", trending: "Trending", browse: "Browse", recommender: "Find My Trip"
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex" }}>
            {/* Desktop Left Rail - Filters (Only in Browse Mode) */}
            {mode === "browse" && (
                <div className="desktop-only" style={{ width: "280px", borderRight: "1px solid var(--border)", padding: "6rem 2rem 2rem 2rem", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <SlidersHorizontal size={20} /> Filters
                    </h2>

                    <div style={{ marginBottom: "2rem" }}>
                        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem", display: "block" }}>Search</label>
                        <div style={{ position: "relative" }}>
                            <Search size={16} color="var(--fg-2)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
                            <input
                                type="text"
                                placeholder="Countries, cities..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                style={{ width: "100%", padding: "0.75rem 1rem 0.75rem 2.5rem", background: "var(--bg-2)", border: "1px solid var(--border)", color: "var(--fg-0)", borderRadius: "8px", fontSize: "0.875rem" }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Max Budget</label>
                            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>${maxBudget.toLocaleString()}</span>
                        </div>
                        <input type="range" min="500" max="10000" step="100" value={maxBudget} onChange={e => setMaxBudget(parseInt(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem", display: "block" }}>Region</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <button onClick={() => setSelectedRegion(null)} style={{ textAlign: "left", padding: "0.5rem", background: selectedRegion === null ? "rgba(var(--accent-rgb), 0.1)" : "transparent", color: selectedRegion === null ? "var(--accent)" : "var(--fg-1)", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.875rem", fontWeight: selectedRegion === null ? 600 : 400 }}>All Regions</button>
                            {regionsRaw.map(r => (
                                <button key={r} onClick={() => setSelectedRegion(r)} style={{ textAlign: "left", padding: "0.5rem", background: selectedRegion === r ? "rgba(var(--accent-rgb), 0.1)" : "transparent", color: selectedRegion === r ? "var(--accent)" : "var(--fg-1)", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.875rem", fontWeight: selectedRegion === r ? 600 : 400, display: "flex", justifyContent: "space-between" }}>
                                    {r}
                                    <span style={{ color: "var(--fg-3)", fontSize: "0.75rem" }}>
                                        {tripTemplates.filter(t => t.region === r).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: "2rem" }}>
                        <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem", display: "block" }}>Theme</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <button onClick={() => setSelectedTheme(null)} style={{ textAlign: "left", padding: "0.5rem", background: selectedTheme === null ? "rgba(var(--accent-rgb), 0.1)" : "transparent", color: selectedTheme === null ? "var(--accent)" : "var(--fg-1)", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.875rem", fontWeight: selectedTheme === null ? 600 : 400 }}>All Themes</button>
                            {ALL_THEMES.map(t => (
                                <button key={t} onClick={() => setSelectedTheme(t)} style={{ textAlign: "left", padding: "0.5rem", background: selectedTheme === t ? "rgba(var(--accent-rgb), 0.1)" : "transparent", color: selectedTheme === t ? "var(--accent)" : "var(--fg-1)", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.875rem", fontWeight: selectedTheme === t ? 600 : 400 }}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: "7rem 2rem 4rem 2rem", overflowX: "hidden" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                        <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Discover Treks</h1>

                        {/* Segmented Control */}
                        <div style={{ display: "flex", background: "var(--bg-2)", padding: "4px", borderRadius: "12px", border: "1px solid var(--border)", flexWrap: "wrap" }}>
                            {(["foryou", "trending", "browse", "recommender"] as const).map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        background: mode === m ? "var(--bg-3)" : "transparent",
                                        color: mode === m ? "var(--fg-0)" : "var(--fg-2)",
                                        border: mode === m && m === "recommender" ? "1px solid rgba(var(--accent-rgb), 0.4)" : "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        transition: "all 0.2s",
                                        margin: "4px"
                                    }}
                                >
                                    {m === "foryou" && <Sparkles size={16} />}
                                    {m === "trending" && <TrendingUp size={16} />}
                                    {m === "browse" && <Search size={16} />}
                                    {m === "recommender" && <Filter size={16} color={mode === "recommender" ? "var(--accent)" : undefined} />}
                                    <span>{modeLabels[m]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recommender Mode */}
                    {mode === "recommender" && (
                        <RecommenderFlow onBack={() => setMode("foryou")} />
                    )}

                    {/* Browse Mode */}
                    {mode === "browse" && (
                        <>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <div style={{ color: "var(--fg-2)", fontSize: "0.875rem" }}>
                                    Showing <strong style={{ color: "var(--fg-0)" }}>{filteredTrips.length}</strong> results
                                </div>
                                <button style={{ background: "transparent", border: "none", color: "var(--accent)", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <Bell size={16} /> Alert me when new trips are added
                                </button>
                            </div>

                            <div className="grid">
                                {filteredTrips.map((trip) => (
                                    <Link
                                        key={trip.slug}
                                        href={`/templates/${trip.slug}`}
                                        className="glass animate-fade-in"
                                        style={{ textDecoration: "none", color: "inherit", borderRadius: "var(--radius)", overflow: "hidden", display: "flex", flexDirection: "column", border: "1px solid var(--border)", transition: "all 0.3s ease" }}
                                    >
                                        <div style={{ height: "220px", width: "100%", position: "relative" }}>
                                            <img src={trip.photos[0].path} alt={trip.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(0,0,0,0.8)", padding: "0.4rem 0.8rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>
                                                ${trip.roughBudgetUsd}
                                            </div>
                                        </div>
                                        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                                            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", fontWeight: 700, lineHeight: 1.3 }}>{trip.title}</h3>
                                            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", color: "var(--fg-2)", fontSize: "0.875rem" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Clock size={14} /> {trip.durationDays}d</div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><MapPin size={14} /> {trip.primaryDestinationCountry}</div>
                                            </div>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto" }}>
                                                {trip.themes.slice(0, 3).map(t => (
                                                    <span key={t} style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", background: "var(--bg-2)", color: "var(--fg-1)", padding: "0.3rem 0.75rem", borderRadius: "100px" }}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {filteredTrips.length === 0 && (
                                <div style={{ textAlign: "center", padding: "6rem 0", background: "var(--bg-1)", borderRadius: "24px", border: "1px dashed var(--border)" }}>
                                    <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>No treks found</h3>
                                    <p style={{ color: "var(--fg-2)", marginBottom: "1.5rem" }}>Try relaxing your budget or expanding your region.</p>
                                    <button onClick={() => { setMaxBudget(5000); setSelectedRegion(null); setSelectedTheme(null); }} className="btn btn-secondary">
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* For You Mode */}
                    {mode === "foryou" && (
                        <div style={{ height: "80vh", overflowY: "scroll", scrollSnapType: "y mandatory", borderRadius: "24px", background: "#000", position: "relative" }} className="hide-scrollbar">
                            {tripTemplates.map((trip) => (
                                <div key={trip.slug} style={{ height: "100%", width: "100%", scrollSnapAlign: "start", position: "relative", display: "flex", alignItems: "flex-end", padding: "2.5rem" }}>
                                    <img src={trip.photos[0].path} alt={trip.title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)" }} />

                                    <div style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                        <div style={{ flex: 1, paddingRight: "2rem" }}>
                                            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                                                {trip.themes.slice(0, 2).map((t, i) => (
                                                    <span key={i} style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", color: "#fff", padding: "0.4rem 0.8rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>{t}</span>
                                                ))}
                                                <span style={{ background: "var(--accent)", color: "#000", padding: "0.4rem 0.8rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 800 }}>
                                                    ${trip.roughBudgetUsd}
                                                </span>
                                            </div>
                                            <h2 style={{ fontSize: "3rem", fontWeight: 900, color: "#fff", marginBottom: "0.5rem", lineHeight: 1.1 }}>{trip.title}</h2>
                                            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                                                <MapPin size={16} /> {trip.primaryDestinationCity}, {trip.primaryDestinationCountry}
                                            </p>
                                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                                {trip.summary}
                                            </p>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
                                            <button style={{ width: "50px", height: "50px", borderRadius: "25px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer" }}>
                                                <Heart size={24} />
                                            </button>
                                            <Link href={`/templates/${trip.slug}`} style={{ width: "50px", height: "50px", borderRadius: "25px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", cursor: "pointer", border: "none" }}>
                                                <ArrowRight size={24} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Trending Mode */}
                    {mode === "trending" && (
                        <div style={{ padding: "4rem 0", textAlign: "center", background: "var(--bg-1)", borderRadius: "24px", border: "1px solid var(--border)" }}>
                            <TrendingUp size={48} color="var(--accent)" style={{ marginBottom: "1.5rem" }} />
                            <h2>Global Leaderboard</h2>
                            <p style={{ color: "var(--fg-2)", maxWidth: "500px", margin: "1rem auto" }}>See the highest Elo-ranked destinations worldwide.</p>
                            <Link href="/rank" className="btn btn-primary" style={{ marginTop: "1rem" }}>Contribute to Rankings</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
