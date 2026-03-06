import { getAllTripTemplates } from "@/data/trip-templates";
import { schools } from "@/data/schools";
import { Globe, Map, Award, BookOpen, Star, ChevronRight, Zap, Target } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredTrips = getAllTripTemplates().slice(0, 6);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
      {/* 1. Hero Section: "The World is Your Campus" */}
      <section style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem'
      }}>
        {/* Abstract Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '30vw',
          height: '30vw',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '900px' }} className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', opacity: 0.8 }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent)' }}>For the Global Elite</span>
            </div>
            <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8.5rem)', lineHeight: 0.85, marginBottom: '3rem', fontWeight: 900, letterSpacing: '-0.06em' }}>
              The World is Your <br /><span style={{ color: 'white' }}>Campus.</span>
            </h1>
            <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', color: 'var(--secondary)', marginBottom: '4rem', maxWidth: '650px', lineHeight: 1.4 }}>
              Discover iconic MBA treks, add custom cities to your interactive Global Footprint, generate WhatsApp recruitment messages, and download PDF itineraries without creating an account. The ultimate travel companion for the modern business student.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/discover" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1.25rem 2.5rem', fontWeight: 800 }}>Explore Treks</Link>
              <Link href="/trips" className="btn btn-secondary" style={{ fontSize: '1.125rem', padding: '1.25rem 2.5rem', fontWeight: 700 }}>My Quest Log</Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }}>
          <div style={{ width: '1px', height: '60px', background: 'white' }} />
        </div>
      </section>

      {/* 2. Track Section: First Year Focus */}
      <section style={{ padding: '12rem 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '8rem' }}>
            <div className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent)', marginBottom: '2rem' }}>
                <Map size={32} />
                <span style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phase 1: Explore</span>
              </div>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '2.5rem', lineHeight: 1.1 }}>Plan your next legendary journey.</h2>
              <p style={{ color: 'var(--secondary)', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3.5rem' }}>
                Browse 30+ MBA-curated trek templates. From Medellin street art to Tokyo night markets, build your wishlist for the next two years.
              </p>
              <Link href="/discover" style={{
                color: 'white',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '1.125rem'
              }}>
                Browse Templates <ChevronRight size={20} />
              </Link>
            </div>
            <div className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '3rem', transform: 'rotate(2deg)' }}>
              {/* Mockup of a trip card */}
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ opacity: 0.5, fontSize: '0.75rem', fontWeight: 800, marginBottom: '1rem' }}>FEATURED TEMPLATE</div>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Japan: The Tech & Tradition Trek</h4>
                <div style={{ color: 'var(--accent)', fontWeight: 700 }}>9 Days • Tokyo & Kyoto</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {[1, 2, 3].map(i => <div key={i} style={{ aspectRatio: '1', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Remember Section: Second Year Focus */}
      <section style={{ padding: '12rem 0' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '8rem', direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }} className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#00cc88', marginBottom: '2rem' }}>
                <Globe size={32} />
                <span style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phase 2: Remember</span>
              </div>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '2.5rem', lineHeight: 1.1 }}>Your travels, your story.</h2>
              <p style={{ color: 'var(--secondary)', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3.5rem' }}>
                Quickly add custom map pins for any popular city in the world to visualize your holistic global footprint. Then, instantly download beautifully formatted PDF itineraries of your journeys.
              </p>
              <Link href="/trips" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontWeight: 800 }}>Open Your Quest Log</Link>
            </div>
            <div className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '3rem', transform: 'rotate(-2deg)', direction: 'ltr' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
                <div style={{ fontWeight: 800 }}>Footprint: 12 Cities</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.5 }}>4 Countries conquered</div>
              </div>
              <div style={{ height: '150px', background: 'rgba(0,204,136,0.1)', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 800, color: '#00cc88' }}>Interactive Map Rendering...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rank Section: Social/Mobile Focus */}
      <section style={{ padding: '12rem 0', background: 'var(--card)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '8rem' }} className="animate-fade-in">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', color: '#fbbf24', marginBottom: '2rem' }}>
              <Award size={32} />
              <span style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phase 3: Community</span>
            </div>
            <h2 style={{ fontSize: '4rem', marginBottom: '2.5rem' }}>Ranked by the community.</h2>
            <p style={{ color: 'var(--secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
              Settle the debate. Pairwise rank treks to see which destinations are trending, or effortlessly recruit your cohort using our WhatsApp Invite generator.
            </p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '2.5rem', textAlign: 'center' }}>
              <Target size={40} color="var(--accent)" style={{ margin: '0 auto 2rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The Arena</h3>
              <p style={{ color: 'var(--secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>Quick-fire pairwise comparisons to find your true travel DNA.</p>
            </div>
            <div className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '2.5rem', textAlign: 'center' }}>
              <Zap size={40} color="#fbbf24" style={{ margin: '0 auto 2rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Trek Rank</h3>
              <p style={{ color: 'var(--secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>Dynamic global leaderboard updated in real-time by student votes.</p>
            </div>
            <div className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: '2.5rem', textAlign: 'center' }}>
              <BookOpen size={40} color="#00cc88" style={{ margin: '0 auto 2rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Instant Recruitment</h3>
              <p style={{ color: 'var(--secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>Generate high-conversion WhatsApp templates to hype your trek and easily collect RSVP commitments.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '6rem' }}>
            <Link href="/rank" className="btn btn-primary" style={{ padding: '1.25rem 4rem', fontSize: '1.125rem', fontWeight: 800 }}>Enter the Arena</Link>
          </div>
        </div>
      </section>

      {/* Footer-ish School Pride */}
      <section style={{ padding: '8rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '4rem' }}>Battle-tested by the best</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', opacity: 0.5 }}>
            {schools.map(school => (
              <div key={school.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: school.brandColor }} />
                <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>{school.name.split(' (')[0].toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
