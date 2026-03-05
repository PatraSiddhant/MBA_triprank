import { getAllTripTemplates } from "@/data/trip-templates";
import { schools } from "@/data/schools";

export default async function DiscoverPage({
    searchParams,
}: {
    searchParams: Promise<{ school?: string; theme?: string }>;
}) {
    const { school: selectedSchool, theme: selectedTheme } = await searchParams;
    const allTemplates = getAllTripTemplates();

    const filteredTemplates = allTemplates.filter((trip) => {
        const matchesSchool = !selectedSchool || trip.schoolSlugs.includes(selectedSchool);
        const matchesTheme = !selectedTheme || trip.theme === selectedTheme;
        return matchesSchool && matchesTheme;
    });

    const themes = Array.from(new Set(allTemplates.map((t) => t.theme)));

    return (
        <div style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <div className="container">
                <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Iconic MBA Treks</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.25rem' }}>
                        Handpicked adventures from the world's top business programs.
                    </p>
                </header>

                {/* Filters */}
                <div className="glass-dark" style={{
                    padding: '1rem',
                    borderRadius: '100px',
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    marginBottom: '4rem',
                    flexWrap: 'wrap'
                }}>
                    <a href="/discover" className={`btn ${!selectedSchool && !selectedTheme ? 'btn-primary' : 'btn-secondary'}`} style={{ borderRadius: '100px', padding: '0.5rem 1.5rem' }}>
                        All
                    </a>

                    <div style={{ width: '1px', background: 'var(--border)', height: '2rem', margin: '0 0.5rem' }} />

                    {themes.map(theme => (
                        <a
                            key={theme}
                            href={`/discover?theme=${theme}${selectedSchool ? `&school=${selectedSchool}` : ''}`}
                            className={`btn ${selectedTheme === theme ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ borderRadius: '100px', padding: '0.5rem 1.5rem' }}
                        >
                            {theme}
                        </a>
                    ))}

                    <div style={{ width: '1px', background: 'var(--border)', height: '2rem', margin: '0 0.5rem' }} />

                    {schools.map(school => (
                        <a
                            key={school.slug}
                            href={`/discover?school=${school.slug}${selectedTheme ? `&theme=${selectedTheme}` : ''}`}
                            className={`btn ${selectedSchool === school.slug ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ borderRadius: '100px', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: school.brandColor }} />
                            {school.id.toUpperCase()}
                        </a>
                    ))}
                </div>

                {/* Results Grid */}
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredTemplates.map((trip) => (
                        <div key={trip.slug} className="glass card image-zoom-container animate-fade-in" style={{
                            borderRadius: 'var(--radius)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ position: 'relative', height: '200px' }}>
                                <img
                                    src={trip.photos[0].path}
                                    alt={trip.photos[0].alt}
                                    className="image-zoom"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.125rem' }}>{trip.title}</h3>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>${trip.roughBudgetUsd}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                                    {trip.schoolSlugs.map(slug => (
                                        <div key={slug} style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: schools.find(s => s.slug === slug)?.brandColor || '#fff'
                                        }} />
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}>
                                    {trip.durationDays} Days • {trip.theme}
                                </p>
                                <a href={`/templates/${trip.slug}`} className="btn btn-secondary" style={{ width: '100%', padding: '0.5rem' }}>
                                    View Template
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
