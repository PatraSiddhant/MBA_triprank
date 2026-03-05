import { getTripTemplateBySlug } from "@/data/trip-templates";
import { schools } from "@/data/schools";
import { notFound } from "next/navigation";
import UseTemplateButton from "@/components/UseTemplateButton";
import { MapPin, Clock, DollarSign, Zap, Shield, Coffee, Camera } from "lucide-react";

export default async function TemplateDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const trip = getTripTemplateBySlug(slug);

    if (!trip) {
        notFound();
    }

    const tripSchools = trip.schoolSlugs.map(slug => schools.find(s => s.slug === slug));

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Hero Header */}
            <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '4rem' }}>
                <img
                    src={trip.photos[0].path}
                    alt={trip.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
                />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: -1 }} />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {tripSchools.map(s => s && (
                            <span key={s.slug} style={{
                                padding: '0.25rem 0.75rem',
                                background: s.brandColor,
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#fff',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                {s.name.toUpperCase()}
                            </span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '1rem' }}>{trip.title}</h1>
                    <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                            <MapPin size={18} /> <span>{trip.primaryDestinationCity}, {trip.primaryDestinationCountry}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                            <Clock size={18} /> <span>{trip.durationDays} Days</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                            <DollarSign size={18} /> <span>Budget: ${trip.roughBudgetUsd}+</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container grid" style={{ padding: '6rem 0', gridTemplateColumns: '1fr 350px', gap: '6rem' }}>
                {/* Main Content */}
                <div>
                    <div style={{ marginBottom: '6rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>About this Trek</h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', lineHeight: 1.6 }}>{trip.summary}</p>
                    </div>

                    <div style={{ marginBottom: '6rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Itinerary Highlights</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {trip.days.map((day) => (
                                <div key={day.dayIndex} style={{ display: 'flex', gap: '2rem' }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.25rem',
                                        fontWeight: 800,
                                        flexShrink: 0
                                    }}>
                                        {day.dayIndex}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{day.title}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {day.items.map((item, idx) => (
                                                <div key={idx} className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                        <h4 style={{ fontSize: '1.125rem' }}>{item.title}</h4>
                                                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>{item.timeBucket}</span>
                                                    </div>
                                                    <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '6rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Student Reviews</h2>
                        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {trip.reviewSnippets.map((review, idx) => (
                                <div key={idx} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)' }}>
                                    <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>"{review.text}"</p>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>— {review.sourceName}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ position: 'sticky', top: '8rem', height: 'fit-content' }}>
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)' }}>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Trip DNA</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {trip.vibes.map(v => (
                                    <span key={v} style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.875rem' }}>
                                        #{v}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Who's Going?</h3>
                            <div style={{ display: 'flex', gap: '-0.5rem', marginBottom: '1rem' }}>
                                {[1, 2, 3].map(i => (
                                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Friend${i}`} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--bg)', marginLeft: i > 0 ? '-8px' : '0' }} />
                                ))}
                                <div suppressHydrationWarning style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginLeft: '12px', alignSelf: 'center' }}>
                                    + {Math.floor(Math.random() * 20)} classmates interested
                                </div>
                            </div>
                            <div suppressHydrationWarning style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                                {Math.floor(85 + Math.random() * 10)}% Match with Your School
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--secondary)' }}>Safety Rating</span>
                                <div style={{ color: 'var(--accent)' }}>{'★'.repeat(trip.safetyRating)}{'☆'.repeat(5 - trip.safetyRating)}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--secondary)' }}>Comfort Level</span>
                                <div style={{ color: 'var(--accent)' }}>{'★'.repeat(trip.comfortRating)}{'☆'.repeat(5 - trip.comfortRating)}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <UseTemplateButton slug={trip.slug} />
                            <button className="btn btn-secondary" style={{ width: '100%', padding: '1.25rem' }}>
                                Book with MBA Discount
                            </button>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--secondary)', textAlign: 'center', marginTop: '1rem' }}>
                            Exclusive $200 discount for CBS Students.
                        </p>
                    </div>

                    <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)', marginTop: '2rem', textAlign: 'center', border: '1px dashed var(--accent)' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Already went on this trek?</div>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                            Post Your Review DNA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
