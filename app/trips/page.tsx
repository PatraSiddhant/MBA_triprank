import prisma from "@/lib/prisma";

export default async function UserTripsIndex() {
    let trips: any[] = [];
    try {
        trips = await prisma.tripCandidate.findMany({
            orderBy: { createdAt: 'desc' },
            include: { itinerary: true }
        });
    } catch (e) {
        console.error("Prisma error:", e);
    }

    return (
        <div style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <div className="container">
                <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>My Trip Plans</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.25rem' }}>
                        Manage and refine your upcoming MBA treks.
                    </p>
                </header>

                {trips.length === 0 ? (
                    <div className="glass" style={{ padding: '4rem', textAlign: 'center', borderRadius: 'var(--radius)' }}>
                        <h2 style={{ marginBottom: '1rem' }}>No trips yet</h2>
                        <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>
                            Go to the Discover page to clone a template or start planning from scratch.
                        </p>
                        <a href="/discover" className="btn btn-primary">Browse Templates</a>
                    </div>
                ) : (
                    <div className="grid">
                        {trips.map((trip) => (
                            <div key={trip.id} className="glass card animate-fade-in" style={{
                                padding: '2rem',
                                borderRadius: 'var(--radius)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                        My Plan
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{trip.name}</h3>
                                    <p style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>
                                        {trip.primaryDestinationCity}, {trip.primaryDestinationCountry}
                                    </p>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ opacity: 0.5, fontSize: '0.75rem' }}>Duration</div>
                                        <div>{trip.durationDays} Days</div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ opacity: 0.5, fontSize: '0.75rem' }}>Budget</div>
                                        <div>${trip.roughBudgetUsd}</div>
                                    </div>
                                </div>

                                <a href={`/trips/${trip.id}`} className="btn btn-secondary" style={{ width: '100%' }}>
                                    Open Itinerary
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
