export default function AboutPage() {
    return (
        <div style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                {/* About Section */}
                <section style={{ marginBottom: '6rem' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                        About <span style={{ color: 'var(--accent)' }}>trekrank</span>
                    </h1>
                    <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius)' }}>
                        <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            <strong style={{ color: 'var(--foreground)' }}>trekrank</strong> is the definitive platform for MBA students to discover, rank, and plan the world's most iconic business school treks.
                        </p>
                        <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            Built by MBA students, for MBA students. We believe your time between classes, internships, and recruiting should be filled with life-changing travel experiences that expand your worldview and deepen your bonds with classmates.
                        </p>
                        <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', lineHeight: 1.8 }}>
                            Our ELO-based ranking system helps you discover which treks match your personality, and our drag-and-drop calendar planner makes it easy to map out your entire MBA journey.
                        </p>
                    </div>
                </section>

                {/* Privacy Section */}
                <section id="privacy" style={{ marginBottom: '6rem', scrollMarginTop: '8rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Privacy Policy</h2>
                    <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--secondary)', lineHeight: 1.8 }}>
                            <div>
                                <h3 style={{ color: 'var(--foreground)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Data We Collect</h3>
                                <p>We collect only the information you provide during registration: your name, email address, and school affiliation. Your ranking preferences and trip plans are stored to personalize your experience.</p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--foreground)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>How We Use It</h3>
                                <p>Your data is used exclusively to power your personalized trek rankings, calendar planning, and community features. We never sell your data to third parties.</p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--foreground)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Your Rights</h3>
                                <p>You can request deletion of your account and all associated data at any time by contacting us. All data is stored securely using industry-standard encryption.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" style={{ marginBottom: '6rem', scrollMarginTop: '8rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Contact Us</h2>
                    <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius)' }}>
                        <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                            Have feedback, found a bug, or want to contribute? We'd love to hear from you.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(59,130,246,0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--accent)',
                                    fontSize: '1.25rem'
                                }}>✉</div>
                                <div>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Email</div>
                                    <a href="mailto:hello@trekrank.co" style={{ color: 'var(--accent)' }}>hello@trekrank.co</a>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(59,130,246,0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--accent)',
                                    fontSize: '1.25rem'
                                }}>💬</div>
                                <div>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Community</div>
                                    <span style={{ color: 'var(--secondary)' }}>Join the conversation on the Community tab</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
