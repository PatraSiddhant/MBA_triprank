"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface MarkerData {
    lat: number;
    lng: number;
    label: string;
    country: string;
    status?: string;
}

interface OpenStreetMapViewProps {
    markers: MarkerData[];
    height?: string;
}

const STATUS_COLORS: Record<string, string> = {
    completed: "#22C55E",
    booked: "#3B82F6",
    planning: "#F59E0B",
};

export default function OpenStreetMapView({ markers, height = "480px" }: OpenStreetMapViewProps) {
    const mapRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !containerRef.current) return;
        if (mapInstanceRef.current) return; // already initialized

        // Dynamically import leaflet (client only)
        import("leaflet").then((L) => {
            // Fix default marker icon paths for Next.js
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
                iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
                shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            });

            if (mapInstanceRef.current || !containerRef.current) return;

            // Center map on markers or default world view
            const center: [number, number] =
                markers.length > 0
                    ? [
                          markers.reduce((s, m) => s + m.lat, 0) / markers.length,
                          markers.reduce((s, m) => s + m.lng, 0) / markers.length,
                      ]
                    : [20, 0];

            const zoom = markers.length === 0 ? 2 : markers.length === 1 ? 6 : 3;

            const map = L.map(containerRef.current, {
                center,
                zoom,
                zoomControl: true,
                scrollWheelZoom: false,
                attributionControl: true,
            });

            // OpenStreetMap tiles
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }).addTo(map);

            // Add markers
            markers.forEach((m) => {
                const color = STATUS_COLORS[m.status ?? "planning"];

                const icon = L.divIcon({
                    html: `
                        <div style="
                            width:36px;height:36px;
                            background:${color};
                            border-radius:50% 50% 50% 0;
                            transform:rotate(-45deg);
                            border:3px solid white;
                            box-shadow:0 4px 12px rgba(0,0,0,0.25);
                            display:flex;align-items:center;justify-content:center;
                        ">
                            <div style="
                                width:10px;height:10px;
                                background:white;
                                border-radius:50%;
                                transform:rotate(45deg);
                            "></div>
                        </div>`,
                    className: "",
                    iconSize: [36, 36],
                    iconAnchor: [18, 36],
                    popupAnchor: [0, -40],
                });

                const popup = L.popup({
                    closeButton: false,
                    className: "trek-popup",
                }).setContent(`
                    <div style="
                        padding:0.75rem 1rem;
                        min-width:160px;
                        font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;
                    ">
                        <div style="
                            display:flex;align-items:center;gap:0.4rem;
                            margin-bottom:0.25rem;
                        ">
                            <div style="
                                width:8px;height:8px;border-radius:50%;
                                background:${color};flex-shrink:0;
                            "></div>
                            <span style="
                                font-size:0.65rem;font-weight:700;
                                text-transform:uppercase;letter-spacing:0.08em;
                                color:${color};
                            ">${m.status ?? "planning"}</span>
                        </div>
                        <div style="font-size:0.95rem;font-weight:700;">${m.label}</div>
                        <div style="font-size:0.8rem;color:#888;margin-top:2px;">${m.country}</div>
                    </div>
                `);

                L.marker([m.lat, m.lng], { icon }).addTo(map).bindPopup(popup);
            });

            mapInstanceRef.current = map;
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // only run once

    // Update markers when they change
    useEffect(() => {
        if (!mapInstanceRef.current || markers.length === 0) return;
        // Re-fit bounds when markers update
        import("leaflet").then((L) => {
            if (!mapInstanceRef.current) return;
            const bounds = markers.map((m) => [m.lat, m.lng] as [number, number]);
            if (bounds.length > 0) {
                mapInstanceRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 });
            }
        });
    }, [markers]);

    return (
        <div style={{ position: "relative", width: "100%", height, borderRadius: "1.5rem", overflow: "hidden" }}>
            {/* Leaflet CSS */}
            <style>{`
                @import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css');
                .trek-popup .leaflet-popup-content-wrapper {
                    padding: 0 !important;
                    border-radius: 1rem !important;
                    overflow: hidden;
                }
                .trek-popup .leaflet-popup-content {
                    margin: 0 !important;
                }
            `}</style>

            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
            />

            <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

            {markers.length === 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.75rem",
                        background: "var(--glass-bg)",
                        backdropFilter: "blur(8px)",
                        zIndex: 500,
                    }}
                >
                    <MapPin size={40} color="var(--fg-3)" />
                    <p style={{ color: "var(--fg-2)", fontWeight: 600 }}>
                        No trips pinned yet
                    </p>
                </div>
            )}
        </div>
    );
}
