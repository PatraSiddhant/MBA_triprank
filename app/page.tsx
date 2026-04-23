import { getAllTripTemplates } from "@/data/trip-templates";
import { schools } from "@/data/schools";
import { Globe, Map, Award, BookOpen, Star, ChevronRight, Zap, Target } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredTrips = getAllTripTemplates().slice(0, 6);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)" }}>

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 2rem",
        }}
      >
        {/* Background glows — subtle in light, visible in dark */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "40vw",
            height: "40vw",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: "30vw",
            height: "30vw",
            background: "radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: "900px" }} className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <div style={{ width: "36px", height: "1px", background: "var(--accent)" }} />
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--accent)",
                }}
              >
                For the Global Elite
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                lineHeight: 0.9,
                marginBottom: "2.5rem",
                fontWeight: 900,
                letterSpacing: "-0.06em",
                color: "var(--fg-0)",
              }}
            >
              The World is Your{" "}
              <br />
              {/* "Campus." is always the primary text color — black in light, white in dark */}
              <span style={{ color: "var(--fg-0)" }}>Campus.</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.35rem)",
                color: "var(--fg-2)",
                marginBottom: "3.5rem",
                maxWidth: "620px",
                lineHeight: 1.55,
              }}
            >
              Discover iconic MBA treks, pin cities to your interactive Global Footprint, generate
              WhatsApp recruitment messages, and download PDF itineraries — no account needed to explore.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/discover"
                className="btn btn-primary btn-shine"
                style={{ fontSize: "1rem", padding: "1rem 2.25rem", fontWeight: 800, borderRadius: "100px" }}
              >
                Explore Treks
              </Link>
              <Link
                href="/journal"
                className="btn btn-secondary"
                style={{ fontSize: "1rem", padding: "1rem 2.25rem", fontWeight: 700, borderRadius: "100px" }}
              >
                My Journal
              </Link>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", opacity: 0.2 }}>
          <div style={{ width: "1px", height: "50px", background: "var(--fg-0)" }} />
        </div>
      </section>

      {/* ── Phase 1: Explore ── */}
      <section style={{ padding: "10rem 0" }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: "6rem" }}>
            <div className="animate-fade-in">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--accent)", marginBottom: "1.5rem" }}>
                <Map size={28} />
                <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>Phase 1: Explore</span>
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.5rem", lineHeight: 1.1, color: "var(--fg-0)" }}>
                Plan your next legendary journey.
              </h2>
              <p style={{ color: "var(--fg-2)", fontSize: "1.1rem", lineHeight: 1.65, marginBottom: "2.5rem" }}>
                Browse 30+ MBA-curated trek templates. From Medellín street art to Tokyo night markets,
                build your wishlist for the next two years.
              </p>
              <Link
                href="/discover"
                style={{
                  color: "var(--accent)",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1rem",
                }}
              >
                Browse Templates <ChevronRight size={18} />
              </Link>
            </div>

            <div
              className="glass animate-fade-in"
              style={{ padding: "2.5rem", borderRadius: "2.5rem", transform: "rotate(1.5deg)" }}
            >
              <div
                style={{
                  padding: "1.25rem",
                  background: "rgba(var(--accent-rgb), 0.06)",
                  borderRadius: "1.25rem",
                  marginBottom: "1.25rem",
                  border: "1px solid rgba(var(--accent-rgb), 0.1)",
                }}
              >
                <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em", color: "var(--fg-3)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                  Featured Template
                </div>
                <h4 style={{ fontSize: "1.25rem", marginBottom: "0.4rem", color: "var(--fg-0)" }}>Japan: Tech &amp; Tradition</h4>
                <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.9rem" }}>9 Days · Tokyo &amp; Kyoto</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "1",
                      background: "rgba(var(--accent-rgb), 0.04)",
                      borderRadius: "0.75rem",
                      border: "1px solid var(--border)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Phase 2: Remember ── */}
      <section style={{ padding: "10rem 0", background: "var(--bg-2)" }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: "6rem", direction: "rtl" }}>
            <div style={{ direction: "ltr" }} className="animate-fade-in">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#22C55E", marginBottom: "1.5rem" }}>
                <Globe size={28} />
                <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>Phase 2: Remember</span>
              </div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.5rem", lineHeight: 1.1, color: "var(--fg-0)" }}>
                Your travels, your story.
              </h2>
              <p style={{ color: "var(--fg-2)", fontSize: "1.1rem", lineHeight: 1.65, marginBottom: "2.5rem" }}>
                Add custom map pins for any city in the world to visualize your global footprint,
                journal your memories, and download beautifully formatted PDF itineraries.
              </p>
              <Link href="/journal" className="btn btn-primary" style={{ padding: "0.875rem 2rem", fontWeight: 800, borderRadius: "100px", fontSize: "0.95rem" }}>
                Open Your Journal
              </Link>
            </div>

            <div
              className="glass animate-fade-in"
              style={{ padding: "2.5rem", borderRadius: "2.5rem", transform: "rotate(-1.5deg)", direction: "ltr" }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🗺️</div>
                <div style={{ fontWeight: 800, color: "var(--fg-0)" }}>Footprint: 12 Cities</div>
                <div style={{ fontSize: "0.875rem", color: "var(--fg-3)", marginTop: "0.25rem" }}>4 Countries conquered</div>
              </div>
              <div
                style={{
                  height: "120px",
                  background: "rgba(34, 197, 94, 0.08)",
                  borderRadius: "1.25rem",
                  border: "1px solid rgba(34, 197, 94, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: 800, color: "#22C55E", fontSize: "0.9rem" }}>Interactive Map Rendering…</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Phase 3: Community ── */}
      <section style={{ padding: "10rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5rem" }} className="animate-fade-in">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", color: "#F59E0B", marginBottom: "1.5rem" }}>
              <Award size={26} />
              <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>Phase 3: Community</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.5rem", color: "var(--fg-0)" }}>Ranked by the community.</h2>
            <p style={{ color: "var(--fg-2)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
              Settle the debate. Pairwise rank treks to see which destinations are trending, then recruit
              your cohort using the WhatsApp Invite generator.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: Target, color: "var(--accent)", title: "The Arena", desc: "Quick-fire pairwise comparisons to find your true travel DNA." },
              { icon: Zap, color: "#F59E0B", title: "Trek Rank", desc: "Dynamic global leaderboard updated in real-time by student votes." },
              { icon: BookOpen, color: "#22C55E", title: "Instant Recruitment", desc: "Generate high-conversion WhatsApp templates to hype your trek." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="glass card animate-fade-in" style={{ padding: "2rem", borderRadius: "1.75rem", textAlign: "center" }}>
                <div style={{ display: "inline-flex", padding: "1rem", background: `rgba(var(--accent-rgb), 0.08)`, borderRadius: "1rem", marginBottom: "1.25rem" }}>
                  <Icon size={32} color={color} />
                </div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.6rem", color: "var(--fg-0)" }}>{title}</h3>
                <p style={{ color: "var(--fg-2)", fontSize: "0.9rem", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <Link
              href="/rank"
              className="btn btn-primary"
              style={{ padding: "1rem 3rem", fontSize: "1rem", fontWeight: 800, borderRadius: "100px" }}
            >
              Enter the Arena
            </Link>
          </div>
        </div>
      </section>

      {/* ── School Pride ── */}
      <section style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--fg-3)", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "3rem" }}>
            Battle-tested by the best
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", opacity: 0.45 }}>
            {schools.map((school) => (
              <div key={school.id} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: school.brandColor, flexShrink: 0 }} />
                <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "var(--fg-0)" }}>
                  {school.name.split(" (")[0].toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
