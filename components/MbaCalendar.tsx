"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { TripTemplate } from "@/data/trip-templates";
import { Sparkles } from "lucide-react";
import { useToast } from "@/components/Toast";

const CALENDAR_STORAGE_KEY = "mba_calendar_v1";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface RankedTrip extends TripTemplate {
    rank: number;
    score: number;
    wins: number;
    losses: number;
}

interface CalendarPeriod {
    id: string;
    name: string;
    dates: string;
    type: string;
    description: string;
    isBlocked: boolean;
    trip: RankedTrip | null;
}

const INITIAL_PERIODS: CalendarPeriod[] = [
    {
        id: "pre-internship",
        name: "Pre-Internship",
        dates: "Late May 2026",
        type: "Leisure / Social",
        description: "A small window between finals and internship start for 'Pre-Tern' trips.",
        isBlocked: false,
        trip: null,
    },
    {
        id: "summer-intern",
        name: "Summer Intern",
        dates: "June – July 2026",
        type: "BLOCKED",
        description: "Mandatory internship period.",
        isBlocked: true,
        trip: null,
    },
    {
        id: "post-internship",
        name: "Post-Internship",
        dates: "August 2026",
        type: "Leisure / Yacht Week",
        description: "The 2–3 weeks before fall classes where students often travel to Europe.",
        isBlocked: false,
        trip: null,
    },
    {
        id: "fall-break",
        name: "Fall Break",
        dates: "Mid-October 2026",
        type: "Career Treks",
        description: "Often used for 'Tech Treks' (SF/Seattle) or 'Finance Treks' (NYC/London).",
        isBlocked: false,
        trip: null,
    },
    {
        id: "thanksgiving",
        name: "Thanksgiving",
        dates: "Late Nov 2026",
        type: "Regional Travel",
        description: "Usually a 4-5 day window, often used for domestic US trips.",
        isBlocked: false,
        trip: null,
    },
    {
        id: "winter-break",
        name: "Winter Break",
        dates: "Late Dec – mid-Jan 2027",
        type: "Social / Ski Trips",
        description: "The longest break (3–4 weeks). Popular for international trips or 'Ski Week'.",
        isBlocked: false,
        trip: null,
    },
    {
        id: "spring-break",
        name: "Spring Break",
        dates: "Early to mid-March 2027",
        type: "Global Immersions",
        description: "The peak for 'Global Study Tours' or large-scale social treks.",
        isBlocked: false,
        trip: null,
    },
    {
        id: "post-finals",
        name: "Post-Finals",
        dates: "May 2027",
        type: "Graduation Trips",
        description: "For graduating students, this is the month for 'world tours' before starting full-time work.",
        isBlocked: false,
        trip: null,
    },
];

interface MbaCalendarProps {
    availableTrips: RankedTrip[];
}

