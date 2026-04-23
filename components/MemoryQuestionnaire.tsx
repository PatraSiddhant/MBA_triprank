"use client";

import { useState, useTransition } from "react";
import { saveMemoryAction } from "@/lib/memory-actions";
import { Heart, Star, Send, ChevronRight, ChevronLeft, MapPin, Coffee, Utensils, Camera } from "lucide-react";

interface Step {
    id: string;
    title: string;
    question: string;
    icon: any;
    placeholder: string;
    field: string;
}

const STEPS: Step[] = [
    { id: "highlight", title: "The Peak", question: "What was the single best moment of this trek?", icon: Star, placeholder: "e.g., Watching the sunrise over Machu Picchu…", field: "highlightMoment" },
    { id: "food", title: "The Taste", question: "What was the most memorable meal you had?", icon: Utensils, placeholder: "e.g., The street tacos in Medellín were game-changing.", field: "foodPick" },
    { id: "gem", title: "The Secret", question: "Discover a hidden gem others should know about?", icon: MapPin, placeholder: "e.g., A tiny jazz club in Paris called…", field: "hiddenGem" },
    { id: "tip", title: "The Wisdom", question: "One tip for the next MBA student going here?", icon: Coffee, placeholder: "e.g., Book the train 3 months in advance.", field: "travelTip" },
];

