import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "triprank | Discover Iconic MBA Treks",
  description: "Beli-style platform for discovery and ranking of the world's most iconic MBA trips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="glass-dark" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '1rem 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
              triprank<span style={{ color: 'var(--accent)' }}>.</span>
            </a>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="/discover" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)' }}>Discover</a>
              <a href="/rank" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)' }}>Trip Rank</a>
              <a href="/socials" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)' }}>Socials</a>
              <a href="/trips" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Get Started</a>
            </div>
          </div>
        </nav>
        <main style={{ paddingTop: '0' }}>
          {children}
        </main>
        <footer className="container" style={{ padding: '4rem 0', color: 'var(--secondary)', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '0.875rem' }}>© 2026 triprank. Built for the modern MBA.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#">About</a>
              <a href="#">Privacy</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
