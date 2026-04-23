"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Download, Star, MapPin, Globe, Trophy, Sparkles, Camera, Map as MapIcon } from "lucide-react";
import html2canvas from "html2canvas";

interface Trip {
    id: string;
    name: string;
    primaryDestinationCity: string;
    primaryDestinationCountry: string;
    durationDays: number;
    roughBudgetUsd?: number;
    status: string;
    memory?: {
        highlightMoment?: string;
        foodPick?: string;
        hiddenGem?: string;
        overallRating?: number;
        wouldReturn?: boolean;
        travelTip?: string;
    };
}

interface TripWrappedAnimationProps {
    trips: Trip[];
    onClose: () => void;
}

const SLIDE_GRADIENTS = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
];

const EMOJIS = ["✈️", "🌍", "🏔️", "🌊", "🗺️", "🎒", "🌅", "🍜", "🏛️", "🌺"];

function getEmojiForCountry(country: string): string {
    const map: Record<string, string> = {
        Japan: "🗾", Italy: "🍕", France: "🥐", Mexico: "🌮",
        Thailand: "🐘", Kenya: "🦁", Iceland: "🌋", Colombia: "☕",
        Peru: "🦙", Greece: "🏛️", India: "🕌", Indonesia: "🌴",
        "South Africa": "🦒", Brazil: "🌴", Argentina: "🥩",
    };
    return map[country] || "🌍";
}

const slideVariants = {
    enter: (dir: number) => ({
        x: dir > 0 ? "100%" : "-100%",
        opacity: 0,
        scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
        x: dir > 0 ? "-100%" : "100%",
        opacity: 0,
        scale: 0.95,
    }),
};

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
    }),
};

