import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  ArrowLeft, Clock, Calendar, Tag,
  Edit2, Trash2, MessageSquare, ChevronDown, ChevronUp,
} from 'lucide-react';
import { getMovieDetail } from '../../api/movie.api';
import { getAllReviews, createReview, updateReview, deleteReview } from '../../api/review.api';
import useAuthStore from '../../store/authStore';
import Spinner from '../../components/common/Spinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import RatingBadge from '../../components/common/RatingBadge';
import EmptyState from '../../components/common/EmptyState';
import ReviewForm from '../../components/review/ReviewForm';
import { formatDate, formatDuration, getErrorMessage, isValidPoster } from '../../utils/index';

/* ── ReviewCard ──────────────────────────────────────────────────────────── */
const ReviewCard = ({ review, currentUserId, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const isOwner = review.userId?._id === currentUserId || review.userId === currentUserId;
  const text = review.review || '';
  const truncated = text.length > 180 ? text.slice(0, 180) + '…' : text;

  return (
    <div
      className="card animate-fade-in"
      style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--color-card-hover)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--color-red)',
              flexShrink: 0,
            }}
          >
            {(review.userId?.fullName || 'U')[0].toUpperCase()}
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>
              {review.userId?.fullName || 'Anonymous'}
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>
        <RatingBadge rating={review.rating} size="sm" />
      </div>

      <div>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, fontSize: '0.9rem' }}>
          {expanded ? text : truncated}
        </p>
        {text.length > 180 && (
          <button
            className="btn btn-ghost btn-sm"
            style={{ padding: '4px 0', marginTop: 4, gap: 3 }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <><ChevronUp size={13} /> Show less</> : <><ChevronDown size={13} /> Read more</>}
          </button>
        )}
      </div>

      {isOwner && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(review)} style={{ gap: 4 }}>
            <Edit2 size={13} /> Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(review._id)} style={{ gap: 4 }}>
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

