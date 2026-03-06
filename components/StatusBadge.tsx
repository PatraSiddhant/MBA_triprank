"use client";

interface StatusBadgeProps {
    status: 'interested' | 'planning' | 'booked' | 'completed';
}

const statusConfig = {
    interested: { label: 'Interested', color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.05)' },
    planning: { label: 'Planning', color: '#ffcc00', bg: 'rgba(255,204,0,0.1)' },
    booked: { label: 'Booked', color: '#00cc88', bg: 'rgba(0,204,136,0.1)' },
    completed: { label: 'Completed', color: 'var(--secondary)', bg: 'rgba(255,255,255,0.03)' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status] || statusConfig.planning;

    return (
        <span style={{
            padding: '0.4rem 0.8rem',
            borderRadius: '100px',
            fontSize: '0.7rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: config.color,
            background: config.bg,
            border: `1px solid ${config.color}22`
        }}>
            {config.label}
        </span>
    );
}
