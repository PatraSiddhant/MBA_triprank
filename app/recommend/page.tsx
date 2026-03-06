"use client";

import { useState } from "react";
import { tripTemplates, TripTemplate } from "@/data/trip-templates";
import Link from "next/link";
import { Sparkles, ChevronRight, ChevronLeft, MapPin, Clock, DollarSign, Zap, Check, CalendarPlus } from "lucide-react";

// --- Recommender Logic ---

const MBA_VACATION_SLOTS = [
    { id: "pre-internship", name: "Pre-Internship", dates: "Late May 2026", maxDays: 5 },
    { id: "post-internship", name: "Post-Internship", dates: "August 2026", maxDays: 21 },
    { id: "fall-break", name: "Fall Break", dates: "Mid-October 2026", maxDays: 7 },
    { id: "thanksgiving", name: "Thanksgiving", dates: "Late Nov 2026", maxDays: 5 },
    { id: "winter-break", name: "Winter Break", dates: "Late Dec – mid-Jan 2027", maxDays: 21 },
    { id: "spring-break", name: "Spring Break", dates: "March 2027", maxDays: 10 },
    { id: "post-finals", name: "Post-Finals", dates: "May 2027", maxDays: 30 },
];

function suggestSlot(durationDays: number): string {
    // Match trip duration to best fitting slot
    const parsedDays = typeof durationDays === 'string'
        ? parseInt(String(durationDays).split('-')[0]) || 7
        : durationDays;

    if (parsedDays <= 5) return "Pre-Internship (Late May 2026) or Thanksgiving (Late Nov 2026)";
    if (parsedDays <= 7) return "Fall Break (Mid-October 2026)";
    if (parsedDays <= 10) return "Spring Break (March 2027)";
    return "Winter Break (Dec–Jan) or Post-Finals (May 2027)";
}

function scoreTrip(trip: TripTemplate, prefs: Preferences): number {
    let score = 0;

    // Budget match (0–30 pts)
    const budget = typeof trip.roughBudgetUsd === 'string'
        ? parseInt(String(trip.roughBudgetUsd).split('-')[0]) || 1500
        : trip.roughBudgetUsd as number;
    const [minB, maxB] = prefs.budgetRange;
    if (budget >= minB && budget <= maxB) score += 30;
    else if (budget < minB) score += Math.max(0, 30 - (minB - budget) / 50);
    else score += Math.max(0, 30 - (budget - maxB) / 80);

    // Duration match (0–20 pts)
    const days = typeof trip.durationDays === 'string'
        ? parseInt(String(trip.durationDays).split('-')[0]) || 7
        : trip.durationDays as number;
    const [minD, maxD] = prefs.durationRange;
    if (days >= minD && days <= maxD) score += 20;
    else score += Math.max(0, 20 - Math.abs(days - (minD + maxD) / 2) * 2);

    // Theme match (0–25 pts)
    const themeMatches = trip.themes.filter(t => prefs.themes.includes(t)).length;
    score += (themeMatches / Math.max(prefs.themes.length, 1)) * 25;

    // Region match (0–15 pts)
    if (!prefs.region || prefs.region === "Any" || trip.region === prefs.region) score += 15;

    // Persona / vibe match (0–10 pts)
    const vibeMap: Record<string, string[]> = {
        "YOLO Explorer": ["Adventure", "Nightlife", "Beach"],
        "Culture Connoisseur": ["Culture", "History", "Wellness"],
        "Budget Optimizer": ["Budget"],
        "Luxury Seeker": ["Luxury", "Beach", "Wellness"],
    };
    const vibes = vibeMap[prefs.persona] || [];
    const vibeScore = trip.themes.filter(t => vibes.includes(t)).length;
    score += Math.min(vibeScore * 5, 10);

    return Math.min(Math.round(score), 100);
}

interface Preferences {
    budgetRange: [number, number];
    durationRange: [number, number];
    themes: string[];
    region: string;
    persona: string;
}

const BUDGET_PRESETS = [
    { label: "Budget", sub: "Under $1,200", range: [500, 1200] as [number, number] },
    { label: "Mid-Range", sub: "$1,200–$2,000", range: [1200, 2000] as [number, number] },
    { label: "Premium", sub: "$2,000–$3,000", range: [2000, 3000] as [number, number] },
    { label: "Luxury", sub: "No limit", range: [2500, 9999] as [number, number] },
];

const DURATION_PRESETS = [
    { label: "Quick Trip", sub: "3–5 days", range: [3, 5] as [number, number] },
    { label: "Classic", sub: "7–10 days", range: [7, 10] as [number, number] },
    { label: "Extended", sub: "10–14 days", range: [10, 14] as [number, number] },
    { label: "Epic Journey", sub: "15+ days", range: [15, 30] as [number, number] },
];

