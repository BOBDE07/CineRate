import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border-subtle)',
        padding: '60px 0 32px',
      }}
    >
      <div className="page-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: 'var(--color-red)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Film size={16} color="#fff" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                CineRate
              </span>
            </Link>
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                maxWidth: 240,
              }}
            >
              Discover movies, share your ratings, and connect with fellow movie lovers.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}
            >
              Navigate
            </p>
            <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'Explore Movies', to: '/search' },
                { label: 'Login', to: '/login' },
                { label: 'Register', to: '/register' },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    color: 'var(--color-text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* About */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}
            >
              About
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                A full-stack movie review platform built with React, Node.js, and MongoDB.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
            © {year} CineRate. All rights reserved.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
            Rate. Review. Repeat.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
