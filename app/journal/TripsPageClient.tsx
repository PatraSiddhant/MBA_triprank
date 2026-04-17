"use client";

import { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, CheckCircle2, MapPin, MoreHorizontal, Globe, List, Clock, Star, Plus, ChevronDown, ChevronUp, Save, Trash2, X } from "lucide-react";
import StatusSelector from "@/components/StatusSelector";
import TripDownloadButton from "@/components/TripDownloadButton";
import WorldMap from "@/components/WorldMap";
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

type ViewMode = 'cards' | 'map' | 'timeline';

const ALL_COUNTRIES = Array.from(new Set(tripTemplates.map(t => t.primaryDestinationCountry))).sort();

export default function TripsPageClient({ trips, userId }: { trips: Trip[], userId: string | null }) {
    const [view, setView] = useState<ViewMode>('cards');
    const [isCreating, setIsCreating] = useState(false);
    const [createPending, startCreateTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLogging, setIsLogging] = useState(false);
    const router = useRouter();

    const planning = trips.filter(t => t.status === 'planning' || !t.status);
    const booked = trips.filter(t => t.status === 'booked');
    const completed = trips.filter(t => t.status === 'completed');

    const datedTrips = useMemo(() => {
        return [...trips]
            .filter(t => t.travelDateStart)
            .sort((a, b) => new Date(a.travelDateStart!).getTime() - new Date(b.travelDateStart!).getTime());
    }, [trips]);

    const filteredTemplates = useMemo(() => {
        if (!searchTerm) return [];
        return tripTemplates.filter(t =>
            t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.primaryDestinationCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.primaryDestinationCity.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);
    }, [searchTerm]);

    const handleQuickLog = (template: any) => {
        if (!userId) {
            router.push('/login');
            return;
        }
        startCreateTransition(async () => {
            try {
                await logPastTripFromTemplateAction(template.slug);
            } catch (e) {
                console.error(e);
            }
            setSearchTerm("");
            setIsLogging(false);
            setView('cards');
        });
    };

    const handleCreate = () => {
        startCreateTransition(async () => {
            try {
                await createCustomTripAction();
            } catch (e) {
                console.error(e);
            }
            setIsCreating(false);
            setView('cards');
        });
    };

    return (
        <div style={{ paddingTop: '8rem', paddingBottom: '8rem', minHeight: '100vh' }}>
            <div className="container">
                <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.04em' }}>Your Global Legacy</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.5 }}>
                        Track, remember, and visualize every iconic MBA journey.
                    </p>
                </header>

                {/* View Toggle + Action */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', padding: '4px', gap: '2px' }}>
                        {([['cards', List, 'Cards'], ['map', Globe, 'Map'], ['timeline', Clock, 'Timeline']] as const).map(([id, Icon, label]) => (
                            <button key={id} onClick={() => setView(id)}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.2s', background: view === id ? 'rgba(255,255,255,0.1)' : 'transparent', color: view === id ? '#fff' : 'var(--secondary)' }}>
                                <Icon size={16} />{label}
                            </button>
                        ))}
                    </div>

                    <button onClick={handleCreate} disabled={createPending} className="btn btn-primary" style={{ borderRadius: '100px', padding: '0.5rem 1.5rem', fontSize: '0.85rem', fontWeight: 800, gap: '0.6rem' }}>
                        {createPending ? <Clock size={16} className="animate-spin" /> : <Plus size={18} />}
                        Capture your trip memories
                    </button>
                </div>

                {/* QUICK TRIP LOGGER */}
                <div style={{ maxWidth: '600px', margin: '0 auto 4rem', position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Add a trip you've gone on (e.g. Japan, Peru...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsLogging(true)}
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '1.25rem',
                                padding: '1.2rem 1.5rem 1.2rem 3.5rem',
                                color: '#fff',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                                boxShadow: isLogging ? '0 0 20px rgba(var(--accent-rgb), 0.15)' : 'none'
                            }}
                        />
                        <Star size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent)' }} />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")} style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--secondary)', cursor: 'pointer' }}>
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    {isLogging && filteredTemplates.length > 0 && (
                        <div className="glass" style={{ position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 100, borderRadius: '1.25rem', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                            <div style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--secondary)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Templates Found</div>
                            {filteredTemplates.map(template => (
                                <button
                                    key={template.slug}
                                    onClick={() => handleQuickLog(template)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: 'none',
                                        border: 'none',
                                        color: '#fff',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        borderRadius: '0.75rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                >
                                    <div style={{ background: 'var(--accent)', padding: '0.4rem', borderRadius: '8px', display: 'flex' }}>
                                        <Plus size={14} color="#000" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{template.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>{template.primaryDestinationCity}, {template.primaryDestinationCountry}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {isLogging && searchTerm && filteredTemplates.length === 0 && (
                        <div className="glass" style={{ position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 100, borderRadius: '1.25rem', padding: '1.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>No matching templates found.</p>
                            <button onClick={handleCreate} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Add as Custom Trip</button>
                        </div>
                    )}
                </div>

                {trips.length === 0 && !createPending && (
                    <div className="glass" style={{ padding: '6rem 2rem', textAlign: 'center', borderRadius: '2.5rem', borderStyle: 'dashed' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🌍</div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 800 }}>No Expeditions Yet</h2>
                        <p style={{ color: 'var(--secondary)', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>Start by exploring templates or design a custom journey to build your legacy.</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Link href="/discover" className="btn btn-secondary">Explore Templates</Link>
                            <button onClick={handleCreate} className="btn btn-primary">Create Custom Trip</button>
                        </div>
                    </div>
                )}

                {/* MAP VIEW */}
                {view === 'map' && trips.length > 0 && (
                    <div className="animate-fade-in">
                        <WorldMap trips={trips} />
                    </div>
                )}

                {/* TIMELINE VIEW */}
                {view === 'timeline' && trips.length > 0 && (
                    <div className="animate-fade-in">
                        {datedTrips.length === 0 ? (
                            <div className="glass" style={{ padding: '5rem 2rem', textAlign: 'center', borderRadius: '2rem' }}>
                                <Calendar size={48} color="var(--secondary)" style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>Timeline Empty</h3>
                                <p style={{ color: 'var(--secondary)' }}>Set travel dates on your trip cards to populate this view.</p>
                            </div>
                        ) : (
                            <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                                {/* Central Line */}
                                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 90%, rgba(255,255,255,0) 100%)', transform: 'translateX(-50%)' }} />

                                {datedTrips.map((trip, idx) => {
                                    const isLeft = idx % 2 === 0;
                                    const startDate = new Date(trip.travelDateStart!);
                                    const endDate = trip.travelDateEnd ? new Date(trip.travelDateEnd) : null;

                                    return (
                                        <div key={trip.id} style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', width: '100%', marginBottom: '4rem', position: 'relative' }}>
                                            {/* Date Indicator on Center Line */}
                                            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '2rem', zIndex: 2 }}>
                                                <div style={{ background: 'var(--background)', border: '2px solid var(--accent)', color: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900, whiteSpace: 'nowrap', boxShadow: '0 0 15px rgba(var(--accent-rgb), 0.3)' }}>
                                                    {startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                </div>
                                            </div>

                                            {/* Timeline Card */}
                                            <div style={{ width: '45%', position: 'relative' }}>
                                                <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                        <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: trip.status === 'completed' ? '#00cc88' : 'var(--accent)' }}>
                                                            {trip.status || 'planning'}
                                                        </span>
                                                        <Link href={`/trips/${trip.id}`} style={{ color: 'var(--secondary)' }}><MoreHorizontal size={18} /></Link>
                                                    </div>

                                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>{trip.name}</h3>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                                        <MapPin size={14} color="var(--accent)" /> {trip.primaryDestinationCity}, {trip.primaryDestinationCountry}
                                                    </div>

                                                    {trip.memory?.highlightMoment && (
                                                        <div style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', borderLeft: '2px solid var(--accent)', paddingLeft: '1rem', marginBottom: '1rem' }}>
                                                            &quot;{trip.memory.highlightMoment}&quot;
                                                        </div>
                                                    )}

                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                                                        <span>{trip.durationDays} days</span>
                                                        {trip.memory?.overallRating && (
                                                            <div style={{ display: 'flex', gap: '2px' }}>
                                                                {[...Array(trip.memory.overallRating)].map((_, i) => <Star key={i} size={10} fill="#fbbf24" color="#fbbf24" />)}
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
                {view === 'cards' && trips.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                        {[
                            { title: 'In Planning', data: planning, icon: Calendar, color: 'var(--accent)' },
                            { title: 'Locked In', data: booked, icon: CheckCircle2, color: '#00cc88' },
                            { title: 'Past Legends', data: completed, icon: Globe, color: 'rgba(255,255,255,0.5)' }
                        ].map((section) => {
                            const Icon = section.icon;
                            return section.data.length > 0 ? (
                                <section key={section.title}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                                        <Icon size={24} color={section.color} />
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>{section.title}</h2>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: 400 }}>({section.data.length})</span>
                                    </div>
                                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
                                        {section.data.map(trip => <TripQuickDashboard key={trip.id} trip={trip} />)}
                                    </div>
                                </section>
                            ) : null
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

// --- NEW REDESIGNED CARD ---
function TripQuickDashboard({ trip }: { trip: Trip }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPending, startTransition] = useTransition();

    // Internal form states
    const [startDate, setStartDate] = useState(trip.travelDateStart ? trip.travelDateStart.slice(0, 10) : '');
    const [endDate, setEndDate] = useState(trip.travelDateEnd ? trip.travelDateEnd.slice(0, 10) : '');
    const [country, setCountry] = useState(trip.primaryDestinationCountry || '');
    const [city, setCity] = useState(trip.primaryDestinationCity || '');

    const handleSave = () => {
        startTransition(async () => {
            await Promise.all([
                updateTripDateAction(trip.id, startDate || null, endDate || null),
                updateTripDestinationAction(trip.id, city, country)
            ]);
            setIsExpanded(false);
        });
    };

    return (
        <div className="glass card animate-fade-in" style={{ borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', height: 'fit-content' }}>
            {/* Header: Fixed Content */}
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <StatusSelector tripId={trip.id} currentStatus={(trip.status || 'planning') as any} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <TripDownloadButton trip={trip} />
                        <button onClick={() => setIsExpanded(!isExpanded)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '12px', padding: '0.5rem', cursor: 'pointer' }}>
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.5rem', color: '#fff' }}>{trip.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontSize: '0.9rem' }}>
                        <MapPin size={16} color="var(--accent)" />
                        {trip.primaryDestinationCity}, {trip.primaryDestinationCountry}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }}>
                        <div style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.25rem' }}>Dates</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: trip.travelDateStart ? 'var(--accent)' : 'rgba(255,255,255,0.3)' }}>
                            {trip.travelDateStart ? new Date(trip.travelDateStart).toLocaleDateString() : 'Unscheduled'}
                        </div>
                    </div>
                    <Link href={`/trips/${trip.id}`} className="btn btn-primary" style={{ height: '52px', padding: '0 1.5rem', borderRadius: '1rem' }}>
                        Itinerary
                    </Link>
                </div>
            </div>

            {/* Expanded Setup UI: "Dropdown/Form" style */}
            {isExpanded && (
                <div style={{ padding: '0 2rem 2rem', background: 'rgba(var(--accent-rgb), 0.03)', borderTop: '1px solid rgba(var(--accent-rgb), 0.1)' }} className="animate-fade-in">
                    <div style={{ paddingTop: '2rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>Where are you headed?</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', display: 'block', marginBottom: '0.4rem' }}>Country</span>
                                    <select value={country} onChange={e => setCountry(e.target.value)}
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.6rem', color: '#fff', fontSize: '0.85rem' }}>
                                        <option value="">Select Country</option>
                                        {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', display: 'block', marginBottom: '0.4rem' }}>City / Region</span>
                                    <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Kyoto"
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.6rem', color: '#fff', fontSize: '0.85rem' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>Setup Timeline</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', display: 'block', marginBottom: '0.4rem' }}>Departure</span>
                                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '0.6rem 1rem', color: '#fff', fontSize: '0.85rem', colorScheme: 'dark' }} />
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', display: 'block', marginBottom: '0.4rem' }}>Return</span>
                                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '0.6rem 1rem', color: '#fff', fontSize: '0.85rem', colorScheme: 'dark' }} />
                                </div>
                            </div>
                        </div>

                        {trip.memory && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '0.75rem' }}>Memory Snapshot</label>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', margin: 0 }}>&quot;{trip.memory.highlightMoment}&quot;</p>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button onClick={handleSave} disabled={isPending} className="btn btn-primary" style={{ flex: 1, gap: '0.5rem' }}>
                                <Save size={16} /> {isPending ? 'Syncing...' : 'Save Settings'}
                            </button>
                            <button onClick={() => setIsExpanded(false)} className="btn btn-secondary" style={{ padding: '0.75rem' }}>
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

