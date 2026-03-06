"use client";
import MbaCalendar from "@/components/MbaCalendar";

export default function MbaCalendarClient({ availableTrips }: { availableTrips: any[] }) {
    return <MbaCalendar availableTrips={availableTrips} />;
}
