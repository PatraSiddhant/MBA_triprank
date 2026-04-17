"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Sparkles, Map, Clock, ArrowRight } from "lucide-react";

export default function TrekConcierge() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'system' | 'user' | 'assistant', content: string}[]>([
        { role: 'assistant', content: "Hi! I'm TrekConcierge. I see your Trip DNA favors 'YOLO Vibes'. Want me to optimize your current itinerary or find 3 nearby restaurants in Kyoto?" }
    ]);
    const [inputStr, setInputStr] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!inputStr.trim()) return;
        
        const userMsg = inputStr.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInputStr("");
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "That sounds like a great idea! I've updated the constraints in your timeline. Because you selected 'Crew', I'm recommending we pre-book all dinner reservations. Should I add these to Day 3?" 
            }]);
        }, 1500);
    };

    return (
        <>
            {/* Floating Action Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="desktop-only"
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        width: '64px',
                        height: '64px',
                        borderRadius: '32px',
                        background: 'var(--accent)',
                        color: '#000',
                        border: 'none',
                        boxShadow: '0 10px 30px rgba(var(--accent-rgb), 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 9000,
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Sparkles size={28} />
                </button>
            )}

            {/* Sliding Panel */}
            <div
                style={{
                    position: 'fixed',
                    top: '4.5rem',
                    bottom: 0,
                    right: isOpen ? 0 : '-400px',
                    width: '380px',
                    background: 'var(--bg-1)',
                    borderLeft: '1px solid var(--border)',
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                    zIndex: 9001,
                    transition: 'right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                className="desktop-only"
            >
                {/* Header */}
                <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(var(--accent-rgb), 0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'var(--accent)', padding: '6px', borderRadius: '8px' }}>
                            <Sparkles size={16} color="#000" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg-0)', margin: 0 }}>TrekConcierge</h3>
                            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%', display: 'inline-block' }}></span>
                                Online
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--fg-2)', cursor: 'pointer', padding: '4px' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--fg-3)', letterSpacing: '0.05em', fontWeight: 600 }}>TrekRank AI</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--fg-2)' }}>Powered by your Trip DNA</div>
                    </div>

                    {messages.map((msg, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                            {msg.role === 'assistant' && (
                                <div style={{ width: '28px', height: '28px', borderRadius: '14px', background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem', flexShrink: 0 }}>
                                    <Sparkles size={14} />
                                </div>
                            )}
                            <div style={{
                                background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-2)',
                                color: msg.role === 'user' ? '#000' : 'var(--fg-0)',
                                padding: '0.8rem 1rem',
                                borderRadius: msg.role === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                                maxWidth: '80%',
                                fontSize: '0.9rem',
                                lineHeight: 1.5,
                                fontWeight: msg.role === 'user' ? 600 : 400,
                                border: msg.role === 'user' ? 'none' : '1px solid var(--border)'
                            }}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '14px', background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem', flexShrink: 0 }}>
                                <Sparkles size={14} />
                            </div>
                            <div style={{
                                background: 'var(--bg-2)',
                                padding: '0.8rem 1rem',
                                borderRadius: '1rem 1rem 1rem 0',
                                display: 'flex',
                                gap: '4px',
                                border: '1px solid var(--border)',
                                alignItems: 'center'
                            }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--fg-2)', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                                <div style={{ width: '6px', height: '6px', background: 'var(--fg-2)', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></div>
                                <div style={{ width: '6px', height: '6px', background: 'var(--fg-2)', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                        {["Optimize itinerary", "Fit ski boots?", "Nearby eats"].map(q => (
                            <button
                                key={q}
                                onClick={() => setInputStr(q)}
                                style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--fg-2)', padding: '0.4rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', whiteSpace: 'nowrap', cursor: 'pointer' }}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-0)', border: '1px solid var(--border)', padding: '0.5rem', borderRadius: '100px' }}>
                        <input
                            type="text"
                            placeholder="Ask Concierge..."
                            value={inputStr}
                            onChange={e => setInputStr(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--fg-0)', padding: '0.5rem 1rem', outline: 'none', fontSize: '0.9rem' }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputStr.trim()}
                            style={{ background: inputStr.trim() ? 'var(--accent)' : 'var(--bg-2)', color: inputStr.trim() ? '#000' : 'var(--fg-3)', border: 'none', width: '36px', height: '36px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputStr.trim() ? 'pointer' : 'default', transition: 'background 0.2s' }}
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
            
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `}</style>
        </>
    );
}
