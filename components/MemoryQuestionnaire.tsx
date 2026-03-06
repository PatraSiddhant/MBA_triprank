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
    { id: "highlight", title: "The Peak", question: "What was the single best moment of this trek?", icon: Star, placeholder: "e.g., Watching the sunrise over Machu Picchu...", field: "highlightMoment" },
    { id: "food", title: "The Taste", question: "What was the most memorable meal you had?", icon: Utensils, placeholder: "e.g., The street tacos in Medellin were game-changing.", field: "foodPick" },
    { id: "gem", title: "The Secret", question: "Discover a hidden gem others should see?", icon: MapPin, placeholder: "e.g., A tiny jazz club in Paris called...", field: "hiddenGem" },
    { id: "tip", title: "The Wisdom", question: "One tip for the next MBA student going here?", icon: Coffee, placeholder: "e.g., Book the train 3 months in advance.", field: "travelTip" }
];

export default function MemoryQuestionnaire({ tripId, tripName }: { tripId: string, tripName: string }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<any>({
        highlightMoment: "",
        foodPick: "",
        hiddenGem: "",
        travelTip: "",
        wouldReturn: true,
        overallRating: 5
    });
    const [isPending, startTransition] = useTransition();
    const [isFinished, setIsFinished] = useState(false);

    const step = STEPS[currentStep];
    const progress = ((currentStep + 1) / (STEPS.length + 1)) * 100;

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        startTransition(async () => {
            try {
                await saveMemoryAction(tripId, formData);
                setIsFinished(true);
            } catch (err) {
                alert("Failed to save memory. Please check your connection.");
            }
        });
    };

    if (isFinished) {
        return (
            <div className="glass animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🎉</div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Legend Recorded.</h2>
                <p style={{ color: 'var(--secondary)', marginBottom: '3rem' }}>Your memories are now part of your MBA legacy.</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ padding: '1rem 3rem' }}>View Journal</button>
            </div>
        );
    }

    return (
        <div className="glass" style={{
            padding: '3rem',
            borderRadius: '2rem',
            maxWidth: '700px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Progress Bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.05)' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </div>

            {currentStep < STEPS.length ? (
                <div key={step.id} className="animate-fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: 'var(--accent)' }}>
                            <step.icon size={24} />
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>{step.title}</span>
                    </div>

                    <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', lineHeight: 1.2 }}>{step.question}</h2>

                    <textarea
                        autoFocus
                        value={formData[step.field]}
                        onChange={(e) => setFormData({ ...formData, [step.field]: e.target.value })}
                        placeholder={step.placeholder}
                        style={{
                            width: '100%',
                            minHeight: '150px',
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '1.25rem',
                            padding: '1.5rem',
                            color: '#fff',
                            fontSize: '1.125rem',
                            fontFamily: 'inherit',
                            resize: 'none',
                            marginBottom: '3rem',
                            outline: 'none'
                        }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button onClick={handleBack} disabled={currentStep === 0} style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: currentStep === 0 ? 0 : 1, cursor: 'pointer' }}>
                            <ChevronLeft size={20} /> Back
                        </button>
                        <button onClick={handleNext} disabled={!formData[step.field]} className="btn btn-primary" style={{ padding: '0.75rem 2.5rem', gap: '0.5rem' }}>
                            Continue <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: 'var(--accent)' }}>
                            <Camera size={24} />
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Final Verdict</span>
                    </div>

                    <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', lineHeight: 1.2 }}>How would you rate the experience?</h2>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setFormData({ ...formData, overallRating: star })}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: star <= formData.overallRating ? '#fbbf24' : 'rgba(255,255,255,0.1)',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                <Star size={44} fill={star <= formData.overallRating ? '#fbbf24' : 'transparent'} />
                            </button>
                        ))}
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <button
                            onClick={() => setFormData({ ...formData, wouldReturn: !formData.wouldReturn })}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                color: formData.wouldReturn ? '#ff4d4d' : 'var(--secondary)',
                                cursor: 'pointer',
                                fontSize: '1.25rem',
                                fontWeight: 700
                            }}
                        >
                            <Heart size={28} fill={formData.wouldReturn ? '#ff4d4d' : 'transparent'} />
                            {formData.wouldReturn ? "I would go back in a heartbeat" : "Once was enough for me"}
                        </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button onClick={handleBack} style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <ChevronLeft size={20} /> Back
                        </button>
                        <button onClick={handleSubmit} disabled={isPending} className="btn btn-primary" style={{ padding: '1rem 3rem', gap: '0.75rem', fontSize: '1.125rem' }}>
                            {isPending ? "Recording..." : "Finalize Legend"} <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
