"use client";

import { MapPin } from "lucide-react";

interface CityPoint {
    name: string;
    city: string;
    country: string;
    status: 'planning' | 'booked' | 'completed';
    lat?: number;
    lng?: number;
}

// Simple approximation for lat/lng based on city names in the DB
// In a real app, this would come from a geocoding API
const CITY_COORDS: Record<string, { lat: number, lng: number }> = {
    "Medellin": { lat: 6.2442, lng: -75.5812 },
    "Cartagena": { lat: 10.3910, lng: -75.4794 },
    "Tokyo": { lat: 35.6762, lng: 139.6503 },
    "Kyoto": { lat: 35.0116, lng: 135.7681 },
    "Mexico City": { lat: 19.4326, lng: -99.1332 },
    "Tulum": { lat: 20.2114, lng: -87.4654 },
    "Paris": { lat: 48.8566, lng: 2.3522 },
    "Nice": { lat: 43.7102, lng: 7.2620 },
    "Reykjavik": { lat: 64.1466, lng: -21.9426 },
    "Cape Town": { lat: -33.9249, lng: 18.4241 },
    "Nairobi": { lat: -1.2921, lng: 36.8219 },
    "Seoul": { lat: 37.5665, lng: 126.9780 },
    "Bangkok": { lat: 13.7563, lng: 100.5018 },
    "Bali": { lat: -8.4095, lng: 115.1889 },
    "Phuket": { lat: 7.8804, lng: 98.3923 },
    "London": { lat: 51.5074, lng: -0.1278 },
    "Barcelona": { lat: 41.3851, lng: 2.1734 },
    "Lisbon": { lat: 38.7223, lng: -9.1393 },
    "Istanbul": { lat: 41.0082, lng: 28.9784 },
    "Dubai": { lat: 25.2048, lng: 55.2708 },
    "Marrakesh": { lat: 31.6295, lng: -7.9811 },
    "New York": { lat: 40.7128, lng: -74.0060 },
    "San Francisco": { lat: 37.7749, lng: -122.4194 },
    "Los Angeles": { lat: 34.0522, lng: -118.2437 },
    "Chicago": { lat: 41.8781, lng: -87.6298 },
    "Austin": { lat: 30.2672, lng: -97.7431 },
    "Seattle": { lat: 47.6062, lng: -122.3321 },
    "Vail": { lat: 39.6403, lng: -106.3742 },
    "Aspen": { lat: 39.1911, lng: -106.8175 }
};

export default function WorldMap({ trips }: { trips: any[] }) {
    // Map projection: Equirectangular
    // x = (lng + 180) * (width / 360)
    // y = (90 - lat) * (height / 180)

    const width = 1000;
    const height = 500;

    const points = trips.map(t => {
        const coords = CITY_COORDS[t.primaryDestinationCity] || { lat: 0, lng: 0 };
        return {
            ...t,
            x: (coords.lng + 180) * (width / 360),
            y: (90 - coords.lat) * (height / 180),
            hasCoords: !!CITY_COORDS[t.primaryDestinationCity]
        };
    }).filter(p => p.hasCoords);

    return (
        <div className="glass" style={{
            borderRadius: '2rem',
            overflow: 'hidden',
            marginBottom: '6rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{ padding: '2rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Global Footprint</h3>
                    <p style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>Visualizing the legendary treks you've conquered and planned.</p>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00cc88' }} /> Completed
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} /> Booked/Planning
                    </div>
                </div>
            </div>

            <div style={{ position: 'relative', width: '100%', aspectRatio: '2/1', padding: '2rem' }}>
                {/* Simplified World SVG background */}
                <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', opacity: 0.1 }}>
                    <path d="M150,150 L850,150 L850,350 L150,350 Z" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="5,5" />
                    {/* Just a very abstract representation to avoid massive path data */}
                    <text x="500" y="250" fontSize="120" fill="white" textAnchor="middle" style={{ opacity: 0.2, fontWeight: 900 }}>EARTH</text>
                </svg>

                {/* City Points */}
                {points.map((p, i) => (
                    <div
                        key={p.id}
                        className="animate-fade-in"
                        style={{
                            position: 'absolute',
                            left: `${(p.x / width) * 100}%`,
                            top: `${(p.y / height) * 100}%`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10
                        }}
                    >
                        <div style={{
                            width: p.status === 'completed' ? '12px' : '10px',
                            height: p.status === 'completed' ? '12px' : '10px',
                            borderRadius: '50%',
                            background: p.status === 'completed' ? '#00cc88' : 'var(--accent)',
                            boxShadow: `0 0 15px ${p.status === 'completed' ? '#00cc88' : 'var(--accent)'}`,
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                            title={`${p.name} (${p.primaryDestinationCity})`}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(2)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />

                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                            fontSize: '0.6rem',
                            fontWeight: 800,
                            marginTop: '0.5rem',
                            opacity: 0.6
                        }}>
                            {p.primaryDestinationCity}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ padding: '2rem 3rem', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '4rem' }}>
                <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Total Expeditions</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{trips.length}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Regions Explored</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{new Set(trips.map(t => t.primaryDestinationCountry)).size}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Memories Recorded</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{trips.filter(t => t.status === 'completed').length}</div>
                </div>
            </div>
        </div>
    );
}