export default function MbaCalendar({ availableTrips }: MbaCalendarProps) {
    const [periods, setPeriods] = useState<CalendarPeriod[]>(INITIAL_PERIODS);
    const [tripsSource, setTripsSource] = useState<RankedTrip[]>(availableTrips);
    const { warning, success } = useToast();

    // Restore saved calendar from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CALENDAR_STORAGE_KEY);
            if (saved) {
                const { savedPeriods, savedSlugs } = JSON.parse(saved) as {
                    savedPeriods: Array<{ id: string; slug: string | null }>;
                    savedSlugs: string[];
                };
                const slugToTrip = new Map(availableTrips.map(t => [t.slug, t]));
                const restored = INITIAL_PERIODS.map(period => {
                    const entry = savedPeriods.find(p => p.id === period.id);
                    const trip = entry?.slug ? slugToTrip.get(entry.slug) ?? null : null;
                    return { ...period, trip };
                });
                const scheduledSlugs = new Set(restored.map(p => p.trip?.slug).filter(Boolean));
                const remainingTrips = availableTrips.filter(t => !scheduledSlugs.has(t.slug));
                setPeriods(restored);
                setTripsSource(remainingTrips);
            }
        } catch {
            // Ignore corrupt storage
        }
    }, [availableTrips]);

    // Persist calendar to localStorage whenever periods change
    useEffect(() => {
        try {
            const savedPeriods = periods.map(p => ({ id: p.id, slug: p.trip?.slug ?? null }));
            const savedSlugs = tripsSource.map(t => t.slug);
            localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify({ savedPeriods, savedSlugs }));
        } catch {
            // Ignore storage errors (e.g. private browsing quota)
        }
    }, [periods, tripsSource]);

    useEffect(() => {
        setTripsSource(availableTrips);
    }, [availableTrips]);

    const generatePdf = () => {
        const doc = new jsPDF();
        const scheduledTrips = periods.filter(p => p.trip !== null);

        if (scheduledTrips.length === 0) {
            warning("No trips scheduled! Drag some trips into the calendar first.");
            return;
        }

        // Title
        doc.setFontSize(22);
        doc.setTextColor(40);
        doc.text("My MBA Adventure: TripRank Itinerary", 20, 20);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 30);

        let yOffset = 45;

        scheduledTrips.forEach((period, idx) => {
            const trip = period.trip!;

            if (yOffset > 240) {
                doc.addPage();
                yOffset = 20;
            }

            doc.setFontSize(16);
            doc.setTextColor(0, 112, 243);
            doc.text(`${period.name} (${period.dates})`, 20, yOffset);
            yOffset += 10;

            doc.setFontSize(18);
            doc.setTextColor(20);
            doc.text(trip.title, 25, yOffset);
            yOffset += 8;

            doc.setFontSize(10);
            doc.setFont("Helvetica", "italic");
            doc.setTextColor(80);
            doc.text(`Trip DNA: ${trip.vibes.join(", ")}`, 25, yOffset);
            yOffset += 10;

            doc.setFontSize(12);
            doc.setFont("Helvetica", "bold");
            doc.setTextColor(40);
            doc.text("Itinerary Highlights:", 25, yOffset);
            yOffset += 7;

            const tableRows = trip.days.flatMap(day =>
                day.items.map(item => [
                    `Day ${day.dayIndex}`,
                    item.title,
                    item.description
                ])
            );

            autoTable(doc, {
                startY: yOffset,
                head: [["Day", "Activity", "Description"]],
                body: tableRows,
                theme: "striped",
                headStyles: { fillColor: [0, 112, 243] },
                margin: { left: 25 },
                styles: { fontSize: 9 }
            });

            yOffset = (doc as any).lastAutoTable.finalY + 20;
        });

        doc.save("MBA-Itinerary.pdf");
        success("Your itinerary PDF has been downloaded!");
    };

    const handleAiOptimize = () => {
        // AI Optimizer logic: Fill empty non-blocked periods with the highest-ranked affordable trips
        if (tripsSource.length === 0) return;
        
        const newPeriods = [...periods];
        let remainingTrips = [...tripsSource];
        
        // Sort trips by score (highest first)
        remainingTrips.sort((a, b) => b.score - a.score);

        newPeriods.forEach(period => {
            if (!period.isBlocked && period.trip === null && remainingTrips.length > 0) {
                // Assign the best available trip to this window
                period.trip = remainingTrips.shift()!;
            }
        });

        setPeriods(newPeriods);
        setTripsSource(remainingTrips);
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === "trip-pool" && destination.droppableId !== "trip-pool") {
            const draggedTrip = tripsSource[source.index];
            const destPeriodIndex = periods.findIndex((p) => p.id === destination.droppableId);
            if (destPeriodIndex === -1 || periods[destPeriodIndex].isBlocked) return;

            const newPeriods = [...periods];
            let newTripsSource = Array.from(tripsSource);
            if (newPeriods[destPeriodIndex].trip) {
                newTripsSource.push(newPeriods[destPeriodIndex].trip as RankedTrip);
                newTripsSource.sort((a, b) => a.rank - b.rank);
            }

            newPeriods[destPeriodIndex].trip = draggedTrip;
            newTripsSource = newTripsSource.filter(t => t.slug !== draggedTrip.slug);

            setPeriods(newPeriods);
            setTripsSource(newTripsSource);
        } else if (source.droppableId !== "trip-pool" && destination.droppableId === "trip-pool") {
            const sourcePeriodIndex = periods.findIndex((p) => p.id === source.droppableId);
            if (sourcePeriodIndex === -1) return;

            const draggedTrip = periods[sourcePeriodIndex].trip;
            if (!draggedTrip) return;

            const newTripsSource = Array.from(tripsSource);
            newTripsSource.push(draggedTrip);
            newTripsSource.sort((a, b) => a.rank - b.rank);

            const newPeriods = [...periods];
            newPeriods[sourcePeriodIndex].trip = null;

            setPeriods(newPeriods);
            setTripsSource(newTripsSource);
        } else if (source.droppableId !== "trip-pool" && destination.droppableId !== "trip-pool") {
            if (source.droppableId === destination.droppableId) return;

            const sourcePeriodIndex = periods.findIndex((p) => p.id === source.droppableId);
            const destPeriodIndex = periods.findIndex((p) => p.id === destination.droppableId);

            if (sourcePeriodIndex === -1 || destPeriodIndex === -1 || periods[destPeriodIndex].isBlocked) return;

            const draggedTrip = periods[sourcePeriodIndex].trip;
            if (!draggedTrip) return;

            const newPeriods = [...periods];
            const existingDestTrip = newPeriods[destPeriodIndex].trip;

            newPeriods[sourcePeriodIndex].trip = existingDestTrip;
            newPeriods[destPeriodIndex].trip = draggedTrip;

            setPeriods(newPeriods);
        }
    };

    return (
        <div style={{ marginTop: "2rem" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "2rem",
                    alignItems: "start",
                    background: "rgba(255,255,255,0.02)",
                    padding: "2rem",
                    borderRadius: "2rem",
                    border: "1px solid var(--border)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
                }}>
                    {/* Left Panel: Mini Leaderboard */}
                    <div style={{
                        height: "100%",
                        maxHeight: "800px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div style={{ paddingBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                            <div>
                                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Leaderboard</h3>
                                <p style={{ color: "var(--secondary)", fontSize: "0.875rem" }}>Drag your top ranked trips into your calendar.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, marginRight: '1rem' }}>
                                    <button
                                        onClick={handleAiOptimize}
                                        style={{
                                            background: 'linear-gradient(135deg, var(--accent) 0%, rgba(0, 204, 136, 0.8) 100%)',
                                            color: '#000',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '12px',
                                            border: 'none',
                                            fontWeight: 800,
                                            fontSize: '0.875rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 15px rgba(0,204,136,0.3)',
                                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,204,136,0.4)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,204,136,0.3)'; }}
                                    >
                                        <Sparkles size={16} /> Spark Auto-Fill
                                    </button>
                                </div>
                                <button
                                    onClick={generatePdf}
                                    className="btn btn-primary"
                                    style={{ padding: "0.5rem 1rem", fontSize: "0.80rem", whiteSpace: "nowrap" }}
                                >
                                    Download PDF
                                </button>
                            </div>
                        </div>

                        <div style={{
                            marginBottom: '1.5rem',
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '1rem',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Budget Strategy</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)' }}>Efficiency</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                defaultValue="50"
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    let newSource = [...tripsSource];
                                    const parseBudget = (b: number | string) => {
                                        if (typeof b === 'number') return b;
                                        return parseInt(b.split('-')[0]) || 0;
                                    };
                                    if (val < 40) {
                                        // Efficiency: Reorder by budget ascending
                                        newSource.sort((a, b) => parseBudget(a.roughBudgetUsd) - parseBudget(b.roughBudgetUsd));
                                    } else if (val > 60) {
                                        // YOLO: Reorder by budget descending (premium vibes)
                                        newSource.sort((a, b) => parseBudget(b.roughBudgetUsd) - parseBudget(a.roughBudgetUsd));
                                    } else {
                                        // Balanced: Reorder by rank
                                        newSource.sort((a, b) => a.rank - b.rank);
                                    }
                                    setTripsSource(newSource);
                                }}
                                style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.6rem', color: 'var(--secondary)', fontWeight: 600 }}>
                                <span>$ SAVINGS</span>
                                <span>BALANCED</span>
                                <span>YOLO VIBES</span>
                            </div>
                        </div>

                        <Droppable droppableId="trip-pool" direction="vertical">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        flex: 1,
                                        overflowY: "auto",
                                        paddingRight: "0.5rem",
                                        background: snapshot.isDraggingOver ? "rgba(255,255,255,0.05)" : "transparent",
                                        borderRadius: "1rem",
                                        transition: "background 0.2s"
                                    }}
                                    className="custom-scrollbar"
                                >
                                    {tripsSource.map((trip, index) => (
                                        <Draggable key={trip.slug} draggableId={trip.slug} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        background: snapshot.isDragging ? "var(--bg)" : "rgba(255,255,255,0.03)",
                                                        border: "1px solid",
                                                        borderColor: snapshot.isDragging ? "var(--accent)" : "rgba(255,255,255,0.05)",
                                                        borderRadius: "1rem",
                                                        padding: "1rem",
                                                        marginBottom: "0.75rem",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "1rem",
                                                        transition: "all 0.2s",
                                                        cursor: "grab",
                                                        boxShadow: snapshot.isDragging ? "0 10px 30px rgba(0,0,0,0.5)" : "none"
                                                    }}
                                                >
                                                    <div style={{
                                                        fontSize: "0.75rem",
                                                        fontWeight: 900,
                                                        opacity: 0.3,
                                                        width: "24px"
                                                    }}>
                                                        #{trip.rank.toString().padStart(2, '0')}
                                                    </div>
                                                    <Image src={trip.photos[0].path} alt={trip.title} width={40} height={40} style={{ borderRadius: '0.5rem', objectFit: 'cover' }} unoptimized />
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{trip.title}</div>
                                                        <div style={{ fontSize: "0.75rem", color: "var(--secondary)" }}>Elo: {trip.score}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    {tripsSource.length === 0 && (
                                        <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--secondary)", opacity: 0.5 }}>
                                            All top trips are scheduled!
                                        </div>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    {/* Right Panel: Calendar Slots */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        {periods.map((period) => (
                            <Droppable key={period.id} droppableId={period.id} isDropDisabled={period.isBlocked}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            background: period.isBlocked ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.02)",
                                            border: "1px solid",
                                            borderColor: snapshot.isDraggingOver ? "var(--accent)" : "rgba(255,255,255,0.05)",
                                            borderRadius: "1.25rem",
                                            padding: "1.25rem",
                                            minHeight: "160px",
                                            display: "flex",
                                            flexDirection: "column",
                                            transition: "all 0.2s",
                                            opacity: period.isBlocked ? 0.5 : 1
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                                            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                                {period.dates}
                                            </span>
                                            {period.isBlocked && <span style={{ fontSize: "0.6rem", background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px" }}>LOCKED</span>}
                                        </div>
                                        <h4 style={{ fontSize: "1rem", margin: "0 0 0.5rem 0", fontWeight: 700 }}>{period.name}</h4>
                                        <p style={{ fontSize: "0.75rem", color: "var(--secondary)", margin: "0 0 1rem 0", lineHeight: 1.4, flex: 1 }}>
                                            {period.description}
                                        </p>

                                        {period.trip ? (
                                            <Draggable key={`${period.id}-${period.trip!.slug}`} draggableId={`${period.id}-${period.trip!.slug}`} index={0}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            padding: "0.75rem",
                                                            background: "var(--bg)",
                                                            border: "1px solid var(--accent)",
                                                            borderRadius: "0.75rem",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.75rem",
                                                            boxShadow: snapshot.isDragging ? "0 10px 30px rgba(0,0,0,0.5)" : "none"
                                                        }}
                                                    >
                                                        <Image src={period.trip!.photos[0].path} alt={period.trip!.title} width={30} height={30} style={{ borderRadius: '4px', objectFit: 'cover' }} unoptimized />
                                                        <div style={{ fontWeight: 600, fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                            {period.trip!.title}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ) : (
                                            <div style={{
                                                padding: "0.75rem",
                                                border: "1px dashed rgba(255,255,255,0.1)",
                                                borderRadius: "0.75rem",
                                                textAlign: "center",
                                                color: "rgba(255,255,255,0.2)",
                                                fontSize: "0.75rem",
                                                fontWeight: 500
                                            }}>
                                                {period.isBlocked ? "INTERNSHIP" : "Drop trip here"}
                                            </div>
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </div>
            </DragDropContext>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.2);
                }
            `}</style>
        </div>
    );
}
