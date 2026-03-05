import styles from "./page.module.css";

import React, { useState, useEffect, useTransition } from "react";
import { getAllTripTemplates, TripTemplate } from "@/data/trip-templates";
import RankingCard from "@/components/RankingCard";
import TripDetailModal from "@/components/TripDetailModal";
import MbaCalendar from "@/components/MbaCalendar";
import { submitComparison, getUserRankings } from "@/lib/ranking-actions";

export default function RankPage() {
    const [templates, setTemplates] = useState<TripTemplate[]>([]);
    const [currentPair, setCurrentPair] = useState<[TripTemplate, TripTemplate] | null>(null);
    const [selectedTrip, setSelectedTrip] = useState<TripTemplate | null>(null);
    const [isPending, startTransition] = useTransition();
    const [rankingData, setRankingData] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [comparisonsDone, setComparisonsDone] = useState(0);

    useEffect(() => {
        const allTemplates = getAllTripTemplates();
        setTemplates(allTemplates);
        setCurrentPair(getRandomPair(allTemplates));
        loadRankings();
    }, []);

    async function loadRankings() {
        const rankings = await getUserRankings();
        setRankingData(rankings);
    }

    function getRandomPair(all: TripTemplate[]): [TripTemplate, TripTemplate] {
        const first = all[Math.floor(Math.random() * all.length)];
        let second = all[Math.floor(Math.random() * all.length)];
        while (second.slug === first.slug) {
            second = all[Math.floor(Math.random() * all.length)];
        }
        return [first, second];
    }

    async function handleSelect(winner: TripTemplate, loser: TripTemplate) {
        startTransition(async () => {
            await submitComparison(winner.slug, loser.slug);
            setComparisonsDone(prev => prev + 1);
            setCurrentPair(getRandomPair(templates));
            loadRankings();
        });
    }

    function handleRightClick(trip: TripTemplate) {
        setSelectedTrip(trip);
    }

    if (!currentPair && !showResults) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

    return (
        <div style={{ paddingTop: '8rem', minHeight: '100vh', background: 'var(--bg)' }}>
            <div className="container">
                <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '0.5rem 1.5rem', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)' }}>
                        Trip Rank • {comparisonsDone} Comparisons Done
                    </div>
                    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 1.5rem auto', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min((comparisonsDone / 5) * 100, 100)}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.3s ease' }}></div>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}>
                        {comparisonsDone < 5 ? `${5 - comparisonsDone} more comparisions needed to generate your personalized ELO ranking` : 'Your personalized ELO ranking is ready! Scroll down to see it.'}
                    </div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Personalize Your Ranking</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.25rem' }}>
                        Choose your favorite between the two. Your rank updates in real-time.
                    </p>
                </header>

                <div className={styles.rankContainer}>
                    <div className={styles.pairContainer}>
                        {currentPair && !showResults ? (
                            <>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <RankingCard
                                        trip={currentPair[0]}
                                        side="left"
                                        onSelect={() => handleSelect(currentPair[0], currentPair[1])}
                                        onContextMenu={handleRightClick}
                                    />
                                    <div suppressHydrationWarning style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,112,243,0.9)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 800, zIndex: 10 }}>
                                        {Math.floor(70 + Math.random() * 25)}% MATCH
                                    </div>
                                </div>
                                <div className={styles.vs}>VS</div>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <RankingCard
                                        trip={currentPair[1]}
                                        side="right"
                                        onSelect={() => handleSelect(currentPair[1], currentPair[0])}
                                        onContextMenu={handleRightClick}
                                    />
                                    <div suppressHydrationWarning style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,112,243,0.9)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 800, zIndex: 10 }}>
                                        {Math.floor(70 + Math.random() * 25)}% MATCH
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>

                    {comparisonsDone >= 5 && (
                        <div style={{ marginTop: '0', paddingBottom: '8rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Design Your MBA Journey</h2>
                            <MbaCalendar
                                availableTrips={rankingData.map((r, i) => {
                                    const template = templates.find(t => t.slug === r.templateSlug);
                                    if (!template) return null;
                                    return {
                                        ...template,
                                        rank: i + 1,
                                        score: r.score,
                                        wins: r.wins,
                                        losses: r.losses
                                    };
                                }).filter(Boolean) as any[]}
                            />
                        </div>
                    )}
                </div>

                {comparisonsDone < 5 && rankingData.length > 0 && (
                    <div style={{ marginTop: '8rem', paddingBottom: '8rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Your World Ranking</h2>
                        <div className="glass" style={{ borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                                        <th style={{ padding: '1.5rem 2rem' }}>Rank</th>
                                        <th style={{ padding: '1.5rem 2rem' }}>Trip</th>
                                        <th style={{ padding: '1.5rem 2rem' }}>Elo Rating</th>
                                        <th style={{ padding: '1.5rem 2rem' }}>Stats</th>
                                        <th style={{ padding: '1.5rem 2rem' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rankingData.map((ranking, i) => {
                                        const template = templates.find(t => t.slug === ranking.templateSlug);
                                        if (!template) return null;
                                        return (
                                            <tr key={ranking.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                                <td style={{ padding: '1.5rem 2rem', fontWeight: 800, opacity: 0.3 }}>#0{i + 1}</td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <img src={template.photos[0].path} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} alt="" />
                                                        <div>
                                                            <div style={{ fontWeight: 600 }}>{template.title}</div>
                                                            <div style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>{template.theme}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <div style={{ fontWeight: 800, color: 'var(--accent)' }}>{ranking.score}</div>
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem', color: 'var(--secondary)', fontSize: '0.875rem' }}>
                                                    {ranking.wins}W - {ranking.losses}L
                                                </td>
                                                <td style={{ padding: '1.5rem 2rem' }}>
                                                    <a href={`/trips/${template.slug}/start`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer' }}>Add to Get Started</a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {selectedTrip && (
                    <TripDetailModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
                )}
            </div>
        </div>
    );
}
