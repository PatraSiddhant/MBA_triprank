"use client";

import { useState } from "react";
import { Copy, MessageCircle, Check, X } from "lucide-react";
import { generateWhatsAppInvite, ShareData } from "@/lib/share-utils";

export default function WhatsAppInvite({ data }: { data: ShareData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const message = generateWhatsAppInvite(data);

    const handleCopy = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="btn btn-secondary"
                style={{ width: '100%', gap: '0.5rem', justifyContent: 'center', borderColor: 'rgba(37, 211, 102, 0.3)' }}
            >
                <MessageCircle size={18} color="#25D366" />
                Recruit Your Cohort
            </button>

            {isOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div className="glass animate-fade-in" style={{ maxWidth: '500px', width: '100%', borderRadius: '2rem', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                        <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'var(--secondary)', cursor: 'pointer' }}>
                            <X size={24} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ background: 'rgba(37, 211, 102, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <MessageCircle size={32} color="#25D366" />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Trek Invite Generator</h2>
                            <p style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>Copy this message and forward it to your WhatsApp groups to recruit the cohort!</p>
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem', maxHeight: '300px', overflowY: 'auto' }}>
                            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', lineHeight: 1.5, fontFamily: 'inherit', color: 'rgba(255,255,255,0.8)' }}>
                                {message}
                            </pre>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <button onClick={handleCopy} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
                                {copied ? <Check size={18} color="#00cc88" /> : <Copy size={18} />}
                                {copied ? "Copied!" : "Copy Text"}
                            </button>
                            <button onClick={handleWhatsApp} className="btn btn-primary" style={{ background: '#25D366', border: 'none', color: '#000', fontWeight: 800, gap: '0.5rem' }}>
                                <MessageCircle size={18} />
                                Open WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
