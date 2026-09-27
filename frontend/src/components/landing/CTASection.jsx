import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const CTASection = () => {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      aria-labelledby="cta-heading"
      style={{
        padding: '100px 0',
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="page-container">
        <div
          ref={ref}
          style={{
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          {/* Icon decoration */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--color-red-muted)',
              border: '1px solid rgba(224,32,32,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
            }}
          >
            <Rocket size={26} color="var(--color-red)" strokeWidth={1.5} />
          </div>

          <h2
            id="cta-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 5vw, 3.25rem)',
              letterSpacing: '-0.035em',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Find your next{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-red) 0%, #ff6b6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              favorite movie.
            </span>
          </h2>

          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              lineHeight: 1.75,
              marginBottom: 40,
              maxWidth: 480,
              margin: '0 auto 40px',
            }}
          >
            Explore movies, share your ratings, and join the conversation with fellow movie lovers.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/search"
              id="cta-explore-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 34px',
                background: 'var(--color-red)',
                color: '#fff',
                borderRadius: 12,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'all 0.22s ease',
                boxShadow: '0 4px 20px rgba(224,32,32,0.28)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-red-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(224,32,32,0.42)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-red)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(224,32,32,0.28)';
              }}
            >
              <Rocket size={16} />
              Start Exploring
            </Link>

            <Link
              to="/register"
              id="cta-register-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 34px',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                borderRadius: 12,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                border: '1px solid var(--color-border)',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--color-text-muted)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Create a Free Account
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
