import { getAllTripTemplates } from "@/data/trip-templates";
import { schools } from "@/data/schools";

export default function Home() {
  const featuredTrips = getAllTripTemplates().slice(0, 6);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(/trips/japan/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          opacity: 0.6
        }} />
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9))',
          zIndex: -1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '800px' }} className="animate-fade-in">
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, marginBottom: '2rem' }}>
              The World is Your <br /><span style={{ color: 'var(--accent)' }}>Campus.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '3rem', maxWidth: '600px' }}>
              Discover, rank, and plan iconic MBA treks with a community of global leaders. Built for the modern business student.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="/discover" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>Explore Iconic Treks</a>
              <a href="/trips" className="btn btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>My Trips</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="container" style={{ padding: '8rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Iconic Treks</h2>
            <p style={{ color: 'var(--secondary)' }}>The most popular destinations for the M7 and beyond.</p>
          </div>
          <a href="/discover" style={{
            color: 'var(--accent)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            View all 32 templates →
          </a>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {featuredTrips.map((trip) => (
            <div key={trip.slug} className="glass card image-zoom-container animate-fade-in" style={{
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ position: 'relative', height: '240px' }}>
                <img
                  src={trip.photos[0].path}
                  alt={trip.photos[0].alt}
                  className="image-zoom"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  gap: '0.25rem'
                }}>
                  {trip.schoolSlugs.slice(0, 3).map(slug => (
                    <div key={slug} style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: schools.find(s => s.slug === slug)?.brandColor || '#fff',
                      border: '2px solid rgba(255,255,255,0.2)'
                    }} title={slug.toUpperCase()} />
                  ))}
                </div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem' }}>{trip.title}</h3>
                  <span style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{trip.roughBudgetUsd}+</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {trip.summary}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.75rem' }}>
                    {trip.durationDays} Days
                  </span>
                  <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.75rem' }}>
                    {trip.themes[0]}
                  </span>
                </div>
                <a href={`/templates/${trip.slug}`} className="btn btn-secondary" style={{ width: '100%', padding: '0.5rem' }}>
                  Copy this trip
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trek Leaderboard Section */}
      <section style={{ padding: '8rem 0', background: 'var(--card-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Who's Leading the Pack?</h2>
            <p style={{ color: 'var(--secondary)', fontSize: '1.25rem' }}>Most saved and trending destinations by top MBA programs.</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--accent)' }}>●</span> Highest Ranked
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {getAllTripTemplates().slice(0, 5).sort((a, b) => b.roughBudgetUsd - a.roughBudgetUsd).map((trip, i) => (
                  <div key={trip.slug} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ width: '2rem', fontWeight: 800, opacity: 0.2 }}>0{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{trip.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>{trip.themes[0]} • {trip.durationDays} Days</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--accent)' }}>●</span> Most Active Schools
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {schools.map((school, i) => (
                  <div key={school.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: school.brandColor }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{school.name.split(' (')[0]}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>
                        {getAllTripTemplates().filter(t => t.schoolSlugs.includes(school.slug)).length} treks listed
                      </div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.875rem' }}>{Math.floor(Math.random() * 50) + 50}% activity</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--accent)' }}>●</span> Budget vs Vibes
              </h3>
              <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '1rem' }}>
                {[60, 80, 45, 95, 70, 55].map((v, i) => (
                  <div key={i} style={{ flex: 1, background: 'var(--accent)', height: `${v}%`, borderRadius: '4px', opacity: 0.3 + (v / 150) }} />
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', textAlign: 'center' }}>
                Real-time analysis of trek costs vs experience ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Section (Moved down) */}
      <section style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3rem' }}>
            Trusted by students from top global programs
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem', opacity: 0.6 }}>
            {schools.map(school => (
              <span key={school.id} style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>
                {school.name.split(' ')[0]} <span style={{ color: school.brandColor }}>.</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
