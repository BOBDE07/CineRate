import { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

/* ─── NOTE: This section uses illustrative sample content.
   The review and rating shown below are NOT real user reviews
   from the database — they exist only to demonstrate the rating
   experience visually. ─── */

const SAMPLE_RATING = 8.7;
const SAMPLE_REVIEW = {
  author: 'Alex M.',
  initials: 'AM',
  rating: 9,
  text:
    'An absolutely stunning film. The cinematography alone is worth the watch — every frame is meticulously composed. The performances are layered and the story keeps you on edge from start to finish.',
  movie: 'Sample Movie',
  label: '★ Illustrative sample — not a real user review',
};

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

const RatingShowcase = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      aria-labelledby="rating-heading"
      style={{ padding: '100px 0' }}
    >
      <div className="page-container">
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* Left: big rating number */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'all 0.7s ease',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-red)',
                marginBottom: 14,
              }}
            >
              Rating experience
            </p>
            <h2
              id="rating-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                letterSpacing: '-0.03em',
                color: '#fff',
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Your opinion
              <br />
              matters.
            </h2>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.75,
                marginBottom: 40,
                maxWidth: 380,
              }}
            >
              Rate every movie on a scale from{' '}
              <strong style={{ color: '#fff' }}>1 to 10</strong>.
              Your rating contributes to a community score that helps others
              decide what to watch next.
            </p>

            {/* Large rating display */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'flex-end',
                gap: 12,
                background: 'var(--color-card)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 20,
                padding: '24px 32px',
              }}
            >
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 4 }}>
                  Average rating
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '4rem',
                      color: 'var(--color-gold)',
                      lineHeight: 1,
                    }}
                  >
                    {SAMPLE_RATING}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>
                    / 10
                  </span>
                </div>
              </div>
              <div style={{ paddingBottom: 6 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        background: i < Math.round(SAMPLE_RATING)
                          ? 'var(--color-gold)'
                          : 'var(--color-border)',
                        transition: `background 0.3s ease ${i * 0.04}s`,
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Based on community ratings
                </p>
              </div>
            </div>
          </div>

          {/* Right: sample review card */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(24px)',
              transition: 'all 0.7s ease 0.15s',
            }}
          >
            <div
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 20,
                padding: '28px',
                position: 'relative',
              }}
            >
              {/* Illustrative content label */}
              <div
                style={{
                  background: 'rgba(245,197,24,0.08)',
                  border: '1px solid rgba(245,197,24,0.2)',
                  borderRadius: 6,
                  padding: '4px 10px',
                  marginBottom: 20,
                  display: 'inline-block',
                }}
              >
                <p style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 600, letterSpacing: '0.03em' }}>
                  {SAMPLE_REVIEW.label}
                </p>
              </div>

              <Quote
                size={32}
                color="var(--color-red)"
                style={{ opacity: 0.3, marginBottom: 16 }}
              />

              <p
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  marginBottom: 24,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{SAMPLE_REVIEW.text}&rdquo;
              </p>

              {/* Author row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'var(--color-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: '#fff',
                    }}
                  >
                    {SAMPLE_REVIEW.initials}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{SAMPLE_REVIEW.author}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Movie reviewer</p>
                  </div>
                </div>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    background: 'var(--color-gold-muted)',
                    border: '1px solid rgba(245,197,24,0.3)',
                    borderRadius: 100,
                    padding: '4px 12px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: 'var(--color-gold)',
                  }}
                >
                  <Star size={12} fill="currentColor" />
                  {SAMPLE_REVIEW.rating}/10
                </span>
              </div>
            </div>

            {/* Rating picker illustration */}
            <div
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 16,
                padding: '20px 24px',
                marginTop: 16,
              }}
            >
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
                How the rating picker looks:
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <div
                    key={n}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      border: `1px solid ${n === SAMPLE_REVIEW.rating ? 'var(--color-gold)' : 'var(--color-border)'}`,
                      background: n === SAMPLE_REVIEW.rating ? 'var(--color-gold-muted)' : 'transparent',
                      color: n === SAMPLE_REVIEW.rating ? 'var(--color-gold)' : 'var(--color-text-muted)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
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

export default RatingShowcase;
