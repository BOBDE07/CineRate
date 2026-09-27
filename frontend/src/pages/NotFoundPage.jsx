import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const NotFoundPage = () => (
  <div
    style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 24px',
      gap: 20,
    }}
    className="animate-fade-in"
  >
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Film size={32} color="var(--color-text-muted)" />
    </div>
    <div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '4rem',
          color: 'var(--color-red)',
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        404
      </h1>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.25rem', marginBottom: 8 }}>
        Page not found
      </p>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: 300 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
    </div>
    <Link to="/search" className="btn btn-primary">
      Go to Search
    </Link>
  </div>
);

export default NotFoundPage;
