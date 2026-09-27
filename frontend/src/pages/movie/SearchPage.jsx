import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Search, Film, Clock, Calendar } from 'lucide-react';
import { searchMovie } from '../../api/movie.api';
import ErrorMessage from '../../components/common/ErrorMessage';
import { formatDuration, getErrorMessage, isValidPoster, truncateText } from '../../utils/index';

const MovieCard = ({ movie, onClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="card card-hover animate-fade-in"
      onClick={onClick}
      style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${movie.title}`}
    >
      {/* Poster */}
      <div
        style={{
          width: '100%',
          aspectRatio: '2/3',
          background: 'var(--color-bg-secondary)',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}
      >
        {isValidPoster(movie.poster) && !imgError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            className="poster-img"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-card-hover)',
            }}
          >
            <Film size={40} color="var(--color-text-muted)" />
          </div>
        )}
        {/* Hover overlay */}
        <div
          className="poster-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 50%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--color-text-primary)',
            lineHeight: 1.3,
          }}
        >
          {movie.title}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          {movie.releaseDate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <Calendar size={11} />
              {new Date(movie.releaseDate).getFullYear()}
            </span>
          )}
          {movie.duration && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <Clock size={11} />
              {formatDuration(movie.duration)}
            </span>
          )}
        </div>

        {/* Genres */}
        {movie.genre && movie.genre.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {movie.genre.slice(0, 3).map((g) => (
              <span key={g} className="badge badge-genre" style={{ fontSize: '0.7rem' }}>
                {g}
              </span>
            ))}
          </div>
        )}

        {movie.description && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem', lineHeight: 1.5 }}>
            {truncateText(movie.description, 80)}
          </p>
        )}
      </div>

      <style>{`
        .poster-img { }
        div:hover .poster-overlay { opacity: 1; }
        div:hover .poster-img { transform: scale(1.04); }
      `}</style>
    </div>
  );
};

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { mutate, data, isPending, error, reset } = useMutation({
    mutationFn: (title) => searchMovie(title),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setSubmitted(true);
    mutate(trimmed);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (submitted) {
      setSubmitted(false);
      reset();
    }
  };

  const movie = data?.data?.data;
  const serverError = error ? getErrorMessage(error) : null;

  return (
    <div style={{ padding: '48px 0 80px' }}>
      <div className="page-container">
        {/* Hero Search */}
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              marginBottom: 12,
              letterSpacing: '-0.03em',
            }}
          >
            Find any{' '}
            <span style={{ color: 'var(--color-red)' }}>movie</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 28 }}>
            Search by exact title to discover details, ratings, and reviews
          </p>

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search
                size={17}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="movie-search-input"
                type="text"
                className="form-input"
                placeholder="e.g. Inception, The Dark Knight…"
                value={query}
                onChange={handleInputChange}
                style={{ paddingLeft: 42 }}
                autoFocus
                autoComplete="off"
              />
            </div>
            <button
              id="movie-search-btn"
              type="submit"
              className="btn btn-primary"
              disabled={isPending || !query.trim()}
              style={{ flexShrink: 0 }}
            >
              {isPending ? 'Searching…' : 'Search'}
            </button>
          </form>
        </div>

        {/* Results */}
        {serverError && (
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <ErrorMessage message={serverError} />
          </div>
        )}

        {movie && !serverError && (
          <div style={{ maxWidth: 280, margin: '0 auto' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginBottom: 16, textAlign: 'center' }}>
              Result for &ldquo;{query}&rdquo;
            </p>
            <MovieCard movie={movie} onClick={() => navigate(`/movie/${movie.omdbId}`)} />
          </div>
        )}

        {/* Hints */}
        {!submitted && !movie && (
          <div
            style={{
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              marginTop: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
              {['Inception', 'The Dark Knight', 'Interstellar', 'Parasite', 'The Godfather'].map((hint) => (
                <button
                  key={hint}
                  className="badge badge-genre"
                  style={{ cursor: 'pointer', border: 'none', padding: '6px 14px', fontSize: '0.8125rem' }}
                  onClick={() => {
                    setQuery(hint);
                    setSubmitted(true);
                    mutate(hint);
                  }}
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
