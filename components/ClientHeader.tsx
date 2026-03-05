// use client directive for client‑only behavior
"use client";

import { useState } from "react";

export default function ClientHeader() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="glass-dark" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '1rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
                    triprank<span style={{ color: 'var(--accent)' }}>.</span>
                </a>
                {/* Mobile menu button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--foreground)',
                        fontSize: '1.5rem',
                        display: 'none',
                    }}
                    aria-label="Toggle navigation"
                >
                    ☰
                </button>
                <div className={"nav-links " + (isOpen ? "open" : "")}
                    style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="/discover" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)' }}>Discover</a>
                    <a href="/rank" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)' }}>Trip Rank</a>
                    <a href="/socials" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)' }}>Socials</a>
                    <a href="/trips" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Get Started</a>
                </div>
            </div>
            <style jsx global>{`\n        @media (max-width: 640px) {\n          .mobile-menu-btn { display: block !important; }\n          .nav-links { display: none; flex-direction: column; background: var(--card); position: absolute; top: 100%; left: 0; width: 100%; padding: 1rem; }\n          .nav-links.open { display: flex; }\n          .nav-links a { padding: 0.5rem 0; }\n        }\n      `}</style>
        </nav>
    );
}
