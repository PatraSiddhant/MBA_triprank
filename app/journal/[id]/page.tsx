import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Clock, DollarSign, Calendar, Zap, Book } from "lucide-react";
import ItineraryEditor from "@/components/ItineraryEditor";
import MemoryQuestionnaire from "@/components/MemoryQuestionnaire";
import MemoryCard from "@/components/MemoryCard";
import TripDownloadButton from "@/components/TripDownloadButton";

export default async function UserTripPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const trip = await (prisma as any).tripCandidate.findUnique({
        where: { id },
        include: {
            memory: true,
            itinerary: {
                include: {
                    days: {
                        include: {
                            items: true
                        },
                        orderBy: {
                            dayIndex: 'asc'
                        }
                    }
                }
            }
        }
    });

    if (!trip) {
        notFound();
    }

    const isCompleted = trip.status === 'completed';

    return (
        <div style={{ paddingTop: '8rem', paddingBottom: '8rem', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ marginBottom: '6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: isCompleted ? '#00cc88' : 'var(--accent)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        {isCompleted ? <Book size={18} /> : <Zap size={18} />}
                        <span>{isCompleted ? 'Historical Record' : 'Active Expedition'}</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '2rem', fontWeight: 900, lineHeight: 1.1 }}>{trip.name}</h1>
                    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', color: 'var(--secondary)', fontSize: '1.125rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <MapPin size={22} color="var(--accent)" />
                            <span>{trip.primaryDestinationCity}, {trip.primaryDestinationCountry}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Calendar size={22} color="var(--accent)" />
                            <span>Completed {trip.durationDays} Days</span>
                        </div>
                    </div>
                </div>

                {isCompleted && (
                    <section style={{ marginBottom: '8rem' }}>
                        {trip.memory ? (
                            <MemoryCard memory={trip.memory} tripName={trip.name} />
                        ) : (
                            <div>
                                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Record Your Legacy</h2>
                                    <p style={{ color: 'var(--secondary)', fontSize: '1.125rem' }}>Share your wisdom from {trip.name} for future MBA students.</p>
                                </div>
                                <MemoryQuestionnaire tripId={trip.id} tripName={trip.name} />
                            </div>
                        )}
                    </section>
                )}

                <div className="grid" style={{ gridTemplateColumns: isCompleted ? '1fr' : '1fr 340px', gap: '6rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 800 }}>
                            {isCompleted ? 'The Final Itinerary' : 'Refining Your Path'}
                        </h2>
                        {trip.itinerary ? (
                            <div style={{ opacity: isCompleted ? 0.8 : 1 }}>
                                <ItineraryEditor
                                    itineraryId={trip.itinerary.id}
                                    readOnly={isCompleted}
                                    initialDays={trip.itinerary.days.map((day: any) => ({
                                        id: day.id,
                                        dayIndex: day.dayIndex,
                                        title: day.title,
                                        items: day.items.map((item: any) => ({
                                            id: item.id,
                                            title: item.title,
                                            description: item.description,
                                            timeBucket: item.timeBucket,
                                        })),
                                    }))}
                                />
                            </div>
                        ) : (
                            <div className="glass" style={{ padding: '4rem', borderRadius: 'var(--radius)', textAlign: 'center', color: 'var(--secondary)', fontSize: '1.25rem' }}>
                                No itinerary records found for this expedition.
                            </div>
                        )}
                    </div>

                    {!isCompleted && (
                        <aside>
                            <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)', position: 'sticky', top: '10rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: 700 }}>Expedition Stats</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Budget</span>
                                        <span style={{ fontWeight: 700, color: 'var(--accent)' }}>${trip.roughBudgetUsd}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Theme</span>
                                        <span style={{ fontWeight: 600 }}>{trip.theme}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Current Status</span>
                                        <span style={{
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            background: trip.status === 'booked' ? 'rgba(0, 204, 136, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                            color: trip.status === 'booked' ? '#00cc88' : 'white',
                                            textTransform: 'uppercase'
                                        }}>{trip.status || 'Draft'}</span>
                                    </div>
                                </div>
                                <TripDownloadButton trip={trip} />
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}

