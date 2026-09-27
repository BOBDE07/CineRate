import { useRef, useEffect, useState } from 'react';
import { Search, Star, PenLine, Users } from 'lucide-react';

const FEATURES = [
  {
    icon: Search,
    title: 'Discover Movies',
    description: 'Search and explore any movie you\'re interested in. Powered by a rich movie database.',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.12)',
  },
  {
    icon: Star,
    title: 'Rate Movies',
    description: 'Give every movie a personal rating from 1 to 10. Your ratings, your opinion.',
    color: 'var(--color-gold)',
    glow: 'rgba(245,197,24,0.12)',
  },
  {
    icon: PenLine,
    title: 'Write Reviews',
    description: 'Go beyond a score — write a full review to share your thoughts and analysis.',
    color: 'var(--color-red)',
    glow: 'rgba(224,32,32,0.12)',
  },
  {
    icon: Users,
    title: 'Community Reviews',
    description: 'Read what other movie lovers think. Get multiple perspectives on every film.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.12)',
  },
];

/* Simple intersection observer hook */
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

const FeatureCard = ({ feature, index }) => {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, var(--color-card-hover) 0%, var(--color-card) 100%)`
          : 'var(--color-card)',
        border: `1px solid ${hovered ? 'var(--color-border)' : 'var(--color-border-subtle)'}`,
        borderRadius: 20,
        padding: '32px 28px',
        cursor: 'default',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        transform: inView
          ? hovered ? 'translateY(-6px)' : 'translateY(0)'
          : 'translateY(24px)',
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 0.07}s`,
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.35)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top glow on hover */}
      {hovered && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
            opacity: 0.6,
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: feature.glow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          transition: 'transform 0.3s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <Icon size={24} color={feature.color} strokeWidth={1.75} />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.125rem',
          color: '#fff',
          marginBottom: 10,
        }}
      >
        {feature.title}
      </h3>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
        }}
      >
        {feature.description}
      </p>
    </div>
  );
};

const FeatureSection = () => {
  const { ref, inView } = useInView();

  return (
    <section aria-labelledby="features-heading" style={{ padding: '100px 0' }}>
      <div className="page-container">
        {/* Section header */}
        <div
          ref={ref}
          style={{
            textAlign: 'center',
            maxWidth: 560,
            margin: '0 auto 64px',
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
            Features
          </p>
          <h2
            id="features-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              letterSpacing: '-0.03em',
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Everything you need to{' '}
            <span style={{ color: 'var(--color-red)' }}>talk about movies</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
            One platform to search, rate, review, and discuss the movies you love.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
};

export default FeatureSection;
