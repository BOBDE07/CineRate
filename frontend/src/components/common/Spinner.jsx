/**
 * Spinner — full-page or inline loading indicator
 */
const Spinner = ({ size = 32, fullPage = false }) => {
  const spinner = (
    <div
      role="status"
      aria-label="Loading"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid var(--color-border)`,
        borderTopColor: 'var(--color-red)',
        animation: 'spin 0.75s linear infinite',
      }}
    />
  );

  if (fullPage) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        {spinner}
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {spinner}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default Spinner;
