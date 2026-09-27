import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Film, Eye, EyeOff, LogIn } from 'lucide-react';
import { loginSchema } from '../../schemas/index';
import { loginUser } from '../../api/auth.api';
import useAuthStore from '../../store/authStore';
import ErrorMessage from '../../components/common/ErrorMessage';
import Spinner from '../../components/common/Spinner';
import { getErrorMessage } from '../../utils/index';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  });

  const onSubmit = async (data) => {
    setServerError('');
    setIsLoading(true);
    try {
      // identifier can be email or username — send both fields; backend handles it
      const isEmail = data.identifier.includes('@');
      const payload = isEmail
        ? { email: data.identifier, password: data.password }
        : { userName: data.identifier, password: data.password };

      const res = await loginUser(payload);
      const { token, user } = res.data;
      setAuth(user, token);
      navigate('/search');
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        background: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(224,32,32,0.08) 0%, transparent 70%), var(--color-bg)`,
      }}
    >
      <div
        className="card animate-scale-in"
        style={{ width: '100%', maxWidth: 420, padding: '40px 36px' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'var(--color-red)',
              marginBottom: 16,
            }}
          >
            <Film size={24} color="#fff" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Sign in to your CineRate account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="form-group">
            <label htmlFor="identifier" className="form-label">
              Email or Username
            </label>
            <input
              id="identifier"
              type="text"
              className="form-input"
              placeholder="you@example.com or @username"
              autoComplete="username"
              {...register('identifier')}
            />
            {errors.identifier && (
              <span className="form-error">{errors.identifier.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </div>

          {serverError && <ErrorMessage message={serverError} />}

          <button
            id="login-submit"
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={isLoading}
            style={{ marginTop: 4 }}
          >
            {isLoading ? (
              <>
                <Spinner size={18} /> Signing in…
              </>
            ) : (
              <>
                <LogIn size={17} /> Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer link */}
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: 24 }}>
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            style={{ color: 'var(--color-red)', fontWeight: 600, textDecoration: 'none' }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
