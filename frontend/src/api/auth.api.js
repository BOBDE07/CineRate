import api from './axios';

/**
 * POST /api/v1/user/register
 * Body: { fullName, email, userName, password }
 * Response: { success, message, token, user }
 */
export const registerUser = (data) => api.post('/user/register', data);

/**
 * POST /api/v1/user/login
 * Body: { email?, userName?, password }
 * Response: { success, message, token, user }
 */
export const loginUser = (data) => api.post('/user/login', data);

/**
 * GET /api/v1/user/detail  (requires auth)
 * Response: { success, message, user }
 */
export const getUserDetail = () => api.get('/user/detail');
