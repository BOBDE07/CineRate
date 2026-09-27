import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Edit2, Trash2, Film, Calendar } from 'lucide-react';
import { getMyReviews, deleteReview, updateReview } from '../../api/review.api';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import ErrorMessage from '../../components/common/ErrorMessage';
import RatingBadge from '../../components/common/RatingBadge';
import ReviewForm from '../../components/review/ReviewForm';
import { formatDate, getErrorMessage } from '../../utils/index';

const MyReviewsPage = () => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['my-reviews'],
    queryFn: () => getMyReviews(),
    select: (res) => res.data.myReviews,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => refetch(),
    onError: (err) => alert(getErrorMessage(err)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateReview(id, data),
    onSuccess: () => {
      setEditingId(null);
      setFormError('');
      refetch();
    },
    onError: (err) => setFormError(getErrorMessage(err)),
  });

  const handleDelete = (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    deleteMutation.mutate(id);
  };

  const handleUpdateSubmit = (data) => {
    setFormError('');
    updateMutation.mutate({ id: editingId, data });
  };

  // Empty state when 404 is returned (no reviews yet)
  const isNoReviews = error?.response?.status === 404;

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="page-container">
        <div style={{ marginBottom: 36 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              letterSpacing: '-0.025em',
              marginBottom: 6,
            }}
          >
            My Reviews
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            All the movies you&apos;ve reviewed
          </p>
        </div>

        {isLoading && <Spinner fullPage />}

        {!isLoading && (error && !isNoReviews) && (
          <ErrorMessage message={getErrorMessage(error)} />
        )}

        {(!isLoading && (isNoReviews || (data && data.length === 0))) && (
          <EmptyState
            icon={Film}
            title="No reviews yet"
            description="Search for a movie and write your first review."
            action={
              <button className="btn btn-primary" onClick={() => navigate('/search')}>
                Search Movies
              </button>
            }
          />
        )}

        {!isLoading && data && data.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {data.map((review) => {
              const isEditing = editingId === review._id;

              return (
                <div key={review._id} className="card animate-fade-in" style={{ overflow: 'hidden' }}>
                  {/* Top: movie info row */}
                  <div
                    style={{
                      padding: '18px 22px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 16,
                      flexWrap: 'wrap',
                      borderBottom: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <Film size={14} color="var(--color-red)" />
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            color: 'var(--color-text-primary)',
                          }}
                          onClick={() => navigate(`/movie/${review.movieId?.omdbId || ''}`)}
                        >
                          {review.movieId?.title || 'Movie'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                        <Calendar size={11} />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                    <RatingBadge rating={review.rating} size="md" />
                  </div>

                  {/* Review body */}
                  <div style={{ padding: '16px 22px' }}>
                    {isEditing ? (
                      <ReviewForm
                        mode="update"
                        onSubmit={handleUpdateSubmit}
                        defaultValues={{ newRating: review.rating, newReview: review.review }}
                        isLoading={updateMutation.isPending}
                        error={formError}
                        onCancel={() => { setEditingId(null); setFormError(''); }}
                      />
                    ) : (
                      <>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: 16 }}>
                          {review.review}
                        </p>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => { setEditingId(review._id); setFormError(''); }}
                            style={{ gap: 5 }}
                          >
                            <Edit2 size={13} /> Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(review._id)}
                            disabled={deleteMutation.isPending}
                            style={{ gap: 5 }}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviewsPage;
