"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import createGlobe from "cobe";
import { Compass, Sparkles, Plus, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import { createWorldMapTripAction } from "@/lib/actions";

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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);
    const [country, setCountry] = useState("");
    const [citiesInput, setCitiesInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Extract all map markers from trips
    const markerData: { location: [number, number], size: number }[] = [];
    trips.forEach(t => {
        let hasDynamicTags = false;
        if (t.tags && t.tags.startsWith('[')) {
            try {
                const parsed = JSON.parse(t.tags);
                if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].lat) {
                    hasDynamicTags = true;
                    parsed.forEach((c: any) => {
                        if (c.lat && c.lng) {
                            markerData.push({ location: [c.lat, c.lng], size: 0.05 });
                        }
                    });
                }
            } catch (e) { }
        }

        if (!hasDynamicTags) {
            const coords = CITY_COORDS[t.primaryDestinationCity];
            if (coords) {
                markerData.push({ location: [coords.lat, coords.lng], size: 0.1 });
            }
        }
    });

    useEffect(() => {
        let phi = 0;
        let globe: any = null;
        
        if (canvasRef.current) {
            const options: any = {
                devicePixelRatio: 2,
                width: 1200,
                height: 1200,
                phi: 0,
                theta: 0.2, // slightly tilted
                dark: 0, // 0 for light theme
                diffuse: 1.2,
                mapSamples: 24000,
                mapBrightness: 4,
                baseColor: [0.93, 0.93, 0.93],
                markerColor: [0.0, 0.44, 0.95], // bright clean blue
                glowColor: [1, 1, 1], // white glow for clean look
                markers: markerData,
                onRender: (state: any) => {
                    // Auto-spin logic
                    state.phi = phi;
                    phi += 0.003;
                }
            };
            globe = createGlobe(canvasRef.current, options);
        }

        return () => {
            if (globe) globe.destroy();
        };
    }, [markerData]);

    const handleAddMapTrip = async () => {
        if (!country || !citiesInput) return;
        setIsSubmitting(true);
        const cityNames = citiesInput.split(',').map(c => c.trim()).filter(Boolean);
        const geocodedCities: { name: string, lat: number, lng: number }[] = [];

        for (const city of cityNames) {
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&format=json&limit=1`);
                const data = await res.json();
                if (data && data.length > 0) {
                    geocodedCities.push({ name: city, lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
                } else {
                    geocodedCities.push({ name: city, lat: 0, lng: 0 });
                }
            } catch (err) {
                geocodedCities.push({ name: city, lat: 0, lng: 0 });
            }
            await new Promise(r => setTimeout(r, 600));
        }

        startTransition(async () => {
            const tripId = await createWorldMapTripAction(country, geocodedCities.filter(c => c.lat !== 0));
            setShowModal(false);
            setCountry("");
            setCitiesInput("");
            setIsSubmitting(false);
            router.push(`/journal/${tripId}`);
        });
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '650px',
            borderRadius: '2.5rem',
            overflow: 'hidden',
            marginBottom: '4rem',
            background: 'linear-gradient(135deg, #fdfdfd 0%, #f0f2f5 100%)', // Apple-like soft background
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* The Globe Canvas */}
            <div style={{ position: 'absolute', top: '-10%', width: '600px', height: '600px', zIndex: 1 }}>
                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '100%', opacity: 1, transition: 'opacity 1s ease' }}
                />
            </div>

            {/* Overlays / UI */}
            <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                pointerEvents: 'none', 
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.8)', 
                        backdropFilter: 'blur(20px)', 
                        padding: '1rem 1.5rem', 
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(0,0,0,0.05)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                        pointerEvents: 'auto'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <Navigation size={18} color="var(--accent)" />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#000', margin: 0 }}>Global Footprint</h3>
                        </div>
                        <p style={{ color: '#666', fontSize: '0.875rem', fontWeight: 500, margin: 0 }}>Your legacy across borders.</p>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            background: '#000', // Apple clean button
                            color: '#fff',
                            border: 'none',
                            padding: '1rem 1.5rem',
                            borderRadius: '100px',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Plus size={18} /> New Pin
                    </button>
                </div>

                {/* Floating Stats */}
                <div style={{ display: 'flex', gap: '1rem', alignSelf: 'flex-start', pointerEvents: 'auto' }}>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.8)', 
                        backdropFilter: 'blur(20px)', 
                        padding: '1.5rem', 
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(0,0,0,0.05)',
                        minWidth: '160px'
                    }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Expeditions</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#000', lineHeight: 1 }}>{trips.length}</div>
                    </div>
                    <div style={{ 
                        background: 'rgba(255,255,255,0.8)', 
                        backdropFilter: 'blur(20px)', 
                        padding: '1.5rem', 
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(0,0,0,0.05)',
                        minWidth: '160px'
                    }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Countries</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#000', lineHeight: 1 }}>
                            {new Set(trips.map(t => t.primaryDestinationCountry)).size}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ 
                        background: '#fff', 
                        width: '400px', 
                        padding: '2.5rem', 
                        borderRadius: '2rem', 
                        position: 'relative',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
                    }}>
                        <button 
                            onClick={() => setShowModal(false)} 
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--bg-1)', border: 'none', width: '32px', height: '32px', borderRadius: '16px', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >✕</button>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 800, color: '#000' }}>Drop a New Pin</h2>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666', fontWeight: 600 }}>Country</label>
                            <input
                                type="text"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                placeholder="e.g. Italy"
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--bg-1)', border: '1px solid rgba(0,0,0,0.05)', color: '#000', outline: 'none' }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666', fontWeight: 600 }}>Cities Visited (comma-separated)</label>
                            <input
                                type="text"
                                value={citiesInput}
                                onChange={e => setCitiesInput(e.target.value)}
                                placeholder="e.g. Rome, Florence, Venice"
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--bg-1)', border: '1px solid rgba(0,0,0,0.05)', color: '#000', outline: 'none' }}
                            />
                        </div>

                        <button
                            onClick={handleAddMapTrip}
                            disabled={isSubmitting || isPending || !country || !citiesInput}
                            style={{ 
                                width: '100%', 
                                padding: '1rem', 
                                fontWeight: 800, 
                                opacity: (isSubmitting || isPending) ? 0.7 : 1,
                                background: 'var(--accent)',
                                color: '#000',
                                border: 'none',
                                borderRadius: '100px',
                                cursor: 'pointer'
                            }}
                        >
                            {isSubmitting ? "Finding Coordinates..." : isPending ? "Saving..." : "Pin on Map"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
