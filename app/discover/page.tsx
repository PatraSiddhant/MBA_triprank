"use client";

import { useState } from "react";
import { tripTemplates } from "@/data/trip-templates";
import { schools } from "@/data/schools";
import Link from "next/link";
import { Search, MapPin, Clock } from "lucide-react";

export default function DiscoverPage() {
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const themes = Array.from(new Set(tripTemplates.flatMap(t => t.themes)));

    const filteredTrips = tripTemplates.filter(trip => {
        const matchesSchool = !selectedSchool || trip.schoolSlugs.includes(selectedSchool);
        const matchesTheme = !selectedTheme || trip.themes.includes(selectedTheme as any);
        const matchesSearch = !searchQuery ||
            trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.primaryDestinationCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.primaryDestinationCountry.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSchool && matchesTheme && matchesSearch;
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
                <div style={{ position: 'sticky', top: '5rem', zIndex: 10, background: 'var(--bg)', padding: '1rem 0', marginBottom: '3rem' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {/* Search Bar */}
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary)' }} size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, city or country..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    padding: '1rem 1rem 1rem 3rem',
                                    color: '#fff',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="scroll-x" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <button
                                onClick={() => setSelectedSchool(null)}
                                className={`btn ${selectedSchool === null ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', flexShrink: 0 }}
                            >
                                All Schools
                            </button>
                            {schools.map(s => (
                                <button
                                    key={s.slug}
                                    onClick={() => setSelectedSchool(s.slug)}
                                    className="btn"
                                    style={{
                                        padding: '0.5rem 1.25rem',
                                        fontSize: '0.875rem',
                                        background: selectedSchool === s.slug ? s.brandColor : 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        flexShrink: 0
                                    }}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>

                        <div className="scroll-x" style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                            <button
                                onClick={() => setSelectedTheme(null)}
                                className={selectedTheme === null ? 'active-pill' : 'pill'}
                                style={{ flexShrink: 0 }}
                            >
                                All Themes
                            </button>
                            {themes.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedTheme(t)}
                                    className={selectedTheme === t ? 'active-pill' : 'pill'}
                                    style={{ flexShrink: 0 }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
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
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: 700 }}>{trip.title}</h3>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--secondary)', fontSize: '0.875rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {trip.primaryDestinationCity}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {trip.durationDays}d</div>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                                    {trip.themes.slice(0, 2).map(t => (
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
                        <button onClick={() => { setSearchQuery(""); setSelectedSchool(null); setSelectedTheme(null); }} className="btn btn-secondary" style={{ marginTop: '1rem' }}>Clear all filters</button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .pill {
                    padding: 0.4rem 1rem;
                    background: rgba(255,255,255,0.05);
                    border-radius: 100px;
                    color: var(--secondary);
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: none;
                }
                .active-pill {
                    padding: 0.4rem 1rem;
                    background: var(--accent);
                    color: #000;
                    border-radius: 100px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    cursor: pointer;
                    border: none;
                }
            `}</style>
        </div>
    );
}
