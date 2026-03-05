import Link from 'next/link'

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--accent)' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</h2>
            <p style={{ color: 'var(--secondary)', marginBottom: '3rem', maxWidth: '400px' }}>
                The trek you're looking for doesn't exist yet, or it's been moved to a new destination.
            </p>
            <Link href="/" className="btn btn-primary">
                Back to Base Camp
            </Link>
        </div>
    )
}
