"use client";

import { useState } from "react";
import { tripTemplates } from "@/data/trip-templates";
import Link from "next/link";
import { Search, MapPin, Clock, Filter, Users, TrendingUp, Sparkles, SlidersHorizontal, Bell } from "lucide-react";

export default function DiscoverPage() {
    const [mode, setMode] = useState<"foryou" | "trending" | "browse" | "recommender">("browse");
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [maxBudget, setMaxBudget] = useState<number>(5000);

    const themes = Array.from(new Set(tripTemplates.flatMap(t => t.themes)));
    const regionsRaw = Array.from(new Set(tripTemplates.map(t => t.region)));
    
    // Simplification of regions per plan: Americas, Europe, Middle East & Africa, Asia, Oceania, Transcontinental
    const regionGroups = ["Americas", "Europe", "Middle East & Africa", "Asia", "Oceania", "Transcontinental"];

    const filteredTrips = tripTemplates.filter(trip => {
        const parseBudget = (b: number | string) => {
            if (typeof b === 'number') return b;
            return parseInt(b.replace(/[^0-9-]/g, '').split('-')[0]) || 0;
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

    return (
        <div style={{ minHeight: '100vh', display: 'flex' }}>
            {/* Desktop Left Rail - Filters (Only in Browse Mode) */}
            {mode === "browse" && (
                <div className="desktop-only" style={{ width: '280px', borderRight: '1px solid var(--border)', padding: '6rem 2rem 2rem 2rem', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <SlidersHorizontal size={20} /> Filters
                    </h2>
                    
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'block' }}>Search</label>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} color="var(--fg-2)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            <input 
                                type="text"
                                placeholder="Countries, cities..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--fg-0)', borderRadius: '8px', fontSize: '0.875rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Max Budget</label>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>${maxBudget}</span>
                        </div>
                        <input type="range" min="500" max="10000" step="100" value={maxBudget} onChange={e => setMaxBudget(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'block' }}>Region</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button onClick={() => setSelectedRegion(null)} style={{ textAlign: 'left', padding: '0.5rem', background: selectedRegion === null ? 'rgba(var(--accent-rgb), 0.1)' : 'transparent', color: selectedRegion === null ? 'var(--accent)' : 'var(--fg-1)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: selectedRegion === null ? 600 : 400 }}>All Regions</button>
                            {regionsRaw.slice(0, 6).map(r => (
                                <button key={r} onClick={() => setSelectedRegion(r)} style={{ textAlign: 'left', padding: '0.5rem', background: selectedRegion === r ? 'rgba(var(--accent-rgb), 0.1)' : 'transparent', color: selectedRegion === r ? 'var(--accent)' : 'var(--fg-1)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: selectedRegion === r ? 600 : 400, display: 'flex', justifyContent: 'space-between' }}>
                                    {r}
                                    <span style={{ color: 'var(--fg-3)', fontSize: '0.75rem' }}>
                                        {tripTemplates.filter(t => {
                                            const pb = typeof t.roughBudgetUsd === 'number' ? t.roughBudgetUsd : parseInt(t.roughBudgetUsd.replace(/[^0-9-]/g, '').split('-')[0]) || 0;
                                            return t.region === r && pb <= maxBudget;
                                        }).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '7rem 2rem 4rem 2rem', overflowX: 'hidden' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Discover Treks</h1>
                        
                        {/* Segmented Control */}
                        <div style={{ display: 'flex', background: 'var(--bg-2)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                            {(["foryou", "trending", "browse", "recommender"] as const).map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMode(m)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: mode === m ? 'var(--bg-3)' : 'transparent',
                                        color: mode === m ? 'var(--fg-0)' : 'var(--fg-2)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.2s',
                                        margin: '4px'
                                    }}
                                >
                                    {m === "foryou" && <Sparkles size={16} />}
                                    {m === "trending" && <TrendingUp size={16} />}
                                    {m === "browse" && <Search size={16} />}
                                    {m === "recommender" && <Filter size={16} />}
                                    <span style={{ textTransform: 'capitalize' }}>{m === "foryou" ? "For You" : m}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {mode === 'browse' && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ color: 'var(--fg-2)', fontSize: '0.875rem' }}>
                                    Showing <strong style={{ color: 'var(--fg-0)' }}>{filteredTrips.length}</strong> results matching your filters
                                </div>
                                <button style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Bell size={16} /> Alert me when matching trips are added
                                </button>
                            </div>

                            <div className="grid">
                                {filteredTrips.map((trip) => (
                                    <Link
                                        key={trip.slug}
                                        href={`/templates/${trip.slug}`}
                                        className="glass animate-fade-in"
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            borderRadius: 'var(--radius)',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            border: '1px solid var(--border)',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                                            <img src={trip.photos[0].path} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.8)', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>
                                                ${trip.roughBudgetUsd}
                                            </div>
                                            {trip.slug.length % 2 === 0 && (
                                                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(var(--bg-0-rgb), 0.9)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg-0)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Users size={14} color="var(--accent)" /> 4 peers ranked Top-3
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700, lineHeight: 1.3 }}>{trip.title}</h3>
                                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--fg-2)', fontSize: '0.875rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {trip.durationDays}d</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {trip.primaryDestinationCountry}</div>
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                                                {trip.themes.slice(0, 3).map(t => (
                                                    <span key={t} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'var(--bg-2)', color: 'var(--fg-1)', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            
                            {filteredTrips.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '6rem 0', background: 'var(--bg-1)', borderRadius: '24px', border: '1px dashed var(--border)' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No treks found</h3>
                                    <p style={{ color: 'var(--fg-2)', marginBottom: '1.5rem' }}>Try relaxing your budget or expanding your region.</p>
                                    <button onClick={() => { setMaxBudget(5000); setSelectedRegion(null); }} className="btn btn-secondary">
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {mode === 'foryou' && (
                        <div style={{ padding: '4rem 0', textAlign: 'center', background: 'var(--bg-1)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                            <Sparkles size={48} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                            <h2>Coming Soon: Personalized Engine</h2>
                            <p style={{ color: 'var(--fg-2)', maxWidth: '500px', margin: '1rem auto' }}>We are blending your Trip DNA, cohort signals, and budget to generate the absolute perfect recommendation.</p>
                        </div>
                    )}
                    
                    {mode === 'trending' && (
                        <div style={{ padding: '4rem 0', textAlign: 'center', background: 'var(--bg-1)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                            <TrendingUp size={48} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                            <h2>Global Leaderboard</h2>
                            <p style={{ color: 'var(--fg-2)', maxWidth: '500px', margin: '1rem auto' }}>See the highest Elo-ranked destinations worldwide.</p>
                            <Link href="/rank" className="btn btn-primary" style={{ marginTop: '1rem' }}>Contribute to Rankings</Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
