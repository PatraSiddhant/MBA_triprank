"use client";

import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FileDown } from "lucide-react";

interface TripDownloadButtonProps {
    trip: any;
}

export default function TripDownloadButton({ trip }: TripDownloadButtonProps) {
    const handleDownload = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.setTextColor(40);
        doc.text(`Trip Plan: ${trip.name}`, 20, 20);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Destination: ${trip.primaryDestinationCity}, ${trip.primaryDestinationCountry}`, 20, 30);
        doc.text(`Duration: ${trip.durationDays} Days`, 20, 37);
        doc.text(`Estimated Budget: $${trip.roughBudgetUsd}`, 20, 44);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 51);

        let yOffset = 65;

        if (trip.itinerary && trip.itinerary.days) {
            trip.itinerary.days.forEach((day: any) => {
                if (yOffset > 250) {
                    doc.addPage();
                    yOffset = 20;
                }

                doc.setFontSize(16);
                doc.setTextColor(0, 112, 243);
                doc.text(`Day ${day.dayIndex + 1}: ${day.title}`, 20, yOffset);
                yOffset += 10;

                const tableRows = day.items.map((item: any) => [
                    item.timeBucket,
                    item.title,
                    item.description,
                    item.costEstimate || "N/A"
                ]);

                autoTable(doc, {
                    startY: yOffset,
                    head: [["Time", "Activity", "Description", "Cost"]],
                    body: tableRows,
                    theme: "striped",
                    headStyles: { fillColor: [0, 112, 243] },
                    margin: { left: 20 },
                    styles: { fontSize: 9 }
                });

                yOffset = (doc as any).lastAutoTable.finalY + 15;
            });
        } else {
            doc.text("No itinerary items added yet.", 20, yOffset);
        }

        doc.save(`${trip.name.replace(/\s+/g, '-').toLowerCase()}-itinerary.pdf`);
    };

    return (
        <button
            onClick={handleDownload}
            className="btn btn-secondary"
            style={{
                width: '100%',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
            }}
        >
            <FileDown size={16} />
            Download PDF
        </button>
    );
}