const THEMES = ["Culture", "Adventure", "Beach", "Business", "Nightlife", "Wellness", "History", "Nature"];
const REGIONS = ["Any", "South America", "Europe", "Asia", "Africa & Middle East", "North America & Caribbean"];
const PERSONAS = [
    { id: "YOLO Explorer", emoji: "🚀", desc: "Live in the moment, experience everything" },
    { id: "Culture Connoisseur", emoji: "🎭", desc: "Art, history, local cuisine & deep immersion" },
    { id: "Budget Optimizer", emoji: "💡", desc: "Maximum experience, minimum spend" },
    { id: "Luxury Seeker", emoji: "✨", desc: "5-star everything, no compromises" },
];

const TOTAL_STEPS = 5;

export default function RecommendPage() {
    const [step, setStep] = useState(0);
    const [prefs, setPrefs] = useState<Preferences>({
        budgetRange: [1200, 2000],
        durationRange: [7, 10],
        themes: [],
        region: "Any",
        persona: "",
    });
    const [results, setResults] = useState<Array<{ trip: TripTemplate; score: number }> | null>(null);

    const progress = ((step + 1) / (TOTAL_STEPS + 1)) * 100;

    const handleSubmit = () => {
        const scored = tripTemplates
            .map(trip => ({ trip, score: scoreTrip(trip, prefs) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
        setResults(scored);
        setStep(TOTAL_STEPS);
    };

    const canProceed = () => {
        if (step === 0) return true; // budget always has a default
        if (step === 1) return true;
        if (step === 2) return prefs.themes.length > 0;
        if (step === 3) return !!prefs.region;
        if (step === 4) return !!prefs.persona;
        return false;
    };

    return (
        <div style={{ minHeight: '100vh', padding: '8rem 0 6rem' }}>
            <div className="container" style={{ maxWidth: '780px' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.25rem', background: 'rgba(var(--accent-rgb), 0.1)', border: '1px solid rgba(var(--accent-rgb), 0.25)', borderRadius: '100px', marginBottom: '1.5rem' }}>
                        <Sparkles size={16} color="var(--accent)" />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>Trip Recommender</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
                        Find Your Perfect Trek
                    </h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                        Answer 5 quick questions and we'll match you with the best MBA trek for your style.
                    </p>
                </div>

                {results ? (
                    // Results View
                    <div className="animate-fade-in">
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>Your Top Matches</h2>
                        <p style={{ color: 'var(--secondary)', textAlign: 'center', marginBottom: '3rem' }}>Based on your preferences, here are the best treks for you.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {results.map(({ trip, score }, idx) => {
                                const duration = typeof trip.durationDays === 'string'
                                    ? parseInt(String(trip.durationDays).split('-')[0]) || 7
                                    : trip.durationDays as number;
                                const slotSuggestion = suggestSlot(duration);
                                const isTop = idx === 0;

                                return (
                                    <div key={trip.slug} className="glass" style={{
                                        borderRadius: '1.5rem',
                                        overflow: 'hidden',
                                        border: isTop ? '1px solid rgba(var(--accent-rgb), 0.3)' : '1px solid rgba(255,255,255,0.07)',
                                        position: 'relative'
                                    }}>
                                        {isTop && (
                                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, zIndex: 2 }}>
                                                #1 BEST MATCH
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ height: '180px', position: 'relative' }}>
                                                <img src={trip.photos[0].path} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                                                {/* Match score */}
                                                <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem' }}>
                                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Match Score</div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                        <div style={{ width: '120px', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '100px', overflow: 'hidden' }}>
                                                            <div style={{ width: `${score}%`, height: '100%', background: score >= 80 ? '#22c55e' : score >= 60 ? 'var(--accent)' : '#f59e0b', borderRadius: '100px', transition: 'width 1s ease' }} />
                                                        </div>
                                                        <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#fff' }}>{score}%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ padding: '1.5rem' }}>
                                                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>{trip.title}</h3>
                                                <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--secondary)', fontSize: '0.875rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {trip.primaryDestinationCity}</span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {trip.durationDays} days</span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><DollarSign size={14} /> ${trip.roughBudgetUsd}</span>
                                                </div>

                                                {/* Vacation slot suggestion */}
                                                <div style={{ background: 'rgba(var(--accent-rgb), 0.08)', border: '1px solid rgba(var(--accent-rgb), 0.2)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <CalendarPlus size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                                                    <div>
                                                        <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)' }}>Best Vacation Slot</div>
                                                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{slotSuggestion}</div>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                                    <Link href={`/templates/${trip.slug}`} className="btn btn-primary" style={{ flex: 1, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', textAlign: 'center' }}>
                                                        View Full Trek →
                                                    </Link>
                                                    <Link href={`/plan`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius)', color: '#fff', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                                        <CalendarPlus size={16} /> Add to Plan
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <button onClick={() => { setStep(0); setResults(null); setPrefs({ budgetRange: [1200, 2000], durationRange: [7, 10], themes: [], region: "Any", persona: "" }); }} className="btn btn-secondary">
                                Start Over
                            </button>
                        </div>
                    </div>
                ) : (
                    // Form Steps
                    <div className="glass animate-fade-in" style={{ borderRadius: '2rem', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                        {/* Progress Bar */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.05)' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                        </div>

                        <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Step {step + 1} of {TOTAL_STEPS}
                        </div>

                        {step === 0 && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>What's your budget per person?</h2>
                                <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>All-in for the trip including flights, hotels, and activities.</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {BUDGET_PRESETS.map(preset => (
                                        <button key={preset.label} onClick={() => setPrefs(p => ({ ...p, budgetRange: preset.range }))}
                                            style={{ padding: '1.5rem', borderRadius: '1rem', border: `2px solid ${JSON.stringify(prefs.budgetRange) === JSON.stringify(preset.range) ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`, background: JSON.stringify(prefs.budgetRange) === JSON.stringify(preset.range) ? 'rgba(var(--accent-rgb), 0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', position: 'relative' }}>
                                            {JSON.stringify(prefs.budgetRange) === JSON.stringify(preset.range) && <Check size={16} color="var(--accent)" style={{ position: 'absolute', top: '1rem', right: '1rem' }} />}
                                            <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#fff' }}>{preset.label}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{preset.sub}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>How long do you want to travel?</h2>
                                <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Consider which MBA break you're planning for.</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {DURATION_PRESETS.map(preset => (
                                        <button key={preset.label} onClick={() => setPrefs(p => ({ ...p, durationRange: preset.range }))}
                                            style={{ padding: '1.5rem', borderRadius: '1rem', border: `2px solid ${JSON.stringify(prefs.durationRange) === JSON.stringify(preset.range) ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`, background: JSON.stringify(prefs.durationRange) === JSON.stringify(preset.range) ? 'rgba(var(--accent-rgb), 0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', position: 'relative' }}>
                                            {JSON.stringify(prefs.durationRange) === JSON.stringify(preset.range) && <Check size={16} color="var(--accent)" style={{ position: 'absolute', top: '1rem', right: '1rem' }} />}
                                            <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#fff' }}>{preset.label}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{preset.sub}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>What are you into?</h2>
                                <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Pick everything that excites you (select multiple).</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {THEMES.map(theme => {
                                        const active = prefs.themes.includes(theme);
                                        return (
                                            <button key={theme} onClick={() => setPrefs(p => ({ ...p, themes: active ? p.themes.filter(t => t !== theme) : [...p.themes, theme] }))}
                                                className={active ? 'active-pill' : 'pill'} style={{ fontSize: '0.9rem', padding: '0.6rem 1.3rem' }}>
                                                {active && <Check size={14} style={{ marginRight: '0.4rem' }} />}{theme}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Where in the world?</h2>
                                <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Pick a region or leave open for global options.</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    {REGIONS.map(region => (
                                        <button key={region} onClick={() => setPrefs(p => ({ ...p, region }))}
                                            style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem', border: `2px solid ${prefs.region === region ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`, background: prefs.region === region ? 'rgba(var(--accent-rgb), 0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', textAlign: 'left', fontWeight: 700, transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
                                            {region}
                                            {prefs.region === region && <Check size={16} color="var(--accent)" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-fade-in">
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>What's your travel persona?</h2>
                                <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>This helps us nail the vibe of your trip.</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {PERSONAS.map(p => (
                                        <button key={p.id} onClick={() => setPrefs(pref => ({ ...pref, persona: p.id }))}
                                            style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem', border: `2px solid ${prefs.persona === p.id ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`, background: prefs.persona === p.id ? 'rgba(var(--accent-rgb), 0.1)' : 'rgba(255,255,255,0.02)', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1.25rem', transition: 'all 0.2s' }}>
                                            <span style={{ fontSize: '2rem' }}>{p.emoji}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '0.2rem', color: '#fff' }}>{p.id}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{p.desc}</div>
                                            </div>
                                            {prefs.persona === p.id && <Check size={18} color="var(--accent)" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem' }}>
                            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
                                style={{ background: 'transparent', border: 'none', color: step === 0 ? 'transparent' : 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: step === 0 ? 'default' : 'pointer', fontSize: '0.95rem' }}>
                                <ChevronLeft size={20} /> Back
                            </button>

                            {step < TOTAL_STEPS - 1 ? (
                                <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="btn btn-primary" style={{ gap: '0.5rem', fontWeight: 700 }}>
                                    Continue <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button onClick={handleSubmit} disabled={!canProceed()} className="btn btn-primary" style={{ gap: '0.5rem', fontWeight: 700, padding: '0.85rem 2.5rem' }}>
                                    <Zap size={18} /> Find My Trek
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
