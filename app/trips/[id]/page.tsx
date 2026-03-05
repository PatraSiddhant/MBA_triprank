import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, Clock, DollarSign, Calendar } from "lucide-react";

export default async function UserTripPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const trip = await prisma.tripCandidate.findUnique({
        where: { id },
        include: {
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

    return (
        <div style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent)', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        <Zap size={16} /> <span>Your Planned Trip</span>
                    </div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{trip.name}</h1>
                    <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', color: 'var(--secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={18} /> <span>{trip.primaryDestinationCity}, {trip.primaryDestinationCountry}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={18} /> <span>Planned for {trip.durationDays} Days</span>
                        </div>
                    </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1fr 300px', gap: '6rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Full Itinerary</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {trip.itinerary?.days.map((day) => (
                                <div key={day.id} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div style={{ fontWeight: 800, fontSize: '1.5rem', opacity: 0.3 }}>{day.dayIndex}</div>
                                        <h3 style={{ fontSize: '1.25rem' }}>{day.title}</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {day.items.map((item) => (
                                            <div key={item.id} style={{ paddingLeft: '3rem', borderLeft: '1px solid var(--border)', position: 'relative' }}>
                                                <div style={{ position: 'absolute', left: '-5px', top: '8px', width: '9px', height: '9px', borderRadius: '50%', background: 'var(--accent)' }} />
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                    <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', textTransform: 'uppercase' }}>{item.timeBucket}</span>
                                                </div>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', position: 'sticky', top: '10rem' }}>
                            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Trip Summary</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--secondary)' }}>Budget</span>
                                    <span>${trip.roughBudgetUsd}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--secondary)' }}>Theme</span>
                                    <span>{trip.theme}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--secondary)' }}>Status</span>
                                    <span style={{ color: '#10b981', fontWeight: 600 }}>Draft</span>
                                </div>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                                Share Trip
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

function Zap({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    );
}
