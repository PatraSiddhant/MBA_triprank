"use client";

import { useState, useTransition, useEffect } from "react";
import { tripTemplates } from "@/data/trip-templates";
import { updateRankingAction, getLeaderboardAction } from "@/lib/ranking-actions";
import { cloneTemplateAction } from "@/lib/actions";
import RankingCard from "@/components/RankingCard";
import TripDetailModal from "@/components/TripDetailModal";
import Link from "next/link";
import { Sword, Trophy, Users, Zap } from "lucide-react";

export default function RankPage() {
    const [pair, setPair] = useState<[any, any] | null>(null);
    const [detailTrip, setDetailTrip] = useState<any | null>(null);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [isPending, startTransition] = useTransition();

    const generatePair = () => {
        const shuffled = [...tripTemplates].sort(() => 0.5 - Math.random());
        setPair([shuffled[0], shuffled[1]]);
    };

    const fetchLeaderboard = async () => {
        const data = await getLeaderboardAction();
        setLeaderboard(data);
    };

    useEffect(() => {
        generatePair();
        fetchLeaderboard();
    }, []);

    const handleVote = async (winnerSlug: string, loserSlug: string) => {
        if (isPending) return;
        startTransition(async () => {
            await updateRankingAction(winnerSlug, loserSlug);
            generatePair();
            fetchLeaderboard();
        });
    };

    if (!pair) return null;

    return (
        <div style={{ minHeight: '100vh', padding: '8rem 0' }}>
            <div className="container">
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '100px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <Sword size={16} color="var(--accent)" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ranking Arena</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1rem' }}>Which trek is better?</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.25rem' }}>Help the community find the most iconic MBA journeys.</p>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    alignItems: 'center',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    <RankingCard
                        trip={pair[0]}
                        onSelect={() => handleVote(pair[0].slug, pair[1].slug)}
                        onViewDetail={() => setDetailTrip(pair[0])}
                    />

                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        background: 'var(--bg)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        color: 'var(--accent)',
                        boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                    }} className="desktop-only">VS</div>

                    <RankingCard
                        trip={pair[1]}
                        onSelect={() => handleVote(pair[1].slug, pair[0].slug)}
                        onViewDetail={() => setDetailTrip(pair[1])}
                    />
                </div>

                <div className="mobile-only" style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <div className="glass" style={{ padding: '1rem', borderRadius: '12px' }}>
                        <Zap size={20} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
                        <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>Tap the trek you prefer. Your votes influence the global leaderboard.</p>
                    </div>
                </div>

                {/* Leaderboard Section */}
                <div style={{ padding: '6rem 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Global Leaderboard</h2>
                            <p style={{ color: 'var(--secondary)' }}>Real-time rankings from the MBA community.</p>
                        </div>
                    </div>

                    <div className="glass" style={{ borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                        {/* Desktop Table */}
                        <div className="desktop-only">
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <th style={{ padding: '1.5rem 2rem' }}>Rank</th>
                                        <th style={{ padding: '1.5rem 2rem' }}>Trek</th>
                                        <th style={{ padding: '1.5rem 2rem' }}>Elo Score</th>
                                        <th style={{ padding: '1.5rem 2rem' }}>W-L Record</th>
                                        <th style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((item, index) => {
                                        const trip = tripTemplates.find(t => t.slug === item.templateSlug);
                                        if (!trip) return null;
                                        return (
                                            <tr key={item.templateSlug} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <span style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        borderRadius: '50%',
                                                        background: index < 3 ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                                        color: index < 3 ? '#000' : '#fff',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 800,
                                                        fontSize: '0.875rem'
                                                    }}>
                                                        {index + 1}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <Link href={`/templates/${trip.slug}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
                                                        {trip.title}
                                                    </Link>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', fontWeight: 700, color: 'var(--accent)' }}>{item.score}</td>
                                                <td style={{ padding: '1.5rem 2rem', color: 'var(--secondary)', fontSize: '0.875rem' }}>
                                                    {item.wins}W - {item.losses}L
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                                    <button
                                                        onClick={() => startTransition(() => cloneTemplateAction(trip.slug))}
                                                        style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}
                                                    >
                                                        Add to Plan →
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card List */}
                        <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column' }}>
                            {leaderboard.map((item, index) => {
                                const trip = tripTemplates.find(t => t.slug === item.templateSlug);
                                if (!trip) return null;
                                return (
                                    <div key={item.templateSlug} style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: index < 3 ? 'var(--accent)' : 'var(--secondary)', width: '2rem' }}>{index + 1}</div>
                                            <div>
                                                <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{trip.title}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>{item.score} pts • {item.wins}W - {item.losses}L</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => startTransition(() => cloneTemplateAction(trip.slug))}
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--accent)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {detailTrip && <TripDetailModal trip={detailTrip} onClose={() => setDetailTrip(null)} />}
        </div>
    );
}
