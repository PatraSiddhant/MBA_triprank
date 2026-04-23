"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import createGlobe from "cobe";
import { Navigation, Plus, Globe2, Map } from "lucide-react";
import { useRouter } from "next/navigation";
import { createWorldMapTripAction } from "@/lib/actions";
import OpenStreetMapView from "@/components/OpenStreetMapView";

interface WorldMapProps {
    trips: any[];
}

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
    Medellin: { lat: 6.2442, lng: -75.5812 },
    Cartagena: { lat: 10.391, lng: -75.4794 },
    Tokyo: { lat: 35.6762, lng: 139.6503 },
    Kyoto: { lat: 35.0116, lng: 135.7681 },
    "Mexico City": { lat: 19.4326, lng: -99.1332 },
    Tulum: { lat: 20.2114, lng: -87.4654 },
    Paris: { lat: 48.8566, lng: 2.3522 },
    Nice: { lat: 43.7102, lng: 7.262 },
    Reykjavik: { lat: 64.1466, lng: -21.9426 },
    "Cape Town": { lat: -33.9249, lng: 18.4241 },
    Nairobi: { lat: -1.2921, lng: 36.8219 },
    Seoul: { lat: 37.5665, lng: 126.978 },
    Bangkok: { lat: 13.7563, lng: 100.5018 },
    Bali: { lat: -8.4095, lng: 115.1889 },
    Phuket: { lat: 7.8804, lng: 98.3923 },
    London: { lat: 51.5074, lng: -0.1278 },
    Barcelona: { lat: 41.3851, lng: 2.1734 },
    Lisbon: { lat: 38.7223, lng: -9.1393 },
    Istanbul: { lat: 41.0082, lng: 28.9784 },
    Dubai: { lat: 25.2048, lng: 55.2708 },
    Marrakesh: { lat: 31.6295, lng: -7.9811 },
    "New York": { lat: 40.7128, lng: -74.006 },
    "San Francisco": { lat: 37.7749, lng: -122.4194 },
    "Los Angeles": { lat: 34.0522, lng: -118.2437 },
    Chicago: { lat: 41.8781, lng: -87.6298 },
    Austin: { lat: 30.2672, lng: -97.7431 },
    Seattle: { lat: 47.6062, lng: -122.3321 },
    Vail: { lat: 39.6403, lng: -106.3742 },
    Aspen: { lat: 39.1911, lng: -106.8175 },
    "Costa Rica": { lat: 9.7489, lng: -83.7534 },
    "Santo Domingo": { lat: 18.4861, lng: -69.9312 },
    Lima: { lat: -12.0464, lng: -77.0428 },
    "Buenos Aires": { lat: -34.6037, lng: -58.3816 },
    Singapore: { lat: 1.3521, lng: 103.8198 },
    "Ho Chi Minh": { lat: 10.8231, lng: 106.6297 },
    Hanoi: { lat: 21.0285, lng: 105.8542 },
};

type MapMode = "globe" | "osm";

