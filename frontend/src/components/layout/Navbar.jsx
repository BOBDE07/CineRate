import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Film, Search, User, LogOut, Menu, X } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 hover:text-white ${
      isActive ? 'text-white' : 'text-[var(--color-text-secondary)]'
    }`;

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <Link
            to={isAuthenticated ? '/search' : '/login'}
            style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            <div
              style={{
                background: 'var(--color-red)',
                borderRadius: 8,
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Film size={18} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              CineRate
            </span>
          </Link>

          {/* Desktop Nav */}
          {isAuthenticated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Nav links */}
              <div
                className="hidden-mobile"
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <NavLink to="/search" className={navLinkClass} style={{ padding: '6px 14px', borderRadius: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Search size={14} />
                    Search
                  </span>
                </NavLink>
                <NavLink to="/my-reviews" className={navLinkClass} style={{ padding: '6px 14px', borderRadius: 8 }}>
                  My Reviews
                </NavLink>
                <NavLink to="/profile" className={navLinkClass} style={{ padding: '6px 14px', borderRadius: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={14} />
                    {user?.userName || 'Profile'}
                  </span>
                </NavLink>
              </div>

              {/* Logout – desktop */}
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm hidden-mobile"
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                aria-label="Logout"
              >
                <LogOut size={14} />
                Logout
              </button>

              {/* Hamburger – mobile */}
              <button
                className="show-mobile btn btn-ghost"
                style={{ padding: '6px' }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          )}

          {/* Not authenticated */}
          {!isAuthenticated && (
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && menuOpen && (
          <div
            className="animate-fade-in"
            style={{
              borderTop: '1px solid var(--color-border-subtle)',
              padding: '12px 0 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <NavLink
              to="/search"
              className={navLinkClass}
              style={{ padding: '10px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => setMenuOpen(false)}
            >
              <Search size={15} /> Search Movies
            </NavLink>
            <NavLink
              to="/my-reviews"
              className={navLinkClass}
              style={{ padding: '10px 12px', borderRadius: 8 }}
              onClick={() => setMenuOpen(false)}
            >
              My Reviews
            </NavLink>
            <NavLink
              to="/profile"
              className={navLinkClass}
              style={{ padding: '10px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}
              onClick={() => setMenuOpen(false)}
            >
              <User size={15} /> Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
              style={{ alignSelf: 'flex-start', marginTop: 4, marginLeft: 4 }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile/Desktop responsive helper styles */}
      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
