"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, School, Compass, Users, Send } from "lucide-react";
import { saveOnboardingProfileArea, saveOnboardingDna } from "./actions";

const SCHOOLS = [
    "Harvard Business School",
    "Stanford GSB",
    "Wharton",
    "Booth",
    "Kellogg",
    "Columbia Business School",
    "MIT Sloan",
    "Haas",
    "Yale SOM",
    "Tuck",
    "INSEAD",
    "LBS"
];

const COHORT_YEARS = ["2024", "2025", "2026", "2027", "Alumni"];

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    
    // Step 1 State
    const [school, setSchool] = useState("");
    const [cohort, setCohort] = useState("");
    const [section, setSection] = useState("");
    
    // Step 2 State
    const [dna, setDna] = useState({
        beachVsMountain: 50,
        crewVsSolo: 50,
        partyVsQuiet: 50
    });

    const handleNext = async () => {
        if (step === 1) {
            // Save Profile
            try {
                await saveOnboardingProfileArea(school, cohort, section);
                setStep(2);
            } catch (err) {
                console.error(err);
                // Fallback to next step anyway in case of guest / errors
                setStep(2);
            }
        } else if (step === 2) {
            // Save DNA
            try {
                await saveOnboardingDna(dna);
                setStep(3);
            } catch (err) {
                setStep(3);
            }
        } else if (step === 3) {
            // Rank bootstrapped (we just assume they did it for MVP or will build the arena here)
            setStep(4);
        } else if (step === 4) {
            // Finish
            router.push("/");
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            
            {/* Progress Bar */}
            <div style={{ width: '100%', maxWidth: '500px', display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
                {[1, 2, 3, 4].map(s => (
                    <div key={s} style={{ flex: 1, height: '4px', background: s <= step ? 'var(--accent)' : 'var(--bg-3)', borderRadius: '4px', transition: 'all 0.3s' }} />
                ))}
            </div>

            <div style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: '24px', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                
                {step === 1 && (
                    <div className="animate-slide-in">
                        <School size={32} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Where are you studying?</h1>
                        <p style={{ color: 'var(--fg-2)', marginBottom: '2.5rem' }}>Personalize TrekRank for your specific MBA cohort.</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg-2)', marginBottom: '0.5rem' }}>Business School</label>
                                <select 
                                    value={school}
                                    onChange={e => setSchool(e.target.value)}
                                    style={{ width: '100%', padding: '1rem', background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--fg-0)', borderRadius: '12px', fontSize: '1rem' }}
                                >
                                    <option value="" disabled>Select your school</option>
                                    {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg-2)', marginBottom: '0.5rem' }}>Class Year</label>
                                    <select 
                                        value={cohort}
                                        onChange={e => setCohort(e.target.value)}
                                        style={{ width: '100%', padding: '1rem', background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--fg-0)', borderRadius: '12px', fontSize: '1rem' }}
                                    >
                                        <option value="" disabled>Year</option>
                                        {COHORT_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg-2)', marginBottom: '0.5rem' }}>Section/Cluster</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. A"
                                        value={section}
                                        onChange={e => setSection(e.target.value)}
                                        style={{ width: '100%', padding: '1rem', background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--fg-0)', borderRadius: '12px', fontSize: '1rem' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleNext}
                            disabled={!school || !cohort}
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '3rem', padding: '1.25rem', fontSize: '1.1rem', opacity: (!school || !cohort) ? 0.5 : 1 }}
                        >
                            Next <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-slide-in">
                        <Compass size={32} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Build your Trip DNA</h1>
                        <p style={{ color: 'var(--fg-2)', marginBottom: '2.5rem' }}>How do you like to travel? Slide to set your vibe.</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 600 }}>
                                    <span style={{ color: dna.beachVsMountain < 50 ? 'var(--fg-0)' : 'var(--fg-2)' }}>Beach</span>
                                    <span style={{ color: dna.beachVsMountain > 50 ? 'var(--fg-0)' : 'var(--fg-2)' }}>Mountain</span>
                                </div>
                                <input type="range" min="0" max="100" value={dna.beachVsMountain} onChange={e => setDna({...dna, beachVsMountain: parseInt(e.target.value)})} style={{ width: '100%', accentColor: 'var(--accent)' }} />
                            </div>
                            
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 600 }}>
                                    <span style={{ color: dna.crewVsSolo < 50 ? 'var(--fg-0)' : 'var(--fg-2)' }}>Massive Crew</span>
                                    <span style={{ color: dna.crewVsSolo > 50 ? 'var(--fg-0)' : 'var(--fg-2)' }}>Solo/Intimate</span>
                                </div>
                                <input type="range" min="0" max="100" value={dna.crewVsSolo} onChange={e => setDna({...dna, crewVsSolo: parseInt(e.target.value)})} style={{ width: '100%', accentColor: 'var(--accent)' }} />
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 600 }}>
                                    <span style={{ color: dna.partyVsQuiet < 50 ? 'var(--fg-0)' : 'var(--fg-2)' }}>Heavy Party</span>
                                    <span style={{ color: dna.partyVsQuiet > 50 ? 'var(--fg-0)' : 'var(--fg-2)' }}>Relaxed Culture</span>
                                </div>
                                <input type="range" min="0" max="100" value={dna.partyVsQuiet} onChange={e => setDna({...dna, partyVsQuiet: parseInt(e.target.value)})} style={{ width: '100%', accentColor: 'var(--accent)' }} />
                            </div>
                        </div>

                        <button onClick={handleNext} className="btn btn-primary" style={{ width: '100%', marginTop: '3rem', padding: '1.25rem', fontSize: '1.1rem' }}>
                            Next <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-slide-in">
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bootstrap the Engine</h1>
                        <p style={{ color: 'var(--fg-2)', marginBottom: '2.5rem' }}>To build your perfect feed, quickly rank 3 destinations against each other.</p>
                        
                        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', textAlign: 'center', margin: '2rem 0' }}>
                            <p style={{ color: 'var(--fg-2)' }}>[ Pairwise Ranking Arena placeholder ]</p>
                            <p style={{ fontSize: '0.875rem', marginTop: '1rem' }}>Which would you rather do for Spring Break?</p>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1, padding: '2rem 1rem' }}>Tokyo</button>
                                <button className="btn btn-secondary" style={{ flex: 1, padding: '2rem 1rem' }}>Patagonia</button>
                            </div>
                        </div>

                        <button onClick={handleNext} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1.25rem', fontSize: '1.1rem' }}>
                            Skip for now
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-slide-in" style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '40px', background: 'rgba(var(--accent-rgb), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                            <Users size={40} color="var(--accent)" />
                        </div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bring your squad</h1>
                        <p style={{ color: 'var(--fg-2)', marginBottom: '2.5rem' }}>TrekRank is built for cohorts. Invite two friends from {school || "your school"} to kickstart your network.</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-2)', padding: '0.5rem', borderRadius: '100px', border: '1px solid var(--border)' }}>
                                <input type="email" placeholder="friend1@school.edu" style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--fg-0)', padding: '0.5rem 1rem', outline: 'none' }} />
                                <button className="btn btn-primary" style={{ borderRadius: '100px', padding: '0.5rem 1rem' }}><Send size={16} /></button>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-2)', padding: '0.5rem', borderRadius: '100px', border: '1px solid var(--border)' }}>
                                <input type="email" placeholder="friend2@school.edu" style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--fg-0)', padding: '0.5rem 1rem', outline: 'none' }} />
                                <button className="btn btn-primary" style={{ borderRadius: '100px', padding: '0.5rem 1rem' }}><Send size={16} /></button>
                            </div>
                        </div>

                        <button onClick={handleNext} className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}>
                            Go to my Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