/* ── MovieDetailPage ─────────────────────────────────────────────────────── */
const MovieDetailPage = () => {
  const { omdbId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [editingReview, setEditingReview] = useState(null); // null | review object
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formError, setFormError] = useState('');

  /* Queries */
  const {
    data: movieData,
    isLoading: movieLoading,
    error: movieError,
  } = useQuery({
    queryKey: ['movie', omdbId],
    queryFn: () => getMovieDetail(omdbId),
    select: (res) => res.data.data,
  });

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ['reviews', movieData?._id],
    queryFn: () => getAllReviews(movieData._id),
    enabled: !!movieData?._id,
    select: (res) => res.data,
  });

  /* Mutations */
  const createMutation = useMutation({
    mutationFn: (data) =>
      createReview({ movieId: movieData._id, rating: data.rating, review: data.review }),
    onSuccess: () => {
      refetchReviews();
      setShowReviewForm(false);
      setFormError('');
    },
    onError: (err) => setFormError(getErrorMessage(err)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateReview(id, data),
    onSuccess: () => {
      refetchReviews();
      setEditingReview(null);
      setFormError('');
    },
    onError: (err) => setFormError(getErrorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => refetchReviews(),
    onError: (err) => alert(getErrorMessage(err)),
  });

  /* Handlers */
  const handleCreateSubmit = (data) => {
    setFormError('');
    createMutation.mutate(data);
  };

  const handleUpdateSubmit = (data) => {
    setFormError('');
    updateMutation.mutate({ id: editingReview._id, data });
  };

  const handleDelete = (reviewId) => {
    if (!window.confirm('Delete this review?')) return;
    deleteMutation.mutate(reviewId);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowReviewForm(false);
    setFormError('');
  };

  /* User's own review */
  const myReview = reviewsData?.allReviews?.find(
    (r) => r.userId?._id === user?._id || r.userId === user?._id
  );
  const hasReviewed = !!myReview;

  /* ── Render ── */
  if (movieLoading) return <Spinner fullPage />;

  if (movieError) {
    return (
      <div className="page-container" style={{ paddingTop: 48 }}>
        <ErrorMessage message={getErrorMessage(movieError)} />
        <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => navigate(-1)}>
          <ArrowLeft size={14} /> Go Back
        </button>
      </div>
    );
  }

  if (!movieData) return null;

  const { title, poster, description, releaseDate, genre, duration } = movieData;

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Hero banner */}
      <div
        style={{
          position: 'relative',
          minHeight: 340,
          background: isValidPoster(poster)
            ? `linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.92) 100%), url(${poster}) center/cover no-repeat`
            : `linear-gradient(135deg, var(--color-card) 0%, var(--color-bg-secondary) 100%)`,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div className="page-container" style={{ paddingTop: 80, paddingBottom: 40, width: '100%' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(-1)}
            style={{ marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: 700,
              marginBottom: 12,
            }}
          >
            {title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
            {releaseDate && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                <Calendar size={13} />
                {formatDate(releaseDate)}
              </span>
            )}
            {duration && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                <Clock size={13} />
                {formatDuration(duration)}
              </span>
            )}
            {reviewsData && (
              <RatingBadge rating={reviewsData.avgRating} size="md" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="page-container" style={{ paddingTop: 36 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 40,
          }}
        >
          {/* Left: poster + genres */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {isValidPoster(poster) && (
              <img
                src={poster}
                alt={title}
                style={{
                  width: '100%',
                  maxWidth: 280,
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              />
            )}
            {genre && genre.length > 0 && (
              <div>
                <p style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                  <Tag size={11} /> Genres
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {genre.map((g) => (
                    <span key={g} className="badge badge-genre">{g}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: description + reviews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Description */}
            <div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                Overview
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                {description || 'No description available.'}
              </p>
            </div>

            {/* Stats row */}
            {reviewsData && (
              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  flexWrap: 'wrap',
                  padding: '16px 20px',
                  background: 'var(--color-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <div>
                  <p style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem' }}>
                    {reviewsData.avgRating.toFixed(1)}
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>/10</span>
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Avg. Rating</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' }}>
                    {reviewsData.totalReviews}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Reviews</p>
                </div>
              </div>
            )}

            {/* Reviews section */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MessageSquare size={18} color="var(--color-red)" />
                  Reviews
                  {reviewsData && (
                    <span style={{ color: 'var(--color-text-muted)', fontWeight: 400, fontSize: '0.9rem' }}>
                      ({reviewsData.totalReviews})
                    </span>
                  )}
                </h2>

                {!hasReviewed && !editingReview && (
                  <button
                    id="write-review-btn"
                    className="btn btn-primary btn-sm"
                    onClick={() => { setShowReviewForm(!showReviewForm); setFormError(''); }}
                  >
                    {showReviewForm ? 'Cancel' : '+ Write a Review'}
                  </button>
                )}
              </div>

              {/* Create review form */}
              {showReviewForm && !hasReviewed && (
                <div
                  className="card animate-slide-up"
                  style={{ padding: '24px', marginBottom: 24 }}
                >
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 18 }}>
                    Your Review
                  </h3>
                  <ReviewForm
                    mode="create"
                    onSubmit={handleCreateSubmit}
                    defaultValues={{ rating: undefined, review: '' }}
                    isLoading={createMutation.isPending}
                    error={formError}
                    onCancel={() => { setShowReviewForm(false); setFormError(''); }}
                  />
                </div>
              )}

              {/* Edit review form */}
              {editingReview && (
                <div
                  className="card animate-slide-up"
                  style={{ padding: '24px', marginBottom: 24 }}
                >
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 18 }}>
                    Edit Your Review
                  </h3>
                  <ReviewForm
                    mode="update"
                    onSubmit={handleUpdateSubmit}
                    defaultValues={{ newRating: editingReview.rating, newReview: editingReview.review }}
                    isLoading={updateMutation.isPending}
                    error={formError}
                    onCancel={() => { setEditingReview(null); setFormError(''); }}
                  />
                </div>
              )}

              {/* Review list */}
              {reviewsLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
                  <Spinner />
                </div>
              ) : reviewsData?.allReviews?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {reviewsData.allReviews.map((review) => (
                    <ReviewCard
                      key={review._id}
                      review={review}
                      currentUserId={user?._id}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={MessageSquare}
                  title="No reviews yet"
                  description="Be the first to review this movie."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
