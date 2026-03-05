"use client";

import { TripTemplate } from "@/data/trip-templates";

export default function RankingCard({
    trip, onSelect, onContextMenu, side
}: {
    trip: TripTemplate;
    onSelect: () => void;
    onContextMenu: (trip: TripTemplate) => void;
    side: 'left' | 'right';
}) {
    return (
        <div
            className="glass card image-zoom-container animate-fade-in"
            style={{
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                flex: 1,
                minHeight: '600px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                userSelect: 'none'
            }}
            onClick={onSelect}
            onContextMenu={(e) => {
                e.preventDefault();
                onContextMenu(trip);
            }}
        >
            <div style={{ position: 'relative', height: '100%', minHeight: '400px' }}>
                <img
                    src={trip.photos[0].path}
                    alt={trip.photos[0].alt}
                    className="image-zoom"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />

                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '3rem'
                }}>
                    <span
                        style={{
                            fontSize: '0.875rem',
                            color: 'var(--accent)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '1rem'
                        }}
                    >
                        {trip.theme}
                    </span>
                    <h2 style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '1.5rem' }}>{trip.title}</h2>
                    <p style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {trip.summary}
                    </p>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                            <div style={{ color: 'var(--secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Duration</div>
                            <div style={{ fontWeight: 600 }}>{trip.durationDays} Days</div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Budget</div>
                            <div style={{ fontWeight: 600 }}>${trip.roughBudgetUsd}+</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '1.5rem',
                textAlign: 'center',
                borderTop: '1px solid var(--border)',
                fontWeight: 600,
                color: 'var(--secondary)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
            }}>
                Select this trip • Right click for itinerary
            </div>
        </div>
    );
}
