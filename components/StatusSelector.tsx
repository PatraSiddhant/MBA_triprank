"use client";

import { useState, useTransition } from "react";
import { updateTripStatusAction } from "@/lib/actions";
import { ChevronDown } from "lucide-react";

interface StatusSelectorProps {
    tripId: string;
    currentStatus: 'planning' | 'booked' | 'completed';
}

const statuses = [
    { value: 'planning', label: 'Planning', color: '#ffcc00' },
    { value: 'booked', label: 'Booked', color: '#00cc88' },
    { value: 'completed', label: 'Completed', color: 'var(--secondary)' },
];

export default function StatusSelector({ tripId, currentStatus }: StatusSelectorProps) {
    const [status, setStatus] = useState(currentStatus || 'planning');
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleUpdate = (newStatus: any) => {
        setIsOpen(false);
        if (newStatus === status) return;

        setStatus(newStatus);
        startTransition(async () => {
            try {
                await updateTripStatusAction(tripId, newStatus);
            } catch (err) {
                setStatus(status); // Rollback
                alert("Failed to update status");
            }
        });
    };

    const currentConfig = statuses.find(s => s.value === status) || statuses[0];

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '100px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: currentConfig.color,
                    background: `${currentConfig.color}11`,
                    border: `1px solid ${currentConfig.color}44`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: isPending ? 0.6 : 1
                }}
            >
                {currentConfig.label}
                <ChevronDown size={12} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {isOpen && (
                <div className="glass" style={{
                    position: 'absolute',
                    top: '120%',
                    left: 0,
                    zIndex: 100,
                    minWidth: '140px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }}>
                    {statuses.map(s => (
                        <button
                            key={s.value}
                            onClick={() => handleUpdate(s.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                background: 'transparent',
                                border: 'none',
                                color: s.value === status ? s.color : '#fff',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                display: 'block',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
