"use client";

import React, { useTransition } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from "react-simple-maps";
import { MapPin, Plus, Sparkles, Compass } from "lucide-react";
import { createCustomTripAction } from "@/lib/actions";
import Link from "next/link";

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/master/world-110m.json";

interface WorldMapProps {
    trips: any[];
}

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

export default function WorldMap({ trips }: WorldMapProps) {
    const [isPending, startTransition] = useTransition();

    const markers = trips.map(t => {
        const coords = CITY_COORDS[t.primaryDestinationCity] || { lat: 0, lng: 0 };
        return {
            ...t,
            coordinates: [coords.lng, coords.lat] as [number, number],
            hasCoords: !!CITY_COORDS[t.primaryDestinationCity]
        };
    }).filter(m => m.hasCoords);

    return (
        <div className="glass" style={{
            borderRadius: '2.5rem',
            overflow: 'hidden',
            marginBottom: '6rem',
            background: '#0a0c10', // Darker, premium foundation
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)'
        }}>
            {/* Map Header with Quick Actions */}
            <div style={{ padding: '2.5rem 3.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Compass size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Global Footprint</h3>
                    </div>
                    <p style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>A visual ledger of your legendary MBA expeditions.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link href="/discover" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
                        <Sparkles size={16} /> Explore Templates
                    </Link>
                    <button
                        onClick={() => startTransition(() => createCustomTripAction())}
                        disabled={isPending}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 800 }}
                    >
                        <Plus size={16} /> {isPending ? "Creating..." : "Design Custom Trek"}
                    </button>
                </div>
            </div>

            <div style={{ position: 'relative', width: '100%', height: '500px', padding: '1rem' }}>
                <ComposableMap
                    height={500}
                    projectionConfig={{
                        scale: 140,
                        rotate: [-10, 0, 0] // Centering a bit more naturally
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <ZoomableGroup zoom={1} minZoom={1} maxZoom={4}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }: { geographies: any[] }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#1c2128" // Dark land
                                        stroke="#2d333b" // Subtle borders
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: "#22272e", outline: "none" },
                                            pressed: { fill: "#2d333b", outline: "none" },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>

                        {markers.map((marker) => (
                            <Marker key={marker.id} coordinates={marker.coordinates}>
                                <g
                                    style={{ cursor: "pointer" }}
                                    onMouseEnter={(e) => {
                                        const dot = e.currentTarget.querySelector('.dot') as SVGCircleElement;
                                        const glow = e.currentTarget.querySelector('.glow') as SVGCircleElement;
                                        if (dot) dot.setAttribute('r', '8');
                                        if (glow) glow.setAttribute('r', '15');
                                    }}
                                    onMouseLeave={(e) => {
                                        const dot = e.currentTarget.querySelector('.dot') as SVGCircleElement;
                                        const glow = e.currentTarget.querySelector('.glow') as SVGCircleElement;
                                        if (dot) dot.setAttribute('r', '5');
                                        if (glow) glow.setAttribute('r', '10');
                                    }}
                                >
                                    <circle
                                        className="glow"
                                        r={10}
                                        fill={marker.status === 'completed' ? 'rgba(0, 204, 136, 0.4)' : 'rgba(59, 130, 246, 0.4)'}
                                        style={{ transition: 'r 0.3s' }}
                                    />
                                    <circle
                                        className="dot"
                                        r={5}
                                        fill={marker.status === 'completed' ? '#00cc88' : 'var(--accent)'}
                                        style={{ transition: 'r 0.3s' }}
                                    />
                                    <text
                                        textAnchor="middle"
                                        y={-15}
                                        style={{
                                            fontSize: "0.65rem",
                                            fontWeight: 800,
                                            fill: "rgba(255,255,255,0.7)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            pointerEvents: "none",
                                            paintOrder: "stroke",
                                            stroke: "#0a0c10",
                                            strokeWidth: 2,
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        }}
                                    >
                                        {marker.primaryDestinationCity}
                                    </text>
                                </g>
                            </Marker>
                        ))}
                    </ZoomableGroup>
                </ComposableMap>

                {/* Legend Overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    right: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '1.25rem',
                    background: 'rgba(10,12,16,0.8)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '1.25rem',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00cc88', boxShadow: '0 0 10px #00cc88' }} />
                        <span>Completed Legacy</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                        <span>Planned Expedition</span>
                    </div>
                </div>
            </div>

            <div style={{ padding: '2.5rem 3.5rem', background: 'rgba(255,255,255,0.02)', display: 'flex', gap: '6rem' }}>
                <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Global Reach</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>{trips.length} <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.5 }}>Expeditions</span></div>
                </div>
                <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Regions Unlocked</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>{new Set(trips.map(t => t.primaryDestinationCountry)).size} <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.5 }}>Countries</span></div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.5rem' }}>Status</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>Master Voyager</div>
                </div>
            </div>
        </div>
    );
}
