"use client";

import { useState } from "react";
import { tripTemplates } from "@/data/trip-templates";
import { schools } from "@/data/schools";
import Link from "next/link";
import { Search, MapPin, Clock } from "lucide-react";

export default function DiscoverPage() {
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const themes = Array.from(new Set(tripTemplates.flatMap(t => t.themes)));
    const regions = Array.from(new Set(tripTemplates.map(t => t.region)));

    const filteredTrips = tripTemplates.filter(trip => {
        const matchesSchool = !selectedSchool || trip.schoolSlugs.includes(selectedSchool);
        const matchesTheme = !selectedTheme || trip.themes.includes(selectedTheme as any);
        const matchesRegion = !selectedRegion || trip.region === selectedRegion;
        const matchesSearch = !searchQuery ||
            trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.primaryDestinationCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.primaryDestinationCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.region.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSchool && matchesTheme && matchesRegion && matchesSearch;
    });

    return (
        <div style={{ minHeight: '100vh', padding: '8rem 0' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', fontWeight: 800 }}>Explore Treks</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.25rem', maxWidth: '600px' }}>
                        Curated by MBA students, for MBA students. Find your next global adventure.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="dock animate-fade-in" style={{ marginBottom: '6rem' }}>
                    {/* Search Bar */}
                    <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                        <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)', opacity: 0.5 }} size={20} />
                        <input
                            type="text"
                            placeholder="Find your next MBA legacy..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '1rem',
                                padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                                color: '#fff',
                                fontSize: '1.125rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <button
                            onClick={() => setSelectedRegion(null)}
                            className={selectedRegion === null ? 'active-pill' : 'pill'}
                        >
                            All Regions
                        </button>
                        {regions.map(r => (
                            <button
                                key={r}
                                onClick={() => setSelectedRegion(r)}
                                className={selectedRegion === r ? 'active-pill' : 'pill'}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                        <button
                            onClick={() => setSelectedSchool(null)}
                            className={selectedSchool === null ? 'active-pill' : 'pill'}
                        >
                            All Schools
                        </button>
                        {schools.map(s => (
                            <button
                                key={s.slug}
                                onClick={() => setSelectedSchool(s.slug)}
                                className={selectedSchool === s.slug ? 'active-pill' : 'pill'}
                                style={selectedSchool === s.slug ? { background: s.brandColor, borderColor: s.brandColor } : {}}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
                        <button
                            onClick={() => setSelectedTheme(null)}
                            className={selectedTheme === null ? 'active-pill' : 'pill'}
                        >
                            All Themes
                        </button>
                        {themes.map(t => (
                            <button
                                key={t}
                                onClick={() => setSelectedTheme(t)}
                                className={selectedTheme === t ? 'active-pill' : 'pill'}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
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
                                border: '1px solid rgba(255,255,255,0.1)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                                <img src={trip.photos[0].path} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, backdropFilter: 'blur(10px)' }}>
                                    ${trip.roughBudgetUsd}
                                </div>
                                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--accent)', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase' }}>
                                    {trip.region}
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '0.25rem', fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Best Season: {trip.logistics.bestSeason}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>{trip.title}</h3>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--secondary)', fontSize: '0.875rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {trip.primaryDestinationCity}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {trip.durationDays}d</div>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
                                        ${trip.logistics.dailyBudgetRange}/day
                                    </span>
                                    {trip.themes.map(t => (
                                        <span key={t} style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredTrips.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '10rem 0' }}>
                        <p style={{ color: 'var(--secondary)', fontSize: '1.25rem' }}>No treks found matching your filters.</p>
                        <button onClick={() => { setSearchQuery(""); setSelectedSchool(null); setSelectedTheme(null); setSelectedRegion(null); }} className="btn btn-secondary" style={{ marginTop: '1rem' }}>Clear all filters</button>
                    </div>
                )}
            </div>

        </div>
    );
}
