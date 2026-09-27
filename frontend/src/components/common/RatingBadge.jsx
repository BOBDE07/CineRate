import { Star } from 'lucide-react';

/**
 * RatingBadge — displays a star rating value with gold styling
 */
const RatingBadge = ({ rating, size = 'md' }) => {
  const sizes = {
    sm: { fontSize: '0.8125rem', iconSize: 12, padding: '2px 8px' },
    md: { fontSize: '0.9375rem', iconSize: 14, padding: '4px 10px' },
    lg: { fontSize: '1.25rem', iconSize: 18, padding: '6px 14px' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: 'var(--color-gold-muted)',
        border: '1px solid rgba(245, 197, 24, 0.3)',
        borderRadius: 100,
        padding: s.padding,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: s.fontSize,
        color: 'var(--color-gold)',
      }}
    >
      <Star size={s.iconSize} fill="currentColor" />
      {typeof rating === 'number' ? rating.toFixed(1) : rating}
    </span>
  );
};

export default RatingBadge;
