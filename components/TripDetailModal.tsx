"use client";

import { TripTemplate } from "@/data/trip-templates";

export default function TripDetailModal({ trip, onClose }: { trip: TripTemplate; onClose: () => void }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }} onClick={onClose}>
            <div
                style={{
                    background: 'var(--bg)',
                    maxWidth: '800px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    padding: '2rem',
                    position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
                className="animate-fade-in"
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem', right: '1rem',
                        background: 'none', border: 'none', color: 'var(--secondary)',
                        fontSize: '1.5rem', cursor: 'pointer'
                    }}
                >
                    ✕
                </button>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{trip.title}</h1>
                <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>{trip.summary}</p>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Full Itinerary</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {trip.days.map(day => (
                        <div key={day.dayIndex} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Day {day.dayIndex}: {day.title}</h3>
                            {day.items.map((item, idx) => (
                                <div key={idx} style={{ marginBottom: '0.5rem' }}>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--secondary)', textTransform: 'uppercase' }}>{item.timeBucket}</div>
                                    <div>{item.title}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                            <div style={{ color: 'var(--secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Theme</div>
                            <div style={{ fontWeight: 600 }}>{trip.theme}</div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Budget</div>
                            <div style={{ fontWeight: 600 }}>${trip.roughBudgetUsd}+</div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Vibe</div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {trip.vibes.slice(0, 3).map(v => (
                                    <span key={v} style={{ opacity: 0.6 }}>#{v}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