export default function TripWrappedAnimation({ trips, onClose }: TripWrappedAnimationProps) {
    const [slideIndex, setSlideIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isDownloading, setIsDownloading] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const slideRef = useRef<HTMLDivElement>(null);
    const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const completed = trips.filter((t) => t.status === "completed");
    const totalDays = trips.reduce((s, t) => s + (t.durationDays || 0), 0);
    const countries = new Set(trips.map((t) => t.primaryDestinationCountry));
    const avgRating = completed.reduce((s, t) => s + (t.memory?.overallRating ?? 0), 0) / (completed.filter(t => t.memory?.overallRating).length || 1);
    const topMemory = completed.find((t) => t.memory?.highlightMoment);
    const topFood = completed.find((t) => t.memory?.foodPick);
    const topGem = completed.find((t) => t.memory?.hiddenGem);

    const slides = [
        // Slide 0: Intro
        {
            gradient: SLIDE_GRADIENTS[0],
            content: (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "2.5rem", textAlign: "center" }}>
                    <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
                        ✈️
                    </motion.div>
                    <motion.div custom={1} variants={textVariants} initial="hidden" animate="visible">
                        <p style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.75rem" }}>
                            Your MBA Journey
                        </p>
                    </motion.div>
                    <motion.h1 custom={2} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                        Trek Wrapped
                    </motion.h1>
                    <motion.p custom={3} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", maxWidth: "280px", lineHeight: 1.5 }}>
                        Your expedition legacy, beautifully recapped.
                    </motion.p>
                    <motion.div custom={4} variants={textVariants} initial="hidden" animate="visible" style={{ marginTop: "2rem", display: "flex", gap: "0.5rem" }}>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} className="animate-pulse" />
                        ))}
                    </motion.div>
                </div>
            ),
        },
        // Slide 1: Trip count
        {
            gradient: SLIDE_GRADIENTS[1],
            content: (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "2.5rem", textAlign: "center" }}>
                    <motion.p custom={0} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>
                        You've been everywhere
                    </motion.p>
                    <motion.div custom={1} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "clamp(6rem, 20vw, 9rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.05em" }}>
                        {trips.length}
                    </motion.div>
                    <motion.p custom={2} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginTop: "0.5rem" }}>
                        Trek{trips.length !== 1 ? "s" : ""}
                    </motion.p>
                    <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem", maxWidth: "320px" }}>
                        {trips.slice(0, 8).map((t, i) => (
                            <div key={t.id} style={{ background: "rgba(255,255,255,0.2)", padding: "0.35rem 0.85rem", borderRadius: "100px", fontSize: "0.8rem", color: "#fff", fontWeight: 600, backdropFilter: "blur(8px)" }}>
                                {getEmojiForCountry(t.primaryDestinationCountry)} {t.primaryDestinationCity}
                            </div>
                        ))}
                        {trips.length > 8 && (
                            <div style={{ background: "rgba(255,255,255,0.2)", padding: "0.35rem 0.85rem", borderRadius: "100px", fontSize: "0.8rem", color: "#fff", fontWeight: 600 }}>
                                +{trips.length - 8} more
                            </div>
                        )}
                    </motion.div>
                </div>
            ),
        },
        // Slide 2: Countries
        {
            gradient: SLIDE_GRADIENTS[2],
            content: (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "2.5rem", textAlign: "center" }}>
                    <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                        <Globe size={60} color="rgba(255,255,255,0.9)" />
                    </motion.div>
                    <motion.p custom={1} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.75rem" }}>
                        You've explored
                    </motion.p>
                    <motion.div custom={2} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "clamp(5rem, 18vw, 8rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.05em" }}>
                        {countries.size}
                    </motion.div>
                    <motion.p custom={3} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                        {countries.size === 1 ? "Country" : "Countries"}
                    </motion.p>
                    <motion.div custom={4} variants={textVariants} initial="hidden" animate="visible" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", maxWidth: "300px" }}>
                        {[...countries].map((c) => (
                            <span key={c} style={{ fontSize: "1.5rem" }}>{getEmojiForCountry(c)}</span>
                        ))}
                    </motion.div>
                </div>
            ),
        },
        // Slide 3: Days traveled
        {
            gradient: SLIDE_GRADIENTS[3],
            content: (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "2.5rem", textAlign: "center" }}>
                    <motion.p custom={0} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.75rem" }}>
                        Time well spent
                    </motion.p>
                    <motion.div custom={1} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "clamp(5rem, 18vw, 8rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.05em" }}>
                        {totalDays}
                    </motion.div>
                    <motion.p custom={2} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginTop: "0.5rem", marginBottom: "2rem" }}>
                        Days Abroad
                    </motion.p>
                    <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: "1.5rem", padding: "1.25rem 2rem", border: "1px solid rgba(255,255,255,0.2)" }}>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.5 }}>
                            That&apos;s <strong>{Math.round(totalDays / 7)} weeks</strong> of world-class experiences outside the classroom
                        </p>
                    </motion.div>
                </div>
            ),
        },
        // Slide 4: Best memory (if exists)
        ...(topMemory ? [{
            gradient: SLIDE_GRADIENTS[4],
            content: (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "2.5rem" }}>
                    <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                        <Star size={28} color="rgba(255,255,255,0.9)" fill="rgba(255,255,255,0.9)" />
                        <p style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                            Peak Moment
                        </p>
                    </motion.div>
                    <motion.p custom={1} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {topMemory.name}
                    </motion.p>
                    <motion.blockquote custom={2} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.4, letterSpacing: "-0.02em", fontStyle: "italic", marginBottom: "2rem" }}>
                        &ldquo;{topMemory.memory!.highlightMoment}&rdquo;
                    </motion.blockquote>
                    <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <MapPin size={16} color="rgba(255,255,255,0.6)" />
                        <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                            {topMemory.primaryDestinationCity}, {topMemory.primaryDestinationCountry}
                        </span>
                    </motion.div>
                </div>
            ),
        }] : []),
        // Slide 5: Best food (if exists)
        ...(topFood ? [{
            gradient: SLIDE_GRADIENTS[5],
            content: (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "2.5rem" }}>
                    <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
                        🍜
                    </motion.div>
                    <motion.p custom={1} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>
                        Best Bite
                    </motion.p>
                    <motion.blockquote custom={2} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "clamp(1.2rem, 4vw, 1.7rem)", fontWeight: 700, color: "#fff", lineHeight: 1.4, letterSpacing: "-0.02em", fontStyle: "italic", marginBottom: "1.5rem" }}>
                        &ldquo;{topFood.memory!.foodPick}&rdquo;
                    </motion.blockquote>
                    <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                            — {topFood.primaryDestinationCity}
                        </span>
                    </motion.div>
                </div>
            ),
        }] : []),
        // Slide 6: Rating
        ...(completed.filter(t => t.memory?.overallRating).length > 0 ? [{
            gradient: SLIDE_GRADIENTS[6],
            content: (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "2.5rem", textAlign: "center" }}>
                    <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible" style={{ marginBottom: "1.25rem" }}>
                        <Trophy size={56} color="rgba(255,255,255,0.9)" />
                    </motion.div>
                    <motion.p custom={1} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.75rem" }}>
                        Your average rating
                    </motion.p>
                    <motion.div custom={2} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "clamp(5rem, 16vw, 7rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>
                        {avgRating.toFixed(1)}
                    </motion.div>
                    <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible" style={{ display: "flex", gap: "6px", marginTop: "1rem", marginBottom: "1.5rem" }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                                key={i}
                                size={28}
                                fill={i <= Math.round(avgRating) ? "#fff" : "rgba(255,255,255,0.25)"}
                                color={i <= Math.round(avgRating) ? "#fff" : "rgba(255,255,255,0.25)"}
                            />
                        ))}
                    </motion.div>
                    <motion.p custom={4} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
                        across {completed.filter(t => t.memory?.overallRating).length} rated expedition{completed.filter(t => t.memory?.overallRating).length !== 1 ? "s" : ""}
                    </motion.p>
                </div>
            ),
        }] : []),
        // Final slide
        {
            gradient: "linear-gradient(135deg, #141418 0%, #0f3460 50%, #16213e 100%)",
            content: (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "2.5rem", textAlign: "center" }}>
                    <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible" style={{ marginBottom: "1.5rem" }}>
                        <Sparkles size={56} color="#3B82F6" />
                    </motion.div>
                    <motion.h2 custom={1} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1rem" }}>
                        The world is your<br />classroom.
                    </motion.h2>
                    <motion.p custom={2} variants={textVariants} initial="hidden" animate="visible" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: "280px", lineHeight: 1.6, marginBottom: "2rem" }}>
                        {trips.length} treks · {countries.size} countries · {totalDays} days of legend
                    </motion.p>
                    <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "100px", padding: "0.5rem 1.25rem" }}>
                        <MapIcon size={14} color="#3B82F6" />
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#3B82F6" }}>TrekRank</span>
                    </motion.div>
                </div>
            ),
        },
    ].filter(Boolean) as { gradient: string; content: React.ReactNode }[];

    const total = slides.length;

    const goNext = useCallback(() => {
        if (slideIndex < total - 1) {
            setDirection(1);
            setSlideIndex((i) => i + 1);
        }
    }, [slideIndex, total]);

    const goPrev = useCallback(() => {
        if (slideIndex > 0) {
            setDirection(-1);
            setSlideIndex((i) => i - 1);
        }
    }, [slideIndex]);

    // Auto-advance
    useEffect(() => {
        if (!autoPlay || slideIndex === total - 1) {
            if (autoRef.current) clearTimeout(autoRef.current);
            return;
        }
        autoRef.current = setTimeout(goNext, 4000);
        return () => { if (autoRef.current) clearTimeout(autoRef.current); };
    }, [slideIndex, autoPlay, goNext, total]);

    const downloadSlide = async () => {
        if (!slideRef.current) return;
        setIsDownloading(true);
        try {
            const canvas = await html2canvas(slideRef.current, {
                useCORS: true,
                scale: 3,
                backgroundColor: null,
                logging: false,
            });
            const url = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = url;
            a.download = `trekrank-wrapped-${slideIndex + 1}.png`;
            a.click();
        } finally {
            setIsDownloading(false);
        }
    };

    const downloadAll = async () => {
        setIsDownloading(true);
        setAutoPlay(false);
        for (let i = 0; i < total; i++) {
            setDirection(1);
            setSlideIndex(i);
            await new Promise((r) => setTimeout(r, 800)); // wait for animation
            if (!slideRef.current) continue;
            try {
                const canvas = await html2canvas(slideRef.current, { useCORS: true, scale: 3, backgroundColor: null, logging: false });
                const url = canvas.toDataURL("image/png");
                const a = document.createElement("a");
                a.href = url;
                a.download = `trekrank-wrapped-slide-${i + 1}.png`;
                a.click();
                await new Promise((r) => setTimeout(r, 300));
            } catch {}
        }
        setIsDownloading(false);
    };

    const current = slides[slideIndex];

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.85)",
                backdropFilter: "blur(20px)",
                padding: "1rem",
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "1.25rem",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#fff",
                    zIndex: 10,
                }}
            >
                <X size={20} />
            </button>

            {/* Slide container */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    aspectRatio: "9/16",
                    maxHeight: "85vh",
                    position: "relative",
                    borderRadius: "2rem",
                    overflow: "hidden",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                    userSelect: "none",
                }}
                onClick={() => { setAutoPlay(false); goNext(); }}
            >
                <div ref={slideRef} style={{ width: "100%", height: "100%" }}>
                    <AnimatePresence custom={direction} mode="popLayout">
                        <motion.div
                            key={slideIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.34, 1.1, 0.64, 1] }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: current.gradient,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* Background particles */}
                            <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 0.15, scale: 1 }}
                                        transition={{ delay: i * 0.1, duration: 0.8 }}
                                        style={{
                                            position: "absolute",
                                            borderRadius: "50%",
                                            background: "rgba(255,255,255,0.3)",
                                            width: `${40 + i * 20}px`,
                                            height: `${40 + i * 20}px`,
                                            top: `${10 + i * 12}%`,
                                            right: `${5 + (i % 3) * 15}%`,
                                            filter: "blur(20px)",
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
                                {current.content}
                            </div>

                            {/* Progress dots */}
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "6px",
                                    paddingBottom: "1.5rem",
                                    paddingTop: "0.5rem",
                                }}
                            >
                                {slides.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            width: i === slideIndex ? "24px" : "6px",
                                            opacity: i === slideIndex ? 1 : 0.35,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            height: "6px",
                                            borderRadius: "3px",
                                            background: "#fff",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setAutoPlay(false);
                                            setDirection(i > slideIndex ? 1 : -1);
                                            setSlideIndex(i);
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Tap zones */}
                <div
                    style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "35%", zIndex: 5, cursor: "pointer" }}
                    onClick={(e) => { e.stopPropagation(); setAutoPlay(false); goPrev(); }}
                />
                <div
                    style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "35%", zIndex: 5, cursor: "pointer" }}
                    onClick={(e) => { e.stopPropagation(); setAutoPlay(false); goNext(); }}
                />
            </div>

            {/* Controls below slide */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginTop: "1.25rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <button
                    onClick={goPrev}
                    disabled={slideIndex === 0}
                    style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: slideIndex === 0 ? "not-allowed" : "pointer",
                        color: "#fff",
                        opacity: slideIndex === 0 ? 0.4 : 1,
                    }}
                >
                    <ChevronLeft size={20} />
                </button>

                <button
                    onClick={downloadSlide}
                    disabled={isDownloading}
                    style={{
                        background: "rgba(59,130,246,0.9)",
                        border: "none",
                        borderRadius: "100px",
                        padding: "0.6rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        opacity: isDownloading ? 0.7 : 1,
                    }}
                >
                    <Camera size={16} />
                    {isDownloading ? "Saving…" : "Save Slide"}
                </button>

                <button
                    onClick={downloadAll}
                    disabled={isDownloading}
                    style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "100px",
                        padding: "0.6rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        opacity: isDownloading ? 0.7 : 1,
                    }}
                >
                    <Download size={16} />
                    All Slides
                </button>

                <button
                    onClick={goNext}
                    disabled={slideIndex === total - 1}
                    style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: slideIndex === total - 1 ? "not-allowed" : "pointer",
                        color: "#fff",
                        opacity: slideIndex === total - 1 ? 0.4 : 1,
                    }}
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.75rem", textAlign: "center" }}>
                Tap slide to advance · Tap sides to navigate
            </p>
        </div>
    );
}
