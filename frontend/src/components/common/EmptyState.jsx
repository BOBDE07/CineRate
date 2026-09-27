import { Film } from 'lucide-react';

/**
 * EmptyState — shown when a list/search has no results
 */
const EmptyState = ({ icon: Icon = Film, title, description, action }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        textAlign: 'center',
        gap: 16,
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={28} color="var(--color-text-muted)" />
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', marginBottom: 6 }}>
          {title}
        </p>
        {description && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', maxWidth: 320 }}>
            {description}
          </p>
        )}
      </div>
      {action && <div style={{ marginTop: 4 }}>{action}</div>}
    </div>
  );
};

export default EmptyState;
