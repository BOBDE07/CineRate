import api from './axios';

/**
 * GET /api/v1/movie/search?title=<title>  (requires auth)
 * Response: { success, message, data: movie }
 */
export const searchMovie = (title) =>
  api.get('/movie/search', { params: { title } });

/**
 * GET /api/v1/movie/movieDetail/:omdbId  (requires auth)
 * Response: { success, message, data: movie }
 */
export const getMovieDetail = (omdbId) =>
  api.get(`/movie/movieDetail/${omdbId}`);
