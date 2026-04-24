"use client";

import Image from "next/image";
import { useMotionValue, useTransform, motion, AnimatePresence } from "framer-motion";
import { MapPin, Check, X } from "lucide-react";
import { TripTemplate } from "@/data/trip-templates";

interface SwipeArenaProps {
    pair: [TripTemplate, TripTemplate] | null;
    onVote: (winnerSlug: string, loserSlug: string) => void;
    onDetail: (trip: TripTemplate) => void;
}

export default function SwipeArena({ pair, onVote, onDetail }: SwipeArenaProps) {
    if (!pair) return null;

    const topCard = pair[0];
    const bottomCard = pair[1];

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const backgroundRight = useTransform(x, [0, 100], ["rgba(0, 204, 136, 0)", "rgba(0, 204, 136, 0.8)"]);
    const backgroundLeft = useTransform(x, [-100, 0], ["rgba(255, 59, 48, 0.8)", "rgba(255, 59, 48, 0)"]);

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
        if (info.offset.x > 100) {
            onVote(topCard.slug, bottomCard.slug);
        } else if (info.offset.x < -100) {
            onVote(bottomCard.slug, topCard.slug);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '600px', margin: '0 auto', perspective: '1000px' }}>
            <AnimatePresence>
                {/* BOTTOM CARD */}
                <motion.div
                    key={bottomCard.slug}
                    initial={{ scale: 0.95, opacity: 0.5, y: 20 }}
                    animate={{ scale: 0.95, opacity: 0.5, y: 20 }}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        borderRadius: '2rem',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <Image
                        src={bottomCard.photos[0].path}
                        alt={bottomCard.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{bottomCard.title}</h2>
                        <div style={{ display: 'flex', gap: '0.5rem', color: '#fff', fontSize: '0.875rem' }}>
                            <span>${bottomCard.roughBudgetUsd}</span> • <span>{bottomCard.durationDays}d</span>
                        </div>
                    </div>
                </motion.div>

                {/* TOP CARD */}
                <motion.div
                    key={topCard.slug}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    style={{
                        x,
                        rotate,
                        opacity,
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        borderRadius: '2rem',
                        overflow: 'hidden',
                        cursor: 'grab',
                        background: '#111',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        zIndex: 10
                    }}
                    whileTap={{ cursor: 'grabbing' }}
                >
                    <Image
                        src={topCard.photos[0].path}
                        alt={topCard.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%)' }} />

                    {/* Visual Overlays for Swipe */}
                    <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: backgroundRight, zIndex: 5, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}><Check size={100} color="#fff" /></motion.div>
                    </motion.div>
                    <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: backgroundLeft, zIndex: 5, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div style={{ opacity: useTransform(x, [0, -100], [0, 1]) }}><X size={100} color="#fff" /></motion.div>
                    </motion.div>

                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', zIndex: 10 }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            <span style={{ background: 'var(--accent)', color: '#000', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>${topCard.roughBudgetUsd}</span>
                            <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>{topCard.durationDays} Days</span>
                            {topCard.themes.slice(0, 1).map((t: string) => (
                                <span key={t} style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>{t}</span>
                            ))}
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem', lineHeight: 1.1 }}>{topCard.title}</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <MapPin size={16} /> {topCard.primaryDestinationCity}, {topCard.primaryDestinationCountry}
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); onDetail(topCard); }} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', borderRadius: '100px', fontWeight: 700, width: '100%', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                            View Details
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
