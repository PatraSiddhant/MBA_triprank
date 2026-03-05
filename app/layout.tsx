import type { Metadata } from "next";
import "./globals.css";
import ClientHeader from "@/components/ClientHeader";


export const metadata: Metadata = {
  title: "triprank | Discover Iconic MBA Treks",
  description: "Beli-style platform for discovery and ranking of the world's most iconic MBA trips.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <ClientHeader />
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
