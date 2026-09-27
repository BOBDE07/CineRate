import { AlertCircle } from 'lucide-react';

/**
 * ErrorMessage — displays an error alert box
 */
const ErrorMessage = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        background: 'rgba(224, 32, 32, 0.08)',
        border: '1px solid rgba(224, 32, 32, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        color: '#fc8181',
        fontSize: '0.875rem',
      }}
    >
      <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