export default function MemoryQuestionnaire({ tripId, tripName }: { tripId: string; tripName: string }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<any>({
        highlightMoment: "",
        foodPick: "",
        hiddenGem: "",
        travelTip: "",
        wouldReturn: true,
        overallRating: 5,
    });
    const [hoveredStar, setHoveredStar] = useState(0);
    const [isPending, startTransition] = useTransition();
    const [isFinished, setIsFinished] = useState(false);

    const step = STEPS[currentStep];
    const progress = ((currentStep + 1) / (STEPS.length + 1)) * 100;

    const handleNext = () => { if (currentStep < STEPS.length) setCurrentStep(currentStep + 1); };
    const handleBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

    const handleSubmit = () => {
        startTransition(async () => {
            try {
                await saveMemoryAction(tripId, formData);
                setIsFinished(true);
            } catch {
                alert("Failed to save memory. Please check your connection.");
            }
        });
    };

    if (isFinished) {
        return (
            <div className="glass animate-fade-in" style={{ padding: "4rem 2rem", textAlign: "center", borderRadius: "2rem" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>🎉</div>
                <h2 style={{ fontSize: "2rem", marginBottom: "0.75rem", color: "var(--fg-0)" }}>Legend Recorded.</h2>
                <p style={{ color: "var(--fg-2)", marginBottom: "2.5rem" }}>Your memories are now part of your MBA legacy.</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ padding: "0.875rem 2.5rem", borderRadius: "100px" }}>
                    View Journal
                </button>
            </div>
        );
    }

    return (
        <div
            className="glass"
            style={{ padding: "2.5rem", borderRadius: "2rem", maxWidth: "660px", margin: "0 auto", position: "relative", overflow: "hidden" }}
        >
            {/* Progress bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "var(--border)" }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "var(--accent)",
                        transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                />
            </div>

            {/* Step counter */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    {currentStep < STEPS.length && (
                        <>
                            <div
                                style={{
                                    padding: "8px",
                                    background: "rgba(var(--accent-rgb), 0.1)",
                                    borderRadius: "10px",
                                    color: "var(--accent)",
                                    display: "flex",
                                }}
                            >
                                <step.icon size={20} />
                            </div>
                            <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-2)" }}>
                                {step.title}
                            </span>
                        </>
                    )}
                    {currentStep === STEPS.length && (
                        <>
                            <div style={{ padding: "8px", background: "rgba(var(--accent-rgb), 0.1)", borderRadius: "10px", color: "var(--accent)", display: "flex" }}>
                                <Camera size={20} />
                            </div>
                            <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-2)" }}>
                                Final Verdict
                            </span>
                        </>
                    )}
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--fg-3)", fontWeight: 600 }}>
                    {currentStep + 1} / {STEPS.length + 1}
                </span>
            </div>

            {currentStep < STEPS.length ? (
                <div key={step.id} className="animate-fade-in">
                    <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", marginBottom: "1.75rem", lineHeight: 1.25, color: "var(--fg-0)", fontWeight: 800 }}>
                        {step.question}
                    </h2>

                    <textarea
                        autoFocus
                        value={formData[step.field]}
                        onChange={(e) => setFormData({ ...formData, [step.field]: e.target.value })}
                        placeholder={step.placeholder}
                        rows={4}
                        style={{
                            width: "100%",
                            background: "var(--glass-bg)",
                            border: "1px solid var(--border)",
                            borderRadius: "1rem",
                            padding: "1.25rem",
                            color: "var(--fg-0)",
                            fontSize: "1rem",
                            fontFamily: "var(--font-body)",
                            resize: "none",
                            marginBottom: "2rem",
                            outline: "none",
                            lineHeight: 1.6,
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(var(--accent-rgb), 0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(var(--accent-rgb), 0.1)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                    />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "var(--fg-2)",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                opacity: currentStep === 0 ? 0 : 1,
                                cursor: currentStep === 0 ? "default" : "pointer",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                            }}
                        >
                            <ChevronLeft size={18} /> Back
                        </button>
                        <button
                            onClick={handleNext}
                            className="btn btn-primary"
                            style={{ padding: "0.7rem 2rem", gap: "0.5rem", borderRadius: "100px", fontSize: "0.9rem" }}
                        >
                            Continue <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in">
                    <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", marginBottom: "1.75rem", lineHeight: 1.25, color: "var(--fg-0)", fontWeight: 800 }}>
                        How would you rate the experience?
                    </h2>

                    {/* Star rating */}
                    <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem", alignItems: "center" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setFormData({ ...formData, overallRating: star })}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "transform 0.15s",
                                    transform: (hoveredStar || formData.overallRating) >= star ? "scale(1.2)" : "scale(1)",
                                    minHeight: "unset",
                                    minWidth: "unset",
                                    padding: "2px",
                                }}
                            >
                                <Star
                                    size={40}
                                    fill={(hoveredStar || formData.overallRating) >= star ? "#fbbf24" : "transparent"}
                                    color={(hoveredStar || formData.overallRating) >= star ? "#fbbf24" : "var(--border)"}
                                    strokeWidth={1.5}
                                />
                            </button>
                        ))}
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--fg-3)", marginBottom: "2rem", fontWeight: 600 }}>
                        {["", "Poor", "Fair", "Good", "Great", "Legendary!"][hoveredStar || formData.overallRating]}
                    </p>

                    {/* Would return */}
                    <button
                        onClick={() => setFormData({ ...formData, wouldReturn: !formData.wouldReturn })}
                        style={{
                            background: formData.wouldReturn ? "rgba(239,68,68,0.06)" : "var(--glass-bg)",
                            border: `1px solid ${formData.wouldReturn ? "rgba(239,68,68,0.2)" : "var(--border)"}`,
                            borderRadius: "1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.875rem",
                            padding: "1rem 1.25rem",
                            color: formData.wouldReturn ? "#EF4444" : "var(--fg-2)",
                            cursor: "pointer",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            width: "100%",
                            marginBottom: "2.5rem",
                            transition: "all 0.2s",
                        }}
                    >
                        <Heart size={22} fill={formData.wouldReturn ? "#EF4444" : "transparent"} />
                        {formData.wouldReturn ? "I'd go back in a heartbeat" : "Once was enough for me"}
                    </button>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button
                            onClick={handleBack}
                            style={{ background: "transparent", border: "none", color: "var(--fg-2)", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600 }}
                        >
                            <ChevronLeft size={18} /> Back
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="btn btn-accent"
                            style={{ padding: "0.75rem 2rem", gap: "0.6rem", borderRadius: "100px", fontSize: "0.9rem" }}
                        >
                            {isPending ? "Saving…" : "Finalize Legend"} <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
