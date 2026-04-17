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
import { createCustomTripAction, createWorldMapTripAction } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
    const [showModal, setShowModal] = React.useState(false);
    const [country, setCountry] = React.useState("");
    const [citiesInput, setCitiesInput] = React.useState("");
    const [isExporting, setIsExporting] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const exportRef = React.useRef<HTMLDivElement>(null);
    const router = useRouter();

    const markers: any[] = [];
    trips.forEach(t => {
        let hasDynamicTags = false;
        if (t.tags && t.tags.startsWith('[')) {
            try {
                const parsed = JSON.parse(t.tags);
                if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].lat) {
                    hasDynamicTags = true;
                    parsed.forEach((c: any) => {
                        if (c.lat && c.lng) {
                            markers.push({
                                ...t,
                                tripId: t.id,
                                id: `${t.id}-${c.name}`,
                                primaryDestinationCity: c.name,
                                coordinates: [c.lng, c.lat] as [number, number],
                            });
                        }
                    });
                }
            } catch (e) { }
        }

        if (!hasDynamicTags) {
            const coords = CITY_COORDS[t.primaryDestinationCity];
            if (coords) {
                markers.push({
                    ...t,
                    tripId: t.id,
                    coordinates: [coords.lng, coords.lat] as [number, number],
                });
            }
        }
    });

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
                    geocodedCities.push({
                        name: city,
                        lat: parseFloat(data[0].lat),
                        lng: parseFloat(data[0].lon)
                    });
                } else {
                    // Fallback just pushing the name if coords fail
                    geocodedCities.push({ name: city, lat: 0, lng: 0 });
                }
            } catch (err) {
                geocodedCities.push({ name: city, lat: 0, lng: 0 });
            }
            // small delay to respect nominatim rate limits
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

    const handleExportIG = async () => {
        if (!exportRef.current) return;
        setIsExporting(true);
        try {
            const canvas = await html2canvas(exportRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#0a0c10',
            });
            const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
            const link = document.createElement("a");
            link.download = `my-global-footprint.jpg`;
            link.href = dataUrl;
            link.click();
        } catch (e) {
            console.error("Export failed", e);
        }
        setIsExporting(false);
    };

    // Prepare list of unique cities visited for the IG template
    const uniqueCities = Array.from(new Set(markers.map(m => m.primaryDestinationCity))).sort();

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

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button onClick={handleExportIG} disabled={isExporting} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
                        <Sparkles size={16} /> {isExporting ? "Exporting..." : "IG Story Export"}
                    </button>
                    <Link href="/discover" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
                        <Compass size={16} /> Explore Templates
                    </Link>
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 800 }}
                    >
                        <Plus size={16} /> Add Map Pin
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
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="rgba(255,255,255,0.15)"
                                        stroke="rgba(255,255,255,0.25)"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: "rgba(255,255,255,0.25)", outline: "none", transition: 'all 0.2s' },
                                            pressed: { fill: "rgba(var(--accent-rgb), 0.4)", outline: "none" },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>

                        {markers.map((marker) => (
                            <Marker key={marker.id} coordinates={marker.coordinates} onClick={() => router.push(`/journal/${marker.tripId}`)}>
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
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div className="glass" style={{ width: '400px', padding: '2rem', borderRadius: '1rem', position: 'relative' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>✕</button>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Add Trip to Map</h2>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Country</label>
                            <input
                                type="text"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                placeholder="e.g. Italy"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Cities Visited (comma-separated)</label>
                            <input
                                type="text"
                                value={citiesInput}
                                onChange={e => setCitiesInput(e.target.value)}
                                placeholder="e.g. Rome, Florence, Venice"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                            />
                        </div>

                        <button
                            onClick={handleAddMapTrip}
                            disabled={isSubmitting || isPending || !country || !citiesInput}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontWeight: 800, opacity: (isSubmitting || isPending) ? 0.7 : 1 }}
                        >
                            {isSubmitting ? "Finding Coordinates..." : isPending ? "Saving..." : "Pin on Map"}
                        </button>
                    </div>
                </div>
            )}

            {/* Hidden IG Export 9:16 Frame */}
            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                <div ref={exportRef} style={{
                    width: '1080px',
                    height: '1920px',
                    backgroundColor: '#0a0c10',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '4rem',
                    boxSizing: 'border-box',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fbbf24', marginBottom: '2rem' }}>
                        <Compass size={60} />
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>My Global Footprint</h1>
                    </div>

                    <div style={{ flex: 1, width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-10vh' }}>
                        <ComposableMap projectionConfig={{ scale: 300 }} style={{ width: '100%', height: '100%' }}>
                            <ZoomableGroup zoom={1} center={[0, 0]}>
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) => geographies.map(geo => (
                                        <Geography key={geo.rsmKey} geography={geo} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth={0.5} />
                                    ))}
                                </Geographies>
                                {markers.map(marker => (
                                    <Marker key={`export-${marker.id}`} coordinates={marker.coordinates}>
                                        <circle r={10} fill={marker.status === 'completed' ? '#00cc88' : 'var(--accent)'} />
                                    </Marker>
                                ))}
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>

                    <div style={{
                        marginTop: 'auto',
                        padding: '3rem',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '2rem',
                        width: '100%',
                        textAlign: 'center',
                        zIndex: 10
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Cities Visited</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                            {uniqueCities.map(city => (
                                <span key={city} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem 2rem', borderRadius: '100px', fontSize: '1.75rem', color: '#fff', fontWeight: 700 }}>
                                    {city}
                                </span>
                            ))}
                            {uniqueCities.length === 0 && <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.5rem' }}>No cities tracked yet.</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
