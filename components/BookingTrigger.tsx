"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle, Sparkles } from "lucide-react";

export default function BookingTrigger({ slug, schoolName }: { slug: string, schoolName?: string }) {
    const [bookingState, setBookingState] = useState<'idle' | 'success'>('idle');

    const handleBook = () => {
        // Simulate a booking process
        setBookingState('success');
        setTimeout(() => setBookingState('idle'), 5000);
    };

    if (bookingState === 'success') {
        return (
            <div className="glass animate-slide-in" style={{
                padding: '1.25rem',
                borderRadius: '12px',
                background: 'rgba(0, 204, 136, 0.1)',
                border: '1px solid #00cc88',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{ background: '#00cc88', borderRadius: '50%', padding: '4px' }}>
                    <CheckCircle size={20} color="#000" />
                </div>
                <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#00cc88' }}>Inquiry Sent!</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Your $200 {schoolName} discount is locked in.</div>
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={handleBook}
            className="btn btn-secondary btn-shine"
            style={{
                width: '100%',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem'
            }}
        >
            <Sparkles size={18} />
            Book with MBA Discount
        </button>
    );
}
