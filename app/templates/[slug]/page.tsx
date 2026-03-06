import { getTripTemplateBySlug } from "@/data/trip-templates";
import { schools } from "@/data/schools";
import { notFound } from "next/navigation";
import UseTemplateButton from "@/components/UseTemplateButton";
import TemplateInterestWidget from "@/components/TemplateInterestWidget";
import BookingTrigger from "@/components/BookingTrigger";
import ReviewTrigger from "@/components/ReviewTrigger";
import { getInterestData } from "@/lib/interest-actions";
import { createClient } from "@/lib/supabase/server";
import { MapPin, Clock, DollarSign, Zap, Shield, Coffee, Camera, ExternalLink } from "lucide-react";

export default async function TemplateDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const trip = getTripTemplateBySlug(slug);

    if (!trip) {
        notFound();
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const interestData = await getInterestData(slug);
    const isUserInterested = user ? interestData.users.some((u: any) => u.id === user.id) : false;

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
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
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
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800 }}>{trip.title}</h1>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                            <MapPin size={18} /> <span>{trip.primaryDestinationCity}, {trip.primaryDestinationCountry}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
                            <Clock size={18} /> <span>{trip.durationDays} Days</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: 700 }}>
                            <DollarSign size={18} /> <span>Budget: ${trip.roughBudgetUsd}+</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container" style={{ padding: '6rem 0' }}>
                <div className="responsive-stack">
                    {/* Main Content */}
                    <div>
                        <div style={{ marginBottom: '6rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 800 }}>About this Trek</h2>
                            <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', lineHeight: 1.6 }}>{trip.summary}</p>
                        </div>

                        <div style={{ marginBottom: '6rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '3rem', fontWeight: 800 }}>Itinerary Highlights</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                {trip.days.map((day) => (
                                    <div key={day.dayIndex} className="mobile-stack">
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
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
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>{day.title}</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                {day.items.map((item, idx) => (
                                                    <div key={idx} className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                                                            <h4 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{item.title}</h4>
                                                            <span style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(var(--accent-rgb), 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{item.timeBucket}</span>
                                                        </div>
                                                        <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', lineHeight: 1.5 }}>{item.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '6rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 800 }}>Student Reviews</h2>
                            <div className="grid-2">
                                {trip.reviewSnippets.map((review, idx) => (
                                    <div key={idx} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', position: 'relative' }}>
                                        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>"{review.text}"</p>
                                        <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--secondary)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>— {review.sourceName}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="sticky-sidebar">
                        <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 700 }}>Trip DNA</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {trip.vibes.map(v => (
                                        <span key={v} style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600 }}>
                                            #{v}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <TemplateInterestWidget
                                slug={trip.slug}
                                initialCount={interestData.count}
                                initialInterested={isUserInterested}
                                users={interestData.users}
                            />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>Safety Rating</span>
                                    <div style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>{'★'.repeat(trip.safetyRating)}{'☆'.repeat(5 - trip.safetyRating)}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>Comfort Level</span>
                                    <div style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>{'★'.repeat(trip.comfortRating)}{'☆'.repeat(5 - trip.comfortRating)}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <UseTemplateButton slug={trip.slug} />
                                <BookingTrigger slug={trip.slug} schoolName={tripSchools[0]?.name} />
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--secondary)', textAlign: 'center', marginTop: '1rem' }}>
                                Exclusive $200 discount for {tripSchools[0]?.name || 'MBA'} Students.
                            </p>
                        </div>

                        <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius)', marginTop: '2rem', textAlign: 'center', border: '1px dashed var(--accent)', cursor: 'default' }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>Already went on this trek?</div>
                            <ReviewTrigger tripTitle={trip.title} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
