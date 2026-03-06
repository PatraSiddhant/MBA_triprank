import { getAllTripTemplates, TripTemplate } from "@/data/trip-templates";
import MbaCalendarClient from "./MbaCalendarClient";

export default function PlanPage() {
    const allTrips = getAllTripTemplates();

    // Convert to the shape MbaCalendar needs (add placeholder rank/score/wins/losses)
    const rankedTrips = allTrips.map((t: TripTemplate, idx: number) => ({
        ...t,
        rank: idx + 1,
        score: 1200,
        wins: 0,
        losses: 0,
    }));

    return (
        <div style={{ minHeight: '100vh', padding: '8rem 0' }}>
            <div className="container">
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1.25rem', background: 'rgba(var(--accent-rgb), 0.08)', border: '1px solid rgba(var(--accent-rgb), 0.2)', borderRadius: '100px', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)' }}>MBA Year Planner</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>Plan Your Year</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.15rem', maxWidth: '600px' }}>
                        Drag your favorite treks into each MBA vacation window. Every slot is sized for the real break length — from the quick Pre-Tern to the epic Post-Finals world tour.
                    </p>
                </div>

                <MbaCalendarClient availableTrips={rankedTrips as any} />
            </div>
        </div>
    );
}
