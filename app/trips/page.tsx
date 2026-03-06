import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import TripDownloadButton from "@/components/TripDownloadButton";
import StatusSelector from "@/components/StatusSelector";
import { updateTripStatusAction } from "@/lib/actions";
import { Calendar, CheckCircle2, MapPin, MoreHorizontal, Globe } from "lucide-react";
import Link from "next/link";
import WorldMap from "@/components/WorldMap";

export default async function UserTripsIndex() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let trips: any[] = [];
    try {
        trips = await (prisma as any).tripCandidate.findMany({
            where: user ? { userId: user.id } : {},
            orderBy: { createdAt: 'desc' },
            include: {
                itinerary: true
            }
        });
    } catch (e) {
        console.error("Prisma error:", e);
    }

    // Grouping for a better UX
    const planning = trips.filter(t => t.status === 'planning' || !t.status);
    const booked = trips.filter(t => t.status === 'booked');
    const completed = trips.filter(t => t.status === 'completed');

    return (
        <div style={{ paddingTop: '8rem', paddingBottom: '8rem', minHeight: '100vh' }}>
            <div className="container">
                <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.05em' }}>Your Global Legacy</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.5 }}>
                        A living record of your iconic MBA journeys. Track your progress, record your memories, and visualize your footprint.
                    </p>
                </header>

                <WorldMap trips={trips} />

                {trips.length === 0 && (
                    <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: 'var(--radius)', borderStyle: 'dashed' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 700 }}>Your Map is Empty</h2>
                        <p style={{ color: 'var(--secondary)', marginBottom: '0', maxWidth: '500px', margin: '0 auto' }}>
                            Start by exploring templates or designing your first custom journey above.
                        </p>
                    </div>
                )}
                {trips.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem', marginTop: '4rem' }}>
                        {/* Planning Section */}
                        {planning.length > 0 && (
                            <section>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Calendar size={24} color="var(--accent)" />
                                    Planning Phase
                                    <span style={{ fontSize: '0.875rem', color: 'var(--secondary)', fontWeight: 400 }}>({planning.length})</span>
                                </h2>
                                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
                                    {planning.map((trip) => (
                                        <TripCard key={trip.id} trip={trip} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Booked Section */}
                        {booked.length > 0 && (
                            <section>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <CheckCircle2 size={24} color="#00cc88" />
                                    Locked In
                                    <span style={{ fontSize: '0.875rem', color: 'var(--secondary)', fontWeight: 400 }}>({booked.length})</span>
                                </h2>
                                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
                                    {booked.map((trip) => (
                                        <TripCard key={trip.id} trip={trip} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Completed Section */}
                        {completed.length > 0 && (
                            <section>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.7 }}>
                                    <MapPin size={24} />
                                    Past Legends
                                    <span style={{ fontSize: '0.875rem', color: 'var(--secondary)', fontWeight: 400 }}>({completed.length})</span>
                                </h2>
                                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
                                    {completed.map((trip) => (
                                        <TripCard key={trip.id} trip={trip} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function TripCard({ trip }: { trip: any }) {
    return (
        <div className="glass card animate-fade-in" style={{
            padding: '2.5rem',
            borderRadius: 'var(--radius)',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(255,255,255,0.05)',
            transition: 'transform 0.3s ease, border-color 0.3s ease',
            height: '100%'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <StatusSelector tripId={trip.id} currentStatus={trip.status || 'planning'} />
                <button style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', cursor: 'pointer' }}>
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div style={{ marginBottom: '2rem', flex: 1 }}>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: 800, lineHeight: 1.2 }}>{trip.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontSize: '0.9rem' }}>
                    <MapPin size={16} color="var(--accent)" />
                    {trip.primaryDestinationCity}, {trip.primaryDestinationCountry}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ opacity: 0.5, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>Duration</div>
                    <div style={{ fontWeight: 700 }}>{trip.durationDays} Days</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ opacity: 0.5, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>Budget</div>
                    <div style={{ fontWeight: 700, color: 'var(--accent)' }}>${trip.roughBudgetUsd}</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link href={`/trips/${trip.id}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center', fontWeight: 700 }}>
                    Refine Itinerary
                </Link>
                <TripDownloadButton trip={trip} />
            </div>
        </div>
    );
}
