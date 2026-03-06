"use client";

import { TripTemplate } from "@/data/trip-templates";
import { Info, MapPin, Clock, DollarSign } from "lucide-react";

interface RankingCardProps {
    trip: TripTemplate;
    onSelect: () => void;
    onViewDetail: () => void;
}

export default function RankingCard({ trip, onSelect, onViewDetail }: RankingCardProps) {
    return (
        <div
            onClick={onSelect}
            className="glass animate-fade-in card-hover"
            style={{
                cursor: 'pointer',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
            }}
        >
            {/* Info Button - Essential for mobile */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onViewDetail();
                }}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 20,
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    padding: '0.75rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    cursor: 'pointer'
                }}
                aria-label="View Details"
            >
                <Info size={20} />
            </button>

            <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                <img
                    src={trip.photos[0].path}
                    alt={trip.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '2rem 1.5rem 1rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{trip.title}</h3>
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: 'var(--secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{trip.summary}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontSize: '0.85rem' }}>
                        <MapPin size={16} /> <span>{trip.primaryDestinationCity}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontSize: '0.85rem' }}>
                        <Clock size={16} /> <span>{trip.durationDays} Days</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 700 }}>
                        <DollarSign size={16} /> <span>${trip.roughBudgetUsd}+</span>
                    </div>
                </div>

                <div className="mobile-only" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--secondary)', fontStyle: 'italic' }}>
                    Tap to rank, info icon for details
                </div>
            </div>

            <style jsx>{`
                .card-hover:hover {
                    border-color: var(--accent) !important;
                    transform: translateY(-4px);
                    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
                }
                @media (max-width: 768px) {
                    .card-hover {
                        min-height: 350px;
                    }
                }
            `}</style>
        </div>
    );
}
