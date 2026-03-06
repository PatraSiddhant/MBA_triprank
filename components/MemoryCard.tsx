"use client";

import { Star, Heart, Quote, MapPin, Utensils, Lightbulb } from "lucide-react";

export default function MemoryCard({ memory, tripName }: { memory: any, tripName: string }) {
    if (!memory) return null;

    return (
        <div className="glass animate-fade-in" style={{
            padding: '4rem',
            borderRadius: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.05)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
        }}>
            <Quote size={80} color="var(--accent)" style={{ position: 'absolute', top: '1rem', right: '2rem', opacity: 0.1 }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>The Legend of {tripName}</h2>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} fill={i < (memory.overallRating || 0) ? '#fbbf24' : 'transparent'} color={i < (memory.overallRating || 0) ? '#fbbf24' : 'rgba(255,255,255,0.1)'} />
                        ))}
                    </div>
                </div>
                {memory.wouldReturn && (
                    <div className="glass" style={{ padding: '0.75rem 1.5rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'rgba(255, 77, 77, 0.2)', background: 'rgba(255, 77, 77, 0.05)' }}>
                        <Heart size={16} fill="#ff4d4d" color="#ff4d4d" />
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ff4d4d' }}>Would Return</span>
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', height: 'fit-content' }}>
                        <Star size={24} color="var(--accent)" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', marginBottom: '0.5rem' }}>The Peak</div>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>{memory.highlightMoment}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', height: 'fit-content' }}>
                        <Utensils size={24} color="var(--accent)" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', marginBottom: '0.5rem' }}>The Taste</div>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>{memory.foodPick}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', height: 'fit-content' }}>
                        <MapPin size={24} color="var(--accent)" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', marginBottom: '0.5rem' }}>The Secret</div>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>{memory.hiddenGem}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', height: 'fit-content' }}>
                        <Lightbulb size={24} color="var(--accent)" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', marginBottom: '0.5rem' }}>The Wisdom</div>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>{memory.travelTip}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
