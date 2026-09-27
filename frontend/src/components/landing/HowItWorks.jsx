import { useRef, useEffect, useState } from 'react';
import { Search, Star, PenLine } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Search',
    description: 'Find any movie you want to talk about — just type the title.',
  },
  {
    number: '02',
    icon: Star,
    title: 'Rate',
    description: 'Give it a rating from 1 to 10 based on your experience.',
  },
  {
    number: '03',
    icon: PenLine,
    title: 'Review',
    description: 'Share your thoughts with other movie lovers in the community.',
  },
];

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

const HowItWorks = () => {
  const { ref, inView } = useInView();

  return (
    <section
      aria-labelledby="how-heading"
      style={{
        padding: '100px 0',
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="page-container">
        {/* Header */}
        <div
          ref={ref}
          style={{
            textAlign: 'center',
            maxWidth: 520,
            margin: '0 auto 72px',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
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
            How it works
          </p>
          <h2
            id="how-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              letterSpacing: '-0.03em',
              color: '#fff',
              lineHeight: 1.15,
            }}
          >
            Three steps to share your take
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            position: 'relative',
          }}
          className="steps-grid"
        >
          {/* Connector line (desktop only) */}
          <div
            aria-hidden="true"
            className="steps-connector"
            style={{
              position: 'absolute',
              top: 36,
              left: 'calc(16.67% + 26px)',
              right: 'calc(16.67% + 26px)',
              height: 1,
              background: 'linear-gradient(90deg, var(--color-border) 0%, var(--color-red) 50%, var(--color-border) 100%)',
              zIndex: 0,
            }}
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 28px',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `all 0.6s ease ${i * 0.12}s`,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Number + icon circle */}
                <div style={{ position: 'relative', marginBottom: 28 }}>
                  {/* Step number */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: 'var(--color-card)',
                      border: '2px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <Icon size={26} color="var(--color-red)" strokeWidth={1.5} />
                  </div>
                  {/* Number badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'var(--color-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.65rem',
                      color: '#fff',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: '#fff',
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    maxWidth: 220,
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .steps-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .steps-connector { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
