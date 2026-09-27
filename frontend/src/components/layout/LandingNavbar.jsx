import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Menu, X, Search, User, LogOut } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const LandingNavbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const navLinks = isAuthenticated
    ? [
        { label: 'Explore Movies', to: '/search', icon: <Search size={14} /> },
        { label: user?.userName || 'Profile', to: '/profile', icon: <User size={14} /> },
      ]
    : [
        { label: 'Home', to: '/' },
        { label: 'Explore Movies', to: '/search' },
        { label: 'Login', to: '/login' },
      ];

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border-subtle)' : '1px solid transparent',
      }}
    >
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          {/* Logo */}
          <Link
            to="/"
            aria-label="CineRate home"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                background: 'var(--color-red)',
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Film size={18} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#fff',
                letterSpacing: '-0.025em',
              }}
            >
              CineRate
            </span>
          </Link>

          {/* Desktop links */}
          <div className="landing-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.icon ? link.icon : null}
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                aria-label="Logout"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.6)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
              >
                <LogOut size={14} /> Logout
              </button>
            ) : (
              <Link
                to="/register"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 20px',
                  borderRadius: 10,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: 'var(--color-red)',
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                  marginLeft: 8,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-red-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-red)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="landing-nav-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              padding: 6,
              display: 'flex',
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: '12px 0 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              animation: 'fadeIn 0.2s ease',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 12px',
                  borderRadius: 8,
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                }}
              >
                {link.icon ? link.icon : null}
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 12px',
                  borderRadius: 8,
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: '#fc8181',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <LogOut size={15} /> Logout
              </button>
            ) : (
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 20px',
                  borderRadius: 10,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: 'var(--color-red)',
                  textDecoration: 'none',
                  marginTop: 8,
                }}
              >
                Get Started
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 680px) {
          .landing-nav-desktop { display: none !important; }
        }
        @media (min-width: 681px) {
          .landing-nav-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default LandingNavbar;
