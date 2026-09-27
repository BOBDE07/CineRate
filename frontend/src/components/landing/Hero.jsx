import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Play, Star } from 'lucide-react';
import useAuthStore from '../../store/authStore';

/* ── Illustrative movie poster cards — not real backend data ── */
const SAMPLE_POSTERS = [
  { title: 'Interstellar', year: '2014', rating: '8.7', genre: 'Sci-Fi', color: '#1a1030' },
  { title: 'The Godfather', year: '1972', rating: '9.2', genre: 'Crime', color: '#2a1010' },
  { title: 'Inception', year: '2010', rating: '8.8', genre: 'Thriller', color: '#0d1a2a' },
  { title: 'Parasite', year: '2019', rating: '8.5', genre: 'Drama', color: '#0a1a10' },
];

/* Tiny illustrative poster card */
const PosterCard = ({ poster, style = {} }) => (
  <div
    style={{
      width: 120,
      minHeight: 180,
      borderRadius: 14,
      background: poster.color,
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      padding: '12px 10px 14px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backdropFilter: 'blur(4px)',
      flexShrink: 0,
      ...style,
    }}
  >
    {/* fake poster graphic */}
    <div
      style={{
        width: '100%',
        height: 90,
        borderRadius: 8,
        background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.05)',
        marginBottom: 8,
      }}
    >
      <Play size={20} color="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.1)" />
    </div>
    <div>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.75rem',
          color: '#fff',
          marginBottom: 2,
          lineHeight: 1.2,
        }}
      >
        {poster.title}
      </p>
      <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
        {poster.genre} · {poster.year}
      </p>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 3,
          background: 'rgba(245,197,24,0.15)',
          border: '1px solid rgba(245,197,24,0.25)',
          borderRadius: 100,
          padding: '2px 7px',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'var(--color-gold)',
        }}
      >
        <Star size={8} fill="currentColor" />
        {poster.rating}
      </span>
    </div>
  </div>
);

const Hero = () => {
  const { isAuthenticated } = useAuthStore();
  const ref = useRef(null);

  /* Subtle parallax on scroll */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.25}px)`;
    };
    // Respect reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#060609',
      }}
    >
      {/* Cinematic background */}
      <div
        ref={ref}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-10%',
          background: `
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(224,32,32,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 20% 30%, rgba(80,20,200,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 70% 80% at 50% 100%, rgba(10,10,20,1) 0%, transparent 50%),
            #060609
          `,
        }}
      />

      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.4,
        }}
      />

      <div className="page-container" style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: 120, paddingBottom: 80 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            gap: 60,
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left: copy */}
          <div style={{ maxWidth: 620 }}>
            {/* Eyebrow label */}
            <div
              className="animate-fade-in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(224,32,32,0.1)',
                border: '1px solid rgba(224,32,32,0.25)',
                borderRadius: 100,
                padding: '5px 14px',
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--color-red)',
                  display: 'block',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(224,32,32,0.9)',
                }}
              >
                Your next movie starts here
              </span>
            </div>

            {/* Headline */}
            <h1
              className="animate-slide-up"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: '#fff',
                marginBottom: 22,
                animationDelay: '0.05s',
              }}
            >
              Discover Movies.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-red) 0%, #ff6b6b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Share Your Reviews.
              </span>
            </h1>

            {/* Sub-copy */}
            <p
              className="animate-slide-up"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.75,
                marginBottom: 36,
                animationDelay: '0.12s',
                maxWidth: 520,
              }}
            >
              Explore movies, rate what you watch, and share your opinion with a community of movie lovers.
            </p>

            {/* CTAs */}
            <div
              className="animate-slide-up"
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                animationDelay: '0.2s',
              }}
            >
              <Link
                to="/search"
                id="hero-explore-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 30px',
                  background: 'var(--color-red)',
                  color: '#fff',
                  borderRadius: 12,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 24px rgba(224,32,32,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-red-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(224,32,32,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-red)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(224,32,32,0.3)';
                }}
              >
                <Play size={17} fill="#fff" />
                Explore Movies
              </Link>

              {!isAuthenticated && (
                <Link
                  to="/register"
                  id="hero-register-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '14px 30px',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    borderRadius: 12,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.12)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Create Account
                </Link>
              )}
            </div>

            {/* Social proof strip */}
            <div
              className="animate-fade-in"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginTop: 48,
                animationDelay: '0.35s',
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: '1–10', label: 'Rating scale' },
                { value: '∞', label: 'Movies to explore' },
                { value: '100%', label: 'Free to use' },
              ].map(({ value, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      color: '#fff',
                    }}
                  >
                    {value}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.3 }}>{label}</p>
                  <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)', marginLeft: 6 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: poster composition */}
          <div
            className="hero-posters animate-fade-in"
            aria-hidden="true"
            style={{
              position: 'relative',
              width: 280,
              height: 380,
              flexShrink: 0,
              animationDelay: '0.25s',
            }}
          >
            {SAMPLE_POSTERS.map((p, i) => {
              const positions = [
                { top: 0, left: 0, rotate: -8, scale: 0.88, zIndex: 1 },
                { top: 20, left: 80, rotate: -2, scale: 0.95, zIndex: 3 },
                { top: 40, left: 155, rotate: 6, scale: 0.88, zIndex: 2 },
                { top: 180, left: 35, rotate: 3, scale: 0.82, zIndex: 4 },
              ];
              const pos = positions[i];
              return (
                <div
                  key={p.title}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
                    zIndex: pos.zIndex,
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = `rotate(0deg) scale(1.05) translateY(-8px)`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = `rotate(${pos.rotate}deg) scale(${pos.scale})`)
                  }
                >
                  <PosterCard poster={p} />
                </div>
              );
            })}

            {/* Glow behind cards */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, rgba(224,32,32,0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          animation: 'bounceDown 2s ease infinite',
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <ChevronDown size={16} color="rgba(255,255,255,0.25)" />
      </div>

      <style>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-posters { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in, .animate-slide-up { animation: none !important; opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