export default function WorldMap({ trips }: WorldMapProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);
    const [country, setCountry] = useState("");
    const [citiesInput, setCitiesInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mapMode, setMapMode] = useState<MapMode>("globe");

    // Build globe markers
    const markerData: { location: [number, number]; size: number }[] = [];
    const osmMarkers: { lat: number; lng: number; label: string; country: string; status?: string }[] = [];

    trips.forEach((t) => {
        let hasDynamicTags = false;
        if (t.tags && t.tags.startsWith("[")) {
            try {
                const parsed = JSON.parse(t.tags);
                if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].lat) {
                    hasDynamicTags = true;
                    parsed.forEach((c: any) => {
                        if (c.lat && c.lng) {
                            markerData.push({ location: [c.lat, c.lng], size: 0.06 });
                            osmMarkers.push({ lat: c.lat, lng: c.lng, label: c.name || t.name, country: t.primaryDestinationCountry, status: t.status });
                        }
                    });
                }
            } catch {}
        }

        if (!hasDynamicTags) {
            const coords = CITY_COORDS[t.primaryDestinationCity];
            if (coords) {
                markerData.push({ location: [coords.lat, coords.lng], size: 0.08 });
                osmMarkers.push({ lat: coords.lat, lng: coords.lng, label: t.primaryDestinationCity, country: t.primaryDestinationCountry, status: t.status });
            }
        }
    });

    useEffect(() => {
        if (mapMode !== "globe") return;
        let phi = 0;
        let globe: any = null;
        if (canvasRef.current) {
            globe = createGlobe(canvasRef.current, {
                devicePixelRatio: 2,
                width: 900,
                height: 900,
                phi: 0,
                theta: 0.2,
                dark: 0,
                diffuse: 1.2,
                mapSamples: 24000,
                mapBrightness: 4,
                baseColor: [0.93, 0.93, 0.93],
                markerColor: [0.23, 0.51, 0.96],
                glowColor: [1, 1, 1],
                markers: markerData,
                onRender: (state: any) => {
                    state.phi = phi;
                    phi += 0.003;
                },
            });
        }
        return () => { if (globe) globe.destroy(); };
    }, [mapMode, markerData.length]);

    const handleAddMapTrip = async () => {
        if (!country || !citiesInput) return;
        setIsSubmitting(true);
        const cityNames = citiesInput.split(",").map((c) => c.trim()).filter(Boolean);
        const geocodedCities: { name: string; lat: number; lng: number }[] = [];

        for (const city of cityNames) {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&format=json&limit=1`
                );
                const data = await res.json();
                if (data?.length > 0) {
                    geocodedCities.push({ name: city, lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
                }
            } catch {}
            await new Promise((r) => setTimeout(r, 600));
        }

        startTransition(async () => {
            const tripId = await createWorldMapTripAction(country, geocodedCities.filter((c) => c.lat !== 0));
            setShowModal(false);
            setCountry("");
            setCitiesInput("");
            setIsSubmitting(false);
            router.push(`/journal/${tripId}`);
        });
    };

    const completedCount = trips.filter((t) => t.status === "completed").length;
    const countryCount = new Set(trips.map((t) => t.primaryDestinationCountry)).size;

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                borderRadius: "2rem",
                overflow: "hidden",
                marginBottom: "3rem",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(16px)",
            }}
        >
            {/* Header bar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 1.5rem",
                    borderBottom: "1px solid var(--border)",
                    gap: "1rem",
                    flexWrap: "wrap",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Navigation size={18} color="var(--accent)" />
                    <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: 0, color: "var(--fg-0)" }}>
                            Global Footprint
                        </h3>
                        <p style={{ color: "var(--fg-3)", fontSize: "0.75rem", margin: 0 }}>
                            {trips.length} expedition{trips.length !== 1 ? "s" : ""} · {countryCount} countr{countryCount !== 1 ? "ies" : "y"}
                        </p>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {/* Map mode toggle */}
                    <div
                        style={{
                            display: "inline-flex",
                            background: "var(--glass-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: "100px",
                            padding: "3px",
                            gap: "2px",
                        }}
                    >
                        {([["globe", Globe2, "Globe"], ["osm", Map, "Street Map"]] as const).map(([mode, Icon, label]) => (
                            <button
                                key={mode}
                                onClick={() => setMapMode(mode)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    padding: "0.35rem 0.85rem",
                                    borderRadius: "100px",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                    transition: "all 0.2s",
                                    background: mapMode === mode ? "rgba(var(--accent-rgb), 0.12)" : "transparent",
                                    color: mapMode === mode ? "var(--accent)" : "var(--fg-2)",
                                }}
                            >
                                <Icon size={13} /> {label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            background: "var(--accent)",
                            color: "#fff",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "100px",
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                    >
                        <Plus size={15} /> New Pin
                    </button>
                </div>
            </div>

            {/* Map content */}
            <div style={{ padding: "0", minHeight: "420px" }}>
                {mapMode === "globe" ? (
                    <div
                        style={{
                            height: "420px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #fdfdfd 0%, #f0f2f5 100%)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div style={{ width: "450px", height: "450px", position: "absolute" }}>
                            <canvas
                                ref={canvasRef}
                                style={{ width: "100%", height: "100%", opacity: 1 }}
                            />
                        </div>
                        {/* Stats overlay */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "1.5rem",
                                left: "1.5rem",
                                display: "flex",
                                gap: "0.75rem",
                                zIndex: 10,
                            }}
                        >
                            {[
                                { label: "Expeditions", value: trips.length },
                                { label: "Countries", value: countryCount },
                                { label: "Completed", value: completedCount },
                            ].map(({ label, value }) => (
                                <div
                                    key={label}
                                    style={{
                                        background: "rgba(255,255,255,0.85)",
                                        backdropFilter: "blur(16px)",
                                        padding: "0.75rem 1rem",
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(0,0,0,0.06)",
                                        minWidth: "90px",
                                    }}
                                >
                                    <div style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", marginBottom: "2px" }}>
                                        {label}
                                    </div>
                                    <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#000", lineHeight: 1 }}>
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: "1rem" }}>
                        <OpenStreetMapView markers={osmMarkers} height="420px" />
                        {/* OSM Legend */}
                        <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem", flexWrap: "wrap", padding: "0 0.25rem" }}>
                            {[
                                { color: "#22C55E", label: "Completed" },
                                { color: "#3B82F6", label: "Booked" },
                                { color: "#F59E0B", label: "Planning" },
                            ].map(({ color, label }) => (
                                <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }} />
                                    <span style={{ fontSize: "0.75rem", color: "var(--fg-2)", fontWeight: 600 }}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(12px)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                    }}
                >
                    <div
                        className="glass-strong"
                        style={{
                            width: "100%",
                            maxWidth: "420px",
                            padding: "2rem",
                            borderRadius: "1.75rem",
                            position: "relative",
                        }}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: "absolute",
                                top: "1.25rem",
                                right: "1.25rem",
                                background: "var(--glass-bg)",
                                border: "1px solid var(--border)",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                color: "var(--fg-0)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1rem",
                            }}
                        >
                            ✕
                        </button>

                        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.25rem", fontWeight: 800, color: "var(--fg-0)" }}>
                            Drop a New Pin
                        </h2>
                        <p style={{ fontSize: "0.85rem", color: "var(--fg-3)", marginBottom: "1.75rem" }}>
                            We&apos;ll geocode your cities via OpenStreetMap.
                        </p>

                        <div style={{ marginBottom: "1.25rem" }}>
                            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--fg-2)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Country
                            </label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="e.g. Italy"
                                style={{
                                    width: "100%",
                                    padding: "0.875rem 1rem",
                                    borderRadius: "0.875rem",
                                    fontSize: "0.95rem",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "1.75rem" }}>
                            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--fg-2)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                Cities Visited
                            </label>
                            <input
                                type="text"
                                value={citiesInput}
                                onChange={(e) => setCitiesInput(e.target.value)}
                                placeholder="e.g. Rome, Florence, Venice"
                                style={{
                                    width: "100%",
                                    padding: "0.875rem 1rem",
                                    borderRadius: "0.875rem",
                                    fontSize: "0.95rem",
                                }}
                            />
                            <p style={{ fontSize: "0.75rem", color: "var(--fg-3)", marginTop: "0.4rem" }}>
                                Separate multiple cities with commas
                            </p>
                        </div>

                        <button
                            onClick={handleAddMapTrip}
                            disabled={isSubmitting || isPending || !country || !citiesInput}
                            style={{
                                width: "100%",
                                padding: "0.875rem",
                                fontWeight: 800,
                                opacity: isSubmitting || isPending ? 0.7 : 1,
                                background: "var(--accent)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "100px",
                                cursor: "pointer",
                                fontSize: "0.95rem",
                                transition: "opacity 0.2s",
                            }}
                        >
                            {isSubmitting ? "Geocoding via OSM…" : isPending ? "Saving…" : "Pin on Map"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
