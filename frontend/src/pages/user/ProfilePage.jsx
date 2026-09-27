import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { User, Mail, AtSign, Calendar, Star, LogOut, Film } from 'lucide-react';
import { getUserDetail } from '../../api/auth.api';
import useAuthStore from '../../store/authStore';
import Spinner from '../../components/common/Spinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { formatDate, getErrorMessage } from '../../utils/index';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      padding: '14px 0',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: 'var(--color-red-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={15} color="var(--color-red)" />
    </div>
    <div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>
        {label}
      </p>
      <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{value || '—'}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user: storeUser, logout } = useAuthStore();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user-detail'],
    queryFn: () => getUserDetail(),
    select: (res) => res.data.user,
    initialData: storeUser ? { data: { user: storeUser } } : undefined,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) return <Spinner fullPage />;

  if (error) {
    return (
      <div className="page-container" style={{ paddingTop: 48 }}>
        <ErrorMessage message={getErrorMessage(error)} />
      </div>
    );
  }

  const initial = user?.fullName?.[0]?.toUpperCase() || '?';

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="page-container" style={{ maxWidth: 640 }}>
        {/* Avatar header */}
        <div
          className="card animate-fade-in"
          style={{
            padding: '36px 32px',
            marginBottom: 24,
            background: 'linear-gradient(135deg, var(--color-card) 0%, var(--color-bg-secondary) 100%)',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'var(--color-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '2rem',
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 8px 24px rgba(224, 32, 32, 0.3)',
            }}
          >
            {initial}
          </div>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                letterSpacing: '-0.025em',
                marginBottom: 4,
              }}
            >
              {user?.fullName}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              @{user?.userName}
            </p>
          </div>
        </div>

        {/* Account info */}
        <div className="card" style={{ padding: '8px 24px', marginBottom: 24 }}>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              paddingTop: 16,
              paddingBottom: 4,
            }}
          >
            Account Information
          </p>
          <InfoRow icon={User} label="Full Name" value={user?.fullName} />
          <InfoRow icon={AtSign} label="Username" value={`@${user?.userName}`} />
          <InfoRow icon={Mail} label="Email" value={user?.email} />
          <InfoRow icon={Calendar} label="Member Since" value={formatDate(user?.createdAt)} />
        </div>

        {/* Quick links */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/my-reviews')}
            style={{ flex: 1, minWidth: 140 }}
          >
            <Star size={15} /> My Reviews
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/search')}
            style={{ flex: 1, minWidth: 140 }}
          >
            <Film size={15} /> Search Movies
          </button>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
            style={{ flex: 1, minWidth: 140 }}
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
