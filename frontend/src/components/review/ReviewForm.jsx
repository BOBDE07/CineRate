import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, X } from 'lucide-react';
import { reviewSchema, updateReviewSchema } from '../../schemas/index';
import ErrorMessage from '../common/ErrorMessage';
import Spinner from '../common/Spinner';

/**
 * ReviewForm — used for both create and update
 * Props:
 *   mode: 'create' | 'update'
 *   onSubmit: (data) => Promise<void>
 *   defaultValues: { rating, review } | { newRating, newReview }
 *   isLoading: boolean
 *   error: string
 *   onCancel: () => void
 */
const ReviewForm = ({
  mode = 'create',
  onSubmit,
  defaultValues,
  isLoading = false,
  error = '',
  onCancel,
}) => {
  const schema = mode === 'update' ? updateReviewSchema : reviewSchema;
  const ratingField = mode === 'update' ? 'newRating' : 'rating';
  const reviewField = mode === 'update' ? 'newReview' : 'review';

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const ratingValue = watch(ratingField);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
    >
      {/* Star rating picker */}
      <div className="form-group">
        <label className="form-label">Your Rating (1–10)</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValue(ratingField, n, { shouldValidate: true })}
              aria-label={`Rate ${n}`}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: '1px solid',
                borderColor: ratingValue === n ? 'var(--color-gold)' : 'var(--color-border)',
                background: ratingValue === n ? 'var(--color-gold-muted)' : 'transparent',
                color: ratingValue === n ? 'var(--color-gold)' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {n}
            </button>
          ))}
        </div>
        {errors[ratingField] && (
          <span className="form-error">{errors[ratingField].message}</span>
        )}
      </div>

      {/* Review text */}
      <div className="form-group">
        <label htmlFor="review-text" className="form-label">
          Your Review
        </label>
        <textarea
          id="review-text"
          className="form-input form-textarea"
          placeholder="Share your thoughts about this movie… (min. 10 characters)"
          rows={4}
          {...register(reviewField)}
        />
        {errors[reviewField] && (
          <span className="form-error">{errors[reviewField].message}</span>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          id={`${mode}-review-submit`}
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
          style={{ flex: 1 }}
        >
          {isLoading ? (
            <><Spinner size={16} /> {mode === 'update' ? 'Updating…' : 'Submitting…'}</>
          ) : (
            <><Send size={15} /> {mode === 'update' ? 'Update Review' : 'Submit Review'}</>
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            <X size={15} /> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
