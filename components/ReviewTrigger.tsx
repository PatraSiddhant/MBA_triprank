"use client";

import { useState } from "react";
import { Send, Award } from "lucide-react";

export default function ReviewTrigger({ tripTitle }: { tripTitle: string }) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleReview = () => {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    if (isSubmitted) {
        return (
            <div style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.9rem', animation: 'fadeIn 0.5s' }}>
                <Award size={18} style={{ marginBottom: '0.5rem' }} />
                <br />
                Thanks for sharing your DNA!
            </div>
        );
    }

    return (
        <button
            onClick={handleReview}
            style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent)',
                fontWeight: 800,
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}
        >
            Post Your Review DNA <Send size={14} />
        </button>
    );
}
