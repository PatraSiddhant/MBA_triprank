"use client";

import { useState, useTransition } from "react";
import { toggleInterest } from "@/lib/interest-actions";
import { Heart } from "lucide-react";

interface InterestWidgetProps {
    slug: string;
    initialCount: number;
    initialInterested: boolean;
    users: any[];
}

export default function TemplateInterestWidget({ slug, initialCount, initialInterested, users }: InterestWidgetProps) {
    const [count, setCount] = useState(initialCount);
    const [isInterested, setIsInterested] = useState(initialInterested);
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        if (isPending) return;

        // Optimistic UI
        const nextState = !isInterested;
        setIsInterested(nextState);
        setCount(prev => nextState ? prev + 1 : prev - 1);

        startTransition(async () => {
            try {
                await toggleInterest(slug);
            } catch (err) {
                // Rollback
                setIsInterested(!nextState);
                setCount(prev => !nextState ? prev + 1 : prev - 1);
                alert("Please sign in to show interest!");
            }
        });
    };

    return (
        <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Who's Interested?
                <button
                    onClick={handleToggle}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: isInterested ? '#ff4b4b' : 'var(--secondary)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Heart size={20} fill={isInterested ? '#ff4b4b' : 'transparent'} />
                </button>
            </h3>

            <div style={{ display: 'flex', gap: '-0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
                <div style={{ display: 'flex' }}>
                    {users.slice(0, 5).map((user, i) => (
                        <img
                            key={i}
                            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=Friend${i}`}
                            alt={user.name}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '2px solid var(--bg)',
                                marginLeft: i > 0 ? '-10px' : '0'
                            }}
                        />
                    ))}
                </div>
                {count > 0 ? (
                    <div style={{ fontSize: '0.875rem', color: 'var(--secondary)', marginLeft: '12px' }}>
                        {count} {count === 1 ? 'classmate' : 'classmates'} interested
                    </div>
                ) : (
                    <div style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>Be the first to show interest!</div>
                )}
            </div>

            {count > 3 && (
                <div suppressHydrationWarning style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                    Trending Trek for CBS Students
                </div>
            )}
        </div>
    );
}
