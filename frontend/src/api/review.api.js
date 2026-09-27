import api from './axios';

/**
 * POST /api/v1/review/create  (requires auth)
 * Body: { movieId, rating, review }
 * Response: { success, message, newReview }
 */
export const createReview = (data) => api.post('/review/create', data);

/**
 * GET /api/v1/review/all-Reviews/:movieId  (requires auth)
 * Response: { success, message, allReviews, totalRating, totalReviews, avgRating }
 */
export const getAllReviews = (movieId) =>
  api.get(`/review/all-Reviews/${movieId}`);

/**
 * GET /api/v1/review/my-reviews  (requires auth)
 * Response: { success, message, myReviews }
 */
export const getMyReviews = () => api.get('/review/my-reviews');

/**
 * PUT /api/v1/review/:reviewId  (requires auth)
 * Body: { newReview, newRating }
 * Response: { success, message, updatedReview }
 */
export const updateReview = (reviewId, data) =>
  api.put(`/review/${reviewId}`, data);

/**
 * DELETE /api/v1/review/delete/:reviewId  (requires auth)
 * Response: { success, message, deletedReview }
 */
export const deleteReview = (reviewId) =>
  api.delete(`/review/delete/${reviewId}`);
